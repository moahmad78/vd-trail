"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FeatureBlock {
  heading: string;
  copy: string;
  chip: string;
}

export default function ServiceFeatureAccordion({ blocks }: { blocks: FeatureBlock[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {/* Desktop view: Vertically stacked (unchanged) */}
      <div className="hidden md:block space-y-8">
        {blocks.map((block, idx) => (
          <div
            key={block.heading}
            className={`pl-4 border-l-2 ${idx === 0 ? "border-slate-900" : "border-slate-300"}`}
          >
            <h3 className="text-[#0f172a] text-h6 font-bold uppercase tracking-wider mb-2">
              {block.heading}
            </h3>
            <p className="text-slate-600 leading-relaxed text-small">{block.copy}</p>
            <span className="inline-block mt-3 text-caption font-bold tracking-[0.15em] uppercase text-slate-400 border border-slate-200 rounded px-2 py-0.5">
              {block.chip}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile view: Premium Accordion */}
      <div className="md:hidden flex flex-col space-y-3">
        {blocks.map((block, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={block.heading}
              className={`border rounded-xl transition-colors duration-300 overflow-hidden ${
                isOpen ? "bg-slate-50 border-slate-300" : "bg-white border-slate-200"
              }`}
            >
              <button
                type="button"
                className="w-full flex items-center justify-between p-4 text-left"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
              >
                <div className="flex flex-col gap-1">
                  <h3 className="text-[#0f172a] text-[14px] font-bold uppercase tracking-wider">
                    {block.heading}
                  </h3>
                  {!isOpen && (
                    <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-400 truncate">
                      {block.chip}
                    </span>
                  )}
                </div>
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full transition-transform duration-300 bg-slate-100 shrink-0 ml-4 ${
                    isOpen ? "rotate-180 bg-slate-200" : ""
                  }`}
                >
                  <ChevronDown size={16} className="text-slate-600" />
                </div>
              </button>
              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-4 pb-4 pt-1">
                      <p className="text-slate-600 leading-relaxed text-[13px] mb-3">
                        {block.copy}
                      </p>
                      <span className="inline-block text-[10px] font-bold tracking-[0.15em] uppercase text-slate-500 border border-slate-200 rounded px-2 py-1 bg-white shadow-sm">
                        {block.chip}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </>
  );
}
