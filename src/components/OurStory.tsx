"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

export default function OurStory() {
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
                    alt="VoometDesign Excellence Award"
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
                <div className="flex flex-col h-full justify-between">

                  <div>
                    {/* Narrative Description */}
                    <div className="text-[16px] md:text-[17px] font-[300] leading-[1.85] text-slate-600 mb-6">
                      <p>
                        VoometDesign is a Bangalore-based turnkey interior design and fenestration studio, delivering residential and hospitality interior solutions along with aluminium/facade systems and custom furniture. Established in 2010, projects are managed end-to-end by a single team — from design through execution — with residential projects typically completed in around 45 days.
                      </p>
                    </div>

                    {/* Bullet Points */}
                    <div className="pt-2">
                      <ul className="space-y-2.5">
                        {[
                          "Established 2010 — 250+ Projects Delivered",
                          "Single-Point Turnkey Management: Design through site handover",
                          "Speed & Reliability: Residential projects completed in ~45 days from execution start",
                          "Comprehensive Solutions: Residential, hospitality & architectural systems",
                          "In-House End-to-End Execution",
                          "3D Design & Material Visualization Before Execution",
                          "On-Time Delivery with Quality Assurance",
                          "Geographic Coverage: Pan-India Execution",
                        ].map((text, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-700 text-[14px] md:text-[15px] font-[500] leading-snug">
                            <Check className="w-4 h-4 text-[#0B1B44] opacity-80 shrink-0 mt-0.5" strokeWidth={2.5} />
                            <span>{text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* View More Link */}
                  <div className="mt-8 flex justify-end">
                    <Link 
                      href="/about" 
                      className="inline-flex items-center gap-1.5 text-[#0B1B44] font-[600] text-[15px] transition-all duration-300 hover:opacity-70 group"
                    >
                      View More <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>

                </div>
              </motion.div>
            </div>

          </div>

      </div>
    </section>
  );
}
