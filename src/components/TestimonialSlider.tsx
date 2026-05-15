"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "Voomet Design transformed our hospital lobby into a space that feels both professional and welcoming. Their attention to hygiene standards is unmatched.",
    author: "Dr. Rajesh Kumar",
    position: "Director, City Hospital",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200"
  },
  {
    text: "The precision in their aluminium fabrication is incredible. Our office windows are perfectly sound-insulated, making a huge difference in productivity.",
    author: "Sanjay Mehta",
    position: "CEO, TechFlow Solutions",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200"
  },
  {
    text: "From layout to the final polish, Voomet handled everything with absolute professionalism. Our villa looks like a masterpiece.",
    author: "Ananya Iyer",
    position: "Luxury Home Owner",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
  }
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Quote className="w-12 h-12 text-accent mx-auto mb-8 opacity-50" />
          
          <div className="relative h-[300px] md:h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <p className="text-2xl md:text-3xl font-display font-medium text-[#020617] leading-relaxed mb-8 italic">
                  "{testimonials[current].text}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden grayscale">
                    <img src={testimonials[current].image} alt={testimonials[current].author} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-[#020617]">{testimonials[current].author}</p>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{testimonials[current].position}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${current === i ? "w-8 bg-accent" : "bg-gray-200"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
