/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://pantoneconverter.com',
  generateRobotsTxt: true,
  outDir: 'out', // The static export directory
  autoLastmod: true,
  generateIndexSitemap: false, // Don't create sitemap-0.xml etc for simple sites
  exclude: ['/saved'], // Exclude saved page from sitemap
  // Anything the transform below does not classify is reference content, not
  // something that changes daily — which is what next-sitemap defaults to.
  changefreq: 'monthly',
  priority: 0.7,
  transform: async (config, path) => {
    let priority = config.priority;
    let changefreq = config.changefreq;

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (
      path === '/hex-to-pantone' ||
      path === '/rgb-to-pantone' ||
      path === '/cmyk-to-pantone' ||
      path === '/hsl-to-pantone' ||
      path === '/image-to-pantone' ||
      path === '/pantone-to-hex' ||
      path === '/pantone-to-rgb' ||
      path === '/pantone-to-cmyk' ||
      path === '/pantone-finder' ||
      path === '/compare' ||
      // Industrial colour-system converters — same tier as the core tools.
      path === '/pantone-to-ral' ||
      path === '/ral-to-pantone' ||
      path === '/pantone-to-ncs' ||
      path === '/pantone-to-hks' ||
      path === '/pantone-to-toyo' ||
      path === '/pantone-to-trumatch' ||
      path === '/pantone-to-federal-standard-595' ||
      path === '/pantone-to-lab' ||
      path === '/lab-to-pantone' ||
      path === '/pantone-to-hsv' ||
      path === '/hsv-to-pantone' ||
      // Craft-material and paint-brand converters.
      path === '/pantone-to-dmc' ||
      path === '/pantone-to-copic' ||
      path === '/pantone-to-oracal' ||
      path === '/pantone-to-siser-htv' ||
      path === '/pantone-to-sherwin-williams' ||
      path === '/pantone-to-benjamin-moore' ||
      path === '/pantone-to-dulux' ||
      path === '/pantone-to-farrow-and-ball' ||
      path === '/pantone-to-behr' ||
      // Fashion and textile Pantone (TCX) converters.
      path === '/tcx-to-hex' ||
      path === '/hex-to-tcx' ||
      path === '/pantone-c-to-tcx' ||
      path === '/tcx-vs-tpx-vs-tpg' ||
      path === '/pantone-textile-to-cmyk'
    ) {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (/^\/pantone-(red|blue|green|yellow|orange|pink|purple|gold|black|white)$/.test(path)) {
      // Colour hub pages: evergreen reference content and strong search entry
      // points, so they rank above brand pages but below the converters.
      priority = 0.8;
      changefreq = 'monthly';
    } else if (path.startsWith('/brands')) {
      priority = 0.7;
      changefreq = 'monthly';
    } else if (path.startsWith('/learn')) {
      priority = 0.6;
      changefreq = 'yearly';
    } else if (path === '/pantone-color-of-the-year/2026') {
      priority = 0.8;
      changefreq = 'yearly';
    } else if (path.startsWith('/pantone-color-of-the-year')) {
      priority = 0.4;
      changefreq = 'yearly';
    } else if (path === '/about') {
      priority = 0.5;
      changefreq = 'yearly';
    } else if (path === '/privacy') {
      priority = 0.3;
      changefreq = 'yearly';
    }

    return {
      loc: path,
      changefreq: changefreq,
      priority: priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
}
