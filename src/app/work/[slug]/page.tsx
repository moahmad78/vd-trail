"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';

// --- MOCK DATA: Simulating complete database records for 8 projects ---
const projectsData = [
  {
    id: "apps-for-bharat",
    title: "APPS FOR BHARAT",
    descriptor: "VIBRANT STARTUP HEADQUARTERS",
    description: "Designed to reflect a modern, vibrant tech culture while staying deeply rooted in Indian cultural motifs. The Apps for Bharat headquarters is an open-plan office space featuring thematic meeting rooms, an expansive central collaboration zone, and ergonomic workstations designed for maximum agility and team synergy.",
    heroImage: "/assets/work/filter-grid/apps-for-bharat.png",
    specs: {
      firm: "Voomet Design",
      leadDesigner: "Sahil Sheikh",
      area: "8,200 Sq. Ft. / 760 m²",
      materials: "Exposed Brick, Natural Wood, Concrete Finish, Acoustic Fabric"
    },
    features: ["Custom breakout zones", "Ergonomic agile seating", "Themed meeting pods", "Open collaborative pantry", "Biophilic design elements"],
    gallery: [
      "/assets/work/details-canvas/apps-for-bharat/1.png",
      "/assets/work/details-canvas/apps-for-bharat/2.png",
      "/assets/work/details-canvas/apps-for-bharat/3.png",
      "/assets/work/details-canvas/apps-for-bharat/4.png"
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "zluri",
    title: "ZLURI",
    descriptor: "OFFICE OF THE FUTURE",
    description: "Zluri's office is an expansive, light-filled environment tailored for a hyper-growth tech firm. It seamlessly blends raw industrial aesthetics with premium, refined finishes. The layout encourages both deep focus and spontaneous collaboration through intelligently zoned neighborhoods and state-of-the-art acoustic treatments.",
    heroImage: "/assets/work/filter-grid/zluri.png",
    specs: {
      firm: "Voomet Design",
      leadDesigner: "Design Team",
      area: "12,500 Sq. Ft. / 1,160 m²",
      materials: "Glass, Steel, Premium Laminates, Acoustic Panels"
    },
    features: ["Unique lighting installations", "Integrated modular workstations", "Movable acoustic features", "Smart conference rooms"],
    gallery: [
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1539628399213-d6aa89c93074?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80"
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "qpiai",
    title: "QPIAI",
    descriptor: "QUANTUM TECH LAB",
    description: "A highly sophisticated workspace built for one of the leading quantum computing companies. The QpiAI office requires specialized infrastructural support, clean lines, and an atmosphere of extreme focus. Minimalist design choices highlight the cutting-edge work happening within the facility.",
    heroImage: "/assets/work/filter-grid/qpiai.png",
    specs: {
      firm: "Voomet Design",
      leadDesigner: "Technical Design Group",
      area: "9,000 Sq. Ft. / 836 m²",
      materials: "Polished Concrete, Matte Black Metal, LED Linear Profiles"
    },
    features: ["Specialized lab environments", "High-security access zones", "Minimalist workstation layout", "Advanced HVAC systems"],
    gallery: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80"
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "pw-brigade",
    title: "PHYSICS WALLAH",
    descriptor: "ED-TECH CAMPUS & STUDIOS",
    description: "Physics Wallah's dynamic campus blends high-tech recording studios with expansive, vibrant team floors. The design language speaks to their energetic educational brand, using bold brand colors balanced against neutral, sound-absorbing architectural elements.",
    heroImage: "/assets/work/filter-grid/pw.png",
    specs: {
      firm: "Voomet Design",
      leadDesigner: "Creative Studio",
      area: "15,000 Sq. Ft. / 1,393 m²",
      materials: "Acoustic Baffles, Brand Vinyls, Toughened Glass"
    },
    features: ["Soundproof recording studios", "Large town-hall seating", "Vibrant brand integration", "Dynamic collaboration walls"],
    gallery: [
      "/assets/work/details-canvas/pw-brigade/1.png",
      "/assets/work/details-canvas/pw-brigade/2.png",
      "/assets/work/details-canvas/pw-brigade/3.png",
      "/assets/work/details-canvas/pw-brigade/4.png"
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "juego",
    title: "JUEGO",
    descriptor: "GAMING & ANIMATION STUDIO",
    description: "An incredibly creative, dark-themed studio designed specifically for game developers and 3D animators. Lighting control is paramount here, with indirect RGB accents highlighting the industrial ceilings while maintaining zero glare on the artists' high-resolution monitors.",
    heroImage: "/assets/work/filter-grid/juego.png",
    specs: {
      firm: "Voomet Design",
      leadDesigner: "Design Team",
      area: "6,500 Sq. Ft. / 603 m²",
      materials: "Dark Wood Finishes, Exposed Ceiling, Neon Accents"
    },
    features: ["Zero-glare studio lighting", "High-capacity server rooms", "Creative brainstorming lounges", "Custom gaming setups"],
    gallery: [
      "/assets/work/details-canvas/juego/2.png",
      "/assets/work/details-canvas/juego/3.png",
      "/assets/work/details-canvas/juego/4.png",
      "/assets/work/details-canvas/juego/5.png"
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "orbit",
    title: "ORBIT",
    descriptor: "EXECUTIVE CORPORATE HQ",
    description: "A timeless, ultra-premium corporate environment. Orbit's headquarters uses rich textures, warm lighting, and classic architectural symmetry to project stability and trust. The space includes an impressive executive suite and a grand reception lobby.",
    heroImage: "/assets/work/filter-grid/orbit.jpg",
    specs: {
      firm: "Voomet Design",
      leadDesigner: "Luxury Interiors Team",
      area: "11,000 Sq. Ft. / 1,021 m²",
      materials: "Italian Marble, Walnut Veneers, Brass Accents"
    },
    features: ["Grand reception lobby", "Executive boardroom", "Premium lounge spaces", "Custom millwork"],
    gallery: [
      "/assets/work/details-canvas/orbit/1.jpg",
      "/assets/work/details-canvas/orbit/2.jpg",
      "/assets/work/details-canvas/orbit/4.jpg",
      "/assets/work/details-canvas/orbit/5.jpg"
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "littlegym",
    title: "THE LITTLE GYM",
    descriptor: "CHILDREN'S FITNESS CENTER",
    description: "A bright, playful, and incredibly safe environment tailored for children's physical development. The design prioritizes child safety standards with padded flooring, curved edges, and an uplifting, colorful aesthetic that energizes the space.",
    heroImage: "/assets/work/filter-grid/littlegym.png",
    specs: {
      firm: "Voomet Design",
      leadDesigner: "Retail & Spaces Team",
      area: "4,500 Sq. Ft. / 418 m²",
      materials: "Impact-absorbing Foam, Vinyl Flooring, Child-safe Paint"
    },
    features: ["Specialized gym equipment zones", "Parent viewing lounge", "Safe curved-edge millwork", "Vibrant color zoning"],
    gallery: [
      "/assets/work/details-canvas/littlegym/1.png",
      "/assets/work/details-canvas/littlegym/2.png",
      "/assets/work/details-canvas/littlegym/3.png",
      "/assets/work/details-canvas/littlegym/4.png"
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  },
  {
    id: "happey",
    title: "HAPPEY",
    descriptor: "MODERN FINTECH OFFICE",
    description: "Happey's office reflects the fast-paced, secure, and innovative nature of the fintech industry. The layout seamlessly integrates high-density workstations with private focus rooms and vibrant cafe areas, supporting a diverse range of working styles.",
    heroImage: "/assets/work/filter-grid/happey.jpg",
    specs: {
      firm: "Voomet Design",
      leadDesigner: "Corporate Interiors Team",
      area: "10,200 Sq. Ft. / 947 m²",
      materials: "Acoustic Ceiling Tiles, Carpet Planks, Toughened Glass"
    },
    features: ["High-density benching", "Private focus phone-booths", "Large town-hall cafeteria", "Secure server infrastructure"],
    gallery: [
      "/assets/work/details-canvas/happey/2.jpeg",
      "/assets/work/details-canvas/happey/3.jpeg",
      "/assets/work/details-canvas/happey/4.jpeg",
      "/assets/work/details-canvas/happey/5.jpeg"
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  }
];

export default function ProjectDetailsPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>("");

  // Find the project, or provide a fallback if not found
  const project = projectsData.find((p) => p.id === slug);

  const openLightbox = (imgSrc: string) => {
    setCurrentImage(imgSrc);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImage("");
  };

  if (!project) {
    return (
      <main className="min-h-screen bg-[#fcfcfc] pt-24 pb-20 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-light text-neutral-800 mb-4">Project Not Found</h1>
        <p className="text-neutral-500 mb-8">The project you are looking for does not exist or has been moved.</p>
        <Link href="/" className="px-6 py-3 bg-[#0f172a] text-white rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors">
          Return Home
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fdfdfd] text-neutral-900 pb-24">
      
      {/* 1. HERO BANNER WITH GLASSMORPHISM OVERLAY */}
      <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden bg-[#0f172a]">
        <Image unoptimized={true} 
          quality={95}
      priority
      src={project.heroImage} 
          alt={project.title} 
          fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      
          className="object-cover opacity-90"
        />
        {/* Dark Gradient Vignette for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 via-transparent to-[#0f172a]/20 pointer-events-none"></div>
        
        {/* Glassmorphism Title Overlay */}
        <div className="absolute bottom-10 md:bottom-16 left-1/2 -translate-x-1/2 w-[90%] md:w-auto min-w-[300px]">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 md:p-8 rounded-2xl shadow-2xl text-center">
            <p className="text-white/80 text-xs md:text-sm uppercase tracking-[0.2em] font-semibold mb-2">View Project Details</p>
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">{project.title}</h1>
          </div>
        </div>

        {/* Back Navigation Breadcrumb overlayed at top left */}
        <div className="absolute top-24 left-4 md:left-10 z-10">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-white/90 hover:text-white text-xs md:text-sm font-semibold tracking-widest uppercase bg-[#0f172a]/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 transition-all hover:bg-[#0f172a]/40">
            &larr; View Our Work
          </Link>
        </div>
      </section>

      {/* 2. SPLIT-LAYOUT CONTENT AREA */}
      <section className="site-container mx-auto px-4 md:px-8 mt-16 md:mt-24 max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* LHS: PROJECT METADATA & PROFILE */}
          <div className="lg:col-span-5 flex flex-col space-y-10">
            
            {/* Title Block */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 uppercase tracking-tight">
                {project.title} <span className="text-neutral-400 font-light">&mdash;</span>
              </h2>
              <h3 className="text-lg md:text-xl text-neutral-500 font-light mt-1 uppercase tracking-wide">
                {project.descriptor}
              </h3>
            </div>

            {/* Description */}
            <div className="prose prose-neutral">
              <p className="text-neutral-600 leading-relaxed text-[15px] md:text-base">
                {project.description}
              </p>
            </div>

            {/* Dynamic Specifications Grid */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Architect / Firm</p>
                  <p className="text-sm font-medium text-neutral-800">{project.specs.firm}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Lead Designer</p>
                  <p className="text-sm font-medium text-neutral-800">{project.specs.leadDesigner}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Total Area</p>
                  <p className="text-sm font-medium text-neutral-800">{project.specs.area}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">Materials</p>
                  <p className="text-sm font-medium text-neutral-800 leading-tight">{project.specs.materials}</p>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div>
              <h4 className="text-sm uppercase tracking-widest text-neutral-900 font-bold mb-5 flex items-center gap-2">
                <span className="w-4 h-px bg-[#0f172a]"></span>
                Features List
              </h4>
              <ul className="space-y-3">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[15px] text-neutral-600">
                    <svg className="w-4 h-4 text-neutral-400 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle cx="12" cy="12" r="4" fill="currentColor" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

          </div>


          {/* RHS: RICH MEDIA PRESENTATION GRID */}
          <div className="lg:col-span-7 flex flex-col space-y-16">
            
            {/* Project Photos Section (2x2 Grid) */}
            <div>
              <h4 className="text-sm uppercase tracking-widest text-neutral-900 font-bold mb-6 flex items-center gap-2">
                PROJECT PHOTOS
                <span className="flex-1 h-px bg-slate-200 ml-4"></span>
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                {project.gallery.slice(0, 4).map((imgUrl, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => openLightbox(imgUrl)}
                    className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-zoom-in bg-slate-100 shadow-sm border border-slate-200/50"
                  >
                    <Image unoptimized={true} 
                      quality={95}
      priority
      src={imgUrl} 
                      alt={`${project.title} Gallery ${idx + 1}`} 
                      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      
                    />
                    <div className="absolute inset-0 bg-[#0f172a]/0 group-hover:bg-[#0f172a]/10 transition-colors duration-300 flex items-center justify-center">
                      <span className="bg-white/90 backdrop-blur-sm text-neutral-900 text-xs px-3 py-1.5 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                        Expand
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Video Section */}
            <div>
              <h4 className="text-sm uppercase tracking-widest text-neutral-900 font-bold mb-6 flex items-center gap-2">
                PROJECT VIDEO
                <span className="flex-1 h-px bg-slate-200 ml-4"></span>
              </h4>
              
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-slate-200 bg-[#0f172a]">
                <video 
                  controls 
                  className="w-full h-full object-cover"
                  poster={project.heroImage}
                  preload="metadata"
                >
                  <source src={project.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. LIGHTBOX MODAL OVERLAY */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0f172a]/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/60 hover:text-white transition-colors p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-lg"
            aria-label="Close lightbox"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="relative w-full max-w-6xl max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <Image unoptimized={true} 
              quality={95}
      priority
      src={currentImage} 
              alt="Expanded view" 
              fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      
              className="object-contain rounded-md shadow-2xl"
            />
          </div>
        </div>
      )}

    </main>
  );
}
