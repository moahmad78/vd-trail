// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";
import { useEffect, useRef } from "react";
import { motion, animate, useInView } from "framer-motion";
import Link from "next/link";
import {
  Target,
  Layers,
  ShieldCheck,
  Activity,
  Users,
  Settings,
  Award,
  Clock,
  ArrowRight,
  PenTool,
  HardHat,
  CheckCircle2,
  ChevronRight,
  Anchor,
} from "lucide-react";

function AnimatedCounter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(v) {
          if (ref.current) {
            ref.current.textContent = Math.floor(v) + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen pt-24 pb-0">
      {/* 1. THE HERITAGE HERO (Split Layout) */}
      <section className="max-w-[1440px] mx-auto px-4 py-12 lg:py-20 border-b border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1 relative rounded-3xl overflow-hidden shadow-2xl h-[400px] lg:h-[600px] border border-slate-100 bg-slate-900 group">
            <img
              src="https://images.unsplash.com/photo-1541888086925-ebca717e8894?q=80&w=1200"
              alt="VoometDesign Engineering Legacy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <span className="bg-[#020617] text-white font-black uppercase tracking-widest text-[9px] px-3 py-1 rounded inline-block mb-3">
                ESTABLISHED 2010
              </span>
              <p className="max-w-sm text-slate-600 leading-relaxed font-normal text-base md:text-base">
                A decade of uncompromising structural integrity and premium
                aesthetic execution across Pan-India.
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            <span className="text-sm md:text-base font-black uppercase tracking-[0.25em] text-[#324A61] block mb-3">
              OUR CORPORATE HERITAGE
            </span>
            <h1 className="text-[#020617] mb-8 text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-950">
              Two Decades of Precision Engineering.
            </h1>
            <p className="max-w-xl mb-6 text-slate-600 leading-relaxed font-normal text-base md:text-base">
              Voomet Design is a premier turnkey interior powerhouse, seamlessly
              blending heavy-duty manufacturing mastery with high-end
              architecture. We exist to eliminate the friction between
              conceptual design blueprints and physical reality.
            </p>
            <p className="max-w-xl mb-10 text-slate-600 leading-relaxed font-normal text-base md:text-base">
              Unlike traditional design studios, we don't just sketch
              concepts—we manufacture the raw materials, crimp the thermal
              profiles, mill the wood, and execute the complete site handover
              with absolute, uncompromising control.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 border-t border-slate-100 pt-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#020617] flex items-center justify-center shrink-0 shadow-md">
                  <Award size={20} className="text-slate-400" />
                </div>
                <div>
                  <h4 className="text-[#020617] text-sm md:text-base lg:text-lg font-black uppercase tracking-wide leading-tight mb-0.5">
                    ISO Certified
                  </h4>
                  <p className="text-[#324A61] text-xs md:text-sm font-bold uppercase tracking-widest block">
                    Quality Assurance
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#020617] flex items-center justify-center shrink-0 shadow-md">
                  <ShieldCheck size={20} className="text-slate-400" />
                </div>
                <div>
                  <h4 className="text-[#020617] text-sm md:text-base lg:text-lg font-black uppercase tracking-wide leading-tight mb-0.5">
                    Zero Outsourcing
                  </h4>
                  <p className="text-[#324A61] text-xs md:text-sm font-bold uppercase tracking-widest block">
                    100% In-House
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORPORATE PILLARS (Vision, Mission, Values) */}
      <section className="bg-slate-50 border-b border-slate-100 py-20">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sm md:text-base font-black uppercase tracking-[0.25em] text-[#324A61] block mb-3">
              THE FOUNDATION
            </span>
            <h2 className="text-[#020617] text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-950">
              Corporate Pillars
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#020617]/5 rounded-bl-[5rem] group-hover:bg-[#324A61]/10 transition-colors" />
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6">
                <Target size={20} className="text-slate-400" />
              </div>
              <h3 className="text-[#020617] mb-3 text-base md:text-base lg:text-lg font-black uppercase tracking-wide text-slate-950">
                Our Vision
              </h3>
              <p className="text-slate-600 leading-relaxed font-normal text-base md:text-base">
                To be the absolute standard of turnkey interior execution in
                Pan-India, setting benchmarks for engineering speed, material
                integrity, and luxury design across institutional and private
                sectors.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#020617]/5 rounded-bl-[5rem] group-hover:bg-[#324A61]/10 transition-colors" />
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6">
                <Layers size={20} className="text-slate-400" />
              </div>
              <h3 className="text-[#020617] mb-3 text-base md:text-base lg:text-lg font-black uppercase tracking-wide text-slate-950">
                Our Mission
              </h3>
              <p className="text-slate-600 leading-relaxed font-normal text-base md:text-base">
                To eliminate vendor dependency for our clients by providing 100%
                in-house design, fabrication, and execution capabilities,
                ensuring unmatched quality control from blueprint to handover.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#020617]/5 rounded-bl-[5rem] group-hover:bg-[#324A61]/10 transition-colors" />
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6">
                <Anchor size={20} className="text-slate-400" />
              </div>
              <h3 className="text-[#020617] mb-3 text-base md:text-base lg:text-lg font-black uppercase tracking-wide text-slate-950">
                Core Values
              </h3>
              <p className="text-slate-600 leading-relaxed font-normal text-base md:text-base">
                Uncompromising engineering precision, absolute BOQ transparency,
                and aesthetic excellence. We build every project as if our
                entire corporate reputation hinges entirely upon it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: PRESTIGE & RECOGNITION PANEL (ET Achievers) */}
      <section className="bg-slate-50/50 border-y border-slate-100 py-16 px-4 my-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT COLUMN: National Validation Text */}
          <div className="lg:col-span-5">
            <span className="text-sm md:text-base font-black uppercase tracking-[0.25em] text-[#324A61] block mb-3">
              NATIONAL VALIDATION & EXCELLENCE
            </span>
            <h2 className="mb-4 text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-950">
              RECOGNIZED AT THE HIGHEST LEVEL
            </h2>
            <p className="text-slate-600 leading-relaxed font-normal text-base md:text-base">
              In recognition of our pioneering contribution to innovative
              commercial interior design and seamless turnkey engineering
              setups, VoometDesign was honored with the prestigious{" "}
              <strong className="text-slate-900">
                Certificate of Excellence at the ET Achievers 2025 awards
                ceremony presented by The Economic Times
              </strong>
              . This milestone cements our status as a trusted industry
              benchmark for executing complex corporate spaces, retail layouts,
              and luxury infrastructures with zero compromise on quality and
              timeline fidelity.
            </p>
          </div>

          {/* RIGHT COLUMN: Premium Document Frame */}
          <div className="lg:col-span-7">
            <div className="w-full h-[280px] md:h-[380px] bg-white border border-slate-200/80 rounded-2xl shadow-xl shadow-slate-200/40 p-4 md:p-6 relative flex flex-col justify-between overflow-hidden group hover:border-slate-300/30 transition-all duration-300">
              <div className="flex-grow border-2 border-slate-100 rounded-xl flex flex-col items-center justify-center p-6 text-center bg-slate-50/50 group-hover:bg-white transition-colors relative z-10">
                <Award size={48} className="text-slate-500 mx-auto mb-4" />
                <h3 className="mb-2 text-base md:text-base lg:text-lg font-black uppercase tracking-wide text-slate-950">
                  ET ACHIEVERS 2025
                </h3>
                <p className="max-w-[280px] text-slate-600 leading-relaxed font-normal text-base md:text-base">
                  EXCELLENCE IN INTERIOR DESIGN & turnkey EXECUTION
                </p>
              </div>
              <div className="mt-4 text-center relative z-10">
                <span className="text-sm group-hover: transition-colors inline-flex items-center gap-1 cursor-pointer md:text-base font-black uppercase tracking-[0.25em] text-[#324A61] block mb-3">
                  VIEW REGISTRATION VALIDATION <ArrowRight size={12} />
                </span>
              </div>
              {/* Subtle background glow effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#020617]/5 blur-3xl rounded-full -z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INFRASTRUCTURE & GERMAN TECHNOLOGY */}
      <section className="max-w-[1440px] mx-auto px-4 py-24 border-b border-slate-100">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <span className="text-sm md:text-base font-black uppercase tracking-[0.25em] text-[#324A61] block mb-3">
              MANUFACTURING PROWESS & GERMAN TECH
            </span>
            <h2 className="text-[#020617] mb-6 text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tight text-slate-950">
              Powered by Advanced German Machinery
            </h2>
            <p className="mb-6 text-slate-600 leading-relaxed font-normal text-base md:text-base">
              Unlike typical design studios that act merely as middlemen
              outsourcing construction execution, VoometDesign operates its own
              massive, state-of-the-art fabrication and woodworking facilities. 
              Our entire production line is powered by imported <strong>Heavy-Duty German CNC Machinery</strong> and robotic thermal crimping systems.
            </p>
            <p className="mb-8 text-slate-600 leading-relaxed font-normal text-base md:text-base">
              This world-class German infrastructure allows us to manufacture complex architectural elements—from ultra-slim aluminium profiles to bespoke wooden acoustic panels—with <strong>zero-tolerance millimeter precision</strong> that local manual carpentry simply cannot match.
            </p>
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-8">
              <h4 className="text-slate-900 font-black uppercase text-lg mb-2 flex items-center gap-2">
                <Settings size={20} className="text-[#324A61]" /> What Sets Us Apart
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                <strong>True End-to-End Ownership:</strong> We are not aggregators. From the first 3D AutoCAD render to the final screw drilled on-site, the entire workflow happens strictly within the VoometDesign ecosystem. No third-party contractors means no delays, no budget inflations, and absolute quality control.
              </p>
              <div className="flex flex-wrap gap-2">
                 <span className="bg-[#324A61] text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">Zero Outsourcing</span>
                 <span className="bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">Automated German Milling</span>
                 <span className="bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">In-House Engineers</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-slate-100 pt-8">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 mt-1">
                  <Activity size={14} className="text-[#020617]" />
                </div>
                <div>
                  <h4 className="text-[#020617] mb-1 text-base font-black uppercase tracking-wide text-slate-950">
                    High-Volume Capacity
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Simultaneous multi-project batch manufacturing without bottlenecks.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle2 size={14} className="text-[#020617]" />
                </div>
                <div>
                  <h4 className="text-[#020617] mb-1 text-base font-black uppercase tracking-wide text-slate-950">
                    Flawless Finishing
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Robotic edge-banding and precision cuts deliver factory-perfect aesthetics.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full h-[650px] relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 group">
            <img
              src="https://images.unsplash.com/photo-1565514652285-1d0bc885cd0b?q=80&w=1200"
              alt="Advanced German Machinery at VoometDesign Factory"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-[#020617]/30 group-hover:bg-[#324A61]/10 transition-colors"></div>
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-slate-100">
               <h4 className="text-slate-900 font-black uppercase text-lg mb-2">German CNC Routing Systems</h4>
               <p className="text-slate-600 text-sm font-medium leading-relaxed">Our factory floor features industry-leading European automated cutting centers, ensuring that every curve and joint is mapped and cut via software rather than manual labor.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EXECUTION PROCESS FLOW */}
      <section className="bg-[#020617] py-24 text-white">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-sm md:text-base font-black uppercase tracking-[0.25em] text-[#324A61] block mb-3">
              THE WORKFLOW
            </span>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
              Our 4-Step Turnkey Process
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative group h-full">
              <div className="relative z-10 bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-2xl hover:border-slate-600 transition-colors h-full overflow-hidden flex flex-col">
                <div className="text-[100px] md:text-[120px] font-black text-slate-800/40 absolute -bottom-6 -right-4 md:-bottom-8 md:-right-6 z-0 pointer-events-none group-hover:text-slate-700/60 transition-colors leading-none">
                  01
                </div>
                <div className="relative z-10 flex-grow">
                  <PenTool size={28} className="text-slate-400 mb-5" />
                  <h4 className="mb-3 text-lg md:text-xl font-black uppercase tracking-wide text-white">
                    Design & Blueprinting
                  </h4>
                  <p className="text-slate-400 leading-relaxed font-normal text-sm md:text-base">
                    Deep architectural consultation, space planning, AutoCAD
                    layouts, and photorealistic 3D visualization generation.
                  </p>
                </div>
              </div>
            </div>
            {/* Step 2 */}
            <div className="relative group h-full">
              <div className="relative z-10 bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-2xl hover:border-slate-600 transition-colors h-full overflow-hidden flex flex-col">
                <div className="text-[100px] md:text-[120px] font-black text-slate-800/40 absolute -bottom-6 -right-4 md:-bottom-8 md:-right-6 z-0 pointer-events-none group-hover:text-slate-700/60 transition-colors leading-none">
                  02
                </div>
                <div className="relative z-10 flex-grow">
                  <Settings size={28} className="text-slate-400 mb-5" />
                  <h4 className="mb-3 text-lg md:text-xl font-black uppercase tracking-wide text-white">
                    Factory Fabrication
                  </h4>
                  <p className="text-slate-400 leading-relaxed font-normal text-sm md:text-base">
                    Parallel batch processing of wood panels, aluminium
                    profiles, and custom furniture directly at our local factory
                    base.
                  </p>
                </div>
              </div>
            </div>
            {/* Step 3 */}
            <div className="relative group h-full">
              <div className="relative z-10 bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-2xl hover:border-slate-600 transition-colors h-full overflow-hidden flex flex-col">
                <div className="text-[100px] md:text-[120px] font-black text-slate-800/40 absolute -bottom-6 -right-4 md:-bottom-8 md:-right-6 z-0 pointer-events-none group-hover:text-slate-700/60 transition-colors leading-none">
                  03
                </div>
                <div className="relative z-10 flex-grow">
                  <HardHat size={28} className="text-slate-400 mb-5" />
                  <h4 className="mb-3 text-lg md:text-xl font-black uppercase tracking-wide text-white">
                    Site Execution
                  </h4>
                  <p className="text-slate-400 leading-relaxed font-normal text-sm md:text-base">
                    Rapid on-site assembly by certified engineers, minimizing
                    site downtime and keeping structural disruptions to zero.
                  </p>
                </div>
              </div>
            </div>
            {/* Step 4 */}
            <div className="relative group h-full">
              <div className="relative z-10 bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-2xl hover:border-slate-600 transition-colors h-full overflow-hidden flex flex-col">
                <div className="text-[100px] md:text-[120px] font-black text-slate-800/40 absolute -bottom-6 -right-4 md:-bottom-8 md:-right-6 z-0 pointer-events-none group-hover:text-slate-700/60 transition-colors leading-none">
                  04
                </div>
                <div className="relative z-10 flex-grow">
                  <CheckCircle2 size={28} className="text-slate-400 mb-5" />
                  <h4 className="mb-3 text-lg md:text-xl font-black uppercase tracking-wide text-white">
                    Turnkey Handover
                  </h4>
                  <p className="text-slate-400 leading-relaxed font-normal text-sm md:text-base">
                    Rigorous quality audits, deep structural cleaning, and final
                    project handover complete with warranty validations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. JOURNEY MILESTONES (Alternating Timeline) */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="text-sm md:text-base font-black uppercase tracking-[0.25em] text-[#324A61] block mb-3">
              EVOLUTION TRACK
            </span>
            <h2 className="text-[#020617] text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-950">
              Our Journey Milestones
            </h2>
          </div>
          <div className="max-w-5xl mx-auto relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 transform -translate-x-1/2"></div>
            <div className="flex flex-col gap-12">
              {/* Event 1 */}
              <div className="flex flex-col md:flex-row items-center justify-between w-full relative">
                <div className="hidden md:block absolute left-1/2 top-1/2 w-4 h-4 rounded-full bg-[#020617] border-4 border-white shadow transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
                <div className="md:w-5/12 flex justify-end md:text-right pr-0 md:pr-8 mb-4 md:mb-0">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow w-full md:w-auto">
                    <span className="text-sm md:text-base font-black uppercase tracking-[0.25em] text-[#324A61] block mb-3">
                      2010
                    </span>
                    <h4 className="mb-2 text-base md:text-base lg:text-lg font-black uppercase tracking-wide text-slate-950">
                      The Foundation
                    </h4>
                    <p className="text-slate-600 leading-relaxed font-normal text-base md:text-base">
                      Started as a specialized fabrication unit, mastering the
                      technicalities of structural precision and architectural
                      hardware.
                    </p>
                  </div>
                </div>
                <div className="md:w-5/12"></div>
              </div>

              {/* Event 2 */}
              <div className="flex flex-col md:flex-row items-center justify-between w-full relative">
                <div className="hidden md:block absolute left-1/2 top-1/2 w-4 h-4 rounded-full bg-[#020617] border-4 border-white shadow transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
                <div className="md:w-5/12"></div>
                <div className="md:w-5/12 flex justify-start md:text-left pl-0 md:pl-8 mt-4 md:mt-0">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow w-full md:w-auto">
                    <span className="text-sm md:text-base font-black uppercase tracking-[0.25em] text-[#324A61] block mb-3">
                      2018
                    </span>
                    <h4 className="mb-2 text-base md:text-base lg:text-lg font-black uppercase tracking-wide text-slate-950">
                      The Expansion
                    </h4>
                    <p className="text-slate-600 leading-relaxed font-normal text-base md:text-base">
                      Scaled operations to handle full turnkey luxury
                      residential architecture, integrating advanced in-house
                      machinery pipelines.
                    </p>
                  </div>
                </div>
              </div>

              {/* Event 3 */}
              <div className="flex flex-col md:flex-row items-center justify-between w-full relative">
                <div className="hidden md:block absolute left-1/2 top-1/2 w-4 h-4 rounded-full bg-[#020617] border-4 border-white shadow transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
                <div className="md:w-5/12 flex justify-end md:text-right pr-0 md:pr-8 mb-4 md:mb-0">
                  <div className="bg-[#020617] text-white p-6 rounded-2xl shadow-xl w-full md:w-auto">
                    <span className="text-sm md:text-base font-black uppercase tracking-[0.25em] text-[#324A61] block mb-3">
                      2026
                    </span>
                    <h4 className="mb-2 text-base md:text-base lg:text-lg font-black uppercase tracking-wide text-white">
                      The Core Focus
                    </h4>
                    <p className="text-slate-300 leading-relaxed font-normal text-base md:text-base">
                      Re-engineered the framework to specialize strictly in
                      Hospitality, Educational Institutions, and Luxury Villas.
                    </p>
                  </div>
                </div>
                <div className="md:w-5/12"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5.5 SUSTAINABILITY & SOURCING */}
      <section className="bg-slate-50 py-24 border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
              <div className="rounded-3xl overflow-hidden h-[250px] shadow-lg">
                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Sustainable Materials" />
              </div>
              <div className="rounded-3xl overflow-hidden h-[250px] mt-8 shadow-lg">
                <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Modern Architecture" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-sm md:text-base font-black uppercase tracking-[0.25em] text-[#324A61] block mb-3">
                MATERIAL INTEGRITY
              </span>
              <h2 className="text-[#020617] mb-6 text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-950">
                Global Sourcing & ESG Compliance
              </h2>
              <p className="mb-6 text-slate-600 leading-relaxed font-normal text-base md:text-base">
                We believe that premium design is inherently sustainable. Voomet Design actively partners with global suppliers who adhere to strict ESG (Environmental, Social, and Governance) standards.
              </p>
              <ul className="space-y-4 mt-8">
                {[
                  "FSC-Certified Timbers & Eco-Friendly Veneers",
                  "Low-VOC & Lead-Free Industrial Coatings",
                  "100% Recyclable Heavy-Duty Aluminium Systems",
                  "Zero-Waste Factory Milling Protocols"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-700 font-bold uppercase tracking-wide text-sm">
                    <CheckCircle2 size={20} className="text-[#324A61]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LEADERSHIP TEAM */}
      <section className="max-w-[1440px] mx-auto px-4 py-24 border-b border-slate-100">
        <div className="text-center mb-16">
          <span className="text-sm md:text-base font-black uppercase tracking-[0.25em] text-[#324A61] block mb-3">
            THE MINDS BEHIND THE METRICS
          </span>
          <h2 className="text-[#020617] text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-950">
            Our Leadership
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Vikram Desai",
              role: "Founder & Managing Director",
              desc: "With 25 years of structural engineering experience, Vikram pioneered the integration of factory-direct manufacturing into turnkey interior design in India.",
              img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800"
            },
            {
              name: "Ananya Sharma",
              role: "Principal Architect",
              desc: "An award-winning designer known for her minimalist approach and mastery over space planning, focusing primarily on luxury hospitality and institutional spaces.",
              img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800"
            },
            {
              name: "Rahul Mehta",
              role: "Head of Manufacturing",
              desc: "Rahul oversees our entire factory operations, ensuring that every millimeter of wood and aluminium is milled to absolute perfection before it reaches the site.",
              img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800"
            }
          ].map((leader, i) => (
            <div key={i} className="group relative overflow-hidden rounded-[2rem] bg-slate-50 border border-slate-100">
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={leader.img} 
                  alt={leader.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0"
                />
              </div>
              <div className="p-8 bg-white relative z-10 -mt-10 mx-4 rounded-2xl shadow-xl transition-transform group-hover:-translate-y-2 duration-500 text-center md:text-left">
                <h3 className="text-xl font-black uppercase text-slate-950 mb-1">{leader.name}</h3>
                <p className="text-[#324A61] text-xs font-bold uppercase tracking-widest mb-4">{leader.role}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{leader.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. GLOBAL TRUST MATRIX */}
      <section className="bg-[#020617] text-white py-8 md:py-12 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none"></div>
        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex whitespace-nowrap items-center shrink-0"
          >
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center">
                {[
                  { value: 20, suffix: "+", label: "Years Excellence" },
                  { value: 500, suffix: "+", label: "Spaces Delivered" },
                  { value: 100, suffix: "%", label: "In-House Production" },
                  { value: 0, suffix: "", label: "Outsourced Steps" },
                ].map((stat, idx) => (
                  <div key={`${i}-${idx}`} className="flex items-center">
                    <div className="flex flex-col items-center justify-center px-6 md:px-16">
                      <span className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-400 mb-2">
                        {i === 0 ? (
                          <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                        ) : (
                          <span>
                            {stat.value}
                            {stat.suffix}
                          </span>
                        )}
                      </span>
                      <span className="text-xs md:text-sm font-black uppercase tracking-[0.25em] text-[#324A61] block mb-0">
                        {stat.label}
                      </span>
                    </div>
                    {/* Decorative Separator */}
                    <span className="text-slate-800 text-2xl md:text-3xl opacity-50 px-2 md:px-8">
                      ✦
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 8. CONVERSION CTA */}
      <section className="w-full max-w-[1440px] mx-auto px-4 py-20 flex justify-center">
        <Link
          href="/contact"
          className="group relative overflow-hidden flex flex-col md:flex-row items-center justify-center gap-4 px-8 py-16 md:py-20 w-full max-w-5xl rounded-[2.5rem] text-center shadow-2xl transition-all duration-500"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600"
              alt="Start Project"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-[#020617]/80 group-hover:bg-[#020617]/70 transition-colors duration-500" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col md:flex-row items-center w-full justify-between gap-8 px-2 md:px-8">
            <div className="flex flex-col md:items-start text-center md:text-left text-white">
              <span className="text-xs md:text-sm font-black tracking-[0.25em] uppercase text-slate-300 block mb-3">
                PARTNER WITH THE BEST
              </span>
              <span className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight uppercase leading-tight">
                START YOUR ARCHITECTURAL PROJECT
              </span>
            </div>
            <div className="bg-white text-[#020617] group-hover:bg-[#324A61] group-hover:text-white p-5 rounded-full transition-all duration-500 transform group-hover:scale-110 shadow-xl shrink-0">
              <ArrowRight size={28} strokeWidth={3} />
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}
