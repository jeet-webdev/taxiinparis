// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     unoptimized: true,
//   },
//   experimental: {
//     serverActions: {
//       bodySizeLimit: "5mb", // Increase this to 5mb or 10mb
//     },
//   },
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Remove 'unoptimized: true' to enable Next.js performance features
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
