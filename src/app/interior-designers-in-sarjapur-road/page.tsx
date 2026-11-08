import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocalityPageTemplate from "@/components/phase2/LocalityPageTemplate";
import { LOCALITY_PAGES_DATA } from "@/data/phase2PagesData";

const pageData = LOCALITY_PAGES_DATA["sarjapur-road"];

// Flag to toggle search indexing once verified client content and portfolio data are added
const IS_PAGE_INDEXABLE = false;

export const metadata: Metadata = {
  title: pageData?.metadata.title,
  description: pageData?.metadata.description,
  keywords: pageData?.metadata.keywords,
  alternates: {
    canonical: pageData?.metadata.canonical,
  },
  openGraph: {
    title: pageData?.metadata.title,
    description: pageData?.metadata.description,
    url: pageData?.metadata.canonical,
    siteName: "Voomet Design",
    images: [
      {
        url: pageData?.hero.heroImage || "/Design/resedential/14.webp",
        width: 1200,
        height: 630,
        alt: pageData?.hero.h1,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageData?.metadata.title,
    description: pageData?.metadata.description,
    images: [pageData?.hero.heroImage || "/Design/resedential/14.webp"],
  },
  robots: {
    index: IS_PAGE_INDEXABLE,
    follow: true,
    googleBot: {
      index: IS_PAGE_INDEXABLE,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function SarjapurRoadPage() {
  if (!pageData) notFound();
  return <LocalityPageTemplate data={pageData} />;
}

