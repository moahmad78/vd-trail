import type { Metadata } from "next";
import { BreadcrumbSchema, FAQSchema, WebPageSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "FAQs | VoometDesign",
  description: "Answers to common questions about VoometDesign's interior design process, services, materials, 3D consultation, and pan-India project delivery.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FAQs | VoometDesign",
    description: "Answers to common questions about VoometDesign's interior design process, services, materials, 3D consultation, and pan-India project delivery.",
  },
  twitter: {
    title: "FAQs | VoometDesign",
    description: "Answers to common questions about VoometDesign's interior design process, services, materials, 3D consultation, and pan-India project delivery.",
  },
};

const FAQ_DATA = [
  {
    question: "What types of sectors do you specialize in?",
    answer: "We specialize in high-precision interior design and technical execution for Premium Residential, Hospitality, and Educational sectors.",
  },
  {
    question: "Do you provide bespoke woodwork?",
    answer: "Yes, our artisanal finishes and bespoke woodwork are executed in-house to ensure 100% quality control and superior artisanal detail.",
  },
  {
    question: "Do you provide turnkey solutions?",
    answer: "Yes, we handle everything from initial 2D/3D design and layout planning to fabrication, on-site technical execution, and final handover.",
  },
  {
    question: "Is the initial 3D layout consultation complimentary?",
    answer: "Yes, we offer a turnkey 3D site survey and initial layout plan worth ₹10,000 to help you visualize your project's potential before you commit.",
  },
  {
    question: "Do you handle projects outside of Bangalore?",
    answer: "Yes, we provide pan-India services, from the heart of Gorakhpur to the Silicon Valley of Bangalore.",
  },
  {
    question: "What materials do you use for high-end interiors?",
    answer: "We use premium materials including Italian marble, high-grade veneers, and in-house customized woodwork to ensure bespoke excellence.",
  },
  {
    question: "Can I see a 3D visualization of my project before work starts?",
    answer: "Absolutely. We provide real-time 3D visualizations so you can see your space come to life before the first brick is laid.",
  },
];

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "FAQs", url: "/faq" },
        ]}
      />
      <WebPageSchema
        type="WebPage"
        url="/faq"
        name="Frequently Asked Questions | VoometDesign"
        description="Answers to common questions about VoometDesign's interior design process, services, materials, 3D consultation, and pan-India project delivery."
        breadcrumbItems={[
          { name: "Home", url: "/" },
          { name: "FAQs", url: "/faq" },
        ]}
      />
      <FAQSchema faqs={FAQ_DATA} />
      {children}
    </>
  );
}

