"use client";

import { useMemo } from "react";
import { createLeaves } from "@/lib/decor";

/**
 * Falling leaves behind the story section. Client-only because the generator has to run
 * on the client as well, producing the same seeded values the prerender did. Extracted
 * so the rest of About can stay on the server.
 */
export default function LeafFall() {
  const leaves = useMemo(() => createLeaves(), []);

  return (
    <>
      {leaves.map((l, i) => (
        <div
          key={i}
          style={
            {
              "--leaf-left": l.left,
              "--leaf-top": l.top,
              "--leaf-w": l.sz,
              "--leaf-h": l.szb,
              "--leaf-bg": `linear-gradient(160deg, hsl(${l.hue} 55% 82%), hsl(${l.hue} 45% 66%))`,
              "--leaf-anim": `leafFall ${l.dur} ease-in-out ${l.delay} infinite`,
            } as React.CSSProperties
          }
          className="absolute left-(--leaf-left) top-(--leaf-top) w-(--leaf-w) h-(--leaf-h) bg-(image:--leaf-bg) rounded-[0_82%_30%_82%] opacity-55 animate-(--leaf-anim) pointer-events-none"
        />
      ))}
    </>
  );
}
