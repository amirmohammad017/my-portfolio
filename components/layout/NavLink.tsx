"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

type NavLinkProps = ComponentProps<typeof Link> & {
  activeClassName?: string;
  exact?: boolean;
};

export function NavLink({
  href,
  className = "",
  activeClassName = "text-blue-600 dark:text-blue-500",
  exact = true,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();
  const target = href.toString();
  const isActive = exact
    ? pathname === target
    : pathname === target || pathname.startsWith(`${target}/`);

  return (
    <Link
      href={href}
      className={`${className} ${
        isActive
          ? activeClassName
          : "text-slate-700 transition hover:text-blue-600 dark:text-white dark:hover:text-blue-500"
      }`}
      {...props}
    />
  );
}
