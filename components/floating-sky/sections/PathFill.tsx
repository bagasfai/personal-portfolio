"use client";

import { useRef } from "react";
import { m, useScroll } from "motion/react";

/**
 * The trail fill that grows as you scroll the journey. Genuinely scroll-driven with no
 * CSS equivalent at this browser support target, so it stays in Motion. Its children
 * are the server-rendered steps.
 */
export default function PathFill({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start center", "end end"],
  });

  return (
    <div id="pathwrap" ref={wrapRef} className="relative w-full max-w-225">
      <div className="absolute left-1/2 top-2 bottom-2 w-0.75 -translate-x-1/2 rounded-[3px] bg-(--glass-brd) overflow-hidden">
        <m.div
          id="pathfill"
          style={{ scaleY: scrollYProgress }}
          className="absolute left-0 top-0 w-full h-full origin-top bg-[linear-gradient(180deg,#9db4ff,#c9a6ff_55%,#ffb3c8)] shadow-[0_0_12px_rgba(180,160,255,0.7)]"
        />
      </div>
      {children}
    </div>
  );
}
