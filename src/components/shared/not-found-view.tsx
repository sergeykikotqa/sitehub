import { CtaRouter } from "@/components/shared/cta-section";
import { TrackedLink } from "@/components/shared/tracked-link";

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
        <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <TrackedLink
            href="/portfolio"
            eventName="not_found_return"
            eventParams={{ surface: "generic" }}
            className="button-inverse w-full justify-center text-sm font-medium sm:w-auto"
          >
            Назад в портфолио
          </TrackedLink>
          <CtaRouter
            analyticsSurface="generic"
            variant="compact"
            stackOnMobile
            routes={["generic"]}
          />
        </div>
      </div>
    </div>
  );
}
