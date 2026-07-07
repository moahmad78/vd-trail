import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead Intelligence Dashboard",
  description: "Centralized architectural and spatial consultation requests.",
};

export default function LeadAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
