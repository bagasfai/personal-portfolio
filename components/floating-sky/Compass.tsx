"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { NAV_ITEMS } from "./data";

const SECTION_IDS = NAV_ITEMS.map((n) => n.id);

export default function Compass({
  night,
  toggleNight,
  soundOn,
  toggleSound,
}: {
  night: boolean;
  toggleNight: () => void;
  soundOn: boolean;
  toggleSound: () => void;
}) {
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState("hero");

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isCompact = latest > 70;
    setCompact((prev) => (prev === isCompact ? prev : isCompact));

    let next = "hero";
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45) {
        next = id;
      }
    }
    setActive((prev) => (prev === next ? prev : next));
  });

  return (
    <motion.nav
      id="compass"
      animate={{
        scale: compact ? 0.93 : 1,
        padding: compact ? "5px 7px" : "7px 9px",
        boxShadow: compact ? "0 10px 30px rgba(70,66,120,.24)" : "0 12px 34px rgba(70,66,120,.16)",
      }}
      transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ x: "-50%" }}
      className="fixed top-5 left-1/2 z-[60] flex items-center gap-1 rounded-full bg-[var(--glass)] border border-[var(--glass-brd)] backdrop-blur-[20px] backdrop-saturate-[1.35] max-w-[94vw] [transition:background_.8s_ease,border-color_.8s_ease]"
    >
      <span className="font-[family-name:var(--font-caveat),cursive] font-bold text-[22px] leading-none pr-2.5 pl-2 text-[var(--ink)] whitespace-nowrap">
        ✦&nbsp;Bagaskara
      </span>
      <span className="w-px h-[18px] bg-[var(--glass-brd)] mx-1" />

      {NAV_ITEMS.map((n) => (
        <motion.a
          key={n.id}
          href={`#${n.id}`}
          whileHover={{ y: -1 }}
          className={`no-underline px-3 py-1.5 rounded-full text-[13px] tracking-[0.2px] cursor-pointer whitespace-nowrap [transition:background_.35s_ease,color_.35s_ease] ${
            active === n.id ? "font-bold text-[var(--ink)] bg-white/50" : "font-medium text-[var(--ink-soft)] bg-transparent"
          }`}
        >
          {n.label}
        </motion.a>
      ))}

      <button
        onClick={toggleSound}
        title={soundOn ? "Mute the sky" : "Play ambient sound"}
        className="w-[34px] h-[34px] border-0 rounded-full cursor-pointer text-sm flex items-center justify-center text-[var(--ink)] bg-[var(--glass-brd)]"
      >
        <span className="relative flex items-center justify-center w-full h-full">
          <span className="text-sm leading-none">♪</span>
          <span
            className={`absolute left-1/2 top-1/2 w-[26px] h-[2px] rounded-[2px] bg-[var(--ink)] -translate-x-1/2 -translate-y-1/2 -rotate-45 [transition:opacity_.3s_ease] ${
              soundOn ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute -inset-[5px] rounded-full border-[1.5px] border-[#8fd6a8] [animation:haloPulse_2.6s_ease-in-out_infinite] [transition:opacity_.4s_ease] ${
              soundOn ? "opacity-100" : "opacity-0"
            }`}
          />
        </span>
      </button>

      <motion.button
        onClick={toggleNight}
        title="Shift the sky"
        whileHover={{ rotate: 28, scale: 1.08 }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        className="w-[34px] h-[34px] border-0 rounded-full cursor-pointer text-[15px] flex items-center justify-center text-[var(--ink)] bg-[var(--glass-brd)]"
      >
        {night ? "☀" : "☾"}
      </motion.button>
    </motion.nav>
  );
}
