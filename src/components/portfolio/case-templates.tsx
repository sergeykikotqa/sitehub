import type { ReactNode } from "react";

import { CaseVisualFrame } from "@/components/portfolio/case-visual-frame";
import {
  CTASection,
  RouteContactLink,
} from "@/components/shared/cta-section";
import { MarkdownContent } from "@/components/shared/markdown-content";
import { TrackedLink } from "@/components/shared/tracked-link";
import {
  getFrame,
  type CasePresentationConfig,
} from "@/lib/case-presentation";
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
              : "border-border bg-[rgba(255,252,247,0.74)]",
          )}
        >
          <p className={cn("section-kicker", dark && "text-white/62")}>
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
          : "border-border bg-[rgba(255,252,247,0.74)]",
      )}
    >
      <p className={cn("section-kicker", dark && "text-white/62")}>{title}</p>
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
  title,
  signals,
  intro,
  dark = false,
}: {
  title: string;
  signals: CasePresentationConfig["signals"];
  intro?: string;
  dark?: boolean;
}) {
  return (
    <section
      className={cn(
        "rounded-[30px] border p-6 md:p-7",
        dark
          ? "border-white/10 bg-white/[0.04]"
          : "border-border bg-[rgba(255,252,247,0.74)]",
      )}
    >
      <div className="space-y-4">
        <p className={cn("section-kicker", dark && "text-white/62")}>{title}</p>
        {intro ? (
          <p className={cn("body-copy max-w-[44rem]", dark && "text-white/78")}>
            {intro}
          </p>
        ) : null}
      </div>
      <ul className="case-signal-list mt-6">
        {signals.map((signal) => (
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
  const understandAsset = getFrame(
    presentation.visualAssets.proofFrames,
    "understand",
  );
  const trustAsset = getFrame(presentation.visualAssets.proofFrames, "trust");
  const actAsset = getFrame(presentation.visualAssets.proofFrames, "act");

  return (
    <div className="space-y-16 py-12 md:space-y-20 md:py-16">
      <section className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,0.96fr)] xl:items-start">
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
              <span className="case-mode-pill">{project.title}</span>
            </div>
            <div className="space-y-4">
              <h1 className="section-title max-w-[12ch] text-balance md:text-[clamp(3rem,5vw,4.8rem)] md:leading-[0.94]">
                {presentation.detail.entryTitle}
              </h1>
              <p className="max-w-[42rem] text-[1.08rem] leading-8 text-foreground/78">
                {presentation.detail.entryCopy}
              </p>
              <p className="muted-copy max-w-[40rem]">
                {presentation.detail.context}
              </p>
            </div>
          </div>
        </div>

        <CaseVisualFrame
          asset={understandAsset}
          loadPriority="high"
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <NarrativePanel title="В чём проблема" content={presentation.detail.systemProblem}>
          <p className="muted-copy mt-4">{project.problem}</p>
        </NarrativePanel>
        <NarrativePanel title="Как работает система" content={presentation.detail.systemLogic}>
          <p className="muted-copy mt-4">{project.solution}</p>
        </NarrativePanel>
      </section>

      <OverviewGrid items={presentation.overview} />

      <section className="space-y-6">
        <div className="space-y-3">
          <p className="section-kicker">Доказательство</p>
          <h2 className="section-title max-w-[12ch] text-balance">
            Где система помогает принять решение
          </h2>
          <p className="body-copy max-w-[44rem]">
            {presentation.detail.systemProof}
          </p>
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,0.94fr)_minmax(20rem,1.06fr)] xl:items-start">
          <NarrativePanel
            title="Почему этому верят"
            content="Здесь доверие строится на реальных обзорах и примерах, а не на абстрактных обещаниях."
          />
          <CaseVisualFrame asset={trustAsset} />
        </div>
      </section>

      <SignalStrip
        title="Что удерживает маршрут"
        intro="В этом типе сайта человек движется не за счёт одной красивой сцены, а за счёт понятной структуры и спокойного накопления доверия."
        signals={presentation.signals}
      />

      {project.body ? (
        <section className="rounded-[30px] border border-border bg-[rgba(255,252,247,0.74)] p-6 md:p-7">
          <MarkdownContent content={project.body} />
        </section>
      ) : null}

      <NarrativePanel title="Что даёт такой формат" content={project.result} />

      <section className="rounded-[34px] border border-border bg-[linear-gradient(180deg,rgba(255,252,247,0.92),rgba(255,249,243,0.86))] px-6 py-6 shadow-[0_18px_52px_rgba(28,24,20,0.08)] md:px-8 md:py-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.96fr)_minmax(18rem,0.84fr)] xl:items-start">
          <div>
            <div className="max-w-3xl space-y-3">
              <p className="section-kicker">Следующий шаг</p>
              <h2 className="section-title max-w-[13ch] text-balance">
                {presentation.detail.closingTitle}
              </h2>
              <p className="body-copy">{presentation.detail.closingDescription}</p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <RouteContactLink
                route="system"
                analyticsSurface="detail"
                className="button-primary w-full justify-center text-sm font-medium sm:w-auto"
              >
                {presentation.detail.primaryCta}
              </RouteContactLink>
              <RouteContactLink
                route="editorial"
                analyticsSurface="detail"
                tier="secondary"
                className="button-secondary w-full justify-center text-sm font-medium sm:w-auto"
              >
                {presentation.detail.secondaryCta}
              </RouteContactLink>
            </div>
          </div>
          <CaseVisualFrame asset={actAsset} />
        </div>
      </section>
    </div>
  );
}

