// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
// [EXPERIMENTAL A/B] Project Highlights V2 — Editorial Masonry Showcase
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

/* ─── Palette ───────────────────────────────────────────────────────── */
// Deep Navy   #0B1633
// Slate Blue  #6E7D9B
// Off White   #F7F7F5
// Soft Grey   #B7BDC9

/* ─── Project Data ──────────────────────────────────────────────────── */

const HERO_PROJECT = {
  name: "Apps for Bharat",
  category: "Commercial",
  city: "Bangalore",
  summary: "A 25,000 sq ft flagship tech campus designed for scale, culture, and precision.",
  link: "/work/apps-for-bharat",
  image: "/assets/work/filter-grid/apps-for-bharat.jpg",
};

const GRID_PROJECTS = [
  {
    name: "Zluri",
    category: "Commercial",
    city: "Bangalore",
    summary: "Open-plan SaaS workspace merging brand identity with architectural precision.",
    link: "/work/zluri",
    image: "/assets/work/filter-grid/zluri.jpg",
    height: 260, // Tall Card
  },
  {
    name: "Juego Studios",
    category: "Commercial",
    city: "Bangalore",
    summary: "An immersive gaming studio environment built around creative energy.",
    link: "/work/juego",
    image: "/assets/work/filter-grid/juego.jpg",
    height: 180, // Small Card
  },
  {
    name: "QpiAI",
    category: "Commercial",
    city: "Bangalore",
    summary: "Quantum-tech workspace blending intellectual rigor with spatial elegance.",
    link: "/work/QpiAI",
    image: "/assets/work/filter-grid/qpiai.jpg",
    height: 220, // Medium Card
  },
  {
    name: "Physics Wallah",
    category: "Educational",
    city: "Bangalore",
    summary: "High-density learning environment scaled for India's fastest-growing EdTech.",
    link: "/work/pw-brigade",
    image: "/assets/work/filter-grid/physics-wallah.jpg",
    height: 260, // Tall Card
  },
  {
    name: "Orbit",
    category: "Commercial",
    city: "Bangalore",
    summary: "Compact corporate hub with a refined material palette and daylight strategy.",
    link: "/work/orbit",
    image: "/assets/work/filter-grid/apex-lounge.jpg",
    height: 220, // Medium Card
  },
];

const CATEGORIES = ["All", "Hospitality", "Residential", "Educational", "Commercial"];

/* ─── Category Chip ────────────────────────────────────────────────── */

function CategoryChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 snap-start px-3 md:px-4 py-1.5 md:py-1.5 rounded-full text-[10px] md:text-caption font-bold uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer"
      style={{
        background: active
          ? "#0B1633"
          : "rgba(11,22,51,0.06)",
        color: active ? "#F7F7F5" : "#6E7D9B",
        border: active
          ? "1px solid #0B1633"
          : "1px solid rgba(110,125,155,0.25)",
        backdropFilter: "blur(8px)",
      }}
    >
      {label}
    </button>
  );
}

/* ─── Grid Card ────────────────────────────────────────────────────── */

