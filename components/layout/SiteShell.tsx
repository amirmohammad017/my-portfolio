import type { ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import Footer from "./Footer";

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="theme-transition flex min-h-screen flex-col">
      <div className="site-backdrop" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-bg.jpg" alt="" />
      </div>

      <SiteHeader />

      <main className="relative grow p-4 pt-24 text-slate-900 dark:text-white">
        <div className="mx-auto w-full max-w-5xl">{children}</div>
      </main>

      <Footer />
    </div>
  );
}
