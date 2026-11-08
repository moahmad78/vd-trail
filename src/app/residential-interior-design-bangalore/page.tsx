import type { Metadata } from "next";
import SectorPageTemplate from "@/components/phase2/SectorPageTemplate";
import { RESIDENTIAL_PAGE_DATA } from "@/data/phase2PagesData";

export const metadata: Metadata = {
  title: RESIDENTIAL_PAGE_DATA.metadata.title,
  description: RESIDENTIAL_PAGE_DATA.metadata.description,
  keywords: RESIDENTIAL_PAGE_DATA.metadata.keywords,
  alternates: {
    canonical: RESIDENTIAL_PAGE_DATA.metadata.canonical,
  },
  openGraph: {
    title: RESIDENTIAL_PAGE_DATA.metadata.title,
    description: RESIDENTIAL_PAGE_DATA.metadata.description,
    url: RESIDENTIAL_PAGE_DATA.metadata.canonical,
    siteName: "Voomet Design",
    images: [
      {
        url: RESIDENTIAL_PAGE_DATA.hero.heroImage,
        width: 1200,
        height: 630,
        alt: RESIDENTIAL_PAGE_DATA.hero.h1,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: RESIDENTIAL_PAGE_DATA.metadata.title,
    description: RESIDENTIAL_PAGE_DATA.metadata.description,
    images: [RESIDENTIAL_PAGE_DATA.hero.heroImage],
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

export default function ResidentialPage() {
  return <SectorPageTemplate data={RESIDENTIAL_PAGE_DATA} />;
}

