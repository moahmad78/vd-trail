"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useQuote } from "@/contexts/QuoteContext";

export default function WelcomePopup() {
  const { isWelcomePopupOpen, setIsWelcomePopupOpen, setIsQuoteOpen, hasCopiedPromo, setHasCopiedPromo } = useQuote();
  const promoCode = "VOOMET2026";

  const handleCopyPromo = async () => {
    try {
      await navigator.clipboard.writeText(promoCode);
      setHasCopiedPromo(true);
      // Close the welcome popup and open the full form
      setIsWelcomePopupOpen(false);
      setTimeout(() => {
        setIsQuoteOpen(true);
      }, 300); // slight delay for smooth transition
    } catch (err) {
      console.error("Failed to copy promo code:", err);
    }
  };

  const handleClose = () => {
    setIsWelcomePopupOpen(false);
  };

  return (
    <AnimatePresence>
      {isWelcomePopupOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={handleClose}
            className="absolute inset-0 z-0"
            style={{
              backgroundColor: "rgba(5,14,40,0.60)",
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-[400px] flex flex-col overflow-hidden bg-white rounded-3xl shadow-2xl p-6 md:p-8"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors z-20"
              aria-label="Close modal"
            >
              <X size={16} strokeWidth={2.5} />
            </button>

            <div className="text-center mt-2 mb-5">
              <h2 className="text-[22px] md:text-[24px] font-extrabold text-[#0B1633] leading-tight tracking-tight mb-2">
                Unlock Your Exclusive Welcome Offer
              </h2>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-[16px] leading-none mt-0.5">✨</span>
                <p className="text-[13px] text-slate-600 leading-snug">
                  <strong className="text-[#0B1633]">Instant Discount:</strong> Valid on your final interior execution.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[16px] leading-none mt-0.5">📞</span>
                <p className="text-[13px] text-slate-600 leading-snug">
                  <strong className="text-[#0B1633]">Priority Expert Consultation:</strong> Skip the queue for a 1-on-1 session with our lead designer.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[16px] leading-none mt-0.5">🗺️</span>
                <p className="text-[13px] text-slate-600 leading-snug">
                  <strong className="text-[#0B1633]">Free 3D Layout Preview:</strong> Get a complimentary spatial visualization of your site.
                </p>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl flex items-center justify-between shadow-sm">
              <span className="text-[18px] font-mono font-bold text-[#0B1633] tracking-widest">{promoCode}</span>
              <button
                type="button"
                onClick={handleCopyPromo}
                className="bg-[#0B1633] text-white text-[12px] font-bold px-4 py-2.5 rounded-lg hover:bg-black transition-colors uppercase tracking-wider min-w-[120px] shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 duration-200"
              >
                {hasCopiedPromo ? "Copied!" : "Copy & Claim"}
              </button>
            </div>
            
            <p className="text-[11px] text-center text-slate-400 font-medium mt-3 italic">
              Clicking Copy will instantly unlock these benefits in your consultation form.
            </p>

            <div className="mt-5 text-center">
              <button onClick={handleClose} className="text-[11px] text-slate-400 font-medium hover:text-slate-600 underline underline-offset-2 uppercase tracking-widest transition-colors">
                Continue Browsing
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
