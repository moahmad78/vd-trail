"use client";

import React from "react";
import { Check, X } from "lucide-react";

export interface ComparisonRow {
  feature: string;
  standard: string | boolean;
  premium: string | boolean;
  luxury: string | boolean;
}

interface Props {
  title?: string;
  rows?: ComparisonRow[];
}

export default function FeatureComparison({ title = "Feature Comparison", rows }: Props) {
  if (!rows || rows.length === 0) return null;

  const renderValue = (val: string | boolean, highlight: boolean = false) => {
    if (typeof val === "boolean") {
      if (val) {
        return <Check className={highlight ? "text-[#EAB308]" : "text-white/70"} size={20} />;
      }
      return <X className="text-white/20" size={20} />;
    }
    return val;
  };

  return (
    <section className="w-full bg-[#0B1633] text-white py-16 md:py-24 rounded-[32px] overflow-hidden my-12 shadow-2xl">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <span className="text-[12px] uppercase tracking-[0.25em] font-bold text-white/50 block mb-3">
            Technical Benchmark
          </span>
          <h2 className="text-[32px] md:text-[42px] font-bold tracking-tight text-white">
            {title}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-5 px-6 font-semibold text-white/60 text-[14px] uppercase tracking-wider w-[34%]">Feature</th>
                <th className="py-5 px-6 font-semibold text-white/50 text-[14px] uppercase tracking-wider w-[22%]">Standard</th>
                <th className="py-5 px-6 font-semibold text-white/80 text-[14px] uppercase tracking-wider w-[22%]">Premium</th>
                <th className="py-5 px-6 font-bold text-[#EAB308] text-[15px] uppercase tracking-wider w-[22%]">Luxury (Voomet)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-5 px-6 text-[15px] font-medium text-white/90">
                    {row.feature}
                  </td>
                  <td className="py-5 px-6 text-[15px] text-white/50">
                    {renderValue(row.standard)}
                  </td>
                  <td className="py-5 px-6 text-[15px] text-white/80">
                    {renderValue(row.premium)}
                  </td>
                  <td className="py-5 px-6 text-[15px] font-bold text-[#EAB308]">
                    {renderValue(row.luxury, true)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
