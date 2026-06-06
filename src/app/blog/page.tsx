// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
const CATEGORIES = [
 "All",
 "Residential",
 "Hospitality",
 "Educational",
 "Aluminium Systems",
];
import { allBlogPosts as POSTS } from "@/data/blogData";
export default function BlogListing() {
 const [activeCategory, setActiveCategory] = useState("All");
 const filteredPosts =
 activeCategory === "All"
 ? POSTS
 : POSTS.filter((post) => post.category === activeCategory);
 const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
 const secondaryPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

 return (
 <main className="bg-slate-50 min-h-screen">
 <Navbar />
 <div className="pt-32 pb-16">
 {/* 1. CONTAINER STRATIFICATION */}{" "}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-[1440px] mx-auto px-4 py-12 items-start">
 {" "}
 {/* LEFT COLUMN: HERO FEATURED CARD & ARTICLE GRID */}{" "}
 <div className="lg:col-span-8">
 {" "}
 {filteredPosts.length === 0 ? (
 <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center text-neutral-500 shadow-sm">
 <span className="text-badge md: ] text-[#324A61] block mb-3">
 Notice
 </span>{" "}
 No insights found for this category yet. Check back soon!{" "}
 </div>
 ) : (
 <>
 {" "}
 {/* PART A: THE FEATURED HERO ARTICLE PANEL */}{" "}
 {featuredPost && (
 <Link href={`/blog/${featuredPost.slug}`} className="block">
 <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white border border-slate-100 rounded-2xl overflow-hidden mb-12 hover:shadow-md transition-all group">
 <div className="md:col-span-7">
 <img loading="lazy" decoding="async"
 src={featuredPost.image}
 alt={featuredPost.title}
 className="h-[300px] md:h-[400px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
 />
 </div>
 <div className="md:col-span-5 p-6 flex flex-col justify-center">
 <span className="text-badge md: ] text-[#324A61] block mb-3">
 {" "}
 FEATURED INSIGHT | {featuredPost.category}{" "}
 </span>
 <h2 className="text-section line-clamp-3 mb-3 group-hover:text-[#324A61] transition-colors block text-2xl md:text-3xl text-neutral-900">
 {" "}
 {featuredPost.title}{" "}
 </h2>
 <p className="mb-4 line-clamp-3 text-neutral-600 leading-relaxed font-normal text-base md:text-base">
 {" "}
 {featuredPost.snippet}{" "}
 </p>
 <span className="text-neutral-500 text-sm font-semibold mt-2 block">
 {" "}
 {featuredPost.date} • By {featuredPost.author}{" "}
 </span>
 <span className="text-badge hover:text-[#324A61] mt-4 flex items-center gap-1.5 transition-colors md: ] text-[#324A61] block mb-3">
 {" "}
 READ FULL ARTICLE <ArrowRight size={14} />
 </span>
 </div>
 </div>
 </Link>
 )}{" "}
 {/* PART B: RE-DESIGNED SECONDARY POSTS ROW */}{" "}
 {secondaryPosts.length > 0 && (
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {" "}
 {secondaryPosts.map((post) => (
 <Link
 key={post.slug}
 href={`/blog/${post.slug}`}
 className="group"
 >
 <div className="bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-md transition-all h-full flex flex-col">
 <img loading="lazy" decoding="async"
 src={post.image}
 alt={post.title}
 className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-105"
 />
 <div className="p-6 flex flex-col flex-grow">
 <span className="text-badge md: ] text-[#324A61] block mb-3">
 {" "}
 {post.category}{" "}
 </span>
 <h3 className="text-card mb-3 group-hover:text-[#324A61] transition-colors block text-base md:text-base lg:text-lg text-neutral-900">
 {" "}
 {post.title}{" "}
 </h3>
 <div className="mt-auto">
 <span className="text-neutral-500 text-xs font-semibold block">
 {" "}
 {post.date} • {post.author}{" "}
 </span>
 </div>
 </div>
 </div>
 </Link>
 ))}{" "}
 </div>
 )}{" "}
 </>
 )}{" "}
 </div>{" "}
 {/* RIGHT COLUMN: THE VISUAL FILLER SIDEBAR */}{" "}
 <div className="lg:col-span-4 lg:sticky lg:top-24">
 {" "}
 {/* NODE 1: MINIMALIST FILTER & CATEGORIES ELEMENT */}{" "}
 <div className="bg-white border border-slate-100 rounded-xl p-6 mb-6 shadow-sm">
 <h4 className="text-card mb-4 border-b pb-2 border-slate-100 text-base md:text-base lg:text-lg text-neutral-900">
 {" "}
 EXPLORE PILLARS{" "}
 </h4>
 <div className="flex flex-wrap gap-2">
 {" "}
 {CATEGORIES.map((cat) => (
 <button
 key={cat}
 onClick={() => setActiveCategory(cat)}
 className={`px-4 py-3 border transition-all duration-200 ${activeCategory === cat ? "bg-[#324A61] text-white border-[#273a4d] font-bold text-sm rounded-xl" : "bg-slate-50 text-neutral-500 border-slate-100 text-sm font-bold rounded-xl hover:bg-slate-100 hover:text-neutral-900"}`}
 >
 {" "}
 {cat}{" "}
 </button>
 ))}{" "}
 </div>
 </div>{" "}
 {/* NODE 2: TRENDING STRUCTURAL INSIGHTS */}{" "}
 <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
 <h4 className="text-card mb-4 border-b pb-2 border-slate-100 text-base md:text-base lg:text-lg text-neutral-900">
 {" "}
 TRENDING INSIGHTS{" "}
 </h4>
 <div className="flex flex-col space-y-4">
 <Link href="#" className="group">
 <span className="text-neutral-500 text-xs font-bold block mb-0.5">
 01
 </span>
 <h5 className="text-card group-hover:text-[#324A61] line-clamp-2 transition-colors block text-base md:text-base lg:text-lg text-neutral-900">
 {" "}
 Acoustic Noise Control Ratings in Institutional
 Frameworks{" "}
 </h5>
 </Link>
 <Link href="#" className="group">
 <span className="text-neutral-500 text-xs font-bold block mb-0.5">
 02
 </span>
 <h5 className="text-card group-hover:text-[#324A61] line-clamp-2 transition-colors block text-base md:text-base lg:text-lg text-neutral-900">
 {" "}
 Optimizing Guest Flow Circulation Matrices for High-End
 Lounges{" "}
 </h5>
 </Link>
 <Link href="#" className="group">
 <span className="text-neutral-500 text-xs font-bold block mb-0.5">
 03
 </span>
 <h5 className="text-card group-hover:text-[#324A61] line-clamp-2 transition-colors block text-base md:text-base lg:text-lg text-neutral-900">
 {" "}
 Bespoke Italian Marble Sourcing and Turnkey Verification
 Protocols{" "}
 </h5>
 </Link>
 </div>
 </div>{" "}
 {/* NODE 3: HIGH-CONVERSION NEWSLETTER BOX */}{" "}
 <div className="bg-[#0f172a] text-white p-6 rounded-xl border border-slate-800 mt-6 shadow-xl relative overflow-hidden">
 {" "}
 {/* Subtle background glow effect */}{" "}
 <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#0f172a]/10 rounded-full blur-2xl"></div>
 <div className="relative z-10">
 <span className="text-badge md: ] text-[#324A61] block mb-3">
 {" "}
 VoometDesign BLUEPRINTS{" "}
 </span>
 <h4 className="text-card mb-3 text-base md:text-base lg:text-lg text-white">
 {" "}
 SUBSCRIBE TO DESIGN INTELLIGENCE{" "}
 </h4>
 <p className="mb-6 text-slate-300 leading-relaxed font-normal text-base md:text-base">
 {" "}
 Get monthly updates on commercial space optimization
 blueprints, factory material trends, and raw BOQ estimation
 sheets.{" "}
 </p>
 <form
 onSubmit={(e) => e.preventDefault()}
 className="flex flex-col gap-2"
 >
 <input
 type="email"
 placeholder="name@domain.com"
 required
 className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-sm text-white focus:border-[#324A61] outline-none transition-colors"
 />
 <button
 type="submit"
 className="text-badge w-full bg-[#324A61] text-white py-2.5 rounded hover:bg-[#273a4d] transition-all duration-300 shadow-md"
 >
 {" "}
 JOIN MAGAZINE NETWORK{" "}
 </button>
 </form>
 </div>
 </div>
 </div>
 </div>{" "}
 </div>
 </main>
 );
}
