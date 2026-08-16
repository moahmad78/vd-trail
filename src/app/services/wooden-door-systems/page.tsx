import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  DoorClosed, ShieldCheck, Check, Sparkles, Sliders, Layers,
  Hammer, Trees, Wrench, Building2, Flame, Award, ArrowRight, PenTool, PackageCheck
} from "lucide-react";
import CTAV4 from "@/components/CTAV4";
import WoodenDoorInquiryForm from "@/components/WoodenDoorInquiryForm";
import StickyServiceNav from "@/components/StickyServiceNav";
import ExpertiseHero from "@/components/ExpertiseHero";
import { BreadcrumbSchema, ServiceSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Wooden Door Systems in Bangalore | In-House Joinery | VOOMET",
  description:
    "Bespoke wooden door systems and architectural joinery crafted 100% in-house in Bangalore with 20+ years of carpentry legacy, flush doors, and certified fire-rated doors.",
  alternates: {
    canonical: "https://voometdesign.com/services/wooden-door-systems",
  },
  openGraph: {
    title: "Wooden Door Systems in Bangalore | In-House Joinery | VOOMET",
    description: "Bespoke wooden door systems crafted 100% in-house in Bangalore with 20+ years of carpentry legacy.",
    url: "https://voometdesign.com/services/wooden-door-systems",
  }
};

const VALUE_PILLARS = [
  {
    title: "100% In-House Fabrication",
    desc: "Zero outsourcing. Every door is engineered and assembled in our dedicated joinery facility for absolute quality control.",
    icon: Hammer,
  },
  {
    title: "BWR Marine Plywood Core",
    desc: "Boiling Water Resistant core material delivering superior termite defense, moisture resilience, and structural density.",
    icon: ShieldCheck,
  },
  {
    title: "Kiln-Dried Hardwood Framing",
    desc: "Precision moisture calibration ensures long-term dimensional stability with zero warping or seasonal contraction.",
    icon: Trees,
  },
  {
    title: "10-Year Structural Warranty",
    desc: "Every system is backed by comprehensive warranty coverage for structural joinery, core bonding, and finish longevity.",
    icon: Award,
  },
];

const DELIVERY_STEPS = [
  {
    icon: Trees,
    title: "Timber Seasoning & Kiln Drying",
    desc: "Moisture-controlled seasoning ensuring zero warping or expansion over time.",
  },
  {
    icon: Layers,
    title: "BWR Core Pressing & CNC Milling",
    desc: "Factory hydraulic hot-pressing and millimeter-accurate CNC hardware routing.",
  },
  {
    icon: PackageCheck,
    title: "Multi-Coat Finishing & Fitting",
    desc: "Multi-layer PU sealer topcoating, clinical site installation, and frame plumb verification.",
  },
];

