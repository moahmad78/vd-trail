import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BANGALORE_AREAS } from "@/data/bangaloreAreas";
import SlideUpFade from "@/components/animations/SlideUpFade";
import CTAV4 from "@/components/CTAV4";

interface PageProps {
  params: {
    area: string;
  };
}

export async function generateStaticParams() {
  return Object.keys(BANGALORE_AREAS).map((area) => ({
    area: area,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const areaData = BANGALORE_AREAS[params.area];
  
  if (!areaData) {
    return {
      title: "Area Not Found",
    };
  }

  return {
    title: `Interior Designer in ${areaData.name}, Bangalore | Voomet Design`,
    description: `Looking for a premium interior designer in ${areaData.name}, Bangalore? Voomet Design crafts luxury residential and commercial spaces tailored to ${areaData.name}'s lifestyle.`,
    alternates: {
      canonical: `/interior-designer-bangalore/${params.area}`,
    },
    openGraph: {
      title: `Interior Designer in ${areaData.name}, Bangalore | Voomet Design`,
      description: `Premium interior design services in ${areaData.name}, Bangalore by Voomet Design.`,
      url: `https://voometdesign.com/interior-designer-bangalore/${params.area}`,
      images: [
        {
          url: areaData.heroImage,
          width: 1200,
          height: 630,
          alt: `Interior design in ${areaData.name}`,
        },
      ],
    },
  };
}

export default function AreaPage({ params }: PageProps) {
  const areaData = BANGALORE_AREAS[params.area];

  if (!areaData) {
    notFound();
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Voomet Design",
    "image": "https://voometdesign.com/logo/icon.webp",
    "url": `https://voometdesign.com/interior-designer-bangalore/${params.area}`,
    "telephone": "+91-9845014279",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "No. 166, Obandehalli Industrial Area",
      "addressLocality": "Doddaballapura",
      "addressRegion": "Karnataka",
      "postalCode": "561203",
      "addressCountry": "IN"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": areaData.name
      },
      {
        "@type": "City",
        "name": "Bangalore"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": areaData.faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <main className="relative bg-white pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={areaData.heroImage}
            alt={`Interior design in ${areaData.name}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
        </div>
        
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12">
          <SlideUpFade>
            <div className="max-w-2xl">
              <Link 
                href="/interior-designers-bangalore"
                className="inline-block mb-6 text-amber-400 hover:text-amber-300 font-medium tracking-wide text-sm uppercase transition-colors"
              >
                ← Back to Bangalore Interiors
              </Link>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Premium Interior Design in <span className="text-amber-400">{areaData.name}</span>, Bangalore
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed">
                {areaData.type}. Tailored luxury interiors for {areaData.name}'s unique architectural landscape and lifestyle.
              </p>
            </div>
          </SlideUpFade>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-6 md:px-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <SlideUpFade>
              <h2 className="text-3xl font-bold text-[#0f172a] mb-6">Designing for {areaData.name}'s Lifestyle</h2>
              <div className="prose prose-lg text-gray-600 max-w-none mb-12">
                <p>{areaData.description}</p>
              </div>
              
              <h3 className="text-2xl font-bold text-[#0f172a] mb-6">Why Choose Us in {areaData.name}?</h3>
              <ul className="space-y-4 mb-12">
                {areaData.characteristics.map((char, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-amber-100 text-amber-600 mt-1 mr-4">
                      ✓
                    </span>
                    <span className="text-lg text-gray-700">{char}</span>
                  </li>
                ))}
              </ul>
            </SlideUpFade>
          </div>

          <div className="lg:col-span-5">
            <SlideUpFade delay={0.2}>
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <h3 className="text-2xl font-bold text-[#0f172a] mb-8">Frequently Asked Questions</h3>
                <div className="space-y-6">
                  {areaData.faq.map((item, idx) => (
                    <div key={idx}>
                      <h4 className="text-lg font-bold text-[#0f172a] mb-2">{item.question}</h4>
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SlideUpFade>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTAV4 />
    </main>
  );
}
