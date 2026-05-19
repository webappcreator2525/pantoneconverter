import { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Building2, ArrowRight, Search, X } from 'lucide-react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import brands from '../../data/brands.json';
import { isLightColor } from '../../lib/colorUtils';

// ─── Industry badge color map ─────────────────────────────────────
function industryStyle(industry) {
  if (industry.includes('Technology'))  return { bg: '#eff6ff', fg: '#1d4ed8' };
  if (industry.includes('Luxury'))      return { bg: '#fdf4ff', fg: '#7e22ce' };
  if (industry.includes('Food'))        return { bg: '#fff7ed', fg: '#c2410c' };
  if (industry.includes('Automotive'))  return { bg: '#fee2e2', fg: '#991b1b' };
  if (industry.includes('Retail'))      return { bg: '#ecfdf5', fg: '#065f46' };
  if (industry.includes('Sports'))      return { bg: '#f0fdf4', fg: '#166534' };
  if (industry.includes('Logistics'))   return { bg: '#fef9c3', fg: '#854d0e' };
  if (industry.includes('Entertainment')) return { bg: '#fce7f3', fg: '#9d174d' };
  return { bg: '#f3f4f6', fg: '#374151' };
}

// ─── Brand card ───────────────────────────────────────────────────
function BrandCard({ brand }) {
  const indStyle = industryStyle(brand.industry);
  // Primary color for the card accent
  const primary  = brand.colors[0];

  return (
    <Link
      href={`/brands/${brand.slug}`}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div
        className="card"
        style={{
          padding: 0, overflow: 'hidden', cursor: 'pointer',
          transition: 'box-shadow 0.22s, transform 0.22s, border-color 0.22s',
          height: '100%', display: 'flex', flexDirection: 'column',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.11)';
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.borderColor = '#e9d5ff';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = '';
          e.currentTarget.style.transform = '';
          e.currentTarget.style.borderColor = '#f3f4f6';
        }}
      >
        {/* Color palette strip */}
        <div style={{ display: 'flex', height: '6rem' }}>
          {brand.colors.map((color, i) => (
            <div
              key={i}
              style={{ flex: 1, backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>

        {/* Card body */}
        <div style={{ padding: '1.1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
          {/* Name + arrow */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 800, fontSize: '1rem', color: '#111827', lineHeight: 1.2 }}>
              {brand.name}
            </span>
            <ArrowRight size={15} color="#6b7280" />
          </div>

          {/* Industry badge */}
          <span style={{
            display: 'inline-block', alignSelf: 'flex-start',
            fontSize: '0.67rem', fontWeight: 700,
            background: indStyle.bg, color: indStyle.fg,
            padding: '0.15rem 0.6rem', borderRadius: '9999px',
          }}>
            {brand.industry}
          </span>

          {/* Color swatches row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '0.25rem' }}>
            {brand.colors.map((color, i) => (
              <div
                key={i}
                title={`${color.name} — ${color.hex}`}
                style={{
                  width: '1.35rem', height: '1.35rem',
                  borderRadius: '50%',
                  backgroundColor: color.hex,
                  border: '2px solid rgba(0,0,0,0.1)',
                  flexShrink: 0,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
              />
            ))}
            <span style={{ fontSize: '0.7rem', color: '#6b7280', marginLeft: '0.25rem' }}>
              {brand.colors.length} color{brand.colors.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────
export default function BrandsIndexPage() {
  const [query, setQuery] = useState('');

  // Group brands by industry for the filter state (static render — no JS needed)
  const industries = useMemo(() => [...new Set(brands.map(b => b.industry))].sort(), []);

  // Filtered brands
  const filteredBrands = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return brands;
    return brands.filter(b => b.name.toLowerCase().includes(q) || b.industry.toLowerCase().includes(q));
  }, [query]);

  return (
    <>
      <Head>
        <title>Brand Color Palettes — Pantone, HEX &amp; CMYK</title>
        <meta
          name="description"
          content="Explore official brand color palettes with Pantone, HEX, and CMYK values for the world's most recognizable brands."
        />
        <link rel="canonical" href="https://pantoneconverter.com/brands/" />
        <meta property="og:title" content="Brand Color Palettes — Pantone, HEX & CMYK" />
        <meta
          property="og:description"
          content="Explore official brand color palettes with Pantone, HEX, and CMYK values for the world's most recognizable brands."
        />
      </Head>

      <NavBar />

      <main style={{ minHeight: '100vh', background: '#fafafa' }}>

        {/* ── Hero ──────────────────────────────────────────── */}
        <div style={{
          background: 'linear-gradient(135deg,#fdf4ff 0%,#eff6ff 55%,#f0fdf4 100%)',
          borderBottom: '1px solid #f3f4f6',
          padding: '2.5rem 1.5rem 2.25rem',
        }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '0.625rem' }}>
              <div style={{
                width: '2.75rem', height: '2.75rem', borderRadius: '0.875rem',
                background: 'linear-gradient(135deg,#c44eed,#4361EE)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(196,78,237,0.35)', flexShrink: 0,
              }}>
                <Building2 size={18} color="#fff" />
              </div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#111827', margin: 0, letterSpacing: '-0.02em' }}>
                Brand Color Palettes
              </h1>
            </div>
            <p style={{ color: '#4b5563', fontSize: '1rem', margin: '0 0 1rem', maxWidth: '46rem', lineHeight: 1.6 }}>
              Official Pantone, HEX, and CMYK color values for the world's most recognizable brands —
              from luxury houses to tech giants.
            </p>

            {/* Stats pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {[
                `${brands.length} brands`,
                `${brands.reduce((s, b) => s + b.colors.length, 0)} colors`,
                `${industries.length} industries`,
              ].map(t => (
                <span key={t} style={{
                  display: 'inline-flex', alignItems: 'center',
                  fontSize: '0.72rem', fontWeight: 700,
                  background: 'rgba(255,255,255,0.85)',
                  border: '1px solid #e9d5ff', color: '#6b21a8',
                  padding: '0.25rem 0.75rem', borderRadius: '9999px',
                  backdropFilter: 'blur(4px)',
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Grid ──────────────────────────────────────────── */}
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '2rem 1.5rem 5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Search bar */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.25rem' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="#6b7280" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                id="brand-search"
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="input-field"
                placeholder="Search brands by name or industry… e.g. 'Starbucks', 'Technology'"
                style={{ paddingLeft: '2.75rem', paddingRight: query ? '2.75rem' : '1rem', fontSize: '0.95rem' }}
              />
              {query && (
                <button onClick={() => setQuery('')} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <X size={16} color="#6b7280" />
                </button>
              )}
            </div>
          </div>

          {filteredBrands.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔍</div>
              <p style={{ fontWeight: 500, margin: 0 }}>No brands match your search.</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1.25rem',
            }}>
              {filteredBrands.map(brand => (
                <BrandCard key={brand.slug} brand={brand} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
