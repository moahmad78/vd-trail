"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
  className?: string;
}

export default function FAQSection({
  badge = "FAQS",
  title = "Frequently Asked Questions",
  subtitle = "Clear answers on our process, timelines, scope, and pricing.",
  faqs,
  className = "",
}: FAQSectionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className={`py-12 md:py-16 lg:py-20 w-full bg-white text-slate-900 border-t border-slate-100 overflow-hidden ${className}`}>
      {/* Machine-readable FAQPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Header: Single-line alignment on desktop matching website aesthetic */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-12">
          <div className="shrink-0">
            {badge && (
              <span className="text-[12px] md:text-[13px] font-bold tracking-[0.2em] uppercase text-[#6E7D9B] mb-2 block">
                {badge}
              </span>
            )}
            <h2 className="text-[#071633] text-[clamp(28px,3.2vw,44px)] font-[700] leading-[1.1] tracking-[-0.03em] whitespace-normal md:whitespace-nowrap">
              {title}
            </h2>
          </div>
          {subtitle && (
            <div className="pb-1 md:text-right">
              <p className="text-[14px] md:text-[16px] leading-normal text-slate-500 font-[400] whitespace-normal md:whitespace-nowrap">
                {subtitle}
              </p>
            </div>
          )}
        </div>

        {/* Full-width FAQ Accordion List */}
        <div className="w-full space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndices.includes(index);
            return (
              <div
                key={index}
                className={`w-full border rounded-2xl overflow-hidden transition-all duration-200 ${
                  isOpen
                    ? "bg-slate-50/80 border-slate-300 shadow-xs"
                    : "bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/40"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 font-[600] text-[16px] md:text-[18px] text-[#071633] focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="leading-snug pr-4">{faq.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-200 ${
                      isOpen ? "bg-[#071633] text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? "transform rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 md:px-6 md:pb-6 text-slate-600 text-[15px] md:text-[16px] leading-relaxed border-t border-slate-100/90 pt-3.5 font-[400]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
