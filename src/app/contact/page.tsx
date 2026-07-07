import ContactHero from "@/components/ContactHero";
import ContactSection from "@/components/ContactSection";
import SlideUpFade from "@/components/animations/SlideUpFade";

export const metadata = {
  title: "Contact Voomet Design | Interior Design Consultation",
  description: "Get in touch with Voomet Design for premium residential, commercial, or hospitality interior design projects. Schedule your design consultation today.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="relative bg-white min-h-screen">
      {/* ── Section 1: Contact Hero ── */}
      <ContactHero />

      {/* ── Section 2: Studio Details & Form ── */}
      <ContactSection />
    </main>
  );
}
