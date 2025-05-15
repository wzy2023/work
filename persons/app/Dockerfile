# ----------------------------
# 构建阶段
# ----------------------------
FROM oven/bun:latest AS builder

# 设置工作目录
ARG ROOT=app
WORKDIR /${ROOT}

COPY package.json ./

# 替换 package.json 中的 workspace:* 为 *
RUN sed -i 's/"workspace:\*"/"*"/g' package.json

RUN bun install -f --registry "https://registry.npmmirror.com"

# 拷贝源代码
COPY . .

# 安装 openssl（Prisma 需要）
RUN apt-get update && apt-get install -y openssl --no-install-recommends

# Prisma 代码生成
RUN bun -bun run generate

# 构建
RUN bun -bun run build

# ----------------------------
# 运行阶段
# ----------------------------
FROM oven/bun:latest AS runner

# 安装 openssl（Prisma 需要）
RUN apt-get update && apt-get install -y openssl --no-install-recommends

ARG ROOT=app
WORKDIR /${ROOT}

# 只复制构建产物
COPY --from=builder /${ROOT}/.next/standalone ./
COPY --from=builder /${ROOT}/.next/static ./.next/static
COPY --from=builder /${ROOT}/public ./public

# 开放端口
EXPOSE 3000

# 启动服务
CMD ["bun", "server.js"]