export default function WoodenDoorSystemsPage() {
  return (
    <main className="w-full bg-white text-[#0F172A] selection:bg-slate-900 selection:text-white">
      <BreadcrumbSchema 
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Wooden Door Systems", url: "/services/wooden-door-systems" }
        ]} 
      />
      <ServiceSchema 
        name="Wooden Door Systems in Bangalore"
        serviceType="Wooden Door Systems & Joinery"
        description="Bespoke wooden door systems and architectural joinery crafted 100% in-house in Bangalore with 20+ years of carpentry legacy, flush doors, and certified fire-rated doors."
        url="/services/wooden-door-systems"
      />
      {/* 1. HERO */}
      <ExpertiseHero
        badge="OUR EXPERTISE • IN-HOUSE JOINERY"
        title="Bespoke Wooden Door Systems"
        description="100% in-house factory joinery and master carpentry, built on 20+ years of woodworking legacy. From flush doors and veneered panels to certified fire-rated doors."
        heroImage="/images/hero/wooden-door-hero.jpg"
        features={[
          { title: "In-House Joinery", description: "Zero outsourcing, dedicated facility", iconName: "Hammer" },
          { title: "BWR Marine Core", description: "Termite-defense & moisture resilience", iconName: "ShieldCheck" },
          { title: "Kiln-Dried Hardwood", description: "Zero warping or dimensional change", iconName: "Trees" },
          { title: "10-Year Warranty", description: "Comprehensive structural coverage", iconName: "Award" },
        ]}
        stats={[
          { value: "200+", label: "Projects Completed", iconName: "Building2" },
          { value: "20+", label: "Years Legacy", iconName: "Award" },
          { value: "100%", label: "In-House Woodwork", iconName: "Hammer" },
        ]}
        tagline={{
          prefix: "Master carpentry crafted by",
          highlight: "Voomet Joinery Works",
          suffix: " with zero outsourcing.",
        }}
        primaryCtaText="Book Consultation"
        primaryCtaHref="#inquiry"
        secondaryCtaText="Explore Capabilities"
        secondaryCtaHref="#why-choose"
      />

      <StickyServiceNav />

      {/* 2. BRIEF INTRO & 3. WHY CHOOSE */}
      <section id="why-choose" className="w-full py-14 md:py-20 bg-[#FAFAF8] border-y border-slate-200/60">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="md:w-3/5">
              <span className="text-[12px] uppercase tracking-[0.25em] font-bold text-[#6E7D9B] mb-2 block">
                OUR ADVANTAGE
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#0F172A] tracking-tight leading-[1.1]">
                Why Choose Our Wooden Doors
              </h2>
            </div>
            <div className="md:w-2/5 md:text-right">
              <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                Engineered with boiling-water-resistant cores, kiln-dried seasoned timber, and medical-grade manufacturing accuracy.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUE_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-[2rem] bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#0F172A]/5 text-[#0F172A] group-hover:bg-[#0F172A] group-hover:text-white flex items-center justify-center mb-5 transition-colors duration-300">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-[#0F172A] mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                    <span>PILLAR 0{idx + 1}</span>
                    <Check size={16} className="text-slate-400 group-hover:text-[#0F172A]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. HOW WE DELIVER */}
      <section className="w-full py-14 md:py-20 bg-white border-b border-slate-200/60">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="md:w-1/2">
              <span className="text-[12px] uppercase tracking-[0.25em] font-bold text-[#6E7D9B] mb-2 block">
                EXECUTION WORKFLOW
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#0F172A] tracking-tight leading-[1.1]">
                How We Deliver
              </h2>
            </div>
            <div className="md:w-1/2 md:text-right">
              <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                End-to-end manufacturing and clinical installation standards ensuring zero structural compromises.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DELIVERY_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between group hover:bg-white hover:shadow-md transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center shadow-sm">
                        <Icon size={22} />
                      </div>
                      <span className="text-2xl font-black text-slate-300 font-mono">
                        0{idx + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold text-[#0F172A] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. INQUIRY FORM */}
      <section id="inquiry" className="w-full py-14 md:py-20 bg-[#FAFAF8] relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row w-full min-h-[480px] bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-200/80">
            <div className="w-full lg:w-[42%] relative flex flex-col justify-center p-8 md:p-10 text-white bg-[#0F172A]">
              <div className="relative z-10">
                <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-slate-400 mb-3 block">
                  BESPOKE JOINERY
                </span>
                <h2 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight mb-3 text-white">
                  Wooden Door Consultation
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Discuss door sizing, veneer matching, hardware integration, and fire-rating compliance directly with our master carpentry team.
                </p>

                <div className="space-y-3">
                  {[
                    "100% In-house factory timber selection & cutting",
                    "Custom veneer matching & natural grain alignment",
                    "Certified installation & 10-year structural warranty",
                  ].map((point, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <Check size={12} className="text-white" />
                      </div>
                      <span className="text-slate-200 text-xs md:text-sm">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[58%] bg-white flex items-center justify-center p-6 md:p-10 relative z-10">
              <div className="w-full max-w-2xl">
                <WoodenDoorInquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER / CTA */}
      <CTAV4 />
    </main>
  );
}

