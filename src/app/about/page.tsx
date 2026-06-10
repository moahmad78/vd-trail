// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";

import { useEffect, useRef } from "react";
import { motion, animate, useInView } from "framer-motion";
import Link from "next/link";
import {
  Award,
  Target,
  ShieldCheck,
  Home,
  Coffee,
  GraduationCap,
  Building2,
  Grid,
  CheckCircle,
  PenTool,
  Clock,
  Gem,
  MessageSquare,
  Hammer,
  PackageCheck,
  ArrowRight,
  PanelTop,
  ChevronDown
} from "lucide-react";
import SlideUpFade from "@/components/animations/SlideUpFade";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen pt-0 pb-0 overflow-hidden">
      
      {/* 1. HERO SECTION (Editorial Video Background) */}
      <section className="relative w-full h-[90vh] lg:h-[100dvh] flex items-center justify-start overflow-hidden bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/video/about/about.mp4" type="video/mp4" />
        </video>

        {/* Left-Side Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-0" />

        {/* Content */}
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 text-white flex flex-col justify-center h-full pt-16 md:pt-20">
          <SlideUpFade>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white mb-4 text-left leading-[1.1] drop-shadow-md">
              Redefining Spaces.<br/>
              <span className="italic font-light text-slate-300">Inspiring Lifestyles.</span>
            </h1>
            <p className="max-w-md text-left text-slate-200 leading-relaxed tracking-normal text-lg md:text-xl font-light drop-shadow-sm">
              Luxury interiors designed, engineered, and delivered with precision.
            </p>
          </SlideUpFade>
          
          {/* Scroll to Explore */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-12 md:bottom-16 left-6 md:left-12 flex flex-col items-start cursor-pointer group"
            onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <span className="text-[10px] tracking-[0.2em] text-slate-300 uppercase mb-2 group-hover:text-white transition-colors duration-300">Scroll to Explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ChevronDown size={20} className="text-slate-300 group-hover:text-white transition-colors duration-300" />
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* 3. ABOUT STATEMENT (Ultra Short) */}
      <section className="relative py-16 md:py-24 border-b border-slate-100 bg-white">
        <div className="w-full max-w-[900px] mx-auto px-6 text-center">
           <h2 className="text-2xl md:text-3xl lg:text-4xl text-[#0f172a] font-light leading-relaxed">
             <span className="font-semibold">VOOMETDESIGN</span> delivers end-to-end turnkey solutions across residential, hospitality, educational, and commercial spaces.
           </h2>
        </div>
      </section>

      {/* 4. WHAT WE DO */}
      <section className="relative border-b border-slate-100 bg-slate-50">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24 relative z-10 text-[#0f172a]">
          <div className="text-center md:text-left mb-12">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#0f172a]">
              What <span className="italic font-light text-slate-500">We Do.</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {[
              { icon: Home, label: "Residential", desc: "Luxury Homes" },
              { icon: Coffee, label: "Hospitality", desc: "Premium Stays" },
              { icon: GraduationCap, label: "Educational", desc: "Modern Campuses" },
              { icon: Building2, label: "Commercial", desc: "Corporate Offices" },
              { icon: Grid, label: "Aluminium", desc: "Facade Systems" },
              { icon: PanelTop, label: "UPVC", desc: "Window Systems" }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm text-center group hover:shadow-lg hover:border-indigo-100 transition-all duration-300">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-50 transition-colors duration-300">
                  <item.icon size={24} className="text-[#0f172a] group-hover:text-indigo-600 transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-[#0f172a] text-base md:text-lg">{item.label}</h3>
                <p className="text-slate-500 text-xs md:text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="relative border-b border-slate-100 bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24 relative z-10 text-[#0f172a]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-4 mb-8">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#0f172a] text-center md:text-left">
                Why <span className="italic font-light text-slate-500">Choose Us.</span>
              </h2>
            </div>
            {[
              { icon: CheckCircle, label: "Turnkey Excellence" },
              { icon: PenTool, label: "In-House Precision" },
              { icon: Clock, label: "On-Time Delivery" },
              { icon: Gem, label: "Premium Quality" }
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center md:items-start text-center md:text-left p-6 md:p-8 rounded-2xl border border-slate-100 bg-slate-50 group hover:bg-[#0f172a] transition-colors duration-300">
                <div className="mb-4">
                  <feature.icon size={32} className="text-slate-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold text-[#0f172a] group-hover:text-white transition-colors duration-300">{feature.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OUR PROCESS */}
      <section className="relative border-b border-slate-100 bg-slate-50">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24 relative z-10 text-[#0f172a]">
          <div className="text-center md:text-left mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#0f172a]">
              Our <span className="italic font-light text-slate-500">Process.</span>
            </h2>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative">
            <div className="hidden md:block absolute top-8 left-0 w-full h-[2px] bg-slate-200 z-0"></div>
            
            {[
              { icon: MessageSquare, step: "Consult", desc: "Understanding your vision and spatial requirements." },
              { icon: PenTool, step: "Design", desc: "Crafting layouts and hyper-realistic 3D walkthroughs." },
              { icon: Hammer, step: "Execute", desc: "Precision fabrication and structural construction." },
              { icon: PackageCheck, step: "Deliver", desc: "Clinical handover with uncompromising quality." }
            ].map((process, index) => (
              <div key={index} className="relative z-10 flex flex-col items-center text-center w-full md:w-1/4 mb-12 md:mb-0 group">
                <div className="w-16 h-16 rounded-full bg-white border-4 border-slate-100 flex items-center justify-center mb-6 group-hover:border-[#0f172a] transition-colors duration-300 shadow-sm">
                  <process.icon size={24} className="text-[#0f172a]" />
                </div>
                <h4 className="text-xl font-bold text-[#0f172a] mb-2">{process.step}</h4>
                <p className="text-neutral-500 text-sm max-w-[200px]">{process.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. RECOGNITION & EXCELLENCE */}
      <section className="relative border-b border-slate-100 bg-white">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24 relative z-10 text-[#0f172a]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#0f172a] mb-4">
                Recognition & <span className="italic font-light text-slate-500">Excellence.</span>
              </h2>
              <p className="text-neutral-500 text-lg md:text-xl font-light mb-10">
                Award-winning commitment to quality and execution.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-[#0f172a] transition-colors duration-300">
                    <Award size={20} className="text-[#0f172a] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-[#0f172a] font-semibold text-lg">Industry Recognition</span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-[#0f172a] transition-colors duration-300">
                    <Target size={20} className="text-[#0f172a] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-[#0f172a] font-semibold text-lg">Excellence in Execution</span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-[#0f172a] transition-colors duration-300">
                    <ShieldCheck size={20} className="text-[#0f172a] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-[#0f172a] font-semibold text-lg">Commitment to Quality</span>
                </div>
              </div>
            </div>
            {/* Slider / Grid Ready Image Container */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-50 p-4 md:p-8 flex items-center justify-center group cursor-pointer hover:shadow-indigo-500/10 transition-shadow duration-500">
               <img 
                 src="/images/award/award.JPG" 
                 alt="ET Achievers Award for Innovative Commercial Interior Design" 
                 className="w-full h-auto object-contain rounded-2xl group-hover:scale-[1.02] transition-transform duration-700"
               />
            </div>
          </div>
        </div>
      </section>

      {/* 8. TRUSTED BY INDUSTRY LEADERS */}
      <section className="relative border-b border-slate-100 bg-slate-50 overflow-hidden">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 45s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}} />
        
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-12 relative z-10 text-[#0f172a]">
          <div className="text-center md:text-left mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#0f172a] mb-3">
              Trusted by <span className="italic font-light text-slate-500">Industry Leaders.</span>
            </h2>
            <p className="text-neutral-500 text-lg md:text-xl font-light">
              Businesses across India trust our expertise.
            </p>
          </div>
        </div>
        
        {/* Continuous Marquee Wrapper */}
        <div className="w-full overflow-hidden relative pb-16 md:pb-24">
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
          
          <div className="flex w-max animate-marquee gap-6 px-3">
            {[
              ...[
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
              ],
              ...[
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
              ]
            ].map((logo, index) => (
              <div key={index} className="bg-white rounded-2xl border border-slate-200 h-24 w-48 shrink-0 flex items-center justify-center p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                <img loading="lazy" decoding="async" src={logo.url} alt={logo.name} className="max-h-full max-w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL CALL TO ACTION */}
      <section className="relative bg-[#0f172a] overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-24 md:py-32 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6">
            Ready to Transform Your <span className="italic font-light text-slate-400">Space?</span>
          </h2>
          <p className="text-slate-300 text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto">
            Let's build something exceptional together.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-[#0f172a] px-10 py-5 rounded-full font-semibold tracking-wide hover:bg-slate-200 hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]">
            Book Free Consultation <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* 10. CONTACT SECTION */}
      <ContactSection />

      {/* 11. FOOTER */}
      <Footer />
    </main>
  );
}
