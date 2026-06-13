"use client";

import { useState, Suspense, useEffect } from "react";
import { MapPin, Phone, Mail, ArrowRight, Clock } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { trackConsultationRequest } from "@/lib/tracking";

function BlueprintBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2rem] md:rounded-[2.5rem]"
      style={{ opacity: 0.025, zIndex: 0 }}
    >
      <div
        className="absolute inset-0 w-[200%] h-[200%] -top-[50%] -left-[50%]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0B1635 1px, transparent 1px),
            linear-gradient(to bottom, #0B1635 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          transform: "rotate(-12deg) scale(1.5)",
        }}
      />
    </div>
  );
}

const infoCards = [
  {
    title: "OUR STUDIO",
    content: "No. 166, Obandehalli Industrial Area,\nDoddaballapura, Bangalore.",
    icon: <MapPin className="w-5 h-5 text-[#0B1635]" />,
  },
  {
    title: "GET IN TOUCH",
    content: "+91 9845014279\ninfo@voometdesign.com",
    icon: <Phone className="w-5 h-5 text-[#0B1635]" />,
  },
  {
    title: "WORKING HOURS",
    content: "Mon – Sat: 9:00 AM – 7:00 PM\nSunday by Appointment",
    icon: <Mail className="w-5 h-5 text-[#0B1635]" />,
  },
];

const mobileInfoCards = [
  {
    title: "STUDIO",
    content: "Bangalore",
    icon: <MapPin className="w-3.5 h-3.5 text-[#0B1635]" />,
    href: "https://maps.google.com/maps?q=No.+166,+Obandehalli+Industrial+Area,+Doddaballapura,+Bangalore"
  },
  {
    title: "CALL",
    content: "+91 9845014279",
    icon: <Phone className="w-3.5 h-3.5 text-[#0B1635]" />,
    href: "tel:+919845014279"
  },
  {
    title: "EMAIL",
    content: "info@voometdesign.com",
    icon: <Mail className="w-3.5 h-3.5 text-[#0B1635]" />,
    href: "mailto:info@voometdesign.com"
  },
  {
    title: "HOURS",
    content: "Mon – Sat\n9AM – 7PM",
    icon: <Clock className="w-3.5 h-3.5 text-[#0B1635]" />,
    href: null
  },
];

