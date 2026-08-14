"use client";

import React from "react";
import { Building2, Award, ShieldCheck, CheckCircle2 } from "lucide-react";

interface AltechTrustBadgeProps {
  variant?: "compact" | "full";
  className?: string;
  dark?: boolean;
}

export default function AltechTrustBadge({
  variant = "compact",
  className = "",
  dark = false,
}: AltechTrustBadgeProps) {
  const stats = [
    {
      value: "250+",
      label: "Projects Completed",
      icon: Building2,
      desc: "Turnkey Commercial & Residential Installations",
    },
    {
      value: "25+",
      label: "Years of Expertise",
      icon: Award,
      desc: "Mastery in Structural Glazing & Fenestration",
    },
    {
      value: "10+",
      label: "Years Warranty",
      icon: ShieldCheck,
      desc: "ISO-Grade Structural & Finish Assurance",
    },
  ];

  if (variant === "compact") {
    return (
      <section className={`w-full ${className}`}>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-6">
          <div
            className={`rounded-2xl md:rounded-3xl p-5 md:p-6 transition-all duration-300 ${
              dark
                ? "bg-[#0F172A] border border-white/10 text-white shadow-xl shadow-black/20"
                : "bg-white/90 backdrop-blur-md border border-slate-200/80 text-[#0F172A] shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            }`}
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Attribution Label */}
              <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#0F172A]/5 text-[#0F172A] border border-[#0F172A]/10 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-[#0F172A] animate-pulse" />
                  In-House Fabrication Partner
                </span>
                <p
                  className={`text-xs md:text-sm font-medium leading-snug ${
                    dark ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  Fabricated &amp; Installed by{" "}
                  <strong className={dark ? "text-white" : "text-[#0F172A]"}>
                    Altech Enterprises
                  </strong>{" "}
                  — our in-house associate facade &amp; fenestration company.
                </p>
              </div>

              {/* Stat Chips */}
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 shrink-0">
                {stats.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl ${
                        dark
                          ? "bg-white/5 border border-white/10"
                          : "bg-slate-50 border border-slate-200/60"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        dark ? "bg-white/10 text-white" : "bg-[#0F172A]/5 text-[#0F172A]"
                      }`}>
                        <Icon size={16} />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-sm md:text-base font-extrabold leading-none tracking-tight">
                          {item.value}
                        </span>
                        <span
                          className={`text-[10px] md:text-[11px] font-medium tracking-wide uppercase mt-0.5 ${
                            dark ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Full Expanded Variant
  return (
    <section className={`w-full ${className}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-10">
        <div className="relative rounded-3xl md:rounded-[2.5rem] bg-[#0F172A] border border-white/10 p-8 md:p-14 text-white overflow-hidden shadow-2xl">
          {/* Subtle Ambient Glow matching Voomet dark cards */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-8 mb-8 border-b border-white/10">
              <div>
                <span className="text-[12px] uppercase tracking-[0.25em] font-bold text-slate-400 mb-2 block">
                  FABRICATION EXCELLENCE
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  Altech Enterprises — Associate Company
                </h3>
              </div>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-slate-200 border border-white/15">
                <CheckCircle2 size={14} className="text-slate-300" />
                100% In-House Execution
              </span>
            </div>

            <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed mb-10">
              Voomet Design executes high-performance facade engineering and architectural fenestration through our specialized associate company, <strong>Altech Enterprises</strong> (Doddaballapura Industrial Area). All extrusion cutting, corner crimping, and structural glazing are performed on precision CNC machinery under strict ISO quality audits.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                      <Icon size={22} />
                    </div>
                    <div>
                      <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight block mb-1">
                        {item.value}
                      </span>
                      <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-2">
                        {item.label}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
