/**
 * Capture a visual + geometric snapshot of the built site, so a change can be
 * proved to alter nothing.
 *
 *   node scripts/perf/snapshot.mjs before
 *   ...make changes, npm run build...
 *   node scripts/perf/snapshot.mjs after
 *   node scripts/perf/snapshot.mjs diff
 *
 * Screenshots go to scripts/perf/shots/<label>/ for eyeballing. The `diff` step
 * compares two things automatically:
 *
 *   - PNG bytes, which answers "is it pixel-identical" outright;
 *   - the bounding box of every element in the nav and the first two screens of
 *     <main>, which answers "what moved, and by how much" when it is not.
 *
 * The pixel diff is the authoritative answer. The box diff is the diagnostic:
 * when pixels differ, it says which element and by how many pixels.
 *
 * Caveat on the box diff: elements are keyed by structural path, so *inserting*
 * a wrapper renumbers every sibling after it and the tool then compares
 * unrelated elements to each other. If it reports large offsets while the pixel
 * diff says byte-identical, that is what has happened — trust the pixels.
 */
import { writeFile, mkdir, readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { serveDir, launchChrome, evaluate, sleep } from './cdp.mjs';

const ROUTES = [
  '/', '/hex-to-pantone/', '/cmyk-to-pantone/', '/pantone-finder/',
  '/compare/', '/pantone-to-hex/', '/pantone-to-cmyk/',
];
const WIDTHS = [375, 1287];
const SHOTS = join('scripts', 'perf', 'shots');

/**
 * Every element's box, keyed by a stable structural path. Elements that only
 * exist in one run show up as added/removed rather than as a mismatch.
 */
const COLLECT_BOXES = `
  (() => {
    const out = {};
    const roots = [document.querySelector('nav'), document.querySelector('main')].filter(Boolean);
    const pathOf = (el) => {
      const parts = [];
      for (let n = el; n && n.tagName && parts.length < 12; n = n.parentElement) {
        const siblings = n.parentElement ? [...n.parentElement.children] : [n];
        const same = siblings.filter((s) => s.tagName === n.tagName);
        const idx = same.length > 1 ? '[' + (same.indexOf(n) + 1) + ']' : '';
        parts.unshift(n.tagName.toLowerCase() + idx);
      }
      return parts.join('/');
    };
    for (const root of roots) {
      // Two screens' worth is enough to catch anything a reader would notice,
      // and keeps the payload small on the long reference pages.
      const all = [root, ...root.querySelectorAll('*')].slice(0, 1500);
      for (const el of all) {
        const r = el.getBoundingClientRect();
        if (r.top > 2000) continue;
        if (r.width === 0 && r.height === 0) continue;
        out[pathOf(el)] = [
          Math.round(r.x * 10) / 10, Math.round(r.y * 10) / 10,
          Math.round(r.width * 10) / 10, Math.round(r.height * 10) / 10,
        ];
      }
    }
    return out;
  })()
`;

async function capture(label) {
  const server = await serveDir('out');
  const session = await launchChrome();
  const dir = join(SHOTS, label);
  await mkdir(dir, { recursive: true });
  const geometry = {};

  try {
    await session.send('Page.enable');
    await session.send('Runtime.enable');

    for (const width of WIDTHS) {
      await session.send('Emulation.setDeviceMetricsOverride', {
        width, height: 900, deviceScaleFactor: 1, mobile: width < 768,
      });
      for (const route of ROUTES) {
        await session.send('Page.navigate', { url: server.origin + route });
        await session.once('Page.loadEventFired');
        await sleep(1400); // hydration, fonts, post-mount effects
        await evaluate(session, 'document.fonts.ready');

        const { data } = await session.send('Page.captureScreenshot', {
          format: 'png',
          captureBeyondViewport: true,
          clip: { x: 0, y: 0, width, height: 1800, scale: 1 },
        });
        const name = `${width}${route.replace(/\//g, '_')}.png`;
        await writeFile(join(dir, name), Buffer.from(data, 'base64'));
        geometry[`${width}${route}`] = await evaluate(session, COLLECT_BOXES);
        process.stdout.write('.');
      }
    }
    await writeFile(join(dir, 'geometry.json'), JSON.stringify(geometry, null, 1));
    console.log(`\nSnapshot "${label}" → ${dir}`);
  } finally {
    await session.close();
    await server.close();
  }
}

async function diff() {
  const a = join(SHOTS, 'before');
  const b = join(SHOTS, 'after');
  if (!existsSync(a) || !existsSync(b)) throw new Error('Need both before/ and after/ snapshots');

  console.log('\n━━━ PIXEL DIFF ━━━');
  const files = (await readdir(a)).filter((f) => f.endsWith('.png'));
  let identical = 0;
  const changed = [];
  for (const f of files) {
    const [x, y] = await Promise.all([readFile(join(a, f)), readFile(join(b, f)).catch(() => null)]);
    if (y && x.equals(y)) { identical += 1; continue; }
    changed.push(f);
  }
  console.log(`  ${identical}/${files.length} screenshots byte-identical`);
  if (changed.length) changed.forEach((f) => console.log(`  CHANGED: ${f}`));

  console.log('\n━━━ GEOMETRY DIFF (element boxes, 0.5px tolerance) ━━━');
  const ga = JSON.parse(await readFile(join(a, 'geometry.json'), 'utf8'));
  const gb = JSON.parse(await readFile(join(b, 'geometry.json'), 'utf8'));
  let totalMoved = 0;

  for (const key of Object.keys(ga)) {
    const A = ga[key];
    const B = gb[key] ?? {};
    const moved = [];
    for (const path of Object.keys(A)) {
      if (!(path in B)) { moved.push([path, 'removed', null]); continue; }
      const d = A[path].map((v, i) => +(B[path][i] - v).toFixed(1));
      if (d.some((v) => Math.abs(v) > 0.5)) moved.push([path, 'moved', d]);
    }
    for (const path of Object.keys(B)) if (!(path in A)) moved.push([path, 'added', null]);

    if (moved.length) {
      totalMoved += moved.length;
      console.log(`\n  ${key}  — ${moved.length} element(s) differ`);
      for (const [path, kind, d] of moved.slice(0, 8)) {
        const short = path.split('/').slice(-4).join('/');
        console.log(`    ${kind.padEnd(7)} ${short}${d ? `   Δx ${d[0]} Δy ${d[1]} Δw ${d[2]} Δh ${d[3]}` : ''}`);
      }
      if (moved.length > 8) console.log(`    …and ${moved.length - 8} more`);
    }
  }
  console.log(totalMoved === 0
    ? '\n  No element changed position or size on any route at either width.'
    : `\n  ${totalMoved} element differences total.`);
}

const mode = process.argv[2];
if (mode === 'diff') await diff();
else if (mode === 'before' || mode === 'after') await capture(mode);
else { console.error('usage: snapshot.mjs before|after|diff'); process.exit(1); }
