import Head from 'next/head';
import Link from 'next/link';
import { ShieldCheck, Cpu, Layers, HelpCircle, Check, Info } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function About() {
  const pageTitle = "About PantoneConverter.com — Free Color Utility Tool";
  const metaDescription = "Learn more about PantoneConverter.com, an independent, free utility tool for designers and printers. Learn how our client-side matching algorithm works and browse our FAQs.";

  const FAQS = [
    {
      q: "What is Pantone (PMS)?",
      a: "The Pantone Matching System (PMS) is a standardized color reproduction system. By assigning a unique number and name to each color, Pantone allows manufacturers, designers, and printers to specify and match colors precisely, regardless of the equipment used."
    },
    {
      q: "What is the difference between Coated (C) and Uncoated (U)?",
      a: "Coated (indicated by a 'C' suffix like '186 C') means the color is formulated for glossy, coated paper where ink sits on top of the surface, resulting in brighter, more vibrant colors. Uncoated (indicated by a 'U' suffix) is formulated for matte, uncoated paper where the ink is absorbed, resulting in a softer, more muted appearance."
    },
    {
      q: "How does the color converter find a match?",
      a: "Our system takes your input color values (HEX, RGB, HSL, or CMYK), converts them to a unified RGB space, and runs a mathematical comparison against a database of Pantone color profiles. It calculates the color distance (Delta E) to show you the closest matching swatches sorted by similarity."
    },
    {
      q: "Is PantoneConverter.com affiliated with Pantone LLC?",
      a: "No. PantoneConverter.com is entirely independent. Pantone is a registered trademark of Pantone LLC. Trademarked names, color codes, and standards are utilized solely for educational reference and approximation purposes."
    }
  ];

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href="https://pantoneconverter.com/about/" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
      </Head>

      <NavBar />

      <main style={{ minHeight: '100vh', background: '#fafafa' }}>
        {/* Hero */}
        <section className="hero-gradient section" style={{ padding: '3.5rem 1.5rem 3rem' }}>
          <div className="container-xl text-center">
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.75rem' }}>
              <Info size={14} />
              About Our Tool
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 mb-4">
              About <span className="gradient-text">PantoneConverter</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-0 leading-relaxed font-medium">
              An independent, free utility designed to help creators, developers, and print professionals bridge the gap between digital design and physical print formats.
            </p>
          </div>
        </section>

        {/* Content cards section */}
        <section className="section" style={{ padding: '2rem 1.5rem 5rem' }}>
          <div className="container-xl" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Mission & Privacy cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))', gap: '1.5rem' }}>
              
              {/* Mission Card */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: '#ffffff' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', backgroundColor: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Cpu size={20} color="#7c3aed" />
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>Our Mission</h2>
                <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                  Spot color systems can be complex to navigate, and professional tools are often expensive. We built PantoneConverter to be a free, accessible, and fast matching companion. Whether you're prepressing a logo package or matching hex codes for web designs, we want to simplify your workflow.
                </p>
              </div>

              {/* Privacy Card */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: '#ffffff' }}>
                <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.75rem', backgroundColor: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={20} color="#059669" />
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>100% Client-Side Privacy</h2>
                <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>
                  Your designs are yours alone. All color calculations, file matching, and image pixel extraction run entirely in your local web browser. No files, images, or color inputs are ever uploaded to a server, ensuring absolute privacy, data security, and instant match speeds.
                </p>
              </div>

            </div>

            {/* How matching works (Mathematics section) */}
            <div className="card" style={{ background: '#ffffff', borderTop: '4px solid #4361EE' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <div style={{ width: '2.2rem', height: '2.2rem', borderRadius: '0.6rem', backgroundColor: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Layers size={18} color="#4361EE" />
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>How the Matching Algorithm Works</h2>
              </div>
              <p style={{ fontSize: '0.92rem', color: '#374151', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                To determine which Pantone color matches your input values best, our converter maps both values into the same color space and runs a mathematical comparison. We calculate the 3D Euclidean distance (often referred to in basic color science as a delta calculation):
              </p>
              <div style={{ background: '#f9fafb', borderRadius: '0.75rem', padding: '1rem', textAlign: 'center', marginBottom: '1.25rem', border: '1px solid #f3f4f6' }}>
                <code style={{ fontSize: '1.05rem', fontWeight: 700, color: '#4b5563', fontFamily: 'monospace' }}>
                  ΔE = √((R₁ - R₂)² + (G₁ - G₂)² + (B₁ - B₂)²)
                </code>
              </div>
              <p style={{ fontSize: '0.92rem', color: '#374151', lineHeight: 1.6, margin: 0 }}>
                This color distance calculation measures the geometric separation between the source color and each color in our Pantone database. The results with the smallest delta value are returned as the closest matches, accompanied by a similarity percentage helper (where a distance of 0 translates to 100% similarity).
              </p>
            </div>

            {/* FAQs */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', marginTop: '1rem' }}>
                <HelpCircle size={20} color="#7c3aed" />
                <h2 style={{ fontSize: '1.5rem', fontWeight: 850, color: '#111827', margin: 0 }}>Frequently Asked Questions</h2>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {FAQS.map((faq, i) => (
                  <div key={i} className="card" style={{ background: '#ffffff', padding: '1.25rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginTop: 0, marginBottom: '0.5rem', display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                      <span style={{ color: '#7c3aed', fontWeight: 900 }}>Q:</span>
                      {faq.q}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: '#4b5563', lineHeight: 1.6, margin: 0, paddingLeft: '1.3rem' }}>
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
