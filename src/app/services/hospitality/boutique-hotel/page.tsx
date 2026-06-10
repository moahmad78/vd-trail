import React from "react";
import Image from "next/image";
import ServiceCTA from "@/components/ServiceCTA";
import { Lightbulb, Users, Sparkles } from "lucide-react";

export default function BoutiqueHotelPage() {
  return (
    <main className="bg-white">

      {/* Hero Section */}
      <section className="pt-40 md:pt-48 pb-16 md:pb-24 bg-[#f8fafc] overflow-hidden relative border-b border-slate-100">
        <div className="site-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 mt-10 lg:mt-0">
              <h1 className="text-hero text-xs mb-4 block text-3xl md:text-5xl lg:text-6xl text-neutral-900">
                BESPOKE BOUTIQUE HOTELS
              </h1>
              <h2 className="text-section mb-6 text-2xl md:text-3xl text-neutral-900">
                Hospitality Interiors
              </h2>
              <p className="text-neutral-600 leading-relaxed font-normal text-base md:text-base">
                Curating unique, highly personalized boutique hotel environments. We focus on distinct visual identities and intimate guest experiences that set your property apart from commercial chains.
              </p>
              
              <div className="w-full mt-6 mb-6">
                <span className="text-badge md:text-sm text-[#324A61] block mb-3">
                  Boutique Design Metrics
                </span>
                <div className="grid grid-cols-3 gap-3 w-full mb-4">
                  <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-3 flex flex-col items-center text-center justify-center hover:bg-white hover:border-slate-300/30 transition-all duration-200">
                    <Lightbulb className="w-5 h-5 text-slate-800" />
                    <span className="text-neutral-900 font-bold text-sm mt-1.5">Mood Lighting</span>
                  </div>
                  <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-3 flex flex-col items-center text-center justify-center hover:bg-white hover:border-slate-300/30 transition-all duration-200">
                    <Users className="w-5 h-5 text-slate-800" />
                    <span className="text-neutral-900 font-bold text-sm mt-1.5">Intimate Flow</span>
                  </div>
                  <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-3 flex flex-col items-center text-center justify-center hover:bg-white hover:border-slate-300/30 transition-all duration-200">
                    <Sparkles className="w-5 h-5 text-slate-800" />
                    <span className="text-neutral-900 font-bold text-sm mt-1.5">Signature Decor</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-5 relative order-1 lg:order-2">
              <div className="relative z-10">
                <Image unoptimized={true}
                  quality={95}
      src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000"
                  alt="Premium Boutique Hotel Interior"
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
      </section>

      {/* Feature Section */}
      <section className="py-24 bg-white">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl">
              <Image unoptimized={true}
                quality={95}
      priority
      src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2000"
                alt="Boutique Hotel Layout"
                fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      
                className="object-cover"
              />
            </div>
            <div className="space-y-12">
              <div>
                <h3 className="text-card mb-4 text-[#0f172a] text-base md:text-base lg:text-lg text-neutral-900">
                  Signature Aesthetics
                </h3>
                <p className="text-neutral-600 leading-relaxed font-normal text-base md:text-base">
                  Crafting a unique visual narrative that resonates with the local culture and your specific brand identity.
                </p>
              </div>
              <div>
                <h3 className="text-card mb-4 text-[#0f172a] text-base md:text-base lg:text-lg text-neutral-900">
                  Intimate Common Areas
                </h3>
                <p className="text-neutral-600 leading-relaxed font-normal text-base md:text-base">
                  Designing cozy, high-end lobbies and lounges that encourage guest interaction and relaxation.
                </p>
              </div>
              <div>
                <h3 className="text-card mb-4 text-[#0f172a] text-base md:text-base lg:text-lg text-neutral-900">
                  Premium Guest Rooms
                </h3>
                <p className="text-neutral-600 leading-relaxed font-normal text-base md:text-base">
                  Executing flawless room layouts with custom millwork, mood lighting, and bespoke furniture pieces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-20 text-center overflow-hidden">
        <div className="absolute inset-0">
          <Image unoptimized={true} 
            quality={95}
      priority
      src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000" 
            alt="Boutique Hotel CTA Background" 
            fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
       
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0f172a]/60 backdrop-blur-[2px]" />
        </div>
        <div className="site-container relative z-10">
          <h2 className="text-section mb-8 text-3xl md:text-4xl lg:text-5xl text-white max-w-4xl mx-auto">
            Start Your Boutique Hotel Project Today
          </h2>
          <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Get a Turnkey 3D Layout Consultation Worth ₹10,000. Ready to transform your property?
          </p>
          <ServiceCTA
            label="GET INSTANT ESTIMATE"
            category="Boutique Hotel"
          />
        </div>
      </section>
    </main>
  );
}
