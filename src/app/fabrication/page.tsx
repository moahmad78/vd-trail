import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import { Shield, Ruler, Settings, Hammer } from "lucide-react";

export default function FabricationPage() {
  return (
    <main>
      <Navbar />
      <section className="pt-48 pb-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-32" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Precision Engineering</h1>
            <h2 className="text-4xl md:text-7xl font-display font-bold mb-8">Aluminium Doors <br /> & Window Systems</h2>
            <p className="text-xl text-white/60 leading-relaxed mb-10">
              Specialized high-end fabrication solutions for modern architecture. We combine structural integrity with minimalist aesthetics.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-slate-dark">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 grid grid-cols-2 gap-6">
              <div className="aspect-square relative rounded-3xl overflow-hidden shadow-xl">
                <Image src="https://images.unsplash.com/photo-1590483734724-383b85ad65e7?q=80&w=1974" alt="Fabrication 1" fill className="object-cover" />
              </div>
              <div className="aspect-square relative rounded-3xl overflow-hidden shadow-xl mt-12">
                <Image src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974" alt="Fabrication 2" fill className="object-cover" />
              </div>
            </div>
            <div className="lg:w-1/2">
              <h3 className="text-3xl font-display font-bold mb-6">Why Choose Our Aluminium Systems?</h3>
              <p className="text-slate-500 mb-12">
                Our aluminium profiles are crafted using high-grade alloys that offer superior strength-to-weight ratios. Whether it's a massive sliding door for a luxury villa or sterile window systems for a hospital, our precision is unmatched.
              </p>
              
              <div className="space-y-8">
                {[
                  { icon: <Shield className="text-accent" />, title: "Corrosion Resistant", desc: "Treated with advanced powder coating for lifetime durability." },
                  { icon: <Ruler className="text-accent" />, title: "Millimeter Precision", desc: "Automated CNC cutting ensures 100% accurate fitment." },
                  { icon: <Settings className="text-accent" />, title: "Custom Hardware", desc: "Integration with premium international hardware brands." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="shrink-0 w-12 h-12 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center">
                      {item.icon}
                    </div>
                    <div>
                      <h5 className="font-bold mb-1">{item.title}</h5>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
