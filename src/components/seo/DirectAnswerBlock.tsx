import React from "react";

interface DirectAnswerBlockProps {
  heading?: string;
  summary: string;
  keyPoints?: string[];
  className?: string;
}

export default function DirectAnswerBlock({
  heading = "Quick Overview",
  summary,
  keyPoints,
  className = "",
}: DirectAnswerBlockProps) {
  if (!summary) return null;

  return (
    <section
      className={`w-full max-w-5xl mx-auto my-8 px-6 py-6 rounded-2xl bg-slate-900/4 border border-slate-200/80 text-slate-800 backdrop-blur-sm ${className}`}
      aria-label="Direct Summary"
    >
      <div className="flex flex-col gap-3">
        {heading && (
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
            <h2 className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-600">
              {heading}
            </h2>
          </div>
        )}
        <p className="text-base md:text-lg leading-relaxed font-medium text-slate-900">
          {summary}
        </p>
        {keyPoints && keyPoints.length > 0 && (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 pt-3 border-t border-slate-200/60 text-sm md:text-base text-slate-700">
            {keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-slate-400 font-bold">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
