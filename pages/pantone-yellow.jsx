import Head from 'next/head';
import ogMeta from '../components/ogMeta';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CrossSystemLinks from '../components/CrossSystemLinks';

const PRIMARY_CODES = [
  { code: 'Pantone Yellow C', hex: '#FFED00', rgb: '255, 237, 0', cmyk: '0, 6, 100, 0', use: 'Standard pure yellow used in caution signage and bold branding' },
  { code: 'Pantone 012 C', hex: '#FFD700', rgb: '255, 215, 0', cmyk: '0, 16, 100, 0', use: 'Classic golden yellow used in awards and premium print' },
  { code: 'Pantone 109 C', hex: '#FFD100', rgb: '255, 209, 0', cmyk: '0, 18, 100, 0', use: 'Warm mid-yellow used in construction and safety equipment' },
  { code: 'Pantone 116 C', hex: '#FFCD00', rgb: '255, 205, 0', cmyk: '0, 19, 100, 0', use: 'Medium warm yellow used by IKEA in their brand identity' },
  { code: 'Pantone 1235 C', hex: '#FFB81C', rgb: '255, 184, 28', cmyk: '0, 28, 99, 0', use: 'Golden amber yellow used by Snapchat and UPS logistics' },
  { code: 'Pantone 135 C', hex: '#F6BE00', rgb: '246, 190, 0', cmyk: '0, 23, 100, 4', use: 'Rich golden yellow used in LEGO and children\'s brand contexts' },
];

const TABLE_DATA = [
  { code: 'Pantone Yellow C', finish: 'Coated', hex: '#FFED00', rgb: '255, 237, 0', cmyk: '0, 6, 100, 0', hsl: '56°, 100%, 50%', hsb: '56°, 100%, 100%' },
  { code: 'Pantone 012 C', finish: 'Coated', hex: '#FFD700', rgb: '255, 215, 0', cmyk: '0, 16, 100, 0', hsl: '50°, 100%, 50%', hsb: '50°, 100%, 100%' },
  { code: 'Pantone 109 C', finish: 'Coated', hex: '#FFD100', rgb: '255, 209, 0', cmyk: '0, 18, 100, 0', hsl: '49°, 100%, 50%', hsb: '49°, 100%, 100%' },
  { code: 'Pantone 116 C', finish: 'Coated', hex: '#FFCD00', rgb: '255, 205, 0', cmyk: '0, 19, 100, 0', hsl: '48°, 100%, 50%', hsb: '48°, 100%, 100%' },
  { code: 'Pantone 1235 C', finish: 'Coated', hex: '#FFB81C', rgb: '255, 184, 28', cmyk: '0, 28, 99, 0', hsl: '43°, 100%, 55%', hsb: '43°, 89%, 100%' },
  { code: 'Pantone 135 C', finish: 'Coated', hex: '#F6BE00', rgb: '246, 190, 0', cmyk: '0, 23, 100, 4', hsl: '46°, 100%, 48%', hsb: '46°, 100%, 96%' },
  { code: 'Pantone Yellow U', finish: 'Uncoated', hex: '#FEE500', rgb: '254, 229, 0', cmyk: '0, 10, 100, 0', hsl: '54°, 100%, 50%', hsb: '54°, 100%, 100%' },
  { code: 'Pantone 130 C', finish: 'Coated', hex: '#F0A500', rgb: '240, 165, 0', cmyk: '0, 31, 100, 6', hsl: '41°, 100%, 47%', hsb: '41°, 100%, 94%' },
];

const SHADES = [
  { code: 'Pantone 101 C', hex: '#FFF59D', label: 'Lightest' },
  { code: 'Pantone Yellow C', hex: '#FFED00', label: '' },
  { code: 'Pantone 012 C', hex: '#FFD700', label: '' },
  { code: 'Pantone 109 C', hex: '#FFD100', label: '' },
  { code: 'Pantone 116 C', hex: '#FFCD00', label: '' },
  { code: 'Pantone 1235 C', hex: '#FFB81C', label: '' },
  { code: 'Pantone 135 C', hex: '#F6BE00', label: '' },
  { code: 'Pantone 130 C', hex: '#F0A500', label: '' },
  { code: 'Pantone 124 C', hex: '#E59400', label: '' },
  { code: 'Pantone 131 C', hex: '#CC7A00', label: 'Darkest' },
];