export function EditorialCaseTemplate({
  project,
  presentation,
}: CaseTemplateProps) {
  const understandAsset = getFrame(
    presentation.visualAssets.proofFrames,
    "understand",
  );
  const trustAsset = getFrame(presentation.visualAssets.proofFrames, "trust");
  const actAsset = getFrame(presentation.visualAssets.proofFrames, "act");

  return (
    <div className="space-y-10 py-8 md:space-y-16 md:py-14">
      <section className="rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,16,17,0.99),rgba(11,11,13,1))] px-6 py-5 text-white shadow-[0_32px_84px_rgba(8,8,8,0.28)] md:px-8 md:py-8">
        <div className="space-y-6">
          <TrackedLink
            href="/portfolio"
            eventName="portfolio_listing_open"
            eventParams={{ location: "project-back", slug: project.slug }}
            className="inline-flex text-sm text-white/62 transition-colors duration-200 hover:text-white"
          >
            ← Все кейсы
          </TrackedLink>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-start">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="section-kicker text-white/62">
                  {presentation.roleLabel}
                </span>
                <span className="case-mode-pill case-mode-pill-dark">
                  {project.title}
                </span>
              </div>
              <h1 className="section-title max-w-[11ch] text-balance text-white md:text-[clamp(3rem,5vw,4.6rem)] md:leading-[0.94]">
                {presentation.detail.entryTitle}
              </h1>
              <p className="max-w-[38rem] text-[1.08rem] leading-8 text-white/76">
                {presentation.detail.entryCopy}
              </p>
              <p className="hidden max-w-[38rem] text-[0.98rem] leading-7 text-white/66 sm:block">
                {presentation.detail.context}
              </p>
            </div>

            <CaseVisualFrame
              asset={understandAsset}
              loadPriority="high"
              tone="dark"
            />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="grid gap-3 sm:gap-4 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <NarrativePanel title="Что срабатывает" content={presentation.detail.editorialProof} />
          <CaseVisualFrame asset={trustAsset} />
        </div>

        <div className="grid gap-3 sm:gap-4 xl:grid-cols-[minmax(0,0.92fr)_minmax(20rem,1.08fr)]">
          <NarrativePanel
            title="Почему это работает быстро"
            content={presentation.detail.editorialWhyItWorks}
          />
          <div className="grid gap-3 sm:gap-4">
            <CaseVisualFrame asset={actAsset} />
            <section className="rounded-[30px] border border-[rgba(158,90,51,0.16)] bg-[rgba(255,248,240,0.82)] p-5 sm:p-6 md:p-7">
              <p className="section-kicker">Следующий шаг</p>
              <p className="mt-3 text-[0.98rem] leading-7 text-foreground/78">
                CTA появляется рано, пока импульс ещё не успел остыть.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <RouteContactLink
                  route="editorial"
                  analyticsSurface="detail"
                  className="button-primary w-full justify-center text-sm font-medium sm:w-auto"
                >
                  {presentation.detail.primaryCta}
                </RouteContactLink>
                <RouteContactLink
                  route="system"
                  analyticsSurface="detail"
                  tier="secondary"
                  className="button-secondary w-full justify-center text-sm font-medium sm:w-auto"
                >
                  {presentation.detail.secondaryCta}
                </RouteContactLink>
              </div>
            </section>
          </div>
        </div>
      </section>

      <SignalStrip
        title="Что держит темп"
        intro="Здесь важно не объяснять слишком много. Сначала работает ощущение, затем proof, и только потом короткое рациональное подтверждение."
        signals={presentation.signals}
      />

      <section className="grid gap-4 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <NarrativePanel title="Контекст" content={project.problem} />
        <NarrativePanel title="Эффект" content={project.result} />
      </section>

      {project.body ? (
        <section className="rounded-[30px] border border-border bg-[rgba(255,252,247,0.74)] p-6 md:p-7">
          <MarkdownContent content={project.body} />
        </section>
      ) : null}
    </div>
  );
}

