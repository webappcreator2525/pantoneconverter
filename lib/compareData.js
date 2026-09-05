/**
 * Editorial content and pre-computed figures for /compare/.
 *
 * Every ΔE*00, HEX and CMYK figure below was produced by running the site's own
 * CIEDE2000 implementation (scripts/palette-lib.mjs, which mirrors
 * lib/colorUtils.js) over data/pantone.json and data/tcx.json. Nothing here is
 * estimated — if a value could not be computed from repo data, the row is not
 * in the table. Values are hardcoded rather than derived at render time so the
 * tables are present in the exported HTML for crawlers with no JavaScript.
 */

/** Section anchors, in page order. Drives both the table of contents and the H2s. */
export const COMPARE_SECTIONS = [
  { id: 'how-to-compare',      label: 'How to compare' },
  { id: 'delta-e-explained',   label: 'Understanding ΔE*00' },
  { id: 'coated-vs-uncoated',  label: 'Coated vs uncoated' },
  { id: 'popular-comparisons', label: 'Popular comparisons' },
  { id: 'close-enough',        label: 'Close enough to substitute?' },
  { id: 'cross-system',        label: 'Across other systems' },
  { id: 'accuracy',            label: 'Accuracy' },
  { id: 'faq',                 label: 'FAQ' },
  { id: 'related',             label: 'Related tools' },
];

// ─── ΔE*00 tolerance ladder ──────────────────────────────────────────────────
//
// Bands are the conventional commercial-printing reading of CIEDE2000. `span`
// is the visual weight each band gets on the ladder, not a data value.

export const DELTA_BANDS = [
  {
    range: '0 – 1.0',
    short: 'Invisible',
    seen: 'Not perceptible to the human eye',
    meaning: 'Treated as an exact match',
    color: '#15803d',
    tint: '#dcfce7',
    span: 1,
  },
  {
    range: '1.0 – 2.0',
    short: 'Trained eye',
    seen: 'Perceptible only to a trained eye on close inspection',
    meaning: 'Acceptable for most commercial printing',
    color: '#4d7c0f',
    tint: '#ecfccb',
    span: 1,
  },
  {
    range: '2.0 – 3.5',
    short: 'Side by side',
    seen: 'Perceptible on close side-by-side comparison',
    meaning: 'Common press tolerance for spot colours',
    color: '#a16207',
    tint: '#fef9c3',
    span: 1.5,
  },
  {
    range: '3.5 – 5.0',
    short: 'At a glance',
    seen: 'Clearly different on inspection, similar at a glance',
    meaning: 'Risky for brand colours; fine for backgrounds',
    color: '#c2410c',
    tint: '#ffedd5',
    span: 1.5,
  },
  {
    range: '5.0 – 10',
    short: 'Same family',
    seen: 'Obviously different colours of the same family',
    meaning: 'Not a substitute — a related colour',
    color: '#b91c1c',
    tint: '#fee2e2',
    span: 2.5,
  },
  {
    range: '10+',
    short: 'Unrelated',
    seen: 'Different colours',
    meaning: 'No relationship worth relying on',
    color: '#7f1d1d',
    tint: '#fecaca',
    span: 2,
  },
];

// ─── Coated vs uncoated ──────────────────────────────────────────────────────
//
// deltaE = CIEDE2000 between the coated and uncoated entries of the same PMS
// number in data/pantone.json.

export const COATED_UNCOATED_ROWS = [
  {
    pms: 'PMS 186',
    coatedName: 'Pantone 186-C',
    uncoatedName: 'Pantone 186-U',
    coatedHex: '#C8102E',
    uncoatedHex: '#D2515E',
    deltaE: 11.74,
    note: 'The classic brand red. Uncoated prints markedly lighter and duller — far too wide a gap to treat the two codes as interchangeable.',
  },
  {
    pms: 'PMS 286',
    coatedName: 'Pantone 286-C',
    uncoatedName: 'Pantone 286-U',
    coatedHex: '#0033A0',
    uncoatedHex: '#3255A4',
    deltaE: 10.64,
    note: 'A saturated corporate blue loses most of its depth on uncoated stock, which is why blue logos so often disappoint on kraft.',
  },
  {
    pms: 'PMS 2925',
    coatedName: 'Pantone 2925-C',
    uncoatedName: 'Pantone 2925-U',
    coatedHex: '#009CDE',
    uncoatedHex: '#4097DB',
    deltaE: 4.24,
    note: 'A mid-tone cyan holds up comparatively well. Still visible side by side, but this is the narrowest gap in the table.',
  },
  {
    pms: 'PMS Black',
    coatedName: 'Pantone BLACK-C',
    uncoatedName: 'Pantone BLACK-U',
    coatedHex: '#2D2926',
    uncoatedHex: '#615D59',
    deltaE: 17.32,
    note: 'The widest gap here. Black on uncoated stock reads as a dark warm grey because the paper scatters back so much light.',
  },
  {
    pms: 'PMS Cool Gray 9',
    coatedName: 'Pantone COOL-GRAY-9-C',
    uncoatedName: 'Pantone COOL-GRAY-9-U',
    coatedHex: '#75787B',
    uncoatedHex: '#898B8E',
    deltaE: 7.25,
    note: 'Greys shift mostly in lightness rather than hue, so the uncoated version stays neutral but sits noticeably higher on the scale.',
  },
  {
    pms: 'PMS 123',
    coatedName: 'Pantone 123-C',
    uncoatedName: 'Pantone 123-U',
    coatedHex: '#FFC72C',
    uncoatedHex: '#FFAC2A',
    deltaE: 9.87,
    note: 'A yellow that turns visibly more orange uncoated — a hue shift rather than a lightness shift, and the kind people notice.',
  },
];

