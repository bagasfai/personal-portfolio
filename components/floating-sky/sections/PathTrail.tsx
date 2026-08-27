"use client";

import { useEffect, useRef } from "react";

/**
 * Lights each step stone as it passes the viewport line.
 *
 * Replaces one scrollY subscription per step, each of which called
 * getBoundingClientRect() on every scroll change — N forced layouts per frame.
 * IntersectionObserver reports the same crossing without touching layout.
 *
 * The predicate is one-sided on purpose. The old test was `top <= 62% of viewport`,
 * which stays true once a stone has scrolled off the top, so the stones behind you
 * remain lit — that is the trail the section's copy describes. `isIntersecting` alone
 * is two-sided and would switch them back off, so a stone above the viewport is
 * detected by its own reported top edge instead. That value comes off the observer
 * entry, so it still costs no layout.
 */
export default function PathTrail({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const stones = wrap.querySelectorAll<HTMLElement>("[data-step-stone]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const passed =
            entry.isIntersecting || entry.boundingClientRect.top < 0;
          entry.target.classList.toggle("is-lit", passed);
        }
      },
      { rootMargin: "0px 0px -38% 0px" },
    );
    stones.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return <div ref={wrapRef}>{children}</div>;
}
