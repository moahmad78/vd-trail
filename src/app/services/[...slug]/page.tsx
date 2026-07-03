// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
// Dynamic service route — handles all slugs not covered by static folders.
// Static routes (/residential, /hospitality, /educational, /aluminium) take
// priority in Next.js App Router and are unaffected by this file.

export const dynamic = 'force-dynamic';
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import {
  Home, Sparkles, BookOpen, Briefcase, Settings,
  ShieldCheck, Package, LayoutTemplate, Check, Minus,
  PenTool, Search, Key, Lightbulb, Clock,
  GlassWater, Users, BadgeCheck, Volume2, Wrench,
  ArrowRight, ArrowUpRight
} from "lucide-react";
import CTAV4 from "@/components/CTAV4";
import SystemInquiryForm from "@/components/SystemInquiryForm";
import ServiceUSPTabs from "@/components/ServiceUSPTabs";
import FeatureComparison from "@/components/FeatureComparison";
import StickyServiceNav from "@/components/StickyServiceNav";
import ServiceTestimonials from "@/components/ServiceTestimonials";
import Link from "next/link";
import { TESTIMONIALS } from "@/data/testimonials";
import ResidentialGallery from "@/components/ResidentialGallery";
import HospitalityGallery from "@/components/HospitalityGallery";
import EducationGallery from "@/components/EducationGallery";
import CommercialGallery from "@/components/CommercialGallery";

/* ─── Type Definitions ──────────────────────────────────────────────── */

interface ComparisonRow {
  feature: string;
  standard: string | boolean;
  premium: string | boolean;
  luxury: string | boolean;
}

interface PerfectionStep {
  icon: string;
  title: string;
  description: string;
}

interface ValuePillar {
  icon: string;
  heading: string;
  copy: string;
}

interface FeatureBlock {
  heading: string;
  copy: string;
  chip: string;
}

interface USPTab {
  id: string;
  label: string;
  content: string;
}

interface Testimonial {
  clientName: string;
  projectType: string;
  quote: string;
}

interface ServiceData {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  featureImage: string;
  heroBadges: string[];
  whyChooseVoomet: {
    icon: any;
    title: string;
    description: string;
  }[];
  featureBlocks: FeatureBlock[];
  comparisonRows: ComparisonRow[];
  perfectionSteps: PerfectionStep[];
  uspTabs: USPTab[];
  testimonials: Testimonial[];
  ctaHeadline: string;
  ctaCopy: string;
  ctaCategory: string;
  videoSrc?: string;
  metaTitle: string;
  metaDescription: string;
  commercialSystems?: { title: string; desc: string; }[];
  capabilities?: string[];
  fenestrationDescription?: string;
}

/* ─── Service Data Matrix ───────────────────────────────────────────── */

