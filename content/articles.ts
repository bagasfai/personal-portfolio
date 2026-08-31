import type { Article } from "@/lib/types";

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
