import React from "react";
import SectionWave from "@/components/ui/SectionWave";

interface WhyChooseUsProps {
  title: string;
  cards: { icon: React.ReactNode; heading: string; copy: string }[];
}

const WhyChooseUs = ({ title, cards }: WhyChooseUsProps) => {
  return (
    <section className="py-16 md:py-24 bg-[#f8fafc] border-t border-slate-200">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between w-full max-w-[1440px] mx-auto px-6 md:px-12 mb-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-neutral-300"></span>
            <span className="text-[11px] text-neutral-500 uppercase tracking-[0.35em] font-sans">Why Partner With Us</span>
          </div>
          <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[0.95] text-neutral-900 flex flex-wrap items-center">
            {title}<SectionWave />
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1440px] mx-auto px-6 md:px-12">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden bg-white/80 rounded-2xl border border-neutral-200/70 p-8 shadow-sm group hover:border-neutral-400 transition-all duration-500 h-full"
          >
            <img loading="lazy" decoding="async" 
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000" 
              alt="Blueprint Texture" 
              className="absolute inset-0 w-full h-full object-cover opacity-[0.04] mix-blend-multiply pointer-events-none grayscale transition-transform duration-700 group-hover:scale-105" 
            />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-8 p-4 bg-slate-50 rounded-2xl w-fit group-hover:bg-[#324A61] [&_svg]:group-hover:text-white transition-colors border border-slate-100 group-hover:border-transparent text-neutral-600">
                {card.icon}
              </div>
              <h4 className="text-card mb-4 text-neutral-900 text-lg md:text-xl font-semibold">{card.heading}</h4>
              <p className="text-neutral-600 leading-relaxed font-normal text-sm md:text-base mt-auto">
                {card.copy}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
