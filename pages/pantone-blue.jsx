import Head from 'next/head';
import ogMeta from '../components/ogMeta';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { breadcrumbSchemaFor } from '../components/Breadcrumb';
import CrossSystemLinks from '../components/CrossSystemLinks';

const PRIMARY_CODES = [
  { code: 'Pantone Blue 072 C', hex: '#10069F', rgb: '16, 6, 159', cmyk: '94, 93, 0, 1', use: 'Deep navy blue used in EU flag and formal heraldry' },
  { code: 'Pantone Reflex Blue C', hex: '#001489', rgb: '0, 20, 137', cmyk: '100, 85, 0, 0', use: 'Standard reflex blue for print and brand identity' },
  { code: 'Pantone 286 C', hex: '#0032A0', rgb: '0, 50, 160', cmyk: '100, 84, 0, 0', use: 'Classic cobalt blue used in corporate identity' },
  { code: 'Pantone 300 C', hex: '#005EB8', rgb: '0, 94, 184', cmyk: '100, 46, 0, 0', use: 'Medium blue, used by NHS and many healthcare brands' },
  { code: 'Pantone 2728 C', hex: '#003DA5', rgb: '0, 61, 165', cmyk: '100, 64, 0, 0', use: 'Vivid royal blue used in Samsung branding' },
  { code: 'Pantone Process Blue C', hex: '#009CDE', rgb: '0, 156, 222', cmyk: '100, 15, 0, 0', use: 'Bright cyan-blue used in process printing' },
];

const TABLE_DATA = [
  { code: 'Pantone Process Blue C', finish: 'Coated', hex: '#009CDE', rgb: '0, 156, 222', cmyk: '100, 15, 0, 0', hsl: '199°, 100%, 44%', hsb: '199°, 100%, 86%' },
  { code: 'Pantone 2728 C', finish: 'Coated', hex: '#003DA5', rgb: '0, 61, 165', cmyk: '100, 64, 0, 0', hsl: '220°, 100%, 32%', hsb: '220°, 100%, 65%' },
  { code: 'Pantone 300 C', finish: 'Coated', hex: '#005EB8', rgb: '0, 94, 184', cmyk: '100, 46, 0, 0', hsl: '211°, 100%, 36%', hsb: '211°, 100%, 72%' },
  { code: 'Pantone 286 C', finish: 'Coated', hex: '#0032A0', rgb: '0, 50, 160', cmyk: '100, 84, 0, 0', hsl: '219°, 100%, 31%', hsb: '219°, 100%, 63%' },
  { code: 'Pantone Reflex Blue C', finish: 'Coated', hex: '#001489', rgb: '0, 20, 137', cmyk: '100, 85, 0, 0', hsl: '225°, 100%, 27%', hsb: '225°, 100%, 54%' },
  { code: 'Pantone Blue 072 C', finish: 'Coated', hex: '#10069F', rgb: '16, 6, 159', cmyk: '94, 93, 0, 1', hsl: '243°, 93%, 32%', hsb: '243°, 96%, 62%' },
  { code: 'Pantone 300 U', finish: 'Uncoated', hex: '#006EB6', rgb: '0, 110, 182', cmyk: '100, 40, 0, 29', hsl: '209°, 100%, 36%', hsb: '209°, 100%, 71%' },
  { code: 'Pantone 286 U', finish: 'Uncoated', hex: '#1D3E8E', rgb: '29, 62, 142', cmyk: '80, 56, 0, 44', hsl: '224°, 66%, 34%', hsb: '224°, 80%, 56%' },
];

const SHADES = [
  { code: 'Pantone 291 C', hex: '#8EBBFF', label: 'Lightest' },
  { code: 'Pantone 2715 C', hex: '#5B9EF5', label: '' },
  { code: 'Pantone 2727 C', hex: '#3D80E8', label: '' },
  { code: 'Pantone 300 C', hex: '#1560BD', label: '' },
  { code: 'Pantone 286 C', hex: '#005EB8', label: '' },
  { code: 'Pantone 2728 C', hex: '#0032A0', label: '' },
  { code: 'Pantone Reflex Blue C', hex: '#003DA5', label: '' },
  { code: 'Pantone Blue 072 C', hex: '#001489', label: '' },
  { code: 'Pantone 2768 C', hex: '#10069F', label: '' },
  { code: 'Pantone 2767 C', hex: '#00006E', label: 'Darkest' },
];

