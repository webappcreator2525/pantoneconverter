import Head from 'next/head';
import ogMeta from '../components/ogMeta';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CrossSystemLinks from '../components/CrossSystemLinks';

const PRIMARY_CODES = [
  { code: 'Pantone Orange 021 C', hex: '#FE5000', rgb: '254, 80, 0', cmyk: '0, 76, 100, 0', use: 'Standard orange reference used in safety equipment and bold packaging' },
  { code: 'Pantone 1505 C', hex: '#FF6820', rgb: '255, 104, 32', cmyk: '0, 60, 93, 0', use: 'Warm medium orange used in food packaging and lifestyle branding' },
  { code: 'Pantone 1655 C', hex: '#FF6A13', rgb: '255, 106, 19', cmyk: '0, 60, 100, 0', use: 'Vivid orange used in sports and energy drink branding' },
  { code: 'Pantone 1665 C', hex: '#E35205', rgb: '227, 82, 5', cmyk: '0, 74, 100, 3', use: 'Deep burnt orange used in autumn collections and harvest branding' },
  { code: 'Pantone 151 C', hex: '#FF8200', rgb: '255, 130, 0', cmyk: '0, 50, 100, 0', use: 'Bright amber-orange used by Harley-Davidson and athletic brands' },
  { code: 'Pantone 716 C', hex: '#E87722', rgb: '232, 119, 34', cmyk: '0, 52, 90, 0', use: 'Warm golden-orange used in Amazon and Hermes branding' },
];

const TABLE_DATA = [
  { code: 'Pantone 1495 C', finish: 'Coated', hex: '#FFB347', rgb: '255, 179, 71', cmyk: '0, 30, 72, 0', hsl: '35°, 100%, 64%', hsb: '35°, 72%, 100%' },
  { code: 'Pantone 151 C', finish: 'Coated', hex: '#FF8200', rgb: '255, 130, 0', cmyk: '0, 50, 100, 0', hsl: '31°, 100%, 50%', hsb: '31°, 100%, 100%' },
  { code: 'Pantone 716 C', finish: 'Coated', hex: '#E87722', rgb: '232, 119, 34', cmyk: '0, 52, 90, 0', hsl: '30°, 79%, 52%', hsb: '30°, 85%, 91%' },
  { code: 'Pantone 1505 C', finish: 'Coated', hex: '#FF6820', rgb: '255, 104, 32', cmyk: '0, 60, 93, 0', hsl: '21°, 100%, 56%', hsb: '21°, 87%, 100%' },
  { code: 'Pantone 1655 C', finish: 'Coated', hex: '#FF6A13', rgb: '255, 106, 19', cmyk: '0, 60, 100, 0', hsl: '22°, 100%, 54%', hsb: '22°, 93%, 100%' },
  { code: 'Pantone Orange 021 C', finish: 'Coated', hex: '#FE5000', rgb: '254, 80, 0', cmyk: '0, 76, 100, 0', hsl: '19°, 100%, 50%', hsb: '19°, 100%, 100%' },
  { code: 'Pantone 1665 C', finish: 'Coated', hex: '#E35205', rgb: '227, 82, 5', cmyk: '0, 74, 100, 3', hsl: '19°, 95%, 45%', hsb: '19°, 98%, 89%' },
  { code: 'Pantone 166 C', finish: 'Coated', hex: '#C8491A', rgb: '200, 73, 26', cmyk: '0, 69, 93, 17', hsl: '17°, 77%, 44%', hsb: '17°, 87%, 78%' },
];

const SHADES = [
  { code: 'Pantone 1485 C', hex: '#FFD4A3', label: 'Lightest' },
  { code: 'Pantone 1495 C', hex: '#FFB347', label: '' },
  { code: 'Pantone 151 C', hex: '#FF8200', label: '' },
  { code: 'Pantone Orange 021 C', hex: '#FE5000', label: '' },
  { code: 'Pantone 1505 C', hex: '#FF6820', label: '' },
  { code: 'Pantone 1655 C', hex: '#FF6A13', label: '' },
  { code: 'Pantone 1665 C', hex: '#E35205', label: '' },
  { code: 'Pantone 166 C', hex: '#C8491A', label: '' },
  { code: 'Pantone 1675 C', hex: '#B33A00', label: '' },
  { code: 'Pantone 483 C', hex: '#8B2500', label: 'Darkest' },
];

