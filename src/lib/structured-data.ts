import { siteSettings, toAbsoluteSiteUrl } from "@/lib/site-config";
import type { Project } from "@/types/content";

function buildListItems(projects: Project[]) {
  return projects.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: project.title,
    item: toAbsoluteSiteUrl(`/portfolio/${project.slug}`),
  }));
}

export function buildHomeJsonLd(projects: Project[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": toAbsoluteSiteUrl("/#website"),
        url: toAbsoluteSiteUrl("/"),
        name: siteSettings.brandName,
        description: siteSettings.defaultDescription,
        inLanguage: "ru-RU",
      },
      {
        "@type": "Organization",
        "@id": toAbsoluteSiteUrl("/#organization"),
        name: siteSettings.brandName,
        url: toAbsoluteSiteUrl("/"),
        logo: toAbsoluteSiteUrl(siteSettings.defaultOgImage),
      },
      {
        "@type": "WebPage",
        "@id": toAbsoluteSiteUrl("/#webpage"),
        url: toAbsoluteSiteUrl("/"),
        name: `${siteSettings.portfolio.title} — ${siteSettings.brandName}`,
        description:
          "СайтХаб показывает два флагманских сценария для одной ниши: системный коммерческий сайт и короткий лендинг с proof-сценами.",
        isPartOf: {
          "@id": toAbsoluteSiteUrl("/#website"),
        },
        mainEntity: {
          "@id": toAbsoluteSiteUrl("/#cases"),
        },
      },
      {
        "@type": "ItemList",
        "@id": toAbsoluteSiteUrl("/#cases"),
        name: "Флагманские кейсы СайтХаб",
        itemListElement: buildListItems(projects),
      },
    ],
  };
}

export function buildPortfolioJsonLd(projects: Project[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": toAbsoluteSiteUrl("/portfolio#collection"),
        url: toAbsoluteSiteUrl("/portfolio"),
        name: siteSettings.portfolio.title,
        description: siteSettings.portfolio.description,
        isPartOf: {
          "@id": toAbsoluteSiteUrl("/#website"),
        },
        mainEntity: {
          "@id": toAbsoluteSiteUrl("/portfolio#itemlist"),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": toAbsoluteSiteUrl("/portfolio#breadcrumbs"),
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Главная",
            item: toAbsoluteSiteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Портфолио",
            item: toAbsoluteSiteUrl("/portfolio"),
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": toAbsoluteSiteUrl("/portfolio#itemlist"),
        name: `Кейсы ${siteSettings.portfolio.title}`,
        itemListElement: buildListItems(projects),
      },
    ],
  };
}

export function buildProjectJsonLd(project: Project) {
  const pageUrl = toAbsoluteSiteUrl(`/portfolio/${project.slug}`);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: project.seoTitle,
        description: project.seoDescription,
        isPartOf: {
          "@id": toAbsoluteSiteUrl("/#website"),
        },
        breadcrumb: {
          "@id": `${pageUrl}#breadcrumbs`,
        },
        primaryImageOfPage: toAbsoluteSiteUrl(`/portfolio/${project.slug}/opengraph-image`),
        about: {
          "@id": `${pageUrl}#project`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Главная",
            item: toAbsoluteSiteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Портфолио",
            item: toAbsoluteSiteUrl("/portfolio"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "CreativeWork",
        "@id": `${pageUrl}#project`,
        name: project.title,
        description: project.seoDescription,
        url: pageUrl,
        image: toAbsoluteSiteUrl(`/portfolio/${project.slug}/opengraph-image`),
        genre: project.services.join(", "),
        inLanguage: "ru-RU",
        about: project.category,
        sameAs: project.projectUrl,
      },
    ],
  };
}
