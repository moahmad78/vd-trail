// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";
import { motion } from "framer-motion";

/**
 * SectionWave — Inline morphing wave accent for section headings.
 *
 * Designed to trail immediately after the italic span token inside an h2/h3,
 * occupying the natural whitespace on the right of split headline compositions.
 *
 * Usage (inline — recommended):
 *   <h2 className="flex flex-wrap items-center ...">
 *     The VoometDesign{" "}
 *     <span className="italic font-light inline-flex items-center gap-2">
 *       Advantage <SectionWave />
 *     </span>
 *   </h2>
 *
 * Usage (block — beneath heading):
 *   <h2>Section Title</h2>
 *   <SectionWave className="block mt-4 mb-6" />
 */
export default function SectionWave({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-start w-36 h-6 ml-3 overflow-visible opacity-90 relative top-0.5 shrink-0 ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 200 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="globalWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="50%"  stopColor="#6366f1" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Shadow depth layer */}
        <motion.path
          d="M 10 20 Q 55 5, 100 20 T 190 20"
          stroke="#1e293b"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
          opacity={0.1}
          animate={{ d: ["M 10 20 Q 55 5, 100 20 T 190 20", "M 10 20 Q 55 35, 100 20 T 190 20", "M 10 20 Q 55 5, 100 20 T 190 20"] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />

        {/* Primary gradient stroke */}
        <motion.path
          d="M 10 20 Q 55 5, 100 20 T 190 20"
          stroke="url(#globalWaveGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          animate={{ d: ["M 10 20 Q 55 5, 100 20 T 190 20", "M 10 20 Q 55 35, 100 20 T 190 20", "M 10 20 Q 55 5, 100 20 T 190 20"] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />

        {/* Highlight thread for 3-D lift */}
        <motion.path
          d="M 10 17 Q 55 7, 100 17 T 190 17"
          stroke="#a855f7"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity={0.4}
          animate={{ d: ["M 10 17 Q 55 7, 100 17 T 190 17", "M 10 23 Q 55 33, 100 23 T 190 23", "M 10 17 Q 55 7, 100 17 T 190 17"] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.15 }}
        />
      </svg>
    </span>
  );
}
