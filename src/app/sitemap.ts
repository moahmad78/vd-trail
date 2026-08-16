import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { allBlogPosts } from "@/data/blogData";
import { projectsData } from "@/data/projectsData";
import { BANGALORE_AREAS } from "@/data/bangaloreAreas";

type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl;

  // Static routes
  const staticRoutes = [
    "",
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
    changeFrequency: (route === "" ? "daily" : "monthly") as ChangeFreq,
    priority: route === "" ? 1.0 : route === "/services" ? 0.9 : 0.8,
  }));

  // Service routes
  const serviceSlugs = [
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

  // Blog routes
  const blogRoutes = allBlogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as ChangeFreq,
    priority: 0.7,
  }));

  // Bangalore SEO Pillar Route
  const bangaloreHubRoute = {
    url: `${baseUrl}/interior-designers-bangalore`,
    lastModified: new Date(),
    changeFrequency: "weekly" as ChangeFreq,
    priority: 0.95,
  };

  const bangaloreAreaRoutes = Object.keys(BANGALORE_AREAS).map((area) => ({
    url: `${baseUrl}/interior-designer-bangalore/${area}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as ChangeFreq,
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...portfolioRoutes,
    ...blogRoutes,
    bangaloreHubRoute,
    ...bangaloreAreaRoutes,
  ];
}
