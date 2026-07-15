FROM node:24-bookworm-slim AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci

FROM node:24-bookworm-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

COPY . .

ARG NEXT_PUBLIC_BASE_API_URL
ENV NEXT_PUBLIC_BASE_API_URL=${NEXT_PUBLIC_BASE_API_URL}

ARG NEXT_PUBLIC_YANDEX_MAPS_API_KEY
ENV NEXT_PUBLIC_YANDEX_MAPS_API_KEY=${NEXT_PUBLIC_YANDEX_MAPS_API_KEY}

ARG NEXT_PUBLIC_DADATA_API_KEY
ENV NEXT_PUBLIC_DADATA_API_KEY=${NEXT_PUBLIC_DADATA_API_KEY}

ARG NEXTAUTH_URL
ENV NEXTAUTH_URL=${NEXTAUTH_URL}


RUN npm run build

FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./.next/standalone/public

EXPOSE 3000

CMD ["node", "server.js"]