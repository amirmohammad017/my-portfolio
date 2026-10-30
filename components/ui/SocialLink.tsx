import type { IconType } from "react-icons";

export default function SocialLink({
  href,
  icon: Icon,
  label,
  size = 40,
  iconSize = 18,
  hoverClass = "hover:text-blue-600 dark:hover:text-white",
}: {
  href: string;
  icon: IconType;
  label: string;
  size?: number;
  iconSize?: number;
  hoverClass?: string;
}) {
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={isExternal ? `${label} (opens in new tab)` : label}
      className={`flex items-center justify-center rounded-full border border-black/10 bg-white/60 text-slate-500 transition duration-300 hover:-translate-y-1 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white/60 dark:hover:bg-white/10 ${hoverClass}`}
      style={{ width: size, height: size }}
    >
      <Icon size={iconSize} />
    </a>
  );
}
