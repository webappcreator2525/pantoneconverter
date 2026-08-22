import Head from 'next/head';
import ogMeta from '../components/ogMeta';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CrossSystemLinks from '../components/CrossSystemLinks';

const PRIMARY_CODES = [
  { code: 'Pantone Red C (032 C)', hex: '#EF3340', rgb: '239, 51, 64', cmyk: '0, 89, 64, 0', use: 'Standard bright red, used in national flags and bold branding' },
  { code: 'Pantone 185 C', hex: '#E4002B', rgb: '228, 0, 43', cmyk: '0, 100, 85, 0', use: 'Vibrant cherry red favoured in high-visibility signage' },
  { code: 'Pantone 186 C', hex: '#C8102E', rgb: '200, 16, 46', cmyk: '0, 100, 82, 10', use: 'Official Coca-Cola red used in packaging and advertising' },
  { code: 'Pantone 485 C', hex: '#DA291C', rgb: '218, 41, 28', cmyk: '0, 91, 92, 0', use: 'Fire-engine red used by Netflix and emergency services' },
  { code: 'Pantone 1797 C', hex: '#C63527', rgb: '198, 53, 39', cmyk: '0, 85, 88, 20', use: 'Warm brick red used in premium packaging and cosmetics' },
  { code: 'Pantone 1805 C', hex: '#9B2335', rgb: '155, 35, 53', cmyk: '0, 84, 63, 36', use: 'Deep burgundy-red used in wine labels and luxury goods' },
];

const TABLE_DATA = [
  { code: 'Pantone Red C', finish: 'Coated', hex: '#EF3340', rgb: '239, 51, 64', cmyk: '0, 89, 64, 0', hsl: '355°, 85%, 57%', hsb: '355°, 79%, 94%' },
  { code: 'Pantone 185 C', finish: 'Coated', hex: '#E4002B', rgb: '228, 0, 43', cmyk: '0, 100, 85, 0', hsl: '349°, 100%, 45%', hsb: '349°, 100%, 89%' },
  { code: 'Pantone 186 C', finish: 'Coated', hex: '#C8102E', rgb: '200, 16, 46', cmyk: '0, 100, 82, 10', hsl: '350°, 85%, 42%', hsb: '350°, 92%, 78%' },
  { code: 'Pantone 485 C', finish: 'Coated', hex: '#DA291C', rgb: '218, 41, 28', cmyk: '0, 91, 92, 0', hsl: '4°, 77%, 48%', hsb: '4°, 87%, 85%' },
  { code: 'Pantone 1797 C', finish: 'Coated', hex: '#C63527', rgb: '198, 53, 39', cmyk: '0, 85, 88, 20', hsl: '5°, 67%, 46%', hsb: '5°, 80%, 78%' },
  { code: 'Pantone 1805 C', finish: 'Coated', hex: '#9B2335', rgb: '155, 35, 53', cmyk: '0, 84, 63, 36', hsl: '349°, 63%, 37%', hsb: '349°, 77%, 61%' },
  { code: 'Pantone 185 U', finish: 'Uncoated', hex: '#D50032', rgb: '213, 0, 50', cmyk: '0, 100, 77, 16', hsl: '346°, 100%, 42%', hsb: '346°, 100%, 84%' },
  { code: 'Pantone 032 U', finish: 'Uncoated', hex: '#F4364C', rgb: '244, 54, 76', cmyk: '0, 78, 69, 4', hsl: '353°, 89%, 58%', hsb: '353°, 78%, 96%' },
];

const SHADES = [
  { code: 'Pantone 1775 C', hex: '#FFA3B5', label: 'Lightest' },
  { code: 'Pantone 1787 C', hex: '#F7617B', label: '' },
  { code: 'Pantone Red C', hex: '#EF3340', label: '' },
  { code: 'Pantone 185 C', hex: '#E4002B', label: '' },
  { code: 'Pantone 186 C', hex: '#C8102E', label: '' },
  { code: 'Pantone 485 C', hex: '#DA291C', label: '' },
  { code: 'Pantone 1797 C', hex: '#C63527', label: '' },
  { code: 'Pantone 1805 C', hex: '#9B2335', label: '' },
  { code: 'Pantone 201 C', hex: '#7B2D3E', label: '' },
  { code: 'Pantone 7427 C', hex: '#5C1D28', label: 'Darkest' },
];

