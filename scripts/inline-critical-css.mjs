/**
 * Inlines above-the-fold CSS into every exported HTML file and turns the
 * remaining stylesheet into a non-blocking load.
 *
 * `next build` with `output: 'export'` emits one global Tailwind chunk and a
 * plain <link rel="stylesheet"> for it, which blocks first paint for a full
 * round trip (~160ms on the PageSpeed field data). `experimental.inlineCss`
 * would solve this, but it is App Router only — this site is Pages Router, so
 * we do the extraction over the exported HTML instead.
 *
 * Beasties rewrites each page to:
 *   <style>…rules actually used by this page's markup…</style>
 *   <link rel="preload" as="style" onload="this.rel='stylesheet'" href="…">
 * so the full sheet still arrives (pruneSource stays false) but off the
 * critical path.
 */
import Beasties from 'beasties';
import { readFile, writeFile } from 'node:fs/promises';
import { readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, 'out');

function htmlFiles(dir) {
  const found = [];
  for (const entry of readdirSync(dir)) {
    if (entry === '_next') continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) found.push(...htmlFiles(full));
    else if (entry.endsWith('.html')) found.push(full);
  }
  return found;
}

const beasties = new Beasties({
  path: outDir,
  publicPath: '/',
  // Keep the external sheet — it carries everything the initial markup does
  // not use (interactive states, dialogs, routes reached by client nav).
  pruneSource: false,
  preload: 'swap',
  // Keep the @font-face rules for families the critical CSS actually uses in
  // the inline block — otherwise the browser cannot apply Plus Jakarta Sans
  // (or its metric-matched fallback) until the deferred sheet lands, which is
  // the layout shift we set out to remove. preloadFonts stays off: the font
  // preload is declared once, by hand, in pages/_document.jsx.
  inlineFonts: true,
  preloadFonts: false,
  // Leave hand-written <style> blocks (the metric-matched fallback face in
  // _document.jsx) untouched instead of pruning them to "critical" rules.
  reduceInlineStyles: false,
  compress: true,
  logLevel: 'silent',
});

const files = htmlFiles(outDir);
let changed = 0;
let inlinedBytes = 0;

for (const file of files) {
  const html = await readFile(file, 'utf8');
  if (!html.includes('rel="stylesheet"')) continue;
  const processed = await beasties.process(html);
  if (processed === html) continue;
  await writeFile(file, processed);
  changed += 1;
  inlinedBytes += processed.length - html.length;
}

const avg = changed ? Math.round(inlinedBytes / changed) : 0;
console.log(
  `inline-critical-css: rewrote ${changed}/${files.length} pages ` +
    `(+${avg} bytes of inline CSS per page, stylesheet now non-blocking)`,
);
