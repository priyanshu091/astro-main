/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Realistic placeholder portraits — swap for real astrologer photos / CMS.
      { protocol: "https", hostname: "randomuser.me" },
    ],
    // Serve the smallest format the browser supports. AVIF is ~20-30% smaller
    // than WebP; Next falls back to WebP, then the original, automatically.
    formats: ["image/avif", "image/webp"],
    // Widths generated for `fill` / responsive `sizes` images. The default list
    // includes 3840 (4K) which is wasted work for this layout — the widest asset
    // is ~2160px. Trimming avoids generating and caching oversized variants.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    // Widths generated for fixed-size images (logo, avatars, thumbnails).
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache optimized images at the CDN edge for 30 days instead of the 60s
    // default. These assets are static, so re-optimizing on every cache miss
    // is pure waste.
    minimumCacheTTL: 2592000,
  },
  // Strip React's dev-only prop-type/debug metadata from the production bundle.
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
};

export default nextConfig;
