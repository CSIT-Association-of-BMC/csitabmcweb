/** @type {import('next').NextConfig} */
const nextConfig = {
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
