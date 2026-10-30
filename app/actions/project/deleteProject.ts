"use server";

import { revalidatePath } from "next/cache";
import connectDb from "@/config/database";
import Project from "@/models/project/Project";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { deleteImage } from "@/lib/storage";

export async function deleteProjectAction(id: string) {
  await requireAdmin();

  await connectDb();
  const project = await Project.findByIdAndDelete(id).lean();

  if (project) {
    if (project.image?.key) await deleteImage(project.image.key);
    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/admin");
  }
}
