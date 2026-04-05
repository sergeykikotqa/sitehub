import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Container } from "@/components/shared/container";
import { siteSettings } from "@/lib/site-config";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader navigationItems={siteSettings.navigation} />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <Container>{children}</Container>
      </main>
      <SiteFooter />
    </div>
  );
}
