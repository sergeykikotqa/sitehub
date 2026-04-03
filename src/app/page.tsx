import {
  HomeEditorialTeaser,
  HomeSystemTeaser,
} from "@/components/portfolio/home-case-teasers";
import { CTASection } from "@/components/shared/cta-section";
import { Hero } from "@/components/shared/hero";
import { JsonLd } from "@/components/shared/json-ld";
import { getCasePresentation } from "@/lib/case-presentation";
import { getFeaturedProjects } from "@/lib/content/queries";
import { buildPageMetadata } from "@/lib/seo";
import { buildHomeJsonLd } from "@/lib/structured-data";
import { siteSettings } from "@/lib/site-config";

export const metadata = buildPageMetadata({
  title: `MBLMaster и MESTO — ${siteSettings.brandName}`,
  description:
    "Два реальных мебельных кейса: MBLMaster как системный коммерческий сайт под Иркутск и MESTO как короткий лендинг с одним Telegram CTA.",
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
  const jsonLd = buildHomeJsonLd(featuredProjects);
  const systemProject = featuredProjects.find((project) => project.slug === "mblmaster");
  const editorialProject = featuredProjects.find((project) => project.slug === "criatevmebel");

  return (
    <div className="space-y-20 py-12 md:space-y-28 md:py-16">
      <JsonLd data={jsonLd} />
      <Hero />

      <section className="space-y-10">
        <div className="editorial-intro">
          <p className="section-kicker">Два сценария</p>
          <div className="space-y-4">
            <h2 className="section-title max-w-[11ch] text-balance">
              Сначала подход, потом форма
            </h2>
            <p className="body-copy max-w-[44rem] text-[1.05rem] leading-8">
              Один и тот же рынок не требует одного и того же сайта. Ниже не два
              примера в одной упаковке, а два разных сценария: системный маршрут
              для коммерческого спроса и короткий лендинг, который убеждает ритмом
              и доказательством.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {systemProject ? (
            <HomeSystemTeaser
              project={systemProject}
              presentation={getCasePresentation(systemProject)}
              priority
            />
          ) : null}
          {editorialProject ? (
            <HomeEditorialTeaser
              project={editorialProject}
              presentation={getCasePresentation(editorialProject)}
            />
          ) : null}
        </div>
      </section>

      <CTASection
        title="Подберём правильный тип сайта"
        description="Если задаче нужен ассортимент, доверие и локальный спрос — соберём системный коммерческий сайт. Если важнее ритм, ощущение и быстрый вход в диалог — сделаем короткий лендинг с proof-блоками и одним главным действием."
        analyticsLocation="home-bottom"
        tone="dark"
      />
    </div>
  );
}
