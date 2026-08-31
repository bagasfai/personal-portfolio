import type { Crystal } from "@/lib/types";

const CRYSTAL_BASE = [
  {
    name: "React",
    years: "2 yrs",
    c1: "#bfe6ff",
    c2: "#4aa3d6",
    glow: "rgba(120,200,255,.4)",
    desc: "Interfaces that feel weightless — hooks, suspense, and animation woven together.",
  },
  {
    name: "TypeScript",
    years: "1 yrs",
    c1: "#c3d4ff",
    c2: "#4f6fd6",
    glow: "rgba(120,150,255,.4)",
    desc: "Types as a safety net you forget is there. Fewer surprises, calmer refactors.",
  },
  {
    name: "Node.js",
    years: "2 yrs",
    c1: "#cdeecb",
    c2: "#5aa06e",
    glow: "rgba(140,210,150,.4)",
    desc: "APIs, streams, and services that stay quiet under load.",
  },
  {
    name: "Next.js",
    years: "1 yrs",
    c1: "#e6e2f5",
    c2: "#6a6ea6",
    glow: "rgba(170,160,220,.4)",
    desc: "Rendering on the edge — fast first paint, gentle hydration.",
  },
  {
    name: "PostgreSQL",
    years: "2 yrs",
    c1: "#c9d9ff",
    c2: "#3f63c8",
    glow: "rgba(120,160,255,.38)",
    desc: "Relational thinking, thoughtful indexes, data that ages well.",
  },
  {
    name: "PHP",
    years: "3 yrs",
    c1: "#ffe3bf",
    c2: "#d69a4a",
    glow: "rgba(255,200,130,.4)",
    desc: "Scripts, pipelines, and the occasional model — glue that holds systems together.",
  },
  {
    name: "Docker",
    years: "1 yrs",
    c1: "#c5e8ff",
    c2: "#4a90d6",
    glow: "rgba(120,190,255,.38)",
    desc: "Ships that always sail the same. Reproducible from laptop to cloud.",
  },
  {
    name: "Tailwind",
    years: "2 yrs",
    c1: "#c0f0ea",
    c2: "#3aa89a",
    glow: "rgba(120,220,205,.4)",
    desc: "Design decisions made in the markup — fast, consistent, legible.",
  },
];

export function getCrystals(): Crystal[] {
  const N = CRYSTAL_BASE.length;
  return CRYSTAL_BASE.map((d, i) => {
    const ang = (i / N) * Math.PI * 2 + 0.5;
    const ring = i % 2 === 0 ? 1 : 0.56;
    const rx = 38 * ring,
      ry = 24 * ring;
    const size = 62 + (i % 3) * 12;
    return {
      i,
      ...d,
      x: (50 + Math.cos(ang) * rx).toFixed(1) + "%",
      y: (50 + Math.sin(ang) * ry).toFixed(1) + "%",
      size: size + "px",
      half: -size / 2 + "px",
      bob: (4.5 + (i % 4) * 0.7).toFixed(1) + "s",
      spin: (7 + (i % 5) * 1.6).toFixed(1) + "s",
      delay: (-(i * 0.6)).toFixed(1) + "s",
    };
  });
}
