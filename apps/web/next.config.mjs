/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  transpilePackages: ['@castquest/sdk', '@castquest/agents'],
  images: {
    domains: ['ipfs.io', 'arweave.net', 'cdn.castquest.xyz'],
  },
  webpack(config) {
    config.experiments = { ...config.experiments, asyncWebAssembly: true };
    config.module.rules.push({ test: /\.wasm$/, type: 'webassembly/async' });
    return config;
  },
};

export default nextConfig;