const FAQS = [
  {
    q: 'What is the Pantone code for orange?',
    a: 'The foundational Pantone orange is Pantone Orange 021 C, a vivid and intense orange commonly used as a baseline standard for safety and bold packaging. Other popular variations include Pantone 151 C for amber-orange and Pantone 1655 C for sports branding.',
  },
  {
    q: 'What Pantone orange does Amazon use?',
    a: 'Amazon uses Pantone 716 C, a warm, golden-orange hue, for its iconic swoosh/arrow in its logo. This color conveys optimism and friendliness.',
  },
  {
    q: 'What is Pantone Orange 021 C used for?',
    a: 'Pantone Orange 021 C is heavily used in safety equipment, hazard signage, high-visibility clothing, and bold product packaging because it immediately commands attention and is one of the most visible colors in daylight.',
  },
  {
    q: 'How do I convert an orange HEX to Pantone?',
    a: 'Use our free HEX to Pantone converter at pantoneconverter.com/hex-to-pantone/ — paste your HEX value and the tool will instantly find the nearest Pantone match across 2,600+ coated and uncoated swatches.',
  },
  {
    q: 'What industries use orange Pantone colors?',
    a: 'Orange is widely used in food packaging to stimulate appetite, in safety equipment for visibility, in sports and fitness branding to convey energy, and in budget retail branding to communicate approachability and affordability.',
  },
  {
    q: 'Is Pantone orange different on coated vs. uncoated paper?',
    a: 'Yes, orange is highly sensitive to the paper substrate. On coated (glossy) paper, orange appears incredibly vibrant and punchy. On uncoated (matte) paper, it tends to absorb into the fibers, losing saturation and appearing as a softer, more terracotta or muted tone.',
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pantoneconverter.com/" },
    { "@type": "ListItem", "position": 2, "name": "Pantone Orange Colors", "item": "https://pantoneconverter.com/pantone-orange/" },
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
  "name": "Pantone Orange Color Codes, Shades & Conversions",
  "description": "All Pantone orange codes: Pantone Orange 021 C, 151 C, 1655 C & more. Full HEX, RGB, CMYK values, real brand uses & free Pantone color conversion tools.",
  "url": "https://pantoneconverter.com/pantone-orange/",
  "about": { "@type": "Thing", "name": "Pantone Orange Colors" },
  "breadcrumb": breadcrumbSchema,
};

function isLight(hex) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substr(0,2),16);
  const g = parseInt(c.substr(2,2),16);
  const b = parseInt(c.substr(4,2),16);
  return (r*299 + g*587 + b*114) / 1000 > 128;
}

