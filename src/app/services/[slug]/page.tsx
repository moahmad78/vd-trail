// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
// Dynamic service route — handles all slugs not covered by static folders.
// Static routes (/residential, /hospitality, /educational, /aluminium) take
// priority in Next.js App Router and are unaffected by this file.

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import {
  Home, Sparkles, BookOpen, Briefcase, Settings,
  ShieldCheck, Package, LayoutTemplate, Check, Minus,
  PenTool, Search, Key, Lightbulb, Clock,
  GlassWater, Users, BadgeCheck, Volume2, Wrench,
} from "lucide-react";
import ServiceCinematicCTA from "@/components/ServiceCinematicCTA";
import MobileAutoScrollCarousel from "@/components/animations/MobileAutoScrollCarousel";
import ServiceFeatureAccordion from "@/components/ServiceFeatureAccordion";
import MobileMaterialComparison from "@/components/MobileMaterialComparison";

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

interface ServiceData {
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  featureImage: string;
  heroBadges: string[];
  valuePillars: ValuePillar[];
  featureBlocks: FeatureBlock[];
  comparisonRows: ComparisonRow[];
  perfectionSteps: PerfectionStep[];
  ctaHeadline: string;
  ctaCopy: string;
  ctaCategory: string;
  videoSrc?: string;
  metaTitle: string;
  metaDescription: string;
}

/* ─── Service Data Matrix ───────────────────────────────────────────── */

