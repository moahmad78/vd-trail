"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs: FAQItem[];
  className?: string;
}

export default function FAQSection({
  title = "Frequently Asked Questions",
  subtitle = "Clear answers about our design process, turnaround, materials, and turnkey execution.",
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
    <section className={`py-16 md:py-24 bg-white text-slate-900 ${className}`}>
      {/* Machine-readable FAQPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="site-container max-w-4xl mx-auto px-6">
        {title && (
          <div className="text-center mb-12">
            <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-slate-500 block mb-3">
              Direct Answers & Insights
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0f172a] mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndices.includes(index);
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 bg-slate-50/50 hover:border-slate-300"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(index)}
                  className="w-full text-left p-6 md:p-7 flex items-center justify-between gap-4 font-semibold text-lg md:text-xl text-[#0f172a] focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="leading-snug">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-slate-500 transition-transform duration-300 ${
                      isOpen ? "transform rotate-180 text-[#0f172a]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 md:px-7 md:pb-7 text-slate-700 text-base md:text-lg leading-relaxed border-t border-slate-100 pt-4">
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
