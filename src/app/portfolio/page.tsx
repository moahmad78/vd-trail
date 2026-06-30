// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ALL_PROJECTS_DATA = [
  { id: '1', slug: 'apps-for-bharat', title: 'Apps for Bharat', location: 'Bangalore', category: 'CORPORATE', summary: 'End-to-end workplace transformation focused on collaboration and innovation.', image: '/assets/work/filter-grid/apps-for-bharat.png', heightClass: 'h-[340px] md:h-[360px]' }, // Featured
  { id: '2', slug: 'zluri', title: 'Zluri', location: 'Bangalore', category: 'CORPORATE', summary: 'A modern, agile tech office designed for rapid scaling.', image: '/assets/work/filter-grid/zluri.jpg', heightClass: 'h-[320px]' }, // Portrait
  { id: '3', slug: 'qpiai', title: 'QpiAI', location: 'Bangalore', category: 'COMMERCIAL', summary: 'High-tech research facility balancing aesthetics and functionality.', image: '/assets/work/filter-grid/qpiai.jpg', heightClass: 'h-[260px]' }, // Landscape
  { id: '4', slug: 'pw-brigade', title: 'Physics Wallah', location: 'Bangalore', category: 'EDUCATIONAL', summary: 'An inspiring educational campus fostering student engagement.', image: '/assets/work/filter-grid/physics-wallah.jpg', heightClass: 'h-[320px]' }, // Portrait
  { id: '5', slug: 'juego', title: 'Juego', location: 'Bangalore', category: 'HOSPITALITY', summary: 'Vibrant and immersive environments for gaming and tech.', image: '/assets/work/filter-grid/juego.jpg', heightClass: 'h-[280px]' }, // Square
  { id: '6', slug: 'orbit', title: 'Orbit', location: 'Bangalore', category: 'HOSPITALITY', summary: 'A luxury dining and lounge experience setting new standards.', image: '/assets/work/filter-grid/orbit.jpg', heightClass: 'h-[320px]' }, // Portrait
  { id: '7', slug: 'the-little-gym', title: 'The Little Gym', location: 'Bangalore', category: 'EDUCATIONAL', summary: 'Safe, dynamic, and colorful spaces for early childhood development.', image: '/assets/work/filter-grid/littlegym.png', heightClass: 'h-[260px]' }, // Landscape
  { id: '8', slug: 'happey', title: 'Happey', location: 'Bangalore', category: 'HOSPITALITY', summary: 'Premium boutique hospitality blending comfort and high-end design.', image: '/assets/work/filter-grid/happey.jpeg', heightClass: 'h-[320px]' }, // Portrait
  // Additional mock projects for Load More demonstration
  { id: '9', slug: 'tech-hub', title: 'Tech Hub', location: 'Bangalore', category: 'CORPORATE', summary: 'A futuristic tech workspace.', image: '/assets/work/filter-grid/zluri.png', heightClass: 'h-[260px]' }, // Landscape
  { id: '10', slug: 'villa-nova', title: 'Villa Nova', location: 'Bangalore', category: 'RESIDENTIAL', summary: 'Ultra-luxury bespoke villa interiors.', image: '/images/Services-card/residential.png', heightClass: 'h-[320px]' }, // Portrait
  { id: '11', slug: 'grand-hyatt', title: 'Grand Boutique', location: 'Bangalore', category: 'HOSPITALITY', summary: 'Immersive hospitality experience.', image: '/images/Services-card/hotel.png', heightClass: 'h-[280px]' }, // Square
  { id: '12', slug: 'edu-center', title: 'Global Edu Center', location: 'Bangalore', category: 'EDUCATIONAL', summary: 'Modern learning environments.', image: '/images/Services-card/education.jpg', heightClass: 'h-[320px]' }, // Portrait
];

