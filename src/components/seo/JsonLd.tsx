import React from "react";

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
      "item": item.url.startsWith("http") ? item.url : `https://www.voometdesign.com${item.url}`
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
    "url": url.startsWith("http") ? url : `https://www.voometdesign.com${url}`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "VOOMET Design",
      "url": "https://www.voometdesign.com",
      "telephone": "+91-9845014279",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "No. 166, Obandehalli Industrial Area",
        "addressLocality": "Doddaballapura",
        "addressRegion": "Karnataka",
        "postalCode": "561203",
        "addressCountry": "IN"
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
    "url": url.startsWith("http") ? url : `https://www.voometdesign.com${url}`,
    "image": image.startsWith("http") ? image : `https://www.voometdesign.com${image}`,
    "creator": {
      "@type": "Organization",
      "name": "VOOMET Design",
      "url": "https://www.voometdesign.com"
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
    "@type": ["Organization", "InteriorDesignStudio"],
    "name": "VOOMET Design",
    "alternateName": ["VOOMET", "VOOMETDESIGN"],
    "url": "https://www.voometdesign.com",
    "logo": "https://www.voometdesign.com/logo/logo.webp",
    "image": "https://www.voometdesign.com/images/hero/herovideo-poster.webp",
    "description": "VOOMET is an established interior design and turnkey fit-out company in Bangalore delivering luxury residential, commercial, hospitality, and educational interiors with in-house manufacturing.",
    "telephone": "+91-9845014279",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "No. 166, Obandehalli Industrial Area",
      "addressLocality": "Doddaballapura",
      "addressRegion": "Karnataka",
      "postalCode": "561203",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.instagram.com/voometdesign/",
      "https://www.facebook.com/voometdesign",
      "https://www.linkedin.com/company/voometdesign"
    ],
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
    "name": "VOOMET Design",
    "url": "https://www.voometdesign.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.voometdesign.com/designs?search={search_term_string}"
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
    "url": url.startsWith("http") ? url : `https://www.voometdesign.com${url}`,
    "image": image.startsWith("http") ? image : `https://www.voometdesign.com${image}`,
    "datePublished": datePublished || new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": authorName || "VOOMET Design Editorial Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "VOOMET Design",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.voometdesign.com/logo/logo.webp"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url.startsWith("http") ? url : `https://www.voometdesign.com${url}`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
