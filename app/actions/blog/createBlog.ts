"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import connectDb from "@/config/database";
import Blog from "@/models/blog/Blog";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { uniqueSlug } from "@/lib/slug";
import { saveImage } from "@/lib/storage";
import { readBlogFields, type BlogFormState } from "./blogForm";

export async function createBlogAction(
  _prevState: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> {
  await requireAdmin();

  const { values, image, fieldErrors, valid } = readBlogFields(formData);
  if (!valid) return { fieldErrors };

  let storedImage: { url: string; key: string } | null = null;

  try {
    if (image) {
      storedImage = await saveImage(image, "blogs");
    }

    await connectDb();
    const slug = await uniqueSlug(values.title, async (candidate) =>
      Boolean(await Blog.exists({ slug: candidate })),
    );

    await Blog.create({
      title: values.title,
      slug,
      excerpt: values.excerpt,
      body: values.body,
      date: values.date,
      image: storedImage,
    });
  } catch (error) {
    console.error("createBlogAction", error);
    if (storedImage) {
      const { deleteImage } = await import("@/lib/storage");
      await deleteImage(storedImage.key);
    }
    return { error: "Could not save the post. Please try again." };
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/admin");

  redirect("/admin?saved=created");
}
