import Head from 'next/head';
import Link from 'next/link';
import { useState, useRef, useEffect, useMemo } from 'react';
import { Droplets } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CopyButton from '../components/CopyButton';
import pantoneDb from '../data/pantone.json';
import { isLightColor } from '../lib/colorUtils';
import CrossSystemLinks from '../components/CrossSystemLinks';
import Breadcrumb, { buildTrail, breadcrumbSchema } from '../components/Breadcrumb';
import FAQSection from '../components/FAQSection';
import ogMeta from '../components/ogMeta';
import { pathFrom } from '../lib/ogCards.mjs';

// ─── Popular colors ───────────────────────────────────────────────
const POPULAR_NAMES = [
  'Pantone 186-C', 'Pantone 285-C', 'Pantone 368-C', 'Pantone 109-C',
  'Pantone 485-C', 'Pantone 266-C', 'Pantone Process Black-C', 'Pantone Cool Gray 9-C',
  'Pantone 877-C Metallic', 'Pantone 032-C', 'Pantone 355-C', 'Pantone Reflex Blue-C',
];

const POPULAR_ENTRIES = POPULAR_NAMES.map(n => {
  const key = n.toLowerCase();
  return pantoneDb.find(e => e.name.toLowerCase() === key)
      || pantoneDb.find(e => e.name.toLowerCase().includes(key.replace('pantone ', '')));
}).filter(Boolean);

