import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { allBlogPosts } from "@/data/blogData";
import { projectsData } from "@/data/projectsData";

type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl;

  // Static routes
  const staticRoutes = [
    "",
    "/quote",
    "/landing",
    "/about",
    "/designs",
    "/services",
    "/blog",
    "/contact",
    "/careers",
    "/faq",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === "" || route === "/quote" ? "daily" : "monthly") as ChangeFreq,
    priority: route === "" ? 1.0 : route === "/quote" || route === "/landing" ? 0.95 : route === "/services" ? 0.9 : 0.8,
  }));

  // Service routes
  const serviceSlugs = [
    // Phase 1 & 2 SEO Landing Pages
    "residential-interior-design",
    "home-interior-designers-bangalore",
    "commercial-interior-design",
    "office-interior-designers-bangalore",
    "hospitality-interior-design",
    "turnkey-interior-solutions",
    "luxury-interior-designers-bangalore",
    "apartment-interior-design",
    "villa-interior-design",
    "corporate-office-interior-design",
    "turnkey-office-interior",
    "hotel-interior-design",
    "restaurant-interior-design",
    // Existing Service Slugs
    "residential-interiors",
    "commercial-interiors",
    "aluminium-systems",
    "upvc-systems",
    "wooden-door-systems",
    "educational-institutions",
    "facades-glazing",
    "boutique-hotels",
    "service-apartments",
    "pg-accommodation",
  ];

  const serviceRoutes = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as ChangeFreq,
    priority: 0.85,
  }));

  // Portfolio/work routes
  const portfolioRoutes = projectsData.map((project) => ({
    url: `${baseUrl}/work/${project.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as ChangeFreq,
    priority: 0.75,
  }));

  // Note: hotelRoutes (5 routes) and phase2Routes (9 sector, locality, and process routes)
  // are currently excluded while set to noindex (IS_PAGE_INDEXABLE = false).
  // Once verified client data is confirmed, re-enable them in the sitemap.

  // Draft blogs set to noindex until real project content & pricing are verified
  const DRAFT_BLOG_SLUGS = new Set([
    "hotel-interior-cost-breakdown-bangalore",
    "boutique-hotel-interior-design-trends",
    "acoustic-windows-hotels-importance",
    "2bhk-3bhk-interior-cost-bangalore",
    "modular-kitchen-cost-bangalore-guide",
    "bangalore-interior-design-trends",
  ]);

  // Blog routes (excluding draft/noindex blogs)
  const blogRoutes = allBlogPosts
    .filter((post) => !DRAFT_BLOG_SLUGS.has(post.slug))
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as ChangeFreq,
      priority: 0.7,
    }));

  // Note: hotelRoutes (5 pages) and phase2Routes (9 sector/locality/process pages)
  // are currently set to robots: { index: false } and are intentionally excluded
  // from the sitemap until verified client data is confirmed.
  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...portfolioRoutes,
    ...blogRoutes,
  ];
}
