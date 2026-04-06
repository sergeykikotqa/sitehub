import type { Metadata } from "next";

import rawSiteSettings from "../../content/settings/site.json";

import { siteSettingsSchema } from "@/lib/content/schemas";
import type { CtaRouteContent, CtaRouteKey } from "@/types/content";

const siteSettingsResult = siteSettingsSchema.safeParse(rawSiteSettings);

if (!siteSettingsResult.success) {
  const issues = siteSettingsResult.error.issues
    .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
    .join("; ");

  throw new Error(`Invalid content/settings/site.json: ${issues}`);
}

export const siteSettings = siteSettingsResult.data;

if (/yourlink/i.test(siteSettings.ctaHref)) {
  throw new Error(
    "Invalid content/settings/site.json: ctaHref still uses a placeholder value.",
  );
}

const resolvedSiteUrl =
  process.env.SITE_URL?.trim() ||
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  siteSettings.siteUrl;

const metadataBaseUrl = new URL(resolvedSiteUrl);

function trimTrailingSlash(value: string) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function normalizeBasePath(value: string | undefined) {
  const trimmed = value?.trim();

  if (!trimmed || trimmed === "/") {
    return "";
  }

  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withLeadingSlash.endsWith("/")
    ? withLeadingSlash.slice(0, -1)
    : withLeadingSlash;
}

export const siteBasePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

export function withBasePath(path: string) {
  const normalizedPath = path === "/" ? "/" : path.startsWith("/") ? path : `/${path}`;

  if (!siteBasePath) {
    return normalizedPath;
  }

  if (
    normalizedPath === siteBasePath ||
    normalizedPath.startsWith(`${siteBasePath}/`)
  ) {
    return normalizedPath;
  }

  return normalizedPath === "/" ? `${siteBasePath}/` : `${siteBasePath}${normalizedPath}`;
}

export function toAbsoluteSiteUrl(path: string) {
  return new URL(
    withBasePath(path),
    `${trimTrailingSlash(metadataBaseUrl.toString())}/`,
  ).toString();
}

export function getCtaRoute(route: CtaRouteKey): CtaRouteContent {
  return siteSettings.ctaRoutes[route];
}

export function getAlternateCtaRoute(route: CtaRouteKey): CtaRouteKey {
  if (route === "system") {
    return "editorial";
  }

  if (route === "editorial") {
    return "system";
  }

  return "generic";
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
    images: [toAbsoluteSiteUrl("/opengraph-image")],
  },
  twitter: {
    card: "summary_large_image",
    title: siteSettings.defaultTitle,
    description: siteSettings.defaultDescription,
    images: [toAbsoluteSiteUrl("/opengraph-image")],
  },
};
