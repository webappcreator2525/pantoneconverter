import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Sliders, Copy, Check, Heart, RefreshCw } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CoatedUncoatedComparison from '../components/CoatedUncoatedComparison';
import FAQSection from '../components/FAQSection';
import pantoneDb from '../data/pantone.json';
import { cmykToRgb, rgbToHex, isLightColor, getMatchesFromCmyk } from '../lib/colorUtils';
import { useFavorites } from '../lib/FavoritesContext';

// ─── Pre-filter DB by collection at module level (runs once) ─────
const COATED_DB   = pantoneDb.filter(e => e.collection === 'coated');
const UNCOATED_DB = pantoneDb.filter(e => e.collection === 'uncoated');

// ─── CopyButton ───────────────────────────────────────────────────
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch (_) {}
  };

  return (
    <button
      onClick={handleCopy}
      className={`copy-btn${copied ? ' copied' : ''}`}
      title={`Copy ${text}`}
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

// ─── MatchCard ────────────────────────────────────────────────────
function MatchCard({ match, rank }) {
  const { c, m, y, k } = match.cmyk;
  const { r, g, b } = match.rgb;
  const cmykStr = `C:${c} M:${m} Y:${y} K:${k}`;
  const rgbStr  = `${r}, ${g}, ${b}`;

  const { isSaved, toggleFavorite } = useFavorites();
  const saved = isSaved(match.name);

  const handleFavorite = () => {
    toggleFavorite({
      name:       match.name,
      hex:        match.hex,
      rgb:        match.rgb,
      cmyk:       match.cmyk,
      collection: match.collection ?? '',
    });
  };

  const simColor =
    match.similarity > 95 ? { bg: '#dcfce7', fg: '#166534' } :
    match.similarity > 85 ? { bg: '#fef9c3', fg: '#854d0e' } :
                            { bg: '#fee2e2', fg: '#991b1b' };

  return (
    <div className="match-card" style={{ position: 'relative', animationDelay: `${rank * 60}ms` }}>
      {/* Rank badge */}
      <div style={{
        position: 'absolute', top: '-0.5rem', left: '1rem',
        background: rank === 0 ? 'linear-gradient(135deg,#c44eed,#4361EE)' : '#e5e7eb',
        color: rank === 0 ? '#fff' : '#4b5563',
        borderRadius: '9999px', fontSize: '0.65rem', fontWeight: 700,
        padding: '0.15rem 0.5rem', letterSpacing: '0.04em',
      }}>
        {rank === 0 ? '★ Best Match' : `#${rank + 1}`}
      </div>

      {/* Swatch */}
      <div className="swatch-md" style={{ backgroundColor: match.hex, flexShrink: 0 }} title={match.hex} />

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#111827' }}>
            {match.name}
          </span>
          <span className="badge" style={{ background: simColor.bg, color: simColor.fg }}>
            {match.similarity.toFixed(1)}% match
          </span>
          {/* Heart / Favorite button */}
          <button
            onClick={handleFavorite}
            aria-label={saved ? 'Remove from favorites' : 'Save to favorites'}
            title={saved ? 'Remove from favorites' : 'Save to favorites'}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '0.375rem', marginLeft: 'auto', flexShrink: 0,
              transition: 'transform 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Heart size={17} fill={saved ? '#ef4444' : 'none'} color={saved ? '#ef4444' : '#6b7280'} strokeWidth={2} />
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
          {/* HEX */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#4b5563', fontWeight: 600 }}>HEX</span>
            <code style={{ fontSize: '0.75rem', color: '#374151', background: '#f3f4f6', padding: '0.1rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace' }}>
              {match.hex}
            </code>
            <CopyButton text={match.hex} />
          </div>
          {/* RGB */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#4b5563', fontWeight: 600 }}>RGB</span>
            <code style={{ fontSize: '0.75rem', color: '#374151', background: '#f3f4f6', padding: '0.1rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace' }}>
              {rgbStr}
            </code>
            <CopyButton text={rgbStr} />
          </div>
          {/* CMYK */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#4b5563', fontWeight: 600 }}>CMYK</span>
            <code style={{ fontSize: '0.75rem', color: '#374151', background: '#f3f4f6', padding: '0.1rem 0.4rem', borderRadius: '0.25rem', fontFamily: 'monospace' }}>
              {cmykStr}
            </code>
            <CopyButton text={cmykStr} />
          </div>
          <CopyButton text={match.name} />
        </div>
      </div>
    </div>
  );
}

// ─── InputField ───────────────────────────────────────────────────
function InputField({ id, label, value, onChange, color }) {
  return (
    <div>
      <label htmlFor={id} className="input-label" style={{ color }}>
        {label}
      </label>
      <div style={{ position: 'relative' }}>
        <input
          id={id}
          type="number"
          min="0"
          max="100"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="input-field"
          placeholder="0"
          style={{ paddingRight: '2.5rem' }}
        />
        <span style={{
          position: 'absolute', right: '0.75rem', top: '50%',
          transform: 'translateY(-50%)', fontSize: '0.7rem',
          fontWeight: 700, color: '#6b7280', pointerEvents: 'none',
        }}>%</span>
      </div>
      {/* Mini progress bar */}
      <div style={{ marginTop: '0.3rem', height: '3px', background: '#f3f4f6', borderRadius: '9999px', overflow: 'hidden' }}>
        <div style={{ width: `${Math.min(100, Math.max(0, Number(value) || 0))}%`, height: '100%', background: color, borderRadius: '9999px', transition: 'width 0.2s ease' }} />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────
export default function CmykToPantone() {
  const [C, setC] = useState('0');
  const [M, setM] = useState('0');
  const [Y, setY] = useState('0');
  const [K, setK] = useState('0');
  const [surface, setSurface] = useState('coated'); // 'coated' | 'uncoated'
  const [matches, setMatches] = useState([]);
  const [previewHex, setPreviewHex] = useState('#FFFFFF');

  const clampVal = v => {
    const n = Number(v);
    return isNaN(n) ? 0 : Math.min(100, Math.max(0, n));
  };

  const runMatch = useCallback(() => {
    const c = clampVal(C), m = clampVal(M), y = clampVal(Y), k = clampVal(K);
    const rgb = cmykToRgb(c, m, y, k);
    setPreviewHex(rgbToHex(rgb.r, rgb.g, rgb.b));
    const db = surface === 'coated' ? COATED_DB : UNCOATED_DB;
    setMatches(getMatchesFromCmyk(c, m, y, k, db, 5));
  }, [C, M, Y, K, surface]);

  useEffect(() => { runMatch(); }, [runMatch]);

  const reset = () => { setC('0'); setM('0'); setY('0'); setK('0'); };

  const isLight = isLightColor(previewHex);
  const previewTextColor = isLight ? '#1f2937' : '#ffffff';
  const previewSubColor  = isLight ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.65)';

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "CMYK to Pantone Converter",
        "url": "https://pantoneconverter.com/cmyk-to-pantone/",
        "description": "Free online tool to find the closest Pantone PMS color match for any CMYK value. Instant, client-side, no signup required.",
        "applicationCategory": "DesignApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Top 5 closest Pantone PMS matches",
          "Coated and uncoated swatch comparison",
          "CMYK, RGB, and HEX values for each match",
          "One-click copy for all color values",
          "1300+ Pantone swatches per collection",
          "Client-side processing, no data sent to server"
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Convert CMYK to Pantone",
        "step": [
          { "@type": "HowToStep", "text": "Enter your Cyan, Magenta, Yellow, and Black values (0\u2013100%) into the input fields." },
          { "@type": "HowToStep", "text": "Select Coated (C) or Uncoated (U) depending on your print substrate." },
          { "@type": "HowToStep", "text": "Review the Top 5 closest Pantone PMS matches ranked by perceptual color distance." },
          { "@type": "HowToStep", "text": "Click Copy next to the Pantone name, HEX, RGB, or CMYK value to use it in your design files." }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is CMYK to Pantone conversion exact?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. CMYK is a process color model using four inks; Pantone uses pre-mixed spot colors. The conversion always finds the closest visual match, not a mathematically exact equivalent. Always verify with a physical Pantone swatch book before going to print."
            }
          },
          {
            "@type": "Question",
            "name": "What is PMS (Pantone Matching System)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Pantone Matching System (PMS) is a standardized color reproduction system used in commercial printing. Each PMS color is a pre-mixed proprietary ink with a unique number, ensuring identical color reproduction regardless of printer, location, or substrate."
            }
          },
          {
            "@type": "Question",
            "name": "What's the difference between Coated (C) and Uncoated (U) Pantone colors?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Coated Pantone colors (suffix C) are formulated for glossy or coated paper — they appear more vibrant and saturated. Uncoated colors (suffix U) are for matte or uncoated paper — the same ink absorbs differently and looks softer. This tool shows both variants side by side."
            }
          },
          {
            "@type": "Question",
            "name": "Can I convert CMYK to Pantone in Illustrator or Photoshop?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, both Adobe Illustrator and Photoshop have built-in Pantone libraries. However, using a dedicated CMYK to Pantone converter like this tool gives you an instant, browser-based result without needing to open design software."
            }
          },
          {
            "@type": "Question",
            "name": "How do I find the closest Pantone color to my CMYK value?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Enter your C, M, Y, and K values (each 0\u2013100) into the fields above. This tool searches 1,300+ Pantone swatches and returns the 5 closest PMS matches ranked by perceptual color distance \u2014 no manual lookup required."
            }
          },
          {
            "@type": "Question",
            "name": "Why does my printed CMYK color look different from the Pantone swatch?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "CMYK printing layers four semi-transparent inks, so the result depends on paper stock, ink density, printer calibration, and humidity. Pantone spot colors are pre-mixed and behave consistently. This inherent difference means a CMYK-to-Pantone conversion is always an approximation."
            }
          },
          {
            "@type": "Question",
            "name": "What is CMYK to PMS conversion used for?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "CMYK to PMS conversion is used whenever a designer needs to translate a process-color design into a spot-color specification \u2014 for brand color standardization, packaging, apparel, signage, and any print job requiring guaranteed color consistency across suppliers."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <Head>
        <title>CMYK to Pantone Converter | Find Closest PMS Color Match</title>
        <meta name="description" content="Enter any CMYK value and instantly find the closest Pantone PMS match across 1,300+ colors. Free, no signup, works in-browser. Used by designers, print pros &amp; brand managers." />
        <link rel="canonical" href="https://pantoneconverter.com/cmyk-to-pantone/" />
        <meta property="og:title" content="CMYK to Pantone Converter | Find Closest PMS Color Match" />
        <meta property="og:description" content="Enter any CMYK value and instantly find the closest Pantone PMS match. Free, no signup, works in-browser." />
        <meta property="og:url" content="https://pantoneconverter.com/cmyk-to-pantone/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CMYK to Pantone Converter | Find Closest PMS Color Match" />
        <meta name="twitter:description" content="Enter any CMYK value and instantly find the closest Pantone PMS match. Free, no signup, works in-browser." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      {/* ── Nav ───────────────────────────────────────────────── */}
      <NavBar />

      <main style={{ minHeight: '100vh', background: '#fafafa' }}>

        {/* ── Hero strip ─────────────────────────────────────── */}
        <div style={{ background: 'linear-gradient(135deg,#fdf4ff 0%,#eff6ff 100%)', borderBottom: '1px solid #f3f4f6', padding: '2.5rem 1.5rem 2rem' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', background: '#fdf2f8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sliders size={20} color="#ec4899" />
              </div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#111827', margin: 0 }}>
                CMYK to Pantone Converter
              </h1>
            </div>
            <p style={{ color: '#4b5563', fontSize: '1rem', margin: '0 0 0.35rem', maxWidth: '42rem' }}>
              Enter your CMYK values and instantly find the closest Pantone PMS matches across {surface === 'coated' ? COATED_DB.length : UNCOATED_DB.length}+ colors. All client-side — no server, no login.
            </p>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0, maxWidth: '42rem' }}>
              Find the closest Pantone PMS match for any CMYK value — coated &amp; uncoated, free, instant.
            </p>
          </div>
        </div>

        {/* ── Main content ───────────────────────────────────── */}
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '2rem 1.5rem 4rem', display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>

          {/* Top row: Inputs + Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* ── Input panel ─────────────────────────────── */}
            <div className="card order-2 md:order-1" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#374151' }}>CMYK Values</span>
                <button onClick={reset} className="copy-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <RefreshCw size={11} /> Reset
                </button>
              </div>

              <InputField id="cyan"    label="Cyan (C)"    value={C} onChange={setC} color="#06b6d4" />
              <InputField id="magenta" label="Magenta (M)" value={M} onChange={setM} color="#ec4899" />
              <InputField id="yellow"  label="Yellow (Y)"  value={Y} onChange={setY} color="#eab308" />
              <InputField id="black"   label="Black (K)"   value={K} onChange={setK} color="#374151" />

              {/* CMYK notation display */}
              <div style={{ background: '#f9fafb', borderRadius: '0.75rem', padding: '0.75rem 1rem', border: '1px solid #f3f4f6' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>
                  Input Color
                </div>
                <code style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151', fontFamily: 'monospace' }}>
                  C:{clampVal(C)} M:{clampVal(M)} Y:{clampVal(Y)} K:{clampVal(K)}
                </code>
              </div>
            </div>

            {/* ── Preview panel ───────────────────────────── */}
            <div className="order-1 md:order-2" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Large swatch */}
              <div
                style={{
                  flex: 1,
                  minHeight: '14rem',
                  borderRadius: '1.25rem',
                  backgroundColor: previewHex,
                  border: '1px solid rgba(0,0,0,0.1)',
                  boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.25s ease',
                  padding: '1.5rem',
                }}
              >
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: previewSubColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                  Your Color
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: previewTextColor, fontFamily: 'monospace', letterSpacing: '0.02em' }}>
                  {previewHex}
                </div>
                <div style={{ fontSize: '0.85rem', color: previewSubColor, marginTop: '0.3rem', fontWeight: 500 }}>
                  C:{clampVal(C)} M:{clampVal(M)} Y:{clampVal(Y)} K:{clampVal(K)}
                </div>
              </div>

              {/* Coated / Uncoated toggle */}
              <div style={{ background: '#ffffff', borderRadius: '1rem', border: '1px solid #f3f4f6', padding: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>
                  Pantone Collection
                </div>
                <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: '0.75rem', padding: '0.25rem', gap: '0.25rem' }}>
                  {['coated', 'uncoated'].map(s => (
                    <button
                      key={s}
                      onClick={() => setSurface(s)}
                      style={{
                        flex: 1,
                        padding: '0.5rem 0',
                        borderRadius: '0.5rem',
                        border: 'none',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        transition: 'all 0.18s ease',
                        fontFamily: 'inherit',
                        ...(surface === s ? {
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
                <p style={{ fontSize: '0.72rem', color: '#6b7280', margin: '0.5rem 0 0', lineHeight: 1.4 }}>
                  {surface === 'coated'
                    ? 'Coated (C) colors are for glossy/coated paper — more vibrant.'
                    : 'Uncoated (U) colors are for uncoated/matte paper — slightly duller.'}
                </p>
              </div>
            </div>
          </div>

          {/* ── Results ─────────────────────────────────────────── */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', margin: 0 }}>
                Top 5 Pantone Matches
              </h2>
              <span className="badge badge-purple">
                {surface === 'coated' ? 'Coated (C)' : 'Uncoated (U)'}
              </span>
            </div>

            {matches.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                Enter CMYK values above to see matches.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {matches.map((match, i) => (
                  <div key={match.name} style={{ position: 'relative' }}>
                    <MatchCard match={match} rank={i} />
                  </div>
                ))}
              </div>
            )}

            {matches.length > 0 && (
              <CoatedUncoatedComparison bestMatch={matches[0]} />
            )}
          </div>

          {/* ── SEO: What is CMYK to Pantone ─────────────────────── */}
          <div className="card" style={{ borderTop: '3px solid #c44eed', marginTop: '1rem' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem' }}>
              What is CMYK to Pantone Conversion?
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75, margin: 0 }}>
              CMYK (Cyan, Magenta, Yellow, Key/Black) is the four-ink color model used in
              commercial printing. While CMYK can reproduce millions of hues by layering
              translucent inks, the resulting color can vary between printers, paper stocks,
              and ink brands — making consistency across print runs a constant challenge.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75, margin: '0.75rem 0 0' }}>
              Pantone (PMS — Pantone Matching System) solves this by defining standardized
              spot colors that any printer worldwide can reproduce exactly using pre-mixed
              inks. When you convert CMYK to Pantone, you're finding the single pre-mixed
              PMS color that most closely resembles your four-ink mix. Graphic designers,
              brand managers, and prepress technicians use this conversion to ensure brand
              colors remain consistent across business cards, packaging, signage, and apparel
              — regardless of the printer or substrate used.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75, margin: '0.75rem 0 0' }}>
              Need the reverse? Use the{' '}
              <Link href="/pantone-to-cmyk/" style={{ color: '#c44eed', fontWeight: 600, textDecoration: 'underline' }}>Pantone to CMYK converter</Link>{' '}
              to find the CMYK breakdown for any PMS color name.
            </p>
          </div>

          {/* ── SEO: How to Convert CMYK to Pantone ──────────────── */}
          <div className="card" style={{ borderTop: '3px solid #c44eed' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem' }}>
              How to Convert CMYK to Pantone — Step by Step
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75, margin: '0 0 0.75rem' }}>
              Enter your Cyan, Magenta, Yellow, and Black values into the sliders above.
              The tool instantly searches 1,300+ Pantone swatches and returns the top 5
              closest PMS matches ranked by perceptual color distance — with HEX, RGB,
              and CMYK values all copyable in one click.
            </p>
            <ol style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75, margin: 0, paddingLeft: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>Enter your <strong>C, M, Y, K</strong> values (each 0–100) into the input fields.</li>
              <li>Select <strong>Coated (C)</strong> or <strong>Uncoated (U)</strong> depending on your print substrate.</li>
              <li>Review the top 5 closest Pantone PMS matches, ranked from nearest to furthest perceptual distance.</li>
              <li>Click <strong>Copy</strong> next to any value — Pantone name, HEX, RGB, or CMYK — to use it in your design files.</li>
            </ol>
            <p style={{ fontSize: '0.8rem', color: '#6b7280', lineHeight: 1.6, margin: '0.85rem 0 0', padding: '0.6rem 0.9rem', background: '#f9fafb', borderRadius: '0.5rem', borderLeft: '3px solid #e5e7eb' }}>
              <strong>Note:</strong> CMYK to Pantone conversion is always an approximation — no exact 1:1 mapping exists between process and spot colors. Always verify your final choice against a physical Pantone swatch book before going to print.
            </p>
          </div>

          {/* ── SEO: When Do You Need to Convert CMYK to Pantone ─── */}
          <div className="card" style={{ borderTop: '3px solid #c44eed' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem' }}>
              When Do You Need to Convert CMYK to Pantone?
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75, margin: '0 0 0.75rem' }}>
              Any print workflow that demands guaranteed color consistency requires a CMYK to PMS conversion.
              Common use cases include:
            </p>
            <ul style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75, margin: 0, paddingLeft: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>
                <strong style={{ color: '#111827' }}>Brand color standardization</strong> — Translate your brand's CMYK
                color into a single PMS code so logos, business cards, signage, and packaging always match.
              </li>
              <li>
                <strong style={{ color: '#111827' }}>Packaging &amp; apparel printing</strong> — On non-paper surfaces
                (fabric, plastic, metal), CMYK results are inconsistent. A Pantone spot color guarantees the
                same shade regardless of material.
              </li>
              <li>
                <strong style={{ color: '#111827' }}>Signage &amp; large-format print</strong> — Wide-format and
                screen-printing workflows require Pantone specifications for color accuracy across large runs.
              </li>
              <li>
                <strong style={{ color: '#111827' }}>Print file hand-off</strong> — When submitting artwork to a
                commercial printer or prepress house, replacing CMYK builds with a PMS code eliminates
                color variation caused by different press profiles.
              </li>
              <li>
                <strong style={{ color: '#111827' }}>Cross-printer consistency</strong> — Ensure multiple suppliers
                produce the same color by specifying a universal PMS code instead of a printer-dependent CMYK mix.
              </li>
            </ul>
          </div>

          {/* ── SEO: CMYK vs Pantone ─────────────────────────────── */}
          <div className="card" style={{ borderTop: '3px solid #c44eed' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem' }}>
              CMYK vs Pantone: Key Differences
            </h2>
            <ul style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75, margin: 0, paddingLeft: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>
                <strong style={{ color: '#111827' }}>CMYK = Process color.</strong> Four semi-transparent inks
                (Cyan, Magenta, Yellow, Black) are layered to simulate color. Output varies between presses,
                paper types, and ink densities.
              </li>
              <li>
                <strong style={{ color: '#111827' }}>Pantone PMS = Spot color.</strong> Each swatch is a factory-mixed
                proprietary ink with a unique number — identical worldwide regardless of printer or substrate.
              </li>
              <li>
                <strong style={{ color: '#111827' }}>Gamut difference.</strong> CMYK can approximate a wider range of
                hues but inconsistently. Pantone's gamut is narrower but every color within it is perfectly
                reproducible.
              </li>
              <li>
                <strong style={{ color: '#111827' }}>Coated (C) vs Uncoated (U).</strong> Even within Pantone, the
                same ink looks different on glossy vs matte stock. Always match to the correct suffix for
                your substrate before production.
              </li>
            </ul>
          </div>

          {/* ── SEO: FAQ accordion ───────────────────────────────── */}
          <div className="card" style={{ borderTop: '3px solid #c44eed' }}>
            <FAQSection suppressSchema items={[
              {
                question: 'Is CMYK to Pantone conversion exact?',
                answer: 'No. CMYK is a process color model using four inks; Pantone uses pre-mixed spot colors. The conversion always finds the closest visual match, not a mathematically exact equivalent. Always verify with a physical Pantone swatch book before going to print.',
              },
              {
                question: 'What is PMS (Pantone Matching System)?',
                answer: 'The Pantone Matching System (PMS) is a standardized color reproduction system used in commercial printing. Each PMS color is a pre-mixed proprietary ink with a unique number, ensuring identical color reproduction regardless of printer, location, or substrate.',
              },
              {
                question: 'What\'s the difference between Coated (C) and Uncoated (U) Pantone colors?',
                answer: 'Coated Pantone colors (suffix C) are for glossy or coated paper — they appear more vibrant and saturated. Uncoated colors (suffix U) are for matte or uncoated paper — the same ink absorbs differently and looks softer. This tool shows both variants side by side.',
              },
              {
                question: 'Can I convert CMYK to Pantone in Illustrator or Photoshop?',
                answer: 'Yes, both Adobe Illustrator and Photoshop have built-in Pantone libraries. However, using a dedicated CMYK to Pantone converter like this tool gives you an instant, browser-based result without needing to open design software.',
              },
              {
                question: 'How do I find the closest Pantone color to my CMYK value?',
                answer: 'Enter your C, M, Y, and K values (each 0–100) into the fields above. This tool searches 1,300+ Pantone swatches and returns the 5 closest PMS matches ranked by perceptual color distance — no manual lookup required.',
              },
              {
                question: 'Why does my printed CMYK color look different from the Pantone swatch?',
                answer: 'CMYK printing layers four semi-transparent inks, so the result depends on paper stock, ink density, printer calibration, and humidity. Pantone spot colors are pre-mixed and behave consistently. This inherent difference means a CMYK-to-Pantone conversion is always an approximation.',
              },
              {
                question: 'What is CMYK to PMS conversion used for?',
                answer: 'CMYK to PMS conversion is used whenever a designer needs to translate a process-color design into a spot-color specification — for brand color standardization, packaging, apparel, signage, and any print job requiring guaranteed color consistency across suppliers.',
              },
            ]} />
          </div>

          {/* ── Related Tools ────────────────────────────────────── */}
          <div className="card" style={{ borderTop: '3px solid #c44eed' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>
              Related Color Tools
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {[
                { href: '/pantone-to-cmyk/', label: 'Pantone → CMYK' },
                { href: '/hex-to-pantone/', label: 'HEX → Pantone' },
                { href: '/rgb-to-pantone/', label: 'RGB → Pantone' },
                { href: '/pantone-to-hex/', label: 'Pantone → HEX' },
                { href: '/pantone-finder/', label: 'Browse Pantone Colors' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  style={{
                    display: 'inline-flex', alignItems: 'center',
                    padding: '0.4rem 0.9rem', borderRadius: '0.5rem',
                    border: '1.5px solid #e5e7eb', background: '#f9fafb',
                    fontSize: '0.8rem', fontWeight: 700, color: '#374151',
                    textDecoration: 'none', transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#c4b5fd'; e.currentTarget.style.color = '#7c3aed'; e.currentTarget.style.background = '#fdf4ff'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#374151'; e.currentTarget.style.background = '#f9fafb'; }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* ── Footer ────────────────────────────────────────────── */}
      <Footer />
    </>
  );
}
