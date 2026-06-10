"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Home, Briefcase, Building, Hotel, Component, GraduationCap, Layers, ArrowUpRight } from 'lucide-react';

const SERVICES_DATA = [
  {
    id: 'residential',
    title: 'RESIDENTIAL INTERIORS',
    description: 'Bespoke turnkey design engineered for luxury villas, high-end apartments, and premium homes.',
    link: '/services/residential',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    icon: Home
  },
  {
    id: 'commercial',
    title: 'COMMERCIAL INTERIORS',
    description: 'High-performance corporate office designs, functional collaborative workspaces, and premium commercial execution.',
    link: '/commercial-interiors',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    icon: Briefcase
  },
  {
    id: 'service-apartments',
    title: 'SERVICE APARTMENTS',
    description: 'Turnkey fit-outs and space optimization tailored for premium serviced executive suites and hospitality lines.',
    link: '/services/hospitality/service-apartments',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    icon: Building
  },
  {
    id: 'boutique-hotel',
    title: 'BOUTIQUE HOTELS',
    description: 'Bespoke conceptual designs, high-end ambiance framing, and architectural execution for luxury lounges and boutique venues.',
    link: '/services/hospitality/boutique-hotel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    icon: Hotel
  },
  {
    id: 'pg-accommodation',
    title: 'P.G ACCOMMODATION',
    description: 'Modern, high-efficiency premium co-living student and professional residential hub design blueprints.',
    link: '/services/hospitality/pg-accommodation',
    image: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=800&q=80',
    icon: Component
  },
  {
    id: 'educational',
    title: 'EDUCATIONAL INSTITUTIONS',
    description: 'Acoustically insulated, hyper-functional spatial layout engineering for modern schools, universities, and labs.',
    link: '/services/educational',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
    icon: GraduationCap
  },
  {
    id: 'upvc-systems',
    title: 'ALUMINIUM & UPVC SYSTEMS',
    description: 'Zero-tolerance millimeter precision glazing and structural window engineering frameworks.',
    link: '/services/upvc-systems',
    image: 'https://images.unsplash.com/photo-1603517178051-760f381c8282?auto=format&fit=crop&w=800&q=80',
    icon: Layers
  }
];

export default function ServiceGrid() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Core Expertise</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0f172a] mt-2">
              Technical Interior <br /> <span className="font-light italic text-slate-500">Execution</span>
            </h2>
          </div>
          <p className="text-slate-500 text-xs md:text-sm max-w-sm leading-relaxed">
            We provide end-to-end design and bespoke woodwork services, ensuring artisanal quality at every touchpoint.
          </p>
        </div>

        {/* Dynamic Layout Tracks with Corrected Heights */}
        <div 
          className={
            isExpanded 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
              : "flex flex-col md:flex-row gap-3 w-full min-h-[480px] md:h-[450px]"
          }
        >
          {SERVICES_DATA.map((service) => (
            <div 
              key={service.id}
              className={`relative w-full rounded-[24px] md:rounded-[32px] overflow-hidden group transition-all duration-700 cubic-bezier(0.25, 1, 0.5, 1) cursor-pointer select-none ${
                isExpanded 
                  ? "h-[400px]" 
                  : "h-[360px] md:h-full md:flex-1 md:hover:flex-[4.2]"
              }`}
            >
              {/* Core Image Asset Layer */}
              <img 
                src={service.image} 
                alt={service.title} 
                className="absolute inset-0 w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out" 
                loading="lazy"
              />
              
              {/* Premium Background Mask */}
              <div className="absolute inset-0 bg-[#0f172a]/75 group-hover:bg-[#0f172a]/65 transition-colors duration-500" />
              
              {/* Foreground Element Context */}
              <div className="relative z-10 p-6 md:p-8 flex flex-col h-full justify-between items-start">
                
                {/* Floating Top Icon */}
                <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-inner transition-transform duration-500 group-hover:rotate-12">
                  <service.icon size={16} className="opacity-95" />
                </div>
                
                {/* Bottom Typography System */}
                <div className="w-full flex flex-col items-start mt-auto">
                  
                  {/* Corrected Heading: Shifted origin to avoid bottom masking cuts */}
                  <h3 
                    className={`text-white text-base md:text-lg font-bold tracking-wider uppercase transition-all duration-500 origin-center ${
                      isExpanded 
                        ? "mb-3" 
                        : "mb-0 md:pb-10 md:[writing-mode:vertical-rl] md:rotate-180 md:group-hover:[writing-mode:horizontal-tb] md:group-hover:rotate-0 md:group-hover:pb-0 md:group-hover:mb-3"
                    }`}
                  >
                    {service.title}
                  </h3>
                  
                  {/* Caption Frame: Slide Up Animations */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-out mobile-override-reveal ${
                      isExpanded 
                        ? "max-h-[180px] opacity-100 mt-1" 
                        : "max-h-0 opacity-0 md:group-hover:max-h-[180px] md:group-hover:opacity-100 md:group-hover:mt-1 md:group-hover:translate-y-0 translate-y-4"
                    }`}
                  >
                    <p className="text-slate-200 text-xs md:text-sm leading-relaxed font-light opacity-90 max-w-sm pb-4">
                      {service.description}
                    </p>
                    <div>
                      <Link 
                        href={service.link}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#0f172a] uppercase bg-white px-5 py-2.5 rounded-full hover:bg-slate-50 transition-all duration-300 hover:shadow-lg"
                      >
                        <span>VIEW DETAILS</span>
                        <ArrowUpRight size={14} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Global Master Controller Button */}
        <div className="mt-12 flex justify-center border-t border-slate-100 pt-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#0f172a] text-xs font-bold tracking-widest text-[#0f172a] uppercase rounded-full hover:bg-[#0f172a] hover:text-white transition-all duration-300 shadow-sm"
          >
            {isExpanded ? "COLLAPSE SCROLL VIEW" : "VIEW ALL 7 SERVICES"}
          </button>
        </div>

      </div>

      {/* Embedded Global Stylesheets Handling Mobile Rendering Layer */}
      <style jsx global>{`
        @media (max-width: 767px) {
          .mobile-override-reveal {
            max-height: 220px !important;
            opacity: 100 !important;
            transform: translateY(0) !important;
            overflow: visible !important;
            margin-top: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
