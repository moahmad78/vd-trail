// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";
import { motion } from "framer-motion";
import SectionWave from "@/components/ui/SectionWave";

const ValueStatement = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#0f172a] py-16 md:py-32">
      {/* Background Image */}
      <img loading="lazy" decoding="async" 
        src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070" 
        alt="Turnkey Interior Strategy" 
        className="absolute inset-0 w-full h-full object-cover" 
      />
      
      {/* Softened Graphic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/60 to-transparent w-full h-full pointer-events-none" />

      {/* Inner Container Alignment */}
      <div className="site-container relative z-10 flex flex-col justify-center h-full">
        <div className="max-w-2xl py-8">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }} 
            viewport={{ once: true }} 
            className="text-neutral-400 text-[10px] md:text-xs mb-3 md:mb-6 block font-bold uppercase tracking-[0.2em]"
          >
            One-Point Ownership
          </motion.h2>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }} 
            viewport={{ once: true }} 
            className="font-sans text-white text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-tight mb-4 flex flex-wrap items-center"
          >
            Turnkey, Not <span className="italic font-light inline-flex items-center">Template.<SectionWave className="opacity-70" /></span>
          </motion.h3>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.4 }} 
            viewport={{ once: true }} 
            className="font-sans text-desc-light font-normal text-sm md:text-base leading-relaxed max-w-xl mb-8"
          >
            We don't do copy-paste. We design spaces that fit your team, your rhythm, and your goals. One single point of contact for bespoke woodwork and artisanal finishes.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.6 }} 
            viewport={{ once: true }}
          >
            <button className="text-badge w-full md:w-auto bg-white text-[#0f172a] py-3.5 px-8 rounded-lg hover:bg-neutral-200 transition-all duration-300 shadow-lg font-bold">
              Book a Strategy Call
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ValueStatement;
