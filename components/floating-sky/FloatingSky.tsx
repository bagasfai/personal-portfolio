"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { SkyProvider } from "./SkyContext";
import { useAmbientSound } from "./useAmbientSound";
import Atmosphere from "./Atmosphere";
import Compass from "./Compass";
import IntroCurtain from "./IntroCurtain";
import Hero from "./Hero";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Path from "./Path";
import Blog from "./Blog";
import Contact from "./Contact";
import Footer from "./Footer";
import { createAtmosphereDecor, THEME_DAY, THEME_NIGHT } from "./data";
import "./floating-sky.css";

export default function FloatingSky() {
  const decor = useMemo(() => createAtmosphereDecor(), []);
  const prefersReduced = useReducedMotion();

  const [night, setNight] = useState(false);
  const toggleNight = useCallback(() => setNight((n) => !n), []);

  const { soundOn, toggleSound } = useAmbientSound();

  // pointer motion values — never trigger a re-render
  const mvx = useMotionValue(0);
  const mvy = useMotionValue(0);
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const sx = useSpring(mvx, { stiffness: 60, damping: 20, mass: 0.6 });
  const sy = useSpring(mvy, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (prefersReduced) return;
    const onMove = (e: PointerEvent) => {
      mvx.set(e.clientX / window.innerWidth - 0.5);
      mvy.set(e.clientY / window.innerHeight - 0.5);
      cx.set(e.clientX);
      cy.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [prefersReduced, mvx, mvy, cx, cy]);

  const [showIntro, setShowIntro] = useState(false);
  const [heroEntered, setHeroEntered] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("sky-intro") === "1";
    } catch {
      seen = false;
    }
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduce) {
      // One-time read of sessionStorage/matchMedia on mount — can't run during
      // render (SSR has no browser APIs), so this must live in an effect.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHeroEntered(true);
      return;
    }
    setShowIntro(true);
    const t = setTimeout(() => {
      setShowIntro(false);
      setHeroEntered(true);
      try {
        sessionStorage.setItem("sky-intro", "1");
      } catch {
        // storage unavailable — intro will simply replay next load
      }
    }, 2090);
    return () => clearTimeout(t);
  }, []);

  const skyValue = useMemo(
    () => ({ sx, sy, cx, cy, night, reducedMotion: Boolean(prefersReduced) }),
    [sx, sy, cx, cy, night, prefersReduced],
  );

  const theme = night ? THEME_NIGHT : THEME_DAY;

  return (
    <div
      style={{ ...theme } as React.CSSProperties}
      className="relative w-full min-h-screen font-[family-name:var(--font-manrope),Manrope,system-ui,sans-serif] text-(--ink) bg-(--sky-c) overflow-x-hidden [transition:color_.8s_ease,background_.8s_ease]"
    >
      <AnimatePresence>
        {showIntro && <IntroCurtain visible={showIntro} />}
      </AnimatePresence>

      <SkyProvider value={skyValue}>
        <Atmosphere decor={decor} />
        <Compass
          night={night}
          toggleNight={toggleNight}
          soundOn={soundOn}
          toggleSound={toggleSound}
        />
        <Hero entered={heroEntered} />
        <About />
        <Skills />
        <Projects />
        <Path />
        <Blog />
        <Contact />
      </SkyProvider>
      <Footer />
    </div>
  );
}
