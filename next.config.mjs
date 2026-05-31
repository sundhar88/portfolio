/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';
// Update this to your GitHub repo name once created
const repoName = process.env.REPO_NAME || 'portfolio';

const nextConfig = {
  output: 'export',
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
