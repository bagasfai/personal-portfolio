import type { MetadataRoute } from "next";
import {
  FULL_NAME,
  ROLE,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${FULL_NAME} — ${ROLE}`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#eef1ff",
    theme_color: "#cfe0ff",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
