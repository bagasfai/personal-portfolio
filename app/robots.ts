import type { MetadataRoute } from "next";

/** Generates /robots.txt. Distinct from the `metadata.robots` meta tags in layout.tsx. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://bagaskara.com/sitemap.xml",
  };
}
