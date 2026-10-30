import type { Metadata } from "next";
import BlogSearch from "@/components/blog/BlogSearch";
import { getBlogs } from "@/lib/blog/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Blog" };

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="space-y-8 px-4">
      <BlogSearch blogs={blogs} />
    </div>
  );
}
