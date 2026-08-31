import type { Step } from "@/lib/types";

const STEP_BASE = [
  {
    period: "Nov 2025 — NOW · 2026",
    place: "Herca Group",
    role: "Full-Stack Developer",
    desc: "Placeholder for the years you found your stride. Swap in the wins and the lessons whenever you like.",
    tags: [
      "TypeScript",
      "React Native",
      "NextJS",
      "ReactJS",
      "Laravel",
      "PHP",
      "Yii2",
      "Docker",
    ],
    accent: "#d66f9a",
    glyph: "✺",
  },
  {
    period: "Oct 2023 — Aug 2025",
    place: "PT Satria Digital Sejahtera",
    role: "Full-Stack Developer",
    desc: "The first stone. A gentle note about starting out, the curiosity that carried you, the first thing that shipped.",
    tags: [
      "JavaScript",
      "APIs",
      "MySQL",
      "PHP",
      "Laravel",
      "ReactJS",
      "InertiaJS",
      "Livewire",
      "TailwindCSS",
      "AlpineJS",
      "CodeIgniter",
      "JQuery",
    ],
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
