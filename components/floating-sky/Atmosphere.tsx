"use client";

import { useEffect, useState } from "react";
import { motion, useTransform } from "motion/react";
import { useSky } from "./SkyContext";
import { useParallax } from "./useParallax";
import type { Cloud, Particle, Star, Bird } from "@/lib/types";

function Blob({
  factor,
  className,
  varName,
  anim,
  delay,
  opacity,
  blur,
}: {
  factor: number;
  className: string;
  varName: string;
  anim: string;
  delay: string;
  opacity: number;
  blur: number;
}) {
  const { x, y } = useParallax(factor);
  return (
    <motion.div className={`absolute ${className}`} style={{ x, y }}>
      <div
        style={
          {
            "--blob-color": `var(${varName})`,
            "--blob-blur": `${blur}px`,
            "--blob-opacity": opacity,
            "--blob-anim": `${anim} infinite`,
            "--blob-delay": delay,
          } as React.CSSProperties
        }
        className="w-full h-full rounded-full bg-[radial-gradient(closest-side,var(--blob-color),transparent_70%)] blur-(--blob-blur) opacity-(--blob-opacity) animate-(--blob-anim) [animation-delay:var(--blob-delay)]"
      />
    </motion.div>
  );
}

function CursorGlow() {
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
    <motion.div
      id="cursorglow"
      style={{ transform }}
      className={`absolute left-0 top-0 w-140 h-140 -mt-70 -ml-70 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.5),transparent_62%)] mix-blend-soft-light will-change-transform [transition:opacity_.7s_ease] ${
        active ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}

export default function Atmosphere({
  decor,
  showBirds = true,
}: {
  decor: { clouds: Cloud[]; particles: Particle[]; stars: Star[]; birds: Bird[] };
  showBirds?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--sky-a)_0%,var(--sky-b)_44%,var(--sky-c)_100%)] [transition:background_1s_ease]" />

      <Blob
        factor={1.1}
        className="left-[-6%] top-[6%] w-[42vw] h-[42vw]"
        varName="--blob-lav"
        anim="blobDrift 22s ease-in-out"
        delay="0s"
        opacity={0.75}
        blur={28}
      />
      <Blob
        factor={0.8}
        className="right-[-8%] top-[2%] w-[38vw] h-[38vw]"
        varName="--blob-blue"
        anim="blobDrift 26s ease-in-out"
        delay="2s"
        opacity={0.7}
        blur={30}
      />
      <Blob
        factor={1.4}
        className="right-[6%] bottom-[-6%] w-[40vw] h-[40vw]"
        varName="--blob-peach"
        anim="blobDrift 24s ease-in-out"
        delay="1s"
        opacity={0.72}
        blur={30}
      />
      <Blob
        factor={1.0}
        className="left-[8%] bottom-[-10%] w-[36vw] h-[36vw]"
        varName="--blob-mint"
        anim="blobDrift 28s ease-in-out"
        delay="3s"
        opacity={0.7}
        blur={28}
      />
      <Blob
        factor={1.6}
        className="left-[36%] top-[34%] w-[30vw] h-[30vw]"
        varName="--blob-blush"
        anim="blobDrift 30s ease-in-out"
        delay="1.5s"
        opacity={0.6}
        blur={32}
      />

      {/* light rays */}
      <div className="absolute inset-0 opacity-(--ray-op) [transition:opacity_1s_ease] bg-[conic-gradient(from_200deg_at_76%_-6%,transparent_0deg,rgba(255,255,255,.5)_12deg,transparent_24deg,transparent_40deg,rgba(255,255,255,.4)_52deg,transparent_64deg)] mix-blend-soft-light animate-[rayPulse_12s_ease-in-out_infinite]" />

      {/* stars — twilight only */}
      <div className="absolute inset-0 opacity-(--star-op) [transition:opacity_1.2s_ease]">
        {decor.stars.map((s, i) => (
          <div
            key={i}
            style={
              {
                "--s-left": s.left,
                "--s-top": s.top,
                "--s-size": s.s,
                "--s-anim": `twinkle ${s.dur} ease-in-out ${s.delay} infinite`,
              } as React.CSSProperties
            }
            className="absolute left-(--s-left) top-(--s-top) w-(--s-size) h-(--s-size) rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)] animate-(--s-anim)"
          />
        ))}
      </div>

      {/* distant clouds */}
      {decor.clouds.map((c, i) => (
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
          className="absolute left-0 top-(--c-top) w-(--c-w) h-(--c-h) opacity-(--c-op) blur-(--c-blur) animate-(--c-anim) bg-[radial-gradient(closest-side_at_28%_62%,#fff,transparent_72%),radial-gradient(closest-side_at_50%_44%,#fff,transparent_70%),radial-gradient(closest-side_at_70%_60%,#fff,transparent_72%),radial-gradient(closest-side_at_46%_74%,#fff,transparent_76%)]"
        />
      ))}

      {/* birds */}
      {showBirds &&
        decor.birds.map((b, i) => (
          <div
            key={i}
            style={
              {
                "--bird-top": b.top,
                "--bird-scale": b.sc,
                "--bird-anim": `birdFly ${b.dur} linear ${b.delay} infinite`,
                "--bird-wing-anim": `flap ${b.flap} ease-in-out infinite`,
              } as React.CSSProperties
            }
            className="absolute left-0 top-(--bird-top) animate-(--bird-anim)"
          >
            <div className="relative w-6.5 h-3 scale-(--bird-scale)">
              <div className="absolute left-0 top-1 w-3.5 h-1 rounded-md bg-(--ink) opacity-[0.32] origin-right animate-(--bird-wing-anim)" />
              <div className="absolute right-0 top-1 w-3.5 h-1 rounded-md bg-(--ink) opacity-[0.32] origin-left animate-(--bird-wing-anim)" />
            </div>
          </div>
        ))}

      {/* floating light motes */}
      {decor.particles.map((p, i) => (
        <div
          key={i}
          style={
            {
              "--p-left": p.left,
              "--p-top": p.top,
              "--p-size": p.s,
              "--p-anim": `rise ${p.dur} linear ${p.delay} infinite`,
            } as React.CSSProperties
          }
          className="absolute left-(--p-left) top-(--p-top) w-(--p-size) h-(--p-size) rounded-full bg-[radial-gradient(circle,#fff,rgba(255,255,255,0)_70%)] shadow-[0_0_8px_rgba(255,255,255,0.7)] animate-(--p-anim)"
        />
      ))}

      <CursorGlow />

      {/* grain */}
      <div
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2"/></filter><rect width="100%" height="100%" filter="url(%23n)"/></svg>\')',
        }}
        className="absolute inset-[-20%] opacity-5 mix-blend-overlay animate-[grainShift_8s_steps(6)_infinite]"
      />
    </div>
  );
}