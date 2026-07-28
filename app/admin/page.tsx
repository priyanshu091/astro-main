"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { IconStarFilled } from "@/components/ui/Icon";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  content: string[];
  createdAt?: string;
  updatedAt?: string;
};

type Review = {
  id?: string;
  quote: string;
  name: string;
  detail: string;
  stars: number;
};

type BlogsData = {
  categories: string[];
  posts: BlogPost[];
  testimonials: Review[];
};

export default function AdminPage() {
  // Authentication
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Data State
  const [data, setData] = useState<BlogsData>({ categories: [], posts: [], testimonials: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [operationError, setOperationError] = useState("");
  const [operationSuccess, setOperationSuccess] = useState("");
  const [warningMessage, setWarningMessage] = useState("");

  // Dashboard Tabs & Search
  const [activeTab, setActiveTab] = useState<"posts" | "categories" | "testimonials">("posts");
  const [searchQuery, setSearchQuery] = useState("");

  // Blog Editor Form
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [formContent, setFormContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageSizeStats, setImageSizeStats] = useState<{
    originalSize: string;
    compressedSize: string;
    reduction: string;
  } | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  // Testimonial Editor Form
  const [isEditingTestimonial, setIsEditingTestimonial] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Review> | null>(null);

  // Category Editor Form
  const [newCategory, setNewCategory] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check existing session with the server. The session lives in an httpOnly
  // cookie that JavaScript cannot read, so we ask the server whether it is still
  // valid rather than trusting anything stored in the browser.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/session", { cache: "no-store" });
        const json = await res.json();
        if (!cancelled && json.authenticated) setIsAuthenticated(true);
      } catch {
        /* not logged in — leave the login form showing */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Fetch blogs data
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/blogs");
        if (!res.ok) {
          throw new Error("Failed to load blog data from API");
        }
        const json = await res.json();

        // Defensive initialization
        if (!json.posts) json.posts = [];
        if (!json.categories) json.categories = [];
        if (!json.testimonials) json.testimonials = [];

        setData(json);

        // Merge client-side local edits if there are any
        const localBlogs = localStorage.getItem("astro_blogs_local");
        if (localBlogs) {
          const parsed = JSON.parse(localBlogs) as BlogsData;
          if (!parsed.posts) parsed.posts = [];
          if (!parsed.categories) parsed.categories = [];
          if (!parsed.testimonials) parsed.testimonials = [];
          setData(parsed);
        }
      } catch (err: any) {
        setOperationError("Could not retrieve database: " + err.message);
        // Fallback to local storage only if file fetch failed
        const localBlogs = localStorage.getItem("astro_blogs_local");
        if (localBlogs) {
          setData(JSON.parse(localBlogs));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [isAuthenticated]);

  // Handle Login
  //
  // SECURITY: the password is verified on the server. It is never compared in
  // client code, so it is never present in the browser bundle. (This previously
  // did `password === "<literal>"`, which shipped the real password to every
  // visitor who opened the page source.)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setIsAuthenticated(true);
        setPassword("");
      } else {
        const json = await res.json().catch(() => ({}));
        setLoginError(json.error || "Invalid password. Please try again.");
      }
    } catch {
      setLoginError("Could not reach the server. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // If any operation reports an expired session, drop back to the login screen
  // so the admin is not left clicking buttons that will keep failing.
  useEffect(() => {
    if (operationError && operationError.includes("session has expired")) {
      setIsAuthenticated(false);
    }
  }, [operationError]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/session", { method: "DELETE" });
    } catch {
      /* clearing local state below regardless */
    }
    setIsAuthenticated(false);
  };

  // Handle Image Upload Selection
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Constraint: Max size 5MB (Cloudinary will compress and convert to WebP)
    if (file.size > 5 * 1024 * 1024) {
      setOperationError("Upload failed: File size exceeds the maximum limit of 5 MB.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setOperationError("");
    setIsCompressing(true);
    try {
      // Create object URL for local preview immediately
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
      setImageFile(file);

      // Upload to Cloudinary API route
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to upload image");
      }

      // Record size stats
      const origKb = (file.size / 1024).toFixed(1);
      setImageSizeStats({
        originalSize: `${origKb} KB`,
        compressedSize: "Optimized by Cloudinary",
        reduction: "Auto-WebP",
      });

      // Use the Cloudinary secure URL for the post
      setEditingPost((prev) => ({ ...prev, image: result.url }));
    } catch (err: any) {
      setOperationError("Error uploading image: " + err.message);
      setImagePreview(null);
      setImageFile(null);
    } finally {
      setIsCompressing(false);
    }
  };

  // Open Editor for Creating/Editing Post
  const openEditor = (post: BlogPost | null = null) => {
    setOperationError("");
    setOperationSuccess("");
    setImageFile(null);
    setImagePreview(null);
    setImageSizeStats(null);

    if (post) {
      setEditingPost(post);
      setFormContent(post.content.join("\n\n"));
      if (post.image) {
        setImagePreview(post.image);
      }
    } else {
      setEditingPost({
        title: "",
        excerpt: "",
        category: data.categories[0] || "",
        content: [],
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        readTime: "",
      });
      setFormContent("");
    }
    setIsEditing(true);
  };

  const closeEditor = () => {
    setIsEditing(false);
    setEditingPost(null);
    setFormContent("");
    setImageFile(null);
    setImagePreview(null);
    setImageSizeStats(null);
  };

  // Open Editor for Testimonial
  const openTestimonialEditor = (testimonial: Review | null = null) => {
    setOperationError("");
    setOperationSuccess("");

    if (testimonial) {
      setEditingTestimonial(testimonial);
    } else {
      setEditingTestimonial({
        quote: "",
        name: "",
        detail: "",
        stars: 5,
      });
    }
    setIsEditingTestimonial(true);
  };

  const closeTestimonialEditor = () => {
    setIsEditingTestimonial(false);
    setEditingTestimonial(null);
  };

  // Save Blog Post
  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost || !editingPost.title || !editingPost.category || !formContent.trim()) {
      setOperationError("Please fill in all required fields (Title, Category, Content).");
      return;
    }

    const paragraphs = formContent
      .split("\n\n")
      .map((p) => p.trim())
      .filter(Boolean);

    let readTime = editingPost.readTime;
    if (!readTime) {
      const words = paragraphs.join(" ").split(/\s+/).length;
      const wpm = 200;
      const minutes = Math.max(1, Math.ceil(words / wpm));
      readTime = `${minutes} min read`;
    }

    const finalPost: BlogPost = {
      slug: editingPost.slug || editingPost.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
      title: editingPost.title,
      excerpt: editingPost.excerpt || paragraphs[0]?.substring(0, 150) + "..." || "",
      category: editingPost.category,
      image: editingPost.image || "",
      date: editingPost.date || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      readTime,
      content: paragraphs,
      createdAt: editingPost.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setIsLoading(true);
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save_post",
          post: finalPost,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to save post");
      }

      let updatedPosts = [...data.posts];
      const existingIdx = updatedPosts.findIndex((p) => p.slug === finalPost.slug);

      if (existingIdx > -1) {
        updatedPosts[existingIdx] = finalPost;
      } else {
        updatedPosts.unshift(finalPost);
      }

      const updatedData = { ...data, posts: updatedPosts };
      setData(updatedData);

      localStorage.setItem("astro_blogs_local", JSON.stringify(updatedData));

      if (result.warning) {
        setWarningMessage(result.warning);
      } else {
        setWarningMessage("");
      }

      setOperationSuccess(`Successfully saved article: "${finalPost.title}"`);
      closeEditor();
    } catch (err: any) {
      setOperationError("Error saving post: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete Blog Post
  const handleDeletePost = async (slug: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the post "${title}"?`)) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete_post",
          slug,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to delete post");
      }

      const updatedPosts = data.posts.filter((p) => p.slug !== slug);
      const updatedData = { ...data, posts: updatedPosts };
      setData(updatedData);

      localStorage.setItem("astro_blogs_local", JSON.stringify(updatedData));

      if (result.warning) {
        setWarningMessage(result.warning);
      } else {
        setWarningMessage("");
      }

      setOperationSuccess(`Successfully deleted article: "${title}"`);
    } catch (err: any) {
      setOperationError("Error deleting post: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Save Testimonial
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial || !editingTestimonial.quote || !editingTestimonial.name) {
      setOperationError("Please fill in all required fields (Client Name, Quote).");
      return;
    }

    const finalTestimonial: Review = {
      id: editingTestimonial.id,
      quote: editingTestimonial.quote,
      name: editingTestimonial.name,
      detail: editingTestimonial.detail || "",
      stars: Number(editingTestimonial.stars || 5),
    };

    setIsLoading(true);
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save_testimonial",
          testimonial: finalTestimonial,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to save testimonial");
      }

      // Update UI state
      let updatedTestimonials = [...(data.testimonials || [])];
      const savedTestimonial = result.testimonial || finalTestimonial;
      const existingIdx = updatedTestimonials.findIndex((t) => t.id === savedTestimonial.id);

      if (existingIdx > -1) {
        updatedTestimonials[existingIdx] = savedTestimonial;
      } else {
        updatedTestimonials.unshift(savedTestimonial);
      }

      const updatedData = { ...data, testimonials: updatedTestimonials };
      setData(updatedData);

      localStorage.setItem("astro_blogs_local", JSON.stringify(updatedData));

      if (result.warning) {
        setWarningMessage(result.warning);
      } else {
        setWarningMessage("");
      }

      setOperationSuccess(`Successfully saved testimonial from: "${savedTestimonial.name}"`);
      closeTestimonialEditor();
    } catch (err: any) {
      setOperationError("Error saving testimonial: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete Testimonial
  const handleDeleteTestimonial = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete the testimonial from "${name}"?`)) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "delete_testimonial",
          id,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to delete testimonial");
      }

      const updatedTestimonials = (data.testimonials || []).filter((t) => t.id !== id);
      const updatedData = { ...data, testimonials: updatedTestimonials };
      setData(updatedData);

      localStorage.setItem("astro_blogs_local", JSON.stringify(updatedData));

      if (result.warning) {
        setWarningMessage(result.warning);
      } else {
        setWarningMessage("");
      }

      setOperationSuccess(`Successfully deleted testimonial from: "${name}"`);
    } catch (err: any) {
      setOperationError("Error deleting testimonial: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Save Category
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCategory = newCategory.trim();
    if (!cleanCategory) return;

    if (data.categories.includes(cleanCategory)) {
      setOperationError("Category already exists.");
      return;
    }

    const updatedCategories = [...data.categories, cleanCategory];
    setIsLoading(true);
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save_categories",
          categories: updatedCategories,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to save category");
      }

      const updatedData = { ...data, categories: updatedCategories };
      setData(updatedData);

      localStorage.setItem("astro_blogs_local", JSON.stringify(updatedData));

      setNewCategory("");
      setOperationSuccess(`Category "${cleanCategory}" added successfully.`);
      if (result.warning) {
        setWarningMessage(result.warning);
      } else {
        setWarningMessage("");
      }
    } catch (err: any) {
      setOperationError("Error adding category: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete Category
  const handleDeleteCategory = async (categoryToDelete: string) => {
    const associatedPosts = data.posts.filter((p) => p.category === categoryToDelete);
    if (associatedPosts.length > 0) {
      setOperationError(
        `Cannot delete "${categoryToDelete}". There are currently ${associatedPosts.length} post(s) active in this category. Reassign them first.`
      );
      return;
    }

    if (!confirm(`Are you sure you want to remove the category "${categoryToDelete}"?`)) return;

    const updatedCategories = data.categories.filter((cat) => cat !== categoryToDelete);
    setIsLoading(true);
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save_categories",
          categories: updatedCategories,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to delete category");
      }

      const updatedData = { ...data, categories: updatedCategories };
      setData(updatedData);

      localStorage.setItem("astro_blogs_local", JSON.stringify(updatedData));

      setOperationSuccess(`Category "${categoryToDelete}" deleted successfully.`);
      if (result.warning) {
        setWarningMessage(result.warning);
      } else {
        setWarningMessage("");
      }
    } catch (err: any) {
      setOperationError("Error deleting category: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Download blogs.json Data Backup
  const downloadJSONBackup = () => {
    const fileData = JSON.stringify(data, null, 2);
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "blogs.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Filter and sort posts by search query and date
  const filteredPosts = data.posts
    .filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const timeA = new Date(a.updatedAt || a.createdAt || a.date).getTime();
      const timeB = new Date(b.updatedAt || b.createdAt || b.date).getTime();
      
      if (isNaN(timeA) || isNaN(timeB)) {
        return (b.updatedAt || b.createdAt || b.date).localeCompare(a.updatedAt || a.createdAt || a.date);
      }
      return timeB - timeA;
    });

  // Filter testimonials by search query
  const filteredTestimonials = (data.testimonials || []).filter(
    (review) =>
      review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.quote.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.detail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Unauthenticated UI (Login Gate)
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex flex-col justify-between bg-bg-void selection:bg-gold-100 selection:text-copper-800">
        <Navbar />

        <div className="pt-32 pb-20 flex-1 flex items-center justify-center px-sp-5">
          <div className="w-full max-w-[420px] bg-card border border-gold-400/20 rounded-card p-8 shadow-lg relative overflow-hidden">
            <div className="absolute -top-12 -left-12 w-36 h-36 rounded-full bg-gold-400/10 blur-xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full bg-accent/5 blur-xl pointer-events-none" />

            <div className="text-center mb-6">
              <span className="eyebrow text-gold-500 tracking-[0.2em] uppercase text-xs">Vedic Destiny</span>
              <h1 className="font-display mt-2 text-2xl font-bold text-text-primary">Admin Access Portal</h1>
              <p className="mt-1 font-sans text-xs text-text-muted">Enter administrative password to manage website content</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block font-sans text-xs font-semibold text-text-secondary mb-1">
                  Access Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-input border border-gold-400/30 px-3 py-2.5 font-mono text-sm text-text-primary placeholder-gold-400/40 bg-bg-void focus:outline-none focus:border-gold-500 transition-colors"
                  required
                />
              </div>

              {loginError && (
                <div className="p-3 bg-error/10 border border-error/20 text-error rounded-input font-sans text-xs text-center font-medium">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full rounded-btn bg-gold-500 hover:bg-gold-600 disabled:opacity-60 disabled:cursor-not-allowed text-text-on-gold font-sans font-semibold py-2.5 transition-colors shadow-sm cursor-pointer text-center text-sm"
              >
                {isLoggingIn ? "Verifying…" : "Access Dashboard"}
              </button>
            </form>
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  // Dashboard Loader
  if (isLoading && data.categories.length === 0) {
    return (
      <main className="min-h-screen flex flex-col justify-between bg-bg-void">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-20">
          <div className="w-12 h-12 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 font-sans text-sm text-gold-600 animate-pulse font-semibold">Connecting to database...</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col justify-between bg-bg-void selection:bg-gold-100 selection:text-copper-800">
      <Navbar />

      <div className="pt-24 lg:pt-32 flex-1 pb-16">
        <div className="mx-auto max-w-content px-sp-5">
          {/* Header Action Bar */}
          <header className="flex flex-col md:flex-row md:items-center justify-between border-b border-gold-400/20 pb-6 mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="eyebrow text-gold-500 tracking-[0.2em] uppercase text-[10px]">Dashboard</span>
                <span className="bg-gold-400/20 text-gold-600 font-mono text-[9px] px-1.5 py-0.5 rounded uppercase font-bold">Authorized</span>
              </div>
              <h1 className="font-display text-2xl lg:text-3xl font-bold text-text-primary mt-1">
                Portal Management
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={downloadJSONBackup}
                className="inline-flex items-center gap-1.5 rounded-btn border border-gold-400/40 text-text-secondary hover:bg-gold-400/10 px-4 py-2 font-sans text-xs font-semibold cursor-pointer transition-colors shadow-sm"
                title="Download local JSON copy"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Export blogs.json
              </button>

              {activeTab === "posts" && !isEditing && (
                <button
                  onClick={() => openEditor(null)}
                  className="inline-flex items-center gap-1.5 rounded-btn bg-gold-500 hover:bg-gold-600 text-text-on-gold px-4 py-2 font-sans text-xs font-semibold cursor-pointer transition-colors shadow-sm"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  New Post
                </button>
              )}

              {activeTab === "testimonials" && !isEditingTestimonial && (
                <button
                  onClick={() => openTestimonialEditor(null)}
                  className="inline-flex items-center gap-1.5 rounded-btn bg-gold-500 hover:bg-gold-600 text-text-on-gold px-4 py-2 font-sans text-xs font-semibold cursor-pointer transition-colors shadow-sm"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  New Testimonial
                </button>
              )}

              <button
                onClick={handleLogout}
                className="rounded-btn border border-error/30 text-error hover:bg-error/5 px-3 py-2 font-sans text-xs font-semibold cursor-pointer transition-colors"
              >
                Exit Portal
              </button>
            </div>
          </header>

          {/* Vercel serverless alert warning if present */}
          {warningMessage && (
            <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 text-amber-800 rounded-card font-sans text-xs flex gap-3">
              <span className="text-base">⚠️</span>
              <div>
                <strong className="font-semibold block mb-0.5">Deployment Warning (Vercel Edge Host)</strong>
                {warningMessage}
              </div>
            </div>
          )}

          {/* Success / Error notification */}
          {operationError && (
            <div className="mb-6 p-3 bg-error/10 border border-error/20 text-error rounded-card font-sans text-xs font-medium text-center flex items-center justify-between">
              <span>{operationError}</span>
              <button onClick={() => setOperationError("")} className="text-[10px] hover:underline font-bold uppercase cursor-pointer ml-3">Dismiss</button>
            </div>
          )}
          {operationSuccess && (
            <div className="mb-6 p-3 bg-success/10 border border-success/20 text-success rounded-card font-sans text-xs font-medium text-center flex items-center justify-between animate-pulse">
              <span>{operationSuccess}</span>
              <button onClick={() => setOperationSuccess("")} className="text-[10px] hover:underline font-bold uppercase cursor-pointer ml-3">Dismiss</button>
            </div>
          )}

          {/* Main Dashboard Workspace */}
          {!isEditing && !isEditingTestimonial ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
              {/* Sidebar Tabs */}
              <aside className="lg:col-span-1 space-y-2">
                <button
                  onClick={() => { setActiveTab("posts"); setSearchQuery(""); }}
                  className={`w-full text-left rounded-btn px-4 py-2.5 font-sans text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${
                    activeTab === "posts"
                      ? "bg-gold-500 text-text-on-gold shadow-sm"
                      : "text-text-secondary hover:bg-gold-400/10"
                  }`}
                >
                  <span>Manage Blog Posts</span>
                  <span className="font-mono text-xs opacity-70 bg-black/10 px-1.5 py-0.5 rounded">
                    {data.posts.length}
                  </span>
                </button>

                <button
                  onClick={() => { setActiveTab("testimonials"); setSearchQuery(""); }}
                  className={`w-full text-left rounded-btn px-4 py-2.5 font-sans text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${
                    activeTab === "testimonials"
                      ? "bg-gold-500 text-text-on-gold shadow-sm"
                      : "text-text-secondary hover:bg-gold-400/10"
                  }`}
                >
                  <span>Manage Testimonials</span>
                  <span className="font-mono text-xs opacity-70 bg-black/10 px-1.5 py-0.5 rounded">
                    {(data.testimonials || []).length}
                  </span>
                </button>

                <button
                  onClick={() => { setActiveTab("categories"); setSearchQuery(""); }}
                  className={`w-full text-left rounded-btn px-4 py-2.5 font-sans text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${
                    activeTab === "categories"
                      ? "bg-gold-500 text-text-on-gold shadow-sm"
                      : "text-text-secondary hover:bg-gold-400/10"
                  }`}
                >
                  <span>Manage Categories</span>
                  <span className="font-mono text-xs opacity-70 bg-black/10 px-1.5 py-0.5 rounded">
                    {data.categories.length}
                  </span>
                </button>
              </aside>

              {/* Workspace Contents */}
              <div className="lg:col-span-3 bg-card border border-gold-400/15 rounded-card p-6 shadow-sm min-h-[400px]">
                {activeTab === "posts" && (
                  <div>
                    {/* Search and Filters */}
                    <div className="mb-6 relative">
                      <input
                        type="text"
                        placeholder="Search posts by title, category, excerpt..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-input border border-gold-400/20 px-10 py-2 font-sans text-sm text-text-primary placeholder-gold-400/40 bg-bg-void focus:outline-none focus:border-gold-500 transition-colors"
                      />
                      <svg
                        className="absolute left-3.5 top-3 text-gold-400/60"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3.5 top-2.5 text-text-muted hover:text-text-primary text-xs font-semibold cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    {/* Posts Table */}
                    {filteredPosts.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left font-sans border-collapse">
                          <thead>
                            <tr className="border-b border-gold-400/10 text-text-muted text-[11px] font-bold uppercase tracking-wider">
                              <th className="py-3 px-2">Article Title</th>
                              <th className="py-3 px-2">Category</th>
                              <th className="py-3 px-2">Publish Date</th>
                              <th className="py-3 px-2 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gold-400/5 text-sm text-text-primary">
                            {filteredPosts.map((post) => (
                              <tr key={post.slug} className="hover:bg-gold-400/5 transition-colors">
                                <td className="py-3.5 px-2 max-w-[280px]">
                                  <div className="font-semibold line-clamp-1">{post.title}</div>
                                  <div className="text-text-muted text-xs line-clamp-1 mt-0.5">{post.excerpt}</div>
                                </td>
                                <td className="py-3.5 px-2">
                                  <span className="bg-gold-400/10 text-gold-700 text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                                    {post.category}
                                  </span>
                                </td>
                                <td className="py-3.5 px-2 text-xs text-text-muted whitespace-nowrap">
                                  <div className="flex flex-col gap-0.5">
                                    <span>{post.date}</span>
                                    {post.updatedAt && post.createdAt && post.updatedAt !== post.createdAt && (
                                      <span className="text-[10px] text-gold-500 font-semibold italic flex items-center gap-1">
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                        </svg>
                                        Edited
                                      </span>
                                    )}
                                  </div>
                                </td>
                                <td className="py-3.5 px-2 text-right whitespace-nowrap">
                                  <div className="flex items-center justify-end gap-2">
                                    <button
                                      onClick={() => openEditor(post)}
                                      className="text-gold-600 hover:text-gold-700 text-xs font-semibold cursor-pointer py-1 px-2 hover:bg-gold-400/10 rounded"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => handleDeletePost(post.slug, post.title)}
                                      className="text-error hover:text-red-700 text-xs font-semibold cursor-pointer py-1 px-2 hover:bg-error/10 rounded"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-16 text-text-muted font-sans text-xs">
                        No articles match search keywords. Propose a new article using the button above.
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "testimonials" && (
                  <div>
                    {/* Search and Filters */}
                    <div className="mb-6 relative">
                      <input
                        type="text"
                        placeholder="Search testimonials by name, quote, detail..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-input border border-gold-400/20 px-10 py-2 font-sans text-sm text-text-primary placeholder-gold-400/40 bg-bg-void focus:outline-none focus:border-gold-500 transition-colors"
                      />
                      <svg
                        className="absolute left-3.5 top-3 text-gold-400/60"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      </svg>
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3.5 top-2.5 text-text-muted hover:text-text-primary text-xs font-semibold cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    {/* Testimonials Table */}
                    {filteredTestimonials.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left font-sans border-collapse">
                          <thead>
                            <tr className="border-b border-gold-400/10 text-text-muted text-[11px] font-bold uppercase tracking-wider">
                              <th className="py-3 px-2">Client Info</th>
                              <th className="py-3 px-2">Stars</th>
                              <th className="py-3 px-2">Review Quote</th>
                              <th className="py-3 px-2 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gold-400/5 text-sm text-text-primary">
                            {filteredTestimonials.map((review) => (
                              <tr key={review.id} className="hover:bg-gold-400/5 transition-colors">
                                <td className="py-3.5 px-2 max-w-[200px]">
                                  <div className="font-semibold">{review.name}</div>
                                  <div className="text-text-muted text-xs line-clamp-1 mt-0.5">{review.detail}</div>
                                </td>
                                <td className="py-3.5 px-2 whitespace-nowrap">
                                  <div className="flex gap-0.5 text-saffron-400">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <IconStarFilled
                                        key={i}
                                        size={12}
                                        className={i < review.stars ? "" : "opacity-20"}
                                      />
                                    ))}
                                  </div>
                                </td>
                                <td className="py-3.5 px-2 max-w-[320px]">
                                  <div className="text-text-secondary text-xs italic line-clamp-2 leading-relaxed">
                                    &ldquo;{review.quote}&rdquo;
                                  </div>
                                </td>
                                <td className="py-3.5 px-2 text-right whitespace-nowrap">
                                  <div className="flex items-center justify-end gap-2">
                                    <button
                                      onClick={() => openTestimonialEditor(review)}
                                      className="text-gold-600 hover:text-gold-700 text-xs font-semibold cursor-pointer py-1 px-2 hover:bg-gold-400/10 rounded"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => handleDeleteTestimonial(review.id!, review.name)}
                                      className="text-error hover:text-red-700 text-xs font-semibold cursor-pointer py-1 px-2 hover:bg-error/10 rounded"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-16 text-text-muted font-sans text-xs">
                        No testimonials match search keywords. Create a new testimonial using the button above.
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "categories" && (
                  <div>
                    {/* Categories UI */}
                    <div className="max-w-[480px]">
                      <h3 className="font-display text-base font-bold text-text-primary mb-4">Blog Categories</h3>

                      <form onSubmit={handleAddCategory} className="flex gap-2 mb-6">
                        <input
                          type="text"
                          placeholder="e.g. Gemstone Therapy"
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          className="flex-1 rounded-input border border-gold-400/20 px-3 py-1.5 font-sans text-sm text-text-primary placeholder-gold-400/40 bg-bg-void focus:outline-none focus:border-gold-500 transition-colors"
                          required
                        />
                        <button
                          type="submit"
                          className="rounded-btn bg-gold-500 hover:bg-gold-600 text-text-on-gold px-4 py-1.5 font-sans text-xs font-semibold cursor-pointer transition-colors shadow-sm whitespace-nowrap"
                        >
                          Add Category
                        </button>
                      </form>

                      <div className="border border-gold-400/10 rounded-input overflow-hidden divide-y divide-gold-400/5">
                        {data.categories.map((cat) => {
                          const postsCount = data.posts.filter((p) => p.category === cat).length;
                          return (
                            <div key={cat} className="flex items-center justify-between p-3 hover:bg-gold-400/5 transition-colors">
                              <div>
                                <span className="font-sans text-sm font-semibold text-text-primary">{cat}</span>
                                <span className="text-text-muted font-mono text-[10px] ml-2">({postsCount} posts)</span>
                              </div>
                              <button
                                onClick={() => handleDeleteCategory(cat)}
                                className="text-error hover:text-red-700 text-xs font-semibold cursor-pointer p-1 hover:bg-error/10 rounded"
                                title="Remove category"
                              >
                                Delete
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : isEditing ? (
            /* Blog Editor Form */
            <div className="bg-card border border-gold-400/15 rounded-card p-6 lg:p-8 shadow-sm animate-fade-in">
              <div className="flex items-center justify-between border-b border-gold-400/10 pb-4 mb-6">
                <h2 className="font-display text-lg lg:text-xl font-bold text-text-primary">
                  {editingPost?.slug ? "Modify Article Details" : "Draft New Article"}
                </h2>
                <button
                  onClick={closeEditor}
                  className="font-sans text-xs text-text-muted hover:text-text-primary font-semibold cursor-pointer border border-gold-400/20 rounded px-2.5 py-1 hover:bg-gold-400/5"
                >
                  Discard Changes
                </button>
              </div>

              <form onSubmit={handleSavePost} className="space-y-6 max-w-[800px]">
                {/* Title */}
                <div>
                  <label className="block font-sans text-xs font-semibold text-text-secondary mb-1">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    value={editingPost?.title || ""}
                    onChange={(e) => setEditingPost((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Practical Vastu Tips for Financial Flow"
                    className="w-full rounded-input border border-gold-400/20 px-3 py-2 font-sans text-sm text-text-primary placeholder-gold-400/40 bg-bg-void focus:outline-none focus:border-gold-500 transition-colors"
                    required
                  />
                </div>

                {/* Grid for Category, Date, Read Time */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Category Selection */}
                  <div>
                    <label className="block font-sans text-xs font-semibold text-text-secondary mb-1">
                      Category *
                    </label>
                    <select
                      value={editingPost?.category || ""}
                      onChange={(e) => setEditingPost((prev) => ({ ...prev, category: e.target.value }))}
                      className="w-full rounded-input border border-gold-400/20 px-3 py-2 font-sans text-sm text-text-primary bg-bg-void focus:outline-none focus:border-gold-500 transition-colors cursor-pointer"
                      required
                    >
                      {data.categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block font-sans text-xs font-semibold text-text-secondary mb-1">
                      Publish Date (e.g. June 16, 2026)
                    </label>
                    <input
                      type="text"
                      value={editingPost?.date || ""}
                      onChange={(e) => setEditingPost((prev) => ({ ...prev, date: e.target.value }))}
                      className="w-full rounded-input border border-gold-400/20 px-3 py-2 font-sans text-sm text-text-primary bg-bg-void focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>

                  {/* Read Time */}
                  <div>
                    <label className="block font-sans text-xs font-semibold text-text-secondary mb-1">
                      Read Time (e.g. 5 min read)
                    </label>
                    <input
                      type="text"
                      value={editingPost?.readTime || ""}
                      placeholder="Leave blank to auto-calculate"
                      onChange={(e) => setEditingPost((prev) => ({ ...prev, readTime: e.target.value }))}
                      className="w-full rounded-input border border-gold-400/20 px-3 py-2 font-sans text-sm text-text-primary bg-bg-void focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block font-sans text-xs font-semibold text-text-secondary mb-1">
                    Short Excerpt / Summary
                  </label>
                  <textarea
                    rows={2}
                    value={editingPost?.excerpt || ""}
                    onChange={(e) => setEditingPost((prev) => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Enter a brief summary summarizing this blog. If empty, it'll extract from the first paragraph."
                    className="w-full rounded-input border border-gold-400/20 px-3 py-2 font-sans text-sm text-text-primary placeholder-gold-400/40 bg-bg-void focus:outline-none focus:border-gold-500 transition-colors resize-y"
                  />
                </div>

                {/* Content */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-sans text-xs font-semibold text-text-secondary">
                      Article Content *
                    </label>
                    <span className="text-[10px] text-text-muted font-sans">
                      Separate paragraphs by pressing Enter twice (adds a blank line)
                    </span>
                  </div>
                  <textarea
                    rows={10}
                    value={formContent}
                    onChange={(e) => setFormContent(e.target.value)}
                    placeholder="Type the main article content here. Keep paragraphs separated by a double line break."
                    className="w-full rounded-input border border-gold-400/20 px-3 py-2.5 font-sans text-sm text-text-primary placeholder-gold-400/40 bg-bg-void focus:outline-none focus:border-gold-500 transition-colors resize-y"
                    required
                  />
                </div>

                {/* Image Upload Area with WebP conversion statistics */}
                <div className="border border-gold-400/10 rounded-card p-4 bg-bg-void">
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <div className="flex-1 space-y-2">
                      <label className="block font-sans text-xs font-semibold text-text-secondary">
                        Featured Cover Image
                      </label>
                      <p className="text-[10px] text-text-muted leading-relaxed font-sans">
                        Image file must be under <strong>500 KB</strong>. The uploader automatically compresses and converts the image to <strong>WebP</strong> client-side to ensure pages load instantly without losing image quality.
                      </p>

                      <div className="flex gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          ref={fileInputRef}
                          className="hidden"
                          id="admin-image-upload"
                        />
                        <label
                          htmlFor="admin-image-upload"
                          className="rounded-btn border border-gold-500/40 hover:border-gold-500 text-gold-600 font-sans text-xs font-semibold py-1.5 px-3 cursor-pointer transition-colors hover:bg-gold-400/5 inline-flex items-center gap-1.5"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                          Select Image
                        </label>
                        {imagePreview && (
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview(null);
                              setImageFile(null);
                              setImageSizeStats(null);
                              setEditingPost((prev) => ({ ...prev, image: "" }));
                              if (fileInputRef.current) fileInputRef.current.value = "";
                            }}
                            className="rounded-btn border border-error/30 text-error font-sans text-xs font-semibold py-1.5 px-3 cursor-pointer hover:bg-error/5 transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      {/* Compression stats */}
                      {isCompressing && (
                        <div className="text-xs font-semibold text-gold-500 animate-pulse font-sans">
                          Optimizing image &amp; converting to WebP...
                        </div>
                      )}

                      {imageSizeStats && (
                        <div className="bg-white border border-gold-400/10 p-2.5 rounded-input space-y-1 font-mono text-[10px] text-text-secondary">
                          <div className="flex justify-between">
                            <span>Uploaded file size:</span>
                            <span className="font-semibold">{imageSizeStats.originalSize}</span>
                          </div>
                          <div className="flex justify-between text-success">
                            <span>WebP converted size:</span>
                            <span className="font-bold">{imageSizeStats.compressedSize}</span>
                          </div>
                          <div className="flex justify-between border-t border-gold-400/5 pt-1 mt-1 font-sans text-[9px] font-bold uppercase tracking-wider text-gold-600">
                            <span>Total data saved:</span>
                            <span>{imageSizeStats.reduction}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Image Preview Box */}
                    <div className="w-full sm:w-40 h-28 bg-bg-surface border border-gold-400/10 rounded-card overflow-hidden flex items-center justify-center relative shrink-0">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Featured post preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="font-sans text-[10px] text-gold-600/40 font-bold uppercase tracking-wider">
                          No Cover Image
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center gap-3 border-t border-gold-400/10 pt-6">
                  <button
                    type="submit"
                    className="rounded-btn bg-gold-500 hover:bg-gold-600 text-text-on-gold px-6 py-2.5 font-sans text-sm font-semibold cursor-pointer transition-colors shadow-sm"
                  >
                    Save Article Details
                  </button>
                  <button
                    type="button"
                    onClick={closeEditor}
                    className="rounded-btn border border-gold-400/30 text-text-secondary hover:bg-gold-400/5 px-6 py-2.5 font-sans text-sm font-semibold cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Testimonial Editor Form */
            <div className="bg-card border border-gold-400/15 rounded-card p-6 lg:p-8 shadow-sm animate-fade-in">
              <div className="flex items-center justify-between border-b border-gold-400/10 pb-4 mb-6">
                <h2 className="font-display text-lg lg:text-xl font-bold text-text-primary">
                  {editingTestimonial?.id ? "Modify Testimonial" : "Draft New Testimonial"}
                </h2>
                <button
                  onClick={closeTestimonialEditor}
                  className="font-sans text-xs text-text-muted hover:text-text-primary font-semibold cursor-pointer border border-gold-400/20 rounded px-2.5 py-1 hover:bg-gold-400/5"
                >
                  Discard Changes
                </button>
              </div>

              <form onSubmit={handleSaveTestimonial} className="space-y-6 max-w-[800px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Client Name */}
                  <div>
                    <label className="block font-sans text-xs font-semibold text-text-secondary mb-1">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      value={editingTestimonial?.name || ""}
                      onChange={(e) => setEditingTestimonial((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Arjun Mehta"
                      className="w-full rounded-input border border-gold-400/20 px-3 py-2 font-sans text-sm text-text-primary placeholder-gold-400/40 bg-bg-void focus:outline-none focus:border-gold-500 transition-colors"
                      required
                    />
                  </div>

                  {/* Client Details */}
                  <div>
                    <label className="block font-sans text-xs font-semibold text-text-secondary mb-1">
                      Client Detail / Context
                    </label>
                    <input
                      type="text"
                      value={editingTestimonial?.detail || ""}
                      onChange={(e) => setEditingTestimonial((prev) => ({ ...prev, detail: e.target.value }))}
                      placeholder="e.g. Software Engineer, Bangalore · Career Prediction"
                      className="w-full rounded-input border border-gold-400/20 px-3 py-2 font-sans text-sm text-text-primary placeholder-gold-400/40 bg-bg-void focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Star Rating */}
                  <div>
                    <label className="block font-sans text-xs font-semibold text-text-secondary mb-1">
                      Star Rating *
                    </label>
                    <select
                      value={editingTestimonial?.stars || 5}
                      onChange={(e) => setEditingTestimonial((prev) => ({ ...prev, stars: Number(e.target.value) }))}
                      className="w-full rounded-input border border-gold-400/20 px-3 py-2 font-sans text-sm text-text-primary bg-bg-void focus:outline-none focus:border-gold-500 transition-colors cursor-pointer"
                      required
                    >
                      <option value={5}>5 Stars ★★★★★</option>
                      <option value={4}>4 Stars ★★★★☆</option>
                      <option value={3}>3 Stars ★★★☆☆</option>
                      <option value={2}>2 Stars ★★☆☆☆</option>
                      <option value={1}>1 Star ★☆☆☆☆</option>
                    </select>
                  </div>
                </div>

                {/* Review Quote */}
                <div>
                  <label className="block font-sans text-xs font-semibold text-text-secondary mb-1">
                    Review / Quote Text *
                  </label>
                  <textarea
                    rows={4}
                    value={editingTestimonial?.quote || ""}
                    onChange={(e) => setEditingTestimonial((prev) => ({ ...prev, quote: e.target.value }))}
                    placeholder="Enter the client's review text here..."
                    className="w-full rounded-input border border-gold-400/20 px-3 py-2.5 font-sans text-sm text-text-primary placeholder-gold-400/40 bg-bg-void focus:outline-none focus:border-gold-500 transition-colors resize-y"
                    required
                  />
                </div>

                {/* Form Actions */}
                <div className="flex items-center gap-3 border-t border-gold-400/10 pt-6">
                  <button
                    type="submit"
                    className="rounded-btn bg-gold-500 hover:bg-gold-600 text-text-on-gold px-6 py-2.5 font-sans text-sm font-semibold cursor-pointer transition-colors shadow-sm"
                  >
                    Save Testimonial
                  </button>
                  <button
                    type="button"
                    onClick={closeTestimonialEditor}
                    className="rounded-btn border border-gold-400/30 text-text-secondary hover:bg-gold-400/5 px-6 py-2.5 font-sans text-sm font-semibold cursor-pointer transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
