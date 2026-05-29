import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Head from 'next/head';

/**
 * FAQSection — animated accordion FAQ block for MDX articles.
 * Props: items [{ question, answer }]
 */
export function FAQSection({ items = [], suppressSchema = false }) {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <>
      {!suppressSchema && (
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        </Head>
      )}
      <section aria-label="Frequently Asked Questions" style={{ margin: '2rem 0' }}>
      <h2 style={{
        fontSize: '1.4rem', fontWeight: 800, color: '#111827',
        marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
      }}>
        Frequently Asked Questions
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              style={{
                borderRadius: '0.875rem',
                border: `1.5px solid ${isOpen ? '#c4b5fd' : '#e5e7eb'}`,
                background: isOpen ? '#fdf4ff' : '#ffffff',
                overflow: 'hidden',
                transition: 'border-color 0.2s ease, background 0.2s ease',
                boxShadow: isOpen ? '0 2px 12px rgba(196,78,237,0.08)' : 'none',
              }}
            >
              <button
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', gap: '1rem',
                  padding: '1rem 1.25rem', background: 'none', border: 'none',
                  cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
                }}
              >
                <span style={{
                  fontSize: '0.95rem', fontWeight: 700,
                  color: isOpen ? '#7c3aed' : '#111827',
                  lineHeight: 1.45, transition: 'color 0.2s ease',
                }}>
                  {item.question}
                </span>

                <span style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '1.75rem', height: '1.75rem', borderRadius: '50%',
                  background: isOpen ? '#f3d0fe' : '#f3f4f6', flexShrink: 0,
                  transition: 'background 0.2s ease, transform 0.25s ease',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}>
                  <ChevronDown size={16} color={isOpen ? '#7c3aed' : '#4b5563'} strokeWidth={2.5} />
                </span>
              </button>

              <div style={{
                maxHeight: isOpen ? '600px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease',
              }}>
                <div style={{
                  padding: '0 1.25rem 1.25rem',
                  fontSize: '0.9rem', lineHeight: 1.7, color: '#4b5563',
                }}>
                  {item.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
    </>
  );
}

export default FAQSection;
