/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  basePath: '/bid-sniper-ai',
  assetPrefix: '/bid-sniper-ai/',
};

module.exports = nextConfig;
