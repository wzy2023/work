import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: false, // 不这样写 拖拽排序时会报错
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
};

export default config;
