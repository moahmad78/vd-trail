// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const testimonials = [
  { text: "Working with the team was an absolute pleasure. They translated our vision into a stunning residential design with flawless execution. The entire experience was incredibly smooth and hassle-free from start to finish.", author: "Sahil Sheikh", position: "Residential Project Client", image: "/images/Services-card/residential.webp" },
  { text: "We are beyond thrilled with the high-quality finish of our new villa. They delivered the project right on time, and the spatial layout they designed has completely transformed how we experience our home.", author: "Darshan", position: "Residential Project Client", image: "/images/Services-card/residential.webp" },
  { text: "The aesthetic interior and structural details of our new home are simply breathtaking. The team coordination was excellent throughout the project, ensuring every corner was crafted to perfection.", author: "Inchara", position: "Residential Project Client", image: "/images/Services-card/residential.webp" },
  { text: "They delivered premium execution while remaining incredibly budget-friendly. Their transparency throughout the residential construction and focus on structural reliability gave us complete peace of mind.", author: "Manish", position: "Residential Project Client", image: "/images/Services-card/residential.webp" }
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const handleDotClick = (index: number) => {
    if (index === current) return;
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, isHovered, current]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <section className="py-12 md:py-24 bg-white overflow-hidden">
      <div className="site-container">
        <div 
          className="max-w-4xl mx-auto text-center relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Quote className="w-12 h-12 text-neutral-500 mx-auto mb-8 opacity-50" />
          
          <div className="relative h-[300px] md:h-[200px] flex items-center justify-center group">
            
            <button 
              onClick={prevSlide}
              className="absolute left-0 z-10 p-2 rounded-full text-gray-400 bg-transparent hover:bg-[#08163A] hover:text-white transition-all duration-300 hover:scale-110 hidden md:block opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div 
                key={current} 
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }} 
                transition={{ duration: 0.8, ease: "easeInOut" }} 
                className="absolute inset-0 w-full px-12 md:px-16"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset }) => {
                  if (offset.x < -50) {
                    nextSlide();
                  } else if (offset.x > 50) {
                    prevSlide();
                  }
                }}
              >
                <p className="text-[#0f172a] mb-8 italic text-slate-300 leading-relaxed font-normal text-body">"{testimonials[current].text}" </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden grayscale relative">
                    <Image fill src={testimonials[current].image} alt={testimonials[current].author} className="w-full h-full object-cover" sizes="48px" />
                  </div>
                  <div className="text-left">
                    <p className="font-normal text-[#0f172a]">{testimonials[current].author}</p>
                    <p className="text-[#324A61] text-small block">{testimonials[current].position}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <button 
              onClick={nextSlide}
              className="absolute right-0 z-10 p-2 rounded-full text-gray-400 bg-transparent hover:bg-[#08163A] hover:text-white transition-all duration-300 hover:scale-110 hidden md:block opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex justify-center gap-2 mt-8 items-center h-2"> 
            {testimonials.map((_, i) => ( 
              <button 
                key={i} 
                onClick={() => handleDotClick(i)} 
                aria-label={`Go to slide ${i + 1}`} 
                className="relative flex items-center justify-center p-1"
              >
                {current === i ? (
                  <div className="w-8 h-1.5 bg-gray-200 rounded-full overflow-hidden relative">
                    <motion.div 
                      className="absolute top-0 left-0 bottom-0 bg-[#0f172a]"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ 
                        duration: 5, 
                        ease: "linear"
                      }}
                      style={{ animationPlayState: isHovered ? "paused" : "running" }}
                    />
                  </div>
                ) : (
                  <div className="w-1.5 h-1.5 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors" />
                )}
              </button> 
            ))} 
          </div>
        </div>
      </div>
    </section>
  ); 
}; 
export default TestimonialSlider;
