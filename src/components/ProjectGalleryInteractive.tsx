"use client";

import React, { useState } from "react";
import Image from "next/image";
import MobileAutoScrollCarousel from "@/components/animations/MobileAutoScrollCarousel";

interface ProjectGalleryProps {
  title: string;
  gallery: string[];
  videoUrl?: string;
  heroImage: string;
}

export default function ProjectGalleryInteractive({
  title,
  gallery,
  videoUrl,
  heroImage
}: ProjectGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>("");

  const openLightbox = (imgSrc: string) => {
    setCurrentImage(imgSrc);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImage("");
  };

  return (
    <div className="flex flex-col space-y-16">
      {/* Project Photos Section (2x2 Grid) */}
      <div>
        <h4 className="text-caption uppercase tracking-widest text-neutral-900 font-bold mb-6 flex items-center gap-2">
          PROJECT PHOTOS
          <span className="flex-1 h-px bg-slate-200 ml-4"></span>
        </h4>

        <MobileAutoScrollCarousel className="md:grid md:grid-cols-2 gap-3 md:gap-4 pb-2">
          {gallery.slice(0, 4).map((imgUrl, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(imgUrl)}
              className="relative aspect-[4/3] rounded-[16px] overflow-hidden group cursor-zoom-in bg-slate-100 shadow-sm border border-slate-200/50 min-w-[85vw] snap-center shrink-0 md:min-w-0"
            >
              <Image
                quality={80}
                src={imgUrl}
                alt={`${title} Gallery image ${idx + 1} by VoometDesign`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#0f172a]/0 group-hover:bg-[#0f172a]/10 transition-colors duration-300 flex items-center justify-center">
                <span className="bg-white/90 backdrop-blur-sm text-neutral-900 text-caption px-3 py-1.5 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                  Expand
                </span>
              </div>
            </div>
          ))}
        </MobileAutoScrollCarousel>
      </div>

      {/* Project Video Section */}
      {videoUrl && (
        <div>
          <h4 className="text-caption uppercase tracking-widest text-neutral-900 font-bold mb-6 flex items-center gap-2">
            PROJECT VIDEO
            <span className="flex-1 h-px bg-slate-200 ml-4"></span>
          </h4>

          <div className="relative w-full h-[250px] md:h-auto md:aspect-video rounded-xl overflow-hidden shadow-lg border border-slate-200 bg-[#0f172a]">
            <video
              controls
              className="w-full h-full object-cover"
              poster={heroImage}
              preload="metadata"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {/* Lightbox Modal Overlay */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] bg-[#0f172a]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/60 hover:text-white transition-colors p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-lg z-10"
            aria-label="Close lightbox"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative w-full max-w-6xl max-h-[85vh] h-[70vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              quality={85}
              src={currentImage}
              alt="Expanded project view"
              fill
              sizes="100vw"
              className="object-contain rounded-md shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
