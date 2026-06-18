"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, X, Phone } from 'lucide-react';
import { useQuote } from '@/contexts/QuoteContext';
import { useState, useEffect } from 'react';
import { trackEvent } from '@/lib/tracking';

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);
const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const PinterestIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.771-2.249 3.771-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.034-1.002 2.324-1.488 3.121 1.12.345 2.3.536 3.525.536 6.62 0 11.988-5.367 11.988-11.987C23.987 5.367 18.637 0 12.017 0z"/>
  </svg>
);
const YoutubeIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>
  </svg>
);

export default function Navbar() {
  const { setIsQuoteOpen } = useQuote();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isHospitalityOpen, setIsHospitalityOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsServicesOpen(false);
      setIsHospitalityOpen(false);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        className="w-full sticky top-0 z-50"
        style={{
          backgroundColor: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(11,22,51,0.07)",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between gap-6 lg:gap-8 relative">

          {/* BRAND LOGO */}
          <div className="flex-shrink-0">
            <Link href="/" className="block transition-transform hover:scale-105" aria-label="Go to Homepage">
              <Image
                src="/logo/logo.png"
                alt="Voomet Design"
                width={200}
                height={60}
                priority
                className="h-[50px] lg:h-[56px] w-auto object-contain"
              />
            </Link>
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-[40px] xl:gap-[48px] h-full">

            <Link href="/" className="group relative block text-[#0F172A] text-[16px] font-[500] hover:font-[600] tracking-[0.03em] uppercase transition-all duration-250 ease-in-out after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#0F172A] after:transition-all after:duration-250 after:ease-out hover:after:w-full">
              HOME
            </Link>

            <Link href="/about" className="group relative block text-[#0F172A] text-[16px] font-[500] hover:font-[600] tracking-[0.03em] uppercase transition-all duration-250 ease-in-out after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#0F172A] after:transition-all after:duration-250 after:ease-out hover:after:w-full">
              OUR STORY
            </Link>

            {/* SERVICES DROPDOWN */}
            <div className="z-40 group/services h-full flex items-center relative">
              <button aria-label="Open Services Menu" aria-expanded="false" className="flex items-center gap-1 group relative block text-[#0F172A] text-[16px] font-[500] hover:font-[600] tracking-[0.03em] uppercase transition-all duration-250 ease-in-out after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#0F172A] after:transition-all after:duration-250 after:ease-out group-hover/services:after:w-full">
                <span>SERVICES</span>
                <ChevronDown size={14} aria-hidden="true" className="text-slate-400 transition-transform group-hover/services:rotate-180" />
              </button>

              {/* PREMIUM DROPDOWN */}
              <div 
                className="absolute top-[calc(100%+4px)] left-1/2 -translate-x-1/2 bg-[#FFFFFF] invisible opacity-0 translate-y-[-10px] group-hover/services:visible group-hover/services:opacity-100 group-hover/services:translate-y-0 transition-all duration-[250ms] ease-out pointer-events-none group-hover/services:pointer-events-auto z-50 text-left flex flex-col"
                style={{
                  borderRadius: "20px",
                  border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
                  padding: "12px 24px",
                  minWidth: "260px",
                  width: "max-content",
                }}
              >
                {/* Pointer Arrow */}
                <div 
                  className="absolute -top-[7px] left-1/2 -translate-x-1/2 w-[14px] h-[14px] bg-white border-l border-t rotate-45 rounded-tl-[2px]" 
                  style={{ borderColor: 'rgba(0,0,0,0.06)' }} 
                />

                {[
                  { 
                    label: "Hospitality", 
                    href: "/services/hospitality/boutique-hotels",
                    subItems: [
                      { label: "Boutique Hotels", href: "/services/hospitality/boutique-hotels" },
                      { label: "Service Apartments", href: "/services/hospitality/service-apartments" },
                      { label: "PG Accommodation", href: "/services/hospitality/pg-accommodation" },
                    ]
                  },
                  { label: "Residential", href: "/services/residential-interiors" },
                  { label: "Educational", href: "/services/educational-institutions" },
                  { label: "Commercial", href: "/services/commercial-interiors" },
                  { label: "Aluminium Systems", href: "/services/aluminium-systems" },
                  { label: "UPVC Systems", href: "/services/upvc-systems" },
                ].map((item, idx, arr) => (
                  <div key={idx} className={item.subItems ? "group/flyout relative" : ""}>
                    <Link
                      href={item.href}
                      className={`group/item flex items-center justify-between py-[14px] text-[#475569] font-[500] text-[15px] hover:text-[#001B4E] transition-all duration-300 hover:translate-x-[6px] ${idx !== arr.length - 1 ? 'border-b border-slate-100/80' : ''}`}
                    >
                      <span>{item.label}</span>
                      
                      {item.subItems ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover/item:text-[#001B4E] transition-colors">
                           <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      ) : (
                        <svg 
                          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" 
                          className="opacity-0 -translate-x-3 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300 text-[#001B4E]"
                        >
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      )}
                    </Link>

                    {item.subItems && (
                      <div 
                        className="absolute top-[-12px] left-[calc(100%+36px)] bg-[#FFFFFF] invisible opacity-0 translate-x-[10px] group-hover/flyout:visible group-hover/flyout:opacity-100 group-hover/flyout:translate-x-0 transition-all duration-[250ms] ease-out pointer-events-none group-hover/flyout:pointer-events-auto z-50 text-left flex flex-col"
                        style={{
                          borderRadius: "20px",
                          border: "1px solid rgba(0,0,0,0.06)",
                          boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
                          padding: "12px 24px",
                          minWidth: "260px",
                          width: "max-content",
                        }}
                      >
                        {/* Safe Hover Bridge */}
                        <div className="absolute top-0 bottom-0 -left-[36px] w-[36px] bg-transparent" />
                        
                        {item.subItems.map((sub, sIdx, sArr) => (
                          <Link
                            key={sIdx}
                            href={sub.href}
                            className={`group/sub flex items-center justify-between py-[14px] text-[#475569] font-[500] text-[15px] hover:text-[#001B4E] transition-all duration-300 hover:translate-x-[6px] ${sIdx !== sArr.length - 1 ? 'border-b border-slate-100/80' : ''}`}
                          >
                            <span>{sub.label}</span>
                            <svg 
                              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" 
                              className="opacity-0 -translate-x-3 group-hover/sub:opacity-100 group-hover/sub:translate-x-0 transition-all duration-300 text-[#001B4E]"
                            >
                              <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Link href="/portfolio" className="group relative block text-[#0F172A] text-[16px] font-[500] hover:font-[600] tracking-[0.03em] uppercase transition-all duration-250 ease-in-out after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#0F172A] after:transition-all after:duration-250 after:ease-out hover:after:w-full">
              OUR WORK
            </Link>

            <Link href="/contact" className="group relative block text-[#0F172A] text-[16px] font-[500] hover:font-[600] tracking-[0.03em] uppercase transition-all duration-250 ease-in-out after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-[#0F172A] after:transition-all after:duration-250 after:ease-out hover:after:w-full">
              CONTACT
            </Link>
          </nav>

          {/* RIGHT SIDE: CTA (desktop/tablet) + Hamburger (mobile/tablet) */}
          <div className="flex items-center gap-3">
            {/* Desktop & Tablet CTA */}
            <div className="hidden md:block">
              <button
                onClick={() => {
                  setIsQuoteOpen(true);
                  trackEvent('navbar_cta_click', { button_name: 'Book Consultation' });
                }}
                aria-label="Open booking consultation form"
                className="bg-[#0F172A] text-white font-[500] text-[14px] px-[28px] h-[48px] rounded-full shadow-[0_8px_24px_rgba(15,23,42,0.18)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.24)] transition-all duration-300 hover:-translate-y-[2px] active:translate-y-0 flex items-center justify-center tracking-[0.02em]"
              >
                Book Consultation
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </header>

      {/* ── MOBILE MENU OVERLAY ──────────────────────────────────────── */}
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[998] bg-black/40 backdrop-blur-sm lg:hidden transition-opacity duration-300"
        style={{
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
        }}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Drawer — slides in from right */}
      <div
        className="fixed top-0 right-0 bottom-0 z-[999] w-[88vw] max-w-[380px] bg-white lg:hidden flex flex-col"
        style={{
          transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.38s cubic-bezier(0.22,1,0.36,1)',
          boxShadow: '-8px 0 40px rgba(11,22,51,0.18)',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer Header */}
        <div
          className="flex items-center justify-between px-6 h-20 border-b flex-shrink-0"
          style={{ borderColor: 'rgba(11,22,51,0.07)' }}
        >
          <Link href="/" onClick={closeMenu} aria-label="Go to Homepage">
            <Image
              src="/logo/logo.png"
              alt="Voomet Design"
              width={160}
              height={48}
              priority
              className="w-[155px] h-auto object-contain"
            />
          </Link>
          <button
            onClick={closeMenu}
            className="w-11 h-11 flex items-center justify-center rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Drawer Nav Links */}
        <nav 
          className="flex-1 px-4 py-6 flex flex-col gap-1 overflow-y-auto overscroll-contain"
          style={{
            maxHeight: 'calc(100dvh - 80px)',
            WebkitOverflowScrolling: 'touch',
            paddingBottom: 'max(env(safe-area-inset-bottom, 24px), 24px)',
          }}
        >

          {/* HOME */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center py-[14px] px-4 rounded-xl text-slate-900 font-[500] tracking-[0.04em] uppercase text-[16px] hover:bg-slate-50 transition-colors shrink-0"
          >
            Home
          </Link>

          {/* OUR STORY */}
          <Link
            href="/about"
            onClick={closeMenu}
            className="flex items-center py-[14px] px-4 rounded-xl text-slate-900 font-[500] tracking-[0.04em] uppercase text-[16px] hover:bg-slate-50 transition-colors shrink-0"
          >
            Our Story
          </Link>

          {/* SERVICES accordion */}
          <div className="shrink-0">
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="w-full flex items-center justify-between py-[14px] px-4 rounded-xl text-slate-900 font-[500] tracking-[0.04em] uppercase text-[16px] hover:bg-slate-50 transition-colors"
              aria-expanded={isServicesOpen}
            >
              <span>Services</span>
              <ChevronDown
                size={16}
                className="text-slate-400 transition-transform duration-300"
                style={{ transform: isServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>

            {/* Accordion content */}
            <div
              style={{
                maxHeight: isServicesOpen ? '500px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.4s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <div className="pl-4 pb-2 pt-1 border-l border-slate-100 ml-6 flex flex-col gap-1 mt-1">
                <button
                  onClick={() => setIsHospitalityOpen(!isHospitalityOpen)}
                  className="w-full flex items-center justify-between py-[12px] px-4 rounded-lg text-slate-700 font-[500] text-[15px] hover:bg-slate-50 transition-colors"
                  aria-expanded={isHospitalityOpen}
                >
                  <span>Hospitality</span>
                  <ChevronDown
                    size={14}
                    className="text-slate-400 transition-transform duration-300"
                    style={{ transform: isHospitalityOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>
                <div
                  style={{
                    maxHeight: isHospitalityOpen ? '200px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease-in-out',
                  }}
                >
                  <div className="flex flex-col gap-1 pb-2">
                    <Link href="/services/hospitality/boutique-hotels" onClick={closeMenu} className="flex items-center py-[10px] px-4 pl-8 rounded-lg text-slate-500 font-[400] text-[15px] hover:text-[#0F172A] transition-colors">Boutique Hotels</Link>
                    <Link href="/services/hospitality/service-apartments" onClick={closeMenu} className="flex items-center py-[10px] px-4 pl-8 rounded-lg text-slate-500 font-[400] text-[15px] hover:text-[#0F172A] transition-colors">Service Apartments</Link>
                    <Link href="/services/hospitality/pg-accommodation" onClick={closeMenu} className="flex items-center py-[10px] px-4 pl-8 rounded-lg text-slate-500 font-[400] text-[15px] hover:text-[#0F172A] transition-colors">PG Accommodation</Link>
                  </div>
                </div>
                
                <Link href="/services/residential-interiors" onClick={closeMenu} className="flex items-center py-[12px] px-4 rounded-lg text-slate-700 font-[500] text-[15px] hover:bg-slate-50 hover:text-slate-900 transition-colors">Residential</Link>
                <Link href="/services/educational-institutions" onClick={closeMenu} className="flex items-center py-[12px] px-4 rounded-lg text-slate-700 font-[500] text-[15px] hover:bg-slate-50 hover:text-slate-900 transition-colors">Educational</Link>
                <Link href="/services/commercial-interiors" onClick={closeMenu} className="flex items-center py-[12px] px-4 rounded-lg text-slate-700 font-[500] text-[15px] hover:bg-slate-50 hover:text-slate-900 transition-colors">Commercial</Link>
                <Link href="/services/aluminium-systems" onClick={closeMenu} className="flex items-center py-[12px] px-4 rounded-lg text-slate-700 font-[500] text-[15px] hover:bg-slate-50 hover:text-slate-900 transition-colors">Aluminum Systems</Link>
                <Link href="/services/upvc-systems" onClick={closeMenu} className="flex items-center py-[12px] px-4 rounded-lg text-slate-700 font-[500] text-[15px] hover:bg-slate-50 hover:text-slate-900 transition-colors">UPVC Systems</Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 shrink-0 mt-1">
            {/* OUR WORK */}
            <Link href="/portfolio" onClick={closeMenu} className="flex items-center py-[14px] px-4 rounded-xl text-slate-900 font-[500] tracking-[0.04em] uppercase text-[16px] hover:bg-slate-50 transition-colors shrink-0">
              Our Work
            </Link>

            {/* CONTACT */}
            <Link href="/contact" onClick={closeMenu} className="flex items-center py-[14px] px-4 rounded-xl text-slate-900 font-[500] tracking-[0.04em] uppercase text-[16px] hover:bg-slate-50 transition-colors shrink-0">
              Contact
            </Link>

            {/* Divider */}
            <div className="my-6 h-px bg-slate-100" />

            {/* CTA Button */}
            <button
              onClick={() => {
                setIsQuoteOpen(true);
                closeMenu();
                trackEvent('navbar_cta_click', { button_name: 'Book Consultation Mobile' });
              }}
              className="w-full h-[48px] bg-[#0F172A] text-white font-[500] tracking-[0.02em] text-[14px] rounded-full shadow-[0_8px_24px_rgba(15,23,42,0.18)] hover:shadow-[0_12px_30px_rgba(15,23,42,0.24)] transition-all duration-300 active:translate-y-0 flex items-center justify-center flex-shrink-0"
            >
              Book Consultation
            </button>

            {/* Quick contact */}
            <a
              href="tel:+919845014279"
              className="mt-4 w-full h-[48px] flex flex-shrink-0 items-center justify-center gap-2 rounded-full border text-[#0F172A] font-[500] text-[14px] hover:bg-slate-50 transition-colors"
              style={{ borderColor: 'rgba(15,23,42,0.12)' }}
            >
              <Phone size={15} />
              +91 98450 14279
            </a>

            {/* Social Icons */}
            <div className="mt-6 flex flex-shrink-0 items-center justify-center gap-4">
              {[
                { name: "Instagram", icon: <InstagramIcon />, href: "#" },
                { name: "Facebook",  icon: <FacebookIcon />,  href: "#" },
                { name: "Pinterest", icon: <PinterestIcon />, href: "#" },
                { name: "YouTube",   icon: <YoutubeIcon />,   href: "#" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
