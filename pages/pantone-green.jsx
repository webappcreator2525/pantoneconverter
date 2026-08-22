import Head from 'next/head';
import ogMeta from '../components/ogMeta';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CrossSystemLinks from '../components/CrossSystemLinks';

const PRIMARY_CODES = [
  { code: 'Pantone Green C', hex: '#00A550', rgb: '0, 165, 80', cmyk: '97, 0, 76, 0', use: 'Classic Pantone green standard, used in environmental and safety branding' },
  { code: 'Pantone 354 C', hex: '#009A44', rgb: '0, 154, 68', cmyk: '100, 0, 81, 0', use: 'Vivid medium green used in Starbucks and Irish national branding' },
  { code: 'Pantone 347 C', hex: '#00843D', rgb: '0, 132, 61', cmyk: '100, 0, 77, 8', use: 'Rich forest green used in environmental and outdoor brands' },
  { code: 'Pantone 3425 C', hex: '#007A53', rgb: '0, 122, 83', cmyk: '100, 0, 63, 12', use: 'Deep emerald green for luxury and sustainability branding' },
  { code: 'Pantone 376 C', hex: '#74AA50', rgb: '116, 170, 80', cmyk: '44, 0, 74, 0', use: 'Fresh lime green used in health and wellness brands' },
  { code: 'Pantone 7739 C', hex: '#54B948', rgb: '84, 185, 72', cmyk: '64, 0, 83, 0', use: 'Vivid bright green used by Spotify and tech brands' },
];

const TABLE_DATA = [
  { code: 'Pantone 376 C', finish: 'Coated', hex: '#74AA50', rgb: '116, 170, 80', cmyk: '44, 0, 74, 0', hsl: '96°, 36%, 49%', hsb: '96°, 53%, 67%' },
  { code: 'Pantone 7739 C', finish: 'Coated', hex: '#54B948', rgb: '84, 185, 72', cmyk: '64, 0, 83, 0', hsl: '114°, 43%, 50%', hsb: '114°, 61%, 73%' },
  { code: 'Pantone Green C', finish: 'Coated', hex: '#00A550', rgb: '0, 165, 80', cmyk: '97, 0, 76, 0', hsl: '144°, 100%, 32%', hsb: '144°, 100%, 65%' },
  { code: 'Pantone 354 C', finish: 'Coated', hex: '#009A44', rgb: '0, 154, 68', cmyk: '100, 0, 81, 0', hsl: '144°, 100%, 30%', hsb: '144°, 100%, 60%' },
  { code: 'Pantone 347 C', finish: 'Coated', hex: '#00843D', rgb: '0, 132, 61', cmyk: '100, 0, 77, 8', hsl: '144°, 100%, 26%', hsb: '144°, 100%, 52%' },
  { code: 'Pantone 3425 C', finish: 'Coated', hex: '#007A53', rgb: '0, 122, 83', cmyk: '100, 0, 63, 12', hsl: '156°, 100%, 24%', hsb: '156°, 100%, 48%' },
  { code: 'Pantone 355 C', finish: 'Coated', hex: '#007A33', rgb: '0, 122, 51', cmyk: '100, 0, 79, 18', hsl: '141°, 100%, 24%', hsb: '141°, 100%, 48%' },
  { code: 'Pantone 3435 C', finish: 'Coated', hex: '#1B5E20', rgb: '27, 94, 32', cmyk: '71, 0, 66, 63', hsl: '124°, 55%, 24%', hsb: '124°, 71%, 37%' },
];

const SHADES = [
  { code: 'Pantone 2276 C', hex: '#B7E4C7', label: 'Lightest' },
  { code: 'Pantone 376 C', hex: '#74AA50', label: '' },
  { code: 'Pantone 7739 C', hex: '#54B948', label: '' },
  { code: 'Pantone Green C', hex: '#00A550', label: '' },
  { code: 'Pantone 354 C', hex: '#009A44', label: '' },
  { code: 'Pantone 347 C', hex: '#00843D', label: '' },
  { code: 'Pantone 3425 C', hex: '#007A53', label: '' },
  { code: 'Pantone 355 C', hex: '#007A33', label: '' },
  { code: 'Pantone 3435 C', hex: '#005C2B', label: '' },
  { code: 'Pantone 7737 C', hex: '#1B5E20', label: 'Darkest' },
];

