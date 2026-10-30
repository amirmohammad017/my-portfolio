import { LoginForm } from "@/components/admin/LoginForm";

export const metadata = { title: "Admin sign in" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      <div className="site-backdrop" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-bg.jpg" alt="" />
      </div>

      <div className="surface-strong w-full max-w-sm rounded-2xl p-8 text-slate-900 dark:text-white">
        <h1 className="mb-1 text-2xl font-bold">Admin</h1>
        <p className="mb-6 text-sm text-slate-500 dark:text-white/50">
          Sign in to manage blog posts.
        </p>
        <LoginForm next={next?.startsWith("/admin") ? next : "/admin"} />
      </div>
    </div>
  );
}
