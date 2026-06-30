import Link from 'next/link';
import SlideUpFade from './animations/SlideUpFade';
import StaggerGrid from './animations/StaggerGrid';
import SectionWave from '@/components/ui/SectionWave';
import Image from 'next/image';

const PROJECTS = [
  {
    name: "Apps for Bharat",
    location: "Bangalore",
    link: "/work/apps-for-bharat",
    image: "/assets/work/filter-grid/apps-for-bharat.png"
  },
  {
    name: "Zluri",
    location: "Bangalore",
    link: "/work/zluri",
    image: "/assets/work/filter-grid/zluri.png"
  },
  {
    name: "QpiAI",
    location: "Bangalore",
    link: "/work/QpiAI",
    image: "/assets/work/filter-grid/qpiai.png"
  },
  {
    name: "Physics Wallah",
    location: "Bangalore",
    link: "/work/pw-brigade",
    image: "/assets/work/filter-grid/pw.png"
  },
  {
    name: "Juego",
    location: "Bangalore",
    link: "/work/juego",
    image: "/assets/work/filter-grid/juego.png"
  },
  {
    name: "Orbit",
    location: "Bangalore",
    link: "/work/orbit",
    image: "/assets/work/filter-grid/orbit.jpg"
  },
  {
    name: "The Little Gym",
    location: "Bangalore",
    link: "/work/littlegym",
    image: "/assets/work/filter-grid/littlegym.png"
  },
  {
    name: "Happey",
    location: "Bangalore",
    link: "/work/happey",
    image: "/assets/work/filter-grid/happey.jpg"
  }
];

export default function ProjectHighlights() {
  return (
    <section id="portfolio" className="px-4 md:px-8 lg:px-16 py-16 md:py-24 bg-white">
      <div className="site-container">
        <SlideUpFade>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8 w-full max-w-[1440px] mx-auto px-6 md:px-12 mb-12">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-8 h-px bg-neutral-300"></div>
                <span className="text-caption uppercase tracking-[0.35em] text-neutral-500 font-sans">Selected Work</span>
              </div>
              <h2 className="font-sans text-h1 font-semibold tracking-[-0.03em] leading-tight text-neutral-900 flex flex-wrap items-center">
                Project{" "}<span className="italic font-light inline-flex items-center">Highlights<SectionWave /></span>
              </h2>
            </div>
            <p className="max-w-sm text-body text-neutral-500 md:text-right leading-relaxed">
              Explore our curated selection of bespoke interior execution and premium architectural deliveries.
            </p>
          </div>
        </SlideUpFade>

        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PROJECTS.map((project, index) => (
            <Link key={index} href={project.link} className="group block relative aspect-[4/3] overflow-hidden rounded-2xl border border-yellow-600/30 shadow-md hover:shadow-2xl transition-shadow duration-500 bg-slate-50">
              <div className="w-full h-full overflow-hidden relative">
                <Image 
                  fill
                  src={project.image} 
                  alt={project.name} 
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              
              {/* Subtle dark gradient vignette mask overlay (bottom 50%) */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/40 to-transparent pointer-events-none"></div>
              
              {/* Sleek, slim frosted-glass effect dark bar at the very bottom edge */}
              <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#0f172a]/40 backdrop-blur-md border-t border-white/10 px-5 py-4 flex flex-row items-center justify-between">
                <div className="flex flex-col">
                  <h4 className="font-sans font-semibold text-white text-h5 tracking-wide">{project.name}</h4>
                  <p className="text-neutral-400 text-small mt-0.5 uppercase tracking-wider">{project.location}</p>
                </div>
                <span className="text-white text-caption font-bold tracking-[0.15em] uppercase flex items-center gap-1 group-hover:text-yellow-400 transition-colors duration-300">
                  VIEW DETAILS <span className="group-hover:translate-x-1 transition-transform duration-300">&gt;</span>
                </span>
              </div>
            </Link>
          ))}
        </StaggerGrid>

        <SlideUpFade delay={0.2}>
          <div className="mt-14 text-center">
            <Link className="inline-flex items-center gap-2 text-button uppercase tracking-[0.15em] font-semibold text-neutral-900 hover:text-neutral-600 transition-colors group" href="/portfolio">
              View Our Work
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>
        </SlideUpFade>
      </div>
    </section>
  );
}