const FAQS = [
  {
    q: 'What is the Pantone code for red?',
    a: 'There are several Pantone reds depending on your needs. Pantone Red C (032 C) is the standard bright red widely used on flags and bold graphics. Pantone 186 C is the official Coca-Cola red. Pantone 485 C is a slightly more orange-toned red used by Netflix and emergency services. Pantone 185 C is a vivid cherry red popular in signage.',
  },
  {
    q: 'What is the closest Pantone to #FF0000?',
    a: 'The closest Pantone match to pure digital red #FF0000 is typically Pantone Red C (032 C) with a HEX value of #EF3340. Pure #FF0000 is a highly saturated RGB value that cannot be perfectly reproduced in physical ink. Use our HEX to Pantone converter for the exact nearest match.',
  },
  {
    q: 'What is the difference between Pantone 032 C and Pantone 186 C?',
    a: 'Pantone 032 C (Red C) is a bright, slightly warm red with high luminosity — it reads as a clean, pure red. Pantone 186 C is deeper and slightly cooler, with more magenta in its tone. Pantone 186 C is the official red used in Coca-Cola\'s brand identity. For general "signal red" use, 032 C is more standard; for a richer, brand-specific red, 186 C is widely preferred.',
  },
  {
    q: 'How do I convert a red HEX code to Pantone?',
    a: 'Use our free HEX to Pantone converter at pantoneconverter.com/hex-to-pantone/ — paste your HEX value and the tool instantly finds the nearest Pantone match across 2,600+ coated and uncoated swatches. It works for any shade of red, from bright signal reds to deep burgundies.',
  },
  {
    q: 'What industries commonly use red Pantone colors?',
    a: 'Red Pantone colors are used across virtually every industry. In food and beverage, brands like Coca-Cola and Red Bull rely on specific red PMS codes for packaging. In automotive, Ferrari uses Pantone reds for its iconic rosso corsa livery. Retail and fashion brands use red for urgency and sale signage. Entertainment companies including Netflix use red as their primary identity color.',
  },
  {
    q: 'Is Pantone red the same on coated and uncoated paper?',
    a: 'No — red Pantone colors appear significantly different on coated versus uncoated paper. On coated (glossy) stock, red appears vibrant, saturated, and intense. On uncoated (matte) stock, the same ink absorbs into the paper fibers and appears softer, slightly darker, and less vivid. Always specify the correct suffix — C for coated, U for uncoated — in your print specifications.',
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pantoneconverter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Pantone Red Colors", "item": "https://pantoneconverter.com/pantone-red/" },
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
  "name": "Pantone Red Color Codes, Shades & Conversions",
  "description": "Explore all Pantone red codes including Pantone Red C, 185 C, 186 C & 485 C. Find HEX, RGB, CMYK values, shades, famous brand uses & free conversion tools.",
  "url": "https://pantoneconverter.com/pantone-red/",
  "about": { "@type": "Thing", "name": "Pantone Red Colors" },
  "breadcrumb": breadcrumbSchema,
};

function isLight(hex) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substr(0,2),16);
  const g = parseInt(c.substr(2,2),16);
  const b = parseInt(c.substr(4,2),16);
  return (r*299 + g*587 + b*114) / 1000 > 128;
}

