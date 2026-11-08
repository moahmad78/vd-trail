import type { Metadata } from "next";
import HotelPageTemplate from "@/components/hospitality/HotelPageTemplate";
import { HOTEL_PILLAR_PAGE } from "@/data/hotelPagesData";

export const metadata: Metadata = {
  title: HOTEL_PILLAR_PAGE.metadata.title,
  description: HOTEL_PILLAR_PAGE.metadata.description,
  keywords: HOTEL_PILLAR_PAGE.metadata.keywords,
  alternates: {
    canonical: HOTEL_PILLAR_PAGE.metadata.canonical,
  },
  openGraph: {
    title: HOTEL_PILLAR_PAGE.metadata.title,
    description: HOTEL_PILLAR_PAGE.metadata.description,
    url: HOTEL_PILLAR_PAGE.metadata.canonical,
    siteName: "Voomet Design",
    images: [
      {
        url: HOTEL_PILLAR_PAGE.hero.heroImage,
        width: 1200,
        height: 630,
        alt: HOTEL_PILLAR_PAGE.hero.h1,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: HOTEL_PILLAR_PAGE.metadata.title,
    description: HOTEL_PILLAR_PAGE.metadata.description,
    images: [HOTEL_PILLAR_PAGE.hero.heroImage],
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

export default function HotelPillarPage() {
  return <HotelPageTemplate data={HOTEL_PILLAR_PAGE} />;
}

