"use client";

import type { Cloud } from "@/lib/types";

/**
 * The wrapper is not cosmetic: it scopes :nth-child so the small-screen density rule
 * counts clouds among clouds. Rendered as a bare fragment these would be siblings of
 * the blobs and rays, and `.cloud:nth-child(n+6)` would hide every one of them.
 */
export default function CloudBank({ clouds }: { clouds: Cloud[] }) {
  return (
    <div className="absolute inset-0">
      {clouds.map((c, i) => (
        <div
          key={i}
          style={
            {
              "--c-top": c.top,
              "--c-w": c.w,
              "--c-h": c.h,
              "--c-op": c.op,
              "--c-blur": c.blur,
              "--c-anim": `${c.anim} ${c.dur} linear ${c.delay} infinite`,
            } as React.CSSProperties
          }
          className="cloud absolute left-0 top-(--c-top) w-(--c-w) h-(--c-h) opacity-(--c-op) blur-(--c-blur) animate-(--c-anim) bg-[radial-gradient(closest-side_at_28%_62%,#fff,transparent_72%),radial-gradient(closest-side_at_50%_44%,#fff,transparent_70%),radial-gradient(closest-side_at_70%_60%,#fff,transparent_72%),radial-gradient(closest-side_at_46%_74%,#fff,transparent_76%)]"
        />
      ))}
    </div>
  );
}
