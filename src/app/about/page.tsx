import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-[#f8fafc] border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <h1 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Our Story</h1>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 text-[#020617]">Designing Spaces, <br />Defining Lifestyles</h2>
              <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                VOOMET DESIGN was born from a vision to bridge the gap between creative interior design and precision engineering. For over two decades, we have been at the forefront of the design and fabrication industry in India.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-3xl font-display font-bold text-[#020617] mb-2">20+</h4>
                  <p className="text-sm text-slate-400 uppercase font-bold tracking-wider">Years Experience</p>
                </div>
                <div>
                  <h4 className="text-3xl font-display font-bold text-[#020617] mb-2">500+</h4>
                  <p className="text-sm text-slate-400 uppercase font-bold tracking-wider">Projects Delivered</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070" 
                  alt="Our Studio" 
                  fill 
                  className="object-cover" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
              <h3 className="text-2xl font-display font-bold mb-4 text-[#020617]">Our Mission</h3>
              <p className="text-slate-500 leading-relaxed">
                To provide end-to-end, high-quality interior and fabrication solutions that enhance the quality of life and work for our clients.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-[#020617] text-white shadow-2xl">
              <h3 className="text-2xl font-display font-bold mb-4 text-accent">Our Vision</h3>
              <p className="text-white/70 leading-relaxed">
                To be the global benchmark in architectural interior design and precision aluminium systems, known for innovation and integrity.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
              <h3 className="text-2xl font-display font-bold mb-4 text-[#020617]">Our Values</h3>
              <p className="text-slate-500 leading-relaxed">
                Precision, Transparency, Innovation, and Client-Centricity. We believe every space has a story to tell.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