// ─── Autocomplete search ──────────────────────────────────────────
function PantoneSearchInput({ value, onChange, onSelect }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  const suggestions = useMemo(() => {
    if (!value.trim()) return [];
    const q = value.toLowerCase();
    return pantoneDb.filter(e => e.name.toLowerCase().includes(q)).slice(0, 10);
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
        onChange={e => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        className="input-field"
        placeholder="e.g. 186-C, Cool Gray, Reflex Blue…"
        style={{ fontSize: '1rem', padding: '0.875rem 1.25rem' }}
        autoComplete="off"
      />
      {open && suggestions.length > 0 && (
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
function ResultPanel({ selected }) {
  if (!selected) return null;
  const isLight  = isLightColor(selected.hex);
  const textCol  = isLight ? '#1f2937' : '#ffffff';
  const subCol   = isLight ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)';
  const { c, m, y, k } = selected.cmyk;
  const { r, g, b }     = selected.rgb;

  const outputs = {
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
  };

  const primary = outputs.rgb;
  const others  = [outputs.cmyk, outputs.hex];

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-6 mt-2">
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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

        {others.map((out) => (
          <div key={out.label} style={{ border: '1px solid #f3f4f6', borderRadius: '1rem', padding: '1rem', background: '#fff' }}>
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

// ─── Main Page ────────────────────────────────────────────────────
export default function PantoneToRgb() {
  const [query, setQuery]       = useState('');
  const [selected, setSelected] = useState(null);

  const pageTitle = "Pantone to RGB Converter — Free PMS Color Tool";
  const metaDescription = "Get the RGB values for any Pantone PMS color instantly. Free, no login, 3200+ Pantone colors. Perfect for UI design, app development, and digital brand guidelines.";
  const canonical = "https://pantoneconverter.com/pantone-to-rgb/";
  const trail = buildTrail(canonical, 'Pantone to RGB');

  const faqs = [
    { question: 'Is this Pantone to RGB converter free to use?', answer: 'Yes, this Pantone to RGB converter is completely free to use. There are no limits, no login required, and all conversions happen securely and instantly in your web browser.' },
    { question: 'Are the RGB values on this page official Pantone data?', answer: 'We use the official Pantone-published RGB approximations for each PMS color. Because physical inks and screen pixels use entirely different color models, these values represent Pantone\'s intended digital equivalent rather than a perfectly mathematical conversion.' },
    { question: 'Why do two monitors show the same Pantone RGB value differently?', answer: 'Monitors vary wildly in color gamut, brightness, and factory calibration. Unless both displays are hardware-calibrated to the same profile (like sRGB or Display P3), the same RGB values will inherently produce slightly different visual results.' },
    { question: 'What is the difference between PMS, TCX, and TPX Pantone libraries?', answer: 'PMS (Pantone Matching System) is for graphic design and commercial printing on paper. TCX (cotton) and TPX/TPG (paper) belong to the Fashion, Home + Interiors library used for textiles and product design. They have distinct colors and separate RGB values.' },
    { question: 'Can I use Pantone RGB values directly in CSS and Figma?', answer: 'Yes, the RGB values provided here can be copied straight into CSS styles, Figma fills, Sketch, or any other digital design tool to represent a brand\'s Pantone specification on screen.' },
    { question: 'How do I convert Pantone to RGB for a mobile app?', answer: 'Simply search for the required Pantone color name above. The converter will output the 0-255 RGB values, which you can use directly in iOS Swift (UIColor) or Android (Color) definitions.' },
    { question: 'Does coated vs uncoated Pantone have different RGB values?', answer: 'Yes. The same Pantone number (like 186 C vs 186 U) often has different RGB approximations. Coated colors are typically more vibrant, while uncoated equivalents are softer, reflecting how the ink behaves on different paper stocks.' },
    { question: 'Why doesn\'t my printed swatch match the RGB on screen?', answer: 'Screens emit light (additive color), while printed swatches reflect light (subtractive color). Some highly saturated Pantone inks simply fall outside the standard sRGB gamut, making them physically impossible to reproduce accurately on a typical monitor.' },
    { question: 'How many Pantone colors have published RGB equivalents?', answer: 'Our database includes over 3,200 standard graphic arts Pantone colors from the coated and uncoated libraries, all with their corresponding RGB values.' },
    { question: 'How do I verify a Pantone-to-RGB conversion against a swatch book?', answer: 'Display the RGB color on a calibrated, color-accurate monitor in a neutrally lit room, and hold the physical Pantone swatch book next to the screen. Adjust screen brightness until the luminosity matches for the most accurate visual comparison.' }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Pantone to RGB Converter",
        "url": canonical,
        "applicationCategory": "DesignApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript",
        "description": metaDescription,
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "featureList": ["Instant RGB values", "3200+ Pantone colors", "Client-side processing"]
      },
      breadcrumbSchema(trail),
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
          "@type": "Question",
          "name": f.question,
          "acceptedAnswer": { "@type": "Answer", "text": f.answer }
        }))
      },
      {
        "@type": "TechArticle",
        "headline": "Pantone to RGB Converter — Free PMS Color Tool",
        "datePublished": "2026-05-20",
        "dateModified": "2026-09-01",
        "author": {
          "@type": "Organization",
          "name": "PantoneConverter.com Editorial Team",
          "url": "https://pantoneconverter.com/about/"
        },
        "image": "https://pantoneconverter.com/og/pantone-to-rgb.png",
        "description": metaDescription
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        {ogMeta({ path: pathFrom(canonical) })}
      </Head>

      <NavBar />

      <main style={{ minHeight: '100vh', background: '#fafafa' }}>
        <header style={{ background: 'linear-gradient(135deg,#fdf4ff 0%,#eff6ff 100%)', borderBottom: '1px solid #f3f4f6', padding: '2.5rem 1.5rem 2rem' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
            <Breadcrumb trail={trail} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Droplets size={20} color="#4f46e5" />
              </div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#111827', margin: 0 }}>Pantone to RGB Converter</h1>
            </div>
            <p style={{ color: '#4b5563', fontSize: '1rem', margin: 0 }}>
              Search any Pantone color by name to get its RGB equivalent. Over 3,200 PMS colors — instantly.
            </p>
          </div>
        </header>

        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '2rem 1.5rem 4rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className="card">
            <label htmlFor="pantone-search" className="input-label" style={{ marginBottom: '0.75rem', display: 'block' }}>
              Search Pantone Color by Name
            </label>
            <PantoneSearchInput value={query} onChange={setQuery} onSelect={setSelected} />
            <p style={{ fontSize: '0.78rem', color: '#6b7280', margin: '0.6rem 0 0' }}>
              Try: “186 C”, “Cool Gray 9”, “Reflex Blue”, “Process Black”
            </p>
          </div>

          {selected && (
            <section aria-labelledby="rgb-values-heading">
              <h2 id="rgb-values-heading" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>
                RGB Values for <span className="gradient-text">{selected.name}</span>
              </h2>
              <ResultPanel selected={selected} />
            </section>
          )}

          {!selected && !query.trim() && (
            <section aria-label="Popular colors">
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.875rem' }}>
                Popular Colors — click to look up
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(7.5rem, 1fr))', gap: '0.75rem' }}>
                {POPULAR_ENTRIES.map(entry => {
                  const light = isLightColor(entry.hex);
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
                      {/* Background/padding and the label typography live on a
                          single element — they were two nested divs before. */}
                      <div style={{
                        background: '#fff', padding: '0.375rem 0.5rem',
                        fontSize: '0.62rem', fontWeight: 700, color: '#374151', lineHeight: 1.3,
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {entry.name.replace('Pantone ', '')}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          <aside aria-label="How we look up these values" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '0.75rem 1rem', fontSize: '0.85rem', color: '#475569', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span><strong>How we look up these values:</strong> This database contains the official Pantone-published RGB approximations for each PMS color. These are not calculated algorithmic conversions.</span>
            <span style={{ whiteSpace: 'nowrap', marginLeft: '1rem', fontSize: '0.75rem' }}>Last updated: September 2026 · Reviewed by PantoneConverter.com</span>
          </aside>

          <aside className="card" aria-label="Quick takeaway" style={{ background: '#f0f9ff', borderLeft: '4px solid #0ea5e9', padding: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0369a1', marginTop: 0, marginBottom: '0.5rem' }}>Bringing the Brand to the Screen</h3>
            <p style={{ fontSize: '0.95rem', color: '#0c4a6e', margin: 0, lineHeight: 1.6 }}>
              Whether you are updating a website, styling an app, or rendering video motion graphics, delivering a consistent brand experience requires translating physical Pantone specs into digital RGB codes. This tool guarantees you capture the intended brand color across digital channels.
            </p>
          </aside>

          <nav aria-label="Table of contents" className="card" style={{ padding: '1.5rem', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '1rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', marginBottom: '1rem', marginTop: 0 }}>Table of Contents</h2>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><a href="#what-is-conversion" style={{ color: '#4f46e5', textDecoration: 'none', fontSize: '0.95rem' }}>What Is Pantone to RGB Conversion, and Why Digital Teams Need It</a></li>
              <li><a href="#how-it-works" style={{ color: '#4f46e5', textDecoration: 'none', fontSize: '0.95rem' }}>How This Pantone to RGB Converter Works</a></li>
              <li><a href="#step-by-step" style={{ color: '#4f46e5', textDecoration: 'none', fontSize: '0.95rem' }}>Step-by-Step: How to Use This Tool</a></li>
              <li><a href="#coated-vs-uncoated" style={{ color: '#4f46e5', textDecoration: 'none', fontSize: '0.95rem' }}>Coated (C) vs Uncoated (U): Which Library Has the Right RGB Value?</a></li>
              <li><a href="#common-mistakes" style={{ color: '#4f46e5', textDecoration: 'none', fontSize: '0.95rem' }}>Common Mistakes When Converting Pantone to RGB for Screens</a></li>
              <li><a href="#digital-systems" style={{ color: '#4f46e5', textDecoration: 'none', fontSize: '0.95rem' }}>Pantone to RGB for Digital and Brand Systems</a></li>
              <li><a href="#color-systems-differ" style={{ color: '#4f46e5', textDecoration: 'none', fontSize: '0.95rem' }}>RGB vs Pantone vs CMYK vs HEX: How the Color Systems Differ</a></li>
              <li><a href="#accuracy-limitations" style={{ color: '#4f46e5', textDecoration: 'none', fontSize: '0.95rem' }}>Accuracy and Limitations</a></li>
              <li><a href="#faqs" style={{ color: '#4f46e5', textDecoration: 'none', fontSize: '0.95rem' }}>Frequently Asked Questions</a></li>
            </ul>
          </nav>

          <section id="what-is-conversion" className="card" style={{ borderTop: '3px solid #4f46e5' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', marginBottom: '1rem', marginTop: 0 }}>What Is Pantone to RGB Conversion, and Why Digital Teams Need It</h2>
            <p style={{ fontSize: '0.95rem', color: '#374151', lineHeight: 1.7, margin: '0 0 1rem' }}>
              The <strong>Pantone Matching System (PMS)</strong> is a standardized color reproduction system heavily rooted in physical inks. Conversely, <strong>RGB (Red, Green, Blue)</strong> is an additive color model used to define how screens, displays, and monitors mix light to produce color. 
            </p>
            <p style={{ fontSize: '0.95rem', color: '#374151', lineHeight: 1.7, margin: '0 0 1rem' }}>
              Because Pantone inks are physically formulated — each containing a unique recipe of base pigments rather than a mathematical combination — the RGB approximation represents Pantone&apos;s best attempt to mimic that physical ink on a backlit screen. To support this, over 3,200 PMS colors have published digital equivalents in this database.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#374151', lineHeight: 1.7, margin: '0 0 1rem' }}>
              Often, a company’s foundational brand guideline revolves around a specific Pantone ink formulation. When digital teams build UI design systems, launch mobile applications, or create corporate presentations, they must translate that physical standard into the language of screens. A reliable <strong>pantone to rgb converter</strong> provides the exact <strong>pantone to rgb values</strong> needed so software developers and UI designers can map the brand identity perfectly into digital environments. Motion graphics and video editors using tools like After Effects or DaVinci Resolve also rely heavily on Pantone RGB values to ensure brand overlays and lower-thirds match corporate guidelines perfectly.
            </p>
          </section>

          <section id="how-it-works" className="card" style={{ borderTop: '3px solid #4f46e5' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', marginBottom: '1rem', marginTop: 0 }}>How This Pantone to RGB Converter Works</h2>
            <p style={{ fontSize: '0.95rem', color: '#374151', lineHeight: 1.7, margin: '0 0 1rem' }}>
              Physical Pantone inks are manufactured color formulations, not simple mathematical mixtures. Because of this, converting them isn’t achieved via a mathematical algorithm, but rather a direct database lookup. Our tool instantly references Pantone-published RGB approximations for over 3,200 unique shades.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#374151', lineHeight: 1.7, margin: '0 0 1rem' }}>
              This fundamentally distinguishes it from algorithmic converters. Tools that convert RGB to Pantone use ΔE (Delta E) distance calculations to search for the mathematically nearest visual match. However, converting from Pantone to RGB operates purely via a direct lookup — the values are pre-assigned by Pantone themselves. This makes the conversion fully deterministic: one PMS code always maps to one specific RGB triplet within its designated library.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#374151', lineHeight: 1.7, margin: '0 0 1rem' }}>
              We support both coated and uncoated libraries to ensure you have comprehensive coverage. If you need a more advanced analytical color space, you can also cross-reference via our <Link href="/pantone-to-lab/" style={{ color: '#4f46e5', fontWeight: 600 }}>Pantone to LAB</Link> or <Link href="/pantone-to-hsv/" style={{ color: '#4f46e5', fontWeight: 600 }}>Pantone to HSV</Link> converters.
            </p>
          </section>

          <section id="step-by-step" className="card" style={{ borderTop: '3px solid #4f46e5' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', marginBottom: '1rem', marginTop: 0 }}>Step-by-Step: How to Use This Tool</h2>
            <ol style={{ fontSize: '0.95rem', color: '#374151', lineHeight: 1.7, margin: '0 0 1rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><strong>Type the name</strong> into the search autocomplete field (e.g. “186 C” or “Reflex Blue”).</li>
              <li><strong>Select</strong> your desired PMS color from the suggested dropdown list.</li>
              <li><strong>Review</strong> the highlighted primary RGB output to see the Red, Green, and Blue 0-255 values.</li>
              <li><strong>Click the copy button</strong> to save the RGB, HEX, or CMYK details straight to your clipboard.</li>
              <li>Alternatively, explore our popular colors shortcuts below the search bar for immediate access.</li>
            </ol>
          </section>

          <section id="coated-vs-uncoated" className="card" style={{ borderTop: '3px solid #4f46e5' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', marginBottom: '1rem', marginTop: 0 }}>Coated (C) vs Uncoated (U): Which Library Has the Right RGB Value?</h2>
            <p style={{ fontSize: '0.95rem', color: '#374151', lineHeight: 1.7, margin: '0 0 1rem' }}>
              A single PMS number can yield a radically different aesthetic depending on the substrate. Coated (C) colors are vibrant and saturated, while Uncoated (U) shades appear softer due to paper absorption. Consequently, they each boast unique <strong>official pantone rgb values</strong>.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#374151', lineHeight: 1.7, margin: '0 0 1rem' }}>
              For example, Pantone 2728 C renders as <code style={{ fontFamily: 'monospace' }}>rgb(0, 81, 186)</code> — a deep, vivid blue. Its uncoated counterpart, 2728 U, maps to <code style={{ fontFamily: 'monospace' }}>rgb(0, 95, 175)</code> — a slightly lighter, warmer blue. Design systems should rigorously document which variant they reference, as using the wrong one can cause subtle but noticeable brand inconsistencies across digital platforms.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#374151', lineHeight: 1.7, margin: '0 0 1rem' }}>
              Digital brand guidelines almost universally reference the Coated library because its high-saturation attributes most closely align with modern, brightly lit computer displays.
            </p>
          </section>

          <section id="common-mistakes" className="card" style={{ borderTop: '3px solid #4f46e5' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', marginBottom: '1rem', marginTop: 0 }}>Common Mistakes When Converting Pantone to RGB for Screens</h2>
            <p style={{ fontSize: '0.95rem', color: '#374151', lineHeight: 1.7, margin: '0 0 1rem' }}>
              Acquiring a reliable <strong>pantone color rgb equivalent</strong> requires avoiding typical pitfalls:
            </p>
            <ul style={{ fontSize: '0.95rem', color: '#374151', lineHeight: 1.7, margin: '0 0 1rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Assuming exact reproduction:</strong> RGB is a constrained gamut; some fluorescent inks simply cannot be rendered on a standard monitor.</li>
              <li><strong>Ignoring monitor calibration:</strong> The RGB code may be accurate, but uncalibrated displays will skew its visual output.</li>
              <li><strong>Using the wrong library:</strong> Mistaking the graphic design PMS catalog for fashion-focused <Link href="/tcx-vs-tpx-vs-tpg/" style={{ color: '#4f46e5', fontWeight: 600 }}>TCX or TPG collections</Link>.</li>
              <li><strong>Confusing sRGB with wide-gamut formats:</strong> Some modern UI contexts rely on Display P3 which handles colors differently.</li>
              <li><strong>Skipping device testing:</strong> Always evaluate the RGB values across varied mobile, tablet, and desktop screens.</li>
            </ul>
          </section>

          <section id="digital-systems" className="card" style={{ borderTop: '3px solid #4f46e5' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', marginBottom: '1rem', marginTop: 0 }}>Pantone to RGB for Digital and Brand Systems</h2>
            <p style={{ fontSize: '0.95rem', color: '#374151', lineHeight: 1.7, margin: '0 0 1rem' }}>
              Digital agencies and in-house teams consistently utilize <strong>pantone to rgb for ui design</strong> to power robust corporate deliverables. Integrating a <strong>pms to rgb chart</strong> workflow enables smooth transitions from physical branding handoffs into digital execution spaces.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#374151', lineHeight: 1.7, margin: '0 0 1rem' }}>
              Once you have the RGB output, integrating it is straightforward. In CSS, you would define it as <code style={{ fontFamily: 'monospace' }}>color: rgb(0, 81, 186);</code>. If you are developing a mobile application, iOS Swift utilizes <code style={{ fontFamily: 'monospace' }}>UIColor(red: 0/255, green: 81/255, blue: 186/255, alpha: 1.0)</code>. Furthermore, contemporary design tools like Figma allow you to map these exact RGB values into design tokens, storing them as semantic color variables like <code style={{ fontFamily: 'monospace' }}>--brand-primary</code> for frictionless reuse.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#374151', lineHeight: 1.7, margin: '0 0 1rem' }}>
              Practical scenarios include adding verified brand colors into Figma and Sketch systems, defining them precisely within app stylesheets, generating matching video title overlays, and constructing universal PowerPoint presentation templates. If your requirements span other disciplines, refer to our <Link href="/pantone-to-hex/" style={{ color: '#4f46e5', fontWeight: 600 }}>Pantone to HEX</Link>, <Link href="/pantone-to-cmyk/" style={{ color: '#4f46e5', fontWeight: 600 }}>Pantone to CMYK</Link>, or reverse <Link href="/rgb-to-pantone/" style={{ color: '#4f46e5', fontWeight: 600 }}>RGB to Pantone</Link> tools.
            </p>
          </section>

          <section id="color-systems-differ" className="card" style={{ borderTop: '3px solid #4f46e5', overflowX: 'auto' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', marginBottom: '1rem', marginTop: 0 }}>RGB vs Pantone vs CMYK vs HEX: How the Color Systems Differ</h2>
            <p style={{ fontSize: '0.95rem', color: '#374151', lineHeight: 1.7, margin: '0 0 1rem' }}>
              When a brand guideline arrives as a Pantone spec and your deliverable is a screen, you need to know which model your software actually uses.
            </p>
            <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <caption style={{ textAlign: 'left', padding: '0.5rem 0', fontWeight: 600, color: '#6b7280' }}>Color Model Comparison Guide for Digital Teams</caption>
              <thead>
                <tr style={{ background: '#f3f4f6', color: '#374151' }}>
                  <th scope="col" style={{ padding: '0.75rem', borderBottom: '2px solid #e5e7eb' }}>Color Model</th>
                  <th scope="col" style={{ padding: '0.75rem', borderBottom: '2px solid #e5e7eb' }}>Type</th>
                  <th scope="col" style={{ padding: '0.75rem', borderBottom: '2px solid #e5e7eb' }}>Device-Dependent?</th>
                  <th scope="col" style={{ padding: '0.75rem', borderBottom: '2px solid #e5e7eb' }}>Standardized?</th>
                  <th scope="col" style={{ padding: '0.75rem', borderBottom: '2px solid #e5e7eb' }}>Best Used For</th>
                  <th scope="col" style={{ padding: '0.75rem', borderBottom: '2px solid #e5e7eb' }}>Example Value</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>RGB</td>
                  <td style={{ padding: '0.75rem' }}>Additive Light</td>
                  <td style={{ padding: '0.75rem' }}>Yes</td>
                  <td style={{ padding: '0.75rem' }}>Varies (sRGB standard)</td>
                  <td style={{ padding: '0.75rem' }}>UI components, CSS, mobile app themes, video overlays</td>
                  <td style={{ padding: '0.75rem', fontFamily: 'monospace' }}>rgb(0, 81, 186)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>Pantone PMS</td>
                  <td style={{ padding: '0.75rem' }}>Spot Ink</td>
                  <td style={{ padding: '0.75rem' }}>No</td>
                  <td style={{ padding: '0.75rem' }}>Yes (Proprietary)</td>
                  <td style={{ padding: '0.75rem' }}>Physical packaging, brand guidelines, commercial print</td>
                  <td style={{ padding: '0.75rem', fontFamily: 'monospace' }}>2728 C</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>CMYK</td>
                  <td style={{ padding: '0.75rem' }}>Subtractive Ink</td>
                  <td style={{ padding: '0.75rem' }}>Yes</td>
                  <td style={{ padding: '0.75rem' }}>Varies by profile</td>
                  <td style={{ padding: '0.75rem' }}>Brochures, magazines, standard home printing</td>
                  <td style={{ padding: '0.75rem', fontFamily: 'monospace' }}>100, 75, 0, 0</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>HEX</td>
                  <td style={{ padding: '0.75rem' }}>Hexadecimal RGB</td>
                  <td style={{ padding: '0.75rem' }}>Yes</td>
                  <td style={{ padding: '0.75rem' }}>Tied to RGB</td>
                  <td style={{ padding: '0.75rem' }}>Web stylesheets, Figma/Sketch fills, email templates</td>
                  <td style={{ padding: '0.75rem', fontFamily: 'monospace' }}>#0051BA</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>HSL</td>
                  <td style={{ padding: '0.75rem' }}>Cylindrical RGB</td>
                  <td style={{ padding: '0.75rem' }}>Yes</td>
                  <td style={{ padding: '0.75rem' }}>Tied to RGB</td>
                  <td style={{ padding: '0.75rem' }}>Programmatic color shifts, CSS variables, state highlights</td>
                  <td style={{ padding: '0.75rem', fontFamily: 'monospace' }}>214°, 100%, 36%</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem', fontWeight: 600 }}>LAB</td>
                  <td style={{ padding: '0.75rem' }}>Perceptual</td>
                  <td style={{ padding: '0.75rem' }}>No</td>
                  <td style={{ padding: '0.75rem' }}>Yes (CIE standard)</td>
                  <td style={{ padding: '0.75rem' }}>Color science algorithms, precise conversion calculation</td>
                  <td style={{ padding: '0.75rem', fontFamily: 'monospace' }}>36, 21, -61</td>
                </tr>
              </tbody>
            </table>
            <p style={{ fontSize: '0.95rem', color: '#374151', lineHeight: 1.7, margin: '1rem 0 0' }}>
              Ultimately, HEX codes act purely as shorthand for the exact same underlying RGB triplet. Understanding these models allows you to cross-reference effectively between our <Link href="/hex-to-pantone/" style={{ color: '#4f46e5', fontWeight: 600 }}>HEX to Pantone</Link> and <Link href="/cmyk-to-pantone/" style={{ color: '#4f46e5', fontWeight: 600 }}>CMYK to Pantone</Link> tools.
            </p>
          </section>

          <section id="accuracy-limitations" className="card" style={{ borderTop: '3px solid #4f46e5' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', marginBottom: '1rem', marginTop: 0 }}>Accuracy and Limitations</h2>
            <p style={{ fontSize: '0.95rem', color: '#374151', lineHeight: 1.7, margin: '0 0 1rem' }}>
              Monitors project varying color gamuts, such as traditional sRGB versus modern Display P3 and wide-gamut formats. Screen calibration drastically affects rendering, meaning an RGB value on a laptop might not match a nearby mobile device. Consequently, RGB is merely an approximation of the ink — no screen perfectly reproduces a physical spot ink.
            </p>

            <div style={{ margin: '1.5rem 0', padding: '1.25rem', background: '#fdf4ff', borderRadius: '0.75rem', border: '1.5px solid #e9a8fd' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#7e22ce', margin: '0 0 0.75rem' }}>Quick Reference: Key Accuracy Facts</h3>
              <ul style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.6, margin: 0, paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <li><strong>1. They are official, not calculated:</strong> RGB values are Pantone&apos;s official approximations, not calculated mathematical conversions from LAB or CMYK.</li>
                <li><strong>2. Display differences matter:</strong> Always verify on a hardware-calibrated monitor — factory settings differ by up to 30% between manufacturers.</li>
                <li><strong>3. Physical comparison is king:</strong> For mission-critical brand work, physically hold a Pantone swatch book next to the calibrated screen under standardized D50 lighting.</li>
              </ul>
            </div>
            
            <figure style={{ margin: '1.5rem 0', padding: '1.5rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
              {/* Kept as an <h3> on purpose: demoting it to <figcaption> would
                  drop a heading from the page outline that the SEO pass added. */}
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', marginBottom: '1rem', marginTop: 0 }}>Approximate Visible Spectrum Coverage</h3>
              <svg width="100%" height="120" viewBox="0 0 400 120" role="img" aria-label="Horizontal bar chart showing color gamut coverage: sRGB 35%, Pantone Coated 50%, CMYK Print 30%">
                <rect x="0" y="10" width="140" height="20" fill="#3b82f6" rx="4" />
                <text x="150" y="25" fontSize="12" fill="#475569" fontWeight="600">sRGB Gamut (~35%)</text>
                
                <rect x="0" y="50" width="200" height="20" fill="#8b5cf6" rx="4" />
                <text x="210" y="65" fontSize="12" fill="#475569" fontWeight="600">Pantone Coated (~50%)</text>
                
                <rect x="0" y="90" width="120" height="20" fill="#06b6d4" rx="4" />
                <text x="130" y="105" fontSize="12" fill="#475569" fontWeight="600">CMYK Print (~30%)</text>
              </svg>
            </figure>

            <p style={{ fontSize: '0.95rem', color: '#374151', lineHeight: 1.7, margin: '0' }}>
              While digital approximations hold tremendous utility, consulting a physical Pantone swatch book remains the absolute gold standard for mission-critical brand design.
            </p>
          </section>

          <FAQSection id="faqs" suppressSchema items={faqs} />

          <CrossSystemLinks
            id="related-conversions"
            heading="Convert the Same Pantone Colour to Another System"
            intro="HEX, RGB and CMYK cover screen and process print. If the colour is heading for paint, coating, thread or fabric instead, these converters find the nearest code in that system and report the ΔE difference."
            routes={[
              '/pantone-to-ral/', '/pantone-to-ncs/', '/pantone-to-lab/',
              '/pantone-to-hsv/', '/pantone-to-dmc/', '/pantone-c-to-tcx/',
            ]}
            accentColor="#4f46e5"
          />

        </div>
      </main>

      <Footer />
    </>
  );
}
