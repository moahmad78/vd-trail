// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
import React from "react";
import SectionWave from "@/components/ui/SectionWave";

interface WhyChooseUsProps {
  title: string;
  cards: { icon: string; heading: string; copy: string }[];
}

const WhyChooseUs = ({ title, cards }: WhyChooseUsProps) => {
  return (
    <section className="bg-white py-16 md:py-24 border-t border-slate-100">
      <div className="site-container">
        {/* ── Section Heading — TARGET 3: Why Partner Methodology ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between w-full gap-4 md:gap-8 mb-12 border-b border-transparent">
          <div>
            <span className="text-badge text-[#324A61] block mb-3">WHY CHOOSE US</span>
            <h2 className="text-section text-2xl md:text-3xl text-neutral-900 flex flex-wrap items-center">
              {title}<SectionWave />
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="border border-slate-100 p-6 rounded-xl hover:shadow-xl transition-all duration-300 bg-white flex flex-col items-start text-left"
            >
              <span className="text-badge text-3xl mb-4" role="img" aria-label={card.heading}>
                {card.icon}
              </span>
              <h3 className="text-card mb-2 text-base md:text-base lg:text-lg text-neutral-900">
                {card.heading}
              </h3>
              <p className="text-neutral-600 leading-relaxed font-normal text-base md:text-base">
                {card.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
