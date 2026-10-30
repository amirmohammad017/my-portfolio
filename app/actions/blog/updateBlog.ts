"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import connectDb from "@/config/database";
import Blog from "@/models/blog/Blog";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { deleteImage, saveImage } from "@/lib/storage";
import { readBlogFields, type BlogFormState } from "./blogForm";

export async function updateBlogAction(
  id: string,
  _prevState: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> {
  await requireAdmin();

  const { values, image, fieldErrors, valid } = readBlogFields(formData);
  if (!valid) return { fieldErrors };

  await connectDb();
  const current = await Blog.findById(id).lean();
  if (!current) return { error: "This post no longer exists." };

  let storedImage = current.image ?? null;
  let uploadedKey: string | null = null;

  try {
    if (image) {
      const uploaded = await saveImage(image, "blogs");
      uploadedKey = uploaded.key;
      storedImage = uploaded;
    }

    await Blog.findByIdAndUpdate(id, {
      title: values.title,
      excerpt: values.excerpt,
      body: values.body,
      date: values.date,
      image: storedImage,
    });
  } catch (error) {
    console.error("updateBlogAction", error);
    if (uploadedKey) await deleteImage(uploadedKey);
    return { error: "Could not update the post. Please try again." };
  }

  if (uploadedKey && current.image?.key && current.image.key !== uploadedKey) {
    await deleteImage(current.image.key);
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${current.slug}`);
  revalidatePath("/admin");

  redirect("/admin?saved=updated");
}
