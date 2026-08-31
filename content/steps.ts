import type { Step } from "@/lib/types";

const STEP_BASE = [
  {
    period: "Nov 2025 — NOW · 2026",
    place: "Herca Group",
    role: "Full-Stack Developer",
    desc: "Now: an HR platform where mobile attendance meets face recognition and GPS, payroll runs end-to-end, and deployment lives in Docker. Alongside it — an ERP built in Yii to keep sales, warehouses, and finances in sync, and a multi-tenant billing system for aesthetic clinics handling POS, inventory, and commissions across branches.",
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
    desc: "Where the stride began — breaking HR and asset management into microservices, shipping a React Native app for real-time attendance, and building an e-commerce platform's storefront and dashboards in Livewire and Alpine. In between, a remuneration app that turned payroll and cash advances into something people could actually trust.",
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
