// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";

import { motion } from "framer-motion";

const stats = [
  "500+ Projects Delivered",
  "20+ Years Legacy",
  "99% In-House Fabrication",
  "97% Client Satisfaction"
];

const StatsSection = () => {
  return (
    <div className="bg-[#0f172a] text-white border-y border-white/10 py-5 flex whitespace-nowrap overflow-hidden w-full relative z-30">
      <div className="site-container overflow-hidden w-full">
        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
        >
          {[0, 1].map((set) => (
            <div key={set} className="flex gap-16 md:gap-32 pr-16 md:pr-32 items-center shrink-0">
              {stats.map((stat, idx) => (
                <h3 key={idx} className="font-bold text-lg md:text-xl tracking-widest uppercase text-white/90">
                  {stat}
                </h3>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default StatsSection;
