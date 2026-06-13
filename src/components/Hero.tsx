// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useQuote } from "@/contexts/QuoteContext";
import SlideUpFade from "./animations/SlideUpFade";
import { trackEvent } from "@/lib/tracking";

const italicLines = [
  "Turnkey Interiors Reimagined.",
  "Crafted for Modern Living.",
  "Inspired by Precision.",
  "Built to Last."
];

const Hero = () => {
  const { setIsQuoteOpen } = useQuote();
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.85;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLineIndex((prev) => (prev + 1) % italicLines.length);
    }, 5500); // Rotates every 5.5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleScroll = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-[80svh] md:h-[90vh] lg:h-[calc(100vh-5rem)] min-h-[550px] md:min-h-[600px] flex flex-col overflow-hidden bg-[#0f172a]">
      {/* Background Video with subtle dark overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover z-0 transform scale-[1.02]"
          >
            <source src="/video/hero/hero1.mp4" type="video/mp4" />
          </video>
          {/* Layer B: CORRECTED LUXURY GRADIENT OVERLAY (#0f172a) WITH STRICT STOP BOUNDARIES */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/95 via-[#0f172a]/55 via-35% to-transparent to-60% z-10 pointer-events-none" />
          
          {/* Mobile Readability Gradient Overlay */}
          <div 
            className="absolute inset-0 block md:hidden z-10 pointer-events-none" 
            style={{
              background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.50) 55%, rgba(0,0,0,0.72) 100%)'
            }}
          />
        </motion.div>
      </div>

      {/* Abstract Animated Mesh Background Blobs */}
      <div className="absolute top-[10%] left-[10%] w-[30rem] h-[30rem] bg-[#1e293b]/20 rounded-full blur-[100px] mix-blend-screen animate-float-slow-1 z-0 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[40rem] h-[40rem] bg-indigo-900/10 rounded-full blur-[120px] mix-blend-screen animate-float-slow-2 z-0 pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 flex-grow relative z-20 flex items-center pt-4 md:pt-6 lg:pt-4 pb-28">
        <div className="max-w-3xl w-full">
          <div className="relative z-20">
            <SlideUpFade delay={0}>
              <span className="text-caption font-bold tracking-[0.2em] uppercase text-white/80 block mb-4">
                We Create
              </span>
            </SlideUpFade>
            
            <SlideUpFade delay={0.1}>
              <h1 className="text-white text-[clamp(36px,8vw,42px)] md:text-h1 font-semibold tracking-tight leading-[1.05] md:leading-tight drop-shadow-lg mb-2">
                Designing Spaces.<br />Building Experiences.
              </h1>
              
              <div className="min-h-[44px] md:min-h-[56px] lg:min-h-[68px] mb-4 md:mb-6 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentLineIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="flex items-center"
                  >
                    <div className="text-[clamp(1.5rem,4vw,3rem)] italic font-light text-slate-300 drop-shadow-lg leading-tight">
                      {italicLines[currentLineIndex]}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </SlideUpFade>
            
            <SlideUpFade delay={0.2}>
              <p className="hidden md:block text-slate-300 font-light leading-relaxed text-body-lg mb-8 max-w-[540px] drop-shadow-md">
                From luxury residences and hospitality destinations to educational and commercial environments, we deliver end-to-end turnkey solutions with precision.
              </p>
              <p className="block md:hidden text-slate-300 font-light leading-relaxed text-[14px] mb-6 max-w-[540px] drop-shadow-md">
                Delivering precision-crafted turnkey interiors for residential, hospitality, educational and commercial spaces.
              </p>
            </SlideUpFade>

            {/* Premium Trust Indicators */}
            <SlideUpFade delay={0.3}>
              <div className="grid grid-cols-2 md:flex md:flex-wrap items-center gap-4 md:gap-10 mb-6 md:mb-10 relative z-40 border-l-2 border-white/20 pl-4 md:pl-6">
                <div className="flex flex-col">
                  <span className="text-white font-bold text-[18px] md:text-h5 tracking-tight">20+</span>
                  <span className="text-white/60 text-[9px] md:text-caption font-semibold tracking-widest uppercase">Years Experience</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-[18px] md:text-h5 tracking-tight">250+</span>
                  <span className="text-white/60 text-[9px] md:text-caption font-semibold tracking-widest uppercase">Projects Delivered</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-[18px] md:text-h5 tracking-tight">50+</span>
                  <span className="text-white/60 text-[9px] md:text-caption font-semibold tracking-widest uppercase">Corporate Clients</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-[18px] md:text-h5 tracking-tight">Pan-India</span>
                  <span className="text-white/60 text-[9px] md:text-caption font-semibold tracking-widest uppercase">Execution</span>
                </div>
              </div>
            </SlideUpFade>

            <SlideUpFade delay={0.4}>
              <div className="flex flex-row gap-3 sm:gap-6 w-[95%] md:w-[420px] relative z-50">
                <Link href="/portfolio" className="flex-1 w-full" onClick={() => trackEvent('hero_cta_click', { button_name: 'Explore Our Work' })}>
                  <button className="w-full relative overflow-hidden bg-white text-[#0f172a] text-[10px] sm:text-button font-bold tracking-wide py-4 px-1 sm:px-8 rounded-full shadow-xl hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-[1.02] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 whitespace-nowrap">
                    Explore Work →
                  </button>
                </Link>
                <button 
                  onClick={() => {
                    setIsQuoteOpen(true);
                    trackEvent('hero_cta_click', { button_name: 'Book a Consultation' });
                  }}
                  className="flex-1 w-full relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-button font-semibold tracking-wide py-4 px-1 sm:px-8 rounded-full hover:bg-white/20 hover:border-white/40 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
                >
                  Consultation
                </button>
              </div>
            </SlideUpFade>
          </div>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 md:gap-2 cursor-pointer group"
        style={{ bottom: 'max(env(safe-area-inset-bottom, 0px) + 0.5rem, 0.5rem)' }}
        onClick={handleScroll}
      >
        <span className="text-white/50 text-caption font-bold tracking-widest uppercase group-hover:text-white transition-colors">
          Scroll to Explore
        </span>
        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-8 border border-white/30 rounded-full flex justify-center p-1 group-hover:border-white/60 transition-colors"
        >
          <div className="w-1 h-1.5 bg-white/60 rounded-full group-hover:bg-white transition-colors" />
        </motion.div>
      </motion.div>

    </section>
  );
};
export default Hero;
