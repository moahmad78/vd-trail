"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ArrowUpRight, ShieldCheck, Factory } from "lucide-react";

export default function AssociateCompany() {
  return (
    <section className="relative overflow-hidden bg-[#0A1128] py-16 md:py-24 text-white">
      {/* Background Decorative Gradients */}
      <div className="pointer-events-none absolute -left-1/4 -top-1/4 h-[500px] w-[500px] rounded-full bg-orange-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-1/4 -bottom-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="site-container relative z-10 mx-auto px-6 md:px-12">
        
        {/* Header Ribbon */}
        <div className="mb-10 text-center md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-orange-400 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
            Voomet Design Associate Company
          </span>
        </div>

        {/* Main Content Box */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Column: Visual Branding Card */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-12 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-orange-500/20 group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Outer Logo Container (Emulates the image structure) */}
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 relative z-10">
                
                {/* Altech Branding */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  {/* ALTECH Orange Box */}
                  <div className="inline-block bg-[#F97316] px-6 py-2.5 rounded-lg shadow-lg mb-2">
                    <span className="text-[28px] md:text-[34px] font-black uppercase tracking-[0.08em] leading-none text-white select-none">
                      ALTECH
                    </span>
                  </div>
                  {/* Enterprises outlined style */}
                  <div className="border border-white/35 rounded px-4 py-1.5 mb-3 bg-white/5">
                    <span className="text-[20px] md:text-[24px] font-semibold text-white tracking-[0.05em] uppercase">
                      Enterprises
                    </span>
                  </div>
                  {/* Tagline */}
                  <p className="text-[12px] md:text-[13px] tracking-[0.18em] uppercase text-slate-400 font-medium">
                    Engineering Your Dreams
                  </p>
                </div>

                {/* Vertical Divider */}
                <div className="hidden md:block h-24 w-px bg-white/20" />
                <div className="block md:hidden w-24 h-px bg-white/20" />

                {/* Venture/Associate Info Card */}
                <div className="flex flex-col items-center justify-center bg-white rounded-xl p-4 md:p-5 shadow-xl w-full max-w-[280px]">
                  <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#0B1633] mb-3 text-center">
                    A Venture Of
                  </p>
                  <div className="relative w-[180px] h-[40px]">
                    <Image
                      src="/logo/logo.webp"
                      alt="Voomet Design"
                      fill
                      sizes="180px"
                      className="object-contain filter brightness-95"
                    />
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: Information & Call to Action */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 text-left">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
              Powering Turnkey Execution & <br className="hidden md:block" />
              <span className="text-orange-500">Precision Engineering</span>
            </h3>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              <strong>ALTECH Enterprises</strong> is the manufacturing and engineering powerhouse behind VOOMET DESIGN. Located in the Doddaballapura Industrial Area, Bangalore, Altech specializes in advanced powder coating, high-end metal fabrication, structural glazing, and architectural system installation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                  <Factory size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Industrial Fabrication</h4>
                  <p className="text-xs text-slate-400">Advanced machinery for custom steel, aluminium, & UPVC works.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Premium Quality</h4>
                  <p className="text-xs text-slate-400">ISO grade standards for structural longevity and surface finishes.</p>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-4">
              <a
                href="http://www.altechenterprises.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-orange-600 hover:-translate-y-0.5 shadow-lg shadow-orange-500/20"
              >
                Visit ALTECH Enterprises
                <ArrowUpRight size={16} />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-white/10 hover:border-white/30"
              >
                Inquire For Fabrication
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
