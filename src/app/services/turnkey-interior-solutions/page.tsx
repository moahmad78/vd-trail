import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceLandingLayout from "@/components/seo/ServiceLandingLayout";
import { SEO_PAGES } from "@/data/seoPages";

const pageData = SEO_PAGES["turnkey-interior-solutions"];

export const metadata: Metadata = {
  title: pageData.metadata.title,
  description: pageData.metadata.description,
  keywords: pageData.metadata.keywords,
  alternates: {
    canonical: pageData.metadata.canonical,
  },
  openGraph: {
    title: pageData.metadata.title,
    description: pageData.metadata.description,
    url: pageData.metadata.canonical,
    images: [{ url: pageData.hero.heroImage }],
  },
  twitter: {
    title: pageData.metadata.title,
    description: pageData.metadata.description,
    images: [pageData.hero.heroImage],
  },
};

export default function TurnkeyInteriorSolutionsPage() {
  if (!pageData) notFound();
  return <ServiceLandingLayout pageData={pageData} />;
}
