// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited

import Hero from "@/components/Hero";

import ExperimentalExpertise from "@/components/ExperimentalExpertise";

import TrustedNetworkV2 from "@/components/TrustedNetworkV2";
import ProjectHighlightsV2 from "@/components/ProjectHighlightsV2";
import CTAV4 from "@/components/CTAV4";

import SlideUpFade from "@/components/animations/SlideUpFade";

export default function Home() {
  return (
    <main className="relative bg-white">

      {/* [Section 1 & 2 & 3]: Hero Showcase Banner (Contains Trust Ribbon) */}
      <Hero />

      {/* [Section 4.1 - EXPERIMENTAL A/B TEST]: New Expertise Structure */}
      <SlideUpFade>
        <ExperimentalExpertise />
      </SlideUpFade>

      {/* [Section 4.6 - EXPERIMENTAL A/B]: Trusted Network v2 — Editorial Luxury Treatment */}
      <SlideUpFade delay={0.1}>
        <TrustedNetworkV2 />
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
