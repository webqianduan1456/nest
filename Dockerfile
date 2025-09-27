FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build && \
    find ./dist -type f && \
    [ -f dist/src/main.js ] || (echo "❌ 编译失败：检查 tsconfig.json 和项目结构" && exit 1)


FROM node:20-alpine
WORKDIR /usr/src/app

COPY --from=builder /app/config ./config
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

CMD ["node", "dist/src/main.js"]