import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2, ShieldCheck, Check, Maximize2,
  Layers, ArrowRight, Award, PenTool, Wrench, PackageCheck,
  Sparkles, Shield
} from "lucide-react";
import CTAV4 from "@/components/CTAV4";
import SystemInquiryForm from "@/components/SystemInquiryForm";
import StickyServiceNav from "@/components/StickyServiceNav";
import AltechTrustBadge from "@/components/AltechTrustBadge";
import ExpertiseHero from "@/components/ExpertiseHero";
import FacadeProjectsSlider from "@/components/FacadeProjectsSlider";
import AltechClientMarquee from "@/components/AltechClientMarquee";
import { BreadcrumbSchema, ServiceSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Facades & Glazing in Bangalore | Architectural Glass & Systems | VOOMET",
  description:
    "Structural glazing, unitized curtain wall systems, spider glazing, and architectural facades engineered and installed by VOOMET and Altech Enterprises in Bangalore.",
  alternates: {
    canonical: "https://voometdesign.com/services/facades-glazing",
  },
  openGraph: {
    title: "Facades & Glazing in Bangalore | Architectural Glass & Systems | VOOMET",
    description: "Structural glazing, unitized curtain wall systems, and architectural facades engineered in Bangalore.",
    url: "https://voometdesign.com/services/facades-glazing",
  }
};

const FACADE_OFFERINGS = [
  {
    title: "Unitized Curtain Walls",
    desc: "Factory-assembled modular panel systems providing rapid on-site installation and superior weatherproofing.",
    icon: Building2,
  },
  {
    title: "Spider Glazing Systems",
    desc: "High-tensile stainless steel spider fittings and articulated bolts for uninterrupted frameless glass vistas.",
    icon: Maximize2,
  },
  {
    title: "Structural Glazing",
    desc: "Flush silicone-bonded double-glazed glass facades offering sleek lines and outstanding acoustic control.",
    icon: ShieldCheck,
  },
  {
    title: "Glass & Spider Canopies",
    desc: "Architectural cantilevered entrance canopies and overhead glazing built for high wind and live loads.",
    icon: Sparkles,
  },
  {
    title: "SS Railing Systems",
    desc: "Precision-welded 304/316 grade stainless steel and glass balustrades with continuous monolithic rigidity.",
    icon: Shield,
  },
  {
    title: "ACP & HPL Cladding",
    desc: "Durable aluminium composite panels and high-pressure laminates engineered for weather-resistant exterior skins.",
    icon: Layers,
  },
];

const DELIVERY_STEPS = [
  {
    icon: PenTool,
    title: "Façade Engineering & Design",
    desc: "Structural calculations, wind-load analysis, and 3D extrusion profiling tailored to project parameters.",
  },
  {
    icon: Wrench,
    title: "Precision CNC Fabrication",
    desc: "Factory-controlled double-glazed unit (DGU) assembly, curtain wall unitization, and quality testing at Altech Enterprises.",
  },
  {
    icon: PackageCheck,
    title: "Turnkey Site Installation",
    desc: "Clinical site mounting, structural silicone weather sealing, acoustic testing, and 10-year warranty coverage.",
  },
];

export default function FacadesGlazingPage() {
  return (
    <main className="w-full bg-white text-[#0F172A] selection:bg-slate-900 selection:text-white">
      <BreadcrumbSchema 
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Facades & Glazing", url: "/services/facades-glazing" }
        ]} 
      />
      <ServiceSchema 
        name="Facades & Glazing Solutions in Bangalore"
        serviceType="Architectural Facades & Glazing"
        description="Structural glazing, unitized curtain wall systems, spider glazing, and architectural facades engineered and installed by VOOMET and Altech Enterprises in Bangalore."
        url="/services/facades-glazing"
      />
      {/* 1. HERO */}
      <ExpertiseHero
        badge="OUR EXPERTISE • FABRICATION PARTNER"
        title="Facades & Glazing Solutions"
        description="Premium architectural glass and facade systems engineered in-house by Altech Enterprises, delivering unmatched structural integrity, thermal efficiency, and striking visual impact."
        heroImage="/images/hero/facade-glazing-hero.jpg"
        features={[
          { title: "Unitized Curtain Walls", description: "Modular factory-assembled panel systems", iconName: "Building2" },
          { title: "Spider Glazing", description: "Minimalist point-fixed frameless vistas", iconName: "Maximize2" },
          { title: "Structural Glazing", description: "Silicone-bonded double-glazed facades", iconName: "ShieldCheck" },
          { title: "ACP & HPL Cladding", description: "Weather-resistant exterior skins", iconName: "Layers" },
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
        secondaryCtaText="Explore Aluminium Hub"
        secondaryCtaHref="/services/aluminium-systems"
      />

      <AltechTrustBadge variant="compact" />
      <StickyServiceNav />

      {/* 2. BRIEF INTRO & 3. COMMERCIAL FACADE OFFERINGS */}
      <section className="w-full py-14 md:py-20 bg-[#FAFAF8] border-y border-slate-200/60">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="md:w-3/5">
              <span className="text-[12px] uppercase tracking-[0.25em] font-bold text-[#6E7D9B] mb-2 block">
                COMMERCIAL EXPERTISE
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#0F172A] tracking-tight leading-[1.1]">
                Commercial Facade Solutions
              </h2>
            </div>
            <div className="md:w-2/5 md:text-right">
              <p className="text-sm md:text-base text-slate-600 leading-relaxed font-normal">
                Engineered for structural strength, energy efficiency, weather resistance, and striking architectural statements.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FACADE_OFFERINGS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-[2rem] bg-[#FFFFFF] border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
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
                    <span>SYSTEM #{String(idx + 1).padStart(2, "0")}</span>
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

      {/* 5. COMPLETED PROJECTS SLIDER */}
      <FacadeProjectsSlider title="Flagship Executed Projects" />

      {/* 6. CLIENT & ASSOCIATE LOGO MARQUEE */}
      <AltechClientMarquee className="border-t border-slate-100" />

      {/* 7. INQUIRY FORM */}
      <section id="inquiry" className="w-full py-14 md:py-20 bg-[#FAFAF8] relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row w-full min-h-[480px] bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-200/80">
            <div className="w-full lg:w-[42%] relative flex flex-col justify-center p-8 md:p-10 text-white bg-[#0F172A]">
              <div className="relative z-10">
                <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-slate-400 mb-3 block">
                  TECHNICAL CONSULTATION
                </span>
                <h2 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight mb-3 text-white">
                  Facade &amp; Glazing Consultation
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  Consult with Altech Enterprises engineering specialists for structural glazing, curtain wall sizing, and site feasibility.
                </p>

                <div className="space-y-3">
                  {[
                    "Wind Load & Structural Calculation",
                    "CNC Fabrication & Quality Verification",
                    "Pan-India Turnkey Facade Execution",
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
                <SystemInquiryForm slug="facades-glazing" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER / CTA */}
      <CTAV4 />
    </main>
  );
}
