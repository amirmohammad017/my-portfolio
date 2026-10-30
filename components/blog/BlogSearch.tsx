"use client";

import { useMemo, useState } from "react";
import type { BlogPost } from "@/lib/blog/queries";
import BlogCard from "./BlogCard";

export default function BlogSearch({ blogs }: { blogs: BlogPost[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return blogs;

    return blogs.filter((item) => {
      const title = item.title?.toLowerCase() ?? "";
      const excerpt = item.excerpt?.toLowerCase() ?? "";
      return title.includes(query) || excerpt.includes(query);
    });
  }, [blogs, search]);

  return (
    <>
      <div className="mx-auto w-full max-w-5xl backdrop-blur-sm">
        <input
          type="search"
          placeholder="Search..."
          value={search}
          aria-label="Search blog posts"
          className="w-full rounded-lg border border-slate-400 bg-transparent px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-600 dark:text-white dark:placeholder:text-white/40 dark:focus:border-slate-200"
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {filtered.length ? (
        <div className="mx-auto grid max-w-5xl grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-center gap-6">
          {filtered.map((item) => (
            <BlogCard key={item.slug} data={item} />
          ))}
        </div>
      ) : (
        <p className="mx-auto max-w-5xl text-center text-sm text-slate-500 dark:text-white/50">
          No posts match “{search}”.
        </p>
      )}
    </>
  );
}
