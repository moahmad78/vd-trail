"use client";

import { CheckCircle2, Clock, MapPin, Briefcase } from "lucide-react";
import SlideUpFade from "./animations/SlideUpFade";

const CARDS = [
  {
    title: "20+ Years Experience",
    icon: <Clock className="w-6 h-6 text-[#0B1635]" />,
  },
  {
    title: "250+ Projects Delivered",
    icon: <Briefcase className="w-6 h-6 text-[#0B1635]" />,
  },
  {
    title: "Pan-India Execution",
    icon: <MapPin className="w-6 h-6 text-[#0B1635]" />,
  },
  {
    title: "End-to-End Turnkey Solutions",
    icon: <CheckCircle2 className="w-6 h-6 text-[#0B1635]" />,
  },
];

export default function ContactWhyUs() {
  return (
    <section className="py-16 md:py-24 bg-white relative z-10 px-6 md:px-12">
      <div className="max-w-[1440px] mx-auto">
        <SlideUpFade>
          <div className="text-center mb-12 md:mb-16">
            <span
              className="text-[10px] font-bold uppercase tracking-[0.24em] mb-4 block"
              style={{ color: "#6E7D9B" }}
            >
              WHY CLIENTS CHOOSE US
            </span>
            <h2
              className="font-bold leading-[1.05] tracking-[-0.03em]"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
                color: "#0B1633",
              }}
            >
              Precision. Experience. Execution.
            </h2>
          </div>
        </SlideUpFade>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {CARDS.map((card, idx) => (
            <SlideUpFade key={idx} delay={0.1 * idx}>
              <div
                className="flex flex-col items-center justify-center p-8 md:p-10 rounded-[24px] transition-transform duration-500 hover:-translate-y-[6px]"
                style={{
                  backgroundColor: "#F7F7F5",
                  boxShadow: "0 10px 40px rgba(11,22,53,0.04)",
                }}
              >
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                  {card.icon}
                </div>
                <h4 className="text-[14px] md:text-[15px] font-bold text-[#0B1633] text-center max-w-[160px]">
                  {card.title}
                </h4>
              </div>
            </SlideUpFade>
          ))}
        </div>
      </div>
    </section>
  );
}
