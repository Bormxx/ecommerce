import type { NextConfig } from "next";

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src *;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '3000',
        pathname: '/images/**',
        search: '',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        // source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Authorization, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Page, Per-Page, Total-Items',
          },
        ]
      }
    ]
  }
};

export default nextConfig;
