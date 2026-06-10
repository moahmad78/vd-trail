// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Star, Trophy, Award } from "lucide-react";
import StatsSection from "./StatsSection";
import { useQuote } from "@/contexts/QuoteContext";
import SlideUpFade from "./animations/SlideUpFade";
import HoverButton from "./animations/HoverButton";
const trustBadges = [
  { icon: ShieldCheck, text: "Excellent BBB" },
  { icon: Star, text: "Verified Ratings" },
  { icon: Trophy, text: "20+ Years Legacy" },
  { icon: Award, text: "Trusted Firm" },
];
const heroSlides = [
  {
    image: "/assets/home/hero/slide-1.jpg",
    title: (
      <>
        ELITE RESIDENTIAL LIVING <br /> AND BESPOKE LUXURY <br />{" "}
        <span className="italic font-light text-dynamic-light drop-shadow-lg">
          VILLAS ARCHITECTURE
        </span>
      </>
    ),
  },
  {
    image: "/assets/home/hero/slide-2.jpg",
    title: (
      <>
        LUXURY HOSPITALITY <br /> AND PREMIUM BOUTIQUE <br />{" "}
        <span className="italic font-light text-dynamic-light drop-shadow-lg">
          LOUNGES ARCHITECTURE
        </span>
      </>
    ),
  },
  {
    image: "/assets/home/hero/slide-3.jpg",
    title: (
      <>
        INSPIRING ACADEMIC SPACES AND{" "}
        <span className="italic font-light text-dynamic-light drop-shadow-lg">
          NEXT-GEN SMART INSTITUTIONS
        </span>
      </>
    ),
  },
];
const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { setIsQuoteOpen } = useQuote();
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="relative w-full min-h-[calc(100vh-5rem)] flex flex-col overflow-hidden bg-[#0f172a]">
      {" "}
      {/* Background Image Slider with subtle dark overlay */}{" "}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} mode="popLayout">
          {" "}
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0 w-full h-full transform-gpu backface-hidden will-change-opacity"
          >
            <div className="absolute inset-0 w-full h-full">
              <Image
                unoptimized={true}
                src={heroSlides[currentImage].image}
                alt="Luxury Architecture"
                fill
                quality={100}
                sizes="100vw"
                className="object-cover"
                priority
              />
              {/* Layer B: CORRECTED LUXURY GRADIENT OVERLAY (#0f172a) WITH STRICT STOP BOUNDARIES */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/95 via-[#0f172a]/55 via-35% to-transparent to-60% z-10 pointer-events-none" />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Abstract Animated Mesh Background Blobs */}
      <div className="absolute top-[10%] left-[10%] w-[30rem] h-[30rem] bg-[#1e293b]/20 rounded-full blur-[100px] mix-blend-screen animate-float-slow-1 z-0 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[40rem] h-[40rem] bg-indigo-900/10 rounded-full blur-[120px] mix-blend-screen animate-float-slow-2 z-0 pointer-events-none" />
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 flex-grow relative z-20 flex items-center pt-16 md:pt-20 lg:pt-24 pb-12">
        <div className="max-w-3xl">
          <div className="relative z-20">
            <SlideUpFade delay={0}>
              <span className="text-badge md:text-sm text-white/80 block mb-3">
                We Create
              </span>
            </SlideUpFade>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.2,
                  ease: "easeInOut",
                }}
                className="mb-2 sm:mb-3 h-[100px] sm:h-[140px] md:h-[160px] lg:h-[190px] transform-gpu will-change-opacity backface-hidden"
              >
                <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[0.95] drop-shadow-lg">
                  {" "}
                  {heroSlides[currentImage].title}{" "}
                </h1>
              </motion.div>
            </AnimatePresence>
            <SlideUpFade delay={0.2}>
              <p className="text-desc-light font-normal leading-relaxed text-sm md:text-base mt-2 mb-6 max-w-lg drop-shadow-md">
                {" "}
                End-to-end turnkey design and execution exclusively engineered
                for premium homes, luxury hotels, and modern institutions.{" "}
              </p>
            </SlideUpFade>{" "}
            {/* Trust Badges (Static Flex Layout) */}{" "}
            <SlideUpFade delay={0.3}>
              <div className="flex flex-wrap items-center gap-6 sm:gap-10 my-4 relative z-40">
                {" "}
                {trustBadges.map((badge, idx) => {
                  const Icon = badge.icon;
                  return (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      {" "}
                      <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white stroke-[1.5]" />{" "}
                      <span className="text-xs sm:text-sm font-bold text-white text-center whitespace-nowrap">
                        {" "}
                        {badge.text}{" "}
                      </span>{" "}
                    </div>
                  );
                })}{" "}
              </div>
            </SlideUpFade>
          </div>{" "}
          {/* Sleek Minimalist Navigation Gold Indicators */}{" "}
          <div className="flex gap-2.5 mb-6">
            {" "}
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${currentImage === idx ? "w-10 bg-white" : "w-3 bg-white/40 hover:bg-white/70"}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}{" "}
          </div>{" "}
          <SlideUpFade delay={0.4}>
            <div className="flex flex-row gap-4 sm:gap-6 w-full sm:w-auto mt-6">
              {" "}
              <Link href="/portfolio" className="flex-1 sm:flex-none">
                {" "}
                <button className="w-full relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs md:text-sm font-medium tracking-wide py-3.5 sm:py-4 px-6 sm:px-8 rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/20 hover:border-white/40 hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap">
                  <span className="relative z-10 sm:hidden">Works</span>
                  <span className="relative z-10 hidden sm:inline">Explore Our Works</span>
                </button>
              </Link>{" "}
              <button
                onClick={() => setIsQuoteOpen(true)}
                className="flex-1 sm:flex-none relative overflow-hidden bg-white text-[#0f172a] text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide py-3.5 sm:py-4 px-6 sm:px-8 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] hover:scale-[1.03] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 whitespace-nowrap"
              >
                <span className="sm:hidden">Consultation</span>
                <span className="hidden sm:inline">Book a Consultation</span>
              </button>{" "}
            </div>
          </SlideUpFade>

        </div>
      </div>{" "}
      {/* Stats Overlay */}{" "}
      <div className="relative z-30">
        <StatsSection />
      </div>
    </section>
  );
};
export default Hero;
