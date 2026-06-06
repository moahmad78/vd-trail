// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client"; 

import { useState } from "react"; 
import Link from "next/link"; 
import Image from "next/image"; 
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion"; 
import { useQuote } from "@/contexts/QuoteContext"; 

interface NavbarProps { 
  onOpenQuote?: () => void; 
} 

const Navbar = ({ onOpenQuote }: NavbarProps) => { 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const [isServicesOpen, setIsServicesOpen] = useState(false); 
  const [isHospitalityOpen, setIsHospitalityOpen] = useState(false);
  const { setIsQuoteOpen } = useQuote(); 
  
  const handleOpenQuote = onOpenQuote || (() => setIsQuoteOpen(true)); 
  
  const serviceLinks = [ 
    { name: "Residential", href: "/services/residential" }, 
    { 
      name: "Hospitality", 
      href: "/services/hospitality",
      children: [
        { name: "Service Apartments", href: "/services/hospitality/service-apartments" },
        { name: "Boutique Hotel", href: "/services/hospitality/boutique-hotel" },
        { name: "P.G Accommodation", href: "/services/hospitality/pg-accommodation" }
      ]
    }, 
    { name: "Educational", href: "/services/educational" }, 
  ]; 

  return ( 
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 py-4">
      <div className="container mx-auto px-6 max-w-[1440px] flex items-center justify-between gap-4 xl:gap-8"> 
        {/* Left Section: Logo */} 
        <div className="flex-shrink-0">
          <Link href="/" className="relative h-12 w-40 block transition-all hover:opacity-80">
            <Image unoptimized={true} quality={95} src="/logo/logo.png" alt="Voomet Design" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-contain object-left" priority />
          </Link>
        </div> 

        {/* Center/Main Track Link Array */} 
        {/* MAIN PRIMARY NAVIGATION BAR LIST LAYER */}
        <nav className="hidden lg:flex items-center gap-x-4 xl:gap-x-6 overflow-visible py-2 flex-grow justify-end">
          
          {/* Standard Links Example with New Theme Color Contrast */}
          <Link href="/" className="text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors block uppercase whitespace-nowrap">
            HOME
          </Link>
          <Link href="/about" className="text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors block uppercase whitespace-nowrap">
            ABOUT
          </Link>

          {/* SERVICES MASTER NODE */}
          <div className="relative group py-2">
            <button className="flex items-center gap-1 text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black uppercase transition-colors outline-none cursor-pointer">
              SERVICES
              <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
            </button>

            {/* LEVEL 1 DROPDOWN CONTAINER CARD */}
            <ul className="absolute left-0 top-full mt-2 w-56 bg-white border border-slate-100 rounded-xl shadow-xl p-2 hidden group-hover:block transition-all duration-200 z-50 overflow-visible">
              
              <li>
                <Link href="/services/residential" className="flex items-center px-4 py-2.5 text-xs font-semibold tracking-wider text-[#0f172a] hover:bg-slate-50 rounded-lg transition-colors">
                  RESIDENTIAL
                </Link>
              </li>

              {/* HOSPITALITY NODE - SPECIFIC ISOLATION BOUNDARY BLOCK */}
              <li className="relative group/hospitality">
                <button className="w-full flex items-center px-4 py-2.5 text-xs font-semibold tracking-wider text-[#0f172a] hover:bg-slate-50 rounded-lg transition-colors outline-none">
                  <span>HOSPITALITY</span>
                  <ChevronRight size={12} className="ml-auto text-slate-400 group-hover/hospitality:text-[#0f172a] transition-transform group-hover/hospitality:translate-x-0.5" />
                </button>

                {/* LEVEL 2 DROPDOWN FLYOUT CONTAINER - Strictly isolated with group-hover/hospitality */}
                <div className="absolute left-full top-0 pl-2 w-60 hidden group-hover/hospitality:block transition-all duration-200 z-50">
                  <ul className="bg-white border border-slate-100 rounded-xl shadow-xl p-2 animate-in fade-in slide-in-from-left-2 duration-150">
                    <li>
                      <Link href="/services/hospitality/service-apartments" className="block px-4 py-2.5 text-xs font-semibold tracking-wider text-[#0f172a] hover:bg-slate-50 rounded-lg transition-colors">
                        SERVICE APARTMENTS
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/hospitality/boutique-hotel" className="block px-4 py-2.5 text-xs font-semibold tracking-wider text-[#0f172a] hover:bg-slate-50 rounded-lg transition-colors">
                        BOUTIQUE HOTEL
                      </Link>
                    </li>
                    <li>
                      <Link href="/services/hospitality/pg-accommodation" className="block px-4 py-2.5 text-xs font-semibold tracking-wider text-[#0f172a] hover:bg-slate-50 rounded-lg transition-colors">
                        P.G ACCOMMODATION
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <Link href="/services/educational" className="flex items-center px-4 py-2.5 text-xs font-semibold tracking-wider text-[#0f172a] hover:bg-slate-50 rounded-lg transition-colors">
                  EDUCATIONAL
                </Link>
              </li>
            </ul>
          </div>

          <Link href="https://VoometDesign.com/" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors block uppercase whitespace-nowrap">
            COMMERCIAL INTERIORS
          </Link>
          <Link href="/aluminium-upvc-systems" className="text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors block uppercase whitespace-nowrap">
            ALUMINIUM & UPVC SYSTEMS
          </Link>
          <Link href="/portfolio" className="text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors block uppercase whitespace-nowrap">
            OUR WORK
          </Link>
          <Link href="/contact" className="text-xs font-semibold tracking-wider text-[#0f172a] hover:text-black transition-colors block uppercase whitespace-nowrap">
            CONTACT
          </Link>
        </nav> 

        {/* Right Section: CTA Button */} 
        <div className="hidden lg:block ml-4 xl:ml-6">
          <button onClick={handleOpenQuote} className="bg-[#020617] text-white px-6 py-2.5 rounded-full uppercase font-bold text-sm xl:text-sm tracking-widest hover:bg-[#324A61] hover:text-slate-950 transition-all shadow-md whitespace-nowrap"> 
            Free Consultation 
          </button>
        </div>        
        
        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-[#020617] ml-auto p-1"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Side Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#020617]/40 backdrop-blur-sm z-[90] lg:hidden"
            />

            {/* Right Side Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white shadow-2xl z-[100] lg:hidden flex flex-col overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
                <span className="font-black uppercase tracking-widest text-[#020617] text-sm">Navigation</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#020617] p-2 -mr-2 bg-white border border-slate-200 rounded-full hover:bg-slate-100 transition-colors shadow-sm"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex flex-col p-6 space-y-6">
                <Link href="/" className="text-sm font-medium tracking-wider uppercase text-slate-600 hover:text-[#0f172a] block tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link href="/about" className="text-sm font-medium tracking-wider uppercase text-slate-600 hover:text-[#0f172a] block tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                
                {/* Services Accordion Dropdown */}
                <div className="py-1">
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="w-full flex items-center justify-between text-sm font-medium tracking-wider uppercase text-slate-600 hover:text-[#0f172a] tracking-wide outline-none"
                  >
                    Services
                    <ChevronDown size={16} className={`transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-4 pl-4 mt-4 border-l-2 border-slate-200">
                          {serviceLinks.map((sub) => (
                            <div key={sub.name}>
                              {sub.children ? (
                                <div className="flex flex-col space-y-2">
                                  <button onClick={() => setIsHospitalityOpen(!isHospitalityOpen)} className="w-full flex items-center justify-between uppercase text-slate-600 hover:text-slate-950 text-xs font-bold tracking-wide outline-none">
                                    {sub.name}
                                    <ChevronDown size={14} className={`transition-transform duration-300 ${isHospitalityOpen ? "rotate-180" : ""}`} />
                                  </button>
                                  <AnimatePresence>
                                    {isHospitalityOpen && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                      >
                                        <div className="pl-3 mt-2 space-y-3 border-l border-slate-200">
                                          {sub.children.map((child) => (
                                            <Link
                                              key={child.name}
                                              href={child.href}
                                              className="block uppercase text-slate-500 hover:text-slate-900 text-[11px] font-bold tracking-wide"
                                              onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                              {child.name}
                                            </Link>
                                          ))}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              ) : (
                                <Link
                                  href={sub.href}
                                  className="block uppercase text-slate-600 hover:text-slate-950 text-xs font-bold tracking-wide"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {sub.name}
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link href="https://VoometDesign.com/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium tracking-wider uppercase text-slate-600 hover:text-[#0f172a] block tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>Commercial Interiors</Link>
                <Link href="/aluminium-upvc-systems" className="text-sm font-medium tracking-wider uppercase text-slate-600 hover:text-[#0f172a] block tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>Aluminium & UPVC Systems</Link>
                <Link href="/portfolio" className="text-sm font-medium tracking-wider uppercase text-slate-600 hover:text-[#0f172a] block tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>Our Work</Link>
                <Link href="/contact" className="text-sm font-medium tracking-wider uppercase text-slate-600 hover:text-[#0f172a] block tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                
                {/* CTA inside Drawer */}
                <div className="pt-8 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleOpenQuote();
                    }}
                    className="w-full bg-[#020617] text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#324A61] hover:text-white transition-colors shadow-lg shadow-[#020617]/20"
                  >
                    FREE CONSULTATION
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
