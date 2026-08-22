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
