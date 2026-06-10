// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
import WhatsAppButton from "@/components/WhatsAppButton";
import Image from "next/image";
import { Shield, Ruler, Settings, Hammer } from "lucide-react";
export default function FabricationPage() {
 return (
 <main>

 <section className="pt-48 pb-24 bg-[#0f172a] text-white overflow-hidden relative">
 <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-32" />
 <div className="site-container relative z-10">
 <div className="max-w-3xl">
 <h1 className="text-hero text-xs mb-4 block text-[#324A61]">
 Precision Engineering
 </h1>
 <h2 className="text-section mb-8 text-3xl md:text-5xl lg:text-6xl text-white">
 Aluminium Doors <br /> & Window Systems
 </h2>
 <p className="mb-10 text-slate-300 leading-relaxed font-normal text-base md:text-base">
 {" "}
 Specialized high-end fabrication solutions for modern
 architecture. We combine structural integrity with minimalist
 aesthetics.{" "}
 </p>
 </div>
 </div>
 </section>
 <section className="py-24 bg-white dark:bg-slate-dark">
 <div className="site-container">
 <div className="flex flex-col lg:flex-row gap-16 items-center">
 <div className="lg:w-1/2 grid grid-cols-2 gap-6">
 <div className="aspect-square relative rounded-3xl overflow-hidden shadow-xl">
 <Image unoptimized={true}
 quality={95}
      priority
      src="https://images.unsplash.com/photo-1590483734724-383b85ad65e7?q=80&w=1974"
 alt="Fabrication 1"
 fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      
 className="object-cover"
 />
 </div>
 <div className="aspect-square relative rounded-3xl overflow-hidden shadow-xl mt-12">
 <Image unoptimized={true}
 quality={95}
      priority
      src="https://images.unsplash.com/photo-1504917595417-6020a16b06b1?q=80&w=1974"
 alt="Fabrication 2"
 fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      
 className="object-cover"
 />
 </div>
 </div>
 <div className="lg:w-1/2">
 <h3 className="text-card mb-6 text-base md:text-base lg:text-lg text-neutral-900">
 Why Choose Our Aluminium Systems?
 </h3>
 <p className="mb-12 text-neutral-600 leading-relaxed font-normal text-base md:text-base">
 {" "}
 Our aluminium profiles are crafted using high-grade alloys that
 offer superior strength-to-weight ratios. Whether it's a massive
 sliding door for a luxury villa or sterile window systems for a
 hospital, our precision is unmatched.{" "}
 </p>
 <div className="space-y-8">
 {" "}
 {[
 {
 icon: <Shield className="text-neutral-500" />,
 title: "Corrosion Resistant",
 desc: "Treated with advanced powder coating for lifetime durability.",
 },
 {
 icon: <Ruler className="text-neutral-500" />,
 title: "Millimeter Precision",
 desc: "Automated CNC cutting ensures 100% accurate fitment.",
 },
 {
 icon: <Settings className="text-neutral-500" />,
 title: "Custom Hardware",
 desc: "Integration with premium international hardware brands.",
 },
 ].map((item, idx) => (
 <div key={idx} className="flex gap-6">
 <div className="shrink-0 w-12 h-12 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center">
 {" "}
 {item.icon}{" "}
 </div>
 <div>
 <h5 className="text-card mb-1 text-base md:text-base lg:text-lg text-neutral-900">
 {item.title}
 </h5>
 <p className="text-neutral-600 leading-relaxed font-normal text-base md:text-base">
 {item.desc}
 </p>
 </div>
 </div>
 ))}{" "}
 </div>
 </div>
 </div>
 </div>
 </section>
 <WhatsAppButton />
 </main>
 );
}
