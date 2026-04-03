import { CaseVisualFrame } from "@/components/portfolio/case-visual-frame";
import { RouteContactLink } from "@/components/shared/cta-section";
import { TrackedLink } from "@/components/shared/tracked-link";
import type { CasePresentationConfig } from "@/lib/case-presentation";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";

type PortfolioCaseModuleProps = {
  project: Project;
  presentation: CasePresentationConfig;
  priority?: boolean;
};

function SignalList({
  signals,
  dark = false,
}: {
  signals: CasePresentationConfig["signals"];
  dark?: boolean;
}) {
  return (
    <ul className="case-signal-list">
      {signals.map((signal) => (
        <li
          key={signal}
          className={cn("case-signal-chip", dark && "case-signal-chip-dark")}
        >
          {signal}
        </li>
      ))}
    </ul>
  );
}

export function PortfolioSystemModule({
  project,
  presentation,
  priority = false,
}: PortfolioCaseModuleProps) {
  return (
    <article className="surface-card px-6 py-6 md:px-8 md:py-8">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] xl:items-start">
        <CaseVisualFrame
          asset={presentation.visualAssets.portfolio}
          priority={priority}
        />

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="section-kicker">{presentation.roleLabel}</span>
              <span className="case-mode-pill">{project.category}</span>
            </div>
            <div className="space-y-3">
              <h2 className="section-title max-w-[13ch] text-balance">
                {presentation.compareTitle}
              </h2>
              <p className="body-copy max-w-[40rem]">
                {presentation.portfolioSummary}
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {presentation.overview.slice(0, 2).map((item) => (
              <div
                key={`${project.slug}-${item.label}`}
                className="rounded-[24px] border border-border/80 bg-white/68 p-4"
              >
                <p className="section-kicker">{item.label}</p>
                <p className="mt-3 text-[0.98rem] leading-7 text-foreground/78">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <SignalList signals={presentation.signals} />

          <div className="flex flex-wrap gap-3">
            <TrackedLink
              href={`/portfolio/${project.slug}`}
              eventName="portfolio_case_open"
              eventParams={{ slug: project.slug, location: "portfolio-system" }}
              className="button-primary text-sm font-medium"
            >
              Открыть разбор
            </TrackedLink>
            {project.projectUrl ? (
              <TrackedLink
                href={project.projectUrl}
                target="_blank"
                rel="noreferrer"
                eventName="project_external_open"
                eventParams={{ slug: project.slug, location: "portfolio-system" }}
                className="button-secondary text-sm font-medium"
              >
                Смотреть live
              </TrackedLink>
            ) : null}
            <RouteContactLink
              route="system"
              analyticsLocation="portfolio-system"
              className="button-secondary text-sm font-medium"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export function PortfolioEditorialModule({
  project,
  presentation,
  priority = false,
}: PortfolioCaseModuleProps) {
  const [proofCardAsset, , heroTypeAsset] = presentation.visualAssets.gallery;

  return (
    <article className="surface-inverse px-6 py-6 md:px-8 md:py-8">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,0.98fr)_minmax(21rem,0.92fr)] xl:items-start">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="section-kicker text-white/52">
                {presentation.roleLabel}
              </span>
              <span className="case-mode-pill case-mode-pill-dark">
                {project.category}
              </span>
            </div>
            <div className="space-y-3">
              <h2 className="section-title max-w-[11ch] text-balance text-white">
                {presentation.compareTitle}
              </h2>
              <p className="body-copy max-w-[38rem] text-white/72">
                {presentation.portfolioSummary}
              </p>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
            <p className="section-kicker text-white/52">Главный аргумент</p>
            <p className="mt-3 text-[1rem] leading-8 text-white/78">
              {presentation.heroCaption}
            </p>
          </div>

          <SignalList signals={presentation.signals} dark />

          <div className="flex flex-wrap gap-3">
            <TrackedLink
              href={`/portfolio/${project.slug}`}
              eventName="portfolio_case_open"
              eventParams={{ slug: project.slug, location: "portfolio-editorial" }}
              className="button-primary button-primary-contrast text-sm font-medium"
            >
              Открыть разбор
            </TrackedLink>
            {project.projectUrl ? (
              <TrackedLink
                href={project.projectUrl}
                target="_blank"
                rel="noreferrer"
                eventName="project_external_open"
                eventParams={{ slug: project.slug, location: "portfolio-editorial" }}
                className="button-secondary button-secondary-dark text-sm font-medium"
              >
                Смотреть live
              </TrackedLink>
            ) : null}
            <RouteContactLink
              route="editorial"
              analyticsLocation="portfolio-editorial"
              className="button-secondary button-secondary-dark text-sm font-medium"
            />
          </div>
        </div>

        <div className="grid gap-4">
          <CaseVisualFrame
            asset={presentation.visualAssets.portfolio}
            priority={priority}
            tone="dark"
          />
          <div className="grid gap-4 md:grid-cols-[minmax(0,0.88fr)_minmax(15rem,1.12fr)]">
            <CaseVisualFrame asset={proofCardAsset} tone="dark" />
            <CaseVisualFrame asset={heroTypeAsset} tone="dark" />
          </div>
        </div>
      </div>
    </article>
  );
}
