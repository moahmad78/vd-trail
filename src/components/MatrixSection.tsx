import Link from "next/link";

export default function MatrixSection() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-12">
      <div
        className="group relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] bg-[#0f172a] text-white"
        style={{ opacity: 1, clipPath: "inset(0% 0px)", transform: "none" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-0 items-stretch">
          {/* LEFT COMPONENT COLUMN LAYER */}
          <div className="relative p-8 sm:p-12 lg:p-14 flex flex-col justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                alt="Architecture Background"
                decoding="async"
                className="object-cover"
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0,
                  color: "transparent",
                }}
                src="/assets/work/details-canvas/corporate-bg.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/95 via-[#0f172a]/85 to-transparent"></div>
            </div>

            <div className="relative z-10">
              <h4 className="text-white text-3xl md:text-5xl font-bold tracking-[-0.03em] leading-tight mb-4">
                Turnkey Architecture &amp;{" "}
                <span className="italic font-light">Technical Execution</span>
              </h4>
              <p className="text-white/80 text-sm md:text-base max-w-md leading-relaxed min-h-[80px]">
                Engineering high-performance corporate workspaces, luxury
                hospitality venues, and elite structural frameworks. We bridge
                architectural precision with turnkey industrial fabrication to
                deliver zero-tolerance execution for sector leaders.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-8 relative z-10">
                <button className="h-12 px-6 bg-white text-[#0f172a] font-sans font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-100 transition-all">
                  Get a Quote
                </button>
                <Link
                  className="flex items-center justify-center h-12 px-6 border border-[#0f172a] bg-transparent text-white font-sans font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-[#0f172a] hover:border-[#0f172a] transition-all"
                  href="/portfolio"
                >
                  View Our Works
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT BRAND MARQUEE COLUMN LAYER */}
          <div className="bg-neutral-50 p-8 md:p-14 flex flex-col justify-center relative overflow-hidden rounded-r-3xl">
            <div className="absolute top-6 right-8 pointer-events-none hidden sm:block z-20">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold">
                MATRIX // 01
              </span>
            </div>

            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none stroke-neutral-950"
              style={{
                transform: "translateX(-8.15876px) translateY(-4.07938px)",
              }}
            >
              <svg
                viewBox="0 0 1440 320"
                className="w-full h-full object-cover"
              >
                <path
                  fill="none"
                  strokeWidth="4"
                  d="M0,160 C288,240 576,80 864,160 C1152,240 1440,160 1440,160"
                />
              </svg>
            </div>

            <div className="mb-4 text-left relative z-10">
              <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold block mb-1">
                Corporate Alliance
              </span>
              <h3 className="font-sans text-xl font-medium text-neutral-900 tracking-[-0.01em]">
                Our Trusted Client Network
              </h3>
              <p className="text-left mt-3 max-w-xl text-neutral-600 text-xs md:text-sm font-normal leading-relaxed">
                Collaborating with market leaders, premium brands, and
                enterprise networks to execute high-fidelity environments. From
                smart co-living infrastructures to massive commercial layouts,
                we build at scale.
              </p>
            </div>

            {/* INFINITE RUNNING MARQUEE TRACK (Unified Dual Multi-Logo Stream) */}
            <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] mt-12 mb-4 z-10">
              <div className="flex w-max animate-marquee">
                {/* LOOP TIER 1 */}
                <div className="flex shrink-0">
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="AirAsia"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/Airasia 1.png"
                    />
                  </div>
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="Scripbox"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/Scripbox 6.png"
                    />
                  </div>
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="Aufait"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/Aufait 7.png"
                    />
                  </div>
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="Zluri"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/zluri.png"
                    />
                  </div>
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="QpiAI"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/qpi.png"
                    />
                  </div>
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="Emirates SkyCargo"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/Emirates 2.png"
                    />
                  </div>
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="Mantra Lounge"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/Mantra-Lounge 5.png"
                    />
                  </div>
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="Gokaldas Exports"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/Gokuldas 3.png"
                    />
                  </div>
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="Juego"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/juego-logo.png"
                    />
                  </div>
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="IndiGo Engineering"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/Indigo 4.png"
                    />
                  </div>
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="Physics Wallah"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/pw.png"
                    />
                  </div>
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="Edureka"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/Edureka 8.png"
                    />
                  </div>
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="Neofoods"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/new foods-Picsart-AiImageEnhancer-Picsart-AiImageEnhancer.png"
                    />
                  </div>
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="Apps for Barth"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/apps for bharath.png"
                    />
                  </div>
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="Mom &amp; Me"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/mm.png"
                    />
                  </div>
                </div>

                {/* LOOP TIER 2 (Seamless Replication) */}
                <div className="flex shrink-0">
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="AirAsia"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/Airasia 1.png"
                    />
                  </div>
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="Scripbox"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/Scripbox 6.png"
                    />
                  </div>
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="Aufait"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/Aufait 7.png"
                    />
                  </div>
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="Zluri"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/zluri.png"
                    />
                  </div>
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="QpiAI"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/qpi.png"
                    />
                  </div>
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="Emirates SkyCargo"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/Emirates 2.png"
                    />
                  </div>
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="Mantra Lounge"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/Mantra-Lounge 5.png"
                    />
                  </div>
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="Gokaldas Exports"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/Gokuldas 3.png"
                    />
                  </div>
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="Juego"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/juego-logo.png"
                    />
                  </div>
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="IndiGo Engineering"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/Indigo 4.png"
                    />
                  </div>
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="Physics Wallah"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/pw.png"
                    />
                  </div>
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="Edureka"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/Edureka 8.png"
                    />
                  </div>
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="Neofoods"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/new foods-Picsart-AiImageEnhancer-Picsart-AiImageEnhancer.png"
                    />
                  </div>
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="Apps for Barth"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/apps for bharath.png"
                    />
                  </div>
                  <div className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                    <img
                      alt="Mom &amp; Me"
                      className="object-contain"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        color: "transparent",
                      }}
                      src="/assets/global/brands/mm.png"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM DOT COMPLIANCE METRICS RIBBON */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-10 pt-6 border-t border-neutral-200/60 relative z-10">
              <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0f172a]"></span>{" "}
                300+ Spaces Delivered
              </span>
              <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0f172a]"></span>{" "}
                Pan-India Execution
              </span>
              <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0f172a]"></span>{" "}
                100% Turnkey Compliance
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
