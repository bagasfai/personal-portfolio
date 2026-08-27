"use client";

import type { Particle } from "@/lib/types";

/** Wrapper scopes :nth-child for the small-screen density rule — see CloudBank. */
export default function MoteDrift({ particles }: { particles: Particle[] }) {
  return (
    <div className="absolute inset-0">
      {particles.map((p, i) => (
        <div
          key={i}
          style={
            {
              "--p-left": p.left,
              "--p-top": p.top,
              "--p-size": p.s,
              "--p-anim": `rise ${p.dur} linear ${p.delay} infinite`,
            } as React.CSSProperties
          }
          className="mote absolute left-(--p-left) top-(--p-top) w-(--p-size) h-(--p-size) rounded-full bg-[radial-gradient(circle,#fff,rgba(255,255,255,0)_70%)] shadow-[0_0_8px_rgba(255,255,255,0.7)] animate-(--p-anim)"
        />
      ))}
    </div>
  );
}
