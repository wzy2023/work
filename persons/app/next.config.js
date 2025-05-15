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
  transpilePackages: ['@wzyjs/components', '@wzyjs/antd'],
  // experimental: {
  //   webpackMemoryOptimizations: true,
  // },
};

export default config;
