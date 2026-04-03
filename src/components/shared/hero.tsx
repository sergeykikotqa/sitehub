import { TrackedLink } from "@/components/shared/tracked-link";
import { getCtaRoute, siteSettings } from "@/lib/site-config";

const systemRoute = getCtaRoute("system");
const editorialRoute = getCtaRoute("editorial");

export function Hero() {
  return (
    <section className="hero-scene">
      <div className="hero-scene-grid">
        <div className="space-y-8">
          <div className="space-y-5">
            <p className="section-kicker">{siteSettings.hero.eyebrow}</p>
            <h1 className="editorial-display max-w-[12ch]">
              <span className="editorial-display-soft">Я не повторяю</span>
              <span className="editorial-display-strong">один шаблон.</span>
              <span className="editorial-display-soft">Я выбираю тип сайта</span>
              <span className="editorial-display-strong">под задачу бизнеса.</span>
            </h1>
            <p className="body-copy max-w-[38rem] text-[1.06rem] leading-8">
              {siteSettings.hero.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <TrackedLink
              href="/portfolio"
              eventName="portfolio_listing_open"
              eventParams={{ location: "hero" }}
              className="button-primary text-sm font-medium"
            >
              Смотреть кейсы
            </TrackedLink>
            <TrackedLink
              href={siteSettings.ctaHref}
              target="_blank"
              rel="noreferrer"
              eventName="cta_click"
              eventParams={{ location: "hero", target: "telegram" }}
              className="button-secondary text-sm font-medium"
            >
              {siteSettings.ctaLabel}
            </TrackedLink>
          </div>
        </div>

        <aside className="surface-panel px-5 py-5 md:px-6 md:py-6">
          <div className="space-y-5">
            <div className="space-y-3">
              <p className="section-kicker">Два полюса</p>
              <p className="text-[1rem] leading-8 text-foreground/76">
                {siteSettings.hero.supportingTitle}
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-[24px] border border-border/80 bg-white/68 p-4">
                <p className="section-kicker">Сценарий 01</p>
                <h2 className="mt-3 text-[1.08rem] font-semibold tracking-[-0.04em]">
                  {systemRoute.label}
                </h2>
                <p className="mt-2 text-[0.96rem] leading-7 text-foreground/72">
                  {systemRoute.description}
                </p>
              </div>

              <div className="rounded-[24px] border border-border/80 bg-white/68 p-4">
                <p className="section-kicker">Сценарий 02</p>
                <h2 className="mt-3 text-[1.08rem] font-semibold tracking-[-0.04em]">
                  {editorialRoute.label}
                </h2>
                <p className="mt-2 text-[0.96rem] leading-7 text-foreground/72">
                  {editorialRoute.description}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
