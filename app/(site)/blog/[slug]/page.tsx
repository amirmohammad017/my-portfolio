import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { IoArrowBack } from "react-icons/io5";
import { getBlogBySlug } from "@/lib/blog/queries";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  return blog
    ? { title: blog.title, description: blog.excerpt }
    : { title: "Post not found" };
}

export default async function BlogDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) notFound();

  return (
    <article className="surface-strong mx-auto mb-4 flex w-full max-w-2xl flex-col rounded-lg p-4">
      <h1 className="mb-6 text-center text-3xl font-extrabold">{blog.title}</h1>

      <span className="mb-2 text-sm text-slate-500 dark:text-white/60">
        {new Date(blog.date).toDateString()}
      </span>

      <div className="mb-4 overflow-hidden rounded-lg bg-slate-200/60 dark:bg-white/5">
        <Image
          className="h-auto w-full object-cover"
          src={blog.image?.url || "/images/no-image.png"}
          alt={blog.title}
          width={1200}
          height={720}
          priority
        />
      </div>

      <div className="prose prose-slate mb-6 max-w-none dark:prose-invert">
        <ReactMarkdown>{blog.body}</ReactMarkdown>
      </div>

      <Link
        href="/blog"
        className="flex w-34 items-center justify-between rounded-xl bg-blue-700 px-2 py-3 text-sm font-bold text-white capitalize"
      >
        <IoArrowBack size={20} />
        back to blogs
      </Link>
    </article>
  );
}
