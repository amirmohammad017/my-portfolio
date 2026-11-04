"use client";

import { useState } from "react";
import { NavLink } from "@/components/layout/NavLink";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const menuItems = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/admin", label: "Admin" },
];

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full text-slate-900 dark:text-white">
      <div className="flex items-center justify-between border-b border-black/5 bg-white/70 px-6 py-5 backdrop-blur-md dark:border-white/5 dark:bg-black/50 md:px-10">
        <NavLink href="/" className="text-xl font-bold tracking-tighter">
          amirmohammad
        </NavLink>

        <ul className="hidden items-center gap-2 md:flex">
          {menuItems.map((item) => (
            <li key={item.to} className="capitalize">
              <NavLink href={item.to} className="block px-2 py-1">
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            className="cursor-pointer text-2xl focus:outline-none md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        menuItems={menuItems}
      />
    </nav>
  );
}
