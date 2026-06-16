"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import blogsData from "@/data/blogs.json";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
};

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
        active
          ? "bg-gold-500 text-text-on-gold shadow-sm"
          : "border border-gold-400/20 text-text-secondary hover:border-gold-400/40 hover:text-text-primary"
      }`}
    >
      {label}
    </button>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  const categoryColors: Record<string, string> = {
    Astrology: "bg-gold-500",
    Numerology: "bg-copper-400",
    Vastu: "bg-success",
    "Lal Kitab": "bg-accent",
    Remedies: "bg-saffron-400",
    Spirituality: "bg-info",
  };

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-card border border-gold-400/10 rounded-card overflow-hidden shadow-sm hover:shadow-md hover:border-gold-400/25 transition-all duration-300 animate-fade-in"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-bg-surface border-b border-gold-400/5">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-gold-100/60 via-bg-surface to-gold-200/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-6">
                <span className="font-display text-lg font-bold text-gold-600 opacity-40 group-hover:opacity-60 transition-opacity">
                  {post.category}
                </span>
              </div>
            </div>
          </>
        )}
        {/* Category Badge */}
        <span
          className={`absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white z-10 ${
            categoryColors[post.category] || "bg-gold-500"
          }`}
        >
          {post.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-base font-bold text-text-primary leading-snug group-hover:text-gold-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2 font-sans text-xs text-text-secondary leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-gold-400/10 pt-3">
          <span className="font-sans text-[11px] text-text-muted">{post.date}</span>
          <span className="font-sans text-[11px] text-gold-500 font-semibold">{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(blogsData.posts);
  const [categories, setCategories] = useState<string[]>(["All", ...blogsData.categories]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    // Client-side synchronization with API and localStorage
    const localBlogs = localStorage.getItem("astro_blogs_local");
    if (localBlogs) {
      try {
        const parsed = JSON.parse(localBlogs);
        if (parsed.posts && parsed.posts.length > 0) {
          setPosts(parsed.posts);
        }
        if (parsed.categories && parsed.categories.length > 0) {
          setCategories(["All", ...parsed.categories]);
        }
      } catch (e) {
        console.error(e);
      }
    }

    const fetchLatest = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (res.ok) {
          const json = await res.json();
          setPosts(json.posts);
          setCategories(["All", ...json.categories]);
          localStorage.setItem("astro_blogs_local", JSON.stringify(json));
        }
      } catch (e) {
        console.error("Failed to fetch latest blogs", e);
      }
    };
    fetchLatest();
  }, []);

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const featured = posts[0];
  const rest = featured
    ? filtered.filter((p) => p.slug !== featured.slug)
    : filtered;

  return (
    <main className="min-h-screen flex flex-col justify-between bg-bg-void selection:bg-gold-100 selection:text-copper-800">
      <Navbar />

      <div className="pt-24 lg:pt-32 flex-1 pb-16">
        {/* Hero Header */}
        <header className="text-center px-sp-5 mb-10">
          <span className="eyebrow text-gold-500 tracking-[0.2em] uppercase text-xs">
            Insights &amp; Wisdom
          </span>
          <h1 className="font-display mt-sp-3 text-[clamp(2rem,5vw,3rem)] font-bold leading-[1.1] tracking-[-0.02em] text-text-primary">
            Blog
          </h1>
          <p className="mt-sp-2 text-sm text-text-secondary max-w-[540px] mx-auto font-sans leading-relaxed">
            Explore articles on Vedic Astrology, Numerology, Vastu Shastra, Lal Kitab remedies, and spiritual wisdom by Astrologer Acharya Soumitra Roy Chowdhury.
          </p>
        </header>

        <div className="mx-auto max-w-content px-sp-5">
          {/* Featured Post */}
          {featured && activeCategory === "All" && (
            <section className="mb-12">
              <Link
                href={`/blog/${featured.slug}`}
                className="group block bg-card border border-gold-400/10 rounded-card overflow-hidden shadow-sm hover:shadow-lg hover:border-gold-400/25 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Featured Image */}
                  <div className="relative h-64 lg:h-full overflow-hidden bg-bg-surface min-h-[260px] border-b lg:border-b-0 lg:border-r border-gold-400/5">
                    {featured.image ? (
                      <img
                        src={featured.image}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-gold-100/60 via-bg-surface to-gold-200/40" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center px-8">
                            <span className="font-display text-3xl font-bold text-gold-600 opacity-30 group-hover:opacity-50 transition-opacity">
                              Featured
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                    <span className="absolute top-4 left-4 rounded-full bg-gold-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-text-on-gold z-10">
                      {featured.category}
                    </span>
                  </div>

                  {/* Featured Content */}
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <span className="eyebrow text-gold-500 text-[11px]">Featured Article</span>
                    <h2 className="font-display text-2xl lg:text-3xl font-bold text-text-primary mt-2 leading-snug group-hover:text-gold-600 transition-colors">
                      {featured.title}
                    </h2>
                    <p className="mt-3 font-sans text-sm text-text-secondary leading-relaxed line-clamp-3">
                      {featured.excerpt}
                    </p>
                    <div className="mt-6 flex items-center gap-4">
                      <span className="font-sans text-xs text-text-muted">{featured.date}</span>
                      <span className="text-gold-400/30">•</span>
                      <span className="font-sans text-xs text-gold-500 font-semibold">
                        {featured.readTime}
                      </span>
                    </div>
                    <div className="mt-6">
                      <span className="inline-flex items-center gap-1 font-sans text-sm font-semibold text-gold-500 group-hover:text-gold-600 transition-colors">
                        Read Article
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="group-hover:translate-x-0.5 transition-transform"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
            {categories.map((cat) => (
              <CategoryPill
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>

          {/* Blog Grid */}
          {(activeCategory === "All" ? rest : filtered).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeCategory === "All" ? rest : filtered).map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-sans text-sm text-text-muted">
                No articles found in this category yet. Check back soon!
              </p>
            </div>
          )}

          {/* Newsletter / CTA */}
          <section className="mt-16 bg-bg-cosmos border border-gold-400/15 rounded-card p-8 lg:p-12 text-center">
            <span className="eyebrow text-gold-500 block">Stay Updated</span>
            <h2 className="font-display text-xl lg:text-2xl font-bold text-text-primary mt-2">
              Get Cosmic Insights Delivered
            </h2>
            <p className="mt-2 font-sans text-sm text-text-secondary max-w-[480px] mx-auto leading-relaxed">
              Stay connected with the latest articles on astrology, remedies, and spiritual guidance from Astrologer Acharya Soumitra Roy Chowdhury.
            </p>
            <div className="mt-6">
              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.dispatchEvent(new CustomEvent("open-connect-modal"));
                  }
                }}
                className="inline-flex items-center gap-2 rounded-btn bg-gold-500 px-6 py-3 font-sans text-sm font-semibold text-text-on-gold hover:bg-gold-600 transition-colors duration-200 shadow-sm cursor-pointer"
              >
                Connect with Us
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
