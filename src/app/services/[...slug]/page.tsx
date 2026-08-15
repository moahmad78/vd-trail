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
import AltechFacadeSection, { AltechFacadeData } from "@/components/AltechFacadeSection";
import AltechClientMarquee from "@/components/AltechClientMarquee";
import Link from "next/link";

import { TESTIMONIALS } from "@/data/testimonials";
import ResidentialGallery from "@/components/ResidentialGallery";
import HospitalityGallery from "@/components/HospitalityGallery";
import EducationGallery from "@/components/EducationGallery";
import CommercialGallery from "@/components/CommercialGallery";
import { BreadcrumbSchema, ServiceSchema } from "@/components/seo/JsonLd";

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
  image?: string;
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

interface StatItem {
  iconName: string;
  value: string;
  label: string;
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
  heroStats?: StatItem[];  shortDescription?: string;
  heroImages?: string[];
  tagline?: { prefix: string; highlight: string; suffix?: string; };
  associateCompanyContent?: AltechFacadeData;
}

/* ─── Service Data Matrix ───────────────────────────────────────────── */

const SERVICE_DATA: Record<string, ServiceData> = {

  /* ── RESIDENTIAL ─────────────────────────────────────────────────── */
  "residential-interiors": {
    title: "Residential Interiors",
    subtitle: "Residential Interiors",
    description: "Creating elegant and personalized homes that balance comfort, aesthetics and practical living through thoughtful design and craftsmanship.",
    shortDescription: "Creating elegant, personalized, and comfortable premium homes.",
    heroImage: "/images/Services-card/residential.webp",
    featureImage: "/images/Services-card/residential.webp",
    heroBadges: [],
    whyChooseVoomet: [
      { icon: PenTool, title: "Custom Home Design", description: "Bespoke architectural layouts." },
      { icon: Sparkles, title: "Premium Material Selection", description: "Curated luxury finishes." },
      { icon: LayoutTemplate, title: "Functional Space Planning", description: "Intelligent spatial flows." },
      { icon: ShieldCheck, title: "Dedicated Project Management", description: "End-to-end luxury execution." }
    ],
    heroStats: [
      { iconName: "Home", value: "200+", label: "Homes Designed" },
      { iconName: "Clock", value: "15+", label: "Years Experience" },
      { iconName: "Sparkles", value: "100%", label: "Custom Details" },
      { iconName: "ShieldCheck", value: "5 Yrs", label: "Warranty" },
    ],
    featureBlocks: [],
    comparisonRows: [],
    perfectionSteps: [
      { icon: "📐", title: "DESIGN", image: "/images/services/design.webp",
        description: "Mapping space parameters to lifestyle." },
      { icon: "🪵", title: "MATERIAL SELECTION", image: "/images/services/MATERIALIZATION.webp",
        description: "Curating premium finishes and joinery." },
      { icon: "⚡", title: "INSTALLATION", image: "/images/services/deliver.webp",
        description: "Rigorous turnkey structural implementation." }
    ],
    uspTabs: [
      { id: "tab1", label: "Personalized Design", content: "" },
      { id: "tab2", label: "Premium Finishes", content: "" },
      { id: "tab3", label: "Space Optimization", content: "" },
      { id: "tab4", label: "End-to-End Execution", content: "" }
    ],
    testimonials: [
      { clientName: "Rajesh Mehra", projectType: "Residential Interiors · Mumbai", quote: "They transformed our home into a work of art. Every detail was considered — from the material selection to the final installation. Exceptional quality." },
      { clientName: "Priya Sharma", projectType: "Luxury Villa · Pune", quote: "We are thrilled with the results. The team delivered exactly what they promised, on time and with incredible attention to detail. Highly recommend." }
    ],
    ctaHeadline: "Every Great Home Begins With A Conversation.",
    ctaCopy: "From bespoke layouts to turnkey execution, we craft homes designed around your lifestyle.",
    ctaCategory: "Residential Interiors",
    metaTitle: "Residential Interior Designers in Bangalore | Luxury Homes & Villas | VOOMET",
    metaDescription: "VOOMET creates bespoke luxury residential interiors for villas, penthouses, and premium apartments in Bangalore with in-house woodwork and precision turnkey execution.",
  },

  /* ── COMMERCIAL INTERIORS ────────────────────────────────────────── */
  "commercial-interiors": {
    title: "Commercial Interiors",
    subtitle: "Commercial Interiors",
    description: "Designing high-performance workplaces, offices, retail spaces and business environments that combine functionality, brand identity and long-term durability.",
    shortDescription: "Designing high-performance, functional, and durable workspaces.",
    heroImage: "/Design/commercial/121.webp",
    featureImage: "/Design/commercial/121.webp",
    heroBadges: [],
    whyChooseVoomet: [
      { icon: LayoutTemplate, title: "Workspace Planning", description: "Strategic layouts for efficiency." },
      { icon: Sparkles, title: "Brand-Focused Design", description: "Reflecting identity and purpose." },
      { icon: ShieldCheck, title: "Premium Materials", description: "Durable, high-performance finishes." },
      { icon: Settings, title: "Turnkey Execution", description: "Single-team accountable delivery." }
    ],
    heroStats: [
      { iconName: "Briefcase", value: "150+", label: "Offices Delivered" },
      { iconName: "Users", value: "10k+", label: "Seats Created" },
      { iconName: "Clock", value: "100%", label: "On-Time Delivery" },
      { iconName: "ShieldCheck", value: "5 Yrs", label: "Warranty" },
    ],
    featureBlocks: [],
    comparisonRows: [],
    perfectionSteps: [
      { icon: "📊", title: "PLANNING", image: "/images/services/PLANNING.webp",
        description: "Mapping spaces to curriculum demands." },
      { icon: "🪵", title: "PROCUREMENT", image: "/images/services/MATERIALIZATION.webp",
        description: "Sourcing premium materials for impact." },
      { icon: "⚡", title: "EXECUTION", image: "/images/services/EXECUTION.webp",
        description: "Flawless site integration by craftsmen." }
    ],
    uspTabs: [
      { id: "tab1", label: "Precision Execution", content: "" },
      { id: "tab2", label: "Material Excellence", content: "" },
      { id: "tab3", label: "Dedicated Supervision", content: "" },
      { id: "tab4", label: "Pan-India Delivery", content: "" }
    ],
    testimonials: [
      { clientName: "Vikram Industries", projectType: "Commercial Interiors · Hyderabad", quote: "Our new office is a reflection of our brand identity. The team understood our vision and executed it flawlessly. Our team productivity has visibly improved." },
      { clientName: "Meena Retail Group", projectType: "Retail Space · Bengaluru", quote: "The workspace built for us has received countless compliments from clients and partners. A truly premium outcome at competitive rates." }
    ],
    ctaHeadline: "EVERY PRODUCTIVE WORKSPACE BEGINS WITH STRATEGY.",
    ctaCopy: "Building environments that empower businesses through intelligent planning.",
    ctaCategory: "Commercial Interiors",
    metaTitle: "Commercial Interior Designers in Bangalore | Office Fit-Outs | VOOMET",
    metaDescription: "High-performance commercial and office interior design in Bangalore by VOOMET. Turnkey corporate fit-outs, ergonomic workspaces, and end-to-end execution.",
  },

  /* ── UPVC SYSTEMS ────────────────────────────────────────────────── */
  "upvc-systems": {
    title: "UPVC Systems",
    subtitle: "UPVC Systems",
    description: "High-performance UPVC window and door solutions engineered for energy efficiency, acoustic comfort and long-term durability.",
    shortDescription: "Premium architectural glass and engineering systems.",
    heroImage: "/images/Services-card/upvc.webp",
    featureImage: "/images/Services-card/upvc.webp",
    heroBadges: [],
    whyChooseVoomet: [
      { icon: LayoutTemplate, title: "Premium Profiles", description: "Maximum structural rigidity." },
      { icon: Sparkles, title: "Energy Saving Systems", description: "Advanced thermal breaks." },
      { icon: Volume2, title: "Acoustic Performance", description: "Absolute interior serenity." },
      { icon: ShieldCheck, title: "Long-Term Reliability", description: "Zero-maintenance durability." }
    ],
    heroStats: [
      { iconName: "Settings", value: "500+", label: "Systems Installed" },
      { iconName: "ShieldCheck", value: "10 Yrs", label: "Profile Warranty" },
      { iconName: "Volume2", value: "40dB", label: "Noise Reduction" },
      { iconName: "Sparkles", value: "100%", label: "Weather Proof" },
    ],
    featureBlocks: [],
    comparisonRows: [],
    perfectionSteps: [
      { icon: "📐", title: "TECHNICAL SURVEY", image: "/images/services/consult.webp",
        description: "Precision measurement and structural analysis." },
      { icon: "⚙️", title: "PROFILE FABRICATION", image: "/images/services/execute.webp",
        description: "High-precision automated factory fabrication." },
      { icon: "🏗️", title: "INSTALLATION", image: "/images/services/deliver.webp",
        description: "Rigorous turnkey structural implementation." },
      { icon: "✅", title: "QUALITY TESTING", image: "/images/services/STANDARDS.webp",
        description: "Uncompromising quality and safety codes." }
    ],
    uspTabs: [
      { id: "tab1", label: "Thermal Efficiency", content: "" },
      { id: "tab2", label: "Sound Insulation", content: "" },
      { id: "tab3", label: "Low Maintenance", content: "" },
      { id: "tab4", label: "Weather Resistance", content: "" }
    ],
    testimonials: [
      { clientName: "Anand Constructions", projectType: "UPVC Systems · Chennai", quote: "The UPVC windows delivered have made a noticeable difference in our home's acoustic comfort. Completely silent indoors. Excellent installation." },
      { clientName: "Sunrise Apartments", projectType: "Residential Complex · Pune", quote: "We equipped all 48 apartments with premium UPVC systems. The quality is consistent throughout and the installation team was highly professional." }
    ],
    ctaHeadline: "EVERY FLAWLESS EXECUTION BEGINS WITH PRECISION.",
    ctaCopy: "Delivering engineering excellence through in-house manufacturing.",
    ctaCategory: "UPVC Systems",
    metaTitle: "UPVC Doors & Windows in Bangalore | Energy-Efficient Systems | VOOMET",
    metaDescription: "High-performance UPVC window and door solutions in Bangalore engineered for acoustic insulation, energy savings, and weather durability.",
  },

  /* ── BOUTIQUE HOTELS / HOSPITALITY ─────────────────────────────── */
  "boutique-hotels": {
    title: "Hospitality Interiors",
    subtitle: "Hospitality Interiors",
    description: "Crafting memorable guest experiences through luxury hospitality environments, boutique hotels, resorts and serviced accommodations.",
    shortDescription: "Crafting luxury, high-fidelity guest experiences.",
    heroImage: "/Design/hospitality/h15.webp",
    featureImage: "/Design/hospitality/h15.webp",
    heroBadges: [],
    whyChooseVoomet: [
      { icon: Sparkles, title: "Boutique Hotels", description: "Signature thematic environments." },
      { icon: LayoutTemplate, title: "Service Apartments", description: "High-yield transit layouts." },
      { icon: Home, title: "Resort Spaces", description: "Immersive architectural retreats." },
      { icon: Settings, title: "Hospitality Execution", description: "Rapid turnkey deployment." }
    ],
    heroStats: [
      { iconName: "Home", value: "50+", label: "Hotels & Resorts" },
      { iconName: "Users", value: "2M+", label: "Guests Hosted" },
      { iconName: "Sparkles", value: "100%", label: "Custom Details" },
      { iconName: "Clock", value: "15+", label: "Years Experience" },
    ],
    featureBlocks: [],
    comparisonRows: [],
    perfectionSteps: [
      { icon: "🎨", title: "CONCEPT", image: "/images/services/CONCEPT.webp",
        description: "Establishing core experiential luxury narratives." },
      { icon: "👁️", title: "GUEST EXPERIENCE", image: "/images/services/hospitality_concept.webp",
        description: "Sensory layouts ensuring ultimate comfort." },
      { icon: "⚡", title: "FIT-OUT", image: "/images/services/EXECUTION.webp",
        description: "Flawless site integration by craftsmen." }
    ],
    uspTabs: [
      { id: "tab1", label: "Guest-Centric Design", content: "" },
      { id: "tab2", label: "Luxury Finishes", content: "" },
      { id: "tab3", label: "Hospitality Expertise", content: "" },
      { id: "tab4", label: "Seamless Delivery", content: "" }
    ],
    testimonials: [
      { clientName: "The Azure Boutique Hotel", projectType: "Hospitality Interiors · Goa", quote: "Our hotel's transformation is breathtaking. The team understood the boutique luxury aesthetic we envisioned and delivered beyond expectations." },
      { clientName: "Horizon Resorts", projectType: "Resort Interiors · Kerala", quote: "Working with the team was seamless. They understood the resort experience we wanted to create and delivered world-class interiors on schedule." }
    ],
    ctaHeadline: "EVERY UNFORGETTABLE STAY BEGINS WITH A VISION.",
    ctaCopy: "Design world-class boutique environments that define luxury hospitality.",
    ctaCategory: "Boutique Hotels",
    metaTitle: "Hospitality Interior Designers in Bangalore | Luxury Hotels & Resorts | VOOMET",
    metaDescription: "Luxury hospitality and hotel interior design company in Bangalore crafting memorable guest experiences, boutique hotels, and luxury resort environments.",
  },

  /* Fallbacks for menu routes */
  "service-apartments": {
    title: "Service Apartments",
    subtitle: "Service Apartments",
    description: "Premium service apartments designed for extended stays, combining the luxury of a hotel with the comfort and functionality of a home.",
    shortDescription: "Crafting luxury, high-fidelity guest experiences.",
    heroImage: "/Design/hospitality/h16.webp",
    featureImage: "/Design/hospitality/h16.webp",
    heroBadges: [],
    whyChooseVoomet: [
      { icon: LayoutTemplate, title: "Functional Layouts", description: "Optimized for long-term living." },
      { icon: Home, title: "Home-like Comfort", description: "Warm and inviting interiors." },
      { icon: Settings, title: "Durable Materials", description: "Built for high turnover." },
      { icon: Sparkles, title: "Premium Aesthetics", description: "Luxury hotel standards." }
    ],
    heroStats: [
      { iconName: "Home", value: "100+", label: "Apartments Designed" },
      { iconName: "Users", value: "10k+", label: "Happy Guests" },
      { iconName: "Settings", value: "100%", label: "Turnkey Setup" },
      { iconName: "ShieldCheck", value: "5 Yrs", label: "Warranty" },
    ],
    featureBlocks: [],
    comparisonRows: [],
    perfectionSteps: [
      { icon: "🎨", title: "SPACE PLANNING", image: "/images/services/PLANNING.webp",
        description: "Optimizing space for operational flow." },
      { icon: "👁️", title: "MATERIAL SELECTION", image: "/images/services/MATERIALIZATION.webp",
        description: "Curating premium finishes and joinery." },
      { icon: "⚡", title: "EXECUTION", image: "/images/services/EXECUTION.webp",
        description: "Flawless site integration by craftsmen." }
    ],
    uspTabs: [
      { id: "tab1", label: "Efficient Design", content: "" },
      { id: "tab2", label: "High Durability", content: "" },
      { id: "tab3", label: "Turnkey Setup", content: "" },
      { id: "tab4", label: "Guest Satisfaction", content: "" }
    ],
    testimonials: [
      { clientName: "Urban Stay Group", projectType: "Serviced Residences · Mumbai", quote: "A premium finish from top to bottom. They delivered a high-yielding, functional layout that our guests absolutely love." }
    ],
    ctaHeadline: "ELEVATE YOUR SERVICE APARTMENTS.",
    ctaCopy: "Create spaces that guests never want to leave.",
    ctaCategory: "Service Apartments",
    metaTitle: "Service Apartment Interior Designers in Bangalore | VOOMET",
    metaDescription: "Turnkey interior design and fit-outs for high-yield luxury service apartments and extended-stay residences in Bangalore.",
  },

  "pg-accommodation": {
    title: "PG Accommodation",
    subtitle: "PG Accommodation",
    description: "We design modern PG accommodations that balance functionality with comfort — creating spaces that feel like home for students and working professionals. From efficient room layouts to shared common areas, every detail is thoughtfully crafted.",
    shortDescription: "Crafting luxury, high-fidelity guest experiences.",
    heroImage: "/Design/hospitality/h17.webp",
    featureImage: "/Design/hospitality/h17.webp",
    heroBadges: [],
    whyChooseVoomet: [
      { icon: LayoutTemplate, title: "Space-Efficient Room Design", description: "Optimized living spaces." },
      { icon: Home, title: "Comfortable Common Areas", description: "Fostering community." },
      { icon: Sparkles, title: "Modern Shared Kitchen", description: "Functional and clean." },
      { icon: BookOpen, title: "Study & Work Zones", description: "Dedicated focus areas." }
    ],
    heroStats: [
      { iconName: "Users", value: "5k+", label: "Residents" },
      { iconName: "Home", value: "50+", label: "PGs Designed" },
      { iconName: "LayoutTemplate", value: "100%", label: "Space Utility" },
      { iconName: "ShieldCheck", value: "5 Yrs", label: "Warranty" },
    ],
    featureBlocks: [],
    comparisonRows: [],
    perfectionSteps: [
      { icon: "🎨", title: "LAYOUT PLANNING", image: "/images/services/LAYOUT.webp",
        description: "Optimizing space for operational flow." },
      { icon: "👁️", title: "UTILITY DESIGN", image: "/images/services/consult.webp",
        description: "Seamless integration of essential systems." },
      { icon: "⚡", title: "BUILD", image: "/images/services/BUILD.webp",
        description: "Robust construction and flawless execution." }
    ],
    uspTabs: [
      { id: "tab1", label: "Space Efficiency", content: "" },
      { id: "tab2", label: "Student-Friendly", content: "" },
      { id: "tab3", label: "Low Maintenance", content: "" },
      { id: "tab4", label: "Modern Appeal", content: "" }
    ],
    testimonials: [
      { clientName: "Greenfield Properties", projectType: "PG Accommodations · Bengaluru", quote: "They helped us create a clean, modern and welcoming student residence. Occupancy went up within the first month. Outstanding value." }
    ],
    ctaHeadline: "MODERNIZE YOUR PG ACCOMMODATION.",
    ctaCopy: "Create comfortable, functional spaces that residents love to call home.",
    ctaCategory: "PG Accommodation",
    metaTitle: "Co-Living & PG Interior Designers in Bangalore | VOOMET",
    metaDescription: "Space-efficient, modern co-living and student housing interior design in Bangalore balancing functionality, durability, and high occupancy.",
  },

  /* ── EDUCATIONAL INSTITUTIONS ────────────────────────────────────── */
  "educational-institutions": {
    title: "Educational Spaces",
    subtitle: "Educational Spaces",
    description: "Designing inspiring learning environments that support collaboration, engagement and future-focused educational experiences.",
    shortDescription: "Building safe, learning-centric interactive spaces.",
    heroImage: "/images/Services-card/education.webp",
    featureImage: "/images/Services-card/education.webp",
    heroBadges: [],
    whyChooseVoomet: [
      { icon: Home, title: "Schools", description: "Inspiring K-12 environments." },
      { icon: LayoutTemplate, title: "Colleges", description: "Advanced smart campuses." },
      { icon: Users, title: "Training Centers", description: "Flexible corporate zones." },
      { icon: BookOpen, title: "Learning Spaces", description: "Acoustically optimized spaces." }
    ],
    heroStats: [
      { iconName: "BookOpen", value: "50+", label: "Educational Projects" },
      { iconName: "Users", value: "100k+", label: "Students Impacted" },
      { iconName: "ShieldCheck", value: "100%", label: "Safety Compliant" },
      { iconName: "Clock", value: "15+", label: "Years Experience" },
    ],
    featureBlocks: [],
    comparisonRows: [],
    perfectionSteps: [
      { icon: "📚", title: "PLANNING", image: "/images/services/PLANNING.webp",
        description: "Mapping spaces to curriculum demands." },
      { icon: "🛡️", title: "SAFETY", image: "/images/services/safety.webp",
        description: "Strict adherence to safety codes." },
      { icon: "🧠", title: "LEARNING ENVIRONMENT", image: "/images/services/ENVIRONMENT.webp",
        description: "Layouts designed to enhance focus." }
    ],
    uspTabs: [
      { id: "tab1", label: "Learning-Centric Design", content: "" },
      { id: "tab2", label: "Durable Materials", content: "" },
      { id: "tab3", label: "Safe Environments", content: "" },
      { id: "tab4", label: "Efficient Execution", content: "" }
    ],
    testimonials: [
      { clientName: "Delhi Public Academy", projectType: "Educational Interiors · Delhi", quote: "Our campus renovation has been transformative. Students are more engaged and faculty are proud of their spaces. World-class finish." },
      { clientName: "Horizon Learning Hub", projectType: "Training Center · Mumbai", quote: "The training center Voomet built for us supports our learning programs perfectly. Every element — lighting, acoustics, layout — was carefully planned." }
    ],
    ctaHeadline: "BUILD THE FOUNDATION FOR FUTURE INNOVATORS.",
    ctaCopy: "Construct inspiring, safety-first educational environments that stand the test of time.",
    ctaCategory: "Educational Spaces",
    metaTitle: "Educational Institution Interior Designers in Bangalore | VOOMET",
    metaDescription: "Modern, inspiring educational interior design in Bangalore for schools, colleges, and training campuses. Acoustically engineered and safety-compliant.",
  },

  /* ── FACADES & GLAZING ────────────────────────────────────────── */
  "facades-glazing": {
    title: "Facades & Glazing Solutions",
    subtitle: "Facades & Glazing Solutions",
    description: "Premium architectural glass and facade systems designed for structural integrity, thermal performance, and striking visual impact.",
    heroImage: "/facade.webp",
    featureImage: "/facade.webp",
    heroBadges: [],
    whyChooseVoomet: [
      { icon: LayoutTemplate, title: "Structural Glazing", description: "Seamless glass exteriors." },
      { icon: Sparkles, title: "Curtain Walls", description: "High-performance building envelopes." },
      { icon: ShieldCheck, title: "Safety & Security", description: "Toughened and laminated solutions." },
      { icon: Settings, title: "Thermal Efficiency", description: "Advanced insulated glass units." }
    ],
    heroStats: [
      { iconName: "Settings", value: "250+", label: "Projects Completed" },
      { iconName: "Sparkles", value: "100%", label: "Structural Safety" },
      { iconName: "ShieldCheck", value: "10+ Yrs", label: "Warranty" },
      { iconName: "Clock", value: "25+", label: "Years Expertise" },
    ],
    featureBlocks: [],
    comparisonRows: [],
    perfectionSteps: [
      { icon: "📐", title: "ENGINEERING", image: "/images/services/design.webp",
        description: "Advanced structural and façade engineering." },
      { icon: "⚙️", title: "FABRICATION", image: "/images/services/execute.webp",
        description: "High-precision automated factory fabrication." },
      { icon: "🏗️", title: "INSTALLATION", image: "/images/services/deliver.webp",
        description: "Rigorous turnkey structural implementation." }
    ],
    uspTabs: [
      { id: "tab1", label: "Aesthetic Excellence", content: "" },
      { id: "tab2", label: "Energy Savings", content: "" },
      { id: "tab3", label: "Acoustic Control", content: "" },
      { id: "tab4", label: "Weather Resistance", content: "" }
    ],
    testimonials: [
      { clientName: "Nexus Corporate Park", projectType: "Commercial Facade · Delhi", quote: "The structural glazing provided transformed our building's exterior. It looks modern and has significantly reduced our cooling costs." }
    ],
    ctaHeadline: "REDEFINE YOUR BUILDING'S EXTERIOR.",
    ctaCopy: "Deliver striking architectural statements with our premium facade solutions.",
    ctaCategory: "Facades & Glazing",
    metaTitle: "Facades & Glazing in Bangalore | Architectural Glass & Systems | VOOMET",
    metaDescription: "Engineering structural glazing, unitized curtain walls, and architectural glass facades across Bangalore and India with Altech Enterprises and VOOMET.",
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
    fenestrationDescription: "We deliver precision fenestration solutions — the art and science of designing and installing windows, doors, and glazed openings that balance natural light, thermal performance, and architectural aesthetics for both commercial and residential buildings.",
    associateCompanyContent: {
      companyName: "Altech Enterprises",
      tagline: "Fenestration & Façade Solutions",
      aboutText: "At Altech Enterprises, we deliver fenestration & façade solutions that reflect engineering precision, architectural elegance, and long-term sustainability.",
      commitment: "Specializing in architectural aluminium and advanced glazing systems crafted to enhance building energy efficiency, structural strength, and aesthetics. Every project meets rigorous global standards for safety and longevity.",
      vision: "To be a trusted leader in fenestration and facade engineering by redefining modern building designs across India.",
      commercialSolutionsHeading: "Commercial Facade Solutions",
      commercialSolutionsSubhead: "Complete façade solutions for IT parks, corporate offices, hotels, and hospitals.",
      commercialSolutions: [
        {
          title: "Unitized Curtain Walls",
          desc: "Factory-assembled modular panel systems providing rapid on-site installation and superior weatherproofing.",
          iconType: "unitized"
        },
        {
          title: "Spider Glazing Systems",
          desc: "High-tensile stainless steel spider fittings and articulated bolts for uninterrupted frameless glass vistas.",
          iconType: "spider"
        },
        {
          title: "Structural Glazing",
          desc: "Flush silicone-bonded double-glazed glass facades offering sleek lines and outstanding acoustic control.",
          iconType: "structural"
        },
        {
          title: "Glass & Spider Canopies",
          desc: "Architectural cantilevered entrance canopies and overhead glazing built for high wind and live loads.",
          iconType: "canopy"
        },
        {
          title: "SS Railing Systems",
          desc: "Precision-welded 304/316 grade stainless steel and glass balustrades with continuous monolithic rigidity.",
          iconType: "railing"
        },
        {
          title: "ACP & HPL Cladding",
          desc: "Durable aluminium composite panels and high-pressure laminates engineered for weather-resistant exterior skins.",
          iconType: "cladding"
        }
      ],
      portfolioHeading: "Completed Projects & Portfolio",
      portfolioProjects: [
        { title: "GKNM College of Nursing", category: "Institutional Glazing & Facade", location: "Coimbatore", image: "/images/altech/projects/gknm_nursing.png" },
        { title: "Embassy Fountainhead", category: "Commercial IT Complex", location: "Bengaluru", image: "/images/altech/projects/embassy_fountainhead.png" },
        { title: "GKNMH", category: "Healthcare Facility Envelope", location: "Coimbatore", image: "/images/altech/projects/gknmh.png" },
        { title: "Embassy Cyprus Point", category: "Corporate Headquarters", location: "Bengaluru", image: "/images/altech/projects/embassy_cyprus_point.png" },
        { title: "Concorde Econex", category: "Commercial Tech Hub", location: "Bengaluru", image: "/images/altech/projects/concorde_econex.png" },
        { title: "Cardinal One", category: "Luxury High-Rise Glazing", location: "Bengaluru", image: "/images/altech/projects/cardinal_one.png" },
        { title: "SNN Bay Vista", category: "High-Rise Residential Living", location: "Bengaluru", image: "/images/altech/projects/snn_bay_vista.png" },
        { title: "Hiranandani – Anchorage", category: "Waterfront Residential Balconies", location: "Chennai", image: "/images/altech/projects/hiranandani_anchorage.png" },
        { title: "Brigade Wisteria", category: "Integrated Residential Assemblies", location: "Bengaluru", image: "/images/altech/projects/brigade_wisteria.png" },
        { title: "Prestige Tristar", category: "Acoustic Fenestration Towers", location: "Bengaluru", image: "/images/altech/projects/prestige_tristar.png" }
      ],
      statsBanner: [
        { label: "Executed Projects", value: "250+" },
        { label: "Structural Safety", value: "100%" },
        { label: "Warranty Assurance", value: "10+ Years" }
      ],
      tags: [
        "Structural Glazing",
        "Aluminium Façade",
        "uPVC Windows",
        "Architectural Systems",
        "Cladding Solutions"
      ],
      clientLogos: [
        { name: "Century Real Estate", file: "client_century.png" },
        { name: "Brigade Group", file: "client_brigade.png" },
        { name: "Prestige Group", file: "client_prestige.png" },
        { name: "Embassy Group", file: "client_embassy.png" },
        { name: "JLL", file: "client_jll.png" },
        { name: "SNN Raj Corp", file: "client_snn_raj.png" },
        { name: "House of Hiranandani", file: "client_house_of_hiranandani.png" },
        { name: "Concorde Group", file: "client_concorde.png" },
        { name: "L&T Construction", file: "client_lnt.png" },
        { name: "Puravankara", file: "client_puravankara.png" },
        { name: "Godrej Properties", file: "client_godrej.png" },
        { name: "Swan", file: "client_swan.png" }
      ],
      associateLogos: [
        { name: "Dormakaba", file: "assoc_dormakaba.png" },
        { name: "King Long", file: "assoc_king_long.png" },
        { name: "Jindal Aluminium", file: "assoc_jindal.png" },
        { name: "YKK AP", file: "assoc_ykk.png" },
        { name: "Hilti", file: "assoc_hilti.png" },
        { name: "Aditya Birla Group", file: "assoc_aditya_birla_group.png" },
        { name: "Giesse", file: "assoc_giesse.png" },
        { name: "Saint-Gobain", file: "assoc_saint_gobain.png" },
        { name: "Asahi India Glass", file: "assoc_asahi.png" },
        { name: "Tremco", file: "assoc_tremco.png" },
        { name: "McCoy Soudal", file: "assoc_mccoy.png" },
        { name: "Fischer", file: "assoc_fischer.png" },
        { name: "Frontek", file: "assoc_frontek.png" },
        { name: "Aludecor", file: "assoc_aludecor.png" },
        { name: "Klimas", file: "assoc_klimas.png" },
        { name: "Dow", file: "assoc_dow.png" },
        { name: "Stonelam", file: "assoc_stonelam.png" }
      ],
      partnershipsCaption: "Strategic façade partnerships & certified excellence — by collaborating with world-class system designers, certified glass processors, and tier-1 hardware manufacturers, Altech Enterprises delivers structurally sound, weather-proof, and high-performance fenestration solutions across India."
    }
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
      images: [data.heroImage || '/logo/icon.webp'],
    },
    twitter: {
      card: 'summary_large_image',
      title: data.metaTitle || `${data.title} | VOOMETDESIGN`,
      description: data.metaDescription || data.description,
      images: [data.heroImage || '/logo/icon.webp'],
    },
    alternates: {
      canonical: `https://www.voometdesign.com/services/${slugArray.join('/')}`,
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

const ICON_MAP: Record<string, any> = {
  Home, Sparkles, BookOpen, Briefcase, Settings,
  ShieldCheck, Package, LayoutTemplate, Check, Minus,
  PenTool, Search, Key, Lightbulb, Clock,
  GlassWater, Users, BadgeCheck, Volume2, Wrench
};

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
      <BreadcrumbSchema 
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: data.title, url: `/services/${slug}` }
        ]} 
      />
      <ServiceSchema 
        name={data.metaTitle || data.title}
        serviceType={data.title}
        description={data.metaDescription || data.description}
        url={`/services/${slug}`}
      />

      {/* ══════════════════════════════════════════════════════════════
          SLOT 1 — PREMIUM HERO SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section className="w-full relative py-0 lg:py-8 min-h-[90vh] lg:min-h-0 lg:h-[calc(100vh-80px)] overflow-hidden bg-white flex flex-col justify-end lg:justify-start">
        {/* Mobile Background Image (Only visible on mobile) */}
        <div className="absolute inset-0 w-full h-full z-0 block lg:hidden">
          <Image
            src={data.heroImage}
            alt={data.title}
            fill
            className="object-cover w-full h-full"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
        </div>

        <div className="w-full h-full flex flex-col lg:flex-row items-center relative z-10">

          {/* Left Column (Contained within safe area) */}
          <div className="w-full lg:w-1/2 flex justify-end z-10 pt-16 lg:pt-0">
            <div className="w-full max-w-[720px] px-6 md:px-12 xl:pr-16">
              {/* Label */}
              <span className="inline-flex items-center gap-3 text-[12px] font-bold tracking-[0.25em] uppercase text-slate-300 lg:text-slate-500 mb-6">
                {slug === "facades-glazing" ? "OUR EXPERTISE • IN-HOUSE FABRICATION" : "SPACES WE DESIGN"}
              </span>

              {/* Heading */}
              <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.05] text-white lg:text-[#0f172a] mb-6 capitalize">
                {data.subtitle}
              </h1>

              {/* Description */}
              <p className="text-slate-200 lg:text-slate-500 text-[14px] lg:text-[18px] leading-relaxed mb-3 lg:mb-4 max-w-lg">
                <span className="block lg:hidden">{data.shortDescription || data.description}</span>
                <span className="hidden lg:block">{data.description}</span>
              </p>

              {/* 2x2 Feature Grid */}
              <div className="grid grid-cols-2 gap-2.5 lg:gap-3 mb-4 lg:mb-6">
                {data.whyChooseVoomet.slice(0, 4).map((feat, i) => {
                  const Icon = feat.icon;
                  return (
                    <div key={i} className="flex items-center gap-2 lg:gap-3 bg-white/70 backdrop-blur-md border border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-2xl lg:rounded-3xl p-2 lg:p-4 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden">
                      <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-slate-100/80 flex items-center justify-center flex-shrink-0">
                        {Icon && <Icon className="text-slate-600 w-4 h-4 lg:w-5 lg:h-5" strokeWidth={2.5} />}
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-xs lg:text-[14px] font-semibold lg:font-extrabold text-slate-900 leading-tight line-clamp-1 lg:line-clamp-none">
                          {feat.title}
                        </span>
                        <span className="text-[10px] lg:text-[12px] text-slate-500 tracking-wide leading-tight mt-0.5 line-clamp-1">
                          {feat.description}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-2 gap-2 lg:gap-3 mt-2 lg:mt-6 mb-6 lg:mb-8">
                <Link href="/contact" className="group flex items-center justify-center gap-1 lg:gap-2 w-full px-2 lg:px-6 py-3.5 lg:py-4 bg-white lg:bg-[#0f172a] text-[#0f172a] lg:text-white rounded-full text-[11px] lg:text-[14px] font-bold uppercase tracking-wide hover:bg-slate-200 lg:hover:bg-[#1e293b] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap">
                  Book Consultation
                  <ArrowRight size={16} className="hidden lg:block group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/portfolio" className="group flex items-center justify-center gap-1 lg:gap-2 w-full px-2 lg:px-6 py-3.5 lg:py-4 bg-transparent text-white lg:text-[#0f172a] border-2 border-white/50 lg:border-slate-200 rounded-full text-[11px] lg:text-[14px] font-bold uppercase tracking-wide hover:border-white lg:hover:border-[#0f172a] transition-all duration-300 whitespace-nowrap">
                  View Projects
                  <ArrowUpRight size={16} className="hidden lg:block group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>

              {/* Tagline & Decorative Element */}
              <div className="relative mt-8 hidden lg:block">
                <div className="absolute -left-6 -top-4 w-16 h-16 opacity-10 pointer-events-none hidden lg:block" style={{ backgroundImage: 'radial-gradient(#0B1633 1.5px, transparent 1.5px)', backgroundSize: '8px 8px' }}></div>
                <p className="text-[14px] font-medium text-slate-500 relative z-10 pl-4 border-l-[3px] border-[#3b82f6]">
                  {data.tagline?.prefix || "Designing today\'s spaces for"} <span className="text-[#3b82f6] font-bold">{data.tagline?.highlight || "tomorrow\'s leaders"}</span>{data.tagline?.suffix || "."}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (Image Bleed) */}
          <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0 px-0 lg:px-0 lg:h-full flex flex-col lg:flex-row items-center justify-end lg:justify-start">
            {/* Image Wrapper - Hidden on Mobile since it's now the background */}
            <div className="hidden lg:block relative w-full h-[400px] sm:h-[500px] lg:h-full max-h-[500px] lg:max-h-[550px] rounded-3xl lg:rounded-none lg:rounded-l-[40px] rounded-tr-[60px] lg:rounded-tr-[120px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
              <div className="absolute inset-0 bg-slate-100 animate-pulse -z-10" />
              {data.heroImages && data.heroImages.length > 0 ? (
                <>
                  <style>{`
                    @keyframes heroFade {
                      0%, 20% { opacity: 1; }
                      25%, 95% { opacity: 0; }
                      100% { opacity: 1; }
                    }
                  `}</style>
                  {data.heroImages.map((img, i) => (
                    <Image
                      key={img}
                      src={img}
                      alt={data.title}
                      fill
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-[2s] ease-out absolute top-0 left-0"
                      style={{ 
                        animation: `heroFade ${data.heroImages!.length * 4}s infinite`,
                        animationDelay: `${i * 4}s` 
                      }}
                      priority={i === 0}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ))}
                </>
              ) : (
                <Image
                  src={data.heroImage}
                  alt={data.title}
                  fill
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-[2s] ease-out"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/20 via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>

            {/* Overlapping Stats Bar (Marquee on mobile, Grid on desktop) */}
            {data.heroStats && data.heroStats.length > 0 && (
              <div className="w-full relative lg:absolute lg:bottom-0 lg:left-0 lg:right-0 bg-[#0f172a]/90 lg:bg-[#0f172a] backdrop-blur-md lg:backdrop-blur-none lg:rounded-none lg:rounded-bl-[40px] shadow-2xl py-3 lg:py-4 px-0 lg:px-6 overflow-hidden z-20 border-t border-white/10 flex items-center mt-auto lg:mt-0">
                <style>{`
                  @keyframes mobile-hero-marquee {
                    from { transform: translateX(0); }
                    to { transform: translateX(-33.33%); }
                  }
                  .animate-mobile-hero-marquee {
                    animation: mobile-hero-marquee 15s linear infinite;
                  }
                  @media (min-width: 1024px) {
                    .animate-mobile-hero-marquee {
                      animation: none !important;
                      transform: none !important;
                    }
                  }
                `}</style>
                <div className="flex animate-mobile-hero-marquee lg:animate-none w-max lg:w-full items-center lg:flex lg:flex-row lg:justify-around gap-8 lg:gap-4 px-4 lg:px-0">
                  {/* Duplicate stats array on mobile to create infinite loop effect */}
                  {[...data.heroStats!, ...data.heroStats!, ...data.heroStats!].map((stat, i) => {
                    const StatIcon = ICON_MAP[stat.iconName] || Check;
                    return (
                      <div key={i} className={`flex items-center gap-2 lg:gap-3 ${i >= data.heroStats!.length ? 'lg:hidden' : ''}`}>
                        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                          <StatIcon className="text-white" size={16} strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[16px] lg:text-[18px] font-extrabold text-white leading-none whitespace-nowrap">{stat.value}</span>
                          <span className="text-[9px] lg:text-[10px] font-medium text-slate-400 uppercase tracking-wider leading-tight whitespace-nowrap">{stat.label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      <StickyServiceNav />

      {/* ══════════════════════════════════════════════════════════════
          SLOT 2 — ASSOCIATE COMPANY SHOWCASE OR WHY CHOOSE VOOMET
      ══════════════════════════════════════════════════════════════ */}
      {data.associateCompanyContent ? (
        <AltechFacadeSection data={data.associateCompanyContent} />
      ) : (
        <>
          <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-20 bg-white border-y border-slate-100">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
              <div className="md:w-1/2">
                <span className="text-[12px] font-bold tracking-[0.25em] uppercase text-[#6E7D9B] block mb-4 text-left">
                  OUR ADVANTAGE
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#0B1633] text-left">
                  WHY CHOOSE US
                </h2>
              </div>
              <div className="md:w-1/2 md:text-right">
                <p className="text-[14px] md:text-[16px] text-slate-500 leading-relaxed md:ml-auto text-left md:text-right">
                  Explore our core strengths and discover why we are the preferred.
                </p>
              </div>
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
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
                <div className="md:w-1/2">
                  <span className="text-[12px] uppercase tracking-[0.25em] font-bold text-[#6E7D9B] mb-4 block text-left">
                    COMMERCIAL FACADE SOLUTIONS
                  </span>
                  <h2 className="text-[32px] md:text-[42px] font-[700] text-[#0B1633] leading-[1.1] tracking-tight mb-0 text-left">
                    Engineered for Modern Architecture
                  </h2>
                </div>
                <div className="md:w-1/2 md:text-right">
                  <p className="text-[14px] md:text-[16px] text-slate-600 leading-relaxed md:ml-auto text-left md:text-right">
                    We provide complete façade solutions for commercial buildings, IT parks, shopping complexes, hotels, hospitals, and corporate offices — engineered to deliver strength, energy efficiency, weather resistance, and modern architectural appeal.
                  </p>
                </div>
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
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
                <div className="md:w-1/2">
                  <span className="text-[12px] uppercase tracking-[0.25em] font-bold text-[#6E7D9B] mb-4 block text-left">
                    ADDITIONAL SERVICES
                  </span>
                  <h2 className="text-[32px] md:text-[42px] font-[700] text-[#0B1633] leading-[1.1] tracking-tight mb-0 text-left">
                    Fenestration Solutions
                  </h2>
                </div>
                <div className="md:w-1/2 md:text-right">
                  <p className="text-[14px] md:text-[16px] text-slate-600 leading-relaxed md:ml-auto text-left md:text-right">
                    {data.fenestrationDescription}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* ══════════════════════════════════════════════════════════════
              SLOT 2.6 — CAPABILITIES (OPTIONAL)
          ══════════════════════════════════════════════════════════════ */}
          {data.capabilities && data.capabilities.length > 0 && (
            <section className="w-full py-20 bg-[#0B1633] px-6 md:px-12">
              <div className="max-w-[1440px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
                  <div className="md:w-1/2">
                    <span className="text-[12px] uppercase tracking-[0.25em] font-bold text-white/50 mb-3 block text-left">
                      CORE EXPERTISE
                    </span>
                    <h2 className="text-[32px] md:text-[40px] font-[700] text-white leading-[1.1] tracking-tight mb-0 text-left">
                      Our Capabilities
                    </h2>
                  </div>
                  <div className="md:w-1/2 md:text-right">
                    <p className="text-[14px] md:text-[16px] text-white/70 leading-relaxed md:ml-auto text-left md:text-right">
                      Explore our specialized capabilities that define the quality and precision of our architectural systems.
                    </p>
                  </div>
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
        </>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SLOT 4.5 — CONTEXT-SPECIFIC TECHNICAL FORM
      ══════════════════════════════════════════════════════════════ */}
      {(slug === "aluminium-systems" || slug === "upvc-systems") && (
        <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start border-t border-slate-100 mt-12 text-left">

          {/* LEFT COLUMN: Technical Parameters */}
          <div className="flex flex-col">
            <span className="text-caption font-bold tracking-[0.28em] uppercase text-[#6E7D9B] block mb-3">
              TECHNICAL SPECIFICATIONS
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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="md:w-1/2">
            <span className="text-caption font-bold tracking-[0.28em] uppercase text-[#6E7D9B] block mb-3 text-left">
              Architectural Integrity & Execution
            </span>
            <h2
              className="text-h2 font-bold leading-tight tracking-tight text-slate-950 text-left mb-0"
            >
              How We{" "}
              <em className="not-italic font-light text-slate-500">Deliver Perfection</em>
            </h2>
          </div>
          <div className="md:w-1/2 md:text-right">
            <p className="text-[14px] md:text-[16px] text-slate-600 leading-relaxed md:ml-auto text-left md:text-right">
              Our seamless, end-to-end execution standards ensuring perfection.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {data.perfectionSteps.map((step, idx) => (
            <div
              key={step.title}
              className="group relative flex flex-col bg-white/70 backdrop-blur-md rounded-3xl border border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 h-full overflow-hidden"
            >
              {step.image && (
                <div className="w-full h-48 md:h-52 relative overflow-hidden bg-slate-100 rounded-b-2xl">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              )}
              <div className="px-6 py-5 md:px-8 md:py-7 flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-3xl md:text-4xl font-extrabold text-slate-200 group-hover:text-slate-300 transition-colors duration-300 leading-none">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-slate-900 font-extrabold text-[13px] md:text-[14px] tracking-[0.15em] uppercase leading-none mt-1">
                    {step.title}
                  </h3>
                </div>
                <p className="tracking-wide text-slate-500 text-sm leading-relaxed flex-1">{step.description}</p>
              </div>
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
          SLOT 5.5b — FACADE & GLAZING INQUIRY FORM
      ══════════════════════════════════════════════════════════════ */}
      {slug === "facades-glazing" && (
        <section className="w-full py-16 md:py-24 bg-[#FAFAF8] relative">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <div className="flex flex-col lg:flex-row w-full min-h-[500px] bg-white rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.05)] relative border border-slate-100">
              {/* LEFT PANEL */}
              <div className="w-full lg:w-[42%] relative flex flex-col justify-center p-8 md:p-10 lg:p-12 text-white min-h-[300px] lg:min-h-[500px]">
                <div className="absolute inset-0 z-0">
                  <Image 
                    src="/facade.webp"
                    alt="Facade Engineering Consultation"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,27,78,0.80)' }} />
                  <div className="hidden lg:block absolute inset-y-0 right-0 w-[60px] bg-gradient-to-r from-transparent to-white z-10" />
                  <div className="block lg:hidden absolute inset-x-0 bottom-0 h-[60px] bg-gradient-to-t from-transparent to-white z-10" />
                </div>
                
                <div className="relative z-20">
                  <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-white/70 mb-3 block">
                    PROJECT ENGINEERING
                  </span>
                  <h2 className="text-[28px] md:text-[36px] lg:text-[42px] font-[700] leading-[1.1] tracking-tight mb-3">
                    Facade &amp; Glazing Consultation
                  </h2>
                  <p className="text-[14px] md:text-[15px] text-white/80 leading-[1.6] mb-6 max-w-[400px]">
                    Consult with Altech Enterprises engineering specialists for structural glazing, curtain wall sizing, and site feasibility.
                  </p>
                  
                  <div className="flex flex-col gap-2.5">
                    {[
                      "Wind Load & Structural Calculation",
                      "CNC Fabrication & Quality Verification",
                      "Pan-India Turnkey Facade Execution"
                    ].map((point, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                          <Check size={12} className="text-white" />
                        </div>
                        <span className="text-white/90 font-medium tracking-wide text-[13px]">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT PANEL */}
              <div className="w-full lg:w-[58%] bg-white flex items-center justify-center p-6 md:p-10 lg:p-12 relative z-20">
                <div className="w-full max-w-2xl">
                  <SystemInquiryForm slug="facades-glazing" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SLOT 5.5 — CLIENT & INSTALLATION LOGOS MARQUEE
      ══════════════════════════════════════════════════════════════ */}
      {!data.associateCompanyContent && (
        <AltechClientMarquee className="border-t border-slate-100" />
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
