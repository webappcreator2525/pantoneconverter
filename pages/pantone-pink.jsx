import Head from 'next/head';
import ogMeta from '../components/ogMeta';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CrossSystemLinks from '../components/CrossSystemLinks';

const PRIMARY_CODES = [
  { code: 'Pantone 812 C', hex: '#FF3EB5', rgb: '255, 62, 181', cmyk: '0, 85, 0, 0', use: 'Fluorescent hot pink used in bold fashion and pop culture branding' },
  { code: 'Pantone Rhodamine Red C', hex: '#E10098', rgb: '225, 0, 152', cmyk: '0, 100, 33, 0', use: 'Vivid magenta-pink used in fashion, cosmetics, and beauty branding' },
  { code: 'Pantone 218 C', hex: '#DA1884', rgb: '218, 24, 132', cmyk: '0, 94, 0, 0', use: 'Medium hot pink used in feminine brand identities and editorial design' },
  { code: 'Pantone 2385 C', hex: '#D0006F', rgb: '208, 0, 111', cmyk: '0, 100, 47, 0', use: 'Deep cool pink used in luxury cosmetics and beauty packaging' },
  { code: 'Pantone 1767 C', hex: '#F4AEC0', rgb: '244, 174, 192', cmyk: '0, 29, 9, 0', use: 'Soft blush pink used in wedding, beauty, and lifestyle branding' },
  { code: 'Pantone 232 C', hex: '#F7A8D0', rgb: '247, 168, 208', cmyk: '0, 32, 0, 0', use: 'Light baby pink used in children’s products and soft branding' },
];

const TABLE_DATA = [
  { code: 'Pantone 232 C', finish: 'Coated', hex: '#F7A8D0', rgb: '247, 168, 208', cmyk: '0, 32, 0, 0', hsl: '328°, 82%, 81%', hsb: '328°, 32%, 97%' },
  { code: 'Pantone 1767 C', finish: 'Coated', hex: '#F4AEC0', rgb: '244, 174, 192', cmyk: '0, 29, 9, 0', hsl: '342°, 76%, 82%', hsb: '342°, 29%, 96%' },
  { code: 'Pantone 218 C', finish: 'Coated', hex: '#DA1884', rgb: '218, 24, 132', cmyk: '0, 94, 0, 0', hsl: '321°, 80%, 47%', hsb: '321°, 89%, 85%' },
  { code: 'Pantone 812 C', finish: 'Coated', hex: '#FF3EB5', rgb: '255, 62, 181', cmyk: '0, 85, 0, 0', hsl: '322°, 100%, 62%', hsb: '322°, 76%, 100%' },
  { code: 'Pantone Rhodamine Red C', finish: 'Coated', hex: '#E10098', rgb: '225, 0, 152', cmyk: '0, 100, 33, 0', hsl: '319°, 100%, 44%', hsb: '319°, 100%, 88%' },
  { code: 'Pantone 2385 C', finish: 'Coated', hex: '#D0006F', rgb: '208, 0, 111', cmyk: '0, 100, 47, 0', hsl: '322°, 100%, 41%', hsb: '322°, 100%, 82%' },
  { code: 'Pantone 232 U', finish: 'Uncoated', hex: '#EFA0C8', rgb: '239, 160, 200', cmyk: '0, 33, 8, 6', hsl: '328°, 72%, 78%', hsb: '328°, 33%, 94%' },
  { code: 'Pantone 224 C', finish: 'Coated', hex: '#B0407A', rgb: '176, 64, 122', cmyk: '0, 64, 31, 31', hsl: '328°, 46%, 47%', hsb: '328°, 64%, 69%' },
];

const SHADES = [
  { code: 'Pantone 9304 C', hex: '#FFD6E8', label: 'Lightest' },
  { code: 'Pantone 232 C', hex: '#F7A8D0', label: '' },
  { code: 'Pantone 1767 C', hex: '#F4AEC0', label: '' },
  { code: 'Pantone 812 C', hex: '#FF3EB5', label: '' },
  { code: 'Pantone 218 C', hex: '#DA1884', label: '' },
  { code: 'Pantone Rhodamine Red C', hex: '#E10098', label: '' },
  { code: 'Pantone 2385 C', hex: '#D0006F', label: '' },
  { code: 'Pantone 224 C', hex: '#B0407A', label: '' },
  { code: 'Pantone 228 C', hex: '#9B1966', label: '' },
  { code: 'Pantone 229 C', hex: '#7A0A4E', label: 'Darkest' },
];

