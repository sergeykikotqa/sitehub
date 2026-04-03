import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/portfolio/kitchen",
        destination: "/portfolio/mblmaster",
        permanent: true,
      },
      {
        source: "/portfolio/wardrobe",
        destination: "/portfolio/criatevmebel",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