export default function PantoneOrangePage() {
  return (
    <>
      <Head>
        <title>Pantone Orange Color Codes: HEX, RGB, CMYK Values &amp; All Shades</title>
        <meta name="description" content="All Pantone orange codes: Pantone Orange 021 C, 151 C, 1655 C & more. Full HEX, RGB, CMYK values, real brand uses & free Pantone color conversion tools." />
        <link rel="canonical" href="https://pantoneconverter.com/pantone-orange/" />
        <meta property="og:title" content="Pantone Orange Color Codes: HEX, RGB, CMYK Values & All Shades" />
        <meta property="og:description" content="All Pantone orange codes: Pantone Orange 021 C, 151 C, 1655 C & more. Full HEX, RGB, CMYK values, real brand uses & free Pantone color conversion tools." />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
        {ogMeta({ path: '/pantone-orange/' })}
      </Head>

      <NavBar />

      <main style={{ minHeight: '100vh', background: '#fafafa' }}>

        {/* ── SECTION 1: Hero ─────────────────────────────────────── */}
        <div style={{ background: '#FE5000', padding: '4rem 1.5rem 3rem' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto', textAlign: 'center' }}>
            <nav aria-label="Breadcrumb" style={{ marginBottom: '1.5rem' }}>
              <ol style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', listStyle: 'none', margin: 0, padding: 0, fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>
                <li><Link href="/" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>Home</Link></li>
                <li aria-hidden="true" style={{ color: 'rgba(255,255,255,0.4)' }}>›</li>
                <li style={{ color: '#fff' }}>Pantone Orange</li>
              </ol>
            </nav>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: '#fff', margin: '0 0 1rem', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              Pantone Orange Color Codes,<br />Shades &amp; Conversions
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', maxWidth: '44rem', margin: '0 auto 2rem', lineHeight: 1.7 }}>
              Discover the full range of Pantone orange codes, from vivid signal orange to earthy burnt tones. Find exact HEX, RGB, and CMYK values, see real-world brand applications, and use our free color matching tools.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/hex-to-pantone/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', background: '#fff', color: '#FE5000', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                Convert an Orange Code →
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Primary Pantone Orange Codes</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.75rem', lineHeight: 1.7 }}>
              The six most recognizable Pantone orange codes used in global branding, from high-visibility safety orange to warm golden tones.
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Orange Pantone Color Values — Complete Reference</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>Full color values for 8 Pantone orange variants, including detailed HSL and HSB specifications for digital designers.</p>
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
              Note: Screen rendering of vivid orange (RGB) often differs slightly from print output (CMYK). Always request a physical proof. <Link href="/learn/coated-vs-uncoated/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>Learn more about coated vs. uncoated Pantone differences.</Link>
            </p>
          </section>

          {/* ── SECTION 4: Converter Widget ───────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Convert an Orange Pantone Code</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>Use our tools to accurately convert orange Pantone codes to HEX, RGB, or CMYK — or reverse match your custom orange to a Pantone standard.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.875rem' }}>
              {[
                { href: '/hex-to-pantone/', label: 'HEX to Pantone', desc: 'Find the closest orange PMS match for any HEX' },
                { href: '/pantone-to-hex/', label: 'Pantone to HEX', desc: 'Get the HEX code for any Pantone orange' },
                { href: '/pantone-to-rgb/', label: 'Pantone to RGB', desc: 'Convert Pantone orange codes to RGB values' },
                { href: '/pantone-to-cmyk/', label: 'Pantone to CMYK', desc: 'Get CMYK breakdown for any orange PMS code' },
                { href: '/rgb-to-pantone/', label: 'RGB to Pantone', desc: 'Match your RGB orange to a Pantone code' },
                { href: '/cmyk-to-pantone/', label: 'CMYK to Pantone', desc: 'Convert CMYK orange values to the closest PMS' },
              ].map(tool => (
                <Link key={tool.href} href={tool.href} style={{ display: 'block', background: '#fff', border: '1.5px solid #f3f4f6', borderRadius: '1rem', padding: '1.1rem', textDecoration: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#fb923c'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(254,80,0,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#f3f4f6'; e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'none'; }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111827', marginBottom: '0.3rem' }}>{tool.label}</div>
                  <div style={{ fontSize: '0.78rem', color: '#6b7280', lineHeight: 1.5 }}>{tool.desc}</div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── SECTION 5: Color Psychology ───────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>What Does Orange Mean? Psychology &amp; Symbolism</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Orange occupies a unique position in color psychology as the combination of red’s energy and yellow’s warmth. It is the color of enthusiasm, creativity, adventure, and social interaction. Unlike red, which can feel aggressive or urgent, orange maintains an approachable energy that feels playful, confident, and inviting. Orange is one of the most visible colors in the natural world — think autumn leaves, sunsets, and tropical fruits — which contributes to its associations with harvest, abundance, and warmth.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                In marketing psychology, orange combines the appetite-stimulating qualities of red with the optimism of yellow, making it highly effective in food and beverage contexts. It also communicates value and affordability when used in retail settings, which is why many budget-oriented or accessible brands use orange to signal deals, discounts, and friendliness. It removes the intimidation factor from shopping.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Culturally, orange has different resonances: in Western cultures it is associated with Halloween, autumn, and both creativity and caution (due to high-visibility gear); in Hinduism, orange (specifically saffron) is sacred and worn by monks; in the Netherlands, orange is a national color tied to the royal House of Orange and worn proudly during national events; in Ireland, orange has political significance as part of the flag’s three colors representing the Protestant tradition.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                Different shades of orange communicate distinct personalities: vivid oranges like Pantone Orange 021 C feel bold, loud, and direct; amber-oranges like Pantone 716 C feel warm, premium, and reliable; burnt oranges like Pantone 1665 C feel earthy, seasonal, and artisanal. Brands leverage these specific shades to dial in exactly the right amount of energy.
              </p>
            </div>
          </section>

          {/* ── SECTION 6: Famous Brands ──────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Famous Brands That Use Orange Pantone Colors</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                <strong>Amazon</strong> uses a golden-orange hue, closely aligned with Pantone 716 C, as its signature accent color. This orange appears most famously in the logo’s swoosh/arrow, which points from ‘A’ to ‘Z’ while also forming a subtle smile. The warm, golden-orange communicates optimism, friendliness, and the delight of receiving a delivery — balancing the cool, corporate reliability of their primary dark text.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                <strong>Fanta</strong> relies on a vivid, high-energy orange (similar to Pantone Orange 021 C and 1505 C) to communicate refreshment, fruit flavor, and youthful exuberance. Their use of this specific Pantone range ensures that the product feels energetic and highly visible on crowded supermarket shelves globally.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                <strong>Harley-Davidson</strong> uses a bright amber-orange (Pantone 151 C) as a key brand color alongside their signature black. This specific orange represents the warmth of the open road, the heat of the engine, and classic American manufacturing heritage. It provides the perfect high-visibility contrast to their dark, rugged branding elements.
              </p>
            </div>
          </section>

          {/* ── SECTION 7: Shades Gallery ─────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Orange Pantone Shades — From Light to Dark</h2>
            <p style={{ color: '#4b5563', marginBottom: '1.5rem', lineHeight: 1.7 }}>
              The orange family transitions seamlessly from soft peach and apricot tones to intense neon oranges, and down into deep terracotta and rust shades.
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
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Orange Pantone: Coated (C) vs. Uncoated (U)</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                Orange Pantone colors exhibit a significant shift in appearance depending on the paper stock they are printed on. On coated (C) stock — which is glossy or satin-finished — orange inks achieve maximum vibrancy, punch, and saturation. A color like Pantone Orange 021 C will look practically electric, leaping off the page. This is the desired effect for high-impact packaging and marketing collateral.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, marginBottom: '1.2rem', fontSize: '0.95rem' }}>
                On uncoated (U) stock — such as standard matte paper or textured stationery — the porous nature of the paper absorbs the orange ink. This diminishes the color’s luminosity, often causing bright oranges to shift toward a warmer, more muted terracotta or dusty apricot tone. The high-energy impact is softened considerably.
              </p>
              <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem' }}>
                Because of this dramatic variance, designers must always proof their orange colors carefully. If your brand relies on a highly saturated orange, you may struggle to achieve the same visual impact on uncoated business cards or natural-finish packaging. <Link href="/learn/coated-vs-uncoated/" style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>Learn more about coated vs. uncoated Pantone differences.</Link>
              </p>
            </div>
          </section>

          {/* ── SECTION 9: Industries ─────────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>How Orange Pantone Is Used Across Industries</h2>
            <div style={{ background: '#fff', borderRadius: '1.25rem', border: '1.5px solid #f3f4f6', padding: '2rem', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Print &amp; Packaging</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>Orange is heavily utilized in high-visibility warning labels, safety manuals, and industrial packaging where immediate attention is required. Conversely, it is also a dominant color in food packaging, particularly for snacks and citrus-flavored beverages, because it naturally evokes warmth, freshness, and appetite stimulation.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Fashion &amp; Apparel</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>In fashion, orange is a seasonal staple, strongly associated with autumn collections where burnt oranges and terracotta tones dominate. However, bright neon oranges also feature prominently in activewear, athletic shoes, and streetwear to convey high energy and motion.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Interior Design</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>Interior designers use deep, earthy oranges (like terracotta, rust, and clay) to create warm, inviting, and grounded spaces. Brighter oranges are occasionally used as accent colors in creative agency offices or dynamic startup environments to foster energy and collaborative thinking.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>Digital &amp; Branding</h3>
                <p style={{ color: '#374151', lineHeight: 1.85, fontSize: '0.95rem', margin: 0 }}>In UI/UX design, orange is a highly effective color for Call-To-Action (CTA) buttons, providing excellent contrast against white or dark backgrounds without the negative or warning connotations often associated with red. Brands seeking an approachable, friendly, or value-driven identity often adopt orange as a primary brand color.</p>
              </div>
            </div>
          </section>

          {/* ── SECTION 10: Related Colors ────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1rem' }}>Explore Related Pantone Color Families</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
              {[
                { href: '/pantone-red/', label: 'Pantone Red', hex: '#C8102E', desc: 'Bold, passionate red shades' },
                { href: '/pantone-yellow/', label: 'Pantone Yellow', hex: '#FFED00', desc: 'Bright, optimistic yellow tones' },
                { href: '/pantone-gold/', label: 'Pantone Gold', hex: '#FFB81C', desc: 'Premium luxury gold colors' },
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
              heading="Pantone Orange in Other Colour Systems"
              intro="A Pantone number only helps if your supplier works in Pantone. If this orange is heading for paint, thread, vinyl or fabric, these converters find the nearest code in the system that supplier actually uses — each one reporting how close the match really is."
              routes={[
              '/pantone-to-ral/',
              '/pantone-to-oracal/',
              '/pantone-to-siser-htv/',
              '/pantone-to-copic/',
              '/pantone-c-to-tcx/',
              ]}
              accentColor="#c44eed"
            />
          </div>

          {/* ── SECTION 11: FAQ ───────────────────────────────────── */}
          <section>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111827', marginBottom: '1.25rem' }}>Frequently Asked Questions About Orange Pantone</h2>
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
