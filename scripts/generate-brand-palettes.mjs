/**
 * Builds the craft-material and house-paint palettes used by the /pantone-to-*
 * Category B converter pages into data/*.json.
 *
 *   node scripts/generate-brand-palettes.mjs
 *
 * Colour tables live in craft-palettes.mjs and paint-palettes.mjs; this file
 * only turns them into the on-disk shape, with rgb, cmyk and lab precomputed so
 * the browser never runs a cube root per swatch per keystroke.
 *
 * ── Data provenance ─────────────────────────────────────────────────────────
 * Every system here is a commercial product range owned by the manufacturer
 * named in `owner`. None of them publish a free, machine-readable sRGB table,
 * so these values are sRGB *approximations* assembled from the widely
 * circulated public conversions of each range. They are good enough to rank a
 * nearest match and to narrow a shopping list; they are not a substitute for
 * the physical product. That matters more here than for the industrial
 * standards, because these materials are bought and applied directly:
 *
 *   dmc       medium   Floss numbers are stable and widely published.
 *   copic     medium   Marker codes are stable; ink on paper varies by stock.
 *   oracal    medium   ORACAL 651 gloss range.
 *   siser     medium   Siser EasyWeed stock colours, named rather than numbered.
 *   farrow    medium   Small, well-documented deck (~130 colours).
 *   sherwin   low      Curated subset of a 1,700+ colour collection.
 *   benjamin  low      Curated subset of a 3,500+ colour collection.
 *   dulux     low      UK/AU consumer ranges; names differ by market.
 *   behr      low      Curated subset of a large retail collection.
 *
 * Codes that could not be verified as real were left out rather than guessed:
 * a plausible-looking code that does not exist is worse than a missing one,
 * because somebody will try to order paint by it.
 *
 * Replacing any of these with licensed data is a drop-in — keep the row shape
 * [code, name, localName, hex] and re-run this script.
 */
import { entry, writePalettes } from './palette-lib.mjs';
import { DMC, COPIC, ORACAL, SISER } from './craft-palettes.mjs';
import { SHERWIN, BENJAMIN, DULUX, FARROW, BEHR } from './paint-palettes.mjs';

const PALETTES = [
  ['dmc.json',      'DMC',              'DMC Corporation',              'medium', DMC.map(entry)],
  ['copic.json',    'Copic',            'Too Marker Products Inc.',     'medium', COPIC.map(entry)],
  ['oracal.json',   'ORACAL 651',       'ORAFOL Europe GmbH',           'medium', ORACAL.map(entry)],
  ['siser.json',    'Siser EasyWeed',   'Siser S.r.l.',                 'medium', SISER.map(entry)],
  ['sherwin.json',  'Sherwin-Williams', 'The Sherwin-Williams Company', 'low',    SHERWIN.map(entry)],
  ['benjamin.json', 'Benjamin Moore',   'Benjamin Moore & Co.',         'low',    BENJAMIN.map(entry)],
  ['dulux.json',    'Dulux',            'AkzoNobel N.V.',               'low',    DULUX.map(entry)],
  ['farrow.json',   'Farrow & Ball',    'Farrow & Ball Limited',        'medium', FARROW.map(entry)],
  ['behr.json',     'Behr',             'Behr Process Corporation',     'low',    BEHR.map(entry)],
];

writePalettes(PALETTES, 'scripts/generate-brand-palettes.mjs');

console.log('\nDone.');
