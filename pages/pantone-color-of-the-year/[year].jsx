import Head from 'next/head';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, Copy, Check, Heart, Sparkles, Search } from 'lucide-react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { colorOfTheYearData } from '../../data/colorOfTheYearData';
import { isLightColor } from '../../lib/colorUtils';
import { useFavorites } from '../../lib/FavoritesContext';

export async function getStaticPaths() {
  const paths = colorOfTheYearData.map(item => ({
    params: { year: item.year.toString() }
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const yearInt = parseInt(params.year, 10);
  const dataIdx = colorOfTheYearData.findIndex(item => item.year === yearInt);
  if (dataIdx === -1) return { notFound: true };

  const current = colorOfTheYearData[dataIdx];
  const prev = dataIdx < colorOfTheYearData.length - 1 ? colorOfTheYearData[dataIdx + 1].year : null;
  const next = dataIdx > 0 ? colorOfTheYearData[dataIdx - 1].year : null;

  return {
    props: {
      current,
      prev,
      next
    }
  };
}

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

function ColorDetailCard({ color, year }) {
  const { isSaved, toggleFavorite } = useFavorites();
  const saved = isSaved(color.pantone);
  const { r, g, b } = color.rgb;
  const { c, m, y, k } = color.cmyk;

  const handleFav = () => toggleFavorite({
    name: color.pantone,
    hex: color.hex,
    rgb: color.rgb,
    cmyk: color.cmyk,
    collection: 'coated'
  });

  return (
    <div className="card" style={{
      display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1,
      borderTop: `4px solid ${color.hex}`
    }}>
      {/* Title & Favorite */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Color Name &amp; Code
          </span>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#111827', margin: '0.1rem 0 0' }}>
            {color.name}
          </h2>
        </div>
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
            size={18}
            fill={saved ? '#ef4444' : 'none'}
            color={saved ? '#ef4444' : '#6b7280'}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* Description */}
      <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
        {color.description}
      </p>

      {/* Values Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.5rem' }}>
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
                width: '3.2rem', flexShrink: 0,
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

      {/* Find similar button */}
      <Link
        href={`/hex-to-pantone?hex=${encodeURIComponent(color.hex)}`}
        style={{
          marginTop: 'auto',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          padding: '0.6rem 1rem', borderRadius: '0.75rem',
          border: '1.5px solid #e5e7eb', color: '#374151',
          textDecoration: 'none', fontSize: '0.8rem', fontWeight: 700,
          background: '#fff', transition: 'all 0.15s',
          textAlign: 'center'
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#f9fafb'; e.currentTarget.style.borderColor = '#d1d5db'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#e5e7eb'; }}
      >
        <Search size={14} />
        Find similar colors
      </Link>
    </div>
  );
}

export default function ColorOfTheYearDetail({ current, prev, next }) {
  const titleStr = `${current.year} Pantone Color of the Year — ${current.colors.map(c => c.name).join(' & ')}`;
  const primaryColor = current.colors[0];
  const metaDesc = `Official Pantone Color of the Year for ${current.year}: ${current.colors.map(c => `${c.name} (${c.pantone})`).join(' and ')}. View complete HEX, RGB, and CMYK codes.`;

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
        "name": "Color of the Year",
        "item": "https://pantoneconverter.com/pantone-color-of-the-year/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": current.year.toString(),
        "item": `https://pantoneconverter.com/pantone-color-of-the-year/${current.year}/`
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{titleStr}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href={`https://pantoneconverter.com/pantone-color-of-the-year/${current.year}/`} />
        <meta property="og:title" content={titleStr} />
        <meta property="og:description" content={metaDesc} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>

      <NavBar />

      <main style={{ minHeight: '100vh', background: '#fafafa' }}>
        
        {/* Navigation / Header strip */}
        <div style={{ background: '#fff', borderBottom: '1px solid #f3f4f6', padding: '1rem 1.5rem' }}>
          <div style={{ maxWidth: '64rem', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Breadcrumbs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#6b7280', fontSize: '0.8rem', fontWeight: 600 }}>
              <Link href="/" style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#7c3aed'} onMouseLeave={e => e.currentTarget.style.color = '#4b5563'}>
                Home
              </Link>
              <span aria-hidden="true" style={{ color: '#d1d5db' }}>›</span>
              <Link href="/pantone-color-of-the-year" style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#7c3aed'} onMouseLeave={e => e.currentTarget.style.color = '#4b5563'}>
                Color of the Year
              </Link>
              <span aria-hidden="true" style={{ color: '#d1d5db' }}>›</span>
              <span style={{ color: '#111827' }}>{current.year}</span>
            </div>

            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#6b21a8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Sparkles size={13} />
              PANTONE ARCHIVE
            </span>
          </div>
        </div>

        {/* Hero Swatch Block */}
        <div style={{
          display: 'flex',
          height: '24rem',
          width: '100%',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          position: 'relative'
        }}>
          {current.colors.map((c) => {
            const light = isLightColor(c.hex);
            return (
              <div
                key={c.name}
                style={{
                  flex: 1,
                  backgroundColor: c.hex,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '2.5rem 2rem',
                  position: 'relative',
                  transition: 'flex 0.3s ease',
                }}
              >
                <div style={{
                  maxWidth: '32rem',
                  animation: 'fadeIn 0.4s ease-out both',
                }}>
                  <span style={{
                    fontSize: '0.75rem', fontWeight: 800,
                    color: light ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.75)',
                    textTransform: 'uppercase', letterSpacing: '0.14em',
                  }}>
                    {current.year} Color of the Year
                  </span>
                  <h1 style={{
                    margin: '0.2rem 0 0.5rem',
                    fontSize: '2.5rem',
                    fontWeight: 900,
                    color: light ? '#111827' : '#ffffff',
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                  }}>
                    {c.name}
                  </h1>
                  <code style={{
                    fontSize: '1.25rem', fontWeight: 700,
                    color: light ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.8)',
                    fontFamily: 'monospace',
                  }}>
                    {c.pantone}
                  </code>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
          
          {/* Detail Cards Row */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '1.5rem',
            alignItems: 'stretch'
          }}>
            {current.colors.map((c) => (
              <ColorDetailCard key={c.name} color={c} year={current.year} />
            ))}
          </div>

          {/* Chronological Navigation Bar */}
          <div style={{
            marginTop: '3.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}>
            {prev ? (
              <Link href={`/pantone-color-of-the-year/${prev}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                color: '#4b5563', textDecoration: 'none',
                fontSize: '0.85rem', fontWeight: 700,
                padding: '0.5rem 1rem', borderRadius: '0.5rem',
                border: '1px solid #e5e7eb', background: '#fff',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f9fafb'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
              >
                <ArrowLeft size={14} />
                {prev} Selection
              </Link>
            ) : <div />}

            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#6b7280' }}>
              {current.year}
            </span>

            {next ? (
              <Link href={`/pantone-color-of-the-year/${next}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                color: '#4b5563', textDecoration: 'none',
                fontSize: '0.85rem', fontWeight: 700,
                padding: '0.5rem 1rem', borderRadius: '0.5rem',
                border: '1px solid #e5e7eb', background: '#fff',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f9fafb'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
              >
                {next} Selection
                <ArrowRight size={14} />
              </Link>
            ) : <div />}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
