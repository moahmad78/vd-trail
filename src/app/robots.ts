import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/lead/", "/private/", "/admin/", "/adminlead/"],
    },
    sitemap: "https://www.voometdesign.com/sitemap.xml",
  };
}
