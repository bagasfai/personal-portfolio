"use client";

import type { Cloud, Particle, Star, Bird } from "@/lib/types";
import BlobField from "./BlobField";
import StarField from "./StarField";
import CloudBank from "./CloudBank";
import BirdFlock from "./BirdFlock";
import MoteDrift from "./MoteDrift";
import CursorGlow from "./CursorGlow";
import Rays from "./Rays";
import Grain from "./Grain";

/**
 * Composes the sky layers and owns the fixed positioning wrapper. Each layer receives
 * only the slice of decor it renders, so a change to one cannot reach another.
 */
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

      <BlobField />
      <Rays />
      <StarField stars={decor.stars} />
      <CloudBank clouds={decor.clouds} />
      {showBirds && <BirdFlock birds={decor.birds} />}
      <MoteDrift particles={decor.particles} />
      <CursorGlow />
      <Grain />
    </div>
  );
}
