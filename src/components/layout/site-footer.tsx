import { TrackedLink } from "@/components/shared/tracked-link";
import { Container } from "@/components/shared/container";
import { siteSettings } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="mt-28 border-t border-border/70 py-14 text-muted">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <span className="brand-wordmark-footer inline-flex items-center">
              СайтХаб
            </span>
            <p className="muted-copy max-w-xl">{siteSettings.footer.note}</p>
            <div className="space-y-1">
              <p className="text-sm leading-6 text-muted-foreground">
                {siteSettings.legal.footerTrustLine}
              </p>
              <TrackedLink
                href="/legal"
                eventName="legal_link_open"
                eventParams={{ location: "footer" }}
                className="inline-flex text-sm leading-6 text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {siteSettings.legal.legalLinkLabel}
              </TrackedLink>
            </div>
          </div>
          <TrackedLink
            href={siteSettings.ctaHref}
            target="_blank"
            rel="noreferrer"
            eventName="cta_click"
            eventParams={{ location: "footer", target: "telegram" }}
            className="button-secondary text-sm font-medium"
          >
            {siteSettings.ctaLabel}
          </TrackedLink>
        </div>
      </Container>
    </footer>
  );
}
