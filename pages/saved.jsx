import Head from 'next/head';
import Link from 'next/link';
import { Heart, Trash2, Palette, ArrowLeft } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useFavorites } from '../lib/FavoritesContext';
import CopyButton from '../components/CopyButton';

function SavedColorCard({ color, onRemove }) {
  const { c, m, y, k } = color.cmyk || {};
  const { r, g, b }     = color.rgb  || {};

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '1rem',
      border: '1.5px solid #f3f4f6',
      overflow: 'hidden',
      transition: 'box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease',
      animation: 'fadeIn 0.3s ease-out',
      display: 'flex',
      flexDirection: 'column',
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 24px rgb(196 78 237 / 0.12)';
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.borderColor = '#e9a8fd';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = '#f3f4f6';
      }}
    >
      {/* Color swatch */}
      <div style={{
        height: '9rem',
        backgroundColor: color.hex,
        position: 'relative',
      }}>
        {/* Remove button overlay */}
        <button
          onClick={() => onRemove(color.name)}
          aria-label={`Remove ${color.name} from favorites`}
          title="Remove from saved"
          style={{
            position: 'absolute', top: '0.6rem', right: '0.6rem',
            background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer',
            borderRadius: '0.5rem', padding: '0.35rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            transition: 'background 0.15s, transform 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#fee2e2';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <Trash2 size={14} color="#ef4444" />
        </button>

        {/* Saved heart indicator */}
        <div style={{
          position: 'absolute', top: '0.6rem', left: '0.6rem',
          background: 'rgba(255,255,255,0.9)', borderRadius: '0.5rem',
          padding: '0.35rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(4px)',
        }}>
          <Heart size={13} fill="#ef4444" color="#ef4444" />
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: '0.875rem', flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#111827', marginBottom: '0.5rem', lineHeight: 1.3 }}>
          {color.name}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {/* HEX */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'nowrap', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', overflow: 'hidden' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', width: '2.2rem', flexShrink: 0 }}>HEX</span>
              <code style={{
                fontSize: '0.75rem', color: '#374151', background: '#f3f4f6',
                padding: '0.1rem 0.35rem', borderRadius: '0.25rem', fontFamily: 'monospace',
                whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'
              }}>
                {color.hex}
              </code>
            </div>
            <div style={{ flexShrink: 0, marginLeft: '0.25rem' }}>
              <CopyButton text={color.hex} />
            </div>
          </div>

          {/* RGB */}
          {r !== undefined && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'nowrap', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', overflow: 'hidden' }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', width: '2.2rem', flexShrink: 0 }}>RGB</span>
                <code style={{
                  fontSize: '0.75rem', color: '#374151', background: '#f3f4f6',
                  padding: '0.1rem 0.35rem', borderRadius: '0.25rem', fontFamily: 'monospace',
                  whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'
                }}>
                  {r}, {g}, {b}
                </code>
              </div>
              <div style={{ flexShrink: 0, marginLeft: '0.25rem' }}>
                <CopyButton text={`${r}, ${g}, ${b}`} />
              </div>
            </div>
          )}

          {/* CMYK */}
          {c !== undefined && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'nowrap', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', overflow: 'hidden' }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', width: '2.2rem', flexShrink: 0 }}>CMYK</span>
                <code style={{
                  fontSize: '0.72rem', color: '#374151', background: '#f3f4f6',
                  padding: '0.1rem 0.35rem', borderRadius: '0.25rem', fontFamily: 'monospace',
                  whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'
                }}>
                  C:{c} M:{m} Y:{y} K:{k}
                </code>
              </div>
              <div style={{ flexShrink: 0, marginLeft: '0.25rem' }}>
                <CopyButton text={`C:${c} M:${m} Y:${y} K:${k}`} />
              </div>
            </div>
          )}

          {/* Collection */}
          {color.collection && (
            <div style={{ marginTop: '0.25rem' }}>
              <span style={{
                fontSize: '0.68rem', fontWeight: 700, color: '#7c3aed',
                background: '#f5f3ff', padding: '0.1rem 0.5rem', borderRadius: '9999px',
              }}>
                {color.collection}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SavedColorsPage() {
  const { favorites, toggleFavorite, clearAll, count } = useFavorites();

  const handleRemove = (name) => {
    const color = favorites.find((f) => f.name === name);
    if (color) toggleFavorite(color);
  };

  return (
    <>
      <Head>
        <title>My Saved Colors — PantoneConverter.com</title>
        <meta name="description" content="Your saved Pantone color favorites. Quickly access your saved swatches, HEX, RGB, and CMYK values." />
        <meta name="robots" content="noindex" />
      </Head>

      <NavBar />

      <main style={{ minHeight: '80vh', background: 'linear-gradient(135deg, #fdf4ff 0%, #eff6ff 50%, #f0fdf4 100%)' }}>
        {/* Hero header */}
        <section style={{ padding: '3rem 1.5rem 2rem', maxWidth: '72rem', margin: '0 auto' }}>
          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
            color: '#4b5563', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600,
            marginBottom: '1.25rem',
          }}>
            <ArrowLeft size={14} />
            Back to converter
          </Link>

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.5rem' }}>
                <div style={{
                  width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem',
                  background: 'linear-gradient(135deg, #c44eed, #4361EE)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 12px rgb(196 78 237 / 0.35)',
                }}>
                  <Heart size={16} fill="#fff" color="#fff" />
                </div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#111827', margin: 0, letterSpacing: '-0.02em' }}>
                  My Saved Colors
                </h1>
              </div>
              <p style={{ color: '#4b5563', fontSize: '0.9rem', margin: 0 }}>
                {count > 0
                  ? `${count} color${count !== 1 ? 's' : ''} saved to your favorites`
                  : 'Your personal Pantone color library'}
              </p>
            </div>

            {/* Clear All button */}
            {count > 0 && (
              <button
                onClick={clearAll}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  padding: '0.6rem 1.1rem', borderRadius: '0.75rem',
                  border: '1.5px solid #fca5a5', background: '#fff',
                  color: '#dc2626', fontSize: '0.82rem', fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.15s ease',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#fee2e2';
                  e.currentTarget.style.borderColor = '#f87171';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#fff';
                  e.currentTarget.style.borderColor = '#fca5a5';
                }}
              >
                <Trash2 size={14} />
                Clear All
              </button>
            )}
          </div>
        </section>

        {/* Content area */}
        <section style={{ padding: '0 1.5rem 4rem', maxWidth: '72rem', margin: '0 auto' }}>
          {count === 0 ? (
            /* Empty state */
            <div style={{
              textAlign: 'center', padding: '5rem 1.5rem',
              background: '#ffffff', borderRadius: '1.5rem',
              border: '1.5px dashed #e5e7eb',
              boxShadow: '0 1px 3px rgb(0 0 0 / 0.04)',
            }}>
              <div style={{
                width: '5rem', height: '5rem', borderRadius: '1.25rem',
                background: 'linear-gradient(135deg, #fdf4ff, #eff6ff)',
                border: '1.5px solid #e9d5ff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1.5rem',
              }}>
                <Palette size={28} color="#c44eed" strokeWidth={1.5} />
              </div>

              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#111827', margin: '0 0 0.625rem' }}>
                No saved colors yet
              </h2>
              <p style={{ color: '#4b5563', fontSize: '0.9rem', maxWidth: '24rem', margin: '0 auto 2rem', lineHeight: 1.6 }}>
                No saved colors yet. Start converting and save your favorites.
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                {[
                  { href: '/cmyk-to-pantone', label: 'CMYK → Pantone' },
                  { href: '/hex-to-pantone',  label: 'HEX → Pantone'  },
                  { href: '/rgb-to-pantone',  label: 'RGB → Pantone'  },
                ].map(({ href, label }) => (
                  <Link key={href} href={href} style={{
                    display: 'inline-flex', alignItems: 'center',
                    padding: '0.6rem 1.1rem', borderRadius: '0.75rem',
                    background: 'linear-gradient(135deg, #c44eed, #4361EE)',
                    color: '#fff', textDecoration: 'none',
                    fontSize: '0.82rem', fontWeight: 700,
                    boxShadow: '0 2px 8px rgb(196 78 237 / 0.3)',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                  }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgb(196 78 237 / 0.4)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgb(196 78 237 / 0.3)'; }}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            /* Grid of saved color cards */
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
              gap: '1rem',
            }}>
              {favorites.map((color) => (
                <SavedColorCard key={color.name} color={color} onRemove={handleRemove} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
