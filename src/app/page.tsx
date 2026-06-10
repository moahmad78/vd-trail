// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited

import Hero from "@/components/Hero";
import ServiceGrid from "@/components/ServiceGrid";
import MatrixSection from "@/components/MatrixSection";
import ProjectHighlights from "@/components/ProjectHighlights";


export default function Home() {
  return (
    <main className="relative bg-white">
      {/* [Section 1 & 2 & 3]: Hero Showcase Banner (Contains Trust Ribbon) */}
      <Hero />

      {/* [Section 4]: Core Expertise Grid */}
      <ServiceGrid />

      {/* [Section 4.5]: Corporate Hubs & Trusted Client Network Matrix */}
      <MatrixSection />

      {/* [Section 5]: Project Highlights Portfolio Grid */}
      <ProjectHighlights />



    </main>
  );
}
