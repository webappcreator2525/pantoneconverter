/**
 * colorUtils.js
 * =============
 * Pure client-side color conversion and Pantone matching logic.
 * No external dependencies — only vanilla JavaScript.
 *
 * Exports:
 *   - cmykToRgb(c, m, y, k)        → { r, g, b }
 *   - hexToRgb(hex)                 → { r, g, b } | null
 *   - hslToRgb(h, s, l)            → { r, g, b }
 *   - rgbToHex(r, g, b)            → "#RRGGBB"
 *   - rgbToCmyk(r, g, b)           → { c, m, y, k }
 *   - rgbToHsl(r, g, b)            → { h, s, l }
 *   - findClosestPantones(rgb, db, topN)  → Array<MatchResult>
 *   - getMatchesFromCmyk(c,m,y,k, db)    → Array<MatchResult>
 *   - getMatchesFromHex(hex, db)          → Array<MatchResult>
 *   - getMatchesFromRgb(r,g,b, db)        → Array<MatchResult>
 *   - getMatchesFromHsl(h,s,l, db)        → Array<MatchResult>
 *   - getPantoneByName(name, db)          → PantoneEntry | null
 *   - isValidHex(hex)               → boolean
 *   - clamp(value, min, max)        → number
 *
 * MatchResult shape:
 *   {
 *     name:       string,   // e.g. "Pantone 186 C"
 *     hex:        string,   // e.g. "#CC0000"
 *     rgb:        { r, g, b },
 *     cmyk:       { c, m, y, k },
 *     distance:   number,   // Euclidean RGB distance
 *     similarity: number,   // 0–100 percentage
 *   }
 */

// ─── Constants ────────────────────────────────────────────────────────────────

/**
 * Maximum possible weighted RGB distance.
 * Weights: R×2, G×4, B×3 — approximates human luminance sensitivity.
 * max = √((2×255)² + (4×255)² + (3×255)²) ≈ 1397.54
 */
const MAX_RGB_DISTANCE = Math.sqrt((2 * 255) ** 2 + (4 * 255) ** 2 + (3 * 255) ** 2);

// ─── Clamp helper ─────────────────────────────────────────────────────────────

/**
 * Clamp a numeric value between min and max (inclusive).
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// ─── Validation ───────────────────────────────────────────────────────────────

/**
 * Returns true if the string is a valid 3- or 6-digit HEX color
 * (with or without leading #).
 * @param {string} hex
 * @returns {boolean}
 */
export function isValidHex(hex) {
  return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex.trim());
}

// ─── Input Conversions to RGB ─────────────────────────────────────────────────

/**
 * Convert CMYK (0–100 each) to RGB (0–255 each).
 * Formula: R = 255 × (1 − C/100) × (1 − K/100)  [same for G/M and B/Y]
 *
 * @param {number} c  Cyan    0–100
 * @param {number} m  Magenta 0–100
 * @param {number} y  Yellow  0–100
 * @param {number} k  Key/Black 0–100
 * @returns {{ r: number, g: number, b: number }}
 */
export function cmykToRgb(c, m, y, k) {
  const r = Math.round(255 * (1 - c / 100) * (1 - k / 100));
  const g = Math.round(255 * (1 - m / 100) * (1 - k / 100));
  const b = Math.round(255 * (1 - y / 100) * (1 - k / 100));
  return {
    r: clamp(r, 0, 255),
    g: clamp(g, 0, 255),
    b: clamp(b, 0, 255),
  };
}

/**
 * Parse a HEX string (with or without #, 3 or 6 digits) into RGB.
 * Returns null if the input is invalid.
 *
 * @param {string} hex
 * @returns {{ r: number, g: number, b: number } | null}
 */
