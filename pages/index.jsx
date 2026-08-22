import Head from 'next/head';
import ogMeta from '../components/ogMeta';
import Link from 'next/link';
import { Sliders, Hash, Circle, Sun, ArrowRightLeft, Fingerprint, Droplets, Search, Zap, Unlock, Target, Monitor, BookOpen, Factory, Compass, Printer, Stamp, Grid3x3, Shield, FlaskConical, SlidersHorizontal, Scissors, Highlighter, Shirt, PaintRoller, Paintbrush, PaintBucket, Palette, Layers, Ruler } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const TOOLS = [
  {
    href: '/cmyk-to-pantone',
    title: 'CMYK → Pantone',
    desc: 'Convert CMYK values to the closest Pantone PMS color.',
    Icon: Sliders,
    color: '#ec4899',
    bg: '#fdf2f8',
  },
  {
    href: '/hex-to-pantone',
    title: 'HEX → Pantone',
    desc: 'Find the nearest Pantone match for any HEX color code.',
    Icon: Hash,
    color: '#7c3aed',
    bg: '#f5f3ff',
  },
  {
    href: '/rgb-to-pantone',
    title: 'RGB → Pantone',
    desc: 'Match RGB color values to the closest Pantone swatch.',
    Icon: Circle,
    color: '#2563eb',
    bg: '#eff6ff',
  },
  {
    href: '/hsl-to-pantone',
    title: 'HSL → Pantone',
    desc: 'Convert Hue, Saturation, Lightness values to Pantone.',
    Icon: Sun,
    color: '#0d9488',
    bg: '#f0fdfa',
  },
  {
    href: '/pantone-to-cmyk',
    title: 'Pantone → CMYK',
    desc: 'Get the CMYK breakdown of any Pantone PMS color.',
    Icon: ArrowRightLeft,
    color: '#ea580c',
    bg: '#fff7ed',
  },
  {
    href: '/pantone-to-hex',
    title: 'Pantone → HEX',
    desc: 'Retrieve the HEX code equivalent for a Pantone color.',
    Icon: Fingerprint,
    color: '#ca8a04',
    bg: '#fefce8',
  },
  {
    href: '/pantone-to-rgb',
    title: 'Pantone → RGB',
    desc: 'Get the RGB values that correspond to a Pantone color.',
    Icon: Droplets,
    color: '#4f46e5',
    bg: '#eef2ff',
  },
  {
    href: '/pantone-finder',
    title: 'Pantone Finder',
    desc: 'Browse and search the full Pantone PMS color library.',
    Icon: Search,
    color: '#e11d48',
    bg: '#fff1f2',
  },
];

// Cross-standard converters. Split out from TOOLS so the primary grid stays the
// eight everyday tools and the industrial standards get their own labelled row.
const SYSTEM_TOOLS = [
  {
    href: '/pantone-to-ral',
    title: 'Pantone ↔ RAL',
    desc: 'Match Pantone to RAL Classic paint and powder-coating codes.',
    Icon: Factory,
    color: '#b91c1c',
    bg: '#fef2f2',
  },
  {
    href: '/pantone-to-ncs',
    title: 'Pantone → NCS',
    desc: 'Translate Pantone into Natural Colour System notation.',
    Icon: Compass,
    color: '#0284c7',
    bg: '#f0f9ff',
  },
  {
    href: '/pantone-to-hks',
    title: 'Pantone → HKS',
    desc: 'Match Pantone to the HKS spot inks used in German print.',
    Icon: Printer,
    color: '#6d28d9',
    bg: '#f5f3ff',
  },
  {
    href: '/pantone-to-toyo',
    title: 'Pantone → TOYO',
    desc: 'Cross-reference Pantone against the TOYO Color Finder deck.',
    Icon: Stamp,
    color: '#be123c',
    bg: '#fff1f2',
  },
  {
    href: '/pantone-to-trumatch',
    title: 'Pantone → Trumatch',
    desc: 'Map spot colours onto the Trumatch four-colour CMYK deck.',
    Icon: Grid3x3,
    color: '#059669',
    bg: '#ecfdf5',
  },
  {
    href: '/pantone-to-federal-standard-595',
    title: 'Pantone → FS 595',
    desc: 'Find the nearest US Federal Standard 595 defence paint chip.',
    Icon: Shield,
    color: '#4d7c0f',
    bg: '#f7fee7',
  },
  {
    href: '/pantone-to-lab',
    title: 'Pantone ↔ LAB',
    desc: 'Device-independent CIELAB values for measurement and ΔE.',
    Icon: FlaskConical,
    color: '#0f766e',
    bg: '#f0fdfa',
  },
  {
    href: '/pantone-to-hsv',
    title: 'Pantone ↔ HSV',
    desc: 'Hue, saturation and brightness for design-tool colour pickers.',
    Icon: SlidersHorizontal,
    color: '#9333ea',
    bg: '#faf5ff',
  },
];

