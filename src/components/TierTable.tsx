// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";
import SectionWave from "@/components/ui/SectionWave";
import { motion } from "framer-motion";
import Link from "next/link";
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
    <section className="py-24 bg-white overflow-hidden">
      <div className="site-container">
        {/* ── Section Heading — TARGET 2: Material Comparison ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between w-full gap-4 md:gap-8 mb-12 border-b border-transparent">
          <div>
            <h2 className="text-section text-xs mb-2 block text-2xl md:text-3xl leading-[0.95] text-neutral-900 flex flex-wrap items-center">
              Material{" "}<span className="italic font-light inline-flex items-center">Comparison<SectionWave /></span>
            </h2>
            <h3 className="text-card text-[#0f172a] text-base md:text-base lg:text-lg leading-snug text-neutral-900">
              Standard vs Medium <span className="italic font-light">vs Luxury</span>
            </h3>
          </div>
        </div>

        <div className="max-w-6xl mx-auto overflow-x-auto pb-8">
          <div className="min-w-[768px]">
            {/* Header Row */}
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="col-span-1 p-4 flex items-center">
                <span className="text-badge text-[#324A61] block mb-3">Feature</span>
              </div>
              <Link href="/contact?tier=standard" className="col-span-1 bg-[#0f172a] p-5 rounded-xl flex flex-col items-center justify-center shadow-lg hover:bg-[#324A61] transition-colors group">
                <span className="text-white font-bold text-base mb-2">Standard</span>
                <span className="text-white/60 text-[10px] uppercase tracking-widest font-semibold group-hover:text-white transition-colors">Select Tier →</span>
              </Link>
              <Link href="/contact?tier=medium" className="col-span-1 bg-[#0f172a] p-5 rounded-xl flex flex-col items-center justify-center shadow-lg ring-2 ring-slate-400 ring-offset-2 hover:bg-[#324A61] transition-colors group">
                <span className="text-white font-bold text-base mb-2">Medium</span>
                <span className="text-white/60 text-[10px] uppercase tracking-widest font-semibold group-hover:text-white transition-colors">Select Tier →</span>
              </Link>
              <Link href="/contact?tier=luxury" className="col-span-1 bg-[#0f172a] p-5 rounded-xl flex flex-col items-center justify-center shadow-lg hover:bg-[#324A61] transition-colors group">
                <span className="text-white font-bold text-base mb-2">Luxury</span>
                <span className="text-white/60 text-[10px] uppercase tracking-widest font-semibold group-hover:text-white transition-colors">Select Tier →</span>
              </Link>
            </div>

            {/* Feature Rows */}
            <div className="flex flex-col gap-2">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-4 gap-4 items-stretch group"
                >
                  <div className="col-span-1 p-4 flex items-center border-b border-slate-100 group-hover:bg-slate-50 transition-colors rounded-xl">
                    <span className="text-base font-semibold text-[#0f172a]">{feature.name}</span>
                  </div>
                  <div className="col-span-1 bg-slate-50 p-4 flex items-center justify-center rounded-xl group-hover:bg-slate-100 transition-colors">
                    <span className="text-base text-[#0f172a] text-center font-medium">
                      {typeof feature.standard === "boolean"
                        ? feature.standard ? <Check size={18} className="text-green-500 mx-auto" /> : <Minus size={18} className="text-slate-300 mx-auto" />
                        : feature.standard}
                    </span>
                  </div>
                  <div className="col-span-1 bg-white/10 p-4 flex items-center justify-center rounded-xl group-hover:bg-[#324A61]/20 transition-colors ring-1 ring-accent/30">
                    <span className="text-base font-bold text-[#0f172a] text-center">
                      {typeof feature.medium === "boolean"
                        ? feature.medium ? <Check size={18} className="text-[#0f172a] mx-auto" /> : <Minus size={18} className="text-slate-400 mx-auto" />
                        : feature.medium}
                    </span>
                  </div>
                  <div className="col-span-1 bg-slate-50 p-4 flex items-center justify-center rounded-xl group-hover:bg-slate-100 transition-colors">
                    <span className="text-base font-bold text-neutral-500 text-center">
                      {typeof feature.luxury === "boolean"
                        ? feature.luxury ? <Check size={18} className="text-neutral-500 mx-auto" /> : <Minus size={18} className="text-slate-300 mx-auto" />
                        : feature.luxury}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TierTable;
