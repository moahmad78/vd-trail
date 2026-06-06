// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";

const services = [
  "Premium Residential",
  "Hospitality",
  "Educational Spaces",
  "Turnkey Execution",
  "In-House Manufacturing",
  "BIM Architecture",
  "Precision Engineering"
];

// Duplicate the array to ensure smooth infinite scrolling
const duplicatedServices = [...services, ...services, ...services];

const ServiceMarquee = () => {
  return (
    <section className="py-4 md:py-5 overflow-hidden border-y border-neutral-200/70 bg-white">
      <div className="flex w-max animate-marquee whitespace-nowrap gap-12 hover:[animation-play-state:paused]">
        {duplicatedServices.map((service, index) => (
          <div key={index} className="flex items-center gap-12">
            <span className="font-sans text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-neutral-800">
              {service}
            </span>
            <span className="text-[10px] md:text-xs text-neutral-300">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceMarquee;
