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

// ─── CIELAB / CIEDE2000 ───────────────────────────────────────────────────────
//
// The industrial colour-system pages (RAL, NCS, HKS, TOYO, Trumatch, FS 595)
// rank matches by ΔE*00 rather than the weighted RGB distance used elsewhere on
// the site. Weighted RGB is a cheap perceptual approximation that works well for
// "find me a similar swatch"; ΔE*00 is the metric the paint and print industries
// actually specify tolerances in, so it is the honest number to show next to an
// RAL or FS 595 code.
//
// sRGB → XYZ → L*a*b* uses the D65 illuminant and the 2° standard observer,
// which is what Pantone, RAL and NCS all publish their own Lab values against.

/** D65 reference white, 2° observer. */
const D65 = { x: 95.047, y: 100.0, z: 108.883 };

/** Undo the sRGB transfer function for one 0–255 channel. Returns 0–1 linear. */
function srgbToLinear(channel) {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

/** Apply the sRGB transfer function to a 0–1 linear value. Returns 0–255. */
function linearToSrgb(linear) {
  const c = linear <= 0.0031308
    ? linear * 12.92
    : 1.055 * linear ** (1 / 2.4) - 0.055;
  return clamp(Math.round(c * 255), 0, 255);
}

/**
 * Convert RGB (0–255 each) to CIE XYZ (D65).
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {{ x: number, y: number, z: number }}
 */
export function rgbToXyz(r, g, b) {
  const rl = srgbToLinear(r) * 100;
  const gl = srgbToLinear(g) * 100;
  const bl = srgbToLinear(b) * 100;

  return {
    x: rl * 0.4124564 + gl * 0.3575761 + bl * 0.1804375,
    y: rl * 0.2126729 + gl * 0.7151522 + bl * 0.0721750,
    z: rl * 0.0193339 + gl * 0.1191920 + bl * 0.9503041,
  };
}

/**
 * Convert RGB (0–255 each) to CIE L*a*b* (D65, 2° observer).
 * L* is 0–100; a* and b* are unbounded in theory but roughly −128…127 in sRGB.
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {{ l: number, a: number, b: number }}  rounded to 2 decimals
 */
export function rgbToLab(r, g, b) {
  const { x, y, z } = rgbToXyz(r, g, b);

  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);

  const fx = f(x / D65.x);
  const fy = f(y / D65.y);
  const fz = f(z / D65.z);

  return {
    l: Math.round((116 * fy - 16) * 100) / 100,
    a: Math.round(500 * (fx - fy) * 100) / 100,
    b: Math.round(200 * (fy - fz) * 100) / 100,
  };
}

/**
 * Convert CIE L*a*b* (D65) back to RGB (0–255 each).
 * Out-of-gamut Lab values are clipped per channel, so the result is the closest
 * displayable sRGB colour rather than an error.
 *
 * @param {number} l  0–100
 * @param {number} a  ~−128…127
 * @param {number} b  ~−128…127
 * @returns {{ r: number, g: number, b: number }}
 */
export function labToRgb(l, a, b) {
  const fy = (l + 16) / 116;
  const fx = fy + a / 500;
  const fz = fy - b / 200;

  const inv = (t) => (t ** 3 > 0.008856 ? t ** 3 : (t - 16 / 116) / 7.787);

  const x = inv(fx) * D65.x / 100;
  const y = inv(fy) * D65.y / 100;
  const z = inv(fz) * D65.z / 100;

  const rl =  x *  3.2404542 + y * -1.5371385 + z * -0.4985314;
  const gl =  x * -0.9692660 + y *  1.8760108 + z *  0.0415560;
  const bl =  x *  0.0556434 + y * -0.2040259 + z *  1.0572252;

  return {
    r: linearToSrgb(clamp(rl, 0, 1)),
    g: linearToSrgb(clamp(gl, 0, 1)),
    b: linearToSrgb(clamp(bl, 0, 1)),
  };
}

