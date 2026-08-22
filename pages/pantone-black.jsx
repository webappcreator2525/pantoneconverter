import Head from 'next/head';
import ogMeta from '../components/ogMeta';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const PRIMARY_CODES = [
  { code: 'Pantone Black C', hex: '#2D2926', rgb: '45, 41, 38', cmyk: '0, 0, 0, 100', use: 'Standard neutral black used as default in most brand specifications' },
  { code: 'Pantone Black 6 C', hex: '#101820', rgb: '16, 24, 32', cmyk: '0, 0, 0, 100', use: 'Cool blue-black used in tech and luxury fashion brands' },
  { code: 'Pantone Black 3 C', hex: '#212721', rgb: '33, 39, 33', cmyk: '0, 0, 0, 100', use: 'Greenish-black with natural undertone used in eco branding' },
  { code: 'Pantone Black 4 C', hex: '#4E3629', rgb: '78, 54, 41', cmyk: '0, 30, 50, 70', use: 'Warm brown-black used in coffee and leather goods branding' },
  { code: 'Pantone Black 7 C', hex: '#3D3935', rgb: '61, 57, 53', cmyk: '0, 0, 0, 88', use: 'Warm neutral dark gray-black for sophisticated brand applications' },
  { code: 'Pantone Process Black C', hex: '#1A1A18', rgb: '26, 26, 24', cmyk: '0, 0, 0, 100', use: 'True process black for 4-color offset printing' },
];

const TABLE_DATA = [
  { code: 'Pantone Black 7 C', finish: 'Coated', hex: '#3D3935', rgb: '61, 57, 53', cmyk: '0, 0, 0, 88', hsl: '30°, 7%, 22%', hsb: '30°, 13%, 24%' },
  { code: 'Pantone Black C', finish: 'Coated', hex: '#2D2926', rgb: '45, 41, 38', cmyk: '0, 0, 0, 100', hsl: '23°, 8%, 16%', hsb: '23°, 16%, 18%' },
  { code: 'Pantone Black 4 C', finish: 'Coated', hex: '#4E3629', rgb: '78, 54, 41', cmyk: '0, 30, 50, 70', hsl: '22°, 31%, 23%', hsb: '22°, 47%, 31%' },
  { code: 'Pantone Black 3 C', finish: 'Coated', hex: '#212721', rgb: '33, 39, 33', cmyk: '0, 0, 0, 100', hsl: '120°, 8%, 14%', hsb: '120°, 15%, 15%' },
  { code: 'Pantone Black 6 C', finish: 'Coated', hex: '#101820', rgb: '16, 24, 32', cmyk: '0, 0, 0, 100', hsl: '210°, 33%, 9%', hsb: '210°, 50%, 13%' },
  { code: 'Pantone Process Black C', finish: 'Coated', hex: '#1A1A18', rgb: '26, 26, 24', cmyk: '0, 0, 0, 100', hsl: '60°, 4%, 10%', hsb: '60°, 8%, 10%' },
  { code: 'Pantone Black C U', finish: 'Uncoated', hex: '#1C1C1C', rgb: '28, 28, 28', cmyk: '0, 0, 0, 100', hsl: '0°, 0%, 11%', hsb: '0°, 0%, 11%' },
  { code: 'Pantone 426 C', finish: 'Coated', hex: '#2C3033', rgb: '44, 48, 51', cmyk: '14, 6, 0, 80', hsl: '207°, 7%, 19%', hsb: '207°, 14%, 20%' },
];

const SHADES = [
  { code: 'Pantone 6C Black', hex: '#0A0A0A', label: 'Deepest' },
  { code: 'Pantone Process Black C', hex: '#1A1A18', label: '' },
  { code: 'Pantone Black 6 C', hex: '#101820', label: '' },
  { code: 'Pantone Black 3 C', hex: '#212721', label: '' },
  { code: 'Pantone Black C', hex: '#2D2926', label: '' },
  { code: 'Pantone Black 7 C', hex: '#3D3935', label: '' },
  { code: 'Pantone Black 4 C', hex: '#4E3629', label: '' },
  { code: 'Pantone 426 C', hex: '#5C5C5C', label: '' },
  { code: 'Cool Gray 10 C', hex: '#6B6B6B', label: '' },
  { code: 'Cool Gray 7 C', hex: '#8C8C8C', label: 'Lightest' },
];

