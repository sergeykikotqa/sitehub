import { CaseVisualFrame } from "@/components/portfolio/case-visual-frame";
import { RouteContactLink } from "@/components/shared/cta-section";
import { TrackedLink } from "@/components/shared/tracked-link";
import type { CasePresentationConfig } from "@/lib/case-presentation";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";

type HomeCaseTeaserProps = {
  project: Project;
  presentation: CasePresentationConfig;
  priority?: boolean;
};

function OverviewGrid({
  items,
  dark = false,
}: {
  items: CasePresentationConfig["overview"];
  dark?: boolean;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div
          key={`${item.label}-${item.value}`}
          className={cn(
            "rounded-[24px] border p-4",
            dark
              ? "border-white/10 bg-white/[0.04]"
              : "border-border/80 bg-white/68",
          )}
        >
          <p className={cn("section-kicker", dark && "text-white/50")}>
            {item.label}
          </p>
          <p
            className={cn(
              "mt-3 text-[0.98rem] leading-7 text-foreground/78",
              dark && "text-white/76",
            )}
          >
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export function HomeSystemTeaser({
  project,
  presentation,
  priority = false,
}: HomeCaseTeaserProps) {
  const [categoryAsset, , trustAsset] = presentation.visualAssets.gallery;

  return (
    <section className="surface-card px-6 py-6 md:px-8 md:py-8">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,0.96fr)_minmax(24rem,1.04fr)] xl:items-start">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="section-kicker">{presentation.roleLabel}</span>
              <span className="case-mode-pill">{project.title}</span>
            </div>
            <div className="space-y-3">
              <h2 className="section-title max-w-[12ch] text-balance">
                {presentation.compareTitle}
              </h2>
              <p className="body-copy max-w-[38rem]">
                {presentation.compareSummary}
              </p>
            </div>
          </div>

          <OverviewGrid items={presentation.overview} />

          <div className="rounded-[28px] border border-[rgba(181,108,63,0.16)] bg-[rgba(255,248,240,0.82)] p-5">
            <p className="section-kicker">Почему этот формат</p>
            <p className="mt-3 text-[1rem] leading-8 text-foreground/78">
              {presentation.heroStatement}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <TrackedLink
              href={`/portfolio/${project.slug}`}
              eventName="portfolio_case_open"
              eventParams={{ slug: project.slug, location: "home-system" }}
              className="button-primary text-sm font-medium"
            >
              Разобрать кейс
            </TrackedLink>
            <RouteContactLink
              route="system"
              analyticsLocation="home-system"
              className="button-secondary text-sm font-medium"
            />
          </div>
        </div>

        <div className="space-y-4">
          <CaseVisualFrame
            asset={presentation.visualAssets.home}
            priority={priority}
          />
          <div className="grid gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(16rem,0.82fr)]">
            <CaseVisualFrame asset={categoryAsset} />
            <CaseVisualFrame asset={trustAsset} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeEditorialTeaser({
  project,
  presentation,
  priority = false,
}: HomeCaseTeaserProps) {
  const [proofCardAsset, proofFlowAsset, heroTypeAsset] =
    presentation.visualAssets.gallery;

  return (
    <section className="surface-inverse px-6 py-6 md:px-8 md:py-8">
      <div className="grid gap-8 xl:grid-cols-[minmax(21rem,0.92fr)_minmax(0,1.08fr)] xl:items-start">
        <div className="space-y-4">
          <CaseVisualFrame
            asset={presentation.visualAssets.home}
            priority={priority}
            tone="dark"
          />
          <div className="grid gap-4 md:grid-cols-[minmax(0,0.88fr)_minmax(16rem,1.12fr)]">
            <CaseVisualFrame asset={proofCardAsset} tone="dark" />
            <div className="grid gap-4">
              <CaseVisualFrame asset={proofFlowAsset} tone="dark" />
              <CaseVisualFrame asset={heroTypeAsset} tone="dark" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="section-kicker text-white/52">
                {presentation.roleLabel}
              </span>
              <span className="case-mode-pill case-mode-pill-dark">
                {project.title}
              </span>
            </div>
            <div className="space-y-3">
              <h2 className="section-title max-w-[11ch] text-balance text-white">
                {presentation.compareTitle}
              </h2>
              <p className="body-copy max-w-[37rem] text-white/72">
                {presentation.compareSummary}
              </p>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5">
            <p className="section-kicker text-white/52">Почему это работает</p>
            <p className="mt-3 text-[1rem] leading-8 text-white/78">
              {presentation.heroStatement}
            </p>
          </div>

          <OverviewGrid items={presentation.overview} dark />

          <div className="flex flex-wrap gap-3">
            <TrackedLink
              href={`/portfolio/${project.slug}`}
              eventName="portfolio_case_open"
              eventParams={{ slug: project.slug, location: "home-editorial" }}
              className="button-primary button-primary-contrast text-sm font-medium"
            >
              Разобрать кейс
            </TrackedLink>
            <RouteContactLink
              route="editorial"
              analyticsLocation="home-editorial"
              className="button-secondary button-secondary-dark text-sm font-medium"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
