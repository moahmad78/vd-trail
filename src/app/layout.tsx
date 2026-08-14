// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
import type { Metadata, Viewport } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { ANALYTICS_CONFIG } from "@/config/analytics";
import ClarityScript from "@/components/ClarityScript";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import SchemaMarkup from "@/components/SchemaMarkup";
import { QuoteProvider } from "@/contexts/QuoteContext";
import CustomCursor from "@/components/CustomCursor";
import ConsoleSignature from "@/components/ConsoleSignature";
import { GlobalHeader, GlobalFooter, GlobalLayoutWrapper } from "@/components/GlobalVisibility";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/satoshi-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi-700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.voometdesign.com"),
  title: {
    default: "Voomet Design | Luxury Interior Designers in Bangalore",
    template: "%s | Voomet Design",
  },
  description: "Voomet Design is a premium interior design studio crafting luxury residential homes, boutique hotels, and high-performance commercial environments in Bangalore and across India.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Voomet Design | Luxury Interior Designers in Bangalore",
    description: "Crafting luxury residential homes, boutique hotels, and high-performance commercial environments in Bangalore and across India.",
    url: "https://www.voometdesign.com",
    siteName: "Voomet Design",
    images: [
      {
        url: "/logo/icon.webp",
        width: 1200,
        height: 630,
        alt: "Voomet Design — Premium Interior Design Studio in Bangalore",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Voomet Design | Luxury Interior Designers in Bangalore",
    description: "Crafting luxury residential homes, boutique hotels, and high-performance commercial environments in Bangalore and across India.",
    images: ["/logo/icon.webp"],
  },
  icons: {
    icon: [
      { url: "/logo/icon.webp", type: "image/png", sizes: "512x512" },
    ],
    apple: "/logo/icon.webp",
  },
  verification: {
    google: "lMjXEOUJNj6NVydYqKIk5r_xqZZN14vvOEcTGXeP1Mk",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0f172a",
};

export default function RootLayout({
 children,
}: Readonly<{ children: React.ReactNode }>) {
 return (
 <html lang="en" className={`${inter.variable} ${satoshi.variable}`} data-scroll-behavior="smooth">
 <head>
 </head>
 {ANALYTICS_CONFIG.GTM_ID && <GoogleTagManager gtmId={ANALYTICS_CONFIG.GTM_ID} />}
 <body className="min-h-full flex flex-col relative w-full bg-[#030712] text-white font-sans antialiased">
 <SmoothScrollProvider>
 <CustomCursor />
 <ConsoleSignature />
  <QuoteProvider>
  <GlobalHeader />
   <GlobalLayoutWrapper>
   {/* Global Background Brand Icon Watermark */}
   <div className="fixed inset-0 pointer-events-none opacity-[0.025] flex items-center justify-center z-0 overflow-hidden">
    <Image
     quality={75}
     src="/logo/icon.webp"
     alt="Voomet Design Global Background Brand Asset"
     width={900}
     height={900}
     className="object-contain transform rotate-12 select-none pointer-events-none will-change-transform"
     priority
    />
   </div>
   {/* Main Content Stream */}
   <div className="relative z-10 w-full overflow-clip"> {children} </div>
   </GlobalLayoutWrapper>
  <GlobalFooter />
  <SchemaMarkup />
  </QuoteProvider>
 </SmoothScrollProvider>
 <ClarityScript />
 {ANALYTICS_CONFIG.GA_MEASUREMENT_ID && <GoogleAnalytics gaId={ANALYTICS_CONFIG.GA_MEASUREMENT_ID} /> }
 </body>
 </html>
 );
}
