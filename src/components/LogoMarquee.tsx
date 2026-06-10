// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";

import Image from "next/image";

const LOGOS = [
  { name: "AirAsia", url: "/assets/global/brands/Airasia 1.png" },
  { name: "IndiGo Engineering", url: "/assets/global/brands/Indigo 4.png" },
  { name: "Emirates SkyCargo", url: "/assets/global/brands/Emirates 2.png" },
  { name: "Scripbox", url: "/assets/global/brands/Scripbox 6.png" },
  { name: "Edureka", url: "/assets/global/brands/Edureka 8.png" },
  { name: "Aufait", url: "/assets/global/brands/Aufait 7.png" },
  { name: "Gokaldas Exports", url: "/assets/global/brands/Gokuldas 3.png" },
  { name: "Mantra Lounge", url: "/assets/global/brands/Mantra-Lounge 5.png" },
  { name: "Physics Wallah", url: "/assets/global/brands/pw.png" },
  { name: "Zluri", url: "/assets/global/brands/zluri.png" },
  { name: "Juego", url: "/assets/global/brands/juego-logo.png" },
  { name: "QpiAI", url: "/assets/global/brands/qpi.png" },
  { name: "Neofoods", url: "/assets/global/brands/new foods-Picsart-AiImageEnhancer-Picsart-AiImageEnhancer.png" },
  { name: "Apps for Barth", url: "/assets/global/brands/apps for bharath.png" },
  { name: "Mom & Me", url: "/assets/global/brands/mm.png" },
];

const duplicatedLogos = [...LOGOS, ...LOGOS];

const LogoMarquee = () => {
  return (
    <section className="py-16 border-t border-neutral-200/70 overflow-hidden">
      <div style={{ opacity: 1, filter: "blur(0px)", transform: "none" }}>
        <div className="site-container py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between w-full mb-12">
          <h2 className="font-semibold text-neutral-900 text-4xl md:text-6xl tracking-[-0.03em] leading-[0.95]">
            Trusted by <span className="italic font-light text-neutral-800">Industry Leaders</span>
          </h2>
          <p className="text-sm text-neutral-500 max-w-xs md:text-right leading-relaxed mt-2 md:mt-0">
            Workspace partner for leading enterprises,<br />
            high-growth start-ups, and technology-driven organisations.
          </p>
        </div>
      </div>
      </div>

      <div className="relative">
        {/* Fading Edges Gradients */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

        {/* Animation Track Wrapper */}
        <div className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused] transform-gpu will-change-transform backface-hidden">
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="w-32 h-16 relative mx-8 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <Image unoptimized={true}
                quality={95}
      src={logo.url}
                alt={logo.name}
                fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      loading="lazy"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
