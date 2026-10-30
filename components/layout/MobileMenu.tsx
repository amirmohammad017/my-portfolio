"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
type MenuItem = { to: string; label: string };

export default function MobileMenu({
  isOpen,
  onClose,
  menuItems,
}: {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 -z-10 md:hidden"
            aria-hidden
          />

          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="border-b border-black/5 bg-white/90 px-6 py-2 backdrop-blur-md dark:border-white/5 dark:bg-black/80 md:hidden"
          >
            {menuItems.map((item) => (
              <li key={item.to}>
                <Link
                  href={item.to}
                  onClick={onClose}
                  className={`block py-3 text-base transition-colors ${
                    pathname === item.to
                      ? "text-blue-600 dark:text-blue-500"
                      : "text-slate-600 hover:text-slate-900 dark:text-white/70 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        </>
      )}
    </AnimatePresence>
  );
}
