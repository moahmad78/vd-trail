import React from "react";
import { siteConfig } from "@/lib/site-config";

/* ─────────────────────────────────────────────────────────────────────────────
   BreadcrumbSchema
   Standalone BreadcrumbList — used on every page that has a page-level
   WebPage node. The breadcrumb property on WebPage cross-references this.
───────────────────────────────────────────────────────────────────────────── */

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${siteConfig.siteUrl}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   WebPageSchema
   Renders the correct WebPage subtype for each page with full entity linking.
   Accepted types: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage"
───────────────────────────────────────────────────────────────────────────── */

export function WebPageSchema({
  type = "WebPage",
  url,
  name,
  description,
  datePublished,
  dateModified,
  breadcrumbItems,
  primaryImage,
}: {
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  url: string;
  name: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  breadcrumbItems?: BreadcrumbItem[];
  primaryImage?: string;
}) {
  const fullUrl = url.startsWith("http") ? url : `${siteConfig.siteUrl}${url}`;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${fullUrl}#webpage`,
    "url": fullUrl,
    "name": name,
    "description": description,
    "isPartOf": { "@id": `${siteConfig.siteUrl}/#website` },
    "about": { "@id": `${siteConfig.siteUrl}/#business` },
  };

  if (datePublished) schema.datePublished = datePublished;
  if (dateModified) schema.dateModified = dateModified;

  if (primaryImage) {
    schema.primaryImageOfPage = {
      "@type": "ImageObject",
      "url": primaryImage.startsWith("http") ? primaryImage : `${siteConfig.siteUrl}${primaryImage}`,
    };
  }

  if (breadcrumbItems && breadcrumbItems.length > 0) {
    schema.breadcrumb = {
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url.startsWith("http") ? item.url : `${siteConfig.siteUrl}${item.url}`,
      })),
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   FAQSchema
   Standalone FAQPage — used on pages with visible FAQ accordions.
───────────────────────────────────────────────────────────────────────────── */

export function FAQSchema({ faqs }: { faqs: { question: string; answer: string }[] }) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ServiceSchema
   Fixed: added @id, image, offers with priceCurrency, areaServed enriched.
───────────────────────────────────────────────────────────────────────────── */

export function ServiceSchema({
  name,
  description,
  url,
  serviceType,
  image,
}: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
  image?: string;
}) {
  const fullUrl = url.startsWith("http") ? url : `${siteConfig.siteUrl}${url}`;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${fullUrl}#service`,
    "name": name,
    "serviceType": serviceType,
    "description": description,
    "url": fullUrl,
    "provider": {
      "@id": `${siteConfig.siteUrl}/#business`,
    },
    "areaServed": [
      { "@type": "City", "name": "Bangalore" },
      { "@type": "AdministrativeArea", "name": "Karnataka" },
      { "@type": "Country", "name": "India" },
    ],
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "seller": { "@id": `${siteConfig.siteUrl}/#business` },
    },
  };

  if (image) {
    schema.image = {
      "@type": "ImageObject",
      "url": image.startsWith("http") ? image : `${siteConfig.siteUrl}${image}`,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ProjectSchema
   CreativeWork for portfolio/design projects.
───────────────────────────────────────────────────────────────────────────── */

export function ProjectSchema({
  title,
  description,
  url,
  image,
  location,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  location?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": title,
    "headline": title,
    "description": description,
    "url": url.startsWith("http") ? url : `${siteConfig.siteUrl}${url}`,
    "image": image.startsWith("http") ? image : `${siteConfig.siteUrl}${image}`,
    "creator": {
      "@id": `${siteConfig.siteUrl}/#business`,
    },
    "locationCreated": {
      "@type": "Place",
      "name": location || "Bangalore, India",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   OrganizationSchema  (exported for backward-compat — canonical is in
   src/components/seo/OrganizationSchema.tsx which is rendered in layout)
───────────────────────────────────────────────────────────────────────────── */

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${siteConfig.siteUrl}/#business`,
    "name": siteConfig.brandName,
    "legalName": siteConfig.legalName,
    "alternateName": ["VOOMET", "VOOMETDESIGN", "Voomet Design"],
    "url": siteConfig.siteUrl,
    "logo": {
      "@type": "ImageObject",
      "@id": `${siteConfig.siteUrl}/#logo`,
      "url": siteConfig.logo,
      "contentUrl": siteConfig.logo,
      "width": 400,
      "height": 120,
      "caption": "VoometDesign Logo",
    },
    "image": siteConfig.image,
    "description":
      "VoometDesign is an established interior design and turnkey fit-out company in Bangalore delivering luxury residential, commercial, hospitality, and educational interiors with in-house manufacturing.",
    "telephone": siteConfig.phone,
    "email": siteConfig.email,
    "address": {
      "@type": "PostalAddress",
      ...siteConfig.address,
    },
    "geo": {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    "sameAs": Object.values(siteConfig.socialProfiles).filter(Boolean),
    "areaServed": [
      { "@type": "City", "name": "Bangalore" },
      { "@type": "AdministrativeArea", "name": "Karnataka" },
      { "@type": "Country", "name": "India" },
    ],
    "knowsAbout": [
      "Commercial Interior Design",
      "Residential Interior Design",
      "Turnkey Interior Execution",
      "Hospitality Interiors",
      "Wooden Door Systems",
      "Aluminium & UPVC Window Systems",
      "Architectural Glazing",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   WebSiteSchema
   Fixed: added @id, plain-string SearchAction target (EntryPoint deprecated).
───────────────────────────────────────────────────────────────────────────── */

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.siteUrl}/#website`,
    "name": siteConfig.brandName,
    "url": siteConfig.siteUrl,
    "publisher": { "@id": `${siteConfig.siteUrl}/#business` },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteConfig.siteUrl}/designs?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ArticleSchema (BlogPosting)
   Fixed: Person author, ImageObject image, dateModified, @id, keywords,
   articleSection, isPartOf cross-reference.
───────────────────────────────────────────────────────────────────────────── */

export function ArticleSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName,
  articleSection,
  keywords,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  articleSection?: string;
  keywords?: string[];
}) {
  const fullUrl = url.startsWith("http") ? url : `${siteConfig.siteUrl}${url}`;
  const fullImage = image.startsWith("http") ? image : `${siteConfig.siteUrl}${image}`;
  const published = datePublished || new Date().toISOString();

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${fullUrl}#article`,
    "headline": title,
    "description": description,
    "url": fullUrl,
    "image": {
      "@type": "ImageObject",
      "url": fullImage,
      "width": 1200,
      "height": 630,
    },
    "datePublished": published,
    "dateModified": dateModified || published,
    "author": {
      "@type": "Person",
      "name": authorName || "VoometDesign Editorial Team",
      "worksFor": { "@id": `${siteConfig.siteUrl}/#business` },
    },
    "publisher": { "@id": `${siteConfig.siteUrl}/#business` },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullUrl,
    },
    "isPartOf": { "@id": `${siteConfig.siteUrl}/#website` },
  };

  if (articleSection) schema.articleSection = articleSection;
  if (keywords && keywords.length > 0) schema.keywords = keywords.join(", ");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
