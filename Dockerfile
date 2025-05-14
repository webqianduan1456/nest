# 第一阶段：构建应用
FROM node:20 AS builder
WORKDIR /app
# 首先复制依赖文件
COPY package*.json ./
# 安装依赖
RUN npm ci
# 复制源代码
COPY . .
# 构建应用
RUN npm run build && \
    find ./dist -type f && \        
    [ -f dist/main.js ] || (echo "❌ 编译失败：检查 tsconfig.json 和项目结构" && exit 1)
# 第二阶段：生产环境
FROM node:20-alpine
WORKDIR /usr/src/app
# 从构建阶段复制必要文件
COPY --from=builder /app/config ./config
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
# 启动应用
CMD ["node", "dist/main.js"]