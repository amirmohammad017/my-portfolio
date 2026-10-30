import PortfolioRoot from "@/components/layout/PortfolioRoot";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortfolioRoot>
      <div className="theme-transition min-h-screen">{children}</div>
    </PortfolioRoot>
  );
}
