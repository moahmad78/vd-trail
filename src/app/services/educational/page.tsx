// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
import TierTable from "@/components/TierTable";
import Image from "next/image";
import { Volume2, Shield, BadgeCheck } from "lucide-react";
import ServiceCTA from "@/components/ServiceCTA";
import ExecutionMatrix from "@/components/ExecutionMatrix";
import WhyChooseUs from "@/components/WhyChooseUs";
import Navbar from "@/components/Navbar";
export default function EducationPage() {
  return (
    <main className="bg-white">
      <Navbar />
      {/* Hero Section */}{" "}
      <section className="pt-40 md:pt-48 pb-16 md:pb-24 bg-[#f8fafc] overflow-hidden relative border-b border-slate-100">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center">
            {" "}
            {/* Left Column (lg:col-span-7): Rich Content Stack */}{" "}
            <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 mt-10 lg:mt-0">
              <h1 className="text-xs mb-4 block text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-950">
                {" "}
                ERGONOMIC LEARNING ENVIRONMENTS & DURABILITY{" "}
              </h1>
              <h2 className="mb-6 text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-950">
                {" "}
                Educational Interiors{" "}
              </h2>
              <p className="text-slate-600 leading-relaxed font-normal text-base md:text-base">
                {" "}
                Transforming Schools, Colleges, and Libraries into agile,
                future-ready learning spaces. We design safety-compliant,
                high-end environments that inspire students and endure the test
                of time.{" "}
              </p>{" "}
              {/* Educational Space Optimization Metrics */}{" "}
              <div className="w-full mt-6 mb-6">
                <span className="text-xs md:text-sm font-black uppercase tracking-[0.25em] text-[#324A61] block mb-3">
                  {" "}
                  Educational Space Optimization Metrics{" "}
                </span>
                <div className="grid grid-cols-3 gap-3 w-full mb-4">
                  <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-3 flex flex-col items-center text-center justify-center hover:bg-white hover:border-slate-300/30 transition-all duration-200">
                    <Volume2 className="w-5 h-5 text-slate-800" />
                    <span className="text-slate-900 font-bold text-sm uppercase tracking-wider mt-1.5">
                      Acoustics
                    </span>
                  </div>
                  <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-3 flex flex-col items-center text-center justify-center hover:bg-white hover:border-slate-300/30 transition-all duration-200">
                    <Shield className="w-5 h-5 text-slate-800" />
                    <span className="text-slate-900 font-bold text-sm uppercase tracking-wider mt-1.5">
                      Durability
                    </span>
                  </div>
                  <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-3 flex flex-col items-center text-center justify-center hover:bg-white hover:border-slate-300/30 transition-all duration-200">
                    <BadgeCheck className="w-5 h-5 text-slate-800" />
                    <span className="text-slate-900 font-bold text-sm uppercase tracking-wider mt-1.5">
                      Safety Ratings
                    </span>
                  </div>
                </div>
              </div>{" "}
              {/* Trust/Feature Micro-Metrics Row */}{" "}
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
                <div className="text-slate-500 text-sm font-semibold tracking-wide border-l-2 border-slate-300 pl-3">
                  {" "}
                  100% Safety Compliant Layouts{" "}
                </div>
                <div className="text-slate-500 text-sm font-semibold tracking-wide border-l-2 border-slate-300 pl-3">
                  {" "}
                  Acoustic Noise Control{" "}
                </div>
                <div className="text-slate-500 text-sm font-semibold tracking-wide border-l-2 border-slate-300 pl-3">
                  {" "}
                  Heavy-Traffic Durable Materials{" "}
                </div>
              </div>
            </div>{" "}
            {/* Right Column (lg:col-span-5): Premium Hero Image Frame */}{" "}
            <div className="lg:col-span-5 relative order-1 lg:order-2">
              <div className="relative z-10">
                <Image
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070"
                  alt="Modern Smart University Library"
                  width={800}
                  height={600}
                  className="w-full h-[350px] md:h-[450px] object-cover rounded-2xl shadow-xl shadow-slate-200/50"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-slate-300 z-0"></div>
            </div>
          </div>
        </div>
      </section>{" "}
      {/* Feature Section */}{" "}
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
                <h3 className="mb-4 text-[#020617] text-base md:text-base lg:text-lg font-black uppercase tracking-wide text-slate-950">
                  Agile Classrooms
                </h3>
                <p className="text-slate-600 leading-relaxed font-normal text-base md:text-base">
                  {" "}
                  We design flexible spaces that adapt to different teaching
                  styles, fostering collaboration and active participation among
                  students.{" "}
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-[#020617] text-base md:text-base lg:text-lg font-black uppercase tracking-wide text-slate-950">
                  Ergonomic Durability
                </h3>
                <p className="text-slate-600 leading-relaxed font-normal text-base md:text-base">
                  {" "}
                  Our furniture and finishes are built to withstand high-traffic
                  use while providing ergonomic support for long study
                  hours.{" "}
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-[#020617] text-base md:text-base lg:text-lg font-black uppercase tracking-wide text-slate-950">
                  Creative Study Hubs
                </h3>
                <p className="text-slate-600 leading-relaxed font-normal text-base md:text-base">
                  {" "}
                  From libraries to common areas, we create hubs that encourage
                  self-study and peer-to-peer interaction through intelligent
                  design.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>{" "}
      {/* Why Choose Us */}{" "}
      <WhyChooseUs
        title="WHY PARTNER WITH VoometDesign FOR EDUCATION"
        cards={[
          {
            icon: "🛡️",
            heading: "INSTITUTIONAL COMPLIANCE",
            copy: "Every layout strictly satisfies regional building bylaws, anti-fire hazards, and emergency evaluation accessibility protocols.",
          },
          {
            icon: "🪵",
            heading: "ANTI-VANDAL DURABILITY",
            copy: "We source heavy-traffic impact resistant laminates and rustproof powder-coated metals that withstand years of continuous student activity.",
          },
          {
            icon: "🧠",
            heading: "ECO-FRIENDLY ERGONOMICS",
            copy: "Certified non-toxic, low-VOC paint layouts and ergonomic seating systems designed to improve posture and classroom focus spans.",
          },
        ]}
      />{" "}
      {/* Pricing Tiers */} <TierTable /> {/* Execution Matrix */}{" "}
      <ExecutionMatrix /> {/* Call to Action */}{" "}
      <section className="relative py-20 text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070" 
            alt="Educational CTA Background" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#020617]/60 backdrop-blur-[2px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="mb-8 text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white max-w-4xl mx-auto">
            Start Your Educational Interiors Project with Voomet Design Today
          </h2>
          <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Empower the next generation with spaces that inspire. Contact us to
            start your institutional transformation.
          </p>
          <ServiceCTA
            label="BOOK YOUR EDUCATIONAL INTERIORS CONSULTATION"
            category="Educational"
          />
        </div>
      </section>{" "}
    </main>
  );
}
