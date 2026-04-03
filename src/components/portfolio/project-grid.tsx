import { ProjectCard } from "@/components/portfolio/project-card";
import type { Project } from "@/types/content";

type ProjectGridProps = {
  projects: Project[];
  priorityCount?: number;
};

export function ProjectGrid({
  projects,
  priorityCount = 0,
}: ProjectGridProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.slug}
          project={project}
          priority={index < priorityCount}
        />
      ))}
    </div>
  );
}
