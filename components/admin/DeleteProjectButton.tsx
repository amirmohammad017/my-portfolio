"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteProjectAction } from "@/app/actions/project/deleteProject";

export function DeleteProjectButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleClick() {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;

    setError(null);
    startTransition(async () => {
      try {
        await deleteProjectAction(id);
        router.push("/admin?deleted=project");
        router.refresh();
      } catch {
        setError("Could not delete the project.");
      }
    });
  }

  return (
    <span className="flex items-center gap-2">
      {error ? (
        <span className="text-xs text-red-500" role="alert">
          {error}
        </span>
      ) : null}
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        className="rounded-lg border border-red-500/40 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-500/10 disabled:opacity-50 dark:text-red-400"
      >
        {pending ? "Deleting..." : "Delete"}
      </button>
    </span>
  );
}
