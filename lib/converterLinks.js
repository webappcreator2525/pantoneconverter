/**
 * One description per internal destination, so the "Related tools & guides"
 * block reads the same wherever it appears and a wording change lands
 * everywhere at once.
 *
 * `relatedFor(slug, [...extra])` builds a page's block: the sibling pages named
 * in INDUSTRIAL_SIBLINGS, then the four evergreen destinations every Category A
 * page is required to link to, with the page's own slug filtered out.
 */

export const LINKS = {
  // ── Category A — industrial colour systems ──────────────────────
  '/pantone-to-ral/': {
    label: 'Pantone → RAL',
    description: 'Find the closest RAL Classic code for any Pantone colour.',
  },
  '/ral-to-pantone/': {
    label: 'RAL → Pantone',
    description: 'Look up the nearest Pantone PMS match for any RAL Classic code.',
  },
  '/pantone-to-ncs/': {
    label: 'Pantone → NCS',
    description: 'Translate Pantone spot colours into Natural Colour System notation.',
  },
  '/pantone-to-hks/': {
    label: 'Pantone → HKS',
    description: 'Match Pantone colours to the HKS spot-ink system used in German print.',
  },
  '/pantone-to-toyo/': {
    label: 'Pantone → TOYO',
    description: 'Cross-reference Pantone against the TOYO Color Finder deck.',
  },
  '/pantone-to-trumatch/': {
    label: 'Pantone → Trumatch',
    description: 'Map Pantone spot colours onto the Trumatch four-colour CMYK deck.',
  },
  '/pantone-to-federal-standard-595/': {
    label: 'Pantone → FS 595',
    description: 'Find the nearest Federal Standard 595 chip for defence and aerospace work.',
  },
  '/pantone-to-lab/': {
    label: 'Pantone → LAB',
    description: 'Get device-independent CIELAB values for any Pantone colour.',
  },
  '/lab-to-pantone/': {
    label: 'LAB → Pantone',
    description: 'Enter L*a*b* measurements and find the closest Pantone colour by ΔE.',
  },
  '/pantone-to-hsv/': {
    label: 'Pantone → HSV',
    description: 'Convert Pantone colours to the HSV / HSB values design tools use.',
  },
  '/hsv-to-pantone/': {
    label: 'HSV → Pantone',
    description: 'Turn hue, saturation and value into the nearest Pantone match.',
  },

  // ── Category B — craft materials and paint brands ───────────────
  '/pantone-to-dmc/': {
    label: 'Pantone → DMC',
    description: 'Find the closest DMC embroidery floss number for any Pantone colour.',
  },
  '/pantone-to-copic/': {
    label: 'Pantone → Copic',
    description: 'Match Pantone colours to Copic alcohol marker codes.',
  },
  '/pantone-to-oracal/': {
    label: 'Pantone → Oracal 651',
    description: 'Find the nearest ORACAL 651 adhesive vinyl colour for cutting.',
  },
  '/pantone-to-siser-htv/': {
    label: 'Pantone → Siser HTV',
    description: 'Match Pantone to Siser EasyWeed heat transfer vinyl for garments.',
  },
  '/pantone-to-sherwin-williams/': {
    label: 'Pantone → Sherwin-Williams',
    description: 'Find the closest Sherwin-Williams interior paint colour.',
  },
  '/pantone-to-benjamin-moore/': {
    label: 'Pantone → Benjamin Moore',
    description: 'Match a Pantone colour to the Benjamin Moore paint collections.',
  },
  '/pantone-to-dulux/': {
    label: 'Pantone → Dulux',
    description: 'Find the nearest Dulux paint colour for UK and Australian projects.',
  },
  '/pantone-to-farrow-and-ball/': {
    label: 'Pantone → Farrow & Ball',
    description: 'Match Pantone to the Farrow & Ball designer paint palette.',
  },
  '/pantone-to-behr/': {
    label: 'Pantone → Behr',
    description: 'Find the closest Behr paint colour available at Home Depot.',
  },

  // ── Category C — fashion and textile Pantone (TCX) ──────────────
  // A different Pantone library from the PMS codes the rest of the site
  // converts; the descriptions say so, because that is the whole confusion.
  '/tcx-to-hex/': {
    label: 'TCX → HEX / RGB',
    description: 'Get screen values for any Pantone Fashion & Home TCX textile colour.',
  },
  '/hex-to-tcx/': {
    label: 'HEX → TCX',
    description: 'Turn a screen colour into a Pantone TCX code your mill can dye to.',
  },
  '/pantone-c-to-tcx/': {
    label: 'Pantone C → TCX',
    description: 'Cross a graphic PMS number over to the fashion TCX library.',
  },
  '/tcx-vs-tpx-vs-tpg/': {
    label: 'TCX vs TPX vs TPG',
    description: 'Which Pantone textile format is which, and which one to specify.',
  },
  '/pantone-textile-to-cmyk/': {
    label: 'Pantone Textile → CMYK',
    description: 'Starting CMYK builds for sublimation and direct-to-garment printing.',
  },

  '/image-to-pantone/': {
    label: 'Image to Pantone',
    description: 'Upload any image and pull its dominant colours as Pantone matches.',
  },

  // ── Evergreen destinations ──────────────────────────────────────
  '/pantone-finder/': {
    label: 'Pantone Finder',
    description: 'Browse and search the full 3,200-colour Pantone library.',
  },
  '/compare/': {
    label: 'Compare Colours',
    description: 'Put two colours side by side and measure the exact difference.',
  },
  '/learn/what-is-pantone/': {
    label: 'What is Pantone?',
    description: 'How the PMS spot-colour system works and why print relies on it.',
  },
  '/learn/pantone-for-beginners/': {
    label: 'Pantone for Beginners',
    description: 'Reading PMS codes, coated vs uncoated, and where to start.',
  },
  '/learn/coated-vs-uncoated/': {
    label: 'Coated vs Uncoated',
    description: 'Why the same PMS number looks different on C and U stock.',
  },
  '/cmyk-to-pantone/': {
    label: 'CMYK → Pantone',
    description: 'Convert process CMYK builds to the closest Pantone spot colour.',
  },
  '/rgb-to-pantone/': {
    label: 'RGB → Pantone',
    description: 'Match any RGB value to the nearest Pantone swatch.',
  },
  '/hex-to-pantone/': {
    label: 'HEX → Pantone',
    description: 'Paste a HEX code and find its closest Pantone PMS match.',
  },
  '/hsl-to-pantone/': {
    label: 'HSL → Pantone',
    description: 'Convert hue, saturation and lightness to the closest Pantone match.',
  },
  '/pantone-to-hex/': {
    label: 'Pantone → HEX',
    description: 'Look up the HEX value of any Pantone PMS colour instantly.',
  },
  '/pantone-to-rgb/': {
    label: 'Pantone → RGB',
    description: 'Look up the RGB value of any Pantone PMS colour instantly.',
  },
  '/saved/': {
    label: 'Saved Colours',
    description: 'The colours you have starred, kept in this browser.',
  },
  '/pantone-to-cmyk/': {
    label: 'Pantone → CMYK',
    description: 'Get the CMYK breakdown behind any Pantone PMS colour.',
  },
};

