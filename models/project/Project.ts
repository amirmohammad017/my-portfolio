import {
  Schema,
  model,
  models,
  type InferSchemaType,
  type Model,
} from "mongoose";

const ProjectImageSchema = new Schema(
  {
    url: { type: String, required: true },
    key: { type: String },
  },
  { _id: false },
);

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    image: { type: ProjectImageSchema, default: null },
    view_demo: { type: String, default: "" },
    source_code: { type: String, default: "" },
    date: { type: Date, default: Date.now, index: true },
    featured: { type: Boolean, default: false },
    technologies: { type: [String], default: [] },
    // "external": links open in a new tab. "embedded": a route inside this site (internal_path).
    kind: {
      type: String,
      enum: ["external", "embedded"],
      default: "external",
    },
    internal_path: { type: String, default: "" },
  },
  { timestamps: true, collection: "projects" },
);

export type ProjectData = InferSchemaType<typeof ProjectSchema>;
export type ProjectDocument = ProjectData & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

const Project =
  (models.Project as Model<ProjectData> | undefined) ??
  model<ProjectData>("Project", ProjectSchema);

export default Project;
