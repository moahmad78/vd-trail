// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";
import { motion } from "framer-motion";
import { History, Factory, PackageCheck } from "lucide-react";
import SectionWave from "@/components/ui/SectionWave";

const features = [
  {
    title: "20+ Years Legacy",
    desc: "A two-decade track record of architectural excellence and trust across commercial and residential sectors.",
    icon: <History className="w-10 h-10 text-neutral-500" />
  },
  {
    title: "100% In-House Execution",
    desc: "Direct control over every millimetre. Our artisanal woodwork and technical execution is strictly in-house for superior quality.",
    icon: <Factory className="w-10 h-10 text-neutral-500" />
  },
  {
    title: "Turnkey Excellence",
    desc: "Seamless end-to-end solutions from layout planning and 3D design to final execution and site handover.",
    icon: <PackageCheck className="w-10 h-10 text-neutral-500" />
  }
];

const EdgeSection = () => {
  return (
    <section className="py-16 md:py-24 bg-[#f8fafc]">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between w-full max-w-[1400px] mx-auto mb-12 px-4 md:px-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-neutral-300"></span>
            <span className="text-[11px] text-neutral-500 uppercase tracking-[0.35em] font-sans">Core Values</span>
          </div>
          <h2 className="font-sans text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[0.95] text-neutral-900 flex flex-wrap items-center">
            The VoometDesign{" "}<span className="italic font-light inline-flex items-center">Edge<SectionWave /></span>
          </h2>
        </div>
        <p className="text-sm text-neutral-500 max-w-xs md:text-right font-light leading-relaxed mt-4 md:mt-0">
          Built on a foundation of absolute precision, transparency, and two decades of unwavering trust.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch site-container">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative overflow-hidden bg-white/80 rounded-2xl border border-neutral-200/70 p-8 shadow-sm group hover:border-neutral-400 transition-all duration-500 h-full"
          >
            <img loading="lazy" decoding="async" 
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000" 
              alt="Blueprint Texture" 
              className="absolute inset-0 w-full h-full object-cover opacity-[0.04] mix-blend-multiply pointer-events-none grayscale transition-transform duration-700 group-hover:scale-105" 
            />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-8 p-4 bg-slate-50 rounded-2xl w-fit group-hover:bg-[#324A61] [&_svg]:group-hover:text-white transition-colors border border-slate-100 group-hover:border-transparent">
                {feature.icon}
              </div>
              <h4 className="text-card mb-4 text-neutral-900 text-lg md:text-xl font-semibold">{feature.title}</h4>
              <p className="text-neutral-600 leading-relaxed font-normal text-sm md:text-base mt-auto">
                {feature.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default EdgeSection;
