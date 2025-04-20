FROM node:18.10.0-slim as builder

RUN npm install -g @wzyjs/cli

ARG ROOT=lottery

COPY . /${ROOT}

WORKDIR ${ROOT}

RUN yarn --production

RUN mi build

FROM node:18.10.0-slim

ARG ROOT=lottery

COPY --from=builder /${ROOT} /${ROOT}

WORKDIR ${ROOT}

EXPOSE 3000

CMD npm run start
