// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
// [EXPERIMENTAL A/B] Trusted Network v2 — Final Frozen · Architectural Editorial
"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

/* ─── Palette ───────────────────────────────────────────────────────── */
// Deep Navy   #0B1633
// Slate Blue  #6E7D9B
// Charcoal    #1E2433
// Off White   #F7F7F5
// Soft Grey   #B7BDC9

/* ─── Logo Data ─────────────────────────────────────────────────────── */

const LOGOS = [
  { name: "Emirates SkyCargo",  src: "/assets/global/brands/Emirates 2.png" },
  { name: "AirAsia",            src: "/assets/global/brands/Airasia 1.png" },
  { name: "AppsForBharat",      src: "/assets/global/brands/apps for bharath.png" },
  { name: "Aufait",             src: "/assets/global/brands/Aufait 7.png" },
  { name: "Scripbox",           src: "/assets/global/brands/Scripbox 6.png" },
  { name: "Gokaldas Exports",   src: "/assets/global/brands/Gokuldas 3.png" },
  { name: "IndiGo Engineering", src: "/assets/global/brands/Indigo 4.png" },
  { name: "Mantra Lounge",      src: "/assets/global/brands/Mantra-Lounge 5.png" },
  { name: "Physics Wallah",     src: "/assets/global/brands/pw.png" },
  { name: "Zluri",              src: "/assets/global/brands/zluri.png" },
  { name: "Juego Studios",      src: "/assets/global/brands/juego-logo.png" },
  { name: "QpiAI",              src: "/assets/global/brands/qpi.png" },
  { name: "Edureka",            src: "/assets/global/brands/Edureka 8.png" },
];

// Triple-duplicate for a truly seamless loop
const TRACK = [...LOGOS, ...LOGOS, ...LOGOS];

