// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type CursorState =
  | "default"
  | "link"
  | "image"
  | "cta"
  | "drag"
  | "scroll"
  | "text"
  | "input";

const STATE_CONFIG: Record<
  CursorState,
  {
    label: string;
    dotSize: string;
    ringSize: string;
    ringColor: string;
    ringBg: string;
    dotColor: string;
    lerpSpeed: number;
  }
> = {
  default: {
    label: "",
    dotSize: "8px",
    ringSize: "36px",
    ringColor: "rgba(2,6,23,0.35)",
    ringBg: "transparent",
    dotColor: "#020617",
    lerpSpeed: 0.35,
  },
  link: {
    label: "",
    dotSize: "6px",
    ringSize: "48px",
    ringColor: "rgba(50,74,97,0.6)",
    ringBg: "rgba(50,74,97,0.08)",
    dotColor: "#324A61",
    lerpSpeed: 0.4,
  },
  image: {
    label: "VIEW",
    dotSize: "4px",
    ringSize: "88px",
    ringColor: "rgba(255,255,255,0.85)",
    ringBg: "rgba(2,6,23,0.45)",
    dotColor: "transparent",
    lerpSpeed: 0.25,
  },
  cta: {
    label: "GO →",
    dotSize: "4px",
    ringSize: "96px",
    ringColor: "transparent",
    ringBg: "rgba(50,74,97,0.85)",
    dotColor: "transparent",
    lerpSpeed: 0.28,
  },
  drag: {
    label: "DRAG",
    dotSize: "4px",
    ringSize: "80px",
    ringColor: "rgba(50,74,97,0.5)",
    ringBg: "rgba(50,74,97,0.1)",
    dotColor: "transparent",
    lerpSpeed: 0.3,
  },
  scroll: {
    label: "SCROLL",
    dotSize: "4px",
    ringSize: "80px",
    ringColor: "rgba(2,6,23,0.3)",
    ringBg: "rgba(248,250,252,0.15)",
    dotColor: "transparent",
    lerpSpeed: 0.3,
  },
  text: {
    label: "",
    dotSize: "2px",
    ringSize: "28px",
    ringColor: "rgba(2,6,23,0.18)",
    ringBg: "transparent",
    dotColor: "#020617",
    lerpSpeed: 0.45,
  },
  input: {
    label: "",
    dotSize: "2px",
    ringSize: "28px",
    ringColor: "rgba(50,74,97,0.4)",
    ringBg: "transparent",
    dotColor: "#324A61",
    lerpSpeed: 0.45,
  },
};

