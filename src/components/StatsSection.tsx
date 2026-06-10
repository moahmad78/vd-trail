// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";

import { motion } from "framer-motion";

const services = [
  "TURNKEY ENGINEERING EXCELLENCE",
  "•",
  "LUXURY CORPORATE SPACES",
  "•",
  "SEAMLESS PROJECT MANAGEMENT",
  "•",
  "PREMIUM RETAIL INFRASTRUCTURE",
  "•",
  "BESPOKE ARCHITECTURAL DESIGN",
  "•",
  "INNOVATIVE SPATIAL PLANNING",
  "•"
];

const StatsSection = () => {
  return (
    <div className="bg-[#0f172a] text-white border-y border-white/10 py-5 flex whitespace-nowrap overflow-hidden w-full relative z-30 pointer-events-none">
      <motion.div
        className="flex w-max transform-gpu will-change-transform backface-hidden"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
      >
        {[0, 1, 2, 3].map((set) => (
          <div key={set} className="flex gap-8 md:gap-16 pr-8 md:pr-16 items-center shrink-0">
            {services.map((service, idx) => (
              <h3 
                key={idx} 
                className={`font-bold tracking-widest uppercase ${
                  service === "•" 
                    ? "text-white/40 text-sm" 
                    : "text-white/90 text-sm md:text-base lg:text-lg drop-shadow-md"
                }`}
              >
                {service}
              </h3>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default StatsSection;
