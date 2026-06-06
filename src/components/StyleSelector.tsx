// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client"; import { useState } from"react"; import { motion, AnimatePresence } from"framer-motion"; import { Check } from"lucide-react"; import Link from "next/link"; const tiers = [
 {
 name: "Standard",
 price: "Optimized Budget",
 description: "Quality meets affordability. Perfect for startups and initial office setups.",
 features: ["Standard Finishes", "Essential Layout", "Durable Materials", "1 Year Warranty"],
 color: "bg-white text-neutral-900 border border-slate-200"
 },
 {
 name: "Medium",
 price: "Value for Money",
 description: "Premium feel without the luxury price tag. Ideal for growing businesses.",
 features: ["Premium Finishes", "Custom Space Planning", "Imported Hardware", "3 Years Warranty"],
 color: "bg-[#0f172a] text-white",
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
 <div className="site-container md:px-6">
 <div className="flex flex-col md:flex-row md:items-end md:justify-between w-full gap-4 md:gap-8 mb-12 border-b border-transparent">
 <h2 className="text-section text-[10px] md:text-xs mb-2 md:mb-4 block text-neutral-900">Choose Your <span className="italic font-light">Style</span></h2>
 <h3 className="text-card text-[#0f172a] text-xl md:text-3xl ">Luxury in <span className="italic font-light">Every Budget</span></h3>
 <p className="text-sm text-neutral-500 max-w-xs md:text-right font-light leading-relaxed mt-2 md:mt-0">
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
 <span className="absolute top-0 right-6 md:right-10 -translate-y-1/2 bg-[#324A61] text-white text-[10px] md:text-xs px-3 md:px-4 py-1 md:py-1.5 rounded-full shadow-md">Most Popular</span>
 )}
 <h4 className={`text-card mb-1 md:mb-2 opacity-70 text-sm md:text-lg ${index !== 0 ? 'text-white' : 'text-neutral-900'}`}>{tier.name}</h4>
 <p className={`text-xl md:text-2xl font-medium mb-4 md:mb-6 ${index !== 0 ? 'text-white' : 'text-neutral-900'}`}>{tier.price}</p>
 <p className={`mb-6 md:mb-8 leading-relaxed font-medium text-sm md:text-base ${index !== 0 ? 'text-neutral-200' : 'text-neutral-600'}`}>{tier.description}</p>
 <ul className="space-y-3 md:space-y-4 mb-6 md:mb-10 flex-grow">
 {tier.features.map((feature, fIdx) => (
 <li key={fIdx} className={`flex items-center gap-2 md:gap-3 text-sm md:text-base font-semibold ${index !== 0 ? 'text-white' : 'text-neutral-800'}`}>
 <Check size={16} className="flex-shrink-0" /> {feature}
 </li>
 ))}
 </ul>
 <Link href={`/contact?tier=${tier.name.toLowerCase()}`} className={`block text-center w-full text-xs md:text-sm py-3 md:py-3.5 px-4 md:px-6 rounded-lg transition-all duration-300 shadow-sm font-medium ${selected === index ? "bg-accent text-white hover:bg-white hover:text-[#0f172a]" : (index !== 0 ? "bg-white text-neutral-900 hover:bg-neutral-100 border-transparent" : "bg-transparent border border-[#0f172a] text-neutral-900 hover:bg-neutral-100")}`}>
 Select This Style
 </Link>
 </motion.div>
 ))}
 </div>
 </div>
 </section>
 );
};
export default StyleSelector;
