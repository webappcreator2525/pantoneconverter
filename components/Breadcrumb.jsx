import Link from 'next/link';

/**
 * Breadcrumb — the trail used on the colour hubs and /learn articles, pulled
 * out so the converter pages can carry the same one instead of a third copy.
 *
 * Renders the visible nav only. The matching BreadcrumbList JSON-LD is built by
 * `breadcrumbSchema()` below so the two can never drift apart.
 *
 * @param {object}  props
 * @param {Array<{ label: string, href: string }>} props.trail
 *        Ordered crumbs, as returned by `buildTrail()`. The last one is the
 *        current page and renders as plain text however it is linked.
 * @param {boolean} [props.onDark]    Invert the palette for a saturated hero.
 * @param {boolean} [props.centered]  Centre the trail, for the centred heroes
 *        on /about, /privacy and /learn — the colour hubs already do this.
 */
export default function Breadcrumb({ trail = [], onDark = false, centered = false }) {
  const linkColor    = onDark ? 'rgba(255,255,255,0.75)' : '#4b5563';
  const currentColor = onDark ? '#ffffff' : '#111827';
  const sepColor     = onDark ? 'rgba(255,255,255,0.4)' : '#d1d5db';
  const hoverColor   = onDark ? '#ffffff' : '#7c3aed';

  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: '1.25rem' }}>
      <ol style={{
        display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.4rem',
        justifyContent: centered ? 'center' : 'flex-start',
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
 * BreadcrumbList JSON-LD for the exact trail the component renders — same array
 * in, so the visible crumbs and the structured data cannot disagree.
 *
 * @param {Array<{ label: string, href: string }>} trail  From `buildTrail()`.
 * @param {string} [siteUrl]
 */
export function breadcrumbSchema(trail, siteUrl = SITE_URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      item: `${siteUrl}${crumb.href}`,
    })),
  };
}

// ─── Trail building ──────────────────────────────────────────────────────────

export const SITE_URL = 'https://pantoneconverter.com';

/**
 * The only URL segments that own a real level of the hierarchy.
 *
 * Everything else is a leaf sitting directly under the home page — the
 * converters included. They live at the root in both the sitemap and the nav,
 * so giving them a "Tools" or "Converters" crumb would point Google at a level
 * that does not exist.
 *
 * A hub's label is the one its child pages already display, so the crumb reads
 * identically wherever it appears.
 */
const HUBS = {
  'brands':                    { label: 'Brand Colors',      href: '/brands/' },
  'learn':                     { label: 'Learn',             href: '/learn/' },
  'pantone-color-of-the-year': { label: 'Color of the Year', href: '/pantone-color-of-the-year/' },
};

/** `about`, `/about`, or a full canonical URL → `/about/`. Home → `/`. */
function normalisePath(pathOrUrl) {
  const segments = String(pathOrUrl)
    .replace(/^https?:\/\/[^/]+/, '')
    .split('/')
    .filter(Boolean);
  return segments.length ? `/${segments.join('/')}/` : '/';
}

/**
 * buildTrail — the crumb trail for a page, derived from its URL segments.
 *
 * @param {string} pathOrUrl  Path or canonical URL of the current page.
 * @param {string} label      Name of the current page (its H1, shortened).
 * @returns {Array<{ label: string, href: string }>} Trail for <Breadcrumb> and
 *          for `breadcrumbSchema()` — pass the same array to both.
 */
export function buildTrail(pathOrUrl, label) {
  const segments = normalisePath(pathOrUrl).split('/').filter(Boolean);
  const trail = [{ label: 'Home', href: '/' }];

  segments.slice(0, -1).forEach((segment, i) => {
    const hub = HUBS[segment];
    if (!hub) {
      throw new Error(
        `Breadcrumb: "/${segments.slice(0, i + 1).join('/')}/" is not a registered hub — ` +
        'add it to HUBS in components/Breadcrumb.jsx before nesting a page beneath it.'
      );
    }
    trail.push(hub);
  });

  if (segments.length) trail.push({ label, href: normalisePath(pathOrUrl) });
  return trail;
}

/**
 * BreadcrumbList JSON-LD for a page, straight from its path.
 *
 * Returns null for the home page: a one-item breadcrumb says nothing Google
 * does not already know, and Search Console flags it.
 *
 * @param {string} pathOrUrl
 * @param {string} label
 */
export function breadcrumbSchemaFor(pathOrUrl, label) {
  const trail = buildTrail(pathOrUrl, label);
  return trail.length > 1 ? breadcrumbSchema(trail) : null;
}
