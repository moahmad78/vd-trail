// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Home, Hotel, GraduationCap, Briefcase, Layers, ArrowRight } from 'lucide-react';

const EXPERIMENTAL_SERVICES = [
  {
    id: 'luxury-residential',
    title: 'Luxury Residential',
    collapsedDesc: 'Bespoke turnkey interiors.',
    expandedDesc: 'Bespoke turnkey interiors crafted for villas, premium apartments, and modern homes.',
    link: '/services/residential-interiors',
    btnText: 'View Details',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    icon: Home,
    subLinks: []
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    smallLabel: 'SPECIALIZED EXPERTISE',
    collapsedDesc: 'Crafting exceptional guest experiences.',
    expandedDesc: 'Designed to elevate every guest experience through thoughtful design and seamless execution.',
    link: '/services/boutique-hotels',
    btnText: 'View Hospitality',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    icon: Hotel,
    subLinks: [
      { name: 'Boutique Hotels', path: '/services/boutique-hotels' },
      { name: 'Service Apartments', path: '/services/service-apartments' },
      { name: 'PG Accommodation', path: '/services/pg-accommodation' }
    ]
  },
  {
    id: 'educational',
    title: 'Educational Spaces',
    collapsedDesc: 'Inspiring learning environments.',
    expandedDesc: 'Future-ready environments built to inspire learning.',
    link: '/services/educational-institutions',
    btnText: 'View Details',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
    icon: GraduationCap,
    subLinks: []
  },
  {
    id: 'commercial',
    title: 'Commercial Spaces',
    collapsedDesc: 'Purpose-driven environments.',
    expandedDesc: 'Purpose-driven environments designed for productivity and growth.',
    link: '/services/commercial-interiors',
    btnText: 'View Details',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    icon: Briefcase,
    subLinks: []
  },
  {
    id: 'technical-solutions',
    title: 'Technical Solutions',
    smallLabel: 'ENGINEERED SYSTEMS',
    collapsedDesc: 'Engineered for performance.',
    expandedDesc: 'Precision-built systems designed for durability, performance, and modern aesthetics.',
    link: '/services/aluminium-systems',
    btnText: 'View Technical Solutions',
    image: 'https://images.unsplash.com/photo-1603517178051-760f381c8282?auto=format&fit=crop&w=800&q=80',
    icon: Layers,
    subLinks: [
      { name: 'Aluminium Systems', path: '/services/aluminium-systems' },
      { name: 'UPVC Systems', path: '/services/upvc-systems' }
    ]
  }
];

