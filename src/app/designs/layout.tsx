import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interior Design Portfolio & Architectural Projects",
  description: "Explore Voomet Design's portfolio of premium interior design projects, showcasing our expertise in residential, commercial, and luxury hospitality spaces.",
  alternates: {
    canonical: "/designs",
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}