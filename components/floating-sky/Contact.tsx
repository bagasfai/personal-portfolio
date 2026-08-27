"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { revealVariants, revealViewport } from "./motionVariants";
import { createLanterns } from "@/lib/decor";

const fieldBase =
  "w-full py-[13px] px-3.75 rounded-[14px] border border-[var(--glass-brd)] bg-[var(--field)] font-[family-name:var(--font-manrope),sans-serif] text-sm text-[var(--ink)] outline-none";

const CONTACT_EMAIL = "bagasfai50@gmail.com";

export default function Contact() {
  const lanterns = useMemo(() => createLanterns(), []);
  const [sent, setSent] = useState(false);

  return (
    <section
      id="horizon"
      aria-labelledby="horizon-heading"
      data-screen-label="Horizon"
      className="relative z-2 min-h-screen flex flex-col items-center justify-center pt-30 px-[6vw] pb-30"
    >
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[120%] h-[70%] bg-[radial-gradient(ellipse_at_50%_100%,var(--sunset),transparent_68%)] pointer-events-none z-0" />

      {lanterns.map((ln, i) => (
        <div
          key={i}
          style={
            {
              "--ln-left": ln.left,
              "--ln-top": ln.top,
              "--ln-anim": `stoneFloat ${ln.float} ease-in-out ${ln.delay} infinite`,
            } as React.CSSProperties
          }
          className="absolute left-(--ln-left) top-(--ln-top) z-1 animate-(--ln-anim) pointer-events-none"
        >
          <div
            style={
              {
                "--ln-sway-anim": `lanternSway ${ln.sway} ease-in-out infinite`,
              } as React.CSSProperties
            }
            className="origin-top animate-(--ln-sway-anim)"
          >
            <div
              style={{ "--ln-string": ln.string } as React.CSSProperties}
              className="w-px h-(--ln-string) mx-auto bg-(--ink-soft)"
            />
            <div
              style={
                {
                  "--ln-w": ln.size,
                  "--ln-h": `calc(${ln.size} * 1.25)`,
                } as React.CSSProperties
              }
              className="relative w-(--ln-w) h-(--ln-h) rounded-[40%_40%_46%_46%] bg-[linear-gradient(180deg,#ffd9a8,#ff9e7a)] shadow-[0_0_24px_4px_rgba(255,180,120,0.5)]"
            >
              <div
                style={
                  {
                    "--ln-glow-anim": `lanternGlow ${ln.glow} ease-in-out infinite`,
                  } as React.CSSProperties
                }
                className="absolute inset-[-30%] rounded-full bg-[radial-gradient(circle,rgba(255,200,140,0.6),transparent_68%)] animate-(--ln-glow-anim)"
              />
              <div className="absolute left-1/2 -top-0.75 -translate-x-1/2 w-[44%] h-1.25 rounded-[3px] bg-[#e8895f]" />
            </div>
          </div>
        </div>
      ))}

      <div className="relative z-3 w-full max-w-230 flex flex-wrap items-center gap-12.5 justify-center">
        <motion.div
          variants={revealVariants}
          custom={0}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="flex-[1_1_320px] min-w-70"
        >
          <p className="mb-2 font-[family-name:var(--font-caveat),cursive] text-[26px] font-semibold text-(--ink-soft)">
            the sunset island
          </p>
          <h2 id="horizon-heading" className="mb-5 font-[family-name:var(--font-instrument-serif),Georgia,serif] font-normal text-[clamp(36px,5vw,60px)] leading-[1.03] tracking-[-0.5px] text-(--ink) text-balance">
            Let&apos;s build something <em className="italic">gentle</em>{" "}
            together.
          </h2>
          <p className="mb-6 max-w-100 text-[16.5px] leading-[1.75] text-(--ink-soft) text-pretty">
            The lanterns are lit and the kettle&apos;s on. If you&apos;ve got an
            idea worth drifting toward, leave a note — I read every one.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:hello@bagaskara.dev"
              className="inline-flex items-center gap-2 py-2.75 px-4.5 rounded-full no-underline text-sm font-semibold text-(--ink) bg-(--glass) border border-(--glass-brd) backdrop-blur-[10px]"
            >
              ✦ hello@bagaskara.dev
            </a>
            <a
              href="https://github.com/bagasfai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-2.75 px-4.5 rounded-full no-underline text-sm font-semibold text-(--ink) bg-(--glass) border border-(--glass-brd) backdrop-blur-[10px]"
            >
              GitHub
            </a>
          </div>
        </motion.div>

        <motion.div
          variants={revealVariants}
          custom={1}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="flex-[1_1_340px] min-w-75"
        >
          <div className="animate-[towerFloat_9s_ease-in-out_infinite]">
            <div className="pt-7 px-7 pb-6.5 rounded-[30px] bg-(--glass) border border-(--glass-brd) backdrop-blur-[20px] backdrop-saturate-[1.3] shadow-[0_30px_64px_rgba(110,100,180,0.28),inset_0_1px_0_rgba(255,255,255,0.6)] overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <motion.div
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
                  </motion.div>
                ) : (
                  <motion.form
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
                    <motion.button
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
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
