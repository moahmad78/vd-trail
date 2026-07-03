const fs = require('fs');
const path = require('path');

const pagePath = path.join('D:\\VoometDesign\\VD-WEB\\src\\app\\services\\[...slug]\\page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// 1. Add export const dynamic = 'force-dynamic' at the top
if (!content.includes("export const dynamic = 'force-dynamic';")) {
  content = content.replace(
    /import \{ notFound, redirect \} from "next\/navigation";/,
    `export const dynamic = 'force-dynamic';\nimport { notFound, redirect } from "next/navigation";`
  );
}

// 2. Update service-apartments data
content = content.replace(
  /"service-apartments": \{[\s\S]*?metaDescription: "Crafting memorable guest experiences through luxury hospitality environments.",\n  \},/g,
  `"service-apartments": {
    title: "Service Apartments",
    subtitle: "Service Apartments",
    description: "Premium service apartments designed for extended stays, combining the luxury of a hotel with the comfort and functionality of a home.",
    heroImage: "/Design/hospitality/h2.jpeg",
    featureImage: "/Design/hospitality/h2.jpeg",
    heroBadges: [],
    whyChooseVoomet: [
      { icon: LayoutTemplate, title: "Functional Layouts", description: "Optimized for long-term living." },
      { icon: Home, title: "Home-like Comfort", description: "Warm and inviting interiors." },
      { icon: Settings, title: "Durable Materials", description: "Built for high turnover." },
      { icon: Sparkles, title: "Premium Aesthetics", description: "Luxury hotel standards." }
    ],
    featureBlocks: [],
    comparisonRows: [],
    perfectionSteps: [
      { icon: "🎨", title: "Space Planning", description: "Maximizing every square foot." },
      { icon: "👁️", title: "Material Selection", description: "Choosing durable, premium finishes." },
      { icon: "⚡", title: "Execution", description: "Rapid and flawless deployment." }
    ],
    uspTabs: [
      { id: "tab1", label: "Efficient Design", content: "" },
      { id: "tab2", label: "High Durability", content: "" },
      { id: "tab3", label: "Turnkey Setup", content: "" },
      { id: "tab4", label: "Guest Satisfaction", content: "" }
    ],
    testimonials: [
      { clientName: "Urban Stay Group", projectType: "Serviced Residences · Mumbai", quote: "A premium finish from top to bottom. Voomet Design delivered a high-yielding, functional layout that our guests absolutely love." }
    ],
    ctaHeadline: "ELEVATE YOUR SERVICE APARTMENTS.",
    ctaCopy: "Create spaces that guests never want to leave.",
    ctaCategory: "Service Apartments",
    metaTitle: "Service Apartments | VOOMETDESIGN — Premium Living Spaces",
    metaDescription: "Premium service apartments designed for extended stays, combining luxury and functionality.",
  },`
);

// 3. Update pg-accommodation data
content = content.replace(
  /"pg-accommodation": \{[\s\S]*?metaDescription: "Crafting memorable guest experiences through luxury hospitality environments.",\n  \},/g,
  `"pg-accommodation": {
    title: "PG Accommodation",
    subtitle: "PG Accommodation",
    description: "We design modern PG accommodations that balance functionality with comfort — creating spaces that feel like home for students and working professionals. From efficient room layouts to shared common areas, every detail is thoughtfully crafted.",
    heroImage: "/Design/hospitality/h1.jpeg",
    featureImage: "/Design/hospitality/h1.jpeg",
    heroBadges: [],
    whyChooseVoomet: [
      { icon: LayoutTemplate, title: "Space-Efficient Room Design", description: "Optimized living spaces." },
      { icon: Home, title: "Comfortable Common Areas", description: "Fostering community." },
      { icon: Sparkles, title: "Modern Shared Kitchen", description: "Functional and clean." },
      { icon: BookOpen, title: "Study & Work Zones", description: "Dedicated focus areas." }
    ],
    featureBlocks: [],
    comparisonRows: [],
    perfectionSteps: [
      { icon: "🎨", title: "Layout Planning", description: "Maximizing capacity without crowding." },
      { icon: "👁️", title: "Utility Design", description: "Adequate storage and amenities." },
      { icon: "⚡", title: "Build", description: "Cost-effective, durable execution." }
    ],
    uspTabs: [
      { id: "tab1", label: "Space Efficiency", content: "" },
      { id: "tab2", label: "Student-Friendly", content: "" },
      { id: "tab3", label: "Low Maintenance", content: "" },
      { id: "tab4", label: "Modern Appeal", content: "" }
    ],
    testimonials: [
      { clientName: "Greenfield Properties", projectType: "PG Accommodations · Bengaluru", quote: "Voomet Design helped us create a clean, modern and welcoming student residence. Occupancy went up within the first month. Outstanding value." }
    ],
    ctaHeadline: "MODERNIZE YOUR PG ACCOMMODATION.",
    ctaCopy: "Create comfortable, functional spaces that residents love to call home.",
    ctaCategory: "PG Accommodation",
    metaTitle: "PG Accommodation | VOOMETDESIGN — Modern Co-living Spaces",
    metaDescription: "Modern PG accommodations balancing functionality with comfort for students and professionals.",
  },`
);

fs.writeFileSync(pagePath, content, 'utf8');
console.log('Updated page.tsx');
