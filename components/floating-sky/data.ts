export interface Cloud {
  top: string;
  w: string;
  h: string;
  dur: string;
  delay: string;
  op: string;
  blur: string;
  anim: "driftX" | "driftXrev";
}

export interface Particle {
  left: string;
  top: string;
  s: string;
  dur: string;
  delay: string;
}

export interface Star {
  left: string;
  top: string;
  s: string;
  dur: string;
  delay: string;
}

export interface Bird {
  top: string;
  dur: string;
  delay: string;
  sc: string;
  flap: string;
}

export interface Leaf {
  left: string;
  top: string;
  sz: string;
  szb: string;
  dur: string;
  delay: string;
  hue: string;
}

export interface Paper {
  left: string;
  top: string;
  w: string;
  h: string;
  dur: string;
  delay: string;
}

export interface Lantern {
  left: string;
  top: string;
  size: string;
  string: string;
  float: string;
  delay: string;
  sway: string;
  glow: string;
}

export interface Crystal {
  i: number;
  name: string;
  years: string;
  c1: string;
  c2: string;
  glow: string;
  desc: string;
  x: string;
  y: string;
  size: string;
  half: string;
  bob: string;
  spin: string;
  delay: string;
}

export interface ProjectBadge {
  name: string;
  orbit: string;
  dur: string;
  delay: string;
}

export interface Project {
  i: number;
  name: string;
  glyph: string;
  tag: string;
  desc: string;
  c1: string;
  c2: string;
  glow: string;
  badges: ProjectBadge[];
  year: string;
  align: "end" | "center";
  lift: string;
  float: string;
  delay: string;
  demoLink: string | null;
  githubLink: string | null;
}

export interface Step {
  i: number;
  period: string;
  place: string;
  role: string;
  desc: string;
  tags: string[];
  accent: string;
  glyph: string;
  justify: "flex-start" | "flex-end";
  float: string;
  delay: string;
}

export interface Article {
  title: string;
  excerpt: string;
  topic: string;
  date: string;
  read: string;
  glyph: string;
  c1: string;
  c2: string;
}

export interface NavItem {
  id: string;
  label: string;
}

const R = (a: number, b: number) => a + Math.random() * (b - a);

export interface AtmosphereDecor {
  clouds: Cloud[];
  particles: Particle[];
  stars: Star[];
  birds: Bird[];
  leaves: Leaf[];
}

