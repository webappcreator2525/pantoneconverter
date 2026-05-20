import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { InfoBox }      from '@/components/InfoBox';
import { FAQSection }   from '@/components/FAQSection';
import { RelatedTools } from '@/components/RelatedTools';
import { ColorSwatch }  from '@/components/ColorSwatch';

// ── Strip ESM import/export nodes so next-mdx-remote doesn't choke ──────────
function remarkStripImports() {
  return (tree) => {
    tree.children = tree.children.filter((node) => node.type !== 'mdxjsEsm');
  };
}

// ── MDX component map ────────────────────────────────────────────────────────
const components = {
  Image,
  InfoBox,
  FAQSection,
  RelatedTools,
  ColorSwatch,
};

// ── Content directory ────────────────────────────────────────────────────────
const CONTENT_DIR = path.join(process.cwd(), 'content', 'learn');

// ── getStaticPaths ───────────────────────────────────────────────────────────
export async function getStaticPaths() {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => /\.mdx?$/.test(f));
  const paths = files.map((file) => ({
    params: { slug: file.replace(/\.mdx?$/, '') },
  }));
  return { paths, fallback: false };
}

// ── getStaticProps ───────────────────────────────────────────────────────────
export async function getStaticProps({ params }) {
  const { slug } = params;

  let filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) filePath = path.join(CONTENT_DIR, `${slug}.md`);

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { content, data: frontmatter } = matter(raw);

  const mdxSource = await serialize(content, {
    scope: frontmatter,
    mdxOptions: {
      remarkPlugins: [remarkStripImports, remarkGfm],
      development: process.env.NODE_ENV === 'development',
    },
    blockJS: false,
  });

  return {
    props: {
      mdxSource,
      frontmatter: {
        title:        frontmatter.title        ?? '',
        description:  frontmatter.description  ?? '',
        date:         frontmatter.date         ?? '',
        lastModified: frontmatter.lastModified ?? frontmatter.date ?? '',
        canonical:    frontmatter.canonical    ?? '',
        ogImage:      frontmatter.ogImage      ?? '',
        keywords:     frontmatter.keywords     ?? [],
        slug,
      },
    },
  };
}

