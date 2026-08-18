import type { Metadata } from "next";

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

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
