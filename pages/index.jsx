import Head from 'next/head';
import ogMeta from '../components/ogMeta';
import Link from 'next/link';
import { Sliders, Hash, Circle, Sun, ArrowRightLeft, Fingerprint, Droplets, Search, Zap, Unlock, Target, Monitor, BookOpen } from 'lucide-react';
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
              <h2 className="text-3xl font-bold text-gray-900 mb-3">8 Free Color Tools</h2>
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