function getState(target: HTMLElement): CursorState {
  // Walk up to find meaningful element
  let el: HTMLElement | null = target;

  while (el && el !== document.body) {
    const tag = el.tagName.toLowerCase();
    const role = el.getAttribute("role") || "";
    const dataCursor = el.dataset?.cursor;
    const type = (el as HTMLInputElement).type || "";

    // Explicit data-cursor override
    if (dataCursor) return dataCursor as CursorState;

    // Input / Textarea
    if (tag === "input" || tag === "textarea" || tag === "select")
      return "input";

    // Links and buttons
    if (
      tag === "a" ||
      tag === "button" ||
      role === "button" ||
      el.onclick !== null
    ) {
      // Check if it's a big CTA
      const isCTA =
        el.classList.contains("cta-zone") ||
        el.closest(".cta-zone") !== null ||
        (el.classList.toString().includes("px-8") &&
          el.classList.toString().includes("py-")) ||
        (el.closest("a") &&
          el.closest("a")!.classList.toString().includes("py-16"));
      return isCTA ? "cta" : "link";
    }

    // Scrollable containers
    const overflow = window.getComputedStyle(el).overflowX;
    if (
      (overflow === "auto" || overflow === "scroll") &&
      el.scrollWidth > el.clientWidth
    ) {
      return "drag";
    }

    // Marquee / slider / carousel
    if (
      el.classList.contains("drag-zone") ||
      el.classList.contains("marquee") ||
      el.closest("[data-marquee]") !== null ||
      el.closest("[class*='marquee']") !== null ||
      el.closest("[class*='slider']") !== null ||
      el.closest("[class*='carousel']") !== null ||
      el.closest("[class*='swiper']") !== null
    ) {
      return "drag";
    }

    // Images / figure / portfolio cards
    if (
      tag === "img" ||
      tag === "figure" ||
      tag === "video" ||
      el.closest("[data-cursor='image']") !== null
    ) {
      return "image";
    }

    // Scrollable sections (long content)
    const overflowY = window.getComputedStyle(el).overflowY;
    if (
      (overflowY === "auto" || overflowY === "scroll") &&
      el.scrollHeight > el.clientHeight + 10
    ) {
      return "scroll";
    }

    // Text content
    if (
      tag === "p" ||
      tag === "h1" ||
      tag === "h2" ||
      tag === "h3" ||
      tag === "h4" ||
      tag === "h5" ||
      tag === "li" ||
      tag === "span" ||
      tag === "label" ||
      tag === "blockquote"
    ) {
      return "text";
    }

    el = el.parentElement;
  }

  return "default";
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const mousePos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);
  const stateRef = useRef<CursorState>("default");

  const [visible, setVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const applyState = useCallback((state: CursorState) => {
    const cfg = STATE_CONFIG[state];
    const dot = dotRef.current;
    const ring = ringRef.current;
    const lbl = labelRef.current;
    if (!dot || !ring) return;

    stateRef.current = state;

    // Dot
    dot.style.width = cfg.dotSize;
    dot.style.height = cfg.dotSize;
    dot.style.background = cfg.dotColor;
    dot.style.opacity = cfg.dotColor === "transparent" ? "0" : "1";

    // Ring
    ring.style.width = cfg.ringSize;
    ring.style.height = cfg.ringSize;
    ring.style.borderColor = cfg.ringColor;
    ring.style.background = cfg.ringBg;

    // Label
    if (lbl) {
      lbl.textContent = cfg.label;
      lbl.style.opacity = cfg.label ? "1" : "0";
    }
  }, []);

  useEffect(() => {
    const mobile = window.innerWidth <= 768;
    if (mobile) return;
    setIsDesktop(true);

    // RAF animation loop — dot snaps instantly, ring lerps
    const loop = () => {
      const cfg = STATE_CONFIG[stateRef.current];
      const speed = cfg.lerpSpeed;

      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, speed);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, speed);

      const dot = dotRef.current;
      const ring = ringRef.current;

      if (dot) {
        dot.style.left = `${mousePos.current.x}px`;
        dot.style.top = `${mousePos.current.y}px`;
      }
      if (ring) {
        ring.style.left = `${ringPos.current.x}px`;
        ring.style.top = `${ringPos.current.y}px`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    // Mouse move — instant update for the dot, ring lerps in loop
    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    // State detection on hover
    const onOver = (e: MouseEvent) => {
      const state = getState(e.target as HTMLElement);
      applyState(state);
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    // Click flash effect
    const onClick = () => {
      const ring = ringRef.current;
      if (!ring) return;
      ring.style.transform = "translate(-50%, -50%) scale(0.7)";
      ring.style.transition = "transform 80ms ease, width 200ms ease, height 200ms ease, border-color 200ms ease, background 200ms ease";
      setTimeout(() => {
        if (ring) {
          ring.style.transform = "translate(-50%, -50%) scale(1)";
        }
      }, 120);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("click", onClick);
    };
  }, [applyState]);

  if (!isDesktop) return null;

  return (
    <>
      <style>{`
        html, body, * { cursor: none !important; }
      `}</style>

      {/* Inner dot — snaps instantly */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "#020617",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: visible ? 1 : 0,
          transition: "width 150ms ease, height 150ms ease, background 150ms ease, opacity 200ms ease",
          willChange: "left, top",
        }}
      />

      {/* Outer ring — lerp trails smoothly */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: "2px solid rgba(2,6,23,0.35)",
          background: "transparent",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: visible ? 1 : 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "width 220ms cubic-bezier(0.25,0.46,0.45,0.94), height 220ms cubic-bezier(0.25,0.46,0.45,0.94), border-color 220ms ease, background 220ms ease, opacity 200ms ease",
          willChange: "left, top",
          backdropFilter: "blur(0px)",
        }}
      >
        <span
          ref={labelRef}
          style={{
            color: "white",
            fontSize: "9px",
            fontWeight: 900,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            userSelect: "none",
            lineHeight: 1,
            opacity: 0,
            transition: "opacity 150ms ease",
            fontFamily: "var(--font-display, sans-serif)",
          }}
        />
      </div>
    </>
  );
}
