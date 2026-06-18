// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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
  PanelTop,
  ChevronDown,
  ArrowRight
} from "lucide-react";
import SlideUpFade from "@/components/animations/SlideUpFade";
import ContactSection from "@/components/ContactSection";

const CLIENT_LOGOS = [
  { src: "/assets/global/brands/apps for bharath.png", alt: "Apps for Bharat" },
  { src: "/assets/global/brands/pw.png", alt: "Physics Wallah" },
  { src: "/assets/global/brands/zluri.png", alt: "Zluri" },
  { src: "/assets/global/brands/Emirates 2.png", alt: "Emirates" },
  { src: "/assets/global/brands/Airasia 1.png", alt: "AirAsia" },
  { src: "/assets/global/brands/qpi.png", alt: "QpiAI" },
];

const MARQUEE_TRACK = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

function ClientLogo({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-[120px] md:w-full h-12 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-lg mx-4 md:mx-0 shrink-0">
        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{alt}</span>
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center w-[120px] md:w-[180px] h-12 mx-4 md:mx-8 shrink-0 group-hover:[animation-play-state:paused]">
      <Image
        fill
        src={src}
        alt={alt}
        sizes="(max-width: 768px) 120px, 16vw"
        onError={() => setError(true)}
        className="object-contain transition-all duration-300"
      />
    </div>
  );
}

import MobileAutoScrollCarousel from "@/components/animations/MobileAutoScrollCarousel";

