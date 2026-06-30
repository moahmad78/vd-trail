// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
import Script from "next/script";

const SchemaMarkup = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Voomet Design",
    "image": "https://voometdesign.com/logo/icon.png",
    "@id": "https://voometdesign.com",
    "url": "https://voometdesign.com",
    "telephone": "+91-XXXXXXXXXX",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "Bengaluru Office Address",
        "addressLocality": "Bengaluru",
        "addressRegion": "Karnataka",
        "postalCode": "560001",
        "addressCountry": "IN"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Gorakhpur Office Address",
        "addressLocality": "Gorakhpur",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "273001",
        "addressCountry": "IN"
      }
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 12.9716,
      "longitude": 77.5946
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Voomet Design",
    "url": "https://voometdesign.com",
    "logo": "https://voometdesign.com/logo/icon.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.instagram.com/voometdesign",
      "https://www.linkedin.com/company/voometdesign"
    ]
  };

  return (
    <>
      <Script
        id="schema-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="schema-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        strategy="afterInteractive"
      />
    </>
  );
};

export default SchemaMarkup;
