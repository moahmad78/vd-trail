// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
// [EXPERIMENTAL A/B] CTA Section V3 — Cinematic Closing Experience
"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useQuote } from "@/contexts/QuoteContext";

/* ─── Palette ───────────────────────────────────────────────────────── */
// Deep Navy   #0B1633
// Slate Blue  #6E7D9B
// Off White   #F7F7F5
// Soft Grey   #B7BDC9

/* ─── Blueprint Canvas ───────────────────────────────────────────────
   Slow-drifting architectural grid nodes at 3–5% opacity.
   Placed above the video, below the content layer.
────────────────────────────────────────────────────────────────────── */
interface Node { x: number; y: number; vx: number; vy: number }

function BlueprintCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const COUNT = 28;
    const MAX_DIST = 140;
    const nodes: Node[] = [];

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
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
      });
    }

    const draw = () => {
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
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const a = (1 - dist / MAX_DIST) * 0.18;
            ctx.strokeStyle = `rgba(11,22,51,${a})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(11,22,51,0.22)";
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
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
      style={{ opacity: 0.045, zIndex: 3 }}
    />
  );
}

/* ─── Primary Button ─────────────────────────────────────────────────
   Deep Navy · White text · Lift + shadow on hover
────────────────────────────────────────────────────────────────────── */
function PrimaryBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  const [over, setOver] = useState(false);
  return (
    <button
      onClick={onClick}
      id="ctav3-primary"
      className="inline-flex items-center justify-center rounded-xl font-bold text-[11px] uppercase tracking-[0.22em] transition-all duration-300"
      style={{
        backgroundColor: "#0B1633",
        color: "#F7F7F5",
        padding: "14px 34px",
        transform: over ? "translateY(-3px)" : "translateY(0)",
        boxShadow: over
          ? "0 14px 36px rgba(11,22,51,0.28)"
          : "0 4px 16px rgba(11,22,51,0.18)",
      }}
      onMouseEnter={() => setOver(true)}
      onMouseLeave={() => setOver(false)}
    >
      {children}
    </button>
  );
}

/* ─── Secondary Button ───────────────────────────────────────────────
   Off White bg · Deep Navy border + text · Fill on hover
────────────────────────────────────────────────────────────────────── */
function SecondaryBtn({ href, children }: { href: string; children: React.ReactNode }) {
  const [over, setOver] = useState(false);
  return (
    <Link
      href={href}
      id="ctav3-secondary"
      className="inline-flex items-center justify-center gap-2 rounded-xl font-bold text-[11px] uppercase tracking-[0.22em] transition-all duration-300"
      style={{
        backgroundColor: over ? "rgba(247,247,245,0.95)" : "#F7F7F5",
        color: "#0B1633",
        border: "1px solid #0B1633",
        padding: "13px 32px",
        transform: over ? "translateY(-3px)" : "translateY(0)",
        boxShadow: over ? "0 8px 24px rgba(11,22,51,0.10)" : "none",
      }}
      onMouseEnter={() => setOver(true)}
      onMouseLeave={() => setOver(false)}
    >
      {children}
      <svg
        width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true"
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

/* ─── Main Section ──────────────────────────────────────────────────── */

export default function CTAV3() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setIsQuoteOpen } = useQuote();

  // Set playback rate after mount (HTML video API)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <section
      aria-label="CTA — Cinematic v3"
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: "#F7F7F5",
        minHeight: 340,
      }}
    >
      {/* ── Layer 1: Video background ─────────────────────────────── */}
      <video
        ref={videoRef}
        src="/video/hero/hero1.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          objectFit: "cover",
          objectPosition: "center 30%",
          opacity: 0.22,
          filter: "blur(2px)",
          transform: "scale(1.05)",
          zIndex: 1,
        }}
      />

      {/* ── Layer 2: Soft off-white overlay ───────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(247,247,245,0.90) 0%, rgba(247,247,245,0.88) 50%, rgba(247,247,245,0.92) 100%)",
          zIndex: 2,
        }}
      />

      {/* ── Layer 3: Blueprint canvas (3–5%) ──────────────────────── */}
      <BlueprintCanvas />

      {/* ── Layer 4: Top + bottom hairlines ───────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: 1, backgroundColor: "rgba(11,22,51,0.08)", zIndex: 4 }}
      />
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: 1, backgroundColor: "rgba(11,22,51,0.08)", zIndex: 4 }}
      />

      {/* ── Layer 5: Content ──────────────────────────────────────── */}
      <div
        className="relative site-container py-16 md:py-20 flex flex-col items-center text-center"
        style={{ zIndex: 5 }}
      >
        {/* Small label */}
        <div className="flex items-center gap-3 mb-7">
          <span className="h-px w-5 flex-shrink-0" style={{ backgroundColor: "#6E7D9B" }} />
          <span
            className="text-[9.5px] font-bold uppercase tracking-[0.38em]"
            style={{ color: "#6E7D9B" }}
          >
            Start Your Project
          </span>
          <span className="h-px w-5 flex-shrink-0" style={{ backgroundColor: "#6E7D9B" }} />
        </div>

        {/* Main heading */}
        <h2
          className="font-bold leading-[1.05] tracking-[-0.03em] mb-4 max-w-2xl"
          style={{
            fontSize: "clamp(2rem, 4.2vw, 3.4rem)",
            color: "#0B1633",
          }}
        >
          Every Great Space
          <br />
          <em className="not-italic font-light" style={{ color: "#6E7D9B" }}>
            Begins With A Conversation.
          </em>
        </h2>

        {/* Supporting text */}
        <p
          className="text-sm md:text-[15px] leading-relaxed mb-10 max-w-xl"
          style={{ color: "#6E7D9B" }}
        >
          From luxury residences and hospitality destinations to educational and
          commercial environments, we transform ideas into enduring spaces with
          precision and purpose.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5">
          <PrimaryBtn onClick={() => setIsQuoteOpen(true)}>Book Consultation</PrimaryBtn>
          <SecondaryBtn href="/portfolio">View Our Work</SecondaryBtn>
        </div>
      </div>
    </section>
  );
}
