"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { revealVariants, revealViewport } from "./motionVariants";
import { getSteps, type Step } from "./data";

const LIT_GRADIENT = "linear-gradient(135deg,#b9c6ff,#d9bcff 55%,#ffc6d8)";
const LIT_SHADOW = "0 12px 30px rgba(150,130,230,.42), inset 0 1px 0 rgba(255,255,255,.7)";
const UNLIT_SHADOW = "0 12px 26px rgba(110,100,180,.24), inset 0 1px 0 rgba(255,255,255,.6)";

function StepNode({ s, index }: { s: Step; index: number }) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(false);
  const { scrollY } = useScroll();

  const check = () => {
    const el = nodeRef.current;
    if (!el) return;
    const passed = el.getBoundingClientRect().top <= window.innerHeight * 0.62;
    setLit((prev) => (prev === passed ? prev : passed));
  };

  useMotionValueEvent(scrollY, "change", check);
  useEffect(check, []);

  return (
    <div
      data-step={s.i}
      style={{ "--step-justify": s.justify } as React.CSSProperties}
      className="relative flex items-center [justify-content:var(--step-justify)] min-h-[150px] mb-6.5"
    >
      <div className="step-node absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-4">
        <div
          ref={nodeRef}
          style={{ "--stone-anim": `stoneFloat ${s.float} ease-in-out ${s.delay} infinite` } as React.CSSProperties}
          className="relative w-14 h-14 [animation:var(--stone-anim)]"
        >
          <motion.div
            animate={{ opacity: lit ? 0.8 : 0 }}
            transition={{ duration: 0.6 }}
            className="absolute -inset-[40%] rounded-full bg-[radial-gradient(circle,#c9a6ff,transparent_66%)] [animation:haloPulse_3.5s_ease-in-out_infinite] pointer-events-none"
          />
          <motion.div
            className="step-stone absolute inset-0 rounded-full border-[1.5px] border-[var(--glass-brd)] backdrop-blur-[10px] flex items-center justify-center text-[19px]"
            animate={{ background: lit ? LIT_GRADIENT : "var(--glass)", boxShadow: lit ? LIT_SHADOW : UNLIT_SHADOW }}
            transition={{ duration: 0.6 }}
          >
            {s.glyph}
          </motion.div>
        </div>
      </div>

      <motion.div
        className="step-card w-[calc(50%-60px)] py-[22px] px-6 rounded-3xl bg-[var(--glass)] border border-[var(--glass-brd)] backdrop-blur-[16px] backdrop-saturate-[1.2] shadow-[0_22px_48px_rgba(110,100,180,0.22),inset_0_1px_0_rgba(255,255,255,0.55)]"
        custom={index}
        variants={revealVariants}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        whileHover={{ y: -4, boxShadow: "0 30px 60px rgba(110,100,180,.32)" }}
      >
        <div className="flex items-baseline justify-between gap-3 mb-1">
          <span style={{ "--accent": s.accent } as React.CSSProperties} className="text-xs font-bold tracking-[0.6px] text-[color:var(--accent)]">
            {s.period}
          </span>
          <span className="text-[11.5px] font-semibold text-[var(--ink-soft)] opacity-80">{s.place}</span>
        </div>
        <h3 className="mb-1 font-[family-name:var(--font-instrument-serif),serif] font-normal text-[23px] text-[var(--ink)]">{s.role}</h3>
        <p className="mb-3.5 text-sm leading-[1.6] text-[var(--ink-soft)] text-pretty">
          {s.desc}
        </p>
        <div className="flex flex-wrap gap-[7px]">
          {s.tags.map((t) => (
            <span key={t} className="py-[5px] px-[11px] rounded-full text-[11px] font-bold text-[var(--ink)] bg-[var(--glass-brd)] border border-[var(--glass-brd)]">
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function Path() {
  const steps = useMemo(() => getSteps(), []);
  const pathWrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: pathP } = useScroll({ target: pathWrapRef, offset: ["start center", "end end"] });

  return (
    <section
      id="my-journey"
      data-screen-label="My Journey"
      className="relative z-2 min-h-screen flex flex-col items-center pt-32.5 px-[6vw] pb-37.5"
    >
      <motion.div
        variants={revealVariants}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="text-center max-w-[660px] mb-17.5"
      >
        <p className="mb-2 font-[family-name:var(--font-caveat),cursive] text-[26px] font-semibold text-[var(--ink-soft)]">the path through time</p>
        <h2
          className="mb-4 font-[family-name:var(--font-instrument-serif),Georgia,serif] font-normal text-[clamp(34px,4.8vw,56px)] leading-[1.05] tracking-[-0.4px] text-[var(--ink)] text-balance"
        >
          Stones I&apos;ve <em className="italic">stepped</em> across.
        </h2>
        <p className="mx-auto max-w-[460px] text-base leading-[1.7] text-[var(--ink-soft)] text-pretty">
          Each stone is a chapter, suspended in the sky. As you drift downward, the ones behind you light up — the trail you&apos;ve already walked.
        </p>
      </motion.div>

      <div id="pathwrap" ref={pathWrapRef} className="relative w-full max-w-[900px]">
        <div className="absolute left-1/2 top-2 bottom-2 w-[3px] -translate-x-1/2 rounded-[3px] bg-[var(--glass-brd)] overflow-hidden">
          <motion.div
            id="pathfill"
            style={{ scaleY: pathP }}
            className="absolute left-0 top-0 w-full h-full origin-top bg-[linear-gradient(180deg,#9db4ff,#c9a6ff_55%,#ffb3c8)] shadow-[0_0_12px_rgba(180,160,255,0.7)]"
          />
        </div>

        {steps.map((s, i) => (
          <StepNode key={s.role} s={s} index={i} />
        ))}
      </div>
    </section>
  );
}
