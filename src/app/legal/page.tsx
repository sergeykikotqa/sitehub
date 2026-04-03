import { TrackedLink } from "@/components/shared/tracked-link";
import { buildPageMetadata } from "@/lib/seo";
import { siteSettings } from "@/lib/site-config";

export const metadata = buildPageMetadata({
  title: `${siteSettings.legal.legalPageTitle} — ${siteSettings.brandName}`,
  description: siteSettings.legal.legalStatusLine,
  path: "/legal",
  noIndex: true,
});

export default function LegalPage() {
  return (
    <div className="space-y-8 py-12 md:py-16">
      <section className="surface-card px-6 py-8 md:px-8">
        <div className="max-w-3xl space-y-4">
          <p className="section-kicker">{siteSettings.legal.legalLinkLabel}</p>
          <h1 className="section-title max-w-[12ch] text-balance">
            {siteSettings.legal.legalPageTitle}
          </h1>
          <p className="body-copy max-w-2xl">{siteSettings.legal.legalStatusLine}</p>
          <TrackedLink
            href={siteSettings.ctaHref}
            target="_blank"
            rel="noreferrer"
            eventName="cta_click"
            eventParams={{ location: "legal", target: "telegram" }}
            className="button-primary text-sm font-medium"
          >
            {siteSettings.ctaLabel}
          </TrackedLink>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="surface-panel p-5">
          <p className="section-kicker">Статус</p>
          <p className="body-copy mt-3">{siteSettings.legal.legalStatusLine}</p>
        </article>
        <article className="surface-panel p-5">
          <p className="section-kicker">Документы</p>
          <p className="body-copy mt-3">{siteSettings.legal.legalDescription}</p>
        </article>
        <article className="surface-panel p-5">
          <p className="section-kicker">Контакт</p>
          <p className="body-copy mt-3">{siteSettings.legal.legalContactsNote}</p>
        </article>
      </section>

      {siteSettings.legal.legalLastUpdated ? (
        <p className="text-sm leading-6 text-muted-foreground">
          Обновлено {siteSettings.legal.legalLastUpdated}
        </p>
      ) : null}
    </div>
  );
}