// ─── The comparisons designers look up most ──────────────────────────────────

export const POPULAR_PAIRS = [
  {
    id: 'process-blue-vs-reflex-blue',
    title: 'Process Blue vs Reflex Blue',
    aLabel: 'Process Blue C',
    bLabel: 'Reflex Blue C',
    aName: 'Pantone PROCESS-BLUE-C',
    bName: 'Pantone REFLEX-BLUE-C',
    aHex: '#0085CA',
    bHex: '#001489',
    deltaE: 37.24,
    verdict: 'Not remotely the same blue — never substitute one for the other.',
    body: 'These two get confused constantly because both are described as "the standard Pantone blue", and both are base inks rather than mixed formulas. They are nothing alike. Process Blue is a bright cyan-leaning blue used as a stand-in for process cyan on spot jobs, while Reflex Blue is a deep violet-leaning blue that most people would call navy. At ΔE*00 37.2 they are not even in the same neighbourhood, and swapping them is one of the more common ways a print job goes visibly wrong.',
  },
  {
    id: 'pantone-black-c-vs-process-black',
    title: 'Pantone Black C vs Process Black',
    aLabel: 'Pantone Black C',
    bLabel: 'Process black, C0 M0 Y0 K100',
    aName: 'Pantone BLACK-C',
    bName: null,
    aHex: '#2D2926',
    bHex: '#000000',
    deltaE: 10.85,
    compareHref: null,
    verdict: 'Different things: one is a spot ink, the other is 100% K process black.',
    body: 'This comparison trips people up because Process Black is not a spot colour at all — it does not appear in the Pantone spot deck, and you will not find it in the picker above. It is the black process ink, specified as C0 M0 Y0 K100. Pantone Black C is a mixed spot ink with a distinctly warm, brownish cast, which is exactly why brands that want a rich neutral black on packaging pay for the spot. Against the flat 100% K rendering the site computes from that CMYK definition, Pantone Black C sits at ΔE*00 10.9 — a real, visible difference in warmth and density.',
  },
  {
    id: 'cool-gray-9-vs-warm-gray-9',
    title: 'Cool Gray 9 vs Warm Gray 9',
    aLabel: 'Cool Gray 9 C',
    bLabel: 'Warm Gray 9 C',
    aName: 'Pantone COOL-GRAY-9-C',
    bName: 'Pantone WARM-GRAY-9-C',
    aHex: '#75787B',
    bHex: '#83786F',
    deltaE: 8.62,
    verdict: 'Same lightness, opposite temperature — obvious once they are adjacent.',
    body: 'The number 9 in both names refers to the same step on the grey scale, so the two inks share a lightness and differ almost entirely in temperature. Cool Gray 9 carries a blue cast; Warm Gray 9 carries a brown one. In isolation either reads as "grey", which is why they get specified interchangeably by accident. At ΔE*00 8.6 they are unmistakably different once placed side by side, and mixing them across a set of brand materials looks like a printing error rather than a design choice.',
  },
  {
    id: '871-c-vs-872-c',
    title: '871 C (gold) vs 872 C (bronze)',
    aLabel: '871 C',
    bLabel: '872 C',
    aName: 'Pantone 871-C',
    bName: 'Pantone 872-C',
    aHex: '#84754E',
    bHex: '#85714D',
    deltaE: 2.82,
    verdict: 'Nearly identical as flat colour — the real difference is metallic, not chromatic.',
    body: '871 and 872 are the two metallic golds people compare most often, and flattened into sRGB they are almost the same colour: ΔE*00 2.82, barely past a commercial match. That number is honest about the flat rendering and misleading about the printed result. The difference between these inks is the metal flake — 871 is a yellower gold, 872 a deeper antique bronze — and metallic reflectance is exactly what a screen swatch cannot show. Treat the low ΔE as confirmation that you must judge these two from a physical metallic guide, not from this page.',
  },
  {
    id: '186-c-vs-485-c',
    title: '186 C vs 485 C — the two brand reds',
    aLabel: '186 C',
    bLabel: '485 C',
    aName: 'Pantone 186-C',
    bName: 'Pantone 485-C',
    aHex: '#C8102E',
    bHex: '#DA291C',
    deltaE: 8.72,
    verdict: 'Clearly different reds: 186 is blue-shade, 485 is orange-shade.',
    body: 'These are the two reds that carry most of the world\'s red branding, and the choice between them is a genuine decision rather than a rounding error. 186 is a cooler, blue-shade red — the Coca-Cola direction. 485 is a hotter, orange-shade red used where the brand wants urgency. At ΔE*00 8.7 they are firmly in "same family, different colour" territory, and either one substituted for the other will be spotted immediately by anyone who owns the brand guidelines.',
  },
  {
    id: 'classic-blue-tcx-vs-301-c',
    title: 'Classic Blue 19-4052 TCX vs its nearest coated PMS',
    aLabel: '19-4052 TCX Classic Blue',
    bLabel: '301 C',
    aName: null,
    bName: 'Pantone 301-C',
    aHex: '#0F4C81',
    bHex: '#004B87',
    deltaE: 0.87,
    compareHref: '/pantone-c-to-tcx/',
    compareLabel: 'Textile ↔ PMS',
    verdict: 'The closest coated PMS to Classic Blue, at a difference you cannot see.',
    body: 'Cross-deck questions are the other half of what people mean by "compare Pantone colours". Classic Blue, the 2020 Colour of the Year, is a TCX textile code and has no direct spot-ink equivalent, so the honest answer is a nearest neighbour: sweeping all 1,341 coated PMS colours by ΔE*00 puts Pantone 301 C closest at 0.87. That is below the threshold of perception on screen — but a TCX chip is dyed cotton and 301 C is ink on paper, so the two will never match under real light no matter what the number says.',
  },
];

