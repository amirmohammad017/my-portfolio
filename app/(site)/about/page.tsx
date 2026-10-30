import type { Metadata } from "next";
import {
  FaCss3Alt,
  FaGitAlt,
  FaHtml5,
  FaReact,
  FaSass,
} from "react-icons/fa";
import { DiResponsive } from "react-icons/di";
import { IoLogoJavascript } from "react-icons/io5";
import { SiTailwindcss } from "react-icons/si";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

const skills = [
  { name: "HTML", icon: FaHtml5, color: "#E34F26" },
  { name: "CSS", icon: FaCss3Alt, color: "#1572B6" },
  { name: "SCSS", icon: FaSass, color: "#CC6699" },
  { name: "JavaScript", icon: IoLogoJavascript, color: "#F7DF1E" },
  { name: "React", icon: FaReact, color: "#61DAFB" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Git", icon: FaGitAlt, color: "#F05032" },
  { name: "Responsive Design", icon: DiResponsive, color: "#4CAF50" },
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

          <p className="text-lg leading-8 text-slate-700 dark:text-white/85">
            My main focus is working with{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              HTML, CSS/SCSS, JavaScript, and React
            </span>
            . I enjoy building responsive websites and constantly improving my
            development skills.
          </p>
        </div>

        <div className="surface-strong rounded-2xl p-8">
          <h2 className="mb-8 text-2xl font-semibold">Skills</h2>

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
      </div>
    </section>
  );
}
