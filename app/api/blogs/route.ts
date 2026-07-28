import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import clientPromise from "@/lib/mongodb";
import { isAuthenticatedRequest } from "@/lib/auth";

const DB_NAME = "astro";

const getFallbackData = () => {
  try {
    const filePath = path.join(process.cwd(), "data", "blogs.json");
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf8");
      return JSON.parse(fileData);
    }
  } catch (err) {
    console.error("Error reading fallback blogs.json:", err);
  }
  return { posts: [], categories: [], testimonials: [] };
};

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    // Fetch from MongoDB
    const postsCollection = db.collection<any>("posts");
    const testimonialsCollection = db.collection<any>("testimonials");
    const settingsCollection = db.collection<any>("settings");

    let posts = await postsCollection.find({}).sort({ date: -1 }).toArray();
    let testimonials = await testimonialsCollection.find({}).sort({ _id: -1 }).toArray();
    let settingsDoc = await settingsCollection.findOne({ _id: "blog_categories" });
    let categories = settingsDoc ? settingsDoc.categories : [];

    // Seed data if DB is empty
    if (posts.length === 0 && categories.length === 0 && testimonials.length === 0) {
      console.log("Database empty, seeding from local JSON...");
      const fallbackData = getFallbackData();
      
      if (fallbackData.posts && fallbackData.posts.length > 0) {
        // Prepare posts for insertion (remove _id if it exists to let mongo auto-generate, or use slug as _id)
        const postsToInsert = fallbackData.posts.map((p: any) => ({ ...p, _id: p.slug }));
        await postsCollection.insertMany(postsToInsert);
        posts = postsToInsert;
      }
      
      if (fallbackData.testimonials && fallbackData.testimonials.length > 0) {
        const testsToInsert = fallbackData.testimonials.map((t: any) => ({ ...t, _id: t.id }));
        await testimonialsCollection.insertMany(testsToInsert);
        testimonials = testsToInsert;
      }
      
      if (fallbackData.categories && fallbackData.categories.length > 0) {
        await settingsCollection.updateOne(
          { _id: "blog_categories" },
          { $set: { categories: fallbackData.categories } },
          { upsert: true }
        );
        categories = fallbackData.categories;
      }
    }

    // Clean up _id for frontend compatibility
    const formattedPosts = posts.map(p => {
      const { _id, ...rest } = p;
      return { ...rest, slug: _id || rest.slug };
    });
    const formattedTestimonials = testimonials.map(t => {
      const { _id, ...rest } = t;
      return { ...rest, id: _id || rest.id };
    });

    return NextResponse.json({
      posts: formattedPosts,
      categories,
      testimonials: formattedTestimonials,
    });
  } catch (error: any) {
    // Log the real error server-side only. Returning `error.message` to the
    // client previously leaked infrastructure detail (e.g. the database host and
    // port in a connection error).
    console.error("GET /api/blogs failed, serving local fallback:", error);

    // Graceful degradation: the blog can still render from the bundled JSON
    // snapshot when the database is unreachable, matching the fallback approach
    // already used by /api/panchang.
    const fallback = getFallbackData();
    return NextResponse.json({
      posts: fallback.posts ?? [],
      categories: fallback.categories ?? [],
      testimonials: fallback.testimonials ?? [],
      degraded: true,
    });
  }
}

export async function POST(request: Request) {
  // SECURITY: every mutation below (create/update/delete posts, testimonials and
  // settings) requires a valid admin session. Previously this endpoint was
  // completely unauthenticated — anyone who knew the URL could rewrite the
  // site's content. The admin UI's password prompt is only a UI affordance; this
  // server-side check is the actual gate.
  if (!isAuthenticatedRequest(request)) {
    return NextResponse.json(
      { error: "Your session has expired. Please log in again." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { action } = body;

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const postsCollection = db.collection<any>("posts");
    const testimonialsCollection = db.collection<any>("testimonials");
    const settingsCollection = db.collection<any>("settings");

    if (action === "save_post") {
      const { post } = body;
      if (!post || !post.title || !post.category) {
        return NextResponse.json({ error: "Missing required post fields" }, { status: 400 });
      }

      if (!post.slug) {
        post.slug = post.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
      }

      if (!post.readTime) {
        const wordCount = post.content ? post.content.join(" ").split(/\s+/).length : 0;
        const wpm = 200;
        const minutes = Math.max(1, Math.ceil(wordCount / wpm));
        post.readTime = `${minutes} min read`;
      }

      if (!post.date) {
        post.date = new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }

      // Add timestamps for tracking created vs edited
      const now = new Date().toISOString();
      const existingPost = await postsCollection.findOne({ _id: post.slug });
      
      if (existingPost) {
        // Retain image if not provided
        if (!post.image && existingPost.image) {
          post.image = existingPost.image;
        }
        post.updatedAt = now;
        // Keep original creation time if it exists, otherwise fall back to now
        post.createdAt = existingPost.createdAt || now;
      } else {
        post.createdAt = now;
        post.updatedAt = now;
      }

      // Upsert
      await postsCollection.updateOne(
        { _id: post.slug },
        { $set: post },
        { upsert: true }
      );

      return NextResponse.json({ success: true, post });
    }

    if (action === "delete_post") {
      const { slug } = body;
      if (!slug) {
        return NextResponse.json({ error: "Missing slug for deletion" }, { status: 400 });
      }

      await postsCollection.deleteOne({ _id: slug });
      return NextResponse.json({ success: true });
    }

    if (action === "save_categories") {
      const { categories } = body;
      if (!Array.isArray(categories)) {
        return NextResponse.json({ error: "Categories must be an array" }, { status: 400 });
      }

      await settingsCollection.updateOne(
        { _id: "blog_categories" },
        { $set: { categories } },
        { upsert: true }
      );

      return NextResponse.json({ success: true, categories });
    }

    if (action === "save_testimonial") {
      const { testimonial } = body;
      if (!testimonial || !testimonial.quote || !testimonial.name || testimonial.stars === undefined) {
        return NextResponse.json({ error: "Missing required testimonial fields" }, { status: 400 });
      }

      if (!testimonial.id) {
        testimonial.id = `review-${Date.now()}`;
      }

      await testimonialsCollection.updateOne(
        { _id: testimonial.id },
        { $set: testimonial },
        { upsert: true }
      );

      return NextResponse.json({ success: true, testimonial });
    }

    if (action === "delete_testimonial") {
      const { id } = body;
      if (!id) {
        return NextResponse.json({ error: "Missing testimonial ID" }, { status: 400 });
      }

      await testimonialsCollection.deleteOne({ _id: id });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    // Detail stays in the server log; the client gets a generic message.
    console.error("API write error:", error);
    return NextResponse.json(
      { error: "Could not save changes. Please try again." },
      { status: 500 }
    );
  }
}
