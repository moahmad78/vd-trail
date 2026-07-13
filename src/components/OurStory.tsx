"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight, ArrowUp } from "lucide-react";

export default function OurStory() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="w-full bg-[#FAFAF8] py-10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Editorial Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
            
            {/* Left Column */}
            <div className="flex flex-col h-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-[12px] md:text-[13px] font-bold tracking-[0.2em] uppercase text-[#6E7D9B] mb-2 block">
                  OUR STORY
                </span>
                <h2 className="text-[#071633] text-[clamp(36px,3.5vw,52px)] font-[700] leading-[0.95] tracking-[-0.04em] max-w-[420px] mb-3">
                  Designing Spaces<br />
                  <span className="text-slate-500 font-light">Building Trust</span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[460px] mt-4 lg:mt-6"
              >
                <div className="relative w-full rounded-[20px] overflow-hidden bg-white aspect-[4/3]">
                  <Image
                    src="/assets/pages/about/award.webp"
                    alt="Voomet Design Excellence Award"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 460px"
                  />
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col h-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col h-full pt-2 lg:pt-0"
              >
                <div className="flex flex-col h-full">

                  <div className="text-[17px] font-[300] leading-[1.9] text-slate-600">
                    <p className="mb-4 md:mb-4">
                      Established in 2010, Voomet has built a reputation for delivering exceptional turnkey solutions driven by quality, innovation, and uncompromising craftsmanship.
                    </p>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 md:max-h-[500px] md:opacity-100'
                      }`}
                    >
                      <p className="mb-4">
                        Voomet Design was later launched as our premium interior division, specializing in luxury residences and hospitality environments.
                      </p>
                      <p>
                        We craft sophisticated spaces that elevate everyday living and stand the test of time.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 lg:mt-8">
                    {/* Achievement Stats */}
                    <ul className="space-y-2">
                      {[
                        "Established 2010",
                        "20+ Years of Industry Experience",
                        "250+ Projects Delivered",
                      ].map((text, idx) => (
                        <li key={idx} className="flex items-start gap-3.5 text-slate-700 text-[14px] md:text-[15px] font-[500] leading-snug">
                          <Check className="w-5 h-5 text-[#0B1B44] opacity-80 flex-shrink-0" strokeWidth={2.5} />
                          <span>{text}</span>
                        </li>
                      ))}
                    </ul>

                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isExpanded ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0 md:max-h-[500px] md:opacity-100 md:mt-2'
                      }`}
                    >
                      <ul className="space-y-2">
                        {[
                          "In-House End-to-End Execution",
                          "Complete Turnkey Interior Solutions",
                          "3D Design & Material Visualization Before Execution",
                          "On-Time Delivery with Quality Assurance",
                          "Pan-India Execution"
                        ].map((text, idx) => (
                          <li key={idx} className="flex items-start gap-3.5 text-slate-700 text-[14px] md:text-[15px] font-[500] leading-snug">
                            <Check className="w-5 h-5 text-[#0B1B44] opacity-80 flex-shrink-0" strokeWidth={2.5} />
                            <span>{text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Mobile View More Button */}
                    <div className="mt-5 md:hidden">
                      <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="inline-flex items-center gap-1.5 text-[#0B1B44] font-[600] text-[15px] transition-all duration-300 hover:opacity-70 group"
                      >
                        {isExpanded ? (
                          <>View Less <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1" /></>
                        ) : (
                          <>View More <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" /></>
                        )}
                      </button>
                    </div>

                    {/* Desktop View More Link */}
                    <div className="mt-5 hidden md:flex justify-end">
                      <Link 
                        href="/about" 
                        className="inline-flex items-center gap-1.5 text-[#0B1B44] font-[600] text-[15px] transition-all duration-300 hover:opacity-70 group"
                      >
                        View More <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>

      </div>
    </section>
  );
}
