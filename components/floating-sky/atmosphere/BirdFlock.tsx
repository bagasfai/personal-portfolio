"use client";

import type { Bird } from "@/lib/types";

export default function BirdFlock({ birds }: { birds: Bird[] }) {
  return (
    <>
      {birds.map((b, i) => (
        <div
          key={i}
          style={
            {
              "--bird-top": b.top,
              "--bird-scale": b.sc,
              "--bird-anim": `birdFly ${b.dur} linear ${b.delay} infinite`,
              "--bird-wing-anim": `flap ${b.flap} ease-in-out infinite`,
            } as React.CSSProperties
          }
          className="bird absolute left-0 top-(--bird-top) animate-(--bird-anim)"
        >
          <div className="relative w-6.5 h-3 scale-(--bird-scale)">
            <div className="bird-wing absolute left-0 top-1 w-3.5 h-1 rounded-md bg-(--ink) opacity-[0.32] origin-right animate-(--bird-wing-anim)" />
            <div className="bird-wing absolute right-0 top-1 w-3.5 h-1 rounded-md bg-(--ink) opacity-[0.32] origin-left animate-(--bird-wing-anim)" />
          </div>
        </div>
      ))}
    </>
  );
}
