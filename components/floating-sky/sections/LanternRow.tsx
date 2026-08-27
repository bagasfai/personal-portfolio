"use client";

import { useMemo } from "react";
import { createLanterns } from "@/lib/decor";

/**
 * The hanging lanterns on the sunset island. Client-only for the same reason as the
 * other decor generators — the values must be produced identically on both sides of
 * hydration — which keeps the rest of Contact on the server.
 */
export default function LanternRow() {
  const lanterns = useMemo(() => createLanterns(), []);

  return (
    <>
      {lanterns.map((ln, i) => (
        <div
          key={i}
          style={
            {
              "--ln-left": ln.left,
              "--ln-top": ln.top,
              "--ln-anim": `stoneFloat ${ln.float} ease-in-out ${ln.delay} infinite`,
            } as React.CSSProperties
          }
          className="absolute left-(--ln-left) top-(--ln-top) z-1 animate-(--ln-anim) pointer-events-none"
        >
          <div
            style={
              {
                "--ln-sway-anim": `lanternSway ${ln.sway} ease-in-out infinite`,
              } as React.CSSProperties
            }
            className="lantern-sway origin-top animate-(--ln-sway-anim)"
          >
            <div
              style={{ "--ln-string": ln.string } as React.CSSProperties}
              className="w-px h-(--ln-string) mx-auto bg-(--ink-soft)"
            />
            <div
              style={
                {
                  "--ln-w": ln.size,
                  "--ln-h": `calc(${ln.size} * 1.25)`,
                } as React.CSSProperties
              }
              className="relative w-(--ln-w) h-(--ln-h) rounded-[40%_40%_46%_46%] bg-[linear-gradient(180deg,#ffd9a8,#ff9e7a)] shadow-[0_0_24px_4px_rgba(255,180,120,0.5)]"
            >
              <div
                style={
                  {
                    "--ln-glow-anim": `lanternGlow ${ln.glow} ease-in-out infinite`,
                  } as React.CSSProperties
                }
                className="lantern-glow absolute inset-[-30%] rounded-full bg-[radial-gradient(circle,rgba(255,200,140,0.6),transparent_68%)] animate-(--ln-glow-anim)"
              />
              <div className="absolute left-1/2 -top-0.75 -translate-x-1/2 w-[44%] h-1.25 rounded-[3px] bg-[#e8895f]" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
