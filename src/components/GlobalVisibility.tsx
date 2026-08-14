"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SlideUpFade from "@/components/animations/SlideUpFade";
import WhatsAppButton from "@/components/WhatsAppButton";

const hiddenRoutes = ["/lead", "/adminlead", "/login"];

export function GlobalHeader() {
  const pathname = usePathname();
  if (pathname && hiddenRoutes.includes(pathname)) return null;
  return <Navbar />;
}

export function GlobalFooter() {
  const pathname = usePathname();
  if (pathname && hiddenRoutes.includes(pathname)) return null;
  return (
    <>
      <SlideUpFade delay={0.1}>
        <Footer />
      </SlideUpFade>
      <WhatsAppButton />
    </>
  );
}

export function GlobalLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname && hiddenRoutes.includes(pathname);
  return (
    <div className={`relative min-h-screen flex-grow min-w-0 ${isDashboard ? "" : "pt-20"}`}>
      {children}
    </div>
  );
}