const SERVICE_DATA: Record<string, ServiceData> = {

  /* ── RESIDENTIAL ─────────────────────────────────────────────────── */
  "residential-interiors": {
    title: "Residential Interiors",
    subtitle: "Residential Interiors",
    description: "Creating elegant and personalized homes that balance comfort, aesthetics and practical living through thoughtful design and craftsmanship.",
    heroImage: "/images/Services-card/residential.png",
    featureImage: "/images/Services-card/residential.png",
    heroBadges: [],
    whyChooseVoomet: [
      { icon: PenTool, title: "Custom Home Design", description: "Bespoke architectural layouts." },
      { icon: Sparkles, title: "Premium Material Selection", description: "Curated luxury finishes." },
      { icon: LayoutTemplate, title: "Functional Space Planning", description: "Intelligent spatial flows." },
      { icon: ShieldCheck, title: "Dedicated Project Management", description: "End-to-end luxury execution." }
    ],
    featureBlocks: [],
    comparisonRows: [],
    perfectionSteps: [
      { icon: "📐", title: "Design", description: "Understanding your lifestyle brief and mapping space parameters." },
      { icon: "🪵", title: "Material Selection", description: "Curating premium finishes, custom joinery, and architectural elements." },
      { icon: "⚡", title: "Installation", description: "Rigorous turnkey structural implementation overseen by expert site in-charges." }
    ],
    uspTabs: [
      { id: "tab1", label: "Personalized Design", content: "" },
      { id: "tab2", label: "Premium Finishes", content: "" },
      { id: "tab3", label: "Space Optimization", content: "" },
      { id: "tab4", label: "End-to-End Execution", content: "" }
    ],
    testimonials: [
      { clientName: "Rajesh Mehra", projectType: "Residential Interiors · Mumbai", quote: "Voomet Design transformed our home into a work of art. Every detail was considered — from the material selection to the final installation. Exceptional quality." },
      { clientName: "Priya Sharma", projectType: "Luxury Villa · Pune", quote: "We are thrilled with the results. The team delivered exactly what they promised, on time and with incredible attention to detail. Highly recommend." }
    ],
    ctaHeadline: "Every Great Home Begins With A Conversation.",
    ctaCopy: "From bespoke layouts to turnkey execution, we craft homes designed around your lifestyle.",
    ctaCategory: "Residential Interiors",
    metaTitle: "Residential Interiors | VOOMETDESIGN — Premium Custom Homes",
    metaDescription: "Creating elegant and personalized homes that balance comfort, aesthetics and practical living through thoughtful design.",
  },

  /* ── COMMERCIAL INTERIORS ────────────────────────────────────────── */
  "commercial-interiors": {
    title: "Commercial Interiors",
    subtitle: "Commercial Interiors",
    description: "Designing high-performance workplaces, offices, retail spaces and business environments that combine functionality, brand identity and long-term durability.",
    heroImage: "/images/Services-card/education.png",
    featureImage: "/images/Services-card/education.png",
    heroBadges: [],
    whyChooseVoomet: [
      { icon: LayoutTemplate, title: "Workspace Planning", description: "Strategic layouts for efficiency." },
      { icon: Sparkles, title: "Brand-Focused Design", description: "Reflecting identity and purpose." },
      { icon: ShieldCheck, title: "Premium Materials", description: "Durable, high-performance finishes." },
      { icon: Settings, title: "Turnkey Execution", description: "Single-team accountable delivery." }
    ],
    featureBlocks: [],
    comparisonRows: [],
    perfectionSteps: [
      { icon: "📊", title: "Planning", description: "Headcount mapping, departmental adjacency studies, and workflow optimization." },
      { icon: "🪵", title: "Procurement", description: "Sourcing commercial-grade, heavy-duty certified materials." },
      { icon: "⚡", title: "Execution", description: "Phased construction minimizing downtime so your business never fully halts." }
    ],
    uspTabs: [
      { id: "tab1", label: "Precision Execution", content: "" },
      { id: "tab2", label: "Material Excellence", content: "" },
      { id: "tab3", label: "Dedicated Supervision", content: "" },
      { id: "tab4", label: "Pan-India Delivery", content: "" }
    ],
    testimonials: [
      { clientName: "Vikram Industries", projectType: "Commercial Interiors · Hyderabad", quote: "Our new office is a reflection of our brand identity. Voomet Design understood our vision and executed it flawlessly. Our team productivity has visibly improved." },
      { clientName: "Meena Retail Group", projectType: "Retail Space · Bengaluru", quote: "The workspace Voomet Design built for us has received countless compliments from clients and partners. A truly premium outcome at competitive rates." }
    ],
    ctaHeadline: "EVERY PRODUCTIVE WORKSPACE BEGINS WITH STRATEGY.",
    ctaCopy: "Building environments that empower businesses through intelligent planning.",
    ctaCategory: "Commercial Interiors",
    metaTitle: "Commercial Interiors | VOOMETDESIGN — High-Performance Workspaces",
    metaDescription: "Designing high-performance workplaces, offices, and business environments.",
  },

  /* ── UPVC SYSTEMS ────────────────────────────────────────────────── */
  "upvc-systems": {
    title: "UPVC Systems",
    subtitle: "UPVC Systems",
    description: "High-performance UPVC window and door solutions engineered for energy efficiency, acoustic comfort and long-term durability.",
    heroImage: "/images/Services-card/upvc.png",
    featureImage: "/images/Services-card/upvc.png",
    heroBadges: [],
    whyChooseVoomet: [
      { icon: LayoutTemplate, title: "Premium Profiles", description: "Maximum structural rigidity." },
      { icon: Sparkles, title: "Energy Saving Systems", description: "Advanced thermal breaks." },
      { icon: Volume2, title: "Acoustic Performance", description: "Absolute interior serenity." },
      { icon: ShieldCheck, title: "Long-Term Reliability", description: "Zero-maintenance durability." }
    ],
    featureBlocks: [],
    comparisonRows: [],
    perfectionSteps: [
      { icon: "📐", title: "Technical Survey", description: "Precision laser measurements and structural load assessments." },
      { icon: "⚙️", title: "Profile Fabrication", description: "Millimeter-accurate CNC processing at our facility." },
      { icon: "🏗️", title: "Installation", description: "Factory-trained crews deploy systems with strict leveling verification." },
      { icon: "✅", title: "Quality Testing", description: "On-site acoustic and thermal verification." }
    ],
    uspTabs: [
      { id: "tab1", label: "Thermal Efficiency", content: "" },
      { id: "tab2", label: "Sound Insulation", content: "" },
      { id: "tab3", label: "Low Maintenance", content: "" },
      { id: "tab4", label: "Weather Resistance", content: "" }
    ],
    testimonials: [
      { clientName: "Anand Constructions", projectType: "UPVC Systems · Chennai", quote: "The UPVC windows delivered by Voomet Design have made a noticeable difference in our home's acoustic comfort. Completely silent indoors. Excellent installation." },
      { clientName: "Sunrise Apartments", projectType: "Residential Complex · Pune", quote: "We equipped all 48 apartments with Voomet UPVC systems. The quality is consistent throughout and the installation team was highly professional." }
    ],
    ctaHeadline: "EVERY FLAWLESS EXECUTION BEGINS WITH PRECISION.",
    ctaCopy: "Delivering engineering excellence through in-house manufacturing.",
    ctaCategory: "UPVC Systems",
    metaTitle: "UPVC Systems | VOOMETDESIGN — Precision Engineered Windows",
    metaDescription: "High-performance UPVC window and door solutions engineered for energy efficiency and acoustic comfort.",
  },

  /* ── BOUTIQUE HOTELS / HOSPITALITY ─────────────────────────────── */
  "boutique-hotels": {
    title: "Hospitality Interiors",
    subtitle: "Hospitality Interiors",
    description: "Crafting memorable guest experiences through luxury hospitality environments, boutique hotels, resorts and serviced accommodations.",
    heroImage: "/images/Services-card/hotel.png",
    featureImage: "/images/Services-card/hotel.png",
    heroBadges: [],
    whyChooseVoomet: [
      { icon: Sparkles, title: "Boutique Hotels", description: "Signature thematic environments." },
      { icon: LayoutTemplate, title: "Service Apartments", description: "High-yield transit layouts." },
      { icon: Home, title: "Resort Spaces", description: "Immersive architectural retreats." },
      { icon: Settings, title: "Hospitality Execution", description: "Rapid turnkey deployment." }
    ],
    featureBlocks: [],
    comparisonRows: [],
    perfectionSteps: [
      { icon: "🎨", title: "Concept", description: "Establishing the core experiential narrative and luxury vision." },
      { icon: "👁️", title: "Guest Experience", description: "Layered sensory design ensuring guests experience ultimate comfort." },
      { icon: "⚡", title: "Fit-Out", description: "Flawless site integration by master craftsmen and white-glove handover." }
    ],
    uspTabs: [
      { id: "tab1", label: "Guest-Centric Design", content: "" },
      { id: "tab2", label: "Luxury Finishes", content: "" },
      { id: "tab3", label: "Hospitality Expertise", content: "" },
      { id: "tab4", label: "Seamless Delivery", content: "" }
    ],
    testimonials: [
      { clientName: "The Azure Boutique Hotel", projectType: "Hospitality Interiors · Goa", quote: "Our hotel's transformation is breathtaking. Voomet Design understood the boutique luxury aesthetic we envisioned and delivered beyond expectations." },
      { clientName: "Horizon Resorts", projectType: "Resort Interiors · Kerala", quote: "Working with Voomet Design was seamless. They understood the resort experience we wanted to create and delivered world-class interiors on schedule." }
    ],
    ctaHeadline: "EVERY UNFORGETTABLE STAY BEGINS WITH A VISION.",
    ctaCopy: "Design world-class boutique environments that define luxury hospitality.",
    ctaCategory: "Boutique Hotels",
    metaTitle: "Hospitality Interiors | VOOMETDESIGN — Luxury Hotels & Resorts",
    metaDescription: "Crafting memorable guest experiences through luxury hospitality environments and boutique hotels.",
  },
  
  /* Fallbacks for menu routes */
  "service-apartments": {
    title: "Service Apartments",
    subtitle: "Service Apartments",
    description: "Premium service apartments designed for extended stays, combining the luxury of a hotel with the comfort and functionality of a home.",
    heroImage: "/Design/hospitality/h2.jpeg",
    featureImage: "/Design/hospitality/h2.jpeg",
    heroBadges: [],
    whyChooseVoomet: [
      { icon: LayoutTemplate, title: "Functional Layouts", description: "Optimized for long-term living." },
      { icon: Home, title: "Home-like Comfort", description: "Warm and inviting interiors." },
      { icon: Settings, title: "Durable Materials", description: "Built for high turnover." },
      { icon: Sparkles, title: "Premium Aesthetics", description: "Luxury hotel standards." }
    ],
    featureBlocks: [],
    comparisonRows: [],
    perfectionSteps: [
      { icon: "🎨", title: "Space Planning", description: "Maximizing every square foot." },
      { icon: "👁️", title: "Material Selection", description: "Choosing durable, premium finishes." },
      { icon: "⚡", title: "Execution", description: "Rapid and flawless deployment." }
    ],
    uspTabs: [
      { id: "tab1", label: "Efficient Design", content: "" },
      { id: "tab2", label: "High Durability", content: "" },
      { id: "tab3", label: "Turnkey Setup", content: "" },
      { id: "tab4", label: "Guest Satisfaction", content: "" }
    ],
    testimonials: [
      { clientName: "Urban Stay Group", projectType: "Serviced Residences · Mumbai", quote: "A premium finish from top to bottom. Voomet Design delivered a high-yielding, functional layout that our guests absolutely love." }
    ],
    ctaHeadline: "ELEVATE YOUR SERVICE APARTMENTS.",
    ctaCopy: "Create spaces that guests never want to leave.",
    ctaCategory: "Service Apartments",
    metaTitle: "Service Apartments | VOOMETDESIGN — Premium Living Spaces",
    metaDescription: "Premium service apartments designed for extended stays, combining luxury and functionality.",
  },
  
  "pg-accommodation": {
    title: "PG Accommodation",
    subtitle: "PG Accommodation",
    description: "We design modern PG accommodations that balance functionality with comfort — creating spaces that feel like home for students and working professionals. From efficient room layouts to shared common areas, every detail is thoughtfully crafted.",
    heroImage: "/Design/hospitality/h1.jpeg",
    featureImage: "/Design/hospitality/h1.jpeg",
    heroBadges: [],
    whyChooseVoomet: [
      { icon: LayoutTemplate, title: "Space-Efficient Room Design", description: "Optimized living spaces." },
      { icon: Home, title: "Comfortable Common Areas", description: "Fostering community." },
      { icon: Sparkles, title: "Modern Shared Kitchen", description: "Functional and clean." },
      { icon: BookOpen, title: "Study & Work Zones", description: "Dedicated focus areas." }
    ],
    featureBlocks: [],
    comparisonRows: [],
    perfectionSteps: [
      { icon: "🎨", title: "Layout Planning", description: "Maximizing capacity without crowding." },
      { icon: "👁️", title: "Utility Design", description: "Adequate storage and amenities." },
      { icon: "⚡", title: "Build", description: "Cost-effective, durable execution." }
    ],
    uspTabs: [
      { id: "tab1", label: "Space Efficiency", content: "" },
      { id: "tab2", label: "Student-Friendly", content: "" },
      { id: "tab3", label: "Low Maintenance", content: "" },
      { id: "tab4", label: "Modern Appeal", content: "" }
    ],
    testimonials: [
      { clientName: "Greenfield Properties", projectType: "PG Accommodations · Bengaluru", quote: "Voomet Design helped us create a clean, modern and welcoming student residence. Occupancy went up within the first month. Outstanding value." }
    ],
    ctaHeadline: "MODERNIZE YOUR PG ACCOMMODATION.",
    ctaCopy: "Create comfortable, functional spaces that residents love to call home.",
    ctaCategory: "PG Accommodation",
    metaTitle: "PG Accommodation | VOOMETDESIGN — Modern Co-living Spaces",
    metaDescription: "Modern PG accommodations balancing functionality with comfort for students and professionals.",
  },

  /* ── EDUCATIONAL INSTITUTIONS ────────────────────────────────────── */
  "educational-institutions": {
    title: "Educational Spaces",
    subtitle: "Educational Spaces",
    description: "Designing inspiring learning environments that support collaboration, engagement and future-focused educational experiences.",
    heroImage: "/images/Services-card/education.jpg",
    featureImage: "/images/Services-card/education.jpg",
    heroBadges: [],
    whyChooseVoomet: [
      { icon: Home, title: "Schools", description: "Inspiring K-12 environments." },
      { icon: LayoutTemplate, title: "Colleges", description: "Advanced smart campuses." },
      { icon: Users, title: "Training Centers", description: "Flexible corporate zones." },
      { icon: BookOpen, title: "Learning Spaces", description: "Acoustically optimized spaces." }
    ],
    featureBlocks: [],
    comparisonRows: [],
    perfectionSteps: [
      { icon: "📚", title: "Planning", description: "Mapping curriculum requirements to physical space demands." },
      { icon: "🛡️", title: "Safety", description: "Strict adherence to institutional safety codes and accessibility standards." },
      { icon: "🧠", title: "Learning Environment", description: "Seating and layout topologies proven to enhance student attention." }
    ],
    uspTabs: [
      { id: "tab1", label: "Learning-Centric Design", content: "" },
      { id: "tab2", label: "Durable Materials", content: "" },
      { id: "tab3", label: "Safe Environments", content: "" },
      { id: "tab4", label: "Efficient Execution", content: "" }
    ],
    testimonials: [
      { clientName: "Delhi Public Academy", projectType: "Educational Interiors · Delhi", quote: "Our campus renovation by Voomet Design has been transformative. Students are more engaged and faculty are proud of their spaces. World-class finish." },
      { clientName: "Horizon Learning Hub", projectType: "Training Center · Mumbai", quote: "The training center Voomet built for us supports our learning programs perfectly. Every element — lighting, acoustics, layout — was carefully planned." }
    ],
    ctaHeadline: "BUILD THE FOUNDATION FOR FUTURE INNOVATORS.",
    ctaCopy: "Construct inspiring, safety-first educational environments that stand the test of time.",
    ctaCategory: "Educational Spaces",
    metaTitle: "Educational Spaces | VOOMETDESIGN — Inspiring Learning Environments",
    metaDescription: "Designing inspiring learning environments that support collaboration and engagement.",
  },
  
  /* ── FACADES & GLAZING ────────────────────────────────────────── */
  "facades-glazing": {
    title: "Facades & Glazing Solutions",
    subtitle: "Facades & Glazing Solutions",
    description: "Premium architectural glass and facade systems designed for structural integrity, thermal performance, and striking visual impact.",
    heroImage: "/images/Services-card/aluminium.png",
    featureImage: "/images/Services-card/aluminium.png",
    heroBadges: [],
    whyChooseVoomet: [
      { icon: LayoutTemplate, title: "Structural Glazing", description: "Seamless glass exteriors." },
      { icon: Sparkles, title: "Curtain Walls", description: "High-performance building envelopes." },
      { icon: ShieldCheck, title: "Safety & Security", description: "Toughened and laminated solutions." },
      { icon: Settings, title: "Thermal Efficiency", description: "Advanced insulated glass units." }
    ],
    featureBlocks: [],
    comparisonRows: [],
    perfectionSteps: [
      { icon: "📐", title: "Engineering", description: "Precise wind-load and structural calculations." },
      { icon: "⚙️", title: "Fabrication", description: "Custom sizing and finishing in our facility." },
      { icon: "🏗️", title: "Installation", description: "Expert deployment by specialized high-rise crews." }
    ],
    uspTabs: [
      { id: "tab1", label: "Aesthetic Excellence", content: "" },
      { id: "tab2", label: "Energy Savings", content: "" },
      { id: "tab3", label: "Acoustic Control", content: "" },
      { id: "tab4", label: "Weather Resistance", content: "" }
    ],
    testimonials: [
      { clientName: "Nexus Corporate Park", projectType: "Commercial Facade · Delhi", quote: "The structural glazing provided by Voomet Design transformed our building's exterior. It looks modern and has significantly reduced our cooling costs." }
    ],
    ctaHeadline: "REDEFINE YOUR BUILDING'S EXTERIOR.",
    ctaCopy: "Deliver striking architectural statements with our premium facade solutions.",
    ctaCategory: "Facades & Glazing",
    metaTitle: "Facades & Glazing | VOOMETDESIGN — Architectural Glass Solutions",
    metaDescription: "Premium architectural glass and facade systems designed for structural integrity and striking visual impact.",
    commercialSystems: [
      { title: "Unitized Curtain Wall Systems", desc: "High-performance modular facade units for large-scale commercial structures" },
      { title: "Spider Glazing Systems", desc: "Minimalist point-fixed glass systems for a seamless, frameless aesthetic" },
      { title: "Structural Glazing", desc: "Silicone-bonded glass facades offering clean lines and superior weather sealing" },
      { title: "Aluminium Composite Panel (ACP) Cladding", desc: "Lightweight, durable panels for modern exterior finishes" },
      { title: "Aluminium Louvers & Sun Control Systems", desc: "Precision-engineered shading solutions for energy efficiency" },
      { title: "Glass Canopies & Spider Canopies", desc: "Elegant entrance and overhead glazing structures" },
      { title: "Stainless Steel Railings & Balustrade Systems", desc: "Premium safety railings with a refined finish" },
      { title: "Seamless Railing System", desc: "Continuous glass or metal rail systems for uninterrupted views" },
      { title: "High Pressure Laminate (HPL) Cladding", desc: "Weather-resistant decorative panels for striking facades" },
      { title: "MCM / Laminam Cladding", desc: "Ultra-thin, high-durability metal composite cladding solutions" },
      { title: "Curtain Wall Systems", desc: "Floor-to-ceiling glass wall systems that define modern architecture" }
    ],
    capabilities: [
      "Façade Design Support",
      "Technical Consultation",
      "Aluminium System Fabrication",
      "Structural Glazing Solutions",
      "Curtain Wall Systems",
      "Project Execution & Installation",
      "Customized Architectural Solutions"
    ],
    fenestrationDescription: "We deliver precision fenestration solutions — the art and science of designing and installing windows, doors, and glazed openings that balance natural light, thermal performance, and architectural aesthetics for both commercial and residential buildings."
  },
};



