import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { CaseSection } from "@/components/shared/case-section";
import { CTASection } from "@/components/shared/cta-section";
import { JsonLd } from "@/components/shared/json-ld";
import { TrackedLink } from "@/components/shared/tracked-link";
import { getProjectBySlug, getProjectSlugs } from "@/lib/content/queries";
import { buildPageMetadata } from "@/lib/seo";
import { siteSettings } from "@/lib/site-config";
import { buildProjectJsonLd } from "@/lib/structured-data";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return buildPageMetadata({
      title: `Страница не найдена — ${siteSettings.brandName}`,
      description: "Запрошенный кейс не найден.",
      path: "/404",
      noIndex: true,
    });
  }

  return buildPageMetadata({
    title: project.seoTitle,
    description: project.seoDescription,
    path: `/portfolio/${project.slug}`,
    imagePath: `/portfolio/${project.slug}/opengraph-image`,
    keywords: [
      project.title,
      project.slug,
      project.category,
      ...project.services,
    ],
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const coverImage = project.coverImage ?? siteSettings.defaultOgImage;
  const coverAlt = project.coverAlt ?? `Сайт для ${project.title} — пример работы`;
  const shortLines = project.shortDescription
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const focusLine = shortLines[0] ?? "Быстрая заявка";
  const formatLine = project.services?.[0] ?? "Лендинг";
  const coverCaption = "Короткий оффер и быстрый переход к заявке без лишних шагов.";
  const coreStatement = `Страница решает задачу: ${project.problem} Решение — ${project.solution}`;
  const whyItWorks = `Логика проста: ${project.solution} Результат — ${project.result}`;
  const jsonLd = buildProjectJsonLd(project);

  return (
    <div className="space-y-16 py-12 md:space-y-20 md:py-16">
      <JsonLd data={jsonLd} />
      <section className="space-y-6">
        <TrackedLink
          href="/portfolio"
          eventName="portfolio_listing_open"
          eventParams={{ location: "project-back", slug: project.slug }}
          className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          ← Все кейсы
        </TrackedLink>

        <div className="space-y-4">
          <p className="section-kicker">{project.category}</p>
          <h1 className="section-title max-w-[16ch] text-balance">{project.title}</h1>
          <p className="body-copy-strong max-w-2xl whitespace-pre-line">
            {project.shortDescription}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <TrackedLink
            href={siteSettings.ctaHref}
            target="_blank"
            rel="noreferrer"
            eventName="cta_click"
            eventParams={{ location: "project-hero", target: "telegram", slug: project.slug }}
            className="button-primary text-sm font-medium"
          >
            {siteSettings.ctaLabel}
          </TrackedLink>
          {project.projectUrl ? (
            <TrackedLink
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              eventName="project_external_open"
              eventParams={{ location: "project-hero", slug: project.slug }}
              className="button-secondary text-sm font-medium"
            >
              Открыть сайт
            </TrackedLink>
          ) : null}
        </div>
      </section>

      <section className="space-y-4">
        <div className="surface-panel relative aspect-[16/10] overflow-hidden">
          <Image
            src={coverImage}
            alt={coverAlt}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1280px) 60vw, 100vw"
          />
        </div>
        <p className="text-sm text-muted-foreground">{coverCaption}</p>
      </section>

      <section className="grid gap-6 border-y border-border/50 py-6 md:grid-cols-3">
        <div className="space-y-2">
          <p className="section-kicker">Ниша</p>
          <p className="body-copy">{project.category}</p>
        </div>
        <div className="space-y-2">
          <p className="section-kicker">Формат</p>
          <p className="body-copy">{formatLine}</p>
        </div>
        <div className="space-y-2">
          <p className="section-kicker">Фокус</p>
          <p className="body-copy">{focusLine}</p>
        </div>
      </section>

      <section className="space-y-3">
        <p className="section-kicker">Смысл</p>
        <p className="body-copy-strong max-w-[42rem] leading-8">{coreStatement}</p>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <CaseSection title="Задача" content={project.problem} />
        <CaseSection title="Решение" content={project.solution} />
        <CaseSection title="Результат" content={project.result} />
      </div>

      <section className="space-y-3">
        <h2 className="section-title text-balance">Почему это работает</h2>
        <p className="body-copy max-w-2xl">{whyItWorks}</p>
      </section>

      <CTASection
        title="Нужен такой же сайт под вашу нишу"
        description="Соберу спокойную страницу с сильным визуалом и одним понятным сценарием заявки"
        analyticsLocation={`case-${project.slug}`}
      />
    </div>
  );
}
