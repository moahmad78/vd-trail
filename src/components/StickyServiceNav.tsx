"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SERVICES = [
  { name: "Hospitality", path: "/services/hospitality/boutique-hotels", matchPath: "/services/hospitality" },
  { name: "Residential", path: "/services/residential-interiors", matchPath: "/services/residential-interiors" },
  { name: "Educational", path: "/services/educational-institutions", matchPath: "/services/educational-institutions" },
  { name: "Commercial", path: "/services/commercial-interiors", matchPath: "/services/commercial-interiors" },
  { name: "Aluminium Systems", path: "/services/aluminium-systems", matchPath: "/services/aluminium-systems" },
  { name: "UPVC Systems", path: "/services/upvc-systems", matchPath: "/services/upvc-systems" },
];

const HOSPITALITY_SERVICES = [
  { name: "Boutique Hotels", path: "/services/hospitality/boutique-hotels", matchPath: "/services/hospitality/boutique-hotels" },
  { name: "Service Apartments", path: "/services/hospitality/service-apartments", matchPath: "/services/hospitality/service-apartments" },
  { name: "PG Accommodation", path: "/services/hospitality/pg-accommodation", matchPath: "/services/hospitality/pg-accommodation" },
];

export default function StickyServiceNav() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const isHospitality = pathname?.startsWith("/services/hospitality");

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled roughly past the first viewport (hero section)
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={`fixed top-[88px] left-0 right-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-slate-200/50 shadow-sm transition-all duration-300 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex items-center md:justify-center overflow-x-auto no-scrollbar py-3 md:py-4 gap-2 md:gap-4">
          {isHospitality ? (
            <>
              <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#6E7D9B] mr-2 md:mr-4 flex-shrink-0">
                Hospitality
              </span>
              <div className="w-px h-5 bg-slate-200 mr-1 md:mr-2 flex-shrink-0" />
              {HOSPITALITY_SERVICES.map((service) => {
                const isActive = pathname === service.matchPath;
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
              })}
            </>
          ) : (
            SERVICES.map((service) => {
              const isActive = pathname?.startsWith(service.matchPath);

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
