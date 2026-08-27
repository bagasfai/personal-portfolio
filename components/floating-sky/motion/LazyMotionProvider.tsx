"use client";

import { LazyMotion, domAnimation } from "motion/react";

// `strict` makes any leftover `motion.*` throw instead of silently pulling the full
// feature bundle back in, which is the whole point of converting to `m.*`.
export default function LazyMotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
