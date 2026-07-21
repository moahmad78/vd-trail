import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Voomet Design",
  description: "Join Voomet Design's growing team of interior designers, site engineers, and creative professionals. Explore open positions across our Bangalore and pan-India operations.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers | Voomet Design",
    description: "Join Voomet Design's growing team of interior designers, site engineers, and creative professionals. Explore open positions across India.",
  },
  twitter: {
    title: "Careers | Voomet Design",
    description: "Join Voomet Design's growing team of interior designers, site engineers, and creative professionals. Explore open positions across India.",
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}