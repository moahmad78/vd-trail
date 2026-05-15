"use client";

import { motion } from "framer-motion";
import { History, Factory, PackageCheck } from "lucide-react";

const features = [
  {
    title: "20+ Years Legacy",
    desc: "A two-decade track record of architectural excellence and trust across commercial and residential sectors.",
    icon: <History className="w-10 h-10 text-accent" />
  },
  {
    title: "100% In-House Execution",
    desc: "Direct control over every millimetre. Our artisanal woodwork and technical execution is strictly in-house for superior quality.",
    icon: <Factory className="w-10 h-10 text-accent" />
  },
  {
    title: "Turnkey Excellence",
    desc: "Seamless end-to-end solutions from layout planning and 3D design to final execution and site handover.",
    icon: <PackageCheck className="w-10 h-10 text-accent" />
  }
];

const EdgeSection = () => {
  return (
    <section className="py-12 bg-[#f8fafc]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">The Voomet Edge</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-[#020617]">Built on Precision & Trust</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-slate-100 group"
            >
              <div className="mb-8 p-4 bg-slate-50 rounded-2xl w-fit group-hover:bg-accent group-hover:text-primary transition-colors">
                {feature.icon}
              </div>
              <h4 className="text-2xl font-display font-bold mb-4 text-[#020617]">{feature.title}</h4>
              <p className="text-slate-500 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EdgeSection;
