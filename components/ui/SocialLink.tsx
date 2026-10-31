import type { IconType } from "react-icons";

export default function SocialLink({
  href,
  icon: Icon,
  label,
  size = 40,
  iconSize = 18,
  hoverClass = "group-hover:text-blue-600 dark:group-hover:text-white",
}: {
  href: string;
  icon: IconType;
  label: string;
  size?: number;
  iconSize?: number;
  hoverClass?: string;
}) {
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);
  const hitArea = size + 16;

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      aria-label={isExternal ? `${label} (opens in new tab)` : label}
      className="group flex items-center justify-center"
      style={{ width: hitArea, height: hitArea }}
    >
      <span
        className={`flex items-center justify-center rounded-full border border-black/10 bg-white/60 text-slate-500 transition-all! 
          duration-300 ease-out group-hover:-translate-y-1 group-hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white/60 dark:group-hover:bg-white/10 ${hoverClass}`}
        style={{ width: size, height: size }}
      >
        <Icon size={iconSize} />
      </span>
    </a>
  );
}
