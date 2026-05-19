import Head from 'next/head';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const ARTICLES = [
  {
    slug:        'what-is-pantone',
    title:       'What Is Pantone? A Designer\'s Complete Guide to the PMS Color System',
    description: 'Learn what Pantone is, how the Pantone Matching System (PMS) works, why designers rely on it for brand consistency, and how it differs from CMYK and RGB.',
    date:        '2026-05-19',
    readTime:    '8 min read',
    tag:         'Fundamentals',
    tagColor:    '#7c3aed',
    tagBg:       '#f3d0fe',
  },
  {
    slug:        'how-to-convert-hex-to-pantone',
    title:       'How to Convert HEX to Pantone: A Step-by-Step Guide',
    description: 'A practical guide to converting HEX color codes to the closest Pantone PMS match, understanding color distance, and when digital-to-Pantone conversion works best.',
    date:        '2026-05-19',
    readTime:    '7 min read',
    tag:         'How-To',
    tagColor:    '#0369a1',
    tagBg:       '#e0f2fe',
  },
  {
    slug:        'cmyk-vs-rgb',
    title:       'CMYK vs RGB: Which Color Mode Should You Use and When?',
    description: 'Understand the fundamental difference between CMYK and RGB color modes, when to use each, how they interact with Pantone, and how to avoid common print color errors.',
    date:        '2026-05-19',
    readTime:    '9 min read',
    tag:         'Color Theory',
    tagColor:    '#b45309',
    tagBg:       '#fef3c7',
  },
  {
    slug:        'coated-vs-uncoated',
    title:       'Pantone Coated vs Uncoated: What\'s the Difference and Which Should You Use?',
    description: 'Learn the difference between Pantone Coated (C) and Uncoated (U) colors, why the same Pantone number looks different on each, and how to choose the right variant.',
    date:        '2026-05-19',
    readTime:    '7 min read',
    tag:         'Print',
    tagColor:    '#166534',
    tagBg:       '#dcfce7',
  },
  {
    slug:        'what-is-cmyk',
    title:       'What Is CMYK? The Complete Guide for Designers',
    description: 'Learn what CMYK color mode is, how it works, why it\'s used in print, and how it differs from RGB. A practical guide for graphic designers and print professionals.',
    date:        '2026-05-20',
    readTime:    '7 min read',
    tag:         'Print',
    tagColor:    '#166534',
    tagBg:       '#dcfce7',
  },
  {
    slug:        'how-to-convert-cmyk-to-pantone',
    title:       'How to Convert CMYK to Pantone: A Step-by-Step Guide',
    description: 'Learn how to convert CMYK values to the closest Pantone PMS color — manually, in Adobe software, and with free online tools. Includes tips for print professionals.',
    date:        '2026-05-20',
    readTime:    '6 min read',
    tag:         'How-To',
    tagColor:    '#0369a1',
    tagBg:       '#e0f2fe',
  },
  {
    slug:        'pantone-for-beginners',
    title:       'Pantone for Beginners: Everything You Need to Know',
    description: 'New to Pantone? This beginner\'s guide explains the Pantone Matching System, how to read Pantone codes, the difference between Coated and Uncoated, and when to use Pantone vs CMYK.',
    date:        '2026-05-20',
    readTime:    '8 min read',
    tag:         'Fundamentals',
    tagColor:    '#7c3aed',
    tagBg:       '#f3d0fe',
  },
  {
    slug:        'brand-color-consistency',
    title:       'Brand Color Consistency: How to Keep Colors Accurate Across Print and Digital',
    description: 'Learn how to maintain consistent brand colors across print materials, digital platforms, and physical products. Covers Pantone, CMYK, RGB, HEX, and color management best practices.',
    date:        '2026-05-20',
    readTime:    '9 min read',
    tag:         'Branding',
    tagColor:    '#b45309',
    tagBg:       '#fef3c7',
  },
];

export default function LearnIndexPage() {
  return (
    <>
      <Head>
        <title>Pantone Color Guides & Tutorials — Learn | PantoneConverter.com</title>
        <meta
          name="description"
          content="Free guides on Pantone colors, color conversion, CMYK vs RGB, coated vs uncoated paper, and print design. Learn everything you need to work with PMS colors confidently."
        />
        <link rel="canonical" href="https://pantoneconverter.com/learn/" />
        <meta property="og:type"        content="website" />
        <meta property="og:title"       content="Pantone Color Guides & Tutorials — PantoneConverter.com" />
        <meta property="og:description" content="Free guides on Pantone colors, color conversion, CMYK vs RGB, and print design." />
        <meta property="og:url"         content="https://pantoneconverter.com/learn/" />
      </Head>

      <NavBar />

      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <div className="hero-gradient" style={{ padding: '4rem 1.5rem 3rem' }}>
          <div className="container-xl" style={{ textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: '#f3d0fe', color: '#7c3aed',
              borderRadius: '9999px', padding: '0.35rem 1rem',
              fontSize: '0.75rem', fontWeight: 800,
              textTransform: 'uppercase', letterSpacing: '0.08em',
              marginBottom: '1.25rem',
            }}>
              <BookOpen size={14} strokeWidth={2.5} />
              Learning Center
            </div>

            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900,
              color: '#111827', lineHeight: 1.15, margin: '0 0 1rem',
            }}>
              Pantone Color{' '}
              <span className="gradient-text">Guides & Tutorials</span>
            </h1>

            <p style={{
              fontSize: '1.05rem', color: '#4b5563', lineHeight: 1.7,
              maxWidth: '38rem', margin: '0 auto',
            }}>
              Everything you need to understand Pantone colors, master color conversion, and produce
              consistent results in print and digital design.
            </p>
          </div>
        </div>

        {/* ── Article grid ─────────────────────────────────────── */}
        <div className="container-xl" style={{ padding: '3rem 1.5rem 5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {ARTICLES.map((article) => (
              <Link key={article.slug} href={`/learn/${article.slug}`} style={{ textDecoration: 'none' }}>
                <article
                  style={{
                    background: '#ffffff', borderRadius: '1.25rem',
                    border: '1.5px solid #e5e7eb',
                    padding: '1.75rem',
                    height: '100%', display: 'flex', flexDirection: 'column',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#c4b5fd';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(196,78,237,0.1)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Tag row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{
                      background: article.tagBg, color: article.tagColor,
                      borderRadius: '9999px', padding: '0.2rem 0.75rem',
                      fontSize: '0.7rem', fontWeight: 800,
                      textTransform: 'uppercase', letterSpacing: '0.07em',
                    }}>
                      {article.tag}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600 }}>
                      {article.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 style={{
                    fontSize: '1.05rem', fontWeight: 800, color: '#111827',
                    lineHeight: 1.35, margin: '0 0 0.75rem', flex: 1,
                  }}>
                    {article.title}
                  </h2>

                  {/* Description */}
                  <p style={{
                    fontSize: '0.85rem', color: '#4b5563', lineHeight: 1.65,
                    margin: '0 0 1.25rem',
                  }}>
                    {article.description}
                  </p>

                  {/* Read more link */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '0.375rem',
                    fontSize: '0.82rem', fontWeight: 800, color: '#7c3aed',
                    marginTop: 'auto',
                  }}>
                    Read article
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
