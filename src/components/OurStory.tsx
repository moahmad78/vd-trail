"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function OurStory() {
  return (
    <section className="w-full bg-[#FAFAF8] py-16 lg:py-20 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Premium Card Wrapper */}
        <div className="bg-white rounded-[32px] border border-[#E5E7EB] shadow-[0_10px_40px_rgba(15,23,42,0.04)] px-12 lg:px-16 py-14">
          <div className="grid lg:grid-cols-2 gap-14 items-stretch">
            
            {/* Left Column */}
            <div className="h-full flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-[12px] md:text-[13px] font-bold tracking-[0.2em] uppercase text-[#6E7D9B] mb-6 block">
                  OUR STORY
                </span>
                <h2 className="text-[#071633] text-[clamp(36px,3.5vw,52px)] font-[700] leading-[0.95] tracking-[-0.04em] max-w-[420px] mb-8">
                  Designing Spaces.<br />
                  Building Trust.
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[460px] mt-auto"
              >
                <div className="relative w-full rounded-[20px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-white aspect-[4/3]">
                  <Image
                    src="/assets/pages/about/award.png"
                    alt="Voomet Design Excellence Award"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 460px"
                  />
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="h-full flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col pt-2 lg:pt-0"
              >
                <div>
                  <h3 className="text-[24px] md:text-[28px] font-semibold text-[#071633] mb-6">About Us</h3>
                  <div className="text-[17px] font-[300] leading-[1.9] text-slate-600 space-y-6">
                    <p>
                      Established in 2010, Voomet has built a reputation for delivering exceptional turnkey solutions driven by quality, innovation, and uncompromising craftsmanship.
                    </p>
                    <p>
                      Voomet Design was later launched as our premium interior division, specializing in luxury residences and hospitality environments.
                    </p>
                    <p>
                      We craft sophisticated spaces that elevate everyday living and stand the test of time.
                    </p>
                  </div>
                </div>

                <div className="mt-8 lg:mt-10">
                  <Link 
                    href="/about" 
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#0B1B44] text-[#0B1B44] font-medium transition-all duration-300 hover:bg-[#0B1B44] hover:text-white"
                  >
                    Read Full Story <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
