"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

export default function UpvcInquiryForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <div className="w-full relative">
      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
            <Check size={32} />
          </div>
          <h3 className="text-[28px] font-bold text-[#071633] mb-2">Thank You!</h3>
          <p className="text-slate-600 text-[16px]">Our engineering team will contact you shortly.</p>
        </div>
      ) : (
        <>
          <h3 className="text-[20px] md:text-[24px] font-bold text-[#071633] tracking-tight mb-2">
            Discuss Your UPVC System Requirements
          </h3>
          <p className="text-[#6E7D9B] text-[13px] md:text-[14px] mb-4 leading-relaxed max-w-[90%]">
            Our experts will recommend the most suitable UPVC window and door solutions based on your project requirements.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="fullName" className="text-[11px] font-semibold text-[#071633] ml-1">Full Name *</label>
                <input 
                  required
                  type="text" 
                  id="fullName"
                  className="w-full h-[40px] md:h-[44px] px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#071633] focus:ring-1 focus:ring-[#071633] outline-none transition-all placeholder:text-slate-400 text-[13px]"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-[11px] font-semibold text-[#071633] ml-1">Phone Number *</label>
                <input 
                  required
                  type="tel" 
                  id="phone"
                  className="w-full h-[40px] md:h-[44px] px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#071633] focus:ring-1 focus:ring-[#071633] outline-none transition-all placeholder:text-slate-400 text-[13px]"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-[11px] font-semibold text-[#071633] ml-1">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  className="w-full h-[40px] md:h-[44px] px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#071633] focus:ring-1 focus:ring-[#071633] outline-none transition-all placeholder:text-slate-400 text-[13px]"
                  placeholder="john@example.com"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="projectType" className="text-[11px] font-semibold text-[#071633] ml-1">Project Type</label>
                <select 
                  id="projectType"
                  defaultValue=""
                  className="w-full h-[40px] md:h-[44px] px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#071633] focus:ring-1 focus:ring-[#071633] outline-none transition-all text-[#071633] text-[13px] appearance-none"
                >
                  <option value="" disabled>Select Type</option>
                  <option value="residential">Residential Villa</option>
                  <option value="commercial">Commercial Building</option>
                  <option value="hospitality">Hospitality / Hotel</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="location" className="text-[11px] font-semibold text-[#071633] ml-1">Project Location</label>
                <input 
                  type="text" 
                  id="location"
                  className="w-full h-[40px] md:h-[44px] px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#071633] focus:ring-1 focus:ring-[#071633] outline-none transition-all placeholder:text-slate-400 text-[13px]"
                  placeholder="City / Area"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="area" className="text-[11px] font-semibold text-[#071633] ml-1">Sq.ft Area</label>
                <select 
                  id="area"
                  defaultValue=""
                  className="w-full h-[40px] md:h-[44px] px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#071633] focus:ring-1 focus:ring-[#071633] outline-none transition-all text-[#071633] text-[13px] appearance-none"
                >
                  <option value="" disabled>Select Area Range</option>
                  <option value="Under 1,000 sq.ft">Under 1,000 sq.ft</option>
                  <option value="1,000 - 2,500 sq.ft">1,000 - 2,500 sq.ft</option>
                  <option value="2,500 - 5,000 sq.ft">2,500 - 5,000 sq.ft</option>
                  <option value="Above 5,000 sq.ft">Above 5,000 sq.ft</option>
                </select>
              </div>
            </div>

            {/* Row 4 */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="details" className="text-[11px] font-semibold text-[#071633] ml-1">Additional Requirements</label>
              <textarea 
                id="details"
                rows={2}
                className="w-full h-[70px] min-h-[70px] p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#071633] focus:ring-1 focus:ring-[#071633] outline-none transition-all placeholder:text-slate-400 text-[13px] resize-none"
                placeholder="Tell us about your system requirements..."
              />
            </div>

            {/* T&C Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-[6px] border-2 flex items-center justify-center transition-all duration-200 ${
                    agreedToTerms
                      ? "bg-[#071633] border-[#071633]"
                      : "bg-white border-slate-300 group-hover:border-[#071633]/40"
                  }`}
                >
                  {agreedToTerms && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-[12px] text-slate-500 leading-relaxed">
                I agree to the{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#071633] font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity"
                >
                  Privacy Policy
                </a>{" "}
                and consent to Voomet Design contacting me regarding my inquiry.
              </span>
            </label>

            {/* Row 5 */}
            <button
              type="submit"
              disabled={isSubmitting || !agreedToTerms}
              className="w-full h-[44px] md:h-[48px] mt-[4px] bg-[#071633] text-white font-semibold rounded-full hover:-translate-y-[2px] hover:shadow-[0_10px_30px_rgba(7,22,51,0.2)] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-[14px]"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Inquiry"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
