import type { Metadata } from "next";

import { NotFoundView } from "@/components/shared/not-found-view";
import { buildPageMetadata } from "@/lib/seo";
import { siteSettings } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  title: `Страница не найдена — ${siteSettings.brandName}`,
  description: "Запрошенная страница не найдена.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return <NotFoundView />;
}
