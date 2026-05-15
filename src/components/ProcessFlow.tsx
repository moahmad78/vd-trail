"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Layout, Factory, Flag } from "lucide-react";

const steps = [
  { 
    icon: <Search size={32} />, 
    title: "Discovery", 
    desc: "Understanding vision, site audit, and functional blueprints." 
  },
  { 
    icon: <Layout size={32} />, 
    title: "Planning", 
    desc: "Strategic material mapping and 3D layout visualization." 
  },
  { 
    icon: <PenTool size={32} />, 
    title: "Design", 
    desc: "Bespoke selection of textures, colors, and engineering specs." 
  },
  { 
    icon: <Factory size={32} />, 
    title: "Execution", 
    desc: "In-house fabrication and precise on-site installation." 
  },
  { 
    icon: <Flag size={32} />, 
    title: "Handover", 
    desc: "Final quality audit and seamless project delivery." 
  },
];

const ProcessFlow = () => {
  return (
    <section id="process" className="py-24 bg-white overflow-hidden relative border-y border-slate-100">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Our Method</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-[#020617]">The 5-Step Process to Perfection</h3>
        </div>

        <div className="relative">
          {/* Horizontal Line on Desktop */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-12 hidden lg:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="relative group text-center"
              >
                <div className="bg-white border border-slate-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 transition-all group-hover:bg-[#020617] group-hover:text-white group-hover:scale-110 shadow-lg relative z-20">
                  <div className="text-accent group-hover:text-accent transition-colors">
                    {step.icon}
                  </div>
                </div>
                <h5 className="text-xl font-display font-bold mb-4 text-[#020617]">{step.title}</h5>
                <p className="text-slate-500 leading-relaxed text-sm max-w-xs mx-auto">
                  {step.desc}
                </p>
                <div className="mt-4 text-xs font-black text-slate-200 uppercase tracking-tighter">Phase 0{idx + 1}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessFlow;