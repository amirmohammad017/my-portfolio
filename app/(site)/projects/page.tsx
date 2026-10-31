import type { Metadata } from "next";
import ProjectCard from "@/components/project/ProjectCard";
import { getProjects } from "@/lib/project/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Projects" };

export default async function ProjectPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-stretch justify-center gap-6 px-4">
      {projects.map((item) => (
        <ProjectCard key={item.slug} data={item} />
      ))}
    </div>
  );
}
