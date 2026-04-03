import { ProjectGrid } from "@/components/portfolio/project-grid";
import { CTASection } from "@/components/shared/cta-section";
import { Hero } from "@/components/shared/hero";
import { getFeaturedProjects } from "@/lib/content/queries";
import { buildPageMetadata } from "@/lib/seo";
import { siteSettings } from "@/lib/site-config";

export const metadata = buildPageMetadata({
  description: siteSettings.defaultDescription,
  path: "/",
});

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();
  const heroProject = featuredProjects[0] ?? null;

  return (
    <div className="space-y-16 py-12 md:space-y-20 md:py-16">
      <Hero project={heroProject} />

      <section className="space-y-8">
        <div className="max-w-2xl space-y-3">
          <h2 className="section-title text-balance">Портфолио локальных сайтов</h2>
          <p className="body-copy max-w-xl">
            Решения для ниш, где важна быстрая заявка
          </p>
        </div>
        <ProjectGrid projects={featuredProjects} priorityCount={2} />
      </section>

      <CTASection
        title="Нужен сайт под вашу нишу"
        description="Соберу страницу с тем же спокойным ритмом, визуалом и одним понятным сценарием заявки"
        analyticsLocation="home-bottom"
        tone="dark"
      />
    </div>
  );
}
