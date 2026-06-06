// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
import TierTable from "@/components/TierTable";
import Image from "next/image";
import { Package, ShieldCheck, LayoutTemplate } from "lucide-react";
import ServiceCTA from "@/components/ServiceCTA";
import ExecutionMatrix from "@/components/ExecutionMatrix";
import WhyChooseUs from "@/components/WhyChooseUs";
import Navbar from "@/components/Navbar";
import SectionWave from "@/components/ui/SectionWave";
export default function ResidentialPage() {
 return (
 <main className="bg-white">
 <Navbar />
 {/* Hero Section */}{" "}
 <section className="pt-40 md:pt-48 pb-16 md:pb-24 bg-[#f8fafc] overflow-hidden relative border-b border-slate-100">
 <div className="site-container relative z-10">
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center">
 {" "}
 {/* Left Column (lg:col-span-7): Rich Content Stack */}{" "}
 <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 mt-10 lg:mt-0">
 <h1 className="text-hero text-xs mb-4 block text-3xl md:text-5xl lg:text-6xl text-neutral-900 flex flex-wrap items-center">
  {" "}
  ELITE RESIDENTIAL LIVING &{" "}<span className="inline-flex items-center">TURNKEY PRECISION<SectionWave /></span>{" "}
 </h1>
 <h2 className="text-section mb-6 text-2xl md:text-3xl text-neutral-900">
 {" "}
 Residential Interiors{" "}
 </h2>
 <p className="text-neutral-600 leading-relaxed font-normal text-base md:text-base">
 {" "}
 Crafting bespoke luxury villas and high-end homes tailormade to
 your lifestyle. Complete turnkey delivery with architectural
 detailing and custom modular layouts.{" "}
 </p>{" "}
 {/* Residential Precision Matrix */}{" "}
 <div className="w-full mt-6 mb-6">
 <span className="text-badge md: ] text-[#324A61] block mb-3">
 {" "}
 Residential Precision Matrix{" "}
 </span>
 <div className="grid grid-cols-3 gap-3 w-full mb-4">
 <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-3 flex flex-col items-center text-center justify-center hover:bg-white hover:border-slate-300/30 transition-all duration-200">
 <Package className="w-5 h-5 text-slate-800" />
 <span className="text-neutral-900 font-bold text-sm mt-1.5">
 Material Sourcing
 </span>
 </div>
 <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-3 flex flex-col items-center text-center justify-center hover:bg-white hover:border-slate-300/30 transition-all duration-200">
 <ShieldCheck className="w-5 h-5 text-slate-800" />
 <span className="text-neutral-900 font-bold text-sm mt-1.5">
 Lifetime Warranty
 </span>
 </div>
 <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-3 flex flex-col items-center text-center justify-center hover:bg-white hover:border-slate-300/30 transition-all duration-200">
 <LayoutTemplate className="w-5 h-5 text-slate-800" />
 <span className="text-neutral-900 font-bold text-sm mt-1.5">
 3D Blueprint Mapping
 </span>
 </div>
 </div>
 </div>{" "}
 {/* Trust/Feature Micro-Metrics Row */}{" "}
 <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
 <div className="text-neutral-500 text-sm font-semibold border-l-2 border-slate-300 pl-3">
 {" "}
 Custom Curated Furniture Matching{" "}
 </div>
 <div className="text-neutral-500 text-sm font-semibold border-l-2 border-slate-300 pl-3">
 {" "}
 3D Photorealistic Blueprint Mapping{" "}
 </div>
 <div className="text-neutral-500 text-sm font-semibold border-l-2 border-slate-300 pl-3">
 {" "}
 Lifetime Structural Warranty Support{" "}
 </div>
 </div>
 </div>{" "}
 {/* Right Column (lg:col-span-5): Premium Hero Image Frame */}{" "}
 <div className="lg:col-span-5 relative order-1 lg:order-2">
 <div className="relative z-10">
 <Image unoptimized={true}
 quality={95}
      src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000"
 alt="Upscale open-plan luxury living room"
 width={800}
 height={600}
 className="w-full h-[350px] md:h-[450px] object-cover rounded-2xl shadow-xl shadow-slate-200/50"
 priority
 />
 </div>
 <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-slate-300 z-0"></div>
 </div>
 </div>
 </div>
 </section>{" "}
 {/* Feature Section */}{" "}
 <section className="py-24 bg-white">
 <div className="site-container">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
 <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl lg:order-2">
 <Image unoptimized={true}
 quality={95}
      priority
      src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000"
 alt="Residential Interior"
 fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      
 className="object-cover"
 />
 </div>
 <div className="space-y-12 lg:order-1">
 <div>
 <h3 className="text-card mb-4 text-[#0f172a] text-base md:text-base lg:text-lg text-neutral-900">
 Bespoke Craftsmanship
 </h3>
 <p className="text-neutral-600 leading-relaxed font-normal text-base md:text-base">
 {" "}
 Every element of your home is custom-made. From handcrafted
 furniture to artisanal wall finishes, we ensure every detail
 is unique.{" "}
 </p>
 </div>
 <div>
 <h3 className="text-card mb-4 text-[#0f172a] text-base md:text-base lg:text-lg text-neutral-900">
 Smart Living Integration
 </h3>
 <p className="text-neutral-600 leading-relaxed font-normal text-base md:text-base">
 {" "}
 We blend luxury with technology, integrating smart home
 systems that provide seamless control over lighting, security,
 and climate.{" "}
 </p>
 </div>
 <div>
 <h3 className="text-card mb-4 text-[#0f172a] text-base md:text-base lg:text-lg text-neutral-900">
 Holistic Space Planning
 </h3>
 <p className="text-neutral-600 leading-relaxed font-normal text-base md:text-base">
 {" "}
 Our designs optimize every square inch of your home, ensuring
 a perfect flow between social spaces and private
 retreats.{" "}
 </p>
 </div>
 </div>
 </div>
 </div>
 </section>{" "}
 {/* Why Choose Us */}{" "}
 <WhyChooseUs
 title="WHY PARTNER WITH VoometDesign FOR RESIDENTIAL"
 cards={[
 {
 icon: "✍️",
 heading: "LIFETIME CUSTOMIZATION",
 copy: "No boilerplate templates. Every modular kitchen wardrobe and living partition is precision-milled around your exact daily routines.",
 },
 {
 icon: "🔍",
 heading: "100% TRANSPARENT BILLING",
 copy: "Zero hidden costs policy. Complete material brand verification matching our strict BOQ specifications down to the exact millimeter.",
 },
 {
 icon: "🔑",
 heading: "COMPLETE TURNKEY PEACE",
 copy: "From structural civil modifications to decorative lighting installation, you get an absolute single-point execution accountability framework.",
 },
 ]}
 />{" "}
 {/* Pricing Tiers */} <TierTable /> {/* Execution Matrix */}{" "}
 <ExecutionMatrix /> {/* Call to Action */}{" "}
 <section className="relative py-20 text-center overflow-hidden">
 <div className="absolute inset-0">
 <Image unoptimized={true} 
 quality={95}
      priority
      src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000" 
 alt="Residential CTA Background" 
 fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
       
 className="object-cover"
 />
 <div className="absolute inset-0 bg-[#0f172a]/60 backdrop-blur-[2px]" />
 </div>
 <div className="site-container relative z-10">
 <h2 className="text-section mb-8 text-3xl md:text-4xl lg:text-5xl text-white max-w-4xl mx-auto flex flex-wrap items-center justify-center">
  Start Your Residential Interiors Project with{" "}<span className="inline-flex items-center">Voomet Design Today<SectionWave className="opacity-70" /></span>
 </h2>
 <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
 Your dream home is just a consultation away. Let's create a space
 that defines your lifestyle.
 </p>
 <ServiceCTA
 label="CLAIM YOUR FREE VILLA DESIGN SURVEY"
 category="Residential"
 />
 </div>
 </section>{" "}
 </main>
 );
}
