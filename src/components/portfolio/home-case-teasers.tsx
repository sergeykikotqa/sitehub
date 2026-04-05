import { CaseVisualFrame } from "@/components/portfolio/case-visual-frame";
import { RouteContactLink } from "@/components/shared/cta-section";
import { TrackedLink } from "@/components/shared/tracked-link";
import type { CasePresentationConfig } from "@/lib/case-presentation";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";

type HomeCaseTeaserProps = {
  project: Project;
  presentation: CasePresentationConfig;
};

function splitSentences(text: string) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function StackedCopy({
  text,
  dark = false,
}: {
  text: string;
  dark?: boolean;
}) {
  const [lead, ...supporting] = splitSentences(text);

  return (
    <div className={cn("stacked-copy", dark && "stacked-copy-dark")}>
      {lead ? <p className="stacked-copy-lead">{lead}</p> : null}
      {supporting.map((sentence, index) => (
        <p key={`${sentence}-${index}`} className="stacked-copy-support">
          {sentence}
        </p>
      ))}
    </div>
  );
}

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

export function HomeSystemTeaser({
  project,
  presentation,
}: HomeCaseTeaserProps) {
  const [categoryAsset, videoAsset, trustAsset] = presentation.visualAssets.gallery;

  return (
    <section className="surface-card px-6 py-6 md:px-8 md:py-8">
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(24rem,1fr)] xl:items-start">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="section-kicker">{presentation.home.label}</p>
            <h2 className="section-title max-w-[12ch] text-balance">
              {presentation.home.title}
            </h2>
          </div>

          <div className="rounded-[28px] border border-border/80 bg-white/68 p-5 md:p-6">
            <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.92fr)] md:gap-6">
              <div className="space-y-3 md:border-r md:border-border/70 md:pr-6">
                <p className="section-kicker">Ситуация</p>
                <StackedCopy text={presentation.home.diagnosis} />
              </div>
              <div className="space-y-3">
                <p className="section-kicker">Почему это работает</p>
                <StackedCopy text={presentation.home.systemWhyItWorks ?? ""} />
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-[rgba(158,90,51,0.16)] bg-[rgba(255,248,240,0.82)] p-5">
            <p className="section-kicker">Доказательство на кейсе</p>
            <div className="mt-3">
              <StackedCopy text={presentation.home.systemProofLead ?? ""} />
            </div>
          </div>

          <SignalList signals={presentation.signals} />

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <RouteContactLink
              route="system"
              analyticsSurface="home"
              className="button-primary w-full justify-center text-sm font-medium sm:w-auto"
            >
              {presentation.home.primaryCta}
            </RouteContactLink>
            <TrackedLink
              href={`/portfolio/${project.slug}`}
              eventName="portfolio_case_open"
              eventParams={{
                case_slug: project.slug,
                scenario: "system",
                surface: "home",
              }}
              className="button-secondary w-full justify-center text-sm font-medium sm:w-auto"
            >
              {presentation.home.secondaryCta}
            </TrackedLink>
          </div>
        </div>

        <div className="space-y-4">
          <CaseVisualFrame asset={presentation.visualAssets.home} />
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(16rem,0.88fr)]">
            <CaseVisualFrame asset={categoryAsset} />
            <div className="grid gap-4">
              <CaseVisualFrame asset={videoAsset} />
              <CaseVisualFrame asset={trustAsset} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeEditorialTeaser({
  project,
  presentation,
}: HomeCaseTeaserProps) {
  const [proofCardAsset, proofFlowAsset, heroTypeAsset] =
    presentation.visualAssets.gallery;

  return (
    <section className="surface-inverse px-6 py-6 md:px-8 md:py-8">
      <div className="space-y-6">
        <div className="max-w-3xl space-y-3">
          <p className="section-kicker text-white/52">{presentation.home.label}</p>
          <h2 className="section-title max-w-[11ch] text-balance text-white">
            {presentation.home.title}
          </h2>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 md:p-6">
          <div className="grid gap-5 xl:grid-cols-[minmax(0,0.96fr)_minmax(20rem,1.04fr)] xl:gap-6">
            <div className="space-y-3 xl:border-r xl:border-white/10 xl:pr-6">
              <p className="section-kicker text-white/62">Ситуация</p>
              <StackedCopy text={presentation.home.diagnosis} dark />
            </div>
            <div className="space-y-3">
              <p className="section-kicker text-white/62">Что срабатывает</p>
              <StackedCopy text={presentation.home.editorialProofFirst ?? ""} dark />
            </div>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)]">
          <CaseVisualFrame asset={presentation.visualAssets.home} tone="dark" />
          <div className="grid gap-4 md:grid-cols-[minmax(0,0.84fr)_minmax(15rem,1.16fr)]">
            <CaseVisualFrame asset={proofCardAsset} tone="dark" />
            <div className="grid gap-4">
              <CaseVisualFrame asset={proofFlowAsset} tone="dark" />
              <CaseVisualFrame asset={heroTypeAsset} tone="dark" />
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5">
          <p className="section-kicker text-white/62">Почему это работает</p>
          <div className="mt-3">
            <StackedCopy text={presentation.home.editorialInterpretation ?? ""} dark />
          </div>
        </div>

        <SignalList signals={presentation.signals} dark />

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <RouteContactLink
            route="editorial"
            analyticsSurface="home"
            className="button-primary button-primary-contrast w-full justify-center text-sm font-medium sm:w-auto"
          >
            {presentation.home.primaryCta}
          </RouteContactLink>
          <TrackedLink
            href={`/portfolio/${project.slug}`}
            eventName="portfolio_case_open"
            eventParams={{
              case_slug: project.slug,
              scenario: "editorial",
              surface: "home",
            }}
            className="button-secondary button-secondary-dark w-full justify-center text-sm font-medium sm:w-auto"
          >
            {presentation.home.secondaryCta}
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
