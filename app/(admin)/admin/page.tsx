import Link from "next/link";
import { redirect } from "next/navigation";
import { logoutAction } from "@/app/actions/auth/logout";
import { DeleteBlogButton } from "@/components/admin/DeleteBlogButton";
import { DeleteProjectButton } from "@/components/admin/DeleteProjectButton";
import { UnreadMessages } from "@/components/admin/UnreadMessages";
import { getAdminSession } from "@/lib/auth/session";
import { getBlogs } from "@/lib/blog/queries";
import { getProjects } from "@/lib/project/queries";
import { getMessages } from "@/lib/contact/queries";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; deleted?: string }>;
}) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  const [{ saved, deleted }, blogs, projects, messages] = await Promise.all([
    searchParams,
    getBlogs(),
    getProjects(),
    getMessages(50),
  ]);

  return (
    <div className="mx-auto w-full max-w-4xl p-6 text-slate-900 dark:text-white">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-white/50">
            Signed in as {session.username}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-lg border border-black/10 px-3 py-2 text-sm font-medium transition hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
          >
            View site
          </Link>
          <Link
            href="/admin/blogs/new"
            className="rounded-lg bg-blue-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            New post
          </Link>
          <Link
            href="/admin/projects/new"
            className="rounded-lg bg-blue-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            New project
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-lg border border-red-500/40 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-500/10 dark:text-red-400"
            >
              Sign out
            </button>
          </form>
        </div>
      </header>

      {saved ? (
        <p className="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-400">
          {saved.startsWith("project") ? "Project" : "Post"}{" "}
          {saved.endsWith("updated") ? "updated" : "published"}.
        </p>
      ) : null}

      {deleted ? (
        <p className="mb-4 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-700 dark:text-green-400">
          {deleted === "project" ? "Project" : "Post"} deleted.
        </p>
      ) : null}

      <UnreadMessages messages={messages} />

      <h2 className="mb-3 text-lg font-semibold">Blog posts</h2>
      {blogs.length ? (
        <ul className="space-y-3">
          {blogs.map((blog) => (
            <li
              key={blog._id}
              className="surface flex flex-wrap items-center justify-between gap-3 rounded-xl px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate font-semibold">{blog.title}</p>
                <p className="text-xs text-slate-500 dark:text-white/50">
                  {new Date(blog.date).toDateString()} · /blog/{blog.slug}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/blog/${blog.slug}`}
                  className="rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10"
                >
                  Preview
                </Link>
                <Link
                  href={`/admin/blogs/${blog._id}/edit`}
                  className="rounded-lg border border-black/10 px-3 py-2 text-sm font-medium transition hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                >
                  Edit
                </Link>
                <DeleteBlogButton id={blog._id} title={blog.title} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="surface rounded-xl px-4 py-8 text-center text-sm text-slate-500 dark:text-white/50">
          No posts yet. Create the first one.
        </p>
      )}

      <h2 className="mt-10 mb-3 text-lg font-semibold">Projects</h2>
      {projects.length ? (
        <ul className="space-y-3">
          {projects.map((project) => (
            <li
              key={project._id}
              className="surface flex flex-wrap items-center justify-between gap-3 rounded-xl px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate font-semibold">
                  {project.title}
                  {project.featured ? " ★" : ""}
                </p>
                <p className="text-xs text-slate-500 dark:text-white/50">
                  {project.internal_path || project.view_demo || "no demo link"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/projects/${project._id}/edit`}
                  className="rounded-lg border border-black/10 px-3 py-2 text-sm font-medium transition hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
                >
                  Edit
                </Link>
                <DeleteProjectButton id={project._id} title={project.title} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="surface rounded-xl px-4 py-8 text-center text-sm text-slate-500 dark:text-white/50">
          No projects yet.
        </p>
      )}
    </div>
  );
}
