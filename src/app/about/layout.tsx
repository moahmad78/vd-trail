import type { Metadata } from "next";
import { BreadcrumbSchema, OrganizationSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "About Us | Luxury Interior Designers & Turnkey Execution | VOOMET",
  description: "Founded in 2010, VOOMET is an established interior design and manufacturing company based in Bangalore, delivering precision-crafted residential, commercial, and hospitality spaces across India.",
  alternates: {
    canonical: "https://voometdesign.com/about",
  },
  openGraph: {
    title: "About Us | Luxury Interior Designers & Turnkey Execution | VOOMET",
    description: "Founded in 2010, VOOMET is an established interior design and manufacturing company based in Bangalore, delivering precision-crafted residential, commercial, and hospitality spaces across India.",
    url: "https://voometdesign.com/about",
  },
  twitter: {
    title: "About Us | Luxury Interior Designers & Turnkey Execution | VOOMET",
    description: "Founded in 2010, VOOMET is an established interior design and manufacturing company based in Bangalore, delivering precision-crafted residential, commercial, and hospitality spaces across India.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema 
        items={[
          { name: "Home", url: "/" },
          { name: "About Us", url: "/about" }
        ]}
      />
      <OrganizationSchema />
      {children}
    </>
  );
}