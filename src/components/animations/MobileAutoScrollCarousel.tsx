"use client";

import React, { useRef, useState, useEffect } from "react";

export default function MobileAutoScrollCarousel({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    
    let animationFrameId: number;
    let lastTime = performance.now();
    
    const scrollStep = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      
      const scrollContainer = scrollRef.current;
      if (scrollContainer && !isPaused) {
        // Pixel-perfect slow scroll (approx 30px per second)
        scrollContainer.scrollLeft += (30 * delta) / 1000;
        
        // Pause at the end (prevent looping infinitely, user can swipe manually)
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth - 1) {
          return;
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, isMobile]);

  return (
    <div
      ref={scrollRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => {
        setTimeout(() => setIsPaused(false), 1500);
      }}
      className={`flex overflow-x-auto snap-x snap-mandatory md:grid hide-scrollbar pb-4 md:pb-0 px-6 md:px-0 -mx-6 md:mx-0 ${className}`}
    >
      {children}
    </div>
  );
}
