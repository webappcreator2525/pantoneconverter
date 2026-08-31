import Head from 'next/head';
import ogMeta from '../components/ogMeta';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { breadcrumbSchemaFor } from '../components/Breadcrumb';
import CrossSystemLinks from '../components/CrossSystemLinks';

const PRIMARY_CODES = [
  { code: 'Pantone Violet C', hex: '#440099', rgb: '68, 0, 153', cmyk: '100, 100, 0, 0', use: 'Standard violet purple used in arts and entertainment branding' },
  { code: 'Pantone 2685 C', hex: '#330072', rgb: '51, 0, 114', cmyk: '96, 100, 0, 0', use: 'Deep royal purple used in Cadbury chocolate branding' },
  { code: 'Pantone 267 C', hex: '#522398', rgb: '82, 35, 152', cmyk: '81, 100, 0, 0', use: 'Medium purple used in luxury and beauty brand identities' },
  { code: 'Pantone 2745 C', hex: '#26147E', rgb: '38, 20, 126', cmyk: '100, 97, 0, 10', use: 'Dark indigo-purple used in premium financial and tech branding' },
  { code: 'Pantone 519 C', hex: '#5C2D82', rgb: '92, 45, 130', cmyk: '73, 97, 0, 15', use: 'Medium-dark purple for premium creative industry brands' },
  { code: 'Pantone 2593 C', hex: '#9B26AF', rgb: '155, 38, 175', cmyk: '49, 87, 0, 0', use: 'Vivid magenta-purple used in bold digital branding' },
];

const TABLE_DATA = [
  { code: 'Pantone 2573 C', finish: 'Coated', hex: '#C4A4D4', rgb: '196, 164, 212', cmyk: '7, 23, 0, 17', hsl: '284°, 35%, 74%', hsb: '284°, 23%, 83%' },
  { code: 'Pantone 2593 C', finish: 'Coated', hex: '#9B26AF', rgb: '155, 38, 175', cmyk: '49, 87, 0, 0', hsl: '291°, 64%, 42%', hsb: '291°, 78%, 69%' },
  { code: 'Pantone 519 C', finish: 'Coated', hex: '#5C2D82', rgb: '92, 45, 130', cmyk: '73, 97, 0, 15', hsl: '276°, 49%, 34%', hsb: '276°, 65%, 51%' },
  { code: 'Pantone 267 C', finish: 'Coated', hex: '#522398', rgb: '82, 35, 152', cmyk: '81, 100, 0, 0', hsl: '265°, 63%, 37%', hsb: '265°, 77%, 60%' },
  { code: 'Pantone Violet C', finish: 'Coated', hex: '#440099', rgb: '68, 0, 153', cmyk: '100, 100, 0, 0', hsl: '264°, 100%, 30%', hsb: '264°, 100%, 60%' },
  { code: 'Pantone 2685 C', finish: 'Coated', hex: '#330072', rgb: '51, 0, 114', cmyk: '96, 100, 0, 0', hsl: '261°, 100%, 22%', hsb: '261°, 100%, 45%' },
  { code: 'Pantone 2745 C', finish: 'Coated', hex: '#26147E', rgb: '38, 20, 126', cmyk: '100, 97, 0, 10', hsl: '249°, 73%, 29%', hsb: '249°, 84%, 49%' },
  { code: 'Pantone 2768 C', finish: 'Coated', hex: '#1B1464', rgb: '27, 20, 100', cmyk: '100, 100, 0, 36', hsl: '243°, 67%, 24%', hsb: '243°, 80%, 39%' },
];

const SHADES = [
  { code: 'Pantone 2562 C', hex: '#E8C8F0', label: 'Lightest' },
  { code: 'Pantone 2573 C', hex: '#C4A4D4', label: '' },
  { code: 'Pantone 2593 C', hex: '#9B26AF', label: '' },
  { code: 'Pantone 2665 C', hex: '#7C3AED', label: '' },
  { code: 'Pantone 267 C', hex: '#522398', label: '' },
  { code: 'Pantone 519 C', hex: '#5C2D82', label: '' },
  { code: 'Pantone Violet C', hex: '#440099', label: '' },
  { code: 'Pantone 2685 C', hex: '#330072', label: '' },
  { code: 'Pantone 2745 C', hex: '#26147E', label: '' },
  { code: 'Pantone 2768 C', hex: '#1B1464', label: 'Darkest' },
];

