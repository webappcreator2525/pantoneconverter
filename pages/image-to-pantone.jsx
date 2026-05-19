import Head from 'next/head';
import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import {
  ImageIcon, Upload, RefreshCw, Heart, Copy, Check,
  ChevronRight, Zap, AlertCircle, Shield, Palette, Smartphone, Lightbulb, Download,
} from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import pantoneDb from '../data/pantone.json';
import { findClosestPantones, isLightColor, rgbToHex } from '../lib/colorUtils';
import { useFavorites } from '../lib/FavoritesContext';

// ─── Pre-filter DB once at module level ──────────────────────────
const COATED_DB   = pantoneDb.filter(e => e.collection === 'coated');
const UNCOATED_DB = pantoneDb.filter(e => e.collection === 'uncoated');

const SAMPLE_COUNT   = 5000;
const QUANT_STEP     = 32;   // round to nearest 32
const TOP_N_COLORS   = 6;
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

// ─── Quantize a single channel ───────────────────────────────────
function quantize(v) {
  return Math.round(v / QUANT_STEP) * QUANT_STEP;
}

// ─── Sample pixels from canvas and return top dominant colors ────
function extractDominantColors(canvas, topN = TOP_N_COLORS) {
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;
  const total = width * height;
  const imageData = ctx.getImageData(0, 0, width, height).data; // Uint8ClampedArray

  const freq = {};

  for (let i = 0; i < SAMPLE_COUNT; i++) {
    const pixelIndex = Math.floor(Math.random() * total);
    const offset = pixelIndex * 4;
    const a = imageData[offset + 3];
    if (a < 128) continue; // skip transparent pixels

    const r = quantize(imageData[offset]);
    const g = quantize(imageData[offset + 1]);
    const b = quantize(imageData[offset + 2]);
    const key = `${r},${g},${b}`;
    freq[key] = (freq[key] || 0) + 1;
  }

  const sorted = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN);

  return sorted.map(([key, count]) => {
    const [r, g, b] = key.split(',').map(Number);
    return { r, g, b, hex: rgbToHex(r, g, b), count };
  });
}

