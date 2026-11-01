import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://amirmohammad-dev.ir";
  const now = new Date();
  return [
    { url: base, lastModified: now },
    { url: `${base}/about`, lastModified: now },
    { url: `${base}/blog`, lastModified: now },
    { url: `${base}/projects`, lastModified: now },
    { url: `${base}/contact`, lastModified: now },
  ];
}
