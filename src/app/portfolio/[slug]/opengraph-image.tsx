import { notFound } from "next/navigation";

import { getCasePresentation } from "@/lib/case-presentation";
import { createOgImage, size } from "@/lib/og";
import { getProjectBySlug, getProjectSlugs } from "@/lib/content/queries";

type ProjectOgImageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const contentType = "image/png";
export { size };
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function Image({ params }: ProjectOgImageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const presentation = getCasePresentation(project);

  if (!presentation) {
    return createOgImage({
      eyebrow: "Нейтральный кейс",
      title: project.title,
      description: project.seoDescription,
      accent: "#8a7564",
      theme: "light",
      previews: project.coverImage
        ? [
            {
              src: project.coverImage,
            },
          ]
        : [],
      footerLeft: "СайтХаб",
      footerRight: "нейтральный кейс",
    });
  }

  return createOgImage({
    eyebrow: presentation.roleLabel,
    title: project.title,
    description: project.seoDescription,
    accent: project.slug === "mblmaster" ? "#75806c" : "#b48559",
    theme: project.slug === "mblmaster" ? "light" : "dark",
    previews: [
      {
        src: presentation.visualAssets.og.src,
        objectPosition: presentation.visualAssets.og.objectPosition,
      },
    ],
    footerLeft: "СайтХаб",
    footerRight: project.slug === "mblmaster" ? "системный сайт" : "короткий лендинг",
  });
}
