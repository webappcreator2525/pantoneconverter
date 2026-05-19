import Head from 'next/head';
import { useState, useEffect, useCallback } from 'react';
import { Circle, RefreshCw } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import MatchCard from '../components/MatchCard';
import CoatedUncoatedComparison from '../components/CoatedUncoatedComparison';
import pantoneDb from '../data/pantone.json';
import { isLightColor, getMatchesFromRgb, rgbToHex } from '../lib/colorUtils';

const COATED_DB   = pantoneDb.filter(e => e.collection === 'coated');
const UNCOATED_DB = pantoneDb.filter(e => e.collection === 'uncoated');

function NumInput({ id, label, value, onChange, color }) {
  const pct = Math.round((Math.min(Math.max(Number(value) || 0, 0), 255) / 255) * 100);
  return (
    <div>
      <label htmlFor={id} className="input-label" style={{ color }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <input
          id={id} type="number" min="0" max="255" value={value}
          onChange={e => onChange(e.target.value)}
          className="input-field" placeholder="0"
          style={{ paddingRight: '3.5rem' }}
        />
        <span style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.7rem', fontWeight: 700, color: '#6b7280', pointerEvents: 'none' }}>
          /255
        </span>
      </div>
      <div style={{ marginTop: '0.3rem', height: '3px', background: '#f3f4f6', borderRadius: '9999px', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '9999px', transition: 'width 0.2s ease' }} />
      </div>
    </div>
  );
}

export default function RgbToPantone() {
  const [R, setR] = useState('200');
  const [G, setG] = useState('16');
  const [B, setB] = useState('46');
  const [surface, setSurface] = useState('coated');
  const [matches, setMatches] = useState([]);

  const clamp = v => Math.min(255, Math.max(0, Number(v) || 0));

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const queryR = params.get('r');
      const queryG = params.get('g');
      const queryB = params.get('b');
      if (queryR !== null) setR(clamp(queryR).toString());
      if (queryG !== null) setG(clamp(queryG).toString());
      if (queryB !== null) setB(clamp(queryB).toString());
    }
  }, []);
  const r = clamp(R), g = clamp(G), b = clamp(B);
  const previewHex = rgbToHex(r, g, b);
  const isLight    = isLightColor(previewHex);
  const textColor  = isLight ? '#1f2937' : '#ffffff';
  const subColor   = isLight ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.65)';

  const runMatch = useCallback(() => {
    const db = surface === 'coated' ? COATED_DB : UNCOATED_DB;
    setMatches(getMatchesFromRgb(r, g, b, db, 5));
  }, [r, g, b, surface]);

  useEffect(() => { runMatch(); }, [runMatch]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "RGB to Pantone Converter",
    "url": "https://pantoneconverter.com/rgb-to-pantone/",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript",
    "description": "Convert RGB color values to the closest Pantone PMS color instantly. Free, no login, browser-based matching across 2600+ Pantone swatches.",
  };

  return (
    <>
      <Head>
        <title>RGB to Pantone Converter — Free Color Matching Tool</title>
        <meta name="description" content="Convert RGB color values to the closest Pantone PMS color instantly. Free, no login, browser-based matching across 2600+ Pantone swatches." />
        <link rel="canonical" href="https://pantoneconverter.com/rgb-to-pantone/" />
        <meta property="og:title" content="RGB to Pantone Converter — Free Color Matching Tool" />
        <meta property="og:description" content="Convert RGB color values to the closest Pantone PMS color instantly." />
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
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Circle size={20} color="#2563eb" />
              </div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#111827', margin: 0 }}>
                RGB to Pantone Converter
              </h1>
            </div>
            <p style={{ color: '#4b5563', fontSize: '1rem', margin: 0 }}>
              Enter R, G, B values and instantly find the closest Pantone PMS matches across {surface === 'coated' ? COATED_DB.length : UNCOATED_DB.length}+ colors.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '2rem 1.5rem 4rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Inputs + Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Input card */}
            <div className="card order-2 md:order-1" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#374151' }}>RGB Values</span>
                <button onClick={() => { setR('200'); setG('16'); setB('46'); }} className="copy-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <RefreshCw size={11} /> Reset
                </button>
              </div>

              <NumInput id="r-input" label="Red (R)"   value={R} onChange={setR} color="#ef4444" />
              <NumInput id="g-input" label="Green (G)" value={G} onChange={setG} color="#22c55e" />
              <NumInput id="b-input" label="Blue (B)"  value={B} onChange={setB} color="#3b82f6" />

              <div style={{ background: '#f9fafb', borderRadius: '0.75rem', padding: '0.75rem 1rem', border: '1px solid #f3f4f6' }}>
                <div className="input-label" style={{ marginBottom: '0.3rem' }}>Input Color</div>
                <code style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151', fontFamily: 'monospace' }}>
                  rgb({r}, {g}, {b}) — {previewHex}
                </code>
              </div>
            </div>

            {/* Preview + Toggle */}
            <div className="order-1 md:order-2" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                flex: 1, minHeight: '12rem', borderRadius: '1.25rem',
                backgroundColor: previewHex,
                border: '1px solid rgba(0,0,0,0.1)', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                transition: 'background-color 0.25s ease', padding: '1.5rem',
              }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: subColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                  Your Color
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: textColor, fontFamily: 'monospace' }}>
                  {previewHex}
                </div>
                <div style={{ fontSize: '0.85rem', color: subColor, marginTop: '0.3rem', fontWeight: 500 }}>
                  rgb({r}, {g}, {b})
                </div>
              </div>

              {/* Toggle */}
              <div style={{ background: '#fff', borderRadius: '1rem', border: '1px solid #f3f4f6', padding: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                <div className="input-label" style={{ marginBottom: '0.6rem' }}>Pantone Collection</div>
                <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: '0.75rem', padding: '0.25rem', gap: '0.25rem' }}>
                  {['coated', 'uncoated'].map(s => (
                    <button key={s} onClick={() => setSurface(s)} style={{
                      flex: 1, padding: '0.5rem', borderRadius: '0.5rem', border: 'none',
                      fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.18s ease',
                      ...(surface === s
                        ? { background: 'linear-gradient(135deg,#c44eed,#4361EE)', color: '#fff', boxShadow: '0 2px 8px rgba(196,78,237,0.35)' }
                        : { background: 'transparent', color: '#4b5563' }),
                    }}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
                <p style={{ fontSize: '0.72rem', color: '#6b7280', margin: '0.5rem 0 0', lineHeight: 1.4 }}>
                  {surface === 'coated'
                    ? 'Coated (C) — glossy/coated paper, more vibrant.'
                    : 'Uncoated (U) — matte/uncoated paper, slightly duller.'}
                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', margin: 0 }}>
                Top 5 Pantone Matches
              </h2>
              <span className="badge badge-purple">
                {surface === 'coated' ? 'Coated (C)' : 'Uncoated (U)'}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {matches.map((m, i) => <MatchCard key={m.name} match={m} rank={i} />)}
            </div>
            
            {matches.length > 0 && (
              <CoatedUncoatedComparison bestMatch={matches[0]} />
            )}
          </div>

          {/* SEO */}
          <div className="card" style={{ borderTop: '3px solid #2563eb', marginTop: '1rem' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem' }}>
              What is RGB to Pantone Conversion?
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75, margin: 0 }}>
              RGB (Red, Green, Blue) is an additive color model used by digital screens — monitors, phones,
              and televisions mix light at varying intensities to create the full visible spectrum. However,
              screen colors cannot be directly reproduced in physical print media because printers use
              subtractive ink models.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75, margin: '0.75rem 0 0' }}>
              Converting RGB to Pantone (PMS) is essential whenever a digital design moves to physical
              production. Whether you're printing a logo on business cards, producing branded packaging,
              or specifying ink for a large-format print run, Pantone gives you a standardized reference
              that any printer worldwide can reproduce with precision. This tool instantly finds the closest
              PMS match for any RGB value using a perceptually-weighted algorithm that emphasizes the green
              channel — where human vision is most sensitive — giving you more accurate color matches than
              standard Euclidean distance methods.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
