"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import type { ProjectFormState } from "@/app/actions/project/projectForm";
import type { ProjectItem } from "@/lib/project/queries";

type ProjectFormProps = {
  action: (
    state: ProjectFormState,
    formData: FormData,
  ) => Promise<ProjectFormState>;
  project?: ProjectItem;
  submitLabel: string;
};

const fieldClass =
  "w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30 dark:focus:border-white/20";

const initialState: ProjectFormState = {};

function Field({
  label,
  name,
  error,
  hint,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      {children}
      {hint ? (
        <p className="mt-1 text-xs text-slate-500 dark:text-white/40">{hint}</p>
      ) : null}
      {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
    </div>
  );
}

export function ProjectForm({ action, project, submitLabel }: ProjectFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const [preview, setPreview] = useState<string | null>(null);

  const currentImage = preview ?? project?.image?.url ?? null;
  const errors = state.fieldErrors ?? {};
  const dateDefault = (project ? new Date(project.date) : new Date())
    .toISOString()
    .slice(0, 10);

  return (
    <form action={formAction} className="space-y-5">
      <Field label="Title" name="title" error={errors.title}>
        <input
          id="title"
          name="title"
          required
          defaultValue={project?.title}
          className={fieldClass}
        />
      </Field>

      <Field label="Description" name="description" error={errors.description}>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={project?.description}
          className={fieldClass}
        />
      </Field>

      <Field label="Demo link" name="view_demo" error={errors.view_demo}>
        <input
          id="view_demo"
          name="view_demo"
          type="url"
          placeholder="https://..."
          defaultValue={project?.view_demo}
          className={fieldClass}
        />
      </Field>

      <Field
        label="Internal path"
        name="internal_path"
        error={errors.internal_path}
        hint="Only for projects that live inside this site, e.g. /projects/property-pulse. The Demo button opens it instead of the demo link."
      >
        <input
          id="internal_path"
          name="internal_path"
          placeholder="/projects/my-project"
          defaultValue={project?.internal_path}
          className={fieldClass}
        />
      </Field>

      <Field label="GitHub repository" name="source_code" error={errors.source_code}>
        <input
          id="source_code"
          name="source_code"
          type="url"
          placeholder="https://github.com/..."
          defaultValue={project?.source_code}
          className={fieldClass}
        />
      </Field>

      <Field
        label="Technologies"
        name="technologies"
        hint="Comma separated, e.g. Next.js, MongoDB, Tailwind"
      >
        <input
          id="technologies"
          name="technologies"
          defaultValue={project?.technologies?.join(", ")}
          className={fieldClass}
        />
      </Field>

      <Field label="Date" name="date" error={errors.date}>
        <input
          id="date"
          name="date"
          type="date"
          defaultValue={dateDefault}
          className={fieldClass}
        />
      </Field>

      <label className="flex items-center gap-3 text-sm font-medium">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={project?.featured}
          className="h-4 w-4 accent-blue-600"
        />
        Featured (shown on the home page)
      </label>

      <Field label="Cover image" name="image" error={errors.image}>
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
      </Field>

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
          {pending ? "Saving..." : submitLabel}
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
