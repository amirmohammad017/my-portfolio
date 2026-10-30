import { createBlogAction } from "@/app/actions/blog/createBlog";
import { BlogForm } from "@/components/admin/BlogForm";

export const metadata = { title: "New post" };

export default function NewBlogPage() {
  return (
    <div className="mx-auto w-full max-w-2xl p-6 text-slate-900 dark:text-white">
      <h1 className="mb-6 text-2xl font-bold">New post</h1>
      <BlogForm action={createBlogAction} submitLabel="Publish" />
    </div>
  );
}
