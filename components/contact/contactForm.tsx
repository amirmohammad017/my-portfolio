"use client";

import { useActionState, useEffect, useRef } from "react";
import { FaPaperPlane, FaCheck } from "react-icons/fa";
import {
  sendMessageAction,
  type ContactState,
} from "@/app/actions/contact/sendMessage";

const fieldClass =
  "w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30 dark:focus:border-white/20 dark:focus:bg-white/10";

const initial: ContactState = {};

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendMessageAction,
    initial,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-5 text-left">
      {/* honeypot */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />

      <div>
        <input name="name" placeholder="Your Name..." className={fieldClass} />
        {state.fieldErrors?.name && (
          <p className="mt-1 text-xs text-red-500">{state.fieldErrors.name}</p>
        )}
      </div>

      <div>
        <input
          name="email"
          type="email"
          placeholder="Your Email..."
          className={fieldClass}
        />
        {state.fieldErrors?.email && (
          <p className="mt-1 text-xs text-red-500">{state.fieldErrors.email}</p>
        )}
      </div>

      <div>
        <textarea
          name="message"
          rows={5}
          placeholder="Your Message..."
          className={`${fieldClass} resize-none`}
        />
        {state.fieldErrors?.message && (
          <p className="mt-1 text-xs text-red-500">
            {state.fieldErrors.message}
          </p>
        )}
      </div>

      {state.error && <p className="text-sm text-red-500">{state.error}</p>}

      {state.ok && (
        <p className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
          <FaCheck /> Your message has been sent.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 py-3 font-medium text-white transition hover:bg-blue-600 disabled:opacity-60"
      >
        <FaPaperPlane className="text-sm" />
        {pending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
