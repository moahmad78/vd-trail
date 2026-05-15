"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Arvind Kumar",
    role: "Director, City Hospital",
    text: "Voomet transformed our diagnostic wing with technical precision. The medical-grade finishes are exceptional."
  },
  {
    name: "Vikram Sethi",
    role: "CEO, Nexa Group",
    text: "Their turnkey approach saved us months. The bespoke woodwork in our executive suites is a conversation starter."
  },
  {
    name: "Mrs. Meera Reddy",
    role: "Luxury Homeowner",
    text: "The artisanal detail in our villa is breathtaking. They truly design spaces that define lifestyles."
  },
  {
    name: "Prof. S. Sharma",
    role: "Principal, Global School",
    text: "Institution innovation starts with design. Voomet delivered an agile campus that exceeds our vision."
  }
];

const TestimonialMarquee = () => {
  return (
    <section className="py-12 bg-[#020617] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 mb-12">
        <div className="border-l-4 border-accent pl-6">
          <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-2">Social Proof</h2>
          <h3 className="text-4xl font-display font-bold text-white">Trusted by Industry Leaders</h3>
        </div>
      </div>

      <div className="flex overflow-hidden relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 whitespace-nowrap py-10"
        >
          {[...testimonials, ...testimonials].map((t, idx) => (
            <div 
              key={idx} 
              className="w-[400px] bg-white/5 border border-white/10 p-10 rounded-[2.5rem] shrink-0 group hover:bg-white/10 transition-all shadow-2xl"
            >
              <Quote className="text-accent mb-6 opacity-40" size={32} />
              <p className="text-white/80 text-lg leading-relaxed mb-8 whitespace-normal italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{t.name}</h4>
                  <p className="text-accent text-xs uppercase tracking-widest font-bold">{t.role}</p>
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
