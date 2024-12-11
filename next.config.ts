import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  swcMinify: false,
  webpack: (config) => {
    config.resolve.alias.canvas = false;
      
    return config;
  },
};

export default nextConfig;
