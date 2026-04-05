import type { NextConfig } from "next";

const httpsSiteUrlFromEnv =
  process.env.SITE_URL?.trim() || process.env.NEXT_PUBLIC_SITE_URL?.trim() || "";

const isHttpsProduction =
  process.env.NODE_ENV === "production" && httpsSiteUrlFromEnv.startsWith("https://");

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  ...(isHttpsProduction
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains",
        },
      ]
    : []),
] as const;

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [...securityHeaders],
      },
    ];
  },
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
