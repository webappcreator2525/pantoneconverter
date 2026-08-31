/**
 * Removes the ES2019–ES2022 shims from Next's client polyfill module in the
 * exported bundle.
 *
 * `next/dist/client/index.js` imports `../build/polyfills/polyfill-module`
 * unconditionally — it is not driven by browserslist — so every visitor
 * downloads feature detections for methods their browser has shipped for
 * years. PageSpeed flags this chunk under "Avoid serving legacy JavaScript".
 *
 * Only shims that predate Next's own minimum supported browsers (Chrome 111,
 * Edge 111, Firefox 111, Safari 16.4) are removed:
 *
 *   String.prototype.trimStart/trimEnd  Chrome 66 · Firefox 61 · Safari 12
 *   Array.prototype.flat/flatMap        Chrome 69 · Firefox 62 · Safari 12
 *   Object.fromEntries                  Chrome 73 · Firefox 63 · Safari 12.1
 *   Array.prototype.at                  Chrome 92 · Firefox 90 · Safari 15.4
 *   Object.hasOwn                       Chrome 93 · Firefox 92 · Safari 15.4
 *
 * `URL.canParse` is deliberately kept: it only shipped in Safari 17, below
 * Next's floor of 16.4, and Next itself calls it in normalized-asset-prefix.
 * Promise.prototype.finally and Symbol.prototype.description are left alone
 * too — together they are ~350 bytes and PageSpeed does not flag them.
 */
import { readdirSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const chunkDir = join(root, 'out', '_next', 'static', 'chunks');

/** Guards to drop, as the head of `<test> || ( <assignment…> ),`. */
const GUARDS = [
  /"trimStart"\s*in\s*String\.prototype\s*\|\|\s*\(/,
  /"trimEnd"\s*in\s*String\.prototype\s*\|\|\s*\(/,
  /Array\.prototype\.flat\s*\|\|\s*\(/,
  /Object\.fromEntries\s*\|\|\s*\(/,
  /Array\.prototype\.at\s*\|\|\s*\(/,
  /Object\.hasOwn\s*\|\|\s*\(/,
];

/** Index just past the `)` that closes the `(` at `open`, string-aware. */
function matchParen(src, open) {
  let depth = 0;
  for (let i = open; i < src.length; i++) {
    const c = src[i];
    if (c === '"' || c === "'" || c === '`') {
      for (i++; i < src.length; i++) {
        if (src[i] === '\\') i++;
        else if (src[i] === c) break;
      }
      continue;
    }
    if (c === '(') depth++;
    else if (c === ')' && --depth === 0) return i + 1;
  }
  throw new Error('unbalanced parentheses while scanning polyfill module');
}

function stripGuards(src) {
  let out = src;
  for (const guard of GUARDS) {
    const m = guard.exec(out);
    if (!m) throw new Error(`polyfill guard not found: ${guard} — Next's polyfill-module changed, re-check this script`);
    let end = matchParen(out, m.index + m[0].length - 1);
    // Swallow the separating comma so the surrounding sequence stays valid.
    if (out[end] === ',') end += 1;
    out = out.slice(0, m.index) + out.slice(end);
    if (guard.test(out)) throw new Error(`polyfill guard appears more than once: ${guard}`);
  }
  return out;
}

const MARKER = 'String.prototype.trimLeft';
const targets = readdirSync(chunkDir).filter((f) => f.endsWith('.js'));
let patched = 0;
let saved = 0;

for (const name of targets) {
  const file = join(chunkDir, name);
  const src = await readFile(file, 'utf8');
  if (!src.includes(MARKER)) continue;

  const next = stripGuards(src);
  // Compiling without running catches any syntax we mangled.
  new Function(next);
  await writeFile(file, next);
  patched += 1;
  saved += src.length - next.length;
}

if (patched === 0) {
  console.warn('strip-legacy-polyfills: polyfill module not found — nothing to do');
} else {
  console.log(`strip-legacy-polyfills: patched ${patched} chunk(s), removed ${saved} bytes`);
}
