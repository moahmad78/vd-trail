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

      {/* [Section 7 - AEO/GEO FAQ]: Structured & Visible AI Answer Engine Block */}
      <FAQSection
        title="Frequently Asked Questions"
        subtitle="Common questions about VOOMET interior design services, turnkey execution, and project workflows in Bangalore."
        faqs={[
          {
            question: "What interior design and fit-out services does VOOMET provide?",
            answer:
              "VOOMET delivers complete interior design and turnkey fit-out solutions across residential spaces (luxury apartments, villas, modular kitchens), commercial workspaces, boutique hotels, and educational institutions, paired with in-house manufactured architectural aluminium, uPVC, and wooden door systems.",
          },
          {
            question: "Where is VOOMET located and which regions are served?",
            answer:
              "VOOMET is headquartered in Bangalore, Karnataka (with dedicated fabrication facilities in Doddaballapura Industrial Area), executing luxury interior design projects throughout Bangalore (including Whitefield, Indiranagar, Koramangala, and HSR Layout) as well as select pan-India commercial and hospitality assignments.",
          },
          {
            question: "What does turnkey interior execution mean at VOOMET?",
            answer:
              "Turnkey interior execution means a single point of accountability for your entire project—from 3D conceptualization, space planning, and material specification to in-house joinery fabrication, MEP site coordination, and final handover on a guaranteed timeline.",
          },
          {
            question: "Does VOOMET manufacture interior elements in-house?",
            answer:
              "Yes. VOOMET operates dedicated in-house manufacturing for bespoke wooden doors, joinery, and architectural fenestration (aluminium & uPVC systems), eliminating third-party subcontractor markups and ensuring medical-grade precision control.",
          },
        ]}
      />

    </main>
  );
}
