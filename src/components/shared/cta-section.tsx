import { TrackedLink } from "@/components/shared/tracked-link";
import { siteSettings } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type CTASectionProps = {
  title: string;
  description: string;
  analyticsLocation: string;
  tone?: "light" | "dark";
};

export function CTASection({
  title,
  description,
  analyticsLocation,
  tone = "light",
}: CTASectionProps) {
  const isDark = tone === "dark";

  return (
    <section
      className={cn(
        "px-6 py-6 md:px-8 md:py-7",
        isDark ? "cta-dark text-white" : "surface-card",
      )}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl space-y-2">
          <p className={cn("section-kicker", isDark && "text-white/60")}>
            Telegram
          </p>
          <h2
            className={cn(
              "section-title max-w-[14ch] text-balance",
              isDark && "text-white",
            )}
          >
            {title}
          </h2>
          <p className={cn("body-copy max-w-xl", isDark && "text-white/70")}>
            {description}
          </p>
        </div>
        <TrackedLink
          href={siteSettings.ctaHref}
          target="_blank"
          rel="noreferrer"
          eventName="cta_click"
          eventParams={{ location: analyticsLocation, target: "telegram" }}
          className="button-primary text-sm font-medium"
        >
          {siteSettings.ctaLabel}
        </TrackedLink>
      </div>
    </section>
  );
}
