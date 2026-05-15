"use client";

import { motion } from "framer-motion";

const galleryImages = [
  { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800", title: "Luxury Living" },
  { url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800", title: "Healing Spaces" },
  { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800", title: "Grand Lobbies" },
  { url: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800", title: "Modern Workspaces" },
  { url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800", title: "Minimalist Suites" },
  { url: "https://images.unsplash.com/photo-1503708928676-1cb796a0891e?q=80&w=800", title: "Technical Perfection" },
];

const Gallery = () => {
  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="container mx-auto px-6 mb-12">
        <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Portfolio</h2>
        <h3 className="text-4xl font-display font-bold text-[#020617]">Technical Interior Execution</h3>
      </div>

      <div className="relative flex overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-6 whitespace-nowrap"
        >
          {[...galleryImages, ...galleryImages].map((img, idx) => (
            <div key={idx} className="relative h-80 w-[450px] rounded-[2rem] overflow-hidden group shrink-0 shadow-lg">
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                <p className="text-white font-bold text-xl">{img.title}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
