import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true,
    };
    return config;
  },
};

export default nextConfig;
