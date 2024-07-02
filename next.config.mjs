import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "81.163.27.67",
        port: "8055",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
