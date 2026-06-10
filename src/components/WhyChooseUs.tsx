import React from "react";
import { CheckCircle, Settings, Eye, Users } from "lucide-react";

interface WhyChooseUsProps {
  title?: string;
  cards?: {
    icon: React.ReactNode;
    heading: string;
    copy?: string;
  }[];
}

const WhyChooseUs = ({ title, cards: customCards }: WhyChooseUsProps) => {
  const defaultCards: NonNullable<WhyChooseUsProps["cards"]> = [
    {
      icon: <CheckCircle className="w-10 h-10" />,
      heading: "TURNKEY EXCELLENCE",
    },
    {
      icon: <Settings className="w-10 h-10" />,
      heading: "IN-HOUSE PRECISION MANUFACTURING"
    },
    {
      icon: <Eye className="w-10 h-10" />,
      heading: "HIGH-FIDELITY VIRTUAL WALKTHROUGHS"
    },
    {
      icon: <Users className="w-10 h-10" />,
      heading: "DEDICATED SENIOR TEAM"
    }
  ];

  const cards = customCards || defaultCards;
  const displayTitle = title || "WHY CHOOSE VOOMETDESIGN?";

  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden">
      {/* Subtle floating gradient blobs (indigo/purple) */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-100/40 rounded-full blur-[100px] pointer-events-none mix-blend-multiply opacity-70"></div>
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-purple-100/40 rounded-full blur-[120px] pointer-events-none mix-blend-multiply opacity-70"></div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 mb-12">
        <h2 className="text-sm font-semibold tracking-widest text-slate-400 uppercase mb-8 text-center md:text-left">
          {displayTitle}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`bg-white border border-slate-200/60 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-center text-center ${card.copy ? 'h-auto py-10' : 'h-48'}`}
            >
              <div className="mb-4 text-[#0f172a] opacity-100">
                {card.icon}
              </div>
              <h3 className="text-[#0f172a] text-sm md:text-base font-bold tracking-widest opacity-100 uppercase mt-2">
                {card.heading}
              </h3>
              {card.copy && (
                <p className="mt-3 text-neutral-600 text-sm leading-relaxed max-w-sm">
                  {card.copy}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
