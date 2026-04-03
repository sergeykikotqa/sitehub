export type AnalyticsParams = Record<
  string,
  string | number | boolean | null | undefined
>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function sendAnalyticsEvent(
  name: string,
  params: AnalyticsParams = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = {
    event: name,
    ...params,
  };

  window.dataLayer?.push(payload);
  window.gtag?.("event", name, params);
  window.dispatchEvent(
    new CustomEvent("sitehub:analytics", {
      detail: payload,
    }),
  );
}

export function trackPageView(pagePath: string) {
  if (typeof window === "undefined") {
    return;
  }

  sendAnalyticsEvent("page_view", {
    page_path: pagePath,
    page_location: window.location.href,
    page_title: document.title,
  });
}
