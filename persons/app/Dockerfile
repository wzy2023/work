# ----------------------------
# 构建阶段
# ----------------------------
FROM oven/bun:debian AS builder

# 应用目录
ARG ROOT=app
WORKDIR /${ROOT}

# 拷贝所有源代码
COPY . ./

# prisma 需要用到
# RUN apt-get update -y && apt-get install -y openssl

# 替换 package.json 中的 workspace:* 为 *
RUN sed -i 's/"workspace:\*"/"*"/g' package.json

# 安装仅生产依赖
RUN bun install

# 运行代码生成器
RUN bun run generate

# 构建产物
RUN NODE_ENV=production bun run build

# ----------------------------
# 运行阶段
# ----------------------------
FROM oven/bun:debian AS runner

ARG ROOT=app
WORKDIR /${ROOT}

# prisma 需要用到
# RUN apt-get update -y && apt-get install -y openssl

# 只复制构建后的 standalone 产物
COPY --from=builder /${ROOT}/.next/standalone ./
COPY --from=builder /${ROOT}/.next/static ./.next/static
COPY --from=builder /${ROOT}/public ./public

# 开放端口
EXPOSE 3000

# 启动服务
CMD ["bun", "server.js"]
