import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

/**
 * RelatedTools — card grid linking to internal converter pages.
 * Props: tools [{ title, href, description }]
 */
export function RelatedTools({ tools = [] }) {
  return (
    <section aria-label="Related Tools" style={{ margin: '2rem 0' }}>
      <h2 style={{
        fontSize: '1.4rem', fontWeight: 800, color: '#111827',
        marginBottom: '1.25rem',
      }}>
        Related Tools
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '0.875rem',
      }}>
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} style={{ textDecoration: 'none' }}>
            <div
              style={{
                padding: '1.1rem 1.25rem', borderRadius: '0.875rem',
                border: '1.5px solid #e5e7eb', background: '#ffffff',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
                cursor: 'pointer', height: '100%',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#c4b5fd';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(196,78,237,0.12)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', marginBottom: '0.5rem',
              }}>
                <span style={{
                  fontSize: '0.9rem', fontWeight: 800,
                  color: '#7c3aed', lineHeight: 1.3,
                }}>
                  {tool.title}
                </span>
                <ArrowRight size={16} color="#a78bfa" strokeWidth={2.5} style={{ flexShrink: 0, marginLeft: '0.5rem' }} />
              </div>

              <p style={{ fontSize: '0.8rem', color: '#4b5563', lineHeight: 1.55, margin: 0 }}>
                {tool.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default RelatedTools;