function GridCard({ 
  project, 
  className = "", 
  isFeatured = false 
}: { 
  project: any, 
  className?: string, 
  isFeatured?: boolean 
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`group block relative overflow-hidden rounded-[24px] cursor-default ${className}`}
      style={{
        boxShadow: hovered
          ? "0 20px 48px rgba(11,22,51,0.14)"
          : "0 2px 12px rgba(11,22,51,0.07)",
        transition: "box-shadow 0.4s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="absolute inset-0 overflow-hidden bg-slate-100">
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          loading="lazy"
          style={{
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(.22,.68,0,.98)",
          }}
        />
      </div>

      {/* Gradient Overlay — subtle default, strong on hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-400 ease-out"
        style={{
          background: hovered
            ? "linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.4) 60%, transparent 100%)"
            : "linear-gradient(to top, rgba(15, 23, 42, 0.6) 0%, rgba(15, 23, 42, 0) 40%, transparent 100%)",
        }}
      />

      {isFeatured && (
        <span
          className="absolute top-5 right-5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] z-20"
          style={{
            background: "rgba(247,247,245,0.10)",
            color: "rgba(247,247,245,0.8)",
            border: "1px solid rgba(247,247,245,0.15)",
            backdropFilter: "blur(8px)",
          }}
        >
          Featured
        </span>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex flex-col justify-end h-full">
        <div className="mt-auto flex flex-col">
          {/* Category chip */}
          <span
            className="self-start inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] mb-2 md:mb-3 transition-all duration-400 ease-out"
            style={{
              background: "rgba(15, 23, 42, 0.8)",
              backdropFilter: "blur(4px)",
              color: "white",
            }}
          >
            {project.category}
          </span>

          <h3
            className="text-[24px] font-[700] leading-tight text-white drop-shadow-lg mb-1"
          >
            {project.name}
          </h3>

          {/* Hidden by default, revealed on hover */}
          <div 
            className="grid transition-all duration-400 ease-out"
            style={{
              gridTemplateRows: hovered ? "1fr" : "0fr",
              opacity: hovered ? 1 : 0,
            }}
          >
            <div className="overflow-hidden flex flex-col justify-end">
              <p className="text-white/85 text-[14px] leading-[1.6] mt-2 mb-3">
                {project.summary}
              </p>
              
              <span className="hidden items-center gap-1.5 text-[13px] font-bold uppercase tracking-[0.1em] text-white">
                Explore Project
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="transition-transform duration-400 transform group-hover:translate-x-1">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Section ──────────────────────────────────────────────────── */

export default function ProjectHighlightsV2() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    return activeCategory === "All"
      ? GRID_PROJECTS
      : GRID_PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const getGridSpans = (count: number) => {
    switch (count) {
      case 1: return [12];
      case 2: return [6, 6];
      case 3: return [4, 4, 4];
      case 4: return [6, 6, 6, 6];
      case 5: return [4, 4, 4, 6, 6];
      case 6: return [4, 4, 4, 4, 4, 4];
      case 7: return [4, 4, 4, 6, 6, 6, 6];
      default: return Array(count).fill(4);
    }
  };

  const spans = getGridSpans(filtered.length);

  return (
    <section
      aria-label="Project Highlights — Experimental v2"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#F7F7F5" }}
    >
      {/* ── Blueprint grid texture ────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(11,22,51,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(11,22,51,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          opacity: 1,
        }}
      />

      <div className="relative z-10 site-container py-12 lg:py-16">

        {/* ── HEADING BLOCK ────────────────────────────────────────── */}
        <div className="mb-6 md:mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-end">
            <div className="md:col-span-6 lg:col-span-6">
              {/* Small label */}
              <div className="flex items-center gap-2.5 mb-2">
                <span className="h-px w-5 flex-shrink-0" style={{ backgroundColor: "#6E7D9B" }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: "#6E7D9B" }}>
                  Our Works
                </span>
              </div>
              <h2
                className="text-[clamp(36px,3.5vw,52px)] font-[700] leading-[1.05] tracking-[-0.03em]"
                style={{ color: "#0B1633" }}
              >
                Selected Works
              </h2>
            </div>
            <div className="md:col-span-6 lg:col-span-6 flex md:justify-start mt-4 md:mt-0">
              <p
                className="text-slate-600 text-[16px] leading-[1.8] font-[400] max-w-[320px] md:text-left"
              >
                A glimpse into some of our most impactful projects.
              </p>
            </div>
          </div>

          {/* Category chips (temporarily hidden as requested) */}
          <div className="hidden flex-row md:flex-wrap overflow-x-auto whitespace-nowrap snap-x snap-mandatory hide-scrollbar gap-2 md:gap-2.5 mt-2 md:mt-3 pb-1 md:pb-0">
            {CATEGORIES.map((cat) => (
              <CategoryChip
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>
        </div>

        {/* ── SEAMLESS BENTO BOX GRID ──────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">
          {/* FEATURED HERO PROJECT */}
          {(activeCategory === "All" || activeCategory === HERO_PROJECT.category) && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="md:col-span-12"
            >
              <GridCard 
                project={HERO_PROJECT} 
                className="h-[260px] md:h-[260px]" 
                isFeatured={true} 
              />
            </motion.div>
          )}

          {/* SECONDARY PROJECTS */}
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => {
              const spanCols = spans[index];
              const spanClass = 
                spanCols === 12 ? "md:col-span-12" :
                spanCols === 6 ? "md:col-span-6" :
                "md:col-span-4";
              
              // Taller height for wider spans to maintain visual balance
              const heightClass = spanCols === 4 ? "h-[220px]" : "h-[260px]";

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  key={project.name}
                  className={`w-full ${spanClass}`}
                >
                  <GridCard project={project} className={heightClass} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ── VIEW ALL CTA ─────────────────────────────────────────── */}
        <div className="mt-10 flex justify-start">
          <Link
            href="/our-work"
            id="project-highlights-v2-cta"
            className="group inline-flex items-center gap-3 text-[13px] md:text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300"
            style={{ color: "#0B1633" }}
          >
            <span
              className="h-px transition-all duration-300 group-hover:w-10"
              style={{ width: 24, backgroundColor: "#0B1633" }}
            />
            View All Projects
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* ── Bottom hairline ───────────────────────────────────────── */}
      <div
        className="relative z-10"
        style={{ height: 1, backgroundColor: "rgba(11,22,51,0.07)" }}
      />
    </section>
  );
}
