// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
import ProjectHighlightsV2 from '@/components/ProjectHighlightsV2';

export const metadata = {
  title: 'Our Designs | Voomet Design',
  description: 'Explore Voomet Design\'s interior design concepts, visualization renders and curated design gallery across hospitality, residential, educational and commercial spaces.',
  openGraph: {
    title: 'Our Designs | Voomet Design',
    description: 'Explore Voomet Design\'s interior design concepts, visualization renders and curated design gallery across hospitality, residential, educational and commercial spaces.',
  },
  twitter: {
    title: 'Our Designs | Voomet Design',
    description: 'Explore Voomet Design\'s interior design concepts, visualization renders and curated design gallery across hospitality, residential, educational and commercial spaces.',
  }
};

export default function PortfolioPage() {
  return (
    <main className="w-full min-h-screen bg-[#F7F7F5] antialiased">
      <ProjectHighlightsV2 hideCTA={true} />
    </main>
  );
}
