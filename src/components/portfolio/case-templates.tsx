import type { ReactNode } from "react";

import { CaseVisualFrame } from "@/components/portfolio/case-visual-frame";
import {
  CTASection,
  RouteContactLink,
} from "@/components/shared/cta-section";
import { MarkdownContent } from "@/components/shared/markdown-content";
import { TrackedLink } from "@/components/shared/tracked-link";
import type { CasePresentationConfig } from "@/lib/case-presentation";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";

type CaseTemplateProps = {
  project: Project;
  presentation: CasePresentationConfig;
};

function OverviewGrid({
  items,
  dark = false,
}: {
  items: CasePresentationConfig["overview"];
  dark?: boolean;
}) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div
          key={`${item.label}-${item.value}`}
          className={cn(
            "rounded-[28px] border p-5",
            dark
              ? "border-white/10 bg-white/[0.04]"
              : "border-border bg-[rgba(255,252,247,0.74)] shadow-[0_18px_52px_rgba(28,24,20,0.06)]",
          )}
        >
          <p className={cn("section-kicker", dark && "text-white/52")}>
            {item.label}
          </p>
          <p
            className={cn(
              "mt-3 text-[0.98rem] leading-7 text-foreground/78",
              dark && "text-white/78",
            )}
          >
            {item.value}
          </p>
        </div>
      ))}
    </section>
  );
}

function NarrativePanel({
  title,
  content,
  dark = false,
  children,
}: {
  title: string;
  content?: string;
  dark?: boolean;
  children?: ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-[30px] border p-6 md:p-7",
        dark
          ? "border-white/10 bg-white/[0.04]"
          : "border-border bg-[rgba(255,252,247,0.74)] shadow-[0_18px_52px_rgba(28,24,20,0.06)]",
      )}
    >
      <p className={cn("section-kicker", dark && "text-white/52")}>{title}</p>
      {content ? (
        <p
          className={cn(
            "mt-4 text-[1rem] leading-8 text-foreground/78",
            dark && "text-white/78",
          )}
        >
          {content}
        </p>
      ) : null}
      {children}
    </section>
  );
}

