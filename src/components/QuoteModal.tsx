"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { trackConsultationRequest } from "@/lib/tracking";
import { useQuote } from "@/contexts/QuoteContext";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillCategory?: string;
}

const SERVICES = [
  "Hospitality",
  "Residential",
  "Educational",
  "Commercial",
  "Aluminium, uPVC & Facades",
  "Wooden Door Systems",
];

const TRUST_ITEMS = [
  "20+ Years Experience",
  "300+ Projects",
  "PAN India Service",
];

const QuoteModal = ({ isOpen, onClose, prefillCategory = "" }: QuoteModalProps) => {
  const { hasCopiedPromo } = useQuote();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [selectedService, setSelectedService] = useState(prefillCategory);
  const promoCode = "VOOMETDESIGN2026";
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsSuccess(false);
      setIsSubmitting(false);
      setAgreedToTerms(false);
      setSelectedService(prefillCategory);
      setTimeout(() => nameRef.current?.focus(), 400);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen, prefillCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const payload = {
      name: formData.get("name"),
      mobileNumber: formData.get("mobileNumber"),
      email: formData.get("email"),
      projectLocation: formData.get("projectLocation"),
      areaSqft: formData.get("areaSqft"),
      requirement: selectedService,
      projectDetails: formData.get("projectDetails"),
      submissionSource: "Header Popup",
      promoCode: hasCopiedPromo ? promoCode : "None",
      type: "quote_request"
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        trackConsultationRequest({ projectType: selectedService, designTier: "Not Specified" });
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full h-10 px-4 bg-white text-slate-900 text-[13px] rounded-[14px] outline-none transition-all duration-200 placeholder-slate-500 placeholder:font-normal border border-slate-300 focus:border-slate-800 focus:ring-1 focus:ring-slate-800";
  const inputStyle = {};

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            className="absolute inset-0 z-0"
            style={{
              backgroundColor: "rgba(5,14,40,0.60)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 16 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full flex flex-col overflow-hidden"
            style={{
              width: "min(680px, 94vw)",
              backgroundColor: "#F8F8F6",
              borderRadius: "28px",
              boxShadow: "0 32px 80px rgba(5,14,40,0.18), 0 0 0 1px rgba(11,22,53,0.05)",
              maxHeight: "min(92dvh, 92vh)",
            }}
          >
            {/* ── Close ── */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 bg-white border border-[rgba(11,22,53,0.07)] rounded-full flex items-center justify-center text-[#6E7D9B] hover:text-[#0B1635] hover:bg-slate-50 transition-colors z-20 shadow-sm"
              aria-label="Close modal"
            >
              <X size={16} strokeWidth={2.5} />
            </button>

            {/* ── Scrollable body ── */}
            <div
              className="px-6 md:px-8 pt-7 md:pt-8 pb-5 md:pb-6 overflow-y-auto flex-1"
              style={{ overscrollBehavior: "contain" }}
            >
              {!isSuccess ? (
                <>
                  {/* ── Header ── */}
                  <div className="mb-5">
                    <h2 className="text-[22px] md:text-[26px] font-extrabold text-[#0B1633] leading-tight tracking-[-0.03em]">
                      Book Consultation
                    </h2>
                    <p className="text-[13px] text-slate-400 mt-1 font-medium">
                      Tell us what you need and we&apos;ll take it from here.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-y-2.5">
                    {/* ── Revealed Promo Applied Field ── */}
                    <AnimatePresence>
                      {hasCopiedPromo && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                          animate={{ opacity: 1, height: "auto", marginBottom: 8 }}
                          exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="w-full h-10 px-4 bg-green-50 text-green-800 text-[13px] rounded-[14px] flex items-center justify-between border border-green-200">
                            <span className="font-semibold flex items-center gap-2">
                              <CheckCircle2 size={14} className="text-green-600" />
                              Discount Code Applied Successfully!
                            </span>
                            <span className="text-[11px] font-bold bg-green-200 text-green-900 px-2 py-0.5 rounded-full">Active</span>
                          </div>
                          {/* Hidden input to pass to form data if needed by other handlers, though payload uses state */}
                          <input type="hidden" name="promoCode" value={promoCode} />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Row 1 — Name + Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      <input
                        ref={nameRef}
                        type="text"
                        name="name"
                        required
                        minLength={2}
                        maxLength={60}
                        className={inputClasses}
                        style={inputStyle}
                        placeholder="Full Name *"
                      />
                      <input
                        type="tel"
                        name="mobileNumber"
                        required
                        pattern="[0-9]{10}"
                        title="Enter a valid 10-digit number"
                        className={inputClasses}
                        style={inputStyle}
                        placeholder="Mobile Number *"
                      />
                    </div>

                    {/* Row 2 — Email + Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      <input
                        type="email"
                        name="email"
                        className={inputClasses}
                        style={inputStyle}
                        placeholder="Email (Optional)"
                      />
                      <input
                        type="text"
                        name="projectLocation"
                        className={inputClasses}
                        style={inputStyle}
                        placeholder="Enter city, state or project location"
                      />
                    </div>
                    
                    {/* Row 3 — Area */}
                    <div className="w-full">
                      <input
                        type="number"
                        name="areaSqft"
                        required
                        className={inputClasses}
                        style={inputStyle}
                        placeholder="Approx. Area (sqft) *"
                      />
                    </div>

                    {/* Service chips */}
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700 mb-2">
                        Service Required *
                      </p>
                      <div className="flex flex-row items-center gap-3 w-full overflow-x-auto whitespace-nowrap scrollbar-none">
                        {SERVICES.map((svc) => {
                          const active = selectedService === svc;
                          return (
                            <button
                              key={svc}
                              type="button"
                              onClick={() => setSelectedService(svc)}
                              className={`px-4 py-2 rounded-full text-[12px] font-semibold tracking-wide transition-all duration-200 border ${
                                active
                                  ? "bg-[#0B1633] text-white border-[#0B1633] shadow-[0_4px_12px_rgba(11,22,51,0.18)]"
                                  : "bg-white text-slate-700 border-slate-300 hover:border-slate-800 hover:text-slate-900"
                              }`}
                            >
                              {svc}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Textarea — reduced height */}
                    <textarea
                      name="projectDetails"
                      rows={2}
                      className="w-full px-4 py-2.5 bg-white text-slate-900 text-[13px] rounded-[14px] outline-none transition-all duration-200 placeholder-slate-500 placeholder:font-normal resize-none border border-slate-300 focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
                      style={{ minHeight: "60px", maxHeight: "90px" }}
                      placeholder="Project details (optional)"
                    />

                    {/* T&C — shortened */}
                    <label className="flex items-center gap-2.5 cursor-pointer group">
                      <div className="relative flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={agreedToTerms}
                          onChange={(e) => setAgreedToTerms(e.target.checked)}
                          className="sr-only"
                        />
                        <div
                          className={`w-[18px] h-[18px] rounded-[5px] border-2 flex items-center justify-center transition-all duration-200 ${
                            agreedToTerms
                              ? "bg-[#0B1635] border-[#0B1635]"
                              : "bg-white border-slate-300 group-hover:border-[#0B1635]/40"
                          }`}
                        >
                          {agreedToTerms && (
                            <svg width="9" height="7" viewBox="0 0 10 8" fill="none">
                              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-[12px] text-slate-400 leading-none">
                        I agree to the{" "}
                        <a
                          href="/privacy-policy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#0B1635] font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity"
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={isSubmitting || !agreedToTerms || !selectedService}
                      className="group w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-[14px] text-[13px] uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_16px_36px_rgba(11,22,51,0.22)] disabled:bg-slate-300 disabled:text-slate-500 disabled:opacity-100 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
                    >
                      {isSubmitting ? (
                        "Submitting…"
                      ) : (
                        <>
                          Request Consultation
                          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    {/* Trust strip */}
                    <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-1 pt-1">
                      {TRUST_ITEMS.map((item, i) => (
                        <span key={item} className="flex items-center gap-4">
                          <span className="text-[11px] font-semibold text-slate-600 tracking-wide">
                            {item}
                          </span>
                          {i < TRUST_ITEMS.length - 1 && (
                            <span className="w-px h-3 bg-slate-200 inline-block" />
                          )}
                        </span>
                      ))}
                    </div>

                  </form>
                </>
              ) : (
                /* ── Success State ── */
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-[rgba(11,22,53,0.05)] rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={30} className="text-[#0B1635]" />
                  </div>
                  <h2 className="text-[26px] font-bold leading-tight tracking-[-0.03em] mb-3 text-[#0B1633]">
                    Thank You.
                  </h2>
                  <p className="text-[14px] text-[#6E7D9B] max-w-sm mx-auto font-light mb-8 leading-relaxed">
                    Your consultation request has been received. Our team will be in touch shortly.
                  </p>
                  <div className="flex gap-3 w-full max-w-xs">
                    <button
                      onClick={onClose}
                      className="flex-1 h-11 bg-[#0B1635] text-white rounded-[13px] text-[12px] font-bold tracking-wider hover:bg-black transition-colors"
                    >
                      Back to Website
                    </button>
                    <Link
                      href="/contact"
                      onClick={onClose}
                      className="flex-1 h-11 bg-white border border-[rgba(11,22,53,0.12)] text-[#0B1635] rounded-[13px] text-[12px] font-bold tracking-wider flex items-center justify-center hover:bg-slate-50 transition-colors"
                    >
                      Contact Page
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
