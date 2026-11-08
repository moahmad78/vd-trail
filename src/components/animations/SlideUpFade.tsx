"use client";

import React from "react";

interface SlideUpFadeProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

// Lightweight wrapper that never blocks initial SSR visibility (prevents blank white screens)
export default function SlideUpFade({ children, className = "" }: SlideUpFadeProps) {
  return (
    <div className={`relative w-full ${className}`}>
      {children}
    </div>
  );
}