export function hexToRgb(hex) {
  const clean = hex.trim().replace(/^#/, '');

  // Expand 3-digit shorthand
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((ch) => ch + ch)
          .join('')
      : clean;

  if (!/^[0-9A-Fa-f]{6}$/.test(full)) return null;

  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

/**
 * Convert HSL to RGB.
 * H: 0–360, S: 0–100, L: 0–100
 * Returns RGB 0–255 each.
 *
 * @param {number} h  Hue        0–360
 * @param {number} s  Saturation 0–100
 * @param {number} l  Lightness  0–100
 * @returns {{ r: number, g: number, b: number }}
 */
export function hslToRgb(h, s, l) {
  const sn = s / 100;
  const ln = l / 100;

  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ln - c / 2;

  let r1 = 0, g1 = 0, b1 = 0;

  if (h < 60)       { r1 = c; g1 = x; b1 = 0; }
  else if (h < 120) { r1 = x; g1 = c; b1 = 0; }
  else if (h < 180) { r1 = 0; g1 = c; b1 = x; }
  else if (h < 240) { r1 = 0; g1 = x; b1 = c; }
  else if (h < 300) { r1 = x; g1 = 0; b1 = c; }
  else              { r1 = c; g1 = 0; b1 = x; }

  return {
    r: clamp(Math.round((r1 + m) * 255), 0, 255),
    g: clamp(Math.round((g1 + m) * 255), 0, 255),
    b: clamp(Math.round((b1 + m) * 255), 0, 255),
  };
}

// ─── Output Conversions from RGB ──────────────────────────────────────────────

/**
 * Convert RGB (0–255 each) to a 6-digit uppercase HEX string with #.
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {string}  e.g. "#FF3CAC"
 */
export function rgbToHex(r, g, b) {
  const toHex = (n) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/**
 * Convert RGB (0–255 each) to CMYK (0–100 each, rounded to 1 decimal).
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {{ c: number, m: number, y: number, k: number }}
 */
export function rgbToCmyk(r, g, b) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const k = 1 - Math.max(rn, gn, bn);

  if (k === 1) {
    // Pure black
    return { c: 0, m: 0, y: 0, k: 100 };
  }

  const c = (1 - rn - k) / (1 - k);
  const m = (1 - gn - k) / (1 - k);
  const y = (1 - bn - k) / (1 - k);

  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
}

/**
 * Convert RGB (0–255 each) to HSL.
 * H: 0–360, S: 0–100, L: 0–100
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {{ h: number, s: number, l: number }}
 */
export function rgbToHsl(r, g, b) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;

  const l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));

    if (max === rn)      h = ((gn - bn) / delta) % 6;
    else if (max === gn) h = (bn - rn) / delta + 2;
    else                 h = (rn - gn) / delta + 4;

    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

// ─── Distance ─────────────────────────────────────────────────────────────────

/**
 * Compute the perceptually-weighted RGB distance between two colors.
 * Weights: R×2, G×4, B×3 — reflects human eye sensitivity to each channel.
 * Range: 0 (identical) to ~1397.54 (max possible).
 *
 * @param {{ r, g, b }} a
 * @param {{ r, g, b }} b
 * @returns {number}
 */
function rgbDistance(a, b) {
  return Math.sqrt(
    (2 * (a.r - b.r)) ** 2 +
    (4 * (a.g - b.g)) ** 2 +
    (3 * (a.b - b.b)) ** 2
  );
}

/**
 * Convert a raw Euclidean RGB distance to a similarity percentage (0–100).
 * similarity = (1 − distance / maxPossibleDistance) × 100
 *
 * @param {number} distance
 * @returns {number}  Rounded to 1 decimal place
 */
function distanceToSimilarity(distance) {
  return Math.round((1 - distance / MAX_RGB_DISTANCE) * 10000) / 100;
}

// ─── Core Matching ────────────────────────────────────────────────────────────

/**
 * Find the closest Pantone colors to a given RGB value.
 *
 * @param {{ r: number, g: number, b: number }} rgb   Input color in RGB.
 * @param {Array<PantoneEntry>}                 db    Pantone database array.
 * @param {number}                              [topN=5]  How many results to return.
 * @returns {Array<MatchResult>}  Sorted ascending by distance (best match first).
 */
export function findClosestPantones(rgb, db, topN = 5) {
  if (!db || db.length === 0) return [];

  const results = db.map((entry) => {
    const entryRgb = entry.rgb ?? hexToRgb(entry.hex) ?? { r: 0, g: 0, b: 0 };
    const distance = rgbDistance(rgb, entryRgb);
    return {
      name:       entry.name,
      hex:        entry.hex,
      rgb:        entryRgb,
      cmyk:       entry.cmyk ?? rgbToCmyk(entryRgb.r, entryRgb.g, entryRgb.b),
      distance,
      similarity: distanceToSimilarity(distance),
    };
  });

  results.sort((a, b) => a.distance - b.distance);
  return results.slice(0, topN);
}