// Craft and paint-brand converters — the bridge from a specified colour to a
// material you can buy. Split from SYSTEM_TOOLS so each row has one story.
const CRAFT_TOOLS = [
  {
    href: '/pantone-to-dmc',
    title: 'Pantone → DMC',
    desc: 'Match Pantone to DMC embroidery floss for cross-stitch.',
    Icon: Scissors,
    color: '#be185d',
    bg: '#fdf2f8',
  },
  {
    href: '/pantone-to-copic',
    title: 'Pantone → Copic',
    desc: 'Find the closest Copic alcohol marker for illustration.',
    Icon: Highlighter,
    color: '#4338ca',
    bg: '#eef2ff',
  },
  {
    href: '/pantone-to-oracal',
    title: 'Pantone → Oracal 651',
    desc: 'Pick the nearest permanent vinyl for cutting and signage.',
    Icon: Layers,
    color: '#0d9488',
    bg: '#f0fdfa',
  },
  {
    href: '/pantone-to-siser-htv',
    title: 'Pantone → Siser HTV',
    desc: 'Match heat transfer vinyl for t-shirts and garment printing.',
    Icon: Shirt,
    color: '#c2410c',
    bg: '#fff7ed',
  },
  {
    href: '/pantone-to-sherwin-williams',
    title: 'Pantone → Sherwin-Williams',
    desc: 'Find the closest Sherwin-Williams interior paint colour.',
    Icon: PaintRoller,
    color: '#1d4ed8',
    bg: '#eff6ff',
  },
  {
    href: '/pantone-to-benjamin-moore',
    title: 'Pantone → Benjamin Moore',
    desc: 'Match to the HC, OC and AF paint collections.',
    Icon: Paintbrush,
    color: '#15803d',
    bg: '#f0fdf4',
  },
  {
    href: '/pantone-to-dulux',
    title: 'Pantone → Dulux',
    desc: 'Nearest Dulux colour for UK and Australian projects.',
    Icon: PaintBucket,
    color: '#7e22ce',
    bg: '#faf5ff',
  },
  {
    href: '/pantone-to-farrow-and-ball',
    title: 'Pantone → Farrow & Ball',
    desc: 'Place a colour within the 130-colour designer palette.',
    Icon: Palette,
    color: '#57534e',
    bg: '#fafaf9',
  },
];

// Fashion and textile Pantone. Called out separately on the homepage because
// TCX is a different Pantone library, not another converter for the same one.
const TEXTILE_TOOLS = [
  {
    href: '/tcx-to-hex',
    title: 'TCX → HEX / RGB',
    desc: 'Screen values for any Pantone fashion textile colour.',
    Icon: Ruler,
    color: '#db2777',
    bg: '#fdf2f8',
  },
  {
    href: '/hex-to-tcx',
    title: 'HEX → TCX',
    desc: 'Turn a screen colour into a code your mill can dye to.',
    Icon: Ruler,
    color: '#e11d48',
    bg: '#fff1f2',
  },
  {
    href: '/pantone-c-to-tcx',
    title: 'Pantone C → TCX',
    desc: 'Cross a graphic PMS number over to the fashion library.',
    Icon: ArrowRightLeft,
    color: '#6366f1',
    bg: '#eef2ff',
  },
  {
    href: '/tcx-vs-tpx-vs-tpg',
    title: 'TCX vs TPX vs TPG',
    desc: 'Which Pantone textile format is which, and when to use it.',
    Icon: BookOpen,
    color: '#0e7490',
    bg: '#ecfeff',
  },
  {
    href: '/pantone-textile-to-cmyk',
    title: 'Pantone Textile → CMYK',
    desc: 'CMYK builds for sublimation and direct-to-garment printing.',
    Icon: Droplets,
    color: '#ea580c',
    bg: '#fff7ed',
  },
];

