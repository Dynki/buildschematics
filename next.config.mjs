/** @type {import('next').NextConfig} */
const nextConfig = {
  // Increase the body size limit for the upload API route (default is 4.5 MB)
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
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
