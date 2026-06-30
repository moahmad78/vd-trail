import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights & Journal | Voomet Design",
  description: "Read our latest insights, interior design trends, and architectural articles by Voomet Design.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}