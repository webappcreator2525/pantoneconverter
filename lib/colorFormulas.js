/**
 * Input/output definitions for the two computed colour models — CIELAB and
 * HSV — shared by the four pages that use them, so /pantone-to-lab and
 * /lab-to-pantone can never disagree about a range or a label.
 *
 * Consumed by components/ConverterPage.jsx:
 *   fields    numeric inputs, also used to lay out the computed-value grid
 *   toRgb     field values → RGB, for the *-to-pantone direction
 *   fromRgb   RGB → model values, for the pantone-to-* direction
 *   format    model values → the single copyable string
 *   describe  field values → caption under the source swatch
 */
import {
  labToRgb, rgbToLab, formatLab,
  hsvToRgb, rgbToHsv, formatHsv,
  hexToRgb, rgbToHex, rgbToCmyk, cmykToRgb, formatCmyk, isValidHex,
} from './colorUtils';

export const LAB_FORMULA = {
  id: 'lab',
  outputLabel: 'CIELAB (D65 / 2° observer)',
  fields: [
    {
      id: 'lab-l', key: 'l', short: 'L*',
      label: 'Lightness (L*)',
      min: 0, max: 100, step: 0.1, initial: 53.2,
      unit: 'black → white', color: '#4b5563',
    },
    {
      id: 'lab-a', key: 'a', short: 'a*',
      label: 'Green ↔ Red (a*)',
      min: -128, max: 127, step: 0.1, initial: 80.1,
      unit: 'green → red', color: '#ef4444',
    },
    {
      id: 'lab-b', key: 'b', short: 'b*',
      label: 'Blue ↔ Yellow (b*)',
      min: -128, max: 127, step: 0.1, initial: 67.2,
      unit: 'blue → yellow', color: '#3b82f6',
    },
  ],
  toRgb: (l, a, b) => labToRgb(l, a, b),
  fromRgb: (rgb) => rgbToLab(rgb.r, rgb.g, rgb.b),
  format: (lab) => formatLab(lab),
  describe: (l, a, b) => `L* ${l}  a* ${a}  b* ${b}`,
};

export const HSV_FORMULA = {
  id: 'hsv',
  outputLabel: 'HSV / HSB',
  fields: [
    {
      id: 'hsv-h', key: 'h', short: 'H',
      label: 'Hue (H)',
      min: 0, max: 360, step: 1, initial: 350,
      unit: 'degrees', color: '#c44eed',
    },
    {
      id: 'hsv-s', key: 's', short: 'S',
      label: 'Saturation (S)',
      min: 0, max: 100, step: 1, initial: 92,
      unit: 'percent', color: '#4361EE',
    },
    {
      id: 'hsv-v', key: 'v', short: 'V',
      label: 'Value / Brightness (V)',
      min: 0, max: 100, step: 1, initial: 78,
      unit: 'percent', color: '#00D4AA',
    },
  ],
  toRgb: (h, s, v) => hsvToRgb(h, s, v),
  fromRgb: (rgb) => rgbToHsv(rgb.r, rgb.g, rgb.b),
  format: (hsv) => formatHsv(hsv),
  describe: (h, s, v) => `hsv(${h}, ${s}%, ${v}%)`,
};

/**
 * HEX is a text field rather than three sliders, so it declares `kind: 'text'`
 * and supplies `parse`. `fields` still describes the breakdown grid — for HEX
 * the useful breakdown is the RGB channels behind it.
 */
export const HEX_FORMULA = {
  id: 'hex',
  kind: 'text',
  outputLabel: 'HEX',
  placeholder: '#0F4C81',
  initial: '#0F4C81',
  fields: [
    { id: 'hex-r', key: 'r', short: 'R', label: 'Red',   min: 0, max: 255, step: 1, initial: 15,  unit: '0–255', color: '#ef4444' },
    { id: 'hex-g', key: 'g', short: 'G', label: 'Green', min: 0, max: 255, step: 1, initial: 76,  unit: '0–255', color: '#22c55e' },
    { id: 'hex-b', key: 'b', short: 'B', label: 'Blue',  min: 0, max: 255, step: 1, initial: 129, unit: '0–255', color: '#3b82f6' },
  ],
  parse: (str) => (isValidHex(str) ? hexToRgb(str) : null),
  fromRgb: (rgb) => ({ hex: rgbToHex(rgb.r, rgb.g, rgb.b), r: rgb.r, g: rgb.g, b: rgb.b }),
  format: (o) => o.hex,
  describe: (str) => str.trim().toUpperCase(),
};

/**
 * CMYK as a conversion target. Used by the textile page, where the point is not
 * "what is the CMYK of this colour" in the abstract but "what four-colour build
 * should the printer start from", so the four channels are shown broken out.
 */
export const CMYK_FORMULA = {
  id: 'cmyk',
  outputLabel: 'CMYK',
  fields: [
    { id: 'cmyk-c', key: 'c', short: 'C', label: 'Cyan',    min: 0, max: 100, step: 1, initial: 0,  unit: 'percent', color: '#06b6d4' },
    { id: 'cmyk-m', key: 'm', short: 'M', label: 'Magenta', min: 0, max: 100, step: 1, initial: 0,  unit: 'percent', color: '#ec4899' },
    { id: 'cmyk-y', key: 'y', short: 'Y', label: 'Yellow',  min: 0, max: 100, step: 1, initial: 0,  unit: 'percent', color: '#eab308' },
    { id: 'cmyk-k', key: 'k', short: 'K', label: 'Key',     min: 0, max: 100, step: 1, initial: 0,  unit: 'percent', color: '#374151' },
  ],
  toRgb: (c, m, y, k) => cmykToRgb(c, m, y, k),
  fromRgb: (rgb) => rgbToCmyk(rgb.r, rgb.g, rgb.b),
  format: (cmyk) => formatCmyk(cmyk),
  describe: (c, m, y, k) => `C:${c} M:${m} Y:${y} K:${k}`,
};
