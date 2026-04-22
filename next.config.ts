import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Matches any domain using HTTPS
      },
      {
        protocol: "http",
        hostname: "**", // Matches any domain using HTTP
      },
    ],
  },
  async rewrites() {
    return {
      afterFiles: [
        {
          source: "/:file([^/]+\\.html)",
          destination: "/api/seo-verification/:file",
        },
      ],
    };
  },
};

export default nextConfig;
