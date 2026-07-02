// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Home, Hotel, GraduationCap, Layers, ArrowRight, Building } from 'lucide-react';

const EXPERIMENTAL_SERVICES = [
  {
    id: 'hospitality',
    title: 'Hospitality',
    collapsedDesc: 'Crafting exceptional guest experiences.',
    expandedDesc: 'Designed to elevate every guest experience through thoughtful design and seamless execution.',
    link: '/services/boutique-hotels',
    btnText: 'View Hospitality',
    image: '/images/Services-card/hotel.png',
    icon: Hotel,
    subLinks: []
  },
  {
    id: 'luxury-residential',
    title: 'Luxury Residential',
    collapsedDesc: 'Bespoke turnkey interiors.',
    expandedDesc: 'Bespoke turnkey interiors crafted for villas, premium apartments, and modern homes.',
    link: '/services/residential-interiors',
    btnText: 'View Details',
    image: '/images/Services-card/residential.png',
    icon: Home,
    subLinks: []
  },
  {
    id: 'educational',
    title: 'Educational Spaces',
    collapsedDesc: 'Inspiring learning environments.',
    expandedDesc: 'Future-ready environments built to inspire learning.',
    link: '/services/educational-institutions',
    btnText: 'View Details',
    image: '/images/Services-card/education.png',
    icon: GraduationCap,
    subLinks: []
  },
  {
    id: 'aluminum-systems',
    title: 'Aluminum Systems',
    collapsedDesc: 'Engineered for performance.',
    expandedDesc: 'Precision-built aluminum systems designed for durability, performance, and modern aesthetics.',
    link: '/services/aluminium-systems',
    btnText: 'View Systems',
    image: '/images/Services-card/aluminium.png',
    icon: Layers,
    subLinks: []
  },
  {
    id: 'upvc-systems',
    title: 'UPVC Systems',
    collapsedDesc: 'Energy efficient solutions.',
    expandedDesc: 'High-performance UPVC solutions offering superior insulation, acoustics, and longevity.',
    link: '/services/upvc-systems',
    btnText: 'View Systems',
    image: '/images/Services-card/upvc.png',
    icon: Layers,
    subLinks: []
  },
  {
    id: 'facades-glazing',
    title: 'Facades & Glazing',
    collapsedDesc: 'Advanced structural glazing.',
    expandedDesc: 'Cutting-edge facades and glazing solutions for modern architectural excellence.',
    link: '/services/facades-glazing',
    btnText: 'View Solutions',
    image: '/images/Services-card/aluminium.png', // TODO: update to facade image when available
    icon: Building,
    subLinks: []
  }
];

export default function ExperimentalExpertise() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-slate-50 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-end mb-8 md:mb-12">
          <div className="md:col-span-6 lg:col-span-6">
            <span className="text-[10px] md:text-caption font-bold tracking-[0.2em] text-slate-400 uppercase block mb-3">
              OUR SERVICES
            </span>
            <h2 className="text-[#0f172a] text-[clamp(36px,3.5vw,48px)] font-[700] leading-[1.05] tracking-[-0.03em] max-w-[520px]">
              Our Expertise
            </h2>
          </div>
          <div className="md:col-span-6 lg:col-span-6 flex md:justify-start mt-4 md:mt-0">
            <p className="text-[16px] leading-[1.7] text-slate-600 max-w-[380px] md:max-w-none md:whitespace-nowrap">
              Tailored solutions for hospitality, residential, education, aluminium, uPVC and facades.
            </p>
          </div>
        </div>

        {/* Accordion Layout */}
        <div className="flex flex-col md:flex-row gap-4 w-full h-auto md:h-[320px] lg:h-[360px] pb-[max(env(safe-area-inset-bottom,20px),20px)] md:pb-0">
          {EXPERIMENTAL_SERVICES.map((service) => (
            <div 
              key={service.id}
              className="relative w-full rounded-[28px] overflow-hidden group transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer select-none h-[280px] md:h-full md:flex-1 md:hover:flex-[3.5] hover:-translate-y-[6px] hover:shadow-[0_20px_50px_rgba(11,22,53,0.12)]"
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/95 via-[#0f172a]/40 to-transparent md:from-[#0f172a]/90 md:via-[#0f172a]/20 group-hover:from-[#0f172a]/95 group-hover:via-[#0f172a]/60 transition-colors duration-700 z-10" />
              
              {/* Content Container */}
              <div className="relative z-20 p-6 md:p-8 flex flex-col h-full justify-between">
                
                {/* Top Icon */}
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:scale-110">
                  <service.icon className="w-5 h-5 md:w-[18px] md:h-[18px] opacity-90" />
                </div>
                
                {/* Bottom Content Area */}
                <div className="w-full flex flex-col items-start mt-auto relative">
                  
                  {/* Collapsed State Title — desktop only vertical writing */}
                  <div className="w-full transition-all duration-500 md:absolute md:bottom-0 md:left-0 md:origin-bottom-left md:group-hover:opacity-0 md:group-hover:-translate-y-4">
                    <h3 className="text-white text-[28px] font-[600] tracking-[-0.02em] mb-1 drop-shadow-md md:[writing-mode:vertical-rl] md:rotate-180 whitespace-nowrap">
                      {service.title}
                    </h3>
                  </div>
                  
                  {/* Expanded Content Frame */}
                  <div className="overflow-hidden w-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] max-h-[400px] opacity-100 mt-2 md:max-h-0 md:opacity-0 md:mt-0 md:group-hover:max-h-[400px] md:group-hover:opacity-100 md:group-hover:mt-0 md:absolute md:bottom-2 md:left-0">
                    
                    <h3 className="text-white text-[28px] font-[600] tracking-[-0.02em] mb-3 drop-shadow-md hidden md:block opacity-100 md:opacity-0 md:translate-y-[25px] md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:delay-[100ms] whitespace-nowrap">
                      {service.title}
                    </h3>

                    <p className="line-clamp-2 md:line-clamp-none text-slate-200 text-[14px] leading-[1.6] md:text-[16px] md:leading-[1.7] font-light max-w-[320px] mb-4 md:mb-8 opacity-100 md:opacity-0 md:translate-y-[15px] md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:delay-[350ms]">
                      {service.expandedDesc}
                    </p>
                    
                    <div className="w-full flex justify-start md:inline-flex pb-1 md:pb-0">
                      <Link 
                        href={service.link}
                        className="inline-flex items-center justify-center w-auto gap-2 text-[12px] md:text-[13px] font-semibold tracking-widest text-white uppercase bg-white/10 hover:bg-white hover:text-[#0f172a] backdrop-blur-md border border-white/20 px-5 py-2.5 md:px-6 md:py-3 rounded-full shadow-sm opacity-100 md:opacity-0 md:-translate-x-[15px] md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:delay-[400ms]"
                      >
                        {service.btnText} <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