// ─── Substitution tolerance by application ───────────────────────────────────

export const TOLERANCE_ROWS = [
  {
    application: 'Brand identity / logo',
    tolerance: 'Effectively 0 — use the specified code',
    why: 'A logo colour is a legal and recognition asset, not an aesthetic choice. Consistency across every touchpoint matters more than any single reproduction.',
    check: 'The brand guidelines, and whether a spot ink is budgeted at all.',
  },
  {
    application: 'Packaging (coated stock)',
    tolerance: 'ΔE*00 ≤ 2',
    why: 'Coated stock holds ink well and the pack is seen next to identical packs on a shelf, which makes small differences legible.',
    check: 'Batch-to-batch drift on press, and the varnish or laminate over the ink.',
  },
  {
    application: 'Packaging (uncoated / kraft)',
    tolerance: 'ΔE*00 ≤ 3.5',
    why: 'The substrate itself shifts the colour more than most substitutions would, so a tighter tolerance is not meaningful.',
    check: 'The paper\'s own base colour, and whether an uncoated PMS code exists.',
  },
  {
    application: 'Large-format signage',
    tolerance: 'ΔE*00 ≤ 5',
    why: 'Signage is judged at distance and under uncontrolled light, so perceptual thresholds widen considerably.',
    check: 'Viewing distance, daylight versus artificial light, and substrate gloss.',
  },
  {
    application: 'Textile & apparel',
    tolerance: 'Not a ΔE question',
    why: 'Textile colour lives in the TCX / TPG decks on dyed cotton or paper, and a coated PMS number is a starting point rather than an answer.',
    check: 'The correct TCX or TPG code, plus a lab dip on the actual fabric.',
  },
  {
    application: 'Screen-only (web, UI)',
    tolerance: 'ΔE*00 ≤ 3',
    why: 'sRGB delivery is consistent enough that small differences survive, and no ink or substrate is involved.',
    check: 'Contrast ratio against the background, and how the colour holds on OLED.',
  },
];

// ─── HowTo steps — also emitted as HowTo JSON-LD ─────────────────────────────

