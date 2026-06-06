// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const posts = [
 {
 title: "Latest Interior Trends 2026: The Rise of Biophilic Education",
 excerpt: "How modern schools are integrating nature to improve student focus and well-being.",
 date: "May 12, 2026",
 category: "Trends",
 image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800",
 },
 {
 title: "Office Design Tips: Maximizing Productivity in Small Spaces",
 excerpt: "Clever layout hacks to make your compact workspace feel expansive and agile.",
 date: "May 10, 2026",
 category: "Tips",
 image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800",
 },
 {
 title: "Artisanal Finishes: Why Wood is the Heart of Luxury Interiors",
 excerpt: "Exploring the timeless elegance and sustainable craftsmanship of high-performance technical woodwork.",
 date: "May 08, 2026",
 category: "News",
 image: "https://images.unsplash.com/photo-1503708928676-1cb796a0891e?q=80&w=800",
 },
];

const BlogSection = () => {
 return (
 <section className="py-12 md:py-24 bg-[#f8fafc]">
 <div className="site-container md:px-6">
 <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16">
 <div className="max-w-2xl">
 <h2 className="text-section text-[10px] md:text-xs mb-2 md:mb-4 block text-neutral-900">
 Authority & Insights
 </h2>
 <h3 className="text-card text-[#0f172a] text-xl md:text-3xl text-neutral-900">
 The VoometDesign Journal
 </h3>
 </div>
 <Link
 href="/blog"
 className="mt-4 md:mt-0 text-[10px] md:text-sm text-[#0f172a] flex items-center gap-2 hover:text-[#324A61] transition-colors"
 >
 READ ALL ARTICLES <ArrowUpRight size={16} className="md:w-5 md:h-5" />
 </Link>
 </div>
 <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto pb-8 md:pb-0 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
 {posts.map((post, index) => (
 <motion.div
 key={index}
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 transition={{ delay: index * 0.1 }}
 viewport={{ once: true }}
 className="bg-white rounded-3xl md:rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all group min-w-[85vw] md:min-w-0 snap-center flex flex-col"
 >
 <div className="h-48 md:h-64 relative overflow-hidden shrink-0">
 <img loading="lazy" decoding="async"
 src={post.image}
 alt={post.title}
 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
 />
 <div className="absolute top-4 left-4 md:top-6 md:left-6">
 <span className="bg-[#0f172a] text-white md:text-primary text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 rounded-full shadow-md">
 {post.category}
 </span>
 </div>
 </div>
 <div className="p-5 md:p-8 flex flex-col flex-grow">
 <p className="mb-2 md:mb-4 text-neutral-600 leading-relaxed font-normal text-xs md:text-base">
 {post.date}
 </p>
 <h4 className="text-card mb-3 md:mb-4 text-[#0f172a] group-hover: transition-colors text-sm md:text-lg text-neutral-900">
 {post.title}
 </h4>
 <p className="mb-4 md:mb-6 line-clamp-2 md:line-clamp-3 text-neutral-600 leading-relaxed font-normal text-xs md:text-base flex-grow">
 {post.excerpt}
 </p>
 <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-[#324A61] group-hover:text-white transition-all mt-auto self-start">
 <ArrowUpRight size={16} />
 </div>
 </div>
 </motion.div>
 ))}
 </div>
 </div>
 </section>
 );
};

export default BlogSection;
