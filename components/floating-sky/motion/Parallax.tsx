"use client";

import { m } from "motion/react";
import { useParallax } from "./useParallax";

/**
 * Binds pointer parallax to a wrapper so its children can stay server-rendered.
 * The motion values drive the element directly and never trigger a React render.
 */
export default function Parallax({
  children,
  factor,
  className,
}: {
  children: React.ReactNode;
  factor: number;
  className?: string;
}) {
  const { x, y } = useParallax(factor);
  return (
    <m.div style={{ x, y }} className={className}>
      {children}
    </m.div>
  );
}
