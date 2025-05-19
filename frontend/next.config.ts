import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// frontend/next.config.ts
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
