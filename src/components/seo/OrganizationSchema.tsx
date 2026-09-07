import { siteConfig } from "@/lib/site-config";

/**
 * OrganizationSchema — Canonical, unified LocalBusiness definition.
 * Rendered ONCE in the root <head> via app/layout.tsx.
 * Replaces the now-deleted SchemaMarkup.tsx.
 *
 * Fixes applied (from schema audit):
 * - Single canonical @id with no duplicates
 * - Uses inline <script> (not next/Script afterInteractive) so Googlebot sees it
 * - ImageObject for logo with width/height/caption
 * - image as array of ImageObjects
 * - aggregateRating added
 * - priceRange added
 * - hasMap added
 * - dual contactPoint (customer service + sales)
 * - knowsAbout enriched
 * - areaServed uses AdministrativeArea (not State)
 * - foundingDate added
 */
export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
        "@id": `${siteConfig.siteUrl}/#business`,
        "name": siteConfig.brandName,
        "legalName": siteConfig.legalName,
        "alternateName": ["VOOMET", "VOOMETDESIGN", "Voomet Design", "Altech Enterprises"],
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
        "image": [
          {
            "@type": "ImageObject",
            "url": siteConfig.image,
            "width": 1920,
            "height": 1080,
          },
        ],
        "description":
          "VoometDesign is an established interior design and turnkey fit-out company in Bangalore delivering luxury residential, commercial, hospitality, and educational interiors with in-house manufacturing.",
        "foundingDate": "2010",
        "telephone": siteConfig.phone,
        "email": siteConfig.email,
        "priceRange": "₹₹₹",
        "hasMap": `https://maps.google.com/?q=${siteConfig.geo.latitude},${siteConfig.geo.longitude}`,
        "address": {
          "@type": "PostalAddress",
          ...siteConfig.address,
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": siteConfig.geo.latitude,
          "longitude": siteConfig.geo.longitude,
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            "opens": "09:00",
            "closes": "18:00",
          },
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": siteConfig.phone,
            "email": siteConfig.email,
            "contactType": "customer service",
            "availableLanguage": ["English", "Hindi", "Kannada"],
            "areaServed": "IN",
          },
          {
            "@type": "ContactPoint",
            "telephone": siteConfig.phone,
            "contactType": "sales",
            "availableLanguage": ["English", "Hindi", "Kannada"],
          },
        ],
        "areaServed": [
          { "@type": "City", "name": "Bangalore" },
          { "@type": "AdministrativeArea", "name": "Karnataka" },
          { "@type": "Country", "name": "India" },
        ],
        "knowsAbout": [
          "Residential Interior Design",
          "Commercial Interior Design",
          "Hospitality Interior Design",
          "Turnkey Interior Execution",
          "Aluminium Door and Window Systems",
          "UPVC Window Systems",
          "Architectural Glazing and Facades",
          "Wooden Door Systems",
          "3D Interior Visualization",
          "Villa Interior Design",
          "Apartment Interior Design",
          "Hotel Interior Design",
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "86",
          "bestRating": "5",
          "worstRating": "1",
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Interior Design & Architectural Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Hospitality Interior Design",
                "url": `${siteConfig.siteUrl}/services/hospitality/boutique-hotels`,
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Residential Interior Design",
                "url": `${siteConfig.siteUrl}/services/residential-interior-design`,
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Commercial Interior Design",
                "url": `${siteConfig.siteUrl}/services/commercial-interior-design`,
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Educational Institution Interiors",
                "url": `${siteConfig.siteUrl}/services/educational-institutions`,
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Aluminium System Doors & Windows",
                "url": `${siteConfig.siteUrl}/services/aluminium-systems`,
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "UPVC System Doors & Windows",
                "url": `${siteConfig.siteUrl}/services/upvc-systems`,
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Facades & Glazing Solutions",
                "url": `${siteConfig.siteUrl}/services/facades-glazing`,
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Wooden Door Systems",
                "url": `${siteConfig.siteUrl}/services/wooden-door-systems`,
              },
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Turnkey Interior Solutions",
                "url": `${siteConfig.siteUrl}/services/turnkey-interior-solutions`,
              },
            },
          ],
        },
        "sameAs": Object.values(siteConfig.socialProfiles).filter(Boolean),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
