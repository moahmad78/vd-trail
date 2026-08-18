// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Terms of Service | VoometDesign & Fabrication",
  description:
    "Read the Terms of Service for VoometDesign & Fabrication. Understand your rights and responsibilities when using our services.",
  alternates: {
    canonical: "https://voometdesign.com/terms",
  },
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "By accessing the website of VoometDesign (voometdesign.com) or engaging our interior design, styling, and turnkey execution services, you agree to be legally bound by these Terms of Service. If you do not agree, please discontinue use immediately.",
    ],
  },
  {
    title: "2. Scope of Services",
    content: [
      "VoometDesign provides high-end interior architecture, spatial planning, 3D visualization, material procurement, and complete site turnkey execution for residential, commercial, and hospitality projects. Precise deliverables, timelines, and square footage measurements are strictly governed by individual signed project contracts.",
    ],
  },
  {
    title: "3. Payment, Execution & Client Requisitions",
    content: [
      "All projects progress based on milestone-based payment structures specified in your design quotation. Turnkey execution begins strictly upon clear down-payments, finalized material selections, and formal approval of architectural drawings. The client must ensure timely approvals to avoid structural delivery delays.",
    ],
  },
  {
    title: "4. Intellectual Property",
    content: [
      "All architectural blueprints, unique furniture concepts, custom 3D renders, and digital layouts developed by VoometDesign remain our exclusive intellectual property. Renderings and photographs of executed project sites may be used in our professional portfolio and marketing material unless explicitly restricted via written non-disclosure agreements.",
    ],
  },
  {
    title: "5. Limitation of Liability",
    content: [
      "VoometDesign partners with leading material vendors and manufacturers. While we guarantee top-tier turnkey supervision and execution quality control, external manufacturer warranties on materials (e.g., specific plywood, laminates, fixtures) are directly passed to the client. VoometDesign is not liable for structural changes made post handover without our direct supervision.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Premium Hero Header */}
      <section className="bg-[#0f172a] text-white pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
        {/* Subtle mesh background */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800/30 via-[#0f172a] to-[#0f172a] z-0"></div>
        
        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="max-w-3xl">
            <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-slate-400 block mb-4">
              Legal Documentation
            </span>
            <h1 className="text-[clamp(40px,5vw,64px)] font-[700] leading-[1.05] tracking-tight mb-6">
              Terms of Service
            </h1>
            <p className="text-slate-300 text-[16px] md:text-[18px] leading-relaxed max-w-2xl mb-8">
              Please read these Terms carefully before engaging with VoometDesign & Fabrication. By proceeding, you acknowledge and accept all conditions stated herein.
            </p>
            <div className="inline-block border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm rounded-full px-4 py-1.5">
              <p className="text-slate-400 text-[13px] font-medium tracking-wide">
                Last Updated: July 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content layout with Sidebar */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
          
          {/* Sticky Sidebar (Table of Contents) */}
          <aside className="lg:w-1/4 shrink-0 hidden lg:block">
            <div className="sticky top-32">
              <h3 className="text-[14px] font-bold tracking-[0.15em] uppercase text-slate-400 mb-6 border-b border-slate-100 pb-4">
                Contents
              </h3>
              <nav className="flex flex-col gap-4">
                {sections.map((section, idx) => (
                  <Link 
                    key={idx} 
                    href={`#section-${idx}`}
                    className="text-[14px] text-slate-600 hover:text-[#0f172a] transition-colors font-medium hover:translate-x-1 transform duration-300"
                  >
                    {section.title}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content Flow */}
          <div className="lg:w-3/4 max-w-3xl">
            <div className="space-y-16">
              {sections.map((section, i) => (
                <div key={i} id={`section-${i}`} className="scroll-mt-32">
                  <h2 className="text-[22px] md:text-[26px] font-bold text-[#0B1633] mb-6 tracking-tight">
                    {section.title}
                  </h2>
                  <div className="space-y-5">
                    {section.content.map((para, j) => (
                      <p key={j} className="text-slate-600 text-[16px] md:text-[17px] leading-[1.8] font-[400]">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Premium Glassmorphism CTA */}
            <div className="mt-24 relative overflow-hidden rounded-3xl border border-slate-200/60 bg-gradient-to-br from-slate-50 to-white p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100/50 rounded-full blur-3xl -mr-20 -mt-20"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                <div className="max-w-md">
                  <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-6 mx-auto md:mx-0 border border-slate-100">
                    <Mail size={20} className="text-[#0f172a]" />
                  </div>
                  <h3 className="text-[20px] font-bold text-[#0B1633] mb-3 tracking-tight">
                    Questions About These Terms?
                  </h3>
                  <p className="text-slate-500 text-[15px] leading-relaxed">
                    Our legal and client relations team is happy to clarify any aspect of these Terms before you engage our services.
                  </p>
                </div>
                
                <div className="shrink-0 flex flex-col items-center md:items-end gap-3">
                  <Link
                    href="/contact"
                    className="group flex items-center gap-2 bg-[#0f172a] text-white text-[14px] font-semibold tracking-wide uppercase px-8 py-4 rounded-full hover:bg-slate-800 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Contact Us
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                  <a href="mailto:legal@voometdesign.com" className="text-[13px] text-slate-400 hover:text-[#0f172a] font-medium transition-colors">
                    legal@voometdesign.com
                  </a>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-center lg:justify-start gap-6 text-[13px] text-slate-400 font-bold tracking-wide uppercase">
              <Link href="/privacy" className="hover:text-[#0f172a] transition-colors">
                Privacy Policy
              </Link>
              <span className="text-slate-200">|</span>
              <Link href="/" className="hover:text-[#0f172a] transition-colors">
                Back to Home
              </Link>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
