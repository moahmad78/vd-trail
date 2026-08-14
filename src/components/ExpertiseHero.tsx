import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Check, Sparkles, Sliders, Maximize2,
  ShieldCheck, DoorClosed, Layers, Building2, Award, Hammer,
  Trees, Wrench, Flame, LayoutTemplate, Settings, Clock, LucideIcon
} from "lucide-react";

const HERO_ICON_MAP: Record<string, LucideIcon | React.ComponentType<{ className?: string; size?: number; strokeWidth?: number }>> = {
  Sliders,
  Maximize2,
  ShieldCheck,
  DoorClosed,
  Layers,
  Building2,
  Award,
  Hammer,
  Trees,
  Wrench,
  Flame,
  LayoutTemplate,
  Sparkles,
  Settings,
  Clock,
  Check,
};

export interface ExpertiseHeroFeature {
  iconName?: string;
  icon?: LucideIcon | React.ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;
  title: string;
  description: string;
}

export interface ExpertiseHeroStat {
  value: string;
  label: string;
  iconName?: string;
  icon?: LucideIcon | React.ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;
}

export interface ExpertiseHeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
  description: string;
  shortDescription?: string;
  heroImage: string;
  heroImages?: string[];
  features?: ExpertiseHeroFeature[];
  stats?: ExpertiseHeroStat[];
  tagline?: {
    prefix?: string;
    highlight?: string;
    suffix?: string;
  };
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
}

