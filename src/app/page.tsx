import { ProjectGrid } from "@/components/portfolio/project-grid";
import { CTASection } from "@/components/shared/cta-section";
import { Hero } from "@/components/shared/hero";
import { JsonLd } from "@/components/shared/json-ld";
import { getFeaturedProjects } from "@/lib/content/queries";
import { buildPageMetadata } from "@/lib/seo";
import { buildHomeJsonLd } from "@/lib/structured-data";
import { siteSettings } from "@/lib/site-config";

export const metadata = buildPageMetadata({
  title: `MBLMaster и MESTO — ${siteSettings.brandName}`,
  description:
    "Два реальных мебельных кейса: MBLMaster как коммерческий сайт под Иркутск и MESTO как эмоциональный лендинг с одним Telegram CTA.",
  path: "/",
  imagePath: "/opengraph-image",
  keywords: [
    "mblmaster",
    "mesto",
    "портфолио сайтов",
    "сайты для мебельного бизнеса",
    "лендинг для мебели",
  ],
});

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();
  const heroProject = featuredProjects[0] ?? null;
  const jsonLd = buildHomeJsonLd(featuredProjects);

  return (
    <div className="space-y-16 py-12 md:space-y-20 md:py-16">
      <JsonLd data={jsonLd} />
      <Hero project={heroProject} />

      <section className="space-y-8">
        <div className="max-w-2xl space-y-3">
          <h2 className="section-title text-balance">MBLMaster и MESTO</h2>
          <p className="body-copy max-w-xl">
            Один кейс показывает коммерческий сайт с категориями, кейсами и видеообзорами.
            Второй показывает короткий лендинг, где всё держится на ритме, proof-блоках и
            одном CTA.
          </p>
        </div>
        <ProjectGrid projects={featuredProjects} priorityCount={2} />
      </section>

      <CTASection
        title="Нужен коммерческий сайт или лендинг"
        description="Могу собрать либо насыщенный коммерческий маршрут как у MBLMaster, либо короткий и собранный flow как у MESTO."
        analyticsLocation="home-bottom"
        tone="dark"
      />
    </div>
  );
}
