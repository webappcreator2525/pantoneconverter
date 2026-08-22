import Head from 'next/head';
import ogMeta from '../components/ogMeta';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CrossSystemLinks from '../components/CrossSystemLinks';

const PRIMARY_CODES = [
  { code: 'Pantone 871 C (Metallic)', hex: '#85754E', rgb: '133, 117, 78', cmyk: '0, 12, 41, 48', use: 'Classic metallic gold used in luxury packaging and certificates' },
  { code: 'Pantone 874 C (Metallic)', hex: '#8B6914', rgb: '139, 105, 20', cmyk: '0, 24, 86, 45', use: 'Rich warm metallic gold used in Rolex and jewelry branding' },
  { code: 'Pantone 123 C', hex: '#FFC72C', rgb: '255, 199, 44', cmyk: '0, 22, 97, 0', use: 'Bright process gold used in awards and premium print' },
  { code: 'Pantone 1235 C', hex: '#FFB81C', rgb: '255, 184, 28', cmyk: '0, 28, 99, 0', use: 'Warm golden yellow used in Chanel accessories' },
  { code: 'Pantone 7752 C', hex: '#C6A900', rgb: '198, 169, 0', cmyk: '0, 15, 100, 22', use: 'Deep antique gold used in heritage brands and medals' },
  { code: 'Pantone 459 C', hex: '#E8D48B', rgb: '232, 212, 139', cmyk: '0, 9, 44, 9', use: 'Light champagne gold for subtle luxury accents' },
];

const TABLE_DATA = [
  { code: 'Pantone 459 C', finish: 'Coated', hex: '#E8D48B', rgb: '232, 212, 139', cmyk: '0, 9, 44, 9', hsl: '43°, 64%, 73%', hsb: '43°, 40%, 91%' },
  { code: 'Pantone 123 C', finish: 'Coated', hex: '#FFC72C', rgb: '255, 199, 44', cmyk: '0, 22, 97, 0', hsl: '43°, 100%, 59%', hsb: '43°, 83%, 100%' },
  { code: 'Pantone 1235 C', finish: 'Coated', hex: '#FFB81C', rgb: '255, 184, 28', cmyk: '0, 28, 99, 0', hsl: '43°, 100%, 55%', hsb: '43°, 89%, 100%' },
  { code: 'Pantone 7752 C', finish: 'Coated', hex: '#C6A900', rgb: '198, 169, 0', cmyk: '0, 15, 100, 22', hsl: '51°, 100%, 39%', hsb: '51°, 100%, 78%' },
  { code: 'Pantone 459 U', finish: 'Uncoated', hex: '#DCC87A', rgb: '220, 200, 122', cmyk: '0, 9, 45, 14', hsl: '44°, 58%, 67%', hsb: '44°, 45%, 86%' },
  { code: 'Pantone 871 C', finish: 'Coated (Metallic)', hex: '#85754E', rgb: '133, 117, 78', cmyk: '0, 12, 41, 48', hsl: '42°, 26%, 41%', hsb: '42°, 41%, 52%' },
  { code: 'Pantone 874 C', finish: 'Coated (Metallic)', hex: '#8B6914', rgb: '139, 105, 20', cmyk: '0, 24, 86, 45', hsl: '43°, 75%, 31%', hsb: '43°, 86%, 55%' },
  { code: 'Pantone 8641 C', finish: 'Coated (Metallic)', hex: '#8C7B5E', rgb: '140, 123, 94', cmyk: '0, 12, 33, 45', hsl: '37°, 20%, 46%', hsb: '37°, 33%, 55%' },
];

const SHADES = [
  { code: 'Pantone 9284 C', hex: '#F5E6B2', label: 'Lightest' },
  { code: 'Pantone 459 C', hex: '#E8D48B', label: '' },
  { code: 'Pantone 123 C', hex: '#FFC72C', label: '' },
  { code: 'Pantone 1235 C', hex: '#FFB81C', label: '' },
  { code: 'Pantone 124 C', hex: '#F0A500', label: '' },
  { code: 'Pantone 7752 C', hex: '#C6A900', label: '' },
  { code: 'Pantone 1245 C', hex: '#A88900', label: '' },
  { code: 'Pantone 873 C (Metallic)', hex: '#8B7030', label: '' },
  { code: 'Pantone 871 C (Metallic)', hex: '#85754E', label: '' },
  { code: 'Pantone 1615 C', hex: '#5C4A2A', label: 'Darkest' },
];

