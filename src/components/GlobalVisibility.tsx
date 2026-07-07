"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SlideUpFade from "@/components/animations/SlideUpFade";
import WhatsAppButton from "@/components/WhatsAppButton";

const hiddenRoutes = ["/lead"];

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
