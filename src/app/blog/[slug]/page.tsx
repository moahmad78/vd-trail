"use client";

import { useParams } from "next/navigation";
import { blogPosts } from "@/data/blogData";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin, ArrowRight } from "lucide-react";

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="pt-40 pb-24 text-center">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <Link href="/blog" className="text-accent font-bold">Back to Blog</Link>
      </div>
    );
  }

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="bg-white min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs & Back */}
          <Link href="/blog" className="flex items-center gap-2 text-slate-400 font-bold text-sm mb-12 hover:text-[#020617] transition-all group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> BACK TO ALL ARTICLES
          </Link>

          {/* Post Header */}
          <header className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-slate-50 text-accent text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                {post.category}
              </span>
              <span className="text-slate-300 text-xs">•</span>
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                <Clock size={14} /> 6 MIN READ
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-[#020617] leading-tight mb-8">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-between gap-8 pb-10 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-[#020617] font-bold">
                  SS
                </div>
                <div>
                  <p className="text-[#020617] font-bold text-sm">{post.author}</p>
                  <p className="text-slate-400 text-xs">Chief Design Consultant</p>
                </div>
                <div className="w-[1px] h-8 bg-slate-100 mx-2 hidden sm:block" />
                <div className="hidden sm:flex items-center gap-2 text-slate-400 text-xs font-bold">
                  <Calendar size={14} /> {post.date}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Share</span>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#020617] hover:text-white transition-all"><Facebook size={14} /></button>
                  <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#020617] hover:text-white transition-all"><Twitter size={14} /></button>
                  <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-[#020617] hover:text-white transition-all"><Linkedin size={14} /></button>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 rounded-[3rem] overflow-hidden shadow-2xl h-[400px] md:h-[600px]"
          >
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover" 
            />
          </motion.div>

          {/* Content Wrapper */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <article className="lg:col-span-8 prose prose-slate max-w-none prose-h2:font-display prose-h2:text-3xl prose-h2:text-[#020617] prose-p:text-slate-600 prose-p:text-lg prose-p:leading-relaxed">
              <h2>Evolving Perspectives in {post.category}</h2>
              <p>
                In the rapidly shifting landscape of architectural design, {post.category.toLowerCase()} represents a unique challenge where precision meets emotional resonance. The core philosophy of Voomet Design has always been to bridge the gap between structural necessity and lifestyle aspiration.
              </p>
              
              <div className="my-12 p-8 bg-slate-50 rounded-3xl border-l-4 border-accent">
                <p className="italic font-display text-xl text-[#020617] mb-0">
                  "Architecture is not just about building walls; it's about defining how humans interact with their environment at every touchpoint."
                </p>
              </div>

              <h2>Key Strategic Trends for 2026</h2>
              <p>
                As we move towards 2026, several key factors are emerging as non-negotiable standards for premium {post.category.toLowerCase()} projects:
              </p>
              <ul>
                <li><strong>Biophilic Integration:</strong> Moving beyond just "plants" to integrated air filtration and organic geometries.</li>
                <li><strong>Acoustic Psychology:</strong> Designing spaces that manage sound as a primary environmental stimulus.</li>
                <li><strong>Sustainable Fabrication:</strong> The rise of recycled high-performance aluminium in structural systems.</li>
                <li><strong>Dynamic Lighting:</strong> Systems that mirror circadian rhythms to improve user well-being.</li>
              </ul>

              <div className="my-12 rounded-[2rem] overflow-hidden aspect-video relative group">
                 <img 
                    src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200" 
                    alt="Interior Design Execution"
                    className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-[#020617]/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <span className="bg-white text-[#020617] text-xs font-bold px-4 py-2 rounded-lg">View Details</span>
                 </div>
              </div>

              <h2>The Voomet Difference</h2>
              <p>
                What sets a turnkey solution apart is the "One-Point Ownership." When we handle both the design and the in-house fabrication, the margin for error evaporates. Every millimetre of your {post.category.toLowerCase()} project is managed under a unified quality control protocol.
              </p>
            </article>

            {/* Sidebar Sticky CTA */}
            <aside className="lg:col-span-4">
              <div className="sticky top-32 space-y-8">
                <div className="bg-[#020617] text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 rounded-full blur-3xl -translate-y-12 translate-x-12" />
                  <h4 className="text-2xl font-display font-bold mb-4 relative z-10">Start Your Project Journey</h4>
                  <p className="text-white/60 text-sm mb-8 relative z-10 leading-relaxed">
                    Ready to transform your vision into a precision-engineered reality?
                  </p>
                  <button className="w-full bg-accent text-primary py-4 rounded-xl font-bold text-sm hover:bg-white transition-all transform hover:-translate-y-1 relative z-10">
                    BOOK FREE CONSULTATION
                  </button>
                </div>

                <div className="p-8 border border-slate-100 rounded-[2.5rem]">
                  <h4 className="text-sm font-black text-[#020617] uppercase tracking-widest mb-6">Related Insights</h4>
                  <div className="space-y-6">
                    {relatedPosts.map((rp) => (
                      <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group block">
                        <p className="text-xs font-bold text-accent uppercase tracking-wider mb-2">{rp.category}</p>
                        <h5 className="text-sm font-bold text-[#020617] group-hover:text-accent transition-all line-clamp-2 leading-snug">
                          {rp.title}
                        </h5>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
