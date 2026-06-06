// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";
import { Box, CreditCard, Cpu, MapPin } from "lucide-react";
import StaggerGrid from "./animations/StaggerGrid";
import SlideUpFade from "./animations/SlideUpFade";
import SectionWave from "@/components/ui/SectionWave";

const advantages = [
  {
    title: "Real-time 3D Visualisation",
    desc: "See your space come to life before the first brick is laid with our advanced rendering engine.",
    icon: <Box className="w-8 h-8 text-neutral-500" />
  },
  {
    title: "Straightforward Pricing",
    desc: "No hidden costs. Detailed breakdowns and transparent material estimates from day one.",
    icon: <CreditCard className="w-8 h-8 text-neutral-500" />
  },
  {
    title: "Tech-driven Execution",
    desc: "Real-time project tracking and digital updates from the site, directly to your phone.",
    icon: <Cpu className="w-8 h-8 text-neutral-500" />
  },
  {
    title: "Pan-India Delivery",
    desc: "From the heart of Gorakhpur to the silicon valley of Bangalore, we deliver excellence nationwide.",
    icon: <MapPin className="w-8 h-8 text-neutral-500" />
  }
];

const AdvantageGrid = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-y border-slate-100">
      <SlideUpFade>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between w-full max-w-[1400px] mx-auto mb-12 px-4 md:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-neutral-300"></span>
              <span className="text-[11px] text-neutral-500 uppercase tracking-[0.35em] font-sans">Global Trust</span>
            </div>
            <h2 className="font-sans text-4xl md:text-6xl font-semibold tracking-[-0.03em] leading-[0.95] text-neutral-900 flex flex-wrap items-center">
              The VoometDesign{" "}<span className="italic font-light inline-flex items-center">Advantage<SectionWave /></span>
            </h2>
          </div>
          <p className="text-sm text-neutral-500 max-w-xs md:text-right font-light leading-relaxed mt-4 md:mt-0">
            Why leading brands and property owners trust our turnkey execution ecosystem.
          </p>
        </div>
      </SlideUpFade>

      <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch site-container">
        {advantages.map((adv, index) => (
          <div 
            key={index} 
            className="relative overflow-hidden bg-white/80 rounded-2xl border border-neutral-200/70 p-8 shadow-sm group hover:border-neutral-400 transition-all duration-500 h-full"
          >
            <img loading="lazy" decoding="async" 
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000" 
              alt="Blueprint Texture" 
              className="absolute inset-0 w-full h-full object-cover opacity-[0.04] mix-blend-multiply pointer-events-none grayscale transition-transform duration-700 group-hover:scale-105" 
            />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-6 p-4 bg-slate-50 rounded-2xl w-fit group-hover:bg-[#324A61] [&_svg]:group-hover:text-white transition-colors border border-slate-100 group-hover:border-transparent">
                {adv.icon}
              </div>
              <h4 className="text-card mb-4 text-neutral-900 text-base md:text-lg font-semibold">{adv.title}</h4>
              <p className="text-neutral-600 leading-relaxed font-normal text-sm md:text-base mt-auto">
                {adv.desc}
              </p>
            </div>
          </div>
        ))}
      </StaggerGrid>
    </section>
  );
};

export default AdvantageGrid;
