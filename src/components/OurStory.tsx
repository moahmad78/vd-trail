"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Check, ChevronDown } from "lucide-react";

export default function OurStory() {
  const [isOpen, setIsOpen] = useState(false);

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

                  {/* Core Story Paragraphs (Kept Unchanged) */}
                  <div className="text-[17px] font-[300] leading-[1.9] text-slate-600">
                    <p className="mb-4">
                      Established in 2010, Voomet has built a reputation for delivering exceptional turnkey solutions driven by quality, innovation, and uncompromising craftsmanship.
                    </p>
                    <p className="mb-4">
                      Voomet Design was later launched as our premium interior division, specializing in luxury residences and hospitality environments.
                    </p>
                    <p>
                      We craft sophisticated spaces that elevate everyday living and stand the test of time.
                    </p>
                  </div>

                  {/* Accordion Trigger (Replaces old bullet lists) */}
                  <div className="mt-6 pt-5 border-t border-slate-200/80">
                    <button
                      type="button"
                      onClick={() => setIsOpen(!isOpen)}
                      className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-3 px-5 py-3 rounded-xl bg-white border border-slate-200/90 shadow-xs text-[#071633] text-[15px] font-[600] hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 group focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <span>Learn more about VOOMET</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${
                          isOpen ? "transform rotate-180 text-[#071633]" : ""
                        }`}
                      />
                    </button>

                    {/* SEO/AEO-Optimized Accordion Panel: Stays in DOM, animated via max-height */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isOpen
                          ? "max-h-[800px] opacity-100 mt-4"
                          : "max-h-0 opacity-0 pointer-events-none"
                      }`}
                    >
                      <div className="p-6 rounded-2xl bg-white/95 border border-slate-200/90 shadow-sm space-y-4 text-slate-700">
                        <h3 className="text-base md:text-lg font-bold text-[#071633] tracking-tight">
                          About VOOMET DESIGN
                        </h3>

                        <p className="text-[15px] leading-relaxed text-slate-600 font-normal">
                          VOOMET DESIGN is a Bangalore-based turnkey interior design and fenestration studio, delivering residential and hospitality interior solutions along with aluminium/facade systems and custom furniture. Established in 2010, projects are managed end-to-end by a single team — from design through execution — with residential projects typically completed in around 45 days.
                        </p>

                        <ul className="space-y-2.5 pt-2 border-t border-slate-100 text-[14px] md:text-[15px] text-slate-700 font-medium">
                          {[
                            "Established 2010 — 250+ Projects Delivered",
                            "Single-Point Turnkey Management: Design through site handover",
                            "Speed & Reliability: Residential projects completed in ~45 days from execution start",
                            "Comprehensive Solutions: Residential, hospitality & architectural systems",
                            "In-House End-to-End Execution",
                            "3D Design & Material Visualization Before Execution",
                            "On-Time Delivery with Quality Assurance",
                            "Geographic Coverage: Pan-India Execution",
                          ].map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <Check className="w-4 h-4 text-[#0B1B44] opacity-90 shrink-0 mt-1" strokeWidth={2.5} />
                              <span className="leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
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
