import { FaBell, FaCheck, FaChevronDown, FaEnvelopeOpen } from "react-icons/fa";
import { markMessageReadAction } from "@/app/actions/contact/markMessageRead";
import type { ContactMessage } from "@/lib/contact/queries";

export function UnreadMessages({ messages }: { messages: ContactMessage[] }) {
  if (messages.length === 0) return null;

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <details className="group mb-8 overflow-hidden rounded-xl border border-blue-500/30 bg-blue-500/5 dark:bg-blue-500/10">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 select-none marker:hidden [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-3 text-lg font-semibold">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-blue-600/15 text-blue-600 dark:text-blue-400">
            <FaBell />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 animate-pulse rounded-full bg-amber-400 ring-2 ring-white dark:ring-black" />
            )}
          </span>
          Messages
          <span className="rounded-full bg-slate-500/20 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:text-white/70">
            {messages.length}
          </span>
          {unreadCount > 0 && (
            <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-bold text-white">
              {unreadCount} new
            </span>
          )}
        </span>
        <FaChevronDown className="text-blue-600 transition-transform duration-300 group-open:rotate-180 dark:text-blue-400" />
      </summary>

      <ul className="space-y-3 border-t border-blue-500/20 p-4">
        {messages.map((m) => (
          <li
            key={m._id}
            className={
              m.read
                ? "rounded-lg border border-l-4 border-black/5 border-l-slate-300 bg-black/[0.02] p-3 opacity-75 dark:border-white/10 dark:border-l-white/20 dark:bg-white/[0.02]"
                : "rounded-lg border border-l-4 border-black/5 border-l-blue-500 bg-white/60 p-3 shadow-sm dark:border-white/10 dark:border-l-blue-400 dark:bg-white/5"
            }
          >
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="flex flex-wrap items-center gap-2">
                <strong
                  className={
                    m.read
                      ? "rounded-md bg-slate-500/10 px-2 py-0.5 text-sm text-slate-600 dark:text-white/70"
                      : "rounded-md bg-blue-600/10 px-2 py-0.5 text-sm text-blue-700 dark:text-blue-300"
                  }
                >
                  {m.name}
                </strong>
                <a
                  href={`mailto:${m.email}`}
                  className="text-slate-500 hover:underline dark:text-white/60"
                >
                  {m.email}
                </a>
              </span>
              <span className="rounded-md bg-amber-500/15 px-2 py-0.5 text-amber-700 dark:text-amber-300">
                {new Date(m.createdAt).toLocaleString()}
              </span>
            </div>

            <p className="text-sm whitespace-pre-wrap">{m.message}</p>

            <div className="mt-3 flex justify-end">
              {m.read ? (
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-white/50">
                  <FaEnvelopeOpen />
                  خوانده شد
                </span>
              ) : (
                <form action={markMessageReadAction.bind(null, m._id)}>
                  <button className="inline-flex items-center gap-1.5 rounded-lg bg-green-500/15 px-3 py-1.5 text-xs font-medium text-green-700 transition hover:bg-green-500/25 dark:text-green-400">
                    <FaCheck />
                    Mark as read
                  </button>
                </form>
              )}
            </div>
          </li>
        ))}
      </ul>
    </details>
  );
}
