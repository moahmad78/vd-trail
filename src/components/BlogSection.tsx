"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const posts = [
  {
    title: "Latest Interior Trends 2026: The Rise of Biophilic Healthcare",
    excerpt: "How medical facilities are integrating nature to speed up patient recovery.",
    date: "May 12, 2026",
    category: "Trends",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800"
  },
  {
    title: "Office Design Tips: Maximizing Productivity in Small Spaces",
    excerpt: "Clever layout hacks to make your compact workspace feel expansive and agile.",
    date: "May 10, 2026",
    category: "Tips",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800"
  },
  {
    title: "Sustainable Aluminium: Why it's the Future of Architecture",
    excerpt: "Exploring the eco-friendly benefits of high-performance aluminium systems.",
    date: "May 08, 2026",
    category: "News",
    image: "https://images.unsplash.com/photo-1503708928676-1cb796a0891e?q=80&w=800"
  }
];

const BlogSection = () => {
  return (
    <section className="py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-4">Authority & Insights</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-[#020617]">The Voomet Journal</h3>
          </div>
          <button className="mt-8 md:mt-0 font-bold text-[#020617] flex items-center gap-2 hover:text-accent transition-colors">
            READ ALL ARTICLES <ArrowUpRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all group"
            >
              <div className="h-64 relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-accent text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{post.category}</span>
                </div>
              </div>
              <div className="p-8">
                <p className="text-xs font-bold text-slate-400 mb-4">{post.date}</p>
                <h4 className="text-xl font-bold mb-4 text-[#020617] leading-tight group-hover:text-accent transition-colors">
                  {post.title}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-[#020617] group-hover:text-white transition-all">
                  <ArrowUpRight size={18} />
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
