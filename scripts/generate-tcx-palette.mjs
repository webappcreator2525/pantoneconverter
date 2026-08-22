/**
 * Builds the Pantone Fashion, Home + Interiors (TCX) palette into data/tcx.json.
 *
 *   node scripts/generate-tcx-palette.mjs
 *
 * ── Data provenance ─────────────────────────────────────────────────────────
 * TCX is a Pantone LLC product library and Pantone does not publish a free,
 * machine-readable sRGB table for it. The values here are sRGB approximations
 * assembled from the widely circulated public conversions, and the selection is
 * curated rather than complete: every Color of the Year plus the colours that
 * recur across trend reporting and seasonal palettes, against a full library of
 * roughly 2,625.
 *
 * Accuracy is recorded as `low` for a reason specific to this library, and the
 * pages say so plainly. A TCX chip is dyed cotton, not printed ink — it has a
 * textile surface, a nap and a weave, and the same dye reads differently on
 * poplin, jersey and canvas. An sRGB value can locate the colour; it cannot
 * stand in for the physical swatch a dye house needs to work from.
 *
 * Replacing this with licensed data is a drop-in: keep the row shape
 * [code, name, localName, hex] in tcx-palettes.mjs and re-run this script.
 */
import { entry, writePalettes } from './palette-lib.mjs';
import { TCX } from './tcx-palettes.mjs';

writePalettes(
  [['tcx.json', 'Pantone TCX', 'Pantone LLC', 'low', TCX.map(entry)]],
  'scripts/generate-tcx-palette.mjs'
);

console.log('\nDone.');
