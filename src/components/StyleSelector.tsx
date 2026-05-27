// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client"; import { useState } from"react"; import { motion, AnimatePresence } from"framer-motion"; import { Check } from"lucide-react"; const tiers = [
  {
    name: "Standard",
    price: "Optimized Budget",
    description: "Quality meets affordability. Perfect for startups and initial office setups.",
    features: ["Standard Finishes", "Essential Layout", "Durable Materials", "1 Year Warranty"],
    color: "bg-white text-slate-950 border border-slate-200"
  },
  {
    name: "Medium",
    price: "Value for Money",
    description: "Premium feel without the luxury price tag. Ideal for growing businesses.",
    features: ["Premium Finishes", "Custom Space Planning", "Imported Hardware", "3 Years Warranty"],
    color: "bg-[#020617] text-white",
    popular: true
  },
  {
    name: "Luxury",
    price: "Bespoke Excellence",
    description: "The ultimate signature design. Handcrafted details for high-end properties.",
    features: ["Artisanal Finishes", "Smart Home Integration", "Italian Marble/Veneers", "Lifetime Support"],
    color: "bg-[#324A61] text-white"
  }
];

const StyleSelector = () => {
  const [selected, setSelected] = useState(1);
  return (
    <section className="py-12 md:py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-[10px] md:text-xs mb-2 md:mb-4 block font-black uppercase tracking-tight text-slate-950">Choose Your Style</h2>
          <h3 className="text-[#020617] text-xl md:text-3xl font-black uppercase tracking-wide">Luxury in Every Budget</h3>
          <p className="mt-4 max-w-2xl mx-auto text-slate-600 leading-relaxed font-normal text-sm md:text-base px-4">
            At VoometDesign, we believe every client deserves high-quality craftsmanship. Choose the tier that best fits your vision and budget.
          </p>
        </div>
        
        {/* Changed to flex container with horizontal scroll on mobile, and grid on md */}
        <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 items-stretch overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0 py-4 md:py-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelected(index)}
              className={`cursor-pointer rounded-3xl md:rounded-[2.5rem] p-6 md:p-10 transition-all duration-500 flex flex-col relative min-w-[85vw] md:min-w-0 snap-center ${tier.color} ${selected === index ? "ring-2 md:ring-4 ring-accent/20 scale-100 md:scale-105 shadow-2xl" : "opacity-80 md:opacity-60 scale-95 md:scale-95"}`}
            >
              {tier.popular && (
                <span className="absolute top-0 right-6 md:right-10 -translate-y-1/2 bg-[#324A61] text-white text-[10px] md:text-xs font-black px-3 md:px-4 py-1 md:py-1.5 rounded-full uppercase tracking-widest shadow-md">Most Popular</span>
              )}
              <h4 className="mb-1 md:mb-2 opacity-70 text-sm md:text-lg font-black uppercase tracking-wide">{tier.name}</h4>
              <p className="text-xl md:text-2xl font-bold mb-4 md:mb-6">{tier.price}</p>
              <p className="mb-6 md:mb-8 opacity-90 leading-relaxed font-normal text-sm md:text-base">{tier.description}</p>
              <ul className="space-y-3 md:space-y-4 mb-6 md:mb-10 flex-grow">
                {tier.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2 md:gap-3 text-sm md:text-base font-semibold">
                    <Check size={16} className="flex-shrink-0" /> {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full text-xs md:text-sm font-black uppercase tracking-widest py-3 md:py-3.5 px-4 md:px-6 rounded-lg transition-all duration-300 shadow-sm ${selected === index ? "bg-[#324A61] text-white hover:bg-white hover:text-[#020617]" : "bg-transparent border border-current hover:bg-white/10"}`}>
                Select This Style
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default StyleSelector;
