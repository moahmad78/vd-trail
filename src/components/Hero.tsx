// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useQuote } from "@/contexts/QuoteContext";
import SlideUpFade from "./animations/SlideUpFade";

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
    <section className="relative w-full h-[100vh] md:h-[90vh] lg:h-[calc(100vh-5rem)] min-h-[650px] flex flex-col overflow-hidden bg-[#0f172a]">
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
        </motion.div>
      </div>

      {/* Abstract Animated Mesh Background Blobs */}
      <div className="absolute top-[10%] left-[10%] w-[30rem] h-[30rem] bg-[#1e293b]/20 rounded-full blur-[100px] mix-blend-screen animate-float-slow-1 z-0 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[40rem] h-[40rem] bg-indigo-900/10 rounded-full blur-[120px] mix-blend-screen animate-float-slow-2 z-0 pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 flex-grow relative z-20 flex items-center pt-4 md:pt-6 lg:pt-4">
        <div className="max-w-3xl">
          <div className="relative z-20">
            <SlideUpFade delay={0}>
              <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white/80 block mb-4">
                We Create
              </span>
            </SlideUpFade>
            
            <SlideUpFade delay={0.1}>
              <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] drop-shadow-lg mb-2">
                Designing Spaces.<br />Building Experiences.
              </h1>
              
              <div className="h-[48px] md:h-[60px] lg:h-[72px] mb-6 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentLineIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center"
                  >
                    <div className="text-3xl md:text-5xl lg:text-6xl italic font-light text-slate-300 drop-shadow-lg leading-tight whitespace-nowrap">
                      {italicLines[currentLineIndex]}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </SlideUpFade>
            
            <SlideUpFade delay={0.2}>
              <p className="text-slate-300 font-light leading-relaxed text-base md:text-lg mb-8 max-w-[540px] drop-shadow-md">
                From luxury residences and hospitality destinations to educational and commercial environments, we deliver end-to-end turnkey solutions with precision.
              </p>
            </SlideUpFade>

            {/* Premium Trust Indicators */}
            <SlideUpFade delay={0.3}>
              <div className="flex flex-wrap items-center gap-6 md:gap-10 mb-10 relative z-40 border-l-2 border-white/20 pl-6">
                <div className="flex flex-col">
                  <span className="text-white font-bold text-xl md:text-2xl tracking-tight">20+</span>
                  <span className="text-white/60 text-[10px] md:text-xs font-semibold tracking-widest uppercase">Years Experience</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-xl md:text-2xl tracking-tight">250+</span>
                  <span className="text-white/60 text-[10px] md:text-xs font-semibold tracking-widest uppercase">Projects Delivered</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-xl md:text-2xl tracking-tight">50+</span>
                  <span className="text-white/60 text-[10px] md:text-xs font-semibold tracking-widest uppercase">Corporate Clients</span>
                </div>
                <div className="flex flex-col hidden sm:flex">
                  <span className="text-white font-bold text-xl md:text-2xl tracking-tight">Pan-India</span>
                  <span className="text-white/60 text-[10px] md:text-xs font-semibold tracking-widest uppercase">Execution</span>
                </div>
              </div>
            </SlideUpFade>

            <SlideUpFade delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto relative z-50">
                <Link href="/portfolio" className="flex-1 sm:flex-none">
                  <button className="w-full relative overflow-hidden bg-white text-[#0f172a] text-[11px] sm:text-xs md:text-sm font-bold tracking-wide py-4 px-8 rounded-full shadow-xl hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-[1.02] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 whitespace-nowrap">
                    Explore Our Work →
                  </button>
                </Link>
                <button 
                  onClick={() => setIsQuoteOpen(true)}
                  className="w-full sm:w-auto relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide py-4 px-8 rounded-full hover:bg-white/20 hover:border-white/40 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
                >
                  Book a Consultation
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
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={handleScroll}
      >
        <span className="text-white/50 text-[10px] font-bold tracking-widest uppercase group-hover:text-white transition-colors">
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
