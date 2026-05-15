import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TierTable from "@/components/TierTable";
import VoometDifference from "@/components/VoometDifference";
import TestimonialSlider from "@/components/TestimonialSlider";
import Image from "next/image";

export default function AluminiumPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="pt-48 pb-24 bg-[#f8fafc] text-primary overflow-hidden relative border-b border-gray-100">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Precision Engineering & Luxury Systems</h1>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 text-[#020617]">Aluminium <br /> Fabrication</h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-10">
              High-performance windows and sliding systems that blend architectural beauty with 100% noise cancellation and life-long durability.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1503708928676-1cb796a0891e?q=80&w=2074" 
                alt="Aluminium Fabrication" 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="space-y-12">
              <div>
                <span className="text-accent font-bold uppercase tracking-widest text-[10px] mb-2 block">The Technical Edge</span>
                <h3 className="text-3xl font-display font-bold mb-4 text-[#020617]">Zero-Noise Systems</h3>
                <p className="text-slate-500 leading-relaxed">
                  Our double-glazed, thermal-break aluminium systems are designed to cancel up to 45dB of external noise, creating a peaceful sanctuary in the heart of the city.
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-display font-bold mb-4 text-[#020617]">Medical-Grade Precision</h3>
                <p className="text-slate-500 leading-relaxed">
                  Utilizing in-house medical-grade fabrication techniques, we ensure every joint and seal is airtight, waterproof, and built to last for decades.
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-display font-bold mb-4 text-[#020617]">Architectural Aesthetics</h3>
                <p className="text-slate-500 leading-relaxed">
                  Ultra-slim profiles and bespoke powder-coated finishes ensure that your windows and doors are as beautiful as they are functional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VoometDifference />

      {/* Cross-Selling Section */}
      <section className="py-24 bg-accent text-primary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Combined Power: Save 20%</h2>
          <p className="text-lg font-medium mb-10 max-w-2xl mx-auto">
            When you choose Voomet for both **Interiors** and **Aluminium Fabrication**, our unified project management saves you 20% on total costs and 30% on delivery time.
          </p>
          <button className="bg-primary text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-primary transition-all">
            Unlock My 20% Savings
          </button>
        </div>
      </section>

      <TierTable />
      
      <TestimonialSlider />

      {/* Call to Action */}
      <section className="py-24 bg-[#020617] text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">Start Your Aluminium Fabrication Project with Voomet Design Today</h2>
          <p className="text-white/60 mb-10 max-w-2xl mx-auto">
            Get a Free 3D Layout Consultation Worth ₹10,000 For Free. Our engineering team is ready to deliver precision.
          </p>
          <button className="bg-accent text-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-white transition-all shadow-xl">
            Claim My Free Consultation
          </button>
        </div>
      </section>
    </main>
  );
}
