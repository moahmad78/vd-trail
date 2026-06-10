import ContactHero from "@/components/ContactHero";
import ContactSection from "@/components/ContactSection";
import SlideUpFade from "@/components/animations/SlideUpFade";

export const metadata = {
  title: "Contact Us | VOOMETDESIGN",
  description: "Start a conversation with VOOMETDESIGN. We'd love to understand your vision and help shape spaces that inspire.",
};

export default function ContactPage() {
  return (
    <main className="relative bg-white min-h-screen">
      {/* ── Section 1: Contact Hero ── */}
      <ContactHero />

      {/* ── Section 2: Studio Details & Form ── */}
      <SlideUpFade delay={0.1}>
        <ContactSection />
      </SlideUpFade>
    </main>
  );
}
