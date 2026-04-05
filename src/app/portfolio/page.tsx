import {
  PortfolioEditorialModule,
  PortfolioSystemModule,
} from "@/components/portfolio/portfolio-case-modules";
import { CTASection } from "@/components/shared/cta-section";
import { JsonLd } from "@/components/shared/json-ld";
import { requireCasePresentation } from "@/lib/case-presentation";
import { getFlagshipProjects } from "@/lib/content/queries";
import { buildPageMetadata } from "@/lib/seo";
import { siteSettings } from "@/lib/site-config";
import { buildPortfolioJsonLd } from "@/lib/structured-data";

export const metadata = buildPageMetadata({
  title: `${siteSettings.portfolio.title} — портфолио ${siteSettings.brandName}`,
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
  const flagshipProjects = await getFlagshipProjects();
  const jsonLd = buildPortfolioJsonLd(flagshipProjects);
  const systemCase = flagshipProjects
    .map((project) => ({
      project,
      presentation: requireCasePresentation(project, "portfolio page"),
    }))
    .find((entry) => entry.presentation.mode === "system");
  const editorialCase = flagshipProjects
    .map((project) => ({
      project,
      presentation: requireCasePresentation(project, "portfolio page"),
    }))
    .find((entry) => entry.presentation.mode === "editorial");

  if (!systemCase || !editorialCase) {
    throw new Error(
      "Expected flagshipCaseSlugs to resolve to one system case and one editorial case.",
    );
  }

  return (
    <div className="space-y-20 py-12 md:space-y-28 md:py-16">
      <JsonLd data={jsonLd} />
      <section className="max-w-4xl space-y-4">
        <div className="space-y-4">
          <p className="section-kicker">Портфолио</p>
          <h1 className="section-title max-w-[12ch] text-balance">
            {siteSettings.portfolio.title}
          </h1>
          <p className="body-copy max-w-2xl text-[1.02rem] leading-8">
            Два формата сайтов под разные задачи. Здесь — как они работают на
            практике.
          </p>
          <p className="muted-copy max-w-2xl">{siteSettings.portfolio.description}</p>
        </div>
      </section>

      <div className="space-y-10">
        {systemCase ? (
          <PortfolioSystemModule
            project={systemCase.project}
            presentation={systemCase.presentation}
            priority
          />
        ) : null}
        {editorialCase ? (
          <PortfolioEditorialModule
            project={editorialCase.project}
            presentation={editorialCase.presentation}
          />
        ) : null}
      </div>

      <CTASection
        title="Подберём правильный формат сайта"
        description="Если после проверки сценариев вам всё ещё нужен внешний взгляд, разберём задачу и подскажем, какой формат сайта реально сработает лучше."
        analyticsSurface="portfolio"
      />
    </div>
  );
}
