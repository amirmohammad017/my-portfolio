import { notFound } from "next/navigation";
import { updateBlogAction } from "@/app/actions/blog/updateBlog";
import { BlogForm } from "@/components/admin/BlogForm";
import { getBlogById } from "@/lib/blog/queries";

export const metadata = { title: "Edit post" };
export const dynamic = "force-dynamic";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const blog = /^[a-f\d]{24}$/i.test(id) ? await getBlogById(id) : null;
  if (!blog) notFound();

  return (
    <div className="mx-auto w-full max-w-2xl p-6 text-slate-900 dark:text-white">
      <h1 className="mb-6 text-2xl font-bold">Edit post</h1>
      <BlogForm
        action={updateBlogAction.bind(null, id)}
        blog={blog}
        submitLabel="Save changes"
      />
    </div>
  );
}
