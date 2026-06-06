// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";
import { motion } from "framer-motion";

interface BrushStrokeProps {
  /** "dark" for light backgrounds (navy/indigo strokes), "light" for dark backgrounds (silver/white strokes) */
  variant?: "dark" | "light";
  className?: string;
}

/**
 * BrushStroke — A continuous 3D fluid wave ribbon SVG accent element.
 * Drop this directly beneath any section heading/paragraph block as a
 * premium typographic anchor line. It uses Framer Motion to endlessly
 * morph its sine-curve path and shift its gradient stroke colors.
 */
const BrushStroke = ({ variant = "dark", className = "" }: BrushStrokeProps) => {
  const shadowStroke = variant === "dark" ? "#1e293b" : "#ffffff";
  const gradientStops =
    variant === "dark"
      ? { start: "#3b82f6", mid: "#6366f1", end: "#a855f7" }
      : { start: "#94a3b8", mid: "#cbd5e1", end: "#ffffff" };

  const gradientId = `brush3DGradient-${variant}`;

  const pathA = "M 10 20 Q 55 5, 100 20 T 190 20";
  const pathB = "M 10 20 Q 55 35, 100 20 T 190 20";

  return (
    <div
      className={`w-48 h-6 relative mt-6 mb-8 overflow-visible opacity-80 ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 200 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor={gradientStops.start} stopOpacity="0.8" />
            <stop offset="50%"  stopColor={gradientStops.mid}   stopOpacity="0.9" />
            <stop offset="100%" stopColor={gradientStops.end}   stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Shadow / depth layer */}
        <motion.path
          d={pathA}
          stroke={shadowStroke}
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          opacity="0.15"
          animate={{ d: [pathA, pathB, pathA] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />

        {/* Gradient colour layer */}
        <motion.path
          d={pathA}
          stroke={`url(#${gradientId})`}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          animate={{ d: [pathA, pathB, pathA] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />

        {/* Fine highlight thread for 3-D dimension */}
        <motion.path
          d="M 10 18 Q 55 8, 100 18 T 190 18"
          stroke={gradientStops.end}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
          animate={{
            d: [
              "M 10 18 Q 55 8, 100 18 T 190 18",
              "M 10 22 Q 55 32, 100 22 T 190 22",
              "M 10 18 Q 55 8, 100 18 T 190 18",
            ],
          }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.15 }}
        />
      </svg>
    </div>
  );
};

export default BrushStroke;
