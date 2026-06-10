// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";

import Link from 'next/link';
import { Home, Hotel, GraduationCap, Briefcase, Layers, ArrowRight } from 'lucide-react';

const EXPERIMENTAL_SERVICES = [
  {
    id: 'luxury-residential',
    title: 'Luxury Residential',
    collapsedDesc: 'Bespoke turnkey interiors.',
    expandedDesc: 'Bespoke turnkey interiors crafted for villas, premium apartments, and modern homes.',
    link: '/services/residential',
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
    link: '/services/hospitality',
    btnText: 'View Hospitality',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    icon: Hotel,
    subLinks: [
      { name: 'Boutique Hotels', path: '/services/hospitality/boutique-hotel' },
      { name: 'Service Apartments', path: '/services/hospitality/service-apartments' },
      { name: 'PG Accommodation', path: '/services/hospitality/pg-accommodation' }
    ]
  },
  {
    id: 'educational',
    title: 'Educational Spaces',
    collapsedDesc: 'Inspiring learning environments.',
    expandedDesc: 'Future-ready environments built to inspire learning.',
    link: '/services/educational',
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
    link: '/commercial-interiors',
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
    link: '/services/upvc-systems',
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
    <section className="py-16 md:py-20 bg-slate-50 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase block mb-3">
              OUR EXPERTISE
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold text-[#0f172a] leading-[1.1] tracking-tight mb-2">
              Spaces We Design.<br />
              Experiences We Deliver.
            </h2>
            <p className="text-2xl md:text-3xl italic font-light text-slate-500 mb-4">
              Crafted Across Every Sector.
            </p>
          </div>
          <p className="text-slate-500 text-sm md:text-base max-w-[400px] leading-relaxed font-light">
            From luxury residences and hospitality destinations to educational and commercial environments, our expertise transforms vision into exceptional spaces.
          </p>
        </div>

        {/* Accordion Layout */}
        <div className="flex flex-col md:flex-row gap-3 w-full h-auto min-h-[500px] md:h-[480px]">
          {EXPERIMENTAL_SERVICES.map((service) => (
            <div 
              key={service.id}
              className="relative w-full rounded-[2rem] overflow-hidden group transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer select-none h-[400px] md:h-full md:flex-1 md:hover:flex-[4.2] hover:-translate-y-[6px] hover:shadow-[0_20px_50px_rgba(11,22,53,0.12)]"
            >
              {/* Image Layer */}
              <img 
                src={service.image} 
                alt={service.title} 
                className="absolute inset-0 w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-out z-0" 
              />
              
              {/* Gradient Mask: Strengthened on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/40 to-transparent group-hover:from-[#0f172a] group-hover:via-[#0f172a]/55 transition-colors duration-700 z-10" />
              
              {/* Content Container */}
              <div className="relative z-20 p-6 md:p-8 flex flex-col h-full justify-between">
                
                {/* Top Icon */}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:scale-110">
                  <service.icon size={18} className="opacity-90" />
                </div>
                
                {/* Bottom Content Area */}
                <div className="w-full flex flex-col items-start mt-auto relative">
                  
                  {/* Collapsed State Title & Short Desc */}
                  <div className="w-full transition-all duration-500 md:absolute md:bottom-0 md:left-0 md:origin-bottom-left md:group-hover:opacity-0 md:group-hover:-translate-y-4">
                    <h3 className="text-white text-xl md:text-2xl font-semibold tracking-tight mb-2 drop-shadow-md md:[writing-mode:vertical-rl] md:rotate-180">
                      {service.title}
                    </h3>
                    <p className="text-white/70 text-xs font-light max-w-[200px] md:hidden">
                      {service.collapsedDesc}
                    </p>
                  </div>
                  
                  {/* Expanded Content Frame: Shifted upward on hover via md:bottom-6 */}
                  <div className="overflow-hidden w-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] max-h-[400px] opacity-100 mt-4 md:max-h-0 md:opacity-0 md:mt-0 md:group-hover:max-h-[400px] md:group-hover:opacity-100 md:group-hover:mt-0 md:absolute md:bottom-6 md:left-0">
                    
                    <h3 className="text-white text-2xl md:text-3xl font-semibold tracking-tight mb-2 drop-shadow-md hidden md:block opacity-100 md:opacity-0 md:translate-y-[25px] md:[transform:rotateX(8deg)] md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:[transform:rotateX(0deg)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:delay-[100ms]">
                      {service.title}
                    </h3>

                    {/* Optional Small Label */}
                    {service.smallLabel && (
                      <span className="block text-[10px] font-bold tracking-[0.2em] text-slate-300 uppercase mb-4 opacity-100 md:opacity-0 md:translate-y-[15px] md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:delay-[150ms]">
                        {service.smallLabel}
                      </span>
                    )}

                    {/* Premium Service Chips (Sublinks) */}
                    {service.subLinks.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {service.subLinks.map((subLink, idx) => {
                          const delayClass = ['md:delay-[200ms]', 'md:delay-[280ms]', 'md:delay-[360ms]'][idx] || 'md:delay-[400ms]';
                          return (
                            <div 
                              key={idx} 
                              className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-white text-xs font-semibold tracking-wide shadow-sm opacity-100 md:opacity-0 md:translate-y-[10px] md:scale-95 md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${delayClass}`}
                            >
                              {subLink.name}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <p className="text-slate-200 text-sm md:text-base leading-relaxed font-light max-w-md mb-8 opacity-100 md:opacity-0 md:translate-y-[15px] md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:delay-[350ms]">
                      {service.expandedDesc}
                    </p>
                    
                    <Link 
                      href={service.link}
                      className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-white uppercase bg-white/10 hover:bg-white hover:text-[#0f172a] backdrop-blur-md border border-white/20 px-6 py-3 rounded-full shadow-sm opacity-100 md:opacity-0 md:-translate-x-[15px] md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:delay-[400ms]"
                    >
                      {service.btnText} <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center hidden md:block">
           <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
              Hover to expand categories
           </span>
        </div>

      </div>

      <style jsx global>{`
        @media (max-width: 767px) {
          .md\\:absolute {
            position: relative !important;
          }
          .md\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
