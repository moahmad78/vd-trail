// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Award,
  Layers,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";

interface Project {
  id: string;
  title: string;
  sector: string;
  cover: string;
  images: string[];
  scope: string;
  location: string;
  highlights: string[];
}
const projects: Project[] = [
  {
    id: "hospitality-1",
    title: "Apex Luxury Suite & Lounge",
    sector: "HOSPITALITY",
    cover:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800",
    ],
    scope: "Full Turnkey Interior & Artisanal Finishes",
    location: "Bangalore",
    highlights: [
      "3D Visualization Approved",
      "Bespoke Lighting Integration",
      "Premium Velvet Lounge Seating",
    ],
  },
  {
    id: "hospitality-2",
    title: "The Meridian Boutique Lounge",
    sector: "HOSPITALITY",
    cover:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800",
      "https://images.unsplash.com/photo-1568495248636-6432b97bd949?q=80&w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
    ],
    scope: "Bespoke Acoustic Design & Turnkey Fit-outs",
    location: "Delhi NCR",
    highlights: [
      "Curated Art Deco Styling",
      "Acoustic Wall Paneling",
      "Custom Brass Fixtures",
    ],
  },
  {
    id: "educational-1",
    title: "The Smart Lecture Arena",
    sector: "EDUCATIONAL",
    cover:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800",
      "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800",
      "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=800",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800",
    ],
    scope: "Acoustic Wall Cladding & Ergonomic Bench Systems",
    location: "Gorakhpur",
    highlights: [
      "Dynamic Smart Board Mounting",
      "Ergonomic Layout Design",
      "Premium Soundproofing",
    ],
  },
  {
    id: "educational-2",
    title: "Central Learning Hub & Library",
    sector: "EDUCATIONAL",
    cover:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800",
      "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=800",
    ],
    scope: "High-Capacity Storage Systems & Modern Reading Bays",
    location: "Pune",
    highlights: [
      "Minimalist Oak Bookcases",
      "Integrated Charging Bays",
      "Acoustic Quiet-Zone Pods",
    ],
  },
  {
    id: "residential-1",
    title: "The Azure Penthouse Living",
    sector: "RESIDENTIAL",
    cover:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
    ],
    scope: "Bespoke Full-Scale Execution & Artisanal Finishes",
    location: "Mumbai",
    highlights: [
      "Premium Italian Marble Floor",
      "Custom Brass Inlays",
      "Panoramic Smart Glass Wall",
    ],
  },
  {
    id: "residential-2",
    title: "The Serene Villa Kitchen & Lounge",
    sector: "RESIDENTIAL",
    cover:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800",
    ],
    scope: "High-End Custom Woodwork & Premium Modular Execution",
    location: "Hyderabad",
    highlights: [
      "Handcrafted Solid Oak Cabinets",
      "Quartz Countertops",
      "Integrated Smart Lighting",
    ],
  },
  {
    id: "aluminium-1",
    title: "Panoramic Villa Glazing System",
    sector: "ALUMINIUM SYSTEMS",
    cover:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=1200",
    images: [
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
    ],
    scope: "Thermal Break Slimline Sliding Enclosures",
    location: "Delhi",
    highlights: [
      "Ultra-Thin 20mm Sightlines",
      "Flush Floor Track",
      "Double Glazed Argon Gas",
    ],
  },
];
const FILTER_TAGS = [
  { id: "ALL", label: "All Projects" },
  { id: "RESIDENTIAL", label: "Residential" },
  { id: "HOSPITALITY", label: "Hospitality" },
  { id: "EDUCATIONAL", label: "Educational" },
  { id: "ALUMINIUM SYSTEMS", label: "Aluminium Systems" },
];
export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);
  const filteredProjects = projects.filter(
    (p) => activeCategory === "ALL" || p.sector === activeCategory,
  );
  const handlePrevImage = (project: Project) => {
    setActiveImageIdx((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1,
    );
  };
  const handleNextImage = (project: Project) => {
    setActiveImageIdx((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1,
    );
  };
  return (
    <main className="bg-slate-50 min-h-screen">
      {" "}
      <Navbar /> {/* HEADER SECTION */}{" "}
      <section className="pt-40 pb-12 bg-white text-center border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 translate-x-32" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-xs mb-4 block text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-950">
            Our Curated Works
          </h1>
          <h2 className="mb-4 text-[#020617] text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-950">
            {" "}
            Masterpieces of Design{" "}
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 leading-relaxed font-normal text-base md:text-base">
            {" "}
            Discover how we blend precise construction engineering with luxury
            design standards across hospitality, residential, and institutional
            spaces.{" "}
          </p>
        </div>
      </section>{" "}
      {/* ASYMMETRICAL WRAPPER GRID */}{" "}
      <section className="bg-slate-50">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-[1440px] mx-auto px-4 py-8 items-start">
          {" "}
          {/* LEFT SIDEBAR: PROJECT FILTER ENGINE */}{" "}
          <div className="lg:col-span-3 lg:sticky lg:top-24 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <span className="text-xs md:text-sm font-black uppercase tracking-[0.25em] text-[#324A61] block mb-3">
              {" "}
              PROJECT FILTER ENGINE{" "}
            </span>{" "}
            {/* Mobile interrupt breakpoint list (horizontal flex on <1024px) */}{" "}
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible whitespace-nowrap lg:whitespace-normal space-x-2 lg:space-x-0 space-y-0 lg:space-y-2 pb-3 lg:pb-0 scrollbar-hide">
              {" "}
              {FILTER_TAGS.map((tag) => {
                const isActive = activeCategory === tag.id;
                return (
                  <button
                    key={tag.id}
                    onClick={() => setActiveCategory(tag.id)}
                    className={
                      isActive
                        ? "w-auto lg:w-full text-left px-4 py-3 bg-[#324A61] text-white border border-[#273a4d] font-bold text-sm uppercase tracking-wider rounded-xl transition-all duration-200 shrink-0 lg:shrink"
                        : "w-auto lg:w-full text-left px-4 py-3 bg-slate-50 text-slate-600 border border-slate-100 text-sm font-bold uppercase tracking-wider rounded-xl hover:bg-slate-100 hover:text-slate-900 transition-all duration-200 shrink-0 lg:shrink"
                    }
                  >
                    {" "}
                    {tag.label}{" "}
                  </button>
                );
              })}{" "}
            </div>
          </div>{" "}
          {/* RIGHT MEDIA GRID: GALLERY TILES */}{" "}
          <div className="lg:col-span-9">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {" "}
                {filteredProjects.map((project) => (
                  <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    onClick={() => {
                      setSelectedProject(project);
                      setActiveImageIdx(0);
                    }}
                    className="group relative bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
                  >
                    {" "}
                    {/* Image Frame Box */}{" "}
                    <div className="w-full aspect-[4/3] overflow-hidden bg-slate-900 relative">
                      <img
                        src={project.cover}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>{" "}
                    {/* Overlay Info Tray */}{" "}
                    <div className="p-4 bg-white border-t border-slate-50 flex flex-col justify-center">
                      <h3 className="line-clamp-1 text-base md:text-base lg:text-lg font-black uppercase tracking-wide text-slate-950">
                        {" "}
                        {project.title}{" "}
                      </h3>
                      <span className="text-xs mt-0.5 md:text-sm font-black uppercase tracking-[0.25em] text-[#324A61] block mb-3">
                        {" "}
                        {project.sector}{" "}
                      </span>
                    </div>
                  </motion.div>
                ))}{" "}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>{" "}
      {/* Case Study Detailed Modal */}{" "}
      <AnimatePresence>
        {" "}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#020617]/80 backdrop-blur-md overflow-y-auto"
          >
            {" "}
            {/* Modal Container */}{" "}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl relative my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {" "}
              {/* Close Button */}{" "}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 bg-[#020617] text-white p-2.5 rounded-full hover:bg-[#324A61] hover:text-slate-950 transition-all shadow-md active:scale-95"
                aria-label="Close modal"
              >
                <X size={16} strokeWidth={3} />
              </button>
              <div className="flex flex-col lg:flex-row min-h-[500px]">
                {" "}
                {/* Left Side: Micro Slider Gallery */}{" "}
                <div className="lg:w-[55%] relative bg-[#020617] min-h-[350px] lg:min-h-full overflow-hidden flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImageIdx}
                      src={selectedProject.images[activeImageIdx]}
                      alt={`${selectedProject.title} inner shot`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full absolute inset-0 object-cover opacity-90"
                    />
                  </AnimatePresence>{" "}
                  {/* Micro Slider Arrows */}{" "}
                  <div className="absolute bottom-6 right-6 flex gap-2 z-30">
                    <button
                      onClick={() => handlePrevImage(selectedProject)}
                      className="bg-[#020617]/50 backdrop-blur-md text-white p-2.5 rounded-full hover:bg-[#324A61] hover:text-white transition-all active:scale-90"
                    >
                      <ChevronLeft size={18} strokeWidth={3} />
                    </button>
                    <button
                      onClick={() => handleNextImage(selectedProject)}
                      className="bg-[#020617]/50 backdrop-blur-md text-white p-2.5 rounded-full hover:bg-[#324A61] hover:text-white transition-all active:scale-90"
                    >
                      <ChevronRight size={18} strokeWidth={3} />
                    </button>
                  </div>{" "}
                  {/* Micro Slider Indicators */}{" "}
                  <div className="absolute top-6 left-6 z-30 bg-[#020617]/50 backdrop-blur-md text-white/95 px-3 py-1.5 rounded-md text-xs font-black uppercase tracking-widest border border-slate-700">
                    {" "}
                    {activeImageIdx + 1} / {selectedProject.images.length}{" "}
                  </div>
                </div>{" "}
                {/* Right Side: Case Study Metadata */}{" "}
                <div className="lg:w-[45%] p-8 sm:p-10 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex items-center gap-2 text-[#324A61] text-xs font-black uppercase mb-3">
                      <Sparkles size={14} /> {selectedProject.sector}{" "}
                      ARCHITECTURE{" "}
                    </div>
                    <h3 className="mb-6 border-b border-slate-100 pb-4 text-base md:text-base lg:text-lg font-black uppercase tracking-wide text-slate-950">
                      {" "}
                      {selectedProject.title}{" "}
                    </h3>{" "}
                    {/* Metadata Table */}{" "}
                    <div className="flex flex-col gap-5 mb-8">
                      <div>
                        <span className="text-xs flex items-center gap-2 md:text-sm font-black uppercase tracking-[0.25em] text-[#324A61] block mb-3">
                          <Layers size={12} className="text-slate-500" />{" "}
                          Executive Scope{" "}
                        </span>
                        <span className="font-bold text-slate-800 text-base leading-relaxed">
                          {" "}
                          {selectedProject.scope}{" "}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs flex items-center gap-2 md:text-sm font-black uppercase tracking-[0.25em] text-[#324A61] block mb-3">
                          <MapPin size={12} className="text-slate-500" />{" "}
                          Location Profile{" "}
                        </span>
                        <span className="font-bold text-slate-800 text-base leading-relaxed">
                          {" "}
                          {selectedProject.location}{" "}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs flex items-center gap-2 md:text-sm font-black uppercase tracking-[0.25em] text-[#324A61] block mb-3">
                          <Award size={12} className="text-slate-500" />{" "}
                          Execution Highlights{" "}
                        </span>
                        <div className="flex flex-col gap-2">
                          {" "}
                          {selectedProject.highlights.map((h, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#020617] mt-1.5 shrink-0" />
                              <span className="text-slate-700 text-sm font-bold leading-relaxed">
                                {h}
                              </span>
                            </div>
                          ))}{" "}
                        </div>
                      </div>
                    </div>
                  </div>{" "}
                  {/* Consultation CTA */}{" "}
                  <Link
                    href="/contact"
                    className="w-full bg-[#020617] text-white text-sm font-black uppercase tracking-widest py-3.5 px-6 rounded-lg hover:bg-[#324A61] transition-all duration-300 shadow-md flex items-center justify-center gap-2 mt-4"
                  >
                    {" "}
                    DEPLOY SIMILAR BLUEPRINT ➔{" "}
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}{" "}
      </AnimatePresence>{" "}
      {/* Call to Action */}{" "}
      <section className="py-24 bg-[#020617] text-white text-center">
        {" "}
        <div className="container mx-auto px-6">
          {" "}
          <h2 className="mb-8 text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
            {" "}
            Ready to Build Your Masterpiece?{" "}
          </h2>{" "}
          <p className="text-white/60 mb-10 max-w-2xl mx-auto">
            {" "}
            Our engineering team is ready to deliver precision. Let's discuss
            your vision and translate it into a tangible, architectural
            reality.{" "}
          </p>{" "}
          <div className="flex justify-center">
            {" "}
            <Link
              href="/contact"
              className="bg-[#324A61] text-white text-sm font-black uppercase tracking-widest py-3.5 px-6 rounded-lg hover:bg-white hover:text-[#020617] transition-all duration-300 shadow-md"
            >
              {" "}
              Start Your Project{" "}
            </Link>{" "}
          </div>{" "}
        </div>{" "}
      </section>{" "}
    </main>
  );
}
