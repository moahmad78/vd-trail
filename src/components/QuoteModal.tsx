// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillCategory?: string;
}

const QuoteModal = ({ isOpen, onClose }: QuoteModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 max-w-4xl w-full shadow-2xl shadow-black/80 z-10 overflow-hidden"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-white/[0.03] blur-[120px] pointer-events-none z-0" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-neutral-800/[0.3] blur-[100px] pointer-events-none z-0" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors p-2 z-20"
            >
              <X size={24} />
            </button>

            <div className="relative z-10">
              <h2 className="font-sans text-2xl md:text-4xl font-semibold text-white tracking-[-0.02em]">
                Get a <span className="italic font-light text-neutral-300">Priority Quote</span>
              </h2>
              <p className="text-neutral-400 text-xs md:text-sm mt-1 mb-6">
                Tell us about your project vision.
              </p>
              
              {/* Architectural Mesh Divider */}
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-6" />

              <form className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                <div className="space-y-1 relative z-10">
                  <label className="font-sans text-xs md:text-sm font-semibold text-neutral-200 uppercase tracking-wider mb-2 block relative z-10">Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full h-14 px-4 rounded-xl bg-white/[0.02] border border-white/5 text-white placeholder:text-neutral-500 text-sm focus:border-white/20 focus:bg-white/[0.04] focus:ring-1 focus:ring-white/10 outline-none transition-all duration-300 relative z-10"
                  />
                </div>
                <div className="space-y-1 relative z-10">
                  <label className="font-sans text-xs md:text-sm font-semibold text-neutral-200 uppercase tracking-wider mb-2 block relative z-10">Email</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full h-14 px-4 rounded-xl bg-white/[0.02] border border-white/5 text-white placeholder:text-neutral-500 text-sm focus:border-white/20 focus:bg-white/[0.04] focus:ring-1 focus:ring-white/10 outline-none transition-all duration-300 relative z-10"
                  />
                </div>
                <div className="space-y-1 relative z-10">
                  <label className="font-sans text-xs md:text-sm font-semibold text-neutral-200 uppercase tracking-wider mb-2 block relative z-10">Phone</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full h-14 px-4 rounded-xl bg-white/[0.02] border border-white/5 text-white placeholder:text-neutral-500 text-sm focus:border-white/20 focus:bg-white/[0.04] focus:ring-1 focus:ring-white/10 outline-none transition-all duration-300 relative z-10"
                  />
                </div>

                <div className="space-y-1 relative z-10">
                  <label className="font-sans text-xs md:text-sm font-semibold text-neutral-200 uppercase tracking-wider mb-2 block relative z-10">Project Type</label>
                  <select defaultValue="" className="w-full h-14 px-4 rounded-xl bg-white/[0.02] border border-white/5 text-white placeholder:text-neutral-500 text-sm focus:border-white/20 focus:bg-white/[0.04] focus:ring-1 focus:ring-white/10 outline-none transition-all duration-300 relative z-10 appearance-none [&>option]:bg-[#0f172a]">
                    <option value="" disabled className="text-neutral-500">Select Project Type</option>
                    <option>Residential</option>
                    <option>Hospitality</option>
                    <option>Education</option>
                    <option>Bespoke Woodwork</option>
                  </select>
                </div>
                <div className="space-y-1 relative z-10">
                  <label className="font-sans text-xs md:text-sm font-semibold text-neutral-200 uppercase tracking-wider mb-2 block relative z-10">Estimated Area (Sq. Ft)</label>
                  <input
                    type="number"
                    placeholder="1500"
                    className="w-full h-14 px-4 rounded-xl bg-white/[0.02] border border-white/5 text-white placeholder:text-neutral-500 text-sm focus:border-white/20 focus:bg-white/[0.04] focus:ring-1 focus:ring-white/10 outline-none transition-all duration-300 relative z-10"
                  />
                </div>
                <div className="space-y-1 relative z-10">
                  <label className="font-sans text-xs md:text-sm font-semibold text-neutral-200 uppercase tracking-wider mb-2 block relative z-10">Expected Timeline</label>
                  <select defaultValue="" className="w-full h-14 px-4 rounded-xl bg-white/[0.02] border border-white/5 text-white placeholder:text-neutral-500 text-sm focus:border-white/20 focus:bg-white/[0.04] focus:ring-1 focus:ring-white/10 outline-none transition-all duration-300 relative z-10 appearance-none [&>option]:bg-[#0f172a]">
                    <option value="" disabled className="text-neutral-500">Select Timeline</option>
                    <option>Immediate</option>
                    <option>1-3 Months</option>
                    <option>3-6 Months</option>
                    <option>6+ Months</option>
                  </select>
                </div>

                <div className="space-y-1 relative z-10">
                  <label className="font-sans text-xs md:text-sm font-semibold text-neutral-200 uppercase tracking-wider mb-2 block relative z-10">Tier Preference</label>
                  <select defaultValue="" className="w-full h-14 px-4 rounded-xl bg-white/[0.02] border border-white/5 text-white placeholder:text-neutral-500 text-sm focus:border-white/20 focus:bg-white/[0.04] focus:ring-1 focus:ring-white/10 outline-none transition-all duration-300 relative z-10 appearance-none [&>option]:bg-[#0f172a]">
                    <option value="" disabled className="text-neutral-500">Select Tier</option>
                    <option>Luxury</option>
                    <option>Medium</option>
                    <option>Standard</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-1 relative z-10">
                  <label className="font-sans text-xs md:text-sm font-semibold text-neutral-200 uppercase tracking-wider mb-2 block relative z-10">Location / Address</label>
                  <input
                    type="text"
                    placeholder="City, Area, or full address"
                    className="w-full h-14 px-4 rounded-xl bg-white/[0.02] border border-white/5 text-white placeholder:text-neutral-500 text-sm focus:border-white/20 focus:bg-white/[0.04] focus:ring-1 focus:ring-white/10 outline-none transition-all duration-300 relative z-10"
                  />
                </div>

                <div className="md:col-span-3 space-y-1 relative z-10">
                  <label className="font-sans text-xs md:text-sm font-semibold text-neutral-200 uppercase tracking-wider mb-2 block relative z-10">Message</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your requirements..."
                    className="w-full h-28 py-3 px-4 rounded-xl bg-white/[0.02] border border-white/5 text-white placeholder:text-neutral-500 text-sm focus:border-white/20 focus:bg-white/[0.04] focus:ring-1 focus:ring-white/10 outline-none transition-all duration-300 relative z-10 resize-none"
                  />
                </div>

                <button className="md:col-span-3 w-full h-14 bg-white text-[#0f172a] hover:bg-neutral-100 font-sans font-bold text-xs uppercase tracking-[0.2em] hover:tracking-[0.25em] rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-black/40 relative z-10 mt-4 group">
                  Submit Request <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuoteModal;
