import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Voomet Design",
  description: "Learn about Voomet Design's legacy, our approach to luxury interior design, and the visionary team behind our projects.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}