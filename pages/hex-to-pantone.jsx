import Head from 'next/head';
import { useState, useEffect, useCallback } from 'react';
import { Hash, RefreshCw } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import MatchCard from '../components/MatchCard';
import CoatedUncoatedComparison from '../components/CoatedUncoatedComparison';
import FAQSection from '../components/FAQSection';
import pantoneDb from '../data/pantone.json';
import { hexToRgb, isLightColor, getMatchesFromHex, rgbToHex } from '../lib/colorUtils';

const COATED_DB   = pantoneDb.filter(e => e.collection === 'coated');
const UNCOATED_DB = pantoneDb.filter(e => e.collection === 'uncoated');

function isValidHex(h) {
  return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(h.trim());
}

function normaliseHex(h) {
  const clean = h.replace(/^#/, '').trim();
  const full  = clean.length === 3 ? clean.split('').map(c => c+c).join('') : clean;
  return `#${full.toUpperCase()}`;
}

export default function HexToPantone() {
  const [hex, setHex]         = useState('#C8102E');
  const [surface, setSurface] = useState('coated');
  const [matches, setMatches] = useState([]);
  const [error, setError]     = useState('');

  const valid = isValidHex(hex);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const queryHex = params.get('hex');
      if (queryHex && isValidHex(queryHex)) {
        const withHash = queryHex.startsWith('#') ? queryHex : `#${queryHex}`;
        setHex(withHash);
      }
    }
  }, []);

  const runMatch = useCallback(() => {
    if (!valid) { setMatches([]); return; }
    const db = surface === 'coated' ? COATED_DB : UNCOATED_DB;
    setMatches(getMatchesFromHex(hex, db, 5));
  }, [hex, surface, valid]);

  useEffect(() => { runMatch(); }, [runMatch]);

  const handleInput = v => {
    const val = v.startsWith('#') ? v : `#${v}`;
    setHex(val);
    setError(val.length > 1 && !isValidHex(val) ? 'Enter a valid 3 or 6-digit HEX code' : '');
  };

  const previewHex    = valid ? normaliseHex(hex) : '#e5e7eb';
  const isLight       = isLightColor(previewHex);
  const textColor     = isLight ? '#1f2937' : '#ffffff';
  const subColor      = isLight ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.65)';

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "HEX to Pantone Converter",
        "url": "https://pantoneconverter.com/hex-to-pantone/",
        "description": "Convert any HEX color code to the closest Pantone PMS match. Free, instant, client-side matching across 2600+ coated and uncoated Pantone swatches.",
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
          "2600+ Pantone swatches",
          "Client-side processing, no data sent to server"
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is this HEX to Pantone converter free?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, completely free with no login or signup required. All color matching happens client-side in your browser \u2014 no HEX codes or results are sent to any server."
            }
          },
          {
            "@type": "Question",
            "name": "How accurate is the HEX to Pantone conversion?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The tool uses a perceptually-weighted RGB distance algorithm to find the closest match from 2,600+ Pantone swatches. Because HEX is a screen color space (RGB) and Pantone is a physical ink system, a mathematically perfect match doesn't always exist. Always verify against a physical Pantone swatch book before final print production."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between HEX and PMS colors?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "HEX (hexadecimal) codes represent colors in the RGB color model used on screens and in web design. PMS (Pantone Matching System) is a standardized physical ink color system used in commercial printing. Converting a HEX code to its closest PMS equivalent bridges digital and print workflows."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between coated and uncoated Pantone?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Coated (C) Pantone colors are used for glossy or coated paper stock. Uncoated (U) colors are for matte or uncoated surfaces. The same Pantone number looks visually different on each finish \u2014 coated colors appear more vibrant. This tool shows both variants so you can compare before sending to print."
            }
          },
          {
            "@type": "Question",
            "name": "Can I convert multiple HEX codes to Pantone at once?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The tool converts one HEX code at a time. Save individual results using the heart icon on each match, then access all saved colors from the Saved Colors page for batch reference."
            }
          },
          {
            "@type": "Question",
            "name": "Can I also convert Pantone to HEX?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes \u2014 use the Pantone to HEX converter at pantoneconverter.com/pantone-to-hex/ for the reverse lookup."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <Head>
        <title>HEX to Pantone Converter — Find Closest PMS Match</title>
        <meta name="description" content="Convert any HEX color code to the closest Pantone PMS match instantly. Free, no login, client-side matching across 2600+ Pantone colors." />
        <link rel="canonical" href="https://pantoneconverter.com/hex-to-pantone/" />
        <meta property="og:title" content="HEX to Pantone Converter — Find Closest PMS Match" />
        <meta property="og:description" content="Convert any HEX color code to the closest Pantone PMS match instantly." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <NavBar />

      <main style={{ minHeight: '100vh', background: '#fafafa' }}>
        {/* Hero */}
        <div style={{ background: 'linear-gradient(135deg,#fdf4ff 0%,#eff6ff 100%)', borderBottom: '1px solid #f3f4f6', padding: '2.5rem 1.5rem 2rem' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Hash size={20} color="#7c3aed" />
              </div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#111827', margin: 0 }}>
                HEX to Pantone Converter
              </h1>
            </div>
            <p style={{ color: '#4b5563', fontSize: '1rem', margin: 0 }}>
              Paste any HEX color code and find the closest Pantone PMS match instantly.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '2rem 1.5rem 4rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Input + Preview row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Input card */}
            <div className="card order-2 md:order-1" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#374151' }}>HEX Value</span>
                <button onClick={() => { setHex('#C8102E'); setError(''); }} className="copy-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <RefreshCw size={11} /> Reset
                </button>
              </div>

              <div>
                <label htmlFor="hex-input" className="input-label">HEX Color Code</label>
                <div style={{ position: 'relative' }}>
                  {/* Color chip inside input */}
                  <div style={{
                    position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                    width: '1.25rem', height: '1.25rem', borderRadius: '0.25rem',
                    backgroundColor: previewHex, border: '1px solid rgba(0,0,0,0.1)',
                  }} />
                  <input
                    id="hex-input"
                    type="text"
                    value={hex}
                    onChange={e => handleInput(e.target.value)}
                    className="input-field"
                    placeholder="#FF0036"
                    maxLength={7}
                    style={{ paddingLeft: '2.5rem', fontFamily: 'monospace', fontWeight: 600, letterSpacing: '0.05em' }}
                  />
                </div>
                {error && <p style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '0.4rem', fontWeight: 500 }}>{error}</p>}
              </div>

              <div style={{ background: '#f9fafb', borderRadius: '0.75rem', padding: '0.75rem 1rem', border: '1px solid #f3f4f6' }}>
                <div className="input-label" style={{ marginBottom: '0.3rem' }}>Resolved</div>
                <code style={{ fontSize: '0.9rem', fontWeight: 700, color: '#374151', fontFamily: 'monospace' }}>
                  {valid ? normaliseHex(hex) : '—'}
                </code>
                {valid && (() => { const rgb = hexToRgb(hex); return rgb ? (
                  <span style={{ color: '#4b5563', fontSize: '0.8rem', marginLeft: '0.75rem' }}>
                    rgb({rgb.r}, {rgb.g}, {rgb.b})
                  </span>
                ) : null; })()}
              </div>
            </div>

            {/* Preview + Toggle */}
            <div className="order-1 md:order-2" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                flex: 1, minHeight: '12rem', borderRadius: '1.25rem',
                backgroundColor: previewHex,
                border: '1px solid rgba(0,0,0,0.1)',
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                transition: 'background-color 0.25s ease', padding: '1.5rem',
              }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: subColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                  Your Color
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: textColor, fontFamily: 'monospace' }}>
                  {valid ? normaliseHex(hex) : 'Invalid HEX'}
                </div>
              </div>

              {/* Toggle */}
              <div style={{ background: '#fff', borderRadius: '1rem', border: '1px solid #f3f4f6', padding: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                <div className="input-label" style={{ marginBottom: '0.6rem' }}>Pantone Collection</div>
                <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: '0.75rem', padding: '0.25rem', gap: '0.25rem' }}>
                  {['coated', 'uncoated'].map(s => (
                    <button key={s} onClick={() => setSurface(s)} style={{
                      flex: 1, padding: '0.5rem', borderRadius: '0.5rem', border: 'none',
                      fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit',
                      transition: 'all 0.18s ease',
                      ...(surface === s
                        ? { background: 'linear-gradient(135deg,#c44eed,#4361EE)', color: '#fff', boxShadow: '0 2px 8px rgba(196,78,237,0.35)' }
                        : { background: 'transparent', color: '#4b5563' }),
                    }}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', margin: 0 }}>Top 5 Pantone Matches</h2>
              <span className="badge badge-purple">{surface === 'coated' ? 'Coated (C)' : 'Uncoated (U)'}</span>
            </div>
            {!valid ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>Enter a valid HEX code above.</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {matches.map((m, i) => <MatchCard key={m.name} match={m} rank={i} />)}
              </div>
            )}
            
            {valid && matches.length > 0 && (
              <CoatedUncoatedComparison bestMatch={matches[0]} />
            )}
          </div>

          {/* SEO: What is HEX to Pantone Conversion */}
          <div className="card" style={{ borderTop: '3px solid #7c3aed', marginTop: '1rem' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem' }}>
              What is HEX to Pantone Conversion?
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75, margin: 0 }}>
              A HEX color code is a six-digit hexadecimal value used in digital design, web development, and
              screen-based media to represent a specific RGB color. While HEX codes are universal for screens,
              they don't translate directly to the physical world of ink and print — which is where Pantone comes in.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75, margin: '0.75rem 0 0' }}>
              Converting a HEX code to its closest Pantone PMS equivalent bridges the gap between digital and
              print design. When a brand's primary color is defined in HEX for web use, a designer preparing
              printed packaging or merchandise needs the equivalent PMS color to ensure color consistency.
              This tool uses a perceptually-weighted RGB distance algorithm to find the closest Pantone match
              from over 2,600 coated and uncoated swatches — instantly, in your browser, with no uploads required.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75, margin: '0.75rem 0 0' }}>
              This tool also supports the reverse workflow — use the{' '}
              <a href="/pantone-to-hex/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>Pantone to HEX converter</a>{' '}
              to find the digital HEX, RGB, and CMYK values for any PMS color name.
            </p>
          </div>

          {/* SEO: How to Convert — Step by Step */}
          <div className="card" style={{ borderTop: '3px solid #7c3aed' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem' }}>
              How to Convert HEX to Pantone — Step by Step
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75, margin: '0 0 0.75rem' }}>
              Paste any 6-digit HEX value — with or without the # symbol — into the input field above. The tool
              instantly returns the top 5 closest Pantone PMS matches from over 2,600 coated and uncoated swatches,
              ranked by perceptual color distance. Each result shows the Pantone name, HEX equivalent, RGB values,
              and CMYK breakdown — all copyable in one click.
            </p>
            <ol style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75, margin: 0, paddingLeft: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>Enter your HEX code (e.g., <code style={{ fontFamily: 'monospace', background: '#f3f4f6', padding: '0 0.3rem', borderRadius: '0.25rem' }}>#C8102E</code>) or paste it directly — the # symbol is optional.</li>
              <li>The tool automatically displays the top 5 closest Pantone matches, ranked from nearest to furthest perceptual distance.</li>
              <li>Toggle between <strong>Coated (C)</strong> and <strong>Uncoated (U)</strong> variants to find the right finish for your print substrate.</li>
              <li>Click <strong>Copy</strong> next to any value — Pantone name, HEX, RGB, or CMYK — to use it immediately in your design files.</li>
            </ol>
          </div>

          {/* SEO: When Do You Need HEX to Pantone */}
          <div className="card" style={{ borderTop: '3px solid #7c3aed' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem' }}>
              When Do You Need to Convert HEX to Pantone?
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75, margin: '0 0 0.75rem' }}>
              Any workflow that crosses the boundary between screen and print requires a HEX to PMS conversion.
              Common use cases include:
            </p>
            <ul style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75, margin: 0, paddingLeft: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>
                <strong style={{ color: '#111827' }}>Brand color standardization</strong> — Your website's HEX brand
                colors need a Pantone equivalent for business cards, signage, apparel, and packaging. This tool gives
                you the closest PMS match instantly.
              </li>
              <li>
                <strong style={{ color: '#111827' }}>Print and packaging production</strong> — Commercial printers,
                packaging suppliers, and offset print shops work with Pantone Matching System (PMS) codes — not HEX
                values. Convert your hex color to PMS before submitting print-ready files.
              </li>
              <li>
                <strong style={{ color: '#111827' }}>Logo and identity reproduction</strong> — Ensure your logo color
                stays visually consistent whether it appears on a website, a brochure, or an embroidered shirt by
                finding the exact PMS code for your HEX value.
              </li>
              <li>
                <strong style={{ color: '#111827' }}>Embroidery, merchandise, and screen printing</strong> — Suppliers
                for custom merchandise, screen-printed apparel, and embroidery require Pantone codes. Use this hex
                colour to Pantone converter before placing any physical production order.
              </li>
            </ul>
          </div>

          {/* SEO: Coated vs Uncoated */}
          <div className="card" style={{ borderTop: '3px solid #7c3aed' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem' }}>
              Coated vs Uncoated Pantone — Which Should You Use?
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75, margin: 0 }}>
              Pantone colors come in two main variants. <strong style={{ color: '#111827' }}>Coated (C)</strong> colors
              are formulated for glossy or coated paper stock — they appear more vibrant and saturated.
              {' '}<strong style={{ color: '#111827' }}>Uncoated (U)</strong> colors are for matte, uncoated, or
              textured surfaces — the same ink absorbs differently and appears softer. This converter shows both side
              by side for every match, so you can compare before going to print. When in doubt, always verify your
              final choice against a physical Pantone swatch book under consistent lighting.
            </p>
          </div>

          {/* SEO: FAQ accordion */}
          <div className="card" style={{ borderTop: '3px solid #7c3aed' }}>
            <FAQSection suppressSchema items={[
              {
                question: 'Is this HEX to Pantone converter free?',
                answer: 'Yes — completely free, no login or account required. All color matching runs client-side in your browser. No HEX codes or results are sent to any server.',
              },
              {
                question: 'How accurate is HEX to Pantone conversion?',
                answer: 'The tool uses a perceptually-weighted RGB distance algorithm across 2,600+ Pantone swatches to find the closest visual match. Because HEX is a screen color space (RGB) and Pantone is a physical ink system, a perfect match doesn\'t always exist — the result is the best achievable approximation. Always verify with a physical Pantone swatch book before final print production.',
              },
              {
                question: 'What is the difference between HEX and PMS?',
                answer: 'HEX (hexadecimal) is a digital format representing RGB values used on screens and in web design. PMS (Pantone Matching System) is a standardized physical ink color system used in commercial printing. A hexadecimal to PMS conversion gives you the closest printable Pantone ink color for any screen color.',
              },
              {
                question: 'What is the difference between coated and uncoated Pantone?',
                answer: 'Coated (C) Pantone colors are for glossy or coated paper. Uncoated (U) colors are for matte or uncoated surfaces. The same Pantone number looks visually different on each finish. This tool shows both variants side by side — always confirm with a physical swatch before production.',
              },
              {
                question: 'Can I convert multiple HEX codes at once?',
                answer: 'The tool converts one HEX code at a time. Save individual results using the heart icon on each match and access all saved colors from the Saved Colors page.',
              },
              {
                question: 'Does this work for hex colour to Pantone (British spelling)?',
                answer: 'Yes — the converter works identically for "hex color to Pantone" and "hex colour to Pantone." It accepts all standard HEX input formats regardless of regional spelling.',
              },
              {
                question: 'Can I also convert Pantone to HEX?',
                answer: 'Yes — use the Pantone to HEX converter at pantoneconverter.com/pantone-to-hex/ for the reverse lookup.',
              },
              {
                question: 'How do I find a Pantone color from a hex code?',
                answer: 'Paste your HEX value into the input field above. The tool automatically searches through 2,600+ Pantone swatches and returns the 5 closest PMS matches ranked by perceptual color distance — no manual lookup required.',
              },
            ]} />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
