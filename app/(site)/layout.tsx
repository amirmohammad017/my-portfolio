import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import PortfolioRoot from "@/components/layout/PortfolioRoot";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://amirmohammad-dev.ir"),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    siteName: siteConfig.shortName,
    title: siteConfig.title,
    description: siteConfig.description,
    locale: "en_US",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
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
