import React from "react";
import Image from "next/image";
import ServiceCTA from "@/components/ServiceCTA";
import { Lightbulb, Users, Sparkles } from "lucide-react";

export default function ServiceApartmentsPage() {
  return (
    <main className="bg-white">

      {/* Hero Section */}
      <section className="pt-40 md:pt-48 pb-16 md:pb-24 bg-[#f8fafc] overflow-hidden relative border-b border-slate-100">
        <div className="site-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 mt-10 lg:mt-0">
              <h1 className="text-hero text-xs mb-4 block text-3xl md:text-5xl lg:text-6xl text-neutral-900">
                PREMIUM SERVICE APARTMENTS
              </h1>
              <h2 className="text-section mb-6 text-2xl md:text-3xl text-neutral-900">
                Hospitality Interiors
              </h2>
              <p className="text-neutral-600 leading-relaxed font-normal text-base md:text-base">
                Engineering premium service apartments with a blend of luxury living and high-end commercial durability. We design spaces that offer both comfort and operational efficiency for long-stay patrons.
              </p>
              
              <div className="w-full mt-6 mb-6">
                <span className="text-badge md:text-sm text-[#324A61] block mb-3">
                  Service Apartment Metrics
                </span>
                <div className="grid grid-cols-3 gap-3 w-full mb-4">
                  <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-3 flex flex-col items-center text-center justify-center hover:bg-white hover:border-slate-300/30 transition-all duration-200">
                    <Lightbulb className="w-5 h-5 text-slate-800" />
                    <span className="text-neutral-900 font-bold text-sm mt-1.5">Smart Lighting</span>
                  </div>
                  <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-3 flex flex-col items-center text-center justify-center hover:bg-white hover:border-slate-300/30 transition-all duration-200">
                    <Users className="w-5 h-5 text-slate-800" />
                    <span className="text-neutral-900 font-bold text-sm mt-1.5">Space Optimization</span>
                  </div>
                  <div className="bg-slate-50/80 border border-slate-100 rounded-lg p-3 flex flex-col items-center text-center justify-center hover:bg-white hover:border-slate-300/30 transition-all duration-200">
                    <Sparkles className="w-5 h-5 text-slate-800" />
                    <span className="text-neutral-900 font-bold text-sm mt-1.5">Durable Finishes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-5 relative order-1 lg:order-2">
              <div className="relative z-10">
                <Image unoptimized={true}
                  quality={95}
      src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2000"
                  alt="Premium Service Apartment Interior"
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
      src="https://images.unsplash.com/photo-1502672260266-1c1de2d9d000?q=80&w=2000"
                alt="Service Apartment Layout"
                fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      
                className="object-cover"
              />
            </div>
            <div className="space-y-12">
              <div>
                <h3 className="text-card mb-4 text-[#0f172a] text-base md:text-base lg:text-lg text-neutral-900">
                  Functional Layouts
                </h3>
                <p className="text-neutral-600 leading-relaxed font-normal text-base md:text-base">
                  We maximize every square foot to provide comfortable living, dining, and sleeping areas within a unified space.
                </p>
              </div>
              <div>
                <h3 className="text-card mb-4 text-[#0f172a] text-base md:text-base lg:text-lg text-neutral-900">
                  Kitchenette Integration
                </h3>
                <p className="text-neutral-600 leading-relaxed font-normal text-base md:text-base">
                  Seamlessly designed modern kitchenettes that blend into the living space while offering full functionality.
                </p>
              </div>
              <div>
                <h3 className="text-card mb-4 text-[#0f172a] text-base md:text-base lg:text-lg text-neutral-900">
                  Durable Hospitality Finishes
                </h3>
                <p className="text-neutral-600 leading-relaxed font-normal text-base md:text-base">
                  High-performance materials chosen specifically for long-term stays, ensuring minimal wear and tear.
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
      src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2000" 
            alt="Hospitality CTA Background" 
            fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
       
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0f172a]/60 backdrop-blur-[2px]" />
        </div>
        <div className="site-container relative z-10">
          <h2 className="text-section mb-8 text-3xl md:text-4xl lg:text-5xl text-white max-w-4xl mx-auto">
            Start Your Service Apartment Project Today
          </h2>
          <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Get a Turnkey 3D Layout Consultation Worth ₹10,000. Our engineering team is ready to assist.
          </p>
          <ServiceCTA
            label="GET INSTANT ESTIMATE"
            category="Service Apartments"
          />
        </div>
      </section>
    </main>
  );
}
