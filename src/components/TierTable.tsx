"use client";

import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";

const features = [
  { name: "Design Consultations", standard: true, medium: true, luxury: true },
  { name: "2D Space Planning", standard: true, medium: true, luxury: true },
  { name: "3D Photorealistic Renders", standard: false, medium: "3 Shots", luxury: "Unlimited" },
  { name: "Wall Finishes", standard: "Premium Emulsion", medium: "Textured/Veneer", luxury: "Artisanal/Italian" },
  { name: "Flooring", standard: "Vitrified Tiles", medium: "Engineered Wood", luxury: "Italian Marble/Bespoke" },
  { name: "Modular Kitchen", standard: "Standard Laminate", medium: "Anti-scratch Acrylic", luxury: "PU/Glass/Ceramic" },
  { name: "Hardware", standard: "Standard Brands", medium: "Premium Imported", luxury: "Soft-close Designer" },
  { name: "Lighting Design", standard: "Basic LED", medium: "Decorative Layers", luxury: "Smart Automation" },
  { name: "Site Supervision", standard: "Periodic", medium: "Dedicated Supervisor", luxury: "Project Manager" },
  { name: "After Sales Support", standard: "1 Year", medium: "3 Years", luxury: "Lifetime" },
];

const TierTable = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Material Comparison</h2>
          <h3 className="text-4xl font-display font-bold">Standard vs Medium vs Luxury</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th className="py-6 px-4 text-sm font-bold uppercase tracking-wider">Feature</th>
                <th className="py-6 px-4 text-sm font-bold uppercase tracking-wider text-center bg-slate-50/50">Standard</th>
                <th className="py-6 px-4 text-sm font-bold uppercase tracking-wider text-center bg-primary/5 text-primary">Medium</th>
                <th className="py-6 px-4 text-sm font-bold uppercase tracking-wider text-center bg-accent/5 text-accent">Luxury</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, idx) => (
                <motion.tr 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50/30 transition-colors"
                >
                  <td className="py-4 px-4 text-sm font-semibold">{feature.name}</td>
                  <td className="py-4 px-4 text-sm text-center bg-slate-50/30">
                    {typeof feature.standard === "boolean" ? (feature.standard ? <Check size={18} className="mx-auto text-green-500" /> : <Minus size={18} className="mx-auto text-slate-300" />) : feature.standard}
                  </td>
                  <td className="py-4 px-4 text-sm text-center font-bold bg-primary/[0.02]">
                    {typeof feature.medium === "boolean" ? (feature.medium ? <Check size={18} className="mx-auto text-primary" /> : <Minus size={18} className="mx-auto text-slate-300" />) : feature.medium}
                  </td>
                  <td className="py-4 px-4 text-sm text-center font-bold bg-accent/[0.02]">
                    {typeof feature.luxury === "boolean" ? (feature.luxury ? <Check size={18} className="mx-auto text-accent" /> : <Minus size={18} className="mx-auto text-slate-300" />) : feature.luxury}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TierTable;
