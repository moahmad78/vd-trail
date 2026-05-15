import Hero from "@/components/Hero";
import ServiceGrid from "@/components/ServiceGrid";
import LogoMarquee from "@/components/LogoMarquee";
import EdgeSection from "@/components/EdgeSection";
import AdvantageGrid from "@/components/AdvantageGrid";
import StyleSelector from "@/components/StyleSelector";
import ValueStatement from "@/components/ValueStatement";
import Gallery from "@/components/Gallery";
import ProcessFlow from "@/components/ProcessFlow";
import TestimonialMarquee from "@/components/TestimonialMarquee";
import BlogSection from "@/components/BlogSection";
import FAQSection from "@/components/FAQSection";
import LeadMagnet from "@/components/LeadMagnet";

export default function Home() {
  return (
    <main className="relative bg-white">
      <Hero />
      <ServiceGrid />
      <LogoMarquee />
      <EdgeSection />
      <AdvantageGrid />
      <StyleSelector />
      <ValueStatement />
      <Gallery />
      <ProcessFlow />
      <TestimonialMarquee />
      <BlogSection />
      <FAQSection />

      <LeadMagnet />
    </main>
  );
}
