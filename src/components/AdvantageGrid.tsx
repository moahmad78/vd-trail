"use client";

import { motion } from "framer-motion";
import { Box, CreditCard, Cpu, MapPin } from "lucide-react";

const advantages = [
  {
    title: "Real-time 3D Visualisation",
    desc: "See your space come to life before the first brick is laid with our advanced rendering engine.",
    icon: <Box className="w-8 h-8 text-accent" />
  },
  {
    title: "Straightforward Pricing",
    desc: "No hidden costs. Detailed breakdowns and transparent material estimates from day one.",
    icon: <CreditCard className="w-8 h-8 text-accent" />
  },
  {
    title: "Tech-driven Execution",
    desc: "Real-time project tracking and digital updates from the site, directly to your phone.",
    icon: <Cpu className="w-8 h-8 text-accent" />
  },
  {
    title: "Pan-India Delivery",
    desc: "From the heart of Gorakhpur to the silicon valley of Bangalore, we deliver excellence nationwide.",
    icon: <MapPin className="w-8 h-8 text-accent" />
  }
];

const AdvantageGrid = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">The Voomet Advantage</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-[#020617]">Why Global Brands Trust Us</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((adv, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl border border-slate-100 hover:bg-slate-50 transition-all group"
            >
              <div className="mb-6 p-4 bg-slate-50 rounded-2xl w-fit group-hover:bg-accent group-hover:text-primary transition-colors">
                {adv.icon}
              </div>
              <h4 className="text-xl font-bold mb-4 text-[#020617]">{adv.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                {adv.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantageGrid;
