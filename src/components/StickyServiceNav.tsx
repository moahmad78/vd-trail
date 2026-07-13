"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const SERVICES = [
  { name: "Hospitality", path: "/services/boutique-hotels", matchPath: "/services/boutique-hotels" },
  { name: "Residential", path: "/services/residential-interiors", matchPath: "/services/residential-interiors" },
  { name: "Educational", path: "/services/educational-institutions", matchPath: "/services/educational-institutions" },
  { name: "Commercial", path: "/services/commercial-interiors", matchPath: "/services/commercial-interiors" },
  { name: "Aluminium Systems", path: "/services/aluminium-systems", matchPath: "/services/aluminium-systems" },
  { name: "UPVC Systems", path: "/services/upvc-systems", matchPath: "/services/upvc-systems" },
  { name: "Facades & Glazing Solutions", path: "/services/facades-glazing", matchPath: "/services/facades-glazing" },
];

const serviceSubMenus: Record<string, { label: string; href: string }[]> = {
  hospitality: [
    { label: "Boutique Hotels", href: "/services/boutique-hotels" },
    { label: "Service Apartments", href: "/services/service-apartments" },
    { label: "PG Accommodation", href: "/services/pg-accommodation" },
  ],
  // residential: [...]
  // commercial: [...]
};

const hospitalitySlugs = [
  "hospitality",
  "boutique-hotels", 
  "service-apartments",
  "pg-accommodation"
];

export default function StickyServiceNav() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [showMainServices, setShowMainServices] = useState(false);
  
  // Reset view when pathname changes
  useEffect(() => {
    setShowMainServices(false);
  }, [pathname]);
  
  // Logic: 
  // - pathname === '/services' -> show full 7 tab menu (isHospitalityPage = false)
  // - pathname includes hospitality slugs -> show hospitality sub-tabs
  // - Any other service page -> show full 7 tab menu
  const isHospitalityPage = pathname && pathname !== '/services' 
    ? hospitalitySlugs.some(s => pathname.includes(s)) 
    : false;
  useEffect(() => {
    let windowHeight = window.innerHeight;
    
    const handleResize = () => {
      windowHeight = window.innerHeight;
    };

    const handleScroll = () => {
      // Show when scrolled roughly past the first viewport (hero section)
      if (window.scrollY > windowHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div 
      className={`fixed top-[88px] left-0 right-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-slate-200/50 shadow-sm transition-all duration-300 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex items-center md:justify-center overflow-x-auto no-scrollbar py-3 md:py-4 gap-2 md:gap-4">
          {isHospitalityPage && !showMainServices ? (
            <>
              <button 
                onClick={() => setShowMainServices(true)}
                className="flex items-center text-[13px] md:text-[14px] font-bold text-slate-500 hover:text-[#0B1633] transition-colors flex-shrink-0 mr-2 md:mr-4 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                All Services
              </button>
              <div className="w-px h-5 bg-slate-200 mr-1 md:mr-2 flex-shrink-0" />
              {serviceSubMenus.hospitality.map((service) => {
                const activeSlug = pathname.split('/').pop();
                const isActive = activeSlug === service.href.split('/').pop();
                return (
                  <Link
                    key={service.label}
                    href={service.href}
                    className={`flex-shrink-0 px-5 py-2.5 md:py-2 rounded-full text-[13px] md:text-[14px] font-bold tracking-wide transition-all duration-300 ${
                      isActive
                        ? "bg-[#0B1633] text-white shadow-[0_4px_15px_rgba(11,22,51,0.2)]"
                        : "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-[#0B1633]"
                    }`}
                  >
                    {service.label}
                  </Link>
                );
              })}
            </>
          ) : (
            SERVICES.map((service) => {
              const isActive = (service.name === "Hospitality" && isHospitalityPage) || 
                               pathname?.startsWith(service.matchPath);

              return (
                <Link
                  key={service.name}
                  href={service.path}
                  className={`flex-shrink-0 px-5 py-2.5 md:py-2 rounded-full text-[13px] md:text-[14px] font-bold tracking-wide transition-all duration-300 ${
                    isActive
                      ? "bg-[#0B1633] text-white shadow-[0_4px_15px_rgba(11,22,51,0.2)]"
                      : "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-[#0B1633]"
                  }`}
                >
                  {service.name}
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
