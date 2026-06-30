"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { trackConsultationRequest } from "@/lib/tracking";

export default function SystemInquiryForm({ slug }: { slug: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const inputClasses =
    "w-full h-10 px-4 text-small font-medium text-black bg-slate-50 border border-slate-200/80 rounded-xl focus:bg-white focus:border-black outline-none transition-all placeholder:text-slate-400 placeholder:normal-case";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const payload = {
      name: formData.get("name"),
      mobileNumber: formData.get("mobileNumber"),
      email: formData.get("email"),
      projectLocation: formData.get("projectLocation"),
      requirement: formData.get("requirement"),
      projectDetails: formData.get("projectDetails"),
      submissionSource: `Service Page - ${slug}`
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, type: "system_inquiry" })
      });
      
      if (res.ok) {
        trackConsultationRequest({ projectType: payload.requirement as string || 'General', designTier: 'Not Specified' });
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center py-6 bg-slate-50 border border-slate-200/80 rounded-[12px] shadow-sm">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-100">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B1635" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <h3 className="text-small font-bold text-[#0B1633] mb-1">Inquiry Sent</h3>
        <p className="text-[#6E7D9B] text-[12px]">We will contact you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3.5">
      <div className="grid grid-cols-2 gap-3.5">
        <input 
          type="text" 
          name="name" 
          required 
          minLength={2} 
          maxLength={60} 
          placeholder="Full Name *" 
          className={inputClasses} 
        />
        <input 
          type="tel" 
          name="mobileNumber" 
          required 
          pattern="[0-9]{10}" 
          title="Please enter a valid 10-digit mobile number" 
          placeholder="Mobile Number *" 
          className={inputClasses} 
        />
      </div>

      <div className="grid grid-cols-2 gap-3.5">
        <input 
          type="email" 
          name="email" 
          placeholder="Email Address (Optional)" 
          className={inputClasses} 
        />
        <input 
          type="text" 
          name="projectLocation" 
          placeholder="Project Location *" 
          required
          className={inputClasses} 
        />
      </div>

      <div className="relative">
        <select
          name="requirement"
          required
          defaultValue={slug === "aluminium-systems" ? "Aluminum Systems" : slug === "upvc-systems" ? "UPVC Systems" : ""}
          className={`${inputClasses} appearance-none`}
        >
          <option value="" disabled hidden className="text-[#7A869E]">
            Requirement *
          </option>
          <option value="Hospitality">Hospitality</option>
          <option value="Residential">Residential</option>
          <option value="Educational">Educational</option>
          <option value="Commercial">Commercial</option>
          <option value="Aluminum Systems">Aluminum Systems</option>
          <option value="UPVC Systems">UPVC Systems</option>
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7A869E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      <textarea 
        name="projectDetails" 
        placeholder="Additional Project Details" 
        className="w-full min-h-[70px] p-4 text-small font-medium text-black bg-slate-50 border border-slate-200/80 rounded-xl focus:bg-white focus:border-black outline-none transition-all placeholder:text-slate-400 placeholder:normal-case resize-none" 
      />

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full h-10 bg-slate-950 text-white rounded-xl text-button font-bold uppercase tracking-wider mt-4 hover:bg-slate-900 transition-all flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed group"
      >
        {isSubmitting ? (
          "Submitting..."
        ) : (
          <>Submit Inquiry <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></>
        )}
      </button>
    </form>
  );
}
