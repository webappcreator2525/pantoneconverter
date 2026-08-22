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
