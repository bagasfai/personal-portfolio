"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { m, useScroll } from "motion/react";

/**
 * The trail fill that grows as you scroll the journey. Genuinely scroll-driven with no
 * CSS equivalent at this browser support target, so it stays in Motion. Its children
 * are the server-rendered steps.
 *
 * The track's top/bottom are measured off the first and last stone centers (not the
 * wrapper's own padding) so the line starts and ends exactly on the circles instead of
 * floating above/below them.
 */
export default function PathFill({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [trackInset, setTrackInset] = useState({ top: 8, bottom: 8 });
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start center", "end end"],
  });

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const measure = () => {
      const stones = wrap.querySelectorAll<HTMLElement>("[data-step-stone]");
      if (stones.length < 2) return;
      const wrapRect = wrap.getBoundingClientRect();
      const first = stones[0].getBoundingClientRect();
      const last = stones[stones.length - 1].getBoundingClientRect();
      const firstCenter = first.top + first.height / 2 - wrapRect.top;
      const lastCenter = last.top + last.height / 2 - wrapRect.top;
      setTrackInset({
        top: firstCenter,
        bottom: wrapRect.height - lastCenter,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, []);

  return (
    <div id="pathwrap" ref={wrapRef} className="relative w-full max-w-225">
      <div
        style={{ top: trackInset.top, bottom: trackInset.bottom }}
        className="absolute left-1/2 w-0.75 -translate-x-1/2 rounded-[3px] bg-(--glass-brd) overflow-hidden"
      >
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
