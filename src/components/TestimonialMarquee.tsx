// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Arvind Kumar",
    role: "Director, City Hospital",
    text: "VoometDesign transformed our diagnostic wing with technical precision. The medical-grade finishes are exceptional.",
  },
  {
    name: "Vikram Sethi",
    role: "CEO, Nexa Group",
    text: "Their turnkey approach saved us months. The bespoke woodwork in our executive suites is a conversation starter.",
  },
  {
    name: "Mrs. Meera Reddy",
    role: "Luxury Homeowner",
    text: "The artisanal detail in our villa is breathtaking. They truly design spaces that define lifestyles.",
  },
  {
    name: "Prof. S. Sharma",
    role: "Principal, Global School",
    text: "Institution innovation starts with design. VoometDesign delivered an agile campus that exceeds our vision.",
  },
];

const TestimonialMarquee = () => {
  return (
    <section className="py-6 md:py-12 bg-[#020617] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#020617]/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 md:px-6 mb-6 md:mb-12">
        <div className="border-l-4 border-slate-300 pl-4 md:pl-6">
          <h2 className="text-[10px] md:text-xs mb-1 md:mb-2 block font-black uppercase tracking-tight text-white">
            Social Proof
          </h2>
          <h3 className="text-lg md:text-3xl font-black uppercase tracking-wide text-white">
            Trusted by Industry Leaders
          </h3>
        </div>
      </div>
      <div className="flex overflow-hidden relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-4 md:gap-8 whitespace-nowrap py-4 md:py-10"
        >
          {[...testimonials, ...testimonials].map((t, idx) => (
            <div
              key={idx}
              className="w-[80vw] md:w-[400px] bg-white/5 border border-white/10 p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] shrink-0 group hover:bg-white/10 transition-all shadow-2xl"
            >
              <Quote className="text-slate-400 mb-4 md:mb-6 opacity-40 w-6 h-6 md:w-8 md:h-8" />
              <p className="mb-6 md:mb-8 whitespace-normal italic text-slate-300 leading-relaxed font-normal text-sm md:text-base">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#020617]/20 flex items-center justify-center text-slate-400 font-bold text-sm md:text-base">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="text-sm md:text-lg font-black uppercase tracking-wide text-white">
                    {t.name}
                  </h4>
                  <p className="text-[#324A61] text-[10px] md:text-xs font-black uppercase block">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialMarquee;
