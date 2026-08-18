import React from "react";
import { siteConfig } from "@/lib/site-config";

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
      "item": item.url.startsWith("http") ? item.url : `${siteConfig.siteUrl}${item.url}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

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
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema({
  name,
  description,
  url,
  serviceType
}: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "serviceType": serviceType,
    "description": description,
    "url": url.startsWith("http") ? url : `${siteConfig.siteUrl}${url}`,
    "provider": {
      "@type": "LocalBusiness",
      "name": siteConfig.brandName,
      "legalName": siteConfig.legalName,
      "url": siteConfig.siteUrl,
      "telephone": siteConfig.phone,
      "address": {
        "@type": "PostalAddress",
        ...siteConfig.address
      }
    },
    "areaServed": [
      { "@type": "City", "name": "Bangalore" },
      { "@type": "State", "name": "Karnataka" },
      { "@type": "Country", "name": "India" }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProjectSchema({
  title,
  description,
  url,
  image,
  location
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
      "@type": "Organization",
      "name": siteConfig.brandName,
      "url": siteConfig.siteUrl
    },
    "locationCreated": {
      "@type": "Place",
      "name": location || "Bangalore, India"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "InteriorDesignStudio"],
    "@id": `${siteConfig.siteUrl}/#business`,
    "name": siteConfig.brandName,
    "legalName": siteConfig.legalName,
    "alternateName": ["VOOMET", "VOOMETDESIGN", "Voomet Design"],
    "url": siteConfig.siteUrl,
    "logo": siteConfig.logo,
    "image": siteConfig.image,
    "description": "VoometDesign is an established interior design and turnkey fit-out company in Bangalore delivering luxury residential, commercial, hospitality, and educational interiors with in-house manufacturing.",
    "telephone": siteConfig.phone,
    "email": siteConfig.email,
    "address": {
      "@type": "PostalAddress",
      ...siteConfig.address
    },
    "geo": {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude
    },
    "sameAs": Object.values(siteConfig.socialProfiles).filter(Boolean),
    "areaServed": [
      { "@type": "City", "name": "Bangalore" },
      { "@type": "State", "name": "Karnataka" },
      { "@type": "Country", "name": "India" }
    ],
    "knowsAbout": [
      "Commercial Interior Design",
      "Residential Interior Design",
      "Turnkey Interior Execution",
      "Hospitality Interiors",
      "Wooden Door Systems",
      "Aluminium & UPVC Window Systems",
      "Architectural Glazing"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.brandName,
    "url": siteConfig.siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteConfig.siteUrl}/designs?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ArticleSchema({
  title,
  description,
  url,
  image,
  datePublished,
  authorName
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished?: string;
  authorName?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "url": url.startsWith("http") ? url : `${siteConfig.siteUrl}${url}`,
    "image": image.startsWith("http") ? image : `${siteConfig.siteUrl}${image}`,
    "datePublished": datePublished || new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": authorName || "VoometDesign Editorial Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.brandName,
      "logo": {
        "@type": "ImageObject",
        "url": siteConfig.logo
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url.startsWith("http") ? url : `${siteConfig.siteUrl}${url}`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
