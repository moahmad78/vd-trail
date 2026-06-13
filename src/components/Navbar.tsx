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
  const [isExpertiseOpen, setIsExpertiseOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsExpertiseOpen(false);
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
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between relative">

          {/* BRAND LOGO */}
          <div className="flex-shrink-0">
            <Link href="/" className="block transition-transform hover:scale-105" aria-label="Go to Homepage">
              <Image
                src="/logo/logo.png"
                alt="Voomet Design"
                width={200}
                height={60}
                priority
                className="h-[46px] md:h-[56px] lg:h-[60px] w-auto object-contain"
              />
            </Link>
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-8 h-full">

            <Link href="/" className="group relative block py-1 transition-transform duration-300 ease-out text-left hover:translate-x-1.5 focus:translate-x-1.5 text-slate-950 font-semibold tracking-[0.04em] text-nav before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-7 before:h-[1.5px] before:w-0 before:bg-[#0f172a] before:transition-all before:duration-300 before:ease-out group-hover:before:w-5 group-focus:before:w-5 uppercase hover:text-slate-700">
              HOME
            </Link>

            {/* EXPERTISE DROPDOWN */}
            <div className="z-40 group/expertise h-full flex items-center">
              <button aria-label="Open Expertise Menu" aria-expanded="false" className="flex items-center gap-1 group relative block py-1 transition-transform duration-300 ease-out text-left hover:translate-x-1.5 focus:translate-x-1.5 text-slate-950 font-semibold tracking-[0.04em] text-nav before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-7 before:h-[1.5px] before:w-0 before:bg-[#0f172a] before:transition-all before:duration-300 before:ease-out group-hover:before:w-5 group-focus:before:w-5 uppercase hover:text-slate-700">
                <span>EXPERTISE</span>
                <ChevronDown size={12} aria-hidden="true" className="text-slate-400 transition-transform group-hover/expertise:rotate-180" />
              </button>

              {/* MEGA MENU */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[660px] bg-white rounded-3xl p-6 px-8 shadow-2xl border border-slate-100 grid grid-cols-[1fr_auto_1fr] items-start gap-8 z-50 text-left hidden group-hover/expertise:grid animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] z-0 select-none overflow-hidden rounded-3xl">
                  <Image src="/logo/icon.png" alt="" width={288} height={288} className="w-72 h-72 object-contain" aria-hidden="true" />
                </div>

                <div className="relative z-10">
                  <span className="text-caption font-extrabold tracking-widest text-slate-900 uppercase border-b border-slate-100 pb-2 mb-4 block">SPACES WE DESIGN</span>
                  <ul className="space-y-1 relative">
                    <li><Link href="/services/residential-interiors" className="group relative block py-1 transition-transform duration-300 ease-out text-left hover:translate-x-1.5 focus:translate-x-1.5 text-slate-950 font-semibold tracking-[0.04em] text-nav before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-7 before:h-[1.5px] before:w-0 before:bg-[#0f172a] before:transition-all before:duration-300 before:ease-out group-hover:before:w-5 group-focus:before:w-5 uppercase hover:text-slate-700">RESIDENTIAL</Link></li>
                    <li><Link href="/services/commercial-interiors" className="group relative block py-1 transition-transform duration-300 ease-out text-left hover:translate-x-1.5 focus:translate-x-1.5 text-slate-950 font-semibold tracking-[0.04em] text-nav before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-7 before:h-[1.5px] before:w-0 before:bg-[#0f172a] before:transition-all before:duration-300 before:ease-out group-hover:before:w-5 group-focus:before:w-5 uppercase hover:text-slate-700">COMMERCIAL</Link></li>
                    <li><Link href="/services/educational-institutions" className="group relative block py-1 transition-transform duration-300 ease-out text-left hover:translate-x-1.5 focus:translate-x-1.5 text-slate-950 font-semibold tracking-[0.04em] text-nav before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-7 before:h-[1.5px] before:w-0 before:bg-[#0f172a] before:transition-all before:duration-300 before:ease-out group-hover:before:w-5 group-focus:before:w-5 uppercase hover:text-slate-700">EDUCATIONAL</Link></li>
                    <li className="group/hospitality relative w-full">
                      <Link href="/services/boutique-hotels" className="group relative block py-1 transition-transform duration-300 ease-out text-left hover:translate-x-1.5 focus:translate-x-1.5 text-slate-950 font-semibold tracking-[0.04em] text-nav before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-7 before:h-[1.5px] before:w-0 before:bg-[#0f172a] before:transition-all before:duration-300 before:ease-out group-hover:before:w-5 group-focus:before:w-5 uppercase hover:text-slate-700">HOSPITALITY</Link>
                      <div className="hidden group-hover/hospitality:flex flex-col pl-4 mt-1 space-y-1 border-l border-slate-200/80 transition-all duration-300 text-left">
                        <Link href="/services/service-apartments" className="group relative block py-1 transition-transform duration-300 ease-out text-left hover:translate-x-1.5 focus:translate-x-1.5 text-slate-950 font-semibold text-caption before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-7 before:h-[1.5px] before:w-0 before:bg-[#0f172a] before:transition-all before:duration-300 before:ease-out group-hover:before:w-5 group-focus:before:w-5 uppercase hover:text-slate-700">SERVICE APARTMENTS</Link>
                        <Link href="/services/boutique-hotels" className="group relative block py-1 transition-transform duration-300 ease-out text-left hover:translate-x-1.5 focus:translate-x-1.5 text-slate-950 font-semibold text-caption before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-7 before:h-[1.5px] before:w-0 before:bg-[#0f172a] before:transition-all before:duration-300 before:ease-out group-hover:before:w-5 group-focus:before:w-5 uppercase hover:text-slate-700">BOUTIQUE HOTELS</Link>
                        <Link href="/services/pg-accommodation" className="group relative block py-1 transition-transform duration-300 ease-out text-left hover:translate-x-1.5 focus:translate-x-1.5 text-slate-950 font-semibold text-caption before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-7 before:h-[1.5px] before:w-0 before:bg-[#0f172a] before:transition-all before:duration-300 before:ease-out group-hover:before:w-5 group-focus:before:w-5 uppercase hover:text-slate-700">PG ACCOMMODATION</Link>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="w-[1px] bg-slate-200/80 my-1 relative z-10 h-full" />

                <div className="relative z-10">
                  <span className="text-caption font-extrabold tracking-widest text-slate-900 uppercase border-b border-slate-100 pb-2 mb-4 block">TECHNICAL SOLUTIONS</span>
                  <ul className="space-y-1">
                    <li><Link href="/services/aluminium-systems" className="group relative block py-1 transition-transform duration-300 ease-out text-left hover:translate-x-1.5 focus:translate-x-1.5 text-slate-950 font-semibold tracking-[0.04em] text-nav before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-7 before:h-[1.5px] before:w-0 before:bg-[#0f172a] before:transition-all before:duration-300 before:ease-out group-hover:before:w-5 group-focus:before:w-5 uppercase hover:text-slate-700">ALUMINIUM SYSTEMS</Link></li>
                    <li><Link href="/services/upvc-systems" className="group relative block py-1 transition-transform duration-300 ease-out text-left hover:translate-x-1.5 focus:translate-x-1.5 text-slate-950 font-semibold tracking-[0.04em] text-nav before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-7 before:h-[1.5px] before:w-0 before:bg-[#0f172a] before:transition-all before:duration-300 before:ease-out group-hover:before:w-5 group-focus:before:w-5 uppercase hover:text-slate-700">UPVC SYSTEMS</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            <Link href="/about" className="group relative block py-1 transition-transform duration-300 ease-out text-left hover:translate-x-1.5 focus:translate-x-1.5 text-slate-950 font-semibold tracking-[0.04em] text-nav before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-7 before:h-[1.5px] before:w-0 before:bg-[#0f172a] before:transition-all before:duration-300 before:ease-out group-hover:before:w-5 group-focus:before:w-5 uppercase hover:text-slate-700">
              ABOUT
            </Link>

            <Link href="/portfolio" className="group relative block py-1 transition-transform duration-300 ease-out text-left hover:translate-x-1.5 focus:translate-x-1.5 text-slate-950 font-semibold tracking-[0.04em] text-nav before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-7 before:h-[1.5px] before:w-0 before:bg-[#0f172a] before:transition-all before:duration-300 before:ease-out group-hover:before:w-5 group-focus:before:w-5 uppercase hover:text-slate-700">
              OUR WORK
            </Link>

            <Link href="/contact" className="group relative block py-1 transition-transform duration-300 ease-out text-left hover:translate-x-1.5 focus:translate-x-1.5 text-slate-950 font-semibold tracking-[0.04em] text-nav before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:-left-7 before:h-[1.5px] before:w-0 before:bg-[#0f172a] before:transition-all before:duration-300 before:ease-out group-hover:before:w-5 group-focus:before:w-5 uppercase hover:text-slate-700">
              CONTACT
            </Link>
          </nav>

          {/* RIGHT SIDE: CTA (desktop) + Hamburger (mobile) */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <button
                onClick={() => {
                  setIsQuoteOpen(true);
                  trackEvent('navbar_cta_click', { button_name: 'Book Consultation' });
                }}
                aria-label="Open booking consultation form"
                className="bg-[#0f172a] text-white text-button font-bold tracking-widest px-6 py-3 rounded-full hover:bg-black transition-all duration-300 uppercase"
              >
                BOOK CONSULTATION
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
              className="h-[40px] w-auto object-contain"
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
          className="flex-1 px-6 py-6 flex flex-col gap-1 overflow-y-auto overscroll-contain"
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
            className="flex items-center h-12 px-3 rounded-xl text-slate-900 font-semibold tracking-[0.06em] uppercase text-sm hover:bg-slate-50 transition-colors shrink-0"
          >
            Home
          </Link>

          {/* EXPERTISE accordion */}
          <div className="shrink-0">
            <button
              onClick={() => setIsExpertiseOpen(!isExpertiseOpen)}
              className="w-full flex items-center justify-between h-12 px-3 rounded-xl text-slate-900 font-semibold tracking-[0.06em] uppercase text-sm hover:bg-slate-50 transition-colors"
              aria-expanded={isExpertiseOpen}
            >
              <span>Expertise</span>
              <ChevronDown
                size={14}
                className="text-slate-400 transition-transform duration-300"
                style={{ transform: isExpertiseOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            </button>

            {/* Accordion content */}
            <div
              style={{
                maxHeight: isExpertiseOpen ? '400px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.4s cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <div className="pl-4 pb-2 pt-1 border-l-2 border-slate-100 ml-3 flex flex-col gap-0.5">
                {/* Spaces label */}
                <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase px-3 pt-2 pb-1">Spaces We Design</span>
                <Link href="/services/residential-interiors" onClick={closeMenu} className="flex items-center h-11 px-3 rounded-lg text-slate-700 font-medium text-sm hover:bg-slate-50 hover:text-slate-900 transition-colors">Residential</Link>
                <Link href="/services/commercial-interiors" onClick={closeMenu} className="flex items-center h-11 px-3 rounded-lg text-slate-700 font-medium text-sm hover:bg-slate-50 hover:text-slate-900 transition-colors">Commercial</Link>
                <Link href="/services/educational-institutions" onClick={closeMenu} className="flex items-center h-11 px-3 rounded-lg text-slate-700 font-medium text-sm hover:bg-slate-50 hover:text-slate-900 transition-colors">Educational</Link>
                <div className="flex items-center h-11 px-3 rounded-lg text-slate-700 font-medium text-sm select-none">Hospitality</div>
                <Link href="/services/service-apartments" onClick={closeMenu} className="flex items-center h-10 px-3 pl-6 rounded-lg text-slate-500 font-medium text-xs hover:text-slate-800 transition-colors">↳ Service Apartments</Link>
                <Link href="/services/boutique-hotels" onClick={closeMenu} className="flex items-center h-10 px-3 pl-6 rounded-lg text-slate-500 font-medium text-xs hover:text-slate-800 transition-colors">↳ Boutique Hotels</Link>
                <Link href="/services/pg-accommodation" onClick={closeMenu} className="flex items-center h-10 px-3 pl-6 rounded-lg text-slate-500 font-medium text-xs hover:text-slate-800 transition-colors">↳ PG Accommodation</Link>

                {/* Technical label */}
                <span className="text-[10px] font-bold tracking-[0.2em] text-slate-400 uppercase px-3 pt-3 pb-1">Technical Solutions</span>
                <Link href="/services/aluminium-systems" onClick={closeMenu} className="flex items-center h-11 px-3 rounded-lg text-slate-700 font-medium text-sm hover:bg-slate-50 hover:text-slate-900 transition-colors">Aluminium Systems</Link>
                <Link href="/services/upvc-systems" onClick={closeMenu} className="flex items-center h-11 px-3 rounded-lg text-slate-700 font-medium text-sm hover:bg-slate-50 hover:text-slate-900 transition-colors">UPVC Systems</Link>
              </div>
            </div>
          </div>

          {/* REST OF MENU */}
          <div className="flex flex-col gap-1 shrink-0">
            {/* ABOUT */}
            <Link href="/about" onClick={closeMenu} className="flex items-center h-12 px-3 rounded-xl text-slate-900 font-semibold tracking-[0.06em] uppercase text-sm hover:bg-slate-50 transition-colors">
              About
            </Link>

            {/* OUR WORK */}
            <Link href="/portfolio" onClick={closeMenu} className="flex items-center h-12 px-3 rounded-xl text-slate-900 font-semibold tracking-[0.06em] uppercase text-sm hover:bg-slate-50 transition-colors">
              Our Work
            </Link>

            {/* CONTACT */}
            <Link href="/contact" onClick={closeMenu} className="flex items-center h-12 px-3 rounded-xl text-slate-900 font-semibold tracking-[0.06em] uppercase text-sm hover:bg-slate-50 transition-colors">
              Contact
            </Link>

            {/* Divider */}
            <div className="my-4 h-px bg-slate-100" />

            {/* CTA Button */}
            <button
              onClick={() => {
                setIsQuoteOpen(true);
                closeMenu();
                trackEvent('navbar_cta_click', { button_name: 'Book Consultation Mobile' });
              }}
              className="w-full h-14 bg-[#0f172a] text-white font-bold tracking-widest rounded-2xl uppercase text-sm hover:bg-black transition-colors flex-shrink-0"
            >
              Book Consultation
            </button>

            {/* Quick contact */}
            <a
              href="tel:+919845014279"
              className="mt-3 w-full h-12 flex flex-shrink-0 items-center justify-center gap-2 rounded-2xl border text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors"
              style={{ borderColor: 'rgba(11,22,51,0.12)' }}
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
