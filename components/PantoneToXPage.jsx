import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CopyButton from '../components/CopyButton';
import pantoneDb from '../data/pantone.json';
import { isLightColor } from '../lib/colorUtils';

// ─── Popular colors ───────────────────────────────────────────────
const POPULAR_NAMES = [
  'Pantone 186-C', 'Pantone 285-C', 'Pantone 368-C', 'Pantone 109-C',
  'Pantone 485-C', 'Pantone 266-C', 'Pantone Process Black-C', 'Pantone Cool Gray 9-C',
  'Pantone 877-C Metallic', 'Pantone 032-C', 'Pantone 355-C', 'Pantone Reflex Blue-C',
];

// Resolve to actual DB entries (fuzzy: substring match on each keyword)
const POPULAR_ENTRIES = POPULAR_NAMES.map(n => {
  const key = n.toLowerCase();
  return pantoneDb.find(e => e.name.toLowerCase() === key)
      || pantoneDb.find(e => e.name.toLowerCase().includes(key.replace('pantone ', '')));
}).filter(Boolean);

// ─── Autocomplete search ──────────────────────────────────────────
function PantoneSearchInput({ value, onChange, onSelect }) {
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!value.trim()) { setSuggestions([]); return; }
    const q = value.toLowerCase();
    const hits = pantoneDb.filter(e => e.name.toLowerCase().includes(q)).slice(0, 10);
    setSuggestions(hits);
    setOpen(hits.length > 0);
  }, [value]);

  useEffect(() => {
    const handler = e => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <input
        id="pantone-search"
        type="text"
        value={value}
        onChange={e => { onChange(e.target.value); }}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        className="input-field"
        placeholder="e.g. 186-C, Cool Gray, Reflex Blue…"
        style={{ fontSize: '1rem', padding: '0.875rem 1.25rem' }}
        autoComplete="off"
      />
      {open && (
        <ul style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
          background: '#fff', border: '1.5px solid #e9a8fd', borderRadius: '0.875rem',
          boxShadow: '0 8px 24px rgba(196,78,237,0.15)', zIndex: 100,
          listStyle: 'none', margin: 0, padding: '0.375rem', maxHeight: '18rem', overflowY: 'auto',
        }}>
          {suggestions.map(entry => (
            <li key={entry.name}>
              <button
                onMouseDown={e => { e.preventDefault(); onSelect(entry); setOpen(false); onChange(entry.name); }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.5rem 0.75rem', border: 'none', background: 'transparent',
                  borderRadius: '0.5rem', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#f5f3ff'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ width: '1.5rem', height: '1.5rem', borderRadius: '0.35rem', backgroundColor: entry.hex, border: '1px solid rgba(0,0,0,0.1)', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#111827' }}>{entry.name}</div>
                  <div style={{ fontSize: '0.72rem', color: '#6b7280' }}>{entry.hex} · {entry.collection}</div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Result panel ─────────────────────────────────────────────────
function ResultPanel({ selected, primaryOutput }) {
  if (!selected) return null;
  const isLight  = isLightColor(selected.hex);
  const textCol  = isLight ? '#1f2937' : '#ffffff';
  const subCol   = isLight ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)';
  const { c, m, y, k } = selected.cmyk;
  const { r, g, b }     = selected.rgb;

  const outputs = {
    cmyk: { label: 'CMYK', value: `C:${c} M:${m} Y:${y} K:${k}`, detail: (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.5rem', marginTop: '0.5rem' }}>
        {[['C', c, '#06b6d4'],['M', m, '#ec4899'],['Y', y, '#eab308'],['K', k, '#374151']].map(([ch, val, col]) => (
          <div key={ch} style={{ background: '#f9fafb', borderRadius: '0.5rem', padding: '0.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: col, textTransform: 'uppercase' }}>{ch}</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827' }}>{val}</div>
            <div style={{ fontSize: '0.65rem', color: '#6b7280' }}>%</div>
          </div>
        ))}
      </div>
    )},
    hex: { label: 'HEX', value: selected.hex, detail: null },
    rgb: { label: 'RGB', value: `${r}, ${g}, ${b}`, detail: (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.5rem', marginTop: '0.5rem' }}>
        {[['R', r, '#ef4444'],['G', g, '#22c55e'],['B', b, '#3b82f6']].map(([ch, val, col]) => (
          <div key={ch} style={{ background: '#f9fafb', borderRadius: '0.5rem', padding: '0.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: col, textTransform: 'uppercase' }}>{ch}</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827' }}>{val}</div>
            <div style={{ fontSize: '0.65rem', color: '#6b7280' }}>0–255</div>
          </div>
        ))}
      </div>
    )},
  };

  const primary = outputs[primaryOutput];
  const others  = Object.entries(outputs).filter(([k]) => k !== primaryOutput);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-6 mt-2">
      {/* Swatch */}
      <div style={{
        borderRadius: '1.25rem', backgroundColor: selected.hex,
        border: '1px solid rgba(0,0,0,0.1)', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '2rem 1.5rem', minHeight: '14rem',
      }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, color: subCol, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
          {selected.collection}
        </div>
        <div style={{ fontSize: '0.95rem', fontWeight: 900, color: textCol, textAlign: 'center', lineHeight: 1.3, marginBottom: '0.5rem' }}>
          {selected.name}
        </div>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: textCol, fontFamily: 'monospace' }}>{selected.hex}</div>
        <CopyButton text={selected.name} label="Copy Name" />
      </div>

      {/* Values */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Primary output — highlighted */}
        <div style={{ border: '2px solid #c44eed', borderRadius: '1rem', padding: '1.25rem', background: '#fdf4ff' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#7e22ce', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {primary.label}
            </span>
            <CopyButton text={primary.value} />
          </div>
          <code style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', fontFamily: 'monospace' }}>{primary.value}</code>
          {primary.detail}
        </div>

        {/* Other outputs */}
        {others.map(([key, out]) => (
          <div key={key} style={{ border: '1px solid #f3f4f6', borderRadius: '1rem', padding: '1rem', background: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ fontWeight: 700, fontSize: '0.78rem', color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{out.label}</span>
              <CopyButton text={out.value} />
            </div>
            <code style={{ fontSize: '0.9rem', fontWeight: 600, color: '#374151', fontFamily: 'monospace' }}>{out.value}</code>
            {out.detail}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Shared page component ────────────────────────────────────────
export default function PantoneToXPage({
  primaryOutput, // 'cmyk' | 'hex' | 'rgb'
  icon,
  iconBg,
  accentColor,
  pageTitle,
  metaDescription,
  canonical,
  seoH2,
  seoText,
}) {
  const [query, setQuery]       = useState('');
  const [selected, setSelected] = useState(null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": pageTitle.split('—')[0].trim(),
    "url": canonical,
    "applicationCategory": "DesignApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript",
    "description": metaDescription,
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
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
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {icon}
              </div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#111827', margin: 0 }}>{pageTitle.split('—')[0].trim()}</h1>
            </div>
            <p style={{ color: '#4b5563', fontSize: '1rem', margin: 0 }}>
              Search any Pantone color by name to get its {primaryOutput.toUpperCase()} equivalent. Over 3,200 PMS colors — instantly.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '2rem 1.5rem 4rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Search box */}
          <div className="card">
            <label htmlFor="pantone-search" className="input-label" style={{ marginBottom: '0.75rem', display: 'block' }}>
              Search Pantone Color by Name
            </label>
            <PantoneSearchInput value={query} onChange={setQuery} onSelect={setSelected} />
            <p style={{ fontSize: '0.78rem', color: '#6b7280', margin: '0.6rem 0 0' }}>
              Try: "186 C", "Cool Gray 9", "Reflex Blue", "Process Black"
            </p>
          </div>

          {/* Result */}
          {selected && (
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>
                {primaryOutput.toUpperCase()} Values for <span className="gradient-text">{selected.name}</span>
              </h2>
              <ResultPanel selected={selected} primaryOutput={primaryOutput} />
            </div>
          )}

          {/* Popular colors — shown only when query is empty and nothing selected */}
          {!selected && !query.trim() && (
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.875rem' }}>
                Popular Colors — click to look up
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(7.5rem, 1fr))', gap: '0.75rem' }}>
                {POPULAR_ENTRIES.map(entry => {
                  const light = isLightColor(entry.hex);
                  const tc = light ? '#1f2937' : '#ffffff';
                  const sc = light ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.65)';
                  return (
                    <button
                      key={entry.name}
                      onClick={() => { setQuery(entry.name); setSelected(entry); }}
                      title={entry.name}
                      style={{
                        border: '1.5px solid rgba(0,0,0,0.08)', borderRadius: '0.875rem',
                        overflow: 'hidden', cursor: 'pointer', background: 'none', padding: 0,
                        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.14)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.07)'; }}
                    >
                      <div style={{ height: '4.5rem', backgroundColor: entry.hex, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: '0.5rem' }}>
                        <span style={{ fontSize: '0.6rem', fontWeight: 700, color: sc, fontFamily: 'monospace' }}>{entry.hex}</span>
                      </div>
                      <div style={{ background: '#fff', padding: '0.375rem 0.5rem' }}>
                        <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#374151', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {entry.name.replace('Pantone ', '')}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* SEO */}
          <div className="card" style={{ borderTop: `3px solid ${accentColor}`, marginTop: '1rem' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem' }}>{seoH2}</h2>
            {seoText.map((p, i) => (
              <p key={i} style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75, margin: i > 0 ? '0.75rem 0 0' : 0 }}>{p}</p>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
