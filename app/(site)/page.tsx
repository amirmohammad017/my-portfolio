import Link from "next/link";
import BlogCard from "@/components/blog/BlogCard";
import ProjectCard from "@/components/project/ProjectCard";
import { getBlogs } from "@/lib/blog/queries";
import { getProjects } from "@/lib/project/queries";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

const BUTTON_CLASS =
  "rounded-lg border border-blue-600 px-4 py-2 text-md font-bold text-blue-700 backdrop-blur-md transition hover:border-blue-700 hover:text-blue-800 dark:border-blue-400 dark:text-blue-400 dark:hover:border-blue-500 dark:hover:text-blue-500";

export default async function HomePage() {
  const [blogs, projects] = await Promise.all([getBlogs(), getProjects()]);

  const featuredProjects = [...projects]
    .filter((item) => item.featured)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const latestBlogs = blogs.slice(0, 3);

  return (
    <div className="mx-auto min-h-screen max-w-7xl space-y-20 px-2 py-6 md:px-6">
      <section className="surface rounded-lg px-6 py-10 text-center">
        <h1 className="mb-6 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
          {siteConfig.name}
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 dark:text-white/70 md:text-lg">
          Junior Front-End Developer passionate about building modern,
          responsive, and high-performance web applications using React and
          Tailwind CSS.
        </p>
      </section>

      <section id="projects">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-xl font-bold md:text-3xl">Featured Projects</h2>
          <Link className={BUTTON_CLASS} href="/projects">
            View All
          </Link>
        </div>

        {featuredProjects.length ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {featuredProjects.map((item) => (
              <ProjectCard key={item.slug} data={item} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500 dark:text-white/50">
            No featured projects yet.
          </p>
        )}
      </section>

      <section id="blogs">
        <div className="mb-10 flex items-start justify-between">
          <h2 className="text-xl font-bold md:text-3xl">Latest Blogs</h2>
          <Link className={BUTTON_CLASS} href="/blog">
            Read More
          </Link>
        </div>

        {latestBlogs.length ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestBlogs.map((item) => (
              <BlogCard key={item.slug} data={item} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500 dark:text-white/50">
            No posts published yet.
          </p>
        )}
      </section>
    </div>
  );
}
