"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import QuoteModal from "./QuoteModal";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const mainLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
  ];

  const serviceLinks = [
    { name: "Hospitality Interiors", href: "/services/hospitality" },
    { name: "Healthcare Interiors", href: "/services/healthcare" },
    { name: "Educational Interiors", href: "/services/education" },
    { name: "Residential Interiors", href: "/services/residential" },
  ];

  const otherLinks = [
    { name: "PORTFOLIO", href: "/portfolio" },
    { name: "BLOG", href: "/blog" },
    { name: "CAREERS", href: "/careers" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo (Left) */}
          <div className="flex-shrink-0">
            <Link href="/" className="relative h-12 w-40 block transition-all hover:opacity-80">
              <Image 
                src="/logo/logo.png" 
                alt="Voomet Design" 
                fill 
                className="object-contain object-left" 
                priority
              />
            </Link>
          </div>

          {/* Nav Links (Centered) */}
          <div className="hidden lg:flex items-center space-x-10">
            {mainLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[13px] font-semibold tracking-wide text-[#020617] hover:text-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button 
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center gap-1 text-[13px] font-semibold tracking-wide text-[#020617] hover:text-accent transition-colors outline-none"
              >
                SERVICES <ChevronDown size={14} className={`transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-lg p-4 w-52 border border-gray-100 z-[60]"
                  >
                    {serviceLinks.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        onClick={() => setIsServicesOpen(false)}
                        className="block py-2 px-4 text-[13px] font-medium text-[#020617] hover:bg-slate-50 hover:text-accent rounded-md transition-all"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {otherLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[13px] font-semibold tracking-wide text-[#020617] hover:text-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA (Right) */}
          <div className="hidden lg:block">
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="bg-[#020617] text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-accent transition-all shadow-md"
            >
              FREE CONSULTATION
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-[#020617]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white border-t border-gray-100 shadow-xl lg:hidden overflow-hidden"
            >
              <div className="flex flex-col p-6 space-y-4">
                {[...mainLinks, ...serviceLinks, ...otherLinks].map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm font-semibold text-[#020617]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsQuoteModalOpen(true);
                  }}
                  className="bg-[#020617] text-white py-3 rounded-full font-bold text-sm"
                >
                  FREE CONSULTATION
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
    </>
  );
};

export default Navbar;