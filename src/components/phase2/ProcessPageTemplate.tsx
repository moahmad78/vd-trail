"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck, Check, ArrowRight, Clock, Award,
  Layers, MapPin, ChevronDown, CheckCircle2,
  FileText, Hammer, Sparkles, Building2, PhoneCall
} from "lucide-react";
import { ProcessPageData } from "@/data/phase2PagesData";
import { BreadcrumbSchema, ServiceSchema, FAQSchema } from "@/components/seo/JsonLd";

export default function ProcessPageTemplate({ data }: { data: ProcessPageData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeStep, setActiveStep] = useState<number>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="w-full bg-[#FCFDFE] text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* ─── Structured Data (Schema.org) ─── */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Turnkey Design & Build Process", url: `/${data.slug}` },
        ]}
      />
      <ServiceSchema
        serviceType="Turnkey Interior Design & Build Process"
        name={data.metadata.title}
        description={data.metadata.description}
        url={`/${data.slug}`}
        image={data.hero.heroImage}
        offerCatalog={{
          name: "Turnkey Design & Build Execution Services",
          itemListElement: [
            { name: "Architectural 3D Spatial Design", description: "Laser survey, 3D walkthroughs, and space planning." },
            { name: "General Contracting & Civil Execution", description: "On-site wet civil modifications, MEP, and structural remodelling." },
            { name: "In-House Factory Joinery Fabrication", description: "Off-site CNC manufacturing of custom cabinetry and wardrobes." },
            { name: "Quality Assurance & Acoustic Commissioning", description: "140-point snagging audits, STC decibel testing, and warranty handover." }
          ]
        }}
      />
      <FAQSchema faqs={data.faqs} />

      {/* ─── Visual Breadcrumbs ─── */}
      <nav aria-label="Breadcrumb" className="w-full bg-slate-50 border-b border-slate-200/60 pt-24 pb-3 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto flex items-center gap-2 text-xs md:text-sm text-slate-500 overflow-x-auto">
          <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-medium whitespace-nowrap">Design &amp; Build Process</span>
        </div>
      </nav>

      {/* ─── 1. HERO SECTION ─── */}
      <section className="relative w-full py-14 md:py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-[11px] font-semibold tracking-widest uppercase mb-5">
              <Sparkles size={13} className="text-amber-400" />
              <span>{data.hero.badge}</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.12] mb-4">
              {data.hero.h1}
            </h1>
            <p className="text-base md:text-lg font-medium text-slate-700 mb-3">
              {data.hero.subtitle}
            </p>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl mb-8">
              {data.hero.description}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/quote"
                className="px-7 py-3.5 rounded-full bg-[#0F172A] text-white font-semibold text-sm hover:bg-slate-800 transition-all shadow-md flex items-center gap-2"
              >
                <span>Book Process Consultation</span>
                <ArrowRight size={16} />
              </Link>
              <a
                href="#seven-steps"
                className="px-7 py-3.5 rounded-full bg-white text-slate-800 font-semibold text-sm border border-slate-300 hover:bg-slate-50 transition-all"
              >
                Explore All 7 Steps
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <Image
                src={data.hero.heroImage}
                alt={data.hero.h1}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[11px] tracking-widest font-semibold uppercase text-amber-300 block mb-1">
                  SINGLE ACCOUNTABILITY
                </span>
                <p className="text-sm font-medium leading-snug">
                  Zero contractor friction. Design, civil execution, and in-house manufacturing under one roof.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Trust Grid */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            {data.hero.stats.map((stat, i) => (
              <div key={i} className="text-center p-3 border-r last:border-r-0 border-slate-100">
                <div className="text-2xl md:text-3xl font-extrabold text-slate-900 font-mono">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-semibold text-slate-700 mt-1">
                  {stat.label}
                </div>
                {stat.sub && (
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {stat.sub}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 2. DIRECT ANSWER BLOCK (AI SEARCH OPTIMIZATION) ─── */}
      <section className="w-full py-12 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="p-8 md:p-10 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm">
            <span className="text-[11px] uppercase tracking-widest font-bold text-amber-600 block mb-2">
              KEY METHODOLOGY TAKEAWAY
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
              {data.directAnswer.heading}
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-6">
              {data.directAnswer.summary}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.directAnswer.bullets.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200/70">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm text-slate-700 leading-snug">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. DESIGN + EXECUTION UNDER ONE ROOF ─── */}
      <section className="w-full py-14 md:py-20 bg-slate-900 text-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase block mb-2">
              INTEGRATED TURNKEY DELIVERY
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4">
              {data.underOneRoof.title}
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              {data.underOneRoof.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.underOneRoof.advantages.map((adv, idx) => (
              <div key={idx} className="p-7 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold font-mono mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {adv.title}
                  </h3>
                  <div className="mb-4 p-3 rounded-lg bg-red-950/40 border border-red-800/30 text-xs text-red-200">
                    <span className="font-semibold block text-red-300 mb-1">Traditional Model:</span>
                    {adv.comparisonVsTraditional}
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/30 text-xs text-emerald-200">
                    <span className="font-semibold block text-emerald-300 mb-1">Voomet Under One Roof:</span>
                    {adv.voometAdvantage}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. THE 7-STAGE EXECUTION BREAKDOWN ─── */}
      <section id="seven-steps" className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-amber-600 uppercase block mb-2">
              END-TO-END EXECUTION BLUEPRINT
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
              Step-by-Step: How We Transform Your Space
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Every project follows our structured milestone framework. No guesswork, no mid-way design alterations, and zero unauthorized budget creep.
            </p>
          </div>

          <div className="space-y-8">
            {data.steps.map((step, idx) => (
              <div
                key={idx}
                className="p-8 md:p-10 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm hover:shadow-md transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                <div className="lg:col-span-3">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl font-black font-mono text-slate-900 bg-amber-400/20 px-3 py-1 rounded-xl">
                      {step.number}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-200">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-950 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-amber-700">
                    {step.subtitle}
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <p className="text-sm text-slate-700 leading-relaxed mb-4">
                    {step.description}
                  </p>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                    Key Client Deliverables:
                  </h4>
                  <ul className="space-y-1.5">
                    {step.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-4 p-5 rounded-2xl bg-white border border-slate-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                    <ShieldCheck size={16} className="text-amber-500" />
                    <span>Rigorous Quality Gates:</span>
                  </h4>
                  <ul className="space-y-2">
                    {step.qualityGates.map((gate, i) => (
                      <li key={i} className="text-xs text-slate-600 pl-3 border-l-2 border-amber-400 leading-snug">
                        {gate}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. SECTORS SERVED BY THIS PROCESS ─── */}
      <section className="w-full py-14 bg-slate-50 border-t border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-slate-500 uppercase block mb-1">
              CROSS-SECTOR MASTERY
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Apply This Turnkey Process to Your Project
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.sectorsServed.map((sector, i) => (
              <Link
                key={i}
                href={sector.href}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-400 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-2">
                    {sector.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {sector.focus}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:translate-x-1 transition-transform">
                  <span>Explore Sector Pillar</span>
                  <ArrowRight size={13} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. FAQ ACCORDION ─── */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-amber-600 uppercase block mb-1">
              TRANSPARENCY &amp; TIMELINES
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {data.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-slate-50/60 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-slate-900 text-sm md:text-base hover:text-slate-700 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 ml-4 transition-transform duration-300 text-slate-400 ${openFaq === idx ? "rotate-180 text-slate-900" : ""}`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. FINAL CALL TO ACTION ─── */}
      <section className="w-full py-16 bg-slate-950 text-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Ready to Begin Your Turnkey Transformation?
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto mb-8">
            Schedule an initial consultation and 3D laser spatial audit with our Bengaluru architectural and engineering team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/quote"
              className="px-8 py-4 rounded-full bg-amber-400 text-slate-950 font-bold text-sm hover:bg-amber-300 transition-all shadow-lg flex items-center gap-2"
            >
              <span>Get Free BOQ Estimate</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full bg-white/10 text-white font-semibold text-sm border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <PhoneCall size={16} />
              <span>Contact Design Studio</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

