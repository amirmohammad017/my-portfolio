"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import type { BlogFormState } from "@/app/actions/blog/blogForm";
import type { BlogPost } from "@/lib/blog/queries";

type BlogFormProps = {
  action: (state: BlogFormState, formData: FormData) => Promise<BlogFormState>;
  blog?: BlogPost;
  submitLabel: string;
};

const fieldClass =
  "w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30 dark:focus:border-white/20";

const initialState: BlogFormState = {};

export function BlogForm({ action, blog, submitLabel }: BlogFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const [preview, setPreview] = useState<string | null>(null);

  const currentImage = preview ?? blog?.image?.url ?? null;
  const errors = state.fieldErrors ?? {};
  const dateDefault = (blog ? new Date(blog.date) : new Date())
    .toISOString()
    .slice(0, 10);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={blog?.title}
          aria-invalid={Boolean(errors.title)}
          className={fieldClass}
        />
        {errors.title ? (
          <p className="mt-1 text-xs text-red-500">{errors.title}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="excerpt" className="mb-1 block text-sm font-medium">
          Excerpt
        </label>
        <input
          id="excerpt"
          name="excerpt"
          defaultValue={blog?.excerpt}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="date" className="mb-1 block text-sm font-medium">
          Date
        </label>
        <input
          id="date"
          name="date"
          type="date"
          defaultValue={dateDefault}
          className={fieldClass}
        />
        {errors.date ? (
          <p className="mt-1 text-xs text-red-500">{errors.date}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="image" className="mb-1 block text-sm font-medium">
          Cover image
        </label>
        {currentImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={currentImage}
            alt="Cover preview"
            className="mb-3 max-h-56 w-full rounded-xl object-cover"
          />
        ) : null}
        <input
          id="image"
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
          onChange={(event) => {
            const file = event.target.files?.[0];
            setPreview(file ? URL.createObjectURL(file) : null);
          }}
          className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-700 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-600 dark:text-white/70"
        />
        {errors.image ? (
          <p className="mt-1 text-xs text-red-500">{errors.image}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="body" className="mb-1 block text-sm font-medium">
          Body (Markdown)
        </label>
        <textarea
          id="body"
          name="body"
          required
          rows={16}
          defaultValue={blog?.body}
          aria-invalid={Boolean(errors.body)}
          className={`${fieldClass} font-mono text-sm`}
        />
        {errors.body ? (
          <p className="mt-1 text-xs text-red-500">{errors.body}</p>
        ) : null}
      </div>

      {state.error ? (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {state.error}
        </p>
      ) : null}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Saving…" : submitLabel}
        </button>
        <Link
          href="/admin"
          className="rounded-lg px-4 py-3 text-sm text-slate-600 transition hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
