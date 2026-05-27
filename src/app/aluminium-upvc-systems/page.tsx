// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Maximize,
  Lock,
  Activity,
  CloudRain,
  User,
  Phone,
  LayoutTemplate,
  FileText,
  Send,
} from "lucide-react";
export default function AluminiumUpvcSystemsPage() {
  return (
    <main className="bg-white min-h-screen pt-32 pb-24">
      {" "}
      {/* PAGE HEADER */}{" "}
      <div className="max-w-[1440px] mx-auto px-4 mb-8 text-center">
        <h1 className="text-xs mb-4 block text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-950">
          {" "}
          ENGINEERED ARCHITECTURE{" "}
        </h1>
        <h2 className="mb-4 text-[#020617] text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-950">
          {" "}
          Structural Glazing & UPVC Systems{" "}
        </h2>
        <p className="max-w-2xl mx-auto text-slate-600 leading-relaxed font-normal text-base md:text-base">
          {" "}
          High-performance architectural envelopes designed for absolute
          structural integrity, supreme acoustic isolation, and elite commercial
          durability.{" "}
        </p>
      </div>{" "}
      {/* PART 1: SYSTEM 1 — PREMIUM ALUMINIUM FAÇADE & SLIMLINE SYSTEMS */}{" "}
      <section className="max-w-[1440px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center py-16 border-b border-slate-100">
          {" "}
          {/* Left Column Visuals */}{" "}
          <div className="lg:col-span-6">
            <div className="w-full h-[400px] md:h-[550px] rounded-2xl shadow-xl border border-slate-100 bg-slate-900 overflow-hidden relative group">
              <img
                src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1200"
                alt="Premium Aluminium Facade Architecture"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="bg-[#020617] text-white px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-1 mb-2">
                  <Sparkles size={10} /> 6063-T6 GRADE{" "}
                </span>
                <p className="max-w-sm text-slate-600 leading-relaxed font-normal text-base md:text-base">
                  {" "}
                  Precision-extruded structural aluminium profiles for
                  high-altitude commercial envelopes.{" "}
                </p>
              </div>
            </div>
          </div>{" "}
          {/* Right Column Breakdown */}{" "}
          <div className="lg:col-span-6">
            <span className="text-xs md:text-sm font-black uppercase tracking-[0.25em] text-[#324A61] block mb-3">
              {" "}
              ARCHITECTURAL GRADE INTEGRITY{" "}
            </span>
            <h3 className="mb-5 text-base md:text-base lg:text-lg font-black uppercase tracking-wide text-slate-950">
              {" "}
              ALUMINIUM FAÇADE ENGINEERING & SLIMLINE SYSTEMS{" "}
            </h3>
            <p className="mb-10 text-slate-600 leading-relaxed font-normal text-base md:text-base">
              {" "}
              Engineered with 6063-T6 virgin structural alloy profiles to
              withstand high-altitude cross-wind load factors. Built
              specifically to eliminate structural boundaries while supporting
              heavy multi-ply double glazing frameworks.{" "}
            </p>{" "}
            {/* Product Application Sub-Cards */}{" "}
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4 p-5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all">
                <div className="bg-[#020617] text-white p-3 rounded-lg shrink-0 mt-0.5">
                  <Maximize size={18} />
                </div>
                <div>
                  <h4 className="mb-2 text-base md:text-base lg:text-lg font-black uppercase tracking-wide text-slate-950">
                    {" "}
                    SLIMLINE SLIDING SYSTEMS{" "}
                  </h4>
                  <p className="text-slate-600 leading-relaxed font-normal text-base md:text-base">
                    {" "}
                    Ultra-thin 20mm center interlocking profile sightlines with
                    flush sub-floor tracked alignments to erase
                    interior-exterior boundaries.{" "}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all">
                <div className="bg-[#020617] text-white p-3 rounded-lg shrink-0 mt-0.5">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="mb-2 text-base md:text-base lg:text-lg font-black uppercase tracking-wide text-slate-950">
                    {" "}
                    STRUCTURAL CURTAIN WALLS{" "}
                  </h4>
                  <p className="text-slate-600 leading-relaxed font-normal text-base md:text-base">
                    {" "}
                    Unitized stick frames and point-fixed spider glazing
                    configurations engineered flawlessly for multi-story
                    commercial building envelopes.{" "}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all">
                <div className="bg-[#020617] text-white p-3 rounded-lg shrink-0 mt-0.5">
                  <Zap size={18} />
                </div>
                <div>
                  <h4 className="mb-2 text-base md:text-base lg:text-lg font-black uppercase tracking-wide text-slate-950">
                    {" "}
                    THERMAL-BREAK WINDOWS{" "}
                  </h4>
                  <p className="text-slate-600 leading-relaxed font-normal text-base md:text-base">
                    {" "}
                    Integrated structural polyamide crimp isolators loaded
                    between frames to cut building HVAC conduction loss down by
                    up to 30%.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>{" "}
      {/* PART 2: SYSTEM 2 — RESIDENTIAL PREMIUM UPVC INSULATION SYSTEMS */}{" "}
      <section className="max-w-[1440px] mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center py-16 border-b border-slate-100">
          {" "}
          {/* Left Column Breakdown (Reversed for desktop visual alternating layout) */}{" "}
          <div className="lg:col-span-6 lg:order-2">
            <div className="w-full h-[400px] md:h-[550px] rounded-2xl shadow-xl border border-slate-100 bg-slate-900 overflow-hidden relative group">
              <img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200"
                alt="High-Density UPVC Weatherproofing"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="bg-[#020617] text-white px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-1 mb-2">
                  <ShieldCheck size={10} /> ZERO DEGRADATION{" "}
                </span>
                <p className="max-w-sm text-slate-600 leading-relaxed font-normal text-base md:text-base">
                  {" "}
                  Internal galvanized steel reinforcements combating heavy
                  acoustic and monsoon pressure.{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 lg:order-1">
            <span className="text-xs md:text-sm font-black uppercase tracking-[0.25em] text-[#324A61] block mb-3">
              {" "}
              HIGH-DENSITY WEATHERPROOFING{" "}
            </span>
            <h3 className="mb-5 text-base md:text-base lg:text-lg font-black uppercase tracking-wide text-slate-950">
              {" "}
              RESIDENTIAL PREMIUM UPVC WINDOWS & DOORS{" "}
            </h3>
            <p className="mb-10 text-slate-600 leading-relaxed font-normal text-base md:text-base">
              {" "}
              Uncompromising multi-chambered high-durability vinyl profiles
              reinforced with internal galvanized steel boxes. Formulated
              specifically to combat extreme tropical heat degradation,
              whistling monsoon winds, and heavy urban noise tracking.{" "}
            </p>{" "}
            {/* Product Application Sub-Cards */}{" "}
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4 p-5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all">
                <div className="bg-[#020617] text-white p-3 rounded-lg shrink-0 mt-0.5">
                  <Lock size={18} />
                </div>
                <div>
                  <h4 className="mb-2 text-base md:text-base lg:text-lg font-black uppercase tracking-wide text-slate-950">
                    {" "}
                    MULTI-POINT PERIMETER LOCKING{" "}
                  </h4>
                  <p className="text-slate-600 leading-relaxed font-normal text-base md:text-base">
                    {" "}
                    High-security continuous espagnolette locking hardware lines
                    running across corners to eliminate jimmying risk and
                    structural leverage gaps.{" "}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all">
                <div className="bg-[#020617] text-white p-3 rounded-lg shrink-0 mt-0.5">
                  <CloudRain size={18} />
                </div>
                <div>
                  <h4 className="mb-2 text-base md:text-base lg:text-lg font-black uppercase tracking-wide text-slate-950">
                    {" "}
                    EPDM DUAL-WEATHERSEALS{" "}
                  </h4>
                  <p className="text-slate-600 leading-relaxed font-normal text-base md:text-base">
                    {" "}
                    Co-extruded dense synthetic rubber gaskets that guarantee
                    100% resistance to air infiltration, tropical moisture
                    leaks, and dust ingress.{" "}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md transition-all">
                <div className="bg-[#020617] text-white p-3 rounded-lg shrink-0 mt-0.5">
                  <Activity size={18} />
                </div>
                <div>
                  <h4 className="mb-2 text-base md:text-base lg:text-lg font-black uppercase tracking-wide text-slate-950">
                    {" "}
                    ACOUSTIC DOUBLE-GLAZING (DGU){" "}
                  </h4>
                  <p className="text-slate-600 leading-relaxed font-normal text-base md:text-base">
                    {" "}
                    Multi-layered glass configurations filled with pressurized
                    argon gas blocks, isolating external noise pollution levels
                    safely below a quiet 35dB threshold.{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>{" "}
      {/* PART 3: THE BOTTOM TECHNICAL CONVERSION BLOCK */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-stretch">
            {/* Left Side: Visual */}
            <div className="lg:w-5/12 relative min-h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000" 
                alt="Technical BOQ Planning" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-[#020617]/20 to-transparent" />
              <div className="absolute bottom-12 left-10 right-10">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
                  <p className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-2">Estimation Protocol</p>
                  <h3 className="text-white text-2xl font-display font-bold leading-snug">Precision Technical BOQ</h3>
                </div>
              </div>
            </div>

            {/* Right Side: Inquiry Form */}
            <div className="lg:w-7/12 flex flex-col justify-center">
              <div className="max-w-2xl bg-white p-10 rounded-[2rem] shadow-xl border border-slate-100">
                <h3 className="text-3xl md:text-4xl font-display font-bold text-[#020617] mb-4">Request Technical System BOQ</h3>
                <p className="text-slate-500 mb-10 text-lg">Submit your project elevation metrics or floorplan measurements below. Our engineering team will evaluate the wind-load variables and generate a comprehensive Material & Execution BOQ within 48 hours.</p>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">Full Name *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#020617] transition-colors">
                          <User size={18} />
                        </div>
                        <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-[#020617] focus:ring-1 focus:ring-[#020617] transition-all text-slate-900 placeholder:text-slate-400 font-medium" placeholder="John Doe" />
                      </div>
                    </div>
                    <div className="relative group">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">Phone Number *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#020617] transition-colors">
                          <Phone size={18} />
                        </div>
                        <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-[#020617] focus:ring-1 focus:ring-[#020617] transition-all text-slate-900 placeholder:text-slate-400 font-medium" placeholder="+91 98765 43210" />
                      </div>
                    </div>
                  </div>
                  <div className="relative group">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">System Type</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#020617] transition-colors">
                        <LayoutTemplate size={18} />
                      </div>
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-[#020617] focus:ring-1 focus:ring-[#020617] transition-all text-slate-900 font-medium appearance-none">
                        <option>Aluminium Façade / Slimline Sliding</option>
                        <option>UPVC Residential Soundproofing</option>
                      </select>
                    </div>
                  </div>
                  <div className="relative group">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">Project Dimensions / Brief</label>
                    <div className="relative">
                      <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none text-slate-400 group-focus-within:text-[#020617] transition-colors">
                        <FileText size={18} />
                      </div>
                      <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-[#020617] focus:ring-1 focus:ring-[#020617] transition-all text-slate-900 placeholder:text-slate-400 font-medium resize-none" placeholder="Provide rough square footage or attach details..." />
                    </div>
                  </div>

                  <button className="w-full bg-[#020617] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#324A61] transition-all shadow-xl flex items-center justify-center gap-3 mt-4 active:scale-[0.98]">
                    Request Estimation <Send size={20} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
