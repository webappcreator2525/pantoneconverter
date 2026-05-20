/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://pantoneconverter.com',
  generateRobotsTxt: true,
  outDir: 'out', // The static export directory
  autoLastmod: true,
  generateIndexSitemap: false, // Don't create sitemap-0.xml etc for simple sites
  exclude: ['/saved'], // Exclude saved page from sitemap
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
      path === '/compare'
    ) {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path.startsWith('/brands')) {
      priority = 0.7;
      changefreq = 'monthly';
    } else if (path.startsWith('/learn')) {
      priority = 0.6;
      changefreq = 'yearly';
    } else if (path.startsWith('/pantone-color-of-the-year')) {
      priority = 0.4;
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
