import Gallery from "@/components/Gallery";

export default function PortfolioPage() {
  return (
    <main className="bg-white">
      <section className="pt-32 pb-12 bg-[#f8fafc] text-center border-b border-gray-100">
        <div className="container mx-auto px-6">
          <h1 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Our Portfolio</h1>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 text-[#020617]">Masterpieces of Design <br />& Engineering</h2>
          <p className="max-w-2xl mx-auto text-slate-500">
            A curated showcase of our most ambitious projects across Residential, Healthcare, and Educational sectors.
          </p>
        </div>
      </section>
      <Gallery />
    </main>
  );
}
