// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";
import { motion } from "framer-motion";

const accreditations = [
  "ISO 9001:2015 QUALITY COMPLIANT",
  "CLASS-A FIRE-RETARDANT SPECIFICATIONS",
  "ECO-FRIENDLY LOW-VOC EMISSION"
];

const AccreditationsRibbon = () => {
  return (
    <section className="w-full bg-[#020617] text-white py-4 md:py-8 overflow-hidden border-y border-slate-800 relative shadow-xl">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-full bg-[#020617]/5 blur-3xl -z-0"></div>
      
      {/* Animated Marquee (All Devices) */}
      <div className="relative z-10 flex overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap items-center"
        >
          {[...accreditations, ...accreditations, ...accreditations, ...accreditations, ...accreditations].map((acc, index) => (
            <div key={index} className="flex items-center">
              <span className="text-[10px] md:text-sm lg:text-base font-black tracking-[0.2em] text-slate-200 uppercase px-4 md:px-8">
                {acc}
              </span>
              <span className="text-slate-500 opacity-50 px-2 md:px-4">✦</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AccreditationsRibbon;
