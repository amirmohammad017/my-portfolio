import connectDb from "@/config/database";
import Project, { type ProjectData } from "@/models/project/Project";
import { toSerializable, type Serializable } from "@/lib/convert";

export type ProjectItem = Serializable<ProjectData> & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export async function getProjects(): Promise<ProjectItem[]> {
  await connectDb();
  const projects = await Project.find({}).sort({ date: -1 }).lean();
  return toSerializable(projects) as unknown as ProjectItem[];
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectItem | null> {
  await connectDb();
  const project = await Project.findOne({ slug }).lean();
  return project ? (toSerializable(project) as unknown as ProjectItem) : null;
}

export async function getProjectById(id: string): Promise<ProjectItem | null> {
  await connectDb();
  const project = await Project.findById(id).lean();
  return project ? (toSerializable(project) as unknown as ProjectItem) : null;
}
