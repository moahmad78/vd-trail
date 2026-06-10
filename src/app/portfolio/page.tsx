// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Footer from '@/components/Footer';

const ALL_PROJECTS_DATA = [
  { id: '1', slug: 'apps-for-bharat', title: 'Apps for Bharat', location: 'Bangalore', category: 'CORPORATE', summary: 'End-to-end workplace transformation focused on collaboration and innovation.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80', heightClass: 'h-[340px] md:h-[380px]' },
  { id: '2', slug: 'zluri', title: 'Zluri', location: 'Bangalore', category: 'CORPORATE', summary: 'A modern, agile tech office designed for rapid scaling.', image: '/assets/work/filter-grid/zluri.jpg', heightClass: 'h-[320px]' },
  { id: '3', slug: 'qpiai', title: 'QpiAI', location: 'Bangalore', category: 'COMMERCIAL', summary: 'High-tech research facility balancing aesthetics and functionality.', image: '/assets/work/filter-grid/qpiai.jpg', heightClass: 'h-[280px]' },
  { id: '4', slug: 'pw-brigade', title: 'Physics Wallah', location: 'Bangalore', category: 'EDUCATIONAL', summary: 'An inspiring educational campus fostering student engagement.', image: '/assets/work/filter-grid/physics-wallah.jpg', heightClass: 'h-[320px]' },
  { id: '5', slug: 'juego', title: 'Juego', location: 'Bangalore', category: 'HOSPITALITY', summary: 'Vibrant and immersive environments for gaming and tech.', image: '/assets/work/filter-grid/juego.jpg', heightClass: 'h-[280px]' },
  { id: '6', slug: 'orbit', title: 'Orbit', location: 'Bangalore', category: 'HOSPITALITY', summary: 'A luxury dining and lounge experience setting new standards.', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80', heightClass: 'h-[320px]' },
  { id: '7', slug: 'the-little-gym', title: 'The Little Gym', location: 'Bangalore', category: 'EDUCATIONAL', summary: 'Safe, dynamic, and colorful spaces for early childhood development.', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80', heightClass: 'h-[280px]' },
  { id: '8', slug: 'happey', title: 'Happey', location: 'Bangalore', category: 'HOSPITALITY', summary: 'Premium boutique hospitality blending comfort and high-end design.', image: '/assets/work/filter-grid/happey.jpeg', heightClass: 'h-[320px]' }
];

export default function WorkPage() {
  const featuredProject = ALL_PROJECTS_DATA[0];
  const masonryProjects = ALL_PROJECTS_DATA.slice(1);

  return (
    <main className="w-full min-h-screen bg-slate-50 text-[#0f172a] flex flex-col antialiased">
      
      {/* 1. EDITORIAL HEADER */}
      <header className="pt-32 pb-16 px-6 md:px-12 max-w-[1440px] mx-auto w-full">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.1] mb-6">
          Selected <span className="italic font-light text-slate-400">Works.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 font-light max-w-2xl leading-relaxed">
          A curated collection of our finest interior and architectural projects, 
          designed to elevate everyday experiences.
        </p>
      </header>

      {/* 2. FEATURED PROJECT */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto w-full mb-12">
        <Link href={`/work/${featuredProject.slug}`} className="group relative block w-full h-[340px] md:h-[380px] rounded-[2rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700 bg-white">
          <img 
            src={featuredProject.image} 
            alt={featuredProject.title} 
            className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-[1.02] transition-transform duration-[1.5s] ease-out z-0"
          />
          
          {/* Permanent Subtle Gradient for Readability */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

          {/* Hover Dark Overlay Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

          {/* Category Pill */}
          <div className="absolute top-8 right-8 z-20">
            <span className="bg-white/90 backdrop-blur-sm text-[#0f172a] px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-lg">
              {featuredProject.category}
            </span>
          </div>

          {/* Permanent Info (Bottom Left) */}
          <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 w-full flex flex-col justify-end transform transition-transform duration-500 group-hover:-translate-y-4">
            <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-tight mb-2 drop-shadow-md">
              {featuredProject.title}
            </h2>
            <p className="text-slate-200 text-sm md:text-base tracking-wider drop-shadow-sm font-medium">
              {featuredProject.category} • {featuredProject.location}
            </p>
            
            {/* Hover Content Reveals Below */}
            <div className="overflow-hidden mt-4">
              <div className="transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                <div className="flex items-center gap-2 text-white font-semibold tracking-wide uppercase text-xs">
                  Explore Project <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* 3. MASONRY GRID GALLERY */}
      <section className="px-6 md:px-12 max-w-[1440px] mx-auto w-full mb-8">
        <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4">
          {masonryProjects.map((project) => (
            <Link 
              key={project.id} 
              href={`/work/${project.slug}`} 
              className="group relative block w-full rounded-3xl overflow-hidden cursor-pointer break-inside-avoid shadow-sm hover:shadow-2xl transition-all duration-700 bg-white border border-slate-100/50"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className={`w-full object-cover ${project.heightClass} scale-100 group-hover:scale-[1.03] transition-transform duration-[1.5s] ease-out z-0`}
              />
              
              {/* Permanent Readability Gradient */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />

              {/* Smooth Hover Dark Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

              {/* Small Category Pill */}
              <div className="absolute top-6 left-6 z-20">
                <span className="bg-white/90 backdrop-blur-sm text-[#0f172a] px-3 py-1.5 rounded-full text-[9px] font-bold tracking-widest shadow-md">
                  {project.category}
                </span>
              </div>

              {/* Permanent Info & Hover Details */}
              <div className="absolute bottom-0 left-0 p-6 z-20 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="text-2xl font-semibold text-white tracking-tight mb-1 drop-shadow-sm">
                  {project.title}
                </h3>
                <p className="text-slate-300 text-xs tracking-wider drop-shadow-sm mb-0 group-hover:mb-3 transition-all duration-300">
                  {project.category} • {project.location}
                </p>

                {/* Hover Summary & Button */}
                <div className="overflow-hidden">
                  <div className="transform translate-y-full opacity-0 h-0 group-hover:h-auto group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center gap-2 text-white font-semibold tracking-wide uppercase text-[10px]">
                      Explore Project <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. LOAD MORE ACTION */}
      <section className="w-full flex justify-center" style={{ marginTop: '50px', marginBottom: '20px' }}>
        <button className="bg-[#0B1633] text-white px-8 py-3.5 rounded-full font-bold tracking-widest uppercase text-[11px] hover:bg-black transition-all duration-300 shadow-[0_10px_30px_rgba(11,22,51,0.15)] hover:-translate-y-1">
          Load More Projects
        </button>
      </section>
    </main>
  );
}
