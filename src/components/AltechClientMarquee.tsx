"use client";

import React, { useState } from "react";

export const ALL_CLIENT_LOGOS = [
  { name: "Prestige Group", file: "Prestige_Group.png" },
  { name: "Embassy Group", file: "Embassy_Group_Logo.png" },
  { name: "Brigade Group", file: "brigade.jpg" },
  { name: "Century Real Estate", file: "century.png" },
  { name: "Puravankara", file: "Puravankara.jpg" },
  { name: "Godrej Properties", file: "godrej.jpg" },
  { name: "L&T Construction", file: "lt.png" },
  { name: "House of Hiranandani", file: "house-of-hiranandani.png" },
  { name: "Concorde Group", file: "concorde.png" },
  { name: "JLL", file: "jll.png" },
  { name: "SNN Raj Corp", file: "snn-raj.png" },
  { name: "Swan Group", file: "swan_group.jpg" },
  { name: "Aditya Birla Group", file: "Aditya_Birla.webp" },
  { name: "Saint-Gobain", file: "Saint-Gobain.webp" },
  { name: "Asahi India Glass", file: "asahi.webp" },
  { name: "Dormakaba", file: "Dormakaba.jpg" },
  { name: "Jindal Aluminium", file: "jiindal.png" },
  { name: "YKK AP", file: "ykk.png" },
  { name: "Hilti", file: "hilti.png" },
  { name: "Aludecor", file: "aludecor.png" },
  { name: "Giesse", file: "giesse.png" },
  { name: "Dow", file: "dow.png" },
  { name: "McCoy Soudal", file: "mccoy.jpg" },
  { name: "Fischer", file: "fischer.png" },
  { name: "Frontek", file: "frontek.png" },
  { name: "Stonelam", file: "stonelam.png" },
  { name: "King Long", file: "king-lon.png" },
  { name: "Klimas", file: "klimas.png" },
  { name: "Tremco", file: "tremco.png" },
];

// Backward compatibility exports
export const ALTECH_CLIENTS = ALL_CLIENT_LOGOS.slice(0, 15);
export const ALTECH_ASSOCIATES = ALL_CLIENT_LOGOS.slice(15);

function CleanLogoItem({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="h-16 md:h-20 px-6 flex items-center justify-center text-center shrink-0">
        <span className="text-xs md:text-sm font-bold tracking-wider text-[#0B1633] uppercase whitespace-nowrap">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className="h-16 md:h-20 min-w-[140px] md:min-w-[200px] px-4 md:px-7 flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-105">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="max-h-12 md:max-h-16 w-auto max-w-[180px] md:max-w-[220px] object-contain transition-all duration-300"
        onError={() => setHasError(true)}
      />
    </div>
  );
}

interface AltechClientMarqueeProps {
  title?: string;
  badgeText?: string;
  subtitle?: string;
  caption?: string;
  className?: string;
}

export default function AltechClientMarquee({
  title = "Trusted by India's Leading Developers & Brands",
  badgeText = "OUR CLIENTELE & INSTALLATIONS",
  subtitle = "Our products, architectural systems, and custom fabrications are installed across marquee residential, commercial, and institutional projects nationwide.",
  caption,
  className = "",
}: AltechClientMarqueeProps) {
  const MARQUEE_ITEMS = [...ALL_CLIENT_LOGOS, ...ALL_CLIENT_LOGOS];

  return (
    <section className={`w-full py-14 md:py-20 bg-white overflow-hidden ${className}`}>
      <style>{`
        @keyframes client-single-marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .animate-client-marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
          transform: translateZ(0);
          animation: client-single-marquee 35s linear infinite;
        }
        .animate-client-marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-client-marquee-track {
            animation-play-state: paused;
          }
        }
      `}</style>

      {/* Header: Side-by-Side (Heading on Left, Caption on Right) */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-10 md:mb-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-end text-left">
          <div className="md:col-span-7 lg:col-span-7">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-[#0F172A]/5 text-[#6E7D9B] border border-[#0F172A]/10 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F172A] animate-pulse" />
              {badgeText}
            </span>
            <h2 className="text-[28px] md:text-[40px] font-extrabold text-[#0B1633] tracking-tight leading-[1.1]">
              {title}
            </h2>
          </div>
          {subtitle && (
            <div className="md:col-span-5 lg:col-span-5 flex md:justify-end">
              <p className="text-slate-600 text-[14px] md:text-[15px] leading-relaxed font-normal max-w-[500px]">
                {subtitle}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Single-Line Continuous Infinite Marquee */}
      <div
        className="relative w-full overflow-hidden flex"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)"
        }}
      >
        <div className="animate-client-marquee-track items-center gap-6 md:gap-10 py-2">
          {MARQUEE_ITEMS.map((client, idx) => (
            <CleanLogoItem
              key={`logo-${idx}`}
              src={`/pdf/logo/${client.file}`}
              alt={client.name}
            />
          ))}
        </div>
      </div>

      {caption && (
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 mt-10 md:mt-14">
          <div className="p-5 md:p-7 rounded-2xl bg-[#FAFAF8] border border-slate-200 text-center max-w-4xl mx-auto shadow-xs">
            <p className="text-sm md:text-base text-slate-700 leading-relaxed font-medium">
              {caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}


