"use client";

import { useEffect, useState } from "react";
import { m, useTransform } from "motion/react";
import { useSky } from "../SkyContext";

export default function CursorGlow() {
  const { cx, cy } = useSky();
  const [active, setActive] = useState(false);
  useEffect(() => {
    const onMove = () => setActive(true);
    window.addEventListener("pointermove", onMove, { once: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  const transform = useTransform(
    [cx, cy],
    ([x, y]: number[]) => `translate3d(${x}px, ${y}px, 0)`,
  );
  return (
    <m.div
      id="cursorglow"
      style={{ transform }}
      // will-change only once a pointer has actually moved. Holding the GPU layer
      // permanently costs memory on every load, including touch devices where this
      // element never moves at all.
      className={`absolute left-0 top-0 w-140 h-140 -mt-70 -ml-70 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.5),transparent_62%)] mix-blend-soft-light [transition:opacity_.7s_ease] ${
        active ? "opacity-100 will-change-transform" : "opacity-0"
      }`}
    />
  );
}
