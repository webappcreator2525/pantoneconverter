import Head from 'next/head';
import { useState, useEffect, useCallback } from 'react';
import { Sun, RefreshCw } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import MatchCard from '../components/MatchCard';
import CoatedUncoatedComparison from '../components/CoatedUncoatedComparison';
import pantoneDb from '../data/pantone.json';
import { isLightColor, getMatchesFromHsl, hslToRgb, rgbToHex } from '../lib/colorUtils';

const COATED_DB   = pantoneDb.filter(e => e.collection === 'coated');
const UNCOATED_DB = pantoneDb.filter(e => e.collection === 'uncoated');

function NumInput({ id, label, value, onChange, max, unit, color }) {
  const pct = Math.round((Math.min(Math.max(Number(value)||0, 0), max) / max) * 100);
  return (
    <div>
      <label htmlFor={id} className="input-label" style={{ color }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <input id={id} type="number" min="0" max={max} value={value}
          onChange={e => onChange(e.target.value)}
          className="input-field" placeholder="0"
          style={{ paddingRight: '3rem' }} />
        <span style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.7rem', fontWeight: 700, color: '#6b7280', pointerEvents: 'none' }}>
          {unit}
        </span>
      </div>
      <div style={{ marginTop: '0.3rem', height: '3px', background: '#f3f4f6', borderRadius: '9999px', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '9999px', transition: 'width 0.2s ease' }} />
      </div>
    </div>
  );
}

export default function HslToPantone() {
  const [H, setH] = useState('348');
  const [S, setS] = useState('85');
  const [L, setL] = useState('42');
  const [surface, setSurface] = useState('coated');
  const [matches, setMatches] = useState([]);

  const clamp = (v, max) => Math.min(max, Math.max(0, Number(v) || 0));
  const h = clamp(H, 360), s = clamp(S, 100), l = clamp(L, 100);
  const rgb        = hslToRgb(h, s, l);
  const previewHex = rgbToHex(rgb.r, rgb.g, rgb.b);
  const isLight    = isLightColor(previewHex);
  const textColor  = isLight ? '#1f2937' : '#ffffff';
  const subColor   = isLight ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.65)';

  const runMatch = useCallback(() => {
    const db = surface === 'coated' ? COATED_DB : UNCOATED_DB;
    setMatches(getMatchesFromHsl(h, s, l, db, 5));
  }, [h, s, l, surface]);

  useEffect(() => { runMatch(); }, [runMatch]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "HSL to Pantone Converter",
    "url": "https://pantoneconverter.com/hsl-to-pantone/",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript",
    "description": "Convert HSL (Hue, Saturation, Lightness) color values to the closest Pantone PMS match. Free, instant, no login required.",
  };

  return (
    <>
      <Head>
        <title>HSL to Pantone Converter — Free Online Tool</title>
        <meta name="description" content="Convert HSL (Hue, Saturation, Lightness) color values to the closest Pantone PMS match. Free, instant, no login required." />
        <link rel="canonical" href="https://pantoneconverter.com/hsl-to-pantone/" />
        <meta property="og:title" content="HSL to Pantone Converter — Free Online Tool" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <NavBar />

      <main style={{ minHeight: '100vh', background: '#fafafa' }}>
        <div style={{ background: 'linear-gradient(135deg,#fdf4ff 0%,#eff6ff 100%)', borderBottom: '1px solid #f3f4f6', padding: '2.5rem 1.5rem 2rem' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', background: '#f0fdfa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sun size={20} color="#0d9488" />
              </div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#111827', margin: 0 }}>HSL to Pantone Converter</h1>
            </div>
            <p style={{ color: '#4b5563', fontSize: '1rem', margin: 0 }}>
              Enter Hue, Saturation, and Lightness values to find the closest Pantone PMS match.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '2rem 1.5rem 4rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card order-2 md:order-1" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#374151' }}>HSL Values</span>
                <button onClick={() => { setH('348'); setS('85'); setL('42'); }} className="copy-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <RefreshCw size={11} /> Reset
                </button>
              </div>

              {/* Hue gradient bar */}
              <div>
                <label htmlFor="hue" className="input-label">Hue (H)</label>
                <input id="hue" type="number" min="0" max="360" value={H}
                  onChange={e => setH(e.target.value)}
                  className="input-field" placeholder="0"
                  style={{ paddingRight: '3rem' }} />
                <div style={{ marginTop: '0.3rem', height: '3px', borderRadius: '9999px',
                  background: 'linear-gradient(to right,#ff0000,#ffff00,#00ff00,#00ffff,#0000ff,#ff00ff,#ff0000)' }} />
              </div>

              <NumInput id="sat"  label="Saturation (S)" value={S} onChange={setS} max={100} unit="%" color={`hsl(${h},100%,45%)`} />
              <NumInput id="lit"  label="Lightness (L)"  value={L} onChange={setL} max={100} unit="%" color="#6b7280" />

              <div style={{ background: '#f9fafb', borderRadius: '0.75rem', padding: '0.75rem 1rem', border: '1px solid #f3f4f6' }}>
                <div className="input-label" style={{ marginBottom: '0.3rem' }}>Input Color</div>
                <code style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151', fontFamily: 'monospace' }}>
                  hsl({h}, {s}%, {l}%) — {previewHex}
                </code>
              </div>
            </div>

            <div className="order-1 md:order-2" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                flex: 1, minHeight: '12rem', borderRadius: '1.25rem',
                backgroundColor: previewHex,
                border: '1px solid rgba(0,0,0,0.1)', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                transition: 'background-color 0.25s ease', padding: '1.5rem',
              }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: subColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>Your Color</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: textColor, fontFamily: 'monospace' }}>{previewHex}</div>
                <div style={{ fontSize: '0.85rem', color: subColor, marginTop: '0.3rem' }}>hsl({h}, {s}%, {l}%)</div>
              </div>
              <div style={{ background: '#fff', borderRadius: '1rem', border: '1px solid #f3f4f6', padding: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                <div className="input-label" style={{ marginBottom: '0.6rem' }}>Pantone Collection</div>
                <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: '0.75rem', padding: '0.25rem', gap: '0.25rem' }}>
                  {['coated','uncoated'].map(s => (
                    <button key={s} onClick={() => setSurface(s)} style={{
                      flex: 1, padding: '0.5rem', borderRadius: '0.5rem', border: 'none',
                      fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.18s ease',
                      ...(surface === s ? { background: 'linear-gradient(135deg,#c44eed,#4361EE)', color: '#fff', boxShadow: '0 2px 8px rgba(196,78,237,0.35)' } : { background: 'transparent', color: '#4b5563' }),
                    }}>{s.charAt(0).toUpperCase()+s.slice(1)}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', margin: 0 }}>Top 5 Pantone Matches</h2>
              <span className="badge badge-purple">{surface === 'coated' ? 'Coated (C)' : 'Uncoated (U)'}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {matches.map((m, i) => <MatchCard key={m.name} match={m} rank={i} />)}
            </div>
            
            {matches.length > 0 && (
              <CoatedUncoatedComparison bestMatch={matches[0]} />
            )}
          </div>

          <div className="card" style={{ borderTop: '3px solid #0d9488', marginTop: '1rem' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem' }}>What is HSL to Pantone Conversion?</h2>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75, margin: 0 }}>
              HSL stands for Hue, Saturation, and Lightness — a cylindrical color model that maps colors in a way
              that closely mirrors human intuition. Hue represents the base color (0–360°), Saturation controls
              vividness (0% grey to 100% full color), and Lightness adjusts brightness (0% black to 100% white).
              HSL is widely used in CSS, design software, and color pickers because it lets designers
              easily adjust perceived brightness or richness independently.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75, margin: '0.75rem 0 0' }}>
              When working with HSL-defined brand colors and needing to specify ink for physical production,
              you must convert to a Pantone PMS reference. This tool converts your HSL values via RGB into
              the perceptually closest PMS color from over 2,600 coated and uncoated swatches — bridging
              the gap between screen-based color design and professional print production.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
