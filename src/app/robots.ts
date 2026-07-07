import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/lead/", "/private/"],
    },
    sitemap: "https://voometdesign.com/sitemap.xml",
  };
}