export default function PantoneRedPage() {
  return (
    <>
      <Head>
        <title>Pantone Red Color Codes: HEX, RGB, CMYK Values &amp; Shades</title>
        <meta name="description" content="Explore all Pantone red codes including Pantone Red C, 185 C, 186 C & 485 C. Find HEX, RGB, CMYK values, shades, famous brand uses & free conversion tools." />
        <link rel="canonical" href="https://pantoneconverter.com/pantone-red/" />
        <meta property="og:title" content="Pantone Red Color Codes: HEX, RGB, CMYK Values & Shades" />
        <meta property="og:description" content="Explore all Pantone red codes including Pantone Red C, 185 C, 186 C & 485 C. Find HEX, RGB, CMYK values, shades, famous brand uses & free conversion tools." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        {ogMeta({ path: '/pantone-red/' })}
      </Head>

      <NavBar />

      <main style={{ minHeight: '100vh', background: '#fafafa' }}>

        {/* ── SECTION 1: Hero ─────────────────────────────────────── */}
        <div style={{ background: '#C8102E', padding: '4rem 1.5rem 3rem' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto', textAlign: 'center' }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
              <ol style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', listStyle: 'none', margin: 0, padding: 0, fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>
                <li><Link href="/" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>Home</Link></li>
                <li aria-hidden="true" style={{ color: 'rgba(255,255,255,0.4)' }}>›</li>
                <li style={{ color: '#fff' }}>Pantone Red</li>
              </ol>
            </nav>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', margin: '0 0 1rem', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              Pantone Red Color Codes,<br />Shades &amp; Conversions
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', maxWidth: '44rem', margin: '0 auto 2rem', lineHeight: 1.7 }}>
              This page covers the most important Pantone codes in the red family — including Pantone Red C, 185 C, 186 C, and 485 C — with their HEX, RGB, and CMYK equivalents. Explore real-world brand uses, psychological associations, and free conversion tools.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/hex-to-pantone/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: '#fff', color: '#C8102E', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                Convert a Red Code →
              </Link>
              <Link href="/pantone-finder/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.15)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.4)' }}>
                Find Pantone Shades →
              </Link>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '3rem 1.5rem 4rem', display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>

          {/* ── SECTION 2: Primary Codes — Card Grid ─────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Primary Pantone Red Codes</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.75rem', lineHeight: 1.7 }}>
              The six most widely used Pantone red codes across branding, packaging, print, and design. Each includes verified HEX, RGB, and CMYK values.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {PRIMARY_CODES.map((c) => {
                const light = isLight(c.hex);
                return (
                  <div key={c.code} style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <div style={{ background: c.hex, height: '7rem', display: 'flex', alignItems: 'flex-end', padding: '0.75rem 1rem' }}>
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Red Pantone Color Values — Complete Reference</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>Full color values for 8 Pantone red codes, from vibrant light reds to deep dark reds, covering both coated and uncoated finishes.</p>
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
              Note: Color values may appear different on screen versus print due to differences between RGB (additive) and CMYK (subtractive) color models. Always verify against a physical Pantone swatch book before production. <Link href="/learn/coated-vs-uncoated/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>Learn more about coated vs. uncoated Pantone differences.</Link>
            </p>
          </section>

          {/* ── SECTION 4: Converter Widget ───────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Convert a Red Pantone Code</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>Use our free tools to convert any red Pantone code to HEX, RGB, or CMYK — or find the closest Pantone match for a red you already have.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.875rem' }}>
              {[
                { href: '/hex-to-pantone/', label: 'HEX to Pantone', desc: 'Find the closest red PMS match for any HEX' },
                { href: '/pantone-to-hex/', label: 'Pantone to HEX', desc: 'Get the HEX code for any Pantone red' },
                { href: '/pantone-to-rgb/', label: 'Pantone to RGB', desc: 'Convert Pantone red codes to RGB values' },
                { href: '/pantone-to-cmyk/', label: 'Pantone to CMYK', desc: 'Get CMYK breakdown for any red PMS code' },
                { href: '/rgb-to-pantone/', label: 'RGB to Pantone', desc: 'Match your RGB red to a Pantone code' },
                { href: '/cmyk-to-pantone/', label: 'CMYK to Pantone', desc: 'Convert CMYK red values to the closest PMS' },
              ].map(tool => (
                <Link key={tool.href} href={tool.href} style={{ display: 'block', background: '#fff', border: '1.5px solid #f3f4f6', borderRadius: '1rem', padding: '1.1rem', textDecoration: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#fca5a5'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(200,16,46,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#f3f4f6'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'none'; }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111827', marginBottom: '0.3rem' }}>{tool.label}</div>
                  <div style={{ fontSize: '0.78rem', color: '#6b7280', lineHeight: 1.5 }}>{tool.desc}</div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── SECTION 5: Color Psychology ───────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>What Does Red Mean? Psychology &amp; Symbolism</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Red is one of the most psychologically powerful colors in the human visual spectrum. It is the color of blood and fire — two of the most primal forces in human experience — and as a result, it triggers immediate, visceral emotional responses. Studies in color psychology consistently show that red raises blood pressure, increases heart rate, and heightens alertness. This physiological response is why red is universally used in warning signs, emergency services, and stop signals across cultures and continents.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                In branding and design, red communicates urgency, passion, energy, and excitement. It is the dominant color in the food and beverage industry — Coca-Cola, McDonald’s, KFC, and Heinz all use red as their primary color — because research suggests red stimulates appetite and creates a sense of urgency that encourages impulse purchases. In retail, red sale tags are a deliberate psychological trigger designed to accelerate buying decisions.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Cultural associations with red vary significantly around the world. In Western cultures, red is strongly associated with love and romance — Valentine’s Day, roses, and hearts are all red. In China and much of East Asia, red is the color of luck, prosperity, and celebration; it is used extensively in Lunar New Year decorations, wedding attire, and gift wrapping. In South Africa, red is linked to mourning. In India, red is sacred, representing purity and bridal traditions. Designers working on global campaigns must account for these cultural nuances when selecting a Pantone red.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                When designers choose red, the specific shade matters enormously. A pure, bright Pantone Red C (032 C) projects confidence and boldness — it is direct and unambiguous. A deeper red like Pantone 186 C reads as more sophisticated and mature, which is why it works for established legacy brands. A brownish-red like Pantone 1805 C feels earthy and trustworthy, often used in food and artisanal packaging. Designers typically choose red when a brand needs to convey passion, confidence, energy, or urgency — but always with awareness that red is a high-commitment color that demands strong contrast and generous whitespace to avoid overwhelming viewers.
              </p>
            </div>
          </section>

          {/* ── SECTION 6: Famous Brands ──────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Famous Brands That Use Red Pantone Colors</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Few brands have made red as iconic as <strong>Coca-Cola</strong>, whose signature red — <Link href="/brands/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>Pantone 186 C</Link> — has been a cornerstone of their visual identity since the 1890s. The deep, rich red of Coca-Cola’s can, bottle, and advertising conveys heritage, refreshment, and celebration. Because Pantone 186 C sits slightly cooler than a pure red, it photographs beautifully and maintains consistency across millions of printed and digital touchpoints worldwide. The brand’s relationship with this specific Pantone shade is so strong that it is commonly called “Coca-Cola red” in design circles.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                <strong>Netflix</strong> uses <Link href="/brands/netflix/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>Pantone 485 C</Link> as its primary brand color — a vivid, warm red that commands attention on screen and in physical environments. The choice of this particular shade is deliberate: it is energetic and confident without veering into the aggression of a pure signal red. Netflix’s red works powerfully in its minimal “N” logo because the hue itself carries enormous brand recognition. It communicates entertainment, excitement, and the urgency of content discovery.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                <strong>Ferrari</strong> (<Link href="/brands/ferrari/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>explore Ferrari colors</Link>) uses its legendary Rosso Corsa — a racing red that traces back to the early 20th century international motor racing color coding system, in which Italy was assigned red. Ferrari’s specific shade aligns closely with Pantone 485 C and Pantone Red C variants, though the exact formula varies by production context. For Ferrari, red communicates speed, passion, Italian craftsmanship, and a racing heritage that spans over seven decades of Formula 1 history.
              </p>
            </div>
          </section>

          {/* ── SECTION 7: Shades Gallery ─────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Red Pantone Shades — From Light to Dark</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              The red family in the Pantone Matching System spans from Pantone 1775 C (a soft blush-red) to Pantone 7427 C (a deep, almost wine-dark red). Lighter tints communicate delicacy, romance, and softness, while deeper shades convey authority, sophistication, and intensity.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {SHADES.map(s => {
                const light = isLight(s.hex);
                return (
                  <div key={s.code} style={{ flexShrink: 0, width: '7.5rem', borderRadius: '0.875rem', overflow: 'hidden', border: '1.5px solid rgba(0,0,0,0.08)', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <div style={{ height: '5rem', background: s.hex }} />
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Red Pantone: Coated (C) vs. Uncoated (U)</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Red Pantone colors are among the colors most affected by the choice of paper stock. On coated (C) paper — glossy, matte-coated, or satin stocks — red appears at its full vibrancy. The ink sits on the surface of the paper rather than absorbing into it, resulting in a bright, saturated, intense red. Pantone 186 C on coated stock is the definitive Coca-Cola red; the same code on uncoated stock appears noticeably darker and more muted.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                On uncoated (U) paper — including matte, offset, and newsprint stocks — red ink is absorbed into the paper’s fibers. This causes the color to spread slightly and appear darker, less saturated, and warmer. A red that looks vivid and energetic on coated stock can appear brownish or dulled on uncoated stock. This difference is why print specifications always require you to specify whether you need the coated (C) or uncoated (U) variant.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                For brand packaging and high-impact marketing materials, always specify Pantone red with the C suffix. For book interiors, editorial, and stationery on natural paper, use the U variants and test a proof. For textile applications, red PMS colors are available in the Pantone TPG (Textile, Paper, Garment) system — if you’re producing garments or soft goods in red, request the TPG equivalents from your supplier. <Link href="/learn/coated-vs-uncoated/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>Learn more about coated vs. uncoated Pantone differences.</Link>
              </p>
            </div>
          </section>

          {/* ── SECTION 9: Industries ─────────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>How Red Pantone Is Used Across Industries</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Print &amp; Packaging</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>Red is one of the most demanded colors in print and packaging design. Food brands use specific Pantone reds extensively on packaging to stimulate appetite and create visual urgency. Pharmaceutical packaging uses red Pantone codes as a universal warning color on label sections indicating hazards or dosage limits. Luxury cosmetics brands favor deeper reds like Pantone 1805 C for a premium, sophisticated feel.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Fashion &amp; Apparel</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>Red is a perennial staple on fashion runways. The Pantone Fashion Color Trend Report regularly includes red variants — from bold tomato reds to earthy terracottas — across seasonal collections. In apparel production, red is specified using Pantone TPG (Textile, Paper, Garment) codes. The iconic red sole of Christian Louboutin shoes uses a specific Pantone red that is trademarked in many jurisdictions as a brand identifier.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Interior Design</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>In interior design, red is used as an accent color to add energy and warmth to spaces. Deep reds like Pantone 1805 C work well as feature wall colors in dining rooms and restaurants, where red is known to stimulate appetite and conversation. Brighter reds are used in retail environments to draw attention to display areas. Interior designers reference Pantone colors when specifying paints, fabrics, and surface treatments to ensure cross-material consistency.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Digital &amp; Branding</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>In brand identity, red Pantone codes serve as the authoritative reference point for a brand’s color across all media. While digital screens render color in RGB and web environments use HEX codes, the Pantone code is the master reference that all other formats derive from. Brands like Netflix, Coca-Cola, and YouTube define their red in Pantone first, then provide HEX and RGB equivalents for digital use. This ensures that a red on a physical brochure matches as closely as possible to the red on a website or app.</p>
              </div>
            </div>
          </section>

          {/* ── SECTION 10: Related Colors ────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Explore Related Pantone Color Families</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
              {[
                { href: '/pantone-orange/', label: 'Pantone Orange', hex: '#FE5000', desc: 'Warm, energetic orange shades' },
                { href: '/pantone-pink/', label: 'Pantone Pink', hex: '#FF3EB5', desc: 'Vivid to blush pink tones' },
                { href: '/pantone-purple/', label: 'Pantone Purple', hex: '#440099', desc: 'Rich violet and purple codes' },
              ].map(rel => {
                const light = isLight(rel.hex);
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

          {/* ── Cross-system converters ───────────────────────────── */}
          <div style={{ marginBottom: '3rem' }}>
            <CrossSystemLinks
              heading="Pantone Red in Other Colour Systems"
              intro="A Pantone number only helps if your supplier works in Pantone. If this red is heading for paint, thread, vinyl or fabric, these converters find the nearest code in the system that supplier actually uses — each one reporting how close the match really is."
              routes={[
              '/pantone-to-ral/',
              '/pantone-to-ncs/',
              '/pantone-to-dmc/',
              '/pantone-to-siser-htv/',
              '/pantone-c-to-tcx/',
              ]}
              accentColor="#c44eed"
            />
          </div>

          {/* ── SECTION 11: FAQ ───────────────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1.25rem' }}>Frequently Asked Questions About Red Pantone</h2>
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
