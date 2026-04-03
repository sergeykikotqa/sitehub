"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { TrackedLink } from "@/components/shared/tracked-link";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/types/content";

type SiteHeaderProps = {
  navigationItems: NavigationItem[];
  ctaLabel: string;
  ctaHref: string;
};

export function SiteHeader({
  navigationItems,
  ctaHref,
  ctaLabel,
}: SiteHeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="СайтХаб — на главную"
          className="brand-wordmark inline-flex items-center"
        >
          СайтХаб
        </Link>
        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-1 rounded-full border border-border bg-white/60 p-1">
            {navigationItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(`${item.href}/`));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none",
                    isActive && "bg-foreground text-white",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <TrackedLink
            href={ctaHref}
            target="_blank"
            rel="noreferrer"
            eventName="cta_click"
            eventParams={{ location: "header", target: "telegram" }}
            className="button-primary hidden text-sm font-medium md:inline-flex"
          >
            {ctaLabel}
          </TrackedLink>
        </div>
      </div>
    </header>
  );
}
