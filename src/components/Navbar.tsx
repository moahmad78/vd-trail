// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client"; import { useState } from"react"; import Link from"next/link"; import Image from"next/image"; import { Menu, X, ChevronDown } from"lucide-react"; import { motion, AnimatePresence } from"framer-motion"; import { useQuote } from"@/contexts/QuoteContext"; interface NavbarProps { onOpenQuote?: () => void; } const Navbar = ({ onOpenQuote }: NavbarProps) => { const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); const [isServicesOpen, setIsServicesOpen] = useState(false); const { setIsQuoteOpen } = useQuote(); const handleOpenQuote = onOpenQuote || (() => setIsQuoteOpen(true)); const serviceLinks = [ { name:"Residential", href:"/services/residential" }, { name:"Hospitality", href:"/services/hospitality" }, { name:"Educational", href:"/services/educational" }, ]; return ( <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 py-4"><div className="container mx-auto px-6 max-w-[1440px] flex items-center justify-between gap-4 xl:gap-8"> {/* Left Section: Logo */} <div className="flex-shrink-0"><Link href="/" className="relative h-12 w-40 block transition-all hover:opacity-80"><Image src="/logo/logo.png" alt="Voomet Design" fill className="object-contain object-left" priority /></Link></div> {/* Center/Main Track Link Array */} <div className="hidden lg:flex items-center gap-x-4 xl:gap-x-6 overflow-visible py-2 flex-grow justify-end"><Link href="/" className="uppercase text-slate-950 hover:text-[#324A61] text-xs font-black whitespace-nowrap transition-colors block"> Home </Link><Link href="/about" className="uppercase text-slate-950 hover:text-[#324A61] text-xs font-black whitespace-nowrap transition-colors block"> About </Link> {/* Services Dropdown */} <div className="relative group py-2"><button className="flex items-center gap-1 uppercase text-slate-950 group-hover:text-[#324A61] text-xs font-black whitespace-nowrap transition-colors outline-none cursor-pointer"> Services <ChevronDown size={14} className="transition-transform group-hover:rotate-180" /></button><div className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block pt-1"><div className="bg-[#020617] text-white border border-slate-800 rounded-md shadow-2xl py-2 min-w-[180px] z-[60]"> {serviceLinks.map((sub) => ( <Link key={sub.name} href={sub.href} className="text-slate-300 text-sm tracking-wider px-4 py-2 hover:bg-slate-900 hover:text-white block uppercase transition-colors"> {sub.name} </Link> ))} </div></div></div><Link href="https://VoometDesign.com/" target="_blank" rel="noopener noreferrer" className="uppercase text-slate-950 hover:text-[#324A61] text-xs font-black whitespace-nowrap transition-colors block"> Commercial Interiors </Link><Link href="/aluminium-upvc-systems" className="uppercase text-slate-950 hover:text-[#324A61] text-xs font-black whitespace-nowrap transition-colors block"> Aluminium & UPVC Systems </Link><Link href="/portfolio" className="uppercase text-slate-950 hover:text-[#324A61] text-xs font-black whitespace-nowrap transition-colors block"> Portfolio </Link><Link href="/blog" className="uppercase text-slate-950 hover:text-[#324A61] text-xs font-black whitespace-nowrap transition-colors block"> Blog </Link><Link href="/careers" className="uppercase text-slate-950 hover:text-[#324A61] text-xs font-black whitespace-nowrap transition-colors block"> Careers </Link><Link href="/contact" className="uppercase text-slate-950 hover:text-[#324A61] text-xs font-black whitespace-nowrap transition-colors block"> Contact </Link></div> {/* Right Section: CTA Button */} <div className="hidden lg:block ml-4 xl:ml-6"><button onClick={handleOpenQuote} className="bg-[#020617] text-white px-6 py-2.5 rounded-full uppercase font-bold text-sm xl:text-sm tracking-widest hover:bg-[#324A61] hover:text-slate-950 transition-all shadow-md whitespace-nowrap"> Free Consultation </button></div>        {/* Mobile Menu Toggle */}
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
                <Link href="/" className="uppercase text-slate-950 hover:text-[#324A61] text-sm font-black block tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link href="/about" className="uppercase text-slate-950 hover:text-[#324A61] text-sm font-black block tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                
                {/* Services Accordion Dropdown */}
                <div className="py-1">
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="w-full flex items-center justify-between uppercase text-slate-950 hover:text-[#324A61] text-sm font-black tracking-wide outline-none"
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
                            <Link
                              key={sub.name}
                              href={sub.href}
                              className="block uppercase text-slate-600 hover:text-slate-950 text-xs font-bold tracking-wide"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link href="https://VoometDesign.com/" target="_blank" rel="noopener noreferrer" className="uppercase text-slate-950 hover:text-[#324A61] text-sm font-black block tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>Commercial Interiors</Link>
                <Link href="/aluminium-upvc-systems" className="uppercase text-slate-950 hover:text-[#324A61] text-sm font-black block tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>Aluminium & UPVC Systems</Link>
                <Link href="/portfolio" className="uppercase text-slate-950 hover:text-[#324A61] text-sm font-black block tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>Portfolio</Link>
                <Link href="/blog" className="uppercase text-slate-950 hover:text-[#324A61] text-sm font-black block tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
                <Link href="/careers" className="uppercase text-slate-950 hover:text-[#324A61] text-sm font-black block tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>Careers</Link>
                <Link href="/contact" className="uppercase text-slate-950 hover:text-[#324A61] text-sm font-black block tracking-wide" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                
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
