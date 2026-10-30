import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 text-slate-900 dark:text-white">
      <div className="site-backdrop" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-bg.jpg" alt="" />
      </div>

      <div className="surface-strong w-full max-w-md rounded-2xl p-8 text-center">
        <p className="text-6xl font-extrabold tracking-tight">404</p>
        <h1 className="mt-2 text-xl font-bold">Page not found</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-white/60">
          The page you were looking for doesn&apos;t exist or has moved.
        </p>

        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-600"
        >
          <IoArrowBack size={18} />
          Back home
        </Link>
      </div>
    </div>
  );
}
