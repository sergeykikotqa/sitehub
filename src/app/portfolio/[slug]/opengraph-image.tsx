import { notFound } from "next/navigation";

import { createOgImage, size } from "@/lib/og";
import { getProjectBySlug } from "@/lib/content/queries";

type ProjectOgImageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const contentType = "image/png";
export { size };

export default async function Image({ params }: ProjectOgImageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return createOgImage({
    eyebrow: project.slug === "mblmaster" ? "commercial site" : "landing page",
    title: project.title,
    description: project.seoDescription,
    accent: project.slug === "mblmaster" ? "#75806c" : "#b48559",
    theme: project.slug === "mblmaster" ? "light" : "dark",
  });
}
