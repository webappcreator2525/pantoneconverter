/**
 * Re-downloads the self-hosted Plus Jakarta Sans subsets into public/fonts/.
 *
 * These are the exact files Google Fonts serves for
 *   https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap
 * requested with a modern Chrome UA (so: variable woff2, wght axis 200–800).
 * We serve them ourselves so first paint never depends on a third-party
 * DNS + TLS + CSS round trip. @font-face lives in styles/globals.css.
 *
 * Licence: SIL Open Font License 1.1 — public/fonts/OFL.txt.
 * Copyright 2020 The Plus Jakarta Sans Project Authors
 * (https://github.com/tokotype/PlusJakartaSans).
 *
 * If Google bumps the font version the URLs below change; re-read the css2
 * response and update them. Unlike next/font this never runs at build time,
 * so a build works offline and the bytes are reviewable in git.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = join(dirname(dirname(fileURLToPath(import.meta.url))), 'public', 'fonts');
const BASE = 'https://fonts.gstatic.com/s/plusjakartasans/v12/';

const FILES = {
  'plus-jakarta-sans-latin.woff2': 'LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko20yw.woff2',
  'plus-jakarta-sans-latin-ext.woff2': 'LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko40yyygA.woff2',
  'plus-jakarta-sans-italic-latin.woff2': 'LDIuaomQNQcsA88c7O9yZ4KMCoOg4Koz4y6qhA.woff2',
  'plus-jakarta-sans-italic-latin-ext.woff2': 'LDIuaomQNQcsA88c7O9yZ4KMCoOg4Koz4yCqhMva.woff2',
};

const LICENSE = 'https://raw.githubusercontent.com/google/fonts/main/ofl/plusjakartasans/OFL.txt';

mkdirSync(outDir, { recursive: true });

async function fetchTo(url, name) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${name}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (name.endsWith('.woff2') && buf.subarray(0, 4).toString('latin1') !== 'wOF2') {
    throw new Error(`${name} is not a woff2 file — check the URL`);
  }
  writeFileSync(join(outDir, name), buf);
  console.log(`  ${name} (${buf.length} bytes)`);
}

for (const [name, path] of Object.entries(FILES)) await fetchTo(BASE + path, name);
await fetchTo(LICENSE, 'OFL.txt');
