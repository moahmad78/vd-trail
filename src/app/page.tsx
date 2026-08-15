import Hero from "@/components/Hero";
import dynamic from "next/dynamic";

const OurStory = dynamic(() => import("@/components/OurStory"), { ssr: true });
const BrandsSection = dynamic(() => import("@/components/BrandsSection"), { ssr: true });
const ExperimentalExpertise = dynamic(() => import("@/components/ExperimentalExpertise"), { ssr: true });
const ProjectHighlightsV2 = dynamic(() => import("@/components/ProjectHighlightsV2"), { ssr: true });
const CTAV4 = dynamic(() => import("@/components/CTAV4"), { ssr: true });

import SlideUpFade from "@/components/animations/SlideUpFade";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interior Design Company in Bangalore | Turnkey & Luxury Interiors | VOOMET",
  description: "VOOMET is an established interior design company in Bangalore delivering luxury residential, commercial, hospitality and turnkey interior solutions with in-house execution and manufacturing.",
  alternates: {
    canonical: "https://www.voometdesign.com",
  },
  openGraph: {
    title: "Interior Design Company in Bangalore | Turnkey & Luxury Interiors | VOOMET",
    description: "VOOMET is an established interior design company in Bangalore delivering luxury residential, commercial, hospitality and turnkey interior solutions with in-house execution and manufacturing.",
    url: "https://www.voometdesign.com",
    type: "website",
    images: [
      {
        url: "/images/hero/herovideo-poster.webp",
        width: 1200,
        height: 630,
        alt: "VOOMET Interior Design Company in Bangalore",
      },
    ],
  },
};

export default function Home() {
  return (
    <main className="relative bg-white">

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

    </main>
  );
}
