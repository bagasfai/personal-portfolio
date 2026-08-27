"use client";

import { useState } from "react";
import { m, AnimatePresence } from "motion/react";

const fieldBase =
  "w-full py-[13px] px-3.75 rounded-[14px] border border-[var(--glass-brd)] bg-[var(--field)] font-[family-name:var(--font-manrope),sans-serif] text-sm text-[var(--ink)] outline-none";

const CONTACT_EMAIL = "bagasfai50@gmail.com";

/** The note form and its sent state. The only part of Contact that needs to be client. */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {sent ? (
        <m.div
          key="sent"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center pt-8.5 px-2 pb-8.5"
        >
          <div className="text-[44px] mb-2.5">✦</div>
          <h3 className="mb-2 font-[family-name:var(--font-instrument-serif),serif] font-normal text-[26px] text-(--ink)">
            Your note took flight.
          </h3>
          <p className="text-[14.5px] leading-[1.6] text-(--ink-soft)">
            Thank you — I&apos;ll drift back to you soon.
          </p>
        </m.div>
      ) : (
        <m.form
          key="form"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const name = data.get("name")?.toString() ?? "";
            const email = data.get("email")?.toString() ?? "";
            const note = data.get("note")?.toString() ?? "";
            const subject = `Portfolio note from ${name}`;
            const body = `${note}\n\n— ${name} (${email})`;
            window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
              subject,
            )}&body=${encodeURIComponent(body)}`;
            setSent(true);
          }}
        >
          <label
            htmlFor="contact-name"
            className="block text-xs font-bold tracking-[0.4px] text-(--ink-soft) mb-1.5"
          >
            YOUR NAME
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            required
            placeholder="Who's drifting by?"
            className={`sky-field ${fieldBase} mb-4`}
          />
          <label
            htmlFor="contact-email"
            className="block text-xs font-bold tracking-[0.4px] text-(--ink-soft) mb-1.5"
          >
            EMAIL
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            required
            placeholder="where can I reach you?"
            className={`sky-field ${fieldBase} mb-4`}
          />
          <label
            htmlFor="contact-note"
            className="block text-xs font-bold tracking-[0.4px] text-(--ink-soft) mb-1.5"
          >
            YOUR NOTE
          </label>
          <textarea
            id="contact-note"
            rows={3}
            name="note"
            required
            placeholder="What shall we build?"
            className={`sky-field ${fieldBase} mb-5 resize-y`}
          />
          <m.button
            type="submit"
            whileHover={{
              y: -2,
              boxShadow:
                "0 20px 42px rgba(150,140,225,.55), inset 0 1px 0 rgba(255,255,255,.6)",
            }}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="w-full p-3.75 border-0 rounded-[14px] cursor-pointer font-[family-name:var(--font-manrope),sans-serif] text-[15px] font-bold text-white bg-[linear-gradient(135deg,#9db4ff,#c9a6ff_55%,#ffb3c8)] shadow-[0_14px_30px_rgba(150,140,225,0.4),inset_0_1px_0_rgba(255,255,255,0.5)]"
          >
            Send it into the sky →
          </m.button>
        </m.form>
      )}
    </AnimatePresence>
  );
}
