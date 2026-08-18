"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

export default function WoodenDoorInquiryForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: data.fullName,
          mobileNumber: data.phone,
          email: data.email,
          projectLocation: data.location,
          requirement: "Wooden Door Systems",
          areaSqft: data.quantity || data.areaSqft || "1",
          projectDetails: `Door Type: ${data.doorType || 'Standard'} | Details: ${data.details || 'N/A'}`,
          type: "wooden_door_inquiry",
          submissionSource: "Wooden Door Inquiry Form"
        })
      });

      if (response.ok) {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full relative">
      {isSubmitted ? (
        <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
          <div className="w-16 h-16 bg-slate-100 text-[#0F172A] rounded-full flex items-center justify-center mb-6">
            <Check size={32} />
          </div>
          <h3 className="text-[28px] font-bold text-[#0F172A] mb-2">Thank You!</h3>
          <p className="text-slate-600 text-[16px]">Our master carpentry &amp; joinery team will contact you shortly.</p>
        </div>
      ) : (
        <>
          <h3 className="text-[20px] md:text-[24px] font-bold text-[#0F172A] tracking-tight mb-2">
            Request Wooden Door Consultation
          </h3>
          <p className="text-[#6E7D9B] text-[13px] md:text-[14px] mb-4 leading-relaxed max-w-[90%]">
            Share your project requirements and our woodworking specialists will get back to you within one business day.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="fullName" className="text-[11px] font-semibold text-[#0F172A] ml-1">Full Name *</label>
                <input 
                  required
                  type="text" 
                  id="fullName"
                  name="fullName"
                  className="w-full h-[40px] md:h-[44px] px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A] outline-none transition-all placeholder:text-slate-400 text-[13px]"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-[11px] font-semibold text-[#0F172A] ml-1">Phone Number *</label>
                <input 
                  required
                  type="tel" 
                  id="phone"
                  name="phone"
                  className="w-full h-[40px] md:h-[44px] px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A] outline-none transition-all placeholder:text-slate-400 text-[13px]"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-[11px] font-semibold text-[#0F172A] ml-1">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  className="w-full h-[40px] md:h-[44px] px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A] outline-none transition-all placeholder:text-slate-400 text-[13px]"
                  placeholder="john@example.com"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="doorType" className="text-[11px] font-semibold text-[#0F172A] ml-1">Door System Type</label>
                <select 
                  id="doorType"
                  name="doorType"
                  defaultValue=""
                  className="w-full h-[40px] md:h-[44px] px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A] outline-none transition-all text-[#0F172A] text-[13px] appearance-none"
                >
                  <option value="" disabled>Select Door Type</option>
                  <option value="flush">Flush Doors</option>
                  <option value="veneered_panel">Veneered Panel Doors</option>
                  <option value="laminate">Laminate Finish Doors</option>
                  <option value="membrane">Membrane Doors</option>
                  <option value="sliding_barn">Sliding &amp; Barn Doors</option>
                  <option value="french_glazed">French / Glazed Wooden Doors</option>
                  <option value="fire_rated">Fire-Rated Wooden Doors</option>
                  <option value="heritage">Custom Carved Heritage Doors</option>
                </select>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="location" className="text-[11px] font-semibold text-[#0F172A] ml-1">Project Location</label>
                <input 
                  type="text" 
                  id="location"
                  name="location"
                  className="w-full h-[40px] md:h-[44px] px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A] outline-none transition-all placeholder:text-slate-400 text-[13px]"
                  placeholder="City / Area"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="quantity" className="text-[11px] font-semibold text-[#0F172A] ml-1">Approx. Quantity / Units *</label>
                <input 
                  type="number"
                  id="quantity"
                  name="quantity"
                  required
                  min="1"
                  className="w-full h-[40px] md:h-[44px] px-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A] outline-none transition-all placeholder:text-slate-400 text-[13px]"
                  placeholder="e.g. 10 doors"
                />
              </div>
            </div>

            {/* Row 4 */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="details" className="text-[11px] font-semibold text-[#0F172A] ml-1">Specifications &amp; Material Preferences</label>
              <textarea 
                id="details"
                name="details"
                rows={2}
                className="w-full h-[70px] min-h-[70px] p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A] outline-none transition-all placeholder:text-slate-400 text-[13px] resize-none"
                placeholder="Veneer preference (Teak, Oak, Walnut), frame sizing, fire-rating requirements..."
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
                      ? "bg-[#0F172A] border-[#0F172A]"
                      : "bg-white border-slate-300 group-hover:border-[#0F172A]/40"
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
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0F172A] font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity"
                >
                  Privacy Policy
                </a>{" "}
                and consent to VoometDesign contacting me regarding my inquiry.
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || !agreedToTerms}
              className="w-full h-[44px] md:h-[48px] mt-[4px] bg-[#0F172A] text-white font-semibold rounded-full hover:-translate-y-[2px] hover:shadow-[0_10px_30px_rgba(15,23,42,0.2)] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-[14px]"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Inquiry"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
