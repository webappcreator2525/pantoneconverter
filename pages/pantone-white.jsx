import Head from 'next/head';
import ogMeta from '../components/ogMeta';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const PRIMARY_CODES = [
  { code: 'Pantone White', hex: '#FFFFFF', rgb: '255, 255, 255', cmyk: '0, 0, 0, 0', use: 'Pure optical white used as a baseline standard for screen and print' },
  { code: 'Pantone 11-0601 TCX (Bright White)', hex: '#F4F5F0', rgb: '244, 245, 240', cmyk: '0, 0, 2, 4', use: 'Standard bright white used in textiles and interior design' },
  { code: 'Pantone 11-4001 TCX (Brilliant White)', hex: '#EDF1FE', rgb: '237, 241, 254', cmyk: '7, 5, 0, 0', use: 'Cool crisp white with blue undertones, used in tech and apparel' },
  { code: 'Pantone 11-0103 TCX (Egret)', hex: '#F3EFE0', rgb: '243, 239, 224', cmyk: '0, 2, 8, 5', use: 'Warm creamy white used in wedding stationery and luxury branding' },
  { code: 'Pantone 11-4800 TCX (Blanc de Blanc)', hex: '#E2E6E0', rgb: '226, 230, 224', cmyk: '2, 0, 3, 10', use: 'Soft natural white with faint green undertones used in organic branding' },
  { code: 'Pantone Trans. White C', hex: '#F0F0F0', rgb: '240, 240, 240', cmyk: '0, 0, 0, 6', use: 'Transparent white mixing ink used in the standard Pantone formula guide' },
];

const TABLE_DATA = [
  { code: 'Pantone White', finish: 'Coated', hex: '#FFFFFF', rgb: '255, 255, 255', cmyk: '0, 0, 0, 0', hsl: '0°, 0%, 100%', hsb: '0°, 0%, 100%' },
  { code: 'Pantone 11-0601 TCX', finish: 'Textile', hex: '#F4F5F0', rgb: '244, 245, 240', cmyk: '0, 0, 2, 4', hsl: '72°, 20%, 95%', hsb: '72°, 2%, 96%' },
  { code: 'Pantone 11-4001 TCX', finish: 'Textile', hex: '#EDF1FE', rgb: '237, 241, 254', cmyk: '7, 5, 0, 0', hsl: '226°, 90%, 96%', hsb: '226°, 7%, 100%' },
  { code: 'Pantone 11-0103 TCX', finish: 'Textile', hex: '#F3EFE0', rgb: '243, 239, 224', cmyk: '0, 2, 8, 5', hsl: '47°, 42%, 92%', hsb: '47°, 8%, 95%' },
  { code: 'Pantone 11-4800 TCX', finish: 'Textile', hex: '#E2E6E0', rgb: '226, 230, 224', cmyk: '2, 0, 3, 10', hsl: '100°, 12%, 89%', hsb: '100°, 3%, 90%' },
  { code: 'Pantone Trans. White C', finish: 'Coated', hex: '#F0F0F0', rgb: '240, 240, 240', cmyk: '0, 0, 0, 6', hsl: '0°, 0%, 94%', hsb: '0°, 0%, 94%' },
  { code: 'Pantone 11-0602 TCX (Snow White)', finish: 'Textile', hex: '#F2F0EB', rgb: '242, 240, 235', cmyk: '0, 1, 3, 5', hsl: '43°, 22%, 94%', hsb: '43°, 3%, 95%' },
  { code: 'Pantone 11-0106 TCX (Sweet Corn)', finish: 'Textile', hex: '#F0E8CD', rgb: '240, 232, 205', cmyk: '0, 3, 15, 6', hsl: '46°, 50%, 87%', hsb: '46°, 15%, 94%' },
];

const SHADES = [
  { code: 'Pantone White', hex: '#FFFFFF', label: 'Pure White' },
  { code: 'Pantone 11-0601 TCX', hex: '#F4F5F0', label: 'Bright White' },
  { code: 'Pantone 11-4001 TCX', hex: '#EDF1FE', label: 'Brilliant White' },
  { code: 'Pantone 11-0602 TCX', hex: '#F2F0EB', label: 'Snow White' },
  { code: 'Pantone 11-0103 TCX', hex: '#F3EFE0', label: 'Egret' },
  { code: 'Pantone 11-4800 TCX', hex: '#E2E6E0', label: 'Blanc de Blanc' },
  { code: 'Pantone 11-0106 TCX', hex: '#F0E8CD', label: 'Sweet Corn' },
  { code: 'Pantone 11-0606 TCX', hex: '#E1DACC', label: 'Pristine' },
  { code: 'Pantone 13-0905 TCX', hex: '#D8D0C1', label: 'Birch' },
  { code: 'Pantone Cool Gray 1 C', hex: '#D9D9D6', label: 'Grayish White' },
];

