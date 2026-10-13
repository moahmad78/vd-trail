"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Native momentum scrolling is much faster on mobile / touch devices
    const isMobileOrTouch =
      window.innerWidth < 768 ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    // Check for user's reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobileOrTouch || prefersReducedMotion) {
      return;
    }

    // Initialize Lenis for desktop wheel scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Make sure anchor links work properly with smooth scroll
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    const handleAnchorClick = function (this: HTMLAnchorElement, e: Event) {
      e.preventDefault();
      const target = this.getAttribute('href');
      if (target && target !== '#') {
        lenis.scrollTo(target);
      }
    };
    
    anchorLinks.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
      cancelAnimationFrame(rafId);
      anchorLinks.forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
