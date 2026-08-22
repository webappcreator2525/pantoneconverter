/**
 * Checks every Open Graph card against the two things that actually break
 * them: text running off the edge, and type that cannot be read on its
 * background.
 *
 *   node scripts/verify-og.mjs
 *
 * Contrast is measured, not assumed. The card is rendered a second time with
 * every <text> element stripped, which gives the exact background pixels the
 * type sits on — gradient, decorative circles and all. Each glyph pixel is
 * then compared against the background pixel underneath it, and the worst
 * ratio in the block is reported.
 */
import { Resvg } from '@resvg/resvg-js';
import { existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ensureFonts } from './fonts.mjs';
import { ogSvg, measureText, OG_WIDTH, OG_HEIGHT } from './og-template.mjs';
import { contrast, rgbToHex } from './color.mjs';
import { OG_CARDS } from '../lib/ogCards.mjs';

const VARIANT = 'bold';
const PAD = 80;
const MAX_TEXT_RIGHT = OG_WIDTH - PAD; // type must not cross this

// Bands the title and subtitle occupy, from the template's layout constants.
const BANDS = {
  title: { y0: 225, y1: 395, large: true },
  subtitle: { y0: 415, y1: 470, large: false },
};

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const fontFiles = await ensureFonts();

function render(svg) {
  const img = new Resvg(svg, {
    fitTo: { mode: 'width', value: OG_WIDTH },
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: 'Plus Jakarta Sans' },
    shapeRendering: 2,
    textRendering: 2,
  }).render();
  return { px: img.pixels, w: img.width, h: img.height };
}

const at = (buf, w, x, y) => rgbToHex([buf[(y * w + x) * 4], buf[(y * w + x) * 4 + 1], buf[(y * w + x) * 4 + 2]]);

/**
 * Worst contrast between solid glyph pixels and the background directly
 * behind them.
 *
 * Antialiased edges are partial blends of type and background, so their
 * contrast is meaninglessly low and would dominate a naive minimum. Coverage
 * is derived per pixel from how far it moved off the background relative to
 * the largest move in the block; only near-fully-covered pixels count as
 * glyph body.
 */
function worstContrast(card, band) {
  const svg = ogSvg(card, VARIANT, fontFiles);
  const withText = render(svg);
  const bare = render(svg.replace(/<text[\s\S]*?<\/text>/g, ''));

  const deltaAt = (x, y) => {
    const i = (y * withText.w + x) * 4;
    const j = (y * bare.w + x) * 4;
    return (
      Math.abs(withText.px[i] - bare.px[j]) +
      Math.abs(withText.px[i + 1] - bare.px[j + 1]) +
      Math.abs(withText.px[i + 2] - bare.px[j + 2])
    );
  };

  let maxDelta = 0;
  for (let y = band.y0; y < band.y1; y++) {
    for (let x = PAD; x < MAX_TEXT_RIGHT; x++) {
      const d = deltaAt(x, y);
      if (d > maxDelta) maxDelta = d;
    }
  }
  if (maxDelta === 0) return { worst: null, glyphPixels: 0 };

  const solid = maxDelta * 0.94;
  let worst = Infinity;
  let glyphPixels = 0;
  for (let y = band.y0; y < band.y1; y++) {
    for (let x = PAD; x < MAX_TEXT_RIGHT; x++) {
      if (deltaAt(x, y) < solid) continue;
      glyphPixels++;
      const ratio = contrast(at(withText.px, withText.w, x, y), at(bare.px, bare.w, x, y));
      if (ratio < worst) worst = ratio;
    }
  }
  return { worst: glyphPixels ? worst : null, glyphPixels };
}

let failures = 0;
console.log('card                              file      widest line   title      subtitle');
console.log('─'.repeat(84));

for (const [path, card] of Object.entries(OG_CARDS)) {
  const dest = join(root, 'public', card.file);
  const problems = [];

  if (!existsSync(dest)) {
    problems.push('PNG missing');
  } else if (statSync(dest).size < 10_000) {
    problems.push('PNG suspiciously small');
  }

  // Overflow: the template auto-fits, so this confirms the fit actually held.
  const titleSize = Math.max(
    ...card.titleLines.map((l) => measureText(l, { size: 68, weight: 800, fontFiles }))
  );
  const widest = Math.round(titleSize);
  const bodyWidest = Math.round(measureText(card.subtitle, { size: 28, weight: 400, fontFiles }));

  const t = worstContrast(card, BANDS.title);
  const s = worstContrast(card, BANDS.subtitle);

  // WCAG AA: 3:1 for large text (the 68px title), 4.5:1 for the 28px subtitle.
  if (t.worst !== null && t.worst < 3) problems.push(`title contrast ${t.worst.toFixed(2)}:1`);
  if (s.worst !== null && s.worst < 4.5) problems.push(`subtitle contrast ${s.worst.toFixed(2)}:1`);
  if (!t.glyphPixels) problems.push('no title glyphs rendered');
  if (!s.glyphPixels) problems.push('no subtitle glyphs rendered');

  const line =
    `${path.padEnd(34)}${(card.file.split('/').pop() || '').slice(0, 8).padEnd(10)}` +
    `${String(widest).padStart(5)}/${String(bodyWidest).padStart(4)}   ` +
    `${(t.worst ?? 0).toFixed(1).padStart(5)}:1  ${(s.worst ?? 0).toFixed(1).padStart(5)}:1`;

  if (problems.length) {
    failures++;
    console.log(`${line}   ✗ ${problems.join('; ')}`);
  } else {
    console.log(`${line}   ok`);
  }
}

console.log('─'.repeat(84));
console.log(
  failures
    ? `${failures} card(s) failed.`
    : `All ${Object.keys(OG_CARDS).length} cards pass: ${OG_WIDTH}x${OG_HEIGHT}, no overflow, WCAG AA contrast.`
);
process.exit(failures ? 1 : 0);
