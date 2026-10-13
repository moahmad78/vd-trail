import { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import LandingPageClient from "./LandingPageClient";

export const metadata: Metadata = {
  title: "Get Free 3D Design & Interior Quote | Guaranteed 45-Day Handover | VoometDesign",
  description:
    "Transform your residential villa, apartment, or commercial office with VoometDesign. Complete turnkey interior execution, in-house Bangalore factory manufacturing, guaranteed 45-day handover & 10-year warranty. Claim your free 3D design consultation today!",
  alternates: {
    canonical: `${siteConfig.siteUrl}/landing`,
  },
  openGraph: {
    title: "Get Free 3D Design & Interior Quote | 45-Day Handover | VoometDesign",
    description:
      "Transform your space with Bangalore's premier turnkey interior & architectural studio. In-house German precision manufacturing & guaranteed on-time handover.",
    url: `${siteConfig.siteUrl}/landing`,
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

export default function LandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Turnkey Interior Design & Architectural Fit-Outs",
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
      "description": "Free 3D Architectural Consultation and Site Estimate",
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
