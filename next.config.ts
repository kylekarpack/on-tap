import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Tree-shake barrel imports from Mantine so only used components ship
    optimizePackageImports: ["@mantine/core"]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "untappd.akamaized.net"
      },
      {
        protocol: "https",
        hostname: "assets.untappd.com"
      }
    ]
  }
};

export default nextConfig;
