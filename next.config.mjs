/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Realistic placeholder portraits — swap for real astrologer photos / CMS.
      { protocol: "https", hostname: "randomuser.me" },
    ],
  },
};

export default nextConfig;