export default function ExperimentalExpertise() {
  return (
    <section className="pt-7 pb-7 md:py-20 bg-slate-50 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-12 gap-3 md:gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] md:text-caption font-bold tracking-[0.2em] text-slate-400 uppercase block mb-1.5 md:mb-3">
              OUR EXPERTISE
            </span>
            <h2 className="text-[30px] md:text-h2 font-semibold text-[#0f172a] leading-[1.05] md:leading-tight tracking-tight mb-1 md:mb-2 line-clamp-3">
              Spaces We Design.<br className="hidden md:block" />
              <span className="md:hidden"> </span>Experiences We Deliver.
            </h2>
            <p className="text-[18px] md:text-h3 italic font-light text-slate-500 mb-1.5 md:mb-4 tracking-tight md:tracking-normal truncate md:whitespace-normal">
              Crafted Across Every Sector.
            </p>
          </div>
          <p className="text-slate-500 text-body max-w-[400px] leading-relaxed font-light hidden md:block">
            From luxury residences and hospitality destinations to educational and commercial environments, our expertise transforms vision into exceptional spaces.
          </p>
          <p className="text-slate-500 text-[14px] leading-snug font-light md:hidden max-w-[280px]">
            Transforming spaces across residential, commercial, hospitality and education.
          </p>
        </div>

        {/* Accordion Layout */}
        <div className="flex flex-col md:flex-row gap-3 w-full h-auto md:h-[480px] pb-[max(env(safe-area-inset-bottom,20px),20px)] md:pb-0">
          {EXPERIMENTAL_SERVICES.map((service) => (
            <div 
              key={service.id}
              className="relative w-full rounded-[1.5rem] md:rounded-[2rem] overflow-hidden group transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer select-none h-auto md:h-full md:flex-1 md:hover:flex-[4.2] hover:-translate-y-[6px] hover:shadow-[0_20px_50px_rgba(11,22,53,0.12)]"
            >
              {/* Image Layer */}
              <Image 
                fill
                src={service.image} 
                alt={service.title} 
                className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-out z-0" 
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              
              {/* Gradient Mask: Strengthened on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/95 via-[#0f172a]/60 to-transparent md:from-[#0f172a]/90 md:via-[#0f172a]/40 group-hover:from-[#0f172a] group-hover:via-[#0f172a]/55 transition-colors duration-700 z-10" />
              
              {/* Content Container */}
              <div className="relative z-20 p-4 md:p-8 flex flex-col h-full justify-between">
                
                {/* Top Icon */}
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:scale-110">
                  <service.icon className="w-4 h-4 md:w-[18px] md:h-[18px] opacity-90" />
                </div>
                
                {/* Bottom Content Area */}
                <div className="w-full flex flex-col items-start mt-auto relative">
                  
                  {/* Collapsed State Title — desktop only vertical writing */}
                  <div className="w-full transition-all duration-500 md:absolute md:bottom-0 md:left-0 md:origin-bottom-left md:group-hover:opacity-0 md:group-hover:-translate-y-4">
                    <h3 className="text-white text-[16px] md:text-h5 font-semibold tracking-tight mb-0.5 md:mb-2 drop-shadow-md md:[writing-mode:vertical-rl] md:rotate-180">
                      {service.title}
                    </h3>
                    <p className="text-white/70 text-[12px] truncate md:whitespace-normal md:leading-snug font-light max-w-[260px] md:hidden">
                      {service.collapsedDesc}
                    </p>
                  </div>
                  
                  {/* Expanded Content Frame — always shown on mobile, hover-triggered on desktop */}
                  <div className="overflow-hidden w-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] max-h-[400px] opacity-100 mt-2 md:max-h-0 md:opacity-0 md:mt-0 md:group-hover:max-h-[400px] md:group-hover:opacity-100 md:group-hover:mt-0 md:absolute md:bottom-6 md:left-0">
                    
                    <h3 className="text-white text-xl md:text-h3 font-semibold tracking-tight mb-2 drop-shadow-md hidden md:block opacity-100 md:opacity-0 md:translate-y-[25px] md:[transform:rotateX(8deg)] md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:[transform:rotateX(0deg)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:delay-[100ms]">
                      {service.title}
                    </h3>

                    {/* Optional Small Label */}
                    {service.smallLabel && (
                      <span className="hidden md:block text-caption font-bold tracking-[0.2em] text-slate-300 uppercase mb-4 opacity-100 md:opacity-0 md:translate-y-[15px] md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:delay-[150ms]">
                        {service.smallLabel}
                      </span>
                    )}

                    {/* Premium Service Chips (Sublinks) */}
                    {service.subLinks.length > 0 && (
                      <div className="flex flex-row overflow-x-auto whitespace-nowrap snap-x hide-scrollbar pb-1 mb-2 md:flex-wrap md:overflow-visible md:whitespace-normal md:pb-0 gap-1.5 md:gap-2 md:mb-6">
                        {service.subLinks.map((subLink, idx) => {
                          const delayClass = ['md:delay-[200ms]', 'md:delay-[280ms]', 'md:delay-[360ms]'][idx] || 'md:delay-[400ms]';
                          return (
                            <div 
                              key={idx} 
                              className={`flex-shrink-0 snap-start bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 text-[10px] md:px-4 md:py-2 text-white md:text-small font-semibold tracking-wide shadow-sm opacity-100 md:opacity-0 md:translate-y-[10px] md:scale-95 md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${delayClass}`}
                            >
                              {subLink.name}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <p className="line-clamp-2 md:line-clamp-none text-slate-200 text-[12px] leading-snug md:text-body md:leading-relaxed font-light max-w-md mb-3 md:mb-8 opacity-100 md:opacity-0 md:translate-y-[15px] md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:delay-[350ms]">
                      {service.expandedDesc}
                    </p>
                    
                    <div className="w-full flex justify-center md:justify-start md:inline-flex pb-1 md:pb-0">
                      <Link 
                        href={service.link}
                        className="inline-flex items-center justify-center w-full md:w-auto gap-2 text-[11px] md:text-button font-semibold tracking-widest text-white uppercase bg-white/10 hover:bg-white hover:text-[#0f172a] backdrop-blur-md border border-white/20 px-4 py-2.5 md:px-6 md:py-3 rounded-full shadow-sm opacity-100 md:opacity-0 md:-translate-x-[15px] md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:delay-[400ms]"
                      >
                        {service.btnText} <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform w-3 h-3 md:w-4 md:h-4" />
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center hidden md:block">
           <span className="text-caption text-slate-400 uppercase tracking-widest font-semibold">
              Hover to expand categories
           </span>
        </div>

      </div>

      </section>
  );
}
