import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "5mb", // Increase this to 5mb or 10mb
    },
  },
};

export default nextConfig;
