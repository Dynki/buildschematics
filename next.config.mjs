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
    ],
  },
};

export default nextConfig;
