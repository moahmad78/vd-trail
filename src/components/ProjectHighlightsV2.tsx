// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
// [EXPERIMENTAL A/B] Project Highlights V2 — Editorial Masonry Showcase
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

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
    tall: true,
  },
  {
    name: "Juego Studios",
    category: "Commercial",
    city: "Bangalore",
    summary: "An immersive gaming studio environment built around creative energy.",
    link: "/work/juego",
    image: "/assets/work/filter-grid/juego.jpg",
    tall: false,
  },
  {
    name: "QpiAI",
    category: "Commercial",
    city: "Bangalore",
    summary: "Quantum-tech workspace blending intellectual rigor with spatial elegance.",
    link: "/work/QpiAI",
    image: "/assets/work/filter-grid/qpiai.jpg",
    tall: false,
  },
  {
    name: "Physics Wallah",
    category: "Educational",
    city: "Bangalore",
    summary: "High-density learning environment scaled for India's fastest-growing EdTech.",
    link: "/work/pw-brigade",
    image: "/assets/work/filter-grid/physics-wallah.jpg",
    tall: true,
  },
  {
    name: "Orbit",
    category: "Commercial",
    city: "Bangalore",
    summary: "Compact corporate hub with a refined material palette and daylight strategy.",
    link: "/work/orbit",
    image: "/assets/work/filter-grid/apex-lounge.jpg",
    tall: false,
  },
  {
    name: "The Little Gym",
    category: "Hospitality",
    city: "Bangalore",
    summary: "A playful yet considered children's fitness space built for joy and safety.",
    link: "/work/littlegym",
    image: "/assets/work/filter-grid/littlegym.png",
    tall: false,
  },
  {
    name: "Happey",
    category: "Residential",
    city: "Bangalore",
    summary: "Co-living infrastructure designed around community, comfort, and efficiency.",
    link: "/work/happey",
    image: "/assets/work/filter-grid/happey.jpeg",
    tall: true,
  },
];

const CATEGORIES = ["All", "Commercial", "Hospitality", "Educational", "Residential"];

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

function GridCard({ project }: { project: typeof GRID_PROJECTS[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={project.link}
      className={`group block relative overflow-hidden rounded-[1.25rem] md:rounded-2xl ${
        project.tall ? "h-[220px] md:h-[clamp(280px,35vw,420px)]" : "h-[190px] md:h-[clamp(180px,22vw,260px)]"
      }`}
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
      <div className="absolute inset-0 overflow-hidden">
        <Image
          unoptimized
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

      {/* Mobile-only gradient booster */}
      <div className="absolute inset-0 pointer-events-none md:hidden bg-gradient-to-t from-[#0B1633] via-[#0B1633]/70 to-transparent" />

      {/* Gradient — stronger on hover */}
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          background: hovered
            ? "linear-gradient(to top, rgba(11,22,51,0.88) 0%, rgba(11,22,51,0.35) 55%, transparent 100%)"
            : "linear-gradient(to top, rgba(11,22,51,0.72) 0%, rgba(11,22,51,0.10) 50%, transparent 100%)",
          transition: "background 0.4s ease",
        }}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 z-10 flex flex-col justify-end">
        {/* Category chip (always visible, more prominent on hover) */}
        <span
          className="self-start inline-block px-2 py-0.5 md:px-2.5 md:py-0.5 rounded-full text-[9px] md:text-caption font-bold uppercase tracking-[0.2em] md:tracking-[0.22em] mb-1.5 md:mb-2.5"
          style={{
            background: "rgba(247,247,245,0.12)",
            color: "#B7BDC9",
            border: "1px solid rgba(247,247,245,0.18)",
            backdropFilter: "blur(4px)",
            opacity: hovered ? 1 : 0.7,
            transition: "opacity 0.3s ease",
          }}
        >
          {project.category}
        </span>

        <h3
          className="text-[18px] md:text-h5 font-bold tracking-[-0.02em] leading-tight text-white mb-1 md:mb-1.5"
        >
          {project.name}
        </h3>

        {/* Summary — visible on mobile, slides in on hover on desktop */}
        <p
          className="text-[12px] md:text-small leading-tight md:leading-relaxed text-[#B7BDC9] line-clamp-2 md:line-clamp-none md:max-h-[3rem] mb-2 md:mb-3 overflow-hidden opacity-90 md:opacity-100 transition-opacity duration-300"
        >
          {project.summary}
        </p>

        {/* CTA */}
        <span
          className="inline-flex items-center gap-1 text-[10px] md:text-caption font-bold uppercase tracking-[0.2em] md:tracking-[0.22em] text-[#F7F7F5] opacity-100 translate-y-0 md:opacity-0 md:group-hover:opacity-100 md:translate-y-1 md:group-hover:translate-y-0 transition-all duration-350"
        >
          Explore Project
          <svg
            width="10"
            height="10"
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
        </span>
      </div>
    </Link>
  );
}

