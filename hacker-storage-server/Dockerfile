FROM node:16.19.0-alpine3.17 AS Builder
WORKDIR /app
COPY ./src/ ./src/
COPY ./public/ ./public/
COPY ./next.config.js ./tsconfig.json ./package.json ./.env* ./

RUN npm i \
  && npm run build \
  && rm ./.env*



FROM node:16.19.0-alpine3.17 AS Runner
WORKDIR /app

COPY --from=Builder /app/public ./public
COPY --from=Builder /app/.next/standalone ./
COPY --from=Builder /app/.next/static ./.next/static

EXPOSE 3000

CMD node server.js