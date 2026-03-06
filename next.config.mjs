/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow placeholder image services for mock data
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        // Cloudinary — uploaded build images
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
