"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Star,
  Phone,
  MessageSquare,
  ShieldCheck,
  Clock,
  CheckCircle2,
  ArrowRight,
  Factory,
  Check,
  Loader2,
  MapPin,
} from "lucide-react";
import { trackConsultationRequest, trackWhatsAppClick, trackCallClick } from "@/lib/tracking";
import BrandsSection from "@/components/BrandsSection";

// 4 Core Interior Space Capabilities
const SERVICES_DATA = [
  {
    id: "hospitality",
    title: "Hospitality Spaces",
    tagline: "Cafes & Boutique Stays",
    description: "Atmospheric experiential venues, bespoke ambient illumination, and custom bar counters.",
    image: "/images/Services-card/hotel.webp",
  },
  {
    id: "educational",
    title: "Educational Spaces",
    tagline: "Campuses & Institutions",
    description: "Modern acoustic classrooms, high-tech lecture studios, and ergonomic institutional fit-outs.",
    image: "/images/Services-card/education.webp",
  },
  {
    id: "residential",
    title: "Residential Spaces",
    tagline: "Villas & Apartments",
    description: "Turnkey luxury interiors, custom modular kitchens, and bespoke wardrobe solutions.",
    image: "/images/Services-card/residential.webp",
  },
  {
    id: "commercial",
    title: "Commercial Spaces",
    tagline: "Offices & Tech HQs",
    description: "Modern acoustic workstations, meeting hubs, and ergonomic agile office fit-outs.",
    image: "/assets/work/filter-grid/zluri.webp",
  },
];

// Dedicated Architectural Systems (Full-Width Cover Feature Cards)
const ARCHITECTURAL_SYSTEMS = [
  {
    id: "aluminium-systems",
    title: "Aluminium Windows, Doors & Facades",
    badge: "Aluminium Systems",
    tagline: "Millimeter-Precision Glazing",
    description:
      "Acoustic soundproof DGU glazing, slimline 20mm sliding profiles, and thermal-break curtain wall envelopes engineered for luxury homes and commercial towers.",
    image: "/images/Services-card/aluminium.webp",
    features: ["Acoustic Soundproofing", "Slimline 20mm Sightlines", "German Hardware", "10-Yr Guarantee"],
    serviceKey: "Aluminium & Facades",
  },
  {
    id: "wooden-doors",
    title: "Engineered Wooden Door Systems",
    badge: "Wooden Doors",
    tagline: "Architectural Woodwork",
    description:
      "Solid hardwood-core acoustic doors, grand entrance pivot systems, and concealed European hinges precision-manufactured with premium PU finishes in Bangalore.",
    image: "/images/hero/wooden-door-hero.jpg",
    features: ["Solid Hardwood Core", "Concealed 3D Hinges", "Acoustic Drop Seals", "Bespoke PU Polish"],
    serviceKey: "Wooden Door Systems",
  },
];

// Curated Projects Data
const FEATURED_PROJECTS = [
  {
    id: "azure-hotel",
    title: "The Azure Boutique Hotel",
    category: "Hospitality",
    location: "Indiranagar",
    area: "7,800 Sq. Ft.",
    image: "/Design/hospitality/h11.webp",
  },
  {
    id: "pw-hub",
    title: "PW Learning Hub",
    category: "Educational",
    location: "Bangalore",
    area: "14,000 Sq. Ft.",
    image: "/assets/work/filter-grid/pw.webp",
  },
  {
    id: "indiranagar-villa",
    title: "Glasshouse Residence",
    category: "Residential",
    location: "Sadashivanagar",
    area: "4,600 Sq. Ft.",
    image: "/images/Services-card/residential.webp",
  },
  {
    id: "apps-for-bharat",
    title: "Apps For Bharat",
    category: "Commercial",
    location: "HSR Layout",
    area: "8,200 Sq. Ft.",
    image: "/assets/work/filter-grid/apps-for-bharat.webp",
  },
  {
    id: "zluri",
    title: "Zluri Workspace",
    category: "Commercial",
    location: "Koramangala",
    area: "12,500 Sq. Ft.",
    image: "/assets/work/filter-grid/zluri.webp",
  },
  {
    id: "qpiai",
    title: "QpiAI Quantum Lab",
    category: "Commercial",
    location: "North Bangalore",
    area: "9,000 Sq. Ft.",
    image: "/assets/work/filter-grid/qpiai.webp",
  },
];

