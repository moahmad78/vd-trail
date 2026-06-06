// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";

import { motion } from "framer-motion";
import { Sofa, GraduationCap, Hotel, Palette, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useQuote } from "@/contexts/QuoteContext";
import StaggerGrid from "@/components/animations/StaggerGrid";
import SlideUpFade from "@/components/animations/SlideUpFade";
import ImageReveal from "./animations/ImageReveal";
import HoverButton from "./animations/HoverButton";
import SectionWave from "@/components/ui/SectionWave";
import Image from "next/image";

const coreServices = [
  {
    title: "Residential Interiors",
    description: "Bespoke design for premium homes and villas. We craft personalized living spaces that blend high-end aesthetics with functional brilliance.",
    icon: <Sofa className="w-8 h-8 text-[#0f172a]" />,
    image: "/assets/home/hero/slide-2.jpg",
    href: "/services/residential"
  },
  {
    title: "Hospitality Interiors",
    description: "Ambiance that keeps your guests returning. We engineer immersive environments for hotels, luxury resorts, and fine-dining restaurants.",
    icon: <Hotel className="w-8 h-8 text-[#0f172a]" />,
    image: "/assets/work/filter-grid/apex-lounge.jpg",
    href: "/services/hospitality"
  },
  {
    title: "Educational Interiors",
    description: "Ergonomic learning environments for schools and colleges. Durable, agile spaces architected to foster institutional innovation.",
    icon: <GraduationCap className="w-8 h-8 text-[#0f172a]" />,
    image: "/assets/home/budget-pricing/education.jpg",
    href: "/services/education"
  }
];

const interiorHighlight = {
  title: "Premium Interior Gallery",
  headline: "Bespoke Woodwork & Artisanal Finishes.",
  description: "Exquisite craftsmanship meets automated precision. Our fabrication unit engineers premium custom cabinetry, architectural paneling, and bespoke furniture tailored for luxury interiors.",
  icon: <Palette className="w-10 h-10 text-white" />,
  images: [
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800",
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800"
  ],
  href: "/gallery"
};



const allLogos = [
  { src: "/assets/global/brands/Airasia 1.png", alt: "AirAsia" },
  { src: "/assets/global/brands/Scripbox 6.png", alt: "Scripbox" },
  { src: "/assets/global/brands/Aufait 7.png", alt: "Aufait" },
  { src: "/assets/global/brands/zluri.png", alt: "Zluri" },
  { src: "/assets/global/brands/qpi.png", alt: "QpiAI" },
  { src: "/assets/global/brands/Emirates 2.png", alt: "Emirates SkyCargo" },
  { src: "/assets/global/brands/Mantra-Lounge 5.png", alt: "Mantra Lounge" },
  { src: "/assets/global/brands/Gokuldas 3.png", alt: "Gokaldas Exports" },
  { src: "/assets/global/brands/juego-logo.png", alt: "Juego" },
  { src: "/assets/global/brands/Indigo 4.png", alt: "IndiGo Engineering" },
  { src: "/assets/global/brands/pw.png", alt: "Physics Wallah" },
  { src: "/assets/global/brands/Edureka 8.png", alt: "Edureka" },
  { src: "/assets/global/brands/new foods-Picsart-AiImageEnhancer-Picsart-AiImageEnhancer.png", alt: "Neofoods" },
  { src: "/assets/global/brands/apps for bharath.png", alt: "Apps for Barth" },
  { src: "/assets/global/brands/mm.png", alt: "Mom & Me" }
];


