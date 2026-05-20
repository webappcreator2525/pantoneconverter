import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, Bookmark, Sliders, ArrowRightLeft, Layers, BookOpen, Home, Info, Shield } from 'lucide-react';
import { useFavorites } from '../lib/FavoritesContext';

const PRIMARY_LINKS = [
  { href: '/',                label: 'Home'   },
  { href: '/cmyk-to-pantone', label: 'CMYK'   },
  { href: '/hex-to-pantone',  label: 'HEX'    },
  { href: '/rgb-to-pantone',  label: 'RGB'    },
  { href: '/pantone-finder',  label: 'Finder' },
  { href: '/about',           label: 'About'  },
];

const MORE_LINKS = [
  { href: '/hsl-to-pantone',             label: 'HSL → Pantone'    },
  { href: '/pantone-to-cmyk',            label: 'Pantone → CMYK'   },
  { href: '/pantone-to-hex',             label: 'Pantone → HEX'    },
  { href: '/pantone-to-rgb',             label: 'Pantone → RGB'    },
  { href: '/compare',                    label: 'Compare Colors'    },
  { href: '/image-to-pantone',           label: 'Image to Pantone'  },
  { href: '/brands',                     label: 'Brand Colors'       },
  { href: '/pantone-color-of-the-year',  label: 'Color of the Year'  },
];

const LEARN_LINKS = [
  { href: '/learn',                               label: 'All Articles'         },
  { href: '/learn/what-is-pantone',               label: 'What is Pantone?'     },
  { href: '/learn/how-to-convert-hex-to-pantone', label: 'HEX to Pantone Guide' },
  { href: '/learn/cmyk-vs-rgb',                   label: 'CMYK vs RGB'          },
  { href: '/learn/coated-vs-uncoated',            label: 'Coated vs Uncoated'   },
  { href: '/learn/what-is-cmyk',                  label: 'What is CMYK?'        },
  { href: '/learn/how-to-convert-cmyk-to-pantone',label: 'CMYK to Pantone Guide'},
  { href: '/learn/pantone-for-beginners',         label: 'Pantone for Beginners'},
  { href: '/learn/brand-color-consistency',       label: 'Brand Color Consistency'},
];

const ALL_MOBILE_LINKS = [...PRIMARY_LINKS, ...MORE_LINKS, ...LEARN_LINKS];

const MOBILE_SECTIONS = [
  {
    title: 'Converters (To Pantone)',
    icon: Sliders,
    color: '#7c3aed',
    links: [
      { href: '/cmyk-to-pantone', label: 'CMYK → Pantone' },
      { href: '/hex-to-pantone', label: 'HEX → Pantone' },
      { href: '/rgb-to-pantone', label: 'RGB → Pantone' },
      { href: '/hsl-to-pantone', label: 'HSL → Pantone' },
      { href: '/pantone-finder', label: 'Pantone Finder' },
    ]
  },
  {
    title: 'Converters (From Pantone)',
    icon: ArrowRightLeft,
    color: '#2563eb',
    links: [
      { href: '/pantone-to-cmyk', label: 'Pantone → CMYK' },
      { href: '/pantone-to-hex', label: 'Pantone → HEX' },
      { href: '/pantone-to-rgb', label: 'Pantone → RGB' },
    ]
  },
  {
    title: 'Creative & Design Tools',
    icon: Layers,
    color: '#ea580c',
    links: [
      { href: '/compare', label: 'Compare Colors' },
      { href: '/image-to-pantone', label: 'Image to Pantone' },
      { href: '/brands', label: 'Brand Colors' },
      { href: '/pantone-color-of-the-year', label: 'Color of the Year' },
    ]
  },
  {
    title: 'Learning Hub',
    icon: BookOpen,
    color: '#0d9488',
    links: [
      { href: '/learn', label: 'All Articles' },
      { href: '/learn/what-is-pantone', label: 'What is Pantone?' },
      { href: '/learn/coated-vs-uncoated', label: 'Coated vs Uncoated' },
      { href: '/learn/cmyk-vs-rgb', label: 'CMYK vs RGB' },
    ]
  }
];

