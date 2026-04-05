export type AnalyticsParams = Record<
  string,
  string | number | boolean | null | undefined
>;

export type AnalyticsSurface =
  | "hero"
  | "home"
  | "portfolio"
  | "detail"
  | "generic";

export type AnalyticsScenario = "system" | "editorial" | "generic";

export type AnalyticsTier = "primary" | "secondary";

function isAnalyticsValue(
  value: unknown,
): value is AnalyticsParams[keyof AnalyticsParams] {
  return (
    value === null ||
    value === undefined ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  );
}

export function normalizeAnalyticsParams(
  params: AnalyticsParams = {},
): AnalyticsParams {
  return Object.fromEntries(
    Object.entries(params)
      .filter(([, value]) => isAnalyticsValue(value) && value !== undefined)
      .sort(([left], [right]) => left.localeCompare(right)),
  );
}

export function serializeAnalyticsParams(
  params: AnalyticsParams = {},
): string {
  const normalized = normalizeAnalyticsParams(params);

  return Object.keys(normalized).length
    ? JSON.stringify(normalized)
    : "";
}

export function parseAnalyticsParams(payload?: string | null): AnalyticsParams {
  if (!payload) {
    return {};
  }

  try {
    const parsed = JSON.parse(payload) as Record<string, unknown>;

    if (!parsed || Array.isArray(parsed) || typeof parsed !== "object") {
      return {};
    }

    return Object.fromEntries(
      Object.entries(parsed)
        .filter(([, value]) => isAnalyticsValue(value) && value !== undefined)
        .sort(([left], [right]) => left.localeCompare(right)),
    ) as AnalyticsParams;
  } catch {
    return {};
  }
}

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
    ...normalizeAnalyticsParams(params),
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
    route: pagePath,
    page_path: pagePath,
    page_location: window.location.href,
    page_title: document.title,
  });
}
