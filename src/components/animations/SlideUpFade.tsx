"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SlideUpFadeProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function SlideUpFade({ children, delay = 0, className = "" }: SlideUpFadeProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
