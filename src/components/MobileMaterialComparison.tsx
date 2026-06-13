"use client";

import { Check, Minus } from "lucide-react";

interface ComparisonRow {
  feature: string;
  standard: string | boolean;
  premium: string | boolean;
  luxury: string | boolean;
}

function ComparisonCell({ value, highlight = false }: { value: string | boolean; highlight?: boolean }) {
  const base = `text-small font-semibold text-center p-3.5 border-b border-slate-200/40 ${highlight ? "bg-slate-900/[0.03]" : ""}`;
  if (typeof value === "boolean") {
    return (
      <td className={base}>
        {value
          ? <Check className="w-4 h-4 text-emerald-600 mx-auto" />
          : <Minus className="w-4 h-4 text-slate-300 mx-auto" />}
      </td>
    );
  }
  return <td className={`${base} text-slate-900`}>{value}</td>;
}

function MobileComparisonCell({ label, value }: { label: string; value: string | boolean }) {
  return (
    <div className="flex flex-col py-3 border-b border-slate-100 last:border-0">
      <span className="text-[10px] font-bold tracking-[0.1em] uppercase text-slate-400 mb-1">
        {label}
      </span>
      {typeof value === "boolean" ? (
        value ? (
          <Check className="w-5 h-5 text-emerald-600" />
        ) : (
          <Minus className="w-5 h-5 text-slate-300" />
        )
      ) : (
        <span className="text-[13px] font-bold text-slate-900">{value}</span>
      )}
    </div>
  );
}

export default function MobileMaterialComparison({ rows }: { rows: ComparisonRow[] }) {
  return (
    <>
      {/* Desktop view: Standard Table (unchanged) */}
      <div className="hidden md:block w-full overflow-x-auto rounded-2xl border border-slate-300/60 shadow-sm">
        <table className="w-full min-w-[580px] border-collapse">
          <thead>
            <tr>
              <th className="bg-white text-slate-400 text-caption font-bold tracking-[0.2em] uppercase text-left p-4 border-b border-slate-200/60 w-[32%]">
                Feature
              </th>
              {["Standard", "Premium", "Luxury"].map((tier, i) => (
                <th
                  key={tier}
                  className={`text-white text-small font-bold tracking-widest text-center p-3.5 uppercase border-b border-slate-700 ${
                    i === 1 ? "bg-[#1e293b]" : "bg-slate-900"
                  }`}
                >
                  {tier}
                  <div className="text-caption font-medium tracking-wider text-white/50 mt-0.5 uppercase">
                    Select Tier →
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={row.feature}
                className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}
              >
                <td className="text-slate-900 text-small font-semibold text-left p-3.5 border-b border-slate-200/40">
                  {row.feature}
                </td>
                <ComparisonCell value={row.standard} />
                <ComparisonCell value={row.premium} highlight />
                <ComparisonCell value={row.luxury} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view: Swipeable Tier Cards */}
      <div className="md:hidden">
        <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase text-center mb-4 flex items-center justify-center gap-2">
          <span className="w-4 h-px bg-slate-300"></span>
          Swipe to compare tiers
          <span className="w-4 h-px bg-slate-300"></span>
        </p>
        
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-4">
          
          {/* STANDARD TIER */}
          <div className="min-w-[85vw] snap-center shrink-0 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-slate-800 text-white p-4 sticky top-0 z-10">
              <h3 className="text-h6 font-bold tracking-widest uppercase text-center">Standard</h3>
              <p className="text-[10px] font-medium tracking-wider text-white/60 text-center mt-1 uppercase">Baseline Specifications</p>
            </div>
            <div className="p-4 flex flex-col">
              {rows.map((row) => (
                <MobileComparisonCell key={row.feature} label={row.feature} value={row.standard} />
              ))}
            </div>
          </div>

          {/* PREMIUM TIER */}
          <div className="min-w-[85vw] snap-center shrink-0 bg-white border-2 border-[#1e293b] rounded-2xl shadow-md overflow-hidden relative">
            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-bl-lg z-20">Recommended</div>
            <div className="bg-[#1e293b] text-white p-4 sticky top-0 z-10">
              <h3 className="text-h6 font-bold tracking-widest uppercase text-center">Premium</h3>
              <p className="text-[10px] font-medium tracking-wider text-indigo-200 text-center mt-1 uppercase">Enhanced Execution</p>
            </div>
            <div className="p-4 flex flex-col bg-slate-50/30">
              {rows.map((row) => (
                <MobileComparisonCell key={row.feature} label={row.feature} value={row.premium} />
              ))}
            </div>
          </div>

          {/* LUXURY TIER */}
          <div className="min-w-[85vw] snap-center shrink-0 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-slate-950 text-white p-4 sticky top-0 z-10">
              <h3 className="text-h6 font-bold tracking-widest uppercase text-center">Luxury</h3>
              <p className="text-[10px] font-medium tracking-wider text-amber-200/70 text-center mt-1 uppercase">Uncompromised Quality</p>
            </div>
            <div className="p-4 flex flex-col">
              {rows.map((row) => (
                <MobileComparisonCell key={row.feature} label={row.feature} value={row.luxury} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
