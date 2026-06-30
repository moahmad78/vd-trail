import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | Voomet Design",
  description: "Join Voomet Design and build the future of luxury interiors. Explore our open positions and career opportunities.",
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}