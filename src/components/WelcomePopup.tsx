"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { X, Gift, ChevronRight } from "lucide-react";
import { useQuote } from "@/contexts/QuoteContext";
import confetti from "canvas-confetti";

export default function WelcomePopup() {
  const { isWelcomePopupOpen, setIsWelcomePopupOpen, setIsQuoteOpen, hasCopiedPromo, setHasCopiedPromo } = useQuote();
  const [isRevealed, setIsRevealed] = useState(false);
  const promoCode = "VOOMETDESIGN2026";
  const dragControls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCopyPromo = async () => {
    try {
      await navigator.clipboard.writeText(promoCode);
      setHasCopiedPromo(true);
      setIsWelcomePopupOpen(false);
      setTimeout(() => {
        setIsQuoteOpen(true);
      }, 300);
    } catch (err) {
      console.error("Failed to copy promo code:", err);
    }
  };

  const handleClose = () => {
    setIsWelcomePopupOpen(false);
  };

  const handleDragEnd = (event: any, info: any) => {
    // If dragged enough to the right (e.g. > 150px)
    if (info.offset.x > 180 || info.point.x > (containerRef.current?.getBoundingClientRect().left || 0) + 180) {
      setIsRevealed(true);
      triggerConfetti();
    } else {
      // Snap back
      dragControls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 20 } });
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#10B981", "#0B1633"],
      disableForReducedMotion: true,
      zIndex: 10000
    });
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
            className="relative z-10 w-full max-w-[400px] flex flex-col overflow-hidden bg-white rounded-3xl shadow-2xl p-8"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors z-20"
              aria-label="Close modal"
            >
              <X size={16} strokeWidth={2.5} />
            </button>

            <AnimatePresence mode="wait">
              {!isRevealed ? (
                <motion.div
                  key="unrevealed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center text-center mt-4"
                >
                  <h2 className="text-[24px] font-extrabold text-[#0B1633] leading-tight tracking-tight mb-6">
                    Transform Your Space
                  </h2>
                  
                  <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-amber-100">
                    <Gift size={48} className="text-amber-500" strokeWidth={1.5} />
                  </div>

                  <p className="text-[14px] text-slate-600 leading-relaxed mb-10 px-4">
                    Swipe to unlock an exclusive luxury interior design voucher and claim your priority consultation with VoometDesign.
                  </p>

                  {/* Swipe Track */}
                  <div 
                    className="relative w-full h-16 bg-slate-100 rounded-full border border-slate-200 flex items-center overflow-hidden shadow-inner"
                    ref={containerRef}
                  >
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-[13px] font-bold text-slate-400 uppercase tracking-widest ml-10">SWIPE TO REVEAL REWARD</span>
                    </div>
                    
                    <motion.div
                      drag="x"
                      dragConstraints={containerRef}
                      dragElastic={0.05}
                      onDragEnd={handleDragEnd}
                      animate={dragControls}
                      className="absolute left-1.5 top-1.5 bottom-1.5 w-14 bg-[#0B1633] rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg z-10 hover:bg-black transition-colors"
                    >
                      <ChevronRight className="text-white" size={24} />
                      <ChevronRight className="text-white/40 -ml-3" size={24} />
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="revealed"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
                  className="flex flex-col items-center text-center mt-4"
                >
                  <h2 className="text-[24px] font-extrabold text-[#0B1633] leading-tight tracking-tight mb-4">
                    Offer Unlocked!
                  </h2>
                  
                  <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-4 shadow-inner border border-green-100">
                    <Gift size={48} className="text-green-500" strokeWidth={1.5} />
                  </div>

                  <p className="text-[14px] text-slate-600 leading-relaxed mb-6 px-4">
                    You've secured a priority design consultation and an exclusive execution rebate with VoometDesign.
                  </p>

                  <div className="w-full space-y-3">
                    <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-2xl shadow-inner">
                      <span className="text-[22px] font-mono font-bold text-[#0B1633] tracking-widest">{promoCode}</span>
                    </div>
                    
                    <button
                      onClick={handleCopyPromo}
                      className="w-full bg-[#0B1633] text-white text-[13px] font-bold py-4 rounded-xl hover:bg-black transition-all uppercase tracking-widest shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0"
                    >
                      {hasCopiedPromo ? "Code Copied!" : "COPY & CLAIM OFFER"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="mt-6 text-center">
              <button onClick={handleClose} className="text-[10px] text-slate-400 font-medium hover:text-slate-600 underline underline-offset-2 uppercase tracking-widest transition-colors">
                CONTINUE BROWSING
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
