import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { projectsData } from "@/data/projectsData";
import MobileAutoScrollCarousel from "@/components/animations/MobileAutoScrollCarousel";
import ProjectGalleryInteractive from "@/components/ProjectGalleryInteractive";
import { BreadcrumbSchema, ProjectSchema } from "@/components/seo/JsonLd";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import CTAV4 from "@/components/CTAV4";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.id === slug);

  if (!project) {
    return {
      title: "Project Not Found | VOOMET",
    };
  }

  return {
    title: `${project.title} - ${project.descriptor} | VOOMET Bangalore`,
    description: `${project.description.slice(0, 160)}... Designed and executed by VOOMET in Bangalore.`,
    alternates: {
      canonical: `https://voometdesign.com/work/${project.id}`,
    },
    openGraph: {
      title: `${project.title} - ${project.descriptor} | VOOMET Bangalore`,
      description: project.description,
      url: `https://voometdesign.com/work/${project.id}`,
      type: "website",
      images: [
        {
          url: project.heroImage,
          width: 1200,
          height: 630,
          alt: `${project.title} Interior Design Bangalore`,
        },
      ],
    },
  };
}

export default async function ProjectDetailsPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fdfdfd] text-neutral-900 pb-24">
      {/* Schemas */}
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Our Work", url: "/designs" },
          { name: project.title, url: `/work/${project.id}` },
        ]}
      />
      <ProjectSchema
        title={`${project.title} - ${project.descriptor}`}
        description={project.description}
        url={`/work/${project.id}`}
        image={project.heroImage}
        location="Bangalore, India"
      />

      {/* 1. HERO BANNER WITH GLASSMORPHISM OVERLAY */}
      <section className="relative w-full h-[50vh] md:h-[70vh] lg:h-[80vh] overflow-hidden bg-[#0f172a]">
        <Image
          quality={85}
          priority
          src={project.heroImage}
          alt={`${project.title} - ${project.descriptor} interior design by VOOMET in Bangalore`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover opacity-90"
        />
        {/* Dark Gradient Vignette for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-transparent to-[#0f172a]/20 pointer-events-none"></div>

        {/* Glassmorphism Title Overlay */}
        <div className="absolute bottom-6 md:bottom-16 left-1/2 -translate-x-1/2 w-[88%] md:w-auto min-w-[300px]">
          <div className="bg-white/5 md:bg-white/10 backdrop-blur-sm md:backdrop-blur-xl border border-white/10 md:border-white/20 p-5 md:p-8 rounded-[24px] md:rounded-2xl shadow-2xl text-center">
            <p className="text-white/80 text-[10px] md:text-caption uppercase tracking-[0.2em] font-semibold mb-1 md:mb-2">
              Verified Project Case Study
            </p>
            <h1 className="text-[28px] sm:text-[34px] md:text-h1 font-bold text-white tracking-tight leading-tight">
              {project.title}
            </h1>
            <p className="text-[11px] md:text-[14px] uppercase tracking-[0.2em] font-medium text-amber-400 mt-2 md:mt-3">
              {project.descriptor}
            </p>
          </div>
        </div>

        {/* Back Navigation Breadcrumb overlayed at top left */}
        <div className="absolute top-20 md:top-24 left-4 md:left-10 z-10 flex items-center gap-3">
          <Link
            href="/designs"
            className="inline-flex items-center gap-1 md:gap-2 text-white/90 hover:text-white text-[10px] md:text-button font-semibold tracking-widest uppercase bg-[#0f172a]/30 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 transition-all hover:bg-[#0f172a]/60"
          >
            &larr; <span className="hidden md:inline">View Our Designs</span>
            <span className="md:hidden">Designs</span>
          </Link>
          <Link
            href="/interior-designers-bangalore"
            className="hidden sm:inline-flex items-center gap-1 text-amber-300 hover:text-white text-[10px] md:text-button font-semibold tracking-widest uppercase bg-[#0f172a]/30 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 transition-all hover:bg-[#0f172a]/60"
          >
            Bangalore Interiors
          </Link>
        </div>
      </section>

      {/* 2. SPLIT-LAYOUT CONTENT AREA */}
      <section className="site-container mx-auto px-4 md:px-8 mt-8 md:mt-20 max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* LHS: PROJECT METADATA & PROFILE */}
          <div className="lg:col-span-5 flex flex-col space-y-10">
            {/* Title Block */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-3">
                <MapPin className="w-3.5 h-3.5 text-amber-600" /> Bengaluru Project
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-h2 font-bold text-neutral-900 uppercase tracking-tight">
                {project.title}
              </h2>
              <h3 className="text-base sm:text-lg md:text-h3 text-neutral-500 font-light mt-1 uppercase tracking-wide">
                {project.descriptor}
              </h3>
            </div>

            {/* Description */}
            <div className="prose prose-neutral">
              <p className="text-neutral-600 leading-relaxed text-body">
                {project.description}
              </p>
            </div>

            {/* Dynamic Specifications Grid */}
            <div className="grid grid-cols-2 gap-3 md:gap-x-4 md:gap-y-6 bg-white border border-slate-200 p-5 md:p-6 rounded-2xl shadow-sm items-start">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-1">
                  Firm / Builder
                </p>
                <p className="text-xs md:text-sm font-semibold text-neutral-800">
                  {project.specs.firm}
                </p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block mb-1">
                  Design Lead
                </span>
                <p className="text-xs md:text-sm font-semibold text-neutral-800 line-clamp-1">
                  {project.specs.leadDesigner}
                </p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block mb-1">
                  Scale / Area
                </span>
                <p className="text-xs md:text-sm font-semibold text-amber-700">
                  {project.specs.area}
                </p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block mb-1">
                  Turnkey Scope
                </span>
                <p className="text-xs md:text-sm font-semibold text-neutral-800">
                  Full Design & Build
                </p>
              </div>
              <div className="col-span-2 pt-3 border-t border-slate-100">
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block mb-1">
                  Materials & Finishes
                </span>
                <p className="text-xs md:text-sm text-neutral-700 font-medium leading-relaxed">
                  {project.specs.materials}
                </p>
              </div>
            </div>

            {/* Features List */}
            <div>
              <h4 className="text-caption uppercase tracking-widest text-neutral-900 font-bold mb-5 flex items-center gap-2">
                <span className="w-4 h-px bg-[#0f172a]"></span>
                Key Design & Execution Elements
              </h4>
              <ul className="hidden md:block space-y-3">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[15px] text-neutral-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <MobileAutoScrollCarousel className="md:hidden flex gap-2 pt-1 pb-2">
                {project.features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center min-w-fit snap-start py-2 px-4 bg-slate-50 border border-slate-200 text-slate-800 text-[11px] font-semibold rounded-full tracking-wide shrink-0 shadow-sm"
                  >
                    {feature}
                  </span>
                ))}
              </MobileAutoScrollCarousel>
            </div>

            {/* Related Service Context Links */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                Related Capabilities
              </h4>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/services/commercial-interiors"
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 hover:border-slate-900 transition-colors"
                >
                  Commercial Interiors
                </Link>
                <Link
                  href="/services/aluminium-systems"
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 hover:border-slate-900 transition-colors"
                >
                  Aluminium Systems
                </Link>
                <Link
                  href="/interior-designers-bangalore"
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-800 hover:border-slate-900 transition-colors"
                >
                  Bangalore Studio
                </Link>
              </div>
            </div>
          </div>

          {/* RHS: RICH MEDIA PRESENTATION GRID */}
          <div className="lg:col-span-7">
            <ProjectGalleryInteractive
              title={project.title}
              gallery={project.gallery}
              videoUrl={project.videoUrl}
              heroImage={project.heroImage}
            />
          </div>
        </div>
      </section>

      {/* 3. CTA */}
      <div className="mt-20">
        <CTAV4 />
      </div>
    </main>
  );
}
