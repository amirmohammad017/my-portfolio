import connectDb from "@/config/database";
import Blog, { type BlogData } from "@/models/blog/Blog";
import { toSerializable, type Serializable } from "@/lib/convert";

export type BlogPost = Serializable<BlogData> & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export async function getBlogs(): Promise<BlogPost[]> {
  await connectDb();
  const blogs = await Blog.find({}).sort({ date: -1, createdAt: -1 }).lean();
  return toSerializable(blogs) as unknown as BlogPost[];
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  await connectDb();
  const blog = await Blog.findOne({ slug }).lean();
  return blog ? (toSerializable(blog) as unknown as BlogPost) : null;
}

export async function getBlogById(id: string): Promise<BlogPost | null> {
  await connectDb();
  const blog = await Blog.findById(id).lean();
  return blog ? (toSerializable(blog) as unknown as BlogPost) : null;
}
