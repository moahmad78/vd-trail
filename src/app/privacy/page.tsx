// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Voomet Design & Fabrication",
  description:
    "Voomet Design & Fabrication's Privacy Policy — learn how we collect, use, protect, and manage your personal data.",
  alternates: {
    canonical: "https://voometdesign.com/privacy",
  },
};

type Section = {
  title: string;
  content: string[];
  bullets?: string[];
  after?: string[];
};

const sections: Section[] = [
  {
    title: "1. Information We Collect",
    content: [
      "When you fill out consultation forms, sign up for site analysis, or interact with our digital dashboards, we collect personal details including your Name, Phone Number, Email Address, Project Location/City, and the Approximate Area in Square Feet (sqft) of your property.",
    ],
  },
  {
    title: "2. How We Use Your Data",
    content: [
      "Your property square footage, preferences, and details are used strictly to provide accurate pricing estimates, generate specialized custom design quotes, coordinate site distributions, and establish fast, secure communication channels via phone or WhatsApp for project updates.",
    ],
  },
  {
    title: "3. Data Security & Storage",
    content: [
      "We treat your residential and commercial property layouts with the highest degree of confidentiality. Your contact information and floor plans are stored securely and are never shared, leased, or sold to third-party marketing companies.",
    ],
  },
  {
    title: "4. Contact & Opt-Out",
    content: [
      "If you have any questions regarding how your data is managed during your active interior project or wish to update your details, you can seamlessly connect with the Voomet Design team through our official communication portals.",
    ],
  },
];

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-slate-300 text-[16px] md:text-[18px] leading-relaxed max-w-2xl mb-8">
              Your privacy is fundamental to how we operate. This policy explains clearly and transparently how VoometDesign collects, uses, and protects your personal information.
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
                    
                    {section.bullets && (
                      <ul className="space-y-3 mt-4 ml-2">
                        {section.bullets.map((bullet, j) => {
                          const [boldText, ...rest] = bullet.split(":");
                          return (
                            <li key={j} className="flex items-start gap-4 text-slate-600 text-[16px] md:text-[17px] leading-[1.8]">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2.5 shrink-0"></span>
                              <span>
                                {rest.length > 0 ? (
                                  <>
                                    <strong className="text-slate-900 font-[600]">{boldText}:</strong>
                                    {rest.join(":")}
                                  </>
                                ) : (
                                  bullet
                                )}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                    
                    {section.after?.map((para, j) => (
                      <p key={`after-${j}`} className="text-slate-700 text-[16px] md:text-[17px] leading-[1.8] font-[500] border-l-2 border-slate-200 pl-5 mt-6">
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
                    Privacy Questions or Data Requests?
                  </h3>
                  <p className="text-slate-500 text-[15px] leading-relaxed">
                    Contact our Data Protection Officer directly. We are committed to responding to all privacy-related requests within 30 days.
                  </p>
                </div>
                
                <div className="shrink-0 flex flex-col items-center md:items-end gap-3">
                  <Link
                    href="mailto:legal@voometdesign.com"
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
              <Link href="/terms" className="hover:text-[#0f172a] transition-colors">
                Terms of Service
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
