"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Hammer, Ruler, Settings } from "lucide-react";

const features = [
  { icon: <Shield />, title: "High Durability", desc: "Corrosion-resistant alloys built to last decades." },
  { icon: <Ruler />, title: "Precision Cut", desc: "Micro-millimeter accuracy for seamless fitting." },
  { icon: <Settings />, title: "Custom Designs", desc: "Tailored profiles to match any architectural style." },
  { icon: <Hammer />, title: "Professional Install", desc: "Expert on-site execution by certified technicians." },
];

const FabricationModule = () => {
  return (
    <section id="fabrication" className="py-24 bg-white dark:bg-slate-dark overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden bg-slate-100 relative z-10 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1590483734724-383b85ad65e7?q=80&w=1974&auto=format&fit=crop" 
                alt="Premium Aluminium Fabrication and Structural Glazing - Voomet Engineering"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Abstract Background Element */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-0" />
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-0" />
            
            <div className="absolute bottom-10 right-10 bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-2xl z-20 border border-slate-200 dark:border-slate-800">
              <p className="text-4xl font-display font-bold text-accent">25+</p>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Years of Precision</p>
            </div>
          </motion.div>

          <div className="w-full lg:w-1/2">
            <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Specialized Engineering</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-8">
              Premium Aluminium <br />
              <span className="text-primary">Fabrication Solutions</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg mb-12 leading-relaxed">
              Our state-of-the-art fabrication unit specializes in high-end aluminium doors and windows. We combine structural integrity with sleek, minimalist aesthetics to complement modern architecture.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="text-accent p-1 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h5 className="font-bold mb-1 text-primary">{item.title}</h5>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/fabrication" className="block w-fit">
              <motion.button
                whileHover={{ x: 10 }}
                className="mt-12 group flex items-center gap-4 text-primary dark:text-accent font-bold text-lg"
              >
                Explore Fabrication Catalog
                <div className="w-12 h-[2px] bg-accent group-hover:w-20 transition-all" />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FabricationModule;
