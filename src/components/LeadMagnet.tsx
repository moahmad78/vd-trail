// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, CheckCircle2 } from "lucide-react";

const LeadMagnet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: "",
    area: "",
    name: "",
    phone: ""
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeen = localStorage.getItem("hasSeenLeadMagnet");
      if (!hasSeen) {
        setIsOpen(true);
      }
    }, 10000); // Show after 10 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenLeadMagnet", "true");
  };

  const nextStep = () => setStep(step + 1);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#020617]/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white text-slate-900 rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden relative"
          >
            <button 
              onClick={handleClose}
              className="absolute top-6 right-6 text-slate-500 hover:text-primary transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Left Side Info */}
              <div className="md:w-1/3 bg-[#020617] p-8 text-primary flex flex-col justify-center">
                <div className="mb-6">
                  <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Limited Offer</span>
                </div>
                <h3 className="text-2xl font-display font-bold mb-4 text-white">Free 3D Site Survey</h3>
                <p className="text-base font-medium opacity-80 mb-6 text-white">Worth ₹10,000 - Completely Free for new inquiries today.</p>
                <ul className="space-y-3">
                  {["Expert Consultation", "3D Layout Plan", "Material Estimate"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm font-bold text-white">
                      <CheckCircle2 size={14} /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Side Form */}
              <div className="md:w-2/3 p-10">
                {step === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h4 className="text-xl font-bold mb-6 text-[#020617]">What are you planning?</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {["Residential", "Hospitality", "Education", "Bespoke Woodwork"].map((type) => (
                        <button
                          key={type}
                          onClick={() => { setFormData({ ...formData, projectType: type }); nextStep(); }}
                          className={`text-left px-6 py-4 rounded-xl border-2 transition-all font-bold text-base text-[#0F172A] ${formData.projectType === type ? "border-[#020617] bg-[#020617]/5" : "border-slate-200 hover:border-[#020617]/30 hover:bg-slate-50"}`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h4 className="text-xl font-bold mb-6 text-[#020617]">Approximate Area?</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {["Below 1000 Sq. Ft", "1000 - 3000 Sq. Ft", "3000 - 5000 Sq. Ft", "Above 5000 Sq. Ft"].map((area) => (
                        <button
                          key={area}
                          onClick={() => { setFormData({ ...formData, area: area }); nextStep(); }}
                          className={`text-left px-6 py-4 rounded-xl border-2 transition-all font-bold text-base text-[#0F172A] ${formData.area === area ? "border-[#020617] bg-[#020617]/5" : "border-slate-200 hover:border-[#020617]/30 hover:bg-slate-50"}`}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                    <button onClick={() => setStep(1)} className="mt-6 text-sm font-bold text-slate-500 hover:text-primary underline">Go Back</button>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h4 className="text-xl font-bold mb-6 text-[#020617]">Where should we send the plan?</h4>
                    <div className="space-y-4">
                      <input 
                        type="text" 
                        placeholder="Full Name" 
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-6 py-4 text-base text-slate-900 focus:outline-none focus:border-[#020617]"
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                      <input 
                        type="tel" 
                        placeholder="Phone Number" 
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-6 py-4 text-base text-slate-900 focus:outline-none focus:border-[#020617]"
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                      <button 
                        onClick={nextStep}
                        className="w-full bg-[#020617] text-white py-4 rounded-xl font-bold text-base hover:bg-[#020617] transition-all shadow-xl flex items-center justify-center gap-2"
                      >
                        Claim My Free 3D Plan <ChevronRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h4 className="text-2xl font-bold mb-2 text-[#020617]">Thank you!</h4>
                    <p className="text-slate-500 mb-8">Our design consultant will call you within 24 hours to schedule your free consultation.</p>
                    <button onClick={handleClose} className="text-primary font-bold underline">Close Window</button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LeadMagnet;
