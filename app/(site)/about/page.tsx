import type { Metadata } from "next";
import {
  FaCube,
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaNodeJs,
  FaReact,
  FaSass,
} from "react-icons/fa";

import { DiResponsive } from "react-icons/di";
import { IoLogoJavascript } from "react-icons/io5";
import {
  SiMongodb,
  SiNextdotjs,
  SiReactrouter,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

const skillGroups = [
  {
    title: "Core",
    skills: [
      { name: "HTML", icon: FaHtml5, color: "#E34F26" },
      { name: "CSS", icon: FaCss3Alt, color: "#1572B6" },
      { name: "SCSS", icon: FaSass, color: "#CC6699" },
      { name: "JavaScript", icon: IoLogoJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "React", icon: FaReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#808080" },
      { name: "TanStack Query", icon: FaCube, color: "#FF4154" },
      { name: "React Router", icon: SiReactrouter, color: "#CA4245" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    title: "Backend & Tools",
    skills: [
      { name: "Node.js", icon: FaNodeJs, color: "#339933" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Vite", icon: SiVite, color: "#646CFF" },
      { name: "Git", icon: FaGitAlt, color: "#F05032" },
      { name: "GitHub", icon: FaGithub, color: "#808080" },
      { name: "Responsive Design", icon: DiResponsive, color: "#4CAF50" },
    ],
  },
];

export default function AboutPage() {
  return (
    <section className="flex min-h-screen items-center justify-center py-10">
      <div className="max-w-4xl text-center">
        <div className="surface mb-6 rounded-2xl px-6 py-8">
          <h1 className="mb-8 text-4xl font-bold">About Me</h1>

          <p className="mb-6 text-lg leading-8 text-slate-700 dark:text-white/85">
            Hello! I&apos;m{" "}
            <strong className="font-semibold text-slate-900 dark:text-white">
              {siteConfig.name}
            </strong>
            , a junior front-end developer passionate about creating clean,
            modern, and user-friendly web interfaces.
          </p>

          <p className="mb-6 text-lg leading-8 text-slate-700 dark:text-white/85">
            My main focus is working with{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              HTML, CSS/SCSS, JavaScript, TypeScript, and React
            </span>
            . I enjoy building responsive websites and constantly improving my
            development skills.
          </p>

          <p className="text-lg leading-8 text-slate-700 dark:text-white/85">
            I also build full-stack projects with{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              Next.js, Node.js, and MongoDB
            </span>
            , including authentication, image uploads, and deployment.
          </p>
        </div>

        <div className="surface-strong rounded-2xl p-8">
          <h2 className="mb-8 text-2xl font-semibold">Skills</h2>

          <div className="space-y-8">
            {skillGroups.map(({ title, skills }) => (
              <div key={title}>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-white/60">
                  {title}
                </h3>

                <div className="flex flex-wrap justify-center gap-5">
                  {skills.map(({ name, icon: Icon, color }) => (
                    <div
                      key={name}
                      className="group flex items-center gap-3 rounded-xl border border-black/10 bg-slate-100/70 px-5 py-3 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-slate-200/80 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10"
                    >
                      <Icon
                        className="text-2xl transition-transform group-hover:rotate-12"
                        style={{ color }}
                      />
                      <span className="text-sm font-medium">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
