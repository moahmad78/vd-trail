// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
import Hero from "@/components/Hero";
import ServiceGrid from "@/components/ServiceGrid";

import EdgeSection from "@/components/EdgeSection";
import AdvantageGrid from "@/components/AdvantageGrid";
import StyleSelector from "@/components/StyleSelector";
import ValueStatement from "@/components/ValueStatement";
import ProjectHighlights from "@/components/ProjectHighlights";
import ServiceMarquee from "@/components/ServiceMarquee";
// import BlogSection from "@/components/BlogSection";
import FAQSection from "@/components/FAQSection";
import AccreditationsRibbon from "@/components/AccreditationsRibbon";
import LeadMagnet from "@/components/LeadMagnet";
import { Cpu, AppWindow, Truck, ShieldCheck } from "lucide-react";
import SlideUpFade from "@/components/animations/SlideUpFade";
import StaggerGrid from "@/components/animations/StaggerGrid";
import ImageReveal from "@/components/animations/ImageReveal";
import SectionWave from "@/components/ui/SectionWave";

export default function Home() {
  return (
    <main className="relative bg-white">
      {/* [Section 1]: Hero Showcase Banner */}
      <Hero />

      {/* [Section 4]: Core Expertise Grid */}
      <ServiceGrid />
      <section className="w-full bg-white relative z-20 mt-8 md:mt-16 mb-16">
        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch site-container my-12">
          <div className="relative overflow-hidden bg-white/50 backdrop-blur-sm rounded-2xl border border-neutral-200/80 p-8 shadow-sm group hover:border-neutral-400 hover:shadow-md transition-all duration-500 flex flex-col h-full justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#0f172a] text-white flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sans font-semibold text-sm tracking-[0.1em] text-neutral-900 uppercase mb-3">
                CNC INDUSTRIAL POWER
              </h3>
              <p className="font-sans font-normal text-xs leading-relaxed text-neutral-500">
                100% in-house manufacturing equipped with multi-axis automated CNC
                milling for millimeter-precise custom joinery and woodwork.
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden bg-white/50 backdrop-blur-sm rounded-2xl border border-neutral-200/80 p-8 shadow-sm group hover:border-neutral-400 hover:shadow-md transition-all duration-500 flex flex-col h-full justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#0f172a] text-white flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
              <AppWindow className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sans font-semibold text-sm tracking-[0.1em] text-neutral-900 uppercase mb-3">
                AUTOMATED BIM ARCHITECTURE
              </h3>
              <p className="font-sans font-normal text-xs leading-relaxed text-neutral-500">
                Real-time 3D photorealistic virtualization, technical AutoCAD
                floor alignments, and space matrix optimization.
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden bg-white/50 backdrop-blur-sm rounded-2xl border border-neutral-200/80 p-8 shadow-sm group hover:border-neutral-400 hover:shadow-md transition-all duration-500 flex flex-col h-full justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#0f172a] text-white flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sans font-semibold text-sm tracking-[0.1em] text-neutral-900 uppercase mb-3">
                DIRECT-FROM-FACTORY SOURCING
              </h3>
              <p className="font-sans font-normal text-xs leading-relaxed text-neutral-500">
                Direct B2B integration with certified shops and processing plants,
                eliminating middleman commissions by up to 25%.
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden bg-white/50 backdrop-blur-sm rounded-2xl border border-neutral-200/80 p-8 shadow-sm group hover:border-neutral-400 hover:shadow-md transition-all duration-500 flex flex-col h-full justify-between">
            <div className="w-10 h-10 rounded-xl bg-[#0f172a] text-white flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sans font-semibold text-sm tracking-[0.1em] text-neutral-900 uppercase mb-3">
                100% TRANSPARENT BOQ
              </h3>
              <p className="font-sans font-normal text-xs leading-relaxed text-neutral-500">
                Line-by-item verified billing matrices containing exact batch
                codes, grade thicknesses, and authentic brand warranties.
              </p>
            </div>
          </div>
        </StaggerGrid>
      </section>



      {/* [Section 3]: Project Highlights Portfolio Grid */}
      <ProjectHighlights />
      <ServiceMarquee />

      {/* [Section 5]: The Voomet Edge & Advantage Grid Modules */}
      <EdgeSection />
      <AdvantageGrid />

      {/* Execution Matrix / Blueprint Process Flow */}
      <section className="w-full bg-slate-50 py-16 md:py-24 border-y border-slate-100">
        <SlideUpFade>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between w-full max-w-[1400px] mx-auto mb-12 px-4 md:px-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-neutral-300"></span>
                <span className="text-[11px] text-neutral-500 uppercase tracking-[0.35em] font-sans">Execution</span>
              </div>
              <h2 className="font-sans text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[0.95] text-neutral-900 flex flex-wrap items-center">
                The Blueprint{" "}<span className="italic font-light inline-flex items-center">Process Flow<SectionWave /></span>
              </h2>
            </div>
            <p className="text-sm text-neutral-500 max-w-xs md:text-right font-light leading-relaxed mt-4 md:mt-0">
              Our refined 4-stage technical execution matrix ensures zero site delays and medical-grade precision.
            </p>
          </div>
        </SlideUpFade>
        <StaggerGrid className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 site-container my-8 md:my-16 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 md:pb-0">
          <div className="flex flex-col min-w-[85vw] md:min-w-0 snap-center h-full">
            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-900 border border-slate-100 relative group shadow-md">
              <img loading="lazy" decoding="async"
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000"
                alt="Audit & Alignment Blueprint"
                className="group-hover:scale-105 transition-transform duration-500 object-cover w-full h-full opacity-90"
              />
              <div className="absolute top-3 right-3 bg-[#0f172a] text-white text-xs md:text-base px-2 py-1 rounded shadow-sm">
                01
              </div>
            </div>
            <span className="text-[10px] md:text-base text-[#324A61] block mb-2 md:mb-3">
              STAGE 01
            </span>
            <h3 className="text-card mb-2 md:mb-3 text-sm md:text-base lg:text-lg leading-snug text-neutral-900">
              AUDIT & ALIGNMENT
            </h3>
            <p className="text-neutral-600 leading-relaxed font-normal text-sm md:text-base">
              Site infrastructure technical mapping, building bylaw check, and
              primary space requirement profiling.
            </p>
          </div>
          <div className="flex flex-col min-w-[85vw] md:min-w-0 snap-center">
            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-900 border border-slate-100 relative group shadow-md">
              <img loading="lazy" decoding="async"
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000"
                alt="Virtualization Matrix"
                className="group-hover:scale-105 transition-transform duration-500 object-cover w-full h-full opacity-90"
              />
              <div className="absolute top-3 right-3 bg-[#0f172a] text-white text-xs md:text-base px-2 py-1 rounded shadow-sm">
                02
              </div>
            </div>
            <span className="text-[10px] md:text-base text-[#324A61] block mb-2 md:mb-3">
              STAGE 02
            </span>
            <h3 className="text-card mb-2 md:mb-3 text-sm md:text-base lg:text-lg leading-snug text-neutral-900">
              VIRTUALIZATION MATRIX
            </h3>
            <p className="text-neutral-600 leading-relaxed font-normal text-sm md:text-base">
              Developing detailed AutoCAD blueprints, material selection
              matching, and high-end photorealistic 3D rendering updates.
            </p>
          </div>
          <div className="flex flex-col min-w-[85vw] md:min-w-0 snap-center">
            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-900 border border-slate-100 relative group shadow-md">
              <img loading="lazy" decoding="async"
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=600&q=80"
                alt="Factory Pre-Fabrication"
                className="group-hover:scale-105 transition-transform duration-500 object-cover w-full h-full opacity-90"
              />
              <div className="absolute top-3 right-3 bg-[#0f172a] text-white text-xs md:text-base px-2 py-1 rounded shadow-sm">
                03
              </div>
            </div>
            <span className="text-[10px] md:text-base text-[#324A61] block mb-2 md:mb-3">
              STAGE 03
            </span>
            <h3 className="text-card mb-2 md:mb-3 text-sm md:text-base lg:text-lg leading-snug text-neutral-900">
              FACTORY PRE-FAB BATCHING
            </h3>
            <p className="text-neutral-600 leading-relaxed font-normal text-sm md:text-base">
              Parallel off-site machining of modular systems and custom
              structures to ensure zero site construction delays.
            </p>
          </div>
          <div className="flex flex-col min-w-[85vw] md:min-w-0 snap-center">
            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-900 border border-slate-100 relative group shadow-md">
              <img loading="lazy" decoding="async"
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2074"
                alt="Turnkey Site Handover"
                className="group-hover:scale-105 transition-transform duration-500 object-cover w-full h-full opacity-90"
              />
              <div className="absolute top-3 right-3 bg-[#0f172a] text-white text-xs md:text-base px-2 py-1 rounded shadow-sm">
                04
              </div>
            </div>
            <span className="text-[10px] md:text-base text-[#324A61] block mb-2 md:mb-3">
              STAGE 04
            </span>
            <h3 className="text-card mb-2 md:mb-3 text-sm md:text-base lg:text-lg leading-snug text-neutral-900">
              TURNKEY SITE HANDOVER
            </h3>
            <p className="text-neutral-600 leading-relaxed font-normal text-sm md:text-base">
              Sequential on-site trade coordination (Electrical, Plumber, POP,
              Tiles) managed under strict daily QA inspections.
            </p>
          </div>
        </StaggerGrid>
      </section>

      {/* [Section 6]: Quality Assurance / Sourcing & Quality Comparison Matrix Table */}
      <section className="w-full bg-white py-16 lg:py-24 border-y border-slate-100">
        <SlideUpFade>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between w-full max-w-[1400px] mx-auto mb-12 px-4 md:px-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-neutral-300"></span>
                <span className="text-[11px] text-neutral-500 uppercase tracking-[0.35em] font-sans">Quality Assurance</span>
              </div>
              <h2 className="font-sans text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[0.95] text-neutral-900 flex flex-wrap items-center">
                Sourcing & Quality{" "}<span className="italic font-light inline-flex items-center">Comparison Matrix<SectionWave /></span>
              </h2>
            </div>
            <p className="text-sm text-neutral-500 max-w-xs md:text-right font-light leading-relaxed mt-4 md:mt-0">
              See exactly how our turnkey engine guarantees transparent pricing and premium materials.
            </p>
          </div>
        </SlideUpFade>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 items-stretch site-container my-6 md:my-10">
          {/* LEFT SIDE: The Transparency Table */}
          <div className="w-full h-full flex flex-col justify-center overflow-x-auto">
            <SlideUpFade delay={0.1}>
              <div className="overflow-hidden rounded-xl md:rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40 min-w-[600px] md:min-w-full">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0f172a] border-b border-slate-800">
                      <th className="py-3 px-4 md:py-5 md:px-6 font-sans font-semibold tracking-wide text-xs uppercase text-white w-1/3">
                        Operational Metric
                      </th>
                      <th className="py-3 px-4 md:py-5 md:px-6 font-sans font-semibold tracking-wide text-xs uppercase text-slate-400 w-1/3">
                        Traditional Contractors
                      </th>
                      <th className="py-3 px-4 md:py-5 md:px-6 font-sans font-semibold tracking-wide text-xs uppercase text-white bg-[#0f172a] w-1/3 border-l border-slate-700 shadow-[inset_4px_0_10px_rgba(15, 23, 42,0.1)]">
                        VoometDesign Turnkey Engine
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 md:py-5 md:px-6 text-sm font-normal text-neutral-600 border-b border-slate-100">
                        Substrate Material
                      </td>
                      <td className="py-3 px-4 md:py-5 md:px-6 text-sm font-normal text-neutral-600 border-b border-slate-100">
                        Standard Commercial Plywood
                      </td>
                      <td className="py-3 px-4 md:py-5 md:px-6 text-white bg-[#0f172a] text-sm font-normal border-b border-slate-800 border-l shadow-[inset_4px_0_10px_rgba(15, 23, 42,0.1)]">
                        Calibrated BWR Marine Plywood (Batch-Traceable)
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 md:py-5 md:px-6 text-sm font-normal text-neutral-600 border-b border-slate-100">
                        Hardware Deployment
                      </td>
                      <td className="py-3 px-4 md:py-5 md:px-6 text-sm font-normal text-neutral-600 border-b border-slate-100">
                        Local Stock Elements
                      </td>
                      <td className="py-3 px-4 md:py-5 md:px-6 text-white bg-[#0f172a] text-sm font-normal border-b border-slate-800 border-l shadow-[inset_4px_0_10px_rgba(15, 23, 42,0.1)]">
                        Certified Soft-Close Technical Systems
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 md:py-5 md:px-6 text-sm font-normal text-neutral-600">
                        Timeline Precision
                      </td>
                      <td className="py-3 px-4 md:py-5 md:px-6 text-sm font-normal text-neutral-600">
                        Prone to On-Site Delay Loops
                      </td>
                      <td className="py-3 px-4 md:py-5 md:px-6 text-white bg-[#0f172a] text-sm font-normal border-l border-slate-800 shadow-[inset_4px_0_10px_rgba(15, 23, 42,0.1)]">
                        Off-Site Parallel Machining (Net-Zero Delay Guarantee)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </SlideUpFade>
          </div>
          {/* RIGHT SIDE: Premium Material Showcase Gallery */}
          <div className="w-full h-full">
            <div className="rounded-2xl border border-neutral-200 overflow-hidden relative w-full h-full min-h-[400px]">
              <img loading="lazy" decoding="async"
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
                alt="Factory Precision"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* [Section 7]: Budget Pricing Tiers (Standard / Medium / Luxury style selectors) */}
      <StyleSelector />
      <ValueStatement />

      {/* [Section 8]: Authority Insights (Journal/Blogs) - Removed from Home Page */}
      {/* <BlogSection /> */}

      {/* [Section 9]: Frequently Asked Questions & Free Consultation Contact Form */}
      <FAQSection />
      <AccreditationsRibbon />
    </main>
  );
}
