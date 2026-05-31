/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';
// Set this to your GitHub repo name — used for basePath on GitHub Pages
const repoName = process.env.REPO_NAME || 'portfolio';

const nextConfig = {
  // Only enable static export for production builds (GitHub Pages)
  ...(isProd && { output: 'export' }),
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: isProd,
};

export default nextConfig;
