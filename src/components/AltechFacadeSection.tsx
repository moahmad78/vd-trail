"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2, Maximize2, ShieldCheck, Sparkles, Shield, Layers,
  CheckCircle2, ChevronRight, ArrowRight
} from "lucide-react";
import AltechTrustBadge from "@/components/AltechTrustBadge";
import AltechClientMarquee from "@/components/AltechClientMarquee";
import FacadeProjectsSlider from "@/components/FacadeProjectsSlider";

export interface AltechFacadeData {
  companyName: string;
  tagline: string;
  aboutText: string;
  commitment: string;
  vision: string;
  commercialSolutionsHeading: string;
  commercialSolutionsSubhead: string;
  commercialSolutions: {
    title: string;
    desc: string;
    iconType: string;
  }[];
  portfolioHeading: string;
  portfolioProjects: {
    title: string;
    location: string;
    category: string;
    image?: string;
  }[];
  statsBanner: {
    value: string;
    label: string;
  }[];
  tags: string[];
  clientLogos: { name: string; file: string }[];
  associateLogos: { name: string; file: string }[];
  partnershipsCaption: string;
}

const SOLUTION_ICONS: Record<string, any> = {
  unitized: Building2,
  spider: Maximize2,
  structural: ShieldCheck,
  canopy: Sparkles,
  railing: Shield,
  cladding: Layers,
};

// Robust Logo Image with fallback (Original Colors, Large, Clean Floating)
function LogoImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="h-20 md:h-24 px-4 flex items-center justify-center text-center">
        <span className="text-sm md:text-base font-extrabold tracking-wider text-[#0F172A] uppercase whitespace-nowrap">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className="h-20 md:h-24 w-full flex items-center justify-center p-2 transition-transform duration-300 hover:scale-110">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="max-h-14 md:max-h-18 w-auto max-w-[200px] md:max-w-[240px] object-contain mix-blend-multiply transition-all duration-300"
        onError={() => setHasError(true)}
      />
    </div>
  );
}

export default function AltechFacadeSection({ data }: { data: AltechFacadeData }) {
  return (
    <div className="w-full space-y-16 md:space-y-24">
      {/* ─────────────────────────────────────────────────────────────
          BLOCK A: COMPANY PROFILE & BRIEF INTRO
      ───────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-8 md:pt-12">
        <div className="rounded-3xl bg-white border border-slate-200/80 p-8 md:p-12 shadow-sm relative overflow-hidden">
          <div className="relative z-10">
            {/* Header Ribbon */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-xs font-bold tracking-wider text-[#0F172A] uppercase">
                <span className="h-2 w-2 rounded-full bg-[#0F172A] animate-pulse" />
                Altech Enterprises — Associate Company Profile
              </div>
              <span className="text-xs font-bold tracking-widest text-[#6E7D9B] uppercase">
                Façade &amp; Fenestration Division
              </span>
            </div>

            {/* Concise Intro Lead (2-3 sentences max) */}
            <div className="max-w-4xl">
              <h2 className="text-2xl md:text-3xl lg:text-[36px] font-extrabold text-[#0F172A] leading-[1.15] tracking-tight mb-4">
                Engineering Precision. Architectural Elegance.
              </h2>
              <p className="text-base md:text-lg text-slate-600 font-normal leading-relaxed">
                {data.aboutText} Altech Enterprises delivers certified facade engineering, structural glazing, and high-performance fenestration for landmark commercial and institutional developments across South India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badge Full Variant */}
      <AltechTrustBadge variant="full" />

      {/* ─────────────────────────────────────────────────────────────
          BLOCK B: COMMERCIAL FACADE SOLUTIONS (6-ITEM GRID)
      ───────────────────────────────────────────────────────────── */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="md:w-1/2">
            <span className="text-[12px] uppercase tracking-[0.25em] font-bold text-[#6E7D9B] mb-3 block text-left">
              COMMERCIAL EXPERTISE
            </span>
            <h2 className="text-[32px] md:text-[44px] font-extrabold text-[#0F172A] leading-[1.1] tracking-tight mb-0 text-left">
              {data.commercialSolutionsHeading}
            </h2>
          </div>
          <div className="md:w-1/2 md:text-right">
            <p className="text-[15px] md:text-[17px] text-slate-600 leading-relaxed md:ml-auto text-left md:text-right">
              {data.commercialSolutionsSubhead}
            </p>
          </div>
        </div>

        {/* 6-Item Card Grid matching VoometDesignDifference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {data.commercialSolutions.map((item, idx) => {
            const Icon = SOLUTION_ICONS[item.iconType] || Building2;
            return (
              <div
                key={idx}
                className="p-8 rounded-[2rem] bg-white border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 text-[#0F172A] group-hover:bg-[#0F172A] group-hover:text-white group-hover:border-[#0F172A] flex items-center justify-center mb-6 transition-all duration-300 shadow-2xs">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#0F172A] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-[15px]">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold tracking-wider text-slate-400 uppercase">
                  <span>SYSTEM {String(idx + 1).padStart(2, "0")}</span>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-[#0F172A] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          BLOCK D: RESIDENTIAL SYSTEMS (COMPACT HUB SECTION)
      ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#FAFAF8] py-14 border-y border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="rounded-3xl bg-white border border-slate-200/80 p-8 md:p-12 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-3/5 text-center lg:text-left">
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#6E7D9B] mb-2 block">
                RESIDENTIAL FENESTRATION
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] tracking-tight mb-3">
                Residential Systems &amp; Private Living
              </h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
                In addition to mega commercial envelopes, Altech delivers specialized aluminium and uPVC fenestration engineered for luxury homes and high-rises.
              </p>

              {/* Compact Pill Row */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                {[
                  "Sliding Doors & Windows",
                  "Slim Line Systems",
                  "Tilt & Turn Windows",
                  "uPVC Window Systems",
                  "Internal Glass Partitions",
                  "Shower Enclosures",
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-[#0F172A] border border-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="lg:w-2/5 flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full shrink-0">
              <Link
                href="/services/aluminium-systems"
                className="w-full py-3.5 px-6 rounded-full bg-[#0F172A] text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xs hover:shadow-md"
              >
                <span>Explore Aluminium Systems</span>
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/services/upvc-systems"
                className="w-full py-3.5 px-6 rounded-full bg-slate-100 text-[#0F172A] border border-slate-300 font-bold text-xs uppercase tracking-wider hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
              >
                <span>Explore UPVC Systems</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          BLOCK C: COMPLETED PROJECTS SLIDER
      ───────────────────────────────────────────────────────────── */}
      <FacadeProjectsSlider title={data.portfolioHeading} />


      {/* ─────────────────────────────────────────────────────────────
          BLOCK D: CLIENT & ASSOCIATE MARQUEE SLIDES
      ───────────────────────────────────────────────────────────── */}
      <AltechClientMarquee
        title="Trusted by Leading Developers & Global Partners"
        badgeText="PROVEN CLIENTELE & ASSOCIATES"
        subtitle="Our in-house fabrication division Altech Enterprises delivers architectural fenestration & facade engineering for India's marquee real estate brands."
        caption={data.partnershipsCaption}
      />
    </div>
  );
}
