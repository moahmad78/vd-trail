"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
}

export default function ImageReveal({ children, className = "" }: ImageRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, clipPath: "inset(10% 0 10% 0)" }}
      animate={
        isInView
          ? { opacity: 1, scale: 1, clipPath: "inset(0% 0 0% 0)" }
          : { opacity: 0, scale: 0.95, clipPath: "inset(10% 0 10% 0)" }
      }
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
