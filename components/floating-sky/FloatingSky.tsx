"use client";

import { useEffect, useMemo, useState } from "react";
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
import {
  createClouds,
  createParticles,
  createStars,
  createBirds,
} from "@/lib/decor";
import { INTRO_STORAGE_KEY, INTRO_TOTAL_MS } from "./introTiming";
import "./floating-sky.css";

export default function FloatingSky() {
  const decor = useMemo(
    () => ({
      clouds: createClouds(),
      particles: createParticles(),
      stars: createStars(),
      birds: createBirds(),
    }),
    [],
  );
  const prefersReduced = useReducedMotion();

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

  // Rendered on the server so the curtain is the first thing painted. Server and client
  // initial renders both produce `true`, so the trees match and hydration is clean. The
  // skip decision is made before paint by the inline script in app/layout.tsx.
  const [showIntro, setShowIntro] = useState(true);
  const [heroEntered, setHeroEntered] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset.skyIntro === "0") {
      // The inline script in app/layout.tsx already decided to skip, and CSS has hidden
      // the curtain since before first paint. These calls only sync React with the DOM,
      // so they cannot cause a visible change.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowIntro(false);
      setHeroEntered(true);
      return;
    }
    const t = setTimeout(() => {
      setShowIntro(false);
      setHeroEntered(true);
      try {
        sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
      } catch {
        // storage unavailable — intro will simply replay next load
      }
    }, INTRO_TOTAL_MS);
    return () => clearTimeout(t);
  }, []);

  const skyValue = useMemo(
    () => ({ sx, sy, cx, cy, reducedMotion: Boolean(prefersReduced) }),
    [sx, sy, cx, cy, prefersReduced],
  );

  return (
    <div
      className="relative w-full min-h-screen font-[family-name:var(--font-manrope),Manrope,system-ui,sans-serif] text-(--ink) bg-(--sky-c) overflow-x-hidden [transition:color_.8s_ease,background_.8s_ease]"
    >
      <AnimatePresence>
        {showIntro && <IntroCurtain />}
      </AnimatePresence>

      <SkyProvider value={skyValue}>
        <Atmosphere decor={decor} />
        <Compass soundOn={soundOn} toggleSound={toggleSound} />
        <main id="content">
          <Hero entered={heroEntered} />
          <About />
          <Skills />
          <Projects />
          <Path />
          <Blog />
          <Contact />
        </main>
      </SkyProvider>
      <Footer />
    </div>
  );
}