export default function AboutPage() {
  const timelineData = [
    "2010 Voomet Founded",
    "Residential & Commercial Turnkey Execution",
    "Launch of Voomet Design",
    "Luxury Residences & Hospitality Focus",
    "Pan-India Design & Execution"
  ];

  const trustIndicators = [
    "Established 2010",
    "20+ Years of Collective Expertise",
    "250+ Projects Delivered",
    "Pan-India Execution"
  ];

  return (
    <main className="bg-white min-h-screen pt-0 pb-0 overflow-hidden">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes about-marquee {
          from { transform: translate3d(0, 0, 0); }
          to { transform: translate3d(-50%, 0, 0); }
        }
        .animate-about-marquee {
          display: flex;
          width: max-content;
          animation: about-marquee 25s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-about-marquee {
            animation-play-state: paused;
          }
        }
      `}</style>
      
      {/* 1. HERO SECTION (Editorial Video Background) */}
      <section className="relative w-full h-[55vh] md:h-[90vh] lg:h-[92vh] flex items-center justify-start overflow-hidden bg-black">
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
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 text-white flex flex-col justify-center h-full pt-12 md:pt-10">
          <SlideUpFade>
            <h1 className="text-[36px] md:text-h1 font-semibold tracking-tight text-white mb-3 md:mb-4 text-left leading-[1.05] drop-shadow-md">
              Redefining Spaces.<br/>
              <span className="italic font-light text-slate-300">Inspiring Lifestyles.</span>
            </h1>
            <p className="max-w-md md:max-w-[500px] text-left text-slate-200 leading-snug md:leading-relaxed tracking-normal text-[15px] md:text-h5 font-light drop-shadow-sm line-clamp-2 md:line-clamp-none mb-6 md:mb-0">
              Luxury interiors designed, engineered, and delivered with precision.
            </p>
          </SlideUpFade>
          
          {/* Scroll to Explore */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-16 md:left-12 flex flex-col items-center md:items-start cursor-pointer group"
            onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <span className="text-[10px] md:text-caption tracking-[0.2em] text-slate-300 uppercase mb-1.5 md:mb-2 group-hover:text-white transition-colors duration-300">Scroll to Explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ChevronDown size={20} className="text-slate-300 md:w-5 md:h-5 group-hover:text-white transition-colors duration-300" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT NARRATIVE & LEGACY (Editorial Presentation) */}
      <section className="relative bg-white border-b border-slate-100 overflow-hidden pt-[60px] md:pt-[80px] lg:pt-[140px] pb-[40px] md:pb-[60px] lg:pb-[80px]">
        {/* Subtle Visual Layer */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
          <Image 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069" 
            alt="Architectural Blueprint" 
            fill 
            className="object-cover grayscale"
          />
        </div>

        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
          
          {/* TOP SECTION: Typography & Heading */}
          <div className="mb-6 md:mb-8 lg:mb-[30px]">
            <span className="text-[11px] md:text-[12px] font-bold uppercase tracking-[4px] lg:tracking-[6px] text-[#0f172a] mb-5 md:mb-6 block">
              OUR STORY
            </span>
            <h2 className="text-[40px] md:text-[60px] lg:text-[76px] text-[#0f172a] leading-[1.05] tracking-tight lg:tracking-[-0.03em]">
              <span className="font-bold block lg:inline-block lg:mr-3">Designing Spaces.</span>
              <span className="font-light block lg:inline-block text-slate-500">Building Trust.</span>
            </h2>
          </div>

          {/* Two-Column Editorial Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-[32px] md:gap-[60px] lg:gap-[100px] items-stretch">
            
            {/* Left Side: Award Image — fills full column height */}
            <div className="flex justify-center lg:justify-start w-full">
              <div className="relative w-full max-w-[560px] rounded-[16px] md:rounded-[20px] overflow-hidden shadow-[0_25px_35px_rgba(0,0,0,0.06)] border border-[rgba(10,25,55,0.06)] bg-white/50 min-h-[320px] lg:min-h-0 lg:h-full">
                <Image 
                  src="/assets/pages/about/award.png"
                  alt="VOOMETDESIGN Award"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 560px"
                />
              </div>
            </div>

            {/* Right Side: About Narrative — flex column so stats pin to bottom */}
            <div className="flex flex-col max-w-full lg:max-w-[650px] justify-start pt-2 lg:pt-0">
              <div className="space-y-[18px] lg:space-y-[22px] text-[15px] md:text-[17px] lg:text-[18px] text-slate-600 leading-[1.75] lg:leading-[1.85]">
                <p>
                  Established in 2010, Voomet has built a reputation for delivering exceptional turnkey solutions across residential and commercial spaces, driven by quality, innovation, and uncompromising craftsmanship.
                </p>
                <p>
                  To meet the evolving aspirations of modern clients, Voomet Design was launched as our premium interior division, specializing in luxury residences and hospitality environments.
                </p>
                <p>
                  We craft sophisticated spaces that reflect your lifestyle and stand the test of time.
                </p>
              </div>

              {/* Timeline */}
              <div className="relative mt-6 mb-6">
                <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-[#E2E8F0] z-0"></div>
                <div className="flex flex-col gap-4 relative z-10">
                  {timelineData.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                      className="flex items-start gap-6"
                    >
                      <div className="w-[15px] h-[15px] rounded-full border-2 border-[#071633] bg-white mt-1.5 shrink-0 flex items-center justify-center">
                        <div className="w-[5px] h-[5px] rounded-full bg-[#071633]"></div>
                      </div>
                      <span className="text-[#071633] font-medium text-[14px] md:text-[15px] leading-tight pt-1">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Trust Indicators — mt-auto pins it to bottom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-x-4 gap-y-3 md:gap-x-6 border-t border-[#E2E8F0] pt-6 mt-auto"
              >
                {trustIndicators.map((indicator, index) => (
                  <div key={index} className="flex items-center gap-4 md:gap-6">
                    <span className="text-[#6E7D9B] text-[11px] md:text-[12px] font-semibold tracking-[0.1em] uppercase whitespace-nowrap">
                      {indicator}
                    </span>
                    {index < trustIndicators.length - 1 && (
                      <div className="w-[1px] h-3 bg-[#E2E8F0] hidden sm:block"></div>
                    )}
                  </div>
                ))}
              </motion.div>

            </div>
          </div>



        </div>
      </section>

      {/* 4. WHAT WE DO */}
      <section className="relative border-b border-slate-100 bg-slate-50">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-8 md:py-24 relative z-10 text-[#0f172a]">
          <div className="text-center md:text-left mb-8 md:mb-12">
            <h2 className="text-[28px] md:text-h2 font-semibold tracking-tight text-[#0f172a]">
              What <span className="italic font-light text-slate-500">We Do.</span>
            </h2>
          </div>
          
          {/* Swipe Carousel on Mobile, Grid on Desktop (Reverted as per final feedback) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4 lg:gap-6">
            {[
              { icon: Home, label: "Residential", desc: "Luxury Homes" },
              { icon: Coffee, label: "Hospitality", desc: "Premium Stays" },
              { icon: GraduationCap, label: "Educational", desc: "Modern Campuses" },
              { icon: Building2, label: "Commercial", desc: "Corporate Offices" },
              { icon: Grid, label: "Aluminium", desc: "Facade Systems" },
              { icon: PanelTop, label: "UPVC", desc: "Window Systems" }
            ].map((item, index) => (
              <div key={index} className="bg-white p-3 md:p-10 rounded-[12px] md:rounded-2xl border border-slate-100 shadow-sm text-center group hover:shadow-lg hover:border-indigo-100 md:hover:-translate-y-1 transition-all duration-300">
                <div className="w-8 h-8 md:w-16 md:h-16 bg-slate-50 rounded-lg md:rounded-xl flex items-center justify-center mx-auto mb-2 md:mb-4 group-hover:bg-indigo-50 transition-colors duration-300">
                  <item.icon size={16} className="text-[#0f172a] md:w-7 md:h-7 group-hover:text-indigo-600 transition-colors duration-300" />
                </div>
                <h3 className="font-semibold text-[#0f172a] text-[13px] md:text-h6 leading-tight">{item.label}</h3>
                <p className="text-slate-500 text-[10px] md:text-small mt-0.5 md:mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="relative border-b border-slate-100 bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-8 md:py-24 relative z-10 text-[#0f172a]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            <div className="md:col-span-4 mb-2 md:mb-8">
              <h2 className="text-[28px] md:text-h2 font-semibold tracking-tight text-[#0f172a] text-center md:text-left">
                Why <span className="italic font-light text-slate-500">Choose Us.</span>
              </h2>
            </div>
            
            <MobileAutoScrollCarousel className="md:col-span-4 md:grid md:grid-cols-4 md:gap-6 pt-2">
              {[
                { icon: CheckCircle, label: "Turnkey Excellence" },
                { icon: PenTool, label: "In-House Precision" },
                { icon: Clock, label: "On-Time Delivery" },
                { icon: Gem, label: "Premium Quality" }
              ].map((feature, index) => (
                <div key={index} className="flex flex-row md:flex-col items-center md:items-start text-left p-3 md:p-8 rounded-full md:rounded-2xl border border-slate-100 bg-slate-50 group hover:bg-[#0f172a] md:hover:-translate-y-1 md:hover:shadow-md transition-all duration-300 shrink-0 min-w-fit snap-start gap-3 md:gap-0 pr-6 md:pr-8 md:h-full">
                  <div className="md:mb-4 flex items-center justify-center bg-white md:bg-transparent rounded-full w-8 h-8 md:w-auto md:h-auto shadow-sm md:shadow-none">
                    <feature.icon size={16} className="text-slate-500 md:text-slate-400 md:w-8 md:h-8 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-[13px] md:text-h6 font-semibold text-[#0f172a] group-hover:text-white transition-colors duration-300 whitespace-nowrap md:whitespace-normal">{feature.label}</h3>
                </div>
              ))}
            </MobileAutoScrollCarousel>
          </div>
        </div>
      </section>

      {/* 6. OUR PROCESS */}
      <section className="relative border-b border-slate-100 bg-slate-50">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-8 md:py-24 relative z-10 text-[#0f172a]">
          <div className="text-center md:text-left mb-8 md:mb-16">
            <h2 className="text-[28px] md:text-h2 font-semibold tracking-tight text-[#0f172a]">
              Our <span className="italic font-light text-slate-500">Process.</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 md:gap-6 md:flex md:flex-row md:justify-between md:items-center relative">
            <div className="hidden md:block absolute top-10 left-0 w-full h-[3px] bg-slate-200/80 z-0"></div>
            
            {[
              { icon: MessageSquare, step: "Consult", desc: "Understanding your vision and spatial requirements." },
              { icon: PenTool, step: "Design", desc: "Crafting layouts and hyper-realistic 3D walkthroughs." },
              { icon: Hammer, step: "Execute", desc: "Precision fabrication and structural construction." },
              { icon: PackageCheck, step: "Deliver", desc: "Clinical handover with uncompromising quality." }
            ].map((process, index) => (
              <div key={index} className="relative z-10 flex flex-col items-center text-center w-full md:w-1/4 group">
                <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-white border-4 md:border-[6px] border-slate-100 flex items-center justify-center mb-3 md:mb-6 group-hover:border-indigo-600 group-hover:scale-110 transition-all duration-300 shadow-sm">
                  <process.icon size={20} className="text-[#0f172a] md:w-8 md:h-8" />
                </div>
                <h4 className="text-[15px] md:text-h5 font-bold text-[#0f172a] mb-1 md:mb-2">{process.step}</h4>
                <p className="text-neutral-500 text-[11px] md:text-small max-w-[160px] md:max-w-[200px]">{process.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. THE TEAM BEHIND EVERY DELIVERY */}
      <section className="relative border-b border-slate-100 bg-white">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-8 md:py-24 relative z-10">
          <div className="mb-6 md:mb-8 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <span className="text-caption font-bold tracking-[0.28em] uppercase text-slate-400 block mb-2 md:mb-3">
                VOOMETDESIGN · Our People
              </span>
              <h2 className="text-[24px] md:text-h4 font-bold text-slate-950 tracking-wide mb-1.5 leading-tight">
                The Team Behind Every Delivery
              </h2>
              <p className="text-[13px] md:text-body text-slate-600 font-medium max-w-xl leading-relaxed mx-auto md:mx-0 line-clamp-2 md:line-clamp-none">
                Our greatest structural asset is our elite in-house engineering, design execution, and on-site project management workforce — collectively holding over 15 years of precision-built interior expertise.
              </p>
            </div>
            <Link href="/about/team" className="hidden md:inline-flex mt-4 md:mt-0 text-[11px] md:text-button font-bold uppercase tracking-widest text-[#0f172a] bg-slate-100 px-6 py-2.5 rounded-full hover:bg-[#0f172a] hover:text-white transition-all group items-center mx-auto md:mx-0">
              View Team <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
            {/* Frame 1 */}
            <div className="relative w-full h-56 md:h-96 bg-slate-50 border border-slate-200 rounded-[1.25rem] md:rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
              <Image
                fill
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070"
                alt="VOOMETDESIGN Corporate Design & Management Team"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3 md:px-5 md:py-4 bg-gradient-to-t from-black/60 to-transparent">
                <span className="text-[10px] md:text-caption font-bold tracking-[0.22em] uppercase text-white/90">
                  Design & Management Team
                </span>
              </div>
            </div>

            {/* Frame 2 */}
            <div className="relative w-full h-56 md:h-96 bg-slate-50 border border-slate-200 rounded-[1.25rem] md:rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group">
              <Image
                fill
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070"
                alt="VOOMETDESIGN Active On-Site Engineering Workforce"
                className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3 md:px-5 md:py-4 bg-gradient-to-t from-black/60 to-transparent">
                <span className="text-[10px] md:text-caption font-bold tracking-[0.22em] uppercase text-white/90">
                  On-Site Engineering Workforce
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. RECOGNITION & EXCELLENCE */}
      <section className="relative border-b border-slate-100 bg-white">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-8 md:py-24 relative z-10 text-[#0f172a]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            
            {/* Left Content */}
            <div className="text-center md:text-left overflow-hidden">
              <h2 className="text-[28px] md:text-h2 font-semibold tracking-tight text-[#0f172a] mb-2 md:mb-4">
                Recognition & <span className="italic font-light text-slate-500">Excellence.</span>
              </h2>
              <p className="text-neutral-500 text-[14px] md:text-h5 font-light mb-6 md:mb-10">
                Award-winning commitment to quality and execution.
              </p>
              
              <MobileAutoScrollCarousel className="md:grid-cols-1 md:flex-col md:space-y-4">
                <div className="min-w-[75vw] md:min-w-0 snap-start flex items-center justify-center md:justify-start gap-3 md:gap-4 group shrink-0 md:bg-slate-50 md:px-6 md:py-3.5 md:rounded-full md:border md:border-slate-100 md:inline-flex md:w-auto md:hover:-translate-y-1 md:hover:shadow-sm transition-all duration-300">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-full bg-slate-50 md:bg-white flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-[#0f172a] transition-colors duration-300">
                    <Award size={18} className="text-[#0f172a] md:w-5 md:h-5 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-[#0f172a] font-semibold text-[14px] md:text-h6">Industry Recognition</span>
                </div>
                <div className="min-w-[75vw] md:min-w-0 snap-start flex items-center justify-center md:justify-start gap-3 md:gap-4 group shrink-0 md:bg-slate-50 md:px-6 md:py-3.5 md:rounded-full md:border md:border-slate-100 md:inline-flex md:w-auto md:hover:-translate-y-1 md:hover:shadow-sm transition-all duration-300">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-full bg-slate-50 md:bg-white flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-[#0f172a] transition-colors duration-300">
                    <Target size={18} className="text-[#0f172a] md:w-5 md:h-5 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-[#0f172a] font-semibold text-[14px] md:text-h6">Excellence in Execution</span>
                </div>
                <div className="min-w-[75vw] md:min-w-0 snap-start flex items-center justify-center md:justify-start gap-3 md:gap-4 group shrink-0 md:bg-slate-50 md:px-6 md:py-3.5 md:rounded-full md:border md:border-slate-100 md:inline-flex md:w-auto md:hover:-translate-y-1 md:hover:shadow-sm transition-all duration-300">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-full bg-slate-50 md:bg-white flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-[#0f172a] transition-colors duration-300">
                    <ShieldCheck size={18} className="text-[#0f172a] md:w-5 md:h-5 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-[#0f172a] font-semibold text-[14px] md:text-h6">Commitment to Quality</span>
                </div>
              </MobileAutoScrollCarousel>
            </div>
            
            {/* Right Content */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-100 bg-slate-50 p-3 md:p-8 flex items-center justify-center group cursor-pointer hover:shadow-indigo-500/10 transition-shadow duration-500 h-64 md:h-96">
               <Image 
                 fill
                 src="/images/award/award.JPG" 
                 alt="ET Achievers Award for Innovative Commercial Interior Design" 
                 className="object-contain rounded-2xl group-hover:scale-[1.05] transition-transform duration-700"
               />
            </div>
          </div>
        </div>
      </section>

      {/* 9. TRUSTED BY INDUSTRY LEADERS (Infinite Marquee) */}
      <section className="bg-white border-b border-slate-100 overflow-hidden">
        <div className="w-full max-w-[1440px] mx-auto py-8 md:py-16 text-center">
          <span className="text-caption font-bold tracking-[0.32em] uppercase text-slate-400 block mb-2">
            VOOMETDESIGN · Trusted Partnerships
          </span>
          <p className="text-small text-slate-500 font-medium mb-8 md:mb-10 px-6">
            Collaborating with industry-leading brands, developers, and institutions across India.
          </p>

          <div 
            className="w-full overflow-hidden flex group"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
            }}
          >
            <div className="animate-about-marquee group-hover:[animation-play-state:paused]">
              {MARQUEE_TRACK.map((logo, index) => (
                <ClientLogo key={index} src={logo.src} alt={logo.alt} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. CONTACT SECTION */}
      <div className="bg-gradient-to-b from-slate-50 to-white pt-16 md:pt-16">
        <ContactSection />
      </div>

    </main>
  );
}
