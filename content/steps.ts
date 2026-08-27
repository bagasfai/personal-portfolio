import type { Step } from "@/lib/types";

const STEP_BASE = [
  {
    period: "NOW · 2026",
    place: "Somewhere in the clouds",
    role: "Senior Full-Stack Developer",
    desc: "A placeholder chapter for your current role — what you own, the calm systems you keep aloft, the people you build with.",
    tags: ["Leadership", "React", "Cloud"],
    accent: "#7f8fd6",
    glyph: "✦",
  },
  {
    period: "2023 — 2025",
    place: "A studio you loved",
    role: "Product Engineer",
    desc: "Room to describe a formative role. The messy middle, the shipped things, the details you refused to skip.",
    tags: ["Next.js", "Node", "Design"],
    accent: "#4fa880",
    glyph: "❋",
  },
  {
    period: "2021 — 2023",
    place: "A growing team",
    role: "Full-Stack Developer",
    desc: "Placeholder for the years you found your stride. Swap in the wins and the lessons whenever you like.",
    tags: ["TypeScript", "Postgres"],
    accent: "#d66f9a",
    glyph: "✺",
  },
  {
    period: "2019 — 2021",
    place: "Where it began",
    role: "Junior Developer",
    desc: "The first stone. A gentle note about starting out, the curiosity that carried you, the first thing that shipped.",
    tags: ["JavaScript", "APIs"],
    accent: "#d69a4a",
    glyph: "✧",
  },
];

export function getSteps(): Step[] {
  return STEP_BASE.map((s, i) => ({
    i,
    ...s,
    justify: i % 2 === 0 ? "flex-start" : "flex-end",
    float: (4.5 + (i % 3) * 0.8).toFixed(1) + "s",
    delay: (-(i * 0.6)).toFixed(1) + "s",
  }));
}
