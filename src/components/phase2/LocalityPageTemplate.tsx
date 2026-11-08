"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck, Check, ArrowRight, Clock, Award,
  Layers, MapPin, ChevronDown, CheckCircle2,
  Sparkles, Building2, PhoneCall, Compass, AlertCircle
} from "lucide-react";
import { LocalityPageData } from "@/data/phase2PagesData";
import { BreadcrumbSchema, ServiceSchema, FAQSchema } from "@/components/seo/JsonLd";

export default function LocalityPageTemplate({ data }: { data: LocalityPageData }) {
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
          { name: `Interior Designers in ${data.localityName}`, url: `/${data.slug}` },
        ]}
      />
      <ServiceSchema
        serviceType={`Turnkey Interior Design in ${data.localityName}`}
        name={data.metadata.title}
        description={data.metadata.description}
        url={`/${data.slug}`}
        image={data.hero.heroImage}
        offerCatalog={{
          name: `Turnkey Interior Design Offerings in ${data.localityName}`,
          itemListElement: [
            { name: "Residential Turnkey Fit-Outs", description: `Bespoke villas and luxury apartments in ${data.localityName}.` },
            { name: "In-House Factory Joinery", description: "CNC modular kitchens, wardrobes, and architectural millwork." },
            { name: "Acoustic Fenestration", description: "Soundproof double-glazed window and door assemblies." },
            { name: "Commercial & Office Fit-Outs", description: `High-performance workplaces and retail spaces in ${data.localityName}.` }
          ]
        }}
      />
      <FAQSchema faqs={data.faqs} />

      {/* ─── Visual Breadcrumbs ─── */}
      <nav aria-label="Breadcrumb" className="w-full bg-slate-50 border-b border-slate-200/60 pt-24 pb-3 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto flex items-center gap-2 text-xs md:text-sm text-slate-500 overflow-x-auto">
          <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-900 font-medium whitespace-nowrap">{data.localityName}</span>
        </div>
      </nav>

      {/* ─── 1. HERO SECTION ─── */}
      <section className="relative w-full py-14 md:py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-[11px] font-semibold tracking-widest uppercase mb-5">
              <MapPin size={13} className="text-amber-400" />
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
                <span>Book Consultation in {data.localityName}</span>
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
                  LOCALIZED EXCELLENCE
                </span>
                <p className="text-sm font-medium leading-snug">
                  Tailored architectural execution for {data.localityName}&rsquo;s premier communities and residences.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Trust Grid */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            {data.hero.stats.map((stat, i) => (
              <div key={i} className="text-center p-3 border-r last:border-r-0 border-slate-100">
                <div className="text-2xl md:text-3xl font-extrabold text-slate-900 font-mono">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-semibold text-slate-700 mt-1">
                  {stat.label}
                </div>
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
              LOCAL OVERVIEW
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
              {data.directAnswer.heading}
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-6">
              {data.directAnswer.summary}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

      {/* ─── 3. LOCAL CONTEXT & COMMUNITIES ─── */}
      <section className="w-full py-14 md:py-20 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6">
              <span className="text-xs font-bold tracking-widest text-amber-600 uppercase block mb-2">
                MICRO-MARKET INSIGHTS
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                {data.localContext.title}
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed mb-6">
                {data.localContext.description}
              </p>
              <div className="p-5 rounded-2xl bg-white border border-slate-200 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block mb-2">
                  Housing Typology:
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {data.localContext.housingTypology}
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3">
                  Prominent Communities &amp; Pockets:
                </h3>
                <ul className="space-y-2">
                  {data.localContext.prominentCommunities.map((c, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <Check size={14} className="text-amber-500 shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3">
                  Environmental &amp; Acoustic Considerations:
                </h3>
                <ul className="space-y-2">
                  {data.localContext.environmentalFactors.map((e, i) => (
                    <li key={i} className="text-xs text-slate-600 pl-3 border-l-2 border-amber-400 leading-snug">
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. UNDER ONE ROOF ADVANTAGE ─── */}
      <section className="w-full py-14 bg-slate-900 text-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
              WHY CHOOSE VOOMET IN {data.localityName.toUpperCase()}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
              {data.underOneRoof.title}
            </h2>
            <p className="text-xs md:text-sm text-slate-300">
              {data.underOneRoof.summary}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.underOneRoof.localBenefits.map((b, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3">
                <CheckCircle2 size={18} className="text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs md:text-sm text-slate-200 leading-relaxed">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. LOCAL CASE STUDY PLACEHOLDER ─── */}
      <section className="w-full py-16 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold tracking-widest text-amber-600 uppercase block mb-1">
              LOCAL SHOWCASE
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
              {data.caseStudyPlaceholder.title}
            </h2>
            <div className="text-xs text-slate-500 flex flex-wrap gap-3">
              <span>{data.caseStudyPlaceholder.location}</span>
              <span>•</span>
              <span>{data.caseStudyPlaceholder.scope}</span>
              <span>•</span>
              <span>{data.caseStudyPlaceholder.timeline}</span>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              {data.caseStudyPlaceholder.description}
            </p>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              <span>{data.caseStudyPlaceholder.todoNote}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. COST OVERVIEW ─── */}
      <section className="w-full py-16 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold tracking-widest text-slate-500 uppercase block mb-1">
              LOCAL PRICING GUIDE
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
              {data.costOverview.title}
            </h2>
            <p className="text-xs md:text-sm text-slate-600">
              {data.costOverview.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            {data.costOverview.rates.map((rate, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm mb-1">{rate.propertyType}</h3>
                <div className="text-sm font-extrabold text-amber-600 font-mono mb-2">{rate.range}</div>
                <p className="text-xs text-slate-600 leading-relaxed">{rate.details}</p>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-100 text-xs text-slate-600 flex items-center gap-2">
            <AlertCircle size={14} className="text-slate-400 shrink-0" />
            <span>{data.costOverview.todoNote}</span>
          </div>
        </div>
      </section>

      {/* ─── 7. FEATURED SERVICES & PROCESS LINKS ─── */}
      <section className="w-full py-14 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold tracking-widest text-slate-500 uppercase block mb-1">
              OUR CAPABILITIES
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
              Explore Our Core Turnkey Services
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.featuredServices.map((service, i) => (
              <Link
                key={i}
                href={service.href}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-2">
                    {service.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {service.desc}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:translate-x-1 transition-transform">
                  <span>Learn More</span>
                  <ArrowRight size={13} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. FAQ ACCORDION ─── */}
      <section className="w-full py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-amber-600 uppercase block mb-1">
              {data.localityName.toUpperCase()} FAQS
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {data.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm"
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
                  <div className="px-6 pb-6 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. OTHER LOCALITIES LINKING GRID ─── */}
      <section className="w-full py-12 bg-white border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold tracking-widest text-slate-500 uppercase block mb-1">
              NEIGHBORING HUBS
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
              Other Bengaluru Neighborhoods We Serve
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
                className={`p-4 rounded-xl border text-center font-semibold text-xs md:text-sm transition-all ${loc.name.toLowerCase() === data.localityName.toLowerCase() ? "bg-amber-400/10 border-amber-400 text-amber-800" : "bg-slate-50 border-slate-200 text-slate-800 hover:text-amber-600 hover:border-slate-400"}`}
              >
                {loc.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 10. FINAL CALL TO ACTION ─── */}
      <section className="w-full py-16 bg-slate-950 text-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Design Your {data.localityName} Space with Voomet
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto mb-8">
            Book a site audit and receive a transparent line-by-line BOQ estimate with our Bengaluru design team.
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

