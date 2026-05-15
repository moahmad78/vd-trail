import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Voomet Design | Luxury Interiors & Aluminium Solutions",
  description: "Transforming spaces from concept to reality. Expert solutions for Healthcare, Hospitality, Education, and Residential projects.",
  icons: {
    icon: "/logo/icon.png",
  },
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOKeywords from "@/components/SEOKeywords";
import SchemaMarkup from "@/components/SchemaMarkup";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col relative bg-white">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <SEOKeywords />
        <SchemaMarkup />
        <WhatsAppButton />
      </body>
    </html>
  );
}
