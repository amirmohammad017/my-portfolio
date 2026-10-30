import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog/queries";

export default function BlogCard({ data }: { data: BlogPost }) {
  const { slug, title, excerpt, date, image } = data;

  return (
    <article className="surface mb-4 flex h-full w-full flex-col rounded-lg p-4">
      <div className="mb-4 flex h-60 w-full items-center justify-center overflow-hidden rounded-xl bg-slate-200/60 dark:bg-white/5">
        <Image
          src={image?.url || "/images/no-image.png"}
          alt={title}
          width={800}
          height={480}
          className="h-full w-full object-cover"
          unoptimized={image?.url?.startsWith("/media/")}
        />
      </div>

      <div className="flex grow flex-col">
        <h3 className="mb-2 text-center text-xl font-bold capitalize md:min-h-22">
          {title}
        </h3>
        <p className="line-clamp-4 grow text-xs text-slate-600 dark:text-white/80">
          {excerpt}
        </p>
        <span className="mb-2 block text-right text-xs text-slate-500 dark:text-white/50">
          {new Date(date).toDateString()}
        </span>
        <Link
          href={`/blog/${slug}`}
          className="flex w-34 items-center justify-between rounded-xl bg-blue-700 px-4 py-3 text-sm font-bold text-white capitalize transition hover:bg-blue-600"
        >
          read more<span aria-hidden>➞</span>
        </Link>
      </div>
    </article>
  );
}