function InquiryForm() {
  const searchParams = useSearchParams();
  const incomingTier = searchParams.get("tier");
  const [tier, setTier] = useState("Not Specified");

  useEffect(() => {
    if (incomingTier === "standard") setTier("Turnkey Execution");
    else if (incomingTier === "medium") setTier("Premium Modern Contemporary");
    else if (incomingTier === "luxury") setTier("Ultra-Luxury Bespoke");
  }, [incomingTier]);

  const inputClasses =
    "w-full h-[48px] md:h-[60px] px-4 md:px-5 bg-white text-[#0B1635] text-[12px] md:text-[14px] rounded-[12px] md:rounded-[16px] outline-none transition-all duration-300 placeholder:text-[#7A869E]";
  const inputStyle = {
    border: "1px solid rgba(11,22,53,0.10)",
  };

  return (
    <form className="space-y-3 md:space-y-5 relative z-10 w-full max-w-lg mx-auto lg:max-w-none">
      <div className="grid grid-cols-2 gap-2.5 md:gap-5">
        <input
          type="text"
          className={`${inputClasses} focus:border-[#0B1635] focus:ring-[4px] focus:ring-[#0B1635]/[0.06]`}
          style={inputStyle}
          placeholder="Full Name"
        />
        <input
          type="email"
          className={`${inputClasses} focus:border-[#0B1635] focus:ring-[4px] focus:ring-[#0B1635]/[0.06]`}
          style={inputStyle}
          placeholder="Email Address"
        />
      </div>

      <div className="grid grid-cols-2 gap-2.5 md:gap-5">
        <input
          type="tel"
          className={`${inputClasses} focus:border-[#0B1635] focus:ring-[4px] focus:ring-[#0B1635]/[0.06]`}
          style={inputStyle}
          placeholder="Phone Number"
        />
        <div className="relative">
          <select
            defaultValue=""
            className={`${inputClasses} appearance-none focus:border-[#0B1635] focus:ring-[4px] focus:ring-[#0B1635]/[0.06]`}
            style={inputStyle}
          >
            <option value="" disabled hidden className="text-[#7A869E]">
              Project Type
            </option>
            <option value="Residential Interiors">Residential Interiors</option>
            <option value="Commercial Interiors">Commercial Interiors</option>
            <option value="Service Apartments">Service Apartments</option>
            <option value="Boutique Hotels">Boutique Hotels</option>
            <option value="P.G Accommodation">P.G Accommodation</option>
            <option value="Educational Institutions">Educational Institutions</option>
            <option value="Aluminium & UPVC Systems">Aluminium & UPVC Systems</option>
          </select>
          {/* Custom chevron */}
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7A869E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 md:gap-5">
        <input
          type="text"
          className={`${inputClasses} focus:border-[#0B1635] focus:ring-[4px] focus:ring-[#0B1635]/[0.06]`}
          style={inputStyle}
          placeholder="Estimated SQFT"
        />
        <div className="relative">
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            className={`${inputClasses} appearance-none focus:border-[#0B1635] focus:ring-[4px] focus:ring-[#0B1635]/[0.06]`}
            style={inputStyle}
          >
            <option value="Not Specified">Design Style Tier</option>
            <option value="Ultra-Luxury Bespoke">Ultra-Luxury Bespoke</option>
            <option value="Premium Modern Contemporary">Premium Modern Contemporary</option>
            <option value="Turnkey Execution">Turnkey Execution</option>
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7A869E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>

      <input
        type="text"
        className={`${inputClasses} focus:border-[#0B1635] focus:ring-[4px] focus:ring-[#0B1635]/[0.06]`}
        style={inputStyle}
        placeholder="Project Address / Location"
      />

      <textarea
        className="w-full min-h-[85px] md:min-h-[140px] p-4 md:p-5 bg-white text-[#0B1635] text-[12px] md:text-[14px] rounded-[12px] md:rounded-[16px] outline-none transition-all duration-300 placeholder:text-[#7A869E] resize-none focus:border-[#0B1635] focus:ring-[4px] focus:ring-[#0B1635]/[0.06]"
        style={inputStyle}
        placeholder="Additional Project Brief..."
      />

      <button
        type="button"
        onClick={() => trackConsultationRequest({ projectType: 'General', designTier: tier })}
        className="group w-full h-[48px] md:h-[60px] bg-[#0B1635] text-white rounded-[12px] md:rounded-[18px] text-[13px] md:text-[14px] font-bold tracking-wide flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-[3px]"
        style={{
          boxShadow: "0 4px 15px rgba(11,22,53,0.05)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 18px 40px rgba(11,22,53,0.18)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 15px rgba(11,22,53,0.05)";
        }}
      >
        Begin Your Project <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
      </button>

      <p className="text-center text-[9.5px] md:text-[12px] text-[#7A869E] mt-2 md:mt-4 px-2 md:px-4 font-medium flex items-center justify-center gap-1.5">
        <span className="md:hidden">🔒 Secure & Private</span>
        <span className="hidden md:inline">Your information remains private and is used only to understand your project requirements.</span>
      </p>
    </form>
  );
}