// ─── Convenience Entry Points ─────────────────────────────────────────────────

/**
 * Find closest Pantones from CMYK input.
 * @param {number} c  0–100
 * @param {number} m  0–100
 * @param {number} y  0–100
 * @param {number} k  0–100
 * @param {Array}  db Pantone database
 * @param {number} [topN=5]
 * @returns {Array<MatchResult>}
 */
export function getMatchesFromCmyk(c, m, y, k, db, topN = 5) {
  const rgb = cmykToRgb(c, m, y, k);
  return findClosestPantones(rgb, db, topN);
}

/**
 * Find closest Pantones from HEX input.
 * Returns empty array if HEX is invalid.
 * @param {string} hex  e.g. "#FF3CAC" or "FF3CAC"
 * @param {Array}  db   Pantone database
 * @param {number} [topN=5]
 * @returns {Array<MatchResult>}
 */
export function getMatchesFromHex(hex, db, topN = 5) {
  const rgb = hexToRgb(hex);
  if (!rgb) return [];
  return findClosestPantones(rgb, db, topN);
}

/**
 * Find closest Pantones from RGB input.
 * @param {number} r  0–255
 * @param {number} g  0–255
 * @param {number} b  0–255
 * @param {Array}  db Pantone database
 * @param {number} [topN=5]
 * @returns {Array<MatchResult>}
 */
export function getMatchesFromRgb(r, g, b, db, topN = 5) {
  const rgb = {
    r: clamp(Math.round(r), 0, 255),
    g: clamp(Math.round(g), 0, 255),
    b: clamp(Math.round(b), 0, 255),
  };
  return findClosestPantones(rgb, db, topN);
}

/**
 * Find closest Pantones from HSL input.
 * @param {number} h  0–360
 * @param {number} s  0–100
 * @param {number} l  0–100
 * @param {Array}  db Pantone database
 * @param {number} [topN=5]
 * @returns {Array<MatchResult>}
 */
export function getMatchesFromHsl(h, s, l, db, topN = 5) {
  const rgb = hslToRgb(h, s, l);
  return findClosestPantones(rgb, db, topN);
}

/**
 * Look up a single Pantone entry by exact name or name fragment (case-insensitive).
 * Returns the first match, or null if not found.
 *
 * @param {string} query  e.g. "Pantone 186 C" or "186"
 * @param {Array}  db     Pantone database
 * @returns {PantoneEntry | null}
 */
export function getPantoneByName(query, db) {
  if (!query || !db) return null;
  const q = query.trim().toLowerCase();
  return db.find((entry) => entry.name.toLowerCase().includes(q)) ?? null;
}

/**
 * Filter Pantone database by a search query (name or hex, case-insensitive).
 * Used for the Pantone Finder page.
 *
 * @param {string} query
 * @param {Array}  db
 * @returns {Array<PantoneEntry>}
 */
export function filterPantones(query, db) {
  if (!query || query.trim() === '') return db;
  const q = query.trim().toLowerCase();
  return db.filter(
    (entry) =>
      entry.name.toLowerCase().includes(q) ||
      entry.hex.toLowerCase().includes(q)
  );
}

/**
 * Format a CMYK object as a display string.
 * @param {{ c, m, y, k }} cmyk
 * @returns {string}  e.g. "C:0 M:2 Y:49 K:0"
 */
export function formatCmyk({ c, m, y, k }) {
  return `C:${c} M:${m} Y:${y} K:${k}`;
}

/**
 * Format an RGB object as a display string.
 * @param {{ r, g, b }} rgb
 * @returns {string}  e.g. "rgb(244, 237, 124)"
 */
export function formatRgb({ r, g, b }) {
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Determine whether a hex color is "light" (to choose text color on top).
 * Returns true if the background is light (use dark text).
 * @param {string} hex
 * @returns {boolean}
 */
export function isLightColor(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return true;
  // Perceived luminance formula (ITU-R BT.709)
  const luminance = 0.2126 * (rgb.r / 255) + 0.7152 * (rgb.g / 255) + 0.0722 * (rgb.b / 255);
  return luminance > 0.5;
}