const FAQS = [
  {
    q: 'What is the Pantone code for metallic gold?',
    a: 'The most widely used Pantone codes for metallic gold are Pantone 871 C and Pantone 874 C. These are true metallic inks within the Pantone Metallic Colors system and produce a genuine reflective sheen that process (CMYK) printing cannot replicate. Pantone 871 C is the classic, slightly muted metallic gold used on certificates, awards, and luxury packaging. Pantone 874 C is a richer, warmer metallic gold frequently associated with jewelry and watchmaking brands such as Rolex. For non-metallic bright gold effects in process printing, Pantone 123 C and Pantone 1235 C are the standard choices.',
  },
  {
    q: 'What is the difference between Pantone 871 C and Pantone 874 C?',
    a: 'Both Pantone 871 C and Pantone 874 C are metallic gold inks in the Pantone Metallic system, but they differ in tone and depth. Pantone 871 C (HEX approximation #85754E) is a classic, slightly cool-toned metallic gold — restrained and elegant, suitable for certificates, official seals, and heritage packaging. Pantone 874 C (HEX approximation #8B6914) is a deeper, warmer, and richer metallic gold with more amber in its tone. It has a more pronounced golden depth and is strongly associated with luxury goods including watchmakers, jewelers, and high-end cosmetics. When choosing between the two, consider whether you need a classic understated gold (871 C) or a bolder, warmer statement gold (874 C).',
  },
  {
    q: 'What Pantone gold is used by luxury brands?',
    a: 'Different luxury brands use different Pantone golds depending on their identity. Rolex uses Pantone 871 C and 874 C metallic golds in their official brand materials and reference imagery. Chanel uses Pantone 123 C and 1235 C for print materials accompanying their iconic CC logo and packaging. Louis Vuitton uses a warm gold aligned with Pantone 1235 C across their monogram hardware and packaging. For award ceremonies and trophy design, Pantone 871 C is the industry standard. In the jewelry sector, Pantone 874 C is the preferred metallic reference for yellow gold. Always verify the exact PMS code with your supplier, as some luxury brands use proprietary or custom-mixed metallic formulations.',
  },
  {
    q: 'How do I print metallic gold Pantone?',
    a: 'Printing metallic gold Pantone colors requires the use of Pantone Metallic spot inks — these are pre-mixed inks that contain actual metallic pigment particles (typically aluminum or bronze) that create a reflective, shimmering effect. Pantone 871 C and 874 C cannot be reproduced through standard CMYK four-color printing. You must specify a spot color run in addition to (or instead of) CMYK. Most commercial offset printers can add a Pantone metallic pass as a 5th or 6th color. For digital printing, metallic effects are generally not achievable — you would need to substitute a process gold such as Pantone 123 C or use a foiling technique. Always proof metallic gold inks on your actual substrate before final production, as the metallic effect varies significantly between coated and uncoated stocks.',
  },
  {
    q: 'What industries use gold Pantone colors?',
    a: 'Gold Pantone colors are used across a wide range of premium and luxury industries. In luxury goods and fashion, brands like Rolex, Chanel, and Louis Vuitton specify metallic Pantone golds for packaging, hardware references, and print materials. In print and publishing, gold is used on book covers, award certificates, invitations, and special edition packaging — often using Pantone 871 C or 873 C as metallic spot colors. In the food and beverage sector, gold is used extensively on premium chocolate, champagne, and spirits packaging to signal quality and indulgence. In interior design, gold Pantone references guide the selection of hardware finishes, lighting fixtures, and accent materials. In digital design, process golds like 123 C and 1235 C are used in gradients and premium brand interfaces.',
  },
  {
    q: 'Can I convert a gold Pantone to CMYK?',
    a: 'You can convert process (non-metallic) gold Pantone codes like Pantone 123 C (CMYK: 0, 22, 97, 0) and Pantone 1235 C (CMYK: 0, 28, 99, 0) to CMYK with reasonable accuracy — these are standard spot colors that have established CMYK equivalents. However, metallic Pantone golds such as Pantone 871 C and 874 C cannot be faithfully converted to CMYK because their defining characteristic — the metallic reflective sheen — is a physical property of the metallic ink particles, not a color value. A CMYK approximation of 871 C will look like a dull, flat olive-brown rather than a genuine metallic gold. If you must substitute a metallic gold with a CMYK equivalent, use Pantone 123 C or 1235 C and accept that the metallic quality will be lost. Use our free Pantone to CMYK converter at pantoneconverter.com/pantone-to-cmyk/ for instant CMYK breakdowns.',
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pantoneconverter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Pantone Gold Colors", "item": "https://pantoneconverter.com/pantone-gold/" },
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
  "name": "Pantone Gold Color Codes, Shades & Conversions",
  "description": "Explore Pantone gold codes including metallic Pantone 871 C, 874 C & warm golds like 123 C and 1235 C. HEX, RGB, CMYK values, luxury brand uses & free tools.",
  "url": "https://pantoneconverter.com/pantone-gold/",
  "about": { "@type": "Thing", "name": "Pantone Gold Colors" },
  "breadcrumb": breadcrumbSchema,
};

function isLight(hex) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substr(0,2),16);
  const g = parseInt(c.substr(2,2),16);
  const b = parseInt(c.substr(4,2),16);
  return (r*299 + g*587 + b*114) / 1000 > 128;
}

