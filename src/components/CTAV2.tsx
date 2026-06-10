// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
// [EXPERIMENTAL A/B] CTA Section V2 — Architectural Editorial Conversion
"use client";

import Link from "next/link";
import { useState } from "react";

/* ─── Palette ───────────────────────────────────────────────────────── */
// Deep Navy   #0B1633
// Slate Blue  #6E7D9B
// Charcoal    #1E2433
// Off White   #F7F7F5
// Soft Grey   #B7BDC9

/* ─── Primary Button ─────────────────────────────────────────────────
   Deep Navy · White text · Subtle lift + shadow on hover
────────────────────────────────────────────────────────────────────── */
function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      id="ctav2-primary"
      className="inline-flex items-center justify-center gap-2 rounded-xl font-bold text-[11px] uppercase tracking-[0.22em] transition-all duration-300"
      style={{
        backgroundColor: "#0B1633",
        color: "#F7F7F5",
        padding: "14px 32px",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 12px 32px rgba(11,22,51,0.30)"
          : "0 4px 14px rgba(11,22,51,0.20)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </Link>
  );
}

/* ─── Secondary Button ───────────────────────────────────────────────
   Transparent · Deep Navy border + text · Soft fill on hover
────────────────────────────────────────────────────────────────────── */
function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      id="ctav2-secondary"
      className="inline-flex items-center justify-center gap-2 rounded-xl font-bold text-[11px] uppercase tracking-[0.22em] transition-all duration-300"
      style={{
        backgroundColor: hovered ? "rgba(247,247,245,0.10)" : "transparent",
        color: "#F7F7F5",
        border: "1px solid rgba(247,247,245,0.30)",
        padding: "14px 32px",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <svg
        className="w-3 h-3"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        style={{
          transition: "transform 0.3s ease",
          transform: hovered ? "translateX(2px)" : "translateX(0)",
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
    </Link>
  );
}

/* ─── Main Section ──────────────────────────────────────────────────── */

export default function CTAV2() {
  return (
    <section
      aria-label="CTA — Experimental v2"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#0B1633" }}
    >
      {/* ── Blueprint grid texture (2–3% opacity) ─────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            "linear-gradient(rgba(110,125,155,0.07) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(110,125,155,0.07) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: "52px 52px",
        }}
      />

      {/* ── Soft radial glow — centre depth ───────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 60%, rgba(110,125,155,0.08) 0%, transparent 70%)",
        }}
      />

      {/* ── Top hairline ──────────────────────────────────────────── */}
      <div
        className="relative z-10"
        style={{ height: 1, backgroundColor: "rgba(247,247,245,0.06)" }}
      />

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="relative z-10 site-container py-16 md:py-20 flex flex-col items-center text-center">

        {/* Small label */}
        <div className="flex items-center gap-3 mb-7">
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
          <span
            className="h-px w-5 flex-shrink-0"
            style={{ backgroundColor: "#6E7D9B" }}
          />
        </div>

        {/* Main heading */}
        <h2
          className="font-bold leading-[1.05] tracking-[-0.03em] mb-3 max-w-2xl"
          style={{
            fontSize: "clamp(2rem, 4.2vw, 3.4rem)",
            color: "#F7F7F5",
          }}
        >
          Let&rsquo;s Create Something Remarkable.
          <br />
          <em
            className="not-italic font-light"
            style={{ color: "#6E7D9B" }}
          >
            Designed Around Your Vision.
          </em>
        </h2>

        {/* Caption */}
        <p
          className="text-sm md:text-base leading-relaxed mb-10 max-w-xl"
          style={{ color: "#B7BDC9" }}
        >
          From luxury residences to large-scale commercial environments,
          we transform ideas into spaces that inspire.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5">
          <PrimaryButton href="/contact">
            Book Consultation
          </PrimaryButton>
          <SecondaryButton href="/portfolio">
            View Our Work
          </SecondaryButton>
        </div>
      </div>

      {/* ── Bottom hairline ───────────────────────────────────────── */}
      <div
        className="relative z-10"
        style={{ height: 1, backgroundColor: "rgba(247,247,245,0.06)" }}
      />
    </section>
  );
}
