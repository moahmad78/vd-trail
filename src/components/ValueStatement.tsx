"use client";

import { motion } from "framer-motion";

const ValueStatement = () => {
  return (
    <section className="py-12 bg-white overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-stretch rounded-[3rem] overflow-hidden bg-[#020617] text-white">
          <div className="lg:w-1/2 p-12 lg:p-20 relative z-10">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-sm font-bold text-accent uppercase tracking-widest mb-6"
            >
              One-Point Ownership
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight"
            >
              Turnkey, Not Template.
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl text-white/60 leading-relaxed mb-12"
            >
              We don't do copy-paste. We design spaces that fit your team, your rhythm, and your goals. One single point of contact for bespoke woodwork and artisanal finishes.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <button className="bg-accent text-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-white transition-all">
                Book a Strategy Call
              </button>
            </motion.div>
          </div>

          <div className="lg:w-1/2 relative min-h-[400px]">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="absolute inset-0 w-full h-full object-cover grayscale-[0.5] hover:grayscale-0 transition-all duration-1000"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-design-41004-large.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-transparent lg:block hidden" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueStatement;
