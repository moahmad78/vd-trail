// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { ANALYTICS_CONFIG } from "@/config/analytics";
import ClarityScript from "@/components/ClarityScript";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";

import OrganizationSchema from "@/components/seo/OrganizationSchema";
import { siteConfig } from "@/lib/site-config";
import { QuoteProvider } from "@/contexts/QuoteContext";
import CustomCursor from "@/components/CustomCursor";
import ConsoleSignature from "@/components/ConsoleSignature";
import { GlobalHeader, GlobalFooter, GlobalLayoutWrapper } from "@/components/GlobalVisibility";
import "./globals.css";

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
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.brandName} | Interior Design & Turnkey Solutions in Bangalore`,
    template: `%s | ${siteConfig.brandName}`,
  },
  description: "VoometDesign delivers luxury residential, commercial & turnkey interior fit-outs in Bangalore with precision in-house manufacturing. Book a consultation!",
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  openGraph: {
    title: `${siteConfig.brandName} | Interior Design & Turnkey Solutions in Bangalore`,
    description: "VoometDesign delivers luxury residential, commercial & turnkey interior fit-outs in Bangalore with precision in-house manufacturing. Book a consultation!",
    url: siteConfig.siteUrl,
    siteName: siteConfig.brandName,
    images: [
      {
        url: siteConfig.logo,
        width: 1200,
        height: 630,
        alt: `${siteConfig.brandName} — Premium Interior Design Studio in Bangalore`,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.brandName} | Interior Design & Turnkey Solutions in Bangalore`,
    description: "Crafting luxury residential homes, boutique hotels, and high-performance commercial environments in Bangalore and across India.",
    images: [siteConfig.logo],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/new-logo/icon.webp", type: "image/webp", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
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
    <html lang="en" className={satoshi.variable} data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/new-logo/icon.webp" type="image/webp" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://voometdesign.com" />
        <OrganizationSchema />
        {ANALYTICS_CONFIG.GTM_ID && <GoogleTagManager gtmId={ANALYTICS_CONFIG.GTM_ID} />}
      </head>
      <body className="min-h-full flex flex-col relative w-full bg-[#030712] text-white font-sans antialiased">
        {ANALYTICS_CONFIG.GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${ANALYTICS_CONFIG.GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <SmoothScrollProvider>
          <CustomCursor />
          <ConsoleSignature />
          <QuoteProvider>
            <GlobalHeader />
            <GlobalLayoutWrapper>
              {/* Main Content Stream */}
              <div className="relative z-10 w-full overflow-clip"> {children} </div>
            </GlobalLayoutWrapper>
            <GlobalFooter />
          </QuoteProvider>
        </SmoothScrollProvider>

        {/* Deferred Non-Critical Analytics for optimal Performance & 0ms TBT */}
        <ClarityScript />
        {ANALYTICS_CONFIG.GA_MEASUREMENT_ID && <GoogleAnalytics gaId={ANALYTICS_CONFIG.GA_MEASUREMENT_ID} />}

        {/* Meta Pixel Code (Idle / Interaction Loaded) */}
        <Script
          id="fb-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(){
  function initFB(){
    if(window._fbInitDone) return;
    window._fbInitDone = true;
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1266233628918384');
    fbq('init', '1434564675397419');
    fbq('track', 'PageView');
  }
  if('requestIdleCallback' in window){
    requestIdleCallback(function(){ setTimeout(initFB, 2500); });
  } else {
    setTimeout(initFB, 3500);
  }
  ['scroll', 'click', 'touchstart'].forEach(function(e){
    window.addEventListener(e, initFB, { once: true, passive: true });
  });
})();`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1266233628918384&ev=PageView&noscript=1"
          />
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1434564675397419&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
