import TierTable from "@/components/TierTable";
import VoometDifference from "@/components/VoometDifference";
import TestimonialSlider from "@/components/TestimonialSlider";
import Image from "next/image";

export default function HospitalityPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="pt-48 pb-24 bg-[#f8fafc] text-primary overflow-hidden relative border-b border-gray-100">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Luxury Guest Experience & Ambiance</h1>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 text-[#020617]">Hospitality <br /> Interiors</h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-10">
              Ambiance that keeps your guests coming back. We create immersive environments for Hotels, Resorts, and Fine-Dining Restaurants.
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
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070" 
                alt="Hospitality Interior" 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="space-y-12">
              <div>
                <h3 className="text-3xl font-display font-bold mb-4 text-[#020617]">High-Impact Lobbies</h3>
                <p className="text-slate-500 leading-relaxed">
                  The first impression is the final impression. We design grand entrance lobbies that reflect your brand's luxury and hospitality standards.
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-display font-bold mb-4 text-[#020617]">Mood & Acoustic Design</h3>
                <p className="text-slate-500 leading-relaxed">
                  We specialized in creating the perfect mood through multi-layered lighting and acoustic management, ensuring your guests stay in peace.
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-display font-bold mb-4 text-[#020617]">Bespoke Guest Rooms</h3>
                <p className="text-slate-500 leading-relaxed">
                  Our designs focus on ergonomic layouts and high-performance fabrication that withstands high turnover while maintaining luxury.
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
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">Start Your Hospitality Interiors Project with Voomet Design Today</h2>
          <p className="text-white/60 mb-10 max-w-2xl mx-auto">
            Get a Free 3D Layout Consultation Worth ₹10,000 For Free. Ready to transform your space? Our team is standing by.
          </p>
          <button className="bg-accent text-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-white transition-all shadow-xl">
            Claim My Free Consultation
          </button>
        </div>
      </section>
    </main>
  );
}
