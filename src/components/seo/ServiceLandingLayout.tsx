import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck, Sparkles, Check, ArrowRight, ArrowUpRight,
  Clock, Award, Layers, Building2, MapPin, ChevronRight,
  Sliders, Maximize2, Settings, Users, LayoutTemplate, LucideIcon
} from "lucide-react";
import { SEOPageData } from "@/data/seoPages";
import { BreadcrumbSchema, ServiceSchema, WebPageSchema } from "@/components/seo/JsonLd";
import ExpertiseHero from "@/components/ExpertiseHero";
import DirectAnswerBlock from "@/components/seo/DirectAnswerBlock";
import FAQSection from "@/components/seo/FAQSection";
import ServiceTestimonials from "@/components/ServiceTestimonials";
import CTAV4 from "@/components/CTAV4";
import { TESTIMONIALS } from "@/data/testimonials";

const ICON_REGISTRY: Record<string, LucideIcon> = {
  ShieldCheck,
  Sparkles,
  Check,
  Clock,
  Award,
  Layers,
  Building2,
  Sliders,
  Maximize2,
  Settings,
  Users,
  LayoutTemplate,
};

interface ServiceLandingLayoutProps {
  pageData: SEOPageData;
}

export default function ServiceLandingLayout({ pageData }: ServiceLandingLayoutProps) {
  const {
    slug,
    metadata,
    hero,
    directAnswer,
    overview,
    valuePillars,
    subServices,
    processSteps,
    bangaloreFocus,
    faqs,
    internalLinks,
    galleryImages,
  } = pageData;

  const currentUrl = `/services/${slug}`;

  return (
    <div className="w-full bg-[#FCFDFE] text-slate-900 font-sans selection:bg-[#324A61] selection:text-white">
      {/* ─── Structured Data (Schema.org) ─── */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: hero.title, url: currentUrl },
        ]}
      />
      <WebPageSchema
        type="WebPage"
        url={currentUrl}
        name={metadata.title}
        description={metadata.description}
        breadcrumbItems={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: hero.title, url: currentUrl },
        ]}
        primaryImage={hero.heroImage}
      />
      <ServiceSchema
        serviceType={hero.title}
        name={metadata.title}
        description={metadata.description}
        url={currentUrl}
        image={hero.heroImage}
      />

      {/* ─── Visual Breadcrumb Navigation ─── */}
      <nav
        aria-label="Breadcrumb"
        className="w-full bg-slate-50/80 border-b border-slate-200/60 pt-24 pb-3 px-6 md:px-12 backdrop-blur-sm"
      >
        <div className="max-w-[1440px] mx-auto flex items-center gap-2 text-xs md:text-sm text-slate-500 overflow-x-auto">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
          <Link href="/services" className="hover:text-slate-900 transition-colors">
            Services
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="text-slate-900 font-semibold truncate">
            {hero.title}
          </span>
        </div>
      </nav>

      {/* ─── 1. Hero Section ─── */}
      <ExpertiseHero
        badge={hero.badge}
        title={hero.title}
        subtitle={hero.subtitle}
        description={hero.description}
        shortDescription={hero.shortDescription}
        heroImage={hero.heroImage}
        stats={hero.stats.map((s) => ({
          value: s.value,
          label: s.label,
          icon: s.iconName ? ICON_REGISTRY[s.iconName] || Sparkles : Sparkles,
        }))}
        primaryCtaText="Get Free 3D Layout & Quote"
        primaryCtaHref="/contact"
        secondaryCtaText="Explore Portfolio"
        secondaryCtaHref="/designs"
      />

      {/* ─── 2. Direct Answer Block (AEO / Answer Engine Optimization) ─── */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-8 pb-4">
        <DirectAnswerBlock
          heading={directAnswer.heading}
          summary={directAnswer.summary}
          keyPoints={directAnswer.keyPoints}
        />
      </div>

      {/* ─── 3. In-Depth Overview Section ─── */}
      <section
        id="service-overview"
        className="py-16 md:py-24 max-w-[1440px] mx-auto px-6 md:px-12"
        aria-labelledby="overview-heading"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#324A61] block mb-3">
              ARCHITECTURAL EXCELLENCE
            </span>
            <h2
              id="overview-heading"
              className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-6"
            >
              {overview.title}
            </h2>
            <div className="w-16 h-1 bg-[#324A61] rounded-full mb-6" />
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200/80">
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
              <p className="text-xs md:text-sm text-slate-700 font-medium">
                Backed by VoometDesign's 10-Year Comprehensive Woodwork & Fit-Out Warranty.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-base md:text-lg text-slate-600 leading-relaxed font-normal">
            {overview.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. Value Pillars Grid ─── */}
      <section
        id="why-voometdesign"
        className="py-16 bg-slate-900 text-white relative overflow-hidden"
        aria-labelledby="pillars-heading"
      >
        <div className="absolute inset-0 bg-[radial-gradient(#1E3A5F_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl mb-12 md:mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-3">
              THE VOOMET ADVANTAGE
            </span>
            <h2
              id="pillars-heading"
              className="text-2xl md:text-4xl font-bold tracking-tight text-white"
            >
              Engineered for Durability, Beauty, and Peace of Mind
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuePillars.map((pillar, index) => {
              const IconComp = ICON_REGISTRY[pillar.iconName] || Sparkles;
              return (
                <div
                  key={index}
                  className="bg-slate-800/60 border border-slate-700/70 p-6 md:p-8 rounded-2xl flex flex-col justify-between hover:border-slate-500/80 transition-all group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#1E3A5F]/80 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-700/60 flex items-center text-xs text-slate-400 gap-1 group-hover:text-emerald-400 transition-colors">
                    <span>Verified standard</span>
                    <Check className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 5. Sub-Services / Category Hub Links (Internal Linking) ─── */}
      {subServices && subServices.length > 0 && (
        <section
          id="related-services"
          className="py-16 md:py-24 max-w-[1440px] mx-auto px-6 md:px-12"
          aria-labelledby="subservices-heading"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#324A61] block mb-3">
                SPECIALIZED CAPABILITIES
              </span>
              <h2
                id="subservices-heading"
                className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight"
              >
                Explore Related Service Offerings
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#324A61] hover:underline"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subServices.map((sub, idx) => (
              <Link
                key={idx}
                href={sub.href}
                className="group block p-6 md:p-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#324A61]/60 transition-all relative overflow-hidden"
              >
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 bg-slate-100 text-slate-700 rounded-full group-hover:bg-[#324A61] group-hover:text-white transition-colors">
                    {sub.tag}
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-[#324A61] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 group-hover:text-[#324A61] transition-colors">
                  {sub.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {sub.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ─── 6. Execution Process (3-Step Milestone) ─── */}
      <section
        id="execution-process"
        className="py-16 md:py-20 bg-slate-50 border-y border-slate-200/70"
        aria-labelledby="process-heading"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#324A61] block mb-2">
              HOW WE DELIVER
            </span>
            <h2
              id="process-heading"
              className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight"
            >
              Streamlined 3-Stage Execution Framework
            </h2>
            <p className="text-sm md:text-base text-slate-600 mt-3">
              Predictable, transparent, and completely managed from initial 3D scan to key handover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm relative flex flex-col justify-between"
              >
                <div>
                  <span className="text-4xl font-extrabold text-[#324A61]/20 block mb-4">
                    {step.step}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>
                <ul className="space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-700">
                  {step.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. Bangalore Local Focus Section (Local SEO Authority) ─── */}
      {bangaloreFocus && (
        <section
          id="bangalore-coverage"
          className="py-16 md:py-20 max-w-[1440px] mx-auto px-6 md:px-12"
          aria-labelledby="bangalore-heading"
        >
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-[#1E3A5F] text-white rounded-3xl p-8 md:p-14 overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>LOCAL BANGALORE EXPERTISE</span>
                </div>
                <h2
                  id="bangalore-heading"
                  className="text-2xl md:text-3xl font-bold text-white mb-4"
                >
                  {bangaloreFocus.title}
                </h2>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6">
                  {bangaloreFocus.description}
                </p>

                <div className="space-y-2 mb-8">
                  {bangaloreFocus.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-200">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                    Active Projects Across Key Localities:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {bangaloreFocus.neighborhoods.map((area, aIdx) => (
                      <span
                        key={aIdx}
                        className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md text-center">
                <Building2 className="w-12 h-12 text-emerald-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">
                  Building or Renovating in Bangalore?
                </h3>
                <p className="text-xs text-slate-300 mb-6">
                  Schedule a complimentary on-site laser survey and initial 3D layout consultation worth ₹10,000.
                </p>
                <Link
                  href="/contact"
                  id="cta-bangalore-consultation"
                  className="w-full py-3 px-6 bg-white text-slate-900 font-bold text-sm rounded-xl hover:bg-emerald-400 hover:text-slate-950 transition-colors shadow-md text-center"
                >
                  Book Complimentary Site Survey
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── 8. Visual Project Gallery ─── */}
      {galleryImages && galleryImages.length > 0 && (
        <section
          id="project-gallery"
          className="py-16 md:py-20 max-w-[1440px] mx-auto px-6 md:px-12 border-t border-slate-200/70"
          aria-labelledby="gallery-heading"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#324A61] block mb-2">
                CRAFTED SPACES
              </span>
              <h2
                id="gallery-heading"
                className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight"
              >
                Signature Execution Showcase
              </h2>
            </div>
            <Link
              href="/designs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#324A61] hover:underline"
            >
              <span>Explore Complete Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 bg-slate-100 aspect-[4/3]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <p className="text-white text-sm font-medium">{img.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── 9. Testimonials Section ─── */}
      <section className="py-12 bg-white" aria-label="Client Reviews">
        <ServiceTestimonials testimonials={TESTIMONIALS} />
      </section>

      {/* ─── 10. FAQ Section (FAQPage Schema + Interactive Accordion) ─── */}
      <FAQSection
        badge="FREQUENTLY ASKED QUESTIONS"
        title="Everything You Need to Know"
        subtitle={`Clear answers on pricing, timelines, materials, and execution for ${hero.title.toLowerCase()}.`}
        faqs={faqs}
      />

      {/* ─── 11. Contextual Internal Linking Footer Bar ─── */}
      {internalLinks && internalLinks.length > 0 && (
        <section className="py-12 bg-slate-50 border-t border-slate-200/70" aria-label="Explore Related Topics">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-4">
              Explore More From VoometDesign
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {internalLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="p-4 bg-white rounded-xl border border-slate-200/80 hover:border-[#324A61] transition-all group"
                >
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#324A61] flex items-center justify-between mb-1">
                    <span>{link.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {link.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 12. Final High-Impact CTA ─── */}
      <CTAV4 />
    </div>
  );
}
