"use client";

import Link from "next/link";

import { type AnalyticsParams, sendAnalyticsEvent } from "@/lib/analytics";

type TrackedLinkProps = React.ComponentProps<typeof Link> & {
  eventName?: string;
  eventParams?: AnalyticsParams;
};

export function TrackedLink({
  eventName,
  eventParams,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        if (eventName) {
          sendAnalyticsEvent(eventName, eventParams);
        }

        onClick?.(event);
      }}
    />
  );
}