export const HOWTO_STEPS = [
  {
    name: 'Enter the first PMS code in Color A',
    text: 'Type the first Pantone code into the Color A box. The search takes the shorthand people actually use — “186 C”, “Cool Gray 9”, “Reflex Blue”, “Black 6 C” — with or without the hyphen, and matches it against all 3,231 colours in the library. Pick an entry from the suggestion list to lock it in.',
  },
  {
    name: 'Enter the second PMS code in Color B',
    text: 'Do the same in the Color B box. The swap button between the two fields flips A and B if you entered them the wrong way round, and the share button copies a link that reopens the page with both colours already selected, which is worth doing before you send a comparison to a printer.',
  },
  {
    name: 'Read the side-by-side swatch before the numbers',
    text: 'Judge hue first. Step back from the screen and look at the two panels together: if one reads warmer, greener or more violet than the other at arm\'s length, the numbers below will only confirm what you have already seen. If you cannot separate them by eye, the ΔE*00 figure tells you how much margin you actually have.',
  },
  {
    name: 'Read the ΔE*00 score against the tolerance ladder',
    text: 'The ΔE*00 (CIEDE2000) score is the perceptual distance between the two colours. Under 1 is imperceptible, 1–2 is a commercial match, 2–3.5 is the usual press tolerance for spot colours, and anything above 5 will read as a different colour to anyone looking.',
  },
  {
    name: 'Cross-check the values for your actual medium',
    text: 'Finally read the HEX, RGB and CMYK breakdown for the medium you are producing in. HEX and RGB matter for screen work, CMYK for process printing where the spot ink is being simulated, and neither replaces a physical guide if the job is going on press.',
  },
];

// ─── FAQ — mirrored verbatim into FAQPage JSON-LD ────────────────────────────

export const COMPARE_FAQS = [
  {
    q: 'What is a good ΔE value between two Pantone colours?',
    a: 'Below 1.0 the difference is not perceptible to the human eye and the two colours can be treated as an exact match. Between 1.0 and 2.0 counts as a commercial match — only a trained eye on close inspection will separate them. From 2.0 to 3.5 is the tolerance most presses work to for spot colours, and above 5.0 most people will simply call them different colours.',
  },
  {
    q: 'Why do two Pantone colours look identical on screen but different in print?',
    a: 'A screen emits light in sRGB; a spot ink reflects it. The HEX values shown here are sRGB approximations of a physical ink, and sRGB cannot display large parts of the Pantone gamut — several saturated oranges, greens and blues get clipped to the nearest displayable colour, which flattens genuine differences. Add an uncalibrated monitor and two inks that differ visibly on paper can render identically on screen.',
  },
  {
    q: 'Can I compare a coated and an uncoated Pantone colour?',
    a: 'Yes, and the tool will happily do it, but read the result as a substrate question rather than a colour question. 186 C and 186 U are the same ink on different paper, and they sit ΔE*00 11.7 apart. What the number is telling you is how much the paper changes the ink, not that someone chose the wrong colour. Specify the code that matches the stock you are actually printing on.',
  },
  {
    q: 'What is the difference between ΔE*00 and ΔE76?',
    a: 'ΔE76 is the original 1976 formula: a straight-line distance in CIELAB space. It is simple but perceptually uneven — it over-penalises differences in some hues and badly under-reports them in saturated blues. ΔE*00 (CIEDE2000) adds weighting functions for lightness, chroma and hue plus a correction for the blue region, so its numbers track what people actually see. This tool reports ΔE*00.',
  },
  {
    q: 'How many Pantone colours can I compare at once?',
    a: 'Two. The tool is built around a single A-versus-B comparison, because that is the decision most people are actually making and a two-way ΔE*00 figure is unambiguous. If you need to check one colour against a whole deck, use the Pantone Finder or one of the cross-system converters, which rank the five closest matches by ΔE*00 instead.',
  },
  {
    q: 'Is Process Blue the same as Reflex Blue?',
    a: 'No, and it is not close. Process Blue is a bright cyan-leaning blue that stands in for process cyan on spot jobs. Reflex Blue is a deep violet-leaning blue most people would describe as navy. They sit ΔE*00 37.2 apart, which is about as far apart as two colours with the same word in their name can get. Substituting one for the other is a visible printing error.',
  },
  {
    q: 'Can I compare a Pantone TCX colour with a Pantone C colour?',
    a: 'Not directly in this tool — the picker searches the spot-ink library, so TCX textile codes are not in it. The two decks are unrelated products: TCX is dyed cotton for fashion and interiors, C is printing ink on coated paper. Use the Pantone C to TCX converter for that crossing, and treat the result as a nearest neighbour by ΔE*00 rather than an equivalence.',
  },
  {
    q: 'Does this tool work for Pantone Extended Gamut or metallic colours?',
    a: 'Metallics yes, Extended Gamut no. The dataset covers 3,231 colours: 1,341 coated, 1,341 uncoated, 301 metallics, 196 pastels and neons, plus the Colour of the Year and skin-tone sets. Extended Gamut (XG) is not included. Bear in mind that a metallic ink is shown as a flat sRGB approximation, so ΔE*00 between two metallics tells you nothing about their reflectance.',
  },
  {
    q: 'Is this tool free, and do I need an account?',
    a: 'It is free and there is no signup, no login and no usage limit. The entire comparison — the colour library, the CIEDE2000 maths and the value breakdown — runs in your browser, so nothing you type is uploaded anywhere. You can share a comparison by copying the link, which encodes both colours in the URL rather than storing anything on a server.',
  },
];
