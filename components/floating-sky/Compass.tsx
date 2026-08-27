"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { NAV_ITEMS } from "@/content/nav";
import { applyTheme, type ThemeName } from "@/lib/theme";

const SECTION_IDS = NAV_ITEMS.map((n) => n.id);

export default function Compass({
  soundOn,
  toggleSound,
}: {
  soundOn: boolean;
  toggleSound: () => void;
}) {
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState("hero");

  // The theme itself lives on <html data-theme>, set before first paint. This state
  // exists only so the button can show the right glyph and label — nothing else in the
  // tree re-renders when the sky changes.
  const [theme, setTheme] = useState<ThemeName>("day");

  useEffect(() => {
    const current = document.documentElement.dataset.theme;
    // Sync React with what the pre-paint script already decided. This cannot cause a
    // visible change — the DOM attribute is already correct.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(current === "night" ? "night" : "day");
  }, []);

  const toggleTheme = useCallback(() => {
    // The attribute is the source of truth, so read it rather than React state — and
    // apply outside the updater, which must stay free of side effects.
    const next: ThemeName =
      document.documentElement.dataset.theme === "night" ? "day" : "night";
    applyTheme(next);
    setTheme(next);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isCompact = latest > 70;
    setCompact((prev) => (prev === isCompact ? prev : isCompact));
  });

  useEffect(() => {
    const sections = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActive((prev) => (prev === id ? prev : id));
          }
        }
      },
      { rootMargin: "-45% 0px -55% 0px" },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      id="compass"
      animate={{
        scale: compact ? 0.93 : 1,
        padding: compact ? "5px 7px" : "7px 9px",
        boxShadow: compact
          ? "0 10px 30px rgba(70,66,120,.24)"
          : "0 12px 34px rgba(70,66,120,.16)",
      }}
      transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ x: "-50%" }}
      className="fixed top-5 left-1/2 z-60 flex items-center gap-1 rounded-full bg-(--glass) border border-(--glass-brd) backdrop-blur-[20px] backdrop-saturate-[1.35] max-w-[94vw] [transition:background_.8s_ease,border-color_.8s_ease]"
    >
      <span className="font-[family-name:var(--font-caveat),cursive] font-bold text-[22px] leading-none pr-2.5 pl-2 text-(--ink) whitespace-nowrap">
        ✦&nbsp;Bagaskara
      </span>
      <span className="w-px h-4.5 bg-(--glass-brd) mx-1" />

      {NAV_ITEMS.map((n) => (
        <motion.a
          key={n.id}
          href={`#${n.id}`}
          aria-current={active === n.id ? "true" : undefined}
          whileHover={{ y: -1 }}
          className={`no-underline px-3 py-1.5 rounded-full text-[13px] tracking-[0.2px] cursor-pointer whitespace-nowrap [transition:background_.35s_ease,color_.35s_ease] ${
            active === n.id
              ? "font-bold text-(--ink) bg-white/50"
              : "font-medium text-(--ink-soft) bg-transparent"
          }`}
        >
          {n.label}
        </motion.a>
      ))}

      <button
        onClick={toggleSound}
        title={soundOn ? "Mute the sky" : "Play ambient sound"}
        aria-label={soundOn ? "Mute the sky" : "Play ambient sound"}
        className="w-8.5 h-8.5 border-0 rounded-full cursor-pointer text-sm flex items-center justify-center text-(--ink) bg-(--glass-brd)"
      >
        <span className="relative flex items-center justify-center w-full h-full">
          <span className="text-sm leading-none">♪</span>
          <span
            className={`absolute left-1/2 top-1/2 w-6.5 h-0.5 rounded-xs bg-(--ink) -translate-x-1/2 -translate-y-1/2 -rotate-45 [transition:opacity_.3s_ease] ${
              soundOn ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute -inset-1.25 rounded-full border-[1.5px] border-[#8fd6a8] animate-[haloPulse_2.6s_ease-in-out_infinite] [transition:opacity_.4s_ease] ${
              soundOn ? "opacity-100" : "opacity-0"
            }`}
          />
        </span>
      </button>

      <motion.button
        onClick={toggleTheme}
        title="Shift the sky"
        aria-label={
          theme === "night" ? "Switch to day sky" : "Switch to night sky"
        }
        whileHover={{ rotate: 28, scale: 1.08 }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        className="w-8.5 h-8.5 border-0 rounded-full cursor-pointer text-[15px] flex items-center justify-center text-(--ink) bg-(--glass-brd)"
      >
        {theme === "night" ? "☀" : "☾"}
      </motion.button>
    </motion.nav>
  );
}
