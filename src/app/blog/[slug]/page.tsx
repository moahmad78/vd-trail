// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allBlogPosts } from "@/data/blogData";
interface PageProps {
 params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
 return allBlogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostDetailedPage({ params }: PageProps) {
 const resolvedParams = await params;
 const post = allBlogPosts.find((p) => p.slug === resolvedParams.slug);
 if (!post) {
 notFound();
 }

 // 1. DATA BINDING - Destructuring
 const { title, category, date, author, image, content, keywords } = post;

 // 3. NODE B: DYNAMIC RELATED ARTICLES
 const relatedPosts = allBlogPosts
 .filter((p) => p.category === category && p.slug !== post.slug)
 .slice(0, 2);

 // Markdown Parser formatting to HTML
 const formattedContent = content
 .trim()
 .replace(/^### (.*$)/gim, "<h3>$1</h3>")
 .replace(/^## (.*$)/gim, "<h2>$1</h2>")
 .replace(/\n\n/g, "<br /><br />")
 .replace(/\n/g, "<br />");

 return (
 <main className="bg-slate-50 min-h-screen">

 <article className="pb-24 pt-32">
 {/* HEADER AREA - Packed Height */}
 <div className="w-full bg-[#0f172a] text-white py-6 md:py-8 mb-6 border-b border-slate-900 shadow-sm relative z-10 px-4">
 <div className="site-container flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div className="md:max-w-4xl">
 <div className="flex items-center gap-2 text-[#324A61] text-xs mb-2">
 <Link
 href="/blog"
 className="hover:text-white transition-colors"
 >
 JOURNAL
 </Link>
 <span>/</span>
 <span>{category}</span>
 </div>
 <h1 className="text-hero mb-3 text-center md:text-left text-3xl md:text-5xl lg:text-6xl text-white">
 {title}
 </h1>
 </div>
 <div className="flex items-center justify-center md:justify-start gap-4 text-[#324A61] text-xs shrink-0">
 <span>{date}</span>
 <span className="w-1 h-1 bg-white rounded-full" />
 <span>By {author}</span>
 </div>
 </div>
 </div>

 {/* OPTIMIZED BODY GRID LAYOUT */}
 <div className="site-container px-4">
 <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start py-8">
 {/* Left Dynamic Track (Scrolling Content) */}
 <div className="md:col-span-8 bg-white border border-slate-100 rounded-2xl p-6 md:p-10 shadow-sm">
 {/* SEARCH ENGINE META SCOPE INDICATORS */}
 <div className="flex flex-wrap items-center gap-2 mb-8 pb-6 border-b border-slate-100">
 <span className="text-badge mr-1 md: ] text-[#324A61] block mb-3">
 METRIC TAGS:
 </span>
 {keywords.split(",").map((kw, idx) => (
 <span
 key={idx}
 className="bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs px-2 py-1 rounded lowercase hover:border-slate-300 transition-colors cursor-default"
 >
 #{kw.trim().replace(/\s+/g, "-")}
 </span>
 ))}
 </div>
 {/* TEXT CONTENT PROSE */}
 <div
 className="prose max-w-full text-base md:text-base leading-relaxed text-slate-700 prose-headings:text-neutral-900 prose-headings: prose-headings: prose-headings: prose-h2:text-lg prose-h2:md:text-xl prose-h2:mt-8 prose-h2:mb-3 prose-h3:text-base prose-h3:md:text-base prose-h3:mt-6 prose-h3:mb-2 prose-p:mb-4 prose-p:mt-0 space-y-0"
 dangerouslySetInnerHTML={{ __html: formattedContent }}
 />
 {/* PORTAL RETURNEE BUTTON */}
 <div className="border-t border-slate-100 mt-10 pt-6 flex justify-between items-center">
 <Link
 href="/blog"
 className="inline-flex items-center text-neutral-900 text-xs hover:text-[#324A61] transition-colors"
 >
 ➔ RETURN TO JOURNAL INDEX
 </Link>
 <span className="text-neutral-500 text-xs md:text-sm font-semibold">
 VoometDesign Space Intelligence Matrix
 </span>
 </div>
 </div>
 {/* Right Utility Track (Sticky Sidebar Filler) */}
 <div className="md:col-span-4 md:sticky md:top-24 flex flex-col gap-6">
 {/* NODE A: FIXED FILE IMAGE BANNER */}
 <div className="w-full h-auto aspect-video rounded-xl shadow-lg border border-white overflow-hidden bg-slate-900">
 <img loading="lazy" decoding="async"
 src={image}
 alt={title}
 className="w-full h-full object-cover rounded-xl shadow-lg border border-white"
 />
 </div>
 {/* NODE B: DYNAMIC RELATED ARTICLES LINKS LIST */}
 {relatedPosts.length > 0 && (
 <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
 <h4 className="text-card mb-4 border-b pb-2 border-slate-100 text-base md:text-base lg:text-lg text-neutral-900">
 RELATED {category.toUpperCase()} INSIGHTS
 </h4>
 <div className="flex flex-col gap-5">
 {relatedPosts.map((relPost) => (
 <Link
 key={relPost.slug}
 href={`/blog/${relPost.slug}`}
 className="group"
 >
 <span className="text-badge md: ] text-[#324A61] block mb-3">
 {" "}
 {relPost.date}{" "}
 </span>
 <h5 className="text-card group-hover:text-[#324A61] transition-colors block text-base md:text-base lg:text-lg text-neutral-900">
 {" "}
 {relPost.title}{" "}
 </h5>
 </Link>
 ))}
 </div>
 </div>
 )}
 {/* NODE C: NEWSLETTER CTA BOX */}
 <div className="bg-[#0f172a] text-white p-6 rounded-xl border border-slate-800 shadow-xl relative overflow-hidden">
 <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#1e2d3b]/20 rounded-full blur-2xl"></div>
 <div className="relative z-10">
 <span className="text-badge md: ] text-[#324A61] block mb-3">
 {" "}
 VOOMET BLUEPRINTS{" "}
 </span>
 <h4 className="text-card mb-2 text-base md:text-base lg:text-lg text-white">
 {" "}
 SUBSCRIBE TO DESIGN INTELLIGENCE{" "}
 </h4>
 <p className="text-xs mb-4 text-neutral-500 leading-relaxed font-normal text-base md:text-base">
 {" "}
 Get monthly updates on commercial space optimization
 blueprints, factory material trends, and raw BOQ estimation
 sheets.{" "}
 </p>
 <form action="#" className="flex flex-col gap-2">
 <input
 type="email"
 placeholder="name@domain.com"
 required
 className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-[#324A61] outline-none transition-colors"
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
 </div>
 </div>
 </article>
 </main>
 );
}
