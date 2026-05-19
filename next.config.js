/** @type {import('next').NextConfig} */

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    // remarkPlugins / rehypePlugins can be added here if needed
  },
});

const nextConfig = withMDX({
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Treat .md and .mdx files as pages (for /pages-based MDX if ever used)
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
});

module.exports = nextConfig;
