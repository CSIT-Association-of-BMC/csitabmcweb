/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "cms-dashbaord-ben2.onrender.com",
      },
      {
        protocol: "https",
        hostname: "cms-dashbaord.onrender.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "https",
        hostname: "flowbite.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/study-materials/semesterExam",
        destination: "/study-materials/semester-exam",
        permanent: true,
      },
      {
        source: "/study-materials/semesterExam/:path*",
        destination: "/study-materials/semester-exam",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