export default function LandingPageClient() {
  const formRef = useRef<HTMLDivElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    requirement: "Hospitality",
    areaSqft: "1,200 - 2,000 sq ft",
    projectLocation: "",
    botField: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar only after user scrolls down past the hero form
      if (window.scrollY > 420) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = (serviceName?: string) => {
    if (serviceName) {
      let req = serviceName;
      if (serviceName.toLowerCase().includes("hospitality")) req = "Hospitality";
      else if (serviceName.toLowerCase().includes("education")) req = "Educational";
      else if (serviceName.toLowerCase().includes("residential")) req = "Residential";
      else if (serviceName.toLowerCase().includes("commercial")) req = "Commercial";
      else if (serviceName.toLowerCase().includes("door") || serviceName.toLowerCase().includes("wooden")) req = "Wooden Door Systems";
      else if (serviceName.toLowerCase().includes("aluminium") || serviceName.toLowerCase().includes("facade")) req = "Aluminium & Facade";
      setFormData((prev) => ({ ...prev, requirement: req }));
    }
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      const input = formRef.current.querySelector<HTMLInputElement>("input[name='name']");
      if (input) setTimeout(() => input.focus(), 500);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!formData.name.trim() || !formData.mobileNumber.trim()) {
      setSubmitError("Please enter your name and phone number.");
      return;
    }

    if (formData.botField) return;

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        mobileNumber: formData.mobileNumber,
        requirement: formData.requirement,
        areaSqft: formData.areaSqft,
        projectLocation: formData.projectLocation || "Bangalore",
        submissionSource: "Quote Landing Page",
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Submission failed");

      setIsSuccess(true);
      trackConsultationRequest({ requirement: formData.requirement });

      try {
        const confetti = (await import("canvas-confetti")).default;
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#0B1B44", "#071633", "#64748B"],
        });
      } catch {
        // Safe fallback
      }
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit. Please call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProjects =
    activeFilter === "All"
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <div className="w-full bg-white text-slate-800">
      {/* ─── 1. HERO SECTION WITH INTEGRATED LEAD FORM ─── */}
      <section id="hero" className="w-full bg-[#FAFAF8] pt-4 pb-6 sm:py-10 md:py-16 border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Column: Concise Editorial Headline & Points */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Trust Badges: ET Achievers Award + Google 4.3 Star Rating */}
              <div className="flex flex-wrap items-center gap-2 mb-3.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs">
                  <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#0B1B44] text-[#F1D279] flex items-center justify-center shrink-0">
                    <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#F1D279]" />
                  </span>
                  <span className="text-[11px] sm:text-[12px] md:text-[13px] font-[600] text-[#071633] whitespace-nowrap">
                    ET Achievers Award Winner
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] sm:text-[12px] md:text-[13px] font-[700] text-[#071633]">4.3</span>
                    <div className="flex items-center text-[#F59E0B]">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-[#F59E0B]" />
                      ))}
                      <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-[#F59E0B]/35" />
                    </div>
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium whitespace-nowrap">on Google</span>
                </div>
              </div>

              <h1 className="text-[#071633] text-[clamp(28px,3.8vw,52px)] font-[700] leading-[1.08] tracking-[-0.03em] mb-3 sm:mb-4">
                Designing Spaces. <br />
                <span className="text-slate-500 font-light">Delivered in 45 Days.</span>
              </h1>

              <p className="text-[14px] sm:text-[16px] md:text-[17px] font-[300] leading-relaxed sm:leading-[1.8] text-slate-600 max-w-xl mb-5 sm:mb-6">
                Bangalore turnkey studio delivering residential and commercial interiors with in-house
                German manufacturing and direct factory pricing.
              </p>

              {/* Concise Key Metrics: 2x2 Grid on Mobile, 4 Cols on Desktop */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 pt-3.5 border-t border-slate-200/90 max-w-xl mb-6 sm:mb-8">
                <div className="p-2 sm:p-0 rounded-xl bg-white/70 sm:bg-transparent border border-slate-200/70 sm:border-none shadow-2xs sm:shadow-none">
                  <div className="flex items-center gap-1.5 text-[#071633] font-bold text-sm sm:text-base">
                    <Clock className="w-3.5 h-3.5 text-[#0B1B44] shrink-0" /> 45 Days
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Handover Guarantee</div>
                </div>

                <div className="p-2 sm:p-0 rounded-xl bg-white/70 sm:bg-transparent border border-slate-200/70 sm:border-none shadow-2xs sm:shadow-none">
                  <div className="flex items-center gap-1.5 text-[#071633] font-bold text-sm sm:text-base">
                    <Factory className="w-3.5 h-3.5 text-[#0B1B44] shrink-0" /> In-House
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Bangalore Factory</div>
                </div>

                <div className="p-2 sm:p-0 rounded-xl bg-white/70 sm:bg-transparent border border-slate-200/70 sm:border-none shadow-2xs sm:shadow-none">
                  <div className="flex items-center gap-1.5 text-[#071633] font-bold text-sm sm:text-base">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0B1B44] shrink-0" /> 10 Years
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Warranty Included</div>
                </div>

                <div className="p-2 sm:p-0 rounded-xl bg-white/70 sm:bg-transparent border border-slate-200/70 sm:border-none shadow-2xs sm:shadow-none">
                  <div className="flex items-center gap-1.5 text-[#071633] font-bold text-sm sm:text-base">
                    <Award className="w-3.5 h-3.5 text-[#0B1B44] shrink-0" /> ET Award
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Design Excellence</div>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Lead Capture Form */}
            <div className="lg:col-span-5" ref={formRef} id="lead-form">
              <div className="bg-white rounded-[20px] p-6 sm:p-8 border border-slate-200/90 shadow-sm">
                {isSuccess ? (
                  <div className="py-6 text-center flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-[#071633] mb-1">Thank You!</h3>
                    <p className="text-slate-600 text-[14px] leading-relaxed mb-6">
                      Our senior design architect will contact you within 2 business hours.
                    </p>
                    <a
                      href={`https://wa.me/919845014279?text=${encodeURIComponent(
                        `Hi VoometDesign, I requested a quote for ${formData.requirement}. My name is ${formData.name}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={trackWhatsAppClick}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-[14px] bg-[#0B1B44] text-white text-[14px] font-semibold hover:opacity-90 transition-opacity"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Chat on WhatsApp
                    </a>
                  </div>
                ) : (
                  <>
                    <div className="mb-5">
                      <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#6E7D9B] block mb-1">
                        FREE ESTIMATE
                      </span>
                      <h2 className="text-xl md:text-2xl font-[700] text-[#071633] tracking-tight">
                        Get a Free 3D Design & Quote
                      </h2>
                      <p className="text-[13px] text-slate-500 mt-1">
                        Consultation & site measurement with our senior team.
                      </p>
                    </div>

                    {submitError && (
                      <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-xs font-medium border border-red-100">
                        {submitError}
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-3.5">
                      <input
                        type="text"
                        name="botField"
                        value={formData.botField}
                        onChange={handleInputChange}
                        className="hidden"
                        tabIndex={-1}
                      />

                      {/* Name */}
                      <div>
                        <label className="block text-[12px] font-medium text-[#071633] mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your name"
                          className="w-full px-3.5 py-2.5 rounded-[12px] bg-white border border-slate-200 text-[#071633] placeholder-slate-400 text-[14px] outline-none focus:border-[#0B1B44] transition-colors"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-[12px] font-medium text-[#071633] mb-1">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[13px]">
                            +91
                          </span>
                          <input
                            type="tel"
                            name="mobileNumber"
                            required
                            pattern="[0-9]{10}"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            className="w-full pl-12 pr-3.5 py-2.5 rounded-[12px] bg-white border border-slate-200 text-[#071633] placeholder-slate-400 text-[14px] outline-none focus:border-[#0B1B44] transition-colors"
                          />
                        </div>
                      </div>

                      {/* Requirement & Area */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[12px] font-medium text-[#071633] mb-1">
                            Requirement
                          </label>
                          <select
                            name="requirement"
                            value={formData.requirement}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2.5 rounded-[12px] bg-white border border-slate-200 text-[#071633] text-[13px] outline-none focus:border-[#0B1B44]"
                          >
                            <option value="Hospitality">Hospitality</option>
                            <option value="Educational">Educational Space</option>
                            <option value="Residential">Residential Space</option>
                            <option value="Commercial">Commercial Space</option>
                            <option value="Aluminium & Facade">Aluminium & Facades</option>
                            <option value="Wooden Door Systems">Wooden Door Systems</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[12px] font-medium text-[#071633] mb-1">
                            Carpet Area
                          </label>
                          <select
                            name="areaSqft"
                            value={formData.areaSqft}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2.5 rounded-[12px] bg-white border border-slate-200 text-[#071633] text-[13px] outline-none focus:border-[#0B1B44]"
                          >
                            <option value="Below 1,000 sq ft">&lt; 1,000 sq ft</option>
                            <option value="1,200 - 2,000 sq ft">1,200 - 2,000 sq ft</option>
                            <option value="2,000 - 3,500 sq ft">2,000 - 3,500 sq ft</option>
                            <option value="3,500+ sq ft">3,500+ sq ft</option>
                          </select>
                        </div>
                      </div>

                      {/* Location */}
                      <div>
                        <label className="block text-[12px] font-medium text-[#071633] mb-1">
                          Location in Bangalore
                        </label>
                        <input
                          type="text"
                          name="projectLocation"
                          value={formData.projectLocation}
                          onChange={handleInputChange}
                          placeholder="e.g. Whitefield, HSR Layout"
                          className="w-full px-3.5 py-2.5 rounded-[12px] bg-white border border-slate-200 text-[#071633] placeholder-slate-400 text-[14px] outline-none focus:border-[#0B1B44] transition-colors"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-4 rounded-[14px] bg-[#0B1B44] text-white font-[600] text-[15px] hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer mt-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <span>Get Free Estimate</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <p className="text-[11px] text-slate-500 text-center pt-0.5">
                        100% Privacy. Zero spam calls.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLIENT / BRAND LOGOS TICKER ─── */}
      <BrandsSection />

      {/* ─── 2. SERVICES SECTION ─── */}
      <section id="services" className="w-full bg-white py-6 sm:py-10 md:py-16 border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 sm:mb-8 gap-3 sm:gap-4">
            <div>
              <span className="text-[12px] md:text-[13px] font-bold tracking-[0.2em] uppercase text-[#6E7D9B] mb-2 block">
                CORE SERVICES
              </span>
              <h2 className="text-[#071633] text-[clamp(28px,3.2vw,48px)] font-[700] leading-[1.05] tracking-[-0.03em]">
                Turnkey Solutions <br />
                <span className="text-slate-500 font-light">Single-Point Execution</span>
              </h2>
            </div>
            <p className="text-[14px] sm:text-[15px] leading-[1.7] text-slate-600 max-w-sm">
              From bespoke residential woodwork to structural aluminium facades, all managed
              end-to-end by our in-house team.
            </p>
          </div>

          {/* Mobile Swipe Cue */}
          <div className="flex sm:hidden items-center justify-between text-[11px] text-[#6E7D9B] font-medium mb-2">
            <span>Swipe to explore all services</span>
            <span className="flex items-center gap-1 font-semibold text-[#0B1B44]">Swipe &rarr;</span>
          </div>

          {/* 4 Core Services: Horizontal On-Scroll Slider on Mobile, 4-col Grid on Desktop */}
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible pb-3 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory scroll-smooth hide-scrollbar">
            {SERVICES_DATA.map((service) => (
              <div
                key={service.id}
                className="w-[80vw] max-w-[310px] sm:w-auto sm:max-w-none shrink-0 sm:shrink snap-center group rounded-[20px] bg-[#FAFAF8] border border-slate-200/80 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      quality={80}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[11px] font-semibold text-[#6E7D9B] uppercase tracking-wider block mb-1">
                      {service.tagline}
                    </span>
                    <h3 className="text-[18px] font-[700] text-[#071633] mb-2">{service.title}</h3>
                    <p className="text-[14px] text-slate-600 leading-relaxed font-[300]">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-1">
                  <button
                    onClick={() => scrollToForm(service.title)}
                    className="inline-flex items-center gap-1.5 text-[#0B1B44] text-[13px] font-[600] hover:opacity-70 transition-opacity cursor-pointer group"
                  >
                    <span>Get Quote</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ─── DEDICATED FULL-WIDTH SECTION: ALUMINIUM & WOODEN DOOR SYSTEMS ─── */}
          <div className="mt-10 sm:mt-14 pt-8 sm:pt-12 border-t border-slate-200/90">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-3 sm:gap-4">
              <div>
                <span className="text-[11px] md:text-[12px] font-bold tracking-[0.2em] uppercase text-[#6E7D9B] mb-1.5 block">
                  IN-HOUSE FACTORY MANUFACTURING
                </span>
                <h3 className="text-[#071633] text-[clamp(24px,2.6vw,36px)] font-[700] leading-tight tracking-[-0.02em]">
                  Architectural Fenestration & Door Systems
                </h3>
              </div>
              <p className="text-[13px] sm:text-[14px] leading-relaxed text-slate-600 max-w-md">
                Precision German engineering manufactured at our Doddaballapura facility. Custom fabricated for residential estates, institutional campuses, and commercial facades.
              </p>
            </div>

            {/* 2 Full-Width Cover Feature Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
              {ARCHITECTURAL_SYSTEMS.map((sys) => (
                <div
                  key={sys.id}
                  className="group relative rounded-[24px] overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-500 min-h-[360px] sm:min-h-[400px] flex flex-col justify-end p-6 sm:p-8"
                >
                  {/* Background Cover Image with Zoom Effect */}
                  <div className="absolute inset-0 z-0 overflow-hidden bg-slate-900">
                    <Image
                      src={sys.image}
                      alt={sys.title}
                      fill
                      quality={85}
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {/* Deep gradient overlay for crystal-clear readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#03091B] via-[#05112E]/85 to-transparent opacity-95" />
                    <div className="absolute inset-0 bg-black/25" />
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 flex flex-col justify-end">
                    <div className="inline-flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-[#F1D279] text-[11px] font-bold tracking-wider uppercase">
                        {sys.badge}
                      </span>
                      <span className="text-white/70 text-xs font-medium">
                        • {sys.tagline}
                      </span>
                    </div>

                    <h4 className="text-white text-xl sm:text-2xl font-bold tracking-tight mb-2 sm:mb-2.5">
                      {sys.title}
                    </h4>

                    <p className="text-white/80 text-[13px] sm:text-[14px] leading-relaxed mb-4 max-w-xl font-light">
                      {sys.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {sys.features.map((feat, fIdx) => (
                        <span
                          key={fIdx}
                          className="px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 text-white/90 text-[11px] font-medium"
                        >
                          ✓ {feat}
                        </span>
                      ))}
                    </div>

                    <div>
                      <button
                        onClick={() => scrollToForm(sys.serviceKey)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#071633] font-[600] text-[13px] hover:bg-[#F1D279] transition-all duration-300 shadow-md cursor-pointer group/btn"
                      >
                        <span>Get {sys.badge} Quote</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. ABOUT SECTION (MATCHES OURSTORY EXACTLY) ─── */}
      <section id="about" className="w-full bg-[#FAFAF8] py-6 sm:py-10 md:py-16 border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-16 items-center">
            {/* Left: Award / Showroom Visual */}
            <div>
              <span className="text-[12px] md:text-[13px] font-bold tracking-[0.2em] uppercase text-[#6E7D9B] mb-1.5 sm:mb-2 block">
                ABOUT US
              </span>
              <h2 className="text-[#071633] text-[clamp(28px,3.2vw,48px)] font-[700] leading-[1.05] tracking-[-0.03em] max-w-[420px] mb-3 sm:mb-4">
                Designing Spaces <br />
                <span className="text-slate-500 font-light">Building Trust</span>
              </h2>

              <div className="relative w-full max-w-[460px] rounded-[20px] overflow-hidden bg-white aspect-[4/3] border border-slate-200/80">
                <Image
                  src="/assets/pages/about/award.webp"
                  alt="VoometDesign Excellence"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 460px"
                />
              </div>
            </div>

            {/* Right: Narrative & Direct Points */}
            <div className="flex flex-col justify-center">
              <p className="text-[14px] sm:text-[16px] md:text-[17px] font-[300] leading-relaxed sm:leading-[1.85] text-slate-600 mb-4 sm:mb-6">
                VoometDesign is a Bangalore-based turnkey interior design and fenestration studio,
                delivering residential and commercial solutions with in-house automated manufacturing.
                Established in 2010, projects are managed end-to-end by a single team with guaranteed
                45-day handover.
              </p>

              <ul className="space-y-2.5 mb-5 sm:mb-8">
                {[
                  "Established 2010 — 300+ Projects Delivered Across Bangalore",
                  "Single-Point Turnkey Management: Design to site handover",
                  "Speed & Reliability: 45-day guaranteed project delivery",
                  "In-House German-Tech Manufacturing Facility in Bangalore",
                  "3D Visualization & Transparent Fixed Bill of Quantities (BoQ)",
                  "10-Year Comprehensive Warranty with Quality Assurance",
                ].map((text, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-slate-700 text-[14px] md:text-[15px] font-[500] leading-snug"
                  >
                    <Check className="w-4 h-4 text-[#0B1B44] opacity-80 shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => scrollToForm()}
                  className="py-3 px-6 rounded-[14px] bg-[#0B1B44] text-white text-[14px] font-[600] hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Book Free Site Visit
                </button>
                <a
                  href="tel:+919845014279"
                  onClick={trackCallClick}
                  className="inline-flex items-center gap-1.5 text-[#0B1B44] font-[600] text-[14px] hover:opacity-70 transition-opacity"
                >
                  <Phone className="w-4 h-4" />
                  <span>+91 98450 14279</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. FEATURED PROJECTS SECTION ─── */}
      <section id="projects" className="w-full bg-white py-6 sm:py-10 md:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12">
          {/* Section Header with Category Filters */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 sm:mb-8 gap-3 sm:gap-4">
            <div>
              <span className="text-[12px] md:text-[13px] font-bold tracking-[0.2em] uppercase text-[#6E7D9B] mb-2 block">
                PORTFOLIO
              </span>
              <h2 className="text-[#071633] text-[clamp(28px,3.2vw,48px)] font-[700] leading-[1.05] tracking-[-0.03em]">
                Featured Projects <br />
                <span className="text-slate-500 font-light">Delivered in Bangalore</span>
              </h2>
            </div>

            {/* Clean Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {["All", "Hospitality", "Educational", "Residential", "Commercial"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-[600] transition-colors cursor-pointer ${
                    activeFilter === filter
                      ? "bg-[#0B1B44] text-white"
                      : "bg-[#FAFAF8] text-slate-600 hover:text-[#0B1B44] border border-slate-200/80"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Swipe Cue */}
          <div className="flex sm:hidden items-center justify-between text-[11px] text-[#6E7D9B] font-medium mb-2">
            <span>Swipe across to explore projects</span>
            <span className="flex items-center gap-1 font-semibold text-[#0B1B44]">Swipe &rarr;</span>
          </div>

          {/* Portfolio Cards: Horizontal On-Scroll Slider on Mobile, Grid on Desktop */}
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 overflow-x-auto sm:overflow-visible pb-3 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory scroll-smooth hide-scrollbar">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                className="w-[82vw] max-w-[330px] sm:w-auto sm:max-w-none shrink-0 sm:shrink snap-center group rounded-[20px] bg-[#FAFAF8] border border-slate-200/80 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="relative h-60 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    quality={80}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-white/95 text-[11px] font-[600] text-[#071633] shadow-xs">
                      {proj.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-white/95 text-[11px] text-slate-600 shadow-xs">
                      {proj.area}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-[17px] font-[700] text-[#071633]">{proj.title}</h3>
                    <div className="flex items-center gap-1 text-[12px] text-slate-500 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#6E7D9B]" />
                      <span>{proj.location}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => scrollToForm(`Project: ${proj.title}`)}
                    className="inline-flex items-center gap-1 text-[#0B1B44] text-[13px] font-[600] hover:opacity-70 transition-opacity cursor-pointer group"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* View More Portfolio Link */}
          <div className="mt-4 sm:mt-8 flex justify-end">
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-[#0B1B44] font-[600] text-[15px] hover:opacity-70 transition-opacity group"
            >
              <span>View Full Portfolio</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── MOBILE STICKY CALL & QUOTE BAR (Appears only after scrolling past Hero) ─── */}
      <div
        className={`md:hidden fixed left-3 right-3 sm:left-4 sm:right-4 z-50 bg-white/95 backdrop-blur-md border border-slate-200/90 p-2.5 rounded-[18px] flex items-center gap-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.14)] transition-all duration-300 ${
          showStickyBar
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-12 pointer-events-none"
        }`}
        style={{
          bottom: "max(env(safe-area-inset-bottom, 16px), 16px)",
        }}
      >
        <a
          href="tel:+919845014279"
          onClick={trackCallClick}
          className="flex-1 py-3 px-3 rounded-[13px] bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-[#071633] font-[600] text-xs flex items-center justify-center gap-1.5 border border-slate-200/90 transition-all"
        >
          <Phone className="w-3.5 h-3.5 text-[#0B1B44]" />
          <span>Call Studio</span>
        </a>
        <button
          onClick={() => scrollToForm()}
          className="flex-1 py-3 px-3 rounded-[13px] bg-[#0B1B44] hover:bg-[#071633] active:scale-[0.98] text-white font-[600] text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
        >
          <span>Get Free Quote</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
