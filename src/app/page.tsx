// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
import Hero from "@/components/Hero";
import ServiceGrid from "@/components/ServiceGrid";
import LogoMarquee from "@/components/LogoMarquee";
import EdgeSection from "@/components/EdgeSection";
import AdvantageGrid from "@/components/AdvantageGrid";
import StyleSelector from "@/components/StyleSelector";
import ValueStatement from "@/components/ValueStatement";
import Gallery from "@/components/Gallery";
import TestimonialMarquee from "@/components/TestimonialMarquee";
import BlogSection from "@/components/BlogSection";
import FAQSection from "@/components/FAQSection";
import AccreditationsRibbon from "@/components/AccreditationsRibbon";
import LeadMagnet from "@/components/LeadMagnet";
import { Cpu, AppWindow, Truck, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="relative bg-white">
      <Hero /> {/* SECTION 1: THE CAPABILITIES RIBBON WITH CORE ICONS */}{" "}
      <section className="w-full bg-white relative z-20 mt-4 md:-mt-12 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4 my-12">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <Cpu className="w-8 h-8 text-slate-500 mb-4" />
            <h3 className="mb-4 text-base md:text-base lg:text-lg font-black uppercase tracking-wider leading-snug text-slate-950">
              CNC INDUSTRIAL POWER
            </h3>
            <p className="text-slate-600 leading-relaxed font-normal text-base md:text-base">
              {" "}
              100% in-house manufacturing equipped with multi-axis automated CNC
              milling for millimeter-precise custom joinery and woodwork.{" "}
            </p>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <AppWindow className="w-8 h-8 text-slate-500 mb-4" />
            <h3 className="mb-4 text-base md:text-base lg:text-lg font-black uppercase tracking-wider leading-snug text-slate-950">
              AUTOMATED BIM ARCHITECTURE
            </h3>
            <p className="text-slate-600 leading-relaxed font-normal text-base md:text-base">
              {" "}
              Real-time 3D photorealistic virtualization, technical AutoCAD
              floor alignments, and space matrix optimization.{" "}
            </p>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <Truck className="w-8 h-8 text-slate-500 mb-4" />
            <h3 className="mb-4 text-base md:text-base lg:text-lg font-black uppercase tracking-wider leading-snug text-slate-950">
              DIRECT-FROM-FACTORY SOURCING
            </h3>
            <p className="text-slate-600 leading-relaxed font-normal text-base md:text-base">
              {" "}
              Direct B2B integration with certified shops and processing plants,
              eliminating middleman commissions by up to 25%.{" "}
            </p>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <ShieldCheck className="w-8 h-8 text-slate-500 mb-4" />
            <h3 className="mb-4 text-base md:text-base lg:text-lg font-black uppercase tracking-wider leading-snug text-slate-950">
              100% TRANSPARENT BOQ
            </h3>
            <p className="text-slate-600 leading-relaxed font-normal text-base md:text-base">
              {" "}
              Line-by-item verified billing matrices containing exact batch
              codes, grade thicknesses, and authentic brand warranties.{" "}
            </p>
          </div>
        </div>
      </section>
      <ServiceGrid />
      <LogoMarquee />
      <EdgeSection />
      <AdvantageGrid />{" "}
      {/* SECTION 3: SOURCING TRANSPARENCY CHART WITH SPLIT MEDIA */}{" "}
      <section className="w-full bg-white py-12 lg:py-24 border-y border-slate-100">
        <div className="text-center mb-4">
          <span className="text-[10px] md:text-base font-black uppercase tracking-[0.25em] text-[#324A61] block mb-2 md:mb-3">
            QUALITY ASSURANCE
          </span>
          <h2 className="text-xl md:text-3xl font-black uppercase tracking-wide leading-tight text-slate-950 px-4">
            {" "}
            Sourcing & Quality Comparison Matrix{" "}
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 max-w-7xl mx-auto px-4 my-6 md:my-10 items-stretch">
          {" "}
          {/* LEFT SIDE: The Transparency Table */}{" "}
          <div className="lg:col-span-6 w-full h-full flex flex-col justify-center overflow-x-auto">
            <div className="overflow-hidden rounded-xl md:rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40 min-w-[600px] md:min-w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#020617] border-b border-slate-800">
                    <th className="py-3 px-4 md:py-5 md:px-6 text-xs md:text-sm font-black text-white uppercase tracking-widest w-1/3">
                      Operational Metric
                    </th>
                    <th className="py-3 px-4 md:py-5 md:px-6 text-xs md:text-sm font-black text-slate-400 uppercase tracking-widest w-1/3">
                      Traditional Contractors
                    </th>
                    <th className="py-3 px-4 md:py-5 md:px-6 text-xs md:text-sm font-black text-white bg-[#020617] uppercase tracking-widest w-1/3 border-l border-slate-700 shadow-[inset_4px_0_10px_rgba(0,0,0,0.1)]">
                      VoometDesign Turnkey Engine
                    </th>
                  </tr>
                </thead>
                <tbody className="text-base bg-white">
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 md:py-5 md:px-6 font-black uppercase tracking-wider text-slate-950 text-[10px] md:text-sm border-b border-slate-100">
                      Substrate Material
                    </td>
                    <td className="py-3 px-4 md:py-5 md:px-6 text-slate-500 text-xs md:text-sm font-medium border-b border-slate-100">
                      Standard Commercial Plywood
                    </td>
                    <td className="py-3 px-4 md:py-5 md:px-6 font-black text-white bg-[#020617] text-xs md:text-sm border-b border-slate-800 border-l shadow-[inset_4px_0_10px_rgba(0,0,0,0.1)]">
                      Calibrated BWR Marine Plywood (Batch-Traceable)
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 md:py-5 md:px-6 font-black uppercase tracking-wider text-slate-950 text-[10px] md:text-sm border-b border-slate-100">
                      Hardware Deployment
                    </td>
                    <td className="py-3 px-4 md:py-5 md:px-6 text-slate-500 text-xs md:text-sm font-medium border-b border-slate-100">
                      Local Stock Elements
                    </td>
                    <td className="py-3 px-4 md:py-5 md:px-6 font-black text-white bg-[#020617] text-xs md:text-sm border-b border-slate-800 border-l shadow-[inset_4px_0_10px_rgba(0,0,0,0.1)]">
                      Certified Soft-Close Technical Systems
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 md:py-5 md:px-6 font-black uppercase tracking-wider text-slate-950 text-[10px] md:text-sm">
                      Timeline Precision
                    </td>
                    <td className="py-3 px-4 md:py-5 md:px-6 text-slate-500 text-xs md:text-sm font-medium">
                      Prone to On-Site Delay Loops
                    </td>
                    <td className="py-3 px-4 md:py-5 md:px-6 font-black text-white bg-[#020617] text-xs md:text-sm border-l border-slate-800 shadow-[inset_4px_0_10px_rgba(0,0,0,0.1)]">
                      Off-Site Parallel Machining (Net-Zero Delay Guarantee)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>{" "}
          {/* RIGHT SIDE: Premium Material Showcase Gallery */}{" "}
          <div className="lg:col-span-6 w-full h-full">
            <div className="rounded-xl md:rounded-2xl shadow-2xl border-2 md:border-4 border-white overflow-hidden h-[200px] md:h-[380px] lg:h-full lg:min-h-[400px] grid grid-cols-2 group">
              <div className="relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1565636402438-e6b7858cfaee?q=80&w=1000"
                  alt="Factory Precision Board Cutting"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-2 md:p-4">
                  <span className="text-white text-[10px] md:text-sm font-black tracking-widest uppercase">
                    Factory Calibration
                  </span>
                </div>
              </div>
              <div className="relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1000"
                  alt="Premium Stone Selection"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-2 md:p-4">
                  <span className="text-white text-[10px] md:text-sm font-black tracking-widest uppercase">
                    Verified Sourcing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <StyleSelector />
      <ValueStatement />
      {/* SECTION 2: THE 4-STAGE EXECUTION FLOW WITH IMAGES Grid */}{" "}
      <section className="w-full bg-slate-50 py-12 md:py-24 border-y border-slate-100">
        <h2 className="text-center mb-4 md:mb-6 text-xl md:text-3xl font-black uppercase tracking-wide leading-tight text-slate-950 px-4">
          {" "}
          THE BLUEPRINT PROCESS FLOW{" "}
        </h2>
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto px-4 my-8 md:my-16 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 md:pb-0">
          <div className="flex flex-col min-w-[85vw] md:min-w-0 snap-center">
            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-900 border border-slate-100 relative group shadow-md">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000"
                alt="Audit & Alignment Blueprint"
                className="group-hover:scale-105 transition-transform duration-500 object-cover w-full h-full opacity-90"
              />
              <div className="absolute top-3 right-3 bg-[#020617] text-white font-black text-xs md:text-base px-2 py-1 rounded shadow-sm">
                01
              </div>
            </div>
            <span className="text-[10px] md:text-base font-black uppercase tracking-[0.25em] text-[#324A61] block mb-2 md:mb-3">
              STAGE 01
            </span>
            <h3 className="mb-2 md:mb-3 text-sm md:text-base lg:text-lg font-black uppercase tracking-wider leading-snug text-slate-950">
              AUDIT & ALIGNMENT
            </h3>
            <p className="text-slate-600 leading-relaxed font-normal text-sm md:text-base">
              {" "}
              Site infrastructure technical mapping, building bylaw check, and
              primary space requirement profiling.{" "}
            </p>
          </div>
          <div className="flex flex-col min-w-[85vw] md:min-w-0 snap-center">
            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-900 border border-slate-100 relative group shadow-md">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000"
                alt="Virtualization Matrix"
                className="group-hover:scale-105 transition-transform duration-500 object-cover w-full h-full opacity-90"
              />
              <div className="absolute top-3 right-3 bg-[#020617] text-white font-black text-xs md:text-base px-2 py-1 rounded shadow-sm">
                02
              </div>
            </div>
            <span className="text-[10px] md:text-base font-black uppercase tracking-[0.25em] text-[#324A61] block mb-2 md:mb-3">
              STAGE 02
            </span>
            <h3 className="mb-2 md:mb-3 text-sm md:text-base lg:text-lg font-black uppercase tracking-wider leading-snug text-slate-950">
              VIRTUALIZATION MATRIX
            </h3>
            <p className="text-slate-600 leading-relaxed font-normal text-sm md:text-base">
              {" "}
              Developing detailed AutoCAD blueprints, material selection
              matching, and high-end photorealistic 3D rendering updates.{" "}
            </p>
          </div>
          <div className="flex flex-col min-w-[85vw] md:min-w-0 snap-center">
            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-900 border border-slate-100 relative group shadow-md">
              <img
                src="https://images.unsplash.com/photo-1565636402438-e6b7858cfaee?q=80&w=2070"
                alt="Factory Pre-Fabrication"
                className="group-hover:scale-105 transition-transform duration-500 object-cover w-full h-full opacity-90"
              />
              <div className="absolute top-3 right-3 bg-[#020617] text-white font-black text-xs md:text-base px-2 py-1 rounded shadow-sm">
                03
              </div>
            </div>
            <span className="text-[10px] md:text-base font-black uppercase tracking-[0.25em] text-[#324A61] block mb-2 md:mb-3">
              STAGE 03
            </span>
            <h3 className="mb-2 md:mb-3 text-sm md:text-base lg:text-lg font-black uppercase tracking-wider leading-snug text-slate-950">
              FACTORY PRE-FAB BATCHING
            </h3>
            <p className="text-slate-600 leading-relaxed font-normal text-sm md:text-base">
              {" "}
              Parallel off-site machining of modular systems and custom
              structures to ensure zero site construction delays.{" "}
            </p>
          </div>
          <div className="flex flex-col min-w-[85vw] md:min-w-0 snap-center">
            <div className="w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-900 border border-slate-100 relative group shadow-md">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2074"
                alt="Turnkey Site Handover"
                className="group-hover:scale-105 transition-transform duration-500 object-cover w-full h-full opacity-90"
              />
              <div className="absolute top-3 right-3 bg-[#020617] text-white font-black text-xs md:text-base px-2 py-1 rounded shadow-sm">
                04
              </div>
            </div>
            <span className="text-[10px] md:text-base font-black uppercase tracking-[0.25em] text-[#324A61] block mb-2 md:mb-3">
              STAGE 04
            </span>
            <h3 className="mb-2 md:mb-3 text-sm md:text-base lg:text-lg font-black uppercase tracking-wider leading-snug text-slate-950">
              TURNKEY SITE HANDOVER
            </h3>
            <p className="text-slate-600 leading-relaxed font-normal text-sm md:text-base">
              {" "}
              Sequential on-site trade coordination (Electrical, Plumber, POP,
              Tiles) managed under strict daily QA inspections.{" "}
            </p>
          </div>
        </div>
      </section>
      <TestimonialMarquee />
      <BlogSection />
      <FAQSection /> {/* SECTION 4: THE ACCREDITATIONS TRUST RIBBON */}
      <AccreditationsRibbon />
      <LeadMagnet />
    </main>
  );
}
