import { RouteContactLink } from "@/components/shared/cta-section";
import { siteSettings } from "@/lib/site-config";

const heroScenarios = [
  {
    route: "system" as const,
    label: "Системный формат",
    copy: "У вас много позиций. Клиент сравнивает и не принимает решение сразу. Нужно объяснить, структурировать и довести до доверия.",
  },
  {
    route: "editorial" as const,
    label: "Быстрый лендинг",
    copy: "У вас один оффер или чёткое предложение. Важно зацепить сразу и быстро привести к контакту.",
  },
];

export function Hero() {
  const heroTitleLines = siteSettings.hero.title
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <section className="hero-scene">
      <div className="mx-auto max-w-[66rem] space-y-6">
        <div className="max-w-[46rem] space-y-4">
          <p className="section-kicker">{siteSettings.hero.eyebrow}</p>
          <h1 className="section-title max-w-[12ch] text-balance md:text-[clamp(3.45rem,6.3vw,5.6rem)] md:leading-[0.92]">
            {heroTitleLines.map((line, index) => (
              <span key={`${line}-${index}`} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="body-copy max-w-[38rem] text-[1.02rem] leading-7">
            {siteSettings.hero.subtitle}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {heroScenarios.map((scenario) => (
            <article
              key={scenario.route}
              className="surface-panel px-5 py-5 md:px-6 md:py-6"
            >
              <div className="space-y-3">
                <p className="section-kicker">{scenario.label}</p>
                <p className="text-[1rem] leading-7 text-foreground/76">
                  {scenario.copy}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <RouteContactLink
            route="system"
            analyticsSurface="hero"
            className="button-primary w-full justify-center text-sm font-medium"
          />
          <RouteContactLink
            route="editorial"
            analyticsSurface="hero"
            className="button-inverse w-full justify-center text-sm font-medium"
          />
        </div>

        <p className="muted-copy max-w-[34rem]">{siteSettings.hero.supportingTitle}</p>
      </div>
    </section>
  );
}
