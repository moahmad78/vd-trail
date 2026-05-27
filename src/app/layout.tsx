// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import Image from "next/image";
import "./globals.css";
const jakarta = Plus_Jakarta_Sans({ variable: "--font-sans", subsets: ["latin"] });
const grotesk = Space_Grotesk({ variable: "--font-display", subsets: ["latin"] });
export const metadata: Metadata = {
  description:
    "Transforming spaces from concept to reality. Expert solutions for Hospitality, Education, and Residential projects.",
  icons: { icon: "/logo/icon.png" },
};
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SchemaMarkup from "@/components/SchemaMarkup";
import WhatsAppButton from "@/components/WhatsAppButton";
import { QuoteProvider } from "@/contexts/QuoteContext";
import CustomCursor from "@/components/CustomCursor";
import ConsoleSignature from "@/components/ConsoleSignature";
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${grotesk.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col relative bg-white text-slate-900 overflow-x-hidden font-sans">
        <CustomCursor />
        <ConsoleSignature />
        <QuoteProvider>
          <Navbar />
          <div className="relative min-h-screen flex-grow">
            {" "}
            {/* Global Background Brand Icon Watermark */}{" "}
            <div className="absolute inset-0 pointer-events-none opacity-[0.025] flex items-center justify-center z-0 overflow-hidden">
              <Image
                src="/logo/icon.png"
                alt="Voomet Design Global Background Brand Asset"
                width={900}
                height={900}
                className="object-contain transform rotate-12 select-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                priority
              />
            </div>{" "}
            {/* Main Content Stream */}{" "}
            <div className="relative z-10"> {children} </div>
          </div>
          <Footer />
          <SchemaMarkup />
          <WhatsAppButton />
        </QuoteProvider>
      </body>
    </html>
  );
}
