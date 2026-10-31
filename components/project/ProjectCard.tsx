import Image from "next/image";
import Link from "next/link";
import type { ProjectItem } from "@/lib/project/queries";

export default function ProjectCard({ data }: { data: ProjectItem }) {
  const {
    title,
    description,
    date,
    view_demo,
    source_code,
    image,
    slug,
    kind,
    internal_path,
    technologies,
  } = data;
  const isEmbedded = kind === "embedded";
  const internalPath = internal_path || `/projects/${slug}`;

  return (
    <article className="surface flex h-full w-full flex-col rounded-lg p-4 transition-transform! duration-300 ease-out hover:scale-[1.01]">
      <Link
        href={isEmbedded ? internalPath : view_demo || "#"}
        target={isEmbedded ? undefined : "_blank"}
        rel={isEmbedded ? undefined : "noopener noreferrer"}
        className="mb-4 flex h-60 w-full shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-200/60 dark:bg-white/5"
      >
        <Image
          src={image?.url || "/images/no-image.png"}
          alt={title}
          width={800}
          height={480}
          className="h-full w-full rounded-lg object-cover"
        />
      </Link>

      <h3 className="mb-4 truncate text-center text-xl font-bold capitalize">
        {title}
      </h3>

      {/* ناحیه‌ی ثابت برای توضیحات */}
      <p className="line-clamp-3 h-12 text-xs leading-4 text-slate-600 dark:text-white/80">
        {description}
      </p>

      {/* ناحیه‌ی ثابت برای بج‌ها؛ بیش از دو ردیف پنهان می‌شود */}
      <div className="my-3 h-14 overflow-hidden">
        {technologies?.length ? (
          <ul className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-black/10 px-2 py-0.5 text-[11px] leading-4 text-slate-600 dark:border-white/15 dark:text-white/70"
              >
                {tech}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="mt-auto">
        <span className="mb-2 block text-right text-xs text-slate-500 dark:text-white/50">
          {new Date(date).toDateString()}
        </span>

        <div className="flex justify-center gap-4">
          {isEmbedded ? (
            <Link
              href={internalPath}
              className="w-36 rounded-xl bg-blue-700 p-3 text-center text-sm font-bold text-white transition hover:bg-blue-600"
            >
              Demo
            </Link>
          ) : (
            <a
              className="w-36 rounded-xl bg-blue-700 p-3 text-center text-sm font-bold text-white transition hover:bg-blue-600"
              href={view_demo}
              target="_blank"
              rel="noopener noreferrer"
            >
              Demo
            </a>
          )}

          {source_code ? (
            <a
              className="w-36 rounded-xl bg-green-600 p-3 text-center text-sm font-bold text-white transition hover:bg-green-500"
              href={source_code}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source Code
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
