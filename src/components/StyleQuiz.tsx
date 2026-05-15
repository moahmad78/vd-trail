"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Sparkles, ArrowRight, Heart } from "lucide-react";

const styles = [
  { id: "modern", name: "Modern Luxury", desc: "Sleek, marble, dark tones", image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600" },
  { id: "minimalist", name: "Minimalist", desc: "Clean lines, neutral, airy", image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600" },
  { id: "industrial", name: "Industrial", desc: "Exposed brick, metal, raw", image: "https://images.unsplash.com/photo-1590483734724-383b85ad65e7?q=80&w=600" },
  { id: "biophilic", name: "Biophilic", desc: "Plants, natural light, organic", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600" }
];

const sectors = ["Residential", "Healthcare", "Hospitality", "Education"];
const budgets = ["Standard", "Medium", "Luxury"];

const StyleQuiz = () => {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    style: "",
    sector: "",
    budget: ""
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleStyleSelect = (styleId: string) => {
    setSelections({ ...selections, style: styleId });
    setTimeout(() => setStep(2), 600);
  };

  const handleSectorSelect = (sector: string) => {
    setSelections({ ...selections, sector });
    setTimeout(() => setStep(3), 400);
  };

  const handleBudgetSelect = (budget: string) => {
    setSelections({ ...selections, budget });
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setStep(4);
    }, 2500);
  };

  return (
    <section className="py-10 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Style Discovery</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-[#020617]">Discover Your Interior Style</h3>
            <p className="mt-4 text-slate-500">Take our 30-second visual quiz to find the perfect aesthetic for your project.</p>
          </div>

          <div className="bg-[#f8fafc] rounded-[3rem] p-8 md:p-16 border border-slate-100 min-h-[600px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {isAnalyzing ? (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <Loader2 className="w-16 h-16 text-accent animate-spin mx-auto mb-6" />
                  <h4 className="text-2xl font-bold text-[#020617]">Analyzing your style preferences...</h4>
                  <p className="text-slate-500 mt-2">Curating the perfect palette for your {selections.sector} space.</p>
                </motion.div>
              ) : step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {styles.map((style) => (
                    <div
                      key={style.id}
                      onClick={() => handleStyleSelect(style.id)}
                      className={`group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer transition-all border-4 ${selections.style === style.id ? "border-[#020617] scale-105 shadow-2xl" : "border-transparent"}`}
                    >
                      <img src={style.image} alt={style.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 to-transparent p-6 flex flex-col justify-end">
                        <h4 className="text-white font-bold text-lg">{style.name}</h4>
                        <p className="text-white/60 text-xs">{style.desc}</p>
                      </div>
                      {selections.style === style.id && (
                        <div className="absolute top-4 right-4 bg-accent text-primary p-2 rounded-full">
                          <Check size={16} />
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
              ) : step === 2 ? (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-center"
                >
                  <h4 className="text-2xl font-bold text-[#020617] mb-12 text-center">Which sector are we designing for?</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {sectors.map((sector) => (
                      <button
                        key={sector}
                        onClick={() => handleSectorSelect(sector)}
                        className={`px-8 py-6 rounded-2xl font-bold text-sm transition-all border-2 ${selections.sector === sector ? "bg-[#020617] text-white border-[#020617]" : "bg-white border-slate-100 hover:border-accent"}`}
                      >
                        {sector}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : step === 3 ? (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-center"
                >
                  <h4 className="text-2xl font-bold text-[#020617] mb-12">Final step: What's your budget tier?</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                    {budgets.map((budget) => (
                      <button
                        key={budget}
                        onClick={() => handleBudgetSelect(budget)}
                        className={`px-10 py-12 rounded-3xl font-bold transition-all border-2 flex flex-col items-center gap-4 ${selections.budget === budget ? "bg-[#020617] text-white border-[#020617] shadow-xl" : "bg-white border-slate-100 hover:border-accent"}`}
                      >
                        <span className="text-3xl">
                          {budget === "Standard" ? "🌱" : budget === "Medium" ? "🌟" : "👑"}
                        </span>
                        {budget}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-8">
                    <Sparkles size={40} />
                  </div>
                  <h4 className="text-sm font-bold text-accent uppercase tracking-widest mb-2">Discovery Complete</h4>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-[#020617] mb-6">
                    Your Style: {styles.find(s => s.id === selections.style)?.name}!
                  </h2>
                  <p className="text-slate-500 mb-12 max-w-lg mx-auto">
                    Based on your preferences for a {selections.budget} {selections.sector} project, we recommend a {styles.find(s => s.id === selections.style)?.desc.toLowerCase()} approach.
                  </p>
                  <div className="flex flex-wrap justify-center gap-6">
                    <button className="bg-[#020617] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-accent transition-all shadow-2xl flex items-center gap-3">
                      Get a Free 3D Plan based on your style <ArrowRight size={20} />
                    </button>
                    <button onClick={() => setStep(1)} className="text-slate-400 font-bold hover:text-[#020617] transition-all">
                      Retake Quiz
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StyleQuiz;
