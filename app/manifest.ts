import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bagaskara - Floating Sky Portfolio",
    short_name: "Bagaskara",
    description:
      "An immersive, single-page developer portfolio — fly through seven floating islands of hero, about, skills, experience, projects, blog, and contact.",
    start_url: "/",
    display: "standalone",
    background_color: "#eef1ff",
    theme_color: "#cfe0ff",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
