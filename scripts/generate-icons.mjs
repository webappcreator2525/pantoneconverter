/**
 * Generates every favicon / app-icon asset from the single SVG source in
 * scripts/brand.mjs, plus site.webmanifest.
 *
 *   node scripts/generate-icons.mjs
 *
 * Output lands in public/ and is committed — the Next.js static export just
 * copies public/ verbatim, so nothing runs at build time.
 */
import { Resvg } from '@resvg/resvg-js';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { brand, iconSvg, theme, site } from './brand.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');
mkdirSync(publicDir, { recursive: true });

function render(size, opts = {}) {
  const svg = iconSvg({ size, ...opts });
  const img = new Resvg(svg, {
    fitTo: { mode: 'width', value: size },
    font: { loadSystemFonts: false },
    shapeRendering: 2,
  }).render();
  return { png: img.asPng(), rgba: img.pixels, width: img.width, height: img.height };
}

function write(name, buf) {
  writeFileSync(join(publicDir, name), buf);
  console.log(`  ${name.padEnd(28)} ${(buf.length / 1024).toFixed(1)} KB`);
}

/* ── ICO container ───────────────────────────────────────────────────────
 * Classic BMP (BITMAPINFOHEADER + 32bpp bottom-up XOR bitmap + 1bpp AND
 * mask) entries rather than embedded PNGs — widest compatibility, and at
 * 16/32 px the size cost is negligible.
 */
function bmpEntry({ rgba, width, height }) {
  const header = Buffer.alloc(40);
  header.writeUInt32LE(40, 0);            // biSize
  header.writeInt32LE(width, 4);          // biWidth
  header.writeInt32LE(height * 2, 8);     // biHeight — XOR + AND stacked
  header.writeUInt16LE(1, 12);            // biPlanes
  header.writeUInt16LE(32, 14);           // biBitCount
  header.writeUInt32LE(0, 16);            // BI_RGB

  const xor = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    const src = (height - 1 - y) * width * 4; // bottom-up
    const dst = y * width * 4;
    for (let x = 0; x < width; x++) {
      xor[dst + x * 4 + 0] = rgba[src + x * 4 + 2]; // B
      xor[dst + x * 4 + 1] = rgba[src + x * 4 + 1]; // G
      xor[dst + x * 4 + 2] = rgba[src + x * 4 + 0]; // R
      xor[dst + x * 4 + 3] = rgba[src + x * 4 + 3]; // A
    }
  }

  // AND mask: fully transparent where alpha is 0, rows padded to 4 bytes.
  const maskStride = Math.ceil(width / 32) * 4;
  const and = Buffer.alloc(maskStride * height, 0);
  for (let y = 0; y < height; y++) {
    const src = (height - 1 - y) * width * 4;
    for (let x = 0; x < width; x++) {
      if (rgba[src + x * 4 + 3] === 0) {
        and[y * maskStride + (x >> 3)] |= 0x80 >> (x & 7);
      }
    }
  }

  return Buffer.concat([header, xor, and]);
}

function buildIco(images) {
  const entries = images.map((img) => ({ img, data: bmpEntry(img) }));
  const dir = Buffer.alloc(6 + entries.length * 16);
  dir.writeUInt16LE(0, 0);
  dir.writeUInt16LE(1, 2); // 1 = icon
  dir.writeUInt16LE(entries.length, 4);

  let offset = dir.length;
  entries.forEach(({ img, data }, i) => {
    const p = 6 + i * 16;
    dir.writeUInt8(img.width >= 256 ? 0 : img.width, p);
    dir.writeUInt8(img.height >= 256 ? 0 : img.height, p + 1);
    dir.writeUInt8(0, p + 2);  // palette size
    dir.writeUInt8(0, p + 3);  // reserved
    dir.writeUInt16LE(1, p + 4);
    dir.writeUInt16LE(32, p + 6);
    dir.writeUInt32LE(data.length, p + 8);
    dir.writeUInt32LE(offset, p + 12);
    offset += data.length;
  });

  return Buffer.concat([dir, ...entries.map((e) => e.data)]);
}

/* ── Run ─────────────────────────────────────────────────────────────── */
console.log('Icons →');

// Vector source, served to browsers that prefer it.
writeFileSync(join(publicDir, 'favicon.svg'), iconSvg({ size: 512 }));
console.log('  favicon.svg');

const ico16 = render(16, { highlight: false });
const ico32 = render(32, { highlight: false });
write('favicon-16x16.png', ico16.png);
write('favicon-32x32.png', ico32.png);
write('favicon.ico', buildIco([ico16, ico32]));

// iOS masks the corners itself, so this one is square-cornered and fully
// opaque — a transparent apple-touch-icon renders on a black plate.
write('apple-touch-icon.png', render(180, { rounded: false }).png);

write('android-chrome-192x192.png', render(192).png);
write('android-chrome-512x512.png', render(512).png);

const manifest = {
  name: `${site.name} — Free Pantone Color Converter`,
  short_name: site.shortName,
  description:
    'Convert CMYK, HEX, RGB and HSL to the closest Pantone PMS match — free, instant, no login.',
  start_url: '/',
  scope: '/',
  display: 'standalone',
  theme_color: theme.themeColor,
  background_color: theme.backgroundColor,
  icons: [
    { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
  ],
};
write('site.webmanifest', Buffer.from(JSON.stringify(manifest, null, 2) + '\n'));

console.log(`\nDone. theme_color ${theme.themeColor}, background_color ${brand.white}`);
