// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';

// FORCE UPDATE THE ARRAY SCHEMA WITH ROOT-RELATIVE PUBLIC ROADS
const ALL_PROJECTS_DATA = [
  { id: '1', slug: 'apps-for-bharat', title: 'Apps for Bharat', location: 'Bangalore', category: 'Residential', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
  { id: '2', slug: 'zluri', title: 'Zluri', location: 'Bangalore', category: 'Residential', image: '/assets/work/filter-grid/zluri.jpg' },
  { id: '3', slug: 'qpiai', title: 'QpiAI', location: 'Bangalore', category: 'Residential', image: '/assets/work/filter-grid/qpiai.jpg' },
  { id: '4', slug: 'pw-brigade', title: 'Physics Wallah', location: 'Bangalore', category: 'Educational', image: '/assets/work/filter-grid/physics-wallah.jpg' },
  { id: '5', slug: 'juego', title: 'Juego', location: 'Bangalore', category: 'Hospitality', image: '/assets/work/filter-grid/juego.jpg' },
  { id: '6', slug: 'orbit', title: 'Orbit', location: 'Bangalore', category: 'Hospitality', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80' },
  { id: '7', slug: 'the-little-gym', title: 'The Little Gym', location: 'Bangalore', category: 'Educational', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80' },
  { id: '8', slug: 'happey', title: 'Happey', location: 'Bangalore', category: 'Hospitality', image: '/assets/work/filter-grid/happey.jpeg' }
];

const CATEGORIES = ['All Projects', 'Residential', 'Hospitality', 'Educational'];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState('All Projects');

  // SAFE STRUCTURAL MEMOIZATION SWITCH - TERMINATES LOOP CODES INSTANTLY
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All Projects') return ALL_PROJECTS_DATA;
    return ALL_PROJECTS_DATA.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      <div className="relative z-50">
 
      </div>
      <div className="h-20 shrink-0" /> 

      {/* HEADER ELEMENT INFRASTRUCTURE */}
      <div className="text-center py-12 px-4 max-w-3xl mx-auto w-full">
        <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase block">Our Curated Works</span>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2 tracking-tight">Masterpieces of Design</h1>
        <p className="text-slate-500 mt-4 text-sm md:text-base">Discover how we blend precise construction engineering with luxury design standards.</p>
      </div>

      {/* MAIN VIEWPORT COMPONENT WRAPPER */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 pb-24 flex flex-col md:flex-row gap-8 items-start justify-start">
        
        {/* FIXED / STICKY ASIDE FILTER PANEL (LEFT - 25%) */}
        <aside className="w-full md:w-64 shrink-0 md:sticky md:top-24 bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 z-10 self-start">
          <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-4">Project Filter Engine</p>
          <nav className="flex flex-row md:flex-col gap-1.5 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 whitespace-nowrap block shrink-0 ${
                  activeCategory === cat
                    ? 'bg-[#0f172a] text-white font-semibold shadow-sm scale-[1.02]'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </aside>

        {/* PORTFOLIO GRID HOUSING AREA (RIGHT - 75%) */}
        <main className="flex-1 w-full min-w-0">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20 text-slate-400 text-sm bg-white rounded-2xl border border-dashed border-slate-200 w-full">
              No projects found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full opacity-100 block">
              {filteredProjects.map((project) => (
                <Link 
                  href={`/work/${project.slug}`} 
                  key={project.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col w-full"
                >
                  <div className="w-full aspect-[4/3] overflow-hidden bg-slate-100 relative shrink-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/600x450/0f172a/white?text=${encodeURIComponent(project.title)}`;
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/40 via-transparent to-transparent opacity-60" />
                  </div>
                  
                  <div className="p-5 flex flex-col justify-between flex-1 min-w-0">
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1 truncate">{project.category}</p>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-[#0f172a] transition-colors truncate">{project.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 truncate">{project.location}</p>
                    </div>
                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-600 tracking-wide uppercase group-hover:text-[#0f172a] shrink-0">
                      <span>View Details</span>
                      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
