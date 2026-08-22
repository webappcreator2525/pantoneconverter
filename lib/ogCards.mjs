/**
 * One source of truth for every Open Graph card on the site.
 *
 * Read by two consumers:
 *   - scripts/generate-og.mjs  → renders the PNGs into public/
 *   - components/socialMeta.jsx → emits the og:image / twitter:image tags
 *
 * Keys are canonical paths (trailing slash, matching next.config trailingSlash).
 * Any page not listed here falls back to the site-wide card.
 */

export const SITE_URL = 'https://pantoneconverter.com';
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export const DEFAULT_CARD = {
  file: 'og-image.png',
  titleLines: ['Free CMYK, HEX, RGB', 'to Pantone Converter'],
  subtitle: 'Instant PMS matching across 2,600+ Pantone colors — no login.',
  alt: 'PantoneConverter.com — free CMYK, HEX, RGB and HSL to Pantone converter',
};

export const OG_CARDS = {
  '/': DEFAULT_CARD,

  '/cmyk-to-pantone/': {
    file: 'og/cmyk-to-pantone.png',
    titleLines: ['CMYK to Pantone', 'Converter'],
    subtitle: 'Enter any CMYK value, get the closest Pantone PMS match instantly.',
    alt: 'CMYK to Pantone converter on PantoneConverter.com',
  },
  '/hex-to-pantone/': {
    file: 'og/hex-to-pantone.png',
    titleLines: ['HEX to Pantone', 'Converter'],
    subtitle: 'Paste any HEX code and find its closest Pantone PMS match.',
    alt: 'HEX to Pantone converter on PantoneConverter.com',
  },
  '/rgb-to-pantone/': {
    file: 'og/rgb-to-pantone.png',
    titleLines: ['RGB to Pantone', 'Converter'],
    subtitle: 'Turn any RGB value into the closest Pantone PMS match instantly.',
    alt: 'RGB to Pantone converter on PantoneConverter.com',
  },
  '/hsl-to-pantone/': {
    file: 'og/hsl-to-pantone.png',
    titleLines: ['HSL to Pantone', 'Converter'],
    subtitle: 'Convert hue, saturation and lightness to the closest Pantone match.',
    alt: 'HSL to Pantone converter on PantoneConverter.com',
  },
  '/pantone-finder/': {
    file: 'og/pantone-finder.png',
    titleLines: ['Pantone Color', 'Finder'],
    subtitle: 'Browse and search the complete Pantone PMS library — free, no login.',
    alt: 'Pantone color finder on PantoneConverter.com',
  },
  '/about/': {
    file: 'og/about.png',
    titleLines: ['About', 'PantoneConverter'],
    subtitle: 'Who builds these free color tools, and how the matching works.',
    alt: 'About PantoneConverter.com',
  },
  '/image-to-pantone/': {
    file: 'og/image-to-pantone.png',
    titleLines: ['Image to Pantone', 'Extractor'],
    subtitle: 'Upload any image and pull its dominant colors as Pantone matches.',
    alt: 'Image to Pantone color extractor on PantoneConverter.com',
  },
  '/compare/': {
    file: 'og/compare.png',
    titleLines: ['Compare Two', 'Pantone Colors'],
    subtitle: 'Put two PMS colors side by side and see the exact difference.',
    alt: 'Pantone color comparison tool on PantoneConverter.com',
  },
  '/pantone-to-hex/': {
    file: 'og/pantone-to-hex.png',
    titleLines: ['Pantone to HEX', 'Converter'],
    subtitle: 'Look up the HEX value of any Pantone PMS color instantly.',
    alt: 'Pantone to HEX converter on PantoneConverter.com',
  },
  '/pantone-to-rgb/': {
    file: 'og/pantone-to-rgb.png',
    titleLines: ['Pantone to RGB', 'Converter'],
    subtitle: 'Look up the RGB value of any Pantone PMS color instantly.',
    alt: 'Pantone to RGB converter on PantoneConverter.com',
  },
  '/pantone-to-cmyk/': {
    file: 'og/pantone-to-cmyk.png',
    titleLines: ['Pantone to CMYK', 'Converter'],
    subtitle: 'Look up the CMYK breakdown of any Pantone PMS color instantly.',
    alt: 'Pantone to CMYK converter on PantoneConverter.com',
  },
  '/brands/': {
    file: 'og/brands.png',
    titleLines: ['Brand Color', 'Palettes'],
    subtitle: 'Pantone, HEX and CMYK values for the best-known brands.',
    alt: 'Brand color palettes on PantoneConverter.com',
  },
  '/learn/': {
    file: 'og/learn.png',
    titleLines: ['Pantone Guides', '& Tutorials'],
    subtitle: 'Free guides on Pantone, color conversion, CMYK vs RGB and print.',
    alt: 'Pantone guides and tutorials on PantoneConverter.com',
  },

  // Colour hub pages. `color` drives the card palette (see colorTheme() in
  // scripts/og-template.mjs) and `swatches` are the page's own Pantone shades.
  // Yellow, gold and white flip to a pale card with dark type automatically —
  // white type cannot sit on them at an accessible contrast ratio.
  '/pantone-red/': {
    file: 'og/pantone-red.png',
    color: '#EF3340',
    swatches: ['#EF3340', '#E4002B', '#C8102E', '#DA291C', '#C63527', '#9B2335'],
    titleLines: ['Pantone Red', 'Color Codes'],
    subtitle: 'Red 032 C, 185 C, 186 C and 485 C — HEX, RGB and CMYK.',
    alt: 'Pantone red color codes with HEX, RGB and CMYK values',
  },
  '/pantone-blue/': {
    file: 'og/pantone-blue.png',
    color: '#10069F',
    swatches: ['#10069F', '#001489', '#0032A0', '#005EB8', '#003DA5', '#009CDE'],
    titleLines: ['Pantone Blue', 'Color Codes'],
    subtitle: 'Reflex Blue, 286 C, 300 C and Process Blue — HEX, RGB and CMYK.',
    alt: 'Pantone blue color codes with HEX, RGB and CMYK values',
  },
  '/pantone-green/': {
    file: 'og/pantone-green.png',
    color: '#00A550',
    swatches: ['#00A550', '#009A44', '#00843D', '#007A53', '#74AA50', '#54B948'],
    titleLines: ['Pantone Green', 'Color Codes'],
    subtitle: 'Green C, 354 C and 347 C — HEX, RGB and CMYK values.',
    alt: 'Pantone green color codes with HEX, RGB and CMYK values',
  },
  '/pantone-yellow/': {
    file: 'og/pantone-yellow.png',
    color: '#FFED00',
    swatches: ['#FFED00', '#FFD700', '#FFD100', '#FFCD00', '#FFB81C', '#F6BE00'],
    titleLines: ['Pantone Yellow', 'Color Codes'],
    subtitle: 'Yellow C, 012 C, 109 C and 116 C — HEX, RGB and CMYK.',
    alt: 'Pantone yellow color codes with HEX, RGB and CMYK values',
  },
  '/pantone-orange/': {
    file: 'og/pantone-orange.png',
    color: '#FE5000',
    swatches: ['#FE5000', '#FF6820', '#FF6A13', '#E35205', '#FF8200', '#E87722'],
    titleLines: ['Pantone Orange', 'Color Codes'],
    subtitle: 'Orange 021 C, 151 C and 1655 C — HEX, RGB and CMYK.',
    alt: 'Pantone orange color codes with HEX, RGB and CMYK values',
  },
  '/pantone-pink/': {
    file: 'og/pantone-pink.png',
    color: '#E10098',
    swatches: ['#FF3EB5', '#E10098', '#DA1884', '#D0006F', '#F4AEC0', '#F7A8D0'],
    titleLines: ['Pantone Pink', 'Color Codes'],
    subtitle: 'Rhodamine Red C, 812 C and 218 C — HEX, RGB and CMYK.',
    alt: 'Pantone pink color codes with HEX, RGB and CMYK values',
  },
  '/pantone-purple/': {
    file: 'og/pantone-purple.png',
    color: '#440099',
    swatches: ['#440099', '#330072', '#522398', '#26147E', '#5C2D82', '#9B26AF'],
    titleLines: ['Pantone Purple', 'Color Codes'],
    subtitle: 'Violet C, 267 C and 2685 C — HEX, RGB and CMYK values.',
    alt: 'Pantone purple color codes with HEX, RGB and CMYK values',
  },
  '/pantone-gold/': {
    file: 'og/pantone-gold.png',
    color: '#FFC72C',
    swatches: ['#85754E', '#8B6914', '#FFC72C', '#FFB81C', '#C6A900', '#E8D48B'],
    titleLines: ['Pantone Gold', 'Color Codes'],
    subtitle: 'Metallic 871 C and 874 C, warm 123 C and 1235 C.',
    alt: 'Pantone gold color codes with HEX, RGB and CMYK values',
  },
  '/pantone-black/': {
    file: 'og/pantone-black.png',
    color: '#2D2926',
    swatches: ['#2D2926', '#101820', '#212721', '#4E3629', '#3D3935', '#1A1A18'],
    titleLines: ['Pantone Black', 'Color Codes'],
    subtitle: 'Black C, Black 6 C and Process Black — HEX, RGB and CMYK.',
    alt: 'Pantone black color codes with HEX, RGB and CMYK values',
  },
  '/pantone-white/': {
    file: 'og/pantone-white.png',
    color: '#FFFFFF',
    swatches: ['#FFFFFF', '#F4F5F0', '#EDF1FE', '#F3EFE0', '#E2E6E0', '#F0F0F0'],
    titleLines: ['Pantone White', 'Color Codes'],
    subtitle: 'Bright White, Brilliant White, ivory and cream shades.',
    alt: 'Pantone white color codes with HEX, RGB and CMYK values',
  },

  // Category A — industrial colour systems. `color` sets the card's accent and
  // `swatches` are drawn from each standard's own palette, so the card previews
  // the system it is about rather than the site's default purple.
  '/pantone-to-ral/': {
    file: 'og/pantone-to-ral.png',
    color: '#C1121C',
    swatches: ['#C1121C', '#F7B500', '#008754', '#00387B', '#373F43', '#F7F9EF'],
    titleLines: ['Pantone to RAL', 'Converter'],
    subtitle: 'Find the closest RAL Classic code for any Pantone colour, ranked by ΔE.',
    alt: 'Pantone to RAL Classic colour converter on PantoneConverter.com',
  },
  '/ral-to-pantone/': {
    file: 'og/ral-to-pantone.png',
    color: '#C1121C',
    swatches: ['#F7F9EF', '#373F43', '#00387B', '#008754', '#F7B500', '#C1121C'],
    titleLines: ['RAL to Pantone', 'Converter'],
    subtitle: 'Look up the nearest Pantone PMS match for any RAL Classic code.',
    alt: 'RAL Classic to Pantone colour converter on PantoneConverter.com',
  },
  '/pantone-to-ncs/': {
    file: 'og/pantone-to-ncs.png',
    color: '#0284c7',
    swatches: ['#0080BE', '#3FADB5', '#009E5F', '#FBDA00', '#D62E2E', '#8763AC'],
    titleLines: ['Pantone to NCS', 'Converter'],
    subtitle: 'Translate Pantone colours into Natural Colour System notation.',
    alt: 'Pantone to NCS Natural Colour System converter on PantoneConverter.com',
  },
  '/pantone-to-hks/': {
    file: 'og/pantone-to-hks.png',
    color: '#6d28d9',
    swatches: ['#E30613', '#F98E00', '#FFED00', '#009465', '#005893', '#4F1A73'],
    titleLines: ['Pantone to HKS', 'Converter'],
    subtitle: 'Match Pantone colours to the HKS spot inks used in German print.',
    alt: 'Pantone to HKS spot colour converter on PantoneConverter.com',
  },
  '/pantone-to-toyo/': {
    file: 'og/pantone-to-toyo.png',
    color: '#be123c',
    swatches: ['#E60039', '#EF7F00', '#FFE100', '#00954F', '#0070BC', '#7B3F98'],
    titleLines: ['Pantone to TOYO', 'Converter'],
    subtitle: 'Cross-reference Pantone against the TOYO Color Finder deck.',
    alt: 'Pantone to TOYO Color Finder converter on PantoneConverter.com',
  },
  '/pantone-to-trumatch/': {
    file: 'og/pantone-to-trumatch.png',
    color: '#059669',
    swatches: ['#FFFF00', '#FF8000', '#FF0000', '#FF00FF', '#0000FF', '#00FF80'],
    titleLines: ['Pantone to', 'Trumatch'],
    subtitle: 'Map Pantone spot colours onto the Trumatch four-colour CMYK deck.',
    alt: 'Pantone to Trumatch CMYK colour converter on PantoneConverter.com',
  },
  '/pantone-to-federal-standard-595/': {
    file: 'og/pantone-to-federal-standard-595.png',
    color: '#4d7c0f',
    swatches: ['#4A4B39', '#333F30', '#9C8460', '#8B9193', '#2A3F5C', '#232323'],
    titleLines: ['Pantone to', 'Federal Standard 595'],
    subtitle: 'Find the nearest FS 595 chip for defence and aerospace paint work.',
    alt: 'Pantone to Federal Standard 595 colour converter on PantoneConverter.com',
  },
  '/pantone-to-lab/': {
    file: 'og/pantone-to-lab.png',
    color: '#0f766e',
    titleLines: ['Pantone to LAB', 'Converter'],
    subtitle: 'Device-independent CIELAB L*a*b* values for any Pantone colour.',
    alt: 'Pantone to CIELAB colour converter on PantoneConverter.com',
  },
  '/lab-to-pantone/': {
    file: 'og/lab-to-pantone.png',
    color: '#0891b2',
    titleLines: ['LAB to Pantone', 'Converter'],
    subtitle: 'Enter L*a*b* measurements and find the closest Pantone colour by ΔE.',
    alt: 'CIELAB to Pantone colour converter on PantoneConverter.com',
  },
  '/pantone-to-hsv/': {
    file: 'og/pantone-to-hsv.png',
    color: '#9333ea',
    titleLines: ['Pantone to HSV', 'Converter'],
    subtitle: 'Hue, saturation and brightness values for any Pantone colour.',
    alt: 'Pantone to HSV and HSB colour converter on PantoneConverter.com',
  },
  '/hsv-to-pantone/': {
    file: 'og/hsv-to-pantone.png',
    color: '#c026d3',
    titleLines: ['HSV to Pantone', 'Converter'],
    subtitle: 'Turn hue, saturation and value into the nearest Pantone match.',
    alt: 'HSV and HSB to Pantone colour converter on PantoneConverter.com',
  },

  // Category B — craft materials and paint brands. Swatches are drawn from each
  // brand's own range so the card previews the material it is about.
  '/pantone-to-dmc/': {
    file: 'og/pantone-to-dmc.png',
    color: '#be185d',
    swatches: ['#C72B3B', '#FFD700', '#217A4D', '#1B5391', '#94538A', '#B87748'],
    titleLines: ['Pantone to DMC', 'Converter'],
    subtitle: 'Find the closest DMC embroidery floss number for any Pantone colour.',
    alt: 'Pantone to DMC embroidery floss converter on PantoneConverter.com',
  },
  '/pantone-to-copic/': {
    file: 'og/pantone-to-copic.png',
    color: '#4338ca',
    swatches: ['#EF4136', '#F4791F', '#FFF200', '#00A651', '#00AEEF', '#7E4EA0'],
    titleLines: ['Pantone to Copic', 'Converter'],
    subtitle: 'Match Pantone colours to Copic alcohol marker codes.',
    alt: 'Pantone to Copic marker converter on PantoneConverter.com',
  },
  '/pantone-to-oracal/': {
    file: 'og/pantone-to-oracal.png',
    color: '#0d9488',
    swatches: ['#D42132', '#F26A21', '#FFD100', '#1E7B45', '#0075BE', '#5B2A86'],
    titleLines: ['Pantone to', 'Oracal 651 Vinyl'],
    subtitle: 'Find the nearest ORACAL 651 adhesive vinyl colour for cutting.',
    alt: 'Pantone to ORACAL 651 vinyl converter on PantoneConverter.com',
  },
  '/pantone-to-siser-htv/': {
    file: 'og/pantone-to-siser-htv.png',
    color: '#c2410c',
    swatches: ['#C8102E', '#F26522', '#FFD400', '#1E7B45', '#1B4B9B', '#5B2C86'],
    titleLines: ['Pantone to', 'Siser HTV'],
    subtitle: 'Match Pantone to Siser EasyWeed heat transfer vinyl for garments.',
    alt: 'Pantone to Siser EasyWeed HTV converter on PantoneConverter.com',
  },
  '/pantone-to-sherwin-williams/': {
    file: 'og/pantone-to-sherwin-williams.png',
    color: '#1d4ed8',
    swatches: ['#EDEAE0', '#D1CBC1', '#CCC9C0', '#8C857C', '#2E3D4E', '#2F2F30'],
    titleLines: ['Pantone to', 'Sherwin-Williams'],
    subtitle: 'Find the closest Sherwin-Williams paint colour for any Pantone.',
    alt: 'Pantone to Sherwin-Williams paint converter on PantoneConverter.com',
  },
  '/pantone-to-benjamin-moore/': {
    file: 'og/pantone-to-benjamin-moore.png',
    color: '#15803d',
    swatches: ['#F0EDE3', '#CCC5B6', '#D6CFC2', '#8A857A', '#3D4A57', '#333338'],
    titleLines: ['Pantone to', 'Benjamin Moore'],
    subtitle: 'Match a Pantone colour to the Benjamin Moore paint collections.',
    alt: 'Pantone to Benjamin Moore paint converter on PantoneConverter.com',
  },
  '/pantone-to-dulux/': {
    file: 'og/pantone-to-dulux.png',
    color: '#7e22ce',
    swatches: ['#EDE7DC', '#DCD2BE', '#8FA0AA', '#C6CFC6', '#3E5A78', '#2A2C2E'],
    titleLines: ['Pantone to Dulux', 'Converter'],
    subtitle: 'Find the nearest Dulux paint colour for UK and Australian projects.',
    alt: 'Pantone to Dulux paint converter on PantoneConverter.com',
  },
  '/pantone-to-farrow-and-ball/': {
    file: 'og/pantone-to-farrow-and-ball.png',
    color: '#57534e',
    swatches: ['#EDE6D4', '#C4B8AC', '#A4A89C', '#7C8078', '#333F48', '#2E2E2C'],
    titleLines: ['Pantone to', 'Farrow & Ball'],
    subtitle: 'Match Pantone to the Farrow & Ball designer paint palette.',
    alt: 'Pantone to Farrow and Ball paint converter on PantoneConverter.com',
  },
  '/pantone-to-behr/': {
    file: 'og/pantone-to-behr.png',
    color: '#b45309',
    swatches: ['#F4F4F0', '#E4DECE', '#D4D0C8', '#94968E', '#4A5460', '#4A4A48'],
    titleLines: ['Pantone to Behr', 'Converter'],
    subtitle: 'Find the closest Behr paint colour available at Home Depot.',
    alt: 'Pantone to Behr paint converter on PantoneConverter.com',
  },

  // Category C — fashion and textile Pantone. Swatches are Colors of the Year,
  // which are the TCX codes most people arrive already knowing.
  '/tcx-to-hex/': {
    file: 'og/tcx-to-hex.png',
    color: '#db2777',
    swatches: ['#0F4C81', '#BB2649', '#FFBE98', '#A47764', '#88B04B', '#939597'],
    titleLines: ['TCX to HEX', 'Converter'],
    subtitle: 'Screen values for any Pantone Fashion, Home + Interiors colour.',
    alt: 'Pantone TCX to HEX and RGB converter on PantoneConverter.com',
  },
  '/hex-to-tcx/': {
    file: 'og/hex-to-tcx.png',
    color: '#e11d48',
    swatches: ['#939597', '#88B04B', '#A47764', '#FFBE98', '#BB2649', '#0F4C81'],
    titleLines: ['HEX to TCX', 'Converter'],
    subtitle: 'Turn a screen colour into a Pantone code your mill can dye to.',
    alt: 'HEX to Pantone TCX textile colour converter on PantoneConverter.com',
  },
  '/pantone-c-to-tcx/': {
    file: 'og/pantone-c-to-tcx.png',
    color: '#6366f1',
    swatches: ['#c8102e', '#0F4C81', '#0033a0', '#BB2649', '#009639', '#88B04B'],
    titleLines: ['Pantone C to TCX', 'Converter'],
    subtitle: 'Cross a graphic PMS number over to the fashion TCX library.',
    alt: 'Pantone PMS coated to TCX fashion colour converter on PantoneConverter.com',
  },
  '/tcx-vs-tpx-vs-tpg/': {
    file: 'og/tcx-vs-tpx-vs-tpg.png',
    color: '#0e7490',
    swatches: ['#0F4C81', '#6667AB', '#BB2649', '#FFBE98', '#A47764', '#F0EEE9'],
    titleLines: ['TCX vs TPX', 'vs TPG'],
    subtitle: 'Which Pantone textile format is which, and which one to specify.',
    alt: 'Guide comparing Pantone TCX, TPX and TPG textile colour formats',
  },
  '/pantone-textile-to-cmyk/': {
    file: 'og/pantone-textile-to-cmyk.png',
    color: '#ea580c',
    swatches: ['#0F4C81', '#BB2649', '#FFBE98', '#88B04B', '#A47764', '#2B2B2B'],
    titleLines: ['Pantone Textile', 'to CMYK'],
    subtitle: 'CMYK starting builds for sublimation and direct-to-garment print.',
    alt: 'Pantone textile TCX to CMYK converter for fabric printing',
  },

  // Learn articles — the slugs and file names match the `ogImage` frontmatter
  // in content/learn/*.mdx, which previously pointed at missing files.
  '/learn/what-is-pantone/': {
    file: 'og/what-is-pantone.png',
    titleLines: ['What Is Pantone?'],
    subtitle: 'A designer’s guide to the PMS color system, and how it differs from CMYK.',
    alt: 'Guide: what is Pantone and how the PMS color system works',
  },
  '/learn/what-is-cmyk/': {
    file: 'og/what-is-cmyk.png',
    titleLines: ['What Is CMYK?'],
    subtitle: 'How the four-color print model works, and why it differs from RGB.',
    alt: 'Guide: what is CMYK and how the four-color print model works',
  },
  '/learn/cmyk-vs-rgb/': {
    file: 'og/cmyk-vs-rgb.png',
    titleLines: ['CMYK vs RGB'],
    subtitle: 'The real difference between the two models, and when to use each.',
    alt: 'Guide: CMYK vs RGB colour models compared',
  },
  '/learn/coated-vs-uncoated/': {
    file: 'og/coated-vs-uncoated.png',
    titleLines: ['Pantone Coated', 'vs Uncoated'],
    subtitle: 'Why the same PMS number looks different on C and U stock.',
    alt: 'Guide: Pantone coated versus uncoated paper stock',
  },
  '/learn/how-to-convert-hex-to-pantone/': {
    file: 'og/how-to-convert-hex-to-pantone.png',
    titleLines: ['How to Convert', 'HEX to Pantone'],
    subtitle: 'The process, the limitations, and how to get an accurate match.',
    alt: 'Step-by-step guide to converting HEX codes to Pantone',
  },
  '/learn/how-to-convert-cmyk-to-pantone/': {
    file: 'og/how-to-convert-cmyk-to-pantone.png',
    titleLines: ['How to Convert', 'CMYK to Pantone'],
    subtitle: 'By hand, in Adobe software, and with free online tools.',
    alt: 'Step-by-step guide to converting CMYK values to Pantone',
  },
  '/learn/pantone-for-beginners/': {
    file: 'og/pantone-for-beginners.png',
    titleLines: ['Pantone', 'for Beginners'],
    subtitle: 'Reading PMS codes, coated vs uncoated, and Pantone vs CMYK.',
    alt: 'Beginner guide to the Pantone Matching System',
  },
  '/learn/brand-color-consistency/': {
    file: 'og/brand-color-consistency.png',
    titleLines: ['Brand Color', 'Consistency'],
    subtitle: 'Keeping colors accurate across print, screen and product.',
    alt: 'Guide to keeping brand colors consistent across print and digital',
  },
};

/** Normalises a path to the trailing-slash form used as a key above. */
function normalise(path) {
  if (!path) return '/';
  const withLeading = path.startsWith('/') ? path : `/${path}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

/**
 * Sub-pages inherit their section's card: every article under /learn/ gets the
 * learn card, every brand page the brands card.
 */
const SECTION_FALLBACKS = ['/learn/', '/brands/'];

/** Strips the origin off a canonical URL, e.g. for pages that only hold one. */
export function pathFrom(url) {
  return url.replace(SITE_URL, '') || '/';
}

/**
 * Absolute image URL + alt text for a page.
 * `override` lets MDX frontmatter point at a bespoke image.
 */
export function ogImageFor(path, override) {
  if (override) {
    return { url: `${SITE_URL}${override}`, alt: DEFAULT_CARD.alt };
  }
  const key = normalise(path);
  const section = SECTION_FALLBACKS.find((p) => key !== p && key.startsWith(p));
  const card = OG_CARDS[key] ?? OG_CARDS[section] ?? DEFAULT_CARD;
  return { url: `${SITE_URL}/${card.file}`, alt: card.alt };
}
