import { ogImageFor, SITE_URL, OG_WIDTH, OG_HEIGHT } from '../lib/ogCards.mjs';

/**
 * The social tags every page shares: canonical og:url, the Open Graph image
 * (with its real dimensions and alt text) and the Twitter card.
 *
 * Not a component — it returns an array of elements so it can be spread
 * straight into `next/head`, which only picks up direct children:
 *
 *   <Head>
 *     <title>…</title>
 *     <meta name="description" content="…" />
 *     <link rel="canonical" href="…" />
 *     <meta property="og:title" content="…" />
 *     <meta property="og:description" content="…" />
 *     {ogMeta({ path: '/hex-to-pantone/' })}
 *   </Head>
 *
 * The image is looked up from lib/ogCards.mjs by `path`; pages without their
 * own card fall back to the site-wide og-image.png.
 *
 * @param {object}  opts
 * @param {string}  opts.path   canonical path, with trailing slash
 * @param {string} [opts.type]  og:type — 'website' (default) or 'article'
 * @param {string} [opts.image] absolute-from-root path overriding the card
 * @param {string} [opts.imageAlt] overrides the card's alt text
 */
export default function ogMeta({ path, type = 'website', image, imageAlt }) {
  const { url, alt } = ogImageFor(path, image);
  return [
    <meta key="og:site_name" property="og:site_name" content="PantoneConverter.com" />,
    <meta key="og:type" property="og:type" content={type} />,
    <meta key="og:url" property="og:url" content={`${SITE_URL}${path}`} />,
    <meta key="og:image" property="og:image" content={url} />,
    <meta key="og:image:width" property="og:image:width" content={String(OG_WIDTH)} />,
    <meta key="og:image:height" property="og:image:height" content={String(OG_HEIGHT)} />,
    <meta key="og:image:alt" property="og:image:alt" content={imageAlt || alt} />,
    <meta key="twitter:card" name="twitter:card" content="summary_large_image" />,
    <meta key="twitter:image" name="twitter:image" content={url} />,
    <meta key="twitter:image:alt" name="twitter:image:alt" content={imageAlt || alt} />,
  ];
}
