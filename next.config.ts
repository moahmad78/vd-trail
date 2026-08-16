import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";
import withBundleAnalyzerInit from "@next/bundle-analyzer";

const withBundleAnalyzer = withBundleAnalyzerInit({
  enabled: process.env.ANALYZE === 'true',
});

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV !== "production",
});

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    optimizePackageImports: ["lucide-react"],
    optimizeCss: true
  },
  images: {
    // Serve WebP for modern browsers — sharp & efficient without visible quality loss
    formats: ["image/webp"],
    // Full breakpoint ladder so hero/fill images always get the right resolution
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Raise the global quality floor from Next.js default (75) to 90
    qualities: [50, 75, 85, 90, 95, 100],
    // Raise minimum cache TTL so optimizer results are reused across requests
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "voometdesign.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/interior-designer-bangalore',
        destination: '/interior-designers-bangalore',
        permanent: true,
      },
      {
        source: '/services/hospitality/:slug*',
        destination: '/services/:slug*',
        permanent: true,
      },
      {
        source: '/portfolio',
        destination: '/designs',
        permanent: true,
      },
      {
        source: '/our-work',
        destination: '/designs',
        permanent: true,
      },
      {
        source: '/our-designs',
        destination: '/designs',
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

export default withBundleAnalyzer(withSerwist(nextConfig));
