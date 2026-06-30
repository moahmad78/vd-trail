import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Portfolio | Voomet Design",
  description: "Explore our portfolio of premium interior design projects, showcasing our expertise in residential, commercial, and hospitality spaces.",
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}