export function createAtmosphereDecor(): AtmosphereDecor {
  const clouds: Cloud[] = [];
  for (let i = 0; i < 8; i++) {
    const w = R(230, 470);
    clouds.push({
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

  const particles: Particle[] = [];
  for (let i = 0; i < 46; i++) {
    const s = R(2, 6);
    particles.push({
      left: R(0, 100).toFixed(1) + "%",
      top: R(4, 100).toFixed(1) + "%",
      s: s.toFixed(1) + "px",
      dur: R(9, 22).toFixed(1) + "s",
      delay: (-R(0, 22)).toFixed(1) + "s",
    });
  }

  const stars: Star[] = [];
  for (let i = 0; i < 70; i++) {
    const s = R(1, 2.6);
    stars.push({
      left: R(0, 100).toFixed(1) + "%",
      top: R(0, 72).toFixed(1) + "%",
      s: s.toFixed(1) + "px",
      dur: R(2.5, 6).toFixed(1) + "s",
      delay: (-R(0, 6)).toFixed(1) + "s",
    });
  }

  const birds: Bird[] = [];
  for (let i = 0; i < 4; i++) {
    birds.push({
      top: R(12, 46).toFixed(0) + "%",
      dur: R(40, 74).toFixed(0) + "s",
      delay: (-R(0, 64)).toFixed(0) + "s",
      sc: R(0.45, 0.8).toFixed(2),
      flap: R(0.5, 0.9).toFixed(2) + "s",
    });
  }

  const leaves: Leaf[] = [];
  for (let i = 0; i < 10; i++) {
    const sz = R(9, 17);
    leaves.push({
      left: R(2, 96).toFixed(1) + "%",
      top: R(6, 92).toFixed(1) + "%",
      sz: sz.toFixed(0) + "px",
      szb: (sz * 1.3).toFixed(0) + "px",
      dur: R(10, 20).toFixed(1) + "s",
      delay: (-R(0, 18)).toFixed(1) + "s",
      hue: R(96, 156).toFixed(0),
    });
  }

  return { clouds, particles, stars, birds, leaves };
}

export interface LibraryDecor {
  papers: Paper[];
  lanterns: Lantern[];
}

export function createLibraryDecor(): LibraryDecor {
  const papers: Paper[] = [];
  for (let i = 0; i < 7; i++) {
    const w = R(26, 44);
    papers.push({
      left: R(3, 94).toFixed(1) + "%",
      top: R(6, 88).toFixed(1) + "%",
      w: w.toFixed(0) + "px",
      h: (w * 1.3).toFixed(0) + "px",
      dur: R(9, 18).toFixed(1) + "s",
      delay: (-R(0, 16)).toFixed(1) + "s",
    });
  }

  const lanternPositions: [string, string][] = [
    ["8%", "16%"],
    ["86%", "12%"],
    ["16%", "68%"],
    ["80%", "62%"],
    ["48%", "8%"],
  ];
  const lanterns: Lantern[] = lanternPositions.map(([left, top], i) => ({
    left,
    top,
    size: 22 + (i % 3) * 6 + "px",
    string: 30 + (i % 4) * 18 + "px",
    float: (4 + (i % 3) * 0.9).toFixed(1) + "s",
    delay: (-(i * 0.7)).toFixed(1) + "s",
    sway: (5 + (i % 3)).toFixed(1) + "s",
    glow: (3 + (i % 3) * 0.6).toFixed(1) + "s",
  }));

  return { papers, lanterns };
}

const CRYSTAL_BASE = [
  {
    name: "React",
    years: "5 yrs",
    c1: "#bfe6ff",
    c2: "#4aa3d6",
    glow: "rgba(120,200,255,.4)",
    desc: "Interfaces that feel weightless — hooks, suspense, and animation woven together.",
  },
  {
    name: "TypeScript",
    years: "5 yrs",
    c1: "#c3d4ff",
    c2: "#4f6fd6",
    glow: "rgba(120,150,255,.4)",
    desc: "Types as a safety net you forget is there. Fewer surprises, calmer refactors.",
  },
  {
    name: "Node.js",
    years: "5 yrs",
    c1: "#cdeecb",
    c2: "#5aa06e",
    glow: "rgba(140,210,150,.4)",
    desc: "APIs, streams, and services that stay quiet under load.",
  },
  {
    name: "Next.js",
    years: "4 yrs",
    c1: "#e6e2f5",
    c2: "#6a6ea6",
    glow: "rgba(170,160,220,.4)",
    desc: "Rendering on the edge — fast first paint, gentle hydration.",
  },
  {
    name: "PostgreSQL",
    years: "4 yrs",
    c1: "#c9d9ff",
    c2: "#3f63c8",
    glow: "rgba(120,160,255,.38)",
    desc: "Relational thinking, thoughtful indexes, data that ages well.",
  },
  {
    name: "Python",
    years: "4 yrs",
    c1: "#ffe3bf",
    c2: "#d69a4a",
    glow: "rgba(255,200,130,.4)",
    desc: "Scripts, pipelines, and the occasional model — glue that holds systems together.",
  },
  {
    name: "GraphQL",
    years: "3 yrs",
    c1: "#ffcfe4",
    c2: "#d64f96",
    glow: "rgba(255,150,200,.38)",
    desc: "One graph to ask anything — schemas that stay honest.",
  },
  {
    name: "AWS",
    years: "4 yrs",
    c1: "#ffd9c0",
    c2: "#d67a4a",
    glow: "rgba(255,170,120,.38)",
    desc: "Infrastructure as calm weather — provisioned, observed, forgotten.",
  },
  {
    name: "Docker",
    years: "4 yrs",
    c1: "#c5e8ff",
    c2: "#4a90d6",
    glow: "rgba(120,190,255,.38)",
    desc: "Ships that always sail the same. Reproducible from laptop to cloud.",
  },
  {
    name: "Tailwind",
    years: "3 yrs",
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

const PROJECT_BASE = [
  {
    name: "Project One",
    glyph: "✦",
    tag: "WEB APP",
    desc: "A placeholder for something you built — swap in the story, the stack, and the links when you decide.",
    c1: "#a9c2ff",
    c2: "#6f7fd6",
    glow: "rgba(140,160,255,.4)",
    badges: ["React", "Node", "Postgres"],
    demoLink: "https://example.com",
    githubLink: "https://example.com",
  },
  {
    name: "Project Two",
    glyph: "❋",
    tag: "PLATFORM",
    desc: "Room for a favourite build. Describe the problem, the shape of the solution, and what felt good about it.",
    c1: "#a8e6c8",
    c2: "#4fa880",
    glow: "rgba(120,220,170,.4)",
    badges: ["Next.js", "GraphQL"],
    demoLink: "https://example.com",
    githubLink: "https://example.com",
  },
  {
    name: "Project Three",
    glyph: "✺",
    tag: "MOBILE",
    desc: "Another empty tower waiting for a real project. Keep the copy warm and human — say what it feels like to use.",
    c1: "#ffc9dd",
    c2: "#d66f9a",
    glow: "rgba(255,150,195,.4)",
    badges: ["React Native", "AWS", "TS"],
    githubLink: "https://example.com",
  },
  {
    name: "Project Four",
    glyph: "❂",
    tag: "TOOLING",
    desc: "A slot for a tool, library, or experiment. Placeholder text you can replace whenever inspiration lands.",
    c1: "#ffd9b8",
    c2: "#d69a4a",
    glow: "rgba(255,190,120,.4)",
    badges: ["Python", "Docker"],
    demoLink: "https://example.com",
    githubLink: "https://example.com",
  },
  {
    name: "Project Five",
    glyph: "✧",
    tag: "DESIGN",
    desc: "Reserved for a design-heavy build. Talk about the details you sweated and the calm you were chasing.",
    c1: "#d8ccff",
    c2: "#8a76d6",
    glow: "rgba(170,150,240,.4)",
    badges: ["Figma", "Framer"],
    githubLink: "https://example.com",
  },
  {
    name: "Project Six",
    glyph: "❈",
    tag: "OPEN SOURCE",
    desc: "One more placeholder tower. Add a project you gave back to the community, or delete it — your city, your rules.",
    c1: "#bfe6ff",
    c2: "#4a90d6",
    glow: "rgba(120,190,255,.4)",
    badges: ["Rust", "WASM"],
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

export function getArticles(): Article[] {
  return [
    {
      title: "On building software that feels like weather",
      excerpt:
        "A placeholder essay on calm interfaces — present, gentle, easy to be around.",
      topic: "CRAFT",
      date: "Jun 2026",
      read: "6 min",
      glyph: "❋",
      c1: "#a9c2ff",
      c2: "#6f7fd6",
    },
    {
      title: "The quiet art of the empty state",
      excerpt:
        "Room for your thoughts on the moments before a screen fills with data.",
      topic: "DESIGN",
      date: "Apr 2026",
      read: "4 min",
      glyph: "✦",
      c1: "#a8e6c8",
      c2: "#4fa880",
    },
    {
      title: "Notes from the middle of the stack",
      excerpt:
        "A placeholder piece about the plumbing nobody sees but everybody feels.",
      topic: "ENGINEERING",
      date: "Feb 2026",
      read: "8 min",
      glyph: "✺",
      c1: "#ffc9dd",
      c2: "#d66f9a",
    },
  ];
}

export const NAV_ITEMS: NavItem[] = [
  { id: "hero", label: "Home" },
  { id: "my-story", label: "My Story" },
  { id: "workshop", label: "Workshop" },
  { id: "creations", label: "Creations" },
  { id: "my-journey", label: "My Journey" },
  { id: "journal", label: "Journal" },
  { id: "horizon", label: "Horizon" },
];

export const THEME_DAY = {
  "--sky-a": "#cfe0ff",
  "--sky-b": "#eef1ff",
  "--sky-c": "#fff4ec",
  "--ink": "#3b3e63",
  "--ink-soft": "#6a6d90",
  "--glass": "rgba(255,255,255,.55)",
  "--glass-brd": "rgba(255,255,255,.78)",
  "--blob-lav": "#c9d4ff",
  "--blob-blue": "#bfe0ff",
  "--blob-peach": "#ffd9bf",
  "--blob-mint": "#c7ecd8",
  "--blob-blush": "#ffd0e0",
  "--star-op": "0",
  "--ray-op": ".5",
  "--grass1": "#c6ecc9",
  "--grass2": "#82d19a",
  "--rock1": "#c3b2e0",
  "--rock2": "#7a6ea6",
  "--shadow": "rgba(90,80,130,.20)",
  "--sunset": "rgba(255,196,150,.55)",
  "--field": "rgba(255,255,255,.55)",
} as const;

export const THEME_NIGHT = {
  "--sky-a": "#131736",
  "--sky-b": "#222750",
  "--sky-c": "#2f2b57",
  "--ink": "#eef1ff",
  "--ink-soft": "#b7bbe6",
  "--glass": "rgba(42,48,96,.42)",
  "--glass-brd": "rgba(180,190,255,.32)",
  "--blob-lav": "#6a76c8",
  "--blob-blue": "#5a86c8",
  "--blob-peach": "#c58a6a",
  "--blob-mint": "#5aa088",
  "--blob-blush": "#c56f96",
  "--star-op": "1",
  "--ray-op": ".28",
  "--grass1": "#5c8f74",
  "--grass2": "#3f6a56",
  "--rock1": "#453f6b",
  "--rock2": "#28244c",
  "--shadow": "rgba(0,0,15,.45)",
  "--sunset": "rgba(210,130,150,.4)",
  "--field": "rgba(30,34,70,.5)",
} as const;
