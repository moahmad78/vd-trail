import { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import LandingPageClient from "@/app/landing/LandingPageClient";

export const metadata: Metadata = {
  title: "Get Instant Interior Quote & Free 3D Design | VoometDesign Bangalore",
  description:
    "Calculate your interior design cost with VoometDesign. Complete turnkey interior execution, in-house Bangalore factory manufacturing, guaranteed 45-day handover & 10-year warranty. Claim your free 3D design consultation & transparent BoQ estimate today!",
  alternates: {
    canonical: `${siteConfig.siteUrl}/quote`,
  },
  openGraph: {
    title: "Get Instant Interior Quote & Free 3D Design | VoometDesign Bangalore",
    description:
      "Transform your villa, apartment, or commercial office with VoometDesign. In-house German precision manufacturing & guaranteed 45-day on-time handover.",
    url: `${siteConfig.siteUrl}/quote`,
    type: "website",
    images: [
      {
        url: "/images/hero/herovideo-poster.webp",
        width: 1200,
        height: 630,
        alt: "VoometDesign Luxury Interior Design & Turnkey Solutions Bangalore",
      },
    ],
  },
};

export default function QuotePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Turnkey Interior Design & Architectural Quotation",
    "provider": {
      "@type": "LocalBusiness",
      "name": siteConfig.brandName,
      "telephone": siteConfig.phone,
      "email": siteConfig.email,
      "url": siteConfig.siteUrl,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteConfig.address.streetAddress,
        "addressLocality": siteConfig.address.addressLocality,
        "addressRegion": siteConfig.address.addressRegion,
        "postalCode": siteConfig.address.postalCode,
        "addressCountry": siteConfig.address.addressCountry,
      },
    },
    "areaServed": "Bangalore, Karnataka, India",
    "description":
      "Bespoke residential interior design, commercial agile offices, facade engineering and precision factory-made modular furniture with guaranteed 45-day delivery.",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": "0",
      "description": "Free 3D Architectural Consultation and Instant Site Estimate",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="w-full min-h-screen">
        <LandingPageClient />
      </main>
    </>
  );
}
