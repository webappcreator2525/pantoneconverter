import Head from 'next/head';
import Link from 'next/link';
import ogMeta from '../components/ogMeta';
import { useState, useEffect, useMemo } from 'react';
import { Circle, RefreshCw } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Breadcrumb, { buildTrail, breadcrumbSchema } from '../components/Breadcrumb';
import MatchCard from '../components/MatchCard';
import CoatedUncoatedComparison from '../components/CoatedUncoatedComparison';
import FAQSection from '../components/FAQSection';
import pantoneDb from '../data/pantone.json';
import { isLightColor, getMatchesFromRgb, rgbToHex } from '../lib/colorUtils';

const COATED_DB   = pantoneDb.filter(e => e.collection === 'coated');
const UNCOATED_DB = pantoneDb.filter(e => e.collection === 'uncoated');

function NumInput({ id, label, value, onChange, color }) {
  const pct = Math.round((Math.min(Math.max(Number(value) || 0, 0), 255) / 255) * 100);
  return (
    <div>
      <label htmlFor={id} className="input-label" style={{ color }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <input
          id={id} type="number" min="0" max="255" value={value}
          onChange={e => onChange(e.target.value)}
          className="input-field" placeholder="0"
          style={{ paddingRight: '3.5rem' }}
        />
        <span style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.7rem', fontWeight: 700, color: '#6b7280', pointerEvents: 'none' }}>
          /255
        </span>
      </div>
      <div style={{ marginTop: '0.3rem', height: '3px', background: '#f3f4f6', borderRadius: '9999px', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '9999px', transition: 'width 0.2s ease' }} />
      </div>
    </div>
  );
}

export default function RgbToPantone() {
  const [R, setR] = useState('200');
  const [G, setG] = useState('16');
  const [B, setB] = useState('46');
  const [surface, setSurface] = useState('coated');

  const clamp = v => Math.min(255, Math.max(0, Number(v) || 0));

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const queryR = params.get('r');
      const queryG = params.get('g');
      const queryB = params.get('b');
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (queryR !== null) setR(clamp(queryR).toString());
      if (queryG !== null) setG(clamp(queryG).toString());
      if (queryB !== null) setB(clamp(queryB).toString());
    }
  }, []);
  
  const r = clamp(R), g = clamp(G), b = clamp(B);
  const previewHex = rgbToHex(r, g, b);
  const isLight    = isLightColor(previewHex);
  const textColor  = isLight ? '#1f2937' : '#ffffff';
  const subColor   = isLight ? 'rgba(0,0,0,0.45)' : 'rgba(255,255,255,0.65)';

  const matches = useMemo(() => {
    const db = surface === 'coated' ? COATED_DB : UNCOATED_DB;
    return getMatchesFromRgb(r, g, b, db, 5);
  }, [r, g, b, surface]);

  const trail = buildTrail('/rgb-to-pantone/', 'RGB to Pantone');
  const breadcrumbData = breadcrumbSchema(trail);

  const faqItems = [
    {
      question: "Is this RGB to Pantone converter free?",
      answer: "Yes, this converter is completely free to use. There are no daily limits, subscriptions, or login requirements. The tool processes colors instantly within your browser, ensuring quick and private matching."
    },
    {
      question: "How accurate is RGB to Pantone conversion?",
      answer: "We use perceptually-weighted color distance algorithms in the CIE Lab space to find the mathematically closest Pantone match. However, since RGB is an additive light model and Pantone relies on physical spot inks, direct 1:1 conversion isn't always possible. A physical swatch book is essential for final verification."
    },
    {
      question: "What is the difference between RGB and PMS colors?",
      answer: "RGB (Red, Green, Blue) is an additive color model used for digital screens, combining light to create colors. PMS (Pantone Matching System) is a standardized spot color ink system used in commercial printing. Bridging them requires specialized conversion algorithms to align screen colors with physical inks."
    },
    {
      question: "Why does my Pantone print look different from my screen?",
      answer: "Monitors emit light (RGB) while paper absorbs light and reflects a printed ink (PMS). Furthermore, the finish of the paper—coated or uncoated—drastically impacts how the ink appears. Monitor calibration and varying color gamuts also contribute to differences between screen and print."
    },
    {
      question: "Should I use coated or uncoated Pantone for business cards?",
      answer: "It depends on the paper stock you select. If you print on glossy, smooth, or coated paper, use Coated (C) Pantone colors for a more vibrant result. If you choose matte, textured, or uncoated stock, specify Uncoated (U) Pantone colors to accurately reflect how the ink will absorb."
    },
    {
      question: "How many Pantone colors exist in the PMS system?",
      answer: "The standard Pantone Matching System (PMS) library for graphic arts includes over 2,300 unique solid colors. This tool searches across 2,600+ data points for coated and uncoated variations to bring you the best possible print match."
    },
    {
      question: "Can I get an exact Pantone match for any RGB value?",
      answer: "Not always. The RGB color space encompasses millions of colors, many of which are highly saturated and fall outside the printable gamut of standard inks. In these cases, the converter identifies the nearest possible printable approximation."
    },
    {
      question: "What is ΔE, and how does it affect color matching?",
      answer: "ΔE (Delta E) is a metric that measures the visual distance between two colors. A lower ΔE indicates a closer match. Our tool uses ΔE*00 formulas to ensure that the closest Pantone color returned aligns closely with how the human eye perceives the difference."
    },
    {
      question: "Is this tool's data official Pantone data?",
      answer: "No, this tool provides an approximation using publicly available color data and standard algorithms. It is not affiliated with, endorsed by, or certified by Pantone LLC. Always use official Pantone guides for exact color matching."
    },
    {
      question: "How do I verify my Pantone color before printing?",
      answer: "To ensure perfect accuracy, always cross-reference the suggested PMS code with an official physical Pantone Formula Guide swatch book under standard lighting conditions (D50) before finalizing print production files."
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "RGB to Pantone Converter",
        "url": "https://pantoneconverter.com/rgb-to-pantone/",
        "applicationCategory": "DesignApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript",
        "description": "Convert RGB color values to the closest Pantone PMS color instantly. Free, no login, browser-based matching across 2600+ Pantone swatches.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Top 5 closest Pantone PMS matches",
          "Coated and uncoated swatch comparison",
          "CMYK, RGB, and HEX values for each match",
          "One-click copy for all color values",
          "2600+ Pantone swatches",
          "Client-side processing, no data sent to server"
        ]
      },
      breadcrumbData,
      {
        "@type": "FAQPage",
        "mainEntity": faqItems.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer
          }
        }))
      },
      {
        "@type": "TechArticle",
        "headline": "RGB to Pantone Converter for Print Production",
        "datePublished": "2026-05-20",
        "dateModified": "2026-09-01",
        "author": {
          "@type": "Organization",
          "name": "PantoneConverter.com Editorial Team",
          "url": "https://pantoneconverter.com/about/"
        },
        "image": "https://pantoneconverter.com/og/rgb-to-pantone.png",
        "description": "Learn how to convert RGB screen colors to physical Pantone PMS inks for print production, including perceptually-weighted matching and avoiding common workflow mistakes."
      }
    ]
  };

  return (
    <>
      <Head>
        <title>RGB to Pantone Converter — Free Color Matching Tool</title>
        <meta name="description" content="Convert RGB color values to the closest Pantone PMS color instantly. Free, no login, browser-based matching across 2600+ Pantone swatches." />
        <link rel="canonical" href="https://pantoneconverter.com/rgb-to-pantone/" />
        <meta property="og:title" content="RGB to Pantone Converter — Free Color Matching Tool" />
        <meta property="og:description" content="Convert RGB color values to the closest Pantone PMS color instantly." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        {ogMeta({ path: '/rgb-to-pantone/' })}
      </Head>

      <NavBar />

      <main style={{ minHeight: '100vh', background: '#fafafa' }}>
        {/* Hero */}
        <div style={{ background: 'linear-gradient(135deg,#fdf4ff 0%,#eff6ff 100%)', borderBottom: '1px solid #f3f4f6', padding: '2.5rem 1.5rem 2rem' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
            <Breadcrumb trail={trail} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Circle size={20} color="#2563eb" />
              </div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#111827', margin: 0 }}>
                RGB to Pantone Converter
              </h1>
            </div>
            <p style={{ color: '#4b5563', fontSize: '1rem', margin: 0 }}>
              Enter R, G, B values and instantly find the closest Pantone PMS matches across {surface === 'coated' ? COATED_DB.length : UNCOATED_DB.length}+ colors.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '2rem 1.5rem 4rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          <aside
            aria-label="Note for fashion and textile users"
            style={{
              display: 'flex', gap: '0.7rem', alignItems: 'flex-start',
              padding: '0.9rem 1.1rem', borderRadius: '0.875rem',
              background: '#fdf2f8', border: '1.5px solid #fbcfe8',
            }}
          >
            <span aria-hidden="true" style={{ fontSize: '1rem', lineHeight: 1.4, flexShrink: 0 }}>✂️</span>
            <p style={{ fontSize: '0.85rem', color: '#831843', lineHeight: 1.65, margin: 0 }}>
              <strong>Working in fashion or textiles?</strong> This tool searches the Pantone Matching
              System — the graphic-arts library used for print. Apparel, home textiles and interiors use a{' '}
              separate Pantone library, Fashion, Home + Interiors, whose codes look like
              “19-4052 TCX”. The two are not interchangeable. Use the{' '}
              <Link href="/hex-to-tcx/" style={{ color: '#be185d', fontWeight: 700, textDecoration: 'underline' }}>HEX to TCX converter</Link>,{' '}
              <Link href="/pantone-c-to-tcx/" style={{ color: '#be185d', fontWeight: 700, textDecoration: 'underline' }}>Pantone C to TCX</Link>{' '}
              or the{' '}
              <Link href="/tcx-vs-tpx-vs-tpg/" style={{ color: '#be185d', fontWeight: 700, textDecoration: 'underline' }}>TCX vs TPX vs TPG guide</Link>{' '}
              instead.
            </p>
          </aside>

          {/* Inputs + Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input card */}
            <div className="card order-2 md:order-1" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '0.875rem', color: '#374151' }}>RGB Values</span>
                <button onClick={() => { setR('200'); setG('16'); setB('46'); }} className="copy-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <RefreshCw size={11} /> Reset
                </button>
              </div>

              <NumInput id="r-input" label="Red (R)"   value={R} onChange={setR} color="#ef4444" />
              <NumInput id="g-input" label="Green (G)" value={G} onChange={setG} color="#22c55e" />
              <NumInput id="b-input" label="Blue (B)"  value={B} onChange={setB} color="#3b82f6" />

              <div style={{ background: '#f9fafb', borderRadius: '0.75rem', padding: '0.75rem 1rem', border: '1px solid #f3f4f6' }}>
                <div className="input-label" style={{ marginBottom: '0.3rem' }}>Input Color</div>
                <code style={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151', fontFamily: 'monospace' }}>
                  rgb({r}, {g}, {b}) — {previewHex}
                </code>
              </div>
            </div>

            {/* Preview + Toggle */}
            <div className="order-1 md:order-2" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                flex: 1, minHeight: '12rem', borderRadius: '1.25rem',
                backgroundColor: previewHex,
                border: '1px solid rgba(0,0,0,0.1)', boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                transition: 'background-color 0.25s ease', padding: '1.5rem',
              }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: subColor, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                  Your Color
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: textColor, fontFamily: 'monospace' }}>
                  {previewHex}
                </div>
                <div style={{ fontSize: '0.85rem', color: subColor, marginTop: '0.3rem', fontWeight: 500 }}>
                  rgb({r}, {g}, {b})
                </div>
              </div>

              {/* Toggle */}
              <div style={{ background: '#fff', borderRadius: '1rem', border: '1px solid #f3f4f6', padding: '1rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                <div className="input-label" style={{ marginBottom: '0.6rem' }}>Pantone Collection</div>
                <div style={{ display: 'flex', background: '#f3f4f6', borderRadius: '0.75rem', padding: '0.25rem', gap: '0.25rem' }}>
                  {['coated', 'uncoated'].map(s => (
                    <button key={s} onClick={() => setSurface(s)} style={{
                      flex: 1, padding: '0.5rem', borderRadius: '0.5rem', border: 'none',
                      fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.18s ease',
                      ...(surface === s
                        ? { background: 'linear-gradient(135deg,#c44eed,#4361EE)', color: '#fff', boxShadow: '0 2px 8px rgba(196,78,237,0.35)' }
                        : { background: 'transparent', color: '#4b5563' }),
                    }}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
                <p style={{ fontSize: '0.72rem', color: '#6b7280', margin: '0.5rem 0 0', lineHeight: 1.4 }}>
                  {surface === 'coated'
                    ? 'Coated (C) — glossy/coated paper, more vibrant.'
                    : 'Uncoated (U) — matte/uncoated paper, slightly duller.'}
                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', margin: 0 }}>
                Top 5 Pantone Matches
              </h2>
              <span className="badge badge-purple">
                {surface === 'coated' ? 'Coated (C)' : 'Uncoated (U)'}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {matches.map((m, i) => <MatchCard key={m.name} match={m} rank={i} />)}
            </div>
            
            {matches.length > 0 && (
              <CoatedUncoatedComparison bestMatch={matches[0]} />
            )}
          </div>

          {/* E-E-A-T Banner & Methodology */}
          <div style={{ marginTop: '2rem', padding: '1rem 1.5rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid #e2e8f0' }}>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', fontWeight: 600 }}>
              Last updated: September 2026 · Reviewed by the PantoneConverter.com color team
            </p>
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
              <strong>How we calculate this:</strong> Our conversion engine analyzes your RGB input by first translating it into the device-independent CIE Lab color space. We then calculate the perceptually-weighted distance (ΔE*00 formula) to thousands of Pantone spot inks. We intentionally emphasize the green channel in our heuristics to mirror human vision sensitivity, delivering the most visually accurate color match possible.
            </p>
          </div>

          {/* Key Takeaway Box */}
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#eff6ff', borderRadius: '1rem', borderLeft: '4px solid #3b82f6' }}>
            <p style={{ margin: 0, fontSize: '1.05rem', color: '#1e3a8a', fontWeight: 600, lineHeight: 1.6 }}>
              Quick Takeaway: A flawless transition from screen to print production starts with the right color space. This tool lets designers translate digital RGB screens into physical Pantone spot inks effortlessly. Use it to preserve brand identity across logo printing, packaging, and commercial offset runs, ensuring your exact intent arrives on paper perfectly.
            </p>
          </div>

          {/* Table of Contents */}
          <nav aria-label="Table of Contents" style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e5e7eb', marginTop: '2rem' }}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', margin: '0 0 1rem' }}>Table of Contents</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li><a href="#what-is-rgb-pantone" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>What Is RGB to Pantone Conversion, and Why Print Production Depends on It</a></li>
              <li><a href="#how-it-works" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>How This RGB to Pantone Converter Works</a></li>
              <li><a href="#step-by-step" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>Step-by-Step: How to Use This Tool</a></li>
              <li><a href="#coated-vs-uncoated" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>Coated (C) vs Uncoated (U): Why the Same PMS Number Looks Different on Paper</a></li>
              <li><a href="#common-mistakes" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>Common Mistakes When Converting RGB to Pantone for Print</a></li>
              <li><a href="#print-production" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>RGB to Pantone for Print Production</a></li>
              <li><a href="#color-systems-differ" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>RGB vs Pantone vs CMYK vs HEX: How the Color Systems Differ</a></li>
              <li><a href="#accuracy" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>Accuracy and Limitations</a></li>
              <li><a href="#faq" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>Frequently Asked Questions</a></li>
              <li><a href="#related" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>Related Conversions and Tools</a></li>
            </ul>
          </nav>

          {/* Long-Form Content */}
          <div className="card" style={{ padding: '2.5rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <section>
              <h2 id="what-is-rgb-pantone" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', margin: '0 0 1rem' }}>
                What Is RGB to Pantone Conversion, and Why Print Production Depends on It
              </h2>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.75, margin: '0 0 1rem' }}>
                The RGB color model is an additive light system designed for digital screens. Displays combine varying intensities of red, green, and blue light to generate a full visual spectrum. The Pantone Matching System (PMS), however, relies on physical, pre-mixed spot inks designed for offset printing. 
              </p>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.75, margin: '0 0 1rem' }}>
                The core challenge for any graphic designer is bridging this technological gap. When an RGB digital file leaves the screen, standard printing presses cannot replicate light. A dedicated <strong>rgb to pantone converter</strong> translates digital pixel values into a physical ink recipe. This ensures that large-scale brand materials remain cohesive.
              </p>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.75, margin: '0 0 1rem' }}>
                Whether you are designing corporate letterheads, high-fidelity packaging, or large-format trade show banners, accurate color representation is vital. By utilizing an automated tool to <strong>convert rgb to pms color</strong>, print buyers can avoid costly trial-and-error runs on press.
              </p>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.75, margin: 0 }}>
                The practical impact of this difference is vast. The RGB model can display approximately 16.7 million distinct colors, while the Pantone system consists of only around 2,300 unique pre-mixed ink formulas. This means that most digital RGB values will not have a perfectly identical physical PMS match. Because of this mathematical discrepancy, our tool displays the 5 closest options ranked by perceptual distance, empowering you to maintain brand consistency across various physical materials based on visual proximity rather than an impossible perfect digital match.
              </p>
            </section>

            <section>
              <h2 id="how-it-works" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', margin: '0 0 1rem' }}>
                How This RGB to Pantone Converter Works
              </h2>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.75, margin: '0 0 1rem' }}>
                Translating digital color into physical ink requires more than just basic mathematical mapping. Our matching engine utilizes the CIE Lab color space to establish a device-independent baseline. By evaluating the perceptually-weighted distance between your target RGB and physical ink data, we can compute accurate ΔE*00 color differences.
              </p>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.75, margin: '0 0 1rem' }}>
                Because the human eye is inherently more sensitive to shifts in the green spectrum, our algorithm incorporates a specific emphasis on the green channel to ensure the resulting visual match is perceptually accurate. The database queries over 2,600 unique coated and uncoated standard graphic-arts Pantone swatches instantly.
              </p>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.75, margin: 0 }}>
                For technicians and color scientists looking to audit the conversion further, you can utilize our <Link href="/pantone-to-lab/" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'underline' }}>Pantone to LAB converter</Link> to inspect the distinct lightness, a-axis, and b-axis values for any matched PMS spot color.
              </p>
            </section>

            <section>
              <h2 id="step-by-step" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', margin: '0 0 1rem' }}>
                Step-by-Step: How to Use This Tool
              </h2>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.75, margin: '0 0 1rem' }}>
                Transitioning your digital palette to press-ready color is straightforward. Follow these instructions to find your best ink match:
              </p>
              <ol style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.75, margin: 0, paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><strong>Enter your RGB values:</strong> Type the specific 0–255 amounts for Red, Green, and Blue into the designated input fields. The interface immediately previews your digital color on screen.</li>
                <li><strong>Select the finish type:</strong> Toggle between <strong>Coated (C)</strong> and <strong>Uncoated (U)</strong> using the collection buttons to match your intended printing substrate.</li>
                <li><strong>Review the top matches:</strong> The tool will output the top 5 closest PMS color cards, ranked by their perceptual similarity score to your original RGB input.</li>
                <li><strong>Export and copy:</strong> Use the convenient one-click copy buttons located on each match card to copy the PMS name, HEX equivalent, or CMYK values to your clipboard.</li>
                <li><strong>Save for reference:</strong> Click the heart icon on any match card to store the ink reference in your Saved Colors for building future brand guidelines.</li>
              </ol>
            </section>

            <section>
              <h2 id="coated-vs-uncoated" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', margin: '0 0 1rem' }}>
                Coated (C) vs Uncoated (U): Why the Same PMS Number Looks Different on Paper
              </h2>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.75, margin: '0 0 1rem' }}>
                When selecting a spot ink, the substrate—the paper material you print on—plays a dramatic role in the final visual appearance. Understanding the <strong>coated vs uncoated pantone difference</strong> is critical to a successful print run. 
              </p>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.75, margin: '0 0 1rem' }}>
                Coated (C) Pantone colors are designed for paper with a glossy or smooth, non-porous finish. The ink sits on the surface, yielding vivid, sharp, and highly saturated colors. This finish is optimal for premium packaging, magazines, and marketing brochures.
              </p>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.75, margin: '0 0 1rem' }}>
                Uncoated (U) Pantone colors are printed on porous, matte paper where the ink sinks deeply into the fibers. The resulting color often appears softer, warmer, and less reflective. Designers typically specify uncoated stocks for traditional letterheads, classic business cards, and environmentally friendly packaging.
              </p>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.75, margin: 0 }}>
                For example, Pantone 186 C appears as a bold, highly saturated red when printed on coated paper. However, the exact same ink printed on uncoated stock (186 U) absorbs into the porous fibers and reads as a slightly warmer, less vibrant red. If your print job utilizes multiple substrates—such as a glossy brochure cover accompanied by matte inside pages—you will likely need to specify both C and U color formulas to achieve visual parity across the entire piece.
              </p>
            </section>

            <section>
              <h2 id="common-mistakes" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', margin: '0 0 1rem' }}>
                Common Mistakes When Converting RGB to Pantone for Print
              </h2>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.75, margin: '0 0 1rem' }}>
                Color translation across fundamentally different models can result in costly production errors. When dealing with <strong>rgb to pantone printing</strong>, try to avoid these frequent pitfalls:
              </p>
              <ul style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.75, margin: 0, paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><strong>Trusting the screen preview implicitly:</strong> Displays are backlit and can present a color as brighter or more saturated than any ink can achieve. A <strong>pantone color not matching screen</strong> is often due to physical ink gamut limitations.</li>
                <li><strong>Ignoring ΔE distance scores:</strong> Choosing the number one match without considering its similarity score can lead to a poor selection. Always look closely at the percentage rating.</li>
                <li><strong>Not verifying with a physical swatch book:</strong> Digital approximations cannot substitute looking at an actual Pantone Formula Guide under standardized D50 lighting.</li>
                <li><strong>Specifying the wrong surface finish:</strong> Sending a coated (C) color code to a printer who is running an uncoated paper stock will inevitably alter the final aesthetic.</li>
                <li><strong>Using CMYK when spot color is needed:</strong> If the design requires brand-critical consistency across large solid areas, falling back on 4-color process (CMYK) rather than a solid spot PMS ink is a mistake.</li>
              </ul>
            </section>

            <section>
              <h2 id="print-production" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', margin: '0 0 1rem' }}>
                RGB to Pantone for Print Production
              </h2>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.75, margin: '0 0 1rem' }}>
                In professional environments, using an <strong>rgb to pantone for printing</strong> workflow is a daily occurrence. Consider a scenario where an agency finalizes a digital logo asset for web. When the client orders business cards, screen-printed merchandise, or trade-show banners, that digital RGB value must be precisely matched to a solid Pantone color to ensure unified brand identity.
              </p>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.75, margin: '0 0 1rem' }}>
                Using a high-quality <strong>pantone color matching tool</strong> allows designers to transition their creative work into the physical realm seamlessly. This guarantees that large-format printers, offset presses, and promotional product manufacturers all target the identical spot ink reference.
              </p>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.75, margin: '0 0 1rem' }}>
                If you already have a 4-color process build that you need to translate, check out our <Link href="/cmyk-to-pantone/" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'underline' }}>CMYK to Pantone</Link> tool. Alternatively, for web designers moving from digital codes, the <Link href="/hex-to-pantone/" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'underline' }}>HEX to Pantone</Link> converter or our <Link href="/image-to-pantone/" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'underline' }}>Image to Pantone</Link> extractor offer flexible entry points into the PMS standard.
              </p>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.75, margin: 0 }}>
                Specific industries have rigorous color demands. Screen printers typically require precise PMS callouts to mix custom inks for merchandise. Meanwhile, large-format inkjet printers may operate using custom ICC profiles, but referencing a PMS starting point ensures that you and the vendor share a verifiable target color. In commercial packaging, Pantone spot inks are often strictly required by FDA and regulatory standards to guarantee uniform legibility on food and pharmaceutical labels.
              </p>
            </section>

            <section>
              <h2 id="color-systems-differ" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', margin: '0 0 1rem' }}>
                RGB vs Pantone vs CMYK vs HEX: How the Color Systems Differ
              </h2>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.75, margin: '0 0 1rem' }}>
                When a file leaves the screen and heads to a press, the color model determines whether the physical output matches your creative intent. Using an <strong>rgb to pantone chart</strong> helps map differences, but understanding the underlying technology is critical.
              </p>
              
              <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', textAlign: 'left' }}>
                  <caption style={{ padding: '0.5rem', fontWeight: 600, color: '#374151', background: '#f3f4f6' }}>Color Models Overview</caption>
                  <thead>
                    <tr style={{ background: '#e5e7eb', color: '#111827' }}>
                      <th scope="col" style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>Color Model</th>
                      <th scope="col" style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>Type</th>
                      <th scope="col" style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>Device-Dependent?</th>
                      <th scope="col" style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>Standardized?</th>
                      <th scope="col" style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>Best Used For</th>
                      <th scope="col" style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>Example Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db', fontWeight: 600 }}>RGB</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>Screen / Additive</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>Yes</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>No</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>Digital displays, UI design, digital photography</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>rgb(200,16,46)</td>
                    </tr>
                    <tr style={{ background: '#f9fafb' }}>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db', fontWeight: 600 }}>Pantone (PMS)</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>Print / Spot Ink</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>No</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>Yes</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>Brand consistency, large format, specific color fidelity on press</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>Pantone 186 C</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db', fontWeight: 600 }}>CMYK</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>Print / Process</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>Yes</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>Variable</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>Standard offset and digital print fallback</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>C:0 M:100 Y:81 K:4</td>
                    </tr>
                    <tr style={{ background: '#f9fafb' }}>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db', fontWeight: 600 }}>HEX</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>Screen / Additive</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>Yes</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>No</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>Web design, HTML, CSS architecture</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>#C8102E</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db', fontWeight: 600 }}>HSL</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>Screen / Abstract</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>Yes</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>No</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>Color manipulation and tuning in digital apps</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>hsl(350, 85%, 42%)</td>
                    </tr>
                    <tr style={{ background: '#f9fafb' }}>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db', fontWeight: 600 }}>LAB</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>Device-Independent</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>No</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>Yes</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>Color measurement, quality control, ΔE comparisons</td>
                      <td style={{ padding: '0.75rem', border: '1px solid #d1d5db' }}>L:44 a:66 b:35</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.75, margin: '0 0 1rem' }}>
                When a specific PMS spot color is not available or too expensive for a particular job, CMYK process printing is the standard fallback. To cross-reference in reverse, explore the <Link href="/pantone-to-cmyk/" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'underline' }}>Pantone to CMYK</Link> or the <Link href="/pantone-to-hex/" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'underline' }}>Pantone to HEX</Link> tools to maintain control of your palettes across mediums.
              </p>
            </section>

            <section>
              <h2 id="accuracy" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', margin: '0 0 1rem' }}>
                Accuracy and Limitations
              </h2>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.75, margin: '0 0 1rem' }}>
                While our application strives to calculate the closest match possible, absolute perfection across different color spaces is challenging. Screen calibration variations, differing monitor gamuts (such as sRGB vs. AdobeRGB), and ambient lighting all affect how an RGB color is perceived. A physical swatch book remains the gold standard in the print industry.
              </p>
              <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: 1.75, margin: '0 0 1.5rem' }}>
                This site provides an approximation and is not a Pantone-certified system. To gauge the reliability of any returned color, refer to the ΔE (Delta E) accuracy tiers below:
              </p>
              
              {/* ΔE Accuracy Tiers Chart SVG */}
              <div style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '0.75rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <svg viewBox="0 0 600 250" width="100%" height="auto" role="img" aria-label="Delta E Accuracy Tiers Chart">
                  <title>Delta E Visual Accuracy Scale</title>
                  <text x="10" y="25" fontSize="16" fontWeight="bold" fill="#374151">ΔE Accuracy Rating Scale</text>
                  
                  <rect x="10" y="50" width="80" height="30" fill="#22c55e" rx="4" />
                  <text x="100" y="70" fontSize="14" fill="#111827" fontWeight="bold">0 – 1: Imperceptible</text>
                  <text x="250" y="70" fontSize="13" fill="#6b7280">Visual difference is essentially invisible.</text>
                  
                  <rect x="10" y="90" width="80" height="30" fill="#86efac" rx="4" />
                  <text x="100" y="110" fontSize="14" fill="#111827" fontWeight="bold">1 – 2: Close match</text>
                  <text x="250" y="110" fontSize="13" fill="#6b7280">Only trained eyes can spot the difference.</text>

                  <rect x="10" y="130" width="80" height="30" fill="#facc15" rx="4" />
                  <text x="100" y="150" fontSize="14" fill="#111827" fontWeight="bold">2 – 5: Noticeable</text>
                  <text x="250" y="150" fontSize="13" fill="#6b7280">An acceptable print match for most general uses.</text>

                  <rect x="10" y="170" width="80" height="30" fill="#fb923c" rx="4" />
                  <text x="100" y="190" fontSize="14" fill="#111827" fontWeight="bold">5 – 10: Poor match</text>
                  <text x="250" y="190" fontSize="13" fill="#6b7280">Clear color deviation; proceed with caution.</text>

                  <rect x="10" y="210" width="80" height="30" fill="#ef4444" rx="4" />
                  <text x="100" y="230" fontSize="14" fill="#111827" fontWeight="bold">&gt; 10: Different color</text>
                  <text x="250" y="230" fontSize="13" fill="#6b7280">The RGB color falls outside the print gamut.</text>
                </svg>
              </div>

              <div style={{ background: '#fef3c7', borderLeft: '4px solid #f59e0b', padding: '1.5rem', borderRadius: '0.5rem' }}>
                <h3 style={{ margin: '0 0 0.75rem', fontSize: '1.05rem', color: '#92400e', fontWeight: 800 }}>Quick Reference: Ensuring Color Accuracy</h3>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', color: '#92400e', fontSize: '0.95rem', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li><strong>1. Approximations only:</strong> This tool provides the mathematically closest approximation available, not a guaranteed exact match.</li>
                  <li><strong>2. Physical verification:</strong> Always verify your final choice against a physical Pantone swatch book under standardized D50 lighting.</li>
                  <li><strong>3. Hardware matters:</strong> Screen calibration, monitor brightness, and viewing angles significantly affect how digital RGB colors appear to your eye.</li>
                </ul>
              </div>
            </section>

            <section id="faq">
              <FAQSection suppressSchema items={faqItems} />
            </section>

            <section id="related" style={{ marginTop: '2rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', margin: '0 0 1rem' }}>
                Related Conversions and Tools
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/hex-to-pantone/" className="card" style={{ textDecoration: 'none', transition: 'transform 0.2s', border: '1px solid #e5e7eb' }}>
                  <h3 style={{ margin: '0 0 0.5rem', color: '#111827', fontSize: '1.1rem' }}>HEX to Pantone</h3>
                  <p style={{ margin: 0, color: '#4b5563', fontSize: '0.9rem' }}>Convert digital web HEX codes into printable PMS colors instantly.</p>
                </Link>
                <Link href="/cmyk-to-pantone/" className="card" style={{ textDecoration: 'none', transition: 'transform 0.2s', border: '1px solid #e5e7eb' }}>
                  <h3 style={{ margin: '0 0 0.5rem', color: '#111827', fontSize: '1.1rem' }}>CMYK to Pantone</h3>
                  <p style={{ margin: 0, color: '#4b5563', fontSize: '0.9rem' }}>Translate four-color process builds back to solid spot inks.</p>
                </Link>
                <Link href="/pantone-to-cmyk/" className="card" style={{ textDecoration: 'none', transition: 'transform 0.2s', border: '1px solid #e5e7eb' }}>
                  <h3 style={{ margin: '0 0 0.5rem', color: '#111827', fontSize: '1.1rem' }}>Pantone to CMYK</h3>
                  <p style={{ margin: 0, color: '#4b5563', fontSize: '0.9rem' }}>Find the standard C-M-Y-K breakdown for offset press replication.</p>
                </Link>
                <Link href="/pantone-to-ral/" className="card" style={{ textDecoration: 'none', transition: 'transform 0.2s', border: '1px solid #e5e7eb' }}>
                  <h3 style={{ margin: '0 0 0.5rem', color: '#111827', fontSize: '1.1rem' }}>Pantone to RAL</h3>
                  <p style={{ margin: 0, color: '#4b5563', fontSize: '0.9rem' }}>Convert ink formulas to European industrial paint standards.</p>
                </Link>
                <Link href="/pantone-to-ncs/" className="card" style={{ textDecoration: 'none', transition: 'transform 0.2s', border: '1px solid #e5e7eb' }}>
                  <h3 style={{ margin: '0 0 0.5rem', color: '#111827', fontSize: '1.1rem' }}>Pantone to NCS</h3>
                  <p style={{ margin: 0, color: '#4b5563', fontSize: '0.9rem' }}>Map graphic spot colors to the Natural Color System.</p>
                </Link>
                <Link href="/image-to-pantone/" className="card" style={{ textDecoration: 'none', transition: 'transform 0.2s', border: '1px solid #e5e7eb' }}>
                  <h3 style={{ margin: '0 0 0.5rem', color: '#111827', fontSize: '1.1rem' }}>Image to Pantone</h3>
                  <p style={{ margin: 0, color: '#4b5563', fontSize: '0.9rem' }}>Extract dominant PMS matching colors from any uploaded image.</p>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
