import { createProjectAction } from "@/app/actions/project/createProject";
import { ProjectForm } from "@/components/admin/ProjectForm";

export const metadata = { title: "New project" };

export default function NewProjectPage() {
  return (
    <div className="mx-auto w-full max-w-2xl p-6 text-slate-900 dark:text-white">
      <h1 className="mb-6 text-2xl font-bold">New project</h1>
      <ProjectForm action={createProjectAction} submitLabel="Publish" />
    </div>
  );
}
