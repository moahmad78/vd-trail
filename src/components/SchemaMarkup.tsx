import Script from "next/script";
import { siteConfig } from "@/lib/site-config";

const SchemaMarkup = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "InteriorDesignCompany"],
    "@id": `${siteConfig.siteUrl}/#business`,
    "name": siteConfig.brandName,
    "legalName": siteConfig.legalName,
    "alternateName": ["VOOMET", "VOOMETDESIGN", "Voomet Design"],
    "url": siteConfig.siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": siteConfig.icon,
      "width": 512,
      "height": 512
    },
    "image": siteConfig.image,
    "description": "VOOMET is a premium interior design studio delivering luxury residential, hospitality, commercial, and educational spaces across India.",
    "foundingDate": "2010",
    "areaServed": [
      { "@type": "City", "name": "Bangalore" },
      { "@type": "State", "name": "Karnataka" }
    ],
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
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteConfig.phone,
      "email": siteConfig.email,
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi", "Kannada"]
    },
    "sameAs": Object.values(siteConfig.socialProfiles).filter(Boolean),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Interior Design Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Hospitality Interior Design",
            "description": "Luxury interior design for boutique hotels, service apartments, and hospitality spaces.",
            "url": `${siteConfig.siteUrl}/services/hospitality/boutique-hotels`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Residential Interior Design",
            "description": "Premium turnkey interior design for luxury homes, villas, penthouses, and apartments.",
            "url": `${siteConfig.siteUrl}/services/residential-interiors`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Educational Institution Interiors",
            "description": "Modern interior design for schools, colleges, and educational facilities.",
            "url": `${siteConfig.siteUrl}/services/educational-institutions`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Commercial Interior Design",
            "description": "High-performance office, retail, and commercial interior design and execution.",
            "url": `${siteConfig.siteUrl}/services/commercial-interiors`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Aluminium Systems",
            "description": "Custom aluminium facade, partition, and architectural systems for modern buildings.",
            "url": `${siteConfig.siteUrl}/services/aluminium-systems`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "UPVC Window & Door Systems",
            "description": "Energy-efficient UPVC window and door systems for residential and commercial projects.",
            "url": `${siteConfig.siteUrl}/services/upvc-systems`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Facades & Glazing",
            "description": "Premium architectural facade and glazing solutions for commercial and institutional buildings.",
            "url": `${siteConfig.siteUrl}/services/facades-glazing`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Wooden Door Systems",
            "description": "Precision-engineered wooden door systems, bespoke frames and architectural joinery.",
            "url": `${siteConfig.siteUrl}/services/wooden-door-systems`
          }
        }
      ]
    }
  };

  return (
    <Script
      id="schema-local-business"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="afterInteractive"
    />
  );
};

export default SchemaMarkup;
