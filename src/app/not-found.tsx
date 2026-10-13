// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
import Link from "next/link";
import { ArrowLeft, Home, Compass, Briefcase, Phone, BookOpen } from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found | VoometDesign Bangalore",
  description: "The page you are looking for might have been moved, removed, or is temporarily unavailable. Explore VoometDesign interior design services, portfolio, and contact details.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  const helpfulLinks = [
    { label: "Home Page", href: "/", icon: Home, desc: "Return to our main showcase" },
    { label: "Interior Services", href: "/services", icon: Compass, desc: "Explore residential & commercial design" },
    { label: "Our Portfolio", href: "/designs", icon: Briefcase, desc: "View executed luxury projects" },
    { label: "Design Insights", href: "/blog", icon: BookOpen, desc: "Read guides & interior trends" },
    { label: "Contact Studio", href: "/contact", icon: Phone, desc: "Book a complimentary consultation" },
  ];

  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-[#030712] text-white px-6 py-24 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#324A61]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl w-full text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-slate-300 mb-6">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          Error 404 • Resource Not Found
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-white">
          Space Not Found
        </h1>

        <p className="text-slate-400 text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          The page or blueprint you are searching for might have been reorganized, renamed, or is temporarily unavailable.
        </p>

        {/* Helpful links grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 text-left">
          {helpfulLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-start gap-3.5 p-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-[#324A61] transition-all duration-200"
              >
                <div className="p-2.5 rounded-lg bg-white/5 group-hover:bg-[#324A61] text-slate-300 group-hover:text-white transition-colors shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                    {item.label}
                  </div>
                  <div className="text-xs text-slate-400 truncate">
                    {item.desc}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Direct return button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-slate-950 hover:bg-slate-200 font-semibold text-sm transition-all shadow-lg shadow-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Homepage
        </Link>
      </div>
    </main>
  );
}