export default function ContactSection() {
  return (
    <section id="contact-us" className="relative z-20 px-4 sm:px-6 md:px-12 scroll-mt-24 pb-16 md:pb-28">
      <div className="max-w-[1440px] mx-auto -mt-[40px] sm:-mt-[70px] md:-mt-[100px] lg:-mt-[120px]">
        <div
          className="relative w-full rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[40px] overflow-hidden p-5 sm:p-8 md:p-14 lg:p-20 border border-white/50"
          style={{
            backgroundColor: "#F7F7F5",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 30px 80px rgba(11,22,53,0.10)",
          }}
        >
          <BlueprintBackground />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 md:gap-16 lg:gap-24">
            {/* ── LEFT COLUMN: Studio Information ────────────────────── */}
            <div className="flex flex-col">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.24em] mb-4 md:mb-6"
                style={{ color: "#6E7D9B" }}
              >
                VISIT OUR STUDIO
              </span>
              <h2
                className="font-bold leading-[1.05] tracking-tight md:tracking-[-0.03em] mb-2 md:mb-6 text-[32px] md:text-[clamp(2.4rem,4vw,3.8rem)]"
                style={{
                  color: "#0B1633",
                }}
              >
                Start The Conversation.
              </h2>
              <p className="text-[14px] md:text-[16px] text-[#6E7D9B] mb-6 md:mb-14 font-light">
                We&apos;d love to understand your vision and help shape spaces that inspire.
              </p>

              {/* Desktop Info Cards */}
              <div className="hidden md:flex flex-col gap-10 mb-16">
                {infoCards.map((card, idx) => (
                  <div key={idx} className="flex items-start gap-5 group">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-[rgba(11,22,53,0.04)] rounded-full flex items-center justify-center shrink-0 transition-transform duration-400 group-hover:-translate-y-[3px]">
                      {card.icon}
                    </div>
                    <div className="pt-1 md:pt-1.5">
                      <h4 className="text-[10px] md:text-[11px] font-bold text-[#6E7D9B] mb-1 md:mb-1.5 uppercase tracking-[0.15em]">
                        {card.title}
                      </h4>
                      <p className="text-[14px] md:text-[15px] text-[#0B1633] font-medium leading-[1.6] whitespace-pre-line">
                        {card.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Info Cards */}
              <div className="grid grid-cols-2 gap-2.5 mb-6 md:hidden">
                {mobileInfoCards.map((card, idx) => {
                  const CardContent = (
                    <div className="bg-white/60 border border-white rounded-[16px] p-3 flex flex-col items-start gap-2 shadow-sm h-full w-full">
                      <div className="w-7 h-7 bg-[rgba(11,22,53,0.04)] rounded-full flex items-center justify-center shrink-0">
                        {card.icon}
                      </div>
                      <div className="w-full overflow-hidden">
                        <h4 className="text-[8px] font-bold text-[#6E7D9B] mb-0.5 uppercase tracking-[0.15em]">
                          {card.title}
                        </h4>
                        <p className="text-[9.5px] xs:text-[10px] text-[#0B1633] font-medium leading-[1.3] whitespace-nowrap overflow-hidden text-ellipsis">
                          {card.content}
                        </p>
                      </div>
                    </div>
                  );

                  if (card.href) {
                    return (
                      <a key={idx} href={card.href} target="_blank" rel="noopener noreferrer" className="block h-full active:scale-95 transition-transform">
                        {CardContent}
                      </a>
                    );
                  }
                  return <div key={idx} className="h-full">{CardContent}</div>;
                })}
              </div>

              {/* Refined Map Card */}
              <div
                className="relative w-full h-[110px] md:h-[220px] rounded-[20px] md:rounded-[24px] overflow-hidden group transition-transform duration-700 ease-out hover:scale-[1.01]"
                style={{
                  boxShadow: "0 10px 30px rgba(11,22,53,0.06)",
                  border: "1px solid rgba(11,22,53,0.05)",
                }}
              >
                <div
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background: "linear-gradient(to bottom, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 35%)",
                  }}
                />
                <span
                  className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-[#0B1635] uppercase tracking-wider shadow-sm border border-slate-100 flex flex-col items-center leading-tight"
                >
                  <span>VOOMETDESIGN Studio</span>
                  <span className="text-[#6E7D9B] text-[9px]">Bangalore</span>
                </span>
                <iframe
                  src="https://maps.google.com/maps?q=No.%20166,%20Obandehalli%20Industrial%20Area,%20Doddaballapura,%20Bangalore&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full grayscale-[0.8] opacity-90 group-hover:grayscale-0 transition-all duration-700"
                />
                
                {/* Mobile 'Open in Google Maps' button */}
                <a
                  href="https://maps.google.com/maps?q=No.+166,+Obandehalli+Industrial+Area,+Doddaballapura,+Bangalore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-2.5 right-2.5 z-20 px-3 py-1.5 bg-[#0B1635] text-white rounded-full text-[8.5px] font-bold uppercase tracking-widest shadow-[0_4px_12px_rgba(11,22,53,0.15)] md:hidden flex items-center gap-1.5 active:scale-95 transition-transform"
                >
                  Open in Maps <ArrowRight size={10} />
                </a>
              </div>
            </div>

            {/* ── RIGHT COLUMN: Inquiry Form ─────────────────────────── */}
            <div className="flex flex-col lg:pl-4">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.24em] mb-2 md:mb-6"
                style={{ color: "#6E7D9B" }}
              >
                PROJECT INQUIRY
              </span>
              <h3
                className="font-bold leading-[1.1] tracking-[-0.02em] mb-1 md:mb-2"
                style={{
                  fontSize: "clamp(1.8rem, 2.5vw, 2.4rem)",
                  color: "#0B1633",
                }}
              >
                Tell Us About Your Vision.
              </h3>
              <p className="text-[14px] md:text-[16px] text-[#6E7D9B] mb-5 md:mb-8 font-light">
                Share your requirements and we&apos;ll prepare a tailored approach for your project.
              </p>

              <Suspense fallback={<div className="h-64 flex items-center justify-center text-[#6E7D9B]">Loading form...</div>}>
                <InquiryForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
