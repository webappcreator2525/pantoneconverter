import Link from 'next/link';

/**
 * Breadcrumb — the trail used on the colour hubs and /learn articles, pulled
 * out so the converter pages can carry the same one instead of a third copy.
 *
 * Renders the visible nav only. The matching BreadcrumbList JSON-LD is built by
 * `breadcrumbSchema()` below so the two can never drift apart.
 *
 * @param {object}  props
 * @param {Array<{ label: string, href?: string }>} props.trail
 *        Ordered crumbs. The last one is the current page and must omit `href`.
 * @param {boolean} [props.onDark]  Invert the palette for a saturated hero.
 */
export default function Breadcrumb({ trail = [], onDark = false }) {
  const linkColor    = onDark ? 'rgba(255,255,255,0.75)' : '#4b5563';
  const currentColor = onDark ? '#ffffff' : '#111827';
  const sepColor     = onDark ? 'rgba(255,255,255,0.4)' : '#d1d5db';
  const hoverColor   = onDark ? '#ffffff' : '#7c3aed';

  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: '1.25rem' }}>
      <ol style={{
        display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem',
        listStyle: 'none', margin: 0, padding: 0,
        fontSize: '0.8rem', fontWeight: 600, color: linkColor,
      }}>
        {trail.map((crumb, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={crumb.href || crumb.label} style={{ display: 'contents' }}>
              {i > 0 && (
                <span aria-hidden="true" style={{ color: sepColor }}>›</span>
              )}
              {isLast || !crumb.href ? (
                <span style={{ color: currentColor }} aria-current="page">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  style={{ color: linkColor, textDecoration: 'none', transition: 'color 0.15s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = hoverColor; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = linkColor; }}
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * BreadcrumbList JSON-LD for the same trail the component renders.
 * Crumbs without an href (the current page) fall back to `currentUrl`.
 *
 * @param {Array<{ label: string, href?: string }>} trail
 * @param {string} currentUrl  Absolute canonical URL of the page.
 * @param {string} [siteUrl]
 */
export function breadcrumbSchema(trail, currentUrl, siteUrl = 'https://pantoneconverter.com') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      item: crumb.href ? `${siteUrl}${crumb.href}` : currentUrl,
    })),
  };
}