const ServiceGrid = () => {
 const { setIsQuoteOpen } = useQuote();
  
 return (
 <section id="services" className="py-12 bg-white">
 <div className="site-container">
 <SlideUpFade>
 <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
 <div className="max-w-2xl">
 <h2 className="text-section text-base font-bold text-[#0f172a] mb-4">Core <span className="italic font-light">Expertise</span></h2>
 <h3 className="text-card text-4xl md:text-5xl font-bold text-[#0f172a] flex flex-wrap items-center">Technical Interior{" "}<span className="italic font-light inline-flex items-center">Execution<SectionWave /></span></h3>
 </div>
 <p className="mt-6 md:mt-0 text-neutral-500 max-w-md">
 We provide end-to-end design and bespoke woodwork services, ensuring artisanal quality at every touchpoint.
 </p>
 </div>
 </SlideUpFade>

 {/* Row 1: The Core Four */}
 <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
 {coreServices.map((service, index) => (
 <div
    key={index}
    className="p-8 bg-white rounded-2xl border border-neutral-200/80 shadow-sm flex flex-col justify-between h-full group relative transition-all hover:shadow-xl hover:-translate-y-2 hover:border-[#0f172a]/30"
  >
    <div>
      <div className="h-48 overflow-hidden rounded-xl mb-6 relative">
        <Image unoptimized={true} 
          quality={95}
      priority
      src={service.image} 
          alt={`${service.title} - Professional Interior Design`}
          fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="mb-6 p-3 rounded-2xl bg-slate-50 w-fit shadow-sm border border-slate-100">
        {service.icon}
      </div>
      <h4 className="text-card text-xl font-bold mb-4 text-[#0f172a]">{service.title}</h4>
      <p className="text-neutral-500 mb-6 text-sm line-clamp-3 leading-relaxed">
        {service.description}
      </p>
    </div>
    <Link href={service.href} className="flex items-center gap-2 text-neutral-900 hover:text-neutral-700 font-medium text-sm transition-colors mt-4 w-fit">
      Learn More <ChevronRight size={16} />
    </Link>
  </div>
 ))}
 </StaggerGrid>

 {/* Row 2: Client Trust & Expertise Matrix */}
        <ImageReveal className="group relative overflow-hidden rounded-[2rem] sm:rounded-[3rem] bg-[#0f172a] text-white">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-0 items-stretch">
            <div className="relative p-8 sm:p-12 lg:p-14 flex flex-col justify-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <Image unoptimized={true} 
                  quality={95}
      priority
      src="/assets/work/details-canvas/corporate-bg.jpg" 
                  alt="Architecture Background" 
                  fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/95 via-[#0f172a]/85 to-transparent"></div>
              </div>
              <div className="relative z-10">
                <h4 className="text-white text-3xl md:text-5xl font-bold tracking-[-0.03em] leading-tight mb-4">
                  Corporate Hubs & <span className="italic font-light">Technical Execution</span>
                </h4>
                <p className="text-white/80 text-sm md:text-base max-w-md leading-relaxed min-h-[80px]">
                  Engineering high-performance enterprise workspaces, automated structural BIM frameworks, and acoustic interior environments. We bridge architectural precision with turnkey industrial fabrication for sector leaders.
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-8 relative z-10">
                  <button onClick={() => setIsQuoteOpen(true)} className="h-12 px-6 bg-white text-[#0f172a] font-sans font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-neutral-100 transition-all">
                    Get a Quote
                  </button>
                  <Link href="/portfolio" className="flex items-center justify-center h-12 px-6 border border-[#0f172a] bg-transparent text-white font-sans font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-[#0f172a] hover:border-[#0f172a] transition-all">
                    View Our Works
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-neutral-50 p-8 md:p-14 flex flex-col justify-center relative overflow-hidden rounded-r-3xl">
              <div className="absolute top-6 right-8 pointer-events-none hidden sm:block z-20">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold">
                  MATRIX // 01
                </span>
              </div>
              
              <motion.div 
                className="absolute inset-0 opacity-[0.03] pointer-events-none stroke-neutral-950"
                animate={{ x: [-10, 10, -10], y: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              >
                <svg viewBox="0 0 1440 320" className="w-full h-full object-cover">
                  <path fill="none" strokeWidth="4" d="M0,160 C288,240 576,80 864,160 C1152,240 1440,160 1440,160" />
                </svg>
              </motion.div>
              
              <div className="mb-4 text-left relative z-10">
                <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-semibold block mb-1">
                  Corporate Alliance
                </span>
                <h3 className="font-sans text-xl font-medium text-neutral-900 tracking-[-0.01em]">
                  Our Trusted Client Network
                </h3>
                <p className="text-left mt-3 max-w-xl text-neutral-600 text-xs md:text-sm font-normal leading-relaxed">
                  Collaborating with global pioneers to conceptualize, engineer, and build premier workspaces. From fast-scaling tech hubs to boutique commercial spaces, we deliver certified turnkey infrastructure.
                </p>
              </div>
              
              <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] mt-12 mb-4 z-10">
                <div className="flex w-max animate-marquee">
                  {[0, 1].map((set) => (
                    <div key={set} className="flex shrink-0">
                      {allLogos.map((logo, i) => (
                        <div key={i} className="h-12 md:h-16 w-40 relative mx-8 flex-shrink-0">
                          <Image unoptimized={true} 
                            quality={95}
      priority
      src={logo.src} 
                            alt={logo.alt} 
                            fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      
                            className="object-contain" 
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-10 pt-6 border-t border-neutral-200/60 relative z-10">
                <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0f172a]" /> 300+ Spaces Delivered
                </span>
                <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0f172a]" /> Pan-India Execution
                </span>
                <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0f172a]" /> 100% Turnkey Compliance
                </span>
              </div>
            </div>
          </div>
        </ImageReveal>
 </div>
 </section>
 );
};

export default ServiceGrid;
