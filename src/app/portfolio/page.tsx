import { ProjectGrid } from "@/components/portfolio/project-grid";
import { CTASection } from "@/components/shared/cta-section";
import { JsonLd } from "@/components/shared/json-ld";
import { getAllProjects } from "@/lib/content/queries";
import { buildPageMetadata } from "@/lib/seo";
import { siteSettings } from "@/lib/site-config";
import { buildPortfolioJsonLd } from "@/lib/structured-data";

export const metadata = buildPageMetadata({
  title: `MBLMaster и MESTO — портфолио ${siteSettings.brandName}`,
  description: siteSettings.portfolio.description,
  path: "/portfolio",
  imagePath: "/portfolio/opengraph-image",
  keywords: [
    "mblmaster кейс",
    "mesto кейс",
    "портфолио сайтов",
    "кейс мебельного сайта",
    "коммерческий сайт мебель",
  ],
});

export default async function PortfolioPage() {
  const projects = await getAllProjects();
  const jsonLd = buildPortfolioJsonLd(projects);

  return (
    <div className="space-y-16 py-12 md:space-y-20 md:py-16">
      <JsonLd data={jsonLd} />
      <section className="surface-card px-6 py-8 md:px-8 md:py-10">
        <div className="max-w-3xl space-y-4">
          <p className="section-kicker">Portfolio</p>
          <h1 className="section-title max-w-[13ch] text-balance">
            MBLMaster и MESTO
          </h1>
          <p className="text-lg font-medium leading-7 text-foreground/76">
            Коммерческий сайт и эмоциональный лендинг для мебели на заказ
          </p>
          <p className="body-copy max-w-2xl">{siteSettings.portfolio.description}</p>
        </div>
      </section>

      <ProjectGrid projects={projects} priorityCount={2} />

      <CTASection
        title="Нужен сайт в таком уровне проработки"
        description="Можно собрать либо большой коммерческий маршрут как у MBLMaster, либо короткий эмоциональный лендинг в логике MESTO."
        analyticsLocation="portfolio-bottom"
      />
    </div>
  );
}