const SERVICE_DATA: Record<string, ServiceData> = {

  /* ── RESIDENTIAL ─────────────────────────────────────────────────── */
  "residential-interiors": {
    title: "ELITE RESIDENTIAL LIVING & TURNKEY PRECISION",
    subtitle: "RESIDENTIAL INTERIORS",
    description: "Crafting ultra-luxury bespoke homes, villas, and premium apartments. We fuse advanced spatial layout planning with state-of-the-art precision manufacturing to deliver uncompromised design excellence.",
    heroImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000",
    featureImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000",
    heroBadges: ["Bespoke Planning", "Material Procurement", "3D Render & Mapping", "Handcrafted Details", "Turnkey Setup"],
    valuePillars: [
      { icon: "✏️", heading: "LIFETIME CUSTOMIZATION", copy: "Tailored interior renovation choices that adapt gracefully to your evolving spatial needs." },
      { icon: "🔍", heading: "TOTAL TRANSPARENCY", copy: "Detailed material breakdowns, clear structural costing timelines, and zero hidden overhead tracking." },
      { icon: "🔑", heading: "COMPLETE TURNKEY PEACE", copy: "Concept to completion management, handling site execution completely while you watch your vision manifest." },
    ],
    featureBlocks: [
      { heading: "BESPOKE CRAFTSMANSHIP", copy: "Every element of your home is tailor-made to match your lifestyle, ensuring impeccable finish and elite quality control.", chip: "Custom Millwork · Quality Control" },
      { heading: "SMART LIVING INTEGRATION", copy: "Seamlessly embedding automated climate control, energy-efficient architectural lighting systems, and modern smart security.", chip: "Smart Automation · Energy Efficient" },
      { heading: "HOLISTIC SPACE PLANNING", copy: "Engineering functional layout blueprints that maximize spatial volume, natural illumination, and ergonomic comfort.", chip: "Ergonomic Layouts · Natural Lighting" },
    ],
    comparisonRows: [
      { feature: "Design Consultation", standard: "2D Layouts", premium: "3D Views Included", luxury: "Comprehensive VR Walkthrough" },
      { feature: "Modular Kitchen", standard: "Standard Laminate", premium: "Anti-Scratch Acrylic", luxury: "PU Gloss / Ceramic Finish" },
      { feature: "Flooring Elements", standard: "Premium Tiles", premium: "Engineered Wood", luxury: "Italian Marble / Onyx Slate" },
      { feature: "Hardware Fitting", standard: "Standard Premium", premium: "Soft-Close Premium", luxury: "International Bespoke Systems" },
      { feature: "Lighting Plan", standard: "Basic Layout", premium: "Automation Ready", luxury: "Smart Architectural System" },
      { feature: "Site Management", standard: "General Supervisor", premium: "Dedicated Project Lead", luxury: "Senior Project Manager" },
      { feature: "After-Care Warranty", standard: "1 Year Support", premium: "3 Years Warranty", luxury: "Lifetime Structural Coverage" },
    ],
    perfectionSteps: [
      { icon: "📐", title: "CONCEPTUAL CONSULTATION", description: "Understanding your lifestyle brief and mapping space parameters." },
      { icon: "⚙️", title: "FABRICATION & ENGINEERING", description: "In-house production blueprints finalized for precision custom manufacturing." },
      { icon: "🪵", title: "CURATED MATERIAL SELECTION", description: "Finalizing stone finishes, premium veneers, and luxury fit-outs at our experience studio." },
      { icon: "🏗️", title: "TECHNICAL SURVEY ON-SITE", description: "Laser-accurate measurements taken by engineering team to avoid layout displacement." },
      { icon: "⚡", title: "EXECUTION MANAGEMENT", description: "Rigorous turnkey structural implementation overseen by expert site in-charges." },
      { icon: "📋", title: "CLINICAL HANDOVER", description: "Deep cleaning, quality audit passes, and seamless key presentation to the stakeholder." },
    ],
    ctaHeadline: "Every Great Home Begins With A Conversation.",
    ctaCopy: "From bespoke layouts to turnkey execution, we craft homes designed around your lifestyle, transforming ideas into spaces that truly feel like home.",
    ctaCategory: "Residential Interiors",
    metaTitle: "Residential Interiors | VOOMETDESIGN — Luxury Turnkey Homes",
    metaDescription: "Bespoke luxury villa and home interiors by VOOMETDESIGN. Custom modular kitchens, wardrobes, false ceilings, and full turnkey delivery with lifetime warranty.",
  },

  /* ── COMMERCIAL INTERIORS ────────────────────────────────────────── */
  "commercial-interiors": {
    title: "HIGH-PERFORMANCE CORPORATE SPACES & OFFICES",
    subtitle: "COMMERCIAL INTERIORS",
    description: "Engineering scalable, high-productivity workspace layouts, executive boardrooms, and tech-driven commercial centers that blend workplace ergonomics with elite corporate brand identities.",
    heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069",
    featureImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069",
    heroBadges: ["Corporate Workstations", "Executive Suites", "Acoustic Partitioning", "Ergonomic Layouts", "Turnkey Outfits"],
    valuePillars: [
      { icon: "📐", heading: "INTEGRATED WORKSPACE OPTIMIZATION", copy: "Maximum density and ergonomic layout planning ensuring every square foot serves a functional corporate purpose." },
      { icon: "🔊", heading: "ADAPTIVE ACOUSTIC ENGINEERING", copy: "Sound buffering, thermal breaks, and noise reduction mapping tailored for high-focus corporate zones." },
      { icon: "🏢", heading: "ENTERPRISE AESTHETIC MAPPING", copy: "Translating brand identity into physical spatial reality through bespoke materials, lighting, and custom millwork." },
    ],
    featureBlocks: [
      { heading: "HIGH-PERFORMANCE WORKSCAPES", copy: "Open-plan layouts engineered for natural light, acoustic zoning, and ergonomic flow, maximizing team productivity.", chip: "Ergonomic Flow · Acoustic Zoning" },
      { heading: "EXECUTIVE SUITES", copy: "Premium cabins and boardrooms with custom acoustic paneling, integrated AV systems, and elite material finishing.", chip: "Custom Millwork · Integrated AV" },
      { heading: "COLLABORATIVE HUBS", copy: "Breakout zones and lounge areas designed to encourage spontaneous collaboration and creative problem-solving.", chip: "Biophilic Design · Flexible Seating" },
    ],
    comparisonRows: [
      { feature: "Core MEP Systems", standard: "Basic Code", premium: "Advanced HVAC", luxury: "Smart Integration" },
      { feature: "Lighting", standard: "Task Lighting", premium: "Layered Zones", luxury: "Smart Ambient Architectural" },
      { feature: "Asset Layout Density", standard: "Standard Flow", premium: "High Yield", luxury: "Bespoke Spacing" },
      { feature: "Project Handover Certification", standard: "Basic Quality Pass", premium: "Detailed Audit", luxury: "Zero-Snag Certification Passes" },
    ],
    perfectionSteps: [
      { icon: "📊", title: "WORKFORCE & FLOW ANALYSIS", description: "Headcount mapping, departmental adjacency studies, and future growth projections." },
      { icon: "👁️", title: "CONCEPT & BRAND ALIGNMENT", description: "Interior concepts developed in alignment with your corporate brand identity." },
      { icon: "🪵", title: "COMMERCIAL-GRADE SOURCING", description: "Heavy-duty, certified materials selected for extreme longevity and acoustic performance." },
      { icon: "🏗️", title: "PHASED CONSTRUCTION", description: "Phased execution minimizing downtime so your business never fully halts." },
      { icon: "⚡", title: "MEP & TECHNOLOGY INTEGRATION", description: "Seamless electrical, data, and AV integration at every single workstation." },
      { icon: "📋", title: "TURNKEY HANDOVER", description: "Full zero-snag resolution, asset documentation, and maintenance guidelines." },
    ],
    ctaHeadline: "EVERY PRODUCTIVE WORKSPACE BEGINS WITH STRATEGY.",
    ctaCopy: "Building environments that empower businesses through intelligent planning, premium finishes, and precision execution.",
    ctaCategory: "Commercial Interiors",
    metaTitle: "Commercial Interiors | VOOMETDESIGN — Premium Office Design",
    metaDescription: "High-performance commercial interior design by VOOMETDESIGN. Corporate workstations, executive suites, and turnkey outfits.",
  },

  /* ── ALUMINIUM SYSTEMS ───────────────────────────────────────────── */
  "aluminium-systems": {
    title: "ALUMINIUM SYSTEMS",
    subtitle: "ARCHITECTURAL FAÇADES & SLIMLINE GLAZING SOLUTIONS",
    description: "Fabricating premium structural curtain walls, minimal sightline sliding windows, and sky-lights engineered with high structural wind load resistance and ultra-thin profiles.",
    heroImage: "https://images.unsplash.com/photo-1590483734724-383b85ad65e7?q=80&w=1200",
    featureImage: "https://images.unsplash.com/photo-1503708928676-1cb796a0891e?q=80&w=2074",
    heroBadges: ["Slimline Profiles", "Structural Glazing", "Curtain Walls", "Thermal Break Systems", "Precision Engineering"],
    valuePillars: [
      { icon: "🖼️", heading: "ZERO-SIGHTLINE STRUCTURAL GEOMETRY", copy: "Ultra-minimalist frames offering completely unobstructed panoramic views." },
      { icon: "🌡️", heading: "THERMAL & SOUND ATTENUATION", copy: "Double-glazed insulation and thermal break profiles achieving superior energy ratings." },
      { icon: "🌪️", heading: "STRUCTURAL WIND RESISTANCE", copy: "Reinforced tracks and heavy-duty load bearings certified to withstand extreme weather." },
    ],
    featureBlocks: [
      { heading: "ZERO-NOISE SYSTEMS", copy: "Double-glazed acoustic barriers designed to cancel maximum external noise, creating a peaceful sanctuary.", chip: "Acoustic Insulation · Thermal Break" },
      { heading: "MEDICAL-GRADE PRECISION", copy: "Airtight and waterproof seals engineered flawlessly for lifelong elemental protection.", chip: "Airtight Seals · Weatherproof" },
      { heading: "ARCHITECTURAL AESTHETICS", copy: "Bespoke powder-coated finishes in exact RAL color-matches ensuring perfect architectural synergy.", chip: "Slimline Profiles · Custom RAL" },
    ],
    comparisonRows: [
      { feature: "Profile Thickness", standard: "Standard 45mm", premium: "Slimline 60mm", luxury: "Ultra-Slim 80mm" },
      { feature: "Glass Customization", standard: "Single Glaze", premium: "Toughened Glass", luxury: "Double Glazed DGU" },
      { feature: "Hardware Origin", standard: "Standard Grade", premium: "Standard Premium", luxury: "Euro-Groove Bespoke" },
      { feature: "Monsoon/Wind Performance", standard: "Basic Resistance", premium: "High-Load Pass", luxury: "Monsoon/Wind Pressure Performance Pass" },
    ],
    perfectionSteps: [
      { icon: "📐", title: "TECHNICAL SITE SURVEY", description: "Precision laser measurements and structural load assessments before fabrication." },
      { icon: "⚙️", title: "CNC PROFILE FABRICATION", description: "Millimeter-accurate CNC processing at our in-house manufacturing facility." },
      { icon: "🔩", title: "HARDWARE & GLASS ASSEMBLY", description: "Premium hardware integration with strict thermal break insertion." },
      { icon: "🏗️", title: "STRUCTURAL INSTALLATION", description: "Factory-trained crews deploy systems with strict leveling verification." },
      { icon: "✅", title: "ACOUSTIC & THERMAL TESTING", description: "On-site acoustic and thermal imaging verification against required specifications." },
      { icon: "📋", title: "WARRANTY DOCUMENTATION", description: "Comprehensive lifetime structural warranty packs and maintenance schedules." },
    ],
    ctaHeadline: "EVERY FLAWLESS EXECUTION BEGINS WITH PRECISION.",
    ctaCopy: "Delivering engineering excellence through in-house manufacturing and technical expertise.",
    ctaCategory: "Aluminium Systems",
    metaTitle: "Aluminium Systems | VOOMETDESIGN — Precision Fabrication",
    metaDescription: "Factory-direct slimline sliding systems, thermal break windows, and structural glazing by VOOMETDESIGN.",
  },

  /* ── UPVC SYSTEMS ────────────────────────────────────────────────── */
  "upvc-systems": {
    title: "UPVC SYSTEMS",
    subtitle: "HIGH-PERFORMANCE THERMAL & ACOUSTIC UPVC ENCLOSURES",
    description: "Engineering multi-chambered steel-reinforced UPVC window and door profiles that deliver world-class sound attenuation (up to 45dB noise reduction) and absolute thermal sealing properties.",
    heroImage: "https://images.unsplash.com/photo-1590483734724-383b85ad65e7?q=80&w=1200",
    featureImage: "https://images.unsplash.com/photo-1503708928676-1cb796a0891e?q=80&w=2074",
    heroBadges: ["Acoustic Sealing", "Multi-Chamber Insulation", "Steel-Reinforced Profiles", "Monsoon Proofing", "Zero-Maintenance"],
    valuePillars: [
      { icon: "🖼️", heading: "ZERO-SIGHTLINE STRUCTURAL GEOMETRY", copy: "Ultra-minimalist frames offering completely unobstructed panoramic views." },
      { icon: "🌡️", heading: "THERMAL & SOUND ATTENUATION", copy: "Double-glazed insulation and thermal break profiles achieving superior energy ratings." },
      { icon: "🌪️", heading: "STRUCTURAL WIND RESISTANCE", copy: "Reinforced tracks and heavy-duty load bearings certified to withstand extreme weather." },
    ],
    featureBlocks: [
      { heading: "ZERO-NOISE SYSTEMS", copy: "Double-glazed acoustic barriers designed to cancel maximum external noise, creating a peaceful sanctuary.", chip: "Acoustic Insulation · Thermal Break" },
      { heading: "MEDICAL-GRADE PRECISION", copy: "Airtight and waterproof seals engineered flawlessly for lifelong elemental protection.", chip: "Airtight Seals · Weatherproof" },
      { heading: "ARCHITECTURAL AESTHETICS", copy: "Bespoke powder-coated finishes in exact RAL color-matches ensuring perfect architectural synergy.", chip: "Slimline Profiles · Custom RAL" },
    ],
    comparisonRows: [
      { feature: "Profile Thickness", standard: "Standard 45mm", premium: "Slimline 60mm", luxury: "Ultra-Slim 80mm" },
      { feature: "Glass Customization", standard: "Single Glaze", premium: "Toughened Glass", luxury: "Double Glazed DGU" },
      { feature: "Hardware Origin", standard: "Standard Grade", premium: "Standard Premium", luxury: "Euro-Groove Bespoke" },
      { feature: "Monsoon/Wind Performance", standard: "Basic Resistance", premium: "High-Load Pass", luxury: "Monsoon/Wind Pressure Performance Pass" },
    ],
    perfectionSteps: [
      { icon: "📐", title: "TECHNICAL SITE SURVEY", description: "Precision laser measurements and structural load assessments before fabrication." },
      { icon: "⚙️", title: "CNC PROFILE FABRICATION", description: "Millimeter-accurate CNC processing at our in-house manufacturing facility." },
      { icon: "🔩", title: "HARDWARE & GLASS ASSEMBLY", description: "Premium hardware integration with strict thermal break insertion." },
      { icon: "🏗️", title: "STRUCTURAL INSTALLATION", description: "Factory-trained crews deploy systems with strict leveling verification." },
      { icon: "✅", title: "ACOUSTIC & THERMAL TESTING", description: "On-site acoustic and thermal imaging verification against required specifications." },
      { icon: "📋", title: "WARRANTY DOCUMENTATION", description: "Comprehensive lifetime structural warranty packs and maintenance schedules." },
    ],
    ctaHeadline: "EVERY FLAWLESS EXECUTION BEGINS WITH PRECISION.",
    ctaCopy: "Delivering engineering excellence through in-house manufacturing and technical expertise.",
    ctaCategory: "UPVC Systems",
    metaTitle: "UPVC Systems | VOOMETDESIGN — Precision Fabrication",
    metaDescription: "Factory-direct UPVC multi-chamber systems, sound attenuation, and thermal sealing by VOOMETDESIGN.",
  },

  /* ── SERVICE APARTMENTS ──────────────────────────────────────────── */
  "service-apartments": {
    title: "HIGH-YIELD PREMIUM HOSPITALITY SUITES",
    subtitle: "SERVICE APARTMENTS",
    description: "Designing turnkey high-density luxury living layouts for corporate transit housing and premium service apartments maximizing space volume, durability, and luxury guest retention metrics.",
    heroImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2000",
    featureImage: "https://images.unsplash.com/photo-1502672260266-1c1cd2cbdc83?q=80&w=2000",
    heroBadges: ["Optimized Floorplans", "Heavy-Duty Fitouts", "Modular Living Units", "Luxury Material Grading", "Rapid Turnkey Execution"],
    valuePillars: [
      { icon: "📈", heading: "YIELD OPTIMIZATION", copy: "Intelligently maximizing occupant capacity while preserving premium comfort metrics." },
      { icon: "🛡️", heading: "DURABILITY & LOW MAINTENANCE", copy: "Heavy-duty commercial-grade finishes built for intensive daily turnover." },
      { icon: "⚡", heading: "RAPID DEPLOYMENT", copy: "Modular execution strategies cutting timeline costs and ensuring faster ROI." },
    ],
    featureBlocks: [
      { heading: "MODULAR SUITE LAYOUTS", copy: "Compact, brilliant floor plans merging sleep, work, and kitchen zones perfectly.", chip: "Optimized Floorplans · Ergonomics" },
      { heading: "HEAVY-DUTY FITOUTS", copy: "Indestructible yet beautiful material selection scaling up asset lifespans.", chip: "Commercial Grade · High Durability" },
      { heading: "LUXURY RETENTION", copy: "Premium aesthetics guaranteeing higher guest retention and exceptional booking rates.", chip: "Luxury Aesthetics · Guest Comfort" },
    ],
    comparisonRows: [
      { feature: "Floorplan Optimization", standard: "Basic Zoning", premium: "Efficient Flow", luxury: "Maximum Yield Spacing" },
      { feature: "Fitout Durability", standard: "Residential Grade", premium: "Commercial Standard", luxury: "Heavy-Duty Bespoke" },
      { feature: "Appliance Integration", standard: "Basic Provision", premium: "Built-In Modules", luxury: "Smart Connected Suite" },
      { feature: "Turnkey Speed", standard: "Standard Timeline", premium: "Accelerated Phasing", luxury: "Rapid Modular Execution" },
    ],
    perfectionSteps: [
      { icon: "📊", title: "YIELD & SPATIAL AUDIT", description: "Mapping out exact floorplan efficiency targets." },
      { icon: "👁️", title: "MODULAR DESIGN PROTOTYPING", description: "3D visualization of typical suite variants." },
      { icon: "🪵", title: "COMMERCIAL MATERIAL SOURCING", description: "Selecting heavy-wear, luxury-feel finishes." },
      { icon: "🏗️", title: "RAPID FABRICATION", description: "Off-site construction of core modular units." },
      { icon: "⚡", title: "SCALED INSTALLATION", description: "Sequential deployment across multiple suites simultaneously." },
      { icon: "📋", title: "CLINICAL HANDOVER", description: "Final snags cleared with maintenance warranties delivered." },
    ],
    ctaHeadline: "MAXIMIZE ASSET YIELD WITH PREMIUM DESIGN.",
    ctaCopy: "Elevate your property's value and guest retention through optimized, durable luxury execution.",
    ctaCategory: "Service Apartments",
    metaTitle: "Service Apartments | VOOMETDESIGN — Premium Hospitality Suites",
    metaDescription: "Turnkey luxury living layouts for corporate transit housing and premium service apartments by VOOMETDESIGN.",
  },

  /* ── BOUTIQUE HOTELS ─────────────────────────────────────────────── */
  "boutique-hotels": {
    title: "EXPERIENTIAL HOSPITALITY DESIGN & ARCHITECTURE",
    subtitle: "BOUTIQUE HOTELS",
    description: "Creating bespoke signature themes for boutique luxury retreats, high-end lobbies, and experiential lodging spaces that project world-class architectural statements.",
    heroImage: "https://images.unsplash.com/photo-1542314831-c6a4d14d8387?q=80&w=2000",
    featureImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000",
    heroBadges: ["Bespoke Themes", "Luxury Lobbies", "Acoustic Suite Buffering", "Fine-Dining Lighting", "Premium Material Sourcing"],
    valuePillars: [
      { icon: "✨", heading: "SIGNATURE THEMATIC DESIGN", copy: "Translating abstract luxury concepts into tangible, unforgettable visual environments." },
      { icon: "🎭", heading: "IMMERSIVE LIGHTING & ACOUSTICS", copy: "Layered sensory design ensuring guests experience ultimate comfort." },
      { icon: "🍷", heading: "PREMIUM MATERIALITY", copy: "Sourcing rare, high-end textures and architectural elements for maximum prestige." },
    ],
    featureBlocks: [
      { heading: "LUXURY LOBBIES", copy: "Grand entrance designs serving as the definitive architectural statement of your hotel.", chip: "Statement Entry · Bespoke Millwork" },
      { heading: "FINE-DINING AMBIANCE", copy: "Intimate, perfectly lit culinary zones designed to extend patron dwell-time.", chip: "Layered Lighting · Spatial Flow" },
      { heading: "ACOUSTIC SUITES", copy: "Hyper-isolated guest rooms guaranteeing absolute silence and serenity.", chip: "Sound Buffering · Serene Comfort" },
    ],
    comparisonRows: [
      { feature: "Thematic Complexity", standard: "Modern Standard", premium: "Curated Motif", luxury: "Full Bespoke Immersion" },
      { feature: "Lobby Materials", standard: "Premium Tiles", premium: "Imported Stone", luxury: "Rare Architectural Marbles" },
      { feature: "Suite Acoustics", standard: "Basic Buffering", premium: "Enhanced Walls", luxury: "Total Acoustic Isolation" },
      { feature: "Lighting Systems", standard: "Standard Ambience", premium: "Zoned Controls", luxury: "Smart Architectural DALI" },
    ],
    perfectionSteps: [
      { icon: "🎨", title: "THEMATIC VISIONING", description: "Establishing the core experiential narrative." },
      { icon: "👁️", title: "IMMERSIVE 3D MAPPING", description: "Photorealistic rendering of lobby and suite typologies." },
      { icon: "💎", title: "RARE MATERIAL PROCUREMENT", description: "Sourcing bespoke finishes, lighting fixtures, and custom art." },
      { icon: "🏗️", title: "ARTISANAL FABRICATION", description: "Crafting custom joinery and specialized architectural elements." },
      { icon: "⚡", title: "PRECISION EXECUTION", description: "Flawless site integration by master craftsmen." },
      { icon: "📋", title: "WHITE-GLOVE HANDOVER", description: "Exhaustive quality assurance and final operational handover." },
    ],
    ctaHeadline: "EVERY UNFORGETTABLE STAY BEGINS WITH A VISION.",
    ctaCopy: "Design world-class boutique environments that define luxury hospitality and guarantee guest loyalty.",
    ctaCategory: "Boutique Hotels",
    metaTitle: "Boutique Hotels | VOOMETDESIGN — Luxury Hospitality Architecture",
    metaDescription: "Bespoke signature themes and experiential hospitality design for luxury boutique hotels by VOOMETDESIGN.",
  },

  /* ── PG ACCOMMODATION ────────────────────────────────────────────── */
  "pg-accommodation": {
    title: "MAXIMUM EFFICIENCY CO-LIVING INFRASTRUCTURE",
    subtitle: "P.G ACCOMMODATION",
    description: "Engineering high-yield co-living micro-studios and elite PG accommodation structures that prioritize extreme space optimization, modern community zones, and long-term asset structural integrity.",
    heroImage: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2000",
    featureImage: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2000",
    heroBadges: ["Micro-Space Layouts", "Heavy-Wear Materials", "Community Lounges", "Smart Storage Integration", "Cost-Effective Scale"],
    valuePillars: [
      { icon: "📐", heading: "EXTREME SPACE OPTIMIZATION", copy: "Intelligent multi-functional furniture and layouts squeezing value from every square foot." },
      { icon: "🤝", heading: "COMMUNITY ZONE ENGINEERING", copy: "Designing magnetic common areas that foster social connection and retention." },
      { icon: "💰", heading: "COST-EFFECTIVE SCALABILITY", copy: "Standardized modular replication for maximum budget efficiency across multiple floors." },
    ],
    featureBlocks: [
      { heading: "MICRO-STUDIO LAYOUTS", copy: "Compact private zones balancing comfort with absolute spatial efficiency.", chip: "Space Optimization · Smart Storage" },
      { heading: "HEAVY-WEAR MATERIALS", copy: "Anti-vandal, highly durable surfaces designed to outlast high-frequency tenant turnover.", chip: "Anti-Vandal · Commercial Durability" },
      { heading: "COMMUNITY LOUNGES", copy: "Vibrant, flexible breakout spaces serving as the core social hub of the property.", chip: "Social Hubs · Flexible Seating" },
    ],
    comparisonRows: [
      { feature: "Layout Efficiency", standard: "Standard Zoning", premium: "Optimized Flow", luxury: "Micro-Space Perfection" },
      { feature: "Material Durability", standard: "Residential Grade", premium: "Heavy-Wear Surfaces", luxury: "Anti-Vandal Commercial" },
      { feature: "Storage Solutions", standard: "Basic Wardrobe", premium: "Built-In Systems", luxury: "Smart Hidden Storage" },
      { feature: "Community Areas", standard: "Basic Lobby", premium: "Furnished Lounge", luxury: "Full Co-Living Hub" },
    ],
    perfectionSteps: [
      { icon: "📈", title: "CAPACITY AUDIT", description: "Analyzing footprint constraints to maximize unit density." },
      { icon: "👁️", title: "MODULAR PROTOTYPING", description: "Designing scalable base unit layouts." },
      { icon: "🪵", title: "DURABILITY SOURCING", description: "Selecting the highest endurance materials for budget parameters." },
      { icon: "🏗️", title: "SCALED REPLICATION", description: "Mass-fabricating modular elements for rapid deployment." },
      { icon: "⚡", title: "PHASED FITOUT", description: "Installing infrastructure sequentially floor-by-floor." },
      { icon: "📋", title: "OPERATIONAL HANDOVER", description: "Delivering fully functional, tenant-ready properties." },
    ],
    ctaHeadline: "ENGINEER YOUR CO-LIVING ASSETS FOR MAXIMUM YIELD.",
    ctaCopy: "Transform standard properties into high-density, high-return community living spaces.",
    ctaCategory: "P.G Accommodation",
    metaTitle: "P.G Accommodation | VOOMETDESIGN — High-Yield Co-Living",
    metaDescription: "Extreme space optimization and durable co-living micro-studios by VOOMETDESIGN.",
  },

  /* ── EDUCATIONAL INSTITUTIONS ────────────────────────────────────── */
  "educational-institutions": {
    title: "INSPIRING LEARNING SPACES & MODERN CAMPUSES",
    subtitle: "EDUCATIONAL INSTITUTIONS",
    description: "Developing smart learning environments, ergonomic high-density lecture halls, advanced research laboratories, and institutional hubs built for safety, longevity, and high spatial acoustics.",
    heroImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070",
    featureImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000",
    heroBadges: ["Ergonomic Lecture Halls", "Acoustic Classroom Buffering", "Anti-Microbial Surfaces", "Safe Material Sourcing", "Tech-Ready Frameworks"],
    valuePillars: [
      { icon: "🛡️", heading: "SAFETY & COMPLIANCE", copy: "Strict adherence to institutional safety codes, fire regulations, and accessibility standards." },
      { icon: "🧠", heading: "ERGONOMIC FOCUS", copy: "Seating and layout topologies proven to enhance student attention and physical well-being." },
      { icon: "🔊", heading: "SPATIAL ACOUSTICS", copy: "Engineered sound absorption ensuring lecture clarity and minimizing corridor distractions." },
    ],
    featureBlocks: [
      { heading: "HIGH-DENSITY LECTURE HALLS", copy: "Tiered, ergonomic layouts integrating seamlessly with modern institutional AV technology.", chip: "Ergonomics · Tech-Ready" },
      { heading: "ADVANCED LABORATORIES", copy: "Safety-first casework and specialized technical surfaces designed for rigorous academic use.", chip: "Chemical Resistant · Safety Compliant" },
      { heading: "ACOUSTIC CLASSROOMS", copy: "Anti-microbial, sound-dampened environments providing the ultimate blank canvas for learning.", chip: "Acoustic Buffering · Anti-Microbial" },
    ],
    comparisonRows: [
      { feature: "Classroom Ergonomics", standard: "Basic Desk Setup", premium: "Posture-Support Seating", luxury: "Advanced Ergonomic Tiering" },
      { feature: "Acoustic Insulation", standard: "Standard Drywall", premium: "Acoustic Panels", luxury: "Full Auditory Buffering" },
      { feature: "Material Safety", standard: "Standard Paints", premium: "Low-VOC", luxury: "Anti-Microbial Surfaces" },
      { feature: "Tech Infrastructure", standard: "Basic Outlets", premium: "AV Ready", luxury: "Fully Integrated Smart Framework" },
    ],
    perfectionSteps: [
      { icon: "📚", title: "INSTITUTIONAL BRIEF", description: "Mapping curriculum requirements to physical space demands." },
      { icon: "👁️", title: "SAFETY & FLOW DESIGN", description: "Drafting 3D layouts ensuring optimal student circulation and compliance." },
      { icon: "🪵", title: "COMPLIANT SOURCING", description: "Procuring certified, non-toxic, and high-durability institutional materials." },
      { icon: "🏗️", title: "OFF-HOURS FABRICATION", description: "Staging construction around academic calendars." },
      { icon: "⚡", title: "SYSTEMS INTEGRATION", description: "Installing high-tech AV and laboratory safety equipment." },
      { icon: "📋", title: "CAMPUS HANDOVER", description: "Comprehensive audit and facility management handover." },
    ],
    ctaHeadline: "BUILD THE FOUNDATION FOR FUTURE INNOVATORS.",
    ctaCopy: "Construct inspiring, safety-first educational environments that stand the test of time.",
    ctaCategory: "Educational Institutions",
    metaTitle: "Educational Institutions | VOOMETDESIGN — Inspiring Learning Spaces",
    metaDescription: "Smart learning environments, ergonomic lecture halls, and advanced institutional hubs by VOOMETDESIGN.",
  },
};

