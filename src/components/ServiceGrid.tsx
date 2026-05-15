"use client";

import { motion } from "framer-motion";
import { Sofa, Hospital, GraduationCap, Hotel, Palette, ChevronRight, ArrowRight, Brush } from "lucide-react";
import Link from "next/link";

const coreServices = [
  {
    title: "Hospitality Interiors",
    description: "Ambiance that keeps your guests coming back. We create immersive environments for Hotels, Resorts, and Fine-Dining Restaurants.",
    icon: <Hotel className="w-8 h-8 text-accent" />,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070",
    href: "/services/hospitality"
  },
  {
    title: "Healthcare Interiors",
    description: "Hygiene-first design that meets international medical standards. We prioritize sterile environments and patient-centric layouts.",
    icon: <Hospital className="w-8 h-8 text-accent" />,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053",
    href: "/services/healthcare"
  },
  {
    title: "Educational Interiors",
    description: "Ergonomic learning environments for Schools and Colleges. Durable, agile spaces designed to foster institutional innovation.",
    icon: <GraduationCap className="w-8 h-8 text-accent" />,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070",
    href: "/services/education"
  },
  {
    title: "Residential Interiors",
    description: "Bespoke design for premium Homes and Villas. Personalized living spaces that blend high-end aesthetics with functional brilliance.",
    icon: <Sofa className="w-8 h-8 text-accent" />,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000",
    href: "/services/residential"
  }
];

const interiorHighlight = {
  title: "Premium Interior Gallery",
  headline: "Bespoke Woodwork & Artisanal Finishes.",
  description: "Exquisite craftsmanship meets technical execution. Our artisanal woodworking unit specializes in custom cabinetry, decorative panelling, and one-of-a-kind furniture pieces that define luxury.",
  icon: <Palette className="w-10 h-10 text-accent" />,
  images: [
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800",
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800"
  ],
  href: "/gallery"
};

const ServiceGrid = () => {
  return (
    <section id="services" className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Core Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-[#020617]">Technical Interior Execution</h3>
          </div>
          <p className="mt-6 md:mt-0 text-slate-500 max-w-md">
            We provide end-to-end design and bespoke woodwork services, ensuring artisanal quality at every touchpoint.
          </p>
        </div>

        {/* Row 1: The Core Four */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {coreServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-2 hover:border-accent/30"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={`${service.title} - Professional Interior Design by Voomet`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <div className="mb-6 p-3 rounded-2xl bg-white w-fit shadow-sm">
                  {service.icon}
                </div>
                <h4 className="text-xl font-display font-bold mb-4 text-[#020617]">{service.title}</h4>
                <p className="text-slate-500 mb-6 text-sm line-clamp-2">
                  {service.description}
                </p>
                <Link href={service.href} className="flex items-center gap-2 font-bold text-accent text-sm group-hover:gap-4 transition-all">
                  Learn More <ChevronRight size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Row 2: Premium Gallery Replacement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="group relative overflow-hidden rounded-[3rem] bg-[#020617] text-white"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 lg:p-20 flex flex-col justify-center">
              <div className="mb-8 p-4 rounded-2xl bg-white/10 w-fit">
                {interiorHighlight.icon}
              </div>
              <h3 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Artisanal Craftsmanship</h3>
              <h4 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
                {interiorHighlight.headline}
              </h4>
              <p className="text-white/60 text-lg mb-10 max-w-lg leading-relaxed">
                {interiorHighlight.description}
              </p>
              <Link href={interiorHighlight.href} className="bg-accent text-primary px-10 py-4 rounded-xl font-bold text-lg w-fit hover:bg-white transition-all transform hover:-translate-y-1 shadow-2xl">
                View Gallery
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 p-8 lg:p-12 bg-white/5">
              {interiorHighlight.images.map((img, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden relative group/img">
                   <img src={img} alt="Interior Render" className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110" />
                   <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover/img:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceGrid;
