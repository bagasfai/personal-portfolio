"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { SkyProvider } from "./SkyContext";
import LazyMotionProvider from "./motion/LazyMotionProvider";
import { useAmbientSound } from "./useAmbientSound";
import Atmosphere from "./atmosphere/Atmosphere";
import Compass from "./Compass";
import IntroCurtain from "./IntroCurtain";
import {
  createClouds,
  createParticles,
  createStars,
  createBirds,
} from "@/lib/decor";
import { INTRO_STORAGE_KEY, INTRO_TOTAL_MS } from "./introTiming";
import "./floating-sky.css";

export default function FloatingSky({
  children,
}: {
  children: React.ReactNode;
}) {
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

  const [showIntro, setShowIntro] = useState(true);
  const [heroEntered, setHeroEntered] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset.skyIntro === "0") {
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
        // 
      }
    }, INTRO_TOTAL_MS);
    return () => clearTimeout(t);
  }, []);

  const skyValue = useMemo(
    () => ({
      sx,
      sy,
      cx,
      cy,
      reducedMotion: Boolean(prefersReduced),
      entered: heroEntered,
    }),
    [sx, sy, cx, cy, prefersReduced, heroEntered],
  );

  return (
    <LazyMotionProvider>
      <div className="relative w-full min-h-screen font-[family-name:var(--font-manrope),Manrope,system-ui,sans-serif] text-(--ink) bg-(--sky-c) overflow-x-hidden [transition:color_.8s_ease,background_.8s_ease]">
        <AnimatePresence>
          {showIntro && <IntroCurtain />}
        </AnimatePresence>

        <SkyProvider value={skyValue}>
          <Atmosphere decor={decor} />
          <Compass soundOn={soundOn} toggleSound={toggleSound} />
          {children}
        </SkyProvider>
      </div>
    </LazyMotionProvider>
  );
}