const FAQS = [
  {
    q: 'What is the Pantone code for green?',
    a: 'There are many Pantone greens depending on the specific shade you need. Pantone Green C (also written as Pantone 354 C in some contexts) is the standard, widely recognised bright green. Pantone 354 C is a vivid medium green used in Starbucks branding. Pantone 347 C is a rich forest green popular in outdoor and environmental brands. Pantone 7739 C is the vivid bright green associated with Spotify. For the closest match to your specific green, use our HEX to Pantone converter tool.',
  },
  {
    q: 'What Pantone green does Starbucks use?',
    a: 'Starbucks uses Pantone 3425 C as their signature emerald green — a deep, rich green that appears across their cups, store interiors, signage, and digital platforms. This particular shade was carefully chosen to communicate nature, premium quality, and sustainability. Starbucks has used a variant of this green since their rebrand and it has become one of the most recognisable brand greens in the world. Some older Starbucks materials reference Pantone 354 C, a slightly brighter variant.',
  },
  {
    q: 'What is the closest Pantone to #00FF00?',
    a: 'Pure digital green #00FF00 (also called "lime" or "electric green") is an extremely saturated RGB color that falls outside the gamut of physical Pantone inks — it cannot be exactly reproduced in print. The closest Pantone matches in the physical ink system are typically Pantone Green C (#00A550) or Pantone 354 C (#009A44), both of which are significantly less saturated than the digital value. Use our HEX to Pantone converter to find the nearest printable match for any specific green HEX code.',
  },
  {
    q: 'How do I convert a green HEX to Pantone?',
    a: 'Use our free HEX to Pantone converter at pantoneconverter.com/hex-to-pantone/ — simply paste your green HEX code and the tool instantly finds the nearest Pantone match across 2,600+ coated and uncoated swatches. It handles all shades of green, from bright lime greens to deep forest greens and muted olive tones. The converter shows you the Delta-E distance so you know exactly how close the match is.',
  },
  {
    q: 'What is the difference between Pantone Green C and Pantone 354 C?',
    a: 'Pantone Green C and Pantone 354 C are closely related but distinct. Pantone Green C (#00A550) is the official "Pantone Green" standard — a pure, vivid green with a slight blue undertone. Pantone 354 C (#009A44) is slightly deeper and darker, with a richer tone that photographs well in brand applications. In practice, Pantone 354 C is more frequently specified in premium branding (including Starbucks-adjacent work) because its depth gives it more presence in print. Pantone Green C is more commonly used in safety signage, environmental communications, and where a clean, standard green is required.',
  },
  {
    q: 'Does Pantone green look different on coated vs. uncoated paper?',
    a: 'Yes — significantly. Green Pantone colors, especially the vivid greens like Pantone Green C, appear much more saturated and vibrant on coated (C) stock. The glossy or smooth surface prevents ink from absorbing into the paper, preserving the full intensity of the color. On uncoated (U) paper, greens tend to shift slightly toward olive or yellowish tones as the ink absorbs into the paper fibers. The difference can be striking — always specify the correct suffix (C or U) and always proof on the actual stock before going to full production.',
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pantoneconverter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Pantone Green Colors", "item": "https://pantoneconverter.com/pantone-green/" },
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
  "name": "Pantone Green Color Codes, Shades & Conversions",
  "description": "Discover Pantone green codes including Pantone Green C, 354 C & 347 C. Full HEX, RGB, CMYK reference, brand examples (Starbucks, Spotify) & free color tools.",
  "url": "https://pantoneconverter.com/pantone-green/",
  "about": { "@type": "Thing", "name": "Pantone Green Colors" },
  "breadcrumb": breadcrumbSchema,
};

function isLight(hex) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substr(0,2),16);
  const g = parseInt(c.substr(2,2),16);
  const b = parseInt(c.substr(4,2),16);
  return (r*299 + g*587 + b*114) / 1000 > 128;
}

