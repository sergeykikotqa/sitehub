import {
  HomeEditorialTeaser,
  HomeSystemTeaser,
} from "@/components/portfolio/home-case-teasers";
import { CTASection } from "@/components/shared/cta-section";
import { Hero } from "@/components/shared/hero";
import { JsonLd } from "@/components/shared/json-ld";
import { requireCasePresentation } from "@/lib/case-presentation";
import { getFlagshipProjects } from "@/lib/content/queries";
import { buildPageMetadata } from "@/lib/seo";
import { buildHomeJsonLd } from "@/lib/structured-data";
import { siteSettings } from "@/lib/site-config";

export const metadata = buildPageMetadata({
  title: `${siteSettings.portfolio.title} — ${siteSettings.brandName}`,
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
  const flagshipProjects = await getFlagshipProjects();
  const jsonLd = buildHomeJsonLd(flagshipProjects);
  const systemCase = flagshipProjects
    .map((project) => ({
      project,
      presentation: requireCasePresentation(project, "home page"),
    }))
    .find((entry) => entry.presentation.mode === "system");
  const editorialCase = flagshipProjects
    .map((project) => ({
      project,
      presentation: requireCasePresentation(project, "home page"),
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
      <Hero />

      <section className="space-y-8">
        <div className="max-w-3xl space-y-3">
          <p className="section-kicker">Закрепление выбора</p>
          <p className="body-copy text-[1.02rem] leading-8">
            Ниже — два формата сайтов. Они решают разные задачи и работают
            по-разному.
          </p>
        </div>

        <div className="space-y-8">
          {systemCase ? (
            <HomeSystemTeaser
              project={systemCase.project}
              presentation={systemCase.presentation}
            />
          ) : null}
          {editorialCase ? (
            <HomeEditorialTeaser
              project={editorialCase.project}
              presentation={editorialCase.presentation}
            />
          ) : null}
        </div>
      </section>

      <CTASection
        title="Подберём правильный тип сайта"
        description="Если задаче нужен ассортимент, доверие и длинный путь до заявки — соберём системный маршрут. Если важнее захват внимания и быстрый вход в контакт — сделаем короткий лендинг под импульсное решение."
        analyticsSurface="home"
        tone="dark"
      />
    </div>
  );
}
