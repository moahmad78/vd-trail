import ContactHero from "@/components/ContactHero";
import ContactSection from "@/components/ContactSection";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact VoometDesign | Book an Interior Design Consultation in Bangalore",
  description: "Get in touch with VoometDesign for commercial, residential, or hospitality interior design and turnkey execution in Bangalore. Call +91-9845014279 or book a consultation.",
  alternates: {
    canonical: "https://voometdesign.com/contact",
  },
  openGraph: {
    title: "Contact VoometDesign | Book an Interior Design Consultation in Bangalore",
    description: "Get in touch with VoometDesign for commercial, residential, or hospitality interior design and turnkey execution in Bangalore. Call +91-9845014279 or book a consultation.",
    url: "https://voometdesign.com/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="relative bg-white min-h-screen">
      <BreadcrumbSchema 
        items={[
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" }
        ]}
      />
      {/* ── Section 1: Contact Hero ── */}
      <ContactHero />

      {/* ── Section 2: Studio Details & Form ── */}
      <ContactSection />
    </main>
  );
}