/* ─── SEO Metadata ──────────────────────────────────────────────────── */

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug: slugArray } = await params;
  const slug = slugArray.at(-1) || "";
  const data = SERVICE_DATA[slug];
  
  if (!data) return { title: "Service Not Found | VOOMETDESIGN" };

  return {
    title: data.metaTitle || `${data.title} | VOOMETDESIGN`,
    description: data.metaDescription || data.description,
    openGraph: {
      title: data.metaTitle || `${data.title} | VOOMETDESIGN`,
      description: data.metaDescription || data.description,
      images: [data.heroImage || '/logo/icon.png'],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.metaTitle || `${data.title} | VOOMETDESIGN`,
      description: data.metaDescription || data.description,
      images: [data.heroImage || '/logo/icon.png'],
    },
    alternates: {
      canonical: `https://voometdesign.com/services/${slugArray.join('/')}`,
    },
  };
}

/* ─── Static Params (SSG) ───────────────────────────────────────────── */

export function generateStaticParams() {
  return Object.keys(SERVICE_DATA).map((slug) => {
    return { slug: [slug] };
  });
}

/* ─── Cell Renderer ─────────────────────────────────────────────────── */
// Moved to MobileMaterialComparison.tsx

/* ─── Page ──────────────────────────────────────────────────────────── */

