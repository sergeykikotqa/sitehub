import Link from "next/link";

import {
  type AnalyticsParams,
  serializeAnalyticsParams,
} from "@/lib/analytics";

type TrackedLinkProps = Omit<React.ComponentProps<typeof Link>, "onClick"> & {
  eventName?: string;
  eventParams?: AnalyticsParams;
};

export function TrackedLink({
  eventName,
  eventParams,
  ...props
}: TrackedLinkProps) {
  const analyticsPayload = eventName
    ? serializeAnalyticsParams(eventParams)
    : undefined;

  return (
    <Link
      {...props}
      data-analytics-event={eventName}
      data-analytics-payload={analyticsPayload}
    />
  );
}
