"use client";

import { useMemo, useRef, useState } from "react";
import { motion, motionValue, useAnimationFrame, type MotionValue } from "motion/react";
import { useSky } from "./SkyContext";
import { revealVariants, revealViewport } from "./motionVariants";
import { getCrystals, type Crystal } from "./data";

const REPEL_RADIUS = 150;
const REPEL_STRENGTH = 34;
const REPEL_EASE = 0.12;

function CrystalItem({
  k,
  x,
  y,
  nodeRef,
}: {
  k: Crystal;
  x: MotionValue<number>;
  y: MotionValue<number>;
  nodeRef: (el: HTMLDivElement | null) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const gemRef = useRef<HTMLDivElement | null>(null);

  return (
    <motion.div
      ref={nodeRef}
      style={
        {
          "--k-left": k.x,
          "--k-top": k.y,
          "--k-size": k.size,
          "--k-half": k.half,
          x,
          y,
        } as unknown as React.CSSProperties
      }
      className="absolute left-[var(--k-left)] top-[var(--k-top)] w-[var(--k-size)] h-[var(--k-size)] ml-[var(--k-half)] mt-[var(--k-half)] will-change-transform"
    >
      <div
        onPointerEnter={() => {
          setHovered(true);
          if (gemRef.current) gemRef.current.style.animationPlayState = "paused";
        }}
        onPointerLeave={() => {
          setHovered(false);
          if (gemRef.current) gemRef.current.style.animationPlayState = "running";
        }}
        style={{ "--k-bob-anim": `floatC ${k.bob} ease-in-out ${k.delay} infinite` } as React.CSSProperties}
        className="relative w-full h-full cursor-default [transform-style:preserve-3d] [animation:var(--k-bob-anim)]"
      >
        <div
          style={
            {
              "--k-glow-bg": `radial-gradient(circle, ${k.glow}, transparent 68%)`,
              "--k-glow-anim": `shimmer ${k.bob} ease-in-out infinite`,
            } as React.CSSProperties
          }
          className="absolute -inset-[30%] rounded-full opacity-50 blur-[6px] bg-[image:var(--k-glow-bg)] [animation:var(--k-glow-anim)]"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            ref={gemRef}
            style={{ "--k-spin-anim": `spinY ${k.spin} linear infinite` } as React.CSSProperties}
            className="w-[70%] h-[70%] [transform-style:preserve-3d] [animation:var(--k-spin-anim)]"
          >
            <div
              style={{ "--k-gem-bg": `linear-gradient(150deg, ${k.c1}, ${k.c2})` } as React.CSSProperties}
              className="w-full h-full bg-[image:var(--k-gem-bg)] [clip-path:polygon(50%_0,100%_34%,82%_100%,18%_100%,0_34%)] shadow-[inset_0_3px_10px_rgba(255,255,255,0.7),inset_0_-8px_14px_rgba(0,0,0,0.16)] rounded-[6px]"
            />
          </div>
        </div>

        <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 py-1 px-[11px] rounded-full text-[11.5px] font-bold tracking-[0.2px] whitespace-nowrap text-[var(--ink)] bg-[var(--glass)] border border-[var(--glass-brd)] backdrop-blur-[8px]">
          {k.name}
        </div>

        <motion.div
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ x: "-50%" }}
          className="absolute left-1/2 [bottom:calc(100%+14px)] w-[212px] py-[15px] px-[17px] rounded-[20px] bg-[var(--glass)] border border-[var(--glass-brd)] backdrop-blur-[18px] backdrop-saturate-[1.3] shadow-[0_22px_50px_rgba(110,100,180,0.3)] pointer-events-none z-20"
        >
          <div className="flex items-center justify-between mb-[7px]">
            <span className="font-[family-name:var(--font-instrument-serif),serif] text-xl text-[var(--ink)]">{k.name}</span>
            <span
              style={{ "--k-years-color": k.c2, "--k-years-bg": k.glow } as React.CSSProperties}
              className="text-[11px] font-bold tracking-[0.4px] py-[3px] px-[9px] rounded-full text-[color:var(--k-years-color)] bg-[color:var(--k-years-bg)]"
            >
              {k.years}
            </span>
          </div>
          <p className="m-0 text-[13px] leading-[1.55] text-[var(--ink-soft)] text-pretty">
            {k.desc}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const crystals = useMemo(() => getCrystals(), []);
  const { cx, cy, reducedMotion } = useSky();

  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offsets = useRef(crystals.map(() => ({ px: 0, py: 0 })));
  const values = useMemo(() => crystals.map(() => ({ x: motionValue(0), y: motionValue(0) })), [crystals]);

  useAnimationFrame(() => {
    if (reducedMotion) return;
    const pointerX = cx.get();
    const pointerY = cy.get();
    crystals.forEach((_, i) => {
      const el = nodeRefs.current[i];
      if (!el) return;
      const r = el.getBoundingClientRect();
      const ccx = r.left + r.width / 2;
      const ccy = r.top + r.height / 2;
      let dx = 0;
      let dy = 0;
      if (pointerX !== 0 || pointerY !== 0) {
        const vx = ccx - pointerX;
        const vy = ccy - pointerY;
        const dist = Math.hypot(vx, vy);
        if (dist < REPEL_RADIUS && dist > 0.1) {
          const push = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
          dx = (vx / dist) * push;
          dy = (vy / dist) * push;
        }
      }
      const o = offsets.current[i];
      o.px += (dx - o.px) * REPEL_EASE;
      o.py += (dy - o.py) * REPEL_EASE;
      values[i].x.set(o.px);
      values[i].y.set(o.py);
    });
  });

  return (
    <section
      id="workshop"
      data-screen-label="Workshop"
      className="relative z-2 min-h-screen flex flex-col items-center justify-center pt-[120px] px-[6vw] pb-32.5"
    >
      <motion.div
        variants={revealVariants}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="text-center max-w-[640px] mb-8"
      >
        <p className="mb-2 font-[family-name:var(--font-caveat),cursive] text-[26px] font-semibold text-[var(--ink-soft)]">the workshop</p>
        <h2
          className="mb-4 font-[family-name:var(--font-instrument-serif),Georgia,serif] font-normal text-[clamp(34px,4.8vw,56px)] leading-[1.05] tracking-[-0.4px] text-[var(--ink)] text-balance"
        >
          Tools I&apos;ve shaped into <em className="italic">stones.</em>
        </h2>
        <p className="mx-auto max-w-[440px] text-base leading-[1.7] text-[var(--ink-soft)] text-pretty">
          Each crystal holds a craft. Drift your cursor near — they&apos;ll shy away — and rest on one to hear its story.
        </p>
      </motion.div>

      <div id="workshop" className="relative w-full max-w-[1000px] min-h-[560px] mt-5 flex items-center justify-center">
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[340px] h-[150px] [animation:anvilFloat_9s_ease-in-out_infinite] pointer-events-none">
          <div className="absolute left-1/2 bottom-5 -translate-x-1/2 w-[280px] h-[44px] rounded-full bg-[radial-gradient(closest-side,var(--shadow),transparent_76%)] blur-[6px]" />
          <div className="absolute left-1/2 top-[44px] -translate-x-1/2 w-[184px] h-[100px] bg-[linear-gradient(180deg,var(--rock1),var(--rock2))] [clip-path:polygon(5%_0,95%_0,80%_44%,60%_78%,50%_100%,40%_78%,20%_44%)] rounded-t-[40%]" />
          <div className="absolute left-1/2 top-[26px] -translate-x-1/2 w-[238px] h-[56px] rounded-full bg-[linear-gradient(180deg,var(--grass1),var(--grass2))] shadow-[inset_0_6px_14px_rgba(255,255,255,0.4),inset_0_-8px_14px_rgba(60,120,80,0.2)]" />
        </div>

        {crystals.map((k, i) => (
          <CrystalItem
            key={k.name}
            k={k}
            x={values[i].x}
            y={values[i].y}
            nodeRef={(el) => {
              nodeRefs.current[i] = el;
            }}
          />
        ))}
      </div>
    </section>
  );
}
