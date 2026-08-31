"use client";

import { useMemo } from "react";
import { createPapers } from "@/lib/decor";

/**
 * Drifting paper scraps behind the journal. Client-only because the generator has to
 * run on the client too — the seeded values must match what the prerender produced,
 * and rendering them here keeps the rest of the section on the server.
 */
export default function PaperDrift() {
  const papers = useMemo(() => createPapers(), []);

  return (
    <>
      {papers.map((pp, i) => (
        <div
          key={i}
          style={
            {
              "--paper-left": pp.left,
              "--paper-top": pp.top,
              "--paper-w": pp.w,
              "--paper-h": pp.h,
              "--paper-anim": `paperDrift ${pp.dur} ease-in-out ${pp.delay} infinite`,
            } as React.CSSProperties
          }
          className="paper absolute left-(--paper-left) top-(--paper-top) w-(--paper-w) h-(--paper-h) rounded-[3px] bg-[linear-gradient(160deg,#ffffff,#f2eefc)] shadow-[0_8px_20px_rgba(110,100,180,0.16)] opacity-70 animate-(--paper-anim) pointer-events-none"
        />
      ))}
    </>
  );
}