export function DefaultCaseTemplate({ project }: { project: Project }) {
  const overviewItems: CasePresentationConfig["overview"] = [
    {
      label: "Категория",
      value: project.category,
    },
    {
      label: "Формат",
      value: project.services.join(", "),
    },
    {
      label: "Публикация",
      value: project.publishedAt,
    },
    {
      label: "Статус",
      value: "Нейтральный разбор кейса",
    },
  ];

  const visualAsset = project.coverImage
    ? {
        src: project.coverImage,
        alt: project.coverAlt ?? `Обложка кейса ${project.title}`,
        aspect: "wide" as const,
      }
    : null;

  return (
    <div className="space-y-16 py-12 md:space-y-20 md:py-16">
      <section className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,0.9fr)] xl:items-start">
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
              <span className="section-kicker">Нейтральный кейс</span>
              <span className="case-mode-pill">{project.category}</span>
            </div>
            <div className="space-y-4">
              <h1 className="editorial-case-title max-w-[12ch]">
                {project.title}
              </h1>
              <p className="max-w-[42rem] whitespace-pre-line text-[1.08rem] leading-8 text-foreground/78">
                {project.shortDescription}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <RouteContactLink
              route="generic"
              analyticsSurface="detail"
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

        {visualAsset ? (
          <CaseVisualFrame asset={visualAsset} loadPriority="high" />
        ) : null}
      </section>

      <OverviewGrid items={overviewItems} />

      <section className="grid gap-4 xl:grid-cols-2">
        <NarrativePanel title="Задача" content={project.problem} />
        <NarrativePanel title="Решение" content={project.solution} />
      </section>

      {project.body ? (
        <section className="rounded-[30px] border border-border bg-[rgba(255,252,247,0.74)] p-6 md:p-7">
          <MarkdownContent content={project.body} />
        </section>
      ) : null}

      <NarrativePanel title="Результат" content={project.result} />

      <CTASection
        title="Обсудим, какой формат нужен задаче"
        description="Если кейс не относится к двум флагманским сценариям, всё равно можно прийти с задачей и вместе выбрать правильный тип сайта."
        analyticsSurface="detail"
        routes={["generic"]}
      />
    </div>
  );
}
