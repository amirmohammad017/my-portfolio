import {
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTelegramPlane,
} from "react-icons/fa";
import SocialLink from "@/components/ui/SocialLink";
import { socialLinks } from "@/lib/site";

const icons = {
  github: FaGithub,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  telegram: FaTelegramPlane,
  email: FaEnvelope,
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-black/5 bg-white/70 px-6 py-5 text-slate-900 backdrop-blur-md dark:border-white/10 dark:bg-black/90 dark:text-white">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm tracking-wide text-slate-500 dark:text-white/40">
          © {year} All rights reserved.
        </p>

        <nav className="flex items-center gap-1">
          {socialLinks.map((link) => (
            <SocialLink
              key={link.label}
              href={link.href}
              icon={icons[link.icon]}
              label={link.label}
              size={40}
              iconSize={18}
              hoverClass={link.hoverClass}
            />
          ))}
        </nav>
      </div>
    </footer>
  );
}