export default function PantoneGoldPage() {
  return (
    <>
      <Head>
        <title>Pantone Gold Color Codes: HEX, RGB, CMYK Values &amp; Metallic Shades</title>
        <meta name="description" content="Explore Pantone gold codes including metallic Pantone 871 C, 874 C & warm golds like 123 C and 1235 C. HEX, RGB, CMYK values, luxury brand uses & free tools." />
        <link rel="canonical" href="https://pantoneconverter.com/pantone-gold/" />
        <meta property="og:title" content="Pantone Gold Color Codes: HEX, RGB, CMYK Values & Metallic Shades" />
        <meta property="og:description" content="Explore Pantone gold codes including metallic Pantone 871 C, 874 C & warm golds like 123 C and 1235 C. HEX, RGB, CMYK values, luxury brand uses & free tools." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        {ogMeta({ path: '/pantone-gold/' })}
      </Head>

      <NavBar />

      <main style={{ minHeight: '100vh', background: '#fafafa' }}>

        {/* ── SECTION 1: Hero ─────────────────────────────────────── */}
        <div style={{ background: '#FFB81C', padding: '4rem 1.5rem 3rem' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto', textAlign: 'center' }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
              <ol style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', listStyle: 'none', margin: 0, padding: 0, fontSize: '0.8rem', fontWeight: 600, color: 'rgba(0,0,0,0.55)' }}>
                <li><Link href="/" style={{ color: 'rgba(0,0,0,0.55)', textDecoration: 'none' }}>Home</Link></li>
                <li aria-hidden="true" style={{ color: 'rgba(0,0,0,0.3)' }}>›</li>
                <li style={{ color: '#1a1a1a' }}>Pantone Gold</li>
              </ol>
            </nav>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#1a1a1a', margin: '0 0 1rem', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              Pantone Gold Color Codes,<br />Shades &amp; Conversions
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(0,0,0,0.7)', maxWidth: '44rem', margin: '0 auto 2rem', lineHeight: 1.7 }}>
              This page covers the most important Pantone codes in the gold family — including metallic Pantone 871 C, 874 C, and process golds 123 C and 1235 C — with verified HEX, RGB, and CMYK equivalents. Explore luxury brand uses, metallic printing guidance, and free conversion tools.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/hex-to-pantone/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: '#1a1a1a', color: '#FFB81C', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.18)' }}>
                Convert a Gold Code →
              </Link>
              <Link href="/pantone-finder/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: 'rgba(0,0,0,0.1)', color: '#1a1a1a', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', border: '1.5px solid rgba(0,0,0,0.2)' }}>
                Find Pantone Shades →
              </Link>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '3rem 1.5rem 4rem', display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>

          {/* ── SECTION 2: Primary Codes — Card Grid ─────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Primary Pantone Gold Codes</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.75rem', lineHeight: 1.7 }}>
              The six most widely used Pantone gold codes across luxury branding, packaging, print, and design — spanning metallic spot inks and process golds. Each includes verified HEX, RGB, and CMYK values.
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Gold Pantone Color Values — Complete Reference</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>Full color values for 8 Pantone gold codes — from light champagne golds to deep antique and metallic golds — covering both coated and metallic finishes.</p>
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
              Note: HEX values for metallic Pantone golds (871 C, 874 C, 8641 C) are approximations only — the true metallic sheen cannot be represented in digital color values. Always verify against a physical Pantone Metallic swatch book before production. <Link href="/learn/coated-vs-uncoated/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>Learn more about coated vs. uncoated Pantone differences.</Link>
            </p>
          </section>

          {/* ── SECTION 4: Converter Widget ───────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Convert a Gold Pantone Code</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>Use our free tools to convert any gold Pantone code to HEX, RGB, or CMYK — or find the closest Pantone match for a gold you already have.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.875rem' }}>
              {[
                { href: '/hex-to-pantone/', label: 'HEX to Pantone', desc: 'Find the closest gold PMS match for any HEX' },
                { href: '/pantone-to-hex/', label: 'Pantone to HEX', desc: 'Get the HEX code for any Pantone gold' },
                { href: '/pantone-to-rgb/', label: 'Pantone to RGB', desc: 'Convert Pantone gold codes to RGB values' },
                { href: '/pantone-to-cmyk/', label: 'Pantone to CMYK', desc: 'Get CMYK breakdown for any gold PMS code' },
                { href: '/rgb-to-pantone/', label: 'RGB to Pantone', desc: 'Match your RGB gold to a Pantone code' },
                { href: '/cmyk-to-pantone/', label: 'CMYK to Pantone', desc: 'Convert CMYK gold values to the closest PMS' },
              ].map(tool => (
                <Link key={tool.href} href={tool.href} style={{ display: 'block', background: '#fff', border: '1.5px solid #f3f4f6', borderRadius: '1rem', padding: '1.1rem', textDecoration: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#FFC72C'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,183,28,0.18)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#f3f4f6'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'none'; }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111827', marginBottom: '0.3rem' }}>{tool.label}</div>
                  <div style={{ fontSize: '0.78rem', color: '#6b7280', lineHeight: 1.5 }}>{tool.desc}</div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── SECTION 5: Color Psychology ───────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>What Does Gold Mean? Psychology &amp; Symbolism</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Gold communicates luxury, prestige, success, and wealth in a way that no other color can fully replicate. As a color, gold occupies a unique psychological space — it simultaneously references a precious metal, the warmth of sunlight, and the radiance of fire. In color psychology, gold consistently triggers associations with achievement, supreme value, and exclusivity. It is the color of first place, of royalty, of the divine. These associations are not culturally arbitrary — they are rooted in millennia of human experience in which gold has represented the rarest and most coveted of materials.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Gold is used almost universally in luxury branding precisely because it signals premium quality with an immediacy that words cannot match. Unlike yellow — which can feel cheap, cautionary, or even childish depending on context — gold has a weight, seriousness, and gravitas that commands respect. The difference is felt instinctively: a product with a gold Pantone foil stamp reads as definitively premium, while the same design in bright yellow reads as cheerful but ordinary. This is why a Pantone metallic gold like 871 C or 874 C — with its genuine reflective sheen — carries far more luxurious connotation than even the brightest process gold.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Culturally, gold is one of the most universally positive colors in human symbolism. In Western cultures, gold medals represent absolute first place and unsurpassed excellence — the Olympic gold medal is the apex achievement in sport. In Buddhism, gold is sacred and deeply spiritual, representing enlightenment, wisdom, and the divine nature of the Buddha; gold leaf adorns temples and statues throughout Southeast Asia. In African cultures, particularly in Ghana's Ashanti tradition, gold represents royalty, divine connection, and kingly authority — the Golden Stool is the most sacred object in Ashanti culture. In Chinese tradition, gold is a color of good fortune, prosperity, and celebration, closely related to the imperial yellow of the ancient emperors.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                In design practice, gold works most powerfully as an accent color against deep, rich backgrounds — navy, black, deep forest green, or deep burgundy — where it creates maximum contrast and a compelling sense of luxury. Metallic Pantone golds like 871 C and 874 C have a unique luminosity and depth that process (non-metallic) golds cannot replicate; under different lighting conditions, they shift and shimmer in ways that add a sense of life and premium craftsmanship to printed materials. Designers reaching for gold should consider whether the project warrants a true metallic specification — foil stamping, metallic ink, or embossing — rather than a CMYK approximation, because the difference in perceived quality is significant and immediately apparent to the end consumer.
              </p>
            </div>
          </section>

          {/* ── SECTION 6: Famous Brands ──────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Famous Brands That Use Gold Pantone Colors</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Few brands have integrated gold into their identity as completely as <strong>Rolex</strong> (<Link href="/brands/rolex/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>explore Rolex brand colors</Link>). Rolex uses Pantone 871 C and Pantone 874 C metallic golds in their official branding materials, packaging, and watch dial references. The precise, restrained quality of Pantone 871 C — a classic, slightly muted metallic gold — mirrors the understated elegance that defines Rolex's brand philosophy. Meanwhile, the deeper, richer warmth of Pantone 874 C appears in references to their yellow gold case and bracelet collections, reinforcing the connection between the printed material and the actual precious metal of the timepiece. For Rolex, specifying the correct metallic Pantone is not merely a design decision — it is a brand integrity issue that directly reflects the quality of the product.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                <strong>Chanel</strong> (<Link href="/brands/chanel/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>explore Chanel brand colors</Link>) uses gold extensively across their iconic interlocking CC logo, perfume bottles, and packaging — the black-and-gold visual language of Chanel is one of the most recognized brand identities in the world. In print materials and packaging, Chanel references Pantone 123 C and Pantone 1235 C as their process gold standards, with metallic foil stamps and embossing adding the premium physical dimension. The combination of matte black and Pantone gold creates an unmistakable luxury signal that has remained consistent across decades of brand evolution.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                <strong>Louis Vuitton</strong> (<Link href="/brands/louis-vuitton/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>explore Louis Vuitton brand colors</Link>) uses a distinctive warm gold — closely aligned with Pantone 1235 C — across their monogram hardware, packaging, and brand communications. The LV monogram hardware, which appears on bags, luggage, and accessories, is specified to a warm golden tone that must maintain consistency across metal castings, foil printing, and digital brand assets. The warm amber quality of Pantone 1235 C suits Louis Vuitton's heritage aesthetic perfectly: it reads as genuinely golden without being brash, evoking craftsmanship, tradition, and the patina of fine materials that age beautifully over time.
              </p>
            </div>
          </section>

          {/* ── SECTION 7: Shades Gallery ─────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Gold Pantone Shades — From Light to Dark</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              The gold family in the Pantone system spans from Pantone 9284 C (a barely-there champagne gold) through vivid process golds to deep antique and metallic golds like Pantone 871 C and 874 C. Lighter tints communicate softness and delicacy, while deep golds signal authority and heritage.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {SHADES.map(s => {
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Gold Pantone: Coated (C) vs. Uncoated (U) &amp; Metallic</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Gold Pantone colors are among the most substrate-sensitive in the entire Pantone Matching System — and the difference between finishes is particularly dramatic for metallics. Metallic Pantone golds such as Pantone 871 C and 874 C are specifically formulated for coated stocks, where their metallic pigment particles can sit on the surface and reflect light effectively, producing the genuine shimmering sheen that makes them so valuable in luxury applications. On coated (C) stock — whether gloss, silk, or matte-coated — these metallics perform at their intended specification.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                On uncoated (U) paper, metallic Pantone golds lose much of their luster and can appear flat, dull, and brownish — a significant departure from their intended effect. The ink absorbs into the uncoated paper's fibers rather than sitting on the surface, which eliminates the reflective quality entirely. If your project requires uncoated stock and a gold effect, consider using a process gold like Pantone 123 U or 1235 U (the uncoated variants), and accept that the result will be a warm yellow-gold tone rather than a metallic one. Alternatively, explore foil stamping on uncoated stock for a metallic effect without relying on metallic ink.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                For textile applications — garments, soft goods, upholstery — gold Pantone colors are referenced using the Pantone TPG (Textile, Paper, Garment) system. The TPG equivalents for gold shades provide standardized references that fabric dyers and embroidery thread manufacturers can match. If you are producing garments or soft furnishings with gold accents, always request TPG variants from your supplier rather than using the Pantone C or U codes directly, as the coated/uncoated system does not translate to textile substrates. <Link href="/learn/coated-vs-uncoated/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>Learn more about coated vs. uncoated Pantone differences.</Link>
              </p>
            </div>
          </section>

          {/* ── SECTION 9: Industries ─────────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>How Gold Pantone Is Used Across Industries</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Print &amp; Packaging</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>Metallic gold inks dominate the luxury print and packaging sector. Spirits brands — champagne, whisky, cognac — use Pantone metallic gold foils and spot inks on labels and gift boxes to signal premium quality at point of sale. Chocolate and confectionery brands use gold foil packaging to position products in the premium gift tier. Award certificates, trophies, and recognition materials almost universally use Pantone 871 C as the gold standard. Pantone metallic golds are also used extensively in wedding and event stationery, where gold embossing and foiling on invitation suites communicate celebration and prestige.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Fashion &amp; Apparel</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>Gold accessories and hardware are a perennial fixture in luxury fashion. Handbag clasps, belt buckles, chain straps, and shoe embellishments are specified to gold Pantone standards — typically Pantone 874 C for a rich yellow gold or Pantone 8641 C for a slightly more understated warm gold. Fashion houses use Pantone gold references to maintain consistency between seasons across different suppliers and manufacturing countries. In embroidery and thread applications, TPG gold variants are used for garment decoration. The Pantone Fashion Color Trend Reports regularly feature gold-adjacent shades — from bright process golds to deep antique golds — across seasonal palettes.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Interior Design</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>Gold accents in light fixtures, hardware, fittings, and decorative elements are a defining feature of luxury interior design. Interior designers reference Pantone gold codes when specifying finishes for door handles, faucets, lamp bases, picture frames, and decorative accessories, ensuring that metallic finishes across different suppliers maintain visual harmony. Pantone 871 C and 874 C serve as the primary references for yellow gold hardware finishes. In wall coverings and fabric selections, process gold tones like Pantone 459 C (champagne gold) and Pantone 7752 C (antique gold) guide fabric dyers, wallpaper manufacturers, and paint formulators. Gold accents in interiors are most effective when balanced against deep, rich backgrounds.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Digital &amp; Branding</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>In digital brand design, gold gradients, metallic effects, and gold typography are used extensively for premium brand experiences — subscription upgrades, loyalty program materials, award badges, and premium tier interfaces. Since true metallic gold cannot be rendered on screen, digital designers use the HEX approximations of Pantone gold codes as their reference — Pantone 1235 C (#FFB81C) and Pantone 123 C (#FFC72C) are the most common process gold references for digital use. Gold gradient effects are frequently created by combining a lighter gold (such as #FFC72C) with a deeper amber (such as #A88900) to simulate a metallic sheen in digital environments. Brand identity systems that span print and digital must carefully document both the Pantone code (for print) and the equivalent HEX (for digital) to maintain cross-media consistency.</p>
              </div>
            </div>
          </section>

          {/* ── SECTION 10: Related Colors ────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Explore Related Pantone Color Families</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
              {[
                { href: '/pantone-yellow/', label: 'Pantone Yellow', hex: '#FFD700', desc: 'Bright process yellows and warm tones' },
                { href: '/pantone-orange/', label: 'Pantone Orange', hex: '#FE5000', desc: 'Warm, energetic orange shades' },
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

          {/* ── Cross-system converters ───────────────────────────── */}
          <div style={{ marginBottom: '3rem' }}>
            <CrossSystemLinks
              heading="Pantone Gold in Other Colour Systems"
              intro="A Pantone number only helps if your supplier works in Pantone. If this gold is heading for paint, thread, vinyl or fabric, these converters find the nearest code in the system that supplier actually uses — each one reporting how close the match really is."
              routes={[
              '/pantone-to-ral/',
              '/pantone-to-dmc/',
              '/pantone-to-oracal/',
              '/pantone-to-dulux/',
              '/pantone-c-to-tcx/',
              ]}
              accentColor="#c44eed"
            />
          </div>

          {/* ── SECTION 11: FAQ ───────────────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1.25rem' }}>Frequently Asked Questions About Gold Pantone</h2>
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
