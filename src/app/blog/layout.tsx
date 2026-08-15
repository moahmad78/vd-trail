import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Interior Design Insights & Guides | VOOMET Bangalore",
  description: "Explore commercial fit-out guides, residential design planning, material insights, and turnkey interior methodologies from the VOOMET engineering team in Bangalore.",
  alternates: {
    canonical: "https://www.voometdesign.com/blog",
  },
  openGraph: {
    title: "Interior Design Insights & Guides | VOOMET Bangalore",
    description: "Explore commercial fit-out guides, residential design planning, material insights, and turnkey interior methodologies from the VOOMET engineering team in Bangalore.",
    url: "https://www.voometdesign.com/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema 
        items={[
          { name: "Home", url: "/" },
          { name: "Insights", url: "/blog" }
        ]}
      />
      {children}
    </>
  );
}