// ── Page Component ───────────────────────────────────────────────────────────
export default function LearnArticlePage({ mdxSource, frontmatter }) {
  const { title, description, date, lastModified, canonical, ogImage, keywords, slug } = frontmatter;

  const siteUrl      = 'https://pantoneconverter.com';
  const canonicalUrl = canonical || `${siteUrl}/learn/${slug}`;
  const ogImageUrl   = ogImage ? `${siteUrl}${ogImage}` : `${siteUrl}/og/default.png`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": ogImageUrl,
    "datePublished": date || "2026-05-19",
    "dateModified": lastModified || date || "2026-05-19",
    "author": {
      "@type": "Organization",
      "name": "PantoneConverter",
      "url": "https://pantoneconverter.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "PantoneConverter",
      "logo": {
        "@type": "ImageObject",
        "url": "https://pantoneconverter.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://pantoneconverter.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Learn",
        "item": "https://pantoneconverter.com/learn/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": canonicalUrl
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description"  content={description} />
        {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type"        content="article" />
        <meta property="og:title"       content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url"         content={canonicalUrl} />
        <meta property="og:image"       content={ogImageUrl} />
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image"       content={ogImageUrl} />
        {date         && <meta property="article:published_time" content={date} />}
        {lastModified && <meta property="article:modified_time"  content={lastModified} />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </Head>

      <NavBar />

      <main>
        {/* ── Hero banner ──────────────────────────────────────── */}
        <div className="hero-gradient" style={{ padding: '3rem 1.5rem 2rem' }}>
          <div className="container-xl">
            <nav aria-label="Breadcrumb" style={{ marginBottom: '1.25rem' }}>
              <ol style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                listStyle: 'none', margin: 0, padding: 0,
                fontSize: '0.8rem', fontWeight: 600, color: '#4b5563',
              }}>
                <li>
                  <Link href="/" style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#7c3aed'} onMouseLeave={e => e.currentTarget.style.color = '#4b5563'}>
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" style={{ color: '#d1d5db' }}>›</li>
                <li>
                  <Link href="/learn" style={{ color: '#4b5563', textDecoration: 'none', transition: 'color 0.15s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#7c3aed'} onMouseLeave={e => e.currentTarget.style.color = '#4b5563'}>
                    Learn
                  </Link>
                </li>
                <li aria-hidden="true" style={{ color: '#d1d5db' }}>›</li>
                <li style={{ color: '#111827' }}>{title}</li>
              </ol>
            </nav>

            <h1 style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 900,
              color: '#111827', lineHeight: 1.22, margin: '0 0 0.75rem', maxWidth: '52rem',
            }}>
              {title}
            </h1>

            {(date || lastModified) && (
              <p style={{ fontSize: '0.8rem', color: '#4b5563', fontWeight: 600, margin: 0 }}>
                {date && (
                  <>Published <time dateTime={date}>{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time></>
                )}
                {lastModified && lastModified !== date && (
                  <> · Updated <time dateTime={lastModified}>{new Date(lastModified).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time></>
                )}
              </p>
            )}
          </div>
        </div>

        {/* ── Article body ─────────────────────────────────────── */}
        <div className="container-xl" style={{ padding: '2.5rem 1.5rem 4rem' }}>
          <article className="mdx-prose">
            <MDXRemote {...mdxSource} components={components} />
          </article>
        </div>
      </main>

      <Footer />

      <style>{`
        .mdx-prose {
          max-width: 52rem;
          color: #1f2937;
          font-size: 1rem;
          line-height: 1.8;
        }
        .mdx-prose h1,
        .mdx-prose h2,
        .mdx-prose h3,
        .mdx-prose h4 {
          font-weight: 800; color: #111827;
          line-height: 1.25; margin-top: 2rem; margin-bottom: 0.75rem;
          scroll-margin-top: 5rem;
        }
        .mdx-prose h1 { font-size: clamp(1.5rem, 3.5vw, 2rem); }
        .mdx-prose h2 { font-size: 1.45rem; padding-bottom: 0.375rem; border-bottom: 2px solid #f3f4f6; }
        .mdx-prose h3 { font-size: 1.15rem; }
        .mdx-prose h4 { font-size: 1rem; color: #374151; }
        .mdx-prose p  { margin: 0 0 1.2rem; }
        .mdx-prose a  {
          color: #7c3aed; text-decoration: underline;
          text-decoration-thickness: 1px; text-underline-offset: 2px;
          font-weight: 600; transition: color 0.15s ease;
        }
        .mdx-prose a:hover { color: #5b21b6; }
        .mdx-prose strong { font-weight: 800; color: #111827; }
        .mdx-prose em     { font-style: italic; }
        .mdx-prose hr     { border: none; border-top: 2px solid #f3f4f6; margin: 2rem 0; }
        .mdx-prose ul,
        .mdx-prose ol     { padding-left: 1.5rem; margin: 0 0 1.2rem; }
        .mdx-prose li     { margin-bottom: 0.4rem; line-height: 1.7; }
        .mdx-prose ul li  { list-style-type: disc; }
        .mdx-prose ol li  { list-style-type: decimal; }
        .mdx-prose code {
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 0.875em; background: #f3f4f6;
          color: #7c3aed; padding: 0.1em 0.35em;
          border-radius: 0.3rem; font-weight: 600;
        }
        .mdx-prose pre {
          background: #111827; border-radius: 0.875rem;
          padding: 1.25rem 1.5rem; overflow-x: auto; margin: 1.5rem 0;
        }
        .mdx-prose pre code {
          background: none; color: #e5e7eb; padding: 0; font-size: 0.875rem;
        }
        .mdx-prose blockquote {
          border-left: 3px solid #c4b5fd; margin: 1.5rem 0;
          padding: 0.5rem 0 0.5rem 1.25rem; color: #4b5563; font-style: italic;
        }
        /* ── Tables ── */
        .mdx-prose table {
          width: 100%; border-collapse: collapse;
          margin: 1.5rem 0; font-size: 0.88rem;
          border-radius: 0.75rem; overflow: hidden;
          box-shadow: 0 0 0 1.5px #e5e7eb;
        }
        .mdx-prose th {
          background: #f9fafb; font-weight: 800; text-align: left;
          padding: 0.625rem 1rem; border-bottom: 1.5px solid #e5e7eb;
          color: #374151; font-size: 0.78rem;
          text-transform: uppercase; letter-spacing: 0.05em;
        }
        .mdx-prose td {
          padding: 0.625rem 1rem; border-bottom: 1px solid #f3f4f6;
          color: #4b5563; vertical-align: top;
        }
        .mdx-prose tr:last-child td   { border-bottom: none; }
        .mdx-prose tr:nth-child(even) td { background: #fafafa; }
      `}</style>
    </>
  );
}
