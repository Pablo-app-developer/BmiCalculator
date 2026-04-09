import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://tucalculadorimc.lat", // <- cambia por tu dominio
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
