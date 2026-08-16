import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  const commonDisallows = ["/api/", "/lead/", "/private/", "/admin/", "/adminlead/"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: commonDisallows,
      },
      {
        userAgent: "GPTBot", // OpenAI ChatGPT Web Crawler
        allow: "/",
        disallow: commonDisallows,
      },
      {
        userAgent: "ChatGPT-User", // OpenAI Browsing
        allow: "/",
        disallow: commonDisallows,
      },
      {
        userAgent: "PerplexityBot", // Perplexity AI
        allow: "/",
        disallow: commonDisallows,
      },
      {
        userAgent: "Google-Extended", // Google Gemini & AI Overview
        allow: "/",
        disallow: commonDisallows,
      },
      {
        userAgent: "ClaudeBot", // Anthropic Claude
        allow: "/",
        disallow: commonDisallows,
      },
      {
        userAgent: "CCBot", // Common Crawl (LLM datasets)
        allow: "/",
        disallow: commonDisallows,
      },
    ],
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  };
}
