import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BANGALORE_AREAS } from "@/data/bangaloreAreas";
import SlideUpFade from "@/components/animations/SlideUpFade";
import CTAV4 from "@/components/CTAV4";

export const metadata: Metadata = {
  title: "Premium Interior Designers in Bangalore | Voomet Design",
  description: "Voomet Design is Bangalore's premier interior design studio, delivering luxury residential, commercial, and hospitality spaces across all major neighborhoods.",
  alternates: {
    canonical: "/interior-designer-bangalore",
  },
};

export default function BangaloreHubPage() {
  const areas = Object.values(BANGALORE_AREAS);

  return (
    <main className="relative bg-white pt-24 pb-12">
      {/* Hero Section */}
      <section className="relative px-6 md:px-12 max-w-[1440px] mx-auto py-16 md:py-24">
        <SlideUpFade>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#0f172a] mb-6">
              Luxury Interior Design in Bangalore
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              From the expansive villas of Whitefield and Yelahanka to the sophisticated independent homes of Indiranagar and Koramangala, Voomet Design is the trusted partner for premium interior execution across Bangalore.
            </p>
          </div>
        </SlideUpFade>
      </section>

      {/* Why Choose Us for Bangalore */}
      <section className="bg-[#f8f9fa] py-20 px-6 md:px-12">
        <div className="max-w-[1440px] mx-auto">
          <SlideUpFade>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-12">Why Choose a Local Bangalore Studio?</h2>
          </SlideUpFade>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SlideUpFade delay={0.1}>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-[#0f172a] mb-4">Seamless Project Management</h3>
                <p className="text-gray-600">Faster site visits, direct supervision, and deep knowledge of local BBMP regulations and gated community guidelines.</p>
              </div>
            </SlideUpFade>
            <SlideUpFade delay={0.2}>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-[#0f172a] mb-4">Premium Local Sourcing</h3>
                <p className="text-gray-600">An established network of Bangalore's finest material suppliers, artisans, and imported furniture vendors ensures flawless quality.</p>
              </div>
            </SlideUpFade>
            <SlideUpFade delay={0.3}>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-[#0f172a] mb-4">In-House Manufacturing</h3>
                <p className="text-gray-600">Our local manufacturing facility allows for precision engineering of custom woodwork, avoiding typical contractor delays.</p>
              </div>
            </SlideUpFade>
          </div>
        </div>
      </section>

      {/* Neighborhoods Grid */}
      <section className="py-20 px-6 md:px-12 max-w-[1440px] mx-auto">
        <SlideUpFade>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-4">Neighborhoods We Serve</h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl">
            Explore our tailored design approach for Bangalore's most prominent residential and commercial hubs.
          </p>
        </SlideUpFade>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, idx) => (
            <SlideUpFade key={area.id} delay={idx * 0.05}>
              <Link 
                href={`/interior-designer-bangalore/${area.id}`}
                className="group block relative overflow-hidden rounded-xl aspect-[4/3]"
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src={area.heroImage}
                    alt={`Interior designer in ${area.name}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {area.name}
                  </h3>
                  <p className="text-gray-200 text-sm font-medium">
                    {area.type}
                  </p>
                </div>
              </Link>
            </SlideUpFade>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <CTAV4 />
    </main>
  );
}