export default function WorkPage() {
  const featuredProject = ALL_PROJECTS_DATA[0];
  const allMasonryProjects = ALL_PROJECTS_DATA.slice(1);
  
  const [visibleCount, setVisibleCount] = useState(7); // Initially show 7 projects
  const [cols, setCols] = useState(3); // Default desktop columns

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setCols(1);
      else if (window.innerWidth < 1024) setCols(2);
      else setCols(3); // 3 adaptive columns on desktop
    };
    
    handleResize(); // Init
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const visibleProjects = allMasonryProjects.slice(0, visibleCount);

  // Intelligent Masonry Layout Calculation with Dense Packing Algorithm
  const columns = useMemo(() => {
    const getEstimatedHeight = (heightClass: string) => {
      const match = heightClass.match(/h-\[(\d+)px\]/);
      return match ? parseInt(match[1]) : 300;
    };

    // 1. Sort by height descending to ensure large blocks are placed first (aids packing)
    const sortedProjects = [...visibleProjects].sort((a, b) => {
      return getEstimatedHeight(b.heightClass) - getEstimatedHeight(a.heightClass);
    });

    const colsArray = Array.from({ length: cols }, () => [] as typeof allMasonryProjects);
    const columnHeights = Array(cols).fill(0);

    // 2. Greedy Initial Allocation
    sortedProjects.forEach((project) => {
      let minHeight = columnHeights[0];
      let minIndex = 0;
      for (let i = 1; i < cols; i++) {
        if (columnHeights[i] < minHeight) {
          minHeight = columnHeights[i];
          minIndex = i;
        }
      }
      colsArray[minIndex].push(project);
      columnHeights[minIndex] += getEstimatedHeight(project.heightClass) + 24; // Including gap
    });

    // 3. Fallback Optimization: Local search to balance the bottom edge dynamically
    if (cols > 1) {
      let improved = true;
      let iterations = 0;
      while (improved && iterations < 50) {
        improved = false;
        iterations++;
        
        let tallest = 0, shortest = 0;
        for (let i = 1; i < cols; i++) {
          if (columnHeights[i] > columnHeights[tallest]) tallest = i;
          if (columnHeights[i] < columnHeights[shortest]) shortest = i;
        }
        
        let diff = columnHeights[tallest] - columnHeights[shortest];
        if (diff <= 80) break; // Reached optimal target threshold (40-80px max diff)

        let bestMove: { type: string, itemIdx?: number, itemIdxT?: number, itemIdxS?: number } | null = null;
        let bestDiff = diff;

        // Attempt Move: Move an item from the tallest column to the shortest
        for (let i = 0; i < colsArray[tallest].length; i++) {
          const item = colsArray[tallest][i];
          const h = getEstimatedHeight(item.heightClass) + 24;
          const newTallest = columnHeights[tallest] - h;
          const newShortest = columnHeights[shortest] + h;
          const newDiff = Math.abs(newTallest - newShortest);
          if (newDiff < bestDiff) {
            bestDiff = newDiff;
            bestMove = { type: 'move', itemIdx: i };
          }
        }

        // Attempt Swap: Swap an item from the tallest with a smaller item from the shortest
        for (let i = 0; i < colsArray[tallest].length; i++) {
          const itemT = colsArray[tallest][i];
          const hT = getEstimatedHeight(itemT.heightClass) + 24;
          for (let j = 0; j < colsArray[shortest].length; j++) {
            const itemS = colsArray[shortest][j];
            const hS = getEstimatedHeight(itemS.heightClass) + 24;
            if (hT > hS) {
              const newTallest = columnHeights[tallest] - hT + hS;
              const newShortest = columnHeights[shortest] - hS + hT;
              const newDiff = Math.abs(newTallest - newShortest);
              if (newDiff < bestDiff) {
                bestDiff = newDiff;
                bestMove = { type: 'swap', itemIdxT: i, itemIdxS: j };
              }
            }
          }
        }

        if (bestMove) {
          if (bestMove.type === 'move') {
            const [item] = colsArray[tallest].splice(bestMove.itemIdx!, 1);
            colsArray[shortest].push(item);
            const h = getEstimatedHeight(item.heightClass) + 24;
            columnHeights[tallest] -= h;
            columnHeights[shortest] += h;
          } else if (bestMove.type === 'swap') {
            const itemT = colsArray[tallest][bestMove.itemIdxT!];
            const itemS = colsArray[shortest][bestMove.itemIdxS!];
            colsArray[tallest][bestMove.itemIdxT!] = itemS;
            colsArray[shortest][bestMove.itemIdxS!] = itemT;
            const hT = getEstimatedHeight(itemT.heightClass) + 24;
            const hS = getEstimatedHeight(itemS.heightClass) + 24;
            columnHeights[tallest] = columnHeights[tallest] - hT + hS;
            columnHeights[shortest] = columnHeights[shortest] - hS + hT;
          }
          improved = true;
        }
      }
    }

    return colsArray;
  }, [visibleProjects, cols]);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, allMasonryProjects.length));
  };

  return (
    <main className="w-full min-h-screen bg-slate-50 text-[#0f172a] flex flex-col antialiased">
      
      {/* 1. EDITORIAL HEADER */}
      <header className="pt-8 pb-4 md:pt-32 md:pb-16 px-6 md:px-12 max-w-[1440px] mx-auto w-full">
        <h1 className="text-[28px] md:text-h1 font-semibold tracking-tight leading-[1.1] mb-2 md:mb-6">
          Selected <span className="italic font-light text-slate-400">Works.</span>
        </h1>
        <p className="text-[14px] md:text-h5 text-slate-500 font-light max-w-2xl leading-relaxed">
          A curated collection of our finest interior and architectural projects.
        </p>
      </header>

      {/* 2. FEATURED PROJECT */}
      <section className="px-4 md:px-12 max-w-[1440px] mx-auto w-full mb-6 md:mb-12">
        <Link href={`/work/${featuredProject.slug}`} className="group relative block w-full h-[190px] md:h-[380px] rounded-[1.25rem] md:rounded-[2rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700 bg-white">
          <Image 
            fill
            src={featuredProject.image} 
            alt={featuredProject.title} 
            className="object-cover scale-100 group-hover:scale-[1.02] transition-transform duration-[1.5s] ease-out z-0"
            sizes="(max-width: 1440px) 100vw, 1440px"
          />
          
          {/* Permanent Subtle Gradient for Readability */}
          <div className="absolute inset-x-0 bottom-0 h-[80%] md:h-2/3 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />

          {/* Hover Dark Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

          {/* Category Pill */}
          <div className="absolute top-4 left-4 md:top-8 md:right-8 md:left-auto z-20">
            <span className="bg-white/90 backdrop-blur-sm text-[#0f172a] px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[8px] md:text-caption font-bold tracking-widest uppercase shadow-lg">
              {featuredProject.category}
            </span>
          </div>

          {/* Permanent Info (Bottom Left) */}
          <div className="absolute bottom-0 left-0 p-5 md:p-12 z-20 w-full flex flex-col justify-end transform transition-transform duration-500 md:group-hover:-translate-y-4">
            <h2 className="text-[18px] md:text-h2 font-semibold text-white tracking-tight mb-1 md:mb-2 drop-shadow-md">
              {featuredProject.title}
            </h2>
            <p className="text-[#B7BDC9] md:text-slate-200 text-[10px] md:text-body tracking-wider drop-shadow-sm font-medium mb-1 md:mb-0">
              {featuredProject.category} • {featuredProject.location}
            </p>
            
            {/* Hover Content Reveals Below */}
            <div className="overflow-hidden md:mt-4">
              <div className="transform md:translate-y-full md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 md:delay-100">
                <div className="flex items-center gap-1.5 md:gap-2 text-white font-bold tracking-wide uppercase text-[8.5px] md:text-small">
                  View Project <ArrowRight size={14} className="transform md:group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* 3. SMART MASONRY GRID GALLERY */}
      <section className="px-4 md:px-12 max-w-[1440px] mx-auto w-full mb-8">
        <div className="flex w-full gap-4 md:gap-6 items-start">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col w-full gap-4 md:gap-6">
              <AnimatePresence>
                {column.map((project) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    key={project.id}
                    className="w-full"
                  >
                    <Link 
                      href={`/work/${project.slug}`} 
                      className="group relative block w-full rounded-[1.25rem] md:rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700 bg-white border border-slate-100/50"
                    >
                      <div className={`relative w-full h-[220px] md:${project.heightClass}`}>
                        <Image 
                          fill
                          src={project.image} 
                          alt={project.title} 
                          className="object-cover scale-100 group-hover:scale-[1.03] transition-transform duration-[1.5s] ease-out z-0"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                      </div>
                      
                      {/* Permanent Readability Gradient */}
                      <div className="absolute inset-x-0 bottom-0 h-[80%] md:h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

                      {/* Smooth Hover Dark Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                      {/* Small Category Pill */}
                      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
                        <span className="bg-white/90 backdrop-blur-sm text-[#0f172a] px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-[7px] md:text-caption font-bold tracking-widest uppercase shadow-md">
                          {project.category}
                        </span>
                      </div>

                      {/* Permanent Info & Hover Details */}
                      <div className="absolute bottom-0 left-0 p-5 md:p-6 z-20 w-full transform transition-transform duration-500 md:group-hover:-translate-y-2">
                        <h3 className="text-[15px] md:text-h4 font-semibold text-white tracking-tight mb-1 drop-shadow-sm">
                          {project.title}
                        </h3>
                        <p className="text-[#B7BDC9] md:text-slate-300 text-[9px] md:text-small tracking-wider drop-shadow-sm mb-1.5 md:mb-0 md:group-hover:mb-3 transition-all duration-300">
                          {project.category} • {project.location}
                        </p>

                        {/* Hover Summary & Button */}
                        <div className="overflow-hidden">
                          <div className="transform md:translate-y-full md:opacity-0 md:h-0 md:group-hover:h-auto md:group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                            <div className="flex items-center gap-1.5 md:gap-2 text-white font-bold tracking-wide uppercase text-[8px] md:text-caption">
                              Explore Project <ArrowRight size={12} className="transform md:group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* 4. LOAD MORE ACTION */}
      {visibleCount < allMasonryProjects.length && (
        <section className="w-full flex justify-center mt-6 mb-16 md:mt-[50px] md:mb-[50px]">
          <button 
            onClick={handleLoadMore}
            className="bg-[#0B1633] text-white px-6 py-3 md:px-8 md:py-3.5 rounded-full font-bold tracking-widest uppercase text-[10px] md:text-button hover:bg-black transition-all duration-300 shadow-[0_10px_30px_rgba(11,22,51,0.15)] hover:-translate-y-1"
          >
            Load More Projects
          </button>
        </section>
      )}
    </main>
  );
}
