/**
 * build-color-stats.mjs
 * =====================
 * Derives every number that /pantone-to-hex/ and /pantone-to-cmyk/ print in
 * their tables, charts and prose, and writes them to data/color-stats.json.
 *
 * The point of a script rather than computing in the page is accountability:
 * the two pages make factual claims ("20.8% of the coated deck has a channel
 * pinned at the sRGB gamut wall", "the median coated-to-uncoated difference is
 * ΔE 6.2"), and every one of them has to be reproducible by re-running this
 * file against data/pantone.json. Nothing on either page is typed in by hand.
 *
 * What this file will NOT produce, deliberately
 * ---------------------------------------------
 * data/pantone.json carries a published sRGB value per colour and a CMYK
 * breakdown that is *derived from that sRGB value* by the standard
 * non-colour-managed formula — verified here at build time by CMYK_IS_DERIVED.
 * It carries no measured Lab for the spot inks and no ICC characterisation of
 * any press condition.
 *
 * That rules out an honest "ΔE between the spot ink and its four-colour
 * reproduction": comparing the build against the sRGB it was derived from
 * returns ~0 for all 1,341 colours, which measures the round-trip and not the
 * press. So the CMYK page flags colours by INK HEADROOM instead — how many of
 * C/M/Y the build drives to 95% or more — which is exact arithmetic on the
 * published build, and the page states exactly what that does and does not
 * mean. See SEO-CHANGES.md.
 *
 * Run: node scripts/build-color-stats.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  DATA_DIR, hexToRgb, rgbToHex, rgbToCmyk, rgbToLab,
  deltaE2000, contrastRatio,
} from './palette-lib.mjs';
import { CSS_NAMED_COLORS } from './css-named-colors.mjs';

const db = JSON.parse(readFileSync(join(DATA_DIR, 'pantone.json'), 'utf8'));
const byName = new Map(db.map((e) => [e.name, e]));

/** Pull an entry by its exact dataset name, or fail the build. */
function need(name) {
  const entry = byName.get(`Pantone ${name}`);
  if (!entry) throw new Error(`build-color-stats: "Pantone ${name}" is not in data/pantone.json`);
  return entry;
}

// ─── The 100 colours the charts cover ────────────────────────────────────────
//
// Hand-picked, and the pages say so rather than claiming a popularity ranking
// the repo has no data for. The set is: every base ink the PMS system mixes
// from, the seven deck blacks, the eleven Cool Grays, four speciality colours
// people search for by name, and 64 numbered colours that recur in brand
// guidelines — including every colour named in this site's own Search Console
// query data.

const FAMILIES = [
  ['Base solid inks', [
    'YELLOW-C', 'YELLOW-012-C', 'ORANGE-021-C', 'WARM-RED-C', 'RED-032-C',
    'RUBINE-RED-C', 'RHODAMINE-RED-C', 'PURPLE-C', 'VIOLET-C', 'BLUE-072-C',
    'REFLEX-BLUE-C', 'PROCESS-BLUE-C', 'GREEN-C', 'BLACK-C',
  ]],
  ['Deck blacks', [
    'BLACK-2-C', 'BLACK-3-C', 'BLACK-4-C', 'BLACK-5-C', 'BLACK-6-C',
    'BLACK-7-C', 'NEUTRAL-BLACK-C',
  ]],
  ['Cool Grays', [
    'COOL-GRAY-1-C', 'COOL-GRAY-2-C', 'COOL-GRAY-3-C', 'COOL-GRAY-4-C',
    'COOL-GRAY-5-C', 'COOL-GRAY-6-C', 'COOL-GRAY-7-C', 'COOL-GRAY-8-C',
    'COOL-GRAY-9-C', 'COOL-GRAY-10-C', 'COOL-GRAY-11-C',
  ]],
  ['Metallics and neons', ['871-C', '877-C', '8003-C Metallic', '811-C']],
  ['Reds and pinks', [
    '185-C', '186-C', '199-C', '200-C', '202-C',
    '219-C', '226-C', '241-C', '485-C', '1795-C',
  ]],
  ['Oranges and browns', [
    '151-C', '158-C', '165-C', '172-C', '1375-C',
    '1585-C', '1665-C', '469-C', '476-C', '7412-C',
  ]],
  ['Yellows and golds', [
    '100-C', '102-C', '109-C', '116-C', '123-C',
    '130-C', '137-C', '872-C', '7406-C', '7548-C',
  ]],
  ['Greens', [
    '347-C', '348-C', '354-C', '355-C', '356-C',
    '368-C', '375-C', '382-C', '3405-C', '7482-C',
  ]],
  ['Blues', [
    '279-C', '285-C', '286-C', '287-C', '293-C',
    '300-C', '301-C', '306-C', '2955-C', '7461-C',
  ]],
  ['Purples and violets', [
    '265-C', '266-C', '267-C', '2685-C', '2725-C', '527-C', '668-C', '7679-C',
  ]],
  ['Warm neutrals', ['402-C', '405-C', '408-C', '418-C', '424-C', '430-C']],
];

