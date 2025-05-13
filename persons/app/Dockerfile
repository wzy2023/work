# ----------------------------
# 构建阶段
# ----------------------------
FROM node:20-slim AS builder

# 安装必要工具（包括 git、openssl）
RUN apt-get update && \
    apt-get install -y git openssl && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# 应用目录
ARG ROOT=app
WORKDIR /${ROOT}

# 拷贝所有源代码
COPY . ./

# 替换 workspace:* 依赖为 *
RUN sed -i 's/"workspace:\*"/"*"/g' package.json

# 安装依赖
RUN npm install --legacy-peer-deps --force

# 可选：修复 react-router 问题
RUN npm i react-router react-router-dom --legacy-peer-deps --force

# Prisma 生成
RUN npm run generate

# 构建
RUN npm run build

# 删除缓存，减小镜像体积
RUN rm -rf .next/cache node_modules/.cache

# ----------------------------
# 运行阶段
# ----------------------------
FROM node:20-slim AS runner

# 安装 openssl（Prisma 需要）
RUN apt-get update && \
    apt-get install -y openssl && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

ARG ROOT=app
WORKDIR /${ROOT}

# 拷贝构建产物
COPY --from=builder /${ROOT}/.next/standalone ./
COPY --from=builder /${ROOT}/.next/static ./.next/static
COPY --from=builder /${ROOT}/public ./public

# 开放端口
EXPOSE 3000

# 启动服务
CMD ["node", "server.js"]
