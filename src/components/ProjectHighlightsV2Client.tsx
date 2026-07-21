// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
// [EXPERIMENTAL A/B] Project Highlights V2 — Editorial Masonry Showcase (Client)
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export interface ProjectData {
  name: string;
  category: string;
  image: string;
}

const CATEGORIES = ["All", "Hospitality", "Residential", "Educational"];

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
      className="flex-shrink-0 snap-start px-[16px] h-[32px] flex items-center justify-center rounded-full text-[12px] md:text-[13px] font-[600] uppercase tracking-[0.15em] transition-colors duration-300 cursor-pointer"
      style={{
        background: active ? "#0B1633" : "#FFFFFF",
        color: active ? "#F7F7F5" : "#6E7D9B",
        border: active ? "1px solid #0B1633" : "1px solid rgba(11, 22, 51, 0.12)",
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
  project: ProjectData, 
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
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          loading="lazy"
          style={{
            objectPosition: "center",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(.22,.68,0,.98)",
          }}
        />
      </div>

      {/* Gradient Overlay — subtle default, slightly stronger on hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-400 ease-out"
        style={{
          background: "linear-gradient(to top, rgba(11, 22, 51, 0.25) 0%, transparent 50%)",
          opacity: hovered ? 1 : 0.4,
        }}
      />
    </div>
  );
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/* ─── Main Component ──────────────────────────────────────────────────── */

export default function ProjectHighlightsV2Client({ projects, hideCTA = false }: { projects: ProjectData[], hideCTA?: boolean }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(12);
  
  // Initialize with server-provided (already shuffled/mixed) "All" projects
  const [categoryLists, setCategoryLists] = useState<Record<string, ProjectData[]>>({
    "All": projects
  });

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(12);
    if (!categoryLists[cat]) {
      const filtered = projects.filter(p => p.category === cat);
      setCategoryLists(prev => ({ ...prev, [cat]: shuffleArray(filtered) }));
    }
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  const activeList = categoryLists[activeCategory] || [];
  const grid = activeList.slice(0, visibleCount);
  const hasMore = visibleCount < activeList.length;

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
        <div className="mb-2 md:mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-end">
            <div className="md:col-span-6 lg:col-span-6">
              {/* Small label */}
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] block mb-2" style={{ color: "#6E7D9B" }}>
                OUR DESIGNS
              </span>
              <h2
                className="text-[clamp(36px,3.5vw,52px)] font-[700] leading-[1.05] tracking-[-0.03em]"
                style={{ color: "#0B1633" }}
              >
                Spaces We Designed
              </h2>
            </div>
            <div className="md:col-span-6 lg:col-span-6 flex items-center md:justify-end mt-6 md:mt-0">
              {/* Category chips inline on desktop, horizontally scrollable on mobile */}
              <div className="flex flex-row md:flex-wrap overflow-x-auto whitespace-nowrap hide-scrollbar gap-2 pb-2 md:pb-0">
                {CATEGORIES.map((cat) => (
                  <CategoryChip
                    key={cat}
                    label={cat}
                    active={activeCategory === cat}
                    onClick={() => handleCategoryClick(cat)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── RESPONSIVE PORTFOLIO GRID ──────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 w-full mt-6">
          <AnimatePresence mode="popLayout">
            {grid.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                key={project.image}
                className="w-full"
              >
                <GridCard project={project} className="aspect-[4/3] w-full" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ── BOTTOM ACTIONS (Load More / View All) ───────────────── */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          {!hideCTA && (
            <div className="flex justify-start order-2 sm:order-1">
              <Link
                href="/designs"
                id="project-highlights-v2-cta"
                className="group inline-flex items-center gap-3 text-[13px] md:text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300"
                style={{ color: "#0B1633" }}
              >
                VIEW ALL DESIGNS
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
          )}
          
          {hasMore && (
            <div className={`flex justify-end ${hideCTA ? 'w-full text-center sm:justify-center' : 'order-1 sm:order-2'}`}>
              <button
                onClick={handleLoadMore}
                className="px-6 py-2.5 rounded-full text-[12px] font-[600] uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer"
                style={{
                  background: "transparent",
                  color: "#0B1633",
                  border: "1px solid rgba(11,22,51,0.2)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#0B1633";
                  e.currentTarget.style.color = "#F7F7F5";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#0B1633";
                }}
              >
                Load More
              </button>
            </div>
          )}
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