/* ─── Canvas Network Background ──────────────────────────────────────
   Renders a slow-drifting architectural grid of nodes and thin
   connecting lines — blueprint aesthetic at ~6% opacity.
────────────────────────────────────────────────────────────────────── */

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const NODE_COUNT = 38;
    const MAX_DIST = 160;
    const nodes: Node[] = [];

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Seed nodes
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
      });
    }

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Move nodes + bounce
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      // Draw edges
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.22;
            ctx.strokeStyle = `rgba(110,125,155,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(110,125,155,0.30)";
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
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.06 }}
    />
  );
}

/* ─── Architectural Wave ─────────────────────────────────────────────
   Two thin SVG paths drifting slowly left → visible as a blueprint
   ruling line between caption and the logo marquee.
────────────────────────────────────────────────────────────────────── */

function ArchitecturalWave() {
  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden"
      style={{ height: 36 }}
    >
      <svg
        viewBox="0 0 2880 36"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 h-full"
        style={{
          width: "200%",
          animation: "tnv2-wave 16s linear infinite",
        }}
      >
        {/* Primary ruling line */}
        <path
          d="M0,18 C240,6 480,30 720,18 C960,6 1200,30 1440,18 C1680,6 1920,30 2160,18 C2400,6 2640,30 2880,18"
          fill="none"
          stroke="rgba(110,125,155,0.18)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Secondary depth line */}
        <path
          d="M0,22 C240,10 480,34 720,22 C960,10 1200,34 1440,22 C1680,10 1920,34 2160,22 C2400,10 2640,34 2880,22"
          fill="none"
          stroke="rgba(110,125,155,0.07)"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </svg>

      {/* Edge fades */}
      <div
        className="absolute inset-y-0 left-0 w-20 pointer-events-none"
        style={{ background: "linear-gradient(to right, #F7F7F5, transparent)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-20 pointer-events-none"
        style={{ background: "linear-gradient(to left, #F7F7F5, transparent)" }}
      />
    </div>
  );
}

/* ─── Logo Item ──────────────────────────────────────────────────────
   Hover: lift 3 px · scale 1.03 · soft shadow. No grayscale.
────────────────────────────────────────────────────────────────────── */

function LogoItem({ logo }: { logo: { name: string; src: string } }) {
  const [over, setOver] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 flex items-center justify-center w-[110px] h-[40px] mx-[20px] md:w-[148px] md:h-[52px] md:mx-[44px]"
      style={{
        transition: "transform 0.32s cubic-bezier(.22,.68,0,.98), filter 0.32s ease",
        transform:  over ? "translateY(-3px) scale(1.03)" : "translateY(0) scale(1)",
        filter:     over
          ? "drop-shadow(0 6px 14px rgba(11,22,51,0.09))"
          : "none",
      }}
      onMouseEnter={() => setOver(true)}
      onMouseLeave={() => setOver(false)}
    >
      <Image
        unoptimized
        src={logo.src}
        alt={logo.name}
        fill
        sizes="(max-width: 768px) 110px, 148px"
        className="object-contain"
        loading="lazy"
      />
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────── */

export default function TrustedNetworkV2() {
  const [running, setRunning] = useState(true);

  return (
    <section
      aria-label="Trusted Network — Experimental v2"
      className="relative w-full overflow-hidden pb-[max(env(safe-area-inset-bottom,20px),16px)] md:pb-6"
      style={{ backgroundColor: "#F7F7F5" }}
    >
      {/* ── Keyframes ──────────────────────────────────────────────── */}
      <style>{`
        @keyframes tnv2-wave {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes tnv2-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
      `}</style>

      {/* ── Animated network canvas background ─────────────────────── */}
      <NetworkCanvas />

      {/* ── Soft off-white overlay above canvas ────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(247,247,245,0.92), rgba(247,247,245,0.95))",
        }}
      />

      {/* ── Top hairline ───────────────────────────────────────────── */}
      <div
        className="relative z-10"
        style={{ height: 1, backgroundColor: "rgba(11,22,51,0.07)" }}
      />

      {/* ── Heading Block ──────────────────────────────────────────── */}
      <div className="relative z-10 site-container pt-6 md:pt-12 pb-2 md:pb-5">

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
            Trusted by Industry Leaders
          </span>
        </div>

        {/* Main heading — single line on desktop */}
        <h2
          className="text-[30px] md:text-h2 font-bold leading-[1.05] tracking-[-0.03em] mb-1.5 md:mb-3"
          style={{ color: "#0B1633" }}
        >
          Built on Trust.{" "}
          <span
            className="font-light"
            style={{ color: "#6E7D9B" }}
          >
            Chosen by Leaders.
          </span>
        </h2>

        {/* One-line caption */}
        <p
          className="text-[13px] md:text-small leading-snug md:leading-relaxed max-w-[280px] md:max-w-none line-clamp-2 md:line-clamp-none"
          style={{ color: "#B7BDC9" }}
        >
          Trusted by leading brands across hospitality, commercial, and
          institutional spaces.
        </p>
      </div>

      {/* ── Architectural Wave ─────────────────────────────────────── */}
      <div className="relative z-10">
        <ArchitecturalWave />
      </div>

      {/* ── Infinite Logo Marquee ──────────────────────────────────── */}
      <div
        className="relative z-10 w-full overflow-hidden pt-2 md:pt-5 pb-[24px] md:pb-[38px] lg:pb-[40px]"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
        onMouseEnter={() => setRunning(false)}
        onMouseLeave={() => setRunning(true)}
      >
        <div
          style={{
            display: "flex",
            width: "max-content",
            animation: "tnv2-marquee 44s linear infinite",
            animationPlayState: running ? "running" : "paused",
          }}
        >
          {TRACK.map((logo, i) => (
            <LogoItem key={`${logo.name}-${i}`} logo={logo} />
          ))}
        </div>
      </div>

      {/* ── Editorial Transition Divider ─────────────────────────── */}
      <div
        aria-hidden="true"
        className="relative z-10 flex items-center justify-center gap-3 md:gap-4 mt-3 md:mt-[50px] pb-1 md:pb-2"
      >
        <div
          className="h-px flex-1 max-w-[120px]"
          style={{ background: "linear-gradient(to right, transparent, rgba(11,22,51,0.25))" }}
        />
        <div className="flex items-center gap-3">
          <div
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: "rgba(11,22,51,0.25)" }}
          />
          <span
            className="text-caption font-bold uppercase tracking-[0.45em]"
            style={{ color: "rgba(11,22,51,0.25)" }}
          >
            Curated Portfolio
          </span>
          <div
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: "rgba(11,22,51,0.25)" }}
          />
        </div>
        <div
          className="h-px flex-1 max-w-[120px]"
          style={{ background: "linear-gradient(to left, transparent, rgba(11,22,51,0.25))" }}
        />
      </div>
    </section>
  );
}
