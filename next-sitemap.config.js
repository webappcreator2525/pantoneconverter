/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://pantoneconverter.com',
  generateRobotsTxt: true,
  outDir: 'out', // The static export directory
  autoLastmod: true,
  generateIndexSitemap: false, // Don't create sitemap-0.xml etc for simple sites
}
