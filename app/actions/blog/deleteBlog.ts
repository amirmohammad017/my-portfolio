"use server";

import { revalidatePath } from "next/cache";
import connectDb from "@/config/database";
import Blog from "@/models/blog/Blog";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { deleteImage } from "@/lib/storage";

export async function deleteBlogAction(id: string) {
  await requireAdmin();

  await connectDb();
  const blog = await Blog.findByIdAndDelete(id).lean();

  if (blog) {
    if (blog.image?.key) await deleteImage(blog.image.key);
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${blog.slug}`);
    revalidatePath("/admin");
  }
}
