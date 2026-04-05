import { cache } from "react";

import { loadProjects } from "@/lib/content/loaders";
import { siteSettings } from "@/lib/site-config";
import type { Project } from "@/types/content";

function isPublishedProject(project: Project) {
  return project.status === "published";
}

function compareProjects(left: Project, right: Project) {
  if (left.featured !== right.featured) {
    return left.featured ? -1 : 1;
  }

  const leftOrder = left.order;
  const rightOrder = right.order;

  if (typeof leftOrder === "number" && typeof rightOrder === "number") {
    const byOrder = leftOrder - rightOrder;

    if (byOrder !== 0) {
      return byOrder;
    }
  } else if (typeof leftOrder === "number") {
    return -1;
  } else if (typeof rightOrder === "number") {
    return 1;
  }

  return right.publishedAt.localeCompare(left.publishedAt);
}

export const getAllProjects = cache(async (): Promise<Project[]> => {
  const projects = await loadProjects();
  return projects.filter(isPublishedProject).sort(compareProjects);
});

export const getFlagshipProjects = cache(async (): Promise<[Project, Project]> => {
  const projects = await getAllProjects();
  const projectMap = new Map(projects.map((project) => [project.slug, project]));
  const flagshipProjects = siteSettings.flagshipCaseSlugs.map((slug) => projectMap.get(slug));

  if (flagshipProjects.some((project) => !project)) {
    const missingSlugs = siteSettings.flagshipCaseSlugs.filter((slug) => !projectMap.has(slug));
    throw new Error(
      `Invalid flagshipCaseSlugs in content/settings/site.json. Missing published cases: ${missingSlugs.join(", ")}`,
    );
  }

  return flagshipProjects as [Project, Project];
});

export const getProjectBySlug = cache(async (slug: string): Promise<Project | null> => {
  const projects = await getAllProjects();
  return projects.find((project) => project.slug === slug) ?? null;
});

export const getProjectSlugs = cache(async (): Promise<string[]> => {
  const projects = await getAllProjects();
  return projects.map((project) => project.slug);
});
