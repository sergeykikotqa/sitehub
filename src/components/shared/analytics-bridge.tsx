"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import {
  parseAnalyticsParams,
  sendAnalyticsEvent,
  trackPageView,
} from "@/lib/analytics";

const SCROLL_THRESHOLDS = [50, 90];

export function AnalyticsBridge() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fullPath = searchParams.size
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

    trackPageView(fullPath);
  }, [pathname, searchParams]);

  useEffect(() => {
    const firedThresholds = new Set<number>();

    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollableHeight = doc.scrollHeight - doc.clientHeight;

      if (scrollableHeight <= 0) {
        return;
      }

      const progress = Math.round((window.scrollY / scrollableHeight) * 100);

      for (const threshold of SCROLL_THRESHOLDS) {
        if (progress >= threshold && !firedThresholds.has(threshold)) {
          firedThresholds.add(threshold);
          sendAnalyticsEvent("scroll_depth", {
            threshold,
            page_path: pathname,
          });
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest<HTMLAnchorElement>("a[data-analytics-event]");

      if (!link) {
        return;
      }

      const eventName = link.dataset.analyticsEvent;

      if (!eventName) {
        return;
      }

      sendAnalyticsEvent(
        eventName,
        parseAnalyticsParams(link.dataset.analyticsPayload),
      );
    };

    document.addEventListener("click", handleClick, { capture: true });

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);

  return null;
}
