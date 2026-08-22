import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, Bookmark, Sliders, Factory, Scissors, Ruler, BookOpen, Palette } from 'lucide-react';
import { useFavorites } from '../lib/FavoritesContext';
import { CONVERTER_GROUPS, groupLinks } from '../lib/converterLinks';

// Presentation for each converter group. The groups themselves — and which
// routes belong to them — live in lib/converterLinks.js, so the nav, the footer
// and the homepage cannot drift apart.
const GROUP_STYLE = {
  standard:   { Icon: Sliders,  color: '#7c3aed', bg: '#f5f3ff' },
  industrial: { Icon: Factory,  color: '#b91c1c', bg: '#fef2f2' },
  craft:      { Icon: Scissors, color: '#059669', bg: '#ecfdf5' },
  textile:    { Icon: Ruler,    color: '#db2777', bg: '#fdf2f8' },
};

const GROUPS = CONVERTER_GROUPS.map((g) => ({
  ...g,
  ...GROUP_STYLE[g.id],
  links: groupLinks(g),
}));

const PRIMARY_LINKS = [
  { href: '/',                label: 'Home'   },
  { href: '/pantone-finder',  label: 'Finder' },
  { href: '/about',           label: 'About'  },
];

const COLOR_LINKS = [
  { href: '/pantone-red/',    label: 'Pantone Red'    },
  { href: '/pantone-blue/',   label: 'Pantone Blue'   },
  { href: '/pantone-green/',  label: 'Pantone Green'  },
  { href: '/pantone-yellow/', label: 'Pantone Yellow' },
  { href: '/pantone-orange/', label: 'Pantone Orange' },
  { href: '/pantone-pink/',   label: 'Pantone Pink'   },
  { href: '/pantone-purple/', label: 'Pantone Purple' },
  { href: '/pantone-gold/',   label: 'Pantone Gold'   },
  { href: '/pantone-black/',  label: 'Pantone Black'  },
  { href: '/pantone-white/',  label: 'Pantone White'  },
];

const LEARN_LINKS = [
  { href: '/learn',                               label: 'All Articles'          },
  { href: '/learn/what-is-pantone',               label: 'What is Pantone?'      },
  { href: '/learn/pantone-for-beginners',         label: 'Pantone for Beginners' },
  { href: '/learn/coated-vs-uncoated',            label: 'Coated vs Uncoated'    },
  { href: '/learn/cmyk-vs-rgb',                   label: 'CMYK vs RGB'           },
  { href: '/learn/what-is-cmyk',                  label: 'What is CMYK?'         },
  { href: '/learn/how-to-convert-hex-to-pantone', label: 'HEX to Pantone Guide'  },
  { href: '/learn/how-to-convert-cmyk-to-pantone',label: 'CMYK to Pantone Guide' },
  { href: '/learn/brand-color-consistency',       label: 'Brand Color Consistency' },
  { href: '/brands',                              label: 'Brand Colour Palettes' },
  { href: '/pantone-color-of-the-year',           label: 'Colour of the Year'    },
];

const linkStyle = {
  color: '#4b5563', textDecoration: 'none',
  fontWeight: 600, fontSize: '0.85rem', transition: 'color 0.15s ease',
};

const triggerStyle = (isOpen) => ({
  ...linkStyle,
  background: 'none', border: 'none', cursor: 'pointer',
  fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '0.25rem',
  padding: 0, color: isOpen ? '#7c3aed' : '#4b5563',
});

const chevron = (isOpen) => ({
  transition: 'transform 0.2s ease',
  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
});

const panelItemStyle = {
  display: 'block', padding: '0.4rem 0.6rem',
  borderRadius: '0.5rem', textDecoration: 'none',
  fontSize: '0.8rem', fontWeight: 600, color: '#374151',
  transition: 'background 0.12s ease, color 0.12s ease',
};

function hoverIn(e)  { e.currentTarget.style.background = '#f5f3ff'; e.currentTarget.style.color = '#7c3aed'; }
function hoverOut(e) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#374151'; }

