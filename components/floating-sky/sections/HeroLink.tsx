"use client";

import { m } from "motion/react";

/** The two hero call-to-action links. Spring lift on hover, dip on tap. */
export default function HeroLink({
  href,
  className,
  scaleOnHover = false,
  children,
}: {
  href: string;
  className?: string;
  scaleOnHover?: boolean;
  children: React.ReactNode;
}) {
  return (
    <m.a
      href={href}
      whileHover={scaleOnHover ? { y: -3, scale: 1.03 } : { y: -3 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={className}
    >
      {children}
    </m.a>
  );
}
