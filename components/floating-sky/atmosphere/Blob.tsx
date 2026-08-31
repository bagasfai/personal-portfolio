"use client";

import { m } from "motion/react";
import { useParallax } from "../motion/useParallax";

export default function Blob({
  factor,
  className,
  varName,
  anim,
  delay,
  opacity,
  blur,
}: {
  factor: number;
  className: string;
  varName: string;
  anim: string;
  delay: string;
  opacity: number;
  blur: number;
}) {
  const { x, y } = useParallax(factor);
  return (
    <m.div className={`absolute ${className}`} style={{ x, y }}>
      <div
        style={
          {
            "--blob-color": `var(${varName})`,
            "--blob-blur": `${blur}px`,
            "--blob-opacity": opacity,
            "--blob-anim": `${anim} infinite`,
            "--blob-delay": delay,
          } as React.CSSProperties
        }
        className="blob w-full h-full rounded-full bg-[radial-gradient(closest-side,var(--blob-color),transparent_70%)] blur-(--blob-blur) opacity-(--blob-opacity) animate-(--blob-anim) [animation-delay:var(--blob-delay)]"
      />
    </m.div>
  );
}