/** Single-column dropdown, used for Colors and Learn. */
function NavDropdown({ label, links, isOpen, onToggle, dropRef }) {
  return (
    <div ref={dropRef} style={{ position: 'relative' }}>
      <button onClick={onToggle} style={triggerStyle(isOpen)} aria-expanded={isOpen} aria-haspopup="true">
        {label}
        <ChevronDown size={14} style={chevron(isOpen)} />
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 0.75rem)', right: 0,
          background: '#ffffff', border: '1.5px solid #f3f4f6',
          borderRadius: '0.875rem', boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          minWidth: '13rem', padding: '0.375rem', zIndex: 100,
        }}>
          {links.map(({ href, label: lbl }) => (
            <Link
              key={href}
              href={href}
              onClick={onToggle}
              style={{ ...panelItemStyle, padding: '0.5rem 0.875rem', fontSize: '0.82rem', whiteSpace: 'nowrap' }}
              onMouseEnter={hoverIn}
              onMouseLeave={hoverOut}
            >
              {lbl}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen,   setMegaOpen]   = useState(false);
  const [colorsOpen, setColorsOpen] = useState(false);
  const [learnOpen,  setLearnOpen]  = useState(false);
  const { count: favCount } = useFavorites();

  const megaRef   = useRef(null);
  const colorsRef = useRef(null);
  const learnRef  = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (megaRef.current   && !megaRef.current.contains(e.target))   setMegaOpen(false);
      if (colorsRef.current && !colorsRef.current.contains(e.target)) setColorsOpen(false);
      if (learnRef.current  && !learnRef.current.contains(e.target))  setLearnOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Escape closes whichever panel is open — a mega menu is large enough that
  // clicking away to dismiss it is genuinely annoying.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setMegaOpen(false);
      setColorsOpen(false);
      setLearnOpen(false);
      setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeAll = () => { setMegaOpen(false); setMobileOpen(false); };

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(14px)',
      borderBottom: '1px solid #f3f4f6',
    }}>
      <div style={{
        maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem', height: '4rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <span style={{ fontWeight: 900, fontSize: '1.1rem', letterSpacing: '-0.02em' }} className="gradient-text">
            PantoneConverter
          </span>
          <span className="badge badge-purple">.com</span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }} className="desktop-nav">
          {PRIMARY_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} style={linkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#7c3aed')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}>
              {label}
            </Link>
          ))}

          {/* Converters mega menu — the trigger; the panel is a sibling of this
              row so it can span the full nav width rather than the button's. */}
          <button
            onClick={() => setMegaOpen((o) => !o)}
            style={triggerStyle(megaOpen)}
            aria-expanded={megaOpen}
            aria-haspopup="true"
          >
            Converters
            <ChevronDown size={14} style={chevron(megaOpen)} />
          </button>

          <NavDropdown
            label="Colors"
            links={COLOR_LINKS}
            isOpen={colorsOpen}
            onToggle={() => setColorsOpen((o) => !o)}
            dropRef={colorsRef}
          />

          <NavDropdown
            label="Learn"
            links={LEARN_LINKS}
            isOpen={learnOpen}
            onToggle={() => setLearnOpen((o) => !o)}
            dropRef={learnRef}
          />

          <Link
            href="/saved"
            style={{ ...linkStyle, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#7c3aed')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#4b5563')}
          >
            <Bookmark size={14} strokeWidth={2} style={{ flexShrink: 0 }} />
            Saved
            {favCount > 0 && (
              <span style={{
                background: 'linear-gradient(135deg, #c44eed, #4361EE)',
                color: '#fff', fontSize: '0.65rem', fontWeight: 800,
                borderRadius: '9999px', padding: '0.05rem 0.45rem',
                lineHeight: 1.6, letterSpacing: '0.01em',
              }}>
                {favCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile icons */}
        <div className="mobile-nav-container" style={{ display: 'none', alignItems: 'center', gap: '0.25rem' }}>
          <Link
            href="/saved"
            style={{ position: 'relative', display: 'flex', padding: '0.5rem', color: '#374151', textDecoration: 'none' }}
            aria-label="Saved Colors"
          >
            <Bookmark size={20} color={favCount > 0 ? '#ef4444' : '#374151'} fill={favCount > 0 ? '#ef4444' : 'none'} />
            {favCount > 0 && (
              <span style={{
                position: 'absolute', top: '0.1rem', right: '0.1rem',
                background: '#ef4444', color: '#fff', fontSize: '0.6rem', fontWeight: 800,
                borderRadius: '9999px', padding: '0.1rem 0.3rem', minWidth: '0.9rem',
                textAlign: 'center', lineHeight: 1,
              }}>
                {favCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} color="#374151" /> : <Menu size={22} color="#374151" />}
          </button>
        </div>
      </div>

      {/* ── Converters mega panel ──────────────────────────────── */}
      {megaOpen && (
        <div
          ref={megaRef}
          className="mega-panel"
          style={{
            position: 'absolute', top: '4rem', left: 0, right: 0,
            background: '#ffffff', borderBottom: '1.5px solid #f3f4f6',
            boxShadow: '0 12px 28px -8px rgba(0,0,0,0.12)', zIndex: 45,
          }}
        >
          <div style={{
            maxWidth: '72rem', margin: '0 auto', padding: '1.5rem 1.5rem 1.75rem',
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))', gap: '1.5rem',
          }}>
            {GROUPS.map((group) => (
              <div key={group.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <span style={{
                    width: '1.6rem', height: '1.6rem', borderRadius: '0.45rem', background: group.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <group.Icon size={14} color={group.color} strokeWidth={2.2} />
                  </span>
                  <span style={{
                    fontSize: '0.68rem', fontWeight: 800, color: group.color,
                    textTransform: 'uppercase', letterSpacing: '0.06em',
                  }}>
                    {group.title}
                  </span>
                </div>

                <p style={{ fontSize: '0.72rem', color: '#6b7280', lineHeight: 1.5, margin: '0 0 0.6rem' }}>
                  {group.blurb}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.05rem' }}>
                  {group.links.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={closeAll}
                      style={panelItemStyle}
                      onMouseEnter={hoverIn}
                      onMouseLeave={hoverOut}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Mobile panel ───────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="mobile-nav-panel"
          style={{
            position: 'absolute', top: '4rem', left: 0, right: 0,
            background: '#ffffff', borderBottom: '1.5px solid #f3f4f6',
            maxHeight: 'calc(100vh - 4rem)', overflowY: 'auto', zIndex: 40,
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
            padding: '1.25rem 1rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem',
          }}
        >
          {/* Quick links */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            {PRIMARY_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block', padding: '0.65rem', borderRadius: '0.6rem',
                  border: '1px solid #f3f4f6', background: '#f9fafb', textAlign: 'center',
                  textDecoration: 'none', fontSize: '0.78rem', fontWeight: 700, color: '#4b5563',
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Converter groups — the same four as the desktop mega panel */}
          {GROUPS.map((group) => (
            <div key={group.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                borderBottom: '1px solid #f3f4f6', paddingBottom: '0.4rem',
              }}>
                <group.Icon size={15} color={group.color} />
                <span style={{
                  fontSize: '0.68rem', fontWeight: 700, color: '#5c6370',
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                }}>
                  {group.title}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {group.links.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'block', padding: '0.6rem 0.75rem', borderRadius: '0.5rem',
                      background: '#f9fafb', border: '1px solid #f3f4f6', textDecoration: 'none',
                      fontSize: '0.76rem', fontWeight: 600, color: '#374151', lineHeight: 1.35,
                    }}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Colour families */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              borderBottom: '1px solid #f3f4f6', paddingBottom: '0.4rem',
            }}>
              <Palette size={15} color="#C8102E" />
              <span style={{
                fontSize: '0.68rem', fontWeight: 700, color: '#5c6370',
                textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>
                Colour Families
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {COLOR_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block', padding: '0.6rem 0.75rem', borderRadius: '0.5rem',
                    background: '#f9fafb', border: '1px solid #f3f4f6', textDecoration: 'none',
                    fontSize: '0.76rem', fontWeight: 600, color: '#374151',
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Learn */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              borderBottom: '1px solid #f3f4f6', paddingBottom: '0.4rem',
            }}>
              <BookOpen size={15} color="#0d9488" />
              <span style={{
                fontSize: '0.68rem', fontWeight: 700, color: '#5c6370',
                textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>
                Learning Hub
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {LEARN_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block', padding: '0.6rem 0.75rem', borderRadius: '0.5rem',
                    background: '#f9fafb', border: '1px solid #f3f4f6', textDecoration: 'none',
                    fontSize: '0.76rem', fontWeight: 600, color: '#374151', lineHeight: 1.35,
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav          { display: none !important; }
          .mobile-nav-container { display: flex !important; }
          .mega-panel           { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
