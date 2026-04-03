import type { MetadataRoute } from "next";

import { getAllProjects } from "@/lib/content/queries";
import { toAbsoluteSiteUrl } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjects();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: toAbsoluteSiteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: toAbsoluteSiteUrl("/portfolio"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
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
