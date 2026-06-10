"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillCategory?: string;
}

const QuoteModal = ({ isOpen, onClose }: QuoteModalProps) => {
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
    // Simulate form submission
    setIsSuccess(true);
  };

  const inputClasses =
    "w-full h-[56px] px-5 bg-white text-[#0B1635] text-[13px] md:text-[14px] rounded-[16px] outline-none transition-all duration-300 placeholder:text-[#7A869E] focus:border-[#0B1635] focus:ring-[4px] focus:ring-[#0B1635]/[0.06]";
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
            className="relative z-10 w-full max-w-[92vw] overflow-hidden"
            style={{
              width: "720px",
              backgroundColor: "#F7F7F5",
              borderRadius: "32px",
              boxShadow: "0 30px 80px rgba(11,22,53,0.15)",
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

            <div className="p-8 md:p-12 lg:p-14 overflow-y-auto max-h-[90vh]">
              {!isSuccess ? (
                <>
                  <div className="mb-8 md:mb-10 text-center">
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.24em] mb-4 block"
                      style={{ color: "#6E7D9B" }}
                    >
                      LET&apos;S START A CONVERSATION
                    </span>
                    <h2
                      className="font-bold leading-[1.1] tracking-[-0.03em] mb-4"
                      style={{
                        fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                        color: "#0B1633",
                      }}
                    >
                      Book Your Consultation.
                    </h2>
                    <p className="text-[14px] md:text-[15px] text-[#6E7D9B] max-w-lg mx-auto font-light">
                      Tell us about your vision and our team will get in touch to discuss the next steps.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
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
                          className={`${inputClasses} appearance-none`}
                          style={inputStyle}
                          defaultValue=""
                        >
                          <option value="" disabled hidden className="text-[#7A869E]">
                            Project Type *
                          </option>
                          <option>Residential Interiors</option>
                          <option>Hospitality Interiors</option>
                          <option>Educational Spaces</option>
                          <option>Commercial Interiors</option>
                          <option>Technical Solutions</option>
                          <option>Not Sure Yet</option>
                        </select>
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
                      className="w-full min-h-[120px] p-5 bg-white text-[#0B1635] text-[13px] md:text-[14px] rounded-[16px] outline-none transition-all duration-300 placeholder:text-[#7A869E] resize-none focus:border-[#0B1635] focus:ring-[4px] focus:ring-[#0B1635]/[0.06]"
                      style={inputStyle}
                      placeholder="Additional Requirements"
                    />

                    <button
                      type="submit"
                      className="group w-full h-[58px] md:h-[60px] bg-[#0B1635] text-white rounded-[18px] text-[13px] md:text-[14px] font-bold tracking-wide flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-[3px]"
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

                    <div className="text-center text-[11px] md:text-[12px] text-[#7A869E] mt-6 px-4 font-medium flex flex-col gap-1.5">
                      <p>Our team typically responds within 24 business hours.</p>
                      <p>Your information remains private and is used only to understand your project requirements.</p>
                    </div>
                  </form>
                </>
              ) : (
                <div className="py-10 md:py-16 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-[rgba(11,22,53,0.04)] rounded-full flex items-center justify-center mb-8">
                    <CheckCircle2 size={36} className="text-[#0B1635]" />
                  </div>
                  <h2
                    className="font-bold leading-[1.1] tracking-[-0.03em] mb-4"
                    style={{
                      fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                      color: "#0B1633",
                    }}
                  >
                    Thank You.
                  </h2>
                  <p className="text-[15px] md:text-[16px] text-[#6E7D9B] max-w-md mx-auto font-light mb-12 leading-relaxed">
                    Your consultation request has been received. Our team will contact you shortly to discuss the next steps.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                    <button
                      onClick={onClose}
                      className="flex-1 h-[54px] bg-[#0B1635] text-white rounded-[14px] text-[12px] font-bold tracking-wider hover:bg-black transition-colors"
                    >
                      Back to Website
                    </button>
                    <Link
                      href="/contact"
                      onClick={onClose}
                      className="flex-1 h-[54px] bg-white border border-[rgba(11,22,53,0.15)] text-[#0B1635] rounded-[14px] text-[12px] font-bold tracking-wider flex items-center justify-center hover:bg-slate-50 transition-colors"
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
