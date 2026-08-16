import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { 
  Building2, Home, Hotel, GraduationCap, ShieldCheck, 
  Wrench, CheckCircle2, ArrowRight, Phone, MessageSquare, 
  MapPin, Clock, Award, Layers, Sparkles, Sliders
} from "lucide-react";
import SlideUpFade from "@/components/animations/SlideUpFade";
import CTAV4 from "@/components/CTAV4";
import { FAQSchema, BreadcrumbSchema, ServiceSchema } from "@/components/seo/JsonLd";
import { projectsData } from "@/data/projectsData";

export const metadata: Metadata = {
  title: "Interior Designers in Bangalore | Luxury & Turnkey Interiors | VOOMET",
  description: "VOOMET is a Bangalore-based interior design company delivering premium residential, commercial, hospitality and turnkey interior solutions with design, execution and manufacturing expertise.",
  alternates: {
    canonical: "https://voometdesign.com/interior-designers-bangalore",
  },
  openGraph: {
    title: "Interior Designers in Bangalore | Luxury & Turnkey Interiors | VOOMET",
    description: "VOOMET is a Bangalore-based interior design company delivering premium residential, commercial, hospitality and turnkey interior solutions with design, execution and manufacturing expertise.",
    url: "https://voometdesign.com/interior-designers-bangalore",
    type: "website",
    images: [
      {
        url: "/images/hero/herovideo-poster.webp",
        width: 1200,
        height: 630,
        alt: "VOOMET Interior Designers in Bangalore",
      },
    ],
  },
};

const BANGALORE_SERVICES = [
  {
    title: "Commercial & Office Interiors",
    description: "High-performance tech workspaces, agile corporate headquarters, and enterprise office fit-outs engineered for productivity and collaboration.",
    link: "/services/commercial-interiors",
    icon: Building2,
    badge: "Enterprise & Tech Hubs",
    stats: "150+ Workspaces Delivered"
  },
  {
    title: "Luxury Residential Interiors",
    description: "Bespoke interior design for premium villas, penthouses, and gated community apartments across Bangalore with custom in-house joinery.",
    link: "/services/residential-interiors",
    icon: Home,
    badge: "Villas & Penthouses",
    stats: "200+ Luxury Homes"
  },
  {
    title: "Hospitality & Boutique Hotels",
    description: "Distinctive guest experiences, boutique hotel rooms, and lifestyle environments crafted with durable commercial-grade materials.",
    link: "/services/boutique-hotels",
    icon: Hotel,
    badge: "Hotels & Stays",
    stats: "50+ Hospitality Spaces"
  },
  {
    title: "Educational Institutions",
    description: "Modern, acoustic-engineered learning campuses, smart classrooms, and university hubs built for safety and curriculum focus.",
    link: "/services/educational-institutions",
    icon: GraduationCap,
    badge: "Campuses & Studios",
    stats: "50+ Educational Projects"
  },
  {
    title: "Aluminium Doors & Windows",
    description: "Precision-engineered slimline aluminium sliding systems, casements, and structural profiles fabricated in our local manufacturing unit.",
    link: "/services/aluminium-systems",
    icon: Sliders,
    badge: "In-House Fabrication",
    stats: "Factory Precision"
  },
  {
    title: "Wooden Door Systems & Joinery",
    description: "100% in-house manufactured flush doors, veneered panels, fire-rated acoustic doors, and custom architectural woodwork.",
    link: "/services/wooden-door-systems",
    icon: Layers,
    badge: "Bespoke Woodwork",
    stats: "20+ Yrs Carpentry Legacy"
  }
];

