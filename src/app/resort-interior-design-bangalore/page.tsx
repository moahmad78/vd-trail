import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HotelPageTemplate from "@/components/hospitality/HotelPageTemplate";
import { HOTEL_SUPPORTING_PAGES } from "@/data/hotelPagesData";

const PAGE_KEY = "resort-interior-design-bangalore";
const pageData = HOTEL_SUPPORTING_PAGES[PAGE_KEY];

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
        url: pageData?.hero.heroImage || "/Design/hospitality/h8.webp",
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
    images: [pageData?.hero.heroImage || "/Design/hospitality/h8.webp"],
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

export default function ResortHotelPage() {
  if (!pageData) notFound();
  return <HotelPageTemplate data={pageData} />;
}

