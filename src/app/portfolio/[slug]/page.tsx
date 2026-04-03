import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  EditorialCaseTemplate,
  SystemCaseTemplate,
} from "@/components/portfolio/case-templates";
import { JsonLd } from "@/components/shared/json-ld";
import { getCasePresentation } from "@/lib/case-presentation";
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
    keywords: [project.title, project.slug, project.category, ...project.services],
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const presentation = getCasePresentation(project);
  const jsonLd = buildProjectJsonLd(project);

  return (
    <>
      <JsonLd data={jsonLd} />
      {presentation.mode === "system" ? (
        <SystemCaseTemplate project={project} presentation={presentation} />
      ) : (
        <EditorialCaseTemplate project={project} presentation={presentation} />
      )}
    </>
  );
}
