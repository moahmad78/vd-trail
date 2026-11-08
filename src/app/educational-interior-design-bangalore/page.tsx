import type { Metadata } from "next";
import SectorPageTemplate from "@/components/phase2/SectorPageTemplate";
import { EDUCATIONAL_PAGE_DATA } from "@/data/phase2PagesData";

export const metadata: Metadata = {
  title: EDUCATIONAL_PAGE_DATA.metadata.title,
  description: EDUCATIONAL_PAGE_DATA.metadata.description,
  keywords: EDUCATIONAL_PAGE_DATA.metadata.keywords,
  alternates: {
    canonical: EDUCATIONAL_PAGE_DATA.metadata.canonical,
  },
  openGraph: {
    title: EDUCATIONAL_PAGE_DATA.metadata.title,
    description: EDUCATIONAL_PAGE_DATA.metadata.description,
    url: EDUCATIONAL_PAGE_DATA.metadata.canonical,
    siteName: "Voomet Design",
    images: [
      {
        url: EDUCATIONAL_PAGE_DATA.hero.heroImage,
        width: 1200,
        height: 630,
        alt: EDUCATIONAL_PAGE_DATA.hero.h1,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: EDUCATIONAL_PAGE_DATA.metadata.title,
    description: EDUCATIONAL_PAGE_DATA.metadata.description,
    images: [EDUCATIONAL_PAGE_DATA.hero.heroImage],
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

export default function EducationalPage() {
  return <SectorPageTemplate data={EDUCATIONAL_PAGE_DATA} />;
}

