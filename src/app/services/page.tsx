import ServiceGrid from "@/components/ServiceGrid";
import VoometDifference from "@/components/VoometDifference";
import TestimonialSlider from "@/components/TestimonialSlider";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="pt-48 pb-24 bg-[#f8fafc] text-primary overflow-hidden relative border-b border-gray-100">
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <h1 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Our Expertise</h1>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 text-[#020617]">Specialized Design & Fabrication</h2>
          <p className="text-xl text-slate-600 leading-relaxed mb-10">
            From healthcare precision to residential luxury, we provide end-to-end architectural solutions tailored to your sector.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {["In-House Fabrication", "20-Year Legacy", "Medical-Grade Precision"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm font-bold text-[#020617]">
                <CheckCircle2 size={18} className="text-accent" /> {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceGrid />

      <VoometDifference />

      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Aluminium Feature Card */}
            <div className="relative h-[450px] rounded-[2rem] overflow-hidden group shadow-2xl">
              <img src="https://images.unsplash.com/photo-1503708928676-1cb796a0891e?q=80&w=2074" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Aluminium Fabrication" />
              <div className="absolute inset-0 bg-[#020617]/70 p-12 flex flex-col justify-end">
                <h3 className="text-3xl font-display font-bold text-white mb-4">Aluminium Fabrication</h3>
                <p className="text-white/70 mb-6 max-w-sm">Precision-engineered door and window systems with 100% noise cancellation.</p>
                <Link href="/services/aluminium" className="text-accent font-bold flex items-center gap-2 hover:gap-4 transition-all w-fit">
                  Explore Systems <ArrowRight size={20} />
                </Link>
              </div>
            </div>

            {/* Residential Feature Card */}
            <div className="relative h-[450px] rounded-[2rem] overflow-hidden group shadow-2xl">
              <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Residential Interiors" />
              <div className="absolute inset-0 bg-accent/90 p-12 flex flex-col justify-end">
                <h3 className="text-3xl font-display font-bold text-[#020617] mb-4">Bespoke Interiors</h3>
                <p className="text-[#020617]/70 mb-6 max-w-sm">Crafting soulful environments that define modern luxury lifestyles.</p>
                <Link href="/services/residential" className="text-[#020617] font-bold flex items-center gap-2 hover:gap-4 transition-all w-fit">
                  View Residential <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialSlider />

      {/* Global CTA */}
      <section className="py-24 bg-slate-50 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 text-[#020617]">Claim Your Free 3D Layout Plan Today</h2>
          <p className="text-slate-500 mb-10 max-w-2xl mx-auto">
            Worth ₹10,000 - Completely Free for new inquiries. Whether it's a medical facility or a private villa, let's start with a vision.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/contact" className="bg-[#020617] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-accent transition-all shadow-xl">
              Book Free Site Survey
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
