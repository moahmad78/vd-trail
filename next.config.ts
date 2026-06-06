import type { NextConfig } from "next";

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
};

export default nextConfig;
