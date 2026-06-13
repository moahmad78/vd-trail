"use client";

import { motion } from "framer-motion";
import SlideUpFade from "./animations/SlideUpFade";

export default function ContactHero() {
  const handleScroll = () => {
    window.scrollBy({ top: window.innerHeight * 0.45, behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-[35vh] md:h-[52vh] min-h-[280px] md:min-h-[420px] flex flex-col overflow-hidden bg-[#0B1635]">
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
        <div className="max-w-2xl mt-4 md:mt-16">
          <SlideUpFade delay={0}>
            <span className="text-[10px] md:text-caption font-bold tracking-[0.2em] md:tracking-[0.24em] uppercase text-white/80 block mb-2 md:mb-6">
              LET&apos;S START A CONVERSATION
            </span>
          </SlideUpFade>
          
          <SlideUpFade delay={0.1}>
            <h1 className="text-[32px] md:text-h2 text-white font-semibold tracking-tight leading-[1.05] md:leading-[1.08] drop-shadow-lg mb-2 md:mb-4">
              Let&apos;s Create Something Extraordinary.
              <span className="text-[18px] md:text-[clamp(1.2rem,3.5vw,2rem)] text-slate-300 italic font-light mt-0.5 md:mt-1 block">
                Designed Around Your Vision.
              </span>
            </h1>
          </SlideUpFade>
          
          <SlideUpFade delay={0.2}>
            <p className="text-[14px] text-slate-300 font-light leading-snug mb-8 max-w-[280px] drop-shadow-md md:hidden line-clamp-2">
              Our team is ready to bring your luxury vision to life.
            </p>
            <p className="text-body text-slate-300 font-light leading-relaxed mb-6 max-w-[500px] drop-shadow-md hidden md:block">
              Whether you&apos;re planning a luxury residence, hospitality destination, or commercial environment — our team is ready to bring your vision to life.
            </p>
          </SlideUpFade>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-4 md:bottom-[150px] lg:bottom-[170px] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 md:gap-2 cursor-pointer group"
        onClick={handleScroll}
      >
        <span className="text-caption text-white/50 font-bold tracking-widest uppercase group-hover:text-white transition-colors">
          Scroll to Inquiry
        </span>
        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-4 h-6 md:w-5 md:h-8 border border-white/30 rounded-full flex justify-center p-0.5 md:p-1 group-hover:border-white/60 transition-colors"
        >
          <div className="w-0.5 h-1 md:w-1 md:h-1.5 bg-white/60 rounded-full group-hover:bg-white transition-colors" />
        </motion.div>
      </motion.div>
    </section>
  );
}
