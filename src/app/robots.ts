import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/lead/", "/private/", "/admin/", "/adminlead/"],
    },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
