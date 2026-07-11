"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Testimonial } from "../data/testimonials";

/* ─────────────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────────────── */
interface Props {
  testimonials?: Testimonial[];
}

/* ─────────────────────────────────────────────────────────────────────
   Constants
───────────────────────────────────────────────────────────────────── */
const AUTOPLAY_DELAY  = 5000;   // ms between steps
const CARDS_DESKTOP   = 3;      // visible cards on ≥ 768 px
const CARDS_MOBILE    = 1;      // visible cards on < 768 px

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg,#001B4E 0%,#1e3a6e 100%)",
  "linear-gradient(135deg,#1e3a6e 0%,#2d5a9e 100%)",
  "linear-gradient(135deg,#0f2d5a 0%,#1a4a8a 100%)",
  "linear-gradient(135deg,#0B1633 0%,#334e7e 100%)",
  "linear-gradient(135deg,#162040 0%,#2a4a7a 100%)",
];

/* ─────────────────────────────────────────────────────────────────────
   Avatar
───────────────────────────────────────────────────────────────────── */
function Avatar({ name, index }: { name: string; index: number }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return (
    <div
      className="w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white text-[14px] md:text-[18px] font-bold shadow-lg border-2 md:border-[3px] border-white flex-shrink-0"
      style={{ background: AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length] }}
    >
      {initials}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Card
───────────────────────────────────────────────────────────────────── */
function TestimonialCard({ t, index, isCenter }: { t: Testimonial; index: number; isCenter: boolean }) {
  return (
    <div
      className={`group relative bg-white rounded-[20px] p-3 md:p-8 flex flex-col h-full min-h-[160px] md:min-h-[280px]
        shadow-[0_4px_24px_rgba(0,27,78,0.07)]
        transition-all duration-500 ease-out
        border border-slate-100/80
        ${isCenter ? 'md:scale-105 shadow-[0_16px_48px_rgba(0,27,78,0.12)] z-10' : 'hover:-translate-y-[4px] hover:shadow-[0_16px_48px_rgba(0,27,78,0.14)] z-0'}`}
    >
      {/* Avatar + decorative quote mark */}
      <div className="flex items-start justify-between mb-6">
        <Avatar name={t.name} index={index} />
        <svg viewBox="0 0 42 32" fill="none" className="w-8 h-6 md:w-10 md:h-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500 flex-shrink-0">
          <path
            d="M0 32V19.2C0 13.867 1.333 9.333 4 5.6 6.667 1.867 10.667 0 16 0v5.6c-2.667 0-4.8.933-6.4 2.8C8 10.267 7.2 12.533 7.2 15.2H16V32H0ZM26 32V19.2C26 13.867 27.333 9.333 30 5.6 32.667 1.867 36.667 0 42 0v5.6c-2.667 0-4.8.933-6.4 2.8C34 10.267 33.2 12.533 33.2 15.2H42V32H26Z"
            fill="#001B4E"
          />
        </svg>
      </div>

      {/* Gold Stars */}
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={16} className={i < t.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200 fill-slate-200"} />
        ))}
      </div>

      {/* Quote text */}
      <p className="text-xs md:text-[15px] text-slate-600 leading-relaxed md:leading-[1.8] italic flex-1 mb-4 md:mb-6 md:line-clamp-4 md:overflow-hidden">
        &ldquo;{t.text}&rdquo;
      </p>

      {/* Footer */}
      <div className="border-t border-slate-100 pt-5">
        <p className="text-[14px] font-bold text-[#001B4E] tracking-tight leading-tight">
          {t.name}
        </p>
        <p className="text-[12px] text-slate-400 font-semibold uppercase tracking-[0.05em] mt-1">
          {t.designation} <span className="opacity-50 mx-1">•</span> {t.location}
        </p>
      </div>

      {/* Left accent bar on hover */}
      <div className="absolute left-0 top-8 bottom-8 w-[3px] rounded-r-full bg-[#001B4E] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out origin-center" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Progress Dot
───────────────────────────────────────────────────────────────────── */
function ProgressDot({
  active,
  onClick,
  animKey,
}: {
  active: boolean;
  onClick: () => void;
  animKey: number; // bump to restart animation
}) {
  return (
    <button
      onClick={onClick}
      aria-label="Go to slide"
      className={`relative overflow-hidden rounded-full transition-all duration-300 flex-shrink-0 ${
        active
          ? "w-8 h-2 bg-[#001B4E]/20"
          : "w-2 h-2 bg-[#001B4E]/20 hover:bg-[#001B4E]/40"
      }`}
    >
      {active && (
        <span
          key={animKey}
          className="absolute inset-y-0 left-0 rounded-full bg-[#001B4E]"
          style={{
            animation: `testimonial-progress ${AUTOPLAY_DELAY}ms linear forwards`,
          }}
        />
      )}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   Main Component
   ─ Root cause of the bug:
     The previous translateX approach relied on ResizeObserver measuring
     card widths asynchronously. On first render offsetWidth was 0 so
     translatePx stayed 0 forever → cards never moved.
   ─ Fix:
     Use a SLICE approach instead.  Only render the VISIBLE pair of cards,
     keyed by `step` so React unmounts/remounts them triggering the CSS
     enter animation.  No DOM measurements needed.
───────────────────────────────────────────────────────────────────── */
export default function ServiceTestimonials({ testimonials }: Props) {
  if (!testimonials || testimonials.length === 0) return null;

  const total = testimonials.length;

  /* ── Detect screen width to know how many cards to show ── */
  const [visibleCount, setVisibleCount] = useState(CARDS_DESKTOP);

  useEffect(() => {
    function update() {
      setVisibleCount(window.innerWidth >= 768 ? CARDS_DESKTOP : CARDS_MOBILE);
    }
    update(); // run once on mount
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ── Step-based pagination ──
     Each step shows `visibleCount` testimonials.
     [0] → cards 0,1   [1] → cards 2,3   etc.  */
  const totalSteps = Math.ceil(total / visibleCount);

  const [step,    setStep]    = useState(0);
  const [animKey, setAnimKey] = useState(0); // bumped on every navigation
  const [paused,  setPaused]  = useState(false);
  const [dir,     setDir]     = useState<"next" | "prev">("next"); // slide direction

  /* Slice the testimonials to get what's visible on this step */
  const start   = step * visibleCount;
  const visible = testimonials.slice(start, start + visibleCount);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  /* ── Navigation ── */
  const goNext = useCallback(() => {
    setDir("next");
    setStep((s) => (s + 1) % totalSteps);
    setAnimKey((k) => k + 1);
  }, [totalSteps]);

  const goPrev = useCallback(() => {
    setDir("prev");
    setStep((s) => (s - 1 + totalSteps) % totalSteps);
    setAnimKey((k) => k + 1);
  }, [totalSteps]);

  const goTo = useCallback(
    (i: number) => {
      setDir(i > step ? "next" : "prev");
      setStep(i);
      setAnimKey((k) => k + 1);
      setPaused(true);
      setTimeout(() => setPaused(false), AUTOPLAY_DELAY);
    },
    [step]
  );

  /* Manual prev/next also reset the timer */
  const handleNext = useCallback(() => {
    goNext();
    setPaused(true);
    setTimeout(() => setPaused(false), AUTOPLAY_DELAY);
  }, [goNext]);

  const handlePrev = useCallback(() => {
    goPrev();
    setPaused(true);
    setTimeout(() => setPaused(false), AUTOPLAY_DELAY);
  }, [goPrev]);

  /* ── Autoplay ── */
  useEffect(() => {
    if (paused || totalSteps <= 1 || prefersReducedMotion) return;
    const id = setInterval(() => {
      setDir("next");
      setStep((s) => (s + 1) % totalSteps);
      setAnimKey((k) => k + 1);
    }, AUTOPLAY_DELAY);
    return () => clearInterval(id);
  }, [paused, totalSteps, prefersReducedMotion]);

  /* ── Keyboard navigation ── */
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "ArrowLeft")  { e.preventDefault(); handlePrev(); }
      if (e.key === "ArrowRight") { e.preventDefault(); handleNext(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handlePrev, handleNext]);

  /* ── Touch swipe ── */
  const touchStartX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? handleNext() : handlePrev();
  };

  return (
    <>
      {/*
        @keyframes for:
          1. Progress-bar fill animation in the dots
          2. Card enter animation (slide in from the direction of travel)
      */}
      <style>{`
        @keyframes testimonial-progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes card-enter-next {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes card-enter-prev {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      <section className="w-full bg-[#F8F9FB] rounded-[28px] overflow-hidden mt-12 mb-12">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-16 items-center">

            {/* ── Left panel: static heading + controls ── */}
            <div className="flex flex-col">
              {/* Mobile Only Title */}
              <div className="block lg:hidden w-full text-center px-4 mb-6">
                <span className="text-xs uppercase tracking-widest text-slate-400 font-medium block mb-1">Feedback</span>
                <h2 className="text-xl font-bold text-slate-900">Testimonials</h2>
              </div>

              <span className="hidden lg:block text-[11px] font-bold tracking-[0.28em] uppercase text-[#001B4E]/50 mb-4">
                TESTIMONIALS
              </span>

              <h2 className="hidden lg:block text-[28px] md:text-[34px] lg:text-[38px] font-extrabold text-[#001B4E] leading-[1.15] tracking-tight mb-4">
                What Our Clients
                <span className="block font-light text-slate-400">Say About Us</span>
              </h2>

              <p className="hidden lg:block text-[14px] md:text-[15px] text-slate-500 leading-relaxed max-w-[260px] mb-8">
                Trusted by hospitality, residential, educational and commercial clients across India.
              </p>

              {/* Prev / Next + animated progress dots */}
              <div className="flex items-center justify-center lg:justify-start gap-3 lg:m-0">
                <button
                  onClick={handlePrev}
                  aria-label="Previous testimonials"
                  className="hidden lg:flex w-11 h-11 rounded-full border-2 border-[#001B4E]/15 items-center justify-center
                    text-[#001B4E] transition-all duration-300
                    hover:bg-[#08163A] hover:border-[#08163A] hover:text-white hover:scale-105
                    active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#001B4E]"
                >
                  <ChevronLeft size={16} strokeWidth={2.5} />
                </button>

                <button
                  onClick={handleNext}
                  aria-label="Next testimonials"
                  className="hidden lg:flex w-11 h-11 rounded-full border-2 border-[#001B4E]/15 items-center justify-center
                    text-[#001B4E] transition-all duration-300
                    hover:bg-[#08163A] hover:border-[#08163A] hover:text-white hover:scale-105
                    active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#001B4E]"
                >
                  <ChevronRight size={16} strokeWidth={2.5} />
                </button>

                {/* One dot per STEP (not per card) */}
                <div className="flex items-center gap-2 lg:ml-2">
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <ProgressDot
                      key={i}
                      active={i === step}
                      onClick={() => goTo(i)}
                      animKey={i === step ? animKey : 0}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right panel: visible card pair, re-mounted on step change ── */}
            <div
              className="relative w-full"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              aria-live="polite"
            >
              {/*
                KEY = step + animKey: forces React to unmount old cards and
                mount new ones, which triggers the CSS enter animation.
                direction class drives the correct slide-from direction.
              */}
              <div
                key={`${step}-${animKey}`}
                className={`grid gap-6 lg:gap-8 ${
                  visibleCount === 3 ? "grid-cols-3" : visibleCount === 2 ? "grid-cols-2" : "grid-cols-1"
                }`}
                style={{
                  animation: prefersReducedMotion ? 'none' : `${
                    dir === "next" ? "card-enter-next" : "card-enter-prev"
                  } 500ms cubic-bezier(0.25, 1, 0.5, 1) both`,
                }}
              >
                {visible.map((t, i) => {
                  const isCenter = visibleCount === 3 && i === 1;
                  return (
                    <TestimonialCard
                      key={`${step}-${i}`}
                      t={t}
                      index={start + i}
                      isCenter={isCenter}
                    />
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
