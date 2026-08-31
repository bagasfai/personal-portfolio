"use client";

import { m } from "motion/react";
import { revealVariants, revealViewport } from "./variants";

/**
 * Scroll reveal for server-rendered markup. Whatever it wraps arrives as `children`,
 * so the content stays on the server and only this wrapper ships as JavaScript.
 *
 * Deliberately does NOT set `data-reveal`. That attribute is Hero's alone:
 * app/globals.css forces `opacity:1;transform:none !important` on every
 * `[data-reveal]` whenever the intro is skipped, which is every repeat visit. Setting
 * it here would leave all seven sections permanently revealed and kill the scroll
 * animation for anyone who has been to the site before.
 */
export default function Reveal({
  children,
  custom = 0,
  className,
  style,
  as = "div",
}: {
  children: React.ReactNode;
  custom?: number;
  className?: string;
  /** For CSS custom properties the wrapped markup reads. Motion merges its own
   *  animated opacity/transform on top. */
  style?: React.CSSProperties;
  /** Keeps semantic elements semantic — the journal cards are <article>. */
  as?: "div" | "article";
}) {
  const Tag = as === "article" ? m.article : m.div;
  return (
    <Tag
      variants={revealVariants}
      custom={custom}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      className={className}
      style={style}
    >
      {children}
    </Tag>
  );
}
