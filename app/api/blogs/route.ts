import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const getFilePath = () => path.join(process.cwd(), "data", "blogs.json");

export async function GET() {
  try {
    const filePath = getFilePath();
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
    const fileData = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileData);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    const filePath = getFilePath();
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Data file not found" }, { status: 404 });
    }

    const fileData = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileData);

    if (action === "save_post") {
      const { post } = body;
      if (!post || !post.title || !post.category) {
        return NextResponse.json({ error: "Missing required post fields" }, { status: 400 });
      }

      // Auto-generate slug if not present
      if (!post.slug) {
        post.slug = post.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
      }

      // Calculate read time if not provided
      if (!post.readTime) {
        const wordCount = post.content ? post.content.join(" ").split(/\s+/).length : 0;
        const wpm = 200;
        const minutes = Math.max(1, Math.ceil(wordCount / wpm));
        post.readTime = `${minutes} min read`;
      }

      // Set date if not provided
      if (!post.date) {
        post.date = new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }

      const existingIndex = data.posts.findIndex((p: any) => p.slug === post.slug);

      if (existingIndex > -1) {
        // Update existing post
        // Retain image if new post doesn't upload one and it had one previously
        if (!post.image && data.posts[existingIndex].image) {
          post.image = data.posts[existingIndex].image;
        }
        data.posts[existingIndex] = { ...data.posts[existingIndex], ...post };
      } else {
        // Add new post
        data.posts.unshift(post); // Add to beginning of array so it shows first
      }

      try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
      } catch (writeErr: any) {
        // Handle read-only file systems (like Vercel production)
        return NextResponse.json({
          success: true,
          post,
          warning: "Data saved in-memory/temp only. " + writeErr.message,
        });
      }

      return NextResponse.json({ success: true, post });
    }

    if (action === "delete_post") {
      const { slug } = body;
      if (!slug) {
        return NextResponse.json({ error: "Missing slug for deletion" }, { status: 400 });
      }

      const newPosts = data.posts.filter((p: any) => p.slug !== slug);
      data.posts = newPosts;

      try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
      } catch (writeErr: any) {
        return NextResponse.json({
          success: true,
          warning: "Data deleted in-memory/temp only. " + writeErr.message,
        });
      }

      return NextResponse.json({ success: true });
    }

    if (action === "save_categories") {
      const { categories } = body;
      if (!Array.isArray(categories)) {
        return NextResponse.json({ error: "Categories must be an array" }, { status: 400 });
      }

      data.categories = categories;

      try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
      } catch (writeErr: any) {
        return NextResponse.json({
          success: true,
          categories,
          warning: "Categories saved in-memory/temp only. " + writeErr.message,
        });
      }

      return NextResponse.json({ success: true, categories });
    }

    if (action === "save_testimonial") {
      const { testimonial } = body;
      if (!testimonial || !testimonial.quote || !testimonial.name || testimonial.stars === undefined) {
        return NextResponse.json({ error: "Missing required testimonial fields" }, { status: 400 });
      }

      if (!data.testimonials) {
        data.testimonials = [];
      }

      // If no ID, generate a unique one
      if (!testimonial.id) {
        testimonial.id = `review-${Date.now()}`;
      }

      const existingIndex = data.testimonials.findIndex((t: any) => t.id === testimonial.id);

      if (existingIndex > -1) {
        data.testimonials[existingIndex] = { ...data.testimonials[existingIndex], ...testimonial };
      } else {
        data.testimonials.unshift(testimonial); // Add to the top of list
      }

      try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
      } catch (writeErr: any) {
        return NextResponse.json({
          success: true,
          testimonial,
          warning: "Testimonial saved in-memory/temp only. " + writeErr.message,
        });
      }

      return NextResponse.json({ success: true, testimonial });
    }

    if (action === "delete_testimonial") {
      const { id } = body;
      if (!id) {
        return NextResponse.json({ error: "Missing testimonial ID" }, { status: 400 });
      }

      if (!data.testimonials) {
        data.testimonials = [];
      }

      data.testimonials = data.testimonials.filter((t: any) => t.id !== id);

      try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
      } catch (writeErr: any) {
        return NextResponse.json({
          success: true,
          warning: "Testimonial deleted in-memory/temp only. " + writeErr.message,
        });
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("API write error:", error);
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
