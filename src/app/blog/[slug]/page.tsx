// @crafted-by: Sahil Sheikh | IG: @sahil_sheikh78 | Unauthorized use prohibited
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allBlogPosts } from "@/data/blogData";
import { ArticleSchema, BreadcrumbSchema, FAQSchema } from "@/components/seo/JsonLd";
interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allBlogPosts.map((post) => ({ slug: post.slug }));
}

function processInline(text: string): string {
  return text
    // Bold: **text**
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-neutral-900">$1</strong>')
    // Markdown links: [text](url)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, linkText, url) => {
      const isExternal = url.startsWith("http://") || url.startsWith("https://");
      const externalAttrs = isExternal ? ' target="_blank" rel="noopener"' : "";
      return `<a href="${url}"${externalAttrs} class="text-[#324A61] font-semibold underline underline-offset-4 hover:text-neutral-900 transition-colors">${linkText}</a>`;
    });
}

function formatMarkdown(content: string): string {
  const lines = content.trim().split("\n");
  const htmlChunks: string[] = [];
  let inUl = false;
  let inOl = false;

  const closeLists = () => {
    if (inUl) {
      htmlChunks.push("</ul>");
      inUl = false;
    }
    if (inOl) {
      htmlChunks.push("</ol>");
      inOl = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      closeLists();
      continue;
    }

    if (trimmed.startsWith("### ")) {
      closeLists();
      htmlChunks.push(`<h3 class="text-xl md:text-2xl font-bold text-neutral-900 mt-8 mb-3">${processInline(trimmed.slice(4))}</h3>`);
      continue;
    }
    if (trimmed.startsWith("## ")) {
      closeLists();
      htmlChunks.push(`<h2 class="text-2xl md:text-3xl font-bold text-neutral-900 mt-10 mb-4">${processInline(trimmed.slice(3))}</h2>`);
      continue;
    }

    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      if (inOl) {
        htmlChunks.push("</ol>");
        inOl = false;
      }
      if (!inUl) {
        htmlChunks.push('<ul class="my-4 pl-6 space-y-2 list-disc text-slate-700">');
        inUl = true;
      }
      htmlChunks.push(`<li class="leading-relaxed">${processInline(trimmed.slice(2))}</li>`);
      continue;
    }

    const olMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (olMatch) {
      if (inUl) {
        htmlChunks.push("</ul>");
        inUl = false;
      }
      if (!inOl) {
        htmlChunks.push('<ol class="my-4 pl-6 space-y-2 list-decimal text-slate-700">');
        inOl = true;
      }
      htmlChunks.push(`<li class="leading-relaxed">${processInline(olMatch[2])}</li>`);
      continue;
    }

    closeLists();
    htmlChunks.push(`<p class="mb-5 text-slate-700 leading-relaxed font-normal text-base md:text-lg">${processInline(trimmed)}</p>`);
  }

  closeLists();
  return htmlChunks.join("\n");
}

