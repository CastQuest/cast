/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@castquest/sdk"],
  images: {
    domains: ["ipfs.io", "gateway.pinata.cloud"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