const FAQS = [
  {
    q: 'What is the Pantone code for yellow?',
    a: 'There are several Pantone yellows depending on your application. Pantone Yellow C is the standard bright, clean yellow — the most universally used yellow in signage and branding. Pantone 116 C is the signature yellow of IKEA. Pantone 1235 C is a golden amber yellow used by Snapchat and UPS. Pantone 012 C is a classic golden yellow popular in awards, trophies, and premium print. The right choice depends on whether you need a pure, warm, or golden yellow tone.',
  },
  {
    q: 'What Pantone yellow does IKEA use?',
    a: 'IKEA uses Pantone 116 C as their signature yellow, paired with Pantone 286 C (blue) to create their iconic Scandinavian color palette. Pantone 116 C has a HEX value of #FFCD00 and RGB values of 255, 205, 0. It is a warm, slightly saturated yellow that appears bold and approachable — perfectly suited to IKEA\'s friendly, mass-market brand identity. This specific shade gives just enough warmth to feel welcoming without veering into the more intense territory of Pantone Yellow C.',
  },
  {
    q: 'What is the closest Pantone to #FFFF00?',
    a: 'The closest Pantone match to pure digital yellow #FFFF00 is typically Pantone Yellow C, with a HEX value of #FFED00. Pure #FFFF00 is an extremely saturated RGB value that sits at the absolute limit of the green-yellow boundary — it cannot be perfectly reproduced in physical ink. Pantone Yellow C is the nearest achievable match in spot-color printing. Use our free HEX to Pantone converter for the exact nearest match for any shade of yellow you are working with.',
  },
  {
    q: 'How do I convert yellow HEX to Pantone?',
    a: 'Use our free HEX to Pantone converter at pantoneconverter.com/hex-to-pantone/ — paste your yellow HEX value and the tool instantly finds the nearest Pantone match across 2,600+ coated and uncoated swatches. It works for any shade of yellow, from the brightest lemon yellows to deep amber and golden tones. For best results in print production, always verify the suggested Pantone code against a physical swatch book under the correct lighting conditions.',
  },
  {
    q: 'Why does yellow look different in print vs. on screen?',
    a: 'Yellow looks different in print versus on screen because screens use additive RGB color mixing while print uses subtractive CMYK ink mixing. On screen, bright yellow is produced by combining red and green light at full intensity — this creates a luminous, almost fluorescent yellow that CMYK printing cannot replicate with standard inks. In CMYK, yellow is printed with yellow ink alone (0 C, 0 M, 100 Y, 0 K for a pure yellow), but the result often appears slightly warmer and less vibrant than the screen version. This is why Pantone spot colors are preferred for critical yellow applications — they guarantee a specific physical ink color independent of the CMYK conversion.',
  },
  {
    q: 'Is Pantone yellow different on coated vs. uncoated paper?',
    a: 'Yes — Pantone yellow colors show noticeable differences between coated and uncoated paper stocks. On coated paper, bright yellows like Pantone Yellow C appear at full saturation: vivid, clean, and luminous. On uncoated paper, the same ink absorbs into the paper fibers and can appear slightly muted, slightly greenish, or warmer in tone. This shift is significant enough that Pantone provides separate coated (C) and uncoated (U) variants for yellow — Pantone Yellow C and Pantone Yellow U have slightly different ink formulations to compensate for this absorption effect. Always specify the correct suffix in your print specifications.',
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pantoneconverter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Pantone Yellow Colors", "item": "https://pantoneconverter.com/pantone-yellow/" },
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
  "name": "Pantone Yellow Color Codes, Shades & Conversions",
  "description": "Find all Pantone yellow codes: Pantone Yellow C, 012 C, 109 C, 116 C and more. Full HEX, RGB, CMYK values, IKEA, LEGO & UPS brand uses & free tools.",
  "url": "https://pantoneconverter.com/pantone-yellow/",
  "about": { "@type": "Thing", "name": "Pantone Yellow Colors" },
  "breadcrumb": breadcrumbSchema,
};

function isLight(hex) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substr(0,2),16);
  const g = parseInt(c.substr(2,2),16);
  const b = parseInt(c.substr(4,2),16);
  return (r*299 + g*587 + b*114) / 1000 > 128;
}

