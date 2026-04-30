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
      beforeFiles: [
        {
          source: "/:path(.*\\.html)",
          destination: "/api/verification/:path",
        },
        {
          source: "/:path((?!ads\\.txt$).*\\.txt)",
          destination: "/api/verification/:path",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
