/**
 * Open Graph card template — 1200x630, built from the site's own design
 * tokens: the `.gradient-text` / `.hero-gradient` gradients, Plus Jakarta
 * Sans, and the hero colour pills from pages/index.jsx.
 */
import { Resvg } from '@resvg/resvg-js';
import { brand, signatureGradient, heroSwatches, iconSvg, site } from './brand.mjs';
import { encodeOpaquePng } from './png.mjs';
import { contrast, mix, towardContrast } from './color.mjs';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

const PAD = 80;
const CONTENT_W = OG_WIDTH - PAD * 2;
const FONT = 'Plus Jakarta Sans';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Real text metrics: resvg lays the text out, innerBBox() reports the result.
 * Cheap enough for a couple of dozen cards and far safer than guessing.
 */
export function measureText(text, { size, weight = 400, fontFiles }) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="400">
    <text x="0" y="300" font-family="${FONT}" font-size="${size}" font-weight="${weight}">${esc(text)}</text>
  </svg>`;
  const box = new Resvg(svg, { font: { fontFiles, loadSystemFonts: false } }).innerBBox();
  return box ? box.width : 0;
}

/** Shrinks `size` until the longest line fits inside `maxWidth`. */
function fitSize(lines, { size, weight, fontFiles, maxWidth }) {
  let s = size;
  while (s > 24) {
    const widest = Math.max(...lines.map((l) => measureText(l, { size: s, weight, fontFiles })));
    if (widest <= maxWidth) break;
    s -= 2;
  }
  return s;
}

/** The brand mark: drop icon + gradient wordmark + `.com` badge. */
function header(theme, fontFiles) {
  const ICON = 72;
  const cy = 56 + ICON / 2;
  const wordSize = 36;
  const wordX = PAD + ICON + 20;
  const wordW = measureText(site.shortName, { size: wordSize, weight: 800, fontFiles });

  const badgeX = wordX + wordW + 14;
  const badgeText = '.com';
  const badgeSize = 20;
  const badgeW = measureText(badgeText, { size: badgeSize, weight: 700, fontFiles }) + 26;

  // Inline the icon artwork so the card stays a single self-contained SVG.
  // On the gradient background the stock icon would disappear into it, so
  // that variant flips to a white plate with a gradient drop.
  const iconArt =
    theme.iconStyle === 'inverse'
      ? `<rect width="512" height="512" rx="104" fill="${brand.white}"/>
         <path d="M256 104 C256 104 148 236 148 306 a108 108 0 0 0 216 0 C364 236 256 104 256 104 Z" fill="url(#brand)"/>`
      : iconSvg({ size: 512 })
          .replace(/^<svg[^>]*>/, '')
          .replace(/<\/svg>$/, '')
          .replace(/drop-bg/g, 'og-drop-bg');

  return `
  <g transform="translate(${PAD} 56) scale(${ICON / 512})">${iconArt}</g>
  <text x="${wordX}" y="${cy + wordSize * 0.35}" font-family="${FONT}" font-size="${wordSize}"
        font-weight="800" fill="${theme.wordmarkFill}" letter-spacing="-0.8">${site.shortName}</text>
  <rect x="${badgeX}" y="${cy - 17}" width="${badgeW}" height="34" rx="17" fill="${theme.badgeBg}"/>
  <text x="${badgeX + badgeW / 2}" y="${cy + badgeSize * 0.35}" text-anchor="middle" font-family="${FONT}"
        font-size="${badgeSize}" font-weight="700" fill="${theme.badgeFg}">${badgeText}</text>`;
}

/**
 * Footer strip of colour pills — the homepage hero colours by default, or the
 * page's own Pantone shades when the card supplies them.
 */
function swatchRow(theme, swatches = heroSwatches) {
  const r = 27;
  const step = 76;
  return swatches
    .slice(0, 6)
    .map(
      (hex, i) =>
        `<circle cx="${PAD + r + i * step}" cy="542" r="${r}" fill="${hex}" stroke="${theme.swatchStroke}" stroke-width="5"/>`
    )
    .join('\n  ');
}

/**
 * Builds a card theme around one page colour — used by the colour hub pages,
 * where the card should read as "that colour" without losing legibility.
 *
 * A colour that white type cannot sit on (yellow, gold, white) flips the card
 * to a pale tint with dark type; everything else becomes a deepened version of
 * itself, darkened only as far as WCAG demands so the hue survives.
 */
export function colorTheme(base) {
  if (contrast(base, brand.white) >= 3) {
    // Both gradient stops clear 4.6:1 against white, so every pixel under the
    // type is legible wherever the diagonal falls.
    const top = towardContrast(base, brand.white, 5.6);
    const bottom = mix(top, '#000000', 0.24);
    return {
      stops: [top, bottom],
      background: `<rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#card)"/>
    <circle cx="1090" cy="86" r="190" fill="${brand.white}" opacity="0.10"/>
    <circle cx="1180" cy="560" r="150" fill="${brand.white}" opacity="0.08"/>`,
      wordmarkFill: brand.white,
      badgeBg: 'rgba(255,255,255,0.22)',
      badgeFg: brand.white,
      titleFill: brand.white,
      subtitleFill: 'rgba(255,255,255,0.92)',
      domainFill: 'rgba(255,255,255,0.88)',
      swatchStroke: 'rgba(255,255,255,0.9)',
      iconStyle: 'inverse',
    };
  }

  // Pale card. The 6% grey keeps a pure-white page colour from rendering as a
  // blank rectangle, and the inset border plus accent bar give the card a
  // visible edge against a white feed background.
  const pale = mix(base, brand.white, 0.9);
  const paleDeep = mix(mix(base, brand.white, 0.72), '#4b5563', 0.06);
  const accent = towardContrast(base, pale, 2.6);
  return {
    stops: [pale, paleDeep],
    background: `<rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#card)"/>
    <circle cx="1090" cy="86" r="190" fill="${accent}" opacity="0.10"/>
    <circle cx="1180" cy="560" r="150" fill="${accent}" opacity="0.08"/>
    <rect x="0" y="0" width="12" height="${OG_HEIGHT}" fill="${accent}"/>
    <rect x="1" y="1" width="${OG_WIDTH - 2}" height="${OG_HEIGHT - 2}" fill="none"
          stroke="${mix(accent, brand.white, 0.68)}" stroke-width="2"/>`,
    wordmarkFill: 'url(#brand)',
    badgeBg: brand.purple100,
    badgeFg: brand.purple700,
    titleFill: brand.ink,
    // Grey-600 rather than the usual grey-500 body colour: on a pale tint the
    // lighter grey lands at ~4.2:1, just under WCAG AA for 28px text.
    subtitleFill: '#4b5563',
    domainFill: brand.purple600,
    swatchStroke: 'rgba(17,24,39,0.15)',
    iconStyle: 'gradient',
  };
}

const THEMES = {
  /** Concept 1 — the site's own hero gradient, dark type. */
  light: {
    background: `<rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#hero)"/>
    <rect width="12" height="${OG_HEIGHT}" fill="url(#brand)"/>`,
    wordmarkFill: 'url(#brand)',
    badgeBg: brand.purple100,
    badgeFg: brand.purple700,
    titleFill: brand.ink,
    subtitleFill: brand.inkMuted,
    domainFill: brand.purple600,
    swatchStroke: brand.white,
    iconStyle: 'gradient',
  },
  /** Concept 2 — full brand gradient, white type. */
  bold: {
    background: `<rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#brand)"/>
    <circle cx="1090" cy="86" r="190" fill="${brand.white}" opacity="0.10"/>
    <circle cx="1180" cy="560" r="150" fill="${brand.white}" opacity="0.08"/>`,
    wordmarkFill: brand.white,
    badgeBg: 'rgba(255,255,255,0.22)',
    badgeFg: brand.white,
    titleFill: brand.white,
    subtitleFill: 'rgba(255,255,255,0.86)',
    domainFill: 'rgba(255,255,255,0.85)',
    swatchStroke: 'rgba(255,255,255,0.9)',
    iconStyle: 'inverse',
  },
};

/**
 * @param {object} card              { titleLines, subtitle, color?, swatches? }
 * @param {'light'|'bold'} variant   ignored when the card carries its own colour
 * @param {string[]} fontFiles
 */
export function ogSvg(card, variant, fontFiles) {
  const theme = card.color ? colorTheme(card.color) : THEMES[variant];
  const [g0, g1, g2] = signatureGradient;

  const titleSize = fitSize(card.titleLines, {
    size: 68,
    weight: 800,
    fontFiles,
    maxWidth: CONTENT_W - 40,
  });
  const lineHeight = Math.round(titleSize * 1.16);
  const lastBaseline = 380;
  const titles = card.titleLines
    .map((line, i) => {
      const y = lastBaseline - (card.titleLines.length - 1 - i) * lineHeight;
      return `<text x="${PAD}" y="${y}" font-family="${FONT}" font-size="${titleSize}" font-weight="800"
        letter-spacing="-1.6" fill="${theme.titleFill}">${esc(line)}</text>`;
    })
    .join('\n  ');

  const subSize = fitSize([card.subtitle], {
    size: 28,
    weight: 400,
    fontFiles,
    maxWidth: CONTENT_W - 40,
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}">
  <defs>
    <linearGradient id="hero" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${brand.purple50}"/>
      <stop offset="50%" stop-color="#eff6ff"/>
      <stop offset="100%" stop-color="#f0fdf4"/>
    </linearGradient>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${g0}"/>
      <stop offset="50%" stop-color="${g1}"/>
      <stop offset="100%" stop-color="${g2}"/>
    </linearGradient>
    ${
      theme.stops
        ? `<linearGradient id="card" x1="0" y1="0" x2="1" y2="1">
      ${theme.stops
        .map((c, i) => `<stop offset="${(i / (theme.stops.length - 1)) * 100}%" stop-color="${c}"/>`)
        .join('\n      ')}
    </linearGradient>`
        : ''
    }
  </defs>
  ${theme.background}
  ${header(theme, fontFiles)}
  ${titles}
  <text x="${PAD}" y="452" font-family="${FONT}" font-size="${subSize}" font-weight="400"
        fill="${theme.subtitleFill}">${esc(card.subtitle)}</text>
  ${swatchRow(theme, card.swatches)}
  <text x="${OG_WIDTH - PAD}" y="552" text-anchor="end" font-family="${FONT}" font-size="22"
        font-weight="700" fill="${theme.domainFill}">pantoneconverter.com</text>
</svg>`;
}

export function renderOg(card, variant, fontFiles) {
  const img = new Resvg(ogSvg(card, variant, fontFiles), {
    fitTo: { mode: 'width', value: OG_WIDTH },
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: FONT },
    shapeRendering: 2,
    textRendering: 2,
  }).render();
  // The card is opaque edge to edge, so re-encode without the alpha channel.
  return encodeOpaquePng(img.pixels, img.width, img.height);
}
