import type { MetadataRoute } from "next";

import { getAllProjects } from "@/lib/content/queries";
import { siteSettings, toAbsoluteSiteUrl } from "@/lib/site-config";

export const dynamic = "force-static";

function getSiteLastModified(projects: Awaited<ReturnType<typeof getAllProjects>>) {
  const projectDates = projects.map((project) => new Date(project.publishedAt).getTime());
  const legalDate = siteSettings.legal.legalLastUpdated
    ? new Date(siteSettings.legal.legalLastUpdated).getTime()
    : 0;

  return new Date(Math.max(legalDate, ...projectDates));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjects();
  const siteLastModified = getSiteLastModified(projects);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: toAbsoluteSiteUrl("/"),
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: toAbsoluteSiteUrl("/portfolio"),
      lastModified: siteLastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: toAbsoluteSiteUrl("/legal"),
      lastModified: siteSettings.legal.legalLastUpdated
        ? new Date(siteSettings.legal.legalLastUpdated)
        : siteLastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: toAbsoluteSiteUrl(`/portfolio/${project.slug}`),
    lastModified: new Date(project.publishedAt),
    changeFrequency: "monthly" as const,
    priority: project.featured ? 0.85 : 0.75,
  }));

  return [...staticRoutes, ...projectRoutes];
}
