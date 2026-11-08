"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck, Check, ArrowRight, Clock, Award,
  Layers, MapPin, ChevronDown, CheckCircle2,
  Sparkles, Building2, PhoneCall, Compass, AlertCircle
} from "lucide-react";
import { SectorPageData } from "@/data/phase2PagesData";
import { BreadcrumbSchema, ServiceSchema, FAQSchema } from "@/components/seo/JsonLd";

export default function SectorPageTemplate({ data }: { data: SectorPageData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="w-full bg-[#FCFDFE] text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* ─── Structured Data (Schema.org) ─── */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: `${data.sectorName} Interior Design`, url: `/${data.slug}` },
        ]}
      />
      <ServiceSchema
        serviceType={`${data.sectorName} Interior Design & Turnkey Fit-Out`}
        name={data.metadata.title}
        description={data.metadata.description}
        url={`/${data.slug}`}
        image={data.hero.heroImage}
        offerCatalog={{
          name: `${data.sectorName} Turnkey Design and Execution Offerings`,
          itemListElement: [
            { name: "Architectural Planning & 3D Spatial Visualization", description: "Bespoke 3D renders, layout zoning, and ergonomic circulation mapping." },
            { name: "General Contracting & Civil Execution", description: "Full on-site civil remodelling, MEP conduits, and structural fitments." },
            { name: "In-House Factory Joinery Fabrication", description: "Off-site CNC-precision manufactured millwork, cabinetry, and doors." },
            { name: "Acoustic Fenestration & System Glazing", description: "Soundproof double-glazed window and partition installations." }
          ]
        }}
      />
      <FAQSchema faqs={data.faqs} />

      {/* ─── Visual Breadcrumbs ─── */}
      <nav aria-label="Breadcrumb" className="w-full bg-slate-50 border-b border-slate-200/60 pt-24 pb-3 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto flex items-center gap-2 text-xs md:text-sm text-slate-500 overflow-x-auto">
          <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-medium whitespace-nowrap">{data.sectorName} Interiors</span>
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
                <span>Request {data.sectorName} BOQ Estimate</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/interior-design-and-build-process-bangalore"
                className="px-7 py-3.5 rounded-full bg-white text-slate-800 font-semibold text-sm border border-slate-300 hover:bg-slate-50 transition-all flex items-center gap-2"
              >
                <Compass size={16} className="text-amber-600" />
                <span>Our Turnkey Process</span>
              </Link>
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
                  DESIGN + EXECUTION
                </span>
                <p className="text-sm font-medium leading-snug">
                  Integrated architectural design, civil contracting, and in-house factory manufacturing.
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

      {/* ─── 2. DIRECT ANSWER BLOCK ─── */}
      <section className="w-full py-12 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="p-8 md:p-10 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm">
            <span className="text-[11px] uppercase tracking-widest font-bold text-amber-600 block mb-2">
              SECTOR EXECUTIVE SUMMARY
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
              THE VOOMET ADVANTAGE
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4">
              {data.underOneRoof.title}
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              {data.underOneRoof.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.underOneRoof.pillars.map((pillar, idx) => (
              <div key={idx} className="p-7 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold font-mono text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md">
                      {pillar.benefit}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. CORE SPATIAL SCOPES ─── */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold tracking-widest text-amber-600 uppercase block mb-2">
              SPATIAL EXECUTION SCOPE
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
              Specialized Spaces Engineered for {data.sectorName} Environments
            </h2>
            <p className="text-slate-600 text-sm md:text-base">
              Every area is designed with human ergonomics, durable commercial-grade materials, and acoustic comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.scopes.map((scope, idx) => (
              <div
                key={idx}
                className="rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 flex flex-col group hover:shadow-lg transition-all"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={scope.image}
                    alt={scope.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6 text-white">
                    <span className="text-[11px] font-semibold text-amber-300 uppercase tracking-widest block">
                      {scope.role}
                    </span>
                    <h3 className="text-xl font-bold">{scope.title}</h3>
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                  <p className="text-xs md:text-sm text-slate-700 leading-relaxed mb-6">
                    {scope.description}
                  </p>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                      Key Engineering Highlights:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {scope.highlights.map((item, i) => (
                        <span key={i} className="text-[11px] font-medium bg-white text-slate-700 border border-slate-200/90 px-3 py-1.5 rounded-full">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. 7-STAGE PROCESS LINK BLOCK ─── */}
      <section className="w-full py-14 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="rounded-3xl bg-[#0F172A] p-8 md:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
                HOW WE DELIVER
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
                {data.processOverview.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {data.processOverview.description}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {data.processOverview.steps.slice(0, 4).map((s, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs">
                    <span className="font-mono font-bold text-amber-400 block mb-0.5">{s.step}</span>
                    <span className="text-white font-medium block">{s.title}</span>
                  </div>
                ))}
              </div>
            </div>
            <Link
              href={data.processOverview.processPageHref}
              className="px-8 py-4 rounded-full bg-amber-400 text-slate-950 font-bold text-xs md:text-sm uppercase tracking-wider hover:bg-amber-300 transition-all shrink-0 flex items-center gap-2 shadow-lg group"
            >
              <span>Explore Complete 7-Stage Process</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 6. CASE STUDY CALLOUT ─── */}
      <section className="w-full py-16 md:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          {data.caseStudy?.verified ? (
            <div>
              <div className="max-w-3xl mb-12">
                <span className="text-xs font-bold tracking-widest text-amber-600 uppercase block mb-2">
                  FEATURED CASE STUDY
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
                  {data.caseStudy.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><MapPin size={14} /> {data.caseStudy.location}</span>
                  <span>•</span>
                  <span>{data.caseStudy.scope}</span>
                  <span>•</span>
                  <span>{data.caseStudy.duration}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {data.caseStudy.heroImage && (
                  <div className="lg:col-span-5 relative">
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-slate-200">
                      <Image
                        src={data.caseStudy.heroImage}
                        alt={data.caseStudy.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

                <div className={`${data.caseStudy.heroImage ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-6`}>
                  {data.caseStudy.summary && (
                    <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                      {data.caseStudy.summary}
                    </p>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.caseStudy.challenges && (
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                          Project Challenges:
                        </h4>
                        <ul className="space-y-2">
                          {data.caseStudy.challenges.map((c, i) => (
                            <li key={i} className="text-xs text-slate-600 pl-3 border-l-2 border-red-400 leading-snug">
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {data.caseStudy.solutions && (
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                          Engineered Solutions:
                        </h4>
                        <ul className="space-y-2">
                          {data.caseStudy.solutions.map((s, i) => (
                            <li key={i} className="text-xs text-slate-600 pl-3 border-l-2 border-emerald-500 leading-snug">
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Verified Client Quote */}
                  {data.caseStudy.clientQuote?.quote && (
                    <div className="p-6 rounded-2xl bg-slate-900 text-white relative">
                      <p className="italic text-sm text-slate-200 mb-3">
                        &ldquo;{data.caseStudy.clientQuote.quote}&rdquo;
                      </p>
                      <div className="text-xs font-bold text-amber-400">
                        {data.caseStudy.clientQuote.author}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {data.caseStudy.clientQuote.designation}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 md:p-12 rounded-3xl bg-slate-50 border border-slate-200 text-center max-w-3xl mx-auto">
              <span className="text-xs font-bold tracking-widest uppercase text-amber-600 block mb-2">
                PORTFOLIO PREVIEW
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                Featured Case Studies
              </h3>
              <p className="text-sm md:text-base text-slate-700 font-medium mb-6">
                Case study coming soon. Book a private consultation to view our recent portfolio.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-xs md:text-sm font-semibold hover:bg-slate-800 transition-colors"
              >
                <span>Request Portfolio Access</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ─── 7. BANGALORE MICRO-MARKETS ─── */}
      <section className="w-full py-16 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold tracking-widest text-slate-500 uppercase block mb-1">
              LOCALIZED EXECUTION
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
              {data.bangaloreCorridors.title}
            </h2>
            <p className="text-xs md:text-sm text-slate-600">
              {data.bangaloreCorridors.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.bangaloreCorridors.zones.map((zone, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={16} className="text-amber-500" />
                  <h3 className="font-bold text-slate-900 text-base">{zone.name}</h3>
                </div>
                <p className="text-xs text-slate-600 mb-2 leading-relaxed">{zone.focus}</p>
                <div className="text-[11px] font-semibold text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  {zone.typologies}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. COST GUIDE FRAMEWORK ─── */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold tracking-widest text-amber-600 uppercase block mb-2">
              COST TRANSPARENCY
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
              {data.costGuide.title}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {data.costGuide.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {data.costGuide.tiers.map((tier, idx) => (
              <div key={idx} className="p-7 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{tier.tier}</h3>
                  <ul className="space-y-2 mb-6">
                    {tier.scope.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-600 font-medium">
                  <span className="font-bold text-slate-800">Best for: </span>
                  {tier.suitability}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-slate-100 text-xs text-slate-600 text-center">
            <span>Contact our team for a project-specific BOQ tailored to your architectural layout and specification preferences.</span>
          </div>
        </div>
      </section>

      {/* ─── 9. LOCALITY INTERLINKING GRID ─── */}
      <section className="w-full py-12 bg-slate-50 border-t border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold tracking-widest text-slate-500 uppercase block mb-1">
              LOCALITY HUBS
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
              Explore Our Design Studios by Bangalore Neighborhood
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: "Whitefield", href: "/interior-designers-in-whitefield" },
              { name: "Indiranagar", href: "/interior-designers-in-indiranagar" },
              { name: "HSR Layout", href: "/interior-designers-in-hsr-layout" },
              { name: "Koramangala", href: "/interior-designers-in-koramangala" },
              { name: "Sarjapur Road", href: "/interior-designers-in-sarjapur-road" },
            ].map((loc, i) => (
              <Link
                key={i}
                href={loc.href}
                className="p-4 rounded-xl bg-white border border-slate-200 text-center font-semibold text-xs md:text-sm text-slate-800 hover:text-amber-600 hover:border-slate-400 hover:shadow-sm transition-all"
              >
                {loc.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 10. FAQ ACCORDION ─── */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-amber-600 uppercase block mb-1">
              CLIENT CLARITY
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

      {/* ─── 11. FINAL CALL TO ACTION ─── */}
      <section className="w-full py-16 bg-slate-950 text-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Start Your {data.sectorName} Turnkey Project Today
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto mb-8">
            Get an open-book line-item BOQ estimate backed by in-house factory joinery and single-source accountability.
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
              <span>Schedule Site Consultation</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

