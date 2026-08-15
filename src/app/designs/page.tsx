// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
import ProjectHighlightsV2 from '@/components/ProjectHighlightsV2';
import { BreadcrumbSchema } from '@/components/seo/JsonLd';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interior Design Projects & Portfolio in Bangalore | VOOMET',
  description: 'Explore VOOMET\'s interior design project portfolio across commercial workspaces, luxury residences, hospitality and educational spaces in Bangalore and across India.',
  alternates: {
    canonical: 'https://www.voometdesign.com/designs',
  },
  openGraph: {
    title: 'Interior Design Projects & Portfolio in Bangalore | VOOMET',
    description: 'Explore VOOMET\'s interior design project portfolio across commercial workspaces, luxury residences, hospitality and educational spaces in Bangalore and across India.',
    url: 'https://www.voometdesign.com/designs',
  },
};

export default function PortfolioPage() {
  return (
    <main className="w-full min-h-screen bg-[#F7F7F5] antialiased">
      <BreadcrumbSchema 
        items={[
          { name: "Home", url: "/" },
          { name: "Our Designs", url: "/designs" }
        ]}
      />
      <ProjectHighlightsV2 hideCTA={true} />
    </main>
  );
}
