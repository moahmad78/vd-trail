"use client";

import Image from "next/image";
import { useState } from "react";

const LOGOS = [
  { name: "Apps For Bharat", src: "/assets/global/brands/apps for bharath.webp" },
  { name: "Physics Wallah",  src: "/assets/global/brands/pw.webp" },
  { name: "Zluri",           src: "/assets/global/brands/zluri.webp" },
  { name: "Juego",           src: "/assets/global/brands/juego-logo.webp" },
  { name: "QpiAI",           src: "/assets/global/brands/qpi.webp" },
  { name: "Emirates",        src: "/assets/global/brands/Emirates 2.webp" },
  { name: "AirAsia",         src: "/assets/global/brands/Airasia 1.webp" },
  { name: "Scripbox",        src: "/assets/global/brands/Scripbox 6.webp" },
  { name: "Edureka",         src: "/assets/global/brands/Edureka 8.webp" },
  { name: "IndiGo",          src: "/assets/global/brands/Indigo 4.webp" },
  { name: "Gokaldas",        src: "/assets/global/brands/Gokuldas 3.webp" },
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
              Trusted across hospitality, residential, education & commercial sectors.
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
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-responsive {
            animation: marquee-brands 12s linear infinite;
          }
          @media (min-width: 768px) {
            .marquee-responsive {
              animation: marquee-brands 25s linear infinite;
            }
          }
        `}</style>
        
        <div className="flex flex-nowrap items-center h-[70px] md:h-[90px] min-w-0">
          <div
            className="flex flex-nowrap items-center h-full w-max marquee-responsive"
            style={{
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {/* First Set */}
            <div className="flex flex-nowrap gap-6 md:gap-24 lg:gap-28 pr-6 md:pr-24 lg:pr-28">
              {LOGOS.map((logo, index) => (
                <div 
                  key={`logo-1-${index}`} 
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
            
            {/* Second Set (Duplicate for seamless loop) */}
            <div className="flex flex-nowrap gap-6 md:gap-24 lg:gap-28 pr-6 md:pr-24 lg:pr-28" aria-hidden="true">
              {LOGOS.map((logo, index) => (
                <div 
                  key={`logo-2-${index}`} 
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
      </div>

    </section>
  );
}
