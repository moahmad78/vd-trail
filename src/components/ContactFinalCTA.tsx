"use client";

import Link from "next/link";
import { useState } from "react";
import SlideUpFade from "./animations/SlideUpFade";
import { useQuote } from "@/contexts/QuoteContext";

function PrimaryBtn({ onClick, label }: { onClick: () => void; label: string }) {
  const [over, setOver] = useState(false);
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-xl font-bold text-[11px] uppercase tracking-[0.22em] transition-all duration-300 whitespace-nowrap"
      style={{
        backgroundColor: "#FFFFFF",
        color: "#0B1633",
        padding: "16px 36px",
        transform: over ? "translateY(-2px)" : "translateY(0)",
        boxShadow: over
          ? "0 12px 30px rgba(255,255,255,0.15)"
          : "0 4px 14px rgba(0,0,0,0.1)",
      }}
      onMouseEnter={() => setOver(true)}
      onMouseLeave={() => setOver(false)}
    >
      {label}
    </button>
  );
}

function SecondaryBtn({ href, label }: { href: string; label: string }) {
  const [over, setOver] = useState(false);
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-xl font-bold text-[11px] uppercase tracking-[0.22em] transition-all duration-300 whitespace-nowrap"
      style={{
        backgroundColor: over ? "rgba(255,255,255,0.10)" : "transparent",
        color: "#FFFFFF",
        border: "1px solid rgba(255,255,255,0.30)",
        padding: "15px 32px",
        transform: over ? "translateY(-2px)" : "translateY(0)",
      }}
      onMouseEnter={() => setOver(true)}
      onMouseLeave={() => setOver(false)}
    >
      {label}
      <svg
        width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true"
        style={{
          transition: "transform 0.3s ease",
          transform: over ? "translateX(2px)" : "translateX(0)",
        }}
      >
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

export default function ContactFinalCTA() {
  const { setIsQuoteOpen } = useQuote();

  return (
    <section className="py-20 md:py-32 relative z-10 px-6 md:px-12 bg-[#0B1635] overflow-hidden">
      {/* Subtle abstract background element */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border-[1px] border-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full border-[1px] border-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full border-[1px] border-white" />
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10 text-center">
        <SlideUpFade>
          <h2
            className="font-bold leading-[1.05] tracking-[-0.03em] text-white mb-6"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.8rem)",
            }}
          >
            Ready To Design Something Extraordinary?
          </h2>
        </SlideUpFade>
        
        <SlideUpFade delay={0.1}>
          <p className="text-[15px] md:text-[17px] text-slate-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Let&apos;s turn your vision into spaces crafted with precision and purpose.
          </p>
        </SlideUpFade>

        <SlideUpFade delay={0.2}>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <PrimaryBtn onClick={() => setIsQuoteOpen(true)} label="Book Consultation" />
            <SecondaryBtn href="tel:+919845014279" label="Call Now" />
          </div>
        </SlideUpFade>
      </div>
    </section>
  );
}
