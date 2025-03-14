/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "192.168.1.158",
      },
    ],
  },
};

module.exports = nextConfig;

