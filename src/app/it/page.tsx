import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Code2, Smartphone, Search, Video, ShieldCheck, Zap, Layers, Sparkles, ExternalLink, ArrowRight } from "lucide-react";
import BrandsSection from "@/components/BrandsSection";

export const metadata: Metadata = {
  title: "IT & Digital Technology Solutions | Cyber Design House by VoometDesign Bangalore",
  description:
    "Cyber Design House is the enterprise technology and digital growth arm of VoometDesign. Sub-second web development, native 60FPS mobile apps, AI technical SEO, and performance marketing in Bangalore.",
  keywords: [
    "VoometDesign IT",
    "Cyber Design House",
    "IT Company Bangalore",
    "Web Development Bangalore",
    "App Development Bangalore",
    "Technical SEO Bangalore",
    "Enterprise Software Bangalore",
  ],
  alternates: {
    canonical: "https://voometdesign.com/it",
  },
  openGraph: {
    title: "Cyber Design House | Technology Partner by VoometDesign",
    description:
      "Enterprise web engineering, mobile apps, and technical SEO from VoometDesign's technology arm in Bangalore.",
    url: "https://voometdesign.com/it",
    siteName: "VoometDesign",
  },
};

const SERVICES = [
  {
    icon: Code2,
    tag: "01 / WEB ARCHITECTURE",
    title: "High-Performance Web & Cloud Platforms",
    description: "Next.js 16, React 19, and serverless edge runtimes delivering sub-second Largest Contentful Paint (LCP) and 98+ Google Lighthouse scores.",
    chips: ["Next.js", "TypeScript", "Tailwind CSS", "Edge CDN", "SaaS Frontends"],
  },
  {
    icon: Smartphone,
    tag: "02 / MOBILE APPS",
    title: "Native 60–120 FPS Mobile Applications",
    description: "Flutter & React Native architectures with offline SQLite caching, biometric security, and fluid hardware-accelerated animations for iOS and Android.",
    chips: ["Flutter", "React Native", "iOS / Swift", "Android / Kotlin"],
  },
  {
    icon: Search,
    tag: "03 / TECHNICAL SEO & AI",
    title: "Entity Schema Graphs & AI Search Optimization",
    description: "Deep JSON-LD entity mapping, crawl budget streamlining, and generative search visibility across Google, Perplexity, and ChatGPT.",
    chips: ["JSON-LD Graphs", "AI Search (GEO)", "Google Core Web Vitals", "CAPI"],
  },
  {
    icon: Video,
    tag: "04 / PERFORMANCE MARKETING",
    title: "Creator Playbooks & Performance Ad Funnels",
    description: "Structured creator briefs, whitelisted Meta ad boosting, and high-converting landing pages delivering 3.4x validated ROAS.",
    chips: ["Creator Briefs", "Meta Whitelisting", "High-Ticket Funnels", "Attribution"],
  },
];

export default function ITGatewayPage() {
  const cyberFormUrl = "https://cyberdesignhous.vercel.app/?consultation=open";
  const cyberWebsiteUrl = "https://cyberdesignhous.vercel.app";

  return (
    <main className="bg-slate-50 min-h-screen pt-4 sm:pt-6 pb-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* HERO SECTION */}
        <div className="bg-gradient-to-br from-[#071633] via-[#0B1E45] to-[#040D1F] text-white rounded-3xl p-6 sm:p-10 lg:p-14 mb-12 shadow-xl border border-slate-800 relative overflow-hidden">
          {/* Subtle Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-mono uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Technology &amp; Digital Growth Arm</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
              Cyber Design House
              <span className="block text-2xl sm:text-3xl lg:text-4xl text-blue-300 font-semibold mt-1">
                Technology with the Precision of an Architectural Studio.
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mb-8">
              Founded under the design intelligence of VoometDesign (Est. 2010), Cyber Design House engineers high-performance web applications, native mobile apps, and technical search growth systems for forward-thinking enterprises.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href={cyberFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Book Consultation &amp; Open Form</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href={cyberWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm tracking-wide inline-flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Explore Cyber Website</span>
                <ExternalLink className="w-4 h-4 text-slate-300" />
              </a>

              <Link
                href="/contact"
                className="px-5 py-3.5 rounded-xl text-slate-300 hover:text-white text-xs sm:text-sm font-semibold tracking-wide inline-flex items-center gap-1.5 transition-colors"
              >
                <span>VoometDesign Contact</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Badges Bar */}
            <div className="mt-10 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>100% Source Code &amp; IP Ownership</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Sub-2s Speed &amp; 60FPS Performance</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Zero Recurring Vendor Lock-In</span>
              </div>
            </div>
          </div>
        </div>

        {/* CLIENT BRANDS SECTION (Same 12 Logos as VoometDesign) */}
        <div className="mb-14">
          <BrandsSection />
        </div>

        {/* 4 CORE DISCIPLINES GRID */}
        <div className="mb-16">
          <div className="mb-8">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#324A61] block mb-1.5">
              ENGINEERING DISCIPLINES
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              Enterprise Technology Pillars
            </h2>
            <p className="text-sm text-neutral-600 mt-1 max-w-xl">
              Precision engineering applied across digital touchpoints to eliminate technical debt and drive measurable revenue.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#071633]">
                        <Icon className="w-5 h-5 text-[#324A61]" />
                      </div>
                      <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[#6E7D9B]">
                        {srv.tag}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2 leading-snug">
                      {srv.title}
                    </h3>

                    <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-6">
                      {srv.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {srv.chips.map((chip, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-neutral-700 text-[11px] font-mono font-medium"
                      >
                        #{chip}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CALL TO ACTION BOX */}
        <div className="bg-[#0f172a] text-white p-8 sm:p-12 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400 block mb-2">
              BANGALORE STUDIO CONSULTATION
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-snug">
              Have an Enterprise Product or Platform in Mind?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Book a direct architectural review with our principal systems lead. All leads are logged directly with guaranteed 24h response from our Yelahanka studio.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="https://wa.me/919845014279?text=Hello%20VoometDesign%20IT%20Team%2C%20I%20would%20like%20to%20discuss%20a%20software%2Fweb%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider text-center transition-colors shadow-md"
            >
              WhatsApp Us (+91 98450 14279)
            </a>
            <a
              href={cyberFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider text-center transition-colors shadow-md inline-flex items-center justify-center gap-1.5"
            >
              <span>Open Cyber IT Form</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
