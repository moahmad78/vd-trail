// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
import Script from "next/script";

const SchemaMarkup = () => {
  // Single Entity block — combining LocalBusiness and InteriorDesignCompany.
  // We removed the secondary Organization node entirely, because LocalBusiness 
  // is a sub-type of Organization. This fixes the duplicate url/sameAs warnings
  // in Google's Rich Results Test.
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "InteriorDesignCompany"],
    "@id": "https://www.voometdesign.com/#business",
    "name": "Voomet Design",
    "url": "https://www.voometdesign.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.voometdesign.com/logo/icon.webp",
      "width": 512,
      "height": 512
    },
    "image": "https://www.voometdesign.com/logo/icon.webp",
    "description": "Voomet Design is a premium interior design studio delivering luxury residential, hospitality, commercial, and educational spaces across India.",
    "foundingDate": "2010",
    "areaServed": [
      { "@type": "City", "name": "Bangalore" },
      { "@type": "State", "name": "Karnataka" }
    ],
    "telephone": "+91-9845014279",
    "email": "info@voometdesign.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "No. 166, Obandehalli Industrial Area",
      "addressLocality": "Doddaballapura",
      "addressRegion": "Karnataka",
      "postalCode": "561203",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 13.2954,
      "longitude": 77.5367
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "18:00"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9845014279",
      "email": "info@voometdesign.com",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi", "Kannada"]
    },
    "sameAs": [
      "https://www.instagram.com/voometdesign/",
      "https://www.facebook.com/voometdesign"
    ],
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
            "url": "https://www.voometdesign.com/services/hospitality/boutique-hotels"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Residential Interior Design",
            "description": "Premium turnkey interior design for luxury homes, villas, penthouses, and apartments.",
            "url": "https://www.voometdesign.com/services/residential-interiors"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Educational Institution Interiors",
            "description": "Modern interior design for schools, colleges, and educational facilities.",
            "url": "https://www.voometdesign.com/services/educational-institutions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Commercial Interior Design",
            "description": "High-performance office, retail, and commercial interior design and execution.",
            "url": "https://www.voometdesign.com/services/commercial-interiors"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Aluminium Systems",
            "description": "Custom aluminium facade, partition, and architectural systems for modern buildings.",
            "url": "https://www.voometdesign.com/services/aluminium-systems"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "UPVC Window & Door Systems",
            "description": "Energy-efficient UPVC window and door systems for residential and commercial projects.",
            "url": "https://www.voometdesign.com/services/upvc-systems"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Facades & Glazing",
            "description": "Premium architectural facade and glazing solutions for commercial and institutional buildings.",
            "url": "https://www.voometdesign.com/services/facades-glazing"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Wooden Door Systems",
            "description": "Precision-engineered wooden door systems, bespoke frames and architectural joinery.",
            "url": "https://www.voometdesign.com/services/wooden-door-systems"
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
