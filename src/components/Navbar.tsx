"use client";

import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        
        {/* BRAND LOGO SLOT CONTAINER */}
        <div className="flex-shrink-0">
          <Link href="/" className="block transition-transform hover:scale-105">
            <img 
              src="/logo/logo.png" 
              alt="Voomet Design" 
              className="h-12 md:h-14 w-auto object-contain" 
            />
          </Link>
        </div>

        {/* REFACTORED NAVIGATION ENGINE */}
        <nav className="hidden lg:flex items-center gap-8">
          
          {/* HOME LINK */}
          <Link href="/" className="text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors">
            HOME
          </Link>

          {/* EXPERTISE MASTER DROPDOWN (LEVEL 0) */}
          <div className="relative z-40 group py-2">
            <button className="flex items-center gap-1 text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black uppercase transition-colors">
              <span>EXPERTISE</span>
              <ChevronDown size={12} className="text-slate-400 transition-transform group-hover:rotate-180" />
            </button>

            {/* MEGA MENU CONTAINER CARD */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[820px] bg-white border border-slate-100 rounded-2xl shadow-2xl p-6 hidden group-hover:grid grid-cols-1 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] z-0 select-none">
                <img src="/logo/icon.png" alt="VOOMETDESIGN Brand Watermark" className="w-72 h-72 object-contain" />
              </div>

              <div className="grid grid-cols-3 gap-0 relative">
                
                {/* COLUMN 1: SPACES WE DESIGN */}
                <div className="mx-2 pr-6">
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-3 block pointer-events-none">SPACES WE DESIGN</span>
                  <ul className="space-y-1">
                    <li><Link href="/services/residential" className="block py-1.5 text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors">RESIDENTIAL</Link></li>
                    <li><Link href="/services/hospitality" className="block py-1.5 text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors">HOSPITALITY</Link></li>
                    <li><Link href="/services/educational" className="block py-1.5 text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors">EDUCATIONAL</Link></li>
                    <li><Link href="/services/commercial" className="block py-1.5 text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors">COMMERCIAL</Link></li>
                    <li><Link href="/services/hospitality/service-apartments" className="block py-1.5 text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors">SERVICE APARTMENTS</Link></li>
                    <li><Link href="/services/hospitality/boutique-hotel" className="block py-1.5 text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors">BOUTIQUE HOTEL</Link></li>
                    <li><Link href="/services/hospitality/pg-accommodation" className="block py-1.5 text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors">PG ACCOMMODATION</Link></li>
                  </ul>
                </div>

                {/* SEPARATOR 1: VERTICAL DIVIDER */}
                <div className="absolute top-4 bottom-4 left-[33.33%] w-px bg-slate-100 z-10 pointer-events-none"></div>
                {/* COLUMN 2: TECHNICAL SOLUTIONS */}
                <div className="mx-2 px-6">
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-3 block pointer-events-none">TECHNICAL SOLUTIONS</span>
                  <ul className="space-y-1">
                    <li><Link href="/services/aluminium-systems" className="block py-1.5 text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors">ALUMINIUM SYSTEMS</Link></li>
                    <li><Link href="/services/upvc-systems" className="block py-1.5 text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors">UPVC SYSTEMS</Link></li>
                  </ul>
                </div>

                {/* SEPARATOR 2: VERTICAL DIVIDER */}
                <div className="absolute top-4 bottom-4 left-[66.66%] w-px bg-slate-100 z-10 pointer-events-none"></div>
                {/* COLUMN 3: OUR CAPABILITIES */}
                <div className="mx-2 pl-6">
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-3 block pointer-events-none">OUR CAPABILITIES</span>
                  <ul className="space-y-1">
                    <li><Link href="/services/capabilities/hvac" className="block py-1.5 text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors">HVAC & AIR CONDITIONING</Link></li>
                    <li><Link href="/services/capabilities/mep" className="block py-1.5 text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors">MEP & ELECTRICAL WORKS</Link></li>
                    <li><Link href="/services/capabilities/partitions-ceilings" className="block py-1.5 text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors">PARTITIONS & FALSE CEILINGS</Link></li>
                    <li><Link href="/services/capabilities/civil-pop" className="block py-1.5 text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors">CIVIL & POP WORKS</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* ABOUT LINK */}
          <Link href="/about" className="text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors">
            ABOUT
          </Link>

          {/* OUR WORK LINK */}
          <Link href="/work" className="text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors">
            OUR WORK
          </Link>

          {/* CONTACT LINK */}
          <Link href="/#contact-us" className="text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors">
            CONTACT
          </Link>
        </nav>

        {/* CALL TO ACTION LINK BUTTON BUTTON ENTRY */}
        <div className="hidden lg:block">
          <Link 
            href="/#contact-us" 
            className="bg-[#0f172a] text-white text-[11px] font-bold tracking-widest px-6 py-3 rounded-full hover:bg-black transition-all duration-300 uppercase"
          >
            BOOK CONSULTATION
          </Link>
        </div>

      </div>
    </header>
  );
}
