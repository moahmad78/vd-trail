// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Projects Delivered", value: 500, suffix: "+" },
  { label: "Years of Legacy", value: 20, suffix: "+" },
  { label: "In-House Fabrication", value: 100, suffix: "%" },
  { label: "Client Satisfaction", value: 98, suffix: "%" },
];

const CountUp = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (inView) {
      motionValue.set(value);
    }
  }, [inView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString();
      }
    });
  }, [springValue]);

  return (
    <span className="inline-flex items-center">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
};

const StatsSection = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Triple the stats for a truly seamless overflow transition
  const duplicatedStats = [...stats, ...stats, ...stats];

  return (
    <div className="w-full bg-white/10 backdrop-blur-md border-t border-white/20 py-10 shadow-2xl overflow-hidden relative">
      <motion.div
        animate={{
          x: ["0%", "-33.333%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            duration: 40, // Slower, professional speed
            ease: "linear",
          },
        }}
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          // Use CSS play state for robust pausing without resetting the animation position
          animationPlayState: isPaused ? "paused" : "running",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex"
      >
        {duplicatedStats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center gap-4 sm:gap-8 mx-6 sm:mx-20 shrink-0"
          >
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white drop-shadow-md">
              <CountUp value={stat.value} suffix={stat.suffix} />
            </h3>
            <p className="text-xs md:text-sm font-black text-white uppercase tracking-[0.2em] drop-shadow-sm whitespace-normal max-w-[120px] leading-tight">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default StatsSection;
