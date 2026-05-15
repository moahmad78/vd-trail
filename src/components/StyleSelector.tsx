"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Standard",
    price: "Optimized Budget",
    description: "Quality meets affordability. Perfect for startups and initial office setups.",
    features: ["Standard Finishes", "Essential Layout", "Durable Materials", "1 Year Warranty"],
    color: "bg-slate-50 text-primary"
  },
  {
    name: "Medium",
    price: "Value for Money",
    description: "Premium feel without the luxury price tag. Ideal for growing businesses.",
    features: ["Premium Finishes", "Custom Space Planning", "Imported Hardware", "3 Years Warranty"],
    color: "bg-[#020617] text-white",
    popular: true
  },
  {
    name: "Luxury",
    price: "Bespoke Excellence",
    description: "The ultimate signature design. Handcrafted details for high-end properties.",
    features: ["Artisanal Finishes", "Smart Home Integration", "Italian Marble/Veneers", "Lifetime Support"],
    color: "bg-accent text-primary"
  }
];

const StyleSelector = () => {
  const [selected, setSelected] = useState(1);

  return (
    <section className="py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Choose Your Style</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-[#020617]">Luxury in Every Budget</h3>
          <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
            At Voomet, we believe every client deserves high-quality craftsmanship. Choose the tier that best fits your vision and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelected(index)}
              className={`cursor-pointer rounded-[2.5rem] p-10 transition-all duration-500 flex flex-col relative ${tier.color} ${selected === index ? "ring-4 ring-accent/20 scale-105 shadow-2xl" : "opacity-60 scale-95"}`}
            >
              {tier.popular && (
                <span className="absolute top-0 right-10 -translate-y-1/2 bg-accent text-primary text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">Most Popular</span>
              )}
              <h4 className="text-sm font-bold uppercase tracking-widest mb-2 opacity-70">{tier.name}</h4>
              <p className="text-2xl font-bold mb-6">{tier.price}</p>
              <p className="text-sm mb-8 opacity-80 leading-relaxed">{tier.description}</p>
              
              <ul className="space-y-4 mb-10 flex-grow">
                {tier.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3 text-sm font-semibold">
                    <Check size={18} className="flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all ${selected === index ? "bg-accent text-primary" : "bg-white/10 border border-current"}`}>
                Select This Style
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StyleSelector;
