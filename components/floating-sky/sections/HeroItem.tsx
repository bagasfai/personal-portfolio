"use client";

import { m } from "motion/react";
import { heroTextVariants, heroIslandVariants } from "../motion/variants";

/**
 * One participant in the hero stagger. Deliberately thin: it carries the variant and
 * the `data-reveal` marker, and everything visible inside it arrives as server-rendered
 * children.
 *
 * `data-reveal` is load-bearing. app/globals.css forces opacity:1/transform:none
 * !important on these when data-sky-intro="0" (the skip path), so any hover or scroll
 * transform added to one of these elements works on first load and is silently dead for
 * repeat visitors and reduced-motion users.
 *
 * Variants propagate to these through Motion's React context, so the plain server
 * markup sitting between them and HeroStagger does not break the stagger.
 */
export default function HeroItem({
  children,
  as = "div",
  variant = "text",
  className,
  id,
}: {
  children: React.ReactNode;
  as?: "div" | "p" | "h1";
  variant?: "text" | "island";
  className?: string;
  id?: string;
}) {
  const Tag = as === "p" ? m.p : as === "h1" ? m.h1 : m.div;
  return (
    <Tag
      id={id}
      variants={variant === "island" ? heroIslandVariants : heroTextVariants}
      data-reveal
      className={className}
    >
      {children}
    </Tag>
  );
}
