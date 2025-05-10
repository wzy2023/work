import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  output: 'standalone', // 减小打包体积
  reactStrictMode: false, // 不这样写 拖拽排序时会报错
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.cache = false // 不缓存
    return config
  },
  experimental: {
    workerThreads: false,
    cpus: 1,
    webpackMemoryOptimizations: true, // 启用内存优化，减少内存的使用
  },
};

export default config;
