import Hero from "@/components/Hero";
import OurStory from "@/components/OurStory";
import BrandsSection from "@/components/BrandsSection";

import ExperimentalExpertise from "@/components/ExperimentalExpertise";

import ProjectHighlightsV2 from "@/components/ProjectHighlightsV2";
import CTAV4 from "@/components/CTAV4";

import SlideUpFade from "@/components/animations/SlideUpFade";

export default function Home() {
  return (
    <main className="relative bg-white">

      {/* [Section 1 & 2 & 3]: Hero Showcase Banner (Contains Trust Ribbon) */}
      <Hero />

      {/* NEW: Story-driven brand legacy section */}
      <OurStory />

      {/* Brands & Partners */}
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
