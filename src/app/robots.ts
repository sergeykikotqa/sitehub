import type { MetadataRoute } from "next";

import { toAbsoluteSiteUrl } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin",
    },
    sitemap: toAbsoluteSiteUrl("/sitemap.xml"),
  };
}
