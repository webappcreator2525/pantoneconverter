import Head from 'next/head';
import Link from 'next/link';
import { Calendar, ArrowRight, Sparkles, Copy, Check } from 'lucide-react';
import { useState, useRef } from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { colorOfTheYearData } from '../../data/colorOfTheYearData';
import { isLightColor } from '../../lib/colorUtils';

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);
  const handle = async (e) => {
    e.preventDefault(); // Prevent navigating when clicking inside a link/card
    e.stopPropagation();
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
      style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}
    >
      {copied ? <Check size={10} /> : <Copy size={10} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

export default function ColorOfTheYearIndex() {
  return (
    <>
      <Head>
        <title>Pantone Color of the Year — 2026 Cloud Dancer &amp; Full Archive</title>
        <meta
          name="description"
          content="Explore Pantone Color of the Year 2026: Cloud Dancer (PANTONE 11-4201) plus the complete archive from 1999 to 2026 with HEX, RGB, and CMYK values."
        />
        <link rel="canonical" href="https://pantoneconverter.com/pantone-color-of-the-year/" />
        <meta property="og:title" content="Pantone Color of the Year — 2026 Cloud Dancer & Full Archive" />
        <meta
          property="og:description"
          content="Explore Pantone Color of the Year 2026: Cloud Dancer (PANTONE 11-4201) plus the complete archive from 1999 to 2026 with HEX, RGB, and CMYK values."
        />
      </Head>

      <NavBar />

      <main style={{ minHeight: '100vh', background: '#fafafa' }}>
        {/* Hero Banner */}
        <div style={{
          background: 'linear-gradient(135deg,#fdf4ff 0%,#eff6ff 55%,#f0fdf4 100%)',
          borderBottom: '1px solid #f3f4f6',
          padding: '3rem 1.5rem 2.5rem',
        }}>
          <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: '2.75rem', height: '2.75rem', borderRadius: '0.875rem',
                background: 'linear-gradient(135deg,#c44eed,#4361EE)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(196,78,237,0.35)', flexShrink: 0,
              }}>
                <Calendar size={18} color="#fff" />
              </div>
              <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#111827', margin: 0, letterSpacing: '-0.025em' }}>
                Pantone Color of the Year
              </h1>
            </div>
            <p style={{ color: '#4b5563', fontSize: '1.05rem', margin: '0 0 1.25rem', maxWidth: '48rem', lineHeight: 1.6 }}>
              A historic look back at the shades that shaped design, fashion, and culture. Explore the archive
              from the inaugural year 2000 to the current 2026 selection.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                fontSize: '0.72rem', fontWeight: 700,
                background: 'rgba(255,255,255,0.85)',
                border: '1px solid #e9d5ff', color: '#6b21a8',
                padding: '0.25rem 0.75rem', borderRadius: '9999px',
                backdropFilter: 'blur(4px)',
              }}>
                <Sparkles size={11} />
                27 annual selections
              </span>
            </div>
          </div>
        </div>

        {/* Timeline container */}
        <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '3rem 1.5rem 6rem', position: 'relative' }}>
          
          {/* Vertical central line (hidden on small viewports via CSS or simpler left timeline on all) */}
          <div style={{
            position: 'absolute',
            left: 'calc(1.5rem + 1.5rem)', // align with the timeline nodes on the left
            top: '3rem',
            bottom: '6rem',
            width: '2px',
            background: 'linear-gradient(to bottom, #e9d5ff 0%, #d1d5db 100%)',
            zIndex: 0,
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', position: 'relative', zIndex: 1 }}>
            {colorOfTheYearData.map((item, idx) => (
              <div key={item.year} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                
                {/* Timeline node */}
                <div style={{
                  width: '3.25rem', height: '3.25rem',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ffffff, #f3f4f6)',
                  border: '3px solid #e9d5ff',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 900, fontSize: '0.9rem', color: '#6b21a8',
                  flexShrink: 0,
                  zIndex: 2,
                }}>
                  {item.year}
                </div>

                {/* Timeline Card Content */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1.25rem',
                  }}>
                    {item.colors.map((c) => {
                      const light = isLightColor(c.hex);
                      return (
                        <Link
                          key={c.name}
                          href={`/pantone-color-of-the-year/${item.year}`}
                          style={{ textDecoration: 'none', display: 'block' }}
                        >
                          <div
                            className="card"
                            style={{
                              padding: 0,
                              overflow: 'hidden',
                              cursor: 'pointer',
                              display: 'flex',
                              flexDirection: 'column',
                              height: '100%',
                              transition: 'box-shadow 0.22s, transform 0.22s, border-color 0.22s',
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.boxShadow = '0 8px 24px rgba(196,78,237,0.12)';
                              e.currentTarget.style.transform = 'translateY(-3px)';
                              e.currentTarget.style.borderColor = '#e9d5ff';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.boxShadow = '';
                              e.currentTarget.style.transform = '';
                              e.currentTarget.style.borderColor = '#f3f4f6';
                            }}
                          >
                            {/* Color Swatch */}
                            <div style={{
                              backgroundColor: c.hex,
                              height: '8.5rem',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'flex-end',
                              padding: '1rem',
                            }}>
                              <span style={{
                                fontSize: '0.62rem', fontWeight: 800,
                                color: light ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.75)',
                                textTransform: 'uppercase', letterSpacing: '0.12em',
                              }}>
                                {item.year} Color of the Year
                              </span>
                              <h3 style={{
                                margin: '0.15rem 0 0',
                                color: light ? '#111827' : '#ffffff',
                                fontSize: '1.2rem',
                                fontWeight: 900,
                                lineHeight: 1.2,
                              }}>
                                {c.name}
                              </h3>
                            </div>

                            {/* Details block */}
                            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4b5563' }}>
                                  {c.pantone}
                                </span>
                                <span style={{
                                  fontSize: '0.72rem', color: '#6b7280', fontFamily: 'monospace',
                                  display: 'flex', alignItems: 'center', gap: '0.35rem'
                                }}>
                                  {c.hex}
                                  <CopyBtn text={c.hex} />
                                </span>
                              </div>

                              <p style={{
                                fontSize: '0.8rem', color: '#4b5563', margin: 0,
                                lineHeight: 1.5,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}>
                                {c.description}
                              </p>

                              <div style={{
                                marginTop: 'auto', paddingTop: '0.5rem',
                                display: 'flex', alignItems: 'center', gap: '0.25rem',
                                fontSize: '0.78rem', fontWeight: 700, color: '#c44eed',
                              }}>
                                Explore values &amp; details
                                <ArrowRight size={12} style={{ transition: 'transform 0.2s' }} />
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
