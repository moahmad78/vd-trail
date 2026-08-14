import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Building2, ShieldCheck, Check, Maximize2,
  Layers, ArrowRight, Award, PenTool, Wrench, PackageCheck
} from "lucide-react";
import CTAV4 from "@/components/CTAV4";
import UpvcInquiryForm from "@/components/UpvcInquiryForm";
import StickyServiceNav from "@/components/StickyServiceNav";
import AltechTrustBadge from "@/components/AltechTrustBadge";
import ExpertiseHero from "@/components/ExpertiseHero";
import FacadeProjectsSlider from "@/components/FacadeProjectsSlider";
import AltechClientMarquee from "@/components/AltechClientMarquee";

export const metadata: Metadata = {
  title: "uPVC Systems | Voomet Design & Altech Enterprises",
  description:
    "Energy-efficient, durable, and acoustically optimized uPVC windows, glass partitions, and shower enclosures fabricated in-house by Altech Enterprises.",
};

const UPVC_OFFERINGS = [
  {
    title: "uPVC Window Systems",
    desc: "Multi-chamber uPVC assemblies with fusion-welded corners, thermal barriers, and precision acoustic sealing.",
    icon: Maximize2,
  },
  {
    title: "Internal Glass Partitions",
    desc: "Sleek uPVC and glass partition systems for modern interiors, providing acoustic privacy while preserving open daylight.",
    icon: Layers,
  },
  {
    title: "Shower Enclosures",
    desc: "Water-tight, corrosion-resistant uPVC and toughened glass shower cubicles engineered for contemporary bathrooms.",
    icon: ShieldCheck,
  },
];

const DELIVERY_STEPS = [
  {
    icon: PenTool,
    title: "Acoustic & Thermal Design",
    desc: "Multi-chamber profile calculations and noise-reduction profiling (up to 45dB attenuation).",
  },
  {
    icon: Wrench,
    title: "Fusion-Welded Fabrication",
    desc: "Precision corner welding and toughened safety glass integration at Altech Enterprises.",
  },
  {
    icon: PackageCheck,
    title: "Clinical Installation",
    desc: "Seamless site mounting, weather-seal verification, and 10-year warranty assurance.",
  },
];

export default function UpvcSystemsPage() {
  return (
    <main className="w-full bg-white text-[#0F172A] selection:bg-slate-900 selection:text-white">
      {/* 1. HERO */}
      <ExpertiseHero
        badge="OUR EXPERTISE • FABRICATION PARTNER"
        title="Precision-Engineered uPVC Systems"
        description="High-performance uPVC windows, acoustic internal partitions, and custom shower enclosures built for durability, superior thermal insulation, and enhanced ventilation."
        heroImage="/images/Services-card/upvc.webp"
        features={[
          { title: "uPVC Window Systems", description: "Multi-chamber thermal insulation", iconName: "Maximize2" },
          { title: "Glass Partitions", description: "Acoustic privacy with open light", iconName: "Layers" },
          { title: "Shower Enclosures", description: "Water-tight corrosion-resistant seals", iconName: "ShieldCheck" },
          { title: "10-Year Warranty", description: "Fusion-welded corner durability", iconName: "Award" },
        ]}
        stats={[
          { value: "250+", label: "Executed Projects", iconName: "Building2" },
          { value: "25+", label: "Years of Expertise", iconName: "Award" },
          { value: "10+", label: "Years Warranty", iconName: "ShieldCheck" },
        ]}
        tagline={{
          prefix: "Fabricated in-house by",
          highlight: "Altech Enterprises",
          suffix: " for Voomet Design.",
        }}
        primaryCtaText="Book Consultation"
        primaryCtaHref="#inquiry"
        secondaryCtaText="Explore Facade Hub"
        secondaryCtaHref="/services/facades-glazing"
      />

      <AltechTrustBadge variant="compact" />
      <StickyServiceNav />

      {/* 2. BRIEF INTRO & 3. WHY CHOOSE (OFFERINGS & ADVANTAGES) */}
      <section className="w-full py-14 md:py-20 bg-[#FAFAF8] border-y border-slate-200/60">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="md:w-3/5">
              <span className="text-[12px] uppercase tracking-[0.25em] font-bold text-[#6E7D9B] mb-2 block">
                OUR ADVANTAGE
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#0F172A] tracking-tight leading-[1.1]">
                Why Choose Our uPVC Systems
              </h2>
            </div>
            <div className="md:w-2/5 md:text-right">
              <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                Built for multi-chamber thermal efficiency, noise reduction, weather-tight sealing, and long-term durability.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {UPVC_OFFERINGS.map((item, idx) => {
              const Icon = item.icon;
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
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                    <span>PRODUCT #{String(idx + 1).padStart(2, "0")}</span>
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

      {/* 5. PORTFOLIO LINK BANNER (FULL PORTFOLIO LIVES ON FACADES-GLAZING) */}
      <section className="w-full py-10 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="rounded-3xl bg-[#0F172A] p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-slate-400 mb-2 block">
                FULL PORTFOLIO &amp; CLIENTELE
              </span>
              <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight mb-1">
                Looking for Commercial Facades &amp; Flagship Projects?
              </h3>
              <p className="text-slate-300 text-sm max-w-xl">
                View our unitized curtain walls, structural glazing, 250+ project portfolio, client roster, and material partners on the Facade Hub.
              </p>
            </div>
            <Link
              href="/services/facades-glazing"
              className="px-6 py-3.5 rounded-full bg-white text-[#0F172A] font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-all shrink-0 flex items-center gap-2 shadow-lg group"
            >
              <span>View Commercial Facade Hub</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5.5. COMPLETED PROJECTS & CLIENT LOGO MARQUEE */}
      <FacadeProjectsSlider title="Flagship Executed Projects" />
      <AltechClientMarquee className="border-t border-slate-100" />

      {/* 6. INQUIRY FORM */}
      <section id="inquiry" className="w-full py-14 md:py-20 bg-[#FAFAF8] relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row w-full min-h-[480px] bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-200/80">
            <div className="w-full lg:w-[42%] relative flex flex-col justify-center p-8 md:p-10 text-white bg-[#0F172A]">
              <div className="relative z-10">
                <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-slate-400 mb-3 block">
                  TECHNICAL CONSULTATION
                </span>
                <h2 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight mb-3 text-white">
                  uPVC System Consultation
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Get in touch with our team for dimension sizing, noise reduction requirements, and custom uPVC configurations.
                </p>

                <div className="space-y-3">
                  {[
                    "Multi-chamber profile thermal calculation",
                    "Acoustic gasket sealing & sound reduction options",
                    "Direct factory fabrication & guaranteed timeline",
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
                <UpvcInquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER / CTA */}
      <CTAV4 />
    </main>
  );
}

