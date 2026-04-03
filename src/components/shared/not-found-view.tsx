import { TrackedLink } from "@/components/shared/tracked-link";
import { siteSettings } from "@/lib/site-config";

export function NotFoundView() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center py-16">
      <div className="surface-card max-w-xl px-6 py-8 text-center md:px-8">
        <p className="section-kicker">404</p>
        <h1 className="section-title mt-4">Страница не найдена</h1>
        <p className="body-copy mt-3">
          Похоже, здесь нет опубликованного кейса или маршрута. Вернитесь в портфолио и
          откройте рабочую страницу.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <TrackedLink
            href="/portfolio"
            eventName="not_found_return"
            eventParams={{ location: "404" }}
            className="button-inverse text-sm font-medium"
          >
            Назад в портфолио
          </TrackedLink>
          <TrackedLink
            href={siteSettings.ctaHref}
            target="_blank"
            rel="noreferrer"
            eventName="cta_click"
            eventParams={{ location: "404", target: "telegram" }}
            className="button-secondary text-sm font-medium"
          >
            {siteSettings.ctaLabel}
          </TrackedLink>
        </div>
      </div>
    </div>
  );
}
