# 第一阶段：构建阶段
FROM oven/bun:1 AS builder

# 设置工作目录
ARG ROOT=app
WORKDIR /${ROOT}

# 将应用程序代码复制到容器中
COPY . /${ROOT}

# 安装生产依赖并构建应用
RUN bun install --production && \
    bun run build

# 第二阶段：运行时阶段
FROM oven/bun:1

# 设置工作目录
ARG ROOT=app
WORKDIR /${ROOT}

# 从构建阶段复制构建结果
COPY --from=builder /${ROOT}/dist /${ROOT}/dist

# 暴露应用端口
EXPOSE 3000

# 启动应用
CMD ["bun", "run", "start"]
