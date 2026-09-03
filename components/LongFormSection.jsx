import Link from 'next/link';

/**
 * The typographic furniture for the long-form bodies on the converter pages.
 *
 * Shared so the two pages look like one site; deliberately content-free so
 * they never read like one page. Every heading, paragraph and list item is
 * written per page and passed in.
 */

/** One <section> with an <h2>, anchored so the FAQ and nav can link into it. */
export function Section({ id, heading, accent = '#c44eed', children, kicker }) {
  return (
    <section
      id={id}
      className="card"
      style={{ borderTop: `3px solid ${accent}`, scrollMarginTop: '5rem' }}
      aria-labelledby={`${id}-heading`}
    >
      {kicker && (
        <div style={{
          fontSize: '0.68rem', fontWeight: 800, color: accent,
          textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: '0.4rem',
        }}>
          {kicker}
        </div>
      )}
      <h2
        id={`${id}-heading`}
        style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: '0 0 0.85rem', lineHeight: 1.35 }}
      >
        {heading}
      </h2>
      {children}
    </section>
  );
}

/** Body paragraph. */
export function P({ children, style }) {
  return (
    <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.8, margin: '0 0 0.9rem', ...style }}>
      {children}
    </p>
  );
}

/** Sub-heading inside a Section. */
export function H3({ id, children }) {
  return (
    <h3
      id={id}
      style={{
        fontSize: '1rem', fontWeight: 800, color: '#111827',
        margin: '1.5rem 0 0.6rem', scrollMarginTop: '5rem',
      }}
    >
      {children}
    </h3>
  );
}

/** Numbered procedure — the shape HowTo schema is generated from. */
export function Steps({ items }) {
  return (
    <ol style={{
      margin: '0 0 0.9rem', paddingLeft: '1.35rem',
      fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.8,
    }}>
      {items.map((item, i) => (
        <li key={i} style={{ marginBottom: '0.35rem' }}>{item}</li>
      ))}
    </ol>
  );
}

/** Bulleted list, same rhythm as Steps. */
export function Bullets({ items }) {
  return (
    <ul style={{
      margin: '0 0 0.9rem', paddingLeft: '1.35rem',
      fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.8,
    }}>
      {items.map((item, i) => (
        <li key={i} style={{ marginBottom: '0.35rem' }}>{item}</li>
      ))}
    </ul>
  );
}

/** Tinted aside for a caveat that must not be skimmed past. */
export function Callout({ tone = 'warn', title, children }) {
  const tones = {
    warn:  { bg: '#fffbeb', border: '#fcd34d', head: '#92400e' },
    info:  { bg: '#eff6ff', border: '#93c5fd', head: '#1e40af' },
    good:  { bg: '#f0fdf4', border: '#86efac', head: '#166534' },
  };
  const t = tones[tone] || tones.info;
  return (
    <div style={{
      background: t.bg, border: `1px solid ${t.border}`, borderRadius: '0.75rem',
      padding: '0.9rem 1rem', margin: '0 0 0.9rem',
    }}>
      {title && (
        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: t.head, marginBottom: '0.35rem' }}>
          {title}
        </div>
      )}
      <div style={{ fontSize: '0.85rem', color: '#374151', lineHeight: 1.75 }}>{children}</div>
    </div>
  );
}

/** Inline internal link, styled to read as a link inside body copy. */
export function A({ href, children }) {
  return (
    <Link href={href} style={{ color: '#7c3aed', fontWeight: 600, textDecoration: 'underline' }}>
      {children}
    </Link>
  );
}

/**
 * A hand-written related-links block. Takes an explicit list rather than
 * resolving labels from lib/converterLinks, because the whole point is that
 * each page writes its own anchor text for its own reasons.
 */
export function RelatedLinks({ id, heading, intro, links, accent = '#c44eed' }) {
  return (
    <Section id={id} heading={heading} accent={accent}>
      <P>{intro}</P>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(16rem, 1fr))', gap: '0.65rem' }}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              display: 'block', padding: '0.8rem 0.95rem', borderRadius: '0.75rem',
              border: '1.5px solid #e5e7eb', background: '#f9fafb', textDecoration: 'none',
            }}
          >
            <span style={{ display: 'block', fontSize: '0.83rem', fontWeight: 800, color: '#7c3aed', lineHeight: 1.35 }}>
              {link.label}
            </span>
            <span style={{ display: 'block', fontSize: '0.78rem', color: '#4b5563', lineHeight: 1.55, marginTop: '0.3rem' }}>
              {link.why}
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
