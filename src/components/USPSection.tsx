"use client";

import { motion } from "framer-motion";

const USPSection = () => {
  return (
    <section className="py-12 md:py-16 bg-white border-b border-[rgba(11,22,53,0.05)]">
      <div className="site-container w-full flex flex-col items-start">
        
        {/* Section Label */}
        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.24em] text-[#6E7D9B] mb-3 block text-left w-full"
        >
          OUR ADVANTAGE
        </motion.span>
        
        {/* Main Heading */}
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[32px] md:text-[42px] font-bold text-[#0B1633] leading-[1.1] tracking-tight mb-8 md:mb-12 text-left w-full"
        >
          WHY VOOMETDESIGN
        </motion.h2>
        
        {/* USP Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="w-full border-t border-b border-[rgba(11,22,53,0.08)] py-8 md:py-12"
        >
          <div className="grid grid-cols-2 lg:flex lg:flex-row lg:justify-between lg:items-center w-full lg:divide-x lg:divide-[rgba(11,22,53,0.08)] gap-y-10 lg:gap-y-0">
            
            <div className="flex flex-col items-start px-2 lg:px-8 xl:px-12 group cursor-default transition-transform duration-300 lg:pl-0">
              <span className="text-[36px] md:text-[46px] font-[700] text-[#0B1633] leading-none mb-2 md:mb-3 tracking-tight flex items-center h-[40px] md:h-[50px]">20+</span>
              <span className="text-[11px] md:text-[12px] font-[600] tracking-[0.15em] uppercase text-[#6E7D9B] leading-[1.6] text-left">Years<br className="hidden md:block"/> Experience</span>
            </div>
            
            <div className="flex flex-col items-start px-2 lg:px-8 xl:px-12 group cursor-default transition-transform duration-300">
              <span className="text-[36px] md:text-[46px] font-[700] text-[#0B1633] leading-none mb-2 md:mb-3 tracking-tight flex items-center h-[40px] md:h-[50px]">300+</span>
              <span className="text-[11px] md:text-[12px] font-[600] tracking-[0.15em] uppercase text-[#6E7D9B] leading-[1.6] text-left">Projects<br className="hidden md:block"/> Delivered</span>
            </div>
            
            <div className="flex flex-col items-start px-2 lg:px-8 xl:px-12 group cursor-default transition-transform duration-300">
              <span className="text-[20px] md:text-[24px] lg:text-[28px] font-[700] text-[#0B1633] leading-none mb-2 md:mb-3 tracking-tight uppercase flex items-center h-[40px] md:h-[50px]">Pan-India</span>
              <span className="text-[11px] md:text-[12px] font-[600] tracking-[0.15em] uppercase text-[#6E7D9B] leading-[1.6] text-left">Service</span>
            </div>
            
            <div className="flex flex-col items-start px-2 lg:px-8 xl:px-12 group cursor-default transition-transform duration-300">
              <span className="text-[20px] md:text-[24px] lg:text-[28px] font-[700] text-[#0B1633] leading-none mb-2 md:mb-3 tracking-tight uppercase flex items-center h-[40px] md:h-[50px]">End-to-End</span>
              <span className="text-[11px] md:text-[12px] font-[600] tracking-[0.15em] uppercase text-[#6E7D9B] leading-[1.6] text-left">Execution</span>
            </div>
            
            <div className="col-span-2 lg:col-span-1 flex flex-col items-start px-2 lg:px-8 xl:px-12 group cursor-default transition-transform duration-300 pt-2 lg:pt-0 lg:pr-0">
              <span className="text-[20px] md:text-[24px] lg:text-[28px] font-[700] text-[#0B1633] leading-none mb-2 md:mb-3 tracking-tight uppercase flex items-center h-[40px] md:h-[50px]">Dedicated</span>
              <span className="text-[11px] md:text-[12px] font-[600] tracking-[0.15em] uppercase text-[#6E7D9B] leading-[1.6] text-left">Project<br className="hidden md:block"/> Management</span>
            </div>

          </div>
        </motion.div>
        
      </div>
    </section>
  );
};

export default USPSection;
