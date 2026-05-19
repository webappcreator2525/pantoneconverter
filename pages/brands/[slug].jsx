import Head from 'next/head';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { ArrowLeft, Copy, Check, Heart, Building2 } from 'lucide-react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import brands from '../../data/brands.json';
import { isLightColor } from '../../lib/colorUtils';
import { useFavorites } from '../../lib/FavoritesContext';

// ─── Generate one static page per brand slug ──────────────────────
export async function getStaticPaths() {
  return {
    paths: brands.map(b => ({ params: { slug: b.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const brand = brands.find(b => b.slug === params.slug) ?? null;
  if (!brand) return { notFound: true };
  return { props: { brand } };
}

// ─── Role badge styling ───────────────────────────────────────────
function roleBadgeStyle(role) {
  switch (role) {
    case 'Primary':   return { bg: '#eff6ff', fg: '#1d4ed8' };
    case 'Secondary': return { bg: '#f0fdf4', fg: '#166534' };
    case 'Accent':    return { bg: '#fdf4ff', fg: '#7e22ce' };
    case 'Legacy':    return { bg: '#fef9c3', fg: '#854d0e' };
    default:          return { bg: '#f3f4f6', fg: '#374151' };
  }
}

// ─── Industry badge styling ───────────────────────────────────────
function industryStyle(industry) {
  if (industry.includes('Technology'))    return { bg: '#eff6ff', fg: '#1d4ed8' };
  if (industry.includes('Luxury'))        return { bg: '#fdf4ff', fg: '#7e22ce' };
  if (industry.includes('Food'))          return { bg: '#fff7ed', fg: '#c2410c' };
  if (industry.includes('Automotive'))    return { bg: '#fee2e2', fg: '#991b1b' };
  if (industry.includes('Retail'))        return { bg: '#ecfdf5', fg: '#065f46' };
  if (industry.includes('Sports'))        return { bg: '#f0fdf4', fg: '#166534' };
  if (industry.includes('Logistics'))     return { bg: '#fef9c3', fg: '#854d0e' };
  if (industry.includes('Entertainment')) return { bg: '#fce7f3', fg: '#9d174d' };
  return { bg: '#f3f4f6', fg: '#374151' };
}

// ─── Copy button ──────────────────────────────────────────────────
function CopyBtn({ text, label }) {
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
      {copied ? 'Copied!' : (label ?? 'Copy')}
    </button>
  );
}

// ─── Single color card ────────────────────────────────────────────
function ColorCard({ color, rank }) {
  const { isSaved, toggleFavorite } = useFavorites();
  const saved   = isSaved(color.pantone);
  const isLight = isLightColor(color.hex);
  const textCol = isLight ? '#1f2937' : '#ffffff';
  const subCol  = isLight ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.75)';
  const role    = roleBadgeStyle(color.role);
  const { r, g, b } = color.rgb;
  const { c, m, y, k } = color.cmyk;

  const handleFav = () => toggleFavorite({
    name:       color.pantone,
    hex:        color.hex,
    rgb:        color.rgb,
    cmyk:       color.cmyk,
    collection: 'coated',
  });

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '1.25rem',
        border: '1.5px solid #f3f4f6',
        overflow: 'hidden',
        animation: `fadeIn 0.35s ease-out ${rank * 80}ms both`,
        display: 'flex', flexDirection: 'column',
        transition: 'box-shadow 0.2s, transform 0.2s, border-color 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.1)';
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.borderColor = '#e9d5ff';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '';
        e.currentTarget.style.transform = '';
        e.currentTarget.style.borderColor = '#f3f4f6';
      }}
    >
      {/* Large color swatch */}
      <div style={{
        backgroundColor: color.hex,
        minHeight: '9rem',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
        gap: '0.3rem',
        transition: 'background-color 0.3s',
      }}>
        <div style={{
          fontSize: '0.6rem', fontWeight: 800,
          color: subCol, textTransform: 'uppercase', letterSpacing: '0.14em',
        }}>
          {color.role}
        </div>
        <div style={{
          fontSize: '0.95rem', fontWeight: 900, color: textCol,
          textAlign: 'center', lineHeight: 1.3,
        }}>
          {color.name}
        </div>
        <code style={{
          fontSize: '1.25rem', fontWeight: 800, color: textCol,
          fontFamily: 'monospace', letterSpacing: '0.04em',
        }}>
          {color.hex}
        </code>
      </div>

      {/* Data body */}
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
        {/* Role badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontSize: '0.68rem', fontWeight: 700,
            background: role.bg, color: role.fg,
            padding: '0.15rem 0.6rem', borderRadius: '9999px',
          }}>
            {color.role}
          </span>
          {/* Heart / favorites */}
          <button
            onClick={handleFav}
            aria-label={saved ? 'Remove from favorites' : 'Save to favorites'}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '0.2rem', display: 'flex', transition: 'transform 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.25)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Heart
              size={16}
              fill={saved ? '#ef4444' : 'none'}
              color={saved ? '#ef4444' : '#6b7280'}
              strokeWidth={2}
            />
          </button>
        </div>

        {/* Value rows */}
        {[
          { label: 'Pantone', value: color.pantone },
          { label: 'HEX',     value: color.hex },
          { label: 'RGB',     value: `${r}, ${g}, ${b}` },
          { label: 'CMYK',    value: `C:${c} M:${m} Y:${y} K:${k}` },
        ].map(row => (
          <div key={row.label} style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', gap: '0.4rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', minWidth: 0, flex: 1 }}>
              <span style={{
                fontSize: '0.62rem', fontWeight: 800, color: '#6b7280',
                textTransform: 'uppercase', letterSpacing: '0.08em',
                width: '3rem', flexShrink: 0,
              }}>
                {row.label}
              </span>
              <code style={{
                fontSize: '0.75rem', fontWeight: 600, color: '#374151',
                background: '#f3f4f6', padding: '0.12rem 0.4rem',
                borderRadius: '0.3rem', fontFamily: 'monospace',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                flex: 1, display: 'block',
              }}>
                {row.value}
              </code>
            </div>
            <CopyBtn text={row.value} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Individual brand page ────────────────────────────────────────
export default function BrandPage({ brand }) {
  const primaryColor   = brand.colors[0];
  const indStyle       = industryStyle(brand.industry);
  const isLight        = isLightColor(primaryColor.hex);

  const pageTitle      = `${brand.name} Brand Colors — Pantone, HEX & CMYK`;
  const metaDesc       = `Official ${brand.name} brand colors: ${primaryColor.pantone} (${primaryColor.hex}) and more. Full Pantone, HEX, RGB, and CMYK values for every ${brand.name} brand color.`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://pantoneconverter.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Brand Colors",
        "item": "https://pantoneconverter.com/brands/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": brand.name,
        "item": `https://pantoneconverter.com/brands/${brand.slug}/`
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={`https://pantoneconverter.com/brands/${brand.slug}/`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDesc} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>

      <NavBar />

      <main style={{ minHeight: '100vh', background: '#fafafa' }}>

        {/* ── Hero strip ─────────────────────────────────────── */}
        <div style={{
          background: 'linear-gradient(135deg,#fdf4ff 0%,#eff6ff 55%,#f0fdf4 100%)',
          borderBottom: '1px solid #f3f4f6',
          padding: '2.25rem 1.5rem 2rem',
        }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
            {/* Breadcrumbs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#6b7280', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1.1rem' }}>
              <Link href="/" style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#7c3aed'} onMouseLeave={e => e.currentTarget.style.color = '#4b5563'}>
                Home
              </Link>
              <span aria-hidden="true" style={{ color: '#d1d5db' }}>›</span>
              <Link href="/brands" style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#7c3aed'} onMouseLeave={e => e.currentTarget.style.color = '#4b5563'}>
                Brand Colors
              </Link>
              <span aria-hidden="true" style={{ color: '#d1d5db' }}>›</span>
              <span style={{ color: '#111827' }}>{brand.name}</span>
            </div>

            {/* Brand header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
              {/* Color dot cluster */}
              <div style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                gap: '0.3rem', flexShrink: 0,
              }}>
                {brand.colors.slice(0, 3).map((c, i) => (
                  <div key={i} style={{
                    width: '0.85rem', height: '0.85rem', borderRadius: '50%',
                    backgroundColor: c.hex, border: '1.5px solid rgba(0,0,0,0.1)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                  }} />
                ))}
              </div>

              <div>
                <h1 style={{
                  fontSize: '2rem', fontWeight: 900, color: '#111827',
                  margin: '0 0 0.5rem', letterSpacing: '-0.025em',
                }}>
                  {brand.name}
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '0.7rem', fontWeight: 700,
                    background: indStyle.bg, color: indStyle.fg,
                    padding: '0.2rem 0.7rem', borderRadius: '9999px',
                  }}>
                    {brand.industry}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#4b5563' }}>
                    {brand.colors.length} brand color{brand.colors.length !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p style={{
              color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.7,
              margin: '1.1rem 0 0', maxWidth: '52rem',
            }}>
              {brand.description}
            </p>
          </div>
        </div>

        {/* ── Palette strip ──────────────────────────────────── */}
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '1.5rem 1.5rem 0' }}>
          <div style={{
            display: 'flex', height: '5rem', borderRadius: '1rem',
            overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
          }}>
            {brand.colors.map((c, i) => {
              const light = isLightColor(c.hex);
              return (
                <div key={i} style={{
                  flex: 1, backgroundColor: c.hex,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: '0.2rem', padding: '0.5rem',
                }}>
                  <span style={{ fontSize: '0.55rem', fontWeight: 800, color: light ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.12em', textAlign: 'center' }}>
                    {c.role}
                  </span>
                  <code style={{ fontSize: '0.6rem', fontWeight: 700, color: light ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)', fontFamily: 'monospace' }}>
                    {c.hex}
                  </code>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Color cards grid ───────────────────────────────── */}
        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '1.75rem 1.5rem 5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
            gap: '1.25rem',
          }}>
            {brand.colors.map((color, i) => (
              <ColorCard key={color.name} color={color} rank={i} />
            ))}
          </div>

          {/* Back link at bottom */}
          <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <Link href="/brands" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.65rem 1.5rem', borderRadius: '0.75rem',
              border: '1.5px solid #e5e7eb', color: '#374151',
              textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700,
              background: '#fff', transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#f9fafb'; e.currentTarget.style.borderColor = '#d1d5db'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
            >
              <ArrowLeft size={14} />
              View all brand palettes
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
