// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
// [EXPERIMENTAL A/B] CTA Section V4 — Seamless Cinematic Editorial Closing
"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import { useQuote } from "@/contexts/QuoteContext";
import { trackEvent } from "@/lib/tracking";

/* ─── Palette ───────────────────────────────────────────────────────── */
// Deep Navy   #0B1633
// Slate Blue  #6E7D9B
// Off White   #F7F7F5
// Soft Grey   #B7BDC9

/* ─── Blueprint Canvas ───────────────────────────────────────────────
   Slow architectural node graph · 4% opacity · sits above video
────────────────────────────────────────────────────────────────────── */
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

/* ─── Buttons ───────────────────────────────────────────────────────── */

function PrimaryBtn({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={() => {
        onClick();
        trackEvent('footer_cta_click', { button_name: label });
      }}
      id="ctav4-primary"
      className="w-full sm:w-auto flex items-center justify-center relative overflow-hidden bg-[#0f172a] text-white text-[14px] font-bold tracking-wide h-[56px] px-8 rounded-full shadow-xl hover:shadow-[0_4px_20px_rgba(15,23,42,0.4)] hover:-translate-y-[2px] active:scale-95 transition-all duration-300 motion-reduce:transform-none whitespace-nowrap flex-1"
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
      onClick={() => trackEvent('footer_cta_click', { button_name: label })}
      id="ctav4-secondary"
      className="w-full sm:w-auto flex items-center justify-center relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 text-white text-[14px] font-semibold tracking-wide h-[56px] px-8 rounded-full hover:bg-white/20 hover:border-white/40 hover:-translate-y-[2px] active:scale-95 transition-all duration-300 motion-reduce:transform-none whitespace-nowrap flex-1"
      onMouseEnter={() => setOver(true)}
      onMouseLeave={() => setOver(false)}
    >
      {label}
      <svg
        width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true"
        className="ml-2"
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

export default function CTAV4() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setIsQuoteOpen } = useQuote();
  const isInView = useInView(containerRef, { once: true, margin: "300px" });

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.75;
  }, [isInView]);

  return (
    <section
      ref={containerRef}
      aria-label="CTA — Cinematic Editorial v4"
      className="relative w-full overflow-hidden min-h-auto md:min-h-[440px]"
      style={{ backgroundColor: "#F7F7F5" }}
    >

      {/* ══ LAYER 1: Video — full section width background ══════════ */}
      {isInView && (
        <video
          ref={videoRef}
          src="/video/hero/herovideo.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          preload="metadata"
          poster="/images/Services-card/hotel.webp"
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            objectFit: "cover",
            objectPosition: "center 35%",
            transform: "scale(1.04)",
            filter: "contrast(1.04) saturate(1.08) brightness(1.02)",
            zIndex: 1,
          }}
        />
      )}

      {/* ══ LAYER 2: Editorial dissolve overlay ══════════════════════════ */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#0f172a]/88 via-[#0f172a]/55 via-40% to-transparent to-70%"
        style={{ zIndex: 2 }}
      />

      {/* ══ LAYER 3: Blueprint canvas ════════════════════════════════ */}
      <BlueprintCanvas />

      {/* ══ LAYER 4: Hairlines ═══════════════════════════════════════ */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{ height: 1, backgroundColor: "rgba(11,22,51,0.07)", zIndex: 10 }}
      />
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: 1, backgroundColor: "rgba(11,22,51,0.07)", zIndex: 10 }}
      />

      {/* ══ LAYER 5: Content — left-anchored, floats above video ════ */}
      <div
        className="relative w-full h-full"
        style={{ zIndex: 5 }}
      >
        {/* Inner: constrain content to left ~44% on desktop */}
        <div
          className="site-container h-full flex items-center min-h-auto md:min-h-[440px]"
        >
          <div className="w-full lg:max-w-[44%] pt-8 pb-6 md:py-12 lg:py-16">

            {/* Small label */}
            <div className="flex items-center gap-2.5 mb-7">
              <span
                className="h-px w-5 flex-shrink-0 bg-white/60"
              />
              <span
                className="text-caption font-bold uppercase tracking-[0.38em] text-white/80"
              >
                Start Your Project
              </span>
            </div>

            {/* Main heading */}
            <h2
              className="text-[clamp(42px,4vw,64px)] font-[700] leading-[1.05] tracking-[-0.03em] drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)] mb-2.5 md:mb-4 text-white"
            >
              Every Great Space
              <br className="hidden md:block" />
              <em className="not-italic font-[300] md:ml-2 text-white/90">
                Begins With A Conversation
              </em>
            </h2>

            {/* Caption */}
            <p
              className="hidden md:block text-white/80 leading-[1.8] max-w-[520px] md:max-w-none md:whitespace-nowrap drop-shadow-md mb-9"
            >
              Transforming luxury residential, hospitality, and educational spaces with precision.
            </p>
            <p
              className="md:hidden text-white/80 leading-[1.8] max-w-[520px] drop-shadow-md mb-6"
            >
              Precision-crafted interiors tailored to your ambitions.
            </p>

            {/* Buttons */}
            <div className="flex flex-row gap-2 sm:gap-3 w-full">
              <PrimaryBtn onClick={() => setIsQuoteOpen(true)} label="Consultation" />
              <SecondaryBtn href="/portfolio" label="View Work" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
