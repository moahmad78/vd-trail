"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface USPTab {
  id: string;
  label: string;
  content: string;
}

interface ServiceUSPTabsProps {
  tabs: USPTab[];
}

export default function ServiceUSPTabs({ tabs }: ServiceUSPTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");

  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  if (!tabs || tabs.length === 0) return null;

  return (
    <div className="w-full flex flex-col mt-6">
      {/* Scrollable Tabs Row */}
      <div className="w-full overflow-x-auto hide-scrollbar pb-4 -mb-4">
        <div className="flex flex-row items-center gap-2 min-w-max pr-6">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-colors duration-300 ${
                  isActive
                    ? "bg-[#0B1633] text-white border border-[#0B1633]"
                    : "bg-white text-[#0B1633] border border-[#0B1633] hover:bg-slate-50"
                }`}
                aria-pressed={isActive}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="mt-5 min-h-[72px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25 }}
            className="text-slate-600 text-[15px] leading-relaxed max-w-xl"
          >
            {activeContent}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