/**
 * CIEDE2000 colour difference between two Lab colours.
 * Implements the formulation in Sharma, Wu & Dalal (2005) with kL = kC = kH = 1.
 *
 * Rough interpretation of the result:
 *   < 1   not perceptible to the human eye
 *   1–2   perceptible on close inspection
 *   2–10  perceptible at a glance
 *   > 10  colours read as clearly different
 *
 * @param {{ l, a, b }} lab1
 * @param {{ l, a, b }} lab2
 * @returns {number}  ΔE*00, rounded to 2 decimals
 */
export function deltaE2000(lab1, lab2) {
  const { l: L1, a: a1, b: b1 } = lab1;
  const { l: L2, a: a2, b: b2 } = lab2;

  const kL = 1, kC = 1, kH = 1;
  const deg = Math.PI / 180;

  const C1 = Math.sqrt(a1 ** 2 + b1 ** 2);
  const C2 = Math.sqrt(a2 ** 2 + b2 ** 2);
  const Cbar = (C1 + C2) / 2;

  // G expands the a* axis for low-chroma colours, where CIE76 over-weights hue.
  const G = 0.5 * (1 - Math.sqrt(Cbar ** 7 / (Cbar ** 7 + 25 ** 7)));

  const a1p = (1 + G) * a1;
  const a2p = (1 + G) * a2;

  const C1p = Math.sqrt(a1p ** 2 + b1 ** 2);
  const C2p = Math.sqrt(a2p ** 2 + b2 ** 2);

  const hp = (bb, ap) => {
    if (bb === 0 && ap === 0) return 0;
    const angle = Math.atan2(bb, ap) / deg;
    return angle >= 0 ? angle : angle + 360;
  };

  const h1p = hp(b1, a1p);
  const h2p = hp(b2, a2p);

  const dLp = L2 - L1;
  const dCp = C2p - C1p;

  let dhp;
  if (C1p * C2p === 0) {
    dhp = 0;
  } else if (Math.abs(h2p - h1p) <= 180) {
    dhp = h2p - h1p;
  } else if (h2p - h1p > 180) {
    dhp = h2p - h1p - 360;
  } else {
    dhp = h2p - h1p + 360;
  }

  const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin((dhp * deg) / 2);

  const Lbarp = (L1 + L2) / 2;
  const Cbarp = (C1p + C2p) / 2;

  let hbarp;
  if (C1p * C2p === 0) {
    hbarp = h1p + h2p;
  } else if (Math.abs(h1p - h2p) <= 180) {
    hbarp = (h1p + h2p) / 2;
  } else if (h1p + h2p < 360) {
    hbarp = (h1p + h2p + 360) / 2;
  } else {
    hbarp = (h1p + h2p - 360) / 2;
  }

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
    (dLp / (kL * SL)) ** 2 +
    (dCp / (kC * SC)) ** 2 +
    (dHp / (kH * SH)) ** 2 +
    RT * (dCp / (kC * SC)) * (dHp / (kH * SH))
  );

  return Math.round(dE * 100) / 100;
}

/**
 * Plain-English quality band for a ΔE*00 value, used to label match cards.
 * The thresholds follow the commercial-printing convention where ΔE ≤ 2 is
 * considered a commercial match.
 *
 * @param {number} dE
 * @returns {{ label: string, note: string, tone: string }}  tone: good | fair | poor
 */
export function deltaEQuality(dE) {
  if (dE < 1)  return { label: 'Near-exact',  note: 'Difference is not perceptible to the human eye.', tone: 'good' };
  if (dE < 2)  return { label: 'Excellent',   note: 'Commercial match — perceptible only on close side-by-side inspection.', tone: 'good' };
  if (dE < 5)  return { label: 'Good',        note: 'Perceptible at a glance, acceptable for most applications.', tone: 'fair' };
  if (dE < 10) return { label: 'Fair',        note: 'Clearly different, but recognisably the same colour family.', tone: 'fair' };
  return             { label: 'Approximate', note: 'Colours read as distinctly different — no close equivalent exists.', tone: 'poor' };
}

// ─── HSV / HSB ────────────────────────────────────────────────────────────────
//
// HSV and HSB are the same model under two names: Photoshop calls the third
// axis Brightness, most code calls it Value. Both are given below so the /hsv
// pages can talk about either without a second implementation.

