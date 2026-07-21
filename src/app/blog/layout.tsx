import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Insights & Blog | Voomet Design",
  description: "Explore interior design insights, material guides, and project case studies from Voomet Design's team of architects and designers across India.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Design Insights & Blog | Voomet Design",
    description: "Explore interior design insights, material guides, and project case studies from Voomet Design's team of architects and designers.",
  },
  twitter: {
    title: "Design Insights & Blog | Voomet Design",
    description: "Explore interior design insights, material guides, and project case studies from Voomet Design's team of architects and designers.",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}