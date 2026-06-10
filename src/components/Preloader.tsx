"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide the loader after 1.5 seconds to ensure smooth transition
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        loading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none -translate-y-4"
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Logo */}
        <div className="relative w-48 h-12 md:w-56 md:h-14 mb-6">
          <Image
            src="/logo/logo.png"
            alt="VoometDesign"
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </div>

        {/* Tagline */}
        <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[#0B1633] overflow-hidden">
          <span className="block animate-[slideUp_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] opacity-0 translate-y-4">
            Designing Spaces. <span className="text-[#6E7D9B]">Defining Lifestyles.</span>
          </span>
        </p>

        {/* CSS for inner animation */}
        <style jsx>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(16px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
