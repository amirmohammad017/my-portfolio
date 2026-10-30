"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import connectDb from "@/config/database";
import Project from "@/models/project/Project";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { deleteImage, saveImage } from "@/lib/storage";
import { readProjectFields, type ProjectFormState } from "./projectForm";

export async function updateProjectAction(
  id: string,
  _prevState: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  await requireAdmin();

  const { values, image, fieldErrors, valid } = readProjectFields(formData);
  if (!valid) return { fieldErrors };

  await connectDb();
  const current = await Project.findById(id).lean();
  if (!current) return { error: "This project no longer exists." };

  let storedImage = current.image ?? null;
  let uploadedKey: string | null = null;

  try {
    if (image) {
      const uploaded = await saveImage(image, "projects");
      uploadedKey = uploaded.key;
      storedImage = uploaded;
    }

    await Project.findByIdAndUpdate(id, { ...values, image: storedImage });
  } catch (error) {
    console.error("updateProjectAction", error);
    if (uploadedKey) await deleteImage(uploadedKey);
    return { error: "Could not update the project. Please try again." };
  }

  if (uploadedKey && current.image?.key && current.image.key !== uploadedKey) {
    await deleteImage(current.image.key);
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin");

  redirect("/admin?saved=project-updated");
}
