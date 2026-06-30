import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Luxury Interior Designers in India",
  description: "Learn about Voomet Design's legacy, our approach to luxury interior design, and the visionary team behind our award-winning architectural projects.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}