export default function PantoneGreenPage() {
  return (
    <>
      <Head>
        <title>Pantone Green Color Codes: HEX, RGB, CMYK Values &amp; All Shades</title>
        <meta name="description" content="Discover Pantone green codes including Pantone Green C, 354 C & 347 C. Full HEX, RGB, CMYK reference, brand examples (Starbucks, Spotify) & free color tools." />
        <link rel="canonical" href="https://pantoneconverter.com/pantone-green/" />
        <meta property="og:title" content="Pantone Green Color Codes: HEX, RGB, CMYK Values & All Shades" />
        <meta property="og:description" content="Discover Pantone green codes including Pantone Green C, 354 C & 347 C. Full HEX, RGB, CMYK reference, brand examples (Starbucks, Spotify) & free color tools." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        {ogMeta({ path: '/pantone-green/' })}
      </Head>

      <NavBar />

      <main style={{ minHeight: '100vh', background: '#fafafa' }}>

        {/* ── SECTION 1: Hero ─────────────────────────────────────── */}
        <div style={{ background: '#00A550', padding: '4rem 1.5rem 3rem' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto', textAlign: 'center' }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
              <ol style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', listStyle: 'none', margin: 0, padding: 0, fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>
                <li><Link href="/" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>Home</Link></li>
                <li aria-hidden="true" style={{ color: 'rgba(255,255,255,0.4)' }}>›</li>
                <li style={{ color: '#fff' }}>Pantone Green</li>
              </ol>
            </nav>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', margin: '0 0 1rem', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              Pantone Green Color Codes,<br />Shades &amp; Conversions
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', maxWidth: '44rem', margin: '0 auto 2rem', lineHeight: 1.7 }}>
              This page covers the most important Pantone codes in the green family — including Pantone Green C, 354 C, 347 C, 3425 C, and 7739 C — with their HEX, RGB, and CMYK equivalents. Explore real-world brand uses by Starbucks, Spotify, and Rolex, psychological associations, and free conversion tools.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/hex-to-pantone/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: '#fff', color: '#00A550', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                Convert a Green Code →
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Primary Pantone Green Codes</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.75rem', lineHeight: 1.7 }}>
              The six most widely used Pantone green codes across branding, packaging, print, and design. Each includes verified HEX, RGB, and CMYK values.
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Green Pantone Color Values — Complete Reference</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>Full color values for 8 Pantone green codes, from light lime greens to deep forest greens, all on coated stock with HSL and HSB values included.</p>
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Convert a Green Pantone Code</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>Use our free tools to convert any green Pantone code to HEX, RGB, or CMYK — or find the closest Pantone match for a green you already have.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.875rem' }}>
              {[
                { href: '/hex-to-pantone/', label: 'HEX to Pantone', desc: 'Find the closest green PMS match for any HEX' },
                { href: '/pantone-to-hex/', label: 'Pantone to HEX', desc: 'Get the HEX code for any Pantone green' },
                { href: '/pantone-to-rgb/', label: 'Pantone to RGB', desc: 'Convert Pantone green codes to RGB values' },
                { href: '/pantone-to-cmyk/', label: 'Pantone to CMYK', desc: 'Get CMYK breakdown for any green PMS code' },
                { href: '/rgb-to-pantone/', label: 'RGB to Pantone', desc: 'Match your RGB green to a Pantone code' },
                { href: '/cmyk-to-pantone/', label: 'CMYK to Pantone', desc: 'Convert CMYK green values to the closest PMS' },
              ].map(tool => (
                <Link key={tool.href} href={tool.href} style={{ display: 'block', background: '#fff', border: '1.5px solid #f3f4f6', borderRadius: '1rem', padding: '1.1rem', textDecoration: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#86efac'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,165,80,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#f3f4f6'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'none'; }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111827', marginBottom: '0.3rem' }}>{tool.label}</div>
                  <div style={{ fontSize: '0.78rem', color: '#6b7280', lineHeight: 1.5 }}>{tool.desc}</div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── SECTION 5: Color Psychology ───────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>What Does Green Mean? Psychology &amp; Symbolism</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Green is the color of nature, growth, health, and renewal. It is the most balanced color in the visible spectrum — sitting at the midpoint between warm and cool — which is why it creates a sense of equilibrium and calm without the emotional charge of red or the coolness of blue. The human eye contains more receptors attuned to green wavelengths than any other color, which is why green is associated with comfort, ease, and visual rest. This biological relationship with green is one reason why time spent in natural green environments consistently improves wellbeing.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Psychologically, green reduces anxiety and promotes feelings of safety and wellbeing. Studies show that exposure to green environments reduces cortisol levels and promotes restorative mental states. Hospital rooms painted green have been shown to reduce patient anxiety. Schools with green views from windows record better student focus and attention. These measurable effects on human psychology make green a powerful tool not just in environmental design, but in branding and communication design as well.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                In branding, green communicates naturalness, sustainability, health, and freshness. It is the default color for environmental and organic brands — and for good reason. Consumer research consistently shows that green packaging increases perceptions of a product being natural, healthy, and environmentally responsible. This association has made green a cornerstone of sustainability marketing. However, designers must be cautious about “greenwashing” — using green without substantive environmental claims — as audiences are increasingly sophisticated about such signals.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                Cultural associations with green vary widely. In Western cultures, green means go, safety, and environmental responsibility — from traffic lights to recycling logos. In Islamic culture, green is a sacred color, associated with paradise and the Prophet Muhammad; it features prominently in mosque architecture and national flags across the Muslim world. In China, green represents prosperity alongside red and gold; a green hat, however, carries a very specific negative cultural connotation and must be avoided in product design for Chinese markets. Different shades of green also signal very different things: bright lime greens communicate energy, youth, and tech-forward thinking; deep forest greens communicate tradition, reliability, and luxury; sage greens communicate sophistication and calm, associated with wellness and artisanal quality.
              </p>
            </div>
          </section>

          {/* ── SECTION 6: Famous Brands ──────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Famous Brands That Use Green Pantone Colors</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Few brands have built a green identity as powerful as <strong>Starbucks</strong>, whose signature emerald — <Link href="/brands/starbucks/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>Pantone 3425 C</Link> — appears across every brand touchpoint from their iconic siren logo and cup sleeves to store interiors and digital interfaces. Starbucks has used a deep emerald green as their primary brand color since their early identity development, and it has become synonymous with premium coffee culture globally. The choice of this particular shade is deliberate: Pantone 3425 C is deep enough to convey luxury and substance, yet clearly green enough to evoke nature, freshness, and the origin story of coffee farming. For designers working on any project adjacent to food, beverage, or hospitality, the Starbucks green is a masterclass in how a single Pantone code can define an entire brand universe.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                <strong>Spotify</strong> uses <Link href="/brands/spotify/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>Pantone 7739 C</Link> — a vivid, electric green — as their primary brand color, representing energy, freshness, and digital vitality. Spotify’s green is deliberately different from the greens of environmental or health brands: it is high-contrast, almost neon in character, designed to pop on dark backgrounds and small mobile screens. This bright Pantone green has become one of the most recognised brand colors in the digital streaming space and has influenced a wave of tech brands that use vivid greens to signal modernity and forward-thinking energy. The contrast between Spotify’s bright 7739 C and the deep emerald of Starbucks illustrates perfectly how different Pantone greens can serve entirely different brand narratives.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                <strong>Rolex</strong> uses a distinctive deep green in their brand identity, with <Link href="/brands/rolex/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>Pantone 347 C</Link> appearing in their materials and associated with their iconic green dial watches, most notably the Rolex Submariner “Hulk” and the Rolex GMT-Master II. For Rolex, green communicates heritage, prestige, and connection to the natural world — values at the core of their brand since the brand’s founding. Rolex’s deep green packaging and watch dials have become collector’s items and cultural symbols in their own right, demonstrating how a carefully chosen Pantone green can carry immense brand equity over decades.
              </p>
            </div>
          </section>

          {/* ── SECTION 7: Shades Gallery ─────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Green Pantone Shades — From Light to Dark</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              The green family in the Pantone Matching System spans from Pantone 2276 C (a soft mint green) to deep forest greens like Pantone 3435 C. Lighter tints communicate freshness, spring, and health, while deeper shades convey luxury, tradition, and environmental authority.
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Green Pantone: Coated (C) vs. Uncoated (U)</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Green Pantone colors, especially the vivid greens like Pantone Green C and Pantone 354 C, appear significantly more saturated on coated stock. Coated paper — whether gloss, silk, or matte-coated — has a sealed surface that prevents ink from being absorbed into the paper fibres. This means the ink sits on top of the surface and dries at its full intensity, resulting in the vibrant, clean greens you see on premium packaging, brand collateral, and product labels.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                On uncoated (U) paper — including offset, bond, and natural stocks — greens tend to shift slightly toward olive or yellowish tones as the ink absorbs into the paper fibres and spreads slightly. A vivid Pantone Green C that looks crisp and pure on coated stock can appear noticeably warmer and more muted on uncoated paper. This difference is particularly pronounced in the mid-tone greens like Pantone 376 C, which can read as a fresh lime green on coated stock and a subdued olive-lime on uncoated. For environmental and organic brands that often prefer uncoated papers for their tactile quality and eco-credentials, this shift must be factored into color selection — it may be preferable to select a slightly more saturated Pantone green for uncoated applications to achieve the desired visual result.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                Always specify the correct suffix when ordering print: C for coated, U for uncoated. For textile applications — garments, soft furnishings, and accessories — specify Pantone TPG (Textile, Paper, Garment) equivalents and always request a physical colour standard from your supplier before approving production. <Link href="/learn/coated-vs-uncoated/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>Learn more about coated vs. uncoated Pantone differences.</Link>
              </p>
            </div>
          </section>

          {/* ── SECTION 9: Industries ─────────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>How Green Pantone Is Used Across Industries</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Print &amp; Packaging</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>Green is widely used in sustainability and organic packaging design. From fresh produce labelling to certified organic food packaging, green Pantone codes signal natural origin, health, and environmental responsibility. Pantone Green C and Pantone 354 C are particularly popular for pharmaceutical and nutraceutical packaging, where green connotes safety and health. Sustainability reports and environmental communications rely heavily on green Pantone specifications to reinforce their messaging with consistent, verifiable color across all printed materials.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Fashion &amp; Apparel</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>Green is a perennial fashion color with strong seasonal Pantone trend variants issued by Pantone’s Color of the Year programme and Fashion Color Trend Report. In apparel, green spans from vivid statement greens on runway collections to muted sage and olive tones in everyday casualwear. Sportswear and activewear brands frequently use vivid Pantone greens — particularly in the Pantone 376 C and 7739 C range — to communicate energy and vitality. Military and workwear applications rely on deep greens like Pantone 347 C for their durability associations.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Interior Design</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>Biophilic design — the practice of incorporating natural elements and colors into built environments — has driven a major resurgence of green in home and office interiors. Deep botanical greens like Pantone 3425 C are popular as feature wall colors in living rooms, studies, and hospitality spaces, where they create a sense of immersion in nature. Lighter greens like Pantone 376 C appear in health-focused environments including gyms, spas, and wellness studios. Interior designers use Pantone references to ensure consistency across paint, fabric, tile, and surface material specifications.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Digital &amp; Branding</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>Green is used extensively across health, finance, and technology brand identities in the digital space. In fintech and banking, green connotes financial growth and positive returns — many trading platforms and financial apps use green to indicate price increases. In health tech and wellness apps, green reinforces trust, safety, and vitality. The Pantone code serves as the master reference from which all digital green values (HEX, RGB, web-safe) are derived, ensuring a brand’s green remains consistent from a business card to a mobile app icon.</p>
              </div>
            </div>
          </section>

          {/* ── SECTION 10: Related Colors ────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Explore Related Pantone Color Families</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
              {[
                { href: '/pantone-blue/', label: 'Pantone Blue', hex: '#0047BB', desc: 'Classic to vivid blue tones' },
                { href: '/pantone-yellow/', label: 'Pantone Yellow', hex: '#FFD700', desc: 'Bright and golden yellow shades' },
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
              heading="Pantone Green in Other Colour Systems"
              intro="A Pantone number only helps if your supplier works in Pantone. If this green is heading for paint, thread, vinyl or fabric, these converters find the nearest code in the system that supplier actually uses — each one reporting how close the match really is."
              routes={[
              '/pantone-to-ral/',
              '/pantone-to-ncs/',
              '/pantone-to-farrow-and-ball/',
              '/pantone-to-dmc/',
              '/pantone-c-to-tcx/',
              ]}
              accentColor="#c44eed"
            />
          </div>

          {/* ── SECTION 11: FAQ ───────────────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1.25rem' }}>Frequently Asked Questions About Green Pantone</h2>
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
