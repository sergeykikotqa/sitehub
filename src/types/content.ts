export interface NavigationItem {
  label: string;
  href: string;
}

export type CtaRouteKey = "system" | "editorial" | "generic";

export interface CtaRouteContent {
  label: string;
  description: string;
  analyticsKey: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  supportingTitle: string;
}

export interface PortfolioContent {
  title: string;
  description: string;
}

export interface FooterContent {
  note: string;
}

export interface LegalContent {
  footerTrustLine: string;
  legalLinkLabel: string;
  legalPageTitle: string;
  legalStatusLine: string;
  legalDescription: string;
  legalContactsNote: string;
  legalLastUpdated?: string;
}

export interface SiteSettings {
  brandName: string;
  siteUrl: string;
  locationLabel: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultOgImage: string;
  ctaHref: string;
  ctaRoutes: Record<CtaRouteKey, CtaRouteContent>;
  flagshipCaseSlugs: [string, string];
  navigation: NavigationItem[];
  hero: HeroContent;
  portfolio: PortfolioContent;
  footer: FooterContent;
  legal: LegalContent;
}

export type ProjectStatus = "draft" | "published";

export interface ProjectFrontmatter {
  status: ProjectStatus;
  title: string;
  slug: string;
  projectUrl?: string;
  category: string;
  shortDescription: string;
  services: string[];
  featured: boolean;
  order?: number;
  publishedAt: string;
  coverImage?: string;
  coverAlt?: string;
  seoTitle: string;
  seoDescription: string;
  problem: string;
  solution: string;
  result: string;
}

export interface Project extends ProjectFrontmatter {
  body?: string;
}