/* ─── Main Section ──────────────────────────────────────────────────── */

export default function ProjectHighlightsV2() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [heroHovered, setHeroHovered] = useState(false);

  const filtered =
    activeCategory === "All"
      ? GRID_PROJECTS
      : GRID_PROJECTS.filter((p) => p.category === activeCategory);

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

      <div className="relative z-10 site-container pt-8 md:pt-[90px] pb-[max(env(safe-area-inset-bottom,40px),40px)] md:pb-16">

        {/* ── HEADING BLOCK ────────────────────────────────────────── */}
        <div className="mb-4 md:mb-7">
          {/* Small label */}
          <div className="flex items-center gap-2.5 mb-4">
            <span
              className="h-px w-5 flex-shrink-0"
              style={{ backgroundColor: "#6E7D9B" }}
            />
            <span
              className="text-caption font-bold uppercase tracking-[0.36em]"
              style={{ color: "#6E7D9B" }}
            >
              Curated Works
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 md:gap-4 mb-4">
            <div>
              <h2
                className="text-[28px] md:text-h2 font-bold leading-[1.05] md:leading-[1.05] tracking-tight md:tracking-[-0.03em] mb-1 md:mb-2 line-clamp-2"
                style={{ color: "#0B1633" }}
              >
                Spaces We&rsquo;ve{" "}
                <em
                  className="not-italic font-light"
                  style={{ color: "#6E7D9B" }}
                >
                  Brought to&nbsp;Life.
                </em>
              </h2>
              <p
                className="text-[13px] md:text-body font-light italic tracking-wide text-slate-500 md:text-[#B7BDC9]"
              >
                Selected Across Every Sector.
              </p>
            </div>

            <p
              className="text-[13px] md:text-small leading-snug md:leading-relaxed max-w-[280px] md:max-w-xs md:text-right mt-1 md:mt-0 text-slate-500 md:text-[#B7BDC9]"
            >
              A glimpse into the environments we&rsquo;ve transformed through
              precision and creativity.
            </p>
          </div>

          {/* Category chips */}
          <div className="flex flex-row md:flex-wrap overflow-x-auto whitespace-nowrap snap-x snap-mandatory hide-scrollbar gap-2 md:gap-2.5 mt-2 md:mt-3 pb-1 md:pb-0">
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

        {/* ── FEATURED HERO PROJECT ────────────────────────────────── */}
        {(activeCategory === "All" || activeCategory === HERO_PROJECT.category) && (
          <Link
            href={HERO_PROJECT.link}
            className="group relative block w-full overflow-hidden rounded-[1.25rem] md:rounded-2xl h-[220px] md:h-[clamp(180px,24vw,290px)] snap-start"
            style={{
              marginBottom: 16,
              boxShadow: heroHovered
                ? "0 20px 48px rgba(11,22,51,0.14)"
                : "0 4px 18px rgba(11,22,51,0.08)",
              transition: "box-shadow 0.4s ease",
            }}
            onMouseEnter={() => setHeroHovered(true)}
            onMouseLeave={() => setHeroHovered(false)}
          >
            {/* Image */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                unoptimized
                src={HERO_PROJECT.image}
                alt={HERO_PROJECT.name}
                fill
                priority
                sizes="100vw"
                className="object-cover"
                style={{
                  transform: heroHovered ? "scale(1.04)" : "scale(1)",
                  transition: "transform 0.7s cubic-bezier(.22,.68,0,.98)",
                }}
              />
            </div>

            {/* Gradient — left-side veil only + darken on hover */}
            <div className="absolute inset-0 pointer-events-none md:hidden bg-gradient-to-t from-[#0B1633] via-[#0B1633]/60 to-transparent" />
            <div
              className="absolute inset-0 transition-colors duration-700 ease-out hidden md:block"
              style={{
                background:
                  "linear-gradient(to right, rgba(11,22,51,0.78) 0%, rgba(11,22,51,0.32) 45%, rgba(11,22,51,0.04) 100%)",
                backgroundColor: heroHovered ? "rgba(0,0,0,0.05)" : "transparent",
              }}
            />

            {/* Content — category chip · name · CTA only */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-8 max-w-lg z-10">
              <div className="flex flex-wrap items-center gap-2 mb-1.5 md:mb-2.5">
                {/* Category chip */}
                <span
                  className="inline-block px-2 py-0.5 md:px-2.5 md:py-0.5 rounded-full text-[9px] md:text-caption font-bold uppercase tracking-[0.2em] md:tracking-[0.22em]"
                  style={{
                    background: "rgba(247,247,245,0.12)",
                    color: "#B7BDC9",
                    border: "1px solid rgba(247,247,245,0.2)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  {HERO_PROJECT.category}
                </span>

                {/* Flagship badge — inline on mobile, top right on desktop */}
                <span
                  className="inline-block md:absolute md:top-5 md:right-5 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[9px] md:text-caption font-bold uppercase tracking-[0.2em] md:tracking-[0.28em]"
                  style={{
                    background: "rgba(247,247,245,0.10)",
                    color: "rgba(247,247,245,0.6)",
                    border: "1px solid rgba(247,247,245,0.15)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  Featured
                </span>
              </div>

              <h3
                className="text-[20px] md:text-h3 font-bold tracking-[-0.03em] leading-tight text-white mb-2 md:mb-3"
              >
                {HERO_PROJECT.name}
              </h3>

              <span
                className="inline-flex items-center gap-1.5 text-[10px] md:text-button font-bold uppercase tracking-[0.2em] md:tracking-[0.22em] text-[#F7F7F5] transition-all duration-300"
              >
                Explore Project
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  style={{
                    transition: "transform 0.4s cubic-bezier(.22,.68,0,.98)",
                    transform: heroHovered ? "translateX(4px)" : "translateX(0)",
                  }}
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </Link>
        )}

        {/* ── MASONRY GRID ─────────────────────────────────────────── */}
        <div
          className="columns-1 sm:columns-2 lg:columns-3 gap-5"
          style={{ columnFill: "balance" }}
        >
          {filtered.map((project) => (
            <div key={project.name} className="break-inside-avoid mb-5">
              <GridCard project={project} />
            </div>
          ))}
        </div>

        {/* ── VIEW ALL CTA ─────────────────────────────────────────── */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/portfolio"
            id="project-highlights-v2-cta"
            className="group inline-flex items-center gap-3 text-button font-bold uppercase tracking-[0.25em] transition-all duration-300"
            style={{ color: "#0B1633" }}
          >
            <span
              className="h-px transition-all duration-300 group-hover:w-10"
              style={{ width: 24, backgroundColor: "#0B1633" }}
            />
            View Our Work
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