const FAQS = [
  {
    q: 'Does Pantone have a white code?',
    a: 'Yes, but the approach differs by industry. In graphic design (PMS), "Pantone White" often just refers to leaving the paper unprinted, though "Transparent White" is used as a mixing base. In fashion and home (TCX/TPG), there are dozens of distinct whites, such as Bright White (11-0601) and Brilliant White (11-4001).',
  },
  {
    q: 'What is the true Pantone code for pure white?',
    a: 'Pure optical white in digital design is HEX #FFFFFF. In the Pantone Fashion, Home + Interiors (FHI) system, 11-0601 Bright White is considered the closest standard to a pure, stark white.',
  },
  {
    q: 'Why are there so many different Pantone whites?',
    a: 'White is rarely pure; it usually carries an undertone. Cool whites have blue or gray undertones and feel crisp and modern. Warm whites have yellow or red undertones (like ivory or cream) and feel soft and traditional. The FHI system categorizes these nuanced differences for textiles and interiors.',
  },
  {
    q: 'How do you print white Pantone ink?',
    a: 'Printing white ink requires opaque white foil or specialized opaque white ink (often used in screen printing or flexography) on colored or dark substrates. Standard CMYK printers cannot print white; they rely on the white of the paper.',
  },
  {
    q: 'What is the Pantone hex code for cream?',
    a: 'For a warm cream or ivory white, Pantone 11-0103 TCX (Egret) at HEX #F3EFE0 or Pantone 11-0106 TCX (Sweet Corn) at HEX #F0E8CD are excellent matches.',
  },
  {
    q: 'What is Pantone Transparent White?',
    a: 'Pantone Transparent White is a base mixing ink used in the creation of lighter Pantone pastel colors. It reduces the intensity of other base inks without drastically altering their hue.',
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pantoneconverter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Pantone White Colors", "item": "https://pantoneconverter.com/pantone-white/" },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQS.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a },
  })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Pantone White Color Codes, Shades & Conversions",
  "description": "Explore Pantone white codes: Bright White, Brilliant White, ivory, and cream. Full HEX, RGB, CMYK values, psychology, and free color matching tools.",
  "url": "https://pantoneconverter.com/pantone-white/",
  "about": { "@type": "Thing", "name": "Pantone White Colors" },
  "breadcrumb": breadcrumbSchema,
};

function isLight(hex) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substr(0,2),16);
  const g = parseInt(c.substr(2,2),16);
  const b = parseInt(c.substr(4,2),16);
  return (r*299 + g*587 + b*114) / 1000 > 128;
}

