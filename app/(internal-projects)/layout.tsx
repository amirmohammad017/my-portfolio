import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function InternalProjectsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <Link
        href="/projects"
        className="fixed left-4 top-4 z-50 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-md transition hover:bg-black/55"
      >
        <MdArrowBack className="h-4 w-4" />
        Back to projects
      </Link>

      {children}
    </div>
  );
}
