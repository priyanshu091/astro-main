import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { isAuthenticatedRequest } from "@/lib/auth";

/** Reject files that aren't images, or that are unreasonably large. */
const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED_MIME = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  // SECURITY: this endpoint was previously unauthenticated, meaning anyone could
  // push arbitrary files into the project's Cloudinary account (a storage-cost
  // and content-abuse vector). Require a valid admin session.
  if (!isAuthenticatedRequest(request)) {
    return NextResponse.json(
      { error: "Your session has expired. Please log in again." },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate type and size before spending bandwidth on the upstream upload.
    if (!ALLOWED_MIME.includes(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type. Please upload a JPEG, PNG, WebP, GIF or AVIF image." },
        { status: 415 }
      );
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json(
        { error: "File is too large. Maximum size is 8 MB." },
        { status: 413 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "blog_images",
          format: "webp", // Convert to WebP as per requirements
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: (uploadResult as any).secure_url,
      public_id: (uploadResult as any).public_id,
    });
  } catch (error: any) {
    // Log the detail server-side; return a generic message so upstream
    // credentials/host details are never echoed back to the client.
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({ error: "Failed to upload image." }, { status: 500 });
  }
}
