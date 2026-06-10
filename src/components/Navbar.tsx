"use client";

import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useQuote } from '@/contexts/QuoteContext';

export default function Navbar() {
  const { setIsQuoteOpen } = useQuote();

  return (
    <header
      className="w-full sticky top-0 z-50"
      style={{
        backgroundColor: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(11,22,51,0.07)",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        
        {/* BRAND LOGO SLOT CONTAINER */}
        <div className="flex-shrink-0">
          <Link href="/" className="block transition-transform hover:scale-105">
            <img 
              src="/logo/logo.png" 
              alt="Voomet Design" 
              className="h-[52px] md:h-[60px] w-auto object-contain" 
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
            <div className="absolute left-1/2 -translate-x-1/2 top-full before:content-[''] before:absolute before:-top-4 before:left-0 before:w-full before:h-4 before:z-0 w-[820px] bg-white border border-slate-100 rounded-2xl shadow-2xl p-6 pt-4 hidden group-hover:grid grid-cols-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] z-0 select-none overflow-hidden rounded-2xl">
                <img src="/logo/icon.png" alt="VOOMETDESIGN Brand Watermark" className="w-72 h-72 object-contain" />
              </div>

              <div className="relative z-10 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-2">
                
                {/* TRACK 1: SPACES WE DESIGN */}
                <div className="pr-4">
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-3 block pointer-events-none">SPACES WE DESIGN</span>
                  <ul className="space-y-1 relative">
                    <li><Link href="/services/residential" className="block py-1.5 text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors uppercase">RESIDENTIAL</Link></li>
                    
                    {/* HOSPITALITY WITH FLY-OUT */}
                    <li className="relative group/hospitality">
                      <Link href="/services/hospitality" className="flex items-center justify-between py-1.5 pr-2 text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors uppercase">
                        HOSPITALITY
                        <ChevronRight size={14} className="text-slate-400 group-hover/hospitality:translate-x-1 transition-transform" />
                      </Link>

                      {/* FLY-OUT SUBMENU */}
                      <div className="absolute top-0 left-full ml-1 w-56 bg-white border border-slate-100 rounded-xl shadow-xl p-2 hidden group-hover/hospitality:block z-50 animate-in fade-in slide-in-from-left-2 duration-200 before:content-[''] before:absolute before:-left-4 before:top-0 before:w-4 before:h-full before:z-0">
                        <ul className="space-y-1 relative z-10">
                          <li><Link href="/services/hospitality/service-apartments" className="block py-2 px-3 text-[11px] font-semibold tracking-wider text-[#0f172a] hover:bg-slate-50 hover:text-black rounded-lg transition-colors uppercase">SERVICE APARTMENTS</Link></li>
                          <li><Link href="/services/hospitality/boutique-hotel" className="block py-2 px-3 text-[11px] font-semibold tracking-wider text-[#0f172a] hover:bg-slate-50 hover:text-black rounded-lg transition-colors uppercase">BOUTIQUE HOTEL</Link></li>
                          <li><Link href="/services/hospitality/pg-accommodation" className="block py-2 px-3 text-[11px] font-semibold tracking-wider text-[#0f172a] hover:bg-slate-50 hover:text-black rounded-lg transition-colors uppercase">PG ACCOMMODATION</Link></li>
                        </ul>
                      </div>
                    </li>

                    <li><Link href="/services/educational" className="block py-1.5 text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors uppercase">EDUCATIONAL</Link></li>
                    <li><Link href="/services/commercial" className="block py-1.5 text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors uppercase">COMMERCIAL</Link></li>
                  </ul>
                </div>

                {/* TRACK 2: SEPARATOR 1 */}
                <div className="w-px bg-slate-100"></div>

                {/* TRACK 3: TECHNICAL SOLUTIONS */}
                <div className="px-4">
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-3 block pointer-events-none">TECHNICAL SOLUTIONS</span>
                  <ul className="space-y-1">
                    <li><Link href="/services/aluminium-systems" className="block py-1.5 text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors uppercase">ALUMINIUM SYSTEMS</Link></li>
                    <li><Link href="/services/upvc-systems" className="block py-1.5 text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors uppercase">UPVC SYSTEMS</Link></li>
                  </ul>
                </div>

                {/* TRACK 4: SEPARATOR 2 */}
                <div className="w-px bg-slate-100"></div>

                {/* TRACK 5: OUR CAPABILITIES */}
                <div className="pl-4">
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-3 block pointer-events-none">OUR CAPABILITIES</span>
                  <ul className="space-y-1">
                    <li><Link href="/services/capabilities/hvac" className="block py-1.5 text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors uppercase">HVAC & AIR CONDITIONING</Link></li>
                    <li><Link href="/services/capabilities/mep" className="block py-1.5 text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors uppercase">MEP & ELECTRICAL WORKS</Link></li>
                    <li><Link href="/services/capabilities/partitions-ceilings" className="block py-1.5 text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors uppercase">PARTITIONS & FALSE CEILINGS</Link></li>
                    <li><Link href="/services/capabilities/civil-pop" className="block py-1.5 text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors uppercase">CIVIL & POP WORKS</Link></li>
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
          <Link href="/portfolio" className="text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors">
            OUR WORK
          </Link>

          {/* CONTACT LINK */}
          <Link href="/contact" className="text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors">
            CONTACT
          </Link>
        </nav>

        {/* CALL TO ACTION LINK BUTTON BUTTON ENTRY */}
        <div className="hidden lg:block">
          <button 
            onClick={() => setIsQuoteOpen(true)}
            className="bg-[#0f172a] text-white text-[11px] font-bold tracking-widest px-6 py-3 rounded-full hover:bg-black transition-all duration-300 uppercase"
          >
            BOOK CONSULTATION
          </button>
        </div>

      </div>
    </header>
  );
}
