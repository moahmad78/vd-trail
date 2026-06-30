import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV !== "production",
});

const nextConfig: NextConfig = {
  images: {
    // Serve WebP for modern browsers — sharp & efficient without visible quality loss
    formats: ["image/webp"],
    // Full breakpoint ladder so hero/fill images always get the right resolution
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Raise the global quality floor from Next.js default (75) to 90
    qualities: [50, 75, 90, 95, 100],
    // Raise minimum cache TTL so optimizer results are reused across requests
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "voomet.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/services/hospitality/:slug*',
        destination: '/services/:slug*',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        // Far-future cache for all static media — 1 year, immutable
        source: '/video/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/logo/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  turbopack: {},

};

export default withSerwist(nextConfig);
