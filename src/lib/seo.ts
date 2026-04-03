import type { Metadata } from "next";

import { baseMetadata, siteSettings, toAbsoluteSiteUrl } from "@/lib/site-config";

type BuildPageMetadataOptions = {
  title?: string;
  description: string;
  path: string;
  imagePath?: string;
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  imagePath,
  noIndex = false,
}: BuildPageMetadataOptions): Metadata {
  const resolvedTitle = title ?? siteSettings.defaultTitle;
  const canonical = toAbsoluteSiteUrl(path);
  const ogImage = toAbsoluteSiteUrl(imagePath ?? siteSettings.defaultOgImage);

  return {
    ...baseMetadata,
    title: resolvedTitle,
    description,
    alternates: {
      canonical,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    openGraph: {
      ...baseMetadata.openGraph,
      title: resolvedTitle,
      description,
      url: canonical,
      images: [ogImage],
    },
    twitter: {
      ...baseMetadata.twitter,
      title: resolvedTitle,
      description,
      images: [ogImage],
    },
  };
}
