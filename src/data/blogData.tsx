export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: "Healthcare" | "Hospitality" | "Residential" | "Aluminium Fabrication" | "Education";
  author: string;
  date: string;
  image: string;
  content: React.ReactNode;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "modern-hospital-interior-design-trends-2026",
    title: "Modern Hospital Interior Design: Trends for 2026",
    excerpt: "Discover how healthcare spaces are evolving into healing sanctuaries through biophilic design and patient-centric layouts.",
    category: "Healthcare",
    author: "Sahil Sheikh",
    date: "May 15, 2026",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053",
    content: null // Placeholder for now
  },
  {
    slug: "why-in-house-aluminium-fabrication-saves-you-20-percent-cost",
    title: "Why In-House Aluminium Fabrication Saves You 20% Cost",
    excerpt: "Learn the economic and qualitative benefits of choosing a designer with in-house manufacturing capabilities.",
    category: "Aluminium Fabrication",
    author: "Sahil Sheikh",
    date: "May 12, 2026",
    image: "https://images.unsplash.com/photo-1503708928676-1cb796a0891e?q=80&w=2074",
    content: null
  },
  {
    slug: "5-luxury-elements-every-hotel-lobby-needs",
    title: "5 Luxury Elements Every Hotel Lobby Needs",
    excerpt: "From statement lighting to acoustic harmony, explore the key elements that define a premium guest welcome experience.",
    category: "Hospitality",
    author: "Sahil Sheikh",
    date: "May 10, 2026",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070",
    content: null
  }
];
