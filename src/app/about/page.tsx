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
import SlideUpFade from "@/components/animations/SlideUpFade";
import ImageReveal from "@/components/animations/ImageReveal";
import HoverButton from "@/components/animations/HoverButton";
import StaggerGrid from "@/components/animations/StaggerGrid";
import SectionWave from "@/components/ui/SectionWave";


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
 <ImageReveal className="order-2 lg:order-1 relative rounded-3xl overflow-hidden shadow-2xl h-[400px] lg:h-[600px] border border-slate-100 bg-slate-900 group">
 <img loading="lazy" decoding="async"
 src="https://images.unsplash.com/photo-1541888086925-ebca717e8894?q=80&w=1200"
 alt="VoometDesign Engineering Legacy"
 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 to-transparent"></div>
 <div className="absolute bottom-8 left-8 right-8">
 <span className="text-badge bg-[#0f172a] text-white text-[9px] px-3 py-1 rounded inline-block mb-3">
 ESTABLISHED 2010
 </span>
 <p className="max-w-sm text-neutral-600 leading-relaxed font-normal text-base md:text-base">
 A decade of uncompromising structural integrity and premium
 aesthetic execution across Pan-India.
 </p>
 </div>
 </ImageReveal>
 <SlideUpFade className="order-1 lg:order-2 flex flex-col justify-center" delay={0.2}>
 <span className="text-badge md: ] text-[#324A61] block mb-3">
 OUR CORPORATE HERITAGE
 </span>
 <h1 className="text-hero text-[#0f172a] mb-8 text-3xl md:text-5xl lg:text-6xl text-neutral-900 flex flex-wrap items-center">
 Two Decades of Precision <span className="italic font-light inline-flex items-center">Engineering.<SectionWave /></span>
 </h1>
 <p className="max-w-xl mb-6 text-neutral-600 leading-relaxed font-normal text-base md:text-base">
 Voomet Design is a premier turnkey interior powerhouse, seamlessly
 blending heavy-duty manufacturing mastery with high-end
 architecture. We exist to eliminate the friction between
 conceptual design blueprints and physical reality.
 </p>
 <p className="max-w-xl mb-10 text-neutral-600 leading-relaxed font-normal text-base md:text-base">
 Unlike traditional design studios, we don't just sketch
 concepts—we manufacture the raw materials, crimp the thermal
 profiles, mill the wood, and execute the complete site handover
 with absolute, uncompromising control.
 </p>
 <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 border-t border-slate-100 pt-8">
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 rounded-xl bg-[#0f172a] flex items-center justify-center shrink-0 shadow-md">
 <Award size={20} className="text-slate-400" />
 </div>
 <div>
 <h4 className="text-card text-[#0f172a] text-sm md:text-base lg:text-lg leading-[0.95] mb-0.5">
 ISO Certified
 </h4>
 <p className="text-[#324A61] text-xs md:text-sm font-normal block">
 Quality Assurance
 </p>
 </div>
 </div>
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 rounded-xl bg-[#0f172a] flex items-center justify-center shrink-0 shadow-md">
 <ShieldCheck size={20} className="text-slate-400" />
 </div>
 <div>
 <h4 className="text-card text-[#0f172a] text-sm md:text-base lg:text-lg leading-[0.95] mb-0.5">
 Zero Outsourcing
 </h4>
 <p className="text-[#324A61] text-xs md:text-sm font-normal block">
 100% In-House
 </p>
 </div>
 </div>
 </div>
 </SlideUpFade>
 </div>
 </section>

 {/* 2. CORPORATE PILLARS (Vision, Mission, Values) */}
 <section className="bg-slate-50 border-b border-slate-100 py-20">
 <div className="max-w-[1440px] mx-auto px-4">
 <div className="text-center mb-16">
 <span className="text-badge md: ] text-[#324A61] block mb-3">
 THE FOUNDATION
 </span>
        <h2 className="text-section text-[#0f172a] text-2xl md:text-3xl text-neutral-900 font-semibold tracking-[-0.03em] leading-tight">
          Our <span className="italic font-light">Story</span>
        </h2>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
 <div className="absolute top-0 right-0 w-24 h-24 bg-[#0f172a]/5 rounded-bl-[5rem] group-hover:bg-[#324A61]/10 transition-colors" />
 <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6">
 <Target size={20} className="text-slate-400" />
 </div>
 <h3 className="text-card text-[#0f172a] mb-3 text-base md:text-base lg:text-lg text-neutral-900">
 Our Vision
 </h3>
 <p className="text-neutral-600 leading-relaxed font-normal text-base md:text-base">
 To be the absolute standard of turnkey interior execution in
 Pan-India, setting benchmarks for engineering speed, material
 integrity, and luxury design across institutional and private
 sectors.
 </p>
 </div>
 <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
 <div className="absolute top-0 right-0 w-24 h-24 bg-[#0f172a]/5 rounded-bl-[5rem] group-hover:bg-[#324A61]/10 transition-colors" />
 <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6">
 <Layers size={20} className="text-slate-400" />
 </div>
 <h3 className="text-card text-[#0f172a] mb-3 text-base md:text-base lg:text-lg text-neutral-900">
 Our Mission
 </h3>
 <p className="text-neutral-600 leading-relaxed font-normal text-base md:text-base">
 To eliminate vendor dependency for our clients by providing 100%
 in-house design, fabrication, and execution capabilities,
 ensuring unmatched quality control from blueprint to handover.
 </p>
 </div>
 <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
 <div className="absolute top-0 right-0 w-24 h-24 bg-[#0f172a]/5 rounded-bl-[5rem] group-hover:bg-[#324A61]/10 transition-colors" />
 <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6">
 <Anchor size={20} className="text-slate-400" />
 </div>
 <h3 className="text-card text-[#0f172a] mb-3 text-base md:text-base lg:text-lg text-neutral-900">
 Core Values
 </h3>
 <p className="text-neutral-600 leading-relaxed font-normal text-base md:text-base">
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
 <span className="text-badge md: ] text-[#324A61] block mb-3">
 NATIONAL VALIDATION & EXCELLENCE
 </span>
        <h2 className="text-section mb-4 text-2xl md:text-3xl text-neutral-900 font-semibold tracking-[-0.03em] leading-tight">
          The Voomet <span className="italic font-light">Standard</span>
        </h2>
 <p className="text-neutral-600 leading-relaxed font-normal text-base md:text-base">
 In recognition of our pioneering contribution to innovative
 commercial interior design and seamless turnkey engineering
 setups, VoometDesign was honored with the prestigious{" "}
 <strong className="text-neutral-900">
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
 <Award size={48} className="text-neutral-500 mx-auto mb-4" />
 <h3 className="text-card mb-2 text-base md:text-base lg:text-lg text-neutral-900">
 ET ACHIEVERS 2025
 </h3>
 <p className="max-w-[280px] text-neutral-600 leading-relaxed font-normal text-base md:text-base">
 EXCELLENCE IN INTERIOR DESIGN & turnkey EXECUTION
 </p>
 </div>
 <div className="mt-4 text-center relative z-10">
 <span className="text-badge group-hover: transition-colors inline-flex items-center gap-1 cursor-pointer md: ] text-[#324A61] block mb-3">
 VIEW REGISTRATION VALIDATION <ArrowRight size={12} />
 </span>
 </div>
 {/* Subtle background glow effect */}
 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#0f172a]/5 blur-3xl rounded-full -z-0"></div>
 </div>
 </div>
 </div>
 </section>

 {/* 3. INFRASTRUCTURE & GERMAN TECHNOLOGY */}
 <section className="max-w-[1440px] mx-auto px-4 py-24 border-b border-slate-100">
 <div className="flex flex-col lg:flex-row gap-16 items-center">
 <div className="lg:w-1/2">
 <span className="text-badge md: ] text-[#324A61] block mb-3">
 MANUFACTURING PROWESS & GERMAN TECH
 </span>
          <h2 className="text-section text-[#0f172a] mb-6 text-2xl md:text-3xl lg:text-4xl text-neutral-900 font-semibold tracking-[-0.03em] leading-tight flex flex-wrap items-center">
            Global Aesthetic.{" "}<span className="italic font-light inline-flex items-center">Local Execution.<SectionWave /></span>
          </h2>
 <p className="mb-6 text-neutral-600 leading-relaxed font-normal text-base md:text-base">
 Unlike typical design studios that act merely as middlemen
 outsourcing construction execution, VoometDesign operates its own
 massive, state-of-the-art fabrication and woodworking facilities. 
 Our entire production line is powered by imported <strong>Heavy-Duty German CNC Machinery</strong> and robotic thermal crimping systems.
 </p>
 <p className="mb-8 text-neutral-600 leading-relaxed font-normal text-base md:text-base">
 This world-class German infrastructure allows us to manufacture complex architectural elements—from ultra-slim aluminium profiles to bespoke wooden acoustic panels—with <strong>zero-tolerance millimeter precision</strong> that local manual carpentry simply cannot match.
 </p>
 
 <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-8">
 <h4 className="text-card text-neutral-900 text-lg mb-2 flex items-center gap-2">
 <Settings size={20} className="text-[#324A61]" /> What Sets Us Apart
 </h4>
 <p className="text-neutral-600 text-sm leading-relaxed mb-4">
 <strong>True End-to-End Ownership:</strong> We are not aggregators. From the first 3D AutoCAD render to the final screw drilled on-site, the entire workflow happens strictly within the VoometDesign ecosystem. No third-party contractors means no delays, no budget inflations, and absolute quality control.
 </p>
 <div className="flex flex-wrap gap-2">
 <span className="bg-[#324A61] text-white text-xs font-bold px-3 py-1 rounded ">Zero Outsourcing</span>
 <span className="bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1 rounded ">Automated German Milling</span>
 <span className="bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1 rounded ">In-House Engineers</span>
 </div>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-slate-100 pt-8">
 <div className="flex gap-4 items-start">
 <div className="w-8 h-8 rounded bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 mt-1">
 <Activity size={14} className="text-[#0f172a]" />
 </div>
 <div>
 <h4 className="text-card text-[#0f172a] mb-1 text-base text-neutral-900">
 High-Volume Capacity
 </h4>
 <p className="text-neutral-600 text-sm leading-relaxed">
 Simultaneous multi-project batch manufacturing without bottlenecks.
 </p>
 </div>
 </div>
 <div className="flex gap-4 items-start">
 <div className="w-8 h-8 rounded bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 mt-1">
 <CheckCircle2 size={14} className="text-[#0f172a]" />
 </div>
 <div>
 <h4 className="text-card text-[#0f172a] mb-1 text-base text-neutral-900">
 Flawless Finishing
 </h4>
 <p className="text-neutral-600 text-sm leading-relaxed">
 Robotic edge-banding and precision cuts deliver factory-perfect aesthetics.
 </p>
 </div>
 </div>
 </div>
 </div>
 <ImageReveal className="lg:w-1/2 w-full h-[650px] relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 group">
 <img loading="lazy" decoding="async"
 src="https://images.unsplash.com/photo-1565514652285-1d0bc885cd0b?q=80&w=1200"
 alt="Advanced German Machinery at VoometDesign Factory"
 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
 />
 <div className="absolute inset-0 bg-[#0f172a]/30 group-hover:bg-[#324A61]/10 transition-colors"></div>
 <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-slate-100">
 <h4 className="text-card text-neutral-900 text-lg mb-2">German CNC Routing Systems</h4>
 <p className="text-neutral-600 text-sm font-medium leading-relaxed">Our factory floor features industry-leading European automated cutting centers, ensuring that every curve and joint is mapped and cut via software rather than manual labor.</p>
 </div>
 </ImageReveal>
 </div>
 </section>

 {/* 4. EXECUTION PROCESS FLOW */}
 <section className="bg-[#0f172a] py-24 text-white">
 <div className="max-w-[1440px] mx-auto px-4">
 <div className="text-center mb-16">
 <span className="text-badge md: ] text-[#324A61] block mb-3">
 THE WORKFLOW
 </span>
          <h2 className="text-section text-2xl md:text-3xl text-white font-semibold tracking-[-0.03em] leading-tight">
            Uncompromising <span className="italic font-light">Transparency</span>
          </h2>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
 {/* Step 1 */}
 <div className="relative group h-full">
 <div className="relative z-10 bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-2xl hover:border-slate-600 transition-colors h-full overflow-hidden flex flex-col">
 <div className="text-[100px] md:text-[120px] text-slate-800/40 absolute -bottom-6 -right-4 md:-bottom-8 md:-right-6 z-0 pointer-events-none group-hover:text-slate-700/60 transition-colors leading-none">
 01
 </div>
 <div className="relative z-10 flex-grow">
 <PenTool size={28} className="text-slate-400 mb-5" />
 <h4 className="text-card mb-3 text-lg md:text-xl text-white">
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
 <div className="text-[100px] md:text-[120px] text-slate-800/40 absolute -bottom-6 -right-4 md:-bottom-8 md:-right-6 z-0 pointer-events-none group-hover:text-slate-700/60 transition-colors leading-none">
 02
 </div>
 <div className="relative z-10 flex-grow">
 <Settings size={28} className="text-slate-400 mb-5" />
 <h4 className="text-card mb-3 text-lg md:text-xl text-white">
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
 <div className="text-[100px] md:text-[120px] text-slate-800/40 absolute -bottom-6 -right-4 md:-bottom-8 md:-right-6 z-0 pointer-events-none group-hover:text-slate-700/60 transition-colors leading-none">
 03
 </div>
 <div className="relative z-10 flex-grow">
 <HardHat size={28} className="text-slate-400 mb-5" />
 <h4 className="text-card mb-3 text-lg md:text-xl text-white">
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
 <div className="text-[100px] md:text-[120px] text-slate-800/40 absolute -bottom-6 -right-4 md:-bottom-8 md:-right-6 z-0 pointer-events-none group-hover:text-slate-700/60 transition-colors leading-none">
 04
 </div>
 <div className="relative z-10 flex-grow">
 <CheckCircle2 size={28} className="text-slate-400 mb-5" />
 <h4 className="text-card mb-3 text-lg md:text-xl text-white">
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


  {/* 5. JOURNEY MILESTONES (Animated Evolution Track) */}
  <section className="py-24 bg-white border-b border-slate-100 overflow-hidden">
    <div className="max-w-[1440px] mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center mb-20">
        <span className="text-badge text-[#324A61] block mb-3">EVOLUTION TRACK</span>
        <h2 className="text-section text-[#0f172a] text-2xl md:text-3xl text-neutral-900 font-semibold tracking-[-0.03em] leading-tight flex flex-wrap items-center justify-center">
          Built on{" "}<span className="italic font-light inline-flex items-center">Precision<SectionWave /></span>
        </h2>
      </div>

      <div className="max-w-5xl mx-auto relative">

        {/* ── Animated SVG Wave Center Track (desktop only) ── */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-8 z-0 pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 40 1000">
            <motion.path
              d="M 20 0 Q 35 250, 20 500 T 20 1000"
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
              animate={{
                d: [
                  "M 20 0 Q 35 250, 20 500 T 20 1000",
                  "M 20 0 Q 5 250, 20 500 T 20 1000",
                  "M 20 0 Q 35 250, 20 500 T 20 1000",
                ],
                stroke: ["#111b35", "#3b82f6", "#6366f1", "#111b35"],
              }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            />
          </svg>
        </div>

        <div className="flex flex-col gap-16">

          {/* ══════════════════════════════════════
              Event 1 — The Foundation (2010) | LEFT card
          ══════════════════════════════════════ */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full relative">

            {/* Pulsing node */}
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <motion.div
                className="w-4 h-4 rounded-full bg-[#0f172a] border-4 border-white shadow-lg"
                animate={{ boxShadow: ["0 0 0 0px rgba(59,130,246,0.4)", "0 0 0 10px rgba(59,130,246,0)", "0 0 0 0px rgba(59,130,246,0.4)"] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              />
            </div>

            {/* Left card column */}
            <div className="md:w-5/12 flex justify-end pr-0 md:pr-8 mb-4 md:mb-0 w-full relative">

              {/* ── Bridge connector: flows RIGHT from card edge → node ── */}
              <svg
                className="absolute top-1/2 -translate-y-1/2 w-8 h-3 overflow-visible hidden md:block z-0 pointer-events-none"
                style={{ right: 0, left: "auto" }}
              >
                <motion.line
                  x1="0" y1="50%" x2="100%" y2="50%"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 1.5 }}
                />
              </svg>

              <motion.div
                className="bg-slate-50 p-6 rounded-2xl border border-slate-100 w-full md:w-auto cursor-default"
                animate={{ y: [0, -6, 0], rotate: [0, 0.5, 0] }}
                transition={{ repeat: Infinity, duration: 5.8, ease: "easeInOut" }}
                whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(15, 23, 42,0.12)" }}
              >
                {/* Year badge — pulsing scale highlight */}
                <motion.span
                  className="text-lg font-black tracking-wider font-sans block mb-1 text-neutral-900"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                  2010
                </motion.span>
                <h4 className="text-card mb-2 text-base md:text-lg text-neutral-900 font-semibold">The Foundation</h4>
                <p className="text-neutral-600 leading-relaxed text-sm md:text-base text-justify">
                  Started as a specialized fabrication unit, mastering the technicalities of structural precision and architectural hardware.
                </p>
              </motion.div>
            </div>

            <div className="md:w-5/12" />
          </div>

          {/* ══════════════════════════════════════
              Event 2 — The Expansion (2018) | RIGHT card
          ══════════════════════════════════════ */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full relative">

            {/* Pulsing node */}
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <motion.div
                className="w-4 h-4 rounded-full bg-[#3b82f6] border-4 border-white shadow-lg"
                animate={{ boxShadow: ["0 0 0 0px rgba(99,102,241,0.4)", "0 0 0 12px rgba(99,102,241,0)", "0 0 0 0px rgba(99,102,241,0.4)"] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut", delay: 0.5 }}
              />
            </div>

            <div className="md:w-5/12" />

            {/* Right card column */}
            <div className="md:w-5/12 flex justify-start pl-0 md:pl-8 mt-4 md:mt-0 w-full relative">

              {/* ── Bridge connector: flows LEFT from node → card edge ── */}
              <svg
                className="absolute top-1/2 -translate-y-1/2 w-8 h-3 overflow-visible hidden md:block z-0 pointer-events-none"
                style={{ left: 0, right: "auto" }}
              >
                <motion.line
                  x1="0" y1="50%" x2="100%" y2="50%"
                  stroke="#6366f1"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  animate={{ strokeDashoffset: [0, 20] }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 1.5 }}
                />
              </svg>

              <motion.div
                className="bg-slate-50 p-6 rounded-2xl border border-slate-100 w-full md:w-auto cursor-default"
                animate={{ y: [0, -4, 0], rotate: [0, -0.5, 0] }}
                transition={{ repeat: Infinity, duration: 6.4, ease: "easeInOut" }}
                whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(15, 23, 42,0.12)" }}
              >
                <motion.span
                  className="text-lg font-black tracking-wider font-sans block mb-1 text-neutral-900"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut", delay: 0.4 }}
                >
                  2018
                </motion.span>
                <h4 className="text-card mb-2 text-base md:text-lg text-neutral-900 font-semibold">The Expansion</h4>
                <p className="text-neutral-600 leading-relaxed text-sm md:text-base text-justify">
                  Scaled operations to handle full turnkey luxury residential architecture, integrating advanced in-house machinery pipelines.
                </p>
              </motion.div>
            </div>
          </div>

          {/* ══════════════════════════════════════
              Event 3 — The Core Focus (2026) | LEFT card (ACTIVE / dark)
          ══════════════════════════════════════ */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full relative">

            {/* Pulsing node — largest, brightest (active milestone) */}
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <motion.div
                className="w-5 h-5 rounded-full bg-[#6366f1] border-4 border-white shadow-xl"
                animate={{ boxShadow: ["0 0 0 0px rgba(99,102,241,0.6)", "0 0 0 14px rgba(99,102,241,0)", "0 0 0 0px rgba(99,102,241,0.6)"] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 1 }}
              />
            </div>

            {/* Left card column */}
            <div className="md:w-5/12 flex justify-end pr-0 md:pr-8 mb-4 md:mb-0 w-full relative">

              {/* ── Bridge connector: flows RIGHT from card edge → node (cyan/electric for active card) ── */}
              <svg
                className="absolute top-1/2 -translate-y-1/2 w-8 h-3 overflow-visible hidden md:block z-0 pointer-events-none"
                style={{ right: 0, left: "auto" }}
              >
                <motion.line
                  x1="0" y1="50%" x2="100%" y2="50%"
                  stroke="#22d3ee"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 1.2 }}
                />
              </svg>

              <motion.div
                className="bg-[#0f172a] text-white p-6 rounded-2xl shadow-xl w-full md:w-auto cursor-default border border-cyan-500/20"
                animate={{ y: [0, -6, 0], rotate: [0, 0.5, 0] }}
                transition={{ repeat: Infinity, duration: 5.2, ease: "easeInOut", delay: 0.3 }}
                whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(15, 23, 42,0.35)" }}
              >
                {/* Year — electric cyan glow for active dark card */}
                <motion.span
                  className="text-lg font-black tracking-wider font-sans block mb-1 text-cyan-400"
                  style={{ textShadow: "0 0 12px rgba(34,211,238,0.6)" }}
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut", delay: 0.8 }}
                >
                  2026
                </motion.span>
                <h4 className="text-card mb-2 text-base md:text-lg text-white font-semibold">The Core Focus</h4>
                <p className="text-slate-300 leading-relaxed text-sm md:text-base text-justify">
                  Re-engineered the framework to specialize strictly in Hospitality, Educational Institutions, and Luxury Villas.
                </p>
              </motion.div>
            </div>

            <div className="md:w-5/12" />
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
 <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Sustainable Materials" />
 </div>
 <div className="rounded-3xl overflow-hidden h-[250px] mt-8 shadow-lg">
 <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Modern Architecture" />
 </div>
 </div>
 <div className="order-1 lg:order-2">
 <span className="text-badge md: ] text-[#324A61] block mb-3">
 MATERIAL INTEGRITY
 </span>
          <h2 className="text-section text-[#0f172a] mb-6 text-2xl md:text-3xl text-neutral-900 font-semibold tracking-[-0.03em] leading-tight">
            Global Sourcing & <span className="italic font-light">ESG Compliance</span>
          </h2>
 <p className="mb-6 text-neutral-600 leading-relaxed font-normal text-base md:text-base">
 We believe that premium design is inherently sustainable. Voomet Design actively partners with global suppliers who adhere to strict ESG (Environmental, Social, and Governance) standards.
 </p>
 <ul className="space-y-4 mt-8">
 {[
 "FSC-Certified Timbers & Eco-Friendly Veneers",
 "Low-VOC & Lead-Free Industrial Coatings",
 "100% Recyclable Heavy-Duty Aluminium Systems",
 "Zero-Waste Factory Milling Protocols"
 ].map((item, i) => (
 <li key={i} className="flex items-center gap-4 text-slate-700 font-bold text-sm">
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
  <section className="px-4 md:px-8 py-20 border-t border-slate-100 bg-white">
    <div className="max-w-[1400px] mx-auto">
      <SlideUpFade>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8 w-full max-w-[1400px] mx-auto mb-12 px-4 md:px-8">
          <div>
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <span className="w-8 h-px bg-neutral-300"></span>
              <span className="text-[11px] text-neutral-500 uppercase tracking-[0.35em] font-sans">Our People</span>
            </div>
            <h2 className="font-sans text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-tight text-neutral-900 flex flex-wrap items-center">
              The Team Behind{" "}<span className="italic font-light inline-flex items-center">Every Delivery<SectionWave /></span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-neutral-500 md:text-right leading-relaxed">
            Meet the architects, engineers, and execution specialists driving VoometDesign's legacy of excellence.
          </p>
        </div>
      </SlideUpFade>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        <SlideUpFade delay={0.1}>
          <figure className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm transition-all duration-300 hover:shadow-md group">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80" 
              alt="Voomet team standing together in the completed office space" 
              className="w-full h-[280px] md:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700" 
              loading="eager"
            />
          </figure>
        </SlideUpFade>

        <SlideUpFade delay={0.2}>
          <figure className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm transition-all duration-300 hover:shadow-md group">
            <img 
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80" 
              alt="Voomet team group photo inside a newly delivered workspace" 
              className="w-full h-[280px] md:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700" 
              loading="lazy"
            />
          </figure>
        </SlideUpFade>
      </div>
    </div>
  </section>

  {/* 7. TRUSTED BRANDS MATRIX */}
  <section className="px-4 md:px-8 py-20 border-t border-slate-100 bg-white">
    <div className="max-w-[1400px] mx-auto">
      <SlideUpFade>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8 w-full max-w-[1400px] mx-auto mb-12 px-4 md:px-8">
          <div>
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <span className="w-8 h-px bg-neutral-300"></span>
              <span className="text-[11px] text-neutral-500 uppercase tracking-[0.35em] font-sans">Brand Partners</span>
            </div>
            <h2 className="font-sans text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-tight text-neutral-900 flex flex-wrap items-center">
              Trusted by{" "}<span className="italic font-light inline-flex items-center">Industry Leaders<SectionWave /></span>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-neutral-500 md:text-right leading-relaxed">
            Workspace partner for leading enterprises, high-growth start-ups, and technology-driven organisations.
          </p>
        </div>
      </SlideUpFade>

      <StaggerGrid className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
        {[
          { name: "AirAsia", url: "/assets/global/brands/Airasia 1.png" },
          { name: "IndiGo Engineering", url: "/assets/global/brands/Indigo 4.png" },
          { name: "Emirates SkyCargo", url: "/assets/global/brands/Emirates 2.png" },
          { name: "Scripbox", url: "/assets/global/brands/Scripbox 6.png" },
          { name: "Edureka", url: "/assets/global/brands/Edureka 8.png" },
          { name: "Aufait", url: "/assets/global/brands/Aufait 7.png" },
          { name: "Gokaldas Exports", url: "/assets/global/brands/Gokuldas 3.png" },
          { name: "Mantra Lounge", url: "/assets/global/brands/Mantra-Lounge 5.png" },
          { name: "Physics Wallah", url: "/assets/global/brands/pw.png" },
          { name: "Zluri", url: "/assets/global/brands/zluri.png" },
          { name: "Juego", url: "/assets/global/brands/juego-logo.png" },
          { name: "QpiAI", url: "/assets/global/brands/qpi.png" },
          { name: "Neofoods", url: "/assets/global/brands/new foods-Picsart-AiImageEnhancer-Picsart-AiImageEnhancer.png" },
          { name: "Apps for Barth", url: "/assets/global/brands/apps for bharath.png" },
          { name: "Mom & Me", url: "/assets/global/brands/mm.png" }
        ].map((logo, index) => (
          <div key={index} className="bg-white/60 rounded-2xl border border-slate-200/70 h-24 md:h-28 flex items-center justify-center p-6 grayscale hover:grayscale-0 transition-all duration-500 shadow-sm">
            <img loading="lazy" decoding="async" src={logo.url} alt={logo.name} className="max-h-full max-w-full object-contain" />
          </div>
        ))}
      </StaggerGrid>
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
 <img loading="lazy" decoding="async"
 src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600"
 alt="Start Project"
 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
 />
 {/* Dark Overlay */}
 <div className="absolute inset-0 bg-[#0f172a]/80 group-hover:bg-[#0f172a]/70 transition-colors duration-500" />
 </div>

 {/* Content */}
 <div className="relative z-10 flex flex-col md:flex-row items-center w-full justify-between gap-8 px-2 md:px-8">
 <div className="flex flex-col md:items-start text-center md:text-left text-white">
 <span className="text-badge md: ] text-slate-300 block mb-3">
 PARTNER WITH THE BEST
 </span>
 <span className="text-2xl md:text-3xl lg:text-4xl leading-[0.95]">
 START YOUR ARCHITECTURAL PROJECT
 </span>
 </div>
 <div className="bg-white text-[#0f172a] group-hover:bg-[#324A61] group-hover:text-white p-5 rounded-full transition-all duration-500 transform group-hover:scale-110 shadow-xl shrink-0">
 <ArrowRight size={28} strokeWidth={3} />
 </div>
 </div>
 </Link>
 </section>
 </main>
 );
}
