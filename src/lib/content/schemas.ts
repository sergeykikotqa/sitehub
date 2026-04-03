import { z } from "zod";

import type {
  CtaRouteContent,
  FooterContent,
  HeroContent,
  LegalContent,
  NavigationItem,
  PortfolioContent,
  ProjectFrontmatter,
  ProjectStatus,
  SiteSettings,
} from "@/types/content";

const requiredString = z.string().trim().min(1);
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const projectStatusSchema: z.ZodType<ProjectStatus> = z.enum([
  "draft",
  "published",
]);

const hrefSchema = requiredString.refine(
  (value) => value.startsWith("/") || /^https?:\/\//.test(value),
  "Expected a relative path or absolute URL.",
);
const absoluteUrlSchema = requiredString
  .url()
  .refine(
    (value) => value.startsWith("http://") || value.startsWith("https://"),
    "Expected an absolute http or https URL.",
  );

export const navigationItemSchema: z.ZodType<NavigationItem> = z.object({
  label: requiredString,
  href: hrefSchema,
});

export const ctaRouteContentSchema: z.ZodType<CtaRouteContent> = z.object({
  label: requiredString,
  description: requiredString,
  analyticsKey: requiredString,
});

export const heroContentSchema: z.ZodType<HeroContent> = z.object({
  eyebrow: requiredString,
  title: requiredString,
  subtitle: requiredString,
  supportingTitle: requiredString,
});

export const portfolioContentSchema: z.ZodType<PortfolioContent> = z.object({
  title: requiredString,
  description: requiredString,
});

export const footerContentSchema: z.ZodType<FooterContent> = z.object({
  note: requiredString,
});

export const legalContentSchema: z.ZodType<LegalContent> = z.object({
  footerTrustLine: requiredString,
  legalLinkLabel: requiredString,
  legalPageTitle: requiredString,
  legalStatusLine: requiredString,
  legalDescription: requiredString,
  legalContactsNote: requiredString,
  legalLastUpdated: requiredString.optional(),
});

export const siteSettingsSchema: z.ZodType<SiteSettings> = z.object({
  brandName: requiredString,
  siteUrl: absoluteUrlSchema,
  telegramUrl: absoluteUrlSchema,
  locationLabel: requiredString,
  defaultTitle: requiredString,
  defaultDescription: requiredString,
  defaultOgImage: hrefSchema,
  ctaLabel: requiredString,
  ctaHref: absoluteUrlSchema,
  ctaRoutes: z.object({
    system: ctaRouteContentSchema,
    editorial: ctaRouteContentSchema,
  }),
  navigation: z.array(navigationItemSchema).min(1),
  hero: heroContentSchema,
  portfolio: portfolioContentSchema,
  footer: footerContentSchema,
  legal: legalContentSchema,
});

export const projectFrontmatterSchema: z.ZodType<ProjectFrontmatter> = z.object({
  status: projectStatusSchema,
  title: requiredString,
  slug: requiredString.regex(
    slugPattern,
    "Slug must use lowercase latin letters, numbers, and hyphens only.",
  ),
  projectUrl: absoluteUrlSchema.optional(),
  category: requiredString,
  shortDescription: requiredString,
  services: z.array(requiredString).min(1),
  featured: z.boolean(),
  order: z.number().int().nonnegative().optional(),
  publishedAt: requiredString,
  coverImage: hrefSchema.optional(),
  coverAlt: requiredString.optional(),
  seoTitle: requiredString,
  seoDescription: requiredString,
  problem: requiredString,
  solution: requiredString,
  result: requiredString,
});
