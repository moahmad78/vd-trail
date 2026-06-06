// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

const ConsultationSuite = () => {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 lg:px-10 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 items-stretch bg-[#0f172a] rounded-3xl p-8 md:p-14 overflow-hidden border border-white/10 shadow-xl relative">
        {/* Animated Ambient Glows */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#1e293b]/50 rounded-full blur-[90px] mix-blend-screen animate-float-slow-1 z-0 pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px] mix-blend-screen animate-float-slow-3 z-0 pointer-events-none" />
        
        {/* Cinematic Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img loading="lazy" decoding="async" 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80" 
            alt="Voomet Design Studio Background" 
            className="w-full h-full object-cover object-center transform scale-105"
          />
        </div>
        
        {/* Cinematic Accessibility Overlay Mask */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/80 via-[#0f172a]/40 to-[#0f172a]/60 z-10 pointer-events-none" />


        {/* LEFT PANEL: DISCIPLINE & VALUES */}
        <div className="relative z-20 flex flex-col justify-center">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-4 block">
            Premium Execution
          </span>
          <h2 className="text-white font-sans text-3xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] mb-6">
            Ready to initiate our <br className="hidden lg:block" />
            <span className="italic font-light text-neutral-300">Execution Matrix?</span>
          </h2>
          
          <div className="space-y-4 mt-4 max-w-sm">
            {[
              "100% transparent Bill of Quantities with zero hidden execution fees.",
              "Dedicated senior project manager with direct factory fabrication oversight.",
              "Milestone-based progress reporting and timeline precision guarantee.",
              "Exclusive access to view our private portfolio of completed luxury works."
            ].map((value, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="w-4 h-[1px] bg-white/40 mt-3 flex-shrink-0" />
                <p className="text-neutral-400 text-sm font-normal leading-relaxed">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL: THE PREMIUM LEAD CAPTURE MATRIX */}
        <div className="relative z-20 h-full flex flex-col justify-center">
          <div className="bg-neutral-900/95 backdrop-blur-xl rounded-2xl p-6 md:p-10 border border-white/10 shadow-2xl relative z-20">
            <h3 className="text-white font-sans font-semibold text-xl md:text-2xl mb-2">
              Book a Strategy Call
            </h3>
            <p className="text-neutral-400 text-xs md:text-sm font-normal mb-8">
              Discuss your architectural requirements directly with our technical leads.
            </p>
            
            <form className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="First Name" 
                  className="w-full h-14 px-5 text-sm rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-400 focus:ring-2 focus:ring-white/20 outline-none transition-all duration-300"
                  required
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  className="w-full h-14 px-5 text-sm rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-400 focus:ring-2 focus:ring-white/20 outline-none transition-all duration-300"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Project Location / Address" 
                  className="w-full h-14 px-5 text-sm rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-400 focus:ring-1 focus:ring-white/20 outline-none transition-all"
                  required 
                />
                <select 
                  className="w-full h-14 px-5 text-sm rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-400 focus:ring-1 focus:ring-white/20 outline-none transition-all appearance-none [&>option]:bg-[#0f172a]"
                  required
                  defaultValue=""
                >
                  <option value="" disabled className="text-neutral-400">Select Budget Range</option>
                  <option value="luxury" className="text-neutral-900">Premium Residential (Villas)</option>
                  <option value="commercial" className="text-neutral-900">Commercial / Office Hubs</option>
                  <option value="hospitality" className="text-neutral-900">Hospitality / Boutique Lounges</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select 
                  className="w-full h-14 px-5 text-sm rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-white/20 outline-none transition-all duration-300 [&>option]:bg-[#0f172a]"
                  required
                  defaultValue=""
                >
                  <option value="" disabled className="text-white/40">Service Requirement</option>
                  <option value="residential">Luxury Residential</option>
                  <option value="hospitality">Hospitality & Lounges</option>
                  <option value="commercial">Commercial / Institutional</option>
                  <option value="turnkey">Full Turnkey Execution</option>
                </select>
                
                <select 
                  className="w-full h-14 px-5 text-sm rounded-xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-white/20 outline-none transition-all duration-300 [&>option]:bg-[#0f172a]"
                  required
                  defaultValue=""
                >
                  <option value="" disabled className="text-white/40">Approx. Area (Sq.Ft.)</option>
                  <option value="1000-2500">1,000 - 2,500 Sq.Ft.</option>
                  <option value="2500-5000">2,500 - 5,000 Sq.Ft.</option>
                  <option value="5000-10000">5,000 - 10,000 Sq.Ft.</option>
                  <option value="10000+">10,000+ Sq.Ft.</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="w-full h-14 mt-4 bg-white hover:bg-neutral-100 text-[#0f172a] font-sans font-semibold text-sm uppercase tracking-wider rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Request Consultation
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationSuite;
