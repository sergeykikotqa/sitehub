import type { Metadata } from "next";

import rawSiteSettings from "../../content/settings/site.json";

import { siteSettingsSchema } from "@/lib/content/schemas";

const siteSettingsResult = siteSettingsSchema.safeParse(rawSiteSettings);

if (!siteSettingsResult.success) {
  const issues = siteSettingsResult.error.issues
    .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
    .join("; ");

  throw new Error(`Invalid content/settings/site.json: ${issues}`);
}

export const siteSettings = siteSettingsResult.data;

const metadataBaseUrl = new URL(siteSettings.siteUrl);

function trimTrailingSlash(value: string) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export function toAbsoluteSiteUrl(path: string) {
  const normalizedPath = path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, `${trimTrailingSlash(metadataBaseUrl.toString())}/`).toString();
}

export const baseMetadata: Metadata = {
  metadataBase: metadataBaseUrl,
  title: siteSettings.defaultTitle,
  description: siteSettings.defaultDescription,
  alternates: {
    canonical: toAbsoluteSiteUrl("/"),
  },
  openGraph: {
    title: siteSettings.defaultTitle,
    description: siteSettings.defaultDescription,
    siteName: siteSettings.brandName,
    locale: "ru_RU",
    type: "website",
    url: toAbsoluteSiteUrl("/"),
    images: [toAbsoluteSiteUrl(siteSettings.defaultOgImage)],
  },
  twitter: {
    card: "summary_large_image",
    title: siteSettings.defaultTitle,
    description: siteSettings.defaultDescription,
    images: [toAbsoluteSiteUrl(siteSettings.defaultOgImage)],
  },
};
