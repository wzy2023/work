FROM node:18.10.0-slim AS builder

ARG ROOT=app

COPY . /${ROOT}

WORKDIR /${ROOT}

RUN yarn --production

# 安装 procps 包，包含 pkill
RUN apt-get update && apt-get install -y procps

# 先运行下 dev，因为 build 需要 dev 产生的 tsconfig 文件
RUN npm run dev & sleep 10 && pkill -f 'npm run dev'

RUN npm run build

FROM node:18.10.0-slim

ARG ROOT=app

COPY --from=builder /${ROOT} /${ROOT}

WORKDIR /${ROOT}

EXPOSE 3000

CMD npm run start