const FAQS = [
  {
    q: 'What is the difference between Pantone Black C and Process Black?',
    a: 'Pantone Black C (#2D2926) is a spot color mixed as a single ink — it has a slightly warm, neutral undertone and is used in brand identity work where a specific, controlled black is required. Process Black (also called "K" in CMYK) is the black channel in four-color process printing, created by combining cyan, magenta, yellow, and black inks. Process Black C (#1A1A18) as a Pantone reference code represents what process black looks like in a CMYK press run. For most brand applications, Pantone Black C is preferred because it is consistent and predictable. For editorial and commercial print, Process Black is the standard.',
  },
  {
    q: 'Which Pantone black has a blue undertone?',
    a: 'Pantone Black 6 C (#101820) is the Pantone black with the most pronounced cool, blue undertone. With an HSL hue angle of 210° (which sits squarely in the blue family), Black 6 C reads as a very deep navy-black rather than a neutral black. It is widely favored by technology companies and luxury fashion brands because its cool undertone communicates modernity, precision, and forward-thinking design. Nike uses Pantone Black 6 C in their Swoosh and identity elements on white backgrounds for exactly this reason.',
  },
  {
    q: 'Which Pantone black has a warm or brown undertone?',
    a: 'Pantone Black 4 C (#4E3629) is the warmest Pantone black, with a pronounced brown undertone that gives it an almost espresso or dark chocolate quality. Its CMYK values (0, 30, 50, 70) reveal significant amounts of yellow and magenta, which create that distinctive warm, organic feel. Black 4 C is widely used in coffee brand identities, leather goods, spirits packaging, and artisanal food brands because its warmth communicates natural provenance, craftsmanship, and earthiness. Pantone Black 7 C (#3D3935) is a secondary warm option with a more subtle warm gray quality.',
  },
  {
    q: 'What Pantone black does Chanel use?',
    a: 'Chanel uses Pantone Black C (#2D2926) as their iconic primary brand color. This neutral-warm black appears throughout Chanel\'s visual identity — from the No. 5 perfume bottle to their fashion packaging, garment tags, and retail environments. The choice of Pantone Black C rather than a cooler or warmer variant is deliberate: its neutrality ensures that the black reads as pure and authoritative across all surfaces — glossy card, matte paper, fabric, and digital screens — without appearing harsh or cold. The specific Pantone reference allows Chanel to maintain absolute color consistency across their global production.',
  },
  {
    q: 'How do I get a rich black in printing?',
    a: 'A "rich black" in print is achieved by combining all four CMYK channels to create a deeper, more saturated black than pure K (100% black) alone. A common rich black formula is C:60, M:40, Y:40, K:100 — the additional CMY inks add depth and density, particularly on larger black areas. However, rich black should never be used for small text or fine lines, as slight misregistration between the four plates can cause blurry edges. For text and small elements, always use 100% K (Process Black C). For large black panels and backgrounds in premium packaging, rich black delivers a more luxurious result. Use our CMYK to Pantone converter to verify your black formula.',
  },
  {
    q: 'Is Pantone black different on coated vs. uncoated paper?',
    a: 'Yes — the difference on black is significant. On coated (glossy) stock, Pantone Black C appears deep, rich, and intensely dark, with the ink sitting on the paper surface and reflecting minimal light. On uncoated (matte) stock, the same ink absorbs into the paper fiber, appearing slightly lighter, softer, and with a warmer quality — often described as a "charcoal" rather than a true black. Process Black on uncoated paper can appear noticeably grayish rather than true black. For maximum depth and drama on uncoated stocks, many print professionals increase ink density or switch to a rich black formula. Always specify "C" for coated and "U" for uncoated in your Pantone specifications.',
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pantoneconverter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Pantone Black Colors", "item": "https://pantoneconverter.com/pantone-black/" },
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
  "name": "Pantone Black Color Codes, Shades & Conversions",
  "description": "All Pantone black codes including Pantone Black C, Black 6 C & Process Black. HEX, RGB, CMYK values, undertone comparisons, brand uses & free tools.",
  "url": "https://pantoneconverter.com/pantone-black/",
  "about": { "@type": "Thing", "name": "Pantone Black Colors" },
  "breadcrumb": breadcrumbSchema,
};

function isLight(hex) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substr(0,2),16);
  const g = parseInt(c.substr(2,2),16);
  const b = parseInt(c.substr(4,2),16);
  return (r*299 + g*587 + b*114) / 1000 > 128;
}

