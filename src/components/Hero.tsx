"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import StatsSection from "./StatsSection";

const images = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070", // Hospitality
  "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2070", // Healthcare (Hospital)
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2074", // Residential (Home)
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img 
              src={images[currentImage]} 
              alt="Luxury Interior Design and Premium Aluminium Systems - Voomet Design" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Static White Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-white/95 via-white/40 via-40% to-transparent" />

      {/* Content Layer */}
      <div className="container mx-auto px-6 flex-grow relative z-20 flex items-center pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-[#020617] leading-[1.1] mb-6 tracking-tight drop-shadow-sm">
            Designing Spaces, <br />
            Defining Lifestyles
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-slate-600 mb-10 leading-relaxed drop-shadow-sm">
            Transforming Spaces from Concept to Reality
          </h2>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/portfolio">
              <button className="bg-[#020617] text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-accent transition-all transform hover:-translate-y-1">
                View Our Projects
              </button>
            </Link>
            <Link href="/services">
              <button className="border-2 border-[#020617] text-[#020617] px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/50 transition-all">
                Our Expertise
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Stats Overlay */}
      <div className="relative z-30">
        <StatsSection />
      </div>
    </section>
  );
};

export default Hero;