function SignalStrip({
  presentation,
  dark = false,
}: {
  presentation: CasePresentationConfig;
  dark?: boolean;
}) {
  return (
    <section
      className={cn(
        "rounded-[30px] border p-6 md:p-7",
        dark
          ? "border-white/10 bg-white/[0.04]"
          : "border-border bg-[rgba(255,252,247,0.74)] shadow-[0_18px_52px_rgba(28,24,20,0.06)]",
      )}
    >
      <div className="space-y-4">
        <p className={cn("section-kicker", dark && "text-white/52")}>
          Почему именно такой формат
        </p>
        <p className={cn("body-copy max-w-[44rem]", dark && "text-white/74")}>
          {presentation.heroStatement}
        </p>
      </div>
      <ul className="case-signal-list mt-6">
        {presentation.signals.map((signal) => (
          <li
            key={signal}
            className={cn("case-signal-chip", dark && "case-signal-chip-dark")}
          >
            {signal}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SystemCaseTemplate({
  project,
  presentation,
}: CaseTemplateProps) {
  const [categoryAsset, videoAsset, trustAsset] = presentation.visualAssets.gallery;

  return (
    <div className="space-y-16 py-12 md:space-y-20 md:py-16">
      <section className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(21rem,0.92fr)] xl:items-start">
        <div className="space-y-6">
          <TrackedLink
            href="/portfolio"
            eventName="portfolio_listing_open"
            eventParams={{ location: "project-back", slug: project.slug }}
            className="inline-flex text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            ← Все кейсы
          </TrackedLink>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="section-kicker">{presentation.roleLabel}</span>
              <span className="case-mode-pill">{presentation.heroLabels[0]}</span>
            </div>
            <div className="space-y-4">
              <h1 className="editorial-case-title max-w-[12ch]">
                {project.title}
              </h1>
              <p className="max-w-[42rem] text-[1.1rem] leading-8 text-foreground/78">
                {presentation.heroStatement}
              </p>
            </div>
          </div>

          <div className="rounded-[30px] border border-[rgba(181,108,63,0.16)] bg-[rgba(255,248,240,0.8)] p-6">
            <p className="section-kicker">{presentation.heroLabels[1]}</p>
            <p className="mt-4 text-[1rem] leading-8 text-foreground/78">
              {presentation.heroCaption}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <RouteContactLink
              route="system"
              analyticsLocation="project-hero-system"
              className="button-primary text-sm font-medium"
            />
            {project.projectUrl ? (
              <TrackedLink
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                eventName="project_external_open"
                eventParams={{ location: "project-hero", slug: project.slug }}
                className="button-secondary text-sm font-medium"
              >
                Открыть live
              </TrackedLink>
            ) : null}
          </div>
        </div>

        <CaseVisualFrame asset={presentation.visualAssets.lead} priority />
      </section>

      <OverviewGrid items={presentation.overview} />

      <section className="grid gap-4 xl:grid-cols-2">
        <NarrativePanel title="Задача" content={project.problem} />
        <NarrativePanel title="Решение" content={project.solution} />
      </section>

      <SignalStrip presentation={presentation} />

      <section className="space-y-6">
        <div className="space-y-3">
          <p className="section-kicker">Разбор экранов</p>
          <h2 className="section-title max-w-[11ch] text-balance">
            Где маршрут становится убедительным
          </h2>
        </div>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.06fr)_minmax(18rem,0.94fr)]">
          <div className="grid gap-4">
            <CaseVisualFrame asset={categoryAsset} />
            <CaseVisualFrame asset={videoAsset} />
          </div>
          <CaseVisualFrame asset={trustAsset} />
        </div>
      </section>

      {project.body ? (
        <section className="rounded-[30px] border border-border bg-[rgba(255,252,247,0.74)] p-6 shadow-[0_18px_52px_rgba(28,24,20,0.06)] md:p-7">
          <MarkdownContent content={project.body} />
        </section>
      ) : null}

      <NarrativePanel title="Результат" content={project.result} />

      <CTASection
        title={presentation.ctaCopy.title}
        description={presentation.ctaCopy.description}
        analyticsLocation={`case-${project.slug}`}
        primaryRoute="system"
        tone={presentation.ctaCopy.tone}
      />
    </div>
  );
}

export function EditorialCaseTemplate({
  project,
  presentation,
}: CaseTemplateProps) {
  const [proofCardAsset, proofFlowAsset, heroTypeAsset] =
    presentation.visualAssets.gallery;

  return (
    <div className="space-y-12 py-10 md:space-y-16 md:py-14">
      <section className="rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,16,17,0.99),rgba(11,11,13,1))] px-6 py-6 text-white shadow-[0_32px_84px_rgba(8,8,8,0.28)] md:px-8 md:py-8">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,0.92fr)] xl:items-start">
          <div className="space-y-6">
            <TrackedLink
              href="/portfolio"
              eventName="portfolio_listing_open"
              eventParams={{ location: "project-back", slug: project.slug }}
              className="inline-flex text-sm text-white/62 transition-colors duration-200 hover:text-white"
            >
              ← Все кейсы
            </TrackedLink>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="section-kicker text-white/52">
                  {presentation.roleLabel}
                </span>
                <span className="case-mode-pill case-mode-pill-dark">
                  {presentation.heroLabels[0]}
                </span>
              </div>
              <div className="space-y-4">
                <h1 className="editorial-case-title max-w-[11ch] text-white">
                  {project.title}
                </h1>
                <p className="max-w-[42rem] text-[1.12rem] leading-8 text-white/74">
                  {presentation.heroStatement}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <RouteContactLink
                route="editorial"
                analyticsLocation="project-hero-editorial"
                className="button-primary button-primary-contrast text-sm font-medium"
              />
              {project.projectUrl ? (
                <TrackedLink
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName="project_external_open"
                  eventParams={{ location: "project-hero", slug: project.slug }}
                  className="button-secondary button-secondary-dark text-sm font-medium"
                >
                  Открыть live
                </TrackedLink>
              ) : null}
            </div>

            <NarrativePanel
              title={presentation.heroLabels[1]}
              content={presentation.heroCaption}
              dark
            />
          </div>

          <div className="space-y-4">
            <CaseVisualFrame
              asset={presentation.visualAssets.lead}
              priority
              tone="dark"
            />
            <div className="grid gap-4 md:grid-cols-[minmax(0,0.9fr)_minmax(16rem,1.1fr)]">
              <CaseVisualFrame asset={proofCardAsset} tone="dark" />
              <CaseVisualFrame asset={heroTypeAsset} tone="dark" />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 xl:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)]">
          <NarrativePanel title="Задача" content={project.problem} dark />
          <OverviewGrid items={presentation.overview} dark />
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <p className="section-kicker">Разбор экранов</p>
          <h2 className="section-title max-w-[11ch] text-balance">
            Где ритм становится доказательством
          </h2>
        </div>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)]">
          <CaseVisualFrame asset={proofFlowAsset} />
          <div className="grid gap-4">
            <CaseVisualFrame asset={proofCardAsset} />
            <CaseVisualFrame asset={heroTypeAsset} />
          </div>
        </div>
      </section>

      <SignalStrip presentation={presentation} />

      <section className="grid gap-4 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <NarrativePanel title="Решение" content={project.solution} />
        {project.body ? (
          <section className="rounded-[30px] border border-border bg-[rgba(255,252,247,0.74)] p-6 shadow-[0_18px_52px_rgba(28,24,20,0.06)] md:p-7">
            <MarkdownContent content={project.body} />
          </section>
        ) : (
          <NarrativePanel title="Результат" content={project.result} />
        )}
      </section>

      {project.body ? (
        <NarrativePanel title="Результат" content={project.result} />
      ) : null}

      <CTASection
        title={presentation.ctaCopy.title}
        description={presentation.ctaCopy.description}
        analyticsLocation={`case-${project.slug}`}
        primaryRoute="editorial"
        tone={presentation.ctaCopy.tone}
      />
    </div>
  );
}