const BANGALORE_LOCALITIES = [
  {
    name: "Whitefield",
    focus: "IT Corridors, Tech Parks & High-Rise Luxury Apartments",
    description: "Specialized in fast-track tech office fit-outs and expansive residential interiors across Whitefield's gated communities."
  },
  {
    name: "Koramangala",
    focus: "Startup Headquarters, Commercial Hubs & Boutique Residences",
    description: "Agile, modern workspaces and premium private residences tailored to Koramangala's energetic entrepreneurial district."
  },
  {
    name: "Indiranagar",
    focus: "Luxury Independent Homes, Cafes & Commercial Studios",
    description: "High-end bespoke residential joinery and aesthetic commercial studios reflecting Indiranagar's refined architectural character."
  },
  {
    name: "HSR Layout",
    focus: "Tech Workspaces, Co-living Environments & Villas",
    description: "Ergonomic modern office environments, co-living layouts, and modern family villas throughout HSR Sectors."
  },
  {
    name: "Electronic City",
    focus: "Large-Scale Enterprise Facilities & Modern Apartments",
    description: "Turnkey enterprise fit-outs and residential interiors with robust MEP coordination and long-term durability."
  },
  {
    name: "Jayanagar & JP Nagar",
    focus: "Heritage & Contemporary Family Homes & Boutiques",
    description: "Warm, custom wooden joinery and timeless interior spaces engineered for multi-generational South Bangalore residences."
  },
  {
    name: "Hebbal & Yelahanka",
    focus: "North Bangalore Penthouses, Villas & Institutional Campuses",
    description: "Expansive luxury villa fit-outs, educational facilities, and panoramic high-rise residential glazing."
  },
  {
    name: "Sadashivanagar",
    focus: "Bespoke High-End Estates & Luxury Mansions",
    description: "Exclusive, discreet interior design and execution with rare marble, custom veneers, and precision architectural systems."
  }
];

const FAQS = [
  {
    question: "What makes VOOMET one of the best interior designers in Bangalore?",
    answer: "Unlike design-only agencies that outsource execution to third-party contractors, VOOMET controls the entire value chain. We operate our own dedicated joinery and aluminium fabrication unit in Doddaballapura, backed by 20+ years of industry experience and 250+ delivered projects. This guarantees exact material specifications, zero contractor markups, and strict milestone delivery."
  },
  {
    question: "What is the typical cost of interior design and execution in Bangalore?",
    answer: "Interior costs depend on project typology, carpet area, and specifications. For commercial office spaces, turnkey fit-outs typically range from ₹1,800 to ₹3,500+ per sq. ft. depending on HVAC, MEP, and acoustic requirements. For luxury residential projects, custom turnkey solutions range from ₹2,200 to ₹4,500+ per sq. ft. We provide a transparent, 100% itemized Bill of Quantities (BOQ) before project commencement."
  },
  {
    question: "How long does a turnkey interior project take in Bangalore?",
    answer: "A standard 8,000–15,000 sq. ft. commercial office fit-out typically takes 45 to 75 working days from design sign-off. A luxury 3BHK or villa residential interior typically spans 60 to 90 days. Because we pre-manufacture modular woodwork, doors, and aluminium systems in our factory, on-site installation time is minimized."
  },
  {
    question: "Does VOOMET handle both design and on-site turnkey execution?",
    answer: "Yes. VOOMET is a complete turnkey design-and-build firm. We handle conceptual spatial planning, 3D visualization, civil modifications, MEP coordination, factory joinery fabrication, electrical & lighting, false ceilings, and final handover under a single point of accountability."
  },
  {
    question: "Can VOOMET handle large-scale commercial and corporate office projects?",
    answer: "Yes. We have designed and executed flagship workspaces for enterprise and hyper-growth brands across Bangalore including Zluri (12,500 sq. ft.), Physics Wallah (15,000 sq. ft.), Apps For Bharat (8,200 sq. ft.), QpiAI (9,000 sq. ft.), and Happey (10,200 sq. ft.)."
  },
  {
    question: "Do you have in-house manufacturing capabilities in Bangalore?",
    answer: "Yes. VOOMET operates an in-house manufacturing and fabrication facility located at Doddaballapura Industrial Area, Bangalore. We engineer custom wooden door systems, modular joinery, aluminium window profiles, and architectural glazing under strict factory quality control."
  },
  {
    question: "How do we get started with a consultation for our Bangalore project?",
    answer: "You can book a consultation through our website form, call our team directly at +91-9845014279, or connect with us via WhatsApp. We arrange an initial site inspection, understand your layout and timeline requirements, and provide a comprehensive proposal."
  }
];