const VALUE_PROPS = [
  {
    Icon: Zap,
    color: '#c44eed',
    title: 'Instant Results',
    desc: 'All matching runs in your browser — zero server round-trips, zero waiting.',
  },
  {
    Icon: Unlock,
    color: '#4361EE',
    title: 'No Login Required',
    desc: 'Completely free and open. No account, no email, no paywalls — ever.',
  },
  {
    Icon: Target,
    color: '#00D4AA',
    title: 'Accurate Matching',
    desc: 'Euclidean RGB distance algorithm finds the perceptually closest PMS color.',
  },
  {
    Icon: Monitor,
    color: '#FF6B35',
    title: 'Works Everywhere',
    desc: 'Mobile-first responsive design. Use it on desktop, tablet, or phone.',
  },
];

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Free Pantone Color Converter — CMYK, HEX, RGB to PMS</title>
        <meta
          name="description"
          content="Free instant Pantone color converter. Convert CMYK, HEX, RGB, and HSL to the closest Pantone PMS match — or look up any Pantone color's values. No login needed."
        />
        <link rel="canonical" href="https://pantoneconverter.com/" />
        <meta property="og:title" content="Free Pantone Color Converter — CMYK, HEX, RGB to PMS" />
        <meta property="og:description" content="Free instant Pantone color converter. Convert CMYK, HEX, RGB, and HSL to the closest Pantone PMS match." />
        {ogMeta({ path: '/' })}
      </Head>

      <NavBar />

      <main>
        {/* ── Hero ────────────────────────────────────────────────── */}
        <section className="hero-gradient section">
          <div className="container-xl text-center">
            {/* Floating color pills */}
            <div className="flex justify-center gap-3 mb-8 flex-wrap">
              {['#E8112D','#003DA5','#009A44','#FE5000','#FF3EB5','#F5E100'].map((hex) => (
                <span
                  key={hex}
                  className="w-8 h-8 rounded-full shadow-md border-2 border-white inline-block transition-transform hover:scale-125"
                  style={{ backgroundColor: hex }}
                  title={hex}
                />
              ))}
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 mb-6 text-balance">
              The Free{' '}
              <span className="gradient-text">Pantone</span>
              <br />
              Color Converter
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
              Instantly convert CMYK, HEX, RGB, or HSL to the closest Pantone PMS match —
              or look up any Pantone color's values. Free, fast, no login.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/cmyk-to-pantone" className="btn-primary text-base px-8 py-4">
                Convert CMYK → Pantone
              </Link>
              <Link href="/pantone-finder" className="btn-secondary text-base px-8 py-4">
                Browse All Colors
              </Link>
            </div>
          </div>
        </section>

        {/* ── Tools Grid ──────────────────────────────────────────── */}
        <section className="section bg-white">
          <div className="container-xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Free Color Conversion Tools</h2>
              <p className="text-gray-500 text-lg">Pick the conversion you need — all instant, all client-side.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {TOOLS.map((tool) => (
                <Link key={tool.href} href={tool.href} className="tool-card group">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: tool.bg }}
                  >
                    <tool.Icon size={24} color={tool.color} strokeWidth={2} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 text-base">{tool.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{tool.desc}</p>
                </Link>
              ))}
            </div>

            {/* Industrial colour systems */}
            <div className="text-center mb-8 mt-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Industrial Color Systems</h2>
              <p className="text-gray-500 text-lg">
                Cross-reference Pantone against RAL, NCS, HKS, TOYO, Trumatch, FS&nbsp;595, CIELAB and HSV — every match ranked by ΔE.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {SYSTEM_TOOLS.map((tool) => (
                <Link key={tool.href} href={tool.href} className="tool-card group">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: tool.bg }}
                  >
                    <tool.Icon size={24} color={tool.color} strokeWidth={2} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 text-base">{tool.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{tool.desc}</p>
                </Link>
              ))}
            </div>

            {/* Craft materials and paint brands */}
            <div className="text-center mb-8 mt-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Craft &amp; Paint Brand Matching</h2>
              <p className="text-gray-500 text-lg">
                Take a Pantone colour to something you can buy — embroidery floss, markers, vinyl, heat transfer film and house paint.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {CRAFT_TOOLS.map((tool) => (
                <Link key={tool.href} href={tool.href} className="tool-card group">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: tool.bg }}
                  >
                    <tool.Icon size={24} color={tool.color} strokeWidth={2} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 text-base">{tool.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{tool.desc}</p>
                </Link>
              ))}
            </div>

            {/* Fashion and textile Pantone */}
            <div className="text-center mb-8 mt-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Fashion &amp; Textile Pantone (TCX)</h2>
              <p className="text-gray-500 text-lg">
                Apparel and interiors use a different Pantone library from print — codes like 19-4052&nbsp;TCX, not 186&nbsp;C. These tools work in that one.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {TEXTILE_TOOLS.map((tool) => (
                <Link key={tool.href} href={tool.href} className="tool-card group">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: tool.bg }}
                  >
                    <tool.Icon size={24} color={tool.color} strokeWidth={2} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 text-base">{tool.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{tool.desc}</p>
                </Link>
              ))}
            </div>

            {/* Learn Section CTA */}
            <div className="mt-8 bg-purple-50 rounded-2xl p-8 sm:p-10 text-center border-2 border-purple-100 flex flex-col items-center">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
                <BookOpen size={28} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Pantone Color Guides & Tutorials</h3>
              <p className="text-gray-600 max-w-2xl mx-auto mb-6 text-base">
                Want to understand the difference between Pantone Coated and Uncoated? Or when to use CMYK vs RGB? Check out our free learning center.
              </p>
              <Link href="/learn" className="btn-primary text-sm px-6 py-3">
                Browse All Articles
              </Link>
            </div>

          </div>
        </section>

        {/* ── Color Families Grid ──────────────────────────────── */}
        <section className="section" style={{ background: '#f9fafb' }}>
          <div className="container-xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Explore Pantone Colors by Family</h2>
              <p className="text-gray-500 text-lg">Browse our in-depth color guides — complete with HEX, RGB, CMYK values, brand examples, and conversion tools.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.875rem' }} className="color-family-grid">
              {[
                { href: '/pantone-red/', label: 'Pantone Red', hex: '#C8102E' },
                { href: '/pantone-blue/', label: 'Pantone Blue', hex: '#0032A0' },
                { href: '/pantone-green/', label: 'Pantone Green', hex: '#00A550' },
                { href: '/pantone-yellow/', label: 'Pantone Yellow', hex: '#FFED00' },
                { href: '/pantone-orange/', label: 'Pantone Orange', hex: '#FE5000' },
                { href: '/pantone-pink/', label: 'Pantone Pink', hex: '#FF3EB5' },
                { href: '/pantone-purple/', label: 'Pantone Purple', hex: '#440099' },
                { href: '/pantone-gold/', label: 'Pantone Gold', hex: '#FFB81C' },
                { href: '/pantone-black/', label: 'Pantone Black', hex: '#2D2926' },
                { href: '/pantone-white/', label: 'Pantone White', hex: '#F4F5F0' },
              ].map((color) => {
                const isLight = (() => {
                  const c = color.hex.replace('#', '');
                  const r = parseInt(c.substr(0,2),16), g = parseInt(c.substr(2,2),16), b = parseInt(c.substr(4,2),16);
                  return (r*299 + g*587 + b*114) / 1000 > 128;
                })();
                return (
                  <Link
                    key={color.href}
                    href={color.href}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      height: '5.5rem', borderRadius: '1rem', background: color.hex,
                      textDecoration: 'none', border: '1px solid rgba(0,0,0,0.08)',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.08)', transition: 'all 0.18s ease',
                      position: 'relative', overflow: 'hidden',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
                      e.currentTarget.querySelector('.color-overlay').style.opacity = '1';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.08)';
                      e.currentTarget.querySelector('.color-overlay').style.opacity = '0';
                    }}
                  >
                    <div className="color-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)', opacity: 0, transition: 'opacity 0.18s ease' }} />
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: isLight ? '#1a1a1a' : '#ffffff', textAlign: 'center', padding: '0 0.5rem', position: 'relative', zIndex: 1, textShadow: isLight ? 'none' : '0 1px 2px rgba(0,0,0,0.3)' }}>
                      {color.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>


        <section className="section" style={{ background: 'linear-gradient(135deg, #f5f3ff 0%, #eff6ff 100%)' }}>
          <div className="container-xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Why PantoneConverter.com?</h2>
              <p className="text-gray-500 text-lg">Built for designers who need accuracy, speed, and simplicity.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUE_PROPS.map((vp) => (
                <div key={vp.title} className="card text-center">
                  <div className="flex justify-center mb-4">
                    <vp.Icon size={24} color={vp.color} strokeWidth={2} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{vp.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{vp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
