import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Voomet Design",
  description: "Find answers to common questions about Voomet Design's interior design process, turnkey solutions, bespoke woodwork, and project timelines.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
