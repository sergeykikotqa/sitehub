import { TrackedLink } from "@/components/shared/tracked-link";
import {
  getAlternateCtaRoute,
  getCtaRoute,
  siteSettings,
} from "@/lib/site-config";
import { cn } from "@/lib/utils";
import type { CtaRouteKey } from "@/types/content";

type CTASectionProps = {
  title: string;
  description: string;
  analyticsLocation: string;
  tone?: "light" | "dark";
  primaryRoute?: CtaRouteKey;
};

type RouteCardProps = {
  route: CtaRouteKey;
  analyticsLocation: string;
  tone: "light" | "dark";
  featured: boolean;
};

type RouteContactLinkProps = {
  route: CtaRouteKey;
  analyticsLocation: string;
  className?: string;
  children?: string;
};

export function RouteContactLink({
  route,
  analyticsLocation,
  className,
  children,
}: RouteContactLinkProps) {
  const routeConfig = getCtaRoute(route);

  return (
    <TrackedLink
      href={siteSettings.ctaHref}
      target="_blank"
      rel="noreferrer"
      eventName="cta_click"
      eventParams={{
        location: analyticsLocation,
        target: "telegram",
        route: routeConfig.analyticsKey,
      }}
      className={className}
    >
      {children ?? routeConfig.label}
    </TrackedLink>
  );
}

function RouteCard({
  route,
  analyticsLocation,
  tone,
  featured,
}: RouteCardProps) {
  const routeConfig = getCtaRoute(route);
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between gap-5 rounded-[28px] border p-5 md:p-6",
        isDark
          ? "border-white/10 bg-white/[0.04]"
          : "border-border/80 bg-white/70",
        featured &&
          (isDark
            ? "border-white/14 bg-white/[0.08] shadow-[0_26px_72px_rgba(8,8,8,0.24)]"
            : "border-[rgba(181,108,63,0.18)] bg-[rgba(255,248,240,0.92)] shadow-[0_24px_64px_rgba(30,22,14,0.08)]"),
      )}
    >
      <div className="space-y-3">
        <p className={cn("section-kicker", isDark && "text-white/52")}>
          {route === "system" ? "Маршрут 01" : "Маршрут 02"}
        </p>
        <div className="space-y-2">
          <h3
            className={cn(
              "text-[1.15rem] font-semibold tracking-[-0.04em] md:text-[1.25rem]",
              isDark && "text-white",
            )}
          >
            {routeConfig.label}
          </h3>
          <p className={cn("text-[0.98rem] leading-7 text-foreground/72", isDark && "text-white/70")}>
            {routeConfig.description}
          </p>
        </div>
      </div>

      <RouteContactLink
        route={route}
        analyticsLocation={analyticsLocation}
        className={cn(
          featured
            ? "button-primary text-sm font-medium"
            : isDark
              ? "button-secondary button-secondary-dark text-sm font-medium"
              : "button-secondary text-sm font-medium",
        )}
      >
        {routeConfig.label}
      </RouteContactLink>
    </div>
  );
}

export function CTASection({
  title,
  description,
  analyticsLocation,
  tone = "light",
  primaryRoute,
}: CTASectionProps) {
  const isDark = tone === "dark";
  const routes = primaryRoute
    ? [primaryRoute, getAlternateCtaRoute(primaryRoute)]
    : (["system", "editorial"] as const);

  return (
    <section
      className={cn(
        "rounded-[34px] border px-6 py-6 md:px-8 md:py-8",
        isDark
          ? "border-white/10 bg-[linear-gradient(180deg,rgba(16,16,17,0.98),rgba(11,11,13,1))] text-white shadow-[0_30px_80px_rgba(8,8,8,0.3)]"
          : "border-border bg-[linear-gradient(180deg,rgba(255,252,247,0.92),rgba(255,249,243,0.86))] shadow-[0_18px_52px_rgba(28,24,20,0.08)]",
      )}
    >
      <div className="grid gap-8 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-start">
        <div className="max-w-2xl space-y-3">
          <p className={cn("section-kicker", isDark && "text-white/58")}>
            Выбор формата
          </p>
          <h2
            className={cn(
              "section-title max-w-[14ch] text-balance",
              isDark && "text-white",
            )}
          >
            {title}
          </h2>
          <p className={cn("body-copy max-w-xl", isDark && "text-white/72")}>
            {description}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {routes.map((route, index) => (
            <RouteCard
              key={route}
              route={route}
              analyticsLocation={analyticsLocation}
              tone={tone}
              featured={primaryRoute ? index === 0 : false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