export async function generateMetadata({ params }: PageProps): Promise<import("next").Metadata> {
  const resolvedParams = await params;
  const post = allBlogPosts.find((p) => p.slug === resolvedParams.slug);
  if (!post) return { title: "Post Not Found | VoometDesign" };

  const metaTitle = post.metaTitle || `${post.title} | VoometDesign Bangalore`;
  const metaDescription = post.metaDescription || `${post.title} — ${post.category}. Expert interior design, architecture, and execution insights from VoometDesign Bangalore.`;
  const postUrl = post.canonical || `https://voometdesign.com/blog/${post.slug}`;
  const postImage = post.ogImage || post.image;
  const fullImageUrl = postImage.startsWith("http") ? postImage : `https://voometdesign.com${postImage}`;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      url: postUrl,
      type: "article",
      publishedTime: post.datePublished || post.date,
      modifiedTime: post.dateModified || post.datePublished || post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [fullImageUrl],
    },
    alternates: {
      canonical: postUrl,
    },
  };
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
  const sameCategoryPosts = allBlogPosts.filter((p) => p.category === category && p.slug !== post.slug);
  const otherPosts = allBlogPosts.filter((p) => p.slug !== post.slug);
  const relatedPosts = (sameCategoryPosts.length > 0 ? sameCategoryPosts : otherPosts).slice(0, 2);

  // Markdown Parser formatting to HTML
  const formattedContent = formatMarkdown(content);

  return (
    <main className="bg-slate-50 min-h-screen">
      <BreadcrumbSchema 
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: title, url: `/blog/${post.slug}` }
        ]}
      />
      <ArticleSchema 
        title={title}
        description={post.metaDescription || `${title} — ${category} insights from VoometDesign Bangalore.`}
        url={`/blog/${post.slug}`}
        image={post.ogImage || image}
        datePublished={post.datePublished || date}
        dateModified={post.dateModified || post.datePublished || date}
        authorName={author}
        articleSection={category}
        keywords={typeof keywords === "string" ? keywords.split(",").map((k) => k.trim()) : keywords}
      />
      {post.faqs && post.faqs.length > 0 && (
        <FAQSchema faqs={post.faqs} />
      )}

 <article className="pb-24 pt-32">
 {/* HEADER AREA - Packed Height */}
 <div className="w-full bg-[#0f172a] text-white py-6 md:py-8 mb-6 border-b border-slate-900 shadow-sm relative z-10 px-4">
 <div className="site-container flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div className="md:max-w-4xl">
 <div className="flex items-center gap-2 text-[#324A61] text-caption mb-2">
 <Link
 href="/blog"
 className="hover:text-white transition-colors"
 >
 JOURNAL
 </Link>
 <span>/</span>
 <span>{category}</span>
 </div>
 <h1 className="text-hero mb-3 text-center md:text-left text-h1 text-white">
 {title}
 </h1>
 </div>
 <div className="flex items-center justify-center md:justify-start gap-4 text-[#324A61] text-caption shrink-0">
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
 className="bg-slate-50 border border-slate-200 text-slate-700 font-bold text-caption px-2 py-1 rounded lowercase hover:border-slate-300 transition-colors cursor-default"
 >
 #{kw.trim().replace(/\s+/g, "-")}
 </span>
 ))}
 </div>
 {/* TEXT CONTENT PROSE */}
 <div
 className="prose max-w-full text-body leading-relaxed text-slate-700 prose-headings:text-neutral-900 prose-headings: prose-headings: prose-headings: prose-h2:text-h2 prose-h2:mt-8 prose-h2:mb-3 prose-h3:text-h3 prose-h3:mt-6 prose-h3:mb-2 prose-p:mb-4 prose-p:mt-0 space-y-0"
 dangerouslySetInnerHTML={{ __html: formattedContent }}
 />
 {/* PORTAL RETURNEE BUTTON */}
 <div className="border-t border-slate-100 mt-10 pt-6 flex justify-between items-center">
 <Link
 href="/blog"
 className="inline-flex items-center text-neutral-900 text-button hover:text-[#324A61] transition-colors"
 >
 ➔ RETURN TO JOURNAL INDEX
 </Link>
 <span className="text-neutral-500 text-small font-semibold">
 VoometDesign Space Intelligence Matrix
 </span>
 </div>
 </div>
 {/* Right Utility Track (Sticky Sidebar Filler) */}
 <div className="md:col-span-4 md:sticky md:top-24 flex flex-col gap-6">
 {/* NODE A: FIXED FILE IMAGE BANNER */}
 <div className="w-full h-auto aspect-video rounded-xl shadow-lg border border-white overflow-hidden bg-slate-900">
 <img loading="lazy" decoding="async"
 src={post.ogImage || image}
 alt={title}
 className="w-full h-full object-cover rounded-xl shadow-lg border border-white"
 />
 </div>
 {/* NODE B: DYNAMIC RELATED ARTICLES LINKS LIST */}
 {relatedPosts.length > 0 && (
 <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
 <h4 className="text-card mb-4 border-b pb-2 border-slate-100 text-h4 text-neutral-900">
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
 <h5 className="text-card group-hover:text-[#324A61] transition-colors block text-h5 text-neutral-900">
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
 VoometDesign BLUEPRINTS{" "}
 </span>
 <h4 className="text-card mb-2 text-h4 text-white">
 {" "}
 SUBSCRIBE TO DESIGN INTELLIGENCE{" "}
 </h4>
 <p className="text-body mb-4 text-neutral-500 leading-relaxed font-normal">
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
 className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-small text-white placeholder-slate-500 focus:border-[#324A61] outline-none transition-colors"
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
