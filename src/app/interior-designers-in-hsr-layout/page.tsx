import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocalityPageTemplate from "@/components/phase2/LocalityPageTemplate";
import { LOCALITY_PAGES_DATA } from "@/data/phase2PagesData";

const pageData = LOCALITY_PAGES_DATA["hsr-layout"];

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
        url: pageData?.hero.heroImage || "/Design/resedential/10.webp",
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
    images: [pageData?.hero.heroImage || "/Design/resedential/10.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function HsrLayoutPage() {
  if (!pageData) notFound();
  return <LocalityPageTemplate data={pageData} />;
}