const FAQS = [
  {
    q: 'What is the most popular Pantone purple?',
    a: 'Pantone Violet C (#440099) is the most widely recognised Pantone purple in print and branding contexts — it is the standard reference for a vivid, saturated violet-purple. However, Pantone 2685 C (#330072) may be the most famous individual shade globally due to its association with the Cadbury brand. For medium-range purples, Pantone 267 C and Pantone 519 C are frequently specified across luxury, beauty, and creative industries.',
  },
  {
    q: 'What Pantone purple does Cadbury use?',
    a: 'Cadbury uses Pantone 2685 C as its signature brand purple — a deep, rich royal purple with HEX value #330072. This particular shade has become so strongly associated with the Cadbury brand that it has been the subject of trademark disputes in several markets, with Cadbury successfully defending its exclusive use of the colour in confectionery packaging in the UK and Australia. The colour communicates indulgence, heritage, and premium quality.',
  },
  {
    q: 'What is the difference between Pantone Violet C and Pantone 2685 C?',
    a: 'Pantone Violet C (#440099) is a slightly lighter and more vibrant violet-purple, with a hue that leans toward blue-violet. Pantone 2685 C (#330072) is darker, deeper, and richer — it has less blue in its mixture and appears more definitively purple. In practical terms, Violet C feels more dynamic and contemporary, while 2685 C feels more regal, traditional, and luxurious. Both are full-saturation purples with zero yellow component in their CMYK values.',
  },
  {
    q: 'How do I convert a purple HEX to Pantone?',
    a: 'Use our free HEX to Pantone converter at pantoneconverter.com/hex-to-pantone/ — paste your purple HEX code and the tool instantly finds the nearest Pantone match across 2,600+ coated and uncoated swatches. Because purples are notoriously difficult to match due to the complexity of the magenta-blue gamut, always verify results against a physical Pantone swatch book, especially for brand-critical applications.',
  },
  {
    q: 'Why is purple difficult to print consistently?',
    a: 'Purple is one of the most challenging colors to reproduce consistently in print because it sits at the intersection of the blue and magenta ink channels in CMYK. Small variations in ink density, paper absorbency, and press calibration can cause significant shifts in a purple\'s perceived hue — a purple can easily drift toward blue, magenta, or brown depending on conditions. Pantone spot colors bypass this problem by using a pre-mixed ink formula, which is why specifying Pantone purple codes (rather than CMYK builds) is strongly recommended for brand-critical purple applications.',
  },
  {
    q: 'Is Pantone purple different on coated vs. uncoated paper?',
    a: 'Yes — and significantly more so than many other colors. Deep purples like Pantone 2685 C can appear dull, brownish, and dramatically different on uncoated stock compared to their vivid, rich appearance on coated paper. The blue component of purple inks is particularly sensitive to paper absorption. On uncoated paper, the ink spreads into the fibers and loses saturation, causing deep purples to shift toward a murky grey-purple or brownish tone. Always request proofs on the actual paper stock before committing to a purple print run. Specify the U suffix for uncoated versions of any purple Pantone code.',
  },
];

const breadcrumbSchema = breadcrumbSchemaFor('/pantone-purple/', 'Pantone Purple');

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
  "name": "Pantone Purple Color Codes, Shades & Conversions",
  "description": "Explore all Pantone purple codes: Pantone Violet C, 267 C, 2685 C & more. HEX, RGB, CMYK reference, brand examples & free Pantone conversion tools.",
  "url": "https://pantoneconverter.com/pantone-purple/",
  "about": { "@type": "Thing", "name": "Pantone Purple Colors" },
  "breadcrumb": breadcrumbSchema,
};

function isLight(hex) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substr(0,2),16);
  const g = parseInt(c.substr(2,2),16);
  const b = parseInt(c.substr(4,2),16);
  return (r*299 + g*587 + b*114) / 1000 > 128;
}