export default function PantoneBlackPage() {
  return (
    <>
      <Head>
        <title>Pantone Black Color Codes: HEX, RGB, CMYK — All Black Variants</title>
        <meta name="description" content="All Pantone black codes including Pantone Black C, Black 6 C & Process Black. HEX, RGB, CMYK values, undertone comparisons, brand uses & free tools." />
        <link rel="canonical" href="https://pantoneconverter.com/pantone-black/" />
        <meta property="og:title" content="Pantone Black Color Codes: HEX, RGB, CMYK — All Black Variants" />
        <meta property="og:description" content="All Pantone black codes including Pantone Black C, Black 6 C & Process Black. HEX, RGB, CMYK values, undertone comparisons, brand uses & free tools." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        {ogMeta({ path: '/pantone-black/' })}
      </Head>

      <NavBar />

      <main style={{ minHeight: '100vh', background: '#fafafa' }}>

        {/* ── SECTION 1: Hero ─────────────────────────────────────── */}
        <div style={{ background: '#2D2926', padding: '4rem 1.5rem 3rem' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto', textAlign: 'center' }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
              <ol style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', listStyle: 'none', margin: 0, padding: 0, fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>
                <li><Link href="/" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>Home</Link></li>
                <li aria-hidden="true" style={{ color: 'rgba(255,255,255,0.4)' }}>›</li>
                <li style={{ color: '#fff' }}>Pantone Black</li>
              </ol>
            </nav>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', margin: '0 0 1rem', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              Pantone Black Color Codes,<br />Shades &amp; Conversions
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', maxWidth: '44rem', margin: '0 auto 2rem', lineHeight: 1.7 }}>
              This page covers all major Pantone black codes — including Pantone Black C, Black 6 C, Black 4 C, Black 3 C, and Process Black — with verified HEX, RGB, and CMYK values. Explore undertone differences, real-world brand uses, and free conversion tools for every black variant in the Pantone Matching System.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/hex-to-pantone/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: '#fff', color: '#2D2926', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.25)' }}>
                Convert a Black Code →
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Primary Pantone Black Codes</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.75rem', lineHeight: 1.7 }}>
              The six most important Pantone black codes, each with a distinct undertone — neutral, cool blue, green, warm brown — that makes them suited to different brand personalities and industries. Verified HEX, RGB, and CMYK values included.
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Black Pantone Color Values — Complete Reference</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>Full color values for 8 Pantone black codes, from the deepest process blacks to near-black dark grays, covering both coated and uncoated finishes.</p>
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
                          <div style={{ width: '1rem', height: '1rem', borderRadius: '0.25rem', background: row.hex, flexShrink: 0, border: '1px solid rgba(0,0,0,0.15)' }} />
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Convert a Black Pantone Code</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>Use our free tools to convert any black Pantone code to HEX, RGB, or CMYK — or find the closest Pantone match for a near-black color you already have.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.875rem' }}>
              {[
                { href: '/hex-to-pantone/', label: 'HEX to Pantone', desc: 'Find the closest black PMS match for any dark HEX' },
                { href: '/pantone-to-hex/', label: 'Pantone to HEX', desc: 'Get the HEX code for any Pantone black' },
                { href: '/pantone-to-rgb/', label: 'Pantone to RGB', desc: 'Convert Pantone black codes to RGB values' },
                { href: '/pantone-to-cmyk/', label: 'Pantone to CMYK', desc: 'Get CMYK breakdown for any black PMS code' },
                { href: '/rgb-to-pantone/', label: 'RGB to Pantone', desc: 'Match your dark RGB color to a Pantone black' },
                { href: '/cmyk-to-pantone/', label: 'CMYK to Pantone', desc: 'Convert rich black CMYK values to the closest PMS' },
              ].map(tool => (
                <Link key={tool.href} href={tool.href} style={{ display: 'block', background: '#fff', border: '1.5px solid #f3f4f6', borderRadius: '1rem', padding: '1.1rem', textDecoration: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#9ca3af'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(45,41,38,0.12)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#f3f4f6'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'none'; }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111827', marginBottom: '0.3rem' }}>{tool.label}</div>
                  <div style={{ fontSize: '0.78rem', color: '#6b7280', lineHeight: 1.5 }}>{tool.desc}</div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── SECTION 5: Color Psychology ───────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>What Does Black Mean? Psychology &amp; Symbolism</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Black is the most psychologically complex color in the palette. It simultaneously communicates power, authority, elegance, mystery, and — in some contexts — mourning and negativity. Black is the color of maximum contrast: it absorbs all light and creates the strongest possible visual contrast with white, which is why it is the default color for text and the most legible choice against light backgrounds across virtually every writing system and typographic tradition in human history.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                In luxury branding, black communicates premium quality, exclusivity, and timeless sophistication. The all-black packaging of many luxury brands — Chanel, YSL, Givenchy — signals that the product inside is worth premium pricing. The use of black in luxury retail environments, from matte black shopping bags to black-lacquered display cases, creates an atmosphere of aspiration and restraint that reads as confident rather than austere. Black does not need to shout; it is the color of quiet authority.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                In technology and consumer electronics, black communicates cutting-edge design and premium engineering. Apple's Space Black and Space Gray colorways for iPhones and MacBooks use near-black Pantone references because the color aligns with a vision of precision, minimalism, and modernity. In fashion, black is the universal neutral that never goes out of style — the little black dress is one of the most enduring concepts in fashion history precisely because black neutralizes, anchors, and elevates everything around it.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Culturally, black carries deeply different associations around the world. In Western cultures, it is the color of mourning and funerals; wearing black to a funeral is standard across much of Europe and North America. In China and Japan, white is the mourning color, while black is associated with evil and the unknown. In Nigeria and other African cultures, black often represents age, maturity, and masculinity. In ancient Egypt, black symbolized fertility and the life-giving soil of the Nile delta. Designers working on global brand campaigns must account for these nuances when deploying black as a primary color.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                The specific variant of Pantone black a brand selects matters significantly, and this is a key differentiator that print professionals must understand. A neutral black — like Pantone Black C — reads as balanced, authoritative, and versatile. A cool black with a blue undertone — like Pantone Black 6 C — reads as modern, technical, and forward-thinking, which is why it dominates in technology and luxury fashion contexts. A warm black with a brown undertone — like Pantone Black 4 C — reads as artisanal, organic, and grounded, making it ideal for coffee, leather goods, and craft brands. Understanding and specifying the undertone of your black is just as important as choosing any other color in a brand palette.
              </p>
            </div>
          </section>

          {/* ── SECTION 6: Famous Brands ──────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Famous Brands That Use Black Pantone Colors</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Few brands have made black as iconic as <strong>Chanel</strong>, whose entire visual identity is built on the interplay of <Link href="/brands/chanel/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>Pantone Black C</Link> and white. Since the founding of the house by Gabrielle "Coco" Chanel in the early twentieth century, black has been the defining color of the brand — from the original little black dress to the black-and-white branding of the No. 5 perfume bottle, to the matte black lacquered boxes that define their retail experience worldwide. Chanel's consistent use of Pantone Black C (#2D2926) ensures that this neutral, slightly warm black appears identical whether it is printed on a glossy shopping bag in Paris or a silk garment label in Hong Kong. For Chanel, black is not merely a color — it is the language of timeless elegance.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                <strong>Nike</strong> uses <Link href="/brands/nike/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>Pantone Black 6 C</Link> — the cool, blue-leaning black — in their iconic Swoosh and brand identity applications on white and light backgrounds. The choice of Black 6 C rather than a neutral or warm black is a deliberate design decision: its cool undertone aligns with Nike's positioning as a forward-thinking, performance-driven athletic brand. The blue hue in Black 6 C gives the Swoosh a slight sense of dynamism and modernity that a flat neutral black would not provide. Across Nike's global manufacturing and marketing operations, specifying Pantone Black 6 C ensures that the Swoosh appears with the same cool depth on a running shoe produced in Vietnam and a hoodie printed in the United States.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                <strong>Apple</strong> references <Link href="/brands/apple/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>Pantone Black 6 C</Link> for their Space Black product colorways and packaging elements. Apple's design language has consistently favored cool near-blacks — Space Gray, Space Black — that communicate precision engineering and sophisticated restraint. The blue undertone in Pantone Black 6 C (#101820) aligns perfectly with the cool, polished aesthetic of Apple's aluminum and glass product designs. When Apple uses this shade in printed materials, retail environments, and packaging, the consistency of the Pantone reference ensures the color reads the same way whether it appears on a matte box, a glossy hangtag, or a retail display surface. It is a masterclass in using a subtle undertone to reinforce brand personality at every touchpoint.
              </p>
            </div>
          </section>

          {/* ── SECTION 7: Shades Gallery ─────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Black Pantone Shades — From Deep Black to Dark Gray</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              The black family in the Pantone Matching System spans from near-absolute black (Pantone 6C Black) through the warm and cool variants to near-dark-gray shades. Each variant carries a distinct undertone — neutral, cool, warm brown, or green — that defines its character and suitability for specific brand applications.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {SHADES.map(s => {
                return (
                  <div key={s.code} style={{ flexShrink: 0, width: '7.5rem', borderRadius: '0.875rem', overflow: 'hidden', border: '1.5px solid rgba(0,0,0,0.12)', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Black Pantone: Coated (C) vs. Uncoated (U)</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Black on coated (C) paper stock appears deep, rich, and commanding with maximum contrast. The ink sits on the sealed surface of the paper rather than absorbing into the fibers, which means light reflects off the surface around the black area rather than scattering through ink-saturated fibers. The result is a black that looks truly dense — nearly absolute — with sharp, clean edges that make it ideal for premium packaging, brand identity materials, and any print application where black needs to appear at its most authoritative.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                On uncoated (U) stock, the very same Pantone Black C ink absorbs into the paper surface, spreading slightly and appearing softer, lighter, and with a warmer, sometimes grayish quality. Process Black on uncoated paper is particularly susceptible to this effect — what appears as a true black on coated stock can appear almost charcoal or dark gray on uncoated matte papers, particularly when printing on natural or off-white stocks. This phenomenon is why Pantone publishes separate coated and uncoated swatch books, and why Pantone Black C U (#1C1C1C) has a different HEX reference than its coated counterpart.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                For print professionals specifying black, always match your Pantone reference to your intended substrate. If your print run includes both coated and uncoated stocks — for example, a brand package that includes a glossy outer box and an uncoated inner card — you may need to adjust your black specification for each substrate to achieve perceptually consistent results across the set. <Link href="/learn/coated-vs-uncoated/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>Learn more about coated vs. uncoated Pantone differences.</Link>
              </p>
            </div>
          </section>

          {/* ── SECTION 9: Industries ─────────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>How Black Pantone Is Used Across Industries</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Print &amp; Packaging</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>Black is the absolute foundation of all print and contrast work. In offset lithography, Process Black C is the "K" channel in the CMYK model — it provides depth, shadow, and text legibility across virtually every printed piece ever produced. For brand packaging, Pantone Black C is the standard specification for black elements that must be reproduced consistently across spot-color print runs. Rich black formulas — combining high percentages of all four CMYK channels — are used on large black panels in premium packaging to achieve maximum ink density and visual depth beyond what single-channel K can deliver.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Fashion &amp; Apparel</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>Black is the universal base color in fashion collections worldwide. It appears in every seasonal collection, functions as the neutral anchor in capsule wardrobes, and is the most versatile color in any garment range. In apparel production, black is specified using Pantone TPG (Textile, Paper, Garment) codes to ensure color consistency across different fabrics, dye lots, and manufacturing locations. Fashion designers working with luxury houses specify exact Pantone black variants — distinguishing between a neutral black, a cool blue-black like Black 6 C, or a warm brown-black like Black 4 C — because the undertone of the black affects how it reads alongside other colors in a collection.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Interior Design</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>Black accents define and frame spaces in interior design, functioning as the visual anchor that gives a room its structure and weight. In high-end residential and commercial interiors, black is used in window frames, door frames, fixtures, and furniture legs to create crisp definition against lighter walls and surfaces. Interior designers reference Pantone codes when specifying paints, lacquers, fabrics, and surface treatments to ensure cross-material consistency — that the black of a painted wall reads as the same black as the upholstery fabric and the powder-coated metal fixture in the same room. Near-black Pantone variants like Black 7 C offer a slightly softer dark tone that reads as more livable than absolute black in residential contexts.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Digital &amp; Branding</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>Dark mode interfaces across digital products use near-black Pantone-inspired values rather than pure black (#000000) because absolute black on screen creates harsh, unnatural contrast that causes eye strain. System dark modes — including Apple's macOS and iOS dark mode, Android's dark theme, and Material Design's dark surface specifications — use dark grays and near-blacks that correspond closely to Pantone Black 6 C and Black 7 C in their digital equivalents. For brand identity, the Pantone black serves as the master reference from which all digital HEX and RGB equivalents are derived, ensuring that a brand's black reads consistently whether it appears on a printed business card or a digital banner ad.</p>
              </div>
            </div>
          </section>

          {/* ── SECTION 10: Related Colors ────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Explore Related Pantone Color Families</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
              {[
                { href: '/pantone-white/', label: 'Pantone White', hex: '#F4F5F0', desc: 'Bright whites and off-white tones' },
                { href: '/pantone-purple/', label: 'Pantone Purple', hex: '#440099', desc: 'Rich violet and purple codes' },
              ].map(rel => {
                const light = isLight(rel.hex);
                return (
                  <Link key={rel.href} href={rel.href} style={{ display: 'block', borderRadius: '1rem', overflow: 'hidden', border: '1.5px solid #f3f4f6', textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                    <div style={{ height: '4rem', background: rel.hex, border: rel.hex === '#F4F5F0' ? '1px solid #e5e7eb' : 'none' }} />
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1.25rem' }}>Frequently Asked Questions About Black Pantone</h2>
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
