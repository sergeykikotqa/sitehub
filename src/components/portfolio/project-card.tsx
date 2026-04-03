import Image from "next/image";

import { TrackedLink } from "@/components/shared/tracked-link";
import { siteSettings } from "@/lib/site-config";
import type { Project } from "@/types/content";

type ProjectCardProps = {
  project: Project;
  priority?: boolean;
};

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const coverImage = project.coverImage ?? siteSettings.defaultOgImage;
  const coverAlt = project.coverAlt ?? `Сайт для ${project.title} — пример работы`;
  return (
    <TrackedLink
      href={`/portfolio/${project.slug}`}
      eventName="portfolio_case_open"
      eventParams={{ slug: project.slug, location: "card" }}
      className="interactive-card group"
    >
      <article className="surface-card flex h-full flex-col overflow-hidden">
        <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
          <Image
            src={coverImage}
            alt={coverAlt}
            fill
            priority={priority}
            className="card-cover-media object-cover"
            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
          <div className="card-hover-overlay absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
        <div className="flex flex-1 flex-col gap-4 p-6">
          <p className="mono-meta">{project.category}</p>
          <h3 className="text-3xl font-semibold leading-tight tracking-tight text-balance">
            {project.title}
          </h3>
          <p className="body-copy whitespace-pre-line">{project.shortDescription}</p>
          <div className="mt-auto pt-2">
            <span className="card-link pointer-events-none text-sm font-medium">
              Разобрать решение →
            </span>
          </div>
        </div>
      </article>
    </TrackedLink>
  );
}
