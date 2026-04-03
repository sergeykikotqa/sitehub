import { ProjectGrid } from "@/components/portfolio/project-grid";
import { CTASection } from "@/components/shared/cta-section";
import { getAllProjects } from "@/lib/content/queries";
import { buildPageMetadata } from "@/lib/seo";
import { siteSettings } from "@/lib/site-config";

export const metadata = buildPageMetadata({
  title: `Портфолио сайтов для локального бизнеса — ${siteSettings.brandName}`,
  description:
    "Два реальных кейса для мебельного бизнеса: многостраничный сайт под доверие и лендинг под быстрый вход в заявку.",
  path: "/portfolio",
});

export default async function PortfolioPage() {
  const projects = await getAllProjects();

  return (
    <div className="space-y-16 py-12 md:space-y-20 md:py-16">
      <section className="surface-card px-6 py-8 md:px-8 md:py-10">
        <div className="max-w-3xl space-y-4">
          <p className="section-kicker">Portfolio</p>
          <h1 className="section-title max-w-[13ch] text-balance">
            Портфолио локальных сайтов
          </h1>
          <p className="text-lg font-medium leading-7 text-foreground/76">
            Два формата под мебельный бизнес
          </p>
          <p className="body-copy max-w-2xl">{siteSettings.portfolio.description}</p>
        </div>
      </section>

      <ProjectGrid projects={projects} priorityCount={2} />

      <CTASection
        title="Нужен похожий сайт"
        description="Соберу под вашу нишу такой же чистый, собранный и понятный сценарий."
        analyticsLocation="portfolio-bottom"
      />
    </div>
  );
}
