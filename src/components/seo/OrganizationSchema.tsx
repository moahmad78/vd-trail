import { siteConfig } from "@/lib/site-config";

export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "InteriorDesignCompany"],
    "@id": `${siteConfig.siteUrl}/#business`,
    name: siteConfig.brandName,
    legalName: siteConfig.legalName,
    alternateName: ["VOOMET", "VOOMETDESIGN", "Voomet Design"],
    url: siteConfig.siteUrl,
    logo: siteConfig.logo,
    image: siteConfig.image,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    description: "VoometDesign is an established interior design and turnkey fit-out company in Bangalore delivering luxury residential, commercial, hospitality, and educational interiors with in-house manufacturing.",
    address: {
      "@type": "PostalAddress",
      ...siteConfig.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: [
      { "@type": "City", "name": "Bangalore" },
      { "@type": "State", "name": "Karnataka" },
      { "@type": "Country", "name": "India" }
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00"
    },
    sameAs: Object.values(siteConfig.socialProfiles).filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
