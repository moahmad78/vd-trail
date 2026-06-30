import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interior Design Careers & Jobs",
  description: "Join Voomet Design and build the future of luxury interiors. Explore our open positions for architects, interior designers, and project managers.",
  alternates: {
    canonical: "/careers",
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}