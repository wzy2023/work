FROM node:lts-alpine

RUN npm install pnpm -g

COPY . /app

RUN #rm -r /app/service/build

WORKDIR /app
RUN pnpm install

WORKDIR /app/service
RUN pnpm install

WORKDIR /app/service
RUN pnpm run build

WORKDIR /app
RUN pnpm run build-only

RUN mv /app/dist /app/service/build/public

RUN mv /app/service/cert /app/service/build/cert

WORKDIR /app/service/build

EXPOSE 3002

CMD ["node", "src/index.mjs"]
