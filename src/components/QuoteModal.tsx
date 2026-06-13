"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { trackConsultationRequest } from "@/lib/tracking";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillCategory?: string;
}

const QuoteModal = ({ isOpen, onClose, prefillCategory = "" }: QuoteModalProps) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsSuccess(false);
      // Auto-focus after animation
      setTimeout(() => {
        nameRef.current?.focus();
      }, 400);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    trackConsultationRequest({ projectType: (formData.get('projectType') as string) || prefillCategory || 'General', designTier: 'Not Specified' });
    // Simulate form submission
    setIsSuccess(true);
  };

  const inputClasses =
    "w-full h-10 md:h-11 px-4 bg-white text-[#0B1635] text-small rounded-[16px] outline-none transition-all duration-300 placeholder:text-[#7A869E] placeholder:font-light focus:border-[#0B1635] focus:ring-[4px] focus:ring-[#0B1635]/[0.06]";
  const inputStyle = {
    border: "1px solid rgba(11,22,53,0.10)",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="absolute inset-0 z-0"
            style={{
              backgroundColor: "rgba(11,22,53,0.55)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // smooth ease-out
            className="relative z-10 w-full overflow-hidden"
            style={{
              width: "min(720px, 92vw)",
              backgroundColor: "#F7F7F5",
              borderRadius: "32px",
              boxShadow: "0 30px 80px rgba(11,22,53,0.15)",
              maxHeight: "min(92dvh, 92vh)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 md:top-7 right-5 md:right-7 w-10 h-10 bg-white border border-[rgba(11,22,53,0.08)] rounded-full flex items-center justify-center text-[#6E7D9B] hover:text-[#0B1635] hover:bg-slate-50 transition-colors z-20 shadow-sm"
              aria-label="Close modal"
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            <div className="p-5 md:p-6 overflow-y-auto flex-1" style={{ overscrollBehavior: 'contain' }}>
              {!isSuccess ? (
                <>
                  <div className="mb-4 text-center">
                    <span
                      className="text-caption font-bold uppercase tracking-[0.24em] mb-1 block"
                      style={{ color: "#6E7D9B" }}
                    >
                      LET&apos;S START A CONVERSATION
                    </span>
                    <h2 className="text-h3 font-extrabold text-slate-950 mb-1 leading-[1.1] tracking-[-0.03em]">
                      Book Your Consultation.
                    </h2>
                    <p className="text-small text-slate-500 max-w-md mx-auto mb-4 leading-relaxed">
                      Tell us about your vision and our team will get in touch to discuss the next steps.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                      <input
                        ref={nameRef}
                        type="text"
                        required
                        className={inputClasses}
                        style={inputStyle}
                        placeholder="Full Name *"
                      />
                      <input
                        type="tel"
                        required
                        className={inputClasses}
                        style={inputStyle}
                        placeholder="Phone Number *"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                      <input
                        type="email"
                        required
                        className={inputClasses}
                        style={inputStyle}
                        placeholder="Email Address *"
                      />
                      <div className="relative">
                        <select
                          required
                          name="projectType"
                          className={`${inputClasses} appearance-none`}
                          style={inputStyle}
                          defaultValue={prefillCategory}
                          key={prefillCategory}
                        >
                          <option value="" disabled hidden className="text-[#7A869E]">
                            Project Type *
                          </option>
                          <option value="Residential Interiors">RESIDENTIAL INTERIORS</option>
                          <option value="Hospitality Interiors">HOSPITALITY INTERIORS</option>
                          <option value="Educational Spaces">EDUCATIONAL SPACES</option>
                          <option value="Commercial Interiors">COMMERCIAL INTERIORS</option>
                          <option value="Technical Solutions">TECHNICAL SOLUTIONS</option>
                          <option value="Not Sure Yet">NOT SURE YET</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7A869E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
                      <input
                        type="text"
                        className={inputClasses}
                        style={inputStyle}
                        placeholder="Estimated SQFT"
                      />
                      <input
                        type="text"
                        className={inputClasses}
                        style={inputStyle}
                        placeholder="Project Location"
                      />
                    </div>

                    <textarea
                      className="w-full h-16 md:h-20 min-h-[60px] px-4 py-2 bg-white text-[#0B1635] text-small rounded-[16px] outline-none transition-all duration-300 placeholder:text-[#7A869E] placeholder:font-light resize-none focus:border-[#0B1635] focus:ring-[4px] focus:ring-[#0B1635]/[0.06]"
                      style={inputStyle}
                      placeholder="Additional Project Brief"
                    />

                    <button
                      type="submit"
                      className="group mt-4 w-full h-11 bg-[#0B1635] text-white rounded-[16px] text-button font-bold uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-[3px]"
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
                      Request Consultation <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </button>

                    <div className="text-center text-caption text-slate-400 mt-2 px-4 font-medium flex flex-col gap-1">
                      <p>OUR TEAM TYPICALLY RESPONDS WITHIN 24 BUSINESS HOURS.</p>
                      <p>YOUR INFORMATION REMAINS PRIVATE AND IS USED ONLY TO UNDERSTAND YOUR PROJECT REQUIREMENTS.</p>
                    </div>
                  </form>
                </>
              ) : (
                <div className="py-10 md:py-16 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-[rgba(11,22,53,0.04)] rounded-full flex items-center justify-center mb-8">
                    <CheckCircle2 size={36} className="text-[#0B1635]" />
                  </div>
                  <h2
                    className="text-h2 font-bold leading-[1.1] tracking-[-0.03em] mb-4 text-[#0B1633]"
                  >
                    Thank You.
                  </h2>
                  <p className="text-body text-[#6E7D9B] max-w-md mx-auto font-light mb-12 leading-relaxed">
                    Your consultation request has been received. Our team will contact you shortly to discuss the next steps.
                  </p>
                  <div className="flex flex-row gap-2 sm:gap-3 w-full max-w-sm">
                    <button
                      onClick={onClose}
                      className="flex-1 h-[48px] sm:h-[54px] px-2 bg-[#0B1635] text-white rounded-[12px] sm:rounded-[14px] text-[11px] sm:text-button font-bold tracking-wider hover:bg-black transition-colors"
                    >
                      Back to Website
                    </button>
                    <Link
                      href="/contact"
                      onClick={onClose}
                      className="flex-1 h-[48px] sm:h-[54px] px-2 bg-white border border-[rgba(11,22,53,0.15)] text-[#0B1635] rounded-[12px] sm:rounded-[14px] text-[11px] sm:text-button font-bold tracking-wider flex items-center justify-center hover:bg-slate-50 transition-colors text-center"
                    >
                      Visit Contact Page
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuoteModal;
