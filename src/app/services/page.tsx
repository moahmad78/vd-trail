// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
import ServiceGrid from "@/components/ServiceGrid";
import VoometDesignDifference from "@/components/VoometDesignDifference";
import TestimonialSlider from "@/components/TestimonialSlider";
import Navbar from "@/components/Navbar";
import {
 ArrowRight,
 CheckCircle2,
 ChevronRight,
 DraftingCompass,
 Frame,
 Hexagon,
 Component,
} from "lucide-react";
import Link from "next/link";
export default function ServicesPage() {
 return (
 <main className="bg-white min-h-screen">
 <Navbar />
 {/* 1. HERO SECTION */}{" "}
 <section className="pt-40 pb-20 bg-[#0f172a] text-white overflow-hidden relative border-b border-slate-800">
 <div className="absolute inset-0 z-0 opacity-10">
 <img loading="lazy" decoding="async"
 src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000"
 className="w-full h-full object-cover"
 alt="AutoCAD Blueprint Watermark"
 />
 </div>
 <div className="site-container relative z-10 text-center max-w-4xl">
 <span className="text-badge md: ] text-[#324A61] block mb-3">
 {" "}
 CORE CAPABILITIES & ENGINEERING{" "}
 </span>
 <h1 className="text-hero mb-8 leading-[1.1] text-3xl md:text-5xl lg:text-6xl text-white">
 {" "}
 Turnkey Architecture & <br />
 <span className="text-slate-400">Precision Fit-Outs</span>
 </h1>
 <p className="mb-10 max-w-2xl mx-auto text-slate-300 leading-relaxed font-normal text-base md:text-base">
 {" "}
 From heavy-duty hospitality infrastructures to luxury residential
 villas, we provide end-to-end architectural solutions driven by our
 in-house manufacturing powerhouse.{" "}
 </p>
 <div className="flex flex-wrap justify-center gap-6">
 {" "}
 {["ZERO OUTSOURCING", "20-YEAR LEGACY", "100% TRANSPARENT BOQ"].map(
 (item) => (
 <div
 key={item}
 className="flex items-center gap-2 text-xs font-bold ] text-slate-400"
 >
 <CheckCircle2 size={14} className="text-slate-400" />{" "}
 {item}{" "}
 </div>
 ),
 )}{" "}
 </div>
 </div>
 </section>{" "}
 {/* 2. THE ENGINEERING GRID */}{" "}
 <section className="py-24 bg-slate-50 border-b border-slate-200">
 <div className="site-container">
 <div className="text-center mb-16">
 <h2 className="text-section text-2xl md:text-3xl text-neutral-900">
 {" "}
 HEAVY-DUTY SERVICE SECTORS{" "}
 </h2>
 <p className="mt-4 text-neutral-600 leading-relaxed font-normal text-base md:text-base">
 Select a specific sector to view our tailored engineering
 capabilities.
 </p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 {" "}
 {/* Sector 1: Commercial & Hospitality */}{" "}
 <div className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
 <div className="h-[280px] w-full overflow-hidden relative">
 <img loading="lazy" decoding="async"
 src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070"
 alt="Hospitality Interiors"
 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 to-transparent flex items-end p-8">
 <div className="flex items-center gap-3">
 <Frame className="text-neutral-500 w-6 h-6" />
 <h3 className="text-card text-base md:text-base lg:text-lg text-neutral-900">
 Hospitality & Commercial
 </h3>
 </div>
 </div>
 </div>
 <div className="p-8 flex-grow flex flex-col justify-between">
 <div>
 <p className="mb-6 text-neutral-600 leading-relaxed font-normal text-base md:text-base">
 {" "}
 Immersive, high-end guest experiences tailored for luxury
 hotels, corporate tech parks, and boutique retail lounges.
 Engineered for heavy footfall and premium acoustics.{" "}
 </p>
 <ul className="space-y-2 mb-8">
 {" "}
 {[
 "Acoustic Wall Paneling",
 "Reception & Lobby Fit-outs",
 "Custom Restaurant Joinery",
 "Smart Lighting Integration",
 ].map((spec) => (
 <li
 key={spec}
 className="text-sm font-bold text-slate-700 flex items-center gap-2"
 >
 <span className="w-1.5 h-1.5 bg-[#0f172a] rounded-full"></span>{" "}
 {spec}{" "}
 </li>
 ))}{" "}
 </ul>
 </div>
 <Link
 href="/contact"
 className="w-full bg-slate-900 text-white text-xs ] py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#324A61] hover:text-neutral-900 transition-colors"
 >
 {" "}
 REQUEST SECTOR BOQ <ChevronRight size={14} />
 </Link>
 </div>
 </div>{" "}
 {/* Sector 2: Bespoke Residential */}{" "}
 <div className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
 <div className="h-[280px] w-full overflow-hidden relative">
 <img loading="lazy" decoding="async"
 src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2074"
 alt="Residential Interiors"
 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 to-transparent flex items-end p-8">
 <div className="flex items-center gap-3">
 <Hexagon className="text-neutral-500 w-6 h-6" />
 <h3 className="text-card text-base md:text-base lg:text-lg text-neutral-900">
 Bespoke Residential
 </h3>
 </div>
 </div>
 </div>
 <div className="p-8 flex-grow flex flex-col justify-between">
 <div>
 <p className="mb-6 text-neutral-600 leading-relaxed font-normal text-base md:text-base">
 {" "}
 Crafting handcrafted, custom living spaces, luxury
 penthouses, and private villas. Utilizing premium calibrated
 plywood, imported laminates, and soft-close German
 hardware.{" "}
 </p>
 <ul className="space-y-2 mb-8">
 {" "}
 {[
 "Modular Kitchen Architecture",
 "Walk-in Wardrobe Systems",
 "False Ceiling & Lighting",
 "Custom Furniture Fabrication",
 ].map((spec) => (
 <li
 key={spec}
 className="text-sm font-bold text-slate-700 flex items-center gap-2"
 >
 <span className="w-1.5 h-1.5 bg-[#0f172a] rounded-full"></span>{" "}
 {spec}{" "}
 </li>
 ))}{" "}
 </ul>
 </div>
 <Link
 href="/contact"
 className="w-full bg-slate-900 text-white text-xs ] py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#324A61] hover:text-neutral-900 transition-colors"
 >
 {" "}
 REQUEST RESIDENTIAL ESTIMATE <ChevronRight size={14} />
 </Link>
 </div>
 </div>{" "}
 {/* Sector 3: Educational Infrastructure */}{" "}
 <div className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
 <div className="h-[280px] w-full overflow-hidden relative">
 <img loading="lazy" decoding="async"
 src="/images/Services-card/education.jpg"
 alt="Educational Interiors"
 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 to-transparent flex items-end p-8">
 <div className="flex items-center gap-3">
 <DraftingCompass className="text-neutral-500 w-6 h-6" />
 <h3 className="text-card text-base md:text-base lg:text-lg text-neutral-900">
 Educational Infrastructure
 </h3>
 </div>
 </div>
 </div>
 <div className="p-8 flex-grow flex flex-col justify-between">
 <div>
 <p className="mb-6 text-neutral-600 leading-relaxed font-normal text-base md:text-base">
 {" "}
 Inspiring, ergonomic, and adaptive academic environments
 engineered for future generations. Built to withstand
 extreme wear and tear with Class-A fire-retardant safety
 compliance.{" "}
 </p>
 <ul className="space-y-2 mb-8">
 {" "}
 {[
 "Ergonomic Classroom Desks",
 "Acoustic Auditorium Seating",
 "Laboratory Casework",
 "Library Shelving Networks",
 ].map((spec) => (
 <li
 key={spec}
 className="text-sm font-bold text-slate-700 flex items-center gap-2"
 >
 <span className="w-1.5 h-1.5 bg-[#0f172a] rounded-full"></span>{" "}
 {spec}{" "}
 </li>
 ))}{" "}
 </ul>
 </div>
 <Link
 href="/contact"
 className="w-full bg-slate-900 text-white text-xs ] py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#324A61] hover:text-neutral-900 transition-colors"
 >
 {" "}
 REQUEST INSTITUTIONAL BOQ <ChevronRight size={14} />
 </Link>
 </div>
 </div>{" "}
 {/* Sector 4: Aluminium & UPVC Systems */}{" "}
 <div className="group relative bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
 <div className="h-[280px] w-full overflow-hidden relative">
 <img loading="lazy" decoding="async"
 src="https://images.unsplash.com/photo-1590483734724-383b85ad65e7?q=80&w=1200"
 alt="Aluminium & UPVC Systems"
 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 to-transparent flex items-end p-8">
 <div className="flex items-center gap-3">
 <Component className="text-neutral-500 w-6 h-6" />
 <h3 className="text-card text-base md:text-base lg:text-lg text-neutral-900">
 Aluminium & UPVC Systems
 </h3>
 </div>
 </div>
 </div>
 <div className="p-8 flex-grow flex flex-col justify-between">
 <div>
 <p className="mb-6 text-neutral-600 leading-relaxed font-normal text-base md:text-base">
 {" "}
 Direct-factory manufacturing of premium architectural
 glazing, curtain walls, and medical-grade acoustic systems.
 Delivering absolute thermal insulation and structural
 integrity.{" "}
 </p>
 <ul className="space-y-2 mb-8">
 {" "}
 {[
 "Slimline Sliding Systems",
 "Structural Glazing Facades",
 "Acoustic UPVC Windows",
 "Toughened Glass Partitions",
 ].map((spec) => (
 <li
 key={spec}
 className="text-sm font-bold text-slate-700 flex items-center gap-2"
 >
 <span className="w-1.5 h-1.5 bg-[#0f172a] rounded-full"></span>{" "}
 {spec}{" "}
 </li>
 ))}{" "}
 </ul>
 </div>
 <Link
 href="/aluminium-upvc-systems"
 className="w-full bg-slate-900 text-white text-xs ] py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#324A61] hover:text-neutral-900 transition-colors"
 >
 {" "}
 VIEW TECHNICAL SYSTEMS <ChevronRight size={14} />
 </Link>
 </div>
 </div>
 </div>
 </div>
 </section>{" "}
 {/* 3. OPTIONAL SUPPORTING COMPONENTS */} <ServiceGrid />
 <VoometDesignDifference />
 <TestimonialSlider /> {/* 4. GLOBAL CONVERSION CTA */}{" "}
 <section className="py-24 bg-[#0f172a] text-center relative overflow-hidden border-t border-slate-300">
 <div className="absolute inset-0 z-0 opacity-5">
 <img loading="lazy" decoding="async"
 src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000"
 className="w-full h-full object-cover"
 alt="AutoCAD Blueprint Watermark"
 />
 </div>
 <div className="site-container relative z-10">
 <span className="text-badge md: ] text-[#324A61] block mb-3">
 {" "}
 SECURE YOUR MANUFACTURING SLOT{" "}
 </span>
 <h2 className="text-section mb-8 text-2xl md:text-3xl text-white">
 {" "}
 INITIATE TECHNICAL CONSULTATION{" "}
 </h2>
 <p className="mb-10 max-w-2xl mx-auto text-slate-300 leading-relaxed font-normal text-base md:text-base">
 {" "}
 Submit your structural dimensions and our lead architectural squad
 will prepare a comprehensive layout plan and BOQ estimate within 24
 hours.{" "}
 </p>
 <div className="flex flex-wrap justify-center gap-4">
 <Link
 href="/contact"
 className="bg-[#324A61] text-white text-sm py-3.5 px-6 rounded-lg hover:bg-white hover:text-[#0f172a] transition-all duration-300 shadow-md"
 >
 {" "}
 SUBMIT BOQ REQUEST ➔{" "}
 </Link>
 </div>
 </div>{" "}
 </section>
 </main>
 );
}
