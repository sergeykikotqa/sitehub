import { CaseVisualFrame } from "@/components/portfolio/case-visual-frame";
import { RouteContactLink } from "@/components/shared/cta-section";
import { TrackedLink } from "@/components/shared/tracked-link";
import {
  getFrame,
  PROOF_FRAME_ORDER,
  type CasePresentationConfig,
} from "@/lib/case-presentation";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";

type PortfolioCaseModuleProps = {
  project: Project;
  presentation: CasePresentationConfig;
  priority?: boolean;
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

export function PortfolioSystemModule({
  project,
  presentation,
  priority = false,
}: PortfolioCaseModuleProps) {
  const [understandAsset, trustAsset, actAsset] = PROOF_FRAME_ORDER.map((key) =>
    getFrame(presentation.visualAssets.proofFrames, key),
  );

  return (
    <article className="surface-card px-6 py-6 md:px-8 md:py-8">
      <div className="space-y-6">
        <div className="max-w-3xl space-y-3">
          <p className="section-kicker">{presentation.portfolio.label}</p>
          <h2 className="section-title max-w-[12ch] text-balance">
            {presentation.portfolio.title}
          </h2>
        </div>

        <div className="rounded-[28px] border border-border/80 bg-white/68 p-5 md:p-6">
          <div className="grid gap-5 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:gap-6">
            <div className="space-y-3 xl:border-r xl:border-border/70 xl:pr-6">
              <p className="section-kicker">Ситуация</p>
              <StackedCopy text={presentation.portfolio.situation} />
            </div>
            <div className="space-y-3">
              <p className="section-kicker">Почему это работает</p>
              <StackedCopy text={presentation.portfolio.systemWhyItWorks ?? ""} />
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-[rgba(158,90,51,0.16)] bg-[rgba(255,248,240,0.82)] p-5">
          <p className="section-kicker">Доказательство на кейсе</p>
          <div className="mt-3">
            <StackedCopy text={presentation.portfolio.systemProof ?? ""} />
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.02fr)_minmax(19rem,0.98fr)]">
          <CaseVisualFrame
            asset={understandAsset}
            loadPriority={priority ? "high" : "auto"}
          />
          <div className="space-y-4">
            <SignalList signals={presentation.signals} />
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
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <CaseVisualFrame asset={trustAsset} />
          <CaseVisualFrame asset={actAsset} />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <RouteContactLink
            route="system"
            analyticsSurface="portfolio"
            className="button-primary w-full justify-center text-sm font-medium sm:w-auto"
          >
            {presentation.portfolio.primaryCta}
          </RouteContactLink>
          <TrackedLink
            href={`/portfolio/${project.slug}`}
            eventName="portfolio_case_open"
            eventParams={{
              case_slug: project.slug,
              scenario: "system",
              surface: "portfolio",
            }}
            className="button-secondary w-full justify-center text-sm font-medium sm:w-auto"
          >
            {presentation.portfolio.secondaryCta}
          </TrackedLink>
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
  const [understandAsset, trustAsset, actAsset] = PROOF_FRAME_ORDER.map((key) =>
    getFrame(presentation.visualAssets.proofFrames, key),
  );

  return (
    <article className="surface-inverse px-6 py-6 md:px-8 md:py-8">
      <div className="space-y-6">
        <div className="max-w-3xl space-y-3">
          <p className="section-kicker text-white/52">{presentation.portfolio.label}</p>
          <h2 className="section-title max-w-[11ch] text-balance text-white">
            {presentation.portfolio.title}
          </h2>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5 md:p-6">
          <div className="grid gap-5 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:gap-6">
            <div className="space-y-3 xl:border-r xl:border-white/10 xl:pr-6">
              <p className="section-kicker text-white/62">Ситуация</p>
              <StackedCopy text={presentation.portfolio.situation} dark />
            </div>
            <div className="space-y-3">
              <p className="section-kicker text-white/62">Что срабатывает</p>
              <StackedCopy text={presentation.portfolio.editorialProofFirst ?? ""} dark />
            </div>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)]">
          <CaseVisualFrame
            asset={understandAsset}
            loadPriority={priority ? "high" : "auto"}
            tone="dark"
          />
          <div className="grid gap-4 md:grid-cols-2">
            <CaseVisualFrame asset={trustAsset} tone="dark" />
            <CaseVisualFrame asset={actAsset} tone="dark" />
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-5">
          <p className="section-kicker text-white/62">Почему это работает</p>
          <div className="mt-3">
            <StackedCopy text={presentation.portfolio.editorialInterpretation ?? ""} dark />
          </div>
        </div>

        <SignalList signals={presentation.signals} dark />

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <RouteContactLink
            route="editorial"
            analyticsSurface="portfolio"
            className="button-primary button-primary-contrast w-full justify-center text-sm font-medium sm:w-auto"
          >
            {presentation.portfolio.primaryCta}
          </RouteContactLink>
          <TrackedLink
            href={`/portfolio/${project.slug}`}
            eventName="portfolio_case_open"
            eventParams={{
              case_slug: project.slug,
              scenario: "editorial",
              surface: "portfolio",
            }}
            className="button-secondary button-secondary-dark w-full justify-center text-sm font-medium sm:w-auto"
          >
            {presentation.portfolio.secondaryCta}
          </TrackedLink>
        </div>
      </div>
    </article>
  );
}
