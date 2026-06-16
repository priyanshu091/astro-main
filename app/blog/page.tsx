"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
};

const CATEGORIES = ["All", "Astrology", "Numerology", "Vastu", "Lal Kitab", "Remedies", "Spirituality"];

const BLOG_POSTS: BlogPost[] = [
  {
    slug: "understanding-birth-chart",
    title: "Understanding Your Birth Chart: A Complete Beginner's Guide",
    excerpt:
      "Your birth chart is a cosmic blueprint of your life. Learn how planetary positions at the time of your birth shape your personality, relationships, career, and destiny in this comprehensive guide.",
    category: "Astrology",
    image: "/blog/birth-chart.jpg",
    date: "June 12, 2026",
    readTime: "8 min read",
  },
  {
    slug: "saturn-return-explained",
    title: "Saturn Return: Why Ages 28–30 Are Life-Changing",
    excerpt:
      "Saturn return is one of the most significant astrological events. Discover how this 29.5-year cycle brings major life transitions, career shifts, and personal growth.",
    category: "Astrology",
    image: "/blog/saturn-return.jpg",
    date: "June 8, 2026",
    readTime: "6 min read",
  },
  {
    slug: "vastu-tips-for-home",
    title: "10 Essential Vastu Tips for a Harmonious Home",
    excerpt:
      "Transform your living space with these Vastu Shastra principles. From entrance placement to bedroom direction, learn how to invite positive energy into your home.",
    category: "Vastu",
    image: "/blog/vastu-home.jpg",
    date: "June 5, 2026",
    readTime: "7 min read",
  },
  {
    slug: "numerology-life-path",
    title: "Life Path Numbers: Discover Your True Purpose",
    excerpt:
      "Your Life Path Number reveals your deepest motivations and life purpose. Learn how to calculate yours and what each number (1–9, 11, 22, 33) means for your journey.",
    category: "Numerology",
    image: "/blog/life-path.jpg",
    date: "May 30, 2026",
    readTime: "9 min read",
  },
  {
    slug: "lal-kitab-remedies-career",
    title: "Powerful Lal Kitab Remedies for Career Growth",
    excerpt:
      "Struggling with career stagnation? Lal Kitab offers simple yet effective remedies to remove obstacles, attract opportunities, and accelerate professional growth.",
    category: "Lal Kitab",
    image: "/blog/lal-kitab-career.jpg",
    date: "May 25, 2026",
    readTime: "5 min read",
  },
  {
    slug: "mangal-dosha-marriage",
    title: "Mangal Dosha and Marriage: Facts vs Myths",
    excerpt:
      "Mangal Dosha is often feared in marriage discussions. Understand what it truly means, how it affects compatibility, and which remedies actually work — separating ancient wisdom from modern myths.",
    category: "Astrology",
    image: "/blog/mangal-dosha.jpg",
    date: "May 20, 2026",
    readTime: "7 min read",
  },
  {
    slug: "vastu-for-business-success",
    title: "Vastu Shastra for Office & Business Success",
    excerpt:
      "Apply Vastu principles to your workplace for improved productivity, financial growth, and team harmony. Learn ideal desk placement, cabin direction, and entry fixes.",
    category: "Vastu",
    image: "/blog/vastu-office.jpg",
    date: "May 15, 2026",
    readTime: "6 min read",
  },
  {
    slug: "rudraksha-guide",
    title: "The Complete Guide to Rudraksha: Types, Benefits & How to Wear",
    excerpt:
      "Rudraksha beads are sacred tools for spiritual and planetary healing. Learn about different mukhis, their planetary associations, and how to choose the right one for you.",
    category: "Remedies",
    image: "/blog/rudraksha.jpg",
    date: "May 10, 2026",
    readTime: "10 min read",
  },
  {
    slug: "meditation-and-planets",
    title: "How Meditation Aligns Your Energy with Planetary Forces",
    excerpt:
      "Discover the deep connection between meditation practices and planetary influences. Learn specific mantras and techniques to harmonize with beneficial cosmic energies.",
    category: "Spirituality",
    image: "/blog/meditation.jpg",
    date: "May 5, 2026",
    readTime: "8 min read",
  },
  {
    slug: "name-numerology-business",
    title: "How to Choose a Lucky Business Name Using Numerology",
    excerpt:
      "The right business name can attract success and prosperity. Learn step-by-step how numerology can help you select a name that resonates with positive vibrations.",
    category: "Numerology",
    image: "/blog/business-name.jpg",
    date: "April 28, 2026",
    readTime: "6 min read",
  },
  {
    slug: "lal-kitab-remedies-finance",
    title: "Simple Lal Kitab Remedies to Improve Financial Stability",
    excerpt:
      "Facing financial difficulties? These time-tested Lal Kitab remedies can help remove financial obstacles and attract abundance into your life.",
    category: "Lal Kitab",
    image: "/blog/lal-kitab-finance.jpg",
    date: "April 22, 2026",
    readTime: "5 min read",
  },
  {
    slug: "gemstones-planets",
    title: "Gemstones for Each Planet: A Vedic Astrology Guide",
    excerpt:
      "Learn which gemstone strengthens each planet in your birth chart. From Ruby for Sun to Blue Sapphire for Saturn — a complete guide to astrological gemstone therapy.",
    category: "Remedies",
    image: "/blog/gemstones.jpg",
    date: "April 15, 2026",
    readTime: "9 min read",
  },
];

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
      className="group block bg-card border border-gold-400/10 rounded-card overflow-hidden shadow-sm hover:shadow-md hover:border-gold-400/25 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-bg-surface">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-100/60 via-bg-surface to-gold-200/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <span className="font-display text-lg font-bold text-gold-600 opacity-40 group-hover:opacity-60 transition-opacity">
              {post.category}
            </span>
          </div>
        </div>
        {/* Category Badge */}
        <span
          className={`absolute top-3 left-3 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white ${
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
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeCategory);

  const featured = BLOG_POSTS[0];
  const rest = filtered.filter((p) => p.slug !== featured.slug);

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
          <section className="mb-12">
            <Link
              href={`/blog/${featured.slug}`}
              className="group block bg-card border border-gold-400/10 rounded-card overflow-hidden shadow-sm hover:shadow-lg hover:border-gold-400/25 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Featured Image */}
                <div className="relative h-64 lg:h-full overflow-hidden bg-bg-surface">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold-100/60 via-bg-surface to-gold-200/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center px-8">
                      <span className="font-display text-3xl font-bold text-gold-600 opacity-30 group-hover:opacity-50 transition-opacity">
                        Featured
                      </span>
                    </div>
                  </div>
                  <span className="absolute top-4 left-4 rounded-full bg-gold-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-text-on-gold">
                    {featured.category}
                  </span>
                </div>

                {/* Featured Content */}
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <span className="eyebrow text-gold-500 text-[11px]">Featured Article</span>
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-text-primary mt-2 leading-snug group-hover:text-gold-600 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="mt-3 font-sans text-sm text-text-secondary leading-relaxed">
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

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <CategoryPill
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>

          {/* Blog Grid */}
          {rest.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post) => (
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
