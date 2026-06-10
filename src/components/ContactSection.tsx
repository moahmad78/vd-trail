// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";

import { useState, Suspense, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Mail, Send } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from 'next/navigation';

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
 <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const FacebookIcon = ({ size = 20 }: { size?: number }) => (
 <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const YoutubeIcon = ({ size = 20 }: { size?: number }) => (
 <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
);

const PinterestIcon = ({ size = 20 }: { size?: number }) => (
 <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.771-2.249 3.771-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.034-1.002 2.324-1.488 3.121 1.12.345 2.3.536 3.525.536 6.62 0 11.988-5.367 11.988-11.987C23.987 5.367 18.637 0 12.017 0z"/></svg>
);

const infoCards = [
 {
 title: "Our Studio",
 content: "No. 166, Obandehalli Industrial Area, Doddaballapura, Bangalore.",
 icon: <MapPin className="w-6 h-6 text-white" />
 },
 {
 title: "Get in Touch",
 content: "+91 9845014279 | shiraz@VoometDesign.com",
 icon: <Mail className="w-6 h-6 text-white" />
 },
 {
 title: "Working Hours",
 content: "Mon - Sat: 9:00 AM - 7:00 PM (Sunday by Appointment)",
 icon: <Clock className="w-6 h-6 text-white" />
 }
];

function InquiryForm() {
  const searchParams = useSearchParams();
  const incomingTier = searchParams.get('tier');
  const [tier, setTier] = useState("Not Specified");

  useEffect(() => {
    if (incomingTier === 'standard') setTier('Turnkey Execution');
    else if (incomingTier === 'medium') setTier('Premium Modern Contemporary');
    else if (incomingTier === 'luxury') setTier('Ultra-Luxury Bespoke');
  }, [incomingTier]);

  const inputClasses = "w-full py-2.5 px-4 bg-white border border-slate-300/80 text-slate-950 rounded-xl text-xs focus:border-black focus:ring-1 focus:ring-black outline-none shadow-sm transition-all duration-300 placeholder:text-slate-400 placeholder:font-normal tracking-wide";

  return (
    <form className="space-y-3 mt-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] font-bold text-slate-500 mb-1 block uppercase">Full Name *</label>
          <input type="text" className={inputClasses} placeholder="e.g., Sahil Sheikh" />
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-500 mb-1 block uppercase">Email Address *</label>
          <input type="email" className={inputClasses} placeholder="e.g., sahil@voometdesign.com" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] font-bold text-slate-500 mb-1 block uppercase">Phone Number *</label>
          <input type="tel" className={inputClasses} placeholder="e.g., +91 98450 14279" />
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-500 mb-1 block uppercase">Project Type</label>
          <select className={`${inputClasses} appearance-none`}>
            <option>RESIDENTIAL INTERIORS</option>
            <option>COMMERCIAL INTERIORS</option>
            <option>SERVICE APARTMENTS</option>
            <option>BOUTIQUE HOTELS</option>
            <option>P.G ACCOMMODATION</option>
            <option>EDUCATIONAL INSTITUTIONS</option>
            <option>ALUMINIUM & UPVC SYSTEMS</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] font-bold text-slate-500 mb-1 block uppercase">Estimated SQFT</label>
          <input type="text" className={inputClasses} placeholder="e.g., 2,500 sqft" />
        </div>
        <div>
          <label className="text-[10px] font-bold text-slate-500 mb-1 block uppercase">Design Style Tier</label>
          <select value={tier} onChange={(e) => setTier(e.target.value)} className={`${inputClasses} appearance-none`}>
            <option value="Not Specified">Not Specified</option>
            <option value="Ultra-Luxury Bespoke">Ultra-Luxury Bespoke</option>
            <option value="Premium Modern Contemporary">Premium Modern Contemporary</option>
            <option value="Turnkey Execution">Turnkey Execution</option>
          </select>
        </div>
      </div>
      <div>
        <label className="text-[10px] font-bold text-slate-500 mb-1 block uppercase">Project Address / Location</label>
        <input type="text" className={inputClasses} placeholder="e.g., Indiranagar, Bangalore" />
      </div>
      <div>
        <label className="text-[10px] font-bold text-slate-500 mb-1 block uppercase">Additional Project Brief</label>
        <textarea rows={2} className={`${inputClasses} resize-none`} placeholder="Tell us more about your vision, requirements, or specific challenges..." />
      </div>

      <button type="button" className="w-full bg-[#0f172a] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-black transition-all shadow-xl flex items-center justify-center gap-2 mt-4 active:scale-[0.98]">
        SEND MY REQUEST <Send size={14} />
      </button>
    </form>
  );
}

export default function ContactSection() {
  return (
    <section id="contact-us" className="py-16 md:py-24 relative z-20 scroll-mt-24 px-6 md:px-12">
      <div className="relative w-full max-w-[1440px] mx-auto rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-white via-slate-50 to-slate-100 border border-slate-200/60 shadow-2xl z-10 text-[#0f172a] min-h-[560px]">
        {/* Horizontal Background Image Fade Layer */}
        <img src="/assets/home/hero/slide-1.jpg" className="absolute inset-y-0 left-0 w-full lg:w-[55%] h-full object-cover z-0 pointer-events-none select-none opacity-25" alt="VOOMETDESIGN Interior Showcase" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50/40 via-white/95 to-white z-10 pointer-events-none" />

        {/* Content Layer */}
        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch p-6 md:p-10">
          
          {/* Left Content Area: Metadata & Map */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-wider mb-1 uppercase text-slate-950">CONTACT US</h2>
              <p className="text-xs text-slate-700 font-medium max-w-sm mb-4">Partner with VOOMETDESIGN to translate your luxury blueprints into structural reality.</p>

              <div className="flex flex-col gap-3">
                {infoCards.map((card, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#0f172a]/5 border border-[#0f172a]/10 rounded-full flex items-center justify-center shrink-0 text-slate-800">
                      {card.icon}
                    </div>
                    <div className="pt-1">
                      <h4 className="text-[11px] font-bold text-slate-500 mb-0.5 uppercase tracking-wider">{card.title}</h4>
                      <p className="text-[13px] text-slate-900 font-semibold leading-relaxed">{card.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <iframe 
              src="https://maps.google.com/maps?q=No.%20166,%20Obandehalli%20Industrial%20Area,%20Doddaballapura,%20Bangalore&t=&z=13&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-32 md:h-36 rounded-xl overflow-hidden border border-slate-300/60 grayscale opacity-95 hover:grayscale-0 transition-all duration-300 mt-2"
            />
          </div>

          {/* Right Content Area: Compact Inquiry Form */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-[#0f172a] mb-1">Start an Inquiry</h3>
            <p className="text-xs text-slate-500 mb-3">Tell us about your project to confirm your layout requirements.</p>
            <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-500">Loading form...</div>}>
              <div className="flex-grow">
                <InquiryForm />
              </div>
            </Suspense>
          </div>
          
        </div>
      </div>
    </section>
  );
}
