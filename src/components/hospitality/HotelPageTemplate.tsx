"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Clock,
  Building2,
  MapPin,
  ChevronDown,
  Layers,
  Phone,
  Sliders,
  Maximize2,
  Calendar,
  VolumeX,
  Hammer,
  HelpCircle,
  Quote,
} from "lucide-react";
import { HotelPageData } from "@/data/hotelPagesData";
import { BreadcrumbSchema, ServiceSchema, FAQSchema } from "@/components/seo/JsonLd";

interface HotelPageTemplateProps {
  data: HotelPageData;
}

export default function HotelPageTemplate({ data }: HotelPageTemplateProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const breadcrumbs = data.isPillar
    ? [
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
        { name: "Hotel Interior Design in Bangalore", url: `/${data.slug}` },
      ]
    : [
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
        { name: "Hotel Interior Design", url: "/hotel-interior-design-bangalore" },
        { name: data.hero.h1, url: `/${data.slug}` },
      ];

  return (
    <div className="w-full bg-[#fafaf8] text-slate-900 font-sans selection:bg-[#071633] selection:text-white">
      {/* ─── Structured Data (Schema.org JSON-LD) ─── */}
      <BreadcrumbSchema items={breadcrumbs} />
      <ServiceSchema
        name={data.hero.h1}
        description={data.metadata.description}
        url={`https://voometdesign.com/${data.slug}`}
        serviceType="Hotel Interior Design"
        image={data.hero.heroImage}
      />
      <FAQSchema faqs={data.faqs} />

      {/* =====================================================================
          1. HERO SECTION (High-Impact Luxury Visual + Stats)
      ===================================================================== */}
      <section className="relative min-h-[82vh] lg:min-h-[88vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#071633] via-[#091e42] to-[#040e22] text-white overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#c29b28]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full relative z-10 text-center flex flex-col items-center">
          {/* Breadcrumb Navigation on Hero */}
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300/80">
            {breadcrumbs.map((b, i) => (
              <React.Fragment key={b.url}>
                {i > 0 && <span className="text-slate-500">/</span>}
                <Link
                  href={b.url}
                  className="hover:text-white transition-colors underline-offset-4 hover:underline"
                >
                  {b.name}
                </Link>
              </React.Fragment>
            ))}
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#f5d061] text-xs font-bold uppercase tracking-wider mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{data.hero.badge}</span>
          </div>

          {/* Primary H1 */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.12] mb-6">
            {data.hero.h1}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[#f5d061] font-medium max-w-2xl mb-4 leading-snug">
            {data.hero.subtitle}
          </p>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed mb-8">
            {data.hero.description}
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 mb-12 w-full sm:w-auto">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#c29b28] to-[#dfb841] text-[#071633] font-bold text-sm tracking-wide shadow-lg hover:shadow-[#c29b28]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Book Hospitality Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/quote"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white font-semibold text-sm tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Get Commercial BOQ Estimate</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Hero Metrics Strip */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl pt-8 border-t border-white/10">
            {data.hero.stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-colors"
              >
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#f5d061] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-white mt-1">{stat.label}</div>
                {stat.sub && (
                  <div className="text-[10px] text-slate-400 mt-0.5">{stat.sub}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. DIRECT ANSWER / AEO BLOCK (For Google Featured Snippets)
      ===================================================================== */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto -mt-8 relative z-20">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 lg:p-10">
          <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-[#c29b28] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#c29b28]" />
            <span>Fast Facts &amp; Strategic Blueprint</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-[#071633] mb-4">
            {data.directAnswer.heading}
          </h2>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6 font-medium">
            {data.directAnswer.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {data.directAnswer.bullets.map((b, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {b}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. COMPREHENSIVE OVERVIEW (In-Depth Industry Authority)
      ===================================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071633] tracking-tight mb-3">
            {data.overview.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium">
            {data.overview.subtitle}
          </p>
        </div>

        <div className="space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
          {data.overview.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* =====================================================================
          4. HOTEL SERVICES & KEY SPACES (Lobby, Rooms, F&B, Corridors)
      ===================================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-[#c29b28] block mb-2">
              Spatial Engineering
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#071633] tracking-tight">
              Hospitality Zones We Design &amp; Fit-Out
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2">
              Every zone is calibrated to maximize guest comfort, operating velocity, and bottom-line revenue.
            </p>
          </div>

          <div className="space-y-8">
            {data.spaces.map((space, idx) => (
              <div
                key={space.title}
                className={`bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col ${
                  idx % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-stretch`}
              >
                {/* Visual */}
                <div className="lg:w-1/2 relative min-h-[260px] sm:min-h-[340px] bg-slate-200">
                  <Image
                    src={space.image}
                    alt={space.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />
                  <div className="absolute bottom-4 left-4 lg:hidden text-white font-bold text-sm">
                    {space.role}
                  </div>
                </div>

                {/* Details */}
                <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="hidden lg:block text-xs font-bold uppercase tracking-wider text-[#c29b28] mb-1">
                      {space.role}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#071633] mb-3">
                      {space.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                      {space.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-slate-100">
                    {space.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c29b28] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. FENESTRATION & ACOUSTIC ADVANTAGE (The Voomet Edge)
      ===================================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="bg-[#071633] rounded-3xl text-white p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c29b28]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#f5d061] text-xs font-bold uppercase tracking-wider mb-4 border border-white/15">
              <VolumeX className="w-3.5 h-3.5" />
              <span>In-House Glazing &amp; Door Engineering</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
              {data.acousticAdvantage.title}
            </h2>
            <p className="text-base text-[#f5d061] font-medium mb-3">
              {data.acousticAdvantage.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {data.acousticAdvantage.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {data.acousticAdvantage.specs.map((spec, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                <div className="text-lg font-bold text-[#f5d061] mb-1">{spec.metric}</div>
                <h4 className="text-sm font-bold text-white mb-2">{spec.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{spec.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
            <span>Explore our specialized fenestration divisions:</span>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/services/aluminium-systems"
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
              >
                Acoustic Aluminium Windows &rarr;
              </Link>
              <Link
                href="/services/wooden-door-systems"
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
              >
                Fire-Rated Hotel Doors &rarr;
              </Link>
              <Link
                href="/services/facades-glazing"
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
              >
                Facade Structural Glazing &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. HOTEL CATEGORIES & SUPPORTING CLUSTER PAGES
      ===================================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-[#c29b28] block mb-2">
            Specialized Typologies
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071633] tracking-tight">
            Tailored Hospitality Solutions by Property Category
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Explore dedicated design blueprints for every hospitality investment tier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.hotelTypes.map((ht) => (
            <Link
              key={ht.title}
              href={ht.href}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 hover:border-[#c29b28] shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#071633] text-white">
                    {ht.tag}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#c29b28] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <h3 className="text-xl font-bold text-[#071633] group-hover:text-[#c29b28] transition-colors mb-2">
                  {ht.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {ht.description}
                </p>
              </div>

              <div className="text-[11px] text-slate-500 pt-3 border-t border-slate-100 flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Best for: {ht.bestFor}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* =====================================================================
          7. OUR 5-STEP TURNKEY EXECUTION PROCESS
      ===================================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-[#c29b28] block mb-2">
              Turnkey Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071633] tracking-tight">
              Our 5-Stage Hotel Delivery Framework
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              From operator brief to mock-up room sign-off and phased handover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {data.process.map((step) => (
              <div
                key={step.step}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black text-[#c29b28]/80 font-mono">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {step.duration}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#071633] mb-2">{step.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1">
                  {step.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="text-[11px] text-slate-500 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#071633]" />
                      <span className="truncate">{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. COMMERCIAL COST FACTORS & PER SQ FT ESTIMATION GUIDE
      ===================================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest uppercase text-[#c29b28] block mb-2">
            Commercial Investment Framework
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071633] tracking-tight">
            {data.costGuide.title}
          </h2>
          <p className="text-sm text-slate-500 mt-2 font-medium">
            {data.costGuide.subtitle}
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-8 text-center max-w-2xl mx-auto">
          {data.costGuide.intro}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {data.costGuide.tiers.map((tier) => (
            <div
              key={tier.category}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <h4 className="text-sm font-bold text-[#071633] mb-2">{tier.category}</h4>
                <div className="text-xl font-extrabold text-[#c29b28] mb-3">
                  {tier.range}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {tier.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Typical Inclusions:
                </span>
                {tier.typicalScope.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Cost Drivers */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#071633] mb-3">
            Key Hospitality Fit-Out Cost Drivers:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
            {data.costGuide.costDrivers.map((driver, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c29b28] mt-1.5 shrink-0" />
                <span>{driver}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Placeholder Notice */}
        <div className="text-center text-[11px] text-slate-400 italic">
          {data.costGuide.todoContentNote}
        </div>
      </section>

      {/* =====================================================================
          9. BANGALORE PROJECT CORRIDORS & REGIONAL EXPERTISE
      ===================================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-100/70 border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-[#c29b28] block mb-2">
              Micro-Market Execution
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071633] tracking-tight">
              {data.bangaloreFocus.title}
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              {data.bangaloreFocus.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {data.bangaloreFocus.corridors.map((c) => (
              <div
                key={c.name}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-2 text-[#071633] font-bold text-sm">
                  <MapPin className="w-4 h-4 text-[#c29b28]" />
                  <span>{c.name}</span>
                </div>
                <div className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded inline-block mb-3">
                  {c.demandType}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{c.designFocus}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#071633] mb-1">
                Bangalore Regulatory &amp; Environmental Adherence
              </h4>
              <p className="text-xs text-slate-500">
                Full alignment with regional fire safety, BBMP bylaws, and green building norms.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-xl bg-[#071633] hover:bg-[#0b1f48] text-white text-xs font-bold transition-colors whitespace-nowrap"
            >
              Verify Compliance for Your Site &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          10. TESTIMONIAL QUOTE & OPERATOR ACCREDITATION
      ===================================================================== */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {data.testimonial?.verified ? (
          <div className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm relative text-center">
            <Quote className="w-10 h-10 text-[#c29b28]/30 mx-auto mb-4" />
            <blockquote className="text-base sm:text-xl font-medium text-slate-800 leading-relaxed mb-6 italic">
              &ldquo;{data.testimonial.quote}&rdquo;
            </blockquote>
            <div className="font-bold text-[#071633] text-sm">{data.testimonial.clientRole}</div>
            <div className="text-xs text-slate-500 mt-0.5">
              {data.testimonial.propertyType} &bull; {data.testimonial.location}
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 text-center">
            <p className="text-slate-700 font-medium text-sm sm:text-base">
              Case study coming soon. Book a private consultation to view our recent portfolio.
            </p>
          </div>
        )}
      </section>

      {/* =====================================================================
          11. SEARCH-INTENT FAQ ACCORDION (AEO Structured)
      ===================================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest uppercase text-[#c29b28] block mb-2">
            Clear Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071633] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Detailed insights on budgets, timelines, acoustics, and live hotel execution.
          </p>
        </div>

        <div className="space-y-3">
          {data.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-[#071633]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#c29b28]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          12. INTER-CONNECTED CLUSTER LINKS
      ===================================================================== */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-100/80 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 text-center mb-6">
            Related Hotel Interior Design Portals
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.clusterLinks.map((cl) => (
              <Link
                key={cl.title}
                href={cl.href}
                className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-[#c29b28] hover:shadow-md transition-all group block"
              >
                <span className="text-[10px] font-bold text-[#c29b28] uppercase tracking-wide block mb-1">
                  {cl.badge}
                </span>
                <h4 className="text-xs font-bold text-[#071633] group-hover:text-[#c29b28] transition-colors mb-1">
                  {cl.title}
                </h4>
                <p className="text-[11px] text-slate-500 line-clamp-2">{cl.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          13. PRIMARY CONVERSION CTA
      ===================================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#071633] via-[#091f46] to-[#040e22] text-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#c29b28]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#f5d061] text-xs font-bold uppercase tracking-wider mb-4 border border-white/15">
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule Site Visit &amp; Technical BOQ</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Ready to Build an Award-Winning Hotel Experience in Bangalore?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            From preliminary key-count optimization to mock-up room sign-off and phased turnkey handover, partner with Bangalore&apos;s specialist hospitality fit-out studio.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#c29b28] to-[#dfb841] text-[#071633] font-bold text-sm tracking-wide shadow-xl hover:shadow-[#c29b28]/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Request Architectural Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/quote"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white font-semibold text-sm tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <span>Submit Floorplans for BOQ Estimate</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