// ─── Copy Button ─────────────────────────────────────────────────
function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);
  const handle = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch (_) {}
  };
  return (
    <button
      onClick={handle}
      className={`copy-btn${copied ? ' copied' : ''}`}
      title={`Copy ${text}`}
      style={{ fontSize: '0.7rem', padding: '0.2rem 0.55rem' }}
    >
      {copied ? <Check size={10} /> : <Copy size={10} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

// ─── Result card for one extracted color ─────────────────────────
function ResultCard({ extracted, match, rank }) {
  const { isSaved, toggleFavorite } = useFavorites();
  const saved = isSaved(match.name);

  const simBadge =
    match.similarity > 92 ? { bg: '#dcfce7', fg: '#166534' } :
    match.similarity > 80 ? { bg: '#fef9c3', fg: '#854d0e' } :
                            { bg: '#fee2e2', fg: '#991b1b' };

  const handleFav = () => toggleFavorite({
    name:       match.name,
    hex:        match.hex,
    rgb:        match.rgb,
    cmyk:       match.cmyk,
    collection: match.collection ?? '',
  });

  return (
    <div
      style={{
        background: '#ffffff',
        border: '1.5px solid #f3f4f6',
        borderRadius: '1.25rem',
        overflow: 'hidden',
        transition: 'box-shadow 0.2s, transform 0.2s, border-color 0.2s',
        animation: `fadeIn 0.35s ease-out ${rank * 70}ms both`,
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(196,78,237,0.12)';
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.borderColor = '#e9a8fd';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = '#f3f4f6';
      }}
    >
      {/* Swatch row: extracted → pantone */}
      <div style={{ display: 'flex', height: '7rem' }}>
        {/* Extracted color */}
        <div style={{
          flex: 1, backgroundColor: extracted.hex,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'flex-end',
          padding: '0.5rem',
          position: 'relative',
        }}>
          <span style={{
            fontSize: '0.55rem', fontWeight: 800,
            color: isLightColor(extracted.hex) ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.75)',
            textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>
            From image
          </span>
        </div>

        {/* Arrow divider */}
        <div style={{
          width: '2rem', background: '#f9fafb',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          borderLeft: '1px solid #f3f4f6',
          borderRight: '1px solid #f3f4f6',
        }}>
          <ChevronRight size={14} color="#6b7280" />
        </div>

        {/* Pantone match color */}
        <div style={{
          flex: 1, backgroundColor: match.hex,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'flex-end',
          padding: '0.5rem',
        }}>
          <span style={{
            fontSize: '0.55rem', fontWeight: 800,
            color: isLightColor(match.hex) ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.75)',
            textTransform: 'uppercase', letterSpacing: '0.1em',
          }}>
            Pantone
          </span>
        </div>
      </div>

      {/* Info section */}
      <div style={{ padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.45rem', flex: 1 }}>
        {/* Name + similarity */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.4rem' }}>
          <span style={{ fontWeight: 700, fontSize: '0.8rem', color: '#111827', lineHeight: 1.3 }}>
            {match.name}
          </span>
          <button
            onClick={handleFav}
            aria-label={saved ? 'Remove from favorites' : 'Save to favorites'}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '0.15rem', flexShrink: 0, display: 'flex',
              transition: 'transform 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.25)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Heart
              size={15}
              fill={saved ? '#ef4444' : 'none'}
              color={saved ? '#ef4444' : '#6b7280'}
              strokeWidth={2}
            />
          </button>
        </div>

        {/* Similarity badge */}
        <span style={{
          display: 'inline-block', alignSelf: 'flex-start',
          fontSize: '0.68rem', fontWeight: 700,
          background: simBadge.bg, color: simBadge.fg,
          padding: '0.1rem 0.55rem', borderRadius: '9999px',
        }}>
          {match.similarity.toFixed(1)}% match
        </span>

        {/* HEX value */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', width: '2.1rem', flexShrink: 0 }}>HEX</span>
          <code style={{ fontSize: '0.73rem', fontWeight: 600, color: '#374151', background: '#f3f4f6', padding: '0.1rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace' }}>
            {match.hex}
          </code>
          <CopyBtn text={match.hex} />
        </div>
      </div>
    </div>
  );
}

// ─── Drag-and-drop upload zone ────────────────────────────────────
function UploadZone({ onFile }) {
  const [dragging, setDragging] = useState(false);
  const [error, setError]       = useState('');
  const inputRef                = useRef(null);

  const validate = (file) => {
    if (!file) return 'No file selected.';
    if (!ACCEPTED_TYPES.includes(file.type)) return 'Unsupported format. Use JPG, PNG, WebP or GIF.';
    if (file.size > MAX_FILE_BYTES) return 'File is too large. Max size is 10 MB.';
    return null;
  };

  const process = (file) => {
    const err = validate(file);
    if (err) { setError(err); return; }
    setError('');
    onFile(file);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    process(file);
  }, []);

  const onDragOver  = (e) => { e.preventDefault(); setDragging(true);  };
  const onDragLeave = ()  => setDragging(false);

  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        style={{
          border: `2px dashed ${dragging ? '#c44eed' : '#d1d5db'}`,
          borderRadius: '1.5rem',
          padding: '4rem 2rem',
          textAlign: 'center',
          cursor: 'pointer',
          background: dragging
            ? 'linear-gradient(135deg,#fdf4ff,#eff6ff)'
            : 'linear-gradient(135deg,#fafafa,#f3f4f6)',
          transition: 'all 0.2s ease',
          userSelect: 'none',
        }}
      >
        {/* Icon */}
        <div style={{
          width: '5rem', height: '5rem',
          borderRadius: '1.25rem',
          background: dragging
            ? 'linear-gradient(135deg,#c44eed,#4361EE)'
            : 'linear-gradient(135deg,#f3d0fe,#c7d2fe)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.5rem',
          transition: 'all 0.2s ease',
          boxShadow: dragging ? '0 8px 24px rgba(196,78,237,0.35)' : 'none',
        }}>
          {dragging
            ? <Upload size={28} color="#fff" />
            : <ImageIcon size={28} color="#a855f7" />
          }
        </div>

        <p style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', margin: '0 0 0.4rem' }}>
          {dragging ? 'Drop your image here' : 'Drag & drop an image'}
        </p>
        <p style={{ fontSize: '0.875rem', color: '#4b5563', margin: '0 0 0.75rem', fontWeight: 500 }}>
          or <span style={{ color: '#c44eed', fontWeight: 700 }}>click to browse</span>
        </p>
        <p style={{ fontSize: '0.72rem', color: '#6b7280', margin: 0 }}>
          JPG · PNG · WebP · GIF &nbsp;·&nbsp; Max 10 MB
        </p>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(',')}
          style={{ display: 'none' }}
          onChange={e => process(e.target.files?.[0])}
        />
      </div>

      {error && (
        <div style={{
          marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem',
          color: '#dc2626', fontSize: '0.82rem', fontWeight: 600,
        }}>
          <AlertCircle size={14} />
          {error}
        </div>
      )}
    </div>
  );
}

// ─── Surface toggle (Coated / Uncoated) ──────────────────────────
function SurfaceToggle({ value, onChange }) {
  return (
    <div style={{
      display: 'inline-flex', background: '#f3f4f6',
      borderRadius: '0.875rem', padding: '0.25rem', gap: '0.25rem',
    }}>
      {['coated', 'uncoated'].map(s => (
        <button
          key={s}
          onClick={() => onChange(s)}
          style={{
            padding: '0.45rem 1rem',
            borderRadius: '0.625rem',
            border: 'none', fontFamily: 'inherit',
            fontWeight: 700, fontSize: '0.8rem',
            cursor: 'pointer',
            transition: 'all 0.18s ease',
            ...(value === s ? {
              background: 'linear-gradient(135deg,#c44eed,#4361EE)',
              color: '#ffffff',
              boxShadow: '0 2px 8px rgba(196,78,237,0.35)',
            } : {
              background: 'transparent',
              color: '#4b5563',
            }),
          }}
        >
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </button>
      ))}
    </div>
  );
}

// ─── Palette strip preview ────────────────────────────────────────
function PaletteStrip({ colors }) {
  return (
    <div style={{
      display: 'flex', height: '3rem', borderRadius: '0.875rem',
      overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
    }}>
      {colors.map((c, i) => (
        <div
          key={i}
          style={{ flex: 1, backgroundColor: c.hex }}
          title={c.hex}
        />
      ))}
    </div>
  );
}

// ─── Download Palette as PNG helper ──────────────────────────────
function downloadPalettePng(colors, type = 'extracted', surface = 'coated') {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  const numColors = colors.length;
  const padding = 60;
  const cardWidth = 200;
  const cardHeight = 320;
  const gap = 30;
  
  canvas.width = padding * 2 + numColors * cardWidth + (numColors - 1) * gap;
  canvas.height = 540;
  
  // 1. Draw background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // 2. Draw watermark/header
  ctx.fillStyle = '#111827';
  ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
  const titleText = type === 'extracted' ? 'Dominant Extracted Palette' : `Pantone ${surface === 'coated' ? 'Coated' : 'Uncoated'} Matches`;
  ctx.fillText(titleText, padding, 55);
  
  ctx.fillStyle = '#6b7280';
  ctx.font = '14px system-ui, -apple-system, sans-serif';
  ctx.fillText('pantoneconverter.com', padding, 80);
  
  // 3. Draw swatches
  const startY = 130;
  colors.forEach((col, index) => {
    const x = padding + index * (cardWidth + gap);
    const y = startY;
    
    // Draw card border
    ctx.strokeStyle = '#f3f4f6';
    ctx.lineWidth = 1.5;
    const radius = 16;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + cardWidth - radius, y);
    ctx.quadraticCurveTo(x + cardWidth, y, x + cardWidth, y + radius);
    ctx.lineTo(x + cardWidth, y + cardHeight - radius);
    ctx.quadraticCurveTo(x + cardWidth, y + cardHeight, x + cardWidth - radius, y + cardHeight);
    ctx.lineTo(x + radius, y + cardHeight);
    ctx.quadraticCurveTo(x, y + cardHeight, x, y + cardHeight - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.stroke();
    
    // Fill card background
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    
    // Draw swatch block inside card (top part)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + cardWidth - radius, y);
    ctx.quadraticCurveTo(x + cardWidth, y, x + cardWidth, y + radius);
    ctx.lineTo(x + cardWidth, y + 200);
    ctx.lineTo(x, y + 200);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.clip();
    
    ctx.fillStyle = col.hex;
    ctx.fillRect(x, y, cardWidth, 200);
    ctx.restore();
    
    // Draw color info labels
    if (type === 'extracted') {
      ctx.fillStyle = '#111827';
      ctx.font = 'bold 18px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
      ctx.fillText(col.hex.toUpperCase(), x + 20, y + 245);
      
      ctx.fillStyle = '#6b7280';
      ctx.font = 'bold 11px system-ui, -apple-system, sans-serif';
      ctx.fillText(`COLOR ${index + 1}`, x + 20, y + 275);
    } else {
      ctx.fillStyle = '#111827';
      ctx.font = 'bold 16px system-ui, -apple-system, sans-serif';
      let displayName = col.name;
      if (displayName.length > 16) displayName = displayName.slice(0, 14) + '...';
      ctx.fillText(displayName, x + 20, y + 240);
      
      ctx.fillStyle = '#4b5563';
      ctx.font = '14px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
      ctx.fillText(col.hex.toUpperCase(), x + 20, y + 265);
      
      ctx.fillStyle = '#9ca3af';
      ctx.font = 'bold 10px system-ui, -apple-system, sans-serif';
      ctx.fillText(surface.toUpperCase(), x + 20, y + 290);
    }
  });
  
  // 4. Download trigger
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `${type}-palette-${surface}.png`;
  link.href = dataUrl;
  link.click();
}

// ─── Main page ────────────────────────────────────────────────────
export default function ImageToPantone() {
  const [imgSrc,    setImgSrc]    = useState(null);   // data URL for preview
  const [fileName,  setFileName]  = useState('');
  const [surface,   setSurface]   = useState('coated');
  const [loading,   setLoading]   = useState(false);
  const [extracted, setExtracted] = useState([]);     // raw extracted colors
  const [customColor, setCustomColor] = useState(null); // { r, g, b, hex }
  const canvasRef                 = useRef(null);

  // Compute dominant colors matching dynamically
  const results = useMemo(() => {
    const db = surface === 'coated' ? COATED_DB : UNCOATED_DB;
    return extracted.map(color => {
      const [match] = findClosestPantones({ r: color.r, g: color.g, b: color.b }, db, 1);
      return { extracted: color, match };
    });
  }, [extracted, surface]);

  // Compute selected custom color matching dynamically
  const customMatch = useMemo(() => {
    if (!customColor) return null;
    const db = surface === 'coated' ? COATED_DB : UNCOATED_DB;
    const [match] = findClosestPantones({ r: customColor.r, g: customColor.g, b: customColor.b }, db, 1);
    return { extracted: customColor, match };
  }, [customColor, surface]);

  // Process an uploaded file
  const handleFile = useCallback((file) => {
    setLoading(true);
    setExtracted([]);
    setCustomColor(null);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setImgSrc(dataUrl);

      const img = new Image();
      img.onload = () => {
        // Draw onto canvas (scale down if large to keep perf snappy)
        const canvas  = canvasRef.current;
        const MAX_DIM = 800;
        let { width, height } = img;
        if (width > MAX_DIM || height > MAX_DIM) {
          const ratio = Math.min(MAX_DIM / width, MAX_DIM / height);
          width  = Math.round(width  * ratio);
          height = Math.round(height * ratio);
        }
        canvas.width  = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);

        // Extract colors
        const dominant = extractDominantColors(canvas, TOP_N_COLORS);
        setExtracted(dominant);
        setLoading(false);
      };
      img.onerror = () => setLoading(false);
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleImageClick = (e) => {
    const img = e.target;
    const rect = img.getBoundingClientRect();
    
    // Position clicked inside image element
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Account for object-fit contain if the aspect ratio differs
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;
    
    const imgRatio = naturalWidth / naturalHeight;
    const rectRatio = rect.width / rect.height;
    
    let renderWidth = rect.width;
    let renderHeight = rect.height;
    let offsetX = 0;
    let offsetY = 0;
    
    if (rectRatio > imgRatio) {
      // Width is larger than necessary, height is full
      renderWidth = rect.height * imgRatio;
      offsetX = (rect.width - renderWidth) / 2;
    } else {
      // Height is larger than necessary, width is full
      renderHeight = rect.width / imgRatio;
      offsetY = (rect.height - renderHeight) / 2;
    }
    
    // Coordinates relative to the actual rendering boundary of the image
    const relativeX = x - offsetX;
    const relativeY = y - offsetY;
    
    if (relativeX < 0 || relativeX > renderWidth || relativeY < 0 || relativeY > renderHeight) {
      // Clicked on the padding area of object-fit contain
      return;
    }
    
    const scaleX = canvas.width / renderWidth;
    const scaleY = canvas.height / renderHeight;
    
    const canvasX = Math.floor(relativeX * scaleX);
    const canvasY = Math.floor(relativeY * scaleY);
    
    const ctx = canvas.getContext('2d');
    try {
      const pixel = ctx.getImageData(
        Math.min(canvas.width - 1, Math.max(0, canvasX)),
        Math.min(canvas.height - 1, Math.max(0, canvasY)),
        1, 1
      ).data;
      const r = pixel[0];
      const g = pixel[1];
      const b = pixel[2];
      const hex = rgbToHex(r, g, b);
      setCustomColor({ r, g, b, hex });
    } catch (err) {
      console.error("Error sampling pixel:", err);
    }
  };

  const reset = () => {
    setImgSrc(null);
    setFileName('');
    setExtracted([]);
    setCustomColor(null);
    setLoading(false);
    if (canvasRef.current) {
      canvasRef.current.width  = 0;
      canvasRef.current.height = 0;
    }
  };

  const hasResults = extracted.length > 0;

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Image to Pantone Color Extractor",
    "url": "https://pantoneconverter.com/image-to-pantone/",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript",
    "description": "Upload any image and instantly extract its dominant colors as Pantone PMS matches. Free, client-side, no login required.",
  };

  return (
    <>
      <Head>
        <title>Image to Pantone Color Extractor — Find Pantone Colors in Any Image</title>
        <meta
          name="description"
          content="Upload any image and instantly extract its dominant colors as Pantone PMS matches. Free, client-side, no login required."
        />
        <link rel="canonical" href="https://pantoneconverter.com/image-to-pantone/" />
        <meta property="og:title" content="Image to Pantone Color Extractor — Find Pantone Colors in Any Image" />
        <meta
          property="og:description"
          content="Upload any image and instantly extract its dominant colors as Pantone PMS matches. Free, client-side, no login required."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <NavBar />

      {/* Hidden canvas for pixel sampling */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <main style={{ minHeight: '100vh', background: '#fafafa' }}>

        {/* ── Hero strip ─────────────────────────────────────── */}
        <div style={{
          background: 'linear-gradient(135deg,#fdf4ff 0%,#eff6ff 60%,#f0fdf4 100%)',
          borderBottom: '1px solid #f3f4f6',
          padding: '2.5rem 1.5rem 2rem',
        }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '0.625rem' }}>
              <div style={{
                width: '2.75rem', height: '2.75rem', borderRadius: '0.875rem',
                background: 'linear-gradient(135deg,#c44eed,#4361EE)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(196,78,237,0.35)',
                flexShrink: 0,
              }}>
                <ImageIcon size={18} color="#fff" />
              </div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#111827', margin: 0, letterSpacing: '-0.02em' }}>
                Image to Pantone Color Extractor
              </h1>
            </div>
            <p style={{ color: '#4b5563', fontSize: '1rem', margin: 0, maxWidth: '46rem', lineHeight: 1.6 }}>
              Upload any image and we'll extract the {TOP_N_COLORS} dominant colors and match each to the closest
              Pantone PMS color — instantly, in your browser, with no file ever leaving your device.
            </p>

            {/* Feature pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
              {[
                { Icon: Shield,     text: '100% client-side'    },
                { Icon: Zap,        text: 'Instant results'      },
                { Icon: Palette,    text: '3200+ Pantone colors' },
                { Icon: Smartphone, text: 'Works on mobile'      },
              ].map(({ Icon, text }) => (
                <span key={text} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                  fontSize: '0.72rem', fontWeight: 700,
                  background: 'rgba(255,255,255,0.8)',
                  border: '1px solid #e9d5ff',
                  color: '#6b21a8', padding: '0.25rem 0.75rem',
                  borderRadius: '9999px', backdropFilter: 'blur(4px)',
                }}>
                  <Icon size={14} />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main content ───────────────────────────────────── */}
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>

          {/* ── STEP 1 + 2: Upload & image preview ─────────── */}
          {!imgSrc ? (
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                marginBottom: '1.25rem',
              }}>
                <span style={{
                  width: '1.5rem', height: '1.5rem', borderRadius: '50%',
                  background: 'linear-gradient(135deg,#c44eed,#4361EE)',
                  color: '#fff', fontWeight: 800, fontSize: '0.72rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>1</span>
                <span style={{ fontWeight: 800, fontSize: '0.9rem', color: '#374151' }}>
                  Upload your image
                </span>
              </div>
              <UploadZone onFile={handleFile} />
            </div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.75rem' }}>

              {/* Image preview card */}
              <div className="card" style={{ flex: '0 0 auto', maxWidth: '420px', minWidth: '240px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.875rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.82rem', color: '#374151' }}>
                    📷 {fileName}
                  </span>
                  <button
                    onClick={reset}
                    className="copy-btn"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                  >
                    <RefreshCw size={11} />
                    Try another
                  </button>
                </div>
                <img
                  src={imgSrc}
                  alt="Uploaded preview"
                  onClick={handleImageClick}
                  style={{
                    width: '100%', maxWidth: '400px',
                    borderRadius: '0.75rem',
                    border: '1px solid #f3f4f6',
                    display: 'block',
                    objectFit: 'contain',
                    cursor: 'crosshair',
                  }}
                />
                <p style={{ fontSize: '0.72rem', color: '#6b7280', marginTop: '0.5rem', textAlign: 'center', fontWeight: 600 }}>
                  💡 Click anywhere on the image to sample that pixel!
                </p>
              </div>

              {/* Palette strip + loading/controls */}
              <div style={{ flex: 1, minWidth: '220px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {loading ? (
                  <div className="card" style={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    minHeight: '10rem', gap: '1rem',
                  }}>
                    <div style={{
                      width: '3rem', height: '3rem', borderRadius: '50%',
                      border: '3px solid #f3d0fe',
                      borderTopColor: '#c44eed',
                      animation: 'spin 0.9s linear infinite',
                    }} />
                    <p style={{ color: '#4b5563', fontWeight: 600, fontSize: '0.875rem', margin: 0 }}>
                      Sampling pixels…
                    </p>
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                  </div>
                ) : hasResults && (
                  <>
                    {/* Palette strip */}
                    <div className="card" style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem' }}>
                        <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                          Extracted palette
                        </div>
                        <button
                          onClick={() => downloadPalettePng(results.map(r => r.extracted), 'extracted', surface)}
                          style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                            fontSize: '0.72rem', fontWeight: 700, color: '#7c3aed',
                            padding: '0.2rem 0.45rem', borderRadius: '0.375rem',
                            transition: 'all 0.15s ease',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#f5f3ff'; e.currentTarget.style.color = '#6d28d9'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#7c3aed'; }}
                        >
                          <Download size={11} />
                          Download PNG
                        </button>
                      </div>
                      <PaletteStrip colors={results.map(r => r.extracted)} />
                      <div style={{ fontSize: '0.68rem', color: '#6b7280', marginTop: '0.5rem' }}>
                        {TOP_N_COLORS} dominant colors · sampled from {SAMPLE_COUNT.toLocaleString()} pixels
                      </div>
                    </div>

                    {/* Pantone palette strip */}
                    <div className="card" style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.625rem' }}>
                        <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                          Pantone matches
                        </div>
                        <button
                          onClick={() => downloadPalettePng(results.map(r => r.match), 'pantone', surface)}
                          style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                            fontSize: '0.72rem', fontWeight: 700, color: '#7c3aed',
                            padding: '0.2rem 0.45rem', borderRadius: '0.375rem',
                            transition: 'all 0.15s ease',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#f5f3ff'; e.currentTarget.style.color = '#6d28d9'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#7c3aed'; }}
                        >
                          <Download size={11} />
                          Download PNG
                        </button>
                      </div>
                      <PaletteStrip colors={results.map(r => ({ hex: r.match.hex }))} />
                    </div>

                    {/* Collection toggle */}
                    <div className="card" style={{ padding: '1rem' }}>
                      <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.625rem' }}>
                        Pantone collection
                      </div>
                      <SurfaceToggle value={surface} onChange={setSurface} />
                      <p style={{ fontSize: '0.71rem', color: '#6b7280', margin: '0.5rem 0 0', lineHeight: 1.4 }}>
                        {surface === 'coated'
                          ? 'Coated (C) — for glossy or coated paper. More vibrant.'
                          : 'Uncoated (U) — for matte or uncoated paper. Slightly duller.'}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ── STEP 3: Results grid ─────────────────────────── */}
          {hasResults && (
            <div style={{ animation: 'slideUp 0.4s ease-out' }}>
              <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', flexWrap: 'wrap',
                gap: '0.75rem', marginBottom: '1rem',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{
                    width: '1.5rem', height: '1.5rem', borderRadius: '50%',
                    background: 'linear-gradient(135deg,#c44eed,#4361EE)',
                    color: '#fff', fontWeight: 800, fontSize: '0.72rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>3</span>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', margin: 0 }}>
                    Dominant Colors &amp; Pantone Matches
                  </h2>
                </div>
                <span className="badge badge-purple">
                  {surface === 'coated' ? 'Coated (C)' : 'Uncoated (U)'}
                </span>
              </div>
              {/* Selected Pixel Match */}
              {customMatch && (
                <div style={{ marginBottom: '1.5rem', animation: 'fadeIn 0.3s ease-out' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                    <div style={{
                      width: '1.5rem', height: '1.5rem', borderRadius: '50%',
                      background: 'linear-gradient(135deg,#c44eed,#4361EE)',
                      color: '#fff', fontWeight: 800, fontSize: '0.72rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>🎯</div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', margin: 0 }}>
                      Selected Pixel Match
                    </h3>
                  </div>
                  <div className="card" style={{ border: '2px solid #c44eed', background: '#fdf4ff', padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                      {/* Swatches */}
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <div style={{
                          width: '4.5rem', height: '4.5rem', borderRadius: '0.75rem',
                          backgroundColor: customMatch.extracted.hex, border: '1px solid rgba(0,0,0,0.1)',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: '0.35rem'
                        }}>
                          <span style={{ fontSize: '0.52rem', fontWeight: 800, color: isLightColor(customMatch.extracted.hex) ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.75)', textTransform: 'uppercase' }}>Image</span>
                        </div>
                        <ChevronRight size={18} color="#c44eed" />
                        <div style={{
                          width: '4.5rem', height: '4.5rem', borderRadius: '0.75rem',
                          backgroundColor: customMatch.match.hex, border: '1px solid rgba(0,0,0,0.1)',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: '0.35rem'
                        }}>
                          <span style={{ fontSize: '0.52rem', fontWeight: 800, color: isLightColor(customMatch.match.hex) ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.75)', textTransform: 'uppercase' }}>Pantone</span>
                        </div>
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: '220px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.45rem', flexWrap: 'wrap' }}>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', margin: 0 }}>{customMatch.match.name}</h4>
                          <span style={{
                            fontSize: '0.68rem', fontWeight: 700,
                            background: customMatch.match.similarity > 90 ? '#dcfce7' : '#fee2e2',
                            color: customMatch.match.similarity > 90 ? '#166534' : '#991b1b',
                            padding: '0.15rem 0.55rem', borderRadius: '9999px'
                          }}>
                            {customMatch.match.similarity.toFixed(1)}% match
                          </span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                          {[
                            { lbl: 'HEX', val: customMatch.match.hex },
                            { lbl: 'RGB', val: `${customMatch.match.rgb.r}, ${customMatch.match.rgb.g}, ${customMatch.match.rgb.b}` },
                            { lbl: 'CMYK', val: `C:${customMatch.match.cmyk.c} M:${customMatch.match.cmyk.m} Y:${customMatch.match.cmyk.y} K:${customMatch.match.cmyk.k}` }
                          ].map(({ lbl, val }) => (
                            <div key={lbl} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{lbl}</span>
                              <code style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', background: '#f3f4f6', padding: '0.1rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace' }}>{val}</code>
                              <CopyBtn text={val} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: '1rem',
              }}>
                {results.map((r, i) => (
                  <ResultCard
                    key={i}
                    rank={i}
                    extracted={r.extracted}
                    match={r.match}
                  />
                ))}
              </div>

              {/* Tip */}
              <div style={{
                marginTop: '1.25rem',
                padding: '0.875rem 1.1rem',
                background: 'linear-gradient(135deg,#fdf4ff,#eff6ff)',
                borderRadius: '0.875rem',
                border: '1px solid #e9d5ff',
                display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
              }}>
                <Lightbulb size={14} color="#c44eed" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
                <p style={{ fontSize: '0.78rem', color: '#6b21a8', margin: 0, fontWeight: 500, lineHeight: 1.5 }}>
                  <strong>Tip:</strong> Click the ♡ heart on any card to save a Pantone color to your favorites.
                  Switch between Coated and Uncoated above to compare results across Pantone collections.
                </p>
              </div>
            </div>
          )}

          {/* ── SEO block ──────────────────────────────────────── */}
          <div className="card" style={{ borderTop: '3px solid #c44eed', marginTop: '2.5rem' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem' }}>
              How Image-to-Pantone Extraction Works
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75, margin: 0 }}>
              When you upload an image, this tool reads the raw pixel data directly in your browser using an HTML
              Canvas element — no file is ever sent to a server. It randomly samples {SAMPLE_COUNT.toLocaleString()} pixels
              from the image and applies color quantization (grouping R, G, B values into buckets of {QUANT_STEP}) to
              reduce noise and find the truly dominant hues. The {TOP_N_COLORS} most frequent color groups are then
              matched against the full Pantone PMS database using a perceptually-weighted RGB distance algorithm.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75, marginTop: '0.75rem', marginBottom: 0 }}>
              This workflow is ideal for brand managers who need to identify the Pantone equivalents of colors appearing
              in photography, artwork, or existing design files — without manually eyedropping and converting values.
              Results work best on images with a clear dominant color palette; highly detailed or photographic images
              with thousands of similar shades may produce less distinct groupings.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
