import TierTable from "@/components/TierTable";
import VoometDifference from "@/components/VoometDifference";
import TestimonialSlider from "@/components/TestimonialSlider";
import Image from "next/image";

export default function HealthcarePage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="pt-48 pb-24 bg-[#f8fafc] text-primary overflow-hidden relative border-b border-gray-100">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Hygiene, Functional Layouts, and Medical Precision</h1>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 text-[#020617]">Healthcare <br /> Interiors</h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-10">
              Hygiene-first design that meets international medical standards. We prioritize sterile environments and patient-centric layouts.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl lg:order-2">
              <Image 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2070" 
                alt="Healthcare Interior" 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="space-y-12 lg:order-1">
              <div>
                <h3 className="text-3xl font-display font-bold mb-4 text-[#020617]">Sterile & Hygiene-First</h3>
                <p className="text-slate-500 leading-relaxed">
                  We use medical-grade, anti-microbial materials for all surfaces, ensuring a safe and clean environment that meets the highest medical standards.
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-display font-bold mb-4 text-[#020617]">Efficient Workflow Layouts</h3>
                <p className="text-slate-500 leading-relaxed">
                  Our spatial planning is engineered to optimize the movement of medical staff, reducing friction and improving emergency response times.
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-display font-bold mb-4 text-[#020617]">Patient-Centric Recovery</h3>
                <p className="text-slate-500 leading-relaxed">
                  We design recovery rooms that promote healing through soft color palettes, ergonomic furniture, and optimal light management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VoometDifference />
      
      <TierTable />
      
      <TestimonialSlider />

      {/* Call to Action */}
      <section className="py-24 bg-[#020617] text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">Start Your Healthcare Interiors Project with Voomet Design Today</h2>
          <p className="text-white/60 mb-10 max-w-2xl mx-auto">
            Get a Free 3D Layout Consultation Worth ₹10,000 For Free. Build a facility that heals with precision and care.
          </p>
          <button className="bg-accent text-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-white transition-all shadow-xl">
            Claim My Free Consultation
          </button>
        </div>
      </section>
    </main>
  );
}
