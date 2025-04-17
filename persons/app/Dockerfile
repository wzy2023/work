FROM oven/bun:latest

ARG ROOT=app

COPY . /${ROOT}

WORKDIR /${ROOT}

RUN bun install

RUN bun run build

EXPOSE 3000

CMD ["bun", "start"]