export default function PantonePurplePage() {
  return (
    <>
      <Head>
        <title>Pantone Purple Color Codes: HEX, RGB, CMYK Values &amp; All Shades</title>
        <meta name="description" content="Explore all Pantone purple codes: Pantone Violet C, 267 C, 2685 C & more. HEX, RGB, CMYK reference, brand examples & free Pantone conversion tools." />
        <link rel="canonical" href="https://pantoneconverter.com/pantone-purple/" />
        <meta property="og:title" content="Pantone Purple Color Codes: HEX, RGB, CMYK Values & All Shades" />
        <meta property="og:description" content="Explore all Pantone purple codes: Pantone Violet C, 267 C, 2685 C & more. HEX, RGB, CMYK reference, brand examples & free Pantone conversion tools." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        {ogMeta({ path: '/pantone-purple/' })}
      </Head>

      <NavBar />

      <main style={{ minHeight: '100vh', background: '#fafafa' }}>

        {/* ── SECTION 1: Hero ─────────────────────────────────────── */}
        <div style={{ background: '#440099', padding: '4rem 1.5rem 3rem' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto', textAlign: 'center' }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
              <ol style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', listStyle: 'none', margin: 0, padding: 0, fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>
                <li><Link href="/" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>Home</Link></li>
                <li aria-hidden="true" style={{ color: 'rgba(255,255,255,0.4)' }}>›</li>
                <li style={{ color: '#fff' }}>Pantone Purple</li>
              </ol>
            </nav>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', margin: '0 0 1rem', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              Pantone Purple Color Codes,<br />Shades &amp; Conversions
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', maxWidth: '44rem', margin: '0 auto 2rem', lineHeight: 1.7 }}>
              This page covers the most important Pantone codes in the purple family — including Pantone Violet C, 2685 C, 267 C, and 519 C — with their HEX, RGB, and CMYK equivalents. Explore real-world brand uses, psychological associations, and free conversion tools.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/hex-to-pantone/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: '#fff', color: '#440099', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                Convert a Purple Code →
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Primary Pantone Purple Codes</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.75rem', lineHeight: 1.7 }}>
              The six most widely used Pantone purple codes across branding, packaging, print, and design. Each includes verified HEX, RGB, and CMYK values.
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Purple Pantone Color Values — Complete Reference</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>Full color values for 8 Pantone purple codes, from soft lilac tints to the deepest midnight indigo-purples, all on coated stock.</p>
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Convert a Purple Pantone Code</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>Use our free tools to convert any purple Pantone code to HEX, RGB, or CMYK — or find the closest Pantone match for a purple you already have.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.875rem' }}>
              {[
                { href: '/hex-to-pantone/', label: 'HEX to Pantone', desc: 'Find the closest purple PMS match for any HEX' },
                { href: '/pantone-to-hex/', label: 'Pantone to HEX', desc: 'Get the HEX code for any Pantone purple' },
                { href: '/pantone-to-rgb/', label: 'Pantone to RGB', desc: 'Convert Pantone purple codes to RGB values' },
                { href: '/pantone-to-cmyk/', label: 'Pantone to CMYK', desc: 'Get CMYK breakdown for any purple PMS code' },
                { href: '/rgb-to-pantone/', label: 'RGB to Pantone', desc: 'Match your RGB purple to a Pantone code' },
                { href: '/cmyk-to-pantone/', label: 'CMYK to Pantone', desc: 'Convert CMYK purple values to the closest PMS' },
              ].map(tool => (
                <Link key={tool.href} href={tool.href} style={{ display: 'block', background: '#fff', border: '1.5px solid #f3f4f6', borderRadius: '1rem', padding: '1.1rem', textDecoration: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#c4b5fd'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(68,0,153,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#f3f4f6'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'none'; }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111827', marginBottom: '0.3rem' }}>{tool.label}</div>
                  <div style={{ fontSize: '0.78rem', color: '#6b7280', lineHeight: 1.5 }}>{tool.desc}</div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── SECTION 5: Color Psychology ───────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>What Does Purple Mean? Psychology &amp; Symbolism</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Purple is the color of royalty, creativity, mystery, and spirituality — and its luxury associations are rooted not in convention but in extraordinary historical scarcity. For most of human history, purple pigment was derived from the mucus glands of thousands of Murex sea snails, a laborious process that made a single ounce of Tyrian purple more expensive than gold. Roman emperors, Byzantine rulers, and medieval kings reserved purple garments as a marker of supreme power, and the phrase “born to the purple” entered the English language as a synonym for being born into royalty. This centuries-long association between purple and exclusive power is the foundation on which every modern purple brand strategy is built.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                In contemporary design, purple communicates creativity, imagination, wisdom, and premium quality with unusual versatility. It is one of the few colors that functions equally well in spiritual and luxury contexts — you will find it used by meditation apps and premium confectionery brands alike, communicating something entirely different in each case while drawing on the same underlying emotional associations. Vivid, saturated purples like Pantone Violet C feel bold, dynamic, and creative; they are the purples of entertainment brands, creative platforms, and digital innovation. Deep, dark purples like Pantone 2685 C feel regal, exclusive, and indulgent — these are the purples of luxury goods, premium chocolates, and high-end personal care.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Soft lilac purples like Pantone 2562 C communicate romance, gentleness, and femininity — they are widely used in beauty, skincare, and wellness branding where approachability and softness are valued. The specific shade of purple chosen for a brand identity carries enormous meaning: the difference of a few percentage points in saturation or brightness can shift a purple from feeling luxurious to feeling cheap, from feeling mysterious to feeling juvenile. This sensitivity is one reason why purple requires particularly careful Pantone specification — the exact code matters more than with many other colors.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                Cultural associations with purple vary significantly around the world, and designers working on global campaigns must account for these nuances. In Western culture, purple represents royalty, dignity, and spirituality. In Japan, purple represents wealth and privilege. In Thailand, purple is traditionally worn by widows in mourning. In some Latin American cultures, purple carries associations with death and religious mourning. Purple is also strongly associated with gender-neutral identity and LGBTQ+ pride in contemporary Western culture, with deep violets appearing prominently in pride flag designs. For brands with global ambitions, purple’s universally premium associations make it a strong choice, but local cultural research is essential before committing to a purple identity in any specific market.
              </p>
            </div>
          </section>

          {/* ── SECTION 6: Famous Brands ──────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Famous Brands That Use Purple Pantone Colors</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                No brand has made purple more iconic than <strong>Cadbury</strong>, whose signature shade — Pantone 2685 C, HEX #330072 — has been the cornerstone of their visual identity since 1914. The deep, rich royal purple was originally chosen to honour Queen Victoria, and it has remained central to Cadbury’s packaging ever since. The connection between this specific purple and premium chocolate is so powerful that Cadbury has pursued and won trademark protection for the color in several jurisdictions, preventing competitors from using similar shades on chocolate packaging. Cadbury’s purple communicates indulgence, heritage, and generosity — it is one of the clearest examples in branding history of a single Pantone color becoming synonymous with an entire product category.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                <strong>Hallmark</strong>, the world’s largest greeting card company, uses a deep purple aligned with Pantone 2685 C as its primary brand color. For Hallmark, purple communicates sentiment, care, and the premium nature of gift-giving — it is a color associated with meaningful personal moments. Hallmark’s purple identity reinforces its positioning as a brand that helps people express what matters most, drawing on purple’s associations with thoughtfulness, dignity, and emotional significance. The consistency of Hallmark’s purple across decades of packaging, storefronts, and media advertising demonstrates the long-term power of a well-chosen Pantone color in building brand recognition.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                <strong>Milka</strong>, the beloved European chocolate brand owned by Mondelez International, uses a distinctive lilac purple — closely aligned with Pantone 2573 C (#C4A4D4) — that is unlike any other confectionery brand in the world. Where Cadbury uses a deep, saturated royal purple, Milka uses a soft, gentle lilac that communicates Alpine freshness, tenderness, and approachability. The lighter purple differentiates Milka sharply from the darker, more serious chocolate brands on shelf, appealing to a broader and younger audience. Milka’s lilac is applied across packaging, advertising, and even its mascot cow, making it one of the most recognizable soft-purple brand identities in Europe. Together, Cadbury and Milka demonstrate how two very different shades within the purple family can communicate entirely different brand personalities while both occupying premium positioning in the same product category.
              </p>
            </div>
          </section>

          {/* ── SECTION 7: Shades Gallery ─────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Purple Pantone Shades — From Light to Dark</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              The purple family in the Pantone Matching System spans from Pantone 2562 C (a soft, barely-there lavender) to Pantone 2768 C (a deep midnight indigo-purple). Lighter tints communicate romance, softness, and approachability, while the deepest shades project authority, mystery, and exclusivity.
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Purple Pantone: Coated (C) vs. Uncoated (U)</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Purple Pantone colors are among the most notoriously sensitive to paper stock of any color family in the PMS system. On coated (C) paper — glossy, matte-coated, or satin stocks — purples appear at their full richness. The ink rests on the surface of the coated sheet and the blue-magenta balance that creates a beautiful, saturated purple is maintained precisely. A deep Pantone 2685 C on coated stock is a powerful, jewel-like royal purple; it reads with unmistakable authority and richness.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                On uncoated (U) paper — including matte, offset, and natural stocks — the situation changes dramatically. Purple inks are particularly vulnerable to the absorption that occurs with uncoated papers because both the blue and magenta channels spread and lose saturation as they are absorbed into the paper fibers. Deep purples like Pantone 2685 C can appear dull, brownish, and completely lacking the vibrancy of their coated equivalents. A purple that communicates luxury and indulgence on coated stock can look muddy and uninspiring on uncoated stock. This makes pre-press proofing on the actual paper stock absolutely non-negotiable for any purple print project.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                Always specify the U suffix when ordering uncoated purple Pantone prints, and request a press proof before committing to a full production run. For premium brand applications, coated stock is strongly recommended to preserve the full impact of purple’s luxury associations. For textile applications, purple PMS colors are available in the Pantone TPG (Textile, Paper, Garment) system — consult your supplier for the appropriate TPG equivalents when producing purple garments or soft goods. <Link href="/learn/coated-vs-uncoated/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>Learn more about coated vs. uncoated Pantone differences.</Link>
              </p>
            </div>
          </section>

          {/* ── SECTION 9: Industries ─────────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>How Purple Pantone Is Used Across Industries</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Print &amp; Packaging</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>Purple requires particular expertise in print production. Because purple sits at the intersection of blue and magenta ink channels in CMYK, it is highly sensitive to press calibration and ink density. Even small variations in ink weight can cause a purple to drift toward blue or magenta, making Pantone spot color specification — rather than a CMYK build — essential for any brand-critical purple application. Confectionery, luxury cosmetics, and premium gift packaging are the most common categories to use deep Pantone purples; the color communicates indulgence and premium quality that translates directly to perceived product value on shelf.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Fashion &amp; Apparel</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>Purple is cyclically trendy in fashion while maintaining a consistent presence in luxury and formal segments. The Pantone Fashion Color Trend Report has featured purple shades — from bold royal purples to soft lavenders and dusty lilacs — across multiple seasons in recent years, reflecting broader cultural interest in gender-neutral and maximalist dressing. In apparel production, purple is specified using Pantone TPG (Textile, Paper, Garment) codes, which account for the different behavior of dyes on fabric versus inks on paper. Deep purples such as violet and royal purple are perennial staples in eveningwear, while lavender and lilac purples appear frequently in spring and summer collections.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Interior Design</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>In interior design, deep purples are primarily used as dramatic accent colors that add depth, mystery, and a sense of opulence to spaces. A feature wall in Pantone 2685 C or Pantone 519 C creates an immediate focal point and communicates sophisticated taste. Soft lavenders and lilacs, by contrast, are used in bedroom and wellness spaces where a calming, romantic atmosphere is desired. Interior designers reference Pantone color codes when specifying paints, fabrics, wallcoverings, and surface treatments — the ability to communicate an exact Pantone code ensures consistent color across all materials from different suppliers.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Digital &amp; Branding</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>In digital branding, purple is increasingly popular among creative platforms, premium subscription services, and technology brands seeking to communicate sophistication and imagination. Purple sits in an uncrowded area of the brand color spectrum — most major technology brands default to blue, making purple an effective differentiator. Twitch, the live streaming platform, uses a purple identity to communicate creativity and community. In the premium subscription economy, purple signals exclusivity. Designers working in digital contexts derive their screen HEX and RGB values from the master Pantone code, ensuring that physical print materials and digital touchpoints remain as consistent as possible across different display environments.</p>
              </div>
            </div>
          </section>

          {/* ── SECTION 10: Related Colors ────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Explore Related Pantone Color Families</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
              {[
                { href: '/pantone-red/', label: 'Pantone Red', hex: '#C8102E', desc: 'Bold, vibrant red shades' },
                { href: '/pantone-blue/', label: 'Pantone Blue', hex: '#003DA5', desc: 'Classic and navy blue tones' },
                { href: '/pantone-pink/', label: 'Pantone Pink', hex: '#FF3EB5', desc: 'Vivid to blush pink tones' },
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
              heading="Pantone Purple in Other Colour Systems"
              intro="A Pantone number only helps if your supplier works in Pantone. If this purple is heading for paint, thread, vinyl or fabric, these converters find the nearest code in the system that supplier actually uses — each one reporting how close the match really is."
              routes={[
              '/pantone-to-ral/',
              '/pantone-to-copic/',
              '/pantone-to-dmc/',
              '/pantone-to-benjamin-moore/',
              '/pantone-c-to-tcx/',
              ]}
              accentColor="#c44eed"
            />
          </div>

          {/* ── SECTION 11: FAQ ───────────────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1.25rem' }}>Frequently Asked Questions About Purple Pantone</h2>
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
