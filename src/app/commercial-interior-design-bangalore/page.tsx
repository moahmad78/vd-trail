import type { Metadata } from "next";
import SectorPageTemplate from "@/components/phase2/SectorPageTemplate";
import { COMMERCIAL_PAGE_DATA } from "@/data/phase2PagesData";

export const metadata: Metadata = {
  title: COMMERCIAL_PAGE_DATA.metadata.title,
  description: COMMERCIAL_PAGE_DATA.metadata.description,
  keywords: COMMERCIAL_PAGE_DATA.metadata.keywords,
  alternates: {
    canonical: COMMERCIAL_PAGE_DATA.metadata.canonical,
  },
  openGraph: {
    title: COMMERCIAL_PAGE_DATA.metadata.title,
    description: COMMERCIAL_PAGE_DATA.metadata.description,
    url: COMMERCIAL_PAGE_DATA.metadata.canonical,
    siteName: "Voomet Design",
    images: [
      {
        url: COMMERCIAL_PAGE_DATA.hero.heroImage,
        width: 1200,
        height: 630,
        alt: COMMERCIAL_PAGE_DATA.hero.h1,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: COMMERCIAL_PAGE_DATA.metadata.title,
    description: COMMERCIAL_PAGE_DATA.metadata.description,
    images: [COMMERCIAL_PAGE_DATA.hero.heroImage],
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

export default function CommercialPage() {
  return <SectorPageTemplate data={COMMERCIAL_PAGE_DATA} />;
}