const FAQS = [
  {
    q: 'What is the most popular Pantone blue?',
    a: 'Pantone 286 C is widely regarded as the most popular and universally recognized Pantone blue. It is a rich, balanced cobalt blue that reads clearly as "true blue" across both print and digital contexts. It is used in countless corporate identities, government applications, and institutional materials worldwide. Pantone Reflex Blue C is also extremely well-known, particularly in the printing trade, where it is one of the standard reference blues for color matching.',
  },
  {
    q: 'What is the closest Pantone to navy blue?',
    a: 'The closest Pantone codes to a classic navy blue are Pantone 289 C (#002147), Pantone 2767 C (#1B2A4A), and Pantone 282 C (#003057). These deep, dark blues have the low luminosity and high ink density associated with traditional navy. Pantone Blue 072 C (#10069F) and Pantone Reflex Blue C (#001489) are also used in navy contexts, though they lean slightly more violet. Use our HEX to Pantone converter to find the closest navy PMS match for your specific shade.',
  },
  {
    q: 'What is Pantone Reflex Blue used for?',
    a: 'Pantone Reflex Blue C is one of the most widely specified blues in professional printing and brand identity. It is a deep, slightly violet-tinted blue that reproduces extremely well in offset lithography. It is commonly used in government and institutional printing, legal documents, educational materials, and corporate stationery. Reflex Blue is also one of the blues used in the European Union flag (alongside Pantone Blue 072 C for the star ring). In the printing trade, Reflex Blue is considered a benchmark blue for testing press accuracy and ink consistency.',
  },
  {
    q: 'How do I convert a blue HEX code to Pantone?',
    a: 'Use our free HEX to Pantone converter at pantoneconverter.com/hex-to-pantone/ — paste your blue HEX value and the tool instantly finds the nearest Pantone match across 2,600+ coated and uncoated swatches. Blue HEX codes span a wide range from very light sky blues (#87CEEB) through medium cobalt blues (#0047AB) to deep navy and indigo tones (#000080). Our converter handles the entire blue spectrum and returns the closest PMS match with the corresponding coated and uncoated codes.',
  },
  {
    q: 'What industries use blue Pantone colors most?',
    a: 'Blue Pantone colors are dominant in financial services (banks, insurance companies, and investment firms use blue to communicate trust and stability), healthcare and pharmaceuticals (blue signals cleanliness, reliability, and calm), technology (Apple, Samsung, Intel, HP, and Dell all use blue as a primary or secondary brand color), aviation and aerospace (airlines including British Airways, KLM, and Delta use blue extensively), and government and institutional design (many national flags, EU institutions, and UN agencies use Pantone blue codes). Blue is also the most common choice for corporate uniforms and workwear.',
  },
  {
    q: 'Is Pantone blue different on coated vs. uncoated paper?',
    a: 'Yes — and the difference is particularly dramatic for deep blues. On coated (C) paper, Pantone blues such as Reflex Blue C and Blue 072 C appear vivid, rich, and deeply saturated. The ink sits on the sealed surface of the paper and retains its full depth. On uncoated (U) paper, the same ink absorbs into the paper fibers, causing the blue to appear noticeably duller, slightly grayer, and less vibrant. Pantone Reflex Blue C on uncoated stock can appear almost navy-gray rather than the vibrant deep blue seen on coated stock. Always specify C or U in your print brief and request a physical proof before production.',
  },
];

const breadcrumbSchema = breadcrumbSchemaFor('/pantone-blue/', 'Pantone Blue');

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
  "name": "Pantone Blue Color Codes, Shades & Conversions",
  "description": "Find all Pantone blue codes including Pantone 286 C, 300 C, Reflex Blue & Process Blue. HEX, RGB, CMYK conversions, brand uses & free tools.",
  "url": "https://pantoneconverter.com/pantone-blue/",
  "about": { "@type": "Thing", "name": "Pantone Blue Colors" },
  "breadcrumb": breadcrumbSchema,
};

function isLight(hex) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substr(0,2),16);
  const g = parseInt(c.substr(2,2),16);
  const b = parseInt(c.substr(4,2),16);
  return (r*299 + g*587 + b*114) / 1000 > 128;
}