export default function BangaloreInteriorDesignersPage() {
  const featuredProjects = projectsData.slice(0, 6);

  return (
    <main className="relative bg-white pt-24 pb-12">
      {/* Schema Structured Data */}
      <BreadcrumbSchema 
        items={[
          { name: "Home", url: "/" },
          { name: "Interior Designers in Bangalore", url: "/interior-designers-bangalore" }
        ]} 
      />
      <ServiceSchema 
        name="Interior Designers in Bangalore"
        serviceType="Interior Design & Turnkey Fit-Outs"
        description="VOOMET is a Bangalore-based interior design company delivering luxury residential, commercial, hospitality and turnkey interior solutions with in-house execution and manufacturing."
        url="/interior-designers-bangalore"
      />
      <FAQSchema faqs={FAQS} />

      {/* 1. HERO SECTION */}
      <section className="relative px-6 md:px-12 max-w-[1440px] mx-auto pt-12 pb-16 md:py-20">
        <SlideUpFade>
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-6">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              Bengaluru Studio & Manufacturing Unit
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0f172a] mb-6 leading-[1.08]">
              Interior Designers in Bangalore for Luxury, Commercial & Turnkey Interiors
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mb-8">
              VOOMET is an established Bangalore interior design and turnkey execution company. Backed by 20+ years of industry experience, 250+ completed projects, and our own local manufacturing facility, we deliver high-performance commercial workspaces, luxury residences, and institutional spaces with total accountability.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 border-t border-slate-200">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 20+ Years Industry Legacy
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 250+ Delivered Projects
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> In-House Factory Execution
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Itemized BOQ
              </div>
            </div>
          </div>
        </SlideUpFade>
      </section>

      {/* 2. THE EXECUTION DIFFERENTIATOR */}
      <section className="bg-[#0f172a] text-white py-20 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <SlideUpFade>
            <div className="max-w-3xl mb-14">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 block mb-3">
                The VOOMET Advantage
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                A Bangalore Interior Design Company Built Around Design & Execution
              </h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                Most interior design firms in Bangalore are conceptual studios that outsource execution to fragmented third-party contractors. VOOMET operates differently. We combine architectural design with our own heavy-duty joinery and aluminium manufacturing plant in Doddaballapura, ensuring the space built matches the 3D renders with zero compromise.
              </p>
            </div>
          </SlideUpFade>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <SlideUpFade delay={0.1}>
              <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">In-House Manufacturing</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Custom wooden door systems, architectural millwork, and aluminium window systems crafted in our Bangalore facility with CNC precision.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Zero Outsourcing
                </div>
              </div>
            </SlideUpFade>

            <SlideUpFade delay={0.2}>
              <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Turnkey Accountability</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    A single accountable partner from 3D conceptualization and MEP coordination to site civil work, finishing, and final handover.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Single Point of Contact
                </div>
              </div>
            </SlideUpFade>

            <SlideUpFade delay={0.3}>
              <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Milestone-Driven Timelines</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Structured project management with off-site pre-fabrication reduces on-site disruption and delivers commercial fit-outs on time.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  On-Time Handover
                </div>
              </div>
            </SlideUpFade>

            <SlideUpFade delay={0.4}>
              <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Transparent Commercials</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Comprehensive, 100% itemized Bill of Quantities (BOQ). Clear material specifications with zero hidden costs or surprise escalations.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  100% Transparent BOQ
                </div>
              </div>
            </SlideUpFade>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES IN BANGALORE */}
      <section className="py-20 px-6 md:px-12 max-w-[1440px] mx-auto">
        <SlideUpFade>
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 block mb-3">
              Specialized Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0f172a] mb-4">
              Our Interior Design Expertise
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Explore our core sector expertise across commercial, residential, hospitality, educational, and architectural building systems.
            </p>
          </div>
        </SlideUpFade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BANGALORE_SERVICES.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <SlideUpFade key={srv.title} delay={idx * 0.05}>
                <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group hover:border-slate-900">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                        {srv.badge}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#0f172a] mb-3 group-hover:text-amber-600 transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {srv.description}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">{srv.stats}</span>
                    <Link 
                      href={srv.link} 
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0f172a] hover:text-amber-600 transition-colors"
                    >
                      Explore Service <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </SlideUpFade>
            );
          })}
        </div>
      </section>

      {/* 4. REAL BANGALORE PROJECTS DELIVERED */}
      <section className="bg-slate-50 py-20 px-6 md:px-12 border-y border-slate-200">
        <div className="max-w-[1440px] mx-auto">
          <SlideUpFade>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 block mb-3">
                  Verified Project Portfolio
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0f172a] mb-4">
                  Interior Projects in Bangalore
                </h2>
                <p className="text-gray-600 text-base md:text-lg">
                  Real workspaces and facilities designed and executed by VOOMET with full project transparency.
                </p>
              </div>
              <Link
                href="/designs"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0f172a] text-white text-sm font-semibold hover:bg-slate-800 transition-colors shrink-0"
              >
                View All Projects <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </SlideUpFade>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, idx) => (
              <SlideUpFade key={project.id} delay={idx * 0.05}>
                <Link
                  href={`/work/${project.id}`}
                  className="group block bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                >
                  <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                    <Image
                      src={project.heroImage}
                      alt={`${project.title} interior design in Bangalore`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-slate-950/70 px-2.5 py-1 rounded backdrop-blur-md">
                        {project.specs.area}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-xl font-bold text-[#0f172a] mb-1 group-hover:text-amber-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-3">
                        {project.descriptor}
                      </p>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900">
                      <span>View Case Study</span>
                      <ArrowRight className="w-4 h-4 text-amber-600 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </SlideUpFade>
            ))}
          </div>
        </div>
      </section>

      {/* 5. AREAS WE SERVE ACROSS BANGALORE */}
      <section className="py-20 px-6 md:px-12 max-w-[1440px] mx-auto">
        <SlideUpFade>
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 block mb-3">
              Geographic Coverage
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0f172a] mb-4">
              Serving Bangalore &amp; Surrounding Areas
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              VOOMET executes residential, commercial, and turnkey projects across all prominent Bangalore neighborhoods and commercial zones.
            </p>
          </div>
        </SlideUpFade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BANGALORE_LOCALITIES.map((loc, idx) => (
            <SlideUpFade key={loc.name} delay={idx * 0.04}>
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-slate-900 hover:shadow-md transition-all h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                    <h3 className="text-lg font-bold text-[#0f172a]">{loc.name}</h3>
                  </div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    {loc.focus}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {loc.description}
                  </p>
                </div>
              </div>
            </SlideUpFade>
          ))}
        </div>
      </section>

      {/* 6. OUR DESIGN & EXECUTION PROCESS */}
      <section className="bg-slate-900 text-white py-20 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <SlideUpFade>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400 block mb-3">
                Proven Methodology
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Our 4-Step Interior Design & Execution Process
              </h2>
              <p className="text-slate-300 text-base md:text-lg">
                Engineered for clarity, timeline certainty, and factory-level precision from day one.
              </p>
            </div>
          </SlideUpFade>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <SlideUpFade delay={0.1}>
              <div className="border border-slate-800 bg-slate-950/60 p-8 rounded-2xl relative">
                <span className="text-4xl font-extrabold text-amber-500/30 mb-4 block">01</span>
                <h3 className="text-xl font-bold text-white mb-3">Discovery & Spatial Analysis</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  On-site inspection, lifestyle and workflow mapping, budget parameters, and regulatory review across Bangalore communities.
                </p>
              </div>
            </SlideUpFade>

            <SlideUpFade delay={0.2}>
              <div className="border border-slate-800 bg-slate-950/60 p-8 rounded-2xl relative">
                <span className="text-4xl font-extrabold text-amber-500/30 mb-4 block">02</span>
                <h3 className="text-xl font-bold text-white mb-3">3D Concepts & Detailed BOQ</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Photorealistic 3D visualization, detailed MEP drawings, material board curation, and 100% itemized pricing before site work.
                </p>
              </div>
            </SlideUpFade>

            <SlideUpFade delay={0.3}>
              <div className="border border-slate-800 bg-slate-950/60 p-8 rounded-2xl relative">
                <span className="text-4xl font-extrabold text-amber-500/30 mb-4 block">03</span>
                <h3 className="text-xl font-bold text-white mb-3">Factory Pre-Fabrication</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Precision woodwork, door systems, and aluminium window systems engineered in our Doddaballapura manufacturing facility.
                </p>
              </div>
            </SlideUpFade>

            <SlideUpFade delay={0.4}>
              <div className="border border-slate-800 bg-slate-950/60 p-8 rounded-2xl relative">
                <span className="text-4xl font-extrabold text-amber-500/30 mb-4 block">04</span>
                <h3 className="text-xl font-bold text-white mb-3">Turnkey Site Fit-Out & Handover</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Clinical on-site installation, lighting integration, quality testing, and on-schedule handover backed by structural warranty.
                </p>
              </div>
            </SlideUpFade>
          </div>
        </div>
      </section>

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 px-6 md:px-12 max-w-[1440px] mx-auto">
        <SlideUpFade>
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 block mb-3">
              Clear Answers
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0f172a] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Everything you need to know about working with VOOMET on your Bangalore interior design project.
            </p>
          </div>
        </SlideUpFade>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FAQS.map((faq, idx) => (
            <SlideUpFade key={faq.question} delay={idx * 0.04}>
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200/80 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#0f172a] mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </SlideUpFade>
          ))}
        </div>
      </section>

      {/* 8. CONSULTATION CTA */}
      <CTAV4 />
    </main>
  );
}
