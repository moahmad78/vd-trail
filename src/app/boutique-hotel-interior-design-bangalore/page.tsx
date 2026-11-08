import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HotelPageTemplate from "@/components/hospitality/HotelPageTemplate";
import { HOTEL_SUPPORTING_PAGES } from "@/data/hotelPagesData";

const PAGE_KEY = "boutique-hotel-interior-design-bangalore";
const pageData = HOTEL_SUPPORTING_PAGES[PAGE_KEY];

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
        url: pageData?.hero.heroImage || "/Design/hospitality/h5.webp",
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
    images: [pageData?.hero.heroImage || "/Design/hospitality/h5.webp"],
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

export default function BoutiqueHotelPage() {
  if (!pageData) notFound();
  return <HotelPageTemplate data={pageData} />;
}

