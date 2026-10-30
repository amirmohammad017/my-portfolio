import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import PortfolioRoot from "@/components/layout/PortfolioRoot";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortfolioRoot>
      <SiteShell>{children}</SiteShell>
    </PortfolioRoot>
  );
}
