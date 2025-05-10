FROM oven/bun:latest

ARG ROOT=app

COPY . /${ROOT}

WORKDIR /${ROOT}

# 替换 package.json 中的 "workspace:*" 为 "*"
RUN sed -i 's/"workspace:\*"/"*"/g' package.json

RUN bun install --production

RUN bun run generate
RUN bun run build

EXPOSE 3000

CMD ["bun", "start"]
