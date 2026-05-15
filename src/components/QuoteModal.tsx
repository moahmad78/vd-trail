"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
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
            className="absolute inset-0 bg-slate-dark/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden z-10"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-slate-400 hover:text-primary transition-colors p-2"
            >
              <X size={24} />
            </button>

            <div className="p-10 md:p-12">
              <h3 className="text-3xl font-display font-bold mb-2">Get a Free Quote</h3>
              <p className="text-slate-500 mb-8">Tell us about your project vision.</p>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-accent/50" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Email</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-accent/50" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Project Type</label>
                  <select className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-accent/50 appearance-none">
                    <option>Residential</option>
                    <option>Hospital/Healthcare</option>
                    <option>Education</option>
                    <option>Aluminium Fabrication</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Estimated Area (Sq. Ft)</label>
                  <input type="number" placeholder="1500" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-accent/50" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Tier Preference</label>
                  <select className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-accent/50 appearance-none">
                    <option>Luxury</option>
                    <option>Medium</option>
                    <option>Standard</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Message</label>
                  <textarea rows={3} placeholder="Briefly describe your requirements..." className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-accent/50 resize-none" />
                </div>
                
                <button className="md:col-span-2 bg-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg hover:bg-accent transition-all group mt-2">
                  Submit Request <Send size={18} className="group-hover:translate-x-1 transition-transform" />
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
