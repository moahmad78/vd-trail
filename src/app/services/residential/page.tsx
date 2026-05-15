import TierTable from "@/components/TierTable";
import Image from "next/image";

export default function ResidentialPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="pt-48 pb-24 bg-[#f8fafc] text-primary overflow-hidden relative border-b border-gray-100">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Bespoke Design & Personalized Living</h1>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 text-[#020617]">Residential <br /> Interiors</h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-10">
              Luxury design for premium Homes and Villas. We craft personalized living spaces that reflect your unique lifestyle through high-end aesthetics and functional brilliance.
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
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000" 
                alt="Residential Interior" 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="space-y-12 lg:order-1">
              <div>
                <h3 className="text-3xl font-display font-bold mb-4 text-[#020617]">Bespoke Craftsmanship</h3>
                <p className="text-slate-500 leading-relaxed">
                  Every element of your home is custom-made. From handcrafted furniture to artisanal wall finishes, we ensure every detail is unique.
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-display font-bold mb-4 text-[#020617]">Smart Living Integration</h3>
                <p className="text-slate-500 leading-relaxed">
                  We blend luxury with technology, integrating smart home systems that provide seamless control over lighting, security, and climate.
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-display font-bold mb-4 text-[#020617]">Holistic Space Planning</h3>
                <p className="text-slate-500 leading-relaxed">
                  Our designs optimize every square inch of your home, ensuring a perfect flow between social spaces and private retreats.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <TierTable />

      {/* Call to Action */}
      <section className="py-24 bg-[#020617] text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">Start Your Residential Interiors Project with Voomet Design Today</h2>
          <p className="text-white/60 mb-10 max-w-2xl mx-auto">
            Your dream home is just a consultation away. Let's create a space that defines your lifestyle.
          </p>
          <button className="bg-accent text-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-white transition-all shadow-xl">
            Book a Free Consultation
          </button>
        </div>
      </section>

      </main>
  );
}

