import type { Variants } from "motion/react";

export const EASE_SOFT: [number, number, number, number] = [0.2, 0.8, 0.2, 1];
export const EASE_REVEAL: [number, number, number, number] = [0.2, 0.85, 0.25, 1];

/** `whileInView` replacement for the reference's IntersectionObserver reveal. */
export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.05, ease: EASE_REVEAL, delay: i * 0.095 },
  }),
};

export const revealViewport = { once: true, margin: "0px 0px -11% 0px" };
