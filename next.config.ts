import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',         // Required: static HTML export for Cloudflare Pages
  trailingSlash: true,      // Required: Cloudflare Pages expects index.html in each folder
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,      // Required: no image optimization server on Cloudflare Pages
  },
  transpilePackages: ['motion'],

  turbopack: {},

  webpack: (config, { dev }) => {
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
