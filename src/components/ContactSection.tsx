"use client";

import { useState, Suspense, useEffect } from "react";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

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
    icon: <Mail className="w-5 h-5 text-[#0B1635]" />, // Using Mail icon to match the layout
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
    "w-full h-[56px] md:h-[60px] px-5 bg-white text-[#0B1635] text-[13px] md:text-[14px] rounded-[16px] outline-none transition-all duration-300 placeholder:text-[#7A869E]";
  const inputStyle = {
    border: "1px solid rgba(11,22,53,0.10)",
  };

  return (
    <form className="space-y-4 md:space-y-5 relative z-10 w-full max-w-lg mx-auto lg:max-w-none">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <input
          type="tel"
          className={`${inputClasses} focus:border-[#0B1635] focus:ring-[4px] focus:ring-[#0B1635]/[0.06]`}
          style={inputStyle}
          placeholder="Phone Number"
        />
        <div className="relative">
          <select
            className={`${inputClasses} appearance-none focus:border-[#0B1635] focus:ring-[4px] focus:ring-[#0B1635]/[0.06]`}
            style={inputStyle}
          >
            <option value="" disabled selected hidden className="text-[#7A869E]">
              Project Type
            </option>
            <option>Residential Interiors</option>
            <option>Commercial Interiors</option>
            <option>Service Apartments</option>
            <option>Boutique Hotels</option>
            <option>P.G Accommodation</option>
            <option>Educational Institutions</option>
            <option>Aluminium & UPVC Systems</option>
          </select>
          {/* Custom chevron */}
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7A869E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
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
        className="w-full min-h-[140px] p-5 bg-white text-[#0B1635] text-[13px] md:text-[14px] rounded-[16px] outline-none transition-all duration-300 placeholder:text-[#7A869E] resize-none focus:border-[#0B1635] focus:ring-[4px] focus:ring-[#0B1635]/[0.06]"
        style={inputStyle}
        placeholder="Additional Project Brief..."
      />

      <button
        type="button"
        className="group w-full h-[60px] bg-[#0B1635] text-white rounded-[18px] text-[13px] md:text-[14px] font-bold tracking-wide flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-[3px]"
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

      <p className="text-center text-[11px] md:text-[12px] text-[#7A869E] mt-4 px-4 font-medium">
        Your information remains private and is used only to understand your project requirements.
      </p>
    </form>
  );
}

export default function ContactSection() {
  return (
    <section id="contact-us" className="relative z-20 px-6 md:px-12 scroll-mt-24 pb-20 md:pb-32">
      <div className="max-w-[1440px] mx-auto -mt-[100px] md:-mt-[120px] lg:-mt-[140px]">
        <div
          className="relative w-full rounded-[2rem] md:rounded-[40px] overflow-hidden p-8 md:p-14 lg:p-20 border border-white/50"
          style={{
            backgroundColor: "#F7F7F5",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 30px 80px rgba(11,22,53,0.10)",
          }}
        >
          <BlueprintBackground />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24">
            {/* ── LEFT COLUMN: Studio Information ────────────────────── */}
            <div className="flex flex-col">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.24em] mb-4 md:mb-6"
                style={{ color: "#6E7D9B" }}
              >
                VISIT OUR STUDIO
              </span>
              <h2
                className="font-bold leading-[1.05] tracking-[-0.03em] mb-4 md:mb-6"
                style={{
                  fontSize: "clamp(2.4rem, 4vw, 3.8rem)",
                  color: "#0B1633",
                }}
              >
                Start The Conversation.
              </h2>
              <p className="text-[14px] md:text-[16px] text-[#6E7D9B] mb-10 md:mb-14 font-light">
                We&apos;d love to understand your vision and help shape spaces that inspire.
              </p>

              <div className="flex flex-col gap-8 md:gap-10 mb-12 md:mb-16">
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

              {/* Refined Map Card */}
              <div
                className="relative w-full h-[180px] md:h-[220px] rounded-[24px] overflow-hidden group transition-transform duration-700 ease-out hover:scale-[1.01]"
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
              </div>
            </div>

            {/* ── RIGHT COLUMN: Inquiry Form ─────────────────────────── */}
            <div className="flex flex-col lg:pl-4">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.24em] mb-4 md:mb-6"
                style={{ color: "#6E7D9B" }}
              >
                PROJECT INQUIRY
              </span>
              <h3
                className="font-bold leading-[1.1] tracking-[-0.02em] mb-2"
                style={{
                  fontSize: "clamp(1.8rem, 2.5vw, 2.4rem)",
                  color: "#0B1633",
                }}
              >
                Tell Us About Your Vision.
              </h3>
              <p className="text-[14px] md:text-[16px] text-[#6E7D9B] mb-8 font-light">
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
