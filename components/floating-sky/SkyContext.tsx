"use client";

import { createContext, useContext } from "react";
import type { MotionValue } from "motion/react";

export interface SkyContextValue {
  /** Smoothed pointer offset, raw range roughly -0.5..0.5 (spring-eased). */
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  /** Raw pointer position in viewport px — for the cursor spotlight and crystal repel. */
  cx: MotionValue<number>;
  cy: MotionValue<number>;
  night: boolean;
  reducedMotion: boolean;
}

const SkyContext = createContext<SkyContextValue | null>(null);

export function SkyProvider({
  value,
  children,
}: {
  value: SkyContextValue;
  children: React.ReactNode;
}) {
  return <SkyContext.Provider value={value}>{children}</SkyContext.Provider>;
}

export function useSky() {
  const ctx = useContext(SkyContext);
  if (!ctx) throw new Error("useSky must be used within a SkyProvider");
  return ctx;
}
