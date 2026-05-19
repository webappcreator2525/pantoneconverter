import Head from 'next/head';
import { useState, useMemo, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CopyButton from '../components/CopyButton';
import pantoneDb from '../data/pantone.json';
import { isLightColor } from '../lib/colorUtils';

const PAGE_SIZE = 120;

const COLLECTIONS = [
  { key: 'all',           label: 'All'             },
  { key: 'coated',        label: 'Coated'          },
  { key: 'uncoated',      label: 'Uncoated'        },
  { key: 'metallic',      label: 'Metallic'        },
  { key: 'pastels-neons', label: 'Pastels & Neons' },
];

export default function PantoneFinder() {
  const [query,      setQuery]      = useState('');
  const [collection, setCollection] = useState('coated');
  const [visible,    setVisible]    = useState(PAGE_SIZE);
  const [selected,   setSelected]   = useState(null);

  // Filtered list
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pantoneDb.filter(e => {
      const collOk = collection === 'all' || e.collection === collection;
      const searchOk = !q || e.name.toLowerCase().includes(q) || e.hex.toLowerCase().includes(q);
      return collOk && searchOk;
    });
  }, [query, collection]);

  const shown = filtered.slice(0, visible);

  const handleCollectionChange = useCallback(key => {
    setCollection(key);
    setVisible(PAGE_SIZE);
    setSelected(null);
  }, []);

  const handleSearch = useCallback(val => {
    setQuery(val);
    setVisible(PAGE_SIZE);
    setSelected(null);
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Pantone Color Finder",
    "url": "https://pantoneconverter.com/pantone-finder/",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript",
    "description": "Browse and search the complete Pantone PMS color library. Filter by coated, uncoated, metallic, and pastels. Click any swatch to get HEX, RGB, and CMYK values.",
  };

  return (
    <>
      <Head>
        <title>Pantone Color Finder — Browse All PMS Colors Free</title>
        <meta name="description" content="Browse and search the complete Pantone PMS color library. Filter by coated, uncoated, metallic, and pastels. Click any swatch to get HEX, RGB, and CMYK values." />
        <link rel="canonical" href="https://pantoneconverter.com/pantone-finder/" />
        <meta property="og:title" content="Pantone Color Finder — Browse All PMS Colors Free" />
        <meta property="og:description" content="Browse and search the complete Pantone PMS color library — free, instant, no login." />
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
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', background: '#fff1f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Search size={20} color="#e11d48" />
              </div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#111827', margin: 0 }}>Pantone Color Finder</h1>
            </div>
            <p style={{ color: '#4b5563', fontSize: '1rem', margin: 0 }}>
              Browse all {pantoneDb.length.toLocaleString()} Pantone PMS colors. Click any swatch to see HEX, RGB, and CMYK values.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '2rem 1.5rem 4rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          {/* Search + filters */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Search input */}
            <div style={{ position: 'relative' }}>
              <Search size={16} color="#6b7280" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                id="finder-search"
                type="text"
                value={query}
                onChange={e => handleSearch(e.target.value)}
                className="input-field"
                placeholder="Search by name or HEX… e.g. 'Cool Gray', '#FF0000'"
                style={{ paddingLeft: '2.75rem', paddingRight: query ? '2.75rem' : '1rem', fontSize: '0.95rem' }}
              />
              {query && (
                <button onClick={() => handleSearch('')} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <X size={16} color="#6b7280" />
                </button>
              )}
            </div>

            {/* Collection filter chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {COLLECTIONS.map(({ key, label }) => (
                <button key={key} onClick={() => handleCollectionChange(key)} style={{
                  padding: '0.4rem 1rem', borderRadius: '9999px', border: '1.5px solid',
                  fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s ease',
                  ...(collection === key
                    ? { background: 'linear-gradient(135deg,#c44eed,#4361EE)', color: '#fff', borderColor: 'transparent', boxShadow: '0 2px 8px rgba(196,78,237,0.35)' }
                    : { background: '#fff', color: '#4b5563', borderColor: '#e5e7eb' }),
                }}>
                  {label}
                </button>
              ))}
              <span style={{ marginLeft: 'auto', fontSize: '0.78rem', color: '#6b7280', alignSelf: 'center' }}>
                {filtered.length.toLocaleString()} colors
              </span>
            </div>
          </div>

          {/* Expanded detail panel */}
          {selected && (
            <div className="card" style={{ border: '2px solid #c44eed', background: '#fdf4ff' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', flexWrap: 'wrap' }}>
                {/* Large swatch */}
                <div style={{
                  width: '6rem', height: '6rem', borderRadius: '1rem', flexShrink: 0,
                  backgroundColor: selected.hex, border: '1px solid rgba(0,0,0,0.1)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                }} />
                {/* Info */}
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', margin: 0 }}>{selected.name}</h2>
                    <span className="badge badge-purple">{selected.collection}</span>
                    <button onClick={() => setSelected(null)} className="copy-btn">✕ Close</button>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
                    {[
                      { lbl: 'HEX',  val: selected.hex, copy: selected.hex },
                      { lbl: 'RGB',  val: `${selected.rgb.r}, ${selected.rgb.g}, ${selected.rgb.b}`, copy: `${selected.rgb.r}, ${selected.rgb.g}, ${selected.rgb.b}` },
                      { lbl: 'CMYK', val: `C:${selected.cmyk.c} M:${selected.cmyk.m} Y:${selected.cmyk.y} K:${selected.cmyk.k}`, copy: `C:${selected.cmyk.c} M:${selected.cmyk.m} Y:${selected.cmyk.y} K:${selected.cmyk.k}` },
                    ].map(({ lbl, val, copy }) => (
                      <div key={lbl}>
                        <div className="input-label" style={{ marginBottom: '0.2rem' }}>{lbl}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <code style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.9rem', color: '#111827' }}>{val}</code>
                          <CopyButton text={copy} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Swatch grid */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔍</div>
              <p style={{ fontWeight: 500 }}>No Pantone colors match your search.</p>
            </div>
          ) : (
            <>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(7rem, 1fr))',
                gap: '0.75rem',
              }}>
                {shown.map(entry => {
                  const light = isLightColor(entry.hex);
                  const isActive = selected?.name === entry.name;
                  return (
                    <button
                      key={entry.name}
                      onClick={() => setSelected(isActive ? null : entry)}
                      title={`${entry.name} — ${entry.hex}`}
                      style={{
                        border: isActive ? '2.5px solid #c44eed' : '1.5px solid rgba(0,0,0,0.08)',
                        borderRadius: '0.875rem',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        background: 'none',
                        padding: 0,
                        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                        boxShadow: isActive ? '0 0 0 3px rgba(196,78,237,0.25)' : '0 1px 4px rgba(0,0,0,0.07)',
                        transform: isActive ? 'scale(1.04)' : 'scale(1)',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = isActive ? 'scale(1.04)' : 'scale(1)'; e.currentTarget.style.boxShadow = isActive ? '0 0 0 3px rgba(196,78,237,0.25)' : '0 1px 4px rgba(0,0,0,0.07)'; }}
                    >
                      {/* Color block */}
                      <div style={{ height: '4.5rem', backgroundColor: entry.hex }} />
                      {/* Label */}
                      <div style={{ background: '#fff', padding: '0.375rem 0.5rem' }}>
                        <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#374151', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {entry.name.replace('Pantone ', '')}
                        </div>
                        <div style={{ fontSize: '0.6rem', color: '#6b7280', fontFamily: 'monospace', marginTop: '0.1rem' }}>
                          {entry.hex}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Load more */}
              {visible < filtered.length && (
                <div style={{ textAlign: 'center', paddingTop: '0.5rem' }}>
                  <button
                    onClick={() => setVisible(v => v + PAGE_SIZE)}
                    className="btn-secondary"
                    style={{ fontSize: '0.875rem' }}
                  >
                    Show More ({Math.min(PAGE_SIZE, filtered.length - visible)} more)
                  </button>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
                    Showing {shown.length} of {filtered.length.toLocaleString()} colors
                  </p>
                </div>
              )}
            </>
          )}

          {/* SEO */}
          <div className="card" style={{ borderTop: '3px solid #e11d48', marginTop: '1rem' }}>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', marginBottom: '0.75rem' }}>
              What is the Pantone Color Finder?
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75, margin: 0 }}>
              The Pantone Matching System (PMS) is the global standard for specifying and communicating color
              in design and manufacturing. With over 3,200 standardized spot colors across coated, uncoated,
              metallic, pastel, neon, skin-tone, and Color of the Year collections, finding the right Pantone
              color can be challenging without a physical swatch book.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75, margin: '0.75rem 0 0' }}>
              This free Pantone Finder lets you instantly search and browse the full PMS library by name or
              HEX code. Click any swatch to reveal its complete color data — HEX, RGB, and CMYK values — all
              with one-click copy buttons. Whether you're a graphic designer confirming a brand color, a prepress
              technician verifying ink specifications, or a product developer sourcing a finish, the Pantone
              Finder gives you the reference data you need in seconds.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
