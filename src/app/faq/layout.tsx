import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs | Voomet Design",
  description: "Answers to common questions about Voomet Design's interior design process, services, materials, 3D consultation, and pan-India project delivery.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FAQs | Voomet Design",
    description: "Answers to common questions about Voomet Design's interior design process, services, materials, 3D consultation, and pan-India project delivery.",
  },
  twitter: {
    title: "FAQs | Voomet Design",
    description: "Answers to common questions about Voomet Design's interior design process, services, materials, 3D consultation, and pan-India project delivery.",
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
