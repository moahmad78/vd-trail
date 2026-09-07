import type { Metadata } from "next";
import { BreadcrumbSchema, WebPageSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Interior Design Insights & Guides | VoometDesign Bangalore",
  description: "Explore commercial fit-out guides, residential design planning, material insights, and turnkey interior methodologies from the VoometDesign engineering team in Bangalore.",
  alternates: {
    canonical: "https://voometdesign.com/blog",
  },
  openGraph: {
    title: "Interior Design Insights & Guides | VoometDesign Bangalore",
    description: "Explore commercial fit-out guides, residential design planning, material insights, and turnkey interior methodologies from the VoometDesign engineering team in Bangalore.",
    url: "https://voometdesign.com/blog",
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
      <WebPageSchema
        type="CollectionPage"
        url="/blog"
        name="Interior Design Insights & Guides | VoometDesign Bangalore"
        description="Explore commercial fit-out guides, residential design planning, material insights, and turnkey interior methodologies from the VoometDesign engineering team in Bangalore."
        breadcrumbItems={[
          { name: "Home", url: "/" },
          { name: "Insights", url: "/blog" },
        ]}
      />
      {children}
    </>
  );
}