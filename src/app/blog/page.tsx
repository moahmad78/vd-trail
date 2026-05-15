"use client";

import { useState } from "react";
import { blogPosts } from "@/data/blogData";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";

const categories = ["All", "Hospitality", "Healthcare", "Residential", "Aluminium Fabrication"];

export default function BlogListing() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = activeCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <div className="bg-white min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-4xl mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-[#020617] mb-6">
            Insights & <span className="text-accent">Innovations</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl">
            Exploring the intersection of architectural precision and lifestyle design. Stay updated with the latest trends in healthcare, hospitality, and fabrication.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-4 mb-12 border-b border-slate-100 pb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat 
                ? "bg-[#020617] text-white shadow-xl" 
                : "bg-slate-50 text-slate-500 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all"
              >
                <Link href={`/blog/${post.slug}`} className="relative h-64 overflow-hidden block">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-md text-[#020617] text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </Link>
                <div className="p-10 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>By {post.author}</span>
                  </div>
                  <h2 className="text-2xl font-display font-bold text-[#020617] mb-4 line-clamp-2 hover:text-accent transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                    {post.excerpt}
                  </p>
                  <Link 
                    href={`/blog/${post.slug}`} 
                    className="flex items-center gap-2 font-bold text-[#020617] group-hover:text-accent transition-colors"
                  >
                    Read Full Article <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-24">
            <Search className="mx-auto w-12 h-12 text-slate-200 mb-4" />
            <p className="text-slate-400">No articles found in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