/**
 * Dataset names are shouted and hyphenated ("REFLEX-BLUE-C"); printed charts
 * are not. "186-C" becomes "PMS 186 C", "REFLEX-BLUE-C" becomes
 * "PMS Reflex Blue C", "8003-C Metallic" becomes "PMS 8003 C Metallic".
 */
function displayCode(code) {
  const words = code.replace(/^Pantone /, '').replace(/-/g, ' ').split(/\s+/);
  const pretty = words
    .map((w) => (/^\d/.test(w) || w.length === 1 ? w : w[0] + w.slice(1).toLowerCase()))
    .join(' ');
  return `PMS ${pretty}`;
}

// ─── Reference tables ────────────────────────────────────────────────────────

const CSS_REFERENCE = Object.entries(CSS_NAMED_COLORS).map(([name, hex]) => {
  const rgb = hexToRgb(hex);
  return { name, hex, lab: rgbToLab(rgb.r, rgb.g, rgb.b) };
});

/** Nearest CSS Color Level 4 keyword to an sRGB triple, ranked by ΔE*00. */
function closestCssColor(rgb) {
  const lab = rgbToLab(rgb.r, rgb.g, rgb.b);
  let best = null;
  for (const ref of CSS_REFERENCE) {
    const dE = deltaE2000(lab, ref.lab);
    if (!best || dE < best.deltaE) best = { name: ref.name, hex: ref.hex, deltaE: dE };
  }
  return best;
}

const WHITE = { r: 255, g: 255, b: 255 };
const BLACK = { r: 0, g: 0, b: 0 };

// ─── Integrity check on the source data ──────────────────────────────────────
//
// If data/pantone.json ever gains real, measured CMYK builds, the honesty
// caveats baked into the CMYK page stop being necessary — and this flag is how
// the next person finds that out, instead of discovering it by reading copy.

const derivedMatches = db.filter((e) => {
  const c = rgbToCmyk(e.rgb.r, e.rgb.g, e.rgb.b);
  return c.c === e.cmyk.c && c.m === e.cmyk.m && c.y === e.cmyk.y && c.k === e.cmyk.k;
}).length;
const CMYK_IS_DERIVED = derivedMatches / db.length > 0.99;

// ─── Per-colour rows ─────────────────────────────────────────────────────────

/** Chromatic inks driven to 95% or more — the build has no headroom left. */
const heavyInks = ({ c, m, y }) => [c, m, y].filter((v) => v >= 95).length;
const maxChromatic = ({ c, m, y }) => Math.max(c, m, y);
const tacOf = ({ c, m, y, k }) => c + m + y + k;

function chartRow(name, family) {
  const e = need(name);
  const css = closestCssColor(e.rgb);
  const lab = rgbToLab(e.rgb.r, e.rgb.g, e.rgb.b);
  return {
    name: e.name,
    code: displayCode(name),
    family,
    hex: rgbToHex(e.rgb.r, e.rgb.g, e.rgb.b),
    rgb: e.rgb,
    cmyk: e.cmyk,
    collection: e.collection,
    lab,
    chroma: Math.round(Math.hypot(lab.a, lab.b) * 10) / 10,
    css,
    contrastWhite: contrastRatio(e.rgb, WHITE),
    contrastBlack: contrastRatio(e.rgb, BLACK),
    tac: tacOf(e.cmyk),
    maxInk: maxChromatic(e.cmyk),
    heavy: heavyInks(e.cmyk),
    srgbClipped: [e.rgb.r, e.rgb.g, e.rgb.b].some((v) => v === 0 || v === 255),
  };
}

