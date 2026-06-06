// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
import Navbar from "@/components/Navbar";
import TierTable from "@/components/TierTable";
import VoometDesignDifference from "@/components/VoometDesignDifference";
import TestimonialSlider from "@/components/TestimonialSlider";
import Image from "next/image";
export default function AluminiumPage() {
 return (
 <main className="bg-white">
 {" "}
 <Navbar /> {/* Hero Section */}{" "}
 <section className="pt-48 pb-24 bg-[#f8fafc] text-neutral-900 overflow-hidden relative border-b border-slate-100">
 <div className="site-container relative z-10">
 <div className="max-w-3xl">
 <h1 className="text-hero text-xs mb-4 block text-3xl md:text-5xl lg:text-6xl text-neutral-900">
 Precision Engineering & Luxury Systems
 </h1>
 <h2 className="text-section mb-8 text-[#0f172a] text-2xl md:text-3xl text-neutral-900">
 Aluminium <br /> Fabrication
 </h2>
 <p className="mb-10 text-neutral-600 leading-relaxed font-normal text-base md:text-base">
 {" "}
 High-performance windows and sliding systems that blend
 architectural beauty with 100% noise cancellation and life-long
 durability.{" "}
 </p>
 </div>
 </div>
 </section>{" "}
 {/* Feature Section */}{" "}
 <section className="py-24 bg-white">
 <div className="site-container">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
 <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl">
 <Image unoptimized={true}
 quality={95}
      priority
      src="https://images.unsplash.com/photo-1503708928676-1cb796a0891e?q=80&w=2074"
 alt="Aluminium Fabrication"
 fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      
 className="object-cover"
 />
 </div>
 <div className="space-y-12">
 <div>
 <span className="text-badge md: ] text-[#324A61] block mb-3">
 The Technical Edge
 </span>
 <h3 className="text-card mb-4 text-[#0f172a] text-base md:text-base lg:text-lg text-neutral-900">
 Zero-Noise Systems
 </h3>
 <p className="text-neutral-600 leading-relaxed font-normal text-base md:text-base">
 {" "}
 Our double-glazed, thermal-break aluminium systems are
 designed to cancel up to 45dB of external noise, creating a
 peaceful sanctuary in the heart of the city.{" "}
 </p>
 </div>
 <div>
 <h3 className="text-card mb-4 text-[#0f172a] text-base md:text-base lg:text-lg text-neutral-900">
 Medical-Grade Precision
 </h3>
 <p className="text-neutral-600 leading-relaxed font-normal text-base md:text-base">
 {" "}
 Utilizing in-house medical-grade fabrication techniques, we
 ensure every joint and seal is airtight, waterproof, and built
 to last for decades.{" "}
 </p>
 </div>
 <div>
 <h3 className="text-card mb-4 text-[#0f172a] text-base md:text-base lg:text-lg text-neutral-900">
 Architectural Aesthetics
 </h3>
 <p className="text-neutral-600 leading-relaxed font-normal text-base md:text-base">
 {" "}
 Ultra-slim profiles and bespoke powder-coated finishes ensure
 that your windows and doors are as beautiful as they are
 functional.{" "}
 </p>
 </div>
 </div>
 </div>
 </div>
 </section>
 <VoometDesignDifference /> {/* Cross-Selling Section */}{" "}
 <section className="py-24 bg-[#0f172a] text-white">
 <div className="site-container text-center">
 <h2 className="text-section mb-6 text-2xl md:text-3xl text-white">
 Combined Power: Save 20%
 </h2>
 <p className="text-lg font-medium mb-10 max-w-2xl mx-auto">
 {" "}
 When you choose VoometDesign for both **Interiors** and **Aluminium
 Fabrication**, our unified project management saves you 20% on total
 costs and 30% on delivery time.{" "}
 </p>
 <button className="text-badge bg-[#324A61] text-white py-3.5 px-6 rounded-lg hover:bg-white hover:text-[#0f172a] transition-all duration-300 shadow-md">
 {" "}
 Unlock My 20% Savings{" "}
 </button>
 </div>
 </section>
 <TierTable />
 <TestimonialSlider /> {/* Call to Action */}{" "}
 <section className="py-24 bg-[#0f172a] text-white text-center">
 <div className="site-container">
 <h2 className="text-section mb-8 text-2xl md:text-3xl text-white">
 Start Your Aluminium Fabrication Project with Voomet Design Today
 </h2>
 <p className="text-white/60 mb-10 max-w-2xl mx-auto">
 {" "}
 Get a Free 3D Layout Consultation Worth ₹10,000 For Free. Our
 engineering team is ready to deliver precision.{" "}
 </p>
 <button className="text-badge bg-[#324A61] text-white py-3.5 px-6 rounded-lg hover:bg-white hover:text-[#0f172a] transition-all duration-300 shadow-md">
 {" "}
 Claim My Free Consultation{" "}
 </button>
 </div>
 </section>{" "}
 </main>
 );
}
