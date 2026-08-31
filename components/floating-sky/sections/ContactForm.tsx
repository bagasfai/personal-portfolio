"use client";

import { useState } from "react";
import { m, AnimatePresence } from "motion/react";
import { CONTACT_EMAIL } from "@/content/contact";

const fieldBase =
  "w-full py-[13px] px-3.75 rounded-[14px] border border-[var(--glass-brd)] bg-[var(--field)] font-[family-name:var(--font-manrope),sans-serif] text-sm text-[var(--ink)] outline-none";

type Status = "idle" | "submitting" | "sent" | "error";

const ENDPOINT = "https://api.web3forms.com/submit";

/**
 * The note form and its result states.
 *
 * The previous version called setSent(true) the instant the button was clicked and
 * bounced the visitor to their mail client, so the success panel was a guess — it
 * appeared whether or not anything was ever delivered. Now it appears only after the
 * request actually resolves, and a failure says so.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot. The access key is public by design, so bots will find this endpoint.
    if (data.get("botcheck")) return;

    data.append("access_key", process.env.NEXT_PUBLIC_CONTACT_ACCESS_KEY ?? "");
    data.append(
      "subject",
      `Portfolio note from ${data.get("name") ?? "someone"}`,
    );
    data.append("to", CONTACT_EMAIL);

    setStatus("submitting");
    try {
      const res = await fetch(ENDPOINT, { method: "POST", body: data });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message ?? "send failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "sent" ? (
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
          onSubmit={handleSubmit}
        >
          <input
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

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
            autoComplete="name"
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
            autoComplete="email"
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
            disabled={status === "submitting"}
            whileHover={
              status === "submitting"
                ? undefined
                : {
                    y: -2,
                    boxShadow:
                      "0 20px 42px rgba(150,140,225,.55), inset 0 1px 0 rgba(255,255,255,.6)",
                  }
            }
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="w-full p-3.75 border-0 rounded-[14px] cursor-pointer font-[family-name:var(--font-manrope),sans-serif] text-[15px] font-bold text-white bg-[linear-gradient(135deg,#9db4ff,#c9a6ff_55%,#ffb3c8)] shadow-[0_14px_30px_rgba(150,140,225,0.4),inset_0_1px_0_rgba(255,255,255,0.5)] disabled:opacity-70"
          >
            {status === "submitting" ? "Sending…" : "Send it into the sky →"}
          </m.button>

          {status === "error" && (
            <p
              role="alert"
              className="mt-3 text-[13px] leading-[1.6] text-[#d66f9a]"
            >
              The wind took that one. Try again, or write to{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          )}
        </m.form>
      )}
    </AnimatePresence>
  );
}
