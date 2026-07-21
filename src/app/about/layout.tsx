import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story | Voomet Design",
  description: "Founded in 2010, Voomet Design delivers precision-crafted interiors across residential, hospitality, and commercial spaces throughout India.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "Our Story | Voomet Design",
    description: "Founded in 2010, Voomet Design delivers precision-crafted interiors across residential, hospitality, and commercial spaces throughout India.",
  },
  twitter: {
    title: "Our Story | Voomet Design",
    description: "Founded in 2010, Voomet Design delivers precision-crafted interiors across residential, hospitality, and commercial spaces throughout India.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}