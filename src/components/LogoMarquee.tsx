"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const logos = [
  { name: "City Hospital", url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=120&h=120&auto=format&fit=crop" },
  { name: "Grand Plaza Hotel", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=120&h=120&auto=format&fit=crop" },
  { name: "Saint Mary School", url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=120&h=120&auto=format&fit=crop" },
  { name: "Tech Park", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=120&h=120&auto=format&fit=crop" },
  { name: "Apex Clinics", url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=120&h=120&auto=format&fit=crop" },
  { name: "Luxury Villas", url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=120&h=120&auto=format&fit=crop" },
  { name: "Modern Office", url: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=120&h=120&auto=format&fit=crop" },
  { name: "Boutique Hotel", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=120&h=120&auto=format&fit=crop" },
  { name: "Community College", url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=120&h=120&auto=format&fit=crop" },
  { name: "Healthcare Center", url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=120&h=120&auto=format&fit=crop" },
  { name: "Residential Complex", url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=120&h=120&auto=format&fit=crop" },
  { name: "Urban Resorts", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=120&h=120&auto=format&fit=crop" },
];

const LogoMarquee = () => {
  const [isPaused, setIsPaused] = useState(false);
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="w-full bg-white py-16 overflow-hidden border-y border-slate-100">
      <div className="container mx-auto px-6 mb-10">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] text-center">Trusted by Industry Leaders</p>
      </div>
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            duration: 35,
            ease: "linear",
          },
        }}
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          animationPlayState: isPaused ? "paused" : "running",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex items-center"
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={index}
            className="mx-16 shrink-0 group flex items-center justify-center"
          >
            <div className="h-14 relative flex items-center justify-center opacity-80 hover:opacity-100 transition-all duration-500 transform hover:scale-110">
              <img
                src={logo.url}
                alt={logo.name}
                className="h-full w-auto object-contain"
              />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default LogoMarquee;
