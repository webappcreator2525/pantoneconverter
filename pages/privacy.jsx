import Head from 'next/head';
import { Shield, EyeOff, Save, Check } from 'lucide-react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  const pageTitle = "Privacy Policy — PantoneConverter.com";
  const metaDescription = "Read the Privacy Policy for PantoneConverter.com. Learn why our 100% client-side conversion tools guarantee your files and colors remain private.";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href="https://pantoneconverter.com/privacy/" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
      </Head>

      <NavBar />

      <main style={{ minHeight: '100vh', background: '#fafafa' }}>
        {/* Hero Section */}
        <section className="hero-gradient section" style={{ padding: '3.5rem 1.5rem 3rem' }}>
          <div className="container-xl text-center">
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.12em', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.75rem' }}>
              <Shield size={14} />
              Privacy & Security
            </span>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-0 leading-relaxed font-medium">
              We believe your color palettes and image assets belong to you. Read about how we safeguard your data through 100% local processing.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="section" style={{ padding: '2rem 1.5rem 5rem' }}>
          <div className="container-xl" style={{ maxWidth: '48rem', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            <div className="card" style={{ background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', margin: 0 }}>Introduction</h2>
              <p style={{ fontSize: '0.92rem', color: '#4b5563', lineHeight: 1.7, margin: 0 }}>
                Welcome to <strong>PantoneConverter.com</strong>. Your privacy is of utmost importance to us. This Privacy Policy describes how we handle information across our website and suite of web tools.
              </p>
              <p style={{ fontSize: '0.92rem', color: '#4b5563', lineHeight: 1.7, margin: 0 }}>
                Unlike traditional color matching software or upload-based online converters, PantoneConverter is engineered to be a <strong>fully client-side application</strong>. This design fundamentally guarantees your absolute privacy.
              </p>
            </div>

            {/* Local Processing Card */}
            <div className="card" style={{ background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '1.25rem', borderLeft: '4px solid #10b981' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <EyeOff size={20} color="#10b981" />
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>1. No Data Uploads (Local Processing)</h2>
              </div>
              <p style={{ fontSize: '0.92rem', color: '#4b5563', lineHeight: 1.7, margin: 0 }}>
                All search parameters, input colors, values, and files are processed strictly inside your device's web browser:
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '0.5rem' }}>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: '#374151', lineHeight: 1.5 }}>
                  <Check size={16} color="#10b981" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                  <span><strong>Image to Pantone:</strong> When you select or drop an image into our color extractor, the pixels are analyzed locally via HTML5 canvas. The image is never uploaded to any remote server or backend database.</span>
                </li>
                <li style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: '#374151', lineHeight: 1.5 }}>
                  <Check size={16} color="#10b981" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                  <span><strong>Color Conversions:</strong> Conversions for HEX, RGB, HSL, and CMYK run dynamically using pure client-side JavaScript. No color search history is monitored or saved.</span>
                </li>
              </ul>
            </div>

            {/* Local Storage Card */}
            <div className="card" style={{ background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Save size={20} color="#4361EE" />
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>2. Saved Colors & LocalStorage</h2>
              </div>
              <p style={{ fontSize: '0.92rem', color: '#4b5563', lineHeight: 1.7, margin: 0 }}>
                When you click the "Save" heart icon next to color swatches on our website, those items are saved directly on your computer or phone using your browser's <code>localStorage</code> database.
              </p>
              <p style={{ fontSize: '0.92rem', color: '#4b5563', lineHeight: 1.7, margin: 0 }}>
                Because this data remains entirely local, we do not require account registration, login credentials, or email collections. You can permanently clear all saved colors at any time simply by clearing your browser cache or site data.
              </p>
            </div>

            {/* Cookies and Analytics */}
            <div className="card" style={{ background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>3. Cookies & Analytical Log Data</h2>
              <p style={{ fontSize: '0.92rem', color: '#4b5563', lineHeight: 1.7, margin: 0 }}>
                To keep this service free and understand general traffic patterns, we may utilize third-party hosting metrics and standard analytical services (such as Google Analytics).
              </p>
              <p style={{ fontSize: '0.92rem', color: '#4b5563', lineHeight: 1.7, margin: 0 }}>
                These analytics platforms may drop cookies to count visits, session lengths, and anonymous device properties (like screen size and browser version). They do not collect personally identifiable information (PII) or any details regarding the specific images or colors you convert.
              </p>
            </div>

            {/* Changes to this Policy */}
            <div className="card" style={{ background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>4. Policy Updates</h2>
              <p style={{ fontSize: '0.92rem', color: '#4b5563', lineHeight: 1.7, margin: 0 }}>
                We reserve the right to modify this Privacy Policy at any time. Any changes will be posted on this page with an updated modification date.
              </p>
              <div style={{ fontSize: '0.8rem', color: '#6b7280', borderTop: '1px solid #f3f4f6', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                Last Updated: May 20, 2026
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
