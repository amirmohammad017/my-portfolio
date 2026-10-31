import type { Metadata } from "next";
import {
  FaEnvelope,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTelegramPlane,
} from "react-icons/fa";
import SocialLink from "@/components/ui/SocialLink";
import { socialLinks } from "@/lib/site";
import ContactForm from "@/components/contact/contactForm";

export const metadata: Metadata = { title: "Contact" };

const icons = {
  github: FaGithub,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  telegram: FaTelegramPlane,
  email: FaEnvelope,
};

const fieldClass =
  "w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30 dark:focus:border-white/20 dark:focus:bg-white/10";

export default function ContactPage() {
  return (
    <section className="surface-strong rounded-lg px-6 py-4">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">Contact</h1>

        <p className="mb-6 text-slate-600 dark:text-gray-300">
          If you&apos;d like to collaborate or just say hi, feel free to reach
          out:
        </p>

        <div className="mb-6 flex flex-wrap justify-center gap-4">
          {socialLinks.map((link) => (
            <SocialLink
              key={link.label}
              href={link.href}
              icon={icons[link.icon]}
              label={link.label}
              size={50}
              iconSize={24}
              hoverClass={link.hoverClass}
            />
          ))}
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
