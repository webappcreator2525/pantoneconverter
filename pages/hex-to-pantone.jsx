import Head from 'next/head';
import { useState, useEffect, useCallback } from 'react';
import { Hash, RefreshCw } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import MatchCard from '../components/MatchCard';
import CoatedUncoatedComparison from '../components/CoatedUncoatedComparison';
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
    "@type": "WebApplication",
    "name": "HEX to Pantone Converter",
    "url": "https://pantoneconverter.com/hex-to-pantone/",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript",
    "description": "Convert any HEX color code to the closest Pantone PMS match instantly. Free, no login, client-side matching across 2600+ Pantone colors.",
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

          {/* SEO */}
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
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
