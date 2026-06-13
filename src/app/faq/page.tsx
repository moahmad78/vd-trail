// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What types of sectors do you specialize in?",
    answer: "We specialize in high-precision interior design and technical execution for Premium Residential, Hospitality, and Educational sectors."
  },
  {
    question: "Do you provide bespoke woodwork?",
    answer: "Yes, our artisanal finishes and bespoke woodwork are executed in-house to ensure 100% quality control and superior artisanal detail."
  },
  {
    question: "Do you provide turnkey solutions?",
    answer: "Yes, we handle everything from initial 2D/3D design and layout planning to fabrication, on-site technical execution, and final handover."
  },
  {
    question: "Is the initial 3D layout consultation complimentary?",
    answer: "Yes, we offer a turnkey 3D site survey and initial layout plan worth ₹10,000 to help you visualize your project's potential before you commit."
  },
  {
    question: "Do you handle projects outside of Bangalore?",
    answer: "Yes, we provide pan-India services, from the heart of Gorakhpur to the Silicon Valley of Bangalore."
  },
  {
    question: "What materials do you use for high-end interiors?",
    answer: "We use premium materials including Italian marble, high-grade veneers, and in-house customized woodwork to ensure bespoke excellence."
  },
  {
    question: "Can I see a 3D visualization of my project before work starts?",
    answer: "Absolutely. We provide real-time 3D visualizations so you can see your space come to life before the first brick is laid."
  }
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <main className="bg-white min-h-screen">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-32 pb-24">
        <div className="flex flex-col max-w-4xl mx-auto">
          <h2 className="text-caption font-bold text-slate-400 uppercase tracking-widest mb-2 md:mb-4 text-left">VOOMETDESIGN</h2>
          <h3 className="text-h2 font-bold text-[#0f172a] mb-6 md:mb-12 text-left">Frequently Asked <span className="italic font-light">Questions</span></h3>
          
          <div className="space-y-3 md:space-y-5 flex-grow">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-slate-100 rounded-xl md:rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 py-5 md:p-6 md:py-7 text-left bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <span className="font-bold text-[#0f172a] text-h5 pr-4 text-left leading-relaxed tracking-normal">{faq.question}</span>
                  <ChevronDown 
                    className={`text-[#0f172a] flex-shrink-0 transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""}`} 
                    size={20} 
                  />
                </button>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-4 pt-0 md:p-6 md:pt-0 bg-slate-50/50 text-neutral-500 text-body leading-relaxed tracking-normal text-left">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
