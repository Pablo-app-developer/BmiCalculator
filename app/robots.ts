import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://tucalculadorimc.lat/sitemap.xml", // <- cambia por tu dominio
  };
}
