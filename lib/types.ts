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
