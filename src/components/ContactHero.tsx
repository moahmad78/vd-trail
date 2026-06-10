"use client";

import { motion } from "framer-motion";
import SlideUpFade from "./animations/SlideUpFade";

export default function ContactHero() {
  const handleScroll = () => {
    window.scrollBy({ top: window.innerHeight * 0.45, behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-[55vh] min-h-[500px] flex flex-col overflow-hidden bg-[#0B1635]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover z-0 transform scale-[1.02]"
            style={{ filter: "brightness(0.8)" }}
          >
            <source src="/video/hero/hero1.mp4" type="video/mp4" />
          </video>
          {/* Navy gradient overlay left-to-right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1635]/95 via-[#0B1635]/60 via-40% to-transparent to-70% z-10 pointer-events-none" />
        </motion.div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 flex-grow relative z-20 flex flex-col justify-center">
        <div className="max-w-2xl mt-12 md:mt-16">
          <SlideUpFade delay={0}>
            <span className="text-[10px] md:text-xs font-bold tracking-[0.24em] uppercase text-white/80 block mb-4 md:mb-6">
              LET&apos;S START A CONVERSATION
            </span>
          </SlideUpFade>
          
          <SlideUpFade delay={0.1}>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] drop-shadow-lg mb-6">
              Let&apos;s Create Something Extraordinary.<br />
              <span className="text-slate-300 italic font-light text-3xl md:text-4xl lg:text-5xl mt-2 block">
                Designed Around Your Vision.
              </span>
            </h1>
          </SlideUpFade>
          <br />
          
          <SlideUpFade delay={0.2}>
            <p className="text-slate-300 font-light leading-relaxed text-sm md:text-base mb-8 max-w-[500px] drop-shadow-md">
              Whether you&apos;re planning a luxury residence, hospitality destination, educational institution, or commercial environment, our team is ready to bring your ideas to life.
            </p>
          </SlideUpFade>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-[130px] md:bottom-[150px] lg:bottom-[170px] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 cursor-pointer group"
        onClick={handleScroll}
      >
        <span className="text-white/50 text-[10px] font-bold tracking-widest uppercase group-hover:text-white transition-colors">
          Scroll to Inquiry
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
}
