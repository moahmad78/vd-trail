"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Building2, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

export interface FacadeProject {
  title: string;
  category: string;
  location: string;
  image: string;
}

export const FACADE_PROJECTS: FacadeProject[] = [
  {
    title: "Embassy Fountainhead",
    category: "Commercial IT Complex",
    location: "Bengaluru",
    image: "/images/altech/projects/embassy_fountainhead.png",
  },
  {
    title: "GKNM College of Nursing",
    category: "Institutional Glazing & Facade",
    location: "Coimbatore",
    image: "/images/altech/projects/gknm_nursing.png",
  },
  {
    title: "Cardinal One",
    category: "Luxury High-Rise Glazing",
    location: "Bengaluru",
    image: "/images/altech/projects/cardinal_one.png",
  },
  {
    title: "Embassy Cyprus Point",
    category: "Corporate Headquarters",
    location: "Bengaluru",
    image: "/images/altech/projects/embassy_cyprus_point.png",
  },
  {
    title: "Concorde Econex",
    category: "Commercial Tech Hub",
    location: "Bengaluru",
    image: "/images/altech/projects/concorde_econex.png",
  },
  {
    title: "SNN Bay Vista",
    category: "High-Rise Residential Living",
    location: "Bengaluru",
    image: "/images/altech/projects/snn_bay_vista.png",
  },
  {
    title: "GKNMH Healthcare",
    category: "Healthcare Facility Envelope",
    location: "Coimbatore",
    image: "/images/altech/projects/gknmh.png",
  },
  {
    title: "Hiranandani – Anchorage",
    category: "Waterfront Residential Balconies",
    location: "Chennai",
    image: "/images/altech/projects/hiranandani_anchorage.png",
  },
  {
    title: "Brigade Wisteria",
    category: "Integrated Residential Assemblies",
    location: "Bengaluru",
    image: "/images/altech/projects/brigade_wisteria.png",
  },
  {
    title: "Prestige Tristar",
    category: "Acoustic Fenestration Towers",
    location: "Bengaluru",
    image: "/images/altech/projects/prestige_tristar.png",
  },
];

interface FacadeProjectsSliderProps {
  title?: string;
  badge?: string;
  subtitle?: string;
  className?: string;
}

export default function FacadeProjectsSlider({
  title = "Flagship Executed Projects",
  badge = "PORTFOLIO HIGHLIGHTS",
  subtitle = "Major commercial, institutional, and high-rise developments delivered with structural precision.",
  className = "",
}: FacadeProjectsSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className={`w-full py-16 md:py-24 bg-[#0F172A] text-white overflow-hidden ${className}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header with Left/Right Buttons */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-3 block">
              {badge}
            </span>
            <h2 className="text-[28px] md:text-[44px] font-extrabold text-white leading-[1.1] tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-slate-300 text-sm md:text-base mt-2 max-w-xl font-normal">
                {subtitle}
              </p>
            )}
          </div>

          {/* Slider Control Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-12 h-12 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-[#0F172A] text-white flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-12 h-12 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-[#0F172A] text-white flex items-center justify-center transition-all duration-300 shadow-md cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2 px-1 -mx-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {FACADE_PROJECTS.map((project, idx) => (
            <div
              key={`facade-proj-${idx}`}
              className="w-[300px] sm:w-[360px] md:w-[400px] shrink-0 snap-start rounded-3xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-500 flex flex-col overflow-hidden group shadow-xl hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative w-full h-56 sm:h-64 bg-slate-800 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 300px, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/30 to-transparent opacity-90" />
                
                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-slate-200 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                    #{String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-wider uppercase text-white px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                    <MapPin size={11} className="text-orange-400" />
                    {project.location}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-1 bg-gradient-to-b from-[#0F172A]/40 to-[#0F172A]">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400 block mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-extrabold text-white group-hover:text-slate-100 transition-colors">
                    {project.title}
                  </h3>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400">Precision Installation</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-slate-300 group-hover:bg-white group-hover:text-[#0F172A] transition-all duration-300">
                    <Building2 size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
