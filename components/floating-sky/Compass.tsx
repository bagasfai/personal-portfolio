"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

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

  // Close the mobile sheet on Escape, outside click, or a jump to the desktop layout.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [menuOpen]);

  const linkClass = (id: string) =>
    active === id
      ? "font-bold text-(--ink) bg-white/50"
      : "font-medium text-(--ink-soft) bg-transparent";

  return (
    <motion.nav
      ref={navRef}
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
      <span className="hidden lg:block w-px h-4.5 bg-(--glass-brd) mx-1" />

      <div className="hidden lg:flex items-center gap-1">
        {NAV_ITEMS.map((n) => (
          <motion.a
            key={n.id}
            href={`#${n.id}`}
            aria-current={active === n.id ? "true" : undefined}
            whileHover={{ y: -1 }}
            className={`no-underline px-3 py-1.5 rounded-full text-[13px] tracking-[0.2px] cursor-pointer whitespace-nowrap [transition:background_.35s_ease,color_.35s_ease] ${linkClass(n.id)}`}
          >
            {n.label}
          </motion.a>
        ))}
      </div>

      <button
        onClick={toggleSound}
        title={soundOn ? "Mute the sky" : "Play ambient sound"}
        aria-label={soundOn ? "Mute the sky" : "Play ambient sound"}
        className="w-8.5 h-8.5 shrink-0 border-0 rounded-full cursor-pointer text-sm flex items-center justify-center text-(--ink) bg-(--glass-brd)"
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
        onClick={toggleNight}
        title="Shift the sky"
        aria-label={night ? "Switch to day sky" : "Switch to night sky"}
        whileHover={{ rotate: 28, scale: 1.08 }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        className="w-8.5 h-8.5 shrink-0 border-0 rounded-full cursor-pointer text-[15px] flex items-center justify-center text-(--ink) bg-(--glass-brd)"
      >
        {night ? "☀" : "☾"}
      </motion.button>

      <button
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-expanded={menuOpen}
        aria-controls="compass-menu"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        className="lg:hidden w-8.5 h-8.5 shrink-0 border-0 rounded-full cursor-pointer flex items-center justify-center text-(--ink) bg-(--glass-brd)"
      >
        <span className="relative block w-4 h-3">
          <span
            className={`absolute left-0 w-full h-0.5 rounded-xs bg-(--ink) [transition:transform_.3s_ease,top_.3s_ease] ${
              menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 rounded-xs bg-(--ink) [transition:opacity_.2s_ease] ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 w-full h-0.5 rounded-xs bg-(--ink) [transition:transform_.3s_ease,bottom_.3s_ease] ${
              menuOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0"
            }`}
          />
        </span>
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="compass-menu"
            key="compass-menu"
            initial={
              prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.97 }
            }
            animate={
              prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.97 }
            }
            transition={{
              duration: prefersReduced ? 0.15 : 0.32,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            style={{ originY: 0 }}
            className="lg:hidden absolute top-full right-0 mt-2.5 flex flex-col gap-0.5 p-2 min-w-[190px] rounded-3xl border border-(--glass-brd) backdrop-blur-[28px] backdrop-saturate-[1.5] shadow-[0_16px_40px_rgba(70,66,120,.22)] bg-(--glass) [transition:background_.8s_ease,border-color_.8s_ease]"
          >
            {/* Extra glass layers: one --glass pass is too sheer for a panel this
                tall, so page text ghosts through behind the links. */}
            <span
              aria-hidden
              className="absolute inset-0 rounded-[inherit] bg-(--glass) pointer-events-none [transition:background_.8s_ease]"
            />
            <span
              aria-hidden
              className="absolute inset-0 rounded-[inherit] bg-(--glass) pointer-events-none [transition:background_.8s_ease]"
            />
            {NAV_ITEMS.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setMenuOpen(false)}
                aria-current={active === n.id ? "true" : undefined}
                className={`relative no-underline px-4 py-2.5 rounded-full text-sm tracking-[0.2px] cursor-pointer whitespace-nowrap [transition:background_.35s_ease,color_.35s_ease] ${linkClass(n.id)}`}
              >
                {n.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
