// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";
import { motion } from "framer-motion";

const ValueStatement = () => {
  return (
    <section className="py-6 md:py-12 bg-white overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-stretch rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-[#020617] text-white">
          <div className="lg:w-1/2 p-6 md:p-12 lg:p-20 relative z-10">
            <motion.h2 initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-[#324A61] text-[10px] md:text-xs font-black uppercase mb-3 md:mb-6 block">
              One-Point Ownership
            </motion.h2>
            <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="text-3xl md:text-4xl lg:text-6xl font-black uppercase tracking-tight mb-4 md:mb-8 leading-tight">
              Turnkey, Not Template.
            </motion.h3>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }} className="text-sm md:text-base lg:text-xl text-white/60 leading-relaxed mb-6 md:mb-12">
              We don't do copy-paste. We design spaces that fit your team, your rhythm, and your goals. One single point of contact for bespoke woodwork and artisanal finishes.
            </motion.p>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.6 }} viewport={{ once: true }}>
              <button className="w-full md:w-auto bg-[#324A61] text-white text-xs md:text-sm font-black uppercase tracking-widest py-3 md:py-3.5 px-6 rounded-lg hover:bg-white hover:text-[#020617] transition-all duration-300 shadow-md">
                Book a Strategy Call
              </button>
            </motion.div>
          </div>
          <div className="lg:w-1/2 relative min-h-[200px] md:min-h-[400px] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070" alt="Turnkey Interior Strategy" className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 hover:scale-105 transition-all duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#020617] via-[#020617]/40 md:via-[#020617]/40 to-transparent pointer-events-none block" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueStatement;
