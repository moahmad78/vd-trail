// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";

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
import SlideUpFade from "@/components/animations/SlideUpFade";

export default function RootLayout({
 children,
}: Readonly<{ children: React.ReactNode }>) {
 return (
 <html lang="en">
 <body className="min-h-full flex flex-col relative bg-[#030712] text-white overflow-x-hidden font-sans antialiased">
 <CustomCursor />
 <ConsoleSignature />
 <QuoteProvider>
 <Navbar />
 <div className="relative min-h-screen flex-grow">
 {" "}
 {/* Global Background Brand Icon Watermark */}{" "}
 <div className="absolute inset-0 pointer-events-none opacity-[0.025] flex items-center justify-center z-0 overflow-hidden">
 <Image unoptimized={true}
 quality={95}
      src="/logo/icon.png"
 alt="Voomet Design Global Background Brand Asset"
 width={900}
 height={900}
 className="object-contain transform rotate-12 select-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
 priority
 />
 </div>{" "}
 {/* Main Content Stream */}{" "}
 <div className="relative z-10 w-full overflow-x-hidden"> {children} </div>
 </div>
 <SlideUpFade delay={0.1}>
 <Footer />
 </SlideUpFade>
 <SchemaMarkup />
 <WhatsAppButton />
 </QuoteProvider>
 </body>
 </html>
 );
}