const FAQS = [
  {
    q: 'What is the Pantone code for hot pink?',
    a: 'There are several Pantone hot pinks. Pantone 812 C is a fluorescent hot pink with incredible vibrancy. Pantone 218 C and Pantone 219 C are classic, saturated hot pinks heavily used in fashion and pop culture branding.',
  },
  {
    q: 'What is "Barbie pink" in Pantone?',
    a: 'Barbie pink is famously aligned with Pantone 219 C. It is a highly saturated, energetic hot pink that has become one of the most recognizable proprietary brand colors globally, representing femininity, playfulness, and confidence.',
  },
  {
    q: 'What is Pantone Rhodamine Red C?',
    a: 'Despite its name containing "Red", Pantone Rhodamine Red C is actually a vivid magenta-pink. It is one of the foundational base mixing inks in the Pantone system and is widely used across cosmetics and fashion for its striking impact.',
  },
  {
    q: 'How do I convert a pink HEX to Pantone?',
    a: 'Simply use our free HEX to Pantone converter at pantoneconverter.com/hex-to-pantone/. Enter your HEX code, and our tool will find the closest matching pink from over 2,600 Pantone swatches.',
  },
  {
    q: 'What is the difference between Pantone 218 C and Rhodamine Red C?',
    a: 'Pantone 218 C is a more balanced hot pink, while Rhodamine Red C leans further into magenta and cooler, purple-tinged undertones. Rhodamine is often perceived as more intense and synthetic, whereas 218 C reads as a purer pink.',
  },
  {
    q: 'Is Pantone pink different on coated vs. uncoated paper?',
    a: 'Yes, drastically. Fluorescent pinks like Pantone 812 C lose almost all their neon quality on uncoated paper, appearing as flat, medium pinks. Rhodamine Red also becomes much softer and duller on uncoated stock. Always use coated stock (C) if you want high-impact, vivid pinks.',
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pantoneconverter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Pantone Pink Colors", "item": "https://pantoneconverter.com/pantone-pink/" },
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
  "name": "Pantone Pink Color Codes, Shades & Conversions",
  "description": "Discover Pantone pink codes: hot pink, magenta, blush & baby pink. Includes Pantone 812 C, 218 C, Rhodamine Red C & more. HEX, RGB, CMYK & free tools.",
  "url": "https://pantoneconverter.com/pantone-pink/",
  "about": { "@type": "Thing", "name": "Pantone Pink Colors" },
  "breadcrumb": breadcrumbSchema,
};

function isLight(hex) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substr(0,2),16);
  const g = parseInt(c.substr(2,2),16);
  const b = parseInt(c.substr(4,2),16);
  return (r*299 + g*587 + b*114) / 1000 > 128;
}

