// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useQuote } from "@/contexts/QuoteContext";
import { trackEvent } from "@/lib/tracking";

const slides = [
  {
    video: "/video/hero/hero1.mp4",
    tagline: "Crafted for Modern Living."
  },
  {
    video: "/video/hero/hero1.mp4", // Preloaded so you can swap to hero2.mp4 easily
    tagline: "Inspired by Precision."
  }
];

const Hero = () => {
  const { setIsQuoteOpen } = useQuote();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5s interval for slides
    return () => clearInterval(interval);
  }, []);

  const handleScroll = () => {
    window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-[80svh] md:h-[90vh] lg:h-[calc(100vh-5rem)] min-h-[550px] md:min-h-[600px] flex flex-col overflow-hidden bg-[#0f172a]">
      {/* Background Videos with Seamless CSS Crossfade to prevent black flashes */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <video
            key={index}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className={`absolute inset-0 w-full h-full object-cover z-0 transform scale-[1.02] transition-opacity duration-700 ease-in-out ${currentSlide === index ? "opacity-100" : "opacity-0"}`}
          >
            <source src={slide.video} type="video/mp4" />
          </video>
        ))}

        {/* Luxury Gradient Overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, rgba(7,22,51,0.95) 0%, rgba(7,22,51,0.92) 25%, rgba(7,22,51,0.82) 45%, rgba(7,22,51,0.65) 60%, rgba(7,22,51,0.45) 72%, rgba(7,22,51,0.18) 82%, rgba(7,22,51,0.05) 92%, rgba(7,22,51,0.00) 100%)"
          }}
        />

        {/* Mobile Readability Gradient Overlay */}
        <div
          className="absolute inset-0 block md:hidden z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.50) 55%, rgba(0,0,0,0.72) 100%)'
          }}
        />
      </div>

      {/* Abstract Animated Mesh Background Blobs */}
      <div className="absolute top-[10%] left-[10%] w-[30rem] h-[30rem] bg-[#1e293b]/20 rounded-full blur-[100px] mix-blend-screen animate-float-slow-1 z-0 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[40rem] h-[40rem] bg-indigo-900/10 rounded-full blur-[120px] mix-blend-screen animate-float-slow-2 z-0 pointer-events-none" />

      {/* Content Container */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 flex-grow relative z-20 flex items-center pt-10 md:pt-12 lg:pt-10 pb-28">
        <div className="max-w-[700px] w-full relative z-20 flex flex-col justify-center items-start">

          <span className="text-[12px] md:text-caption font-bold tracking-[0.2em] uppercase text-white/80 block mb-4">
            We Create
          </span>

          <h1 className="text-white text-[clamp(54px,5vw,72px)] font-[700] tracking-[-0.03em] leading-[1.02] drop-shadow-lg mb-2 w-full max-w-[700px]">
            Designing Spaces.<br />
            Building Experiences.
          </h1>

          <div className="relative min-h-[44px] md:min-h-[56px] lg:min-h-[68px] mb-[28px] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center"
              >
                <div className="text-[clamp(28px,2.5vw,42px)] italic font-[300] text-[#cbd5e1] drop-shadow-lg leading-tight">
                  {slides[currentSlide].tagline}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mb-8 md:mb-10">
            <div className="flex flex-wrap items-center gap-4 md:gap-5 text-white/85">
              <span className="text-[18px] md:text-[20px] font-[300] tracking-wide">
                • Residential
              </span>
              <span className="text-[18px] md:text-[20px] font-[300] tracking-wide">
                • Hospitality
              </span>
              <span className="text-[18px] md:text-[20px] font-[300] tracking-wide">
                • UPVC
              </span>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:flex md:flex-row md:flex-nowrap items-start md:items-center gap-6 md:gap-[48px] mb-8 md:mb-10 relative z-40 border-l-2 border-white/20 pl-4 md:pl-6 w-full">
            <div className="flex flex-col">
              <span className="text-white font-[700] text-[34px] leading-none tracking-tight">20+</span>
              <span className="text-white/65 text-[11px] font-semibold tracking-[0.2em] uppercase mt-1 md:whitespace-nowrap">Years Experience</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-[700] text-[34px] leading-none tracking-tight">250+</span>
              <span className="text-white/65 text-[11px] font-semibold tracking-[0.2em] uppercase mt-1 md:whitespace-nowrap">Projects Delivered</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-[700] text-[34px] leading-none tracking-tight">Pan-India</span>
              <span className="text-white/65 text-[11px] font-semibold tracking-[0.2em] uppercase mt-1 md:whitespace-nowrap">Execution</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-[700] text-[34px] leading-none tracking-tight">End to End</span>
              <span className="text-white/65 text-[11px] font-semibold tracking-[0.2em] uppercase mt-1 md:whitespace-nowrap">Interior Solutions</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-row gap-3 sm:gap-[20px] w-full md:w-[420px] relative z-50">
            <Link href="/portfolio" className="flex-1" onClick={() => trackEvent('hero_cta_click', { button_name: 'View Projects' })}>
              <button className="w-full flex items-center justify-center relative overflow-hidden bg-white text-[#0f172a] text-[14px] font-bold tracking-wide h-[56px] rounded-full shadow-xl hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:-translate-y-[2px] active:scale-95 transition-all duration-300 whitespace-nowrap">
                View Project →
              </button>
            </Link>
            <button
              onClick={() => {
                setIsQuoteOpen(true);
                trackEvent('hero_cta_click', { button_name: 'Consultation' });
              }}
              className="flex-1 flex items-center justify-center relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 text-white text-[14px] font-semibold tracking-wide h-[56px] rounded-full hover:bg-white/20 hover:border-white/40 hover:-translate-y-[2px] active:scale-95 transition-all duration-300 whitespace-nowrap"
            >
              Enquire Us 
            </button>
          </div>

        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 md:gap-2 cursor-pointer group hover:opacity-100 transition-opacity duration-300"
        style={{ bottom: 'max(env(safe-area-inset-bottom, 0px) + 0.5rem, 0.5rem)' }}
        onClick={handleScroll}
      >
        <span className="text-white text-[10px] md:text-caption font-bold tracking-widest uppercase transition-colors group-hover:text-white">
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