const linkStyle = {
  color: '#4b5563', textDecoration: 'none',
  fontWeight: 600, fontSize: '0.85rem', transition: 'color 0.15s ease',
};

function NavDropdown({ label, links, isOpen, onToggle, dropRef }) {
  return (
    <div ref={dropRef} style={{ position: 'relative' }}>
      <button
        onClick={onToggle}
        style={{
          ...linkStyle, background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '0.25rem',
          padding: 0, color: isOpen ? '#7c3aed' : '#4b5563',
        }}
      >
        {label}
        <ChevronDown
          size={14}
          style={{ transition: 'transform 0.2s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
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
              style={{
                display: 'block', padding: '0.5rem 0.875rem',
                borderRadius: '0.5rem', textDecoration: 'none',
                fontSize: '0.82rem', fontWeight: 600, color: '#374151',
                transition: 'background 0.12s ease, color 0.12s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#f5f3ff'; e.currentTarget.style.color = '#7c3aed'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#374151'; }}
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
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [moreOpen,      setMoreOpen]      = useState(false);
  const [learnOpen,     setLearnOpen]     = useState(false);
  const { count: favCount }              = useFavorites();

  const moreRef  = useRef(null);
  const learnRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (moreRef.current  && !moreRef.current.contains(e.target))  setMoreOpen(false);
      if (learnRef.current && !learnRef.current.contains(e.target)) setLearnOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

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

          {/* Learn dropdown */}
          <NavDropdown
            label="Learn"
            links={LEARN_LINKS}
            isOpen={learnOpen}
            onToggle={() => setLearnOpen((o) => !o)}
            dropRef={learnRef}
          />

          {/* More Tools dropdown */}
          <NavDropdown
            label="More Tools"
            links={MORE_LINKS}
            isOpen={moreOpen}
            onToggle={() => setMoreOpen((o) => !o)}
            dropRef={moreRef}
          />

          {/* Saved Colors link with badge */}
          <Link
            href="/saved"
            style={{
              ...linkStyle,
              display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              textDecoration: 'none',
            }}
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
                borderRadius: '9999px', padding: '0.1rem 0.3rem', minWidth: '0.9rem', textAlign: 'center',
                lineHeight: 1
              }}>
                {favCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} color="#374151" /> : <Menu size={22} color="#374151" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div style={{
          position: 'absolute', top: '4rem', left: 0, right: 0,
          background: '#ffffff', borderBottom: '1.5px solid #f3f4f6',
          maxHeight: 'calc(100vh - 4rem)', overflowY: 'auto', zIndex: 40,
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
          padding: '1.25rem 1rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem',
        }} className="mobile-nav-panel">
          
          {/* Quick Links Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.5rem' }}>
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: '0.4rem', padding: '0.65rem', borderRadius: '0.6rem', border: '1px solid #f3f4f6',
                textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700, color: '#4b5563', background: '#f9fafb',
              }}
            >
              <Home size={18} color="#4b5563" />
              <span>Home</span>
            </Link>
          </div>

          {/* Mobile Sections */}
          {MOBILE_SECTIONS.map((section, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', borderBottom: '1px solid #f3f4f6', paddingBottom: '0.4rem' }}>
                <section.icon size={15} color={section.color} />
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#5c6370', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {section.title}
                </span>
              </div>
              
              {/* Links Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'block', padding: '0.6rem 0.75rem', borderRadius: '0.5rem',
                      background: '#f9fafb', border: '1px solid #f3f4f6', textDecoration: 'none',
                      fontSize: '0.78rem', fontWeight: 600, color: '#374151',
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav    { display: none !important; }
          .mobile-nav-container { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
