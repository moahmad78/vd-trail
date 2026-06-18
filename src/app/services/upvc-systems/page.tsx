import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, ThermometerSnowflake, Volume2, Sun, Droplets,
  PenTool, Settings, Wrench, Building2, ShieldCheck, FileCheck, Check
} from "lucide-react";
import CTAV4 from "@/components/CTAV4";
import SlideUpFade from "@/components/animations/SlideUpFade";
import UpvcInquiryForm from "@/components/UpvcInquiryForm";
import StickyServiceNav from "@/components/StickyServiceNav";
import ServiceTestimonials from "@/components/ServiceTestimonials";

export const metadata: Metadata = {
  title: "UPVC Systems | Voomet Design",
  description:
    "Premium UPVC windows and doors solutions by Voomet Design. Energy-efficient, weather-resistant and acoustically optimized systems for residential and commercial projects.",
};

export default function UpvcSystemsPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 01 - HERO
      ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[100svh] lg:h-[calc(100vh-5rem)] min-h-[600px] flex flex-col justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2000"
            alt="Premium UPVC Windows and Doors"
            fill
            priority
            className="object-cover object-center brightness-105 contrast-[1.1]"
          />
          {/* Smooth Fade Gradient behind text only */}
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(3,16,48,0.82)] via-[rgba(3,16,48,0.50)] to-[rgba(3,16,48,0.05)]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col pt-12 md:pt-20">
          <div className="max-w-[650px]">
            <SlideUpFade>
              <span className="inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.25em] uppercase text-white/80 mb-6">
                <span className="h-px w-6 bg-white/80" />
                VOOMET DESIGN · ARCHITECTURAL SYSTEMS
              </span>
              <h1 className="text-[48px] md:text-[64px] lg:text-[76px] font-[700] text-white leading-[1.05] tracking-tight mb-4 drop-shadow-sm">
                UPVC Systems
              </h1>
              <h2 className="text-[20px] md:text-[24px] text-white/95 font-medium tracking-tight mb-6 leading-snug drop-shadow-sm">
                Energy-Efficient Windows &amp; Doors Solutions
              </h2>
              <p className="text-[15px] md:text-[17px] text-white/80 leading-relaxed mb-10 font-light">
                Delivering premium UPVC windows and doors engineered for thermal insulation, acoustic performance, weather resistance and long-term durability for residential and commercial projects.
              </p>

              {/* USP Tags */}
              <div className="flex flex-wrap gap-3 mb-10">
                {["Energy Efficient", "Sound Insulation", "Weather Resistant", "Low Maintenance", "Long Lifespan"].map((tag, i) => (
                  <span key={i} className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white/90 text-[11px] font-bold tracking-widest uppercase shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="group flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0B1633] font-bold uppercase tracking-widest text-[12px] rounded-full hover:bg-slate-50 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all duration-300">
                  Book Consultation
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link href="#specifications" className="group flex items-center justify-center gap-2 px-8 py-4 bg-[#0B1633]/40 backdrop-blur-md border border-white/20 text-white font-bold uppercase tracking-widest text-[12px] rounded-full hover:bg-[#0B1633]/60 hover:border-white/40 transition-all duration-300">
                  Request Technical Specification
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </SlideUpFade>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
          <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-[22px] h-[36px] border border-white/40 rounded-full flex justify-center p-1.5 relative">
            <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      <StickyServiceNav />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 02 - WHY CHOOSE VOOMETDESIGN
      ───────────────────────────────────────────────────────────── */}
      <section className="w-full py-24 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SlideUpFade>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Card 1 */}
              <div className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0B1633] mb-8 border border-slate-100">
                  <ThermometerSnowflake size={24} />
                </div>
                <h3 className="text-[18px] font-bold text-[#0B1633] mb-3">Energy Efficiency</h3>
                <p className="text-slate-600 leading-relaxed text-[14px]">Superior thermal insulation reducing energy consumption.</p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0B1633] mb-8 border border-slate-100">
                  <Volume2 size={24} />
                </div>
                <h3 className="text-[18px] font-bold text-[#0B1633] mb-3">Acoustic Comfort</h3>
                <p className="text-slate-600 leading-relaxed text-[14px]">Advanced sealing systems minimizing external noise.</p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0B1633] mb-8 border border-slate-100">
                  <Droplets size={24} />
                </div>
                <h3 className="text-[18px] font-bold text-[#0B1633] mb-3">Weather Protection</h3>
                <p className="text-slate-600 leading-relaxed text-[14px]">Designed to withstand harsh sun, rain and moisture.</p>
              </div>

              {/* Card 4 */}
              <div className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0B1633] mb-8 border border-slate-100">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-[18px] font-bold text-[#0B1633] mb-3">Low Maintenance</h3>
                <p className="text-slate-600 leading-relaxed text-[14px]">No corrosion, repainting or extensive upkeep required.</p>
              </div>
            </div>
          </SlideUpFade>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 03 - TECHNICAL ENGINEERING
      ───────────────────────────────────────────────────────────── */}
      <section id="specifications" className="w-full py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SlideUpFade>
            <div className="flex flex-col items-start mb-16">
              <span className="text-[12px] uppercase tracking-[0.25em] font-bold text-[#6E7D9B] mb-4 block">
                SPECIFICATIONS
              </span>
              <h2 className="text-[36px] md:text-[48px] font-[700] text-[#001B4E] leading-[1.1] tracking-tight">
                UPVC Engineering Excellence
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: "Multi-Chamber Profiles", stat: "5-Chamber UPVC Sections" },
                { label: "Double Glazing Compatibility", stat: "Up to 28mm DGU Support" },
                { label: "UV Resistant Frames", stat: "Weather-Stabilized PVC" },
                { label: "Airtight Sealing Systems", stat: "EPDM Triple Seal Gaskets" },
                { label: "Thermal Insulation Technology", stat: "U-Value ≤ 1.4 W/m²K" },
                { label: "Long-Term Durability", stat: "30+ Years Lifespan Rated" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col p-8 rounded-3xl bg-slate-50 border border-slate-200/60">
                  <span className="text-slate-500 text-[13px] font-bold uppercase tracking-widest mb-3">
                    {item.label}
                  </span>
                  <span className="text-[20px] font-bold text-[#0B1633] leading-snug">
                    {item.stat}
                  </span>
                </div>
              ))}
            </div>
          </SlideUpFade>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 04 - FEATURE HIGHLIGHTS
      ───────────────────────────────────────────────────────────── */}
      <section className="w-full py-24 bg-[#0B1633]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <SlideUpFade>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 border border-white/10 p-10 rounded-[32px]">
                <h3 className="text-white text-[24px] font-bold mb-4">Noise Reduction Systems</h3>
                <p className="text-white/70 leading-relaxed">
                  Enhanced acoustic insulation for peaceful interiors.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-10 rounded-[32px]">
                <h3 className="text-white text-[24px] font-bold mb-4">Thermal Performance</h3>
                <p className="text-white/70 leading-relaxed">
                  Maintains indoor comfort while reducing energy loss.
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-10 rounded-[32px]">
                <h3 className="text-white text-[24px] font-bold mb-4">Weather Resistance</h3>
                <p className="text-white/70 leading-relaxed">
                  Protection against moisture, dust and extreme climate conditions.
                </p>
              </div>
            </div>
          </SlideUpFade>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 05 - EXECUTION PROCESS
      ───────────────────────────────────────────────────────────── */}
      <section className="w-full py-24 md:py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <SlideUpFade>
            <div className="text-center mb-16 md:mb-24">
              <span className="text-[12px] uppercase tracking-[0.25em] font-bold text-[#6E7D9B] mb-4 block">
                PROCESS
              </span>
              <h2 className="text-[36px] md:text-[48px] font-[700] text-[#001B4E] leading-[1.1] tracking-tight">
                How We Deliver Perfection
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-y-16 md:gap-y-16 lg:gap-4 relative w-full">
              {[
                { num: "01", title: "Site Assessment", icon: PenTool, desc: "Detailed on-site evaluation of window and door openings." },
                { num: "02", title: "Profile Selection", icon: Settings, desc: "Choosing the right UPVC profiles and glazing specifications." },
                { num: "03", title: "Technical Measurements", icon: Wrench, desc: "Precision measurements for perfect fit and airtight installation." },
                { num: "04", title: "Manufacturing & Fabrication", icon: Building2, desc: "Factory-controlled cutting, welding and hardware assembly." },
                { num: "05", title: "Installation & Sealing", icon: ShieldCheck, desc: "Expert installation with multi-point sealing and calibration." },
                { num: "06", title: "Quality Inspection & Handover", icon: FileCheck, desc: "Performance testing and full documentation package." },
              ].map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="group flex flex-col items-center text-center relative z-10">
                    {/* Desktop Connecting Line */}
                    {i < 5 && (
                      <div className="hidden lg:block absolute top-[28px] left-[50%] w-full h-[1px] bg-[#001B4E]/20 z-0" />
                    )}
                    {/* Tablet Connecting Line */}
                    {i % 3 !== 2 && i < 5 && (
                      <div className="hidden md:block lg:hidden absolute top-[28px] left-[50%] w-full h-[1px] bg-[#001B4E]/20 z-0" />
                    )}
                    {/* Mobile Connecting Line */}
                    {i < 5 && (
                      <div className="md:hidden absolute top-[56px] left-[50%] w-[1px] h-[calc(100%+4rem)] bg-[#001B4E]/20 z-0 -translate-x-1/2" />
                    )}

                    <div className="w-[56px] h-[56px] bg-white border border-[#001B4E]/20 rounded-full flex items-center justify-center text-[#001B4E] mb-5 relative group-hover:border-[#001B4E] group-hover:bg-[#001B4E] group-hover:text-white transition-all duration-300 shadow-sm z-10">
                      <Icon size={20} />
                      {/* Hover Tooltip */}
                      <div className="absolute top-[100%] mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[#001B4E] text-white text-[12px] font-medium p-3 rounded-lg w-[180px] shadow-xl z-50">
                        {step.desc}
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#001B4E] rotate-45" />
                      </div>
                    </div>
                    <span className="text-[#001B4E]/60 font-bold tracking-[0.2em] text-[11px] mb-2">{step.num}</span>
                    <h3 className="text-[14px] font-[600] text-[#001B4E] leading-[1.3] max-w-[130px]">{step.title}</h3>
                  </div>
                );
              })}
            </div>
          </SlideUpFade>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 05b - TESTIMONIALS
      ───────────────────────────────────────────────────────────── */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12">
        <ServiceTestimonials testimonials={[
          { clientName: "Anand Constructions", projectType: "UPVC Systems · Chennai", quote: "The UPVC windows delivered by Voomet Design have made a noticeable difference in our home's acoustic comfort. Completely silent indoors. The thermal performance in summer has been remarkable." },
          { clientName: "Sunrise Apartments", projectType: "Residential Complex · Pune", quote: "We equipped all 48 apartments with Voomet UPVC systems. The quality is consistent throughout and the installation team was highly professional, completing the project without a single delay." },
          { clientName: "Green Valley Residences", projectType: "Luxury Housing · Mumbai", quote: "Voomet's UPVC door systems are simply outstanding — watertight, thermally efficient and visually premium. Our homeowners have been delighted since day one of occupancy." }
        ]} />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 06 - LEAD GENERATION
      ───────────────────────────────────────────────────────────── */}
      <section className="w-full py-16 md:py-24 bg-[#FAFAF8] relative">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row w-full min-h-[500px] bg-white rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.05)] relative">
            {/* LEFT PANEL */}
            <div className="w-full lg:w-[42%] relative flex flex-col justify-center p-8 md:p-10 lg:p-12 text-white min-h-[300px] lg:min-h-[500px]">
              <div className="absolute inset-0 z-0">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2000"
                  alt="UPVC Window Installation"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,27,78,0.80)" }} />
                {/* Seamless gradient blend into right form panel */}
                <div className="hidden lg:block absolute inset-y-0 right-0 w-[60px] bg-gradient-to-r from-transparent to-white z-10" />
                <div className="block lg:hidden absolute inset-x-0 bottom-0 h-[60px] bg-gradient-to-t from-transparent to-white z-10" />
              </div>

              <div className="relative z-20">
                <SlideUpFade>
                  <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-white/70 mb-3 block">
                    TECHNICAL CONSULTATION
                  </span>
                  <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-[700] leading-[1.1] tracking-tight mb-3">
                    UPVC System Consultation
                  </h2>
                  <p className="text-[14px] md:text-[15px] text-white/80 leading-[1.6] mb-6 max-w-[400px]">
                    Our experts will recommend the most suitable UPVC window and door solutions based on your project requirements.
                  </p>

                  <div className="flex flex-col gap-2.5">
                    {[
                      "Energy Performance Guidance",
                      "Custom Profile Selection",
                      "Pan-India Installation",
                    ].map((point, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                          <Check size={12} className="text-white" />
                        </div>
                        <span className="text-white/90 font-medium tracking-wide text-[13px]">{point}</span>
                      </div>
                    ))}
                  </div>
                </SlideUpFade>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="w-full lg:w-[58%] bg-white flex items-center justify-center p-6 md:p-10 lg:p-12 relative z-20">
              <SlideUpFade delay={0.1} className="w-full max-w-2xl">
                <UpvcInquiryForm />
              </SlideUpFade>
            </div>
          </div>
        </div>
      </section>

    
    </main>
  );
}