/** Every Category A route, in the order they should appear in nav and footers. */
export const CATEGORY_A_ROUTES = [
  '/pantone-to-ral/',
  '/ral-to-pantone/',
  '/pantone-to-ncs/',
  '/pantone-to-hks/',
  '/pantone-to-toyo/',
  '/pantone-to-trumatch/',
  '/pantone-to-federal-standard-595/',
  '/pantone-to-lab/',
  '/lab-to-pantone/',
  '/pantone-to-hsv/',
  '/hsv-to-pantone/',
];

/** Every Category B route, in the order they should appear in nav and footers. */
export const CATEGORY_B_ROUTES = [
  '/pantone-to-dmc/',
  '/pantone-to-copic/',
  '/pantone-to-oracal/',
  '/pantone-to-siser-htv/',
  '/pantone-to-sherwin-williams/',
  '/pantone-to-benjamin-moore/',
  '/pantone-to-dulux/',
  '/pantone-to-farrow-and-ball/',
  '/pantone-to-behr/',
];

/** Every Category C route, in the order they should appear in nav and footers. */
export const CATEGORY_C_ROUTES = [
  '/tcx-to-hex/',
  '/hex-to-tcx/',
  '/pantone-c-to-tcx/',
  '/tcx-vs-tpx-vs-tpg/',
  '/pantone-textile-to-cmyk/',
];