export default function PantonePinkPage() {
  return (
    <>
      <Head>
        <title>Pantone Pink Color Codes: HEX, RGB, CMYK Values &amp; All Shades</title>
        <meta name="description" content="Discover Pantone pink codes: hot pink, magenta, blush & baby pink. Includes Pantone 812 C, 218 C, Rhodamine Red C & more. HEX, RGB, CMYK & free tools." />
        <link rel="canonical" href="https://pantoneconverter.com/pantone-pink/" />
        <meta property="og:title" content="Pantone Pink Color Codes: HEX, RGB, CMYK Values & All Shades" />
        <meta property="og:description" content="Discover Pantone pink codes: hot pink, magenta, blush & baby pink. Includes Pantone 812 C, 218 C, Rhodamine Red C & more. HEX, RGB, CMYK & free tools." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        {ogMeta({ path: '/pantone-pink/' })}
      </Head>

      <NavBar />

      <main style={{ minHeight: '100vh', background: '#fafafa' }}>

        {/* ── SECTION 1: Hero ─────────────────────────────────────── */}
        <div style={{ background: '#FF3EB5', padding: '4rem 1.5rem 3rem' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto', textAlign: 'center' }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
              <ol style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', listStyle: 'none', margin: 0, padding: 0, fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>
                <li><Link href="/" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>Home</Link></li>
                <li aria-hidden="true" style={{ color: 'rgba(255,255,255,0.4)' }}>›</li>
                <li style={{ color: '#fff' }}>Pantone Pink</li>
              </ol>
            </nav>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', margin: '0 0 1rem', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              Pantone Pink Color Codes,<br />Shades &amp; Conversions
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', maxWidth: '44rem', margin: '0 auto 2rem', lineHeight: 1.7 }}>
              Explore the spectrum of Pantone pink codes, from neon hot pink and striking magenta to delicate blush and baby pinks. Includes HEX, RGB, CMYK values, pop culture significance, and free conversion tools.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/hex-to-pantone/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: '#fff', color: '#FF3EB5', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                Convert a Pink Code →
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Primary Pantone Pink Codes</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.75rem', lineHeight: 1.7 }}>
              The six most influential Pantone pink codes used across fashion, cosmetics, and brand identity design.
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Pink Pantone Color Values — Complete Reference</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>Comprehensive color values for 8 Pantone pink variants, providing precise translation from print to digital screens.</p>
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
              Note: Highly saturated and fluorescent pinks are very difficult to reproduce on standard CMYK printers. <Link href="/learn/cmyk-vs-rgb/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>Learn more about the limitations of CMYK vs RGB.</Link>
            </p>
          </section>

          {/* ── SECTION 4: Converter Widget ───────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Convert a Pink Pantone Code</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>Use our tools to accurately convert pink Pantone codes to HEX, RGB, or CMYK — or reverse match your digital pink to a physical Pantone ink.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.875rem' }}>
              {[
                { href: '/hex-to-pantone/', label: 'HEX to Pantone', desc: 'Find the closest pink PMS match for any HEX' },
                { href: '/pantone-to-hex/', label: 'Pantone to HEX', desc: 'Get the HEX code for any Pantone pink' },
                { href: '/pantone-to-rgb/', label: 'Pantone to RGB', desc: 'Convert Pantone pink codes to RGB values' },
                { href: '/pantone-to-cmyk/', label: 'Pantone to CMYK', desc: 'Get CMYK breakdown for any pink PMS code' },
                { href: '/rgb-to-pantone/', label: 'RGB to Pantone', desc: 'Match your RGB pink to a Pantone code' },
                { href: '/cmyk-to-pantone/', label: 'CMYK to Pantone', desc: 'Convert CMYK pink values to the closest PMS' },
              ].map(tool => (
                <Link key={tool.href} href={tool.href} style={{ display: 'block', background: '#fff', border: '1.5px solid #f3f4f6', borderRadius: '1rem', padding: '1.1rem', textDecoration: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#f472b6'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,62,181,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#f3f4f6'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'none'; }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111827', marginBottom: '0.3rem' }}>{tool.label}</div>
                  <div style={{ fontSize: '0.78rem', color: '#6b7280', lineHeight: 1.5 }}>{tool.desc}</div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── SECTION 5: Color Psychology ───────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>What Does Pink Mean? Psychology &amp; Symbolism</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Pink sits at the fascinating intersection of red’s passion and white’s purity, creating a color that communicates tenderness, romance, femininity, playfulness, and nurturing warmth. Its psychological effects are highly nuanced and depend heavily on the specific shade: bright, vivid pinks like Pantone 812 C carry energy, boldness, and rebellion; softer blush pinks like Pantone 1767 C feel delicate, calming, and innocent.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Research into color psychology has shown that exposure to certain shades of pink (specifically 'Baker-Miller pink') temporarily reduces aggression and hostility, which has led to its experimental use in some prison environments and locker rooms.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Pink has undergone significant cultural evolution in recent decades. Once rigidly gendered as feminine in Western cultures (a relatively recent 20th-century development), pink has increasingly been reclaimed by gender-neutral and gender-fluid fashion movements, appearing prominently in contemporary menswear and unisex branding. The 'Barbie' movie of 2023 revitalized massive cultural interest in vivid, unapologetic hot pinks, driving a trend that saw Pantone 219 C become one of the most culturally resonant colors of the year.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                Culturally, pink carries varied meanings globally: in Japan, pink is inextricably linked to cherry blossoms and the transient beauty of nature; in India, pink represents hospitality and is a celebratory color commonly worn at festivals; in Korea, pink flowers represent happiness and good luck. Designers reach for pink when they want to communicate gentleness, romance, bold femininity, youthfulness, or avant-garde individuality — depending entirely on the saturation of the shade they choose.
              </p>
            </div>
          </section>

          {/* ── SECTION 6: Famous Brands ──────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Famous Brands That Use Pink Pantone Colors</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                <strong>Barbie</strong> (Mattel) uses a highly saturated hot pink historically aligned with Pantone 219 C (and variations like Rhodamine Red C). This 'Barbie Pink' is one of the most recognizable proprietary brand colors in toy and fashion history, representing uninhibited playfulness, bold femininity, and confidence.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                <strong>T-Mobile</strong> uses Pantone Rhodamine Red C as their distinctive magenta brand color. In the telecommunications industry, where competitors largely use safe blues and reds, T-Mobile's aggressive pink-magenta creates immediate, disruptive recognition and positions the brand as a challenger.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                <strong>Cosmopolitan magazine</strong> frequently utilizes vivid hot pinks (aligned with Pantone 812 C and 218 C) in their branding and editorial design to represent femininity, boldness, and the modern, energetic woman.
              </p>
            </div>
          </section>

          {/* ── SECTION 7: Shades Gallery ─────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Pink Pantone Shades — From Light to Dark</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              The pink spectrum transitions from pale pastel blush tones through neon magentas, down into deep berry and fuchsia shades.
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Pink Pantone: Coated (C) vs. Uncoated (U)</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Bright and fluorescent pinks are extraordinarily sensitive to the paper they are printed on. On coated (C) stock, which prevents ink absorption, pinks like Pantone 812 C or Pantone 219 C achieve a stunning, neon-like vibrancy that cannot be replicated in standard CMYK printing.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                However, on uncoated (U) stock, this fluorescent quality is completely lost. The ink absorbs into the paper fibers, causing neon pinks to appear as relatively flat, standard medium pinks, and causing deeper magenta tones to become dull and muted.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                If your design requires a high-impact hot pink, it must be printed on coated stock or specialized materials. For fashion and apparel, designers use the Pantone TPG (Textile, Paper, Garment) or TCX systems, which provide accurate fabric representations. <Link href="/learn/coated-vs-uncoated/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>Learn more about coated vs. uncoated Pantone differences.</Link>
              </p>
            </div>
          </section>

          {/* ── SECTION 9: Industries ─────────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>How Pink Pantone Is Used Across Industries</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Print &amp; Packaging</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>Pink is a dominant color in cosmetics, skincare, and fragrance packaging, where different shades are used to target different demographics: soft blush pinks for sensitive skincare, and hot magentas for bold color cosmetics. It is also heavily used in gift packaging and confectionery.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Fashion &amp; Apparel</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>Pink is cyclically trendy in fashion, sometimes dominating entire seasons (as seen with the recent 'Barbiecore' and Valentino Pink PP trends). While traditionally prominent in women's wear, pink has increasingly become a staple in gender-neutral streetwear and high fashion.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Interior Design</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>'Millennial Pink' (a soft, muted, dusty rose tone) became a defining interior design trend of the late 2010s, used widely in boutique hotels, restaurants, and residential spaces as a sophisticated neutral alternative to beige or gray.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Digital &amp; Branding</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>In digital interfaces, pink is often used by beauty, fashion, and wellness applications. Bold magentas are used strategically as highly visible call-to-action buttons in apps aiming for a playful, modern, or disruptive aesthetic.</p>
              </div>
            </div>
          </section>

          {/* ── SECTION 10: Related Colors ────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Explore Related Pantone Color Families</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
              {[
                { href: '/pantone-red/', label: 'Pantone Red', hex: '#C8102E', desc: 'Bold, passionate red shades' },
                { href: '/pantone-purple/', label: 'Pantone Purple', hex: '#440099', desc: 'Rich violet and purple codes' },
                { href: '/pantone-orange/', label: 'Pantone Orange', hex: '#FE5000', desc: 'Warm, energetic orange shades' },
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
              heading="Pantone Pink in Other Colour Systems"
              intro="A Pantone number only helps if your supplier works in Pantone. If this pink is heading for paint, thread, vinyl or fabric, these converters find the nearest code in the system that supplier actually uses — each one reporting how close the match really is."
              routes={[
              '/pantone-to-dmc/',
              '/pantone-to-copic/',
              '/pantone-to-siser-htv/',
              '/pantone-c-to-tcx/',
              '/pantone-to-ncs/',
              ]}
              accentColor="#c44eed"
            />
          </div>

          {/* ── SECTION 11: FAQ ───────────────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1.25rem' }}>Frequently Asked Questions About Pink Pantone</h2>
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
