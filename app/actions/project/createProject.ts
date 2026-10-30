"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import connectDb from "@/config/database";
import Project from "@/models/project/Project";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { uniqueSlug } from "@/lib/slug";
import { deleteImage, saveImage } from "@/lib/storage";
import { readProjectFields, type ProjectFormState } from "./projectForm";

export async function createProjectAction(
  _prevState: ProjectFormState,
  formData: FormData,
): Promise<ProjectFormState> {
  await requireAdmin();

  const { values, image, fieldErrors, valid } = readProjectFields(formData);
  if (!valid) return { fieldErrors };

  let storedImage: { url: string; key: string } | null = null;

  try {
    if (image) storedImage = await saveImage(image, "projects");

    await connectDb();
    const slug = await uniqueSlug(values.title, async (candidate) =>
      Boolean(await Project.exists({ slug: candidate })),
    );

    await Project.create({ ...values, slug, image: storedImage });
  } catch (error) {
    console.error("createProjectAction", error);
    if (storedImage) await deleteImage(storedImage.key);
    return { error: "Could not save the project. Please try again." };
  }

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin");

  redirect("/admin?saved=project-created");
}