/* ─── SEO Metadata ──────────────────────────────────────────────────── */

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
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
      canonical: `https://voometdesign.com/services/${slug}`,
    },
  };
}

/* ─── Static Params (SSG) ───────────────────────────────────────────── */

export function generateStaticParams() {
  return Object.keys(SERVICE_DATA).map((slug) => ({ slug }));
}

/* ─── Cell Renderer ─────────────────────────────────────────────────── */
// Moved to MobileMaterialComparison.tsx

/* ─── Page ──────────────────────────────────────────────────────────── */

export default async function ServiceSlugPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const data = SERVICE_DATA[slug];
  if (!data) notFound();

  const isTechnicalSystem = slug === "aluminium-systems" || slug === "upvc-systems";

  return (
    <main className="bg-gradient-to-br from-white via-slate-50 to-slate-100 min-h-screen">

      {/* ══════════════════════════════════════════════════════════════
          SLOT 1 — FUSED HERO & PILL TAGS
      ══════════════════════════════════════════════════════════════ */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Typography + Badges */}
          <div className="flex flex-col mt-2">

            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 text-caption font-bold tracking-[0.28em] uppercase text-[#6E7D9B] mb-6 w-fit">
              <span className="h-px w-5 bg-[#6E7D9B] flex-shrink-0" />
              VOOMETDESIGN · {data.subtitle}
            </span>

            {/* H1 */}
            <h1
              className="text-h1 font-extrabold tracking-tight leading-[1.05] text-slate-950 mb-5"
            >
              {data.title}
            </h1>

            {/* Description */}
            <p className="text-body md:text-body text-slate-600 leading-snug md:leading-relaxed font-medium mb-5 md:mb-7 max-w-lg line-clamp-3 md:line-clamp-none">
              {data.description}
            </p>

            {/* Pill Badges */}
            <MobileAutoScrollCarousel className="md:flex md:flex-wrap gap-2">
              {data.heroBadges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center min-w-fit snap-start py-1 px-3 bg-slate-100/90 border border-slate-200 text-slate-800 text-[11px] md:text-button font-semibold rounded-full tracking-wide gap-1.5 shrink-0"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-400 flex-shrink-0" />
                  {badge}
                </span>
              ))}
            </MobileAutoScrollCarousel>

          </div>

          {/* Right: Hero Image */}
          <div className="relative w-full h-[200px] sm:h-[300px] md:h-[360px] lg:h-[420px] rounded-[20px] md:rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/60">
            <Image
              unoptimized
              quality={90}
              src={data.heroImage}
              alt={data.subtitle}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Dot grid accent */}
            <div className="absolute -top-3 -right-3 w-20 h-20 grid grid-cols-4 gap-1 opacity-20 pointer-events-none z-10">
              {Array.from({ length: 16 }).map((_, i) => (
                <span key={i} className="w-1 h-1 rounded-full bg-slate-600 block" />
              ))}
            </div>
            {/* Corner frame */}
            <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-slate-400/40 rounded-bl z-10" />
          </div>
        </div>

        {/* ── SLOT 2: THREE CORE VALUE PILLARS ────────────────────── */}
        <MobileAutoScrollCarousel className="md:grid md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-12 pt-2 md:pt-0">
          {data.valuePillars.map((pillar) => (
            <div
              key={pillar.heading}
              className="bg-white border border-slate-200/80 rounded-[20px] md:rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 text-left group min-w-[80vw] md:min-w-0 snap-start shrink-0"
            >
              <span className="text-[20px] md:text-2xl mb-3 md:mb-4 block" role="img" aria-label={pillar.heading}>
                {pillar.icon}
              </span>
              <h3 className="text-slate-950 font-bold text-[11px] md:text-caption tracking-[0.18em] uppercase mb-2 md:mb-3">
                {pillar.heading}
              </h3>
              <p className="text-slate-600 text-[13px] md:text-small leading-relaxed">
                {pillar.copy}
              </p>
            </div>
          ))}
        </MobileAutoScrollCarousel>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CONDITIONAL RENDER: ULTRACLEAN 2-COLUMN CONVERSION GRID
      ══════════════════════════════════════════════════════════════ */}
      {isTechnicalSystem && (
        <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-left bg-white border-t border-slate-100">
          
          {/* LEFT COLUMN: Basic Details & Structural Value */}
          <div className="flex flex-col">
            <h2 className="text-h5 font-bold text-slate-950 mb-4 block tracking-wide uppercase">
              TECHNICAL ENGINEERING EXCELLENCE
            </h2>
            <ul className="space-y-4 text-small font-semibold text-slate-700 leading-relaxed list-none pl-0 uppercase">
              <li className="flex items-start gap-2">
                <span className="text-slate-400 font-bold">-</span>
                {slug === "aluminium-systems" ? "WIND PRESSURE COMPLIANCE: EXCEEDS 2.5KPA THRESHOLDS" : "ACOUSTIC ISOLATION: UP TO 45DB NOISE REDUCTION"}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 font-bold">-</span>
                {slug === "aluminium-systems" ? "SLIMLINE SIGHTLINES: 20MM ULTRA-THIN INTERLOCK PROFILES" : "THERMAL SEALING: MULTI-CHAMBER EPDM GASKET INTEGRATION"}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 font-bold">-</span>
                {slug === "aluminium-systems" ? "STRUCTURAL GLAZING: ACCOMMODATES UP TO 32MM DGU" : "STEEL-REINFORCED: GALVANIZED CORE STRENGTHENING"}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 font-bold">-</span>
                {slug === "aluminium-systems" ? "THERMAL BREAK: POLYAMIDE INSULATION STRIPS" : "MONSOON PROOFING: ZERO-LEAKAGE WATER DRAINAGE SYSTEM"}
              </li>
              <li className="flex items-start gap-2">
                <span className="text-slate-400 font-bold">-</span>
                CUSTOM RAL POWDER-COATED ARCHITECTURAL FINISHES
              </li>
            </ul>
          </div>

          {/* RIGHT COLUMN: The Polished High-Contrast Lead Form Card */}
          <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm text-left mx-auto lg:mr-0">
            <span className="text-caption font-extrabold tracking-widest text-slate-400 block mb-1 uppercase">
              INQUIRE SYSTEM SPECIFICATION
            </span>
            <h3 className="text-h6 font-bold text-slate-950 mb-5 block uppercase">
              REQUEST CUSTOM PROFILE SCHEDULING
            </h3>
            <form className="flex flex-col space-y-3.5">
              <input type="text" placeholder="FULL NAME" className="w-full h-10 px-4 text-small font-medium text-black bg-slate-50 border border-slate-200/80 rounded-xl focus:bg-white focus:border-black outline-none transition-all placeholder:text-slate-400 uppercase" />
              <input type="text" placeholder="PHONE NUMBER" className="w-full h-10 px-4 text-small font-medium text-black bg-slate-50 border border-slate-200/80 rounded-xl focus:bg-white focus:border-black outline-none transition-all placeholder:text-slate-400 uppercase" />
              <input type="email" placeholder="EMAIL ADDRESS" className="w-full h-10 px-4 text-small font-medium text-black bg-slate-50 border border-slate-200/80 rounded-xl focus:bg-white focus:border-black outline-none transition-all placeholder:text-slate-400 uppercase" />
              <input type="text" placeholder="PROJECT LOCATION" className="w-full h-10 px-4 text-small font-medium text-black bg-slate-50 border border-slate-200/80 rounded-xl focus:bg-white focus:border-black outline-none transition-all placeholder:text-slate-400 uppercase" />
              <button type="button" className="w-full h-10 bg-slate-950 text-white rounded-xl text-button font-bold uppercase tracking-wider mt-4 hover:bg-slate-900 transition-all flex items-center justify-center gap-2">
                SUBMIT INQUIRY
              </button>
            </form>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════════════
          SLOT 3 — EDITORIAL FEATURE BLOCKS
      ══════════════════════════════════════════════════════════════ */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Feature image */}
          <div className="relative h-[220px] md:h-auto md:aspect-[4/3] rounded-[20px] md:rounded-[2rem] overflow-hidden shadow-2xl">
            <Image
              unoptimized
              quality={90}
              src={data.featureImage}
              alt={`${data.subtitle} feature`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Feature blocks (Accordions on Mobile) */}
          <ServiceFeatureAccordion blocks={data.featureBlocks} />

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SLOT 4 — PREMIUM MATERIAL COMPARISON TABLE
      ══════════════════════════════════════════════════════════════ */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-10 md:py-16">

        {/* Section heading */}
        <div className="mb-10">
          <span className="text-caption font-bold tracking-[0.28em] uppercase text-[#6E7D9B] block mb-3">
            VOOMETDESIGN · Material Comparison
          </span>
          <h2
            className="text-h2 font-bold leading-tight tracking-tight text-slate-950"
          >
            Standard vs Premium{" "}
            <em className="not-italic font-light text-slate-500">vs Luxury</em>
          </h2>
        </div>

        <MobileMaterialComparison rows={data.comparisonRows} />
      </section>

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
          SLOT 6 — CINEMATIC EDITORIAL CTA
      ══════════════════════════════════════════════════════════════ */}
      <ServiceCinematicCTA
        headline={data.ctaHeadline}
        copy={data.ctaCopy}
        category={data.ctaCategory}
        videoSrc={data.videoSrc}
      />

    </main>
  );
}
