"use client";

import { useTransform } from "motion/react";
import { useSky } from "./SkyContext";

/** Pointer parallax amplitude in px at factor 1 — matches the reference's `mouse * factor * 48`. */
const AMP = 48;

/**
 * Motion-native replacement for the reference's `data-mouse="<factor>"` rAF lerp.
 * Returns spring-smoothed x/y motion values scaled by `factor`, bindable to a
 * motion element's `style` without ever triggering a React re-render.
 */
export function useParallax(factor: number) {
  const { sx, sy } = useSky();
  const x = useTransform(sx, (v) => v * factor * AMP);
  const y = useTransform(sy, (v) => v * factor * AMP);
  return { x, y };
}
