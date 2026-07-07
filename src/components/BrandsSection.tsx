"use client";

import Image from "next/image";
import { useState } from "react";

const LOGOS = [
  { name: "Apps For Bharat", src: "/assets/global/brands/apps for bharath.png" },
  { name: "Physics Wallah",  src: "/assets/global/brands/pw.png" },
  { name: "Zluri",           src: "/assets/global/brands/zluri.png" },
  { name: "Juego",           src: "/assets/global/brands/juego-logo.png" },
  { name: "QpiAI",           src: "/assets/global/brands/qpi.png" },
  { name: "Emirates",        src: "/assets/global/brands/Emirates 2.png" },
  { name: "AirAsia",         src: "/assets/global/brands/Airasia 1.png" },
  { name: "Scripbox",        src: "/assets/global/brands/Scripbox 6.png" },
  { name: "Edureka",         src: "/assets/global/brands/Edureka 8.png" },
  { name: "IndiGo",          src: "/assets/global/brands/Indigo 4.png" },
  { name: "Gokaldas",        src: "/assets/global/brands/Gokuldas 3.png" },
];

export default function BrandsSection() {
  const [isPaused, setIsPaused] = useState(false);
  
  // Duplicate logos internally so the animation appears endless. 
  // 3 copies allow us to translate -33.333% perfectly.
  const TRACK = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <section className="w-full max-w-full bg-white py-[45px] md:py-[60px] overflow-hidden overflow-x-hidden">
      
      {/* ── TOP SECTION: Text ── */}
      <div className="site-container w-full max-w-[1440px] mx-auto px-6 md:px-12 mb-[30px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-end text-left">
          <div className="md:col-span-6 lg:col-span-6">
            <span className="text-[12px] uppercase tracking-[0.25em] font-bold text-[#6E7D9B] mb-4 block">
              TRUSTED BY
            </span>
            <h2 className="text-[32px] md:text-[40px] font-[700] text-[#001B4E] leading-[1.1] tracking-tight max-w-[500px]">
              Brands We&apos;ve Worked With
            </h2>
          </div>
          <div className="md:col-span-6 lg:col-span-6 flex md:justify-start mt-4 md:mt-0">
            <p className="text-slate-600 text-[16px] leading-relaxed max-w-[500px] md:max-w-none md:whitespace-nowrap">
              Trusted by leading brands across hospitality, residential, education and commercial sectors.
            </p>
          </div>
        </div>
      </div>

      {/* ── BOTTOM SECTION: Full Width Marquee ── */}
      <div className="w-full max-w-full relative overflow-hidden overflow-x-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <style>{`
          @keyframes marquee-brands {
            from { transform: translateX(0); }
            to   { transform: translateX(-33.3333%); }
          }
        `}</style>
        
        <div className="flex flex-nowrap items-center h-[70px] md:h-[90px] min-w-0">
          <div
            className="flex flex-nowrap items-center h-full gap-16 md:gap-24 lg:gap-28 min-w-0"
            style={{
              width: "max-content",
              animation: "marquee-brands 35s linear infinite",
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {TRACK.map((logo, index) => (
              <div 
                key={`logo-${index}`} 
                className="relative flex-shrink-0 w-[140px] md:w-[170px] h-[45px] md:h-[55px] transition-all duration-300 opacity-90 hover:opacity-100 cursor-pointer hover:-translate-y-[2px]"
              >
                <Image src={logo.src} 
                  alt={logo.name} 
                  fill sizes="(max-width: 768px) 120px, 160px" 
                  className="object-contain" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
