import type { Metadata } from "next";
import { BreadcrumbSchema, WebPageSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Careers | Join the Interior Architecture Team | VoometDesign",
  description: "Join VoometDesign's growing team of interior designers, site engineers, and creative professionals. Explore open positions across our Bangalore and pan-India operations.",
  alternates: {
    canonical: "https://voometdesign.com/careers",
  },
  openGraph: {
    title: "Careers | Join the Interior Architecture Team | VoometDesign",
    description: "Join VoometDesign's growing team of interior designers, site engineers, and creative professionals. Explore open positions across India.",
    url: "https://voometdesign.com/careers",
  },
  twitter: {
    title: "Careers | Join the Interior Architecture Team | VoometDesign",
    description: "Join VoometDesign's growing team of interior designers, site engineers, and creative professionals. Explore open positions across India.",
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Careers", url: "/careers" },
        ]}
      />
      <WebPageSchema
        type="WebPage"
        url="/careers"
        name="Careers | Join the Interior Architecture Team | VoometDesign"
        description="Join VoometDesign's growing team of interior designers, site engineers, and creative professionals. Explore open positions across our Bangalore and pan-India operations."
        breadcrumbItems={[
          { name: "Home", url: "/" },
          { name: "Careers", url: "/careers" },
        ]}
      />
      {children}
    </>
  );
}