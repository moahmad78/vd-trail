import type { Metadata } from "next";
import ProcessPageTemplate from "@/components/phase2/ProcessPageTemplate";
import { PROCESS_PAGE_DATA } from "@/data/phase2PagesData";

// Flag to toggle search indexing once verified client content and portfolio data are added
const IS_PAGE_INDEXABLE = false;

export const metadata: Metadata = {
  title: PROCESS_PAGE_DATA.metadata.title,
  description: PROCESS_PAGE_DATA.metadata.description,
  keywords: PROCESS_PAGE_DATA.metadata.keywords,
  alternates: {
    canonical: PROCESS_PAGE_DATA.metadata.canonical,
  },
  openGraph: {
    title: PROCESS_PAGE_DATA.metadata.title,
    description: PROCESS_PAGE_DATA.metadata.description,
    url: PROCESS_PAGE_DATA.metadata.canonical,
    siteName: "Voomet Design",
    images: [
      {
        url: PROCESS_PAGE_DATA.hero.heroImage,
        width: 1200,
        height: 630,
        alt: PROCESS_PAGE_DATA.hero.h1,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: PROCESS_PAGE_DATA.metadata.title,
    description: PROCESS_PAGE_DATA.metadata.description,
    images: [PROCESS_PAGE_DATA.hero.heroImage],
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

export default function ProcessPage() {
  return <ProcessPageTemplate data={PROCESS_PAGE_DATA} />;
}

