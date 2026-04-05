import Link from "next/link";

import { CtaRouter } from "@/components/shared/cta-section";
import type { NavigationItem } from "@/types/content";

type SiteHeaderProps = {
  navigationItems: NavigationItem[];
};

export function SiteHeader({
  navigationItems,
}: SiteHeaderProps) {
  return (
    <header className="border-b border-border/55 bg-transparent">
      <div className="mx-auto flex min-h-[5.25rem] w-full max-w-[82rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="СайтХаб — на главную"
          className="brand-wordmark inline-flex items-center"
        >
          СайтХаб
        </Link>
        <div className="flex items-center gap-4">
          <nav aria-label="Основная навигация" className="flex items-center gap-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <CtaRouter
            analyticsSurface="generic"
            variant="compact"
            routes={["generic"]}
            className="hidden xl:flex"
          />
        </div>
      </div>
    </header>
  );
}
