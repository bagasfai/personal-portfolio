"use client";

import { useRef } from "react";
import { m, useMotionValue, useSpring } from "motion/react";

/**
 * Pointer-tilt portrait frame. The rotation is spring-driven through motion values, so
 * moving the pointer never triggers a React render, and the card's contents arrive as
 * server-rendered children.
 */
export default function TiltCard({ children }: { children: React.ReactNode }) {
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
    <div
      ref={wrapRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <m.div
        style={{ rotateX: springX, rotateY: springY }}
        className="rounded-[34px] p-4 bg-(--glass) border border-(--glass-brd) backdrop-blur-lg backdrop-saturate-[1.2] shadow-[0_30px_60px_rgba(120,110,190,0.28),inset_0_1px_0_rgba(255,255,255,0.6)]"
      >
        {children}
      </m.div>
    </div>
  );
}
