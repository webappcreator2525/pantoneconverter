/**
 * Colour maths for the card generators — WCAG relative luminance and
 * contrast, plus the mixing helpers used to derive a readable card palette
 * from a single brand colour.
 */

export function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

export function rgbToHex([r, g, b]) {
  return '#' + [r, g, b].map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0')).join('');
}

/** Linear blend; `t` is the amount of `b`. */
export function mix(a, b, t) {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  return rgbToHex([ar + (br - ar) * t, ag + (bg - ag) * t, ab + (bb - ab) * t]);
}

const channel = (v) => {
  const s = v / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};

/** WCAG 2.1 relative luminance. */
export function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map(channel);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG 2.1 contrast ratio, 1–21. */
export function contrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/**
 * Pushes `base` away from `against` — toward black or white, whichever
 * increases separation — until the pair clears `target`. Hue is preserved
 * because only a black/white mix is applied. Returns `base` untouched when
 * it already passes.
 */
export function towardContrast(base, against, target) {
  if (contrast(base, against) >= target) return base;
  const away = luminance(against) > 0.5 ? '#000000' : '#ffffff';
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 24; i++) {
    const t = (lo + hi) / 2;
    if (contrast(mix(base, away, t), against) >= target) hi = t;
    else lo = t;
  }
  return mix(base, away, hi);
}
