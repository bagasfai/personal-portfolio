import type { Project } from "@/lib/types";

const PROJECT_BASE: {
  name: string;
  glyph: string;
  image: string;
  tag: string;
  desc: string;
  c1: string;
  c2: string;
  glow: string;
  badges: string[];
  demoLink?: string;
  githubLink?: string;
}[] = [
  {
    name: "Cargo",
    glyph: "✥",
    image: "/projects/cargo.png",
    tag: "PLATFORM",
    desc: "A logistics platform for a cargo expedition company — a quiet quote-checker and blog out front, a full dashboard in back for managing orders, pricing by province down to village, and content.",
    c1: "#ffb199",
    c2: "#c9553f",
    glow: "rgba(255,150,120,.4)",
    badges: ["Laravel", "MySQL", "Alpine.js", "Tailwind"],
    githubLink: "https://github.com/bagasfai/cargo",
  },
  {
    name: "Volunera",
    glyph: "❋",
    image: "/projects/volunera.png",
    tag: "PLATFORM",
    desc: "A place where a kid stuck on algebra gets matched with a volunteer who actually wants to explain it. Book a free slot, hop on a call, done — no payment screen, no sales funnel, just a fox mascot and a calendar.",
    c1: "#fde3c4",
    c2: "#1f6f5c",
    glow: "rgba(31,111,92,.35)",
    badges: ["Next.js", "Supabase", "Tailwind", "TypeScript"],
    githubLink: "https://github.com/bagasfai/volunera",
  },
  {
    name: "mesoestetic",
    glyph: "❊",
    image: "/projects/mesoestetic.png",
    demoLink: "https://mesoestetic.co.id",
    tag: "MARKETING SITE",
    desc: "A skincare brand's front door, rebuilt for someone who reads product pages on a treatment-room tablet as often as a phone on the bus. Every serum gets its own quiet, clinical-white stage — the products do the talking.",
    c1: "#eae7e1",
    c2: "#4a4540",
    glow: "rgba(80,70,60,.3)",
    badges: ["Next.js", "React", "Tailwind"],
  },
  {
    name: "Herca",
    glyph: "✺",
    image: "/projects/herca.png",
    demoLink: "https://herca.id/",
    tag: "STOREFRONT",
    desc: "Storefront for a medical aesthetics equipment company — browse machines and skincare by category, dig into product pages, drop items in a cart, and send a quotation request straight through. Feels less like a catalog, more like a sales rep who already knows what you're looking for.",
    c1: "#f5dfae",
    c2: "#b8863b",
    glow: "rgba(200,160,80,.4)",
    badges: ["Next.js", "React", "Redux Toolkit", "Tailwind"],
  },
  {
    name: "Antitekor",
    glyph: "✦",
    image: "/projects/antitekor.png",
    demoLink: "https://antitekor.com/",
    tag: "MARKETPLACE",
    desc: "A neighborhood building-supply run turned into a full storefront — search a material, drop it in a cart, get a delivery quote for Bogor, done before your coffee cools. Swap in the story, the stack and the links when you decide.",
    c1: "#ffb3ab",
    c2: "#b0362a",
    glow: "rgba(210,60,45,.4)",
    badges: ["Laravel", "Livewire", "Alpine.js", "Tailwind"],
  },
];

export function getProjects(): Project[] {
  const aligns: Project["align"][] = [
    "end",
    "center",
    "end",
    "center",
    "end",
    "center",
  ];
  const lifts = ["0px", "38px", "14px", "46px", "0px", "30px"];
  return PROJECT_BASE.map((p, i) => ({
    i,
    ...p,
    year: "202" + (2 + (i % 4)),
    align: aligns[i % aligns.length],
    lift: lifts[i % lifts.length],
    float: (5.5 + (i % 4) * 0.8).toFixed(1) + "s",
    delay: (-(i * 0.7)).toFixed(1) + "s",
    badges: p.badges.map((name, j) => ({
      name,
      orbit: 66 + j * 8 + "px",
      dur: 16 + j * 5 + "s",
      delay: -(j * 3.5) + "s",
    })),
    demoLink: p.demoLink ? p.demoLink : null,
    githubLink: p.githubLink ? p.githubLink : null,
  }));
}
