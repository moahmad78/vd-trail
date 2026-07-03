"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ZoomIn, ChevronLeft, ChevronRight, X } from "lucide-react";

const IMAGES = Array.from({ length: 34 }, (_, i) => `/Design/resedential/r${i + 1}.jpeg`);

export default function ResidentialGallery() {
  const [showAll, setShowAll] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Close lightbox on escape key and navigation on arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
        document.body.style.overflow = "";
      document.body.classList.remove("lightbox-open");
        document.body.classList.remove("lightbox-open");
      }
      if (e.key === "ArrowLeft" && lightboxIndex !== null) handlePrev();
      if (e.key === "ArrowRight" && lightboxIndex !== null) handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  const handlePrev = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev === 0 ? IMAGES.length - 1 : prev - 1) : null));
  }, []);

  const handleNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev === IMAGES.length - 1 ? 0 : prev + 1) : null));
  }, []);

  // Body scroll lock when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("lightbox-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("lightbox-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("lightbox-open");
    };
  }, [lightboxIndex]);

  const displayImages = showAll ? IMAGES : IMAGES.slice(0, 6);

  return (
    <section className="w-full py-16 md:py-24 bg-[#FAFAF8] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 mb-12">
        <span className="text-caption font-bold tracking-[0.28em] uppercase text-[#6E7D9B] block mb-3 text-center md:text-left">
          Our Residential Projects
        </span>
        <h2 className="text-[32px] md:text-[42px] font-[700] text-[#0B1633] leading-[1.1] tracking-tight mb-4 text-center md:text-left">
          A glimpse into our finest residential interior transformations
        </h2>
      </div>

      {/* Auto-scroll strip */}
      {!showAll && (
        <div className="w-full overflow-hidden mb-12 relative group">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-4">
            {/* Original array + Duplicate array for infinite scroll */}
            {[...IMAGES, ...IMAGES].map((src, idx) => (
              <div
                key={`strip-${idx}`}
                className="relative h-[200px] w-[300px] flex-shrink-0 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setLightboxIndex(idx % IMAGES.length)}
              >
                <Image
                  src={src}
                  alt={`Residential Interior Design by Voomet Design - r${(idx % IMAGES.length) + 1}`}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="300px"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid Layout */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayImages.map((src, idx) => (
            <div
              key={`grid-${idx}`}
              className="relative aspect-square md:aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer"
              onClick={() => setLightboxIndex(idx)}
            >
              <Image
                src={src}
                alt={`Residential Interior Design by Voomet Design - r${idx + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                loading={idx < 6 ? "eager" : "lazy"}
                priority={idx < 6}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300">
                  <div className="bg-white/90 p-3 rounded-full shadow-lg">
                    <ZoomIn className="w-6 h-6 text-[#0B1633]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-8 py-4 bg-transparent border border-[#0B1633] text-[#0B1633] font-bold text-[14px] uppercase tracking-wider rounded-lg hover:bg-[#0B1633] hover:text-white transition-colors duration-300"
          >
            {showAll ? "View Less" : "View More"}
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed top-0 left-0 w-[100vw] h-[100vh] z-[99999] flex items-center justify-center bg-[rgba(0,0,0,0.97)]">
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2"
            onClick={() => {
              setLightboxIndex(null);
              document.body.style.overflow = '';
              document.body.classList.remove('lightbox-open');
            }}
          >
            <X size={32} />
          </button>
          
          <button
            className="absolute left-4 md:left-8 text-white/70 hover:text-white z-50 p-4"
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          >
            <ChevronLeft size={48} />
          </button>
          
          <button
            className="absolute right-4 md:right-8 text-white/70 hover:text-white z-50 p-4"
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
          >
            <ChevronRight size={48} />
          </button>

          <div 
            className="relative w-[90vw] h-[85vh] max-w-6xl mx-auto"
            onClick={(e) => e.stopPropagation()} 
          >
            <Image
              src={IMAGES[lightboxIndex]}
              alt={`Residential Interior - ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              priority
              sizes="90vw"
            />
          </div>

          <div className="absolute bottom-6 text-white/70 font-medium tracking-widest text-sm">
            {lightboxIndex + 1} / {IMAGES.length}
          </div>
          
          {/* Invisible overlay to close when clicking outside */}
          <div className="absolute inset-0 -z-10" onClick={() => {
              setLightboxIndex(null);
              document.body.style.overflow = '';
              document.body.classList.remove('lightbox-open');
            }} />
        </div>
      )}
    </section>
  );
}