export default function ExpertiseHero({
  badge = "OUR EXPERTISE",
  title,
  subtitle,
  description,
  shortDescription,
  heroImage,
  heroImages,
  features,
  stats,
  tagline,
  primaryCtaText = "Book Consultation",
  primaryCtaHref = "#inquiry",
  secondaryCtaText = "Explore Systems",
  secondaryCtaHref = "/services/facades-glazing",
}: ExpertiseHeroProps) {
  return (
    <section className="w-full relative py-0 lg:py-8 min-h-[90vh] lg:min-h-0 lg:h-[calc(100vh-80px)] overflow-hidden bg-white flex flex-col justify-end lg:justify-start">
      {/* Mobile Background Image (Only visible on mobile) */}
      <div className="absolute inset-0 w-full h-full z-0 block lg:hidden">
        <Image
          src={heroImage}
          alt={title}
          fill
          className="object-cover w-full h-full"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
      </div>

      <div className="w-full h-full flex flex-col lg:flex-row items-center relative z-10">
        {/* Left Column (Contained within safe area) */}
        <div className="w-full lg:w-1/2 flex justify-end z-10 pt-16 lg:pt-0">
          <div className="w-full max-w-[720px] px-6 md:px-12 xl:pr-16">
            {/* Label / Badge */}
            <span className="inline-flex items-center gap-3 text-[12px] font-bold tracking-[0.25em] uppercase text-slate-300 lg:text-slate-500 mb-4 lg:mb-6">
              {badge}
            </span>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.05] text-white lg:text-[#0f172a] mb-4 lg:mb-6">
              {title}
            </h1>

            {/* Description */}
            <p className="text-slate-200 lg:text-slate-500 text-[14px] lg:text-[18px] leading-relaxed mb-3 lg:mb-4 max-w-lg">
              <span className="block lg:hidden">{shortDescription || description}</span>
              <span className="hidden lg:block">{description}</span>
            </p>

            {/* 2x2 Feature Grid */}
            {features && features.length > 0 && (
              <div className="grid grid-cols-2 gap-2.5 lg:gap-3 mb-4 lg:mb-6">
                {features.slice(0, 4).map((feat, i) => {
                  const Icon = (feat.iconName && HERO_ICON_MAP[feat.iconName]) || feat.icon || Check;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 lg:gap-3 bg-white/70 lg:bg-white backdrop-blur-md border border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.02)] rounded-2xl lg:rounded-3xl p-2 lg:p-4 transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden"
                    >
                      <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-slate-100/80 flex items-center justify-center flex-shrink-0">
                        <Icon className="text-slate-600 w-4 h-4 lg:w-5 lg:h-5" strokeWidth={2.5} />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-xs lg:text-[14px] font-semibold lg:font-extrabold text-slate-900 leading-tight line-clamp-1 lg:line-clamp-none">
                          {feat.title}
                        </span>
                        <span className="text-[10px] lg:text-[12px] text-slate-500 tracking-wide leading-tight mt-0.5 line-clamp-1">
                          {feat.description}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-2 lg:gap-3 mt-2 lg:mt-6 mb-6 lg:mb-8">
              <Link
                href={primaryCtaHref}
                className="group flex items-center justify-center gap-1 lg:gap-2 w-full px-2 lg:px-6 py-3.5 lg:py-4 bg-white lg:bg-[#0f172a] text-[#0f172a] lg:text-white rounded-full text-[11px] lg:text-[14px] font-bold uppercase tracking-wide hover:bg-slate-200 lg:hover:bg-[#1e293b] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 whitespace-nowrap"
              >
                {primaryCtaText}
                <ArrowRight size={16} className="hidden lg:block group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={secondaryCtaHref}
                className="group flex items-center justify-center gap-1 lg:gap-2 w-full px-2 lg:px-6 py-3.5 lg:py-4 bg-transparent text-white lg:text-[#0f172a] border-2 border-white/50 lg:border-slate-200 rounded-full text-[11px] lg:text-[14px] font-bold uppercase tracking-wide hover:border-white lg:hover:border-[#0f172a] transition-all duration-300 whitespace-nowrap"
              >
                {secondaryCtaText}
                <ArrowUpRight size={16} className="hidden lg:block group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            {/* Tagline & Decorative Element */}
            {tagline && (
              <div className="relative mt-8 hidden lg:block">
                <div
                  className="absolute -left-6 -top-4 w-16 h-16 opacity-10 pointer-events-none hidden lg:block"
                  style={{
                    backgroundImage: "radial-gradient(#0B1633 1.5px, transparent 1.5px)",
                    backgroundSize: "8px 8px",
                  }}
                />
                <p className="text-[14px] font-medium text-slate-500 relative z-10 pl-4 border-l-[3px] border-[#0f172a]">
                  {tagline.prefix}{" "}
                  <span className="text-[#0f172a] font-bold">{tagline.highlight}</span>
                  {tagline.suffix}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Image Bleed) */}
        <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0 px-0 lg:px-0 lg:h-full flex flex-col lg:flex-row items-center justify-end lg:justify-start">
          {/* Image Wrapper - Hidden on Mobile since it's the background */}
          <div className="hidden lg:block relative w-full h-[400px] sm:h-[500px] lg:h-full max-h-[500px] lg:max-h-[550px] rounded-3xl lg:rounded-none lg:rounded-l-[40px] rounded-tr-[60px] lg:rounded-tr-[120px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
            <div className="absolute inset-0 bg-slate-100 animate-pulse -z-10" />
            {heroImages && heroImages.length > 0 ? (
              <>
                <style>{`
                  @keyframes heroFade {
                    0%, 20% { opacity: 1; }
                    25%, 95% { opacity: 0; }
                    100% { opacity: 1; }
                  }
                `}</style>
                {heroImages.map((img, i) => (
                  <Image
                    key={img}
                    src={img}
                    alt={title}
                    fill
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-[2s] ease-out absolute top-0 left-0"
                    style={{
                      animation: `heroFade ${heroImages.length * 4}s infinite`,
                      animationDelay: `${i * 4}s`,
                    }}
                    priority={i === 0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ))}
              </>
            ) : (
              <Image
                src={heroImage}
                alt={title}
                fill
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-[2s] ease-out"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/20 via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>

          {/* Overlapping Stats Bar */}
          {stats && stats.length > 0 && (
            <div className="w-full relative lg:absolute lg:bottom-0 lg:left-0 lg:right-0 bg-[#0f172a]/90 lg:bg-[#0f172a] backdrop-blur-md lg:backdrop-blur-none lg:rounded-none lg:rounded-bl-[40px] shadow-2xl py-3 lg:py-4 px-0 lg:px-6 overflow-hidden z-20 border-t border-white/10 flex items-center mt-auto lg:mt-0">
              <style>{`
                @keyframes mobile-hero-marquee {
                  from { transform: translateX(0); }
                  to { transform: translateX(-33.33%); }
                }
                .animate-mobile-hero-marquee {
                  animation: mobile-hero-marquee 15s linear infinite;
                }
                @media (min-width: 1024px) {
                  .animate-mobile-hero-marquee {
                    animation: none !important;
                    transform: none !important;
                  }
                }
              `}</style>
              <div className="flex animate-mobile-hero-marquee lg:animate-none w-max lg:w-full items-center lg:flex lg:flex-row lg:justify-around gap-8 lg:gap-4 px-4 lg:px-0">
                {[...stats, ...stats, ...stats].map((stat, i) => {
                  const StatIcon = (stat.iconName && HERO_ICON_MAP[stat.iconName]) || stat.icon || Check;
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-2 lg:gap-3 ${
                        i >= stats.length ? "lg:hidden" : ""
                      }`}
                    >
                      <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                        <StatIcon className="text-white" size={16} strokeWidth={2.5} />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[16px] lg:text-[18px] font-extrabold text-white leading-none whitespace-nowrap">
                          {stat.value}
                        </span>
                        <span className="text-[9px] lg:text-[10px] font-medium text-slate-400 uppercase tracking-wider leading-tight whitespace-nowrap">
                          {stat.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
