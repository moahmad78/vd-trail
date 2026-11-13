import Hero from "@/components/Hero";
import OurStory from "@/components/OurStory";
import BrandsSection from "@/components/BrandsSection";
import ExperimentalExpertise from "@/components/ExperimentalExpertise";
import ProjectHighlightsV2 from "@/components/ProjectHighlightsV2";
import CTAV4 from "@/components/CTAV4";
import SlideUpFade from "@/components/animations/SlideUpFade";
import { Metadata } from "next";
import { WebSiteSchema } from "@/components/seo/JsonLd";
import FAQSection from "@/components/seo/FAQSection";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Interior Designers in Bangalore | Voomet Design",
  description: "Best interior designers in Bangalore. Turnkey luxury residential, villa & commercial interiors engineered with in-house factory manufacturing. Get a free quote!",
  keywords: [
    "interior designers in bangalore",
    "interior design company in bangalore",
    "commercial interior designers in bangalore",
    "office interior designers in bangalore",
    "hospitality interior designers bangalore",
    "turnkey interior contractors bangalore",
    "hotel interior design company",
    "corporate office interior design",
    "educational interior designers",
    "best interior designers in bangalore",
    "luxury interior designers bangalore",
    "home interior design bangalore"
  ],
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  openGraph: {
    title: "Interior Designers in Bangalore | Voomet Design",
    description: "Best interior designers in Bangalore. Turnkey luxury residential, villa & commercial interiors engineered with in-house factory manufacturing. Get a free quote!",
    url: siteConfig.siteUrl,
    type: "website",
    siteName: "Voomet Design",
    images: [
      {
        url: "/images/hero/herovideo-poster.webp",
        width: 1200,
        height: 630,
        alt: "Voomet Design - Interior Designers in Bangalore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interior Designers in Bangalore | Voomet Design",
    description: "Best interior designers in Bangalore. Turnkey luxury residential, villa & commercial interiors engineered with in-house factory manufacturing. Get a free quote!",
    images: ["/images/hero/herovideo-poster.webp"],
  },
};

export default function Home() {
  return (
    <main className="relative bg-white">
      <WebSiteSchema />

      {/* [Section 1 & 2 & 3]: Hero Showcase Banner (Contains Trust Ribbon) */}
      <Hero />

      {/* NEW: Story-driven brand legacy section */}
      <OurStory />

      {/* Brands & Partners - Logo Ticker */}
      <SlideUpFade delay={0.1}>
        <BrandsSection />
      </SlideUpFade>

      {/* [Section 4.1 - EXPERIMENTAL A/B TEST]: New Expertise Structure */}
      <SlideUpFade>
        <ExperimentalExpertise />
      </SlideUpFade>

      {/* [Section 5.1 - EXPERIMENTAL A/B]: Project Highlights V2 — Editorial Masonry */}
      <SlideUpFade delay={0.1}>
        <ProjectHighlightsV2 />
      </SlideUpFade>

      {/* [Section 6.2 - EXPERIMENTAL A/B]: CTA V4 — Split Editorial Cinematic */}
      <SlideUpFade delay={0.1}>
        <CTAV4 />
      </SlideUpFade>

      {/* [Section 7 - AEO/GEO FAQ]: Structured & Visible AI Answer Engine Block (Final PRD Content) */}
      <FAQSection
        badge="FAQS"
        title="Frequently Asked Questions"
        subtitle="Clear answers on our process, timelines, scope, and pricing."
        faqs={[
          {
            question: "How long does a typical interior design project take with VoometDesign?",
            answer:
              "Residential projects are typically completed in around 45 days from the start of execution, depending on scope. Commercial and hospitality timelines are assessed per project.",
          },
          {
            question: "Does VoometDesign handle both design and execution?",
            answer:
              "Yes. VoometDesign is a turnkey studio — the same team manages design, project execution, and handover, so clients don't need to coordinate separate designers and contractors.",
          },
          {
            question: "What areas does VoometDesign serve?",
            answer:
              "VoometDesign is based in Bangalore and serves clients across Bangalore and Karnataka.",
          },
          {
            question: "What sectors does Voomet Design specialize in?",
            answer:
              "Voomet Design provides end-to-end turnkey interior design and execution across four primary sectors: Commercial & Corporate Offices, Boutique Hotels & Hospitality, Educational Campuses & Schools, and Premium Residential Villas & Apartments.",
          },
          {
            question: "What makes Voomet Design leading commercial and office interior designers in Bangalore?",
            answer:
              "As specialized commercial and office interior designers in Bangalore, Voomet Design delivers high-performance workplaces with in-house MEP engineering, acoustic isolation, and factory-built modular workstations, ensuring on-time handover without commercial lease downtime.",
          },
          {
            question: "Does Voomet Design work as turnkey interior contractors in Bangalore?",
            answer:
              "Yes. As turnkey interior contractors Bangalore, we manage 100% of the project under a single contract—from 3D concept visualization and civil execution to in-house joinery manufacturing and final handover, eliminating intermediate vendor coordination.",
          },
          {
            question: "How much does an interior project cost with VoometDesign?",
            answer:
              "Pricing depends on the design and scope of the project — factors like carpet area, material selection, finish level, and the complexity of the design all affect the final cost. VoometDesign provides a project-specific quote after understanding these requirements.",
          },
          {
            question: "How do I get started with VoometDesign?",
            answer:
              "Getting started is simple — reach out via the contact form, phone, or email to share your project requirements. VoometDesign's team will then schedule a consultation or site visit to understand the space and scope, followed by a design proposal and project-specific quote.",
          },
        ]}
      />

    </main>
  );
}
