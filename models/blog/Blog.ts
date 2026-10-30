import {
  Schema,
  model,
  models,
  type InferSchemaType,
  type Model,
} from "mongoose";

const BlogImageSchema = new Schema(
  {
    url: { type: String, required: true },
    key: { type: String },
    width: { type: Number },
    height: { type: Number },
  },
  { _id: false },
);

const BlogSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, default: "" },
    body: { type: String, required: true },
    date: { type: Date, default: Date.now, index: true },
    image: { type: BlogImageSchema, default: null },
  },
  { timestamps: true, collection: "blogs" },
);

export type BlogData = InferSchemaType<typeof BlogSchema>;
export type BlogDocument = BlogData & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

const Blog =
  (models.Blog as Model<BlogData> | undefined) ??
  model<BlogData>("Blog", BlogSchema);

export default Blog;
