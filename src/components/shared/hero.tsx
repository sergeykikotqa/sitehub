import Image from "next/image";

import { TrackedLink } from "@/components/shared/tracked-link";
import { siteSettings } from "@/lib/site-config";
import type { Project } from "@/types/content";

type HeroProps = {
  project?: Project | null;
};

function HeroProductComposition({ project }: { project: Project }) {
  const shortLines = project.shortDescription
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const coverImage = project.coverImage ?? siteSettings.defaultOgImage;
  const primaryService = project.services[0] ?? "Лендинг";

  return (
    <div className="relative mx-auto w-[90%] max-w-[34rem] md:w-[88%] lg:mx-0 lg:w-full lg:max-w-[34rem] lg:translate-x-5">
      <div className="hero-proof-layout">
        <div className="hero-proof-copy-fragment">
          <div className="flex flex-wrap items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-black/32">
            <span>{project.category}</span>
            <span className="h-1 w-1 rounded-full bg-black/14" />
            <span>{primaryService}</span>
          </div>

          <div className="max-w-[16.5rem] space-y-3">
            <h2 className="text-[1.95rem] font-semibold leading-[1.02] tracking-[-0.05em] text-black/76">
              {project.title}
            </h2>
            <p className="text-sm leading-6 text-black/54 whitespace-pre-line">
              {project.shortDescription}
            </p>
          </div>

          <span className="hero-proof-action">{siteSettings.ctaLabel}</span>
        </div>

        <div className="hero-proof-visual-fragment">
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-3 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/34">
            <span>Первый экран</span>
            <span>Быстрая заявка</span>
          </div>
          <div className="absolute inset-x-0 bottom-0 top-10">
            <Image
              src={coverImage}
              alt=""
              fill
              aria-hidden
              className="object-cover object-left-top opacity-90 saturate-[0.9]"
              sizes="(min-width: 1280px) 420px, (min-width: 768px) 55vw, 90vw"
            />
          </div>
        </div>
      </div>

      <div className="absolute -bottom-7 left-2 hidden w-[38%] max-w-[12rem] md:block">
        <div className="hero-proof-secondary px-4 py-4">
          <p className="text-[0.62rem] font-medium uppercase tracking-[0.2em] text-black/34">
            Фокус
          </p>
          <p className="mt-3 text-sm font-medium leading-5 text-black/66">
            {shortLines[0] ?? "Быстрая заявка"}
          </p>
          <div className="mt-4 h-px w-full bg-black/10" />
          <p className="mt-4 text-[0.72rem] uppercase tracking-[0.18em] text-black/28">
            Спокойный ритм
          </p>
        </div>
      </div>
    </div>
  );
}

export function Hero({ project }: HeroProps) {
  const titleLines = siteSettings.hero.title.split("\n");

  return (
    <section className="px-2 py-16 sm:px-4 lg:px-0 lg:py-28 xl:py-32">
      <div className="mx-auto max-w-[72rem] lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(28rem,34rem)] lg:items-center lg:gap-20 xl:gap-24">
        <div className="max-w-[38rem] space-y-6">
          <div className="space-y-4">
            <h1 className="display-title max-w-[37rem] text-[#1a1a1a]">
              {titleLines.map((line, index) => {
                if (line.trim() === "") {
                  return (
                    <span key={`line-${index}`} className="block h-4" aria-hidden />
                  );
                }

                const className =
                  index === 0
                    ? "block font-medium"
                    : index === 1
                      ? "block font-semibold"
                      : index === 3
                        ? "block font-medium text-[#9aa0a6]"
                        : index === 4
                          ? "block font-semibold"
                          : "block";

                return (
                  <span key={`line-${index}`} className={className}>
                    {line}
                  </span>
                );
              })}
            </h1>
            <h2 className="max-w-[30rem] text-[18px] font-medium leading-7 text-[#4a4a4a]">
              {siteSettings.hero.supportingTitle}
            </h2>
            <p className="body-copy max-w-xl">{siteSettings.hero.subtitle}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <TrackedLink
              href={siteSettings.ctaHref}
              target="_blank"
              rel="noreferrer"
              eventName="cta_click"
              eventParams={{ location: "hero", target: "telegram" }}
              className="button-primary text-sm font-medium"
            >
              {siteSettings.ctaLabel}
            </TrackedLink>
            <TrackedLink
              href="/portfolio"
              eventName="portfolio_listing_open"
              eventParams={{ location: "hero" }}
              className="button-secondary text-sm font-medium"
            >
              Смотреть кейсы
            </TrackedLink>
          </div>
        </div>

        {project ? <HeroProductComposition project={project} /> : null}
      </div>
    </section>
  );
}
