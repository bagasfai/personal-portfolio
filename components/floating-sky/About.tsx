"use client";

import { useMemo, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { revealVariants, revealViewport } from "./motionVariants";
import { createLeaves } from "@/lib/decor";

function PortraitSlot() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[linear-gradient(160deg,#e2e8ff,#f6dcee)]">
      <span className="font-[family-name:var(--font-instrument-serif),Georgia,serif] italic text-[64px] text-[#8a8fce]">
        B
      </span>
    </div>
  );
}

export default function About() {
  const leaves = useMemo(() => createLeaves(), []);

  const wrapRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, {
    stiffness: 220,
    damping: 20,
    mass: 0.6,
  });
  const springY = useSpring(rotateY, {
    stiffness: 220,
    damping: 20,
    mass: 0.6,
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rotateY.set(px * 11);
    rotateX.set(-py * 11);
  };
  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <section
      id="my-story"
      aria-labelledby="story-heading"
      data-screen-label="My Story"
      className="relative z-2 min-h-screen flex items-center justify-center pt-27.5 px-[7vw] pb-32.5"
    >
      {leaves.map((l, i) => (
        <div
          key={i}
          style={
            {
              "--leaf-left": l.left,
              "--leaf-top": l.top,
              "--leaf-w": l.sz,
              "--leaf-h": l.szb,
              "--leaf-bg": `linear-gradient(160deg, hsl(${l.hue} 55% 82%), hsl(${l.hue} 45% 66%))`,
              "--leaf-anim": `leafFall ${l.dur} ease-in-out ${l.delay} infinite`,
            } as React.CSSProperties
          }
          className="absolute left-(--leaf-left) top-(--leaf-top) w-(--leaf-w) h-(--leaf-h) bg-(image:--leaf-bg) rounded-[0_82%_30%_82%] opacity-55 animate-(--leaf-anim) pointer-events-none"
        />
      ))}

      <div className="w-full max-w-270 flex flex-wrap items-center justify-center gap-15">
        <motion.div
          variants={revealVariants}
          custom={0}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="flex-[0_1_360px] min-w-70 perspective-[1000px]"
        >
          <div className="animate-[floatB_8s_ease-in-out_infinite]">
            <div
              ref={wrapRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
            >
              <motion.div
                style={{ rotateX: springX, rotateY: springY }}
                className="rounded-[34px] p-4 bg-(--glass) border border-(--glass-brd) backdrop-blur-lg backdrop-saturate-[1.2] shadow-[0_30px_60px_rgba(120,110,190,0.28),inset_0_1px_0_rgba(255,255,255,0.6)]"
              >
                <div className="rounded-[22px] overflow-hidden aspect-4/5">
                  <PortraitSlot />
                </div>
                <div className="flex items-center justify-between pt-3.75 px-2 pb-1.5">
                  <span className="font-[family-name:var(--font-caveat),cursive] font-bold text-[23px] text-(--ink)">
                    Bagaskara
                  </span>
                  <span className="text-[11.5px] tracking-[0.4px] text-(--ink-soft) font-medium">
                    above the clouds
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={revealVariants}
          custom={1}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="flex-[1_1_380px] min-w-75"
        >
          <p className="mb-2.5 font-[family-name:var(--font-caveat),cursive] text-[26px] font-semibold text-(--ink-soft)">
            a little about me
          </p>
          <h2 id="story-heading" className="mb-6 font-[family-name:var(--font-instrument-serif),Georgia,serif] font-normal text-[clamp(34px,4.6vw,54px)] leading-[1.06] tracking-[-0.4px] text-(--ink) text-balance">
            I turn fuzzy ideas into software that feels{" "}
            <em className="italic">light</em> to use.
          </h2>
          <p className="mb-4.5 text-[16.5px] leading-[1.75] text-(--ink-soft) max-w-125 text-pretty">
            I&apos;ve spent the last few years living across the whole stack —
            backend plumbing, front-of-house polish, and everything in the quiet
            middle. I like the parts nobody sees, and the ones everybody feels.
          </p>
          <p className="mb-6.5 text-[16.5px] leading-[1.75] text-(--ink-soft) max-w-125 text-pretty">
            When I&apos;m not building, I&apos;m chasing good light and slow
            mornings. I think tools should feel a little like weather — present,
            gentle, and easy to be around.
          </p>

          <div className="flex flex-wrap gap-2.5">
            {[
              "Full-stack",
              "Design-minded",
              "Calm by default",
              "Open to collaborate",
            ].map((chip) => (
              <span
                key={chip}
                className="py-2.25 px-4 rounded-full text-[13px] font-semibold text-(--ink) bg-(--glass) border border-(--glass-brd) backdrop-blur-[10px]"
              >
                {chip}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
