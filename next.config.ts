import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