export default function PantoneYellowPage() {
  return (
    <>
      <Head>
        <title>Pantone Yellow Color Codes: HEX, RGB, CMYK Values &amp; All Shades</title>
        <meta name="description" content="Find all Pantone yellow codes: Pantone Yellow C, 012 C, 109 C, 116 C and more. Full HEX, RGB, CMYK values, IKEA, LEGO & UPS brand uses & free tools." />
        <link rel="canonical" href="https://pantoneconverter.com/pantone-yellow/" />
        <meta property="og:title" content="Pantone Yellow Color Codes: HEX, RGB, CMYK Values & All Shades" />
        <meta property="og:description" content="Find all Pantone yellow codes: Pantone Yellow C, 012 C, 109 C, 116 C and more. Full HEX, RGB, CMYK values, IKEA, LEGO & UPS brand uses & free tools." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        {ogMeta({ path: '/pantone-yellow/' })}
      </Head>

      <NavBar />

      <main style={{ minHeight: '100vh', background: '#fafafa' }}>

        {/* ── SECTION 1: Hero ─────────────────────────────────────── */}
        <div style={{ background: '#FFED00', padding: '4rem 1.5rem 3rem' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto', textAlign: 'center' }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
              <ol style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', listStyle: 'none', margin: 0, padding: 0, fontSize: '0.8rem', fontWeight: 600, color: 'rgba(0,0,0,0.5)' }}>
                <li><Link href="/" style={{ color: 'rgba(0,0,0,0.5)', textDecoration: 'none' }}>Home</Link></li>
                <li aria-hidden="true" style={{ color: 'rgba(0,0,0,0.3)' }}>›</li>
                <li style={{ color: '#1a1a1a' }}>Pantone Yellow</li>
              </ol>
            </nav>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#1a1a1a', margin: '0 0 1rem', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              Pantone Yellow Color Codes,<br />Shades &amp; Conversions
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(0,0,0,0.7)', maxWidth: '44rem', margin: '0 auto 2rem', lineHeight: 1.7 }}>
              This page covers the most important Pantone codes in the yellow family — including Pantone Yellow C, 012 C, 109 C, 116 C, 1235 C, and 135 C — with their HEX, RGB, and CMYK equivalents. Explore IKEA, LEGO and UPS brand uses, psychological associations, and free conversion tools.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/hex-to-pantone/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: '#1a1a1a', color: '#FFED00', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                Convert a Yellow Code →
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Primary Pantone Yellow Codes</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.75rem', lineHeight: 1.7 }}>
              The six most widely used Pantone yellow codes across branding, packaging, print, and design. Each includes verified HEX, RGB, and CMYK values.
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Yellow Pantone Color Values — Complete Reference</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>Full color values for 8 Pantone yellow codes, from bright lemon yellows to deep golden ambers, covering both coated and uncoated finishes.</p>
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Convert a Yellow Pantone Code</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>Use our free tools to convert any yellow Pantone code to HEX, RGB, or CMYK — or find the closest Pantone match for a yellow you already have.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.875rem' }}>
              {[
                { href: '/hex-to-pantone/', label: 'HEX to Pantone', desc: 'Find the closest yellow PMS match for any HEX' },
                { href: '/pantone-to-hex/', label: 'Pantone to HEX', desc: 'Get the HEX code for any Pantone yellow' },
                { href: '/pantone-to-rgb/', label: 'Pantone to RGB', desc: 'Convert Pantone yellow codes to RGB values' },
                { href: '/pantone-to-cmyk/', label: 'Pantone to CMYK', desc: 'Get CMYK breakdown for any yellow PMS code' },
                { href: '/rgb-to-pantone/', label: 'RGB to Pantone', desc: 'Match your RGB yellow to a Pantone code' },
                { href: '/cmyk-to-pantone/', label: 'CMYK to Pantone', desc: 'Convert CMYK yellow values to the closest PMS' },
              ].map(tool => (
                <Link key={tool.href} href={tool.href} style={{ display: 'block', background: '#fff', border: '1.5px solid #f3f4f6', borderRadius: '1rem', padding: '1.1rem', textDecoration: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#fde68a'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,237,0,0.18)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#f3f4f6'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'none'; }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111827', marginBottom: '0.3rem' }}>{tool.label}</div>
                  <div style={{ fontSize: '0.78rem', color: '#6b7280', lineHeight: 1.5 }}>{tool.desc}</div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── SECTION 5: Color Psychology ───────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>What Does Yellow Mean? Psychology &amp; Symbolism</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Yellow is the most luminous color in the visible spectrum — it reflects more light than any other hue and is processed by the human eye more rapidly than other colors. This extraordinary visibility is why yellow is the universal color of caution and warning, found on road signs, safety vests, hazard tape, and construction equipment across every country and culture. Psychologically, yellow triggers associations with optimism, happiness, energy, intellect, and creativity. It is the color of sunlight and gold, carrying warmth and positive energy that few other hues can match.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                However, yellow is also the most fatiguing color to the eye at high saturation, and prolonged exposure to very bright yellow environments has been shown to cause anxiety and visual agitation. This is why interior designers rarely use pure Pantone Yellow C as a dominant wall color — it works far better as an accent or highlight used strategically against neutral backgrounds. In design, yellow is most effective when deployed purposefully: to draw attention, signal optimism, or add energy to an otherwise muted palette.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Cultural associations with yellow vary considerably around the world, and designers working on global campaigns must account for these nuances. In Western cultures, yellow is strongly associated with happiness, sunshine, and caution — yielding traffic signals, taxi cabs, and school buses are all yellow for maximum visibility and association with safety. In China, yellow carries imperial significance as the color historically reserved for the emperor, representing power, prestige, and good fortune. In many Latin American cultures, yellow is associated with death and mourning. In some African contexts, yellow represents wealth and fertility. In India, yellow is considered sacred and auspicious, linked to the Hindu festival of Holi and the spice turmeric.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                The specific shade of yellow chosen matters enormously in both branding and design. A clean, bright yellow like Pantone Yellow C reads as cheerful, direct, and high-energy — it is the yellow of confidence and visibility. A golden yellow like Pantone 1235 C reads as premium, warm, and mature — it carries connotations of luxury and achievem­ent rather than raw energy. A muted mustard yellow reads as creative, fashion-forward, and artisanal, often chosen by independent brands and designers seeking a yellow that feels sophisticated rather than bold. Understanding where on this spectrum your chosen Pantone yellow sits is essential to using it effectively in any design context.
              </p>
            </div>
          </section>

          {/* ── SECTION 6: Famous Brands ──────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Famous Brands That Use Yellow Pantone Colors</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Few brands have made yellow as immediately recognizable as <strong>IKEA</strong>, whose signature yellow — <Link href="/brands/ikea/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>Pantone 116 C</Link> — is paired with Pantone 286 C (blue) to create their iconic Scandinavian color palette. IKEA’s yellow communicates friendliness, affordability, and optimism, perfectly aligning with the brand’s mission of democratizing good design for everyone. The specific choice of Pantone 116 C — a warm, medium-bright yellow — gives just enough vibrancy to stand out boldly against blue without the aggressive intensity of a pure Pantone Yellow C. It is a masterclass in how a single Pantone shade can carry an entire brand identity across warehouses, catalogues, websites, and flat-pack furniture worldwide.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                <strong>LEGO</strong> uses <Link href="/brands/lego/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>Pantone 135 C</Link> as their primary yellow — a rich golden yellow that has become one of the most recognizable brand colors in the toy industry. The warmer, slightly deeper tone of Pantone 135 C compared to standard yellow reads as playful yet premium, giving LEGO bricks a timeless quality that has endured for over seven decades. LEGO’s yellow appears across packaging, sets, promotional materials, and the distinctive minifigure skin tone, making it one of the most globally consistent yellow applications in consumer product design.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                <strong>UPS</strong> (<Link href="/brands/ups/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>explore UPS brand colors</Link>) uses Pantone 1235 C — a golden amber yellow — as their signature color, creating a distinctive identity in the logistics and delivery industry. This warm, golden yellow communicates reliability, efficiency, and premium service, and UPS has trademarked their specific shade in many markets. Nicknamed ‘Pullman Brown’ in their internal brand guidelines (referring to the complementary brown vehicle and uniform color), UPS’s Pantone 1235 C yellow has become one of the most recognizable brand colors in global commerce.
              </p>
            </div>
          </section>

          {/* ── SECTION 7: Shades Gallery ─────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Yellow Pantone Shades — From Light to Dark</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              The yellow family in the Pantone Matching System spans from Pantone 101 C (a barely-there lemon tint) through the full-saturation Pantone Yellow C and on to deep amber shades like Pantone 131 C. Lighter tints communicate softness and delicacy, while deeper golden ambers convey warmth, richness, and a premium character.
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Yellow Pantone: Coated (C) vs. Uncoated (U)</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Yellow Pantone colors show some of the most noticeable differences between coated and uncoated paper stocks of any color family. On coated (C) paper — glossy, matte-coated, or satin stock — bright yellows like Pantone Yellow C appear at their full, luminous saturation. The ink sits on the paper’s surface rather than absorbing into it, delivering a clean, vivid, almost fluorescent-quality yellow. This is why coated paper is strongly recommended for applications where a bold, attention-grabbing yellow is critical to the design’s effectiveness.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                On uncoated (U) paper — including matte, offset, and textured stocks — yellow ink absorbs into the paper’s fibers and the result can shift noticeably. Bright yellows like Pantone Yellow C may appear slightly greenish, muted, or warmer on uncoated stock compared to their coated equivalent. The same yellow that pops with energy on a coated brochure can look flat or duller on a natural-paper letterhead. This difference is significant enough that Pantone provides separate coated (C) and uncoated (U) variants for yellow codes, with slightly different ink formulations to compensate for the absorption effect.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                For maximum brand consistency with yellows, always specify the correct paper suffix and request a physical proof before production runs. If you are producing both coated and uncoated materials — such as a glossy folder paired with a matte letterhead — you may need to use different Pantone codes for each to achieve a visually consistent result. For textile applications, yellow Pantone colors are available in the Pantone TPG (Textile, Paper, Garment) system, where fabric dye absorption creates yet another set of variables to manage. <Link href="/learn/coated-vs-uncoated/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>Learn more about coated vs. uncoated Pantone differences.</Link>
              </p>
            </div>
          </section>

          {/* ── SECTION 9: Industries ─────────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>How Yellow Pantone Is Used Across Industries</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Print &amp; Packaging</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>Yellow is a critical ink in CMYK 4-color printing — it is one of the four process inks (Cyan, Magenta, Yellow, Key/Black) and plays an essential role in reproducing warm tones, greens, oranges, and skin tones throughout the full color gamut. As a spot color, specific Pantone yellows are used extensively in packaging for consumer goods, food products, and toy brands. Yellow packaging is associated with cheerfulness and value — it is one of the most attention-grabbing shelf colors in retail environments, which is why brands like LEGO and IKEA commit to it as a primary brand asset.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Fashion &amp; Apparel</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>Yellow has cyclical seasonal popularity in fashion, appearing prominently in spring and summer collections as a symbol of warmth and optimism. The Pantone Fashion Color Trend Report has featured various yellow tones — from bright lemons to deep ochres and golden mustards — across recent seasons. In apparel production, yellow is specified using Pantone TPG (Textile, Paper, Garment) codes. Mustard yellows and ochres have particularly strong presence in premium fashion contexts, while brighter, purer yellows appear in sportswear and youth-oriented brands. Yellow accessories — bags, shoes, and jewelry — are a perennial seasonal trend that designers anchor to specific Pantone codes for production consistency.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Interior Design</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>Yellow accents are popular in kitchen and creative workspace interiors, where the color’s energy-boosting and appetite-stimulating properties are well-suited to the environment. Interior designers use Pantone yellows to specify paints, tiles, upholstery, and soft furnishings, ensuring color consistency across different materials and manufacturers. Pure bright yellows are typically used as accent colors rather than dominant wall tones — golden and amber yellows like Pantone 130 C and 135 C work well as warm, full-room colors in living spaces and hospitality environments, where they create a sense of comfort and warmth without the visual fatigue of a fully saturated yellow.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Digital &amp; Branding</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>In digital design, yellow is deployed strategically in call-to-action elements, warning states, notification badges, and highlight accents. UI designers use yellow for caution alerts, star ratings, and promotional banners — its high visibility makes it one of the most effective colors for drawing the eye to important interface elements. In brand identity, yellow Pantone codes serve as the authoritative reference point across all media. Brands like Snapchat and National Geographic define their yellow in Pantone first, then provide HEX (#FFFC00 and #FFCC00 respectively) and RGB equivalents for digital use. This Pantone-first approach ensures that a yellow on a physical product or printed material matches as closely as possible to the yellow on a website, app, or digital advertisement.</p>
              </div>
            </div>
          </section>

          {/* ── SECTION 10: Related Colors ────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Explore Related Pantone Color Families</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
              {[
                { href: '/pantone-gold/', label: 'Pantone Gold', hex: '#C9A84C', desc: 'Warm metallic and golden tones' },
                { href: '/pantone-orange/', label: 'Pantone Orange', hex: '#FE5000', desc: 'Warm, energetic orange shades' },
                { href: '/pantone-green/', label: 'Pantone Green', hex: '#00A651', desc: 'Fresh, natural green codes' },
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
              heading="Pantone Yellow in Other Colour Systems"
              intro="A Pantone number only helps if your supplier works in Pantone. If this yellow is heading for paint, thread, vinyl or fabric, these converters find the nearest code in the system that supplier actually uses — each one reporting how close the match really is."
              routes={[
              '/pantone-to-ral/',
              '/pantone-to-oracal/',
              '/pantone-to-dmc/',
              '/pantone-to-behr/',
              '/pantone-c-to-tcx/',
              ]}
              accentColor="#c44eed"
            />
          </div>

          {/* ── SECTION 11: FAQ ───────────────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1.25rem' }}>Frequently Asked Questions About Yellow Pantone</h2>
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
