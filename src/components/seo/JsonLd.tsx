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
