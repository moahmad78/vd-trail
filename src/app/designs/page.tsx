// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
import ProjectHighlightsV2 from '@/components/ProjectHighlightsV2';

export const metadata = {
  title: 'Design Gallery | Voomet Design',
  description: 'Browse Voomet Design\'s interior design gallery — hospitality, residential, educational and commercial spaces crafted across India.',
  alternates: {
    canonical: '/designs',
  },
  openGraph: {
    title: 'Design Gallery | Voomet Design',
    description: 'Browse Voomet Design\'s interior design gallery — hospitality, residential, educational and commercial spaces crafted across India.',
  },
  twitter: {
    title: 'Design Gallery | Voomet Design',
    description: 'Browse Voomet Design\'s interior design gallery — hospitality, residential, educational and commercial spaces crafted across India.',
  },
};

export default function PortfolioPage() {
  return (
    <main className="w-full min-h-screen bg-[#F7F7F5] antialiased">
      <ProjectHighlightsV2 hideCTA={true} />
    </main>
  );
}
