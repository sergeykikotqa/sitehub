import {
  PortfolioEditorialModule,
  PortfolioSystemModule,
} from "@/components/portfolio/portfolio-case-modules";
import { CTASection } from "@/components/shared/cta-section";
import { JsonLd } from "@/components/shared/json-ld";
import { getCasePresentation } from "@/lib/case-presentation";
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
  const systemProject = projects.find((project) => project.slug === "mblmaster");
  const editorialProject = projects.find((project) => project.slug === "criatevmebel");

  return (
    <div className="space-y-20 py-12 md:space-y-28 md:py-16">
      <JsonLd data={jsonLd} />
      <section className="editorial-intro space-y-4">
        <div className="max-w-4xl space-y-4">
          <p className="section-kicker">Портфолио</p>
          <h1 className="section-title max-w-[13ch] text-balance">
            MBLMaster и MESTO
          </h1>
          <p className="text-lg font-medium leading-7 text-foreground/76">
            Не каталог шаблонов, а индекс двух разных сценариев под одну и ту же нишу
          </p>
          <p className="body-copy max-w-2xl">{siteSettings.portfolio.description}</p>
        </div>
      </section>

        <div className="space-y-10">
          {systemProject ? (
            <PortfolioSystemModule
              project={systemProject}
              presentation={getCasePresentation(systemProject)}
              priority
            />
          ) : null}
          {editorialProject ? (
            <PortfolioEditorialModule
              project={editorialProject}
              presentation={getCasePresentation(editorialProject)}
            />
          ) : null}
      </div>

      <CTASection
        title="Подберём правильный формат сайта"
        description="Либо соберём системный коммерческий маршрут, либо короткий лендинг с proof-сценами — в зависимости от того, что реально решит задачу бизнеса."
        analyticsLocation="portfolio-bottom"
      />
    </div>
  );
}