const chart = FAMILIES.flatMap(([family, codes]) => codes.map((c) => chartRow(c, family)));
if (chart.length !== 100) {
  throw new Error(`build-color-stats: expected 100 chart colours, got ${chart.length}`);
}

// ─── Coated vs uncoated ──────────────────────────────────────────────────────

const COATED = db.filter((e) => e.collection === 'coated');

/** Every PMS number that exists in both the coated and the uncoated deck. */
const pairs = COATED.map((c) => {
  const u = byName.get(c.name.replace(/-C$/, '-U'));
  if (!u) return null;
  const cLab = rgbToLab(c.rgb.r, c.rgb.g, c.rgb.b);
  const uLab = rgbToLab(u.rgb.r, u.rgb.g, u.rgb.b);
  return {
    name: c.name,
    code: displayCode(c.name).replace(/ C$/, ''),
    coatedHex: rgbToHex(c.rgb.r, c.rgb.g, c.rgb.b),
    uncoatedHex: rgbToHex(u.rgb.r, u.rgb.g, u.rgb.b),
    deltaE: deltaE2000(cLab, uLab),
    dL: Math.round((uLab.l - cLab.l) * 10) / 10,
    dC: Math.round((Math.hypot(uLab.a, uLab.b) - Math.hypot(cLab.a, cLab.b)) * 10) / 10,
  };
}).filter(Boolean);

/** Plain-English reading of how the uncoated printing moved. */
function shiftNote({ dL, dC }) {
  const light = dL > 3 ? 'lighter' : dL < -3 ? 'darker' : 'about as light';
  const sat = dC < -8 ? 'much duller' : dC < -2 ? 'duller' : dC > 2 ? 'more saturated' : 'similarly saturated';
  return `Uncoated prints ${light} and ${sat}.`;
}

const CU_FEATURED = [
  'Pantone 186-C', 'Pantone 485-C', 'Pantone RED-032-C', 'Pantone REFLEX-BLUE-C',
  'Pantone ORANGE-021-C', 'Pantone 300-C', 'Pantone 285-C', 'Pantone 355-C',
  'Pantone 354-C', 'Pantone 2955-C', 'Pantone 109-C', 'Pantone 200-C',
  'Pantone 266-C', 'Pantone 348-C', 'Pantone 877-C', 'Pantone 871-C',
  'Pantone BLACK-C', 'Pantone BLACK-6-C', 'Pantone COOL-GRAY-9-C', 'Pantone YELLOW-C',
];

const coatedUncoated = CU_FEATURED.map((n) => {
  const p = pairs.find((x) => x.name === n);
  if (!p) throw new Error(`build-color-stats: no coated/uncoated pair for ${n}`);
  return { ...p, note: shiftNote(p) };
});

// ─── Distributions ───────────────────────────────────────────────────────────

function histogram(values, edges) {
  const n = values.length;
  return edges.map(([lo, hi, label]) => {
    const count = values.filter((v) => v >= lo && v < hi).length;
    return { label, lo, hi: hi === Infinity ? null : hi, count, pct: Math.round((count / n) * 1000) / 10 };
  });
}

const stats = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  return {
    n: sorted.length,
    min: sorted[0],
    max: sorted[sorted.length - 1],
    mean: Math.round((sorted.reduce((s, v) => s + v, 0) / sorted.length) * 100) / 100,
    median: Math.round(sorted[Math.floor(sorted.length / 2)] * 100) / 100,
  };
};

const cuValues = pairs.map((p) => p.deltaE);
const cuHistogram = {
  buckets: histogram(cuValues, [
    [0, 1, 'Under 1'], [1, 2, '1 – 2'], [2, 3, '2 – 3'],
    [3, 5, '3 – 5'], [5, 10, '5 – 10'], [10, Infinity, '10 and over'],
  ]),
  ...stats(cuValues),
  widest: [...pairs].sort((a, b) => b.deltaE - a.deltaE).slice(0, 3)
    .map(({ code, deltaE, coatedHex, uncoatedHex }) => ({ code, deltaE, coatedHex, uncoatedHex })),
  under2: cuValues.filter((v) => v < 2).length,
  over5: cuValues.filter((v) => v >= 5).length,
  over10: cuValues.filter((v) => v >= 10).length,
};

