"use client";

import type { Star } from "@/lib/types";

export default function StarField({ stars }: { stars: Star[] }) {
  return (
    <div className="absolute inset-0 opacity-(--star-op) [transition:opacity_1.2s_ease]">
      {stars.map((s, i) => (
        <div
          key={i}
          style={
            {
              "--s-left": s.left,
              "--s-top": s.top,
              "--s-size": s.s,
              "--s-anim": `twinkle ${s.dur} ease-in-out ${s.delay} infinite`,
            } as React.CSSProperties
          }
          className="star absolute left-(--s-left) top-(--s-top) w-(--s-size) h-(--s-size) rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)] animate-(--s-anim)"
        />
      ))}
    </div>
  );
}
