"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, Banknote, Clock } from "lucide-react";

const items = [
  {
    title: "In-House Fabrication",
    desc: "We don't outsource. Our aluminium and wood fabrication is done in-house, ensuring 100% quality control.",
    icon: <Zap className="w-6 h-6 text-accent" />
  },
  {
    title: "20% Cost Saving",
    desc: "By combining interiors and aluminium fabrication under one roof, we save you up to 20% on total project costs.",
    icon: <Banknote className="w-6 h-6 text-accent" />
  },
  {
    title: "Precision Engineering",
    desc: "Our systems are manufactured with medical-grade accuracy, ensuring durability and noise cancellation.",
    icon: <ShieldCheck className="w-6 h-6 text-accent" />
  },
  {
    title: "Time Efficiency",
    desc: "Unified project management means your project is delivered 30% faster than traditional multi-vendor setups.",
    icon: <Clock className="w-6 h-6 text-accent" />
  }
];

const VoometDifference = () => {
  return (
    <section className="py-24 bg-[#020617] text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">The Voomet Advantage</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold">Why Choose Us?</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="mb-6">{item.icon}</div>
              <h4 className="text-xl font-bold mb-4">{item.title}</h4>
              <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VoometDifference;