export default async function ServiceSlugPage(
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug: slugArray } = await params;

  // Handle hospitality parent route redirect
  if (slugArray.length === 1 && slugArray[0] === "hospitality") {
    redirect("/services/boutique-hotels");
  }

  const slug = slugArray.at(-1) || "";
  const data = SERVICE_DATA[slug];
  if (!data) notFound();

  const isTechnicalSystem = slug === "aluminium-systems" || slug === "upvc-systems";

  return (
    <main className="bg-gradient-to-br from-white via-slate-50 to-slate-100 min-h-screen">

      {/* ══════════════════════════════════════════════════════════════
          SLOT 1 — PREMIUM HERO SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-16 lg:py-20 relative z-10 min-h-[calc(100svh-90px)] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_1fr] gap-8 lg:gap-12 items-center w-full">

          {/* Left: Content */}
          <div className="flex flex-col max-w-2xl">
            {/* Top Label */}
            <span className="inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.25em] uppercase text-[#0B1633]/70 mb-4 w-fit">
              <span className="h-px w-6 bg-[#0B1633]/70 flex-shrink-0" />
              OUR EXPERTISE
            </span>

            {/* Heading */}
            <h1 className="text-[42px] md:text-[56px] lg:text-[64px] font-extrabold tracking-tight leading-[1.05] text-[#0B1633] mb-4 capitalize">
              {data.subtitle.toLowerCase()}
            </h1>

            {/* Description */}
            <p className="text-[16px] md:text-[18px] text-slate-600 leading-relaxed mb-8 font-[400]">
              {data.description}
            </p>

            {/* Feature Highlights Grid (Replaces Slider) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mb-8">
              {data.uspTabs.slice(0, 4).map((tab, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#0B1633]/5 flex items-center justify-center flex-shrink-0">
                    <Check size={12} strokeWidth={3} className="text-[#0B1633]" />
                  </div>
                  <span className="text-[15px] font-[500] text-slate-800 tracking-tight">
                    {tab.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/contact"
                className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-[#0B1633] text-white rounded-full text-[13px] font-bold uppercase tracking-widest hover:bg-slate-800 hover:shadow-[0_8px_25px_rgba(11,22,51,0.2)] transition-all duration-300"
              >
                Book Consultation
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link
                href="/portfolio"
                className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-transparent text-[#0B1633] border border-slate-200 rounded-full text-[13px] font-bold uppercase tracking-widest hover:border-[#0B1633] hover:bg-slate-50 transition-all duration-300"
              >
                View Projects
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* Right: Premium Image Card */}
          <div className="relative w-full h-[400px] sm:h-[480px] md:h-[520px] lg:h-[560px] rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] group">
            <div className="absolute inset-0 bg-slate-100 animate-pulse -z-10" />
            <Image
              quality={85}
              src={data.heroImage}
              alt={data.subtitle}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
            />
            {/* Soft inner shadow/gradient for stat card */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none" />
            
            {/* Floating Stat Card */}
            <div className="absolute bottom-6 sm:bottom-8 left-6 sm:bottom-8 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-white/20 flex items-center gap-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <div className="w-12 h-12 bg-[#0B1633]/5 rounded-full flex items-center justify-center text-[#0B1633] font-bold text-xl">
                20+
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#0B1633] tracking-wide">Years Experience</span>
                <span className="text-[12px] text-slate-500">Delivering Excellence</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <StickyServiceNav />

                        {/* ══════════════════════════════════════════════════════════════
          SLOT 2 — WHY CHOOSE VOOMET (TIMELINE STYLE)
      ══════════════════════════════════════════════════════════════ */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-20 bg-white border-y border-slate-100">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[12px] font-bold tracking-[0.25em] uppercase text-[#6E7D9B] block mb-4">
            OUR ADVANTAGE
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#0B1633]">
            WHY VOOMETDESIGN
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 md:gap-y-16 lg:gap-4 relative w-full">
          {data.whyChooseVoomet?.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="group flex flex-col items-center text-center relative z-10">
                {/* Desktop Connecting Line */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-[32px] left-[50%] w-full h-[1px] bg-[#0B1633]/30 z-0 group-hover:bg-[#0B1633]/60 group-hover:drop-shadow-[0_0_8px_rgba(11,22,51,0.5)] transition-all duration-300" />
                )}
                {/* Tablet Connecting Line */}
                {i % 2 !== 1 && i < 3 && (
                  <div className="hidden md:block lg:hidden absolute top-[32px] left-[50%] w-full h-[1px] bg-[#0B1633]/30 z-0 group-hover:bg-[#0B1633]/60 transition-all duration-300" />
                )}
                {/* Mobile Connecting Line */}
                {i < 3 && (
                  <div className="md:hidden absolute top-[64px] left-[50%] w-[1px] h-[calc(100%+4rem)] bg-[#0B1633]/30 z-0 -translate-x-1/2 group-hover:bg-[#0B1633]/60 transition-all duration-300" />
                )}

                <div className="w-[64px] h-[64px] bg-white border border-[#0B1633]/20 rounded-full flex items-center justify-center text-[#6E7D9B] mb-5 relative group-hover:border-[#0B1633] group-hover:bg-[#0B1633] group-hover:text-white group-hover:-translate-y-1 transition-all duration-300 shadow-sm z-10">
                  {Icon && <Icon size={24} />}
                </div>
                <span className="text-[#0B1633]/40 font-bold tracking-[0.2em] text-[11px] mb-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[16px] font-bold text-[#0B1633] leading-[1.3] mb-2 max-w-[180px]">
                  {step.title}
                </h3>
                <p className="text-[13px] text-slate-500 leading-relaxed max-w-[200px]">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SLOT 2.5 — COMMERCIAL SYSTEMS (OPTIONAL)
      ══════════════════════════════════════════════════════════════ */}
      {data.commercialSystems && data.commercialSystems.length > 0 && (
        <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24 bg-[#FAFAF8]">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="text-[12px] uppercase tracking-[0.25em] font-bold text-[#6E7D9B] mb-4 block">
              COMMERCIAL FACADE SOLUTIONS
            </span>
            <h2 className="text-[32px] md:text-[42px] font-[700] text-[#0B1633] leading-[1.1] tracking-tight max-w-3xl mb-6">
              Engineered for Modern Architecture
            </h2>
            <p className="text-[16px] text-slate-600 leading-relaxed max-w-4xl">
              We provide complete façade solutions for commercial buildings, IT parks, shopping complexes, hotels, hospitals, and corporate offices — engineered to deliver strength, energy efficiency, weather resistance, and modern architectural appeal.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-[20px] font-bold text-[#0B1633] mb-8 border-b border-slate-200 pb-4">Our Commercial Systems</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.commercialSystems.map((sys, idx) => (
                <div key={idx} className="bg-white p-6 md:p-8 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#0B1633]/5 flex items-center justify-center flex-shrink-0 mt-1">
                      <LayoutTemplate size={18} className="text-[#0B1633]" />
                    </div>
                    <div>
                      <h4 className="text-[16px] font-bold text-[#0B1633] mb-2">{sys.title}</h4>
                      <p className="text-[14px] text-slate-500 leading-relaxed">{sys.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SLOT 2.5b — FENESTRATION SOLUTIONS (OPTIONAL)
      ══════════════════════════════════════════════════════════════ */}
      {data.fenestrationDescription && (
        <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-16 bg-white">
          <div className="flex flex-col items-center text-center">
            <span className="text-[12px] uppercase tracking-[0.25em] font-bold text-[#6E7D9B] mb-4 block">
              ADDITIONAL SERVICES
            </span>
            <h2 className="text-[32px] md:text-[42px] font-[700] text-[#0B1633] leading-[1.1] tracking-tight max-w-3xl mb-6">
              Fenestration Solutions
            </h2>
            <p className="text-[16px] text-slate-600 leading-relaxed max-w-4xl">
              {data.fenestrationDescription}
            </p>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SLOT 2.6 — CAPABILITIES (OPTIONAL)
      ══════════════════════════════════════════════════════════════ */}
      {data.capabilities && data.capabilities.length > 0 && (
        <section className="w-full py-20 bg-[#0B1633] px-6 md:px-12">
          <div className="max-w-[1440px] mx-auto">
            <div className="text-center mb-12">
              <span className="text-[12px] uppercase tracking-[0.25em] font-bold text-white/50 mb-3 block">
                CORE EXPERTISE
              </span>
              <h2 className="text-[32px] md:text-[40px] font-[700] text-white leading-[1.1] tracking-tight">
                Our Capabilities
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.capabilities.map((cap, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-colors duration-300">
                  <Check size={20} className="text-white/80" />
                  <span className="text-white text-[15px] font-medium">{cap}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SLOT 4.5 — CONTEXT-SPECIFIC TECHNICAL FORM
      ══════════════════════════════════════════════════════════════ */}
      {(slug === "aluminium-systems" || slug === "upvc-systems") && (
        <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start border-t border-slate-100 mt-12 text-left">
          
          {/* LEFT COLUMN: Technical Parameters */}
          <div className="flex flex-col">
            <span className="text-caption font-bold tracking-[0.28em] uppercase text-[#6E7D9B] block mb-3">
              VOOMETDESIGN · TECHNICAL SPECIFICATIONS
            </span>
            <h2 className="text-h2 font-bold leading-tight tracking-tight text-slate-950 mb-4 uppercase">
              {slug === "aluminium-systems" ? "STRUCTURAL COMPLIANCE & WIND LOADS" : "ACOUSTIC ISOLATION & THERMAL METRICS"}
            </h2>
            <p className="text-slate-600 text-body leading-relaxed mb-6">
              {slug === "aluminium-systems" 
                ? "Our high-precision architectural facades and slimline sliding systems are engineered to withstand extreme wind pressures while maintaining flawless structural integrity. Submit your schedule for a detailed structural analysis."
                : "Engineered to deliver up to 45dB of noise reduction, our multi-chambered UPVC profiles provide absolute thermal sealing. Configure your acoustic requirements below for a tailored performance plan."}
            </p>
          </div>

          {/* RIGHT COLUMN: The Context-Specific Input Grid Box */}
          <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm text-left">
            <h3 className="text-h6 font-bold text-slate-950 mb-4 block uppercase">
              {slug === "aluminium-systems" ? "REQUEST FAÇADE SCHEDULE" : "CONFIGURE ACOUSTIC SEALING"}
            </h3>
            
            <form className="flex flex-col gap-3">
              {slug === "aluminium-systems" ? (
                <>
                  <input type="text" placeholder="APERTURE COUNT (E.G. 12 WINDOWS)" className="h-10 text-small px-4 border border-slate-200 rounded-lg text-black bg-slate-50/50 focus:bg-white w-full transition-all uppercase placeholder:text-slate-400" />
                  <select className="h-10 text-small px-4 border border-slate-200 rounded-lg text-black bg-slate-50/50 focus:bg-white w-full transition-all uppercase appearance-none text-slate-500">
                    <option value="">SELECT GLASS PROFILING</option>
                    <option value="dgu">DOUBLE GLAZED UNIT (DGU)</option>
                    <option value="single">SINGLE GLAZED</option>
                  </select>
                  <input type="text" placeholder="WIND-PRESSURE THRESHOLDS" className="h-10 text-small px-4 border border-slate-200 rounded-lg text-black bg-slate-50/50 focus:bg-white w-full transition-all uppercase placeholder:text-slate-400" />
                  <textarea placeholder="ADDITIONAL STRUCTURAL NOTES" rows={3} className="text-small p-4 border border-slate-200 rounded-lg text-black bg-slate-50/50 focus:bg-white w-full transition-all uppercase placeholder:text-slate-400 resize-none"></textarea>
                </>
              ) : (
                <>
                  <select className="h-10 text-small px-4 border border-slate-200 rounded-lg text-black bg-slate-50/50 focus:bg-white w-full transition-all uppercase appearance-none text-slate-500">
                    <option value="">TARGET NOISE REDUCTION (DB SCALE)</option>
                    <option value="30db">30DB REDUCTION (STANDARD)</option>
                    <option value="40db">40DB REDUCTION (HIGH-PERFORMANCE)</option>
                    <option value="45db">45DB REDUCTION (STUDIO-GRADE)</option>
                  </select>
                  <input type="text" placeholder="PROFILE COLORS (E.G. ANTHRACITE GREY)" className="h-10 text-small px-4 border border-slate-200 rounded-lg text-black bg-slate-50/50 focus:bg-white w-full transition-all uppercase placeholder:text-slate-400" />
                  <input type="text" placeholder="SITE LOCATION DETAILS" className="h-10 text-small px-4 border border-slate-200 rounded-lg text-black bg-slate-50/50 focus:bg-white w-full transition-all uppercase placeholder:text-slate-400" />
                  <textarea placeholder="ADDITIONAL STRUCTURAL NOTES" rows={3} className="text-small p-4 border border-slate-200 rounded-lg text-black bg-slate-50/50 focus:bg-white w-full transition-all uppercase placeholder:text-slate-400 resize-none"></textarea>
                </>
              )}
              <button type="button" className="w-full h-10 bg-slate-950 text-white rounded-lg text-button font-bold uppercase tracking-wider mt-4 hover:bg-slate-900 transition-colors">
                {slug === "aluminium-systems" ? "SUBMIT SCHEDULE" : "REQUEST CONFIGURATION"}
              </button>
            </form>
          </div>

        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SLOT 5 — "HOW WE DELIVER PERFECTION" 6-STEP PIPELINE
      ══════════════════════════════════════════════════════════════ */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-10 md:py-16">

        {/* Section heading */}
        <div className="mb-10">
          <span className="text-caption font-bold tracking-[0.28em] uppercase text-[#6E7D9B] block mb-3">
            VOOMETDESIGN · Architectural Integrity & Execution
          </span>
          <h2
            className="text-h2 font-bold leading-tight tracking-tight text-slate-950"
          >
            How We{" "}
            <em className="not-italic font-light text-slate-500">Deliver Perfection</em>
          </h2>
          <p className="mt-3 text-body text-slate-600 max-w-2xl">
            From computational layout blueprints to factory-direct material routing and
            dedicated on-site engineering — our end-to-end execution standards.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 items-stretch">
          {data.perfectionSteps.map((step, idx) => (
            <div
              key={step.title}
              className="bg-white border border-slate-200/80 rounded-[16px] md:rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-start text-left group"
            >
              {/* Step number + icon row */}
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <span
                  className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-slate-100 flex items-center justify-center text-[10px] md:text-caption font-bold text-slate-500 flex-shrink-0 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-[16px] md:text-xl" role="img" aria-label={step.title}>
                  {step.icon}
                </span>
              </div>
              <h3 className="text-slate-950 font-bold text-[10px] md:text-caption tracking-[0.1em] md:tracking-[0.15em] uppercase mb-1 md:mb-2">
                {step.title}
              </h3>
              <p className="text-slate-600 text-[11px] md:text-small leading-tight md:leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SLOT 5.2 — RESIDENTIAL GALLERY
      ══════════════════════════════════════════════════════════════ */}
      {(slug === "residential-interiors" || slug === "luxury-residential") && (
        <ResidentialGallery />
      )}

      {/* ══════════════════════════════════════════════════════════════
          SLOT 5.3 — HOSPITALITY GALLERY
      ══════════════════════════════════════════════════════════════ */}
      {(slug === "boutique-hotels" || slug === "service-apartments" || slug === "pg-accommodation" || slugArray[0] === "hospitality") && (
        <HospitalityGallery />
      )}

      {/* ══════════════════════════════════════════════════════════════
          SLOT 5.4 — EDUCATION GALLERY
      ══════════════════════════════════════════════════════════════ */}
      {(slug === "educational-institutions" || slug === "education") && (
        <EducationGallery />
      )}

      {/* ══════════════════════════════════════════════════════════════
          SLOT 5.5 — COMMERCIAL GALLERY
      ══════════════════════════════════════════════════════════════ */}
      {slug === "commercial-interiors" && (
        <CommercialGallery />
      )}

      {/* ══════════════════════════════════════════════════════════════
          SLOT 5.6 — TESTIMONIALS
      ══════════════════════════════════════════════════════════════ */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12">
        <ServiceTestimonials testimonials={TESTIMONIALS} />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SLOT 6 — CTA
      ══════════════════════════════════════════════════════════════ */}
      <CTAV4 />

    </main>
  );
}
