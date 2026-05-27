// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
import TierTable from "@/components/TierTable";
import VoometDesignDifference from "@/components/VoometDesignDifference";
import { Lightbulb, Users, Sparkles } from "lucide-react";
import WhyChooseUs from "@/components/WhyChooseUs";
import ServiceCTA from "@/components/ServiceCTA";
import ExecutionMatrix from "@/components/ExecutionMatrix";
import Image from "next/image";
import Navbar from "@/components/Navbar";
export default function HospitalityPage() {
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
                BESPOKE LUXURY VENUES & PREMIUM AMBIANCE{" "}
              </h1>
              <h2 className="mb-6 text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-950">
                {" "}
                Hospitality Interiors{" "}
              </h2>
              <p className="text-slate-600 leading-relaxed font-normal text-base md:text-base">
                {" "}
                Engineering premium lounges, luxury hotels, and high-end
                boutique environments. We merge striking visual identity with
                precise commercial workflows to maximize patron dwell-time.{" "}
              </p>{" "}
              {/* Hospitality Ambiance & Workflow Ratios */}{" "}
              <div className="w-full mt-6 mb-6">
                <span className="text-xs md:text-sm font-black uppercase tracking-[0.25em] text-[#324A61] block mb-3">
                  {" "}
                  Hospitality Ambiance & Workflow Ratios{" "}
                </span>
                <div className="grid grid-cols-3 gap-3 w-full mb-4">
                  <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-3 flex flex-col items-center text-center justify-center hover:bg-white hover:border-slate-300/30 transition-all duration-200">
                    <Lightbulb className="w-5 h-5 text-slate-800" />
                    <span className="text-slate-900 font-bold text-sm uppercase tracking-wider mt-1.5">
                      Lighting Design
                    </span>
                  </div>
                  <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-3 flex flex-col items-center text-center justify-center hover:bg-white hover:border-slate-300/30 transition-all duration-200">
                    <Users className="w-5 h-5 text-slate-800" />
                    <span className="text-slate-900 font-bold text-sm uppercase tracking-wider mt-1.5">
                      Guest Flow
                    </span>
                  </div>
                  <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-3 flex flex-col items-center text-center justify-center hover:bg-white hover:border-slate-300/30 transition-all duration-200">
                    <Sparkles className="w-5 h-5 text-slate-800" />
                    <span className="text-slate-900 font-bold text-sm uppercase tracking-wider mt-1.5">
                      Micro-Detail Finishes
                    </span>
                  </div>
                </div>
              </div>{" "}
              {/* Trust/Feature Micro-Metrics Row */}{" "}
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
                <div className="text-slate-500 text-sm font-semibold tracking-wide border-l-2 border-slate-300 pl-3">
                  {" "}
                  Commercial Spatial Optimization{" "}
                </div>
                <div className="text-slate-500 text-sm font-semibold tracking-wide border-l-2 border-slate-300 pl-3">
                  {" "}
                  Custom Premium Lighting Design{" "}
                </div>
                <div className="text-slate-500 text-sm font-semibold tracking-wide border-l-2 border-slate-300 pl-3">
                  {" "}
                  High-End Micro-Detail Finishes{" "}
                </div>
              </div>
            </div>{" "}
            {/* Right Column (lg:col-span-5): Premium Hero Image Frame */}{" "}
            <div className="lg:col-span-5 relative order-1 lg:order-2">
              <div className="relative z-10">
                <Image
                  src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025"
                  alt="Premium Hotel Lobby Lounge"
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
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070"
                alt="Hospitality Interior"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-12">
              <div>
                <h3 className="mb-4 text-[#020617] text-base md:text-base lg:text-lg font-black uppercase tracking-wide text-slate-950">
                  High-Impact Lobbies
                </h3>
                <p className="text-slate-600 leading-relaxed font-normal text-base md:text-base">
                  {" "}
                  The first impression is the final impression. We design grand
                  entrance lobbies that reflect your brand's luxury and
                  hospitality standards.{" "}
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-[#020617] text-base md:text-base lg:text-lg font-black uppercase tracking-wide text-slate-950">
                  Mood & Acoustic Design
                </h3>
                <p className="text-slate-600 leading-relaxed font-normal text-base md:text-base">
                  {" "}
                  We specialized in creating the perfect mood through
                  multi-layered lighting and acoustic management, ensuring your
                  guests stay in peace.{" "}
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-[#020617] text-base md:text-base lg:text-lg font-black uppercase tracking-wide text-slate-950">
                  Bespoke Guest Rooms
                </h3>
                <p className="text-slate-600 leading-relaxed font-normal text-base md:text-base">
                  {" "}
                  Our designs focus on ergonomic layouts and high-performance
                  fabrication that withstands high turnover while maintaining
                  luxury.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <VoometDesignDifference />
      <TierTable /> {/* Execution Matrix */} <ExecutionMatrix />{" "}
      {/* Why Choose Us */}{" "}
      <WhyChooseUs
        title="WHY PARTNER WITH VoometDesign FOR HOSPITALITY"
        cards={[
          {
            icon: "⏱️",
            heading: "MINIMIZED COMMERCIAL DOWNTIME",
            copy: "We execute with modular off-site engineering and strict project tracking to deliver your venue on-time, preventing business loss.",
          },
          {
            icon: "✨",
            heading: "VISUAL IDENTITY PRESTIGE",
            copy: "Bespoke ceiling layouts, integrated hidden ambient lux lighting controls, and materials that project absolute five-star luxury.",
          },
          {
            icon: "🥂",
            heading: "HIGH-TRAFFIC CIRCULATION",
            copy: "Spatially mapped guest flow layouts that allow waiters and customers to move effortlessly during peak weekend hours.",
          },
        ]}
      />{" "}
      {/* Call to Action */}{" "}
      <section className="relative py-20 text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025" 
            alt="Hospitality CTA Background" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#020617]/60 backdrop-blur-[2px]" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="mb-8 text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white max-w-4xl mx-auto">
            Start Your Hospitality Interiors Project with Voomet Design Today
          </h2>
          <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Get a Free 3D Layout Consultation Worth ₹10,000 For Free. Ready to
            transform your space? Our team is standing by.
          </p>
          <ServiceCTA
            label="GET INSTANT HOSPITALITY ESTIMATE"
            category="Hospitality"
          />
        </div>
      </section>{" "}
    </main>
  );
}
