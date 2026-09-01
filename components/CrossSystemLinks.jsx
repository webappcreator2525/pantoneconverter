import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LINKS } from '../lib/converterLinks';

/**
 * CrossSystemLinks — "this colour in another system" chip row.
 *
 * The colour-family pages, the HSL converter and the Pantone-to-X pages all end
 * up wanting the same block: a short prompt plus a handful of cross-system
 * converters. Labels come from lib/converterLinks so they read the same here as
 * they do in the navigation and the footer.
 *
 * @param {object} props
 * @param {string} [props.heading]
 * @param {string} [props.intro]
 * @param {Array<string>} props.routes  Converter paths, in display order.
 * @param {string} [props.accentColor]  Border accent for the card.
 */
export default function CrossSystemLinks({
  heading = 'The same colour in other systems',
  intro,
  routes = [],
  accentColor = '#c44eed',
  id,
}) {
  const links = routes
    .map((href) => (LINKS[href] ? { href, ...LINKS[href] } : null))
    .filter(Boolean);

  if (links.length === 0) return null;

  return (
    <section id={id} className="card" style={{ borderTop: `3px solid ${accentColor}` }} aria-labelledby="cross-system-heading">
      <h2
        id="cross-system-heading"
        style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}
      >
        {heading}
      </h2>

      {intro && (
        <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.75, margin: '0 0 1rem' }}>
          {intro}
        </p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))', gap: '0.65rem' }}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              display: 'block', padding: '0.75rem 0.9rem', borderRadius: '0.75rem',
              border: '1.5px solid #e5e7eb', background: '#f9fafb', textDecoration: 'none',
              transition: 'border-color 0.15s ease, background 0.15s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#c4b5fd'; e.currentTarget.style.background = '#fdf4ff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.background = '#f9fafb'; }}
          >
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#7c3aed', lineHeight: 1.3 }}>
                {link.label}
              </span>
              <ArrowRight size={14} color="#a78bfa" strokeWidth={2.5} style={{ flexShrink: 0 }} />
            </span>
            <span style={{ display: 'block', fontSize: '0.76rem', color: '#4b5563', lineHeight: 1.5, marginTop: '0.25rem' }}>
              {link.description}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
