// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
// ServiceCinematicCTA — Reusable cinematic editorial CTA, based on CTAV4 philosophy.
// Drop-in replacement for all service page CTA sections.
"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useQuote } from "@/contexts/QuoteContext";

/* ─── Palette (matches CTAV4 exactly) ──────────────────────────────────
   Deep Navy   #0B1633
   Slate Blue  #6E7D9B
   Off White   #F7F7F5
   Soft Grey   #B7BDC9
──────────────────────────────────────────────────────────────────────── */

/* ─── Blueprint Canvas ─────────────────────────────────────────────────
   Slow architectural node graph · 4% opacity · sits above video.
   Identical to CTAV4 — extracted here for reuse.
──────────────────────────────────────────────────────────────────────── */
interface BPNode { x: number; y: number; vx: number; vy: number }

function BlueprintCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const COUNT = 24;
    const MAX_D = 130;
    const nodes: BPNode[] = [];

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < COUNT; i++) {
      nodes.push({
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.20,
        vy: (Math.random() - 0.5) * 0.20,
      });
    }

    const tick = () => {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_D) {
            ctx.strokeStyle = `rgba(11,22,51,${(1 - d / MAX_D) * 0.14})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.1, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(11,22,51,0.15)";
        ctx.fill();
      }
      animId = requestAnimationFrame(tick);
    };

    tick();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.04, zIndex: 3 }}
    />
  );
}

/* ─── Buttons (exact CTAV4 styling) ────────────────────────────────── */

function PrimaryBtn({ onClick, label }: { onClick: () => void; label: string }) {
  const [over, setOver] = useState(false);
  return (
    <button
      onClick={onClick}
      className="flex-1 w-full sm:w-auto inline-flex items-center justify-center rounded-xl font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.22em] transition-all duration-300 whitespace-nowrap"
      style={{
        backgroundColor: "#0B1633",
        color: "#F7F7F5",
        padding: "14px 12px",
        transform: over ? "translateY(-2px)" : "translateY(0)",
        boxShadow: over
          ? "0 12px 30px rgba(11,22,51,0.26)"
          : "0 4px 14px rgba(11,22,51,0.16)",
      }}
      onMouseEnter={() => setOver(true)}
      onMouseLeave={() => setOver(false)}
    >
      {label}
    </button>
  );
}

function SecondaryBtn({ href, label }: { href: string; label: string }) {
  const [over, setOver] = useState(false);
  return (
    <Link
      href={href}
      className="flex-1 w-full sm:w-auto inline-flex items-center justify-center gap-1 sm:gap-2 rounded-xl font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.22em] transition-all duration-300 whitespace-nowrap"
      style={{
        backgroundColor: over ? "rgba(11,22,51,0.06)" : "transparent",
        color: "#0B1633",
        border: "1px solid rgba(11,22,51,0.30)",
        padding: "13px 12px",
        transform: over ? "translateY(-2px)" : "translateY(0)",
      }}
      onMouseEnter={() => setOver(true)}
      onMouseLeave={() => setOver(false)}
    >
      {label}
      <svg
        width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true"
        style={{
          transition: "transform 0.3s ease",
          transform: over ? "translateX(2px)" : "translateX(0)",
        }}
      >
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

/* ─── Props ─────────────────────────────────────────────────────────── */

export interface ServiceCinematicCTAProps {
  /** Bold headline. Supports <br /> splits. */
  headline: string;
  /** Supporting copy paragraph beneath the headline. */
  copy: string;
  /** Path to service-specific MP4. Defaults to hero1.mp4 */
  videoSrc?: string;
  /** Primary button label. Default: "BOOK CONSULTATION" */
  primaryLabel?: string;
  /** Secondary button label. Default: "VIEW OUR WORK" */
  secondaryLabel?: string;
  /** Secondary button href. Default: /portfolio */
  secondaryHref?: string;
  /** Prefills QuoteModal project type select. */
  category?: string;
}

/* ─── Main Component ────────────────────────────────────────────────── */

export default function ServiceCinematicCTA({
  headline,
  copy,
  videoSrc = "/video/hero/hero1.mp4",
  primaryLabel = "BOOK CONSULTATION",
  secondaryLabel = "VIEW OUR WORK",
  secondaryHref = "/portfolio",
  category,
}: ServiceCinematicCTAProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setIsQuoteOpen, openQuoteWithCategory } = useQuote();

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.75;
  }, []);

  const handleConsultation = () => {
    if (category && openQuoteWithCategory) {
      openQuoteWithCategory(category);
    } else {
      setIsQuoteOpen(true);
    }
  };

  return (
    <section
      aria-label="Service CTA — Cinematic Editorial"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#F7F7F5", minHeight: 440 }}
    >

      {/* ══ LAYER 1: Video — full section background ═════════════════ */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        preload="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          objectFit: "cover",
          objectPosition: "center 35%",
          transform: "scale(1.04)",
          filter: "contrast(1.04) saturate(1.08) brightness(1.02)",
          zIndex: 1,
        }}
      />

      {/* ══ LAYER 2: Editorial dissolve overlay ══════════════════════
           Identical gradient to CTAV4 — fades left (content readable)
           to fully transparent on right (video exposed by ~82%).     ══ */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "linear-gradient(90deg,",
            "rgba(247,247,245,0.97)  0%,",
            "rgba(247,247,245,0.93) 18%,",
            "rgba(247,247,245,0.80) 35%,",
            "rgba(247,247,245,0.48) 50%,",
            "rgba(247,247,245,0.20) 62%,",
            "rgba(247,247,245,0.05) 72%,",
            "rgba(247,247,245,0.00) 82%",
            ")",
          ].join(" "),
          zIndex: 2,
        }}
      />

      {/* Mobile: light wash so text remains readable on small screens */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none lg:hidden"
        style={{
          background: "rgba(247,247,245,0.82)",
          zIndex: 2,
        }}
      />

      {/* ══ LAYER 3: Blueprint canvas ════════════════════════════════ */}
      <BlueprintCanvas />

      {/* ══ LAYER 4: Hairline rules (top + bottom) ═══════════════════ */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: 1, backgroundColor: "rgba(11,22,51,0.07)", zIndex: 10 }}
      />
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: 1, backgroundColor: "rgba(11,22,51,0.07)", zIndex: 10 }}
      />

      {/* ══ LAYER 5: Content — left-anchored, floats above video ═════ */}
      <div className="relative w-full" style={{ zIndex: 5, minHeight: 440 }}>
        <div
          className="site-container h-full flex items-center"
          style={{ minHeight: 440 }}
        >
          <div className="w-full lg:max-w-[44%] py-16 md:py-20">

            {/* Eyebrow */}
            <div className="flex items-center gap-2.5 mb-7">
              <span
                className="h-px w-5 flex-shrink-0"
                style={{ backgroundColor: "#6E7D9B" }}
              />
              <span
                className="text-[9.5px] font-bold uppercase tracking-[0.38em]"
                style={{ color: "#6E7D9B" }}
              >
                Start Your Project
              </span>
            </div>

            {/* Headline — split into regular + light italic per CTAV4 pattern */}
            <h2
              className="font-bold leading-[1.05] tracking-[-0.03em] mb-4"
              style={{
                fontSize: "clamp(1.9rem, 2.8vw, 3rem)",
                color: "#0B1633",
              }}
            >
              {/* First sentence bold, final phrase rendered in light italic slate */}
              {(() => {
                const dot = headline.lastIndexOf(".");
                const last = headline.lastIndexOf(".", dot - 1);
                // Split at last sentence boundary before final period
                const breakAt = headline.lastIndexOf(" ", dot);
                if (breakAt > headline.length * 0.4) {
                  const main = headline.slice(0, breakAt);
                  const tail = headline.slice(breakAt + 1);
                  return (
                    <>
                      {main}
                      <br />
                      <em className="not-italic font-light" style={{ color: "#6E7D9B" }}>
                        {tail}
                      </em>
                    </>
                  );
                }
                return headline;
              })()}
            </h2>

            {/* Supporting copy */}
            <p
              className="text-[13px] md:text-[14px] leading-relaxed mb-9"
              style={{ color: "#6E7D9B", maxWidth: "34rem" }}
            >
              {copy}
            </p>

            {/* Buttons */}
            <div className="flex flex-row gap-2 sm:gap-3 w-full">
              <PrimaryBtn onClick={handleConsultation} label={primaryLabel} />
              <SecondaryBtn href={secondaryHref} label={secondaryLabel} />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
