import Hero from "@/components/Hero";
import dynamic from "next/dynamic";

const OurStory = dynamic(() => import("@/components/OurStory"), { ssr: true });
const BrandsSection = dynamic(() => import("@/components/BrandsSection"), { ssr: true });
const ExperimentalExpertise = dynamic(() => import("@/components/ExperimentalExpertise"), { ssr: true });
const ProjectHighlightsV2 = dynamic(() => import("@/components/ProjectHighlightsV2"), { ssr: true });
const CTAV4 = dynamic(() => import("@/components/CTAV4"), { ssr: true });

import SlideUpFade from "@/components/animations/SlideUpFade";
import { Metadata } from "next";
import { WebSiteSchema } from "@/components/seo/JsonLd";
import FAQSection from "@/components/seo/FAQSection";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `${siteConfig.brandName} | Interior Design & Turnkey Solutions in Bangalore`,
  description: "VOOMET is an established interior design company in Bangalore delivering luxury residential, commercial, hospitality and turnkey interior solutions with in-house execution and manufacturing.",
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  openGraph: {
    title: `${siteConfig.brandName} | Interior Design & Turnkey Solutions in Bangalore`,
    description: "VOOMET is an established interior design company in Bangalore delivering luxury residential, commercial, hospitality and turnkey interior solutions with in-house execution and manufacturing.",
    url: siteConfig.siteUrl,
    type: "website",
    images: [
      {
        url: "/images/hero/herovideo-poster.webp",
        width: 1200,
        height: 630,
        alt: `${siteConfig.brandName} Interior Design Company in Bangalore`,
      },
    ],
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
            question: "How long does a typical interior design project take with VOOMET?",
            answer:
              "Residential projects are typically completed in around 45 days from the start of execution, depending on scope. Commercial and hospitality timelines are assessed per project.",
          },
          {
            question: "Does VOOMET handle both design and execution?",
            answer:
              "Yes. VOOMET is a turnkey studio — the same team manages design, project execution, and handover, so clients don't need to coordinate separate designers and contractors.",
          },
          {
            question: "What areas does VOOMET serve?",
            answer:
              "VOOMET is based in Bangalore and serves clients across Bangalore and Karnataka.",
          },
          {
            question: "What types of projects does VOOMET work on?",
            answer:
              "Residential and commercial interiors, hospitality spaces, aluminium/facade systems, and custom furniture.",
          },
          {
            question: "How much does an interior project cost with VOOMET?",
            answer:
              "Pricing depends on the design and scope of the project — factors like carpet area, material selection, finish level, and the complexity of the design all affect the final cost. VOOMET provides a project-specific quote after understanding these requirements.",
          },
          {
            question: "How do I get started with VOOMET?",
            answer:
              "Getting started is simple — reach out via the contact form, phone, or email to share your project requirements. VOOMET's team will then schedule a consultation or site visit to understand the space and scope, followed by a design proposal and project-specific quote.",
          },
        ]}
      />

    </main>
  );
}
