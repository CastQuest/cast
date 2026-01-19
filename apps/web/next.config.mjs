import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  output: 'standalone', // Enable for Docker deployment
  // Uncomment below for static export
  // output: 'export',
};

export default nextConfig;
