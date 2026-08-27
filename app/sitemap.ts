import type { MetadataRoute } from "next";

/**
 * One URL. The site is a single page and search engines index the page, not its
 * fragments, so listing the seven section anchors would add nothing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://bagaskara.com",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