export default function PantoneBluePage() {
  return (
    <>
      <Head>
        <title>Pantone Blue Color Codes: HEX, RGB, CMYK Values &amp; All Shades</title>
        <meta name="description" content="Find all Pantone blue codes including Pantone 286 C, 300 C, Reflex Blue & Process Blue. HEX, RGB, CMYK conversions, brand uses & free tools." />
        <link rel="canonical" href="https://pantoneconverter.com/pantone-blue/" />
        <meta property="og:title" content="Pantone Blue Color Codes: HEX, RGB, CMYK Values & All Shades" />
        <meta property="og:description" content="Find all Pantone blue codes including Pantone 286 C, 300 C, Reflex Blue & Process Blue. HEX, RGB, CMYK conversions, brand uses & free tools." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        {ogMeta({ path: '/pantone-blue/' })}
      </Head>

      <NavBar />

      <main style={{ minHeight: '100vh', background: '#fafafa' }}>

        {/* ── SECTION 1: Hero ─────────────────────────────────────── */}
        <div style={{ background: '#0032A0', padding: '4rem 1.5rem 3rem' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto', textAlign: 'center' }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
              <ol style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', listStyle: 'none', margin: 0, padding: 0, fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>
                <li><Link href="/" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>Home</Link></li>
                <li aria-hidden="true" style={{ color: 'rgba(255,255,255,0.4)' }}>›</li>
                <li style={{ color: '#fff' }}>Pantone Blue</li>
              </ol>
            </nav>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', margin: '0 0 1rem', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              Pantone Blue Color Codes,<br />Shades &amp; Conversions
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', maxWidth: '44rem', margin: '0 auto 2rem', lineHeight: 1.7 }}>
              This page covers the most important Pantone codes in the blue family — including Pantone 286 C, 300 C, Reflex Blue C, and Process Blue C — with their HEX, RGB, and CMYK equivalents. Explore real-world brand uses, psychological associations, and free conversion tools.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/hex-to-pantone/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: '#fff', color: '#0032A0', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                Convert a Blue Code →
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Primary Pantone Blue Codes</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.75rem', lineHeight: 1.7 }}>
              The six most widely used Pantone blue codes across branding, packaging, print, and design. Each includes verified HEX, RGB, and CMYK values.
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Blue Pantone Color Values — Complete Reference</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>Full color values for 8 Pantone blue codes, from bright cyan-blues to deep navy blues, covering both coated and uncoated finishes.</p>
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Convert a Blue Pantone Code</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>Use our free tools to convert any blue Pantone code to HEX, RGB, or CMYK — or find the closest Pantone match for a blue you already have.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.875rem' }}>
              {[
                { href: '/hex-to-pantone/', label: 'HEX to Pantone', desc: 'Find the closest blue PMS match for any HEX' },
                { href: '/pantone-to-hex/', label: 'Pantone to HEX', desc: 'Get the HEX code for any Pantone blue' },
                { href: '/pantone-to-rgb/', label: 'Pantone to RGB', desc: 'Convert Pantone blue codes to RGB values' },
                { href: '/pantone-to-cmyk/', label: 'Pantone to CMYK', desc: 'Get CMYK breakdown for any blue PMS code' },
                { href: '/rgb-to-pantone/', label: 'RGB to Pantone', desc: 'Match your RGB blue to a Pantone code' },
                { href: '/cmyk-to-pantone/', label: 'CMYK to Pantone', desc: 'Convert CMYK blue values to the closest PMS' },
              ].map(tool => (
                <Link key={tool.href} href={tool.href} style={{ display: 'block', background: '#fff', border: '1.5px solid #f3f4f6', borderRadius: '1rem', padding: '1.1rem', textDecoration: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#93c5fd'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,50,160,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#f3f4f6'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'none'; }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111827', marginBottom: '0.3rem' }}>{tool.label}</div>
                  <div style={{ fontSize: '0.78rem', color: '#6b7280', lineHeight: 1.5 }}>{tool.desc}</div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── SECTION 5: Color Psychology ───────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>What Does Blue Mean? Psychology &amp; Symbolism</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Blue is the world’s most universally preferred color. Across dozens of international surveys spanning cultures, genders, and age groups, blue consistently ranks as the color that the largest proportion of people identify as their favourite. This near-universal appeal is rooted in deep psychological and evolutionary associations. Blue is the color of the sky and the sea — two vast, stable, enduring forces in human experience. From prehistoric times, a clear blue sky signaled fair weather and safety, while blue water signaled a clean and life-sustaining resource. These primal associations translate directly into the emotional responses that blue triggers today: calm, trust, stability, intelligence, and reliability.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                In the world of branding and corporate identity, blue is the dominant color of institutional trust. This is why the majority of banks, financial services firms, insurance companies, and technology corporations choose blue as their primary brand color. When a company selects Pantone 286 C or Pantone 300 C for its logo, it is consciously borrowing these associations of reliability and stability. Blue communicates that a company is dependable, professional, and competent — qualities that are especially critical in industries where consumers must trust an organization with their money, health, or data.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                The specific shade of blue matters enormously in communicating different personality traits. Deep navy blues — close to Pantone 282 C or Pantone 289 C — convey authority, formality, and institutional gravitas. They are at home on legal documents, military uniforms, and conservative corporate identities. Royal blues such as Pantone 286 C and Pantone 2728 C convey confidence, energy, and ambition — the color of an organization that takes its work seriously but also moves with purpose. Brighter, lighter sky blues communicate openness, friendliness, and approachability — the territory of social platforms and consumer technology brands. Cyan-blues like Pantone Process Blue C lean into innovation and modernity.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Blue’s cultural associations vary in nuanced ways around the world. Across many Asian cultures, blue is associated with immortality and healing — qualities that make it a natural fit for healthcare and pharmaceutical branding. In Arabic cultures and parts of the Middle East, blue — particularly bright turquoise-blue — is believed to ward off evil, leading to its use on talismans, tiles, and protective amulets. In Western European heraldry and flag design, blue (azure) has historically been associated with loyalty, truth, and justice, which is why it appears on the flags of so many democratic nations and international institutions including the United Nations and the European Union.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                One distinctive characteristic of blue compared to other colors is its relationship with appetite. Unlike red and orange, blue is known to suppress appetite — there are very few naturally blue foods in nature, which may explain why the color does not trigger hunger cues. This makes blue relatively rare as a primary color in food and beverage branding (with exceptions in water and dairy categories), while making it ubiquitous in healthcare, finance, and technology. Designers choosing a blue Pantone code must carefully consider both the shade and the industry context: a color that communicates perfect trust for a bank may read as cold and clinical for a food brand.
              </p>
            </div>
          </section>

          {/* ── SECTION 6: Famous Brands ──────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Famous Brands That Use Blue Pantone Colors</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                <strong>Apple</strong> (<Link href="/brands/apple/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>explore Apple colors</Link>) has a sophisticated and nuanced relationship with blue. While Apple’s primary brand identity is built around silver, white, and black, cool blues appear throughout their product photography, environmental retail design, and hardware accents. Pantone 285 C and Pantone 300 C appear in Apple’s marketing contexts — in hero images, background gradients, and the characteristic cool-toned lighting used in their retail stores and advertising. The company’s choice of cool blue tones reinforces its identity as a precision technology brand associated with clarity, intelligence, and clean design.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                <strong>Samsung</strong> (<Link href="/brands/samsung/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>explore Samsung colors</Link>) uses <strong>Pantone 2728 C</strong> as a key brand blue throughout its global identity system. This vivid royal blue — with a HEX value of #003DA5 — appears in Samsung’s logo, packaging, retail environments, and digital interfaces. The choice of Pantone 2728 C is deliberate: it is a confident, high-energy blue with enough depth to convey technology leadership and enough vibrancy to stand out in competitive retail environments. Samsung’s consistent use of this specific PMS code across over 70 countries is a masterclass in global color management, ensuring that the blue on a Samsung display in Seoul looks identical to the blue on a Samsung billboard in São Paulo.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                <strong>Instagram</strong> (<Link href="/brands/instagram/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>explore Instagram colors</Link>) uses a gradient identity that spans from blue through purple to orange and yellow. At the blue end of the gradient, Pantone 286 C and Pantone 2728 C are closest in spirit — the deep, confident blues that anchor the cooler side of the Instagram spectrum. The gradient itself represents the platform’s diversity and the creative spectrum of its community. While Instagram’s brand has evolved significantly from the original skeuomorphic camera icon, the blue-to-purple range that opens the gradient remains a key visual signal of the brand, particularly in digital environments and app iconography.
              </p>
            </div>
          </section>

          {/* ── SECTION 7: Shades Gallery ─────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Blue Pantone Shades — From Light to Dark</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              The blue family in the Pantone Matching System spans from Pantone 291 C (a delicate powder blue) to Pantone 2767 C (a deep, almost midnight blue). Lighter tints communicate openness, calm, and friendliness, while deeper shades convey authority, sophistication, and depth.
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Blue Pantone: Coated (C) vs. Uncoated (U)</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Blue Pantone colors show some of the most dramatic variation between coated and uncoated stocks of any color family. On coated (C) paper — glossy, matte-coated, or satin stocks — blue appears at its full vibrancy and saturation. The ink forms a film on the sealed paper surface rather than absorbing into it, and the result is a rich, deeply saturated blue with high color density. Pantone 286 C on a coated sheet is vivid, confident, and unmistakably blue.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                On uncoated (U) paper, the story is very different — particularly for deep blues. Pantone Reflex Blue C, one of the most used blues in the industry, can appear significantly duller and grayer on uncoated stock. The ink is absorbed into the paper fibers, scattering the light differently and reducing the perceived saturation. What prints as a vivid, almost electric deep blue on a coated business card can appear as a muted, near-navy gray on an uncoated letterhead. This is not a printing error — it is the predictable behavior of ink on porous versus sealed surfaces.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                For brand managers and designers working with blue, the practical implication is clear: always specify the correct suffix (C for coated, U for uncoated) and always request a physical proof on the intended stock before committing to a full print run. If your brand uses a Pantone blue on multiple substrates — coated packaging, uncoated stationery, and textile — you will likely need to specify different PMS codes for each to achieve visual consistency. <Link href="/learn/coated-vs-uncoated/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>Learn more about coated vs. uncoated Pantone differences.</Link>
              </p>
            </div>
          </section>

          {/* ── SECTION 9: Industries ─────────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>How Blue Pantone Is Used Across Industries</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Print &amp; Packaging</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>Blue inks are true workhorses of the CMYK printing process. Cyan — the C in CMYK — is a blue-green ink that forms the foundation of almost all color printing, and dedicated Pantone blue codes like Reflex Blue C and Process Blue C are used when a specific, precisely controlled blue is needed beyond what the CMYK process can reliably reproduce. Pharmaceutical packaging relies on consistent Pantone blues to convey cleanliness and trust; financial documents use deep blues to communicate authority; and consumer product packaging across healthcare and personal care categories overwhelmingly favors blue as their primary or secondary color.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Fashion &amp; Apparel</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>Blue denim is arguably the single most universally worn color in human history — blue jeans span cultures, climates, and income levels with a reach that no other garment or color can match. Beyond denim, blue appears in every segment of the fashion industry: from the deep navy blues of tailored menswear to the bright royal blues of athletic sportswear, and the delicate powder blues of luxury childrenswear. In apparel production, blue Pantone shades are specified using Pantone TPG (Textile, Paper, Garment) codes, and the dye lot consistency these codes enable is critical for large-scale garment manufacturing where millions of units must match across multiple factory locations.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Interior Design</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>Blue creates calm, reduces stress, and slows the perceived passage of time — all qualities that make it a powerful tool in interior design, particularly for bedrooms, bathrooms, healthcare facilities, and office environments where occupant wellbeing is a priority. Deeper blues like Pantone 289 C are used as dramatic feature wall colors in residential design, creating a sense of depth and sophistication. Lighter blues such as Pantone 291 C or Pantone 2706 C work beautifully in healthcare and wellness environments where an atmosphere of cleanliness and calm is essential. Interior designers use Pantone codes when specifying paint, tile, fabric, and surface finishes to ensure cross-material color consistency throughout a space.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Digital &amp; Branding</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>Blue dominates the technology and social media landscape more comprehensively than any other color. Facebook (now Meta), Twitter (now X), LinkedIn, Samsung, HP, Dell, Intel, PayPal, Visa, American Express, and dozens of other technology and financial brands all use blue as their primary color. This clustering of blue in tech and finance is not coincidental — it reflects blue’s proven ability to communicate trust, intelligence, and reliability in categories where consumer confidence is paramount. In digital brand identity, the Pantone code serves as the master reference from which all HEX and RGB values for web, app, and screen use are derived, ensuring that a brand’s blue looks consistent whether it appears on a printed business card or a smartphone screen.</p>
              </div>
            </div>
          </section>

          {/* ── SECTION 10: Related Colors ────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Explore Related Pantone Color Families</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
              {[
                { href: '/pantone-purple/', label: 'Pantone Purple', hex: '#440099', desc: 'Rich violet and purple codes' },
                { href: '/pantone-green/', label: 'Pantone Green', hex: '#00843D', desc: 'Fresh and natural green shades' },
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
              heading="Pantone Blue in Other Colour Systems"
              intro="A Pantone number only helps if your supplier works in Pantone. If this blue is heading for paint, thread, vinyl or fabric, these converters find the nearest code in the system that supplier actually uses — each one reporting how close the match really is."
              routes={[
              '/pantone-to-ral/',
              '/pantone-to-ncs/',
              '/pantone-to-dmc/',
              '/pantone-to-sherwin-williams/',
              '/pantone-c-to-tcx/',
              ]}
              accentColor="#c44eed"
            />
          </div>

          {/* ── SECTION 11: FAQ ───────────────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1.25rem' }}>Frequently Asked Questions About Blue Pantone</h2>
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
