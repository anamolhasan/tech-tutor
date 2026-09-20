import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@tech-tutor/config",
    "@tech-tutor/ui",
    "@tech-tutor/utils",
    "@tech-tutor/types",
  ],
};

export default config;
