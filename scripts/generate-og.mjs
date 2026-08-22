/**
 * Renders every Open Graph card declared in lib/ogCards.mjs to a 1200x630
 * PNG under public/.
 *
 *   node scripts/generate-og.mjs
 *
 * Adding a page-specific card is a single entry in lib/ogCards.mjs — both the
 * image and the meta tags then follow automatically.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ensureFonts } from './fonts.mjs';
import { renderOg, OG_WIDTH, OG_HEIGHT } from './og-template.mjs';
import { OG_CARDS } from '../lib/ogCards.mjs';

const VARIANT = 'bold';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');

console.log('Fonts →');
const fontFiles = await ensureFonts();

console.log(`\nOG cards (${OG_WIDTH}x${OG_HEIGHT}, "${VARIANT}" template) →`);
for (const [path, card] of Object.entries(OG_CARDS)) {
  const dest = join(publicDir, card.file);
  mkdirSync(dirname(dest), { recursive: true });
  const png = renderOg(card, VARIANT, fontFiles);
  writeFileSync(dest, png);
  console.log(`  ${card.file.padEnd(30)} ${(png.length / 1024).toFixed(0).padStart(4)} KB   ${path}`);
}

console.log('\nDone.');
