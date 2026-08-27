"use client";

import { m } from "motion/react";
import { useSky } from "../SkyContext";
import { heroContainerVariants } from "../motion/variants";

/**
 * Drives the hero entrance. `entered` comes from context rather than a prop because
 * the hero's markup is server-rendered and a server component cannot be handed
 * client state.
 */
export default function HeroStagger({
  children,
}: {
  children: React.ReactNode;
}) {
  const { entered } = useSky();
  return (
    <m.div
      variants={heroContainerVariants}
      initial="hidden"
      animate={entered ? "show" : "hidden"}
      className="w-full max-w-295 flex flex-wrap items-center justify-between gap-12"
    >
      {children}
    </m.div>
  );
}
