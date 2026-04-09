import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://calculadora-imc.com/sitemap.xml", // <- cambia por tu dominio
  };
}
