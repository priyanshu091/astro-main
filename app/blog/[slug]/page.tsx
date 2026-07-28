import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import clientPromise from "@/lib/mongodb";

type BlogPostData = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  content: string[];
  image?: string;
};

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const client = await clientPromise;
    const db = client.db("astro");
    const postsCollection = db.collection<any>("posts");
    const posts = await postsCollection.find({}, { projection: { _id: 1, slug: 1 } }).toArray();
    
    return posts.map((post) => ({
      slug: post._id || post.slug,
    }));
  } catch (err) {
    console.error("Failed to generate static params for blogs:", err);
    return [];
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post: BlogPostData | null = null;
  // Distinguishes "the database said there is no such post" from "we could not
  // reach the database". These must behave differently: the first is a genuine
  // 404, the second is transient and must NOT return 404, or search engines will
  // deindex real articles during an outage.
  let lookupFailed = false;

  try {
    const client = await clientPromise;
    const db = client.db("astro");
    const postsCollection = db.collection<any>("posts");
    const doc = await postsCollection.findOne({ _id: params.slug });

    if (doc) {
      post = {
        slug: doc._id || doc.slug,
        title: doc.title,
        category: doc.category,
        date: doc.date,
        readTime: doc.readTime,
        content: doc.content || [],
        image: doc.image,
      };
    }
  } catch (err) {
    console.error("Failed to fetch blog post:", err);
    lookupFailed = true;
  }

  // Genuine miss → real 404 status. Previously this rendered a "not found" page
  // with an HTTP 200, so crawlers indexed unlimited non-existent article URLs.
  if (!post && !lookupFailed) {
    notFound();
  }

  if (!post) {
    // Database unreachable: explain the situation without claiming the article
    // does not exist, and without emitting a 404.
    return (
      <main className="min-h-screen flex flex-col justify-between bg-bg-void selection:bg-gold-100 selection:text-copper-800">
        <Navbar />
        <div className="pt-24 lg:pt-32 flex-1 pb-16 text-center px-sp-5">
          <h1 className="font-display text-3xl font-bold text-text-primary">
            Article Temporarily Unavailable
          </h1>
          <p className="mt-4 text-text-secondary font-sans">
            We couldn&apos;t load this article just now. Please try again in a moment.
          </p>
          <Link
            href="/blog"
            className="mt-6 inline-block font-sans text-sm font-semibold text-gold-500 hover:text-gold-600 transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col justify-between bg-bg-void selection:bg-gold-100 selection:text-copper-800">
      <Navbar />

      <article className="pt-24 lg:pt-32 flex-1 pb-16">
        {/* Header */}
        <header className="max-w-[720px] mx-auto px-sp-5 text-center mb-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-gold-500 hover:text-gold-600 transition-colors mb-6"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Blog
          </Link>

          <span className="block eyebrow text-gold-500 tracking-[0.2em] uppercase text-xs">
            {post.category}
          </span>
          <h1 className="font-display mt-sp-3 text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.15] tracking-[-0.02em] text-text-primary">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center justify-center gap-3 font-sans text-xs text-text-muted">
            <span>{post.date}</span>
            <span className="text-gold-400/30">•</span>
            <span className="text-gold-500 font-semibold">{post.readTime}</span>
          </div>
          <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
            <p className="font-sans text-xs text-text-secondary">
              By Astrologer Acharya Soumitra Roy Chowdhury
            </p>
            <div className="inline-flex items-center gap-1 rounded-full border border-gold-400/25 bg-[rgba(184,146,40,0.06)] px-2.5 py-0.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold-400 shrink-0" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-gold-500">Certified Astrologer</span>
            </div>
          </div>
        </header>

        {/* Featured Cover Image */}
        <div className="max-w-[720px] mx-auto px-sp-5 mb-10">
          <div className="relative rounded-card overflow-hidden bg-bg-surface border border-gold-400/10 shadow-sm">
            {post.image ? (
              <>
                <img
                  src={post.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 scale-110"
                />
                <img
                  src={post.image}
                  alt={post.title}
                  className="relative w-full h-auto max-h-[600px] object-contain mx-auto"
                />
              </>
            ) : (
              <div className="relative h-56 lg:h-72 w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-100/60 via-bg-surface to-gold-200/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-2xl font-bold text-gold-600 opacity-25">
                    {post.category}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[720px] mx-auto px-sp-5">
          <div className="space-y-5">
            {post.content.map((paragraph, idx) => (
              <p
                key={idx}
                className="font-sans text-[15px] text-text-secondary leading-[1.8]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Author / CTA */}
          <div className="mt-12 bg-bg-cosmos border border-gold-400/15 rounded-card p-6 lg:p-8">
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-14 h-14 rounded-full bg-gold-400/20 flex items-center justify-center shrink-0">
                <span className="font-display text-xl font-bold text-gold-600">S</span>
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-text-primary">
                  Astrologer Acharya Soumitra Roy Chowdhury
                </h3>
                <div className="mt-1 flex items-center gap-1.5">
                  <div className="inline-flex items-center gap-1 rounded-full border border-gold-400/25 bg-[rgba(184,146,40,0.06)] px-2.5 py-0.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold-400 shrink-0" aria-hidden="true">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span className="font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-gold-500">Certified Astrologer</span>
                  </div>
                </div>
                <p className="font-sans text-xs text-text-secondary mt-1.5 leading-relaxed">
                  Professional Vedic astrologer with over 30 years of consulting experience. Specializing in birth chart analysis, marriage compatibility, career guidance, Vastu Shastra, and Lal Kitab remedies.
                </p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-1 mt-3 font-sans text-xs font-semibold text-gold-500 hover:text-gold-600 transition-colors"
                >
                  Book a Consultation →
                </Link>
                {/* Blog posts do not render FinalCTA, so the note accompanies
                    this author-box booking link. */}
                <p className="mt-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-gold-600">
                  Paid consultation services only
                </p>
              </div>
            </div>
          </div>

          {/* Back to blog */}
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 font-sans text-sm font-semibold text-gold-500 hover:text-gold-600 transition-colors"
            >
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
                <path d="m15 18-6-6 6-6" />
              </svg>
              View All Articles
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
