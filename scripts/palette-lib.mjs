/**
 * Shared plumbing for the palette generators.
 *
 * Mirrors the conversions in lib/colorUtils.js rather than importing them,
 * because lib/ is ESM-in-a-CJS-package and only resolvable through the bundler
 * — the same reason scripts/brand.mjs mirrors the palette tokens. Keep the two
 * in step: the runtime ranks matches with the lab values baked in here, so a
 * drift between this file and colorUtils would silently skew every result.
 */
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const DATA_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'data');

export const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

export function hexToRgb(hex) {
  const c = hex.replace(/^#/, '');
  const full = c.length === 3 ? c.split('').map((ch) => ch + ch).join('') : c;
  if (!/^[0-9A-Fa-f]{6}$/.test(full)) throw new Error(`Bad hex: ${hex}`);
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

export function rgbToHex(r, g, b) {
  const h = (n) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0');
  return `#${h(r)}${h(g)}${h(b)}`.toUpperCase();
}

export function rgbToCmyk(r, g, b) {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const k = 1 - Math.max(rn, gn, bn);
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
  return {
    c: Math.round(((1 - rn - k) / (1 - k)) * 100),
    m: Math.round(((1 - gn - k) / (1 - k)) * 100),
    y: Math.round(((1 - bn - k) / (1 - k)) * 100),
    k: Math.round(k * 100),
  };
}

export function cmykToRgb(c, m, y, k) {
  return {
    r: clamp(Math.round(255 * (1 - c / 100) * (1 - k / 100)), 0, 255),
    g: clamp(Math.round(255 * (1 - m / 100) * (1 - k / 100)), 0, 255),
    b: clamp(Math.round(255 * (1 - y / 100) * (1 - k / 100)), 0, 255),
  };
}

const D65 = { x: 95.047, y: 100.0, z: 108.883 };

export function rgbToLab(r, g, b) {
  const lin = (ch) => {
    const c = ch / 255;
    return (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4) * 100;
  };
  const rl = lin(r), gl = lin(g), bl = lin(b);

  const x = rl * 0.4124564 + gl * 0.3575761 + bl * 0.1804375;
  const y = rl * 0.2126729 + gl * 0.7151522 + bl * 0.0721750;
  const z = rl * 0.0193339 + gl * 0.1191920 + bl * 0.9503041;

  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const fx = f(x / D65.x), fy = f(y / D65.y), fz = f(z / D65.z);

  return {
    l: Math.round((116 * fy - 16) * 100) / 100,
    a: Math.round(500 * (fx - fy) * 100) / 100,
    b: Math.round(200 * (fy - fz) * 100) / 100,
  };
}

export function hsvToRgb(h, s, v) {
  const sn = s / 100, vn = v / 100;
  const hn = ((h % 360) + 360) % 360;
  const c = vn * sn;
  const x = c * (1 - Math.abs(((hn / 60) % 2) - 1));
  const m = vn - c;
  let r1 = 0, g1 = 0, b1 = 0;
  if (hn < 60)       { r1 = c; g1 = x; b1 = 0; }
  else if (hn < 120) { r1 = x; g1 = c; b1 = 0; }
  else if (hn < 180) { r1 = 0; g1 = c; b1 = x; }
  else if (hn < 240) { r1 = 0; g1 = x; b1 = c; }
  else if (hn < 300) { r1 = x; g1 = 0; b1 = c; }
  else               { r1 = c; g1 = 0; b1 = x; }
  return {
    r: clamp(Math.round((r1 + m) * 255), 0, 255),
    g: clamp(Math.round((g1 + m) * 255), 0, 255),
    b: clamp(Math.round((b1 + m) * 255), 0, 255),
  };
}

/** Expand a [code, name, localName, hex] row into a full palette entry. */
export function entry([code, name, localName, hex]) {
  const rgb = hexToRgb(hex);
  return {
    code,
    name,
    ...(localName ? { localName } : {}),
    hex: rgbToHex(rgb.r, rgb.g, rgb.b),
    rgb,
    cmyk: rgbToCmyk(rgb.r, rgb.g, rgb.b),
    lab: rgbToLab(rgb.r, rgb.g, rgb.b),
  };
}

/**
 * Write a set of palettes to data/, de-duplicating repeated codes.
 *
 * @param {Array<[string, string, string, string, Array<object>]>} palettes
 *        [file, system, owner, accuracy, colors]
 * @param {string} generatedBy  Script that owns these tables, recorded in the JSON.
 */
export function writePalettes(palettes, generatedBy = 'scripts/generate-palettes.mjs') {
  for (const [file, system, owner, accuracy, colors] of palettes) {
    // Codes repeat in the source tables where a standard lists the same colour
    // twice; keep the first and drop the rest so lookups stay unique.
    const seen = new Set();
    const unique = colors.filter((c) => {
      if (seen.has(c.code)) return false;
      seen.add(c.code);
      return true;
    });

    const payload = {
      system,
      owner,
      accuracy,
      count: unique.length,
      generatedBy,
      colors: unique,
    };

    writeFileSync(join(DATA_DIR, file), `${JSON.stringify(payload, null, 1)}\n`);
    const dropped = colors.length - unique.length;
    console.log(
      `  ${file.padEnd(22)} ${String(unique.length).padStart(4)} colours` +
      `  (${accuracy})${dropped ? `  — ${dropped} duplicate code(s) dropped` : ''}`
    );
  }
}

/**
 * CIEDE2000 colour difference between two Lab colours — Sharma, Wu & Dalal
 * (2005), kL = kC = kH = 1.
 *
 * Mirrors `deltaE2000` in lib/colorUtils.js for the same reason the
 * conversions above do: build scripts cannot resolve lib/. Keep the two in
 * step — scripts/build-color-stats.mjs bakes these numbers into the page
 * copy, so a drift here would put wrong figures in front of readers.
 *
 * @param {{ l: number, a: number, b: number }} lab1
 * @param {{ l: number, a: number, b: number }} lab2
 * @returns {number} ΔE*00, rounded to 2 decimals
 */
export function deltaE2000(lab1, lab2) {
  const { l: L1, a: a1, b: b1 } = lab1;
  const { l: L2, a: a2, b: b2 } = lab2;
  const deg = Math.PI / 180;

  const C1 = Math.hypot(a1, b1);
  const C2 = Math.hypot(a2, b2);
  const Cbar = (C1 + C2) / 2;

  const G = 0.5 * (1 - Math.sqrt(Cbar ** 7 / (Cbar ** 7 + 25 ** 7)));
  const a1p = (1 + G) * a1;
  const a2p = (1 + G) * a2;

  const C1p = Math.hypot(a1p, b1);
  const C2p = Math.hypot(a2p, b2);

  const hp = (bb, ap) => {
    if (bb === 0 && ap === 0) return 0;
    const angle = Math.atan2(bb, ap) / deg;
    return angle >= 0 ? angle : angle + 360;
  };
  const h1p = hp(b1, a1p);
  const h2p = hp(b2, a2p);

  const dLp = L2 - L1;
  const dCp = C2p - C1p;

  let dhp = 0;
  if (C1p * C2p !== 0) {
    if (Math.abs(h2p - h1p) <= 180) dhp = h2p - h1p;
    else if (h2p - h1p > 180) dhp = h2p - h1p - 360;
    else dhp = h2p - h1p + 360;
  }
  const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin((dhp * deg) / 2);

  const Lbarp = (L1 + L2) / 2;
  const Cbarp = (C1p + C2p) / 2;

  let hbarp;
  if (C1p * C2p === 0) hbarp = h1p + h2p;
  else if (Math.abs(h1p - h2p) <= 180) hbarp = (h1p + h2p) / 2;
  else if (h1p + h2p < 360) hbarp = (h1p + h2p + 360) / 2;
  else hbarp = (h1p + h2p - 360) / 2;

  const T = 1
    - 0.17 * Math.cos((hbarp - 30) * deg)
    + 0.24 * Math.cos(2 * hbarp * deg)
    + 0.32 * Math.cos((3 * hbarp + 6) * deg)
    - 0.20 * Math.cos((4 * hbarp - 63) * deg);

  const dTheta = 30 * Math.exp(-(((hbarp - 275) / 25) ** 2));
  const RC = 2 * Math.sqrt(Cbarp ** 7 / (Cbarp ** 7 + 25 ** 7));
  const SL = 1 + (0.015 * (Lbarp - 50) ** 2) / Math.sqrt(20 + (Lbarp - 50) ** 2);
  const SC = 1 + 0.045 * Cbarp;
  const SH = 1 + 0.015 * Cbarp * T;
  const RT = -Math.sin(2 * dTheta * deg) * RC;

  const dE = Math.sqrt(
    (dLp / SL) ** 2 + (dCp / SC) ** 2 + (dHp / SH) ** 2 +
    RT * (dCp / SC) * (dHp / SH)
  );

  return Math.round(dE * 100) / 100;
}

/**
 * WCAG 2.x relative luminance for an sRGB triple (0–255 each).
 * https://www.w3.org/TR/WCAG22/#dfn-relative-luminance
 */
export function relativeLuminance(r, g, b) {
  const lin = (ch) => {
    const c = ch / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/**
 * WCAG contrast ratio between two sRGB triples, 1 – 21, rounded to 2 decimals.
 */
export function contrastRatio(rgb1, rgb2) {
  const l1 = relativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = relativeLuminance(rgb2.r, rgb2.g, rgb2.b);
  const [hi, lo] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
}
