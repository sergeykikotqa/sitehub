import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

import { projectFrontmatterSchema } from "@/lib/content/schemas";
import type { Project, ProjectFrontmatter } from "@/types/content";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const PROJECTS_DIRECTORY = path.join(CONTENT_ROOT, "projects");

class ContentValidationError extends Error {
  constructor(message: string, readonly filePath: string) {
    super(message);
    this.name = "ContentValidationError";
  }
}

function validateProjectFrontmatter(
  data: unknown,
  filePath: string,
): ProjectFrontmatter {
  const result = projectFrontmatterSchema.safeParse(data);

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
      .join("; ");

    throw new ContentValidationError(
      `Invalid project frontmatter in ${filePath}: ${issues}`,
      filePath,
    );
  }

  return result.data;
}

export async function loadProjects(): Promise<Project[]> {
  const entries = await readdir(PROJECTS_DIRECTORY, { withFileTypes: true });
  const fileNames = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));

  const projects = await Promise.all(
    fileNames.map(async (fileName) => {
      const filePath = path.join(PROJECTS_DIRECTORY, fileName);
      const source = await readFile(filePath, "utf8");
      const parsed = matter(source);
      const frontmatter = validateProjectFrontmatter(parsed.data, filePath);

      return {
        ...frontmatter,
        body: parsed.content.trim() || undefined,
      } satisfies Project;
    }),
  );

  const seenSlugs = new Set<string>();

  for (const project of projects) {
    if (seenSlugs.has(project.slug)) {
      throw new ContentValidationError(
        `Duplicate project slug "${project.slug}" detected.`,
        PROJECTS_DIRECTORY,
      );
    }

    seenSlugs.add(project.slug);
  }

  return projects;
}
