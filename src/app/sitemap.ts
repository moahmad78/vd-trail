import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://voometdesign.com';

  const slugs = [
    "residential-interiors",
    "hospitality-design",
    "aluminium-systems",
    "upvc-systems",
    "service-apartments",
    "boutique-hotels",
    "pg-accommodation"
  ];

  const serviceUrls = slugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...serviceUrls,
  ];
}
