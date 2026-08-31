import type { Cloud, Particle, Star, Bird, Leaf, Paper, Lantern } from "./types";

// Deterministic PRNG. The route is statically prerendered, so decor generated with
// Math.random() would be frozen at build time in the HTML but regenerated differently on
// every client hydration — a guaranteed mismatch across ~190 elements. Each generator
// seeds its own stream so callers can build only what they need without the output
// depending on which other generators ran first.
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ranger(seed: number) {
  const rng = mulberry32(seed);
  return (a: number, b: number) => a + rng() * (b - a);
}

const CLOUD_SEED = 0x5eed;
const PARTICLE_SEED = 0x9a1e;
const STAR_SEED = 0x2c7b;
const BIRD_SEED = 0x41d3;
const LEAF_SEED = 0x7f60;
const PAPER_SEED = 0xb00c;

export function createClouds(): Cloud[] {
  const R = ranger(CLOUD_SEED);
  const out: Cloud[] = [];
  for (let i = 0; i < 8; i++) {
    const w = R(230, 470);
    out.push({
      top: R(2, 82).toFixed(1) + "%",
      w: w.toFixed(0) + "px",
      h: (w * 0.42).toFixed(0) + "px",
      dur: R(64, 150).toFixed(0) + "s",
      delay: (-R(0, 150)).toFixed(0) + "s",
      op: R(0.5, 0.92).toFixed(2),
      blur: R(3, 9).toFixed(0) + "px",
      anim: i % 2 === 0 ? "driftX" : "driftXrev",
    });
  }
  return out;
}

export function createParticles(): Particle[] {
  const R = ranger(PARTICLE_SEED);
  const out: Particle[] = [];
  for (let i = 0; i < 46; i++) {
    const s = R(2, 6);
    out.push({
      left: R(0, 100).toFixed(1) + "%",
      top: R(4, 100).toFixed(1) + "%",
      s: s.toFixed(1) + "px",
      dur: R(9, 22).toFixed(1) + "s",
      delay: (-R(0, 22)).toFixed(1) + "s",
    });
  }
  return out;
}

export function createStars(): Star[] {
  const R = ranger(STAR_SEED);
  const out: Star[] = [];
  for (let i = 0; i < 70; i++) {
    const s = R(1, 2.6);
    out.push({
      left: R(0, 100).toFixed(1) + "%",
      top: R(0, 72).toFixed(1) + "%",
      s: s.toFixed(1) + "px",
      dur: R(2.5, 6).toFixed(1) + "s",
      delay: (-R(0, 6)).toFixed(1) + "s",
    });
  }
  return out;
}

export function createBirds(): Bird[] {
  const R = ranger(BIRD_SEED);
  const out: Bird[] = [];
  for (let i = 0; i < 4; i++) {
    out.push({
      top: R(12, 46).toFixed(0) + "%",
      dur: R(40, 74).toFixed(0) + "s",
      delay: (-R(0, 64)).toFixed(0) + "s",
      sc: R(0.45, 0.8).toFixed(2),
      flap: R(0.5, 0.9).toFixed(2) + "s",
    });
  }
  return out;
}

export function createLeaves(): Leaf[] {
  const R = ranger(LEAF_SEED);
  const out: Leaf[] = [];
  for (let i = 0; i < 10; i++) {
    const sz = R(9, 17);
    out.push({
      left: R(2, 96).toFixed(1) + "%",
      top: R(6, 92).toFixed(1) + "%",
      sz: sz.toFixed(0) + "px",
      szb: (sz * 1.3).toFixed(0) + "px",
      dur: R(10, 20).toFixed(1) + "s",
      delay: (-R(0, 18)).toFixed(1) + "s",
      hue: R(96, 156).toFixed(0),
    });
  }
  return out;
}

export function createPapers(): Paper[] {
  const R = ranger(PAPER_SEED);
  const out: Paper[] = [];
  for (let i = 0; i < 7; i++) {
    const w = R(26, 44);
    out.push({
      left: R(3, 94).toFixed(1) + "%",
      top: R(6, 88).toFixed(1) + "%",
      w: w.toFixed(0) + "px",
      h: (w * 1.3).toFixed(0) + "px",
      dur: R(9, 18).toFixed(1) + "s",
      delay: (-R(0, 16)).toFixed(1) + "s",
    });
  }
  return out;
}

// Lanterns are hand-placed, not random — no seed needed.
export function createLanterns(): Lantern[] {
  const positions: [string, string][] = [
    ["8%", "16%"],
    ["86%", "12%"],
    ["16%", "68%"],
    ["80%", "62%"],
    ["48%", "8%"],
  ];
  return positions.map(([left, top], i) => ({
    left,
    top,
    size: 22 + (i % 3) * 6 + "px",
    string: 30 + (i % 4) * 18 + "px",
    float: (4 + (i % 3) * 0.9).toFixed(1) + "s",
    delay: (-(i * 0.7)).toFixed(1) + "s",
    sway: (5 + (i % 3)).toFixed(1) + "s",
    glow: (3 + (i % 3) * 0.6).toFixed(1) + "s",
  }));
}
