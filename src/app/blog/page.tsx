// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { allBlogPosts as POSTS } from "@/data/blogData";

const CATEGORIES = [
  "All",
  "Materials & Sourcing",
  "Residential",
  "Hospitality",
  "Educational",
  "Aluminium Systems",
];

export default function BlogListing() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? POSTS
      : POSTS.filter((post) => post.category === activeCategory);

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const secondaryPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  return (
    <main className="bg-slate-50 min-h-screen pt-4 sm:pt-6 pb-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* JOURNAL HEADER */}
        <div className="mb-6 sm:mb-8 pt-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#324A61] mb-2">
            <span>Voomet Journal</span>
            <span className="text-neutral-300">•</span>
            <span>Design & Construction Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 tracking-tight">
            Insights, Blueprints & Material Sourcing
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 mt-1.5 max-w-2xl leading-relaxed">
            Practical guides on architecture, turnkey interior execution, fenestration engineering, and factory-direct material procurement in Bangalore.
          </p>
        </div>

        {/* MAIN LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: FEATURED POST & ARTICLE CARDS */}
          <div className="lg:col-span-8">
            {filteredPosts.length === 0 ? (
              <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center text-neutral-500 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-[#324A61] block mb-3">
                  Notice
                </span>
                No insights found for this category yet. Check back soon!
              </div>
            ) : (
              <>
                {/* FEATURED HERO POST CARD */}
                {featuredPost && (
                  <Link href={`/blog/${featuredPost.slug}`} className="block group mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                      {/* Image Frame - Uses dark navy canvas + object-contain so full banner is 100% visible */}
                      <div className="lg:col-span-7 bg-[#071329] relative flex items-center justify-center overflow-hidden min-h-[240px] sm:min-h-[300px] lg:min-h-[350px] p-3 sm:p-4">
                        <img
                          loading="eager"
                          decoding="async"
                          src={featuredPost.image}
                          alt={featuredPost.title}
                          className="w-full h-full max-h-[340px] object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>

                      {/* Content Frame */}
                      <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="inline-block px-2.5 py-0.5 rounded bg-blue-50 text-[#324A61] text-[11px] font-bold uppercase tracking-wider">
                              Featured Insight
                            </span>
                            <span className="text-xs text-neutral-300">•</span>
                            <span className="text-xs font-semibold text-neutral-500">
                              {featuredPost.category}
                            </span>
                          </div>

                          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 group-hover:text-[#324A61] transition-colors leading-snug mb-3">
                            {featuredPost.title}
                          </h2>

                          <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3 mb-4">
                            {featuredPost.snippet}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-neutral-500 font-medium">
                          <span>{featuredPost.date}</span>
                          <span className="inline-flex items-center gap-1 text-[#324A61] font-bold group-hover:translate-x-1 transition-transform">
                            Read Full Article <ArrowRight size={13} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}

                {/* SECONDARY POSTS GRID */}
                {secondaryPosts.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {secondaryPosts.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="group flex flex-col h-full"
                      >
                        <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden hover:shadow-md transition-all h-full flex flex-col">
                          {/* Image Thumbnail with fixed aspect ratio */}
                          <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                            <img
                              loading="lazy"
                              decoding="async"
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>

                          {/* Card Content */}
                          <div className="p-5 sm:p-6 flex flex-col flex-grow">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#324A61] block mb-2">
                              {post.category}
                            </span>
                            <h3 className="text-base sm:text-lg font-bold text-neutral-900 group-hover:text-[#324A61] transition-colors leading-snug line-clamp-2 mb-3">
                              {post.title}
                            </h3>
                            <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-neutral-500">
                              <span>{post.date}</span>
                              <span className="inline-flex items-center gap-1 text-[#324A61] font-semibold group-hover:translate-x-1 transition-transform">
                                Read <ArrowRight size={12} />
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* RIGHT COLUMN: STICKY SIDEBAR */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            {/* PILLARS / CATEGORIES */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-5 sm:p-6 shadow-sm">
              <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-3 pb-2 border-b border-slate-100">
                Explore Pillars
              </h4>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                      activeCategory === cat
                        ? "bg-[#324A61] text-white shadow-sm"
                        : "bg-slate-50 text-neutral-600 border border-slate-200/70 hover:bg-slate-100 hover:text-neutral-900"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* TRENDING INSIGHTS */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-5 sm:p-6 shadow-sm">
              <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-4 pb-2 border-b border-slate-100">
                Trending Insights
              </h4>
              <div className="flex flex-col space-y-4">
                <Link
                  href="/blog/intrihub-building-materials-online-bangalore-60-minute-delivery"
                  className="group block"
                >
                  <span className="text-[11px] font-bold text-neutral-400 block mb-0.5">
                    01
                  </span>
                  <h5 className="text-sm font-semibold text-neutral-900 group-hover:text-[#324A61] transition-colors leading-snug line-clamp-2">
                    Intrihub: Buy Building Materials Online in Bangalore with 60-Minute Delivery
                  </h5>
                </Link>

                <Link
                  href="/blog/educational-interiors-future-ergonomics"
                  className="group block"
                >
                  <span className="text-[11px] font-bold text-neutral-400 block mb-0.5">
                    02
                  </span>
                  <h5 className="text-sm font-semibold text-neutral-900 group-hover:text-[#324A61] transition-colors leading-snug line-clamp-2">
                    Acoustic Noise Control Ratings in Institutional Frameworks
                  </h5>
                </Link>

                <Link
                  href="/blog/luxury-hotel-lobby-circulation-lighting"
                  className="group block"
                >
                  <span className="text-[11px] font-bold text-neutral-400 block mb-0.5">
                    03
                  </span>
                  <h5 className="text-sm font-semibold text-neutral-900 group-hover:text-[#324A61] transition-colors leading-snug line-clamp-2">
                    Optimizing Guest Flow Circulation Matrices for High-End Hospitality Lounges
                  </h5>
                </Link>

                <Link
                  href="/blog/premium-aluminium-facades-structural-glazing"
                  className="group block"
                >
                  <span className="text-[11px] font-bold text-neutral-400 block mb-0.5">
                    04
                  </span>
                  <h5 className="text-sm font-semibold text-neutral-900 group-hover:text-[#324A61] transition-colors leading-snug line-clamp-2">
                    The Engineering Behind High-Performance Facades & Glazing Surfaces
                  </h5>
                </Link>
              </div>
            </div>

            {/* NEWSLETTER CTA BOX */}
            <div className="bg-[#0f172a] text-white p-5 sm:p-6 rounded-xl border border-slate-800 shadow-md relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#324A61]/20 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Voomet Design Blueprints
                </span>
                <h4 className="text-base font-bold text-white mb-2">
                  Subscribe to Design Intelligence
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Get monthly updates on commercial space optimization, factory material trends, and raw BOQ estimation sheets.
                </p>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex flex-col gap-2"
                >
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    required
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#324A61] outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#324A61] text-white py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#273a4d] transition-all duration-200 shadow-sm"
                  >
                    Join Magazine Network
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
