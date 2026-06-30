"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projectsData } from '@/data/projectsData';
import { useParams } from 'next/navigation';
import MobileAutoScrollCarousel from "@/components/animations/MobileAutoScrollCarousel";

// --- MOCK DATA: Simulating complete database records for 8 projects ---


export default function ProjectDetailsPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>("");
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [isMaterialsExpanded, setIsMaterialsExpanded] = useState(false);

  // Find the project, or provide a fallback if not found
  const project = projectsData.find((p) => p.id === slug);
  const materialCount = project ? project.specs.materials.split(",").length : 0;

  const openLightbox = (imgSrc: string) => {
    setCurrentImage(imgSrc);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImage("");
  };

  if (!project) {
    return (
      <main className="min-h-screen bg-[#fcfcfc] pt-24 pb-20 flex flex-col items-center justify-center">
        <h1 className="text-h2 font-light text-neutral-800 mb-4">Project Not Found</h1>
        <p className="text-neutral-500 mb-8">The project you are looking for does not exist or has been moved.</p>
        <Link href="/" className="px-6 py-3 bg-[#0f172a] text-white rounded-full text-button font-medium hover:bg-neutral-800 transition-colors">
          Return Home
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fdfdfd] text-neutral-900 pb-24">
      
      {/* 1. HERO BANNER WITH GLASSMORPHISM OVERLAY */}
      <section className="relative w-full h-[50vh] md:h-[70vh] lg:h-[80vh] overflow-hidden bg-[#0f172a]">
        <Image
          quality={85}
      priority
      src={project.heroImage} 
          alt={project.title} 
          fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      
          className="object-cover opacity-90"
        />
        {/* Dark Gradient Vignette for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 via-transparent to-[#0f172a]/20 pointer-events-none"></div>
        
        {/* Glassmorphism Title Overlay */}
        <div className="absolute bottom-6 md:bottom-16 left-1/2 -translate-x-1/2 w-[82%] md:w-auto min-w-[300px]">
          <div className="bg-white/5 md:bg-white/10 backdrop-blur-sm md:backdrop-blur-xl border border-white/10 md:border-white/20 p-5 md:p-8 rounded-[24px] md:rounded-2xl shadow-2xl text-center">
            <p className="text-white/80 text-[10px] md:text-caption uppercase tracking-[0.2em] font-semibold mb-1 md:mb-2">Project Details</p>
            <h1 className="text-[32px] md:text-h1 font-bold text-white tracking-tight line-clamp-2 md:line-clamp-none leading-tight">{project.title}</h1>
            <p className="text-[11px] md:text-[14px] uppercase tracking-[0.2em] font-medium text-white/70 mt-2 md:mt-3">{project.descriptor}</p>
          </div>
        </div>

        {/* Back Navigation Breadcrumb overlayed at top left */}
        <div className="absolute top-20 md:top-24 left-4 md:left-10 z-10">
          <Link href="/portfolio" className="inline-flex items-center gap-1 md:gap-2 text-white/90 hover:text-white text-[10px] md:text-button font-semibold tracking-widest uppercase bg-[#0f172a]/20 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 transition-all hover:bg-[#0f172a]/40">
            &larr; <span className="hidden md:inline">View Our Work</span><span className="md:inline-block hidden"></span><span className="md:hidden">Back to Projects</span>
          </Link>
        </div>
      </section>

      {/* 2. SPLIT-LAYOUT CONTENT AREA */}
      <section className="site-container mx-auto px-4 md:px-8 mt-8 md:mt-24 max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* LHS: PROJECT METADATA & PROFILE */}
          <div className="lg:col-span-5 flex flex-col space-y-10">
            
            {/* Title Block */}
            <div>
              <h2 className="text-h2 font-bold text-neutral-900 uppercase tracking-tight">
                {project.title}
              </h2>
              <h3 className="text-h3 text-neutral-500 font-light mt-1 uppercase tracking-wide">
                {project.descriptor}
              </h3>
            </div>

            {/* Description */}
            <div className="prose prose-neutral">
              <p className={`text-neutral-600 leading-relaxed text-body transition-all duration-300 ${isDescExpanded ? "" : "line-clamp-3 md:line-clamp-none"}`}>
                {project.description}
              </p>
              <button 
                onClick={() => setIsDescExpanded(!isDescExpanded)}
                className="md:hidden mt-2 text-[#0f172a] text-caption font-bold tracking-widest uppercase flex items-center gap-1"
              >
                {isDescExpanded ? "Show Less" : "Read More"}
              </button>
            </div>

            {/* Dynamic Specifications Grid */}
            <div className="grid grid-cols-2 gap-2 md:gap-x-4 md:gap-y-6 md:bg-white md:border md:border-slate-200 md:p-6 md:rounded-2xl md:shadow-sm items-start">
              <div className="bg-white border border-slate-100 rounded-[16px] p-4 md:p-0 md:border-none md:bg-transparent">
                <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Architect</p>
                <p className="text-[12px] md:text-body font-medium text-neutral-800">{project.specs.firm}</p>
              </div>
              <div className="bg-white border border-slate-100 rounded-[16px] p-4 md:p-0 md:border-none md:bg-transparent">
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block mb-1">Designer</span>
                <p className="text-[12px] md:text-body font-medium text-neutral-800 line-clamp-1">{project.specs.leadDesigner}</p>
              </div>
              <div className="bg-white border border-slate-100 rounded-[16px] p-4 md:p-0 md:border-none md:bg-transparent">
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block mb-1">Area</span>
                <p className="text-[12px] md:text-body font-medium text-neutral-800">{project.specs.area.split(" / ")[0]}</p>
              </div>
              <div className="bg-white border border-slate-100 rounded-[16px] p-4 md:p-0 md:border-none md:bg-transparent">
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block mb-1">Materials</span>
                <div className="md:hidden">
                  <p className="text-[12px] font-medium text-neutral-800 transition-all duration-300">
                    {isMaterialsExpanded ? project.specs.materials : `${materialCount} Premium Materials`}
                  </p>
                  <button onClick={() => setIsMaterialsExpanded(!isMaterialsExpanded)} className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mt-1.5 flex items-center gap-1">
                    {isMaterialsExpanded ? "Show Less" : "View All"}
                  </button>
                </div>
                <p className="hidden md:block text-body font-medium text-neutral-800 leading-tight">{project.specs.materials}</p>
              </div>
            </div>

            {/* Features List */}
            <div>
              <h4 className="text-caption uppercase tracking-widest text-neutral-900 font-bold mb-5 flex items-center gap-2">
                <span className="w-4 h-px bg-[#0f172a]"></span>
                Features List
              </h4>
              <ul className="hidden md:block space-y-3">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[15px] text-neutral-600">
                    <svg className="w-4 h-4 text-neutral-400 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle cx="12" cy="12" r="4" fill="currentColor" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <MobileAutoScrollCarousel className="md:hidden flex gap-2 pt-1 pb-2">
                {project.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center min-w-fit snap-start py-2 px-4 bg-slate-50 border border-slate-200 text-slate-800 text-[11px] font-semibold rounded-full tracking-wide shrink-0 shadow-sm"
                  >
                    {feature}
                  </span>
                ))}
              </MobileAutoScrollCarousel>
            </div>

          </div>


          {/* RHS: RICH MEDIA PRESENTATION GRID */}
          <div className="lg:col-span-7 flex flex-col space-y-16">
            
            {/* Project Photos Section (2x2 Grid) */}
            <div>
              <h4 className="text-caption uppercase tracking-widest text-neutral-900 font-bold mb-6 flex items-center gap-2">
                PROJECT PHOTOS
                <span className="flex-1 h-px bg-slate-200 ml-4"></span>
              </h4>
              
              <MobileAutoScrollCarousel className="md:grid md:grid-cols-2 gap-3 md:gap-4 pb-2">
                {project.gallery.slice(0, 4).map((imgUrl, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => openLightbox(imgUrl)}
                    className="relative aspect-[4/3] rounded-[16px] overflow-hidden group cursor-zoom-in bg-slate-100 shadow-sm border border-slate-200/50 min-w-[85vw] snap-center shrink-0 md:min-w-0"
                  >
                    <Image
                      quality={80}
      src={imgUrl} 
                      alt={`${project.title} Gallery ${idx + 1}`} 
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
            <div>
              <h4 className="text-caption uppercase tracking-widest text-neutral-900 font-bold mb-6 flex items-center gap-2">
                PROJECT VIDEO
                <span className="flex-1 h-px bg-slate-200 ml-4"></span>
              </h4>
              
              <div className="relative w-full h-[250px] md:h-auto md:aspect-video rounded-xl overflow-hidden shadow-lg border border-slate-200 bg-[#0f172a]">
                <video 
                  controls 
                  className="w-full h-full object-cover"
                  poster={project.heroImage}
                  preload="metadata"
                >
                  <source src={project.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. LIGHTBOX MODAL OVERLAY */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0f172a]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/60 hover:text-white transition-colors p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-lg"
            aria-label="Close lightbox"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="relative w-full max-w-6xl max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <Image
              quality={85}
      src={currentImage} 
              alt="Expanded view" 
              fill
      sizes="100vw"
      
              className="object-contain rounded-md shadow-2xl"
            />
          </div>
        </div>
      )}

    </main>
  );
}

