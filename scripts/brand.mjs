/**
 * Single source of truth for the brand tokens used by the asset generators.
 * Every value here is copied from the `@theme` block in styles/globals.css —
 * do not introduce colors that are not already part of the design system.
 */

export const brand = {
  // Brand purple ramp
  purple50:  '#fdf4ff',
  purple100: '#fae8ff',
  purple500: '#c44eed',
  purple600: '#a830d1',
  purple700: '#8b23af',
  purple900: '#601c75',

  // Accents
  pink:   '#FF3CAC',
  orange: '#FF6B35',
  teal:   '#00D4AA',
  blue:   '#4361EE',
  yellow: '#FFD60A',

  // Base
  white:     '#ffffff',
  ink:       '#111827',
  inkMuted:  '#6b7280',
};

/** The signature gradient behind `.gradient-text` / `.hero-gradient`. */
export const signatureGradient = [brand.purple500, brand.blue, brand.teal];

/** Hero pills from pages/index.jsx — reused as OG image decoration. */
export const heroSwatches = ['#E8112D', '#003DA5', '#009A44', '#FE5000', '#FF3EB5', '#F5E100'];

export const theme = {
  themeColor: brand.purple500,
  backgroundColor: brand.white,
};

export const site = {
  url: 'https://pantoneconverter.com',
  name: 'PantoneConverter.com',
  shortName: 'PantoneConverter',
};

/**
 * Concept A — "Color Drop": a white paint drop on the signature gradient.
 *
 * @param {object} opts
 * @param {number} opts.size        rendered square size in px
 * @param {boolean} opts.rounded    rounded corners (false = full bleed, for apple-touch-icon)
 * @param {boolean} opts.highlight  subtle tint inside the drop; drop it at tiny sizes
 */
export function iconSvg({ size = 512, rounded = true, highlight = size >= 48 } = {}) {
  const [c0, c1, c2] = signatureGradient;
  const rx = rounded ? 104 : 0;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="${size}" height="${size}">
  <defs>
    <linearGradient id="drop-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${c0}"/>
      <stop offset="55%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="${rx}" fill="url(#drop-bg)"/>
  <path d="M256 104 C256 104 148 236 148 306 a108 108 0 0 0 216 0 C364 236 256 104 256 104 Z" fill="${brand.white}"/>
  ${highlight ? `<circle cx="212" cy="322" r="34" fill="${brand.purple500}" opacity="0.28"/>` : ''}
</svg>`;
}