/**
 * The converter taxonomy — one source of truth for the navigation, the footer
 * and the homepage grids. Adding a route here puts it in all three, which is
 * what stops them drifting apart as the site grows.
 */
export const CONVERTER_GROUPS = [
  {
    id: 'standard',
    title: 'Standard Converters',
    blurb: 'The everyday tools: CMYK, HEX, RGB and HSL against the Pantone PMS library.',
    routes: [
      '/cmyk-to-pantone/',
      '/hex-to-pantone/',
      '/rgb-to-pantone/',
      '/hsl-to-pantone/',
      '/image-to-pantone/',
      '/pantone-to-cmyk/',
      '/pantone-to-hex/',
      '/pantone-to-rgb/',
      '/pantone-finder/',
      '/compare/',
    ],
  },
  {
    id: 'industrial',
    title: 'Industrial Systems',
    blurb: 'Paint, coating and print standards: RAL, NCS, HKS, TOYO, Trumatch, FS 595, plus CIELAB and HSV.',
    routes: CATEGORY_A_ROUTES,
  },
  {
    id: 'craft',
    title: 'Craft & Brand',
    blurb: 'Materials you can buy: embroidery floss, markers, vinyl, heat transfer film and house paint.',
    routes: CATEGORY_B_ROUTES,
  },
  {
    id: 'textile',
    title: 'Textile & Fashion',
    blurb: 'Pantone TCX — the Fashion, Home + Interiors library, a different system from PMS.',
    routes: CATEGORY_C_ROUTES,
  },
];

/** Every converter route on the site, flattened. */
export const ALL_CONVERTER_ROUTES = CONVERTER_GROUPS.flatMap((g) => g.routes);

/**
 * Resolve a group's routes to { href, label, description } entries.
 * Throws on an unknown route so a typo fails loudly at build time rather than
 * silently dropping a link out of the navigation.
 */
export function groupLinks(group) {
  return group.routes.map((href) => {
    const link = LINKS[href];
    if (!link) throw new Error(`converterLinks: no LINKS entry for ${href}`);
    return { href, ...link };
  });
}

/** The four destinations every Category A page must link to. */
const EVERGREEN = [
  '/pantone-finder/',
  '/compare/',
  '/learn/what-is-pantone/',
  '/learn/pantone-for-beginners/',
];

/**
 * Build the related-links block for a page.
 *
 * @param {string}        self       The page's own path, filtered out of the result.
 * @param {Array<string>} siblings   Related converter pages to surface first.
 * @param {Array<string>} [tail]     Destinations to close with; defaults to EVERGREEN.
 * @returns {Array<{ href, label, description }>}
 */
export function relatedFor(self, siblings = [], tail = EVERGREEN) {
  const seen = new Set([self]);
  const out = [];

  for (const href of [...siblings, ...tail]) {
    if (seen.has(href)) continue;
    const link = LINKS[href];
    if (!link) continue;
    seen.add(href);
    out.push({ href, ...link });
  }

  return out;
}

/**
 * Category B pages bridge a screen colour to a physical material, so they close
 * on the two tools that help you find or sample a colour rather than on the
 * theory articles.
 */
export const CRAFT_EVERGREEN = [
  '/pantone-finder/',
  '/image-to-pantone/',
  '/learn/what-is-pantone/',
];

/**
 * Category C pages close on the three standard PMS converters. Fashion users
 * arriving on a TCX page frequently want the graphic-arts tools instead — and
 * the link text has to make clear those are a different Pantone library, not an
 * alternative route to the same answer.
 */
export const TEXTILE_EVERGREEN = [
  '/cmyk-to-pantone/',
  '/rgb-to-pantone/',
  '/hex-to-pantone/',
  '/pantone-finder/',
];
