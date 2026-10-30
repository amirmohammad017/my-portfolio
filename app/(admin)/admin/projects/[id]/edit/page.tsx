import { notFound } from "next/navigation";
import { updateProjectAction } from "@/app/actions/project/updateProject";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { getProjectById } from "@/lib/project/queries";

export const metadata = { title: "Edit project" };
export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = /^[a-f\d]{24}$/i.test(id) ? await getProjectById(id) : null;
  if (!project) notFound();

  return (
    <div className="mx-auto w-full max-w-2xl p-6 text-slate-900 dark:text-white">
      <h1 className="mb-6 text-2xl font-bold">Edit project</h1>
      <ProjectForm
        action={updateProjectAction.bind(null, id)}
        project={project}
        submitLabel="Save changes"
      />
    </div>
  );
}
