import TierTable from "@/components/TierTable";
import Image from "next/image";

export default function EducationPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="pt-48 pb-24 bg-[#f8fafc] text-primary overflow-hidden relative border-b border-gray-100">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Ergonomic Learning Environments & Durability</h1>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-8 text-[#020617]">Educational <br /> Interiors</h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-10">
              Transforming Schools, Colleges, and Libraries into agile learning spaces. We design environments that inspire students and endure the test of time.
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
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070" 
                alt="Educational Interior" 
                fill 
                className="object-cover" 
              />
            </div>
            <div className="space-y-12">
              <div>
                <h3 className="text-3xl font-display font-bold mb-4 text-[#020617]">Agile Classrooms</h3>
                <p className="text-slate-500 leading-relaxed">
                  We design flexible spaces that adapt to different teaching styles, fostering collaboration and active participation among students.
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-display font-bold mb-4 text-[#020617]">Ergonomic Durability</h3>
                <p className="text-slate-500 leading-relaxed">
                  Our furniture and finishes are built to withstand high-traffic use while providing ergonomic support for long study hours.
                </p>
              </div>
              <div>
                <h3 className="text-3xl font-display font-bold mb-4 text-[#020617]">Creative Study Hubs</h3>
                <p className="text-slate-500 leading-relaxed">
                  From libraries to common areas, we create hubs that encourage self-study and peer-to-peer interaction through intelligent design.
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
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">Start Your Educational Interiors Project with Voomet Design Today</h2>
          <p className="text-white/60 mb-10 max-w-2xl mx-auto">
            Empower the next generation with spaces that inspire. Contact us to start your institutional transformation.
          </p>
          <button className="bg-accent text-primary px-10 py-4 rounded-xl font-bold text-lg hover:bg-white transition-all shadow-xl">
            Book a Free Consultation
          </button>
        </div>
      </section>

      </main>
  );
}

