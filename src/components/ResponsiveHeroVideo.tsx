"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  videoSrc: string;
  posterSrc: string;
  alt: string;
  imageClassName?: string;
  imageStyle?: React.CSSProperties;
  videoClassName?: string;
  videoStyle?: React.CSSProperties;
}

export default function ResponsiveHeroVideo({ 
  videoSrc, 
  posterSrc, 
  alt,
  imageClassName = "object-cover z-0",
  imageStyle,
  videoClassName = "absolute inset-0 w-full h-full object-cover z-0",
  videoStyle
}: Props) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop, { passive: true });
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  return (
    <>
      {/* Static background image for LCP (Mobile & Desktop base) */}
      <Image
        src={posterSrc}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className={imageClassName}
        style={imageStyle}
      />

      {/* Background Video (Desktop Only) */}
      {isDesktop && (
        <div className="absolute inset-0 z-[5]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              className={videoClassName}
              style={videoStyle}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </motion.div>
        </div>
      )}
    </>
  );
}
