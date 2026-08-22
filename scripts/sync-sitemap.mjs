/**
 * Mirror the generated sitemap and robots.txt from out/ into public/.
 *
 * next-sitemap runs in `postbuild` and writes into `out/`, which is what gets
 * deployed — so production is always correct. But the dev server serves static
 * files from `public/`, which is why `/sitemap.xml` 404s under `npm run dev`
 * and there is no way to eyeball the file without a full build.
 *
 * Copying the artefacts into public/ fixes that. Both are gitignored, so the
 * copies never get committed and can never go stale in the repo — they are just
 * a convenience for the dev server, refreshed on every build.
 *
 * Note the ordering: `next build` copies public/ into out/ *before* this runs,
 * so these copies are read by the next dev session, never by the current build.
 * out/ remains the single source of truth for what ships.
 */
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'out');
const publicDir = join(root, 'public');

mkdirSync(publicDir, { recursive: true });

const FILES = ['sitemap.xml', 'robots.txt'];
const copied = [];
const missing = [];

for (const file of FILES) {
  const from = join(outDir, file);
  if (!existsSync(from)) { missing.push(file); continue; }
  copyFileSync(from, join(publicDir, file));
  copied.push(file);
}

if (copied.length) {
  console.log(`\nSitemap → public/ (dev server only): ${copied.join(', ')}`);
}
if (missing.length) {
  console.warn(
    `\nWARNING: next-sitemap did not produce ${missing.join(', ')} in out/. ` +
    'The deployed site will be missing them — check next-sitemap.config.js.'
  );
  process.exitCode = 1;
}
