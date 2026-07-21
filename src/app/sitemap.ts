import { MetadataRoute } from "next";
import { allBlogPosts } from "@/data/blogData";
import { projectsData } from "@/data/projectsData";

type ChangeFreq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://voometdesign.com";

  // Static routes
  const staticRoutes = ["", "/about", "/designs", "/services", "/blog", "/contact", "/careers", "/faq"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === "" ? "daily" : "monthly") as ChangeFreq,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Service routes
  const serviceSlugs = [
    "residential-interiors",
    "commercial-interiors",
    "aluminium-systems",
    "upvc-systems",
    "educational-institutions",
    "facades-glazing",
    "boutique-hotels",
    "service-apartments",
    "pg-accommodation"
  ];
  
  const serviceRoutes = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as ChangeFreq,
    priority: 0.8,
  }));

  // Portfolio routes
  const portfolioRoutes = projectsData.map((project) => ({
    url: `${baseUrl}/work/${project.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as ChangeFreq,
    priority: 0.7,
  }));

  // Blog routes
  const blogRoutes = allBlogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as ChangeFreq,
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...portfolioRoutes, ...blogRoutes];
}