/**
 * Convert RGB (0–255 each) to HSV.
 * H: 0–360, S: 0–100, V: 0–100
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {{ h: number, s: number, v: number }}
 */
export function rgbToHsv(r, g, b) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === rn)      h = ((gn - bn) / delta) % 6;
    else if (max === gn) h = (bn - rn) / delta + 2;
    else                 h = (rn - gn) / delta + 4;

    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  return {
    h,
    s: Math.round((max === 0 ? 0 : delta / max) * 100),
    v: Math.round(max * 100),
  };
}

/**
 * Convert HSV to RGB (0–255 each).
 * H: 0–360, S: 0–100, V: 0–100
 *
 * @param {number} h
 * @param {number} s
 * @param {number} v
 * @returns {{ r: number, g: number, b: number }}
 */
export function hsvToRgb(h, s, v) {
  const sn = clamp(s, 0, 100) / 100;
  const vn = clamp(v, 0, 100) / 100;
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

/** HSB is HSV under Adobe's naming. Aliased so page code can read naturally. */
export const rgbToHsb = rgbToHsv;
export const hsbToRgb = hsvToRgb;

// ─── Cross-system matching ────────────────────────────────────────────────────

/**
 * Rank any palette against a target colour by ΔE*00.
 *
 * Used in both directions by the industrial-system pages: Pantone → RAL passes
 * the RAL palette, RAL → Pantone passes the Pantone database. Entries only need
 * `name` and `hex`; everything else on the entry is carried through untouched,
 * so system-specific fields (RAL's `localName`, NCS's notation, …) survive.
 *
 * @param {{ r, g, b }}   rgb      Target colour.
 * @param {Array<object>} palette  Entries with at least { name, hex }.
 * @param {number}        [topN=5]
 * @returns {Array<object>}  palette entries + { rgb, lab, deltaE, quality }, best first
 */
export function findClosestByDeltaE(rgb, palette, topN = 5) {
  if (!palette || palette.length === 0) return [];

  const targetLab = rgbToLab(rgb.r, rgb.g, rgb.b);

  const results = palette.map((entry) => {
    const entryRgb = entry.rgb ?? hexToRgb(entry.hex) ?? { r: 0, g: 0, b: 0 };
    const entryLab = entry.lab ?? rgbToLab(entryRgb.r, entryRgb.g, entryRgb.b);
    const dE = deltaE2000(targetLab, entryLab);

    return {
      ...entry,
      rgb: entryRgb,
      lab: entryLab,
      cmyk: entry.cmyk ?? rgbToCmyk(entryRgb.r, entryRgb.g, entryRgb.b),
      deltaE: dE,
      quality: deltaEQuality(dE),
    };
  });

  results.sort((a, b) => a.deltaE - b.deltaE);
  return results.slice(0, topN);
}

/**
 * Free-text filter over any palette — matches the code/name, the localised name
 * and the hex, so "3020", "verkehrsrot" and "#CC0605" all find RAL 3020.
 *
 * @param {string}        query
 * @param {Array<object>} palette
 * @param {number}        [limit=40]
 * @returns {Array<object>}
 */
export function filterPalette(query, palette, limit = 40) {
  if (!query || query.trim() === '') return palette.slice(0, limit);
  const q = query.trim().toLowerCase();
  return palette
    .filter((entry) =>
      entry.name.toLowerCase().includes(q) ||
      (entry.localName && entry.localName.toLowerCase().includes(q)) ||
      (entry.code && String(entry.code).toLowerCase().includes(q)) ||
      entry.hex.toLowerCase().includes(q)
    )
    .slice(0, limit);
}

/** Format a Lab triple for display, e.g. "L* 54.29  a* 60.83  b* 45.16". */
export function formatLab({ l, a, b }) {
  return `L* ${l.toFixed(2)}  a* ${a.toFixed(2)}  b* ${b.toFixed(2)}`;
}

/** Format an HSV triple for display, e.g. "hsv(4, 88%, 80%)". */
export function formatHsv({ h, s, v }) {
  return `hsv(${h}, ${s}%, ${v}%)`;
}