const tacValues = COATED.map((e) => tacOf(e.cmyk));
const tacHistogram = {
  buckets: histogram(tacValues, [
    [0, 50, 'Under 50%'], [50, 100, '50 – 100%'], [100, 150, '100 – 150%'],
    [150, 200, '150 – 200%'], [200, 250, '200 – 250%'], [250, Infinity, '250% and over'],
  ]),
  ...stats(tacValues),
  heaviest: [...COATED].sort((a, b) => tacOf(b.cmyk) - tacOf(a.cmyk)).slice(0, 3)
    .map((e) => ({ code: displayCode(e.name), tac: tacOf(e.cmyk), cmyk: e.cmyk })),
};

// sRGB gamut-wall clipping: a published screen value with a channel at 0 or 255
// is sitting on the edge of what a display can render, which is the honest
// screen-side signal that the ink itself has nowhere left to go.
const clippedEntries = COATED.filter((e) => [e.rgb.r, e.rgb.g, e.rgb.b].some((v) => v === 0 || v === 255));
const srgbClipping = {
  total: COATED.length,
  clipped: clippedEntries.length,
  pct: Math.round((clippedEntries.length / COATED.length) * 1000) / 10,
  byChannelCount: [1, 2, 3].map((n) => ({
    channels: n,
    count: clippedEntries.filter(
      (e) => [e.rgb.r, e.rgb.g, e.rgb.b].filter((v) => v === 0 || v === 255).length === n,
    ).length,
  })),
};

// ─── Hardest builds for four-colour process ──────────────────────────────────

const noHeadroom = COATED
  .map((e) => ({
    code: displayCode(e.name),
    name: e.name,
    hex: rgbToHex(e.rgb.r, e.rgb.g, e.rgb.b),
    cmyk: e.cmyk,
    tac: tacOf(e.cmyk),
    maxInk: maxChromatic(e.cmyk),
    heavy: heavyInks(e.cmyk),
  }))
  .filter((r) => r.heavy > 0)
  .sort((a, b) => b.heavy - a.heavy || b.tac - a.tac);

const hardestForProcess = noHeadroom.slice(0, 25);

// ─── Ink-build comparison bars ───────────────────────────────────────────────

const INK_BUILD = [
  'YELLOW-C', 'ORANGE-021-C', '186-C', '485-C',
  '355-C', 'REFLEX-BLUE-C', '266-C', 'BLACK-C',
];
const inkBuild = INK_BUILD.map((c) => {
  const e = need(c);
  return {
    code: displayCode(c),
    hex: rgbToHex(e.rgb.r, e.rgb.g, e.rgb.b),
    cmyk: e.cmyk,
    tac: tacOf(e.cmyk),
  };
});

// ─── Write ───────────────────────────────────────────────────────────────────

const counts = db.reduce((acc, e) => {
  acc[e.collection] = (acc[e.collection] || 0) + 1;
  return acc;
}, {});

const out = {
  generatedBy: 'scripts/build-color-stats.mjs',
  source: 'data/pantone.json',
  generatedAt: new Date().toISOString().slice(0, 10),
  method: {
    lab: 'sRGB to CIE XYZ to CIELAB, D65 illuminant, 2 degree standard observer',
    deltaE: 'CIEDE2000 (Sharma, Wu & Dalal 2005), kL = kC = kH = 1',
    contrast: 'WCAG 2.2 relative-luminance contrast ratio',
    cmykIsDerived: CMYK_IS_DERIVED,
    cmykNote: CMYK_IS_DERIVED
      ? 'CMYK breakdowns in data/pantone.json are derived from each colour’s published sRGB value by the standard non-colour-managed formula, not measured off a press.'
      : 'CMYK breakdowns in data/pantone.json are no longer a pure sRGB derivation — revisit the gamut caveats on /pantone-to-cmyk/.',
  },
  counts: { total: db.length, ...counts },
  chart,
  families: FAMILIES.map(([family]) => family),
  coatedUncoated,
  cuHistogram,
  tacHistogram,
  srgbClipping,
  hardestForProcess,
  noHeadroomCount: noHeadroom.length,
  inkBuild,
};

writeFileSync(join(DATA_DIR, 'color-stats.json'), `${JSON.stringify(out, null, 2)}\n`);

console.log(
  `color-stats.json -> ${chart.length} chart colours, ${pairs.length} C/U pairs, ` +
  `${noHeadroom.length} no-headroom builds, cmykIsDerived=${CMYK_IS_DERIVED}`,
);