export default function PantoneWhitePage() {
  return (
    <>
      <Head>
        <title>Pantone White Color Codes: HEX, RGB, CMYK Values &amp; All Shades</title>
        <meta name="description" content="Explore Pantone white codes: Bright White, Brilliant White, ivory, and cream. Full HEX, RGB, CMYK values, psychology, and free color matching tools." />
        <link rel="canonical" href="https://pantoneconverter.com/pantone-white/" />
        <meta property="og:title" content="Pantone White Color Codes: HEX, RGB, CMYK Values & All Shades" />
        <meta property="og:description" content="Explore Pantone white codes: Bright White, Brilliant White, ivory, and cream. Full HEX, RGB, CMYK values, psychology, and free color matching tools." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        {ogMeta({ path: '/pantone-white/' })}
      </Head>

      <NavBar />

      <main style={{ minHeight: '100vh', background: '#fafafa' }}>

        {/* ── SECTION 1: Hero ─────────────────────────────────────── */}
        <div style={{ background: '#F4F5F0', borderBottom: '1px solid #e5e7eb', padding: '4rem 1.5rem 3rem' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto', textAlign: 'center' }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
              <ol style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', listStyle: 'none', margin: 0, padding: 0, fontSize: '0.8rem', fontWeight: 600, color: '#6b7280' }}>
                <li><Link href="/" style={{ color: '#4b5563', textDecoration: 'none' }}>Home</Link></li>
                <li aria-hidden="true" style={{ color: '#d1d5db' }}>›</li>
                <li style={{ color: '#111827' }}>Pantone White</li>
              </ol>
            </nav>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#111827', margin: '0 0 1rem', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              Pantone White Color Codes,<br />Shades &amp; Conversions
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#4b5563', maxWidth: '44rem', margin: '0 auto 2rem', lineHeight: 1.7 }}>
              Discover the nuances of Pantone white codes, from stark, cool brilliant whites to warm, creamy ivories. Find exact HEX, RGB, and CMYK values, understand white's undertones, and use our free color matching tools.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/hex-to-pantone/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: '#111827', color: '#fff', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                Convert a White Code →
              </Link>
              <Link href="/pantone-finder/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: 'rgba(0,0,0,0.05)', color: '#374151', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', border: '1.5px solid rgba(0,0,0,0.1)' }}>
                Find Pantone Shades →
              </Link>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '3rem 1.5rem 4rem', display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>

          {/* ── SECTION 2: Primary Codes — Card Grid ─────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Primary Pantone White Codes</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.75rem', lineHeight: 1.7 }}>
              The six most important white references, primarily drawn from the Pantone Fashion, Home + Interiors (TCX) system where white nuance is critical.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {PRIMARY_CODES.map((c) => {
                const light = isLight(c.hex);
                return (
                  <div key={c.code} style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <div style={{ background: c.hex, height: '7rem', display: 'flex', alignItems: 'flex-end', padding: '0.75rem 1rem', borderBottom: '1px solid #f3f4f6' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: light ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.9)', letterSpacing: '0.04em' }}>{c.hex}</span>
                    </div>
                    <div style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#111827', marginBottom: '0.5rem' }}>{c.code}</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.8rem', color: '#4b5563', marginBottom: '0.75rem' }}>
                        <div><span style={{ fontWeight: 700, color: '#6b7280' }}>HEX:</span> <code style={{ fontFamily: 'monospace', color: '#374151', background: '#f3f4f6', padding: '0.1rem 0.3rem', borderRadius: '0.25rem' }}>{c.hex}</code></div>
                        <div><span style={{ fontWeight: 700, color: '#6b7280' }}>RGB:</span> {c.rgb}</div>
                        <div><span style={{ fontWeight: 700, color: '#6b7280' }}>CMYK:</span> {c.cmyk}</div>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', borderTop: '1px solid #f3f4f6', paddingTop: '0.65rem', lineHeight: 1.5 }}>{c.use}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── SECTION 3: Full Reference Table ──────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>White Pantone Color Values — Complete Reference</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>Comprehensive color values for 8 Pantone white variants, including detailed HSL and HSB specifications for digital designers to dial in exact off-white tones.</p>
            <div style={{ overflowX: 'auto', borderRadius: '1rem', border: '1.5px solid #e5e7eb', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem', minWidth: '700px' }}>
                <thead>
                  <tr style={{ background: '#f9fafb' }}>
                    {['Pantone Code','Finish','HEX','RGB','CMYK','HSL','HSB'].map(h => (
                      <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 800, color: '#374151', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', borderBottom: '1.5px solid #e5e7eb', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TABLE_DATA.map((row, i) => (
                    <tr key={row.code} style={{ background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                      <td style={{ padding: '0.65rem 1rem', borderBottom: '1px solid #f3f4f6' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ width: '1rem', height: '1rem', borderRadius: '0.25rem', background: row.hex, flexShrink: 0, border: '1px solid rgba(0,0,0,0.1)' }} />
                          <span style={{ fontWeight: 700, color: '#111827', whiteSpace: 'nowrap' }}>{row.code}</span>
                        </div>
                      </td>
                      <td style={{ padding: '0.65rem 1rem', borderBottom: '1px solid #f3f4f6', color: '#6b7280' }}>{row.finish}</td>
                      <td style={{ padding: '0.65rem 1rem', borderBottom: '1px solid #f3f4f6' }}><code style={{ fontFamily: 'monospace', fontWeight: 600, color: '#374151', background: '#f3f4f6', padding: '0.1rem 0.35rem', borderRadius: '0.25rem' }}>{row.hex}</code></td>
                      <td style={{ padding: '0.65rem 1rem', borderBottom: '1px solid #f3f4f6', color: '#4b5563', whiteSpace: 'nowrap' }}>{row.rgb}</td>
                      <td style={{ padding: '0.65rem 1rem', borderBottom: '1px solid #f3f4f6', color: '#4b5563', whiteSpace: 'nowrap' }}>{row.cmyk}</td>
                      <td style={{ padding: '0.65rem 1rem', borderBottom: '1px solid #f3f4f6', color: '#4b5563', whiteSpace: 'nowrap' }}>{row.hsl}</td>
                      <td style={{ padding: '0.65rem 1rem', borderBottom: '1px solid #f3f4f6', color: '#4b5563', whiteSpace: 'nowrap' }}>{row.hsb}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '1rem', lineHeight: 1.7 }}>
              Note: Pure white (#FFFFFF) requires no ink in standard printing — it relies entirely on the paper stock. <Link href="/learn/cmyk-vs-rgb/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>Learn more about CMYK vs RGB.</Link>
            </p>
          </section>

          {/* ── SECTION 4: Converter Widget ───────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Convert a White Pantone Code</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>Use our tools to accurately convert white and off-white Pantone codes to HEX, RGB, or CMYK — or reverse match your custom ivory to a standard.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.875rem' }}>
              {[
                { href: '/hex-to-pantone/', label: 'HEX to Pantone', desc: 'Find the closest white PMS match for any HEX' },
                { href: '/pantone-to-hex/', label: 'Pantone to HEX', desc: 'Get the HEX code for any off-white Pantone' },
                { href: '/pantone-to-rgb/', label: 'Pantone to RGB', desc: 'Convert Pantone white codes to RGB values' },
                { href: '/pantone-to-cmyk/', label: 'Pantone to CMYK', desc: 'Get CMYK breakdown for any white PMS code' },
                { href: '/rgb-to-pantone/', label: 'RGB to Pantone', desc: 'Match your RGB off-white to a Pantone code' },
                { href: '/cmyk-to-pantone/', label: 'CMYK to Pantone', desc: 'Convert CMYK off-white values to the closest PMS' },
              ].map(tool => (
                <Link key={tool.href} href={tool.href} style={{ display: 'block', background: '#fff', border: '1.5px solid #f3f4f6', borderRadius: '1rem', padding: '1.1rem', textDecoration: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#f3f4f6'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'none'; }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111827', marginBottom: '0.3rem' }}>{tool.label}</div>
                  <div style={{ fontSize: '0.78rem', color: '#6b7280', lineHeight: 1.5 }}>{tool.desc}</div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── SECTION 5: Color Psychology ───────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>What Does White Mean? Psychology &amp; Symbolism</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                White is fundamentally the color of light, purity, cleanliness, and minimalism. In design, white space (or negative space) is just as important as the content itself — it provides breathing room, structural hierarchy, and a sense of calm. Culturally, white carries profound and varied meanings: in Western cultures, it represents purity, innocence, and peace (weddings, doves, healthcare); in many Eastern cultures (such as China and India), white is the traditional color of mourning and represents rebirth or the transition to a new phase.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                In branding and product design, the "undertone" of white completely changes its psychological effect. Cool whites (which have blue or gray undertones, like Pantone 11-4001 TCX) feel modern, stark, sterile, and highly technological. They are used extensively in modern tech devices, laboratories, and futuristic design aesthetics.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                Warm whites (which have yellow, red, or brown undertones, like Pantone 11-0103 TCX Egret) feel organic, soft, historic, and approachable. These creamy whites, ivories, and alabasters are heavily utilized in organic food branding, high-end wedding stationery, luxury natural skincare, and traditional interior design, as they feel less harsh on the eyes than pure optical white.
              </p>
            </div>
          </section>

          {/* ── SECTION 6: Famous Brands ──────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Famous Brands That Use White</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                <strong>Apple</strong> is the absolute master of white space in both product design and marketing. Their use of pure, cool white conveys unparalleled technological precision, simplicity, and premium status. By stripping away clutter, Apple uses white to make their products the sole focus of attention.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                <strong>Chanel</strong> uses white as one half of its iconic black-and-white pairing. For Chanel, white represents timeless elegance, simplicity, and Parisian chic. It acts as the perfect, unblemished backdrop that allows their bold black typography and logo to command total authority.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                <strong>Nike</strong> utilizes extensive white space in their advertising to communicate focus, athleticism, and clarity. Their stark white backgrounds isolate the athlete or product, visually representing the "zone" of peak performance without distraction.
              </p>
            </div>
          </section>

          {/* ── SECTION 7: Shades Gallery ─────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>White Pantone Shades — From Cool to Warm</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              The spectrum of off-whites ranges from icy, blue-tinted stark whites to warm, buttery creams and soft ivories.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {SHADES.map(s => {
                return (
                  <div key={s.code} style={{ flexShrink: 0, width: '7.5rem', borderRadius: '0.875rem', overflow: 'hidden', border: '1.5px solid rgba(0,0,0,0.08)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <div style={{ height: '5rem', background: s.hex, borderBottom: '1px solid rgba(0,0,0,0.05)' }} />
                    <div style={{ background: '#fff', padding: '0.5rem' }}>
                      <div style={{ fontSize: '0.62rem', fontWeight: 700, color: '#374151', lineHeight: 1.3 }}>{s.code}</div>
                      <div style={{ fontSize: '0.6rem', color: '#6b7280', fontFamily: 'monospace', marginTop: '0.1rem' }}>{s.hex}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── SECTION 8: Coated vs Uncoated ────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>White Pantone: Screen vs. Print Reality</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                In the graphic design Pantone system (PMS), white is almost entirely handled by the paper stock. A designer does not print "white ink" on white paper; they simply leave that area unprinted. Therefore, the "whiteness" of the final product is entirely dictated by the paper chosen — a coated bright white stock will yield a stark, crisp white, while an uncoated natural stock will yield a softer, warmer white.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                If white must be printed (e.g., on colored paper or clear acrylic), printers must use opaque white ink, foil stamping, or specialized white toner. Pantone provides 'Transparent White' as a base mixing ink for creating pastel colors, but it is not meant to be printed as a standalone opaque white.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                Because white is so dependent on the substrate, industries like fashion and home interiors use the Pantone TCX (cotton) and TPG (paper) systems, which provide hundreds of highly specific, subtly tinted off-whites to ensure precise color matching across fabrics and paints.
              </p>
            </div>
          </section>

          {/* ── SECTION 9: Industries ─────────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>How White Pantone Is Used Across Industries</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Print &amp; Packaging</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>In premium packaging, extensive white space is synonymous with luxury. Brands use heavy, textured white paper stocks with minimalist typography to convey high value, purity, and confidence. In wedding stationery, warm whites (ivory, cream, ecru) are the industry standard.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Fashion &amp; Apparel</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>White is fundamental in fashion. The "perfect white tee" or crisp white button-down are wardrobe staples. The specific shade of white—whether an optic, blue-tinted white for modern athletic wear or a softer, natural white for organic cotton—defines the garment's aesthetic context.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Interior Design</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>Choosing the "right" white paint is notoriously difficult. Interior designers obsess over white undertones: cool whites are used in modern, sunlit galleries or kitchens, while warm whites are used in north-facing rooms or traditional spaces to prevent the environment from feeling sterile or clinical.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Digital &amp; Branding</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>In UI/UX design, white is the dominant background color (outside of dark mode), providing necessary contrast and reducing cognitive load. Tech hardware brands heavily utilize pure, stark whites to communicate cleanliness, innovation, and futuristic design.</p>
              </div>
            </div>
          </section>

          {/* ── SECTION 10: Related Colors ────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Explore Related Pantone Color Families</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
              {[
                { href: '/pantone-black/', label: 'Pantone Black', hex: '#2D2926', desc: 'Deep black and rich darks' },
                { href: '/pantone-gold/', label: 'Pantone Gold', hex: '#FFB81C', desc: 'Premium luxury gold colors' },
                { href: '/pantone-blue/', label: 'Pantone Blue', hex: '#0032A0', desc: 'Cool, precise blue tones' },
              ].map(rel => {
                return (
                  <Link key={rel.href} href={rel.href} style={{ display: 'block', borderRadius: '1rem', overflow: 'hidden', border: '1.5px solid #f3f4f6', textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <div style={{ height: '4rem', background: rel.hex }} />
                    <div style={{ background: '#fff', padding: '0.75rem' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#111827', marginBottom: '0.2rem' }}>{rel.label}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{rel.desc}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* ── SECTION 11: FAQ ───────────────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1.25rem' }}>Frequently Asked Questions About White Pantone</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {FAQS.map((faq, i) => (
                <details key={i} style={{ background: '#fff', borderRadius: '1rem', border: '1.5px solid #f3f4f6', padding: '1.25rem 1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                  <summary style={{ fontWeight: 700, fontSize: '0.95rem', color: '#111827', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {faq.q}
                    <span style={{ color: '#9ca3af', fontSize: '1.2rem', flexShrink: 0, marginLeft: '1rem' }}>+</span>
                  </summary>
                  <p style={{ color: '#4b5563', lineHeight: 1.8, marginTop: '0.875rem', fontSize: '0.9rem', marginBottom: 0 }}>{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}
