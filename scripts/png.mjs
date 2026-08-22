/**
 * Minimal opaque-PNG encoder.
 *
 * resvg emits 8-bit RGBA; the OG cards are fully opaque, so re-encoding them
 * as colour-type 2 (RGB) with adaptive filtering and max deflate roughly
 * halves the file size versus resvg's own output. Only Node's built-in zlib
 * is involved.
 */
import { deflateSync, crc32 } from 'node:zlib';

const FILTERS = [0, 1, 2, 3, 4];

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  return pb <= pc ? b : c;
}

function applyFilter(type, raw, prev, out, stride, bpp) {
  for (let i = 0; i < stride; i++) {
    const a = i >= bpp ? raw[i - bpp] : 0;
    const b = prev ? prev[i] : 0;
    const c = i >= bpp && prev ? prev[i - bpp] : 0;
    const x = raw[i];
    switch (type) {
      case 0: out[i] = x; break;
      case 1: out[i] = (x - a) & 0xff; break;
      case 2: out[i] = (x - b) & 0xff; break;
      case 3: out[i] = (x - ((a + b) >> 1)) & 0xff; break;
      default: out[i] = (x - paeth(a, b, c)) & 0xff;
    }
  }
}

/** Sum of absolute signed differences — the standard filter heuristic. */
function score(buf, stride) {
  let s = 0;
  for (let i = 0; i < stride; i++) s += buf[i] < 128 ? buf[i] : 256 - buf[i];
  return s;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body) >>> 0);
  return Buffer.concat([len, body, crc]);
}

/**
 * @param {Buffer} rgba  raw RGBA pixels (resvg's RenderedImage.pixels)
 * @returns {Buffer} PNG bytes, colour type 2 (alpha discarded)
 */
export function encodeOpaquePng(rgba, width, height) {
  const bpp = 3;
  const stride = width * bpp;

  const rows = [];
  let prev = null;
  const candidate = Buffer.alloc(stride);
  for (let y = 0; y < height; y++) {
    const raw = Buffer.alloc(stride);
    for (let x = 0; x < width; x++) {
      const s = (y * width + x) * 4;
      raw[x * 3] = rgba[s];
      raw[x * 3 + 1] = rgba[s + 1];
      raw[x * 3 + 2] = rgba[s + 2];
    }

    let best = null;
    let bestScore = Infinity;
    for (const type of FILTERS) {
      applyFilter(type, raw, prev, candidate, stride, bpp);
      const s = score(candidate, stride);
      if (s < bestScore) {
        bestScore = s;
        best = Buffer.concat([Buffer.from([type]), candidate]);
      }
    }
    rows.push(best);
    prev = raw;
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;   // bit depth
  ihdr[9] = 2;   // colour type: truecolour
  ihdr[10] = 0;  // deflate
  ihdr[11] = 0;  // adaptive filtering
  ihdr[12] = 0;  // no interlace

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(Buffer.concat(rows), { level: 9, memLevel